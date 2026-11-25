import type {HighScoresEnv} from './high-scores.ts';
import {LeaderboardStore} from './leaderboard-store.ts';
import {matchName} from './name-moderation.ts';
import {anonymousName,dayMs,scoreboards,type Scoreboard} from '../web/scoreboards.ts';
interface Notification {id:string;owner_id:string;run_id:string;payload:string;attempts:number;first_attempt_ms:number|null;lease_token:string}
interface Payload {name:string;score:string;through:string;status:string;finalizedAt:number;standings:Record<Scoreboard,number|null>;email?:{from:string;to:string[];subject:string;text:string}}
/** Durable, leased delivery. A request timeout cannot safely be retried after Resend's 24-hour deduplication window. */
export async function drainScoreNotifications(env:HighScoresEnv,send:typeof fetch=fetch,clock=Date.now){
 if(!env.HIGH_SCORES||!env.RESEND_API_KEY)return;
 const db=env.HIGH_SCORES.withSession('first-primary'),store=new LeaderboardStore(db,clock);
 await db.prepare("UPDATE leaderboard_notifications SET state='review',error='Delivery could not be confirmed within the provider deduplication window',lease_token=NULL WHERE state IN ('pending','sending') AND first_attempt_ms IS NOT NULL AND first_attempt_ms<=?1 AND lease_until_ms<=?2").bind(clock()-dayMs,clock()).run();
 for(let i=0;i<5;i++){
  const now=clock(),lease=crypto.randomUUID();
  const job=await db.prepare(`UPDATE leaderboard_notifications SET state='sending',lease_until_ms=?2,lease_token=?3
   WHERE id=(SELECT n.id FROM leaderboard_notifications n JOIN leaderboard_people p ON p.id=n.owner_id WHERE p.blocked=0 AND n.state IN ('pending','sending') AND n.next_ms<=?1 AND n.lease_until_ms<=?1 ORDER BY n.created_ms,n.id LIMIT 1)
   RETURNING *`).bind(now,now+60000,lease).first<Notification>();
  if(!job)break;
  const payload=JSON.parse(job.payload) as Payload;
  if(!payload.email){
   const name=matchName(payload.name,await store.bans())?anonymousName:payload.name;
   const positions=scoreboards.filter(b=>payload.standings[b.id]!==null).map(b=>`${b.label}: #${payload.standings[b.id]!.toLocaleString('en-US')}`).join('\n');
   payload.email={from:'fizzbuzz@glovebox.tools',to:['jonathan@mooglegaps.com'],subject:'FizzBuzz: a finalized run made the top 1,000',text:`${name}\n${BigInt(payload.score).toLocaleString('en-US')} Enterprise Points\n${BigInt(payload.through).toLocaleString('en-US')} output lines · ${payload.status}\nFinalized: ${new Date(payload.finalizedAt).toISOString()}\n\n${positions}\n\nScoreboards: https://fizzbuzz.biz/high-scores/\nAdministration: https://fizzbuzz.biz/admin/high-scores/\nEntry: ${job.owner_id}\nRun: ${job.run_id}`};
  }
  const claimed=await db.prepare("UPDATE leaderboard_notifications SET payload=?3,attempts=attempts+1,first_attempt_ms=COALESCE(first_attempt_ms,?4) WHERE id=?1 AND lease_token=?2 AND state='sending' AND owner_id IN(SELECT id FROM leaderboard_people WHERE blocked=0)").bind(job.id,lease,JSON.stringify(payload),now).run();
  if(!claimed.meta.changes)continue;
  try{
   const response=await send('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':'fizzbuzz-score/'+job.id},body:JSON.stringify(payload.email),signal:AbortSignal.timeout(12000)});
   if(response.ok){
    const data=await response.json() as {id?:string};if(typeof data.id!=='string')throw Error('Provider response did not confirm an email identifier');
    await db.prepare("UPDATE leaderboard_notifications SET state='sent',resend_id=?3,lease_token=NULL,lease_until_ms=0,error=NULL WHERE id=?1 AND lease_token=?2").bind(job.id,lease,data.id).run();
   }else{
    const conflict=response.status===409?await response.json().catch(()=>null) as {name?:string}|null:null;
    const temporary=response.status===429||response.status>=500||conflict?.name==='concurrent_idempotent_requests';
    const retryAfter=response.headers.get('Retry-After')||'',seconds=Number(retryAfter),requestedDelay=Number.isFinite(seconds)?seconds*1000:Date.parse(retryAfter)-clock();
    const delay=Math.max(Number.isFinite(requestedDelay)?requestedDelay:0,Math.min(3600000,60000*2**Math.min(job.attempts,6)));
    await db.prepare('UPDATE leaderboard_notifications SET state=?3,error=?4,next_ms=?5,lease_token=NULL,lease_until_ms=0 WHERE id=?1 AND lease_token=?2').bind(job.id,lease,temporary?'pending':'failed','Resend HTTP '+response.status,clock()+delay).run();
    break;
   }
  }catch{
   await db.prepare("UPDATE leaderboard_notifications SET state='pending',error='Delivery not confirmed; safe retry scheduled',next_ms=?3,lease_token=NULL,lease_until_ms=0 WHERE id=?1 AND lease_token=?2").bind(job.id,lease,clock()+Math.min(3600000,60000*2**Math.min(job.attempts,6))).run();break;
  }
 }
 await store.reclassify();
}
