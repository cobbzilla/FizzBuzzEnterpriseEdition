import {test} from 'node:test';
import assert from 'node:assert/strict';
import {bestiary,catalogVersion,type Rarity} from '../catalog/bestiary.ts';
import type {Discovery} from '../web/discovery-model.ts';
import {PortfolioRun,newPortfolio,portfolioPoints,appointmentCount,decodePortfolio,compactPoints,exactPoints,portfolioStorageKey,type PortfolioReceipt} from '../web/portfolio-model.ts';
import {PortfolioStore} from '../web/portfolio-store.ts';

const now='2026-11-18T12:00:00.000Z',policy='factor-resonance-v1',other='ordinal-constellation-v1';
const lines=(start:number,count:number)=>Array.from({length:count},(_,i)=>{const n=start+i;return n%15===0?'FizzBuzz':n%3===0?'Fizz':n%5===0?'Buzz':String(n);});
function find(ordinal:number,rarity:Rarity='Common',mandate='1000000',strategy=policy):Discovery {
 const companion=Object.values(bestiary).find(c=>c.rarity===rarity)!;
 return {companion,assignment:{ordinal:String(ordinal),flavor:ordinal%15===0?'FizzBuzz':ordinal%3===0?'Fizz':'Buzz',companionId:companion.id,ticket:42,factors:{factors:'3',cofactor:'1',complete:true,divisions:1,divisionBudget:128,trialPrimeCeiling:97}},mandate,strategy,catalogVersion,seedPolicy:'mandate-v1',discoveredAt:now};
}
function evidence(start:number,count:number,rarity:Rarity='Common',mandate='1000000',strategy=policy){return lines(start,count).flatMap((line,i)=>/^Fizz|^Buzz/.test(line)?[find(start+i,rarity,mandate,strategy)]:[]);}
const fresh=(mandate='1000000')=>new PortfolioRun(newPortfolio('test-run',mandate,policy,now));
class MemoryStorage {
 values=new Map<string,string>();getItem(key:string){return this.values.get(key)??null;}setItem(key:string,value:string){this.values.set(key,value);}
}
for(const [rarity,points]of [['Common',10n],['Uncommon',25n],['Rare',100n],['Legendary',400n],['Mythic',1000n]] as const){
 test(`${rarity} repeat appearances each earn ${points} points with no diminishing returns`,()=>{
  const run=fresh();run.disclose('1',lines(1,15),policy,evidence(1,15,rarity),now);const r=run.snapshot();
  assert.equal(appointmentCount(r),7n);assert.equal(portfolioPoints(r),7n*points);assert.equal(r.seen.length,1);assert.equal(r.highest?.rarity,rarity);assert.ok(decodePortfolio(r));
 });
}
test('numeric lines pay nothing, and FizzBuzz and a paired companion each pay once',()=>{
 const run=fresh();run.disclose('1',lines(1,2),policy,[],now);assert.equal(portfolioPoints(run.snapshot()),0n);
 const pair=Object.values(bestiary).find(c=>c.kind==='pair'&&c.rarity==='Common')!,finds=evidence(3,13).map(d=>({...d,companion:pair,assignment:{...d.assignment,companionId:pair.id}}));
 run.disclose('3',lines(3,13),policy,finds,now);assert.equal(portfolioPoints(run.snapshot()),70n);assert.equal(run.snapshot().seen.length,1);
});
test('mixed tiers pay only their fixed rates, without attendance or diversity bonuses',()=>{
 const run=fresh(),finds=evidence(1,100);finds[0]=find(3,'Rare');finds[1]=find(5,'Uncommon');
 run.disclose('1',lines(1,100),policy,finds,now);assert.equal(appointmentCount(run.snapshot()),47n);assert.equal(portfolioPoints(run.snapshot()),575n);
});
test('same disclosed ordinals, historical replay and reassignment cannot pay again',()=>{
 const run=fresh();run.disclose('1',lines(1,15),policy,evidence(1,15),now);const before=run.snapshot();
 assert.equal(run.disclose('1',lines(1,15),other,evidence(1,15,'Mythic','1000000',other),now),false);assert.deepEqual(run.snapshot(),before);
});
test('authority changes affect future appointments and retain previous payments',()=>{
 const run=fresh();run.disclose('1',lines(1,15),policy,evidence(1,15),now);run.disclose('16',lines(16,15),other,evidence(16,15,'Rare','1000000',other),now);
 const r=run.snapshot();assert.equal(portfolioPoints(r),770n);assert.equal(r.authorityChanges,'1');assert.deepEqual(r.authorities,{[policy]:'7',[other]:'7'});assert.ok(decodePortfolio(r));
});
test('disabled companions advance custody without creating retroactive appointments',()=>{
 const run=fresh();run.disclose('1',lines(1,15),undefined,[],now);run.disclose('16',lines(16,15),policy,evidence(16,15),now);
 assert.equal(run.snapshot().disabled,'7');assert.equal(portfolioPoints(run.snapshot()),70n);assert.equal(run.disclose('1',lines(1,15),policy,evidence(1,15),now),false);assert.ok(decodePortfolio(run.snapshot()));
});
test('unavailable scoring evidence is explicit, bounded and does not invent points',()=>{
 const run=fresh();run.disclose('1',lines(1,15),policy,[],now,true);run.disclose('16',lines(16,15),policy,evidence(16,15),now);
 assert.equal(run.snapshot().unscored,'7');assert.equal(portfolioPoints(run.snapshot()),70n);assert.ok(decodePortfolio(run.snapshot()));
});
test('incomplete, duplicate, foreign and malformed evidence cannot partly credit a batch',()=>{
 const good=evidence(1,15),variants=[good.slice(1),[good[0],...good.slice(0,-1)],good.map(d=>({...d,mandate:'15'})),good.map(d=>({...d,strategy:other})),good.map(d=>({...d,assignment:{...d.assignment,ticket:-1}})),good.map((d,i)=>({...d,catalogVersion:i?'different':catalogVersion}))];
 for(const invalid of variants){const run=fresh(),before=run.snapshot();assert.throws(()=>run.disclose('1',lines(1,15),policy,invalid,now));assert.deepEqual(run.snapshot(),before);}
});
test('gaps, overlapping ranges, unauthorized numbers and incorrect output fail atomically',()=>{
 for(const [start,output]of [['2',lines(2,15)],['1',['1','2','WRONG']]] as const){const run=fresh();assert.throws(()=>run.disclose(start,output,policy,[],now));assert.equal(run.snapshot().through,'0');}
 const run=fresh('15');assert.throws(()=>run.disclose('1',lines(1,16),policy,evidence(1,16,'Common','15'),now));run.disclose('1',lines(1,15),policy,evidence(1,15,'Common','15'),now);assert.throws(()=>run.disclose('15',lines(15,2),policy,[],now));
});
test('disclosure cadence and chunk sizes cannot change the total',()=>{
 const slow=fresh(),fast=fresh();for(let i=1;i<=150;i++)slow.disclose(String(i),lines(i,1),policy,evidence(i,1),now);fast.disclose('1',lines(1,150),policy,evidence(1,150),now);
 assert.deepEqual(slow.snapshot(),fast.snapshot());assert.equal(portfolioPoints(fast.snapshot()),700n);
});
test('long runs retain counts and a catalog set instead of an ordinal ledger',()=>{
 const run=fresh();for(let i=1;i<=15000;i+=100)run.disclose(String(i),lines(i,100),policy,evidence(i,100),now);
 const r=run.snapshot();assert.equal(r.through,'15000');assert.equal(appointmentCount(r),7000n);assert.equal(portfolioPoints(r),70000n);assert.equal(r.seen.length,1);assert.ok(JSON.stringify(r).length<1500);assert.ok(decodePortfolio(r));
});
test('arbitrarily large totals survive serialization and another appointment exactly',()=>{
 const k=10n**80n,receipt=newPortfolio('enormous',String(15n*k+3n),policy,now),d=find(3);
 Object.assign(receipt,{through:String(15n*k),catalogVersion,counts:{Common:String(7n*k),Uncommon:'0',Rare:'0',Legendary:'0',Mythic:'0'},seen:[d.companion.id],highest:{id:d.companion.id,name:d.companion.name,emoji:d.companion.emoji,rarity:'Common',ordinal:'3'},authorities:{[policy]:String(7n*k)}});
 const decoded=decodePortfolio(JSON.parse(JSON.stringify(receipt)))!;assert.ok(decoded);const run=new PortfolioRun(decoded),start=15n*k+1n,ordinal=start+2n;
 run.disclose(String(start),[String(start),String(start+1n),'Fizz'],policy,[{...d,mandate:receipt.mandate,assignment:{...d.assignment,ordinal:String(ordinal)}}],now);
 assert.equal(portfolioPoints(run.snapshot()),70n*k+10n);assert.ok(decodePortfolio(run.snapshot()));
});
test('compact display never rounds through unsafe floating-point numbers',()=>{
 assert.equal(compactPoints(999999n),'999,999');assert.equal(compactPoints(1234567n),'1.23M');assert.equal(compactPoints(999999999999999999999999999999999999n),'999.99 × 10^33');assert.equal(exactPoints(9007199254740993n),'9,007,199,254,740,993');
});
test('stored receipts reject bad totals, incompatible rules and unbounded distinct inventories',()=>{
 const run=fresh();run.disclose('1',lines(1,15),policy,evidence(1,15),now);const r=run.snapshot();
 for(const patch of [{rules:'future'},{through:'2'},{counts:{...r.counts,Common:'-1'}},{counts:{...r.counts,Common:'8'}},{seen:['same','same']},{seen:Array.from({length:3201},(_,i)=>String(i))},{authorities:{[policy]:'8'}},{highest:undefined},{updatedAt:'yesterday'},{mandate:'Infinity'}])assert.equal(decodePortfolio({...r,...patch}),undefined);
 for(const value of [null,[],{},'garbage'])assert.equal(decodePortfolio(value),undefined);
});
test('snapshots do not expose mutable internal score custody',()=>{
 const run=fresh();const copy=run.snapshot();copy.counts.Common='1000';copy.seen.push('injected');assert.equal(portfolioPoints(run.snapshot()),0n);assert.equal(run.snapshot().seen.length,0);
});
test('points are banked immediately and Stop does not withdraw them',async()=>{
 const storage=new MemoryStorage(),store=new PortfolioStore(storage,()=>now,()=> 'one');store.begin('15',policy);await store.disclose('1',lines(1,15),policy,async()=>evidence(1,15,'Common','15'));
 assert.equal(portfolioPoints(new PortfolioStore(storage).snapshot().current!),70n);store.finish('stopped');assert.equal(store.snapshot().current?.status,'stopped');assert.equal(portfolioPoints(store.snapshot().current!),70n);
 await store.disclose('16',lines(16,15),policy,async()=>{throw Error('Replay must not request scoring evidence');});assert.equal(portfolioPoints(store.snapshot().current!),70n);
});
test('a replacement banks the old score and a fresh cached mandate earns independently',async()=>{
 const store=new PortfolioStore(new MemoryStorage(),()=>now,()=>crypto.randomUUID());store.begin('15',policy);await store.disclose('1',lines(1,15),policy,async()=>evidence(1,15,'Common','15'));const oldId=store.snapshot().current!.id;
 store.begin('15',policy);assert.equal(portfolioPoints(store.snapshot().current!),0n);assert.equal(portfolioPoints(store.snapshot().saved!),70n);assert.equal(store.snapshot().saved?.status,'replaced');assert.notEqual(store.snapshot().current!.id,oldId);
 await store.disclose('1',lines(1,15),policy,async()=>evidence(1,15,'Common','15'));assert.equal(portfolioPoints(store.snapshot().current!),70n);
});
test('late replies remain with their original run after replacement',async()=>{
 const store=new PortfolioStore(new MemoryStorage(),()=>now,()=>crypto.randomUUID());store.begin('15',policy);let deliver!:(value:Discovery[])=>void;
 const pending=store.disclose('1',lines(1,15),policy,()=>new Promise(resolve=>{deliver=resolve;}));store.begin('30',policy);deliver(evidence(1,15,'Mythic','15'));await pending;
 assert.equal(portfolioPoints(store.snapshot().current!),0n);assert.equal(portfolioPoints(store.snapshot().saved!),7000n);assert.equal(store.snapshot().saved!.status,'replaced');
});
test('late replies after Stop finish payment for already disclosed appointments',async()=>{
 const store=new PortfolioStore(new MemoryStorage(),()=>now);store.begin('15',policy);let deliver!:(value:Discovery[])=>void;
 const pending=store.disclose('1',lines(1,15),policy,()=>new Promise(resolve=>{deliver=resolve;}));store.finish('stopped');deliver(evidence(1,15,'Rare','15'));await pending;assert.equal(portfolioPoints(store.snapshot().current!),700n);assert.equal(store.snapshot().current!.status,'stopped');
});
test('an assignment failure preserves numerical custody and a truthful partial result',async()=>{
 const store=new PortfolioStore(new MemoryStorage(),()=>now);store.begin('30',policy);await store.disclose('1',lines(1,15),policy,async()=>{throw Error('Offline desk unavailable');});await store.disclose('16',lines(16,15),policy,async()=>evidence(16,15,'Common','30'));
 const r=store.snapshot().current!;assert.equal(r.through,'30');assert.equal(r.unscored,'7');assert.equal(portfolioPoints(r),70n);assert.ok(decodePortfolio(r));
});
test('disabled appointments never ask Java for scoring evidence',async()=>{
 const store=new PortfolioStore(new MemoryStorage(),()=>now);store.begin('15',policy);await store.disclose('1',lines(1,15),undefined,async()=>{assert.fail('Disabled scorer must not load appointments');});assert.equal(store.snapshot().current!.disabled,'7');
});
test('reload restores a banked result without resuming or replaying its score',async()=>{
 const storage=new MemoryStorage(),store=new PortfolioStore(storage,()=>now);store.begin('15',policy);await store.disclose('1',lines(1,15),policy,async()=>evidence(1,15,'Common','15'));const restored=new PortfolioStore(storage,()=>now);
 assert.equal(restored.snapshot().current!.status,'interrupted');await restored.disclose('1',lines(1,15),policy,async()=>evidence(1,15,'Mythic','15'));assert.equal(portfolioPoints(restored.snapshot().current!),70n);
});
test('blocked or exhausted browser storage does not prevent in-memory scoring',async()=>{
 for(const storage of [undefined,{getItem(){throw Error('denied');},setItem(){throw Error('full');}}]){const store=new PortfolioStore(storage,()=>now);store.begin('15',policy);await store.disclose('1',lines(1,15),policy,async()=>evidence(1,15,'Common','15'));assert.equal(store.snapshot().persistent,false);assert.equal(portfolioPoints(store.snapshot().current!),70n);}
});
test('malformed persistence is ignored, and retained run count stays bounded',async()=>{
 const storage=new MemoryStorage();storage.setItem(portfolioStorageKey,'{');const store=new PortfolioStore(storage,()=>now);assert.equal(store.snapshot().current,undefined);
 for(let i=0;i<20;i++){store.begin('15',policy);await store.disclose('1',lines(1,15),policy,async()=>evidence(1,15,'Common','15'));store.finish('completed');}
 const saved=JSON.parse(storage.getItem(portfolioStorageKey)!);assert.deepEqual(Object.keys(saved).sort(),['current','saved','schema']);assert.equal(storage.values.size,1);assert.ok(storage.getItem(portfolioStorageKey)!.length<3000);
});
