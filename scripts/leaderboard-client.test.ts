import {test} from 'node:test';
import assert from 'node:assert/strict';
import {anonymousName} from '../web/scoreboards.ts';
import {LeaderboardClient} from '../web/leaderboard-client.ts';
import {participationKey,publicationReceipt,type PersonalStanding,type LeaderboardReceipt} from '../web/leaderboard-model.ts';
import {EnterpriseScoringService,netPoints,scoringStorageKey} from '../web/scoring-service.ts';
import {makeScore} from './leaderboard-fixtures.ts';
import {auditLeaderboardReceipt} from '../deploy/leaderboard-audit.ts';

class Storage {data=new Map<string,string>();getItem(k:string){return this.data.get(k)||null;}setItem(k:string,v:string){this.data.set(k,v);}}
function server(){
 const calls:{path:string;method:string;body:any}[]=[];
 let personal:PersonalStanding={participating:false,name:'',entry:null,asOf:new Date().toISOString(),enabled:true,sitekey:'test'};
 const send:typeof fetch=async(input,options)=>{
  const path=String(input).replace('/api/high-scores',''),method=options?.method||'GET',body=options?.body?JSON.parse(String(options.body)):undefined;calls.push({path,method,body});
  if(path==='/me'){if(method==='PUT')personal={...personal,participating:true,name:body.anonymous?anonymousName:body.name};if(method==='DELETE')personal={...personal,participating:true,name:anonymousName,entry:personal.entry?{...personal.entry,name:anonymousName}:null};return Response.json(personal);}
  if(path.startsWith('?'))return Response.json({entries:[],offset:0,limit:50,total:0,cutoff:null,enabled:true,sitekey:'test',asOf:personal.asOf});
  if(path==='/check')return Response.json({qualifies:true,rank:1,score:String(netPoints(body.run)),runId:body.run.id,sequence:body.sequence,asOf:personal.asOf});
  if(path.startsWith('/runs/')){const r=body as LeaderboardReceipt;personal={...personal,entry:{id:'owner',name:personal.name,rank:1,runId:r.run.id,score:String(netPoints(r.run)),through:r.run.verification.through,mandate:r.run.verification.mandate,status:r.run.status,rules:r.run.rules,identity:r.run.identity,conditions:r.run.conditions,attainedAt:personal.asOf,updatedAt:personal.asOf,stale:false}};return Response.json({...personal,acceptedSequence:r.sequence,runId:r.run.id});}
  throw Error('Unexpected path '+path);
 };
 return {send,calls,personal:()=>personal};
}
const settle=()=>new Promise(resolve=>setTimeout(resolve,20));
test('a qualifying run invites once; declining records scores anonymously and remembers the choice',async()=>{
 const api=server(),storage=new Storage(),client=new LeaderboardClient(api.send,storage,()=>100000,()=>true);client.setVerification(async()=>'test-token');
 try{await client.start();client.attach(await makeScore(15,'1000'));await settle();await client.flush();assert.equal(client.state.invitation,true);assert.ok(api.calls.some(c=>c.path.startsWith('/runs/')));client.decline();await client.flush();assert.equal(client.state.invitation,false);assert.equal(storage.getItem(participationKey),'anonymous');assert.equal(api.personal().name,anonymousName);}finally{client.dispose();}
});
test('remembered participation coalesces live receipts and publishes a terminal result immediately',async()=>{
 const api=server(),storage=new Storage();let now=100000;const client=new LeaderboardClient(api.send,storage,()=>now,()=>true);
 try{await client.start();await client.enroll('Live Clerk','token');const service=await makeScore(15,'1000');client.attach(service);await settle();await client.flush();assert.equal(api.calls.filter(c=>c.path.startsWith('/runs/')).length,1);
  for(let i=0;i<10;i++)service.inspect('evidence','e'+i);await client.flush();assert.equal(api.calls.filter(c=>c.path.startsWith('/runs/')).length,1);now+=5000;await client.flush();assert.equal(api.calls.filter(c=>c.path.startsWith('/runs/')).length,2);
  service.finish('stopped');await client.flush();assert.equal(api.personal().entry?.status,'stopped');assert.equal(api.personal().entry?.score,String(netPoints(service.snapshot().current!)));
 }finally{client.dispose();}
});
test('failed synchronization retains the last confirmed rank and sends losses after reconnect',async()=>{
 const api=server();let offline=false,now=100000;const client=new LeaderboardClient(async(...args)=>{if(offline)throw Error('Offline');return api.send(...args);},new Storage(),()=>now,()=>true);
 try{await client.start();await client.enroll('Heist Clerk','token');const service=await makeScore(100,'1000');client.attach(service);await settle();await client.flush();const previous=client.state.personal?.entry?.score;
  offline=true;service.startIncident('heist','1','99','Common');service.incidentWork('1',{heistCase:1});service.advanceHeist('1',15000,'automatic');now+=5000;await client.flush();assert.equal(client.state.stale,true);assert.equal(client.state.personal?.entry?.score,previous);
  offline=false;now+=60000;await client.flush();assert.equal(client.state.stale,false);assert.equal(client.state.personal?.entry?.score,String(netPoints(service.snapshot().current!)));assert.ok(BigInt(client.state.personal!.entry!.score)<BigInt(previous!));
 }finally{client.dispose();}
});
test('withdrawal cannot be undone by an earlier in-flight score response',async()=>{
 const api=server();let release!:(r:Response)=>void;let held=false;const client=new LeaderboardClient(async(input,options)=>{const response=await api.send(input,options);if(String(input).includes('/runs/')&&held)return new Promise(resolve=>{release=()=>resolve(response);});return response;},new Storage(),()=>100000,()=>true);
 try{await client.start();await client.enroll('Withdraw Clerk','token');held=true;client.attach(await makeScore(15,'1000'));const pending=client.flush();await settle();await client.withdraw();release(new Response());await pending;assert.equal(client.state.choice,'anonymous');assert.equal(client.state.personal?.participating,true);assert.equal(client.state.personal?.name,anonymousName);}finally{client.dispose();}
});
test('a final receipt preempts a pending five-second update timer',async()=>{
 const api=server();let now=100000;const client=new LeaderboardClient(api.send,new Storage(),()=>now,()=>true);
 try{await client.start();await client.enroll('Immediate Clerk','token');const service=await makeScore(15,'1000');client.attach(service);await settle();await client.flush();
  now+=100;service.inspect('department','publication');await client.flush();service.finish('stopped');await settle();
  assert.equal(api.personal().entry?.status,'stopped');assert.equal(api.personal().entry?.score,String(netPoints(service.snapshot().current!)));
 }finally{client.dispose();}
});
test('rapid later mandates and reload preserve an earlier published run’s pending heist loss',async()=>{
 for(const crashed of [false,true]){
 const api=server(),storage=new Storage();let offline=false,now=100000;
 const send:typeof fetch=async(...args)=>{if(offline)throw Error('Offline');return api.send(...args);};
 let client=new LeaderboardClient(send,storage,()=>now,()=>true);
 let earlier:LeaderboardReceipt;
 try{await client.start();await client.enroll('Patient Clerk','token');let service=await makeScore(100,'1000');client.attach(service);await settle();await client.flush();
  offline=true;service.startIncident('heist','1','99','Common');service.incidentWork('1',{heistCase:1});service.advanceHeist('1',14000);
  if(crashed){storage.setItem(scoringStorageKey,JSON.stringify(service.snapshot()));client.dispose();service=new EnterpriseScoringService(storage);client=new LeaderboardClient(send,storage,()=>now,()=>true);client.attach(service);}
  else service.finish('stopped');
  earlier=publicationReceipt(service.snapshot().current!)!;
  // More than the scoring service's two retained runs pass before connectivity returns.
  for(const count of [150,160,170]){service.begin(String(count),'factor-resonance-v1',{companions:'false'});service.receive({start:'1',end:String(count),global:{},cycles:{},closing:{},complete:true});await service.disclose('1',Array.from({length:count},(_,i)=>{const n=i+1;return n%15===0?'FizzBuzz':n%3===0?'Fizz':n%5===0?'Buzz':String(n);}),undefined,async()=>[]);service.finish('completed');}
  now+=5000;await client.flush();assert.equal(client.state.stale,true);
 }finally{client.dispose();}
 offline=false;now+=60000;const restored=new LeaderboardClient(send,storage,()=>now,()=>true);
 try{await restored.start();for(let i=0;i<6;i++){await restored.flush();await settle();}
  const filed=api.calls.filter(c=>c.path==='/runs/'+earlier!.run.id&&c.body.run.status===earlier!.run.status).at(-1)?.body as LeaderboardReceipt|undefined;
  assert(filed);auditLeaderboardReceipt(filed);assert.equal(filed.sequence,earlier!.sequence);assert.equal(String(netPoints(filed.run)),String(netPoints(earlier!.run)));
  for(const mandate of ['150','160','170'])assert(api.calls.some(c=>c.path.startsWith('/runs/')&&c.body.run.verification.mandate===mandate&&c.body.run.status==='completed'));
 }finally{restored.dispose();}
 }
});

test('a stale personal refresh cannot undo the choice to become anonymous',async()=>{
 const api=server();let hold=false,release!:()=>void;const client=new LeaderboardClient(async(input,options)=>{const response=await api.send(input,options);if(hold&&String(input).endsWith('/me')&&(!options?.method||options.method==='GET'))await new Promise<void>(resolve=>{release=resolve;});return response;},new Storage(),()=>100000,()=>true);
 try{await client.start();await client.enroll('Prior Name','test');hold=true;const refresh=client.refresh();await settle();await client.withdraw();release();await refresh;assert.equal(client.state.personal?.name,anonymousName);assert.equal(client.state.choice,'anonymous');}finally{client.dispose();}
});

test('storage-full warnings survive successful network exchanges',async()=>{
 const api=server(),storage=new Storage();storage.setItem=(key,value)=>{if(key.includes('pending'))throw Error('Quota exceeded');storage.data.set(key,value);};const client=new LeaderboardClient(api.send,storage,()=>100000,()=>true);
 try{await client.start();await client.enroll('Storage Clerk','test');client.attach(await makeScore(15,'1000'));await settle();await client.flush();assert.equal(client.state.stale,false);assert.match(client.state.error,/browser storage is full/);}finally{client.dispose();}
});
