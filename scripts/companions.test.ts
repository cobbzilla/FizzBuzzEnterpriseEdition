import {test} from 'node:test';import assert from 'node:assert/strict';
import {bestiary,catalogVersion,rarities} from '../catalog/bestiary.ts';import {symbols} from '../catalog/symbols.ts';import {eligibleEmoji} from './emoji-provenance.ts';import {generateCompanions} from './generate-companions.ts';
const entries=Object.values(bestiary);
test('three thousand two hundred distinct nonhuman colleagues have complete and unique dossiers',()=>{
 assert.equal(entries.length,3200);assert.deepEqual(entries.filter(c=>c.kind==='single').map(c=>c.emoji),eligibleEmoji().map(c=>c.emoji));assert.equal(new Set(entries.map(c=>c.id)).size,3200);assert.equal(new Set(entries.map(c=>c.emoji)).size,3200);assert.equal(new Set(entries.map(c=>c.backstory)).size,3200);assert.equal(new Set(entries.map(c=>c.goal)).size,3200);assert.ok(Object.isFrozen(bestiary));
 const allowed=new Set<string>(symbols.map(s=>s.emoji));assert.equal(entries.filter(c=>c.kind==='single').length,1364);assert.equal(entries.filter(c=>c.kind==='pair').length,1836);
 for(const c of entries){assert.ok(c.components.every(part=>allowed.has(part)));assert.equal(c.components.length,c.kind==='single'?1:2);assert.ok(Object.isFrozen(c));for(const field of ['id','name','category','personality','backstory','energy','goal'] as const)assert.ok(c[field].length>0,c.name+' '+field);assert.ok(c.backstory.length>30,c.name);assert.ok(c.goal.length>15,c.name);}
});
test('the positive integer weights exactly honour the billion-ticket inequality charter',()=>{
 assert.equal(entries.reduce((s,c)=>s+c.weight,0),1e9);const count=[320,1920,800,128,32],budget=[800000000,190000000,9990000,9472,528];
 rarities.forEach((rarity,i)=>{const tier=entries.filter(c=>c.rarity===rarity);assert.equal(tier.length,count[i]);assert.equal(tier.reduce((s,c)=>s+c.weight,0),budget[i]);});
 const myths=entries.filter(c=>c.rarity==='Mythic').sort((a,b)=>a.weight-b.weight);assert.deepEqual(myths.map(c=>c.weight),Array.from({length:32},(_,i)=>i+1));assert.equal(myths[0].name,'unicorn');assert.ok(myths.every(c=>c.weight<1000));for(const c of entries)assert.ok(Number.isInteger(c.weight)&&c.weight>0);
});
test('people, faces, gestures and skin-tone padding cannot enter the admitted inventory',()=>{
 assert.ok(symbols.every(c=>!['People & Body','Component'].includes(c.group)));for(const c of symbols){assert.ok(!/\b(person|woman |man |face|hand|dolls|silhouette|Statue of Liberty|moai)\b/.test(c.name)||['monkey face','dog face','cat face','tiger face','horse face','cow face','pig face','mouse face','rabbit face','dragon face','folding hand fan'].includes(c.name),c.name);assert.ok(!/1F3F[B-F]/.test(c.code));}
});
test('the eleven singular Mythics cannot sneak into common paired appointments',()=>{const mythicGlyphs=new Set(entries.filter(c=>c.kind==='single'&&c.rarity==='Mythic').map(c=>c.emoji));for(const c of entries.filter(c=>c.kind==='pair'))assert.ok(c.components.every(part=>!mythicGlyphs.has(part)),c.name);});

test('the emitted portable Java sources match the canonical TypeScript constant',async()=>{assert.equal(catalogVersion,'nonhuman-18.0-v1');assert.equal(await generateCompanions(true),3200);});

// A distinct little register is intentionally independent of the numerical audit database.
import {rarestDiscoveries,decodeDiscoveries,encodeDiscoveries,discoveryLink,validDiscovery,type Discovery} from '../web/discovery-model.ts';
import {createDiscoveryStore,provisionalDiscoveryPrefix} from '../web/discovery-store.ts';
import {companionFlight} from '../web/companion-flight.ts';
function find(index:number,mandate='9007199254740993'):Discovery{return {companion:entries[index],assignment:{ordinal:'3',flavor:'Fizz',companionId:entries[index].id,ticket:42,factors:{factors:'3',cofactor:'1',complete:true,divisions:1,divisionBudget:128,trialPrimeCeiling:97}},mandate,strategy:'factor-resonance-v1',catalogVersion,seedPolicy:'mandate-v1',discoveredAt:'2026-11-03T00:00:00.000Z'};}
test('rarest five distinct findings converge across order, repeated encounters and concurrent tabs',()=>{
 const candidates=entries.map((_,i)=>find(i)),all=rarestDiscoveries(candidates),left=rarestDiscoveries(candidates.slice(0,1600)),right=rarestDiscoveries(candidates.slice(1600));assert.equal(all.length,5);assert.equal(all[0].companion.name,'unicorn');assert.deepEqual(all.map(d=>d.companion.weight),[1,2,3,4,5]);assert.deepEqual(rarestDiscoveries(left,right),all);assert.deepEqual(rarestDiscoveries(right,left,all,all),all);
 const late={...all[0],mandate:'100',discoveredAt:'2026-11-04T00:00:00.000Z'};assert.deepEqual(rarestDiscoveries([late],all),all);
});
test('discovery persistence retains full dossiers and rejects malformed or incompatible evidence',()=>{
 const d=find(0);assert.ok(validDiscovery(d));assert.deepEqual(decodeDiscoveries(encodeDiscoveries([d])),[d]);for(const raw of ['null','{','[]','{"schema":"old","finds":[]}'])assert.deepEqual(decodeDiscoveries(raw),[]);
 for(const patch of [{mandate:'2'},{mandate:'-1'},{seedPolicy:'future'},{companion:{...d.companion,weight:0}},{assignment:{...d.assignment,flavor:'Buzz'}},{assignment:{...d.assignment,ticket:1e9}},{discoveredAt:'yesterday'}])assert.equal(validDiscovery({...d,...patch}),false);
});
test('share links retain exact magnitude and deployment base without executing a mandate',()=>{const d=find(0,'1'+'0'.repeat(1000)),url=new URL(discoveryLink(d,'https://example.com/enterprise/'));assert.equal(url.pathname,'/enterprise/demo/');assert.equal(url.searchParams.get('limit'),d.mandate);assert.equal(url.searchParams.get('ordinal'),'3');assert.equal(url.searchParams.get('companion'),d.companion.id);assert.equal(url.searchParams.get('seedPolicy'),'mandate-v1');});

class RegisterStorage implements Storage {
 private data=new Map<string,string>();get length(){return this.data.size;}key(index:number){return [...this.data.keys()][index]??null;}getItem(key:string){return this.data.get(key)??null;}setItem(key:string,value:string){this.data.set(key,value);}removeItem(key:string){this.data.delete(key);}clear(){this.data.clear();}
}
test('withdrawing one run restores the five completed finds it displaced in every reading tab',()=>{
 const storage=new RegisterStorage(),owner=createDiscoveryStore(storage),reader=createDiscoveryStore(storage),baseline=rarestDiscoveries(entries.filter(c=>c.rarity==='Common').slice(0,5).map(c=>find(entries.indexOf(c)))),rarities=entries.filter(c=>c.rarity==='Mythic').slice(0,5).map(c=>find(entries.indexOf(c)));
 owner.remember(baseline);reader.reconcile();const run=owner.beginRun();run.remember(rarities);reader.reconcile();assert.deepEqual(reader.snapshot(),rarestDiscoveries(rarities));let departed:readonly Discovery[]=[];reader.subscribe(change=>departed=change.departed);
 run.withdraw();reader.reconcile(true);assert.deepEqual(owner.snapshot(),baseline);assert.deepEqual(reader.snapshot(),baseline);assert.equal(departed.length,5);reader.remember([baseline[0]]);owner.reconcile();assert.deepEqual(owner.snapshot(),baseline);assert.ok(![...Array(storage.length)].some((_,i)=>storage.key(i)?.startsWith(provisionalDiscoveryPrefix)));
});
test('one run cannot withdraw another run’s finds or a previously completed encounter',()=>{
 const storage=new RegisterStorage(),a=createDiscoveryStore(storage),b=createDiscoveryStore(storage),known=find(0);a.remember([known]);const first=a.beginRun(),second=b.beginRun();first.remember([known,find(100)]);second.remember([find(100)]);first.withdraw();b.reconcile(true);assert.equal(b.snapshot().length,2);second.complete();a.reconcile();assert.equal(a.snapshot().length,2);assert.ok(a.snapshot().some(d=>d.companion.id===known.companion.id));
});
test('late companion replies are admitted after completion and permanently refused after withdrawal',()=>{
 const store=createDiscoveryStore(new RegisterStorage()),aborted=store.beginRun();aborted.remember([find(0)]);aborted.withdraw();aborted.remember([find(1)]);aborted.complete();assert.equal(store.snapshot().length,0);
 const complete=store.beginRun();complete.remember([find(2)]);complete.complete();complete.remember([find(3)]);complete.withdraw();assert.equal(store.snapshot().length,2);
});
test('ordinary page departure settles owned receipts while keeping other pages’ runs provisional',()=>{
 const storage=new RegisterStorage(),a=createDiscoveryStore(storage),b=createDiscoveryStore(storage),first=a.beginRun(),second=b.beginRun();first.remember([find(0)]);second.remember([find(1)]);a.settleAll();second.withdraw();a.reconcile(true);assert.deepEqual(a.snapshot(),[find(0)]);
});
test('session-only finds retain withdrawal and completion semantics when storage is unavailable',()=>{
 const store=createDiscoveryStore();store.remember([find(0)]);const run=store.beginRun();run.remember([find(1)]);assert.equal(store.snapshot().length,2);assert.equal(store.persistent(),false);run.withdraw();assert.deepEqual(store.snapshot(),[find(0)]);
});

test('withdrawal retires the old appointment without retiring a later encounter with the same companion',()=>{
 const storage=new RegisterStorage(),store=createDiscoveryStore(storage),old=store.beginRun();old.remember([find(0)]);old.withdraw();assert.equal(store.snapshot().length,0);
 const fresh={...find(0,'300'),discoveredAt:'2026-11-06T12:00:00.000Z'},replacement=store.beginRun();replacement.remember([fresh]);old.remember([find(0)]);old.complete();assert.deepEqual(store.snapshot(),[fresh]);
 replacement.withdraw();assert.deepEqual(store.snapshot(),[]);assert.equal(storage.length,0);
});
test('departure trajectories last four to ten seconds and exit through the admitted upper perimeter',()=>{
 let seed=48271;const random=()=>((seed=seed*16807%2147483647)-1)/2147483646;const durations=new Set<number>(),edges=new Set<string>();
 for(let i=0;i<500;i++){
  const plan=companionFlight({x:160,y:600},{width:320,height:667},random);assert.ok(plan.duration>=4000&&plan.duration<=10000);durations.add(plan.duration);
  assert.ok(plan.target.y<0||((plan.target.x<0||plan.target.x>320)&&plan.target.y>=0&&plan.target.y<=667*.2));edges.add(plan.target.y<0?'top':plan.target.x<0?'left':'right');
  assert.equal(plan.frames[0].offset,0);assert.equal(plan.frames.at(-1)!.offset,1);assert.equal(plan.frames.at(-1)!.opacity,0);assert.ok(plan.frames.filter(frame=>Number(frame.offset)<.9).every(frame=>frame.opacity===1));assert.ok(plan.frames.every(frame=>!String(frame.transform).includes('NaN')));
 }
 assert.equal(durations.size,500);assert.deepEqual([...edges].sort(),['left','right','top']);
});
test('departure lift includes a springy rebound and neither boundary duration is shortened',()=>{
 assert.equal(companionFlight({x:400,y:500},{width:800,height:800},()=>0).duration,4000);assert.equal(companionFlight({x:400,y:500},{width:800,height:800},()=>1).duration,10000);
 const plan=companionFlight({x:400,y:500},{width:800,height:800},()=>.5),heights=plan.frames.map(frame=>Number(String(frame.transform).match(/translate\([^,]+,([^p]+)px/)![1]));assert.ok(heights.some(height=>height>0));assert.ok(heights.at(-1)!< -400);
});
