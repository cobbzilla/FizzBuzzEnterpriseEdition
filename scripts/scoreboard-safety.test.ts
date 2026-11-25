import {test} from 'node:test';
import assert from 'node:assert/strict';
import {localLeaderboard} from './high-scores-local.ts';
import {makeScore} from './leaderboard-fixtures.ts';
import {publicationReceipt} from '../web/leaderboard-model.ts';
import {LeaderboardStore} from '../deploy/leaderboard-store.ts';
import {nameDistance,matchName} from '../deploy/name-moderation.ts';
import {scoreAdmin} from '../deploy/high-scores-admin.ts';
import {highScores} from '../deploy/high-scores.ts';
import {drainScoreNotifications} from '../deploy/score-notifications.ts';
import {dayMs,anonymousName,scoreboards} from '../web/scoreboards.ts';

test('name matching covers ambiguous leet, separators, transpositions and conservative short names',()=>{
 const bans=(name:string)=>[{id:'ban',name,created_ms:0}];
 for(const name of ['N1ght_0wl','night-owl','NIGHT OWL','nigthowl','nightowx'])assert.ok(matchName(name,bans('Night Owl')),name);
 assert.equal(nameDistance('1','I'),0);assert.equal(nameDistance('1','L'),0);assert.equal(nameDistance('495','ags'),0);
 assert.equal(matchName('Joe',bans('Jon')),null);assert.equal(matchName('Chairperson',bans('Chair')),null);
 assert.equal(matchName(anonymousName,bans(anonymousName)),null);
 assert.equal(matchName('Night OwlXYZ',bans('Night Owl')),null);
});

test('rolling boards expire exactly, keep lower recent fallbacks, and never renew unchanged scores',async()=>{
 const local=await localLeaderboard();let now=100*dayMs;const store=new LeaderboardStore(local.env.HIGH_SCORES!.withSession('first-primary'),()=>now);
 try{
  const owner=await store.enroll('rolling','Window Clerk');const first=await makeScore(100);first.finish('completed');let r=publicationReceipt(first.snapshot().current!)!;await store.submit(owner.id,r,'older',null);
  now+=dayMs-1;assert.equal((await store.personal(owner.id,'daily'))?.runId,r.run.id);
  now++;assert.equal(await store.personal(owner.id,'daily'),null);assert.ok(await store.personal(owner.id,'weekly'));
  const second=await makeScore(5,'1000');r=publicationReceipt(second.snapshot().current!)!;await store.submit(owner.id,r,'newer',null);
  assert.equal((await store.personal(owner.id,'daily'))?.runId,r.run.id);assert.equal((await store.personal(owner.id,'all-time'))?.runId,first.snapshot().current!.id);
  const attained=(await store.personal(owner.id,'daily'))!.attainedAt;
  now+=dayMs-1;second.finish('stopped');const stopped=publicationReceipt(second.snapshot().current!)!;await store.submit(owner.id,stopped,'stopped',r.sequence);assert.equal((await store.personal(owner.id,'daily'))!.attainedAt,attained);
  now++;assert.equal(await store.personal(owner.id,'daily'),null);
  now=107*dayMs;assert.equal((await store.personal(owner.id,'weekly'))?.runId,r.run.id);
  now=108*dayMs;assert.equal(await store.personal(owner.id,'weekly'),null);
  now=131*dayMs;assert.equal(await store.personal(owner.id,'monthly'),null);assert.ok(await store.personal(owner.id));
 }finally{await local.dispose();}
});

test('a real score change renews a long run, then heist losses replace its score',async()=>{
 const local=await localLeaderboard();let now=100*dayMs;const store=new LeaderboardStore(local.env.HIGH_SCORES!.withSession('first-primary'),()=>now);
 try{const person=await store.enroll('long','Long Clerk'),service=await makeScore(100,'1000');let r=publicationReceipt(service.snapshot().current!)!;await store.submit(person.id,r,'first',null);now+=3*dayMs;assert.equal(await store.personal(person.id,'daily'),null);
  service.inspect('department','memory');let next=publicationReceipt(service.snapshot().current!)!;await store.submit(person.id,next,'gain',r.sequence);assert.ok(await store.personal(person.id,'daily'));r=next;
  service.startIncident('heist','1','99','Common');service.incidentWork('1',{heistCase:1});next=publicationReceipt(service.snapshot().current!)!;await store.submit(person.id,next,'heist',r.sequence);r=next;const before=BigInt((await store.personal(person.id))!.score);
  service.advanceHeist('1',14000);next=publicationReceipt(service.snapshot().current!)!;now++;await store.submit(person.id,next,'loss',r.sequence);for(const b of scoreboards)assert.ok(BigInt((await store.personal(person.id,b.id))!.score)<before);
 }finally{await local.dispose();}
});

function adminRequest(path:string,method='GET',data?:unknown,auth=true,origin='https://scores.example'){
 return new Request('https://scores.example/admin/high-scores/'+path,{method,headers:{...(auth?{Authorization:'Basic '+Buffer.from('administrator:strong-test-password').toString('base64')}:{ }),Origin:origin,'Content-Type':'application/json','X-Scoreboard-Admin':'1'},...(data===undefined?{}:{body:JSON.stringify(data)})});
}
test('Basic auth protects page, assets and mutations; bans mask existing/future entries but preserve owner names',async()=>{
 const local=await localLeaderboard();const env={...local.env,HIGH_SCORES_ADMIN_USERNAME:'administrator',HIGH_SCORES_ADMIN_PASSWORD:'strong-test-password'},store=new LeaderboardStore(env.HIGH_SCORES!.withSession('first-primary'));
 try{
  for(const path of ['','app.js','style.css','api/boards','api/moderation'])assert.equal((await scoreAdmin(adminRequest(path,'GET',undefined,false),env)).status,401);
  assert.equal((await scoreAdmin(adminRequest(''),local.env)).status,503);
  assert.equal((await scoreAdmin(adminRequest('api/bans','POST',{name:'Night Owl'},true,'https://evil.example'),env)).status,403);
  const owner=await store.enroll('masked','N1ght_0wl'),service=await makeScore(15);service.finish('completed');const r=publicationReceipt(service.snapshot().current!)!;await store.submit(owner.id,r,'final',null);
  assert.equal((await scoreAdmin(adminRequest('api/bans','POST',{name:'Night Owl'}),env)).status,200);
  const publicRows=await store.list(0,50);assert.equal(publicRows.entries[0].name,anonymousName);assert.ok(!JSON.stringify(publicRows).includes('N1ght_0wl'));
  assert.equal((await store.personal(owner.id))!.name,'N1ght_0wl');await store.reclassify();assert.equal((await local.db.prepare('SELECT name_banned FROM leaderboard_name_status WHERE owner_id=?').bind(owner.id).first())!.name_banned,1);
  const future=await store.enroll('future','Night0wl');assert.equal((await local.db.prepare('SELECT name_banned FROM leaderboard_name_status WHERE owner_id=?').bind(future.id).first())!.name_banned,1);
  const admin=await scoreAdmin(adminRequest('api/boards?board=daily'),env);const data=await admin.json();assert.equal(data.entries[0].submittedName,'N1ght_0wl');assert.equal(data.entries[0].name,anonymousName);assert.equal(admin.headers.get('Cache-Control'),'no-store');
  const ban=(await store.bans())[0];await scoreAdmin(adminRequest('api/bans/'+ban.id,'DELETE'),env);assert.equal((await store.list(0,50)).entries[0].name,'N1ght_0wl');
  assert.equal((await scoreAdmin(adminRequest('api/people/'+owner.id,'DELETE'),env)).status,200);assert.equal((await store.person('masked'))!.blocked,1);assert.equal(await store.submit(owner.id,r,'replay',null),false);assert.equal((await store.list(0,50)).total,0);
  assert.equal((await local.db.prepare('SELECT state FROM leaderboard_notifications WHERE owner_id=?').bind(owner.id).first())!.state,'cancelled');
 }finally{await local.dispose();}
});

test('anonymous enrollment and legacy withdrawal keep scores and never require a public name',async()=>{
 const local=await localLeaderboard();
 const call=(path:string,method='GET',data?:unknown,cookie?:string)=>highScores(new Request('https://scores.example/api/high-scores'+path,{method,headers:{Origin:'https://scores.example','Content-Type':'application/json',...(cookie?{Cookie:cookie}:{})},...(data===undefined?{}:{body:JSON.stringify(data)})}),local.env,async()=>Response.json({success:true,hostname:'scores.example',action:'leaderboard-enroll'}));
 try{let response=await call('/me','PUT',{anonymous:true,turnstileToken:'test'});assert.equal(response.status,200);const cookie=response.headers.get('Set-Cookie')!.split(';')[0];assert.equal((await response.json()).name,anonymousName);
  const run=publicationReceipt((await makeScore()).snapshot().current!)!;await call('/runs/'+run.run.id,'PUT',run,cookie);await call('/me','PUT',{name:'A Clerk'},cookie);response=await call('/me','DELETE',undefined,cookie);const result=await response.json();assert.equal(result.name,anonymousName);assert.equal(result.participating,true);assert.equal(result.entry.runId,run.run.id);assert.equal(Object.keys(result.standings).length,4);
 }finally{await local.dispose();}
});

test('final qualifying runs queue one combined email; concurrent drains, retries, and old ambiguous jobs are safe',async()=>{
 const local=await localLeaderboard();let now=100*dayMs;const env={...local.env,RESEND_API_KEY:'not-a-real-key'},store=new LeaderboardStore(env.HIGH_SCORES!.withSession('first-primary'),()=>now);
 try{const owner=await store.enroll('mail',anonymousName),service=await makeScore(15);let r=publicationReceipt(service.snapshot().current!)!;await store.submit(owner.id,r,'live',null);assert.equal((await local.db.prepare('SELECT COUNT(*) n FROM leaderboard_notifications').first())!.n,0);
  service.finish('completed');const final=publicationReceipt(service.snapshot().current!)!;await store.submit(owner.id,final,'final',r.sequence);assert.equal((await local.db.prepare('SELECT COUNT(*) n FROM leaderboard_notifications').first())!.n,1);
  const sent:{body:any;key:string}[]=[];const send:typeof fetch=async(_input,init)=>{sent.push({body:JSON.parse(String(init?.body)),key:new Headers(init?.headers).get('Idempotency-Key')!});return Response.json({id:'email-1'});};
  await Promise.all([drainScoreNotifications(env,send,()=>now),drainScoreNotifications(env,send,()=>now)]);assert.equal(sent.length,1);assert.equal(sent[0].body.from,'fizzbuzz@glovebox.tools');assert.deepEqual(sent[0].body.to,['jonathan@mooglegaps.com']);assert.match(sent[0].body.text,/Daily: #1/);assert.match(sent[0].body.text,/All-time: #1/);
  await drainScoreNotifications(env,send,()=>now);assert.equal(sent.length,1);
  const next=await makeScore(30);next.finish('completed');r=publicationReceipt(next.snapshot().current!)!;await store.submit(owner.id,r,'next',null);
  await drainScoreNotifications(env,async()=>{throw Error('Lost response');},()=>now);let pending=await local.db.prepare("SELECT * FROM leaderboard_notifications WHERE state='pending'").first();assert.ok(pending);
  now+=60000;await drainScoreNotifications(env,send,()=>now);assert.equal(sent.length,2);
  await local.db.prepare("UPDATE leaderboard_notifications SET state='pending',first_attempt_ms=?1,next_ms=?1,lease_until_ms=0 WHERE id=?2").bind(now-dayMs,pending!.id as string).run();await drainScoreNotifications(env,send,()=>now);assert.equal(sent.length,2);assert.equal((await local.db.prepare('SELECT state FROM leaderboard_notifications WHERE id=?').bind(pending!.id as string).first())!.state,'review');
 }finally{await local.dispose();}
});
