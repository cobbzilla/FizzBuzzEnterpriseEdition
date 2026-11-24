import {test,after,before} from 'node:test';
import assert from 'node:assert/strict';
import {EnterpriseScoringService,netPoints,scoringStorageKey} from '../web/scoring-service.ts';
import {publicationReceipt,leaderboardName,decimalCompare,type LeaderboardReceipt} from '../web/leaderboard-model.ts';
import {auditLeaderboardReceipt} from '../deploy/leaderboard-audit.ts';
import {LeaderboardStore} from '../deploy/leaderboard-store.ts';
import {highScores} from '../deploy/high-scores.ts';
import {localLeaderboard} from './high-scores-local.ts';

const policy='factor-resonance-v1',stamp='2026-11-23T12:00:00.000Z';
export async function scoreFixture(count=15,mandate=String(count),id=crypto.randomUUID()){
 const service=new EnterpriseScoringService(undefined,()=>stamp,()=>id);service.begin(mandate,policy,{engine:'auto',companions:'false'});
 const lines=Array.from({length:count},(_,i)=>{const n=i+1;return n%15===0?'FizzBuzz':n%3===0?'Fizz':n%5===0?'Buzz':String(n);});
 service.receive({start:'1',end:String(count),global:{},cycles:{},closing:{},complete:true});await service.disclose('1',lines,undefined,async()=>[]);return service;
}
const receipt=(service:EnterpriseScoringService)=>publicationReceipt(service.snapshot().current!)!;
test('names enforce the exact public alphabet and length',()=>{
 for(const name of ['A','Jane Doe','R2-D2','clerk_47','  Space Cadet  '])assert.equal(leaderboardName(name),name.trim());
 for(const name of ['', '   ','---','_','é','名字','<img>','a\nb','a'.repeat(25),'👻'])assert.throws(()=>leaderboardName(name));
});
test('decimal ordering preserves values beyond Number and SQL integer precision',()=>{
 for(const [a,b]of [['9','10'],['9007199254740992','9007199254740993'],['9'.repeat(100),'1'+'0'.repeat(100)]])assert.ok(decimalCompare(a,b)<0);
});
test('genuine active, completed and stopped receipts pass auditing without changing their points',async()=>{
 for(const count of [1,15,100,251,510]){const service=await scoreFixture(count),before=String(netPoints(service.snapshot().current!));assert.equal(String(netPoints(auditLeaderboardReceipt(receipt(service)).run)),before);service.finish('completed');assert.equal(auditLeaderboardReceipt(receipt(service)).run.status,'completed');}
 const stopped=await scoreFixture(7,'1000');stopped.finish('stopped');assert.equal(auditLeaderboardReceipt(receipt(stopped)).run.dividend,'0');
});
test('real heist debits and recovery reconcile during and after the incident',async()=>{
 const service=await scoreFixture(100,'1000');service.startIncident('heist','1','99','Common');service.incidentWork('1',{heistCase:1,heistSuspect:1,heistTactic:1});
 const initial=receipt(service);auditLeaderboardReceipt(initial);
 service.advanceHeist('1',14000);const stolen=receipt(service);assert.ok(netPoints(stolen.run)<netPoints(initial.run));auditLeaderboardReceipt(stolen,initial);
 service.advanceHeist('1',14000,'player');service.finishIncident('1',true);const recovered=receipt(service);auditLeaderboardReceipt(recovered,stolen);assert.equal(recovered.run.closedHeists?.length,1);
 service.finish('stopped');auditLeaderboardReceipt(receipt(service));
});
test('restoring a completed run does not mint a new revision when the next mandate begins',async()=>{
 const service=await scoreFixture(15);service.finish('completed');const done=receipt(service);
 const data=new Map([[scoringStorageKey,JSON.stringify({current:done.run})]]),storage={getItem:(key:string)=>data.get(key)||null,setItem:(key:string,value:string)=>{data.set(key,value);}};
 const restored=new EnterpriseScoringService(storage);restored.begin('30',policy);
 assert.deepEqual(publicationReceipt(restored.snapshot().saved!),done);
});
test('tampered totals, rates, line classifications, versions and partial receipts are rejected',async()=>{
 const original=receipt(await scoreFixture(15));
 for(const mutate of [(r:LeaderboardReceipt)=>r.run.gross='999999',(r:LeaderboardReceipt)=>r.run.partial=true,(r:LeaderboardReceipt)=>r.run.identity='deadbeef',(r:LeaderboardReceipt)=>r.run.buckets['line|1'].quantity='999',(r:LeaderboardReceipt)=>r.run.verification.through='14',(r:LeaderboardReceipt)=>r.run.publicationProtocol=undefined]){const copy=structuredClone(original);mutate(copy);assert.throws(()=>auditLeaderboardReceipt(copy));}
});
test('reorganization warrants and inspection awards are independently cross-checked',async()=>{
 const service=await scoreFixture(100,'1000');service.inspect('department','memory');service.reorganized(['glass'],true,true);auditLeaderboardReceipt(receipt(service));
 const copy=receipt(service);copy.run.warrants='999';assert.throws(()=>auditLeaderboardReceipt(copy));
});

let local:Awaited<ReturnType<typeof localLeaderboard>>;
before(async()=>{local=await localLeaderboard();});
after(async()=>{await local?.dispose();});
const call=(path:string,method='GET',data?:unknown,cookie?:string,send:typeof fetch=async()=>Response.json({success:true,hostname:'scores.example',action:'leaderboard-enroll'}))=>highScores(new Request('https://scores.example/api/high-scores'+path,{method,headers:{Origin:'https://scores.example','Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})},...(data===undefined?{}:{body:JSON.stringify(data)})}),local.env,send);
async function enroll(name='Test Clerk'){const response=await call('/me','PUT',{name,turnstileToken:'test'});assert.equal(response.status,200);return response.headers.get('Set-Cookie')!.split(';')[0];}
test('D1 enrollment is private until a receipt arrives, credentials never appear in public output',async()=>{
 const cookie=await enroll();let mine=await (await call('/me','GET',undefined,cookie)).json();assert.equal(mine.entry,null);
 const score=receipt(await scoreFixture(15));let response=await call('/runs/'+score.run.id,'PUT',score,cookie);assert.equal(response.status,200);mine=await response.json();assert.equal(mine.entry.score,String(netPoints(score.run)));assert.equal(mine.entry.rank,1);
 const publicBody=await (await call('')).text();assert.ok(publicBody.includes('Test Clerk'));assert.ok(!publicBody.includes(cookie.split('=')[1]));assert.ok(!publicBody.includes('credential'));assert.ok(!publicBody.includes('receipt'));
 response=await call('/runs/'+score.run.id,'PUT',score,cookie);assert.equal(response.status,200);assert.equal((await (await call('')).json()).total,1);
});
test('D1 uses current live net and the best finalized fallback, not an earlier peak',async()=>{
 const cookie=await enroll('Fallback');const bank=await scoreFixture(99);bank.finish('completed');let r=receipt(bank);await call('/runs/'+r.run.id,'PUT',r,cookie);
 const active=await scoreFixture(120,'1000');r=receipt(active);await call('/runs/'+r.run.id,'PUT',r,cookie);
 active.startIncident('heist','1','99','Common');active.incidentWork('1',{heistCase:1});active.advanceHeist('1',15000,'automatic');r=receipt(active);const response=await call('/runs/'+r.run.id,'PUT',r,cookie);assert.equal(response.status,200);const result=await response.json();const expected=netPoints(bank.snapshot().current!)>netPoints(active.snapshot().current!)?bank:active;assert.equal(result.entry.score,String(netPoints(expected.snapshot().current!)));
});
test('replayed and concurrent updates cannot overwrite a newer score',async()=>{
 const cookie=await enroll('Concurrent'),service=await scoreFixture(20,'1000'),first=receipt(service);await call('/runs/'+first.run.id,'PUT',first,cookie);
 service.inspect('department','memory');const second=receipt(service);service.inspect('department','publication');const third=receipt(service);
 const results=await Promise.all([call('/runs/'+second.run.id,'PUT',second,cookie),call('/runs/'+third.run.id,'PUT',third,cookie)]);assert.ok(results.every(r=>[200,409].includes(r.status)));
 await call('/runs/'+third.run.id,'PUT',third,cookie);const mine=await (await call('/me','GET',undefined,cookie)).json();assert.equal(mine.entry.score,String(netPoints(third.run)));
 assert.equal((await call('/runs/'+first.run.id,'PUT',first,cookie)).status,409);
});
test('compacted finalized receipts retain replay protection and preserve the latest stopped receipt',async()=>{
 const cookie=await enroll('Archives'),bank=await scoreFixture(100);bank.finish('completed');
 const older=await scoreFixture(5);older.finish('completed');const old=receipt(older);
 for(const r of [receipt(bank),old])assert.equal((await call('/runs/'+r.run.id,'PUT',r,cookie)).status,200);
 const latest=await scoreFixture(7,'100');latest.finish('stopped');let r=receipt(latest);assert.equal((await call('/runs/'+r.run.id,'PUT',r,cookie)).status,200);
 const owner=(await (await call('/me','GET',undefined,cookie)).json()).entry.id,store=new LeaderboardStore(local.env.HIGH_SCORES!.withSession('first-primary'));
 assert.equal(await store.saved(owner,old.run.id),null);assert.ok(await store.retired(owner,old.run.id));assert.ok(await store.saved(owner,r.run.id));
 assert.equal((await call('/runs/'+old.run.id,'PUT',old,cookie)).status,200);
 const changed=structuredClone(old);changed.sequence++;changed.run.revision=changed.sequence;
 assert.equal((await call('/runs/'+changed.run.id,'PUT',changed,cookie)).status,409);
 assert.equal((await (await call('/me','GET',undefined,cookie)).json()).entry.runId,bank.snapshot().current!.id);
 await call('/me','DELETE',undefined,cookie);assert.equal(await store.retired(owner,old.run.id),null);
});
test('origin, Turnstile hostname/action, anonymous writes, malformed names and oversized JSON are refused',async()=>{
 assert.equal((await highScores(new Request('https://scores.example/api/high-scores/me',{method:'PUT',headers:{Origin:'https://evil.example'}}),local.env)).status,403);
 assert.equal((await call('/me','PUT',{name:'Oops!',turnstileToken:'test'})).status,400);
 for(const fields of [{success:false},{success:true,hostname:'evil.example',action:'leaderboard-enroll'},{success:true,hostname:'scores.example',action:'other'}])assert.equal((await call('/me','PUT',{name:'Valid',turnstileToken:'test'},undefined,async()=>Response.json(fields))).status,400);
 const r=receipt(await scoreFixture(15));assert.equal((await call('/runs/'+r.run.id,'PUT',r)).status,401);
 assert.equal((await call('/check','POST',{junk:'a'.repeat(1024*1024)})).status,422);
});
test('withdrawal removes public results and invalidates ownership; API remains readable while writes are disabled',async()=>{
 const cookie=await enroll('Withdraw Me'),r=receipt(await scoreFixture(15));await call('/runs/'+r.run.id,'PUT',r,cookie);assert.equal((await call('/me','DELETE',undefined,cookie)).status,200);assert.equal((await (await call('/me','GET',undefined,cookie)).json()).participating,false);
 local.env.HIGH_SCORES_ENABLED='false';assert.equal((await call('')).status,200);assert.equal((await call('/check','POST',r)).status,503);local.env.HIGH_SCORES_ENABLED='true';
});
test('D1 resolves rank 1000 versus 1001, ties and arbitrary-precision values',async()=>{
 const db=local.env.HIGH_SCORES!,store=new LeaderboardStore(db.withSession('first-primary'));
 const template=receipt(await scoreFixture(1));
 const statements=[];for(let i=0;i<1001;i++){const id='rank-test-'+String(i).padStart(4,'0'),score=String(10n**30n+BigInt(i));statements.push(db.prepare('INSERT INTO leaderboard_people(id,credential,name,created_ms) VALUES(?1,?1,?1,1)').bind(id));statements.push(db.prepare('INSERT INTO leaderboard_runs(owner_id,run_id,sequence,digest,receipt,score,digits,status,attained_ms,updated_ms) VALUES(?1,?1,1,?1,?2,?3,?4,\'active\',1,1)').bind(id,JSON.stringify(template),score,score.length));statements.push(db.prepare('INSERT INTO leaderboard_entries(owner_id,run_id,score,digits,attained_ms,updated_ms) VALUES(?1,?1,?2,?3,1,1)').bind(id,score,score.length));}
 for(let i=0;i<statements.length;i+=90)await db.batch(statements.slice(i,i+90));
 const page=await store.list(950,50);assert.equal(page.total,1000);assert.equal(page.entries.at(-1)!.rank,1000);assert.equal(page.entries.at(-1)!.score,String(10n**30n+1n));
 assert.equal(await store.prospective(String(10n**30n+1n)),1001);assert.equal(await store.prospective(String(10n**30n+2n)),1000);
 assert.ok(!JSON.stringify(page).includes('rank-test-0000'));
});
