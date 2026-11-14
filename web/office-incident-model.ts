export type IncidentKind='heist'|'flight';
export type IncidentEnd='skipped'|'cancelled'|'disabled';
/** Versioned, deterministic spacing; decimal identities never pass through Number. */
export function flightInterval(mandate:string,sequence:bigint){
 let hash=2166136261;for(const c of `paper-airways-v2|${mandate}|${sequence}`)hash=Math.imul(hash^c.charCodeAt(0),16777619)>>>0;
 return BigInt(60+10*(hash%5));
}
/** A single lease owns the presentation hold; stale releases cannot free another incident. */
export class OfficeIncidentCoordinator {
 private serial=0;private owner?:{kind:IncidentKind;id:number};private listeners=new Set<()=>void>();private endings=new Map<IncidentKind,(reason:IncidentEnd)=>void>();
 private heists=0;private flights=0n;private last=0n;private mandate='15';private nextFlight=30n;
 flightsAvailable=false;
 get active(){return !!this.owner;}
 get kind(){return this.owner?.kind;}
 subscribe(listener:()=>void){this.listeners.add(listener);return()=>this.listeners.delete(listener);}
 private notify(){for(const listener of this.listeners)listener();}
 register(kind:IncidentKind,end:(reason:IncidentEnd)=>void){this.endings.set(kind,end);}
 acquire(kind:IncidentKind){if(this.owner)return;const id=++this.serial;this.owner={kind,id};this.notify();return id;}
 release(kind:IncidentKind,id:number){if(this.owner?.id!==id||this.owner.kind!==kind)return false;this.owner=undefined;this.notify();return true;}
 finish(reason:IncidentEnd='cancelled'){if(this.owner)this.endings.get(this.owner.kind)?.(reason);}
 begin(mandate='15'){this.finish();this.heists=0;this.flights=0n;this.last=0n;this.mandate=mandate;this.nextFlight=30n;this.flightsAvailable=false;}
 admits(kind:IncidentKind,ordinal:string){
  if(ordinal.trim()!==ordinal||!/^[1-9][0-9]*$/.test(ordinal)||this.active)return false;
  const n=BigInt(ordinal);if(n-this.last<30n)return false;
  return kind==='flight'?ordinal.endsWith('0')&&n>=this.nextFlight:this.heists<3&&(!this.flightsAvailable||n<this.nextFlight);
 }
 record(kind:IncidentKind,ordinal:string){
  this.last=BigInt(ordinal);
  if(kind==='flight'){this.flights++;this.nextFlight=this.last+flightInterval(this.mandate,this.flights);}else this.heists++;
 }
}
