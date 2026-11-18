import type {Rarity} from '../catalog/bestiary';
import {validDiscovery,seedPolicy,type Discovery} from './discovery-model.ts';

export const portfolioRules='companion-portfolio/v1';
export const portfolioStorageKey='slopbuzz:companion-portfolio:v1';
export const pointRates:Readonly<Record<Rarity,bigint>>=Object.freeze({Common:10n,Uncommon:25n,Rare:100n,Legendary:400n,Mythic:1000n});
export const scoreRarities=Object.keys(pointRates) as Rarity[];
export const scorePolicies=['factor-resonance-v1','ordinal-constellation-v1'] as const;
export type PortfolioStatus='active'|'completed'|'stopped'|'replaced'|'interrupted';
export interface PortfolioAppointment {id:string;name:string;emoji:string;rarity:Rarity;ordinal:string}
export interface PortfolioReceipt {
 rules:typeof portfolioRules;id:string;mandate:string;seedPolicy:typeof seedPolicy;catalogVersion:string;
 startedAt:string;updatedAt:string;status:PortfolioStatus;through:string;
 counts:Record<Rarity,string>;seen:string[];highest?:PortfolioAppointment;
 disabled:string;unscored:string;initialAuthority:string;lastAuthority:string;authorityChanges:string;
 authorities:Record<string,string>;
}
const decimal=(value:unknown):value is string=>typeof value==='string'&&/^(0|[1-9][0-9]*)$/.test(value);
export const appointmentCount=(r:PortfolioReceipt)=>scoreRarities.reduce((sum,tier)=>sum+BigInt(r.counts[tier]),0n);
export const portfolioPoints=(r:PortfolioReceipt)=>scoreRarities.reduce((sum,tier)=>sum+BigInt(r.counts[tier])*pointRates[tier],0n);
export function compactPoints(value:bigint):string {
 const digits=value.toString();if(digits.length<=6)return digits.replace(/\B(?=(\d{3})+(?!\d))/g,',');
 const group=Math.floor((digits.length-1)/3),whole=digits.length-group*3;
 return digits.slice(0,whole)+'.'+digits.slice(whole,whole+2)+(group<5?['','K','M','B','T'][group]:' × 10^'+group*3);
}
export const exactPoints=(value:bigint)=>value.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
export function newPortfolio(id:string,mandate:string,authority:string,now:string):PortfolioReceipt {
 if(!decimal(mandate)||!scorePolicies.includes(authority as typeof scorePolicies[number]))throw Error('Invalid portfolio mandate or authority');
 return {rules:portfolioRules,id,mandate,seedPolicy,catalogVersion:'',startedAt:now,updatedAt:now,status:'active',through:'0',counts:{Common:'0',Uncommon:'0',Rare:'0',Legendary:'0',Mythic:'0'},seen:[],disabled:'0',unscored:'0',initialAuthority:authority,lastAuthority:authority,authorityChanges:'0',authorities:{}};
}
export function decodePortfolio(value:unknown):PortfolioReceipt|undefined {
 try {
  const r=value as PortfolioReceipt;
  if(!r||r.rules!==portfolioRules||r.seedPolicy!==seedPolicy||typeof r.id!=='string'||!r.id||!decimal(r.mandate)||!decimal(r.through)||BigInt(r.through)>BigInt(r.mandate))return;
  if(!['active','completed','stopped','replaced','interrupted'].includes(r.status)||![r.startedAt,r.updatedAt].every(d=>typeof d==='string'&&Number.isFinite(Date.parse(d))))return;
  if(typeof r.catalogVersion!=='string'||!scoreRarities.every(tier=>decimal(r.counts?.[tier]))||!['disabled','unscored','authorityChanges'].every(key=>decimal(r[key as keyof PortfolioReceipt])))return;
  if(![r.initialAuthority,r.lastAuthority].every(p=>scorePolicies.includes(p as typeof scorePolicies[number])))return;
  if(!r.authorities||Object.entries(r.authorities).some(([key,count])=>!scorePolicies.includes(key as typeof scorePolicies[number])||!decimal(count)))return;
  if(!Array.isArray(r.seen)||r.seen.length>3200||r.seen.some(id=>typeof id!=='string'||!id)||new Set(r.seen).size!==r.seen.length)return;
  const count=appointmentCount(r),through=BigInt(r.through),eligible=through/3n+through/5n-through/15n;
  if(count+BigInt(r.disabled)+BigInt(r.unscored)!==eligible||BigInt(r.seen.length)>count||Object.values(r.authorities).reduce((n,c)=>n+BigInt(c),0n)!==count)return;
  if(count>0n){const h=r.highest;if(!r.catalogVersion||!h||!r.seen.includes(h.id)||typeof h.name!=='string'||!h.name||typeof h.emoji!=='string'||!h.emoji||!scoreRarities.includes(h.rarity)||!decimal(h.ordinal)||BigInt(h.ordinal)<1n||BigInt(h.ordinal)>through)return;if(scoreRarities.some(tier=>BigInt(r.counts[tier])>0n&&pointRates[tier]>pointRates[h.rarity]))return;}
  else if(r.highest||r.seen.length)return;
  return structuredClone(r);
 }catch{return;}
}

/** One sequential disclosure checkpoint and a catalog-bounded set, never a per-ordinal ledger. */
export class PortfolioRun {
 private receipt:PortfolioReceipt;
 constructor(receipt:PortfolioReceipt){this.receipt=structuredClone(receipt);}
 snapshot(){return structuredClone(this.receipt);}
 close(status:Exclude<PortfolioStatus,'active'>,now:string){this.receipt.status=status;this.receipt.updatedAt=now;}
 disclose(start:string,lines:readonly string[],authority:string|undefined,finds:readonly Discovery[],now:string,unavailable=false):boolean {
  const old=this.receipt,first=BigInt(start),end=first+BigInt(lines.length)-1n;
  if(!lines.length||end<=BigInt(old.through))return false;
  if(first!==BigInt(old.through)+1n||end>BigInt(old.mandate))throw Error('Portfolio disclosure is not the next authorized range');
  if(authority&&!scorePolicies.includes(authority as typeof scorePolicies[number]))throw Error('Unknown portfolio authority');
  const expected=new Map<string,string>();
  for(const [i,line]of lines.entries()){const n=first+BigInt(i),flavor=n%15n===0n?'FizzBuzz':n%3n===0n?'Fizz':n%5n===0n?'Buzz':String(n);if(line!==flavor)throw Error('Portfolio disclosure is not certified FizzBuzz');if(flavor!==String(n))expected.set(String(n),flavor);}
  const next=structuredClone(old);
  if(authority){if(authority!==next.lastAuthority)next.authorityChanges=String(BigInt(next.authorityChanges)+1n);next.lastAuthority=authority;}
  if(!authority||unavailable){const key=authority?'unscored':'disabled';next[key]=String(BigInt(next[key])+BigInt(expected.size));}
  else {
   const seen=new Set(next.seen),ordinals=new Set<string>();
   if(finds.length!==expected.size)throw Error('Incomplete companion scoring evidence');
   for(const d of finds){
    if(!validDiscovery(d)||d.mandate!==old.mandate||d.strategy!==authority||expected.get(d.assignment.ordinal)!==d.assignment.flavor||ordinals.has(d.assignment.ordinal)||(next.catalogVersion&&next.catalogVersion!==d.catalogVersion))throw Error('Companion scoring evidence belongs to a different appointment');
    next.catalogVersion=d.catalogVersion;ordinals.add(d.assignment.ordinal);seen.add(d.companion.id);
    const c=d.companion;next.counts[c.rarity]=String(BigInt(next.counts[c.rarity])+1n);
    if(!next.highest||pointRates[c.rarity]>pointRates[next.highest.rarity])next.highest={id:c.id,name:c.name,emoji:c.emoji,rarity:c.rarity,ordinal:d.assignment.ordinal};
   }
   if(seen.size>3200)throw Error('Companion scoring exceeded the catalog');
   next.seen=[...seen];next.authorities[authority]=String(BigInt(next.authorities[authority]||'0')+BigInt(finds.length));
  }
  next.through=String(end);next.updatedAt=now;this.receipt=next;return true;
 }
}
