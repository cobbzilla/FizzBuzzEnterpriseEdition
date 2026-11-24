import {test} from 'node:test';
import assert from 'node:assert/strict';
import {LeaderboardClient} from '../web/leaderboard-client.ts';
import {participationKey,type PersonalStanding,type LeaderboardReceipt} from '../web/leaderboard-model.ts';
import {netPoints} from '../web/scoring-service.ts';
import {makeScore} from './leaderboard-fixtures.ts';

class Storage {data=new Map<string,string>();getItem(k:string){return this.data.get(k)||null;}setItem(k:string,v:string){this.data.set(k,v);}}
function server(){
 const calls:{path:string;method:string;body:any}[]=[];
 let personal:PersonalStanding={participating:false,name:'',entry:null,asOf:new Date().toISOString(),enabled:true,sitekey:'test'};
 const send:typeof fetch=async(input,options)=>{
  const path=String(input).replace('/api/high-scores',''),method=options?.method||'GET',body=options?.body?JSON.parse(String(options.body)):undefined;calls.push({path,method,body});
  if(path==='/me'){if(method==='PUT')personal={...personal,participating:true,name:body.name};if(method==='DELETE')personal={...personal,participating:false,name:'',entry:null};return Response.json(personal);}
  if(path.startsWith('?'))return Response.json({entries:[],offset:0,limit:50,total:0,cutoff:null,enabled:true,sitekey:'test',asOf:personal.asOf});
  if(path==='/check')return Response.json({qualifies:true,rank:1,score:String(netPoints(body.run)),runId:body.run.id,sequence:body.sequence,asOf:personal.asOf});
  if(path.startsWith('/runs/')){const r=body as LeaderboardReceipt;personal={...personal,entry:{id:'owner',name:personal.name,rank:1,runId:r.run.id,score:String(netPoints(r.run)),through:r.run.verification.through,mandate:r.run.verification.mandate,status:r.run.status,rules:r.run.rules,identity:r.run.identity,conditions:r.run.conditions,attainedAt:personal.asOf,updatedAt:personal.asOf,stale:false}};return Response.json({...personal,acceptedSequence:r.sequence,runId:r.run.id});}
  throw Error('Unexpected path '+path);
 };
 return {send,calls,personal:()=>personal};
}
const settle=()=>new Promise(resolve=>setTimeout(resolve,20));
test('a qualifying active run invites once; refusal persists and never uploads',async()=>{
 const api=server(),storage=new Storage(),client=new LeaderboardClient(api.send,storage,()=>100000,()=>true);
 try{await client.start();client.attach(await makeScore(15,'1000'));await client.flush();assert.equal(client.state.invitation,true);assert.equal(api.calls.some(c=>c.path.startsWith('/runs/')),false);client.decline();await client.flush();assert.equal(client.state.invitation,false);assert.equal(storage.getItem(participationKey),'private');}finally{client.dispose();}
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
 try{await client.start();await client.enroll('Withdraw Clerk','token');held=true;client.attach(await makeScore(15,'1000'));const pending=client.flush();await settle();await client.withdraw();release(new Response());await pending;assert.equal(client.state.choice,'private');assert.equal(client.state.personal?.participating,false);assert.equal(client.state.personal?.entry,null);}finally{client.dispose();}
});
