import type {SQLDatabase} from './d1.ts';
import {netPoints} from '../web/scoring-service.ts';
import type {LeaderboardEntry,LeaderboardReceipt} from '../web/leaderboard-model.ts';

export interface Person {id:string;credential:string;name:string;blocked:number;created_ms:number}
export interface SavedRun {sequence:number;digest:string;receipt:string;score:string;status:string}
interface EntryRow {owner_id:string;run_id:string;name:string;score:string;attained_ms:number;updated_ms:number;receipt:string;rank:number}
const ordering='digits DESC,score COLLATE BINARY DESC,attained_ms ASC,owner_id ASC';
const eligible='owner_id IN(SELECT id FROM leaderboard_people WHERE blocked=0)';
// Preserve the best banked run and the latest finalized run, which may still
// receive delayed appointment evidence. Older receipts retain replay anchors.
const retired=`owner_id=?1 AND status<>'active'
 AND run_id<>(SELECT run_id FROM leaderboard_runs WHERE owner_id=?1 AND status<>'active' ORDER BY digits DESC,score COLLATE BINARY DESC,attained_ms,run_id LIMIT 1)
 AND run_id<>(SELECT run_id FROM leaderboard_runs WHERE owner_id=?1 AND status<>'active' ORDER BY updated_ms DESC,run_id LIMIT 1)
 AND run_id<>(SELECT run_id FROM leaderboard_entries WHERE owner_id=?1)`;
const ranked=`WITH ranked AS (SELECT *,ROW_NUMBER() OVER (ORDER BY ${ordering}) AS rank FROM leaderboard_entries WHERE owner_id IN(SELECT id FROM leaderboard_people WHERE blocked=0))
 SELECT e.*,p.name,r.receipt FROM ranked e JOIN leaderboard_people p ON p.id=e.owner_id JOIN leaderboard_runs r ON r.owner_id=e.owner_id AND r.run_id=e.run_id`;
export class LeaderboardStore {
 private db:SQLDatabase;private now:()=>number;
 constructor(db:SQLDatabase,now=Date.now){this.db=db;this.now=now;}
 person(credential:string){return this.db.prepare('SELECT * FROM leaderboard_people WHERE credential=?1').bind(credential).first<Person>();}
 async enroll(credential:string,name:string){
  await this.db.prepare('INSERT INTO leaderboard_people(id,credential,name,created_ms) VALUES(?1,?2,?3,?4) ON CONFLICT(credential) DO UPDATE SET name=excluded.name WHERE blocked=0').bind(crypto.randomUUID(),credential,name,this.now()).run();
  return (await this.person(credential))!;
 }
 async withdraw(owner:string){await this.db.batch([
  this.db.prepare('DELETE FROM leaderboard_entries WHERE owner_id=?1').bind(owner),
  this.db.prepare('DELETE FROM leaderboard_runs WHERE owner_id=?1').bind(owner),
  this.db.prepare('DELETE FROM leaderboard_retired_runs WHERE owner_id=?1').bind(owner),
  this.db.prepare('DELETE FROM leaderboard_people WHERE id=?1 AND blocked=0').bind(owner)
 ]);}
 async list(offset:number,limit:number){
  const result=await this.db.prepare(ranked+' WHERE e.rank<=1000 ORDER BY e.rank LIMIT ?1 OFFSET ?2').bind(limit,offset).all<EntryRow>();
  const count=await this.db.prepare(`SELECT COUNT(*) AS n FROM leaderboard_entries WHERE ${eligible}`).first<{n:number}>();
  const cutoff=await this.db.prepare(`SELECT score FROM leaderboard_entries WHERE ${eligible} ORDER BY ${ordering} LIMIT 1 OFFSET 999`).first<{score:string}>();
  return {entries:result.results.map(r=>this.entry(r)),total:Math.min(count?.n||0,1000),cutoff:cutoff?.score??null};
 }
 async personal(owner:string){const row=await this.db.prepare(ranked+' WHERE e.owner_id=?1').bind(owner).first<EntryRow>();return row?this.entry(row):null;}
 async prospective(score:string,owner?:string){
  // A new equal score follows all existing equal scores. An owner's current entry is excluded.
  const row=await this.db.prepare(`SELECT COUNT(*) AS n FROM leaderboard_entries WHERE ${eligible} AND owner_id<>?1 AND (digits>?2 OR (digits=?2 AND score COLLATE BINARY>=?3))`).bind(owner||'',score.length,score).first<{n:number}>();
  return (row?.n||0)+1;
 }
 saved(owner:string,run:string){return this.db.prepare('SELECT sequence,digest,receipt,score,status FROM leaderboard_runs WHERE owner_id=?1 AND run_id=?2').bind(owner,run).first<SavedRun>();}
 retired(owner:string,run:string){return this.db.prepare('SELECT sequence,digest FROM leaderboard_retired_runs WHERE owner_id=?1 AND run_id=?2').bind(owner,run).first<Pick<SavedRun,'sequence'|'digest'>>();}
 async submit(owner:string,receipt:LeaderboardReceipt,digest:string,expected:number|null){
  const r=receipt.run,score=String(netPoints(r)),now=this.now(),encoded=JSON.stringify(receipt);
  const write=expected===null?
   this.db.prepare(`INSERT INTO leaderboard_runs(owner_id,run_id,sequence,digest,receipt,score,digits,status,attained_ms,updated_ms)
    SELECT ?1,?2,?3,?4,?5,?6,?7,?8,?9,?9 WHERE EXISTS(SELECT 1 FROM leaderboard_people WHERE id=?1 AND blocked=0)
    AND NOT EXISTS(SELECT 1 FROM leaderboard_retired_runs WHERE owner_id=?1 AND run_id=?2)
    ON CONFLICT(owner_id,run_id) DO NOTHING`).bind(owner,r.id,receipt.sequence,digest,encoded,score,score.length,r.status,now):
   this.db.prepare(`UPDATE leaderboard_runs SET sequence=?3,digest=?4,receipt=?5,attained_ms=CASE WHEN score=?6 THEN attained_ms ELSE ?9 END,
    score=?6,digits=?7,status=?8,updated_ms=?9 WHERE owner_id=?1 AND run_id=?2 AND sequence=?10 AND (status='active' OR (status<>'completed' AND status=?8))
    AND EXISTS(SELECT 1 FROM leaderboard_people WHERE id=?1 AND blocked=0)`).bind(owner,r.id,receipt.sequence,digest,encoded,score,score.length,r.status,now,expected);
  const result=await this.db.batch([
   write,
   this.db.prepare(`INSERT INTO leaderboard_entries(owner_id,run_id,score,digits,attained_ms,updated_ms)
    SELECT owner_id,run_id,score,digits,attained_ms,updated_ms FROM leaderboard_runs WHERE owner_id=?1 AND EXISTS(SELECT 1 FROM leaderboard_people WHERE id=?1 AND blocked=0)
    ORDER BY digits DESC,score COLLATE BINARY DESC,attained_ms,run_id LIMIT 1
    ON CONFLICT(owner_id) DO UPDATE SET run_id=excluded.run_id,score=excluded.score,digits=excluded.digits,attained_ms=excluded.attained_ms,updated_ms=excluded.updated_ms`).bind(owner),
   this.db.prepare(`INSERT INTO leaderboard_retired_runs(owner_id,run_id,sequence,digest) SELECT owner_id,run_id,sequence,digest FROM leaderboard_runs WHERE ${retired} ON CONFLICT(owner_id,run_id) DO NOTHING`).bind(owner),
   this.db.prepare(`DELETE FROM leaderboard_runs WHERE ${retired}`).bind(owner)
  ]);
  return result[0].meta.changes===1;
 }
 private entry(row:EntryRow):LeaderboardEntry {
  const run=(JSON.parse(row.receipt) as LeaderboardReceipt).run;
  return {id:row.owner_id,runId:row.run_id,rank:row.rank,name:row.name,score:row.score,through:run.verification.through,mandate:run.verification.mandate,status:run.status,rules:run.rules,identity:run.identity,conditions:run.conditions,attainedAt:new Date(row.attained_ms).toISOString(),updatedAt:new Date(row.updated_ms).toISOString(),stale:run.status==='active'&&this.now()-row.updated_ms>45000};
 }
}
