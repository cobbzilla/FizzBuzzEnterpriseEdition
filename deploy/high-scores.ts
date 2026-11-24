import {leaderboardAPI,leaderboardName,type LeaderboardReceipt} from '../web/leaderboard-model.ts';
import {netPoints} from '../web/scoring-service.ts';
import {auditLeaderboardReceipt,ReceiptError} from './leaderboard-audit.ts';
import {LeaderboardStore} from './leaderboard-store.ts';
import type {LeaderboardDatabase} from './d1.ts';

export interface RateLimitBinding {limit(options:{key:string}):Promise<{success:boolean}>}
export interface HighScoresEnv {
 HIGH_SCORES?:LeaderboardDatabase;HIGH_SCORES_ENABLED?:string;TURNSTILE_SITEKEY?:string;TURNSTILE_SECRET?:string;
 SCORES_READ_LIMIT?:RateLimitBinding;SCORES_WRITE_LIMIT?:RateLimitBinding;SCORES_ENROLL_LIMIT?:RateLimitBinding;
}
const cookieName='__Host-slopbuzz-scores';
const json=(body:unknown,status=200,headers:HeadersInit={})=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}});
const sha=async(value:string)=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))].map(n=>n.toString(16).padStart(2,'0')).join('');
const credential=(request:Request)=>request.headers.get('Cookie')?.split(';').map(v=>v.trim()).find(v=>v.startsWith(cookieName+'='))?.slice(cookieName.length+1);
export const highScoreCSP="default-src 'self'; script-src 'self' 'wasm-unsafe-eval' https://challenges.cloudflare.com; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-src https://challenges.cloudflare.com; worker-src 'self'; base-uri 'none'; frame-ancestors 'none'";
async function body(request:Request):Promise<Record<string,unknown>> {
 if(!request.headers.get('Content-Type')?.startsWith('application/json'))throw new ReceiptError('Submit JSON.');
 const reader=request.body?.getReader();if(!reader)throw new ReceiptError('Missing request body.');
 const chunks:Uint8Array[]=[];let size=0;
 for(;;){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>1024*1024){await reader.cancel();throw new ReceiptError('Receipt exceeds one megabyte.');}chunks.push(value);}
 const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
 try{const value=JSON.parse(new TextDecoder().decode(bytes));if(!value||Array.isArray(value)||typeof value!=='object')throw Error();return value;}catch{throw new ReceiptError('Invalid JSON.');}
}
export async function highScores(request:Request,env:HighScoresEnv,send:typeof fetch=fetch,now=Date.now):Promise<Response>{
 const url=new URL(request.url),path=url.pathname.slice(leaderboardAPI.length),enabled=env.HIGH_SCORES_ENABLED==='true',sitekey=env.TURNSTILE_SITEKEY||'';
 if(!env.HIGH_SCORES)return json({error:'The high-score register is temporarily unavailable.'},503);
 const writes=!['GET','HEAD'].includes(request.method);
 if(writes&&(request.headers.get('Origin')!==url.origin||request.headers.get('Sec-Fetch-Site')==='cross-site'))return json({error:'Cross-origin submissions are not accepted.'},403);
 if(writes&&!enabled&&request.method!=='DELETE')return json({error:'Score submissions are temporarily paused.'},503);
 const ip=request.headers.get('CF-Connecting-IP')||'local-preview',token=credential(request),validToken=token&&/^[a-f0-9]{64}$/.test(token)?token:undefined;
 const hash=validToken?await sha(validToken):undefined;
 const limiter=writes?env.SCORES_WRITE_LIMIT:env.SCORES_READ_LIMIT;
 if(limiter&&!(await limiter.limit({key:hash||ip})).success)return json({error:'Please give the register a moment.'},429,{'Retry-After':'15'});
 try{
  const store=new LeaderboardStore(env.HIGH_SCORES.withSession('first-primary'),now),person=hash?await store.person(hash):null;
  if(person?.blocked&&writes&&request.method!=='DELETE')return json({error:'This browser cannot submit to the register.'},403);
  const asOf=()=>new Date(now()).toISOString();
  const standing=async()=>({participating:!!person&&!person.blocked,name:person?.name||'',entry:person?await store.personal(person.id):null,asOf:asOf(),enabled:enabled&&!person?.blocked,sitekey});
  if((path===''||path==='/')&&request.method==='GET'){
   const offset=Number(url.searchParams.get('offset')||0),limit=Number(url.searchParams.get('limit')||50);
   if(!Number.isInteger(offset)||offset<0||offset>950||!Number.isInteger(limit)||limit<1||limit>50)return json({error:'Invalid page.'},400);
   return json({...await store.list(offset,limit),offset,limit,asOf:asOf(),enabled,sitekey},200,{'Cache-Control':'public, max-age=5'});
  }
  if(path==='/me'&&request.method==='GET')return json(await standing());
  if(path==='/me'&&request.method==='DELETE'){
   if(person)await store.withdraw(person.id);
   return json({participating:false,name:'',entry:null,asOf:asOf(),enabled,sitekey},200,{'Set-Cookie':`${cookieName}=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0`});
  }
  if(path==='/me'&&request.method==='PUT'){
   const data=await body(request),name=leaderboardName(data.name);
   if(!person){
    if(env.SCORES_ENROLL_LIMIT&&!(await env.SCORES_ENROLL_LIMIT.limit({key:ip})).success)return json({error:'Enrollment is temporarily limited. Try again shortly.'},429,{'Retry-After':'60'});
    if(!env.TURNSTILE_SECRET||typeof data.turnstileToken!=='string'||data.turnstileToken.length>2048)return json({error:'Complete the verification to publish your score.'},400);
    const response=await send('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({secret:env.TURNSTILE_SECRET,response:data.turnstileToken,idempotency_key:crypto.randomUUID()}),signal:AbortSignal.timeout(10000)});
    const verification=await response.json() as {success?:boolean;hostname?:string;action?:string};
    if(!response.ok||!verification.success||verification.hostname!==url.hostname||verification.action!=='leaderboard-enroll')return json({error:'Verification expired or failed. Please try it again.'},400);
   }
   const nextToken=validToken||[...crypto.getRandomValues(new Uint8Array(32))].map(v=>v.toString(16).padStart(2,'0')).join(''),profile=await store.enroll(await sha(nextToken),name);
   return json({participating:true,name:profile.name,entry:await store.personal(profile.id),asOf:asOf(),enabled,sitekey},200,{'Set-Cookie':`${cookieName}=${nextToken}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=31536000`});
  }
  if(path==='/check'&&request.method==='POST'){
   const receipt=auditLeaderboardReceipt(await body(request)),score=String(netPoints(receipt.run)),rank=await store.prospective(score,person?.id);
   return json({qualifies:rank<=1000,rank:rank<=1000?rank:null,score,runId:receipt.run.id,sequence:receipt.sequence,asOf:asOf()});
  }
  if(/^\/runs\/[A-Za-z0-9_-]{1,80}$/.test(path)&&request.method==='PUT'){
   if(!person)return json({error:'Join the register before submitting a score.'},401);
   const data=await body(request) as unknown as LeaderboardReceipt,runId=path.slice('/runs/'.length);
   if(data?.run?.id!==runId)return json({error:'Run identity does not match the receipt.'},400);
   const prior=await store.saved(person.id,runId),digest=await sha(JSON.stringify(data));
   const retired=prior?null:await store.retired(person.id,runId);
   if(retired){
    if(data.sequence===retired.sequence&&digest===retired.digest)return json({...await standing(),acceptedSequence:retired.sequence,runId});
    return json({error:'This older finalized run has already been archived.',acceptedSequence:retired.sequence},409);
   }
   if(prior&&data.sequence<=prior.sequence){
    if(data.sequence===prior.sequence&&digest===prior.digest)return json({...await standing(),acceptedSequence:prior.sequence,runId});
    return json({error:'A newer receipt has already been accepted.',acceptedSequence:prior.sequence},409);
   }
   const receipt=auditLeaderboardReceipt(data,prior?JSON.parse(prior.receipt):undefined);
   if(!await store.submit(person.id,receipt,digest,prior?.sequence??null))return json({error:'The run changed during submission. Refresh its standing and retry.'},409);
   return json({...await standing(),acceptedSequence:receipt.sequence,runId});
  }
  return json({error:'Unknown high-score operation.'},404);
 }catch(error){
  if(error instanceof ReceiptError)return json({error:error.message},422);
  if(error instanceof Error&&error.message.startsWith('Use 1–24')||error instanceof Error&&error.message.startsWith('Enter a name'))return json({error:error.message},400);
  // Never expose SQL, token material, or upstream response bodies.
  console.error('High-score operation failed',error instanceof Error?error.name:'unknown');
  return json({error:'The register is temporarily unavailable. Your demo can continue.'},503);
 }
}
