import type {SQLDatabase} from './d1.ts';
import {netPoints} from '../web/scoring-service.ts';
import type {LeaderboardEntry,LeaderboardReceipt} from '../web/leaderboard-model.ts';
import {anonymousName,boardCutoff,dayMs,scoreboards,type Scoreboard} from '../web/scoreboards.ts';
import {matchName,type NameBan} from './name-moderation.ts';

export interface Person {id:string;credential:string;name:string;blocked:number;created_ms:number}
export interface SavedRun {sequence:number;digest:string;receipt:string;score:string;status:string}
interface EntryRow {owner_id:string;run_id:string;name:string;score:string;attained_ms:number;updated_ms:number;receipt:string;rank:number}
const ordering='digits DESC,score COLLATE BINARY DESC,attained_ms ASC,owner_id ASC';
export function rankedSQL(board:Scoreboard,now:number,columns='e.*,p.name,r.receipt'){
 return `WITH candidates AS (SELECT *,ROW_NUMBER() OVER(PARTITION BY owner_id ORDER BY digits DESC,score COLLATE BINARY DESC,attained_ms,run_id) AS choice
 FROM leaderboard_runs WHERE attained_ms>${boardCutoff(board,now)} AND attained_ms<=${now} AND owner_id IN(SELECT id FROM leaderboard_people WHERE blocked=0)),
 ranked AS (SELECT *,ROW_NUMBER() OVER(ORDER BY ${ordering}) AS rank FROM candidates WHERE choice=1)
 SELECT ${columns} FROM ranked e JOIN leaderboard_people p ON p.id=e.owner_id JOIN leaderboard_runs r ON r.owner_id=e.owner_id AND r.run_id=e.run_id`;
}
export class LeaderboardStore {
 private db:SQLDatabase;private now:()=>number;
 constructor(db:SQLDatabase,now:()=>number=Date.now){this.db=db;this.now=now;}
 person(credential:string){return this.db.prepare('SELECT * FROM leaderboard_people WHERE credential=?1').bind(credential).first<Person>();}
 async bans(){return (await this.db.prepare('SELECT * FROM leaderboard_name_bans ORDER BY created_ms,id').all<NameBan>()).results;}
 async enroll(credential:string,name:string){
  await this.db.prepare('INSERT INTO leaderboard_people(id,credential,name,created_ms) VALUES(?1,?2,?3,?4) ON CONFLICT(credential) DO UPDATE SET name=excluded.name WHERE blocked=0').bind(crypto.randomUUID(),credential,name,this.now()).run();
  const person=(await this.person(credential))!;await this.classify(person);return person;
 }
 async classify(person:Person){
  const version=await this.db.prepare('SELECT version FROM leaderboard_moderation_version WHERE id=1').first<{version:number}>(),bans=await this.bans();
  await this.db.prepare('INSERT INTO leaderboard_name_status(owner_id,name_banned,version) VALUES(?1,?2,?3) ON CONFLICT(owner_id) DO UPDATE SET name_banned=excluded.name_banned,version=excluded.version').bind(person.id,Number(!!matchName(person.name,bans)),version!.version).run();
 }
 async reclassify(limit=100){
  const people=await this.db.prepare('SELECT p.* FROM leaderboard_people p LEFT JOIN leaderboard_name_status s ON s.owner_id=p.id WHERE s.version IS NULL OR s.version<>(SELECT version FROM leaderboard_moderation_version WHERE id=1) LIMIT ?1').bind(limit).all<Person>();
  for(const person of people.results)await this.classify(person);
 }
 async anonymize(owner:string){await this.db.prepare('UPDATE leaderboard_people SET name=?2 WHERE id=?1 AND blocked=0').bind(owner,anonymousName).run();}
 /** Administrative deletion preserves the blocked credential so retries cannot recreate its scores. */
 async withdraw(owner:string){await this.db.batch([
  this.db.prepare('UPDATE leaderboard_people SET blocked=1,name=?2 WHERE id=?1').bind(owner,anonymousName),
  this.db.prepare('DELETE FROM leaderboard_entries WHERE owner_id=?1').bind(owner),
  this.db.prepare('DELETE FROM leaderboard_runs WHERE owner_id=?1').bind(owner),
  this.db.prepare('DELETE FROM leaderboard_retired_runs WHERE owner_id=?1').bind(owner),
  this.db.prepare('DELETE FROM leaderboard_name_status WHERE owner_id=?1').bind(owner),
  this.db.prepare("UPDATE leaderboard_notifications SET state='cancelled',lease_token=NULL WHERE owner_id=?1 AND state<>'sent'").bind(owner),
  this.db.prepare('INSERT INTO leaderboard_admin_audit VALUES(?1,?2,?3,?4)').bind(crypto.randomUUID(),'delete-and-block',owner,this.now())
 ]);}
 async list(offset:number,limit:number,board:Scoreboard='all-time',admin=false){
  const now=this.now(),sql=rankedSQL(board,now);
  const result=await this.db.prepare(sql+' WHERE e.rank<=1000 ORDER BY e.rank LIMIT ?1 OFFSET ?2').bind(limit,offset).all<EntryRow>();
  const count=await this.db.prepare(`SELECT COUNT(*) AS n FROM (${rankedSQL(board,now,'e.owner_id')})`).first<{n:number}>();
  const cutoff=await this.db.prepare(rankedSQL(board,now,'e.score')+' WHERE e.rank=1000').first<{score:string}>();
  const bans=await this.bans();
  return {board,entries:result.results.map(r=>({...this.entry(r,bans,admin),...(admin?{submittedName:r.name,nameBanned:!!matchName(r.name,bans),matchedBan:matchName(r.name,bans)}:{})})),total:Math.min(count?.n||0,1000),cutoff:cutoff?.score??null};
 }
 async personal(owner:string,board:Scoreboard='all-time'){
  const row=await this.db.prepare(rankedSQL(board,this.now())+' WHERE e.owner_id=?1').bind(owner).first<EntryRow>();return row?this.entry(row,[],true):null;
 }
 async standings(owner:string){const result={} as Record<Scoreboard,LeaderboardEntry|null>;for(const board of scoreboards)result[board.id]=await this.personal(owner,board.id);return result;}
 async prospective(score:string,owner?:string,board:Scoreboard='all-time'){
  const row=await this.db.prepare(`SELECT COUNT(*) AS n FROM (${rankedSQL(board,this.now(),'e.owner_id,e.digits,e.score')}) WHERE owner_id<>?1 AND (digits>?2 OR (digits=?2 AND score COLLATE BINARY>=?3))`).bind(owner||'',score.length,score).first<{n:number}>();return (row?.n||0)+1;
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
  const retired=`owner_id=?1 AND status<>'active' AND attained_ms<=${now-30*dayMs}
   AND run_id<>(SELECT run_id FROM leaderboard_runs WHERE owner_id=?1 AND status<>'active' ORDER BY digits DESC,score COLLATE BINARY DESC,attained_ms,run_id LIMIT 1)
   AND run_id<>(SELECT run_id FROM leaderboard_runs WHERE owner_id=?1 AND status<>'active' ORDER BY updated_ms DESC,run_id LIMIT 1)
   AND run_id<>(SELECT run_id FROM leaderboard_entries WHERE owner_id=?1)`;
  const ranks=scoreboards.map(b=>`'${b.id}',(${rankedSQL(b.id,now,'e.rank')} WHERE e.owner_id=?1 AND e.run_id=?2 AND e.rank<=1000)`).join(',');
  const results=await this.db.batch([
   write,
   this.db.prepare(`INSERT INTO leaderboard_entries(owner_id,run_id,score,digits,attained_ms,updated_ms)
    SELECT owner_id,run_id,score,digits,attained_ms,updated_ms FROM leaderboard_runs WHERE owner_id=?1 AND EXISTS(SELECT 1 FROM leaderboard_people WHERE id=?1 AND blocked=0)
    ORDER BY digits DESC,score COLLATE BINARY DESC,attained_ms,run_id LIMIT 1
    ON CONFLICT(owner_id) DO UPDATE SET run_id=excluded.run_id,score=excluded.score,digits=excluded.digits,attained_ms=excluded.attained_ms,updated_ms=excluded.updated_ms`).bind(owner),
   this.db.prepare(`INSERT OR IGNORE INTO leaderboard_notifications(id,owner_id,run_id,payload,created_ms,next_ms)
    SELECT ?5,?1,?2,json_object('name',p.name,'score',r.score,'through',json_extract(r.receipt,'$.run.verification.through'),'status',r.status,'finalizedAt',?6,'standings',json(${`json_object(${ranks})`})),?6,?6
    FROM leaderboard_runs r JOIN leaderboard_people p ON p.id=r.owner_id
    WHERE r.owner_id=?1 AND r.run_id=?2 AND r.sequence=?3 AND r.digest=?4 AND r.status<>'active' AND p.blocked=0
    AND EXISTS(SELECT 1 FROM json_each(json_object(${ranks})) WHERE value IS NOT NULL)`)
    .bind(owner,r.id,receipt.sequence,digest,crypto.randomUUID(),now),
   this.db.prepare(`INSERT INTO leaderboard_retired_runs(owner_id,run_id,sequence,digest) SELECT owner_id,run_id,sequence,digest FROM leaderboard_runs WHERE ${retired} ON CONFLICT(owner_id,run_id) DO NOTHING`).bind(owner),
   this.db.prepare(`DELETE FROM leaderboard_runs WHERE ${retired}`).bind(owner)
  ]);
  return results[0].meta.changes===1;
 }
 private entry(row:EntryRow,bans:NameBan[],owner=false):LeaderboardEntry {
  const run=(JSON.parse(row.receipt) as LeaderboardReceipt).run;
  return {id:row.owner_id,runId:row.run_id,rank:row.rank,name:!owner&&matchName(row.name,bans)?anonymousName:row.name,score:row.score,through:run.verification.through,mandate:run.verification.mandate,status:run.status,rules:run.rules,identity:run.identity,conditions:run.conditions,attainedAt:new Date(row.attained_ms).toISOString(),updatedAt:new Date(row.updated_ms).toISOString(),stale:run.status==='active'&&this.now()-row.updated_ms>45000};
 }
}
