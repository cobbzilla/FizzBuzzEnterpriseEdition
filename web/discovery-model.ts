import type {Companion} from '../catalog/bestiary';
import type {Assignment} from './companions';
export const seedPolicy='mandate-v1';
export const discoveryStorageKey='slopbuzz:extraordinary-appointments:v1';
export interface Discovery {companion:Companion;assignment:Assignment;mandate:string;strategy:string;catalogVersion:string;seedPolicy:typeof seedPolicy;discoveredAt:string}
const decimal=(x:unknown):x is string=>typeof x==='string'&&/^(0|[1-9][0-9]*)$/.test(x);
const text=(x:unknown):x is string=>typeof x==='string'&&x.length>0;
export function validDiscovery(x:any):x is Discovery {
 if(!x||!decimal(x.mandate)||!text(x.strategy)||!text(x.catalogVersion)||x.seedPolicy!==seedPolicy||typeof x.discoveredAt!=='string'||!Number.isFinite(Date.parse(x.discoveredAt)))return false;
 const c=x.companion,a=x.assignment,f=a?.factors;
 if(!c||!['single','pair'].includes(c.kind)||!Array.isArray(c.components)||!c.components.every(text)||!['Common','Uncommon','Rare','Legendary','Mythic'].includes(c.rarity)||!Number.isSafeInteger(c.weight)||c.weight<1||c.weight>1e9)return false;
 if(!(['id','emoji','name','category','personality','backstory','energy','goal'] as const).every(key=>text(c[key])))return false;
 if(!a||!decimal(a.ordinal)||a.ordinal==='0'||BigInt(a.ordinal)>BigInt(x.mandate)||!['Fizz','Buzz','FizzBuzz'].includes(a.flavor)||a.companionId!==c.id||!Number.isSafeInteger(a.ticket)||a.ticket<0||a.ticket>=1e9)return false;
 const n=BigInt(a.ordinal),flavor=n%15n===0n?'FizzBuzz':n%3n===0n?'Fizz':n%5n===0n?'Buzz':'';
 return flavor===a.flavor&&!!f&&text(f.factors)&&decimal(f.cofactor)&&typeof f.complete==='boolean'&&Number.isInteger(f.divisions)&&f.divisions>=0&&Number.isInteger(f.divisionBudget)&&f.divisionBudget>=f.divisions&&Number.isInteger(f.trialPrimeCeiling);
}
export function discoveryIdentity(d:Discovery){return d.catalogVersion+'|'+d.companion.id;}
const provenance=(d:Discovery)=>JSON.stringify([d.discoveredAt,d.mandate,d.assignment.ordinal,d.strategy,d.assignment.ticket]);
/** Union then rank: associative, commutative and idempotent, including concurrent tabs. */
export function rarestDiscoveries(...collections:readonly (readonly Discovery[])[]):Discovery[]{
 const distinct=new Map<string,Discovery>();
 for(const collection of collections)for(const d of collection){if(!validDiscovery(d))continue;const id=discoveryIdentity(d),previous=distinct.get(id);if(!previous||provenance(d)<provenance(previous))distinct.set(id,d);}
 return [...distinct.values()].sort((a,b)=>a.companion.weight-b.companion.weight||discoveryIdentity(a).localeCompare(discoveryIdentity(b),'en')).slice(0,5);
}
export function decodeDiscoveries(value:string|null):Discovery[]{try{const x=JSON.parse(value||'null');return x?.schema==='slopbuzz-discoveries/v1'&&Array.isArray(x.finds)?rarestDiscoveries(x.finds):[];}catch{return [];}}
export const encodeDiscoveries=(finds:readonly Discovery[])=>JSON.stringify({schema:'slopbuzz-discoveries/v1',finds});
export function discoveryLink(d:Discovery,scope:string){const url=new URL('demo/',scope);url.search=new URLSearchParams({limit:d.mandate,authority:d.strategy,catalog:d.catalogVersion,seedPolicy:d.seedPolicy,ordinal:d.assignment.ordinal,companion:d.companion.id}).toString();return url.href;}
