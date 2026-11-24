import {leaderboardAPI,participationKey,pendingScoresKey,publicationReceipt,decimalCompare,type Participation,type LeaderboardPage,type PersonalStanding,type QualificationResult,type LeaderboardReceipt,type SubmissionResult} from './leaderboard-model.ts';
import {decodeScoringRun,netPoints,type EnterpriseScoringService,type ScoringRun} from './scoring-service.ts';

export class LeaderboardHTTPError extends Error {readonly status:number;readonly retryAfter:number;constructor(message:string,status:number,retryAfter=0){super(message);this.status=status;this.retryAfter=retryAfter;}}
export interface LeaderboardClientState {
 choice:Participation;personal?:PersonalStanding;qualification?:QualificationResult;current?:ScoringRun;
 error:string;stale:boolean;enabled:boolean;sitekey:string;invitation:boolean;
}
/** Coalesce receipts, serialize network writes and keep local scoring independent of the network. */
export class LeaderboardClient {
 readonly state:LeaderboardClientState={choice:'undecided',error:'',stale:false,enabled:false,sitekey:'',invitation:false};
 private listeners=new Set<()=>void>();private queue=new Map<string,LeaderboardReceipt>();private accepted=new Map<string,number>();private rejected=new Map<string,number>();
 private timer?:ReturnType<typeof setTimeout>;private polling?:ReturnType<typeof setInterval>;private busy=false;private disposed=false;private connected=false;private failures=0;private retryAt=0;private lastSend=0;private lastCheck=0;private lastPoll=0;private cutoff:string|null|undefined;
 private unsubscribe?:()=>void;private store?:Pick<Storage,'getItem'|'setItem'>;
 private epoch=0;
 private timerAt=Infinity;private attempted=new Set<string>();private persistedFinals='';
 private restored=new Set<string>();
 private send:typeof fetch;private now:()=>number;private visible:()=>boolean;
 constructor(send:typeof fetch=fetch,storage?:Pick<Storage,'getItem'|'setItem'>,now=Date.now,visible=()=>!document.hidden){
  this.send=(input,init)=>send(input,init);this.now=now;this.visible=visible;
  this.store=storage;try{const choice=storage?.getItem(participationKey);if(choice==='public'||choice==='private')this.state.choice=choice;}catch{}
  if(this.state.choice==='public')try{
   const raw=storage?.getItem(pendingScoresKey)||'[]';if(raw.length>2*1024*1024)throw Error('Oversized pending receipts');
   const saved=JSON.parse(raw);if(!Array.isArray(saved)||saved.length>100)throw Error('Invalid pending receipts');
   for(const item of saved){const run=decodeScoringRun(item.run),receipt=run&&publicationReceipt(run);if(receipt&&(run!.status!=='active'||item.restored===true)){this.queue.set(run!.id,receipt);if(item.attempted)this.attempted.add(run!.id);if(item.restored)this.restored.add(run!.id);}}
  }catch{/* Damaged local pending data never stops numerical execution. */}
 }
 subscribe(listener:()=>void){this.listeners.add(listener);return()=>this.listeners.delete(listener);}
 private publish(){for(const listener of this.listeners)listener();}
 async request<T>(path:string,method='GET',body?:unknown):Promise<T>{
  const response=await this.send(leaderboardAPI+path,{method,credentials:'same-origin',cache:'no-store',...(body===undefined?{}:{headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}),signal:AbortSignal.timeout(12000)});
  const data=await response.json();if(!response.ok)throw new LeaderboardHTTPError(data.error||'The register could not be reached.',response.status,Number(response.headers.get('Retry-After')||0)*1000);return data as T;
 }
 async start(){if(this.connected)return;this.connected=true;await this.refresh();this.polling=setInterval(()=>{if(this.visible())this.schedule(0);},15000);}
 async refresh(){
  try{
   try{const saved=this.store?.getItem(participationKey);if(saved==='private'||saved==='public')this.state.choice=saved;}catch{}
   const personal=await this.request<PersonalStanding>('/me');this.apply(personal);
   if(personal.participating)this.choice('public');else if(this.state.choice==='public')this.choice('undecided');
   this.lastPoll=this.now();this.success();
  }catch(error){this.failure(error);}
  this.publish();this.schedule(0);
 }
 attach(scoring:EnterpriseScoringService){
  this.unsubscribe?.();const read=()=>{const snapshot=scoring.snapshot();this.state.current=snapshot.current;
   for(const run of [snapshot.saved,snapshot.current]){if(!run)continue;const receipt=publicationReceipt(run);if(receipt&&receipt.sequence>(this.accepted.get(run.id)||0)&&receipt.sequence>(this.rejected.get(run.id)||0)){this.queue.set(run.id,receipt);if(run.publicationInterrupted){this.restored.add(run.id);this.attempted.add(run.id);}}}
   // Keep final receipts until acknowledged, including a published run's losses.
   // Never-submitted banked runs need only their best candidate.
   for(const [id,receipt]of this.queue)if(id!==snapshot.current?.id&&id!==snapshot.saved?.id&&(receipt.run.status==='active'&&!this.restored.has(id)||this.state.choice!=='public'))this.queue.delete(id);
   this.persistFinals();
   this.publish();const run=snapshot.current,prior=this.state.qualification;
   const immediate=run?.status!=='active'||!!prior&&prior.runId!==run?.id||!run?.incident&&this.lastIncident;
   this.schedule(immediate?0:250);
  };this.unsubscribe=scoring.subscribe(read);read();void this.start();
 }
 private choice(value:Participation){this.state.choice=value;try{this.store?.setItem(participationKey,value);}catch{}}
 private persistFinals(){
  if(this.state.choice!=='public')return;
  let best:LeaderboardReceipt|undefined;
  for(const r of this.queue.values())if(r.run.status!=='active'&&!this.attempted.has(r.run.id)&&(!best||netPoints(r.run)>netPoints(best.run)))best=r;
  for(const [id,r]of this.queue)if(this.state.personal&&r.run.status!=='active'&&!this.attempted.has(id)&&id!==best?.run.id)this.queue.delete(id);
  const serialized=JSON.stringify([...this.queue.values()].filter(r=>r.run.status!=='active'||this.restored.has(r.run.id)).map(r=>({run:r.run,attempted:this.attempted.has(r.run.id),restored:this.restored.has(r.run.id)})));
  if(serialized!==this.persistedFinals)try{this.store?.setItem(pendingScoresKey,serialized);this.persistedFinals=serialized;}catch{/* The in-memory queue remains available if storage is full. */}
 }
 decline(){this.choice('private');this.state.invitation=false;this.publish();}
 dismissInvitation(){this.state.invitation=false;this.publish();}
 async enroll(name:string,turnstileToken:string){
  ++this.epoch;const personal=await this.request<PersonalStanding>('/me','PUT',{name,turnstileToken});this.apply(personal);this.choice('public');this.state.invitation=false;this.success();this.publish();this.schedule(0);
  this.persistFinals();
 }
 async withdraw(){++this.epoch;const personal=await this.request<PersonalStanding>('/me','DELETE');this.apply(personal);this.choice('private');this.accepted.clear();this.rejected.clear();this.attempted.clear();this.restored.clear();this.queue.clear();const current=this.state.current&&publicationReceipt(this.state.current);if(current)this.queue.set(current.run.id,current);try{this.store?.setItem(pendingScoresKey,'[]');this.persistedFinals='[]';}catch{}this.state.invitation=false;this.success();this.publish();}
 async list(offset=0){const page=await this.request<LeaderboardPage>('?offset='+offset+'&limit=50');this.cutoff=page.cutoff;this.state.enabled=page.enabled;this.state.sitekey=page.sitekey;return page;}
 resume(){this.retryAt=0;this.schedule(0);}
 private apply(personal:PersonalStanding){this.state.personal=personal;this.state.enabled=personal.enabled;this.state.sitekey=personal.sitekey;if(personal.entry?.status==='active')this.attempted.add(personal.entry.runId);}
 private success(){this.failures=0;this.retryAt=0;this.state.error='';this.state.stale=false;}
 private failure(error:unknown){this.state.error=error instanceof Error?error.message:'The register could not be reached.';this.state.stale=true;this.failures++;this.retryAt=this.now()+Math.max(error instanceof LeaderboardHTTPError?error.retryAfter:0,Math.min(60000,1000*2**Math.min(6,this.failures)));}
 private schedule(delay:number){if(this.disposed)return;const at=this.now()+delay;if(this.timer&&this.timerAt<=at)return;clearTimeout(this.timer);this.timerAt=at;this.timer=setTimeout(()=>{this.timer=undefined;this.timerAt=Infinity;void this.flush();},delay);}
 async flush(){
  if(this.busy||this.disposed)return;
  const now=this.now();if(now<this.retryAt){this.schedule(this.retryAt-now);return;}
  this.busy=true;
  const epoch=this.epoch;
  try{
   if(now-this.lastPoll>=15000&&this.visible()){
    this.apply(await this.request<PersonalStanding>('/me'));this.lastPoll=now;
    if(this.state.choice!=='public')await this.list();
   }
   if(!this.state.enabled)return;
   if(this.state.choice==='public'&&this.state.personal?.participating){
    const receipt=[...this.queue.values()][0];
    if(receipt){
     const heist=receipt.run.incident?.kind==='heist',urgent=receipt.run.status!=='active'||this.restored.has(receipt.run.id)||!receipt.run.incident&&this.lastIncident;
     const delay=(heist?1000:5000)-(now-this.lastSend);
     if(!urgent&&delay>0){this.schedule(delay);return;}
     this.lastIncident=!!receipt.run.incident;
     try{
      this.attempted.add(receipt.run.id);this.persistFinals();
      const result=await this.request<SubmissionResult>('/runs/'+receipt.run.id,'PUT',receipt);
      if(epoch!==this.epoch)return;
      this.accepted.set(receipt.run.id,result.acceptedSequence);this.apply(result);
      if((this.queue.get(receipt.run.id)?.sequence||0)<=result.acceptedSequence)this.queue.delete(receipt.run.id);
      if(!this.queue.has(receipt.run.id)&&(receipt.run.status!=='active'||this.restored.has(receipt.run.id))){this.attempted.delete(receipt.run.id);this.restored.delete(receipt.run.id);}
      this.persistFinals();
     }catch(error){
      if(error instanceof LeaderboardHTTPError&&error.status===401){this.choice('undecided');this.state.personal=undefined;}
      if(error instanceof LeaderboardHTTPError&&[409,422].includes(error.status)){this.rejected.set(receipt.run.id,receipt.sequence);if(this.queue.get(receipt.run.id)?.sequence===receipt.sequence)this.queue.delete(receipt.run.id);if(!this.queue.has(receipt.run.id)){this.attempted.delete(receipt.run.id);this.restored.delete(receipt.run.id);}this.persistFinals();}
      throw error;
     }
     this.lastSend=now;
    }
   }else{
    const current=this.state.current,receipt=current?publicationReceipt(current):undefined;
    if(receipt){
     if(this.cutoff===undefined)await this.list();
     const score=String(netPoints(current!)),qualifiesLocally=this.cutoff===null||decimalCompare(score,this.cutoff!)>=0;
     const crossing=qualifiesLocally&&!this.state.qualification?.qualifies;
     if((crossing||now-this.lastCheck>=5000)&&(qualifiesLocally||this.state.qualification?.qualifies)){
      const result=await this.request<QualificationResult>('/check','POST',receipt);this.lastCheck=now;
      if(this.state.current?.id===result.runId){this.state.qualification=result;if(result.qualifies&&this.state.choice==='undecided')this.state.invitation=true;}
     }
    }
   }
   this.success();
  }catch(error){this.failure(error);}
  finally{this.busy=false;this.publish();if(this.state.enabled&&this.state.choice==='public'&&this.queue.size||this.retryAt>this.now())this.schedule(Math.max(250,this.retryAt-this.now()));}
 }
 private lastIncident=false;
 dispose(){this.disposed=true;clearTimeout(this.timer);clearInterval(this.polling);this.unsubscribe?.();this.listeners.clear();}
}
