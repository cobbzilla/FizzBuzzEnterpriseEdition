import {foundingEstate,nextEstate,validateEstate,distance,type EstateLayout} from './office-layout.ts';
export const relocationDuration=12500;
export type RelocationPhase='packing'|'moving'|'unpacking'|'returning';
export interface RelocationSnapshot {id:number;from:EstateLayout;to:EstateLayout;progress:number;phase:RelocationPhase}
export interface EstateEvent {kind:'staged'|'progress'|'committed'|'cancelled';relocation:RelocationSnapshot}
export type ReorganizationAuthority=(current:EstateLayout)=>EstateLayout;
export const relocationPhase=(p:number):RelocationPhase=>p<.15?'packing':p<.72?'moving':p<.86?'unpacking':'returning';
/** Isolate swappable authorities from the coordinates already approved for display. */
function sealEstate(layout:EstateLayout):EstateLayout {
 validateEstate(layout);
 const frozen=Object.isFrozen(layout)&&Object.isFrozen(layout.bounds)&&Object.isFrozen(layout.placements)&&layout.placements.every(p=>Object.isFrozen(p)&&Object.isFrozen(p.position))&&(!layout.amenity||Object.isFrozen(layout.amenity)&&Object.isFrozen(layout.amenity.position));
 if(frozen)return layout;
 return Object.freeze({...layout,bounds:Object.freeze({...layout.bounds}),placements:Object.freeze(layout.placements.map(p=>Object.freeze({...p,position:Object.freeze({...p.position})}))),amenity:layout.amenity?Object.freeze({...layout.amenity,position:Object.freeze({...layout.amenity.position})}):undefined});
}
/** Facilities holds a separate transaction; numerical production is not repeated. */
export class RelocationCoordinator {
 private value:EstateLayout;private authority:ReorganizationAuthority;private listeners=new Set<(event:EstateEvent)=>void>();
 private pending?:{id:number;from:EstateLayout;to:EstateLayout;elapsed:number};private serial=0;private last?:number;private allowed=false;
 constructor(initial:EstateLayout=foundingEstate,authority:ReorganizationAuthority=nextEstate){this.value=sealEstate(initial);this.authority=authority;}
 get current(){return this.value;}
 get moving(){return !!this.pending;}
 get relocation():RelocationSnapshot|undefined {const p=this.pending;if(!p)return;const progress=p.elapsed/relocationDuration;return Object.freeze({id:p.id,from:p.from,to:p.to,progress,phase:relocationPhase(progress)});}
 get displayed(){const p=this.relocation;return p&&p.progress>=.72?p.to:this.value;}
 subscribe(listener:(event:EstateEvent)=>void){this.listeners.add(listener);return()=>this.listeners.delete(listener);}
 private notify(kind:EstateEvent['kind'],relocation:RelocationSnapshot){for(const listener of this.listeners)listener({kind,relocation});}
 request(){
  if(this.pending)return this.pending.to;
  const candidate=sealEstate(this.authority(this.value));
  if(candidate.edition!==this.value.edition+1||candidate.rows===this.value.rows||candidate.seed!==this.value.seed)throw new Error('Facilities must alternate estates and advance exactly one edition.');
  for(const room of this.value.placements){const moved=candidate.placements.find(p=>p.room===room.room)!;if(distance(room.position,moved.position)<.5)throw new Error('Every department must experience an actual relocation.');}
  this.pending={id:++this.serial,from:this.value,to:candidate,elapsed:0};this.last=undefined;this.allowed=false;this.notify('staged',this.relocation!);return candidate;
 }
 advance(now:number,allow:boolean,id=this.pending?.id){
  if(!this.pending||id!==this.pending.id)return;if(!Number.isFinite(now))throw new Error('A relocation requires a finite clock.');
  const delta=this.last===undefined||!this.allowed?0:Math.max(0,now-this.last);this.last=now;this.allowed=allow;
  if(!allow)return;this.pending.elapsed=Math.min(relocationDuration,this.pending.elapsed+delta);
  if(this.pending.elapsed>=relocationDuration){this.finish();return;}
  if(delta)this.notify('progress',this.relocation!);
 }
 finish(){const p=this.relocation;if(!p)return false;this.value=p.to;this.pending=undefined;this.last=undefined;this.allowed=false;this.notify('committed',Object.freeze({...p,progress:1,phase:'returning'}));return true;}
 cancel(){const p=this.relocation;if(!p)return false;this.pending=undefined;this.last=undefined;this.allowed=false;this.notify('cancelled',p);return true;}
 /** Immediate application is useful to read a saved or reduced-motion charter. */
 reorganize(){const target=this.request();this.finish();return target;}
}
