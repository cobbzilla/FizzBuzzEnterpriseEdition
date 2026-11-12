export type IncidentKind='heist'|'flight';
export type IncidentEnd='skipped'|'cancelled'|'disabled';
/** A single lease owns the presentation hold; stale releases cannot free another incident. */
export class OfficeIncidentCoordinator {
 private serial=0;private owner?:{kind:IncidentKind;id:number};private listeners=new Set<()=>void>();private endings=new Map<IncidentKind,(reason:IncidentEnd)=>void>();
 private total=0;private flights=0;private last='0';
 get active(){return !!this.owner;}
 get kind(){return this.owner?.kind;}
 subscribe(listener:()=>void){this.listeners.add(listener);return()=>this.listeners.delete(listener);}
 private notify(){for(const listener of this.listeners)listener();}
 register(kind:IncidentKind,end:(reason:IncidentEnd)=>void){this.endings.set(kind,end);}
 acquire(kind:IncidentKind){if(this.owner)return;const id=++this.serial;this.owner={kind,id};this.notify();return id;}
 release(kind:IncidentKind,id:number){if(this.owner?.id!==id||this.owner.kind!==kind)return false;this.owner=undefined;this.notify();return true;}
 finish(reason:IncidentEnd='cancelled'){if(this.owner)this.endings.get(this.owner.kind)?.(reason);}
 begin(){this.finish();this.total=0;this.flights=0;this.last='0';}
 admits(kind:IncidentKind,ordinal:string){return ordinal.trim()===ordinal&&/^[1-9][0-9]*$/.test(ordinal)&&!this.active&&this.total<3&&(kind!=='flight'||this.flights<2&&BigInt(ordinal)>=40n)&&BigInt(ordinal)-BigInt(this.last)>=30n;}
 record(kind:IncidentKind,ordinal:string){this.total++;if(kind==='flight')this.flights++;this.last=ordinal;}
}
