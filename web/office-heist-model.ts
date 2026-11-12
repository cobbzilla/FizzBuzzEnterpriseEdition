import type {RoomId} from './office-content.ts';
import type {OfficeIncidentCoordinator} from './office-incident-model.ts';

export type HeistTactic='snail'|'ghost'|'octopus'|'runner';
export interface HeistCompanion {id:string;name:string;emoji:string}
export interface HeistActor extends HeistCompanion {tactic:HeistTactic}
export interface HeistPlan {
 readonly key:string;readonly ordinal:string;readonly mandate:string;
 readonly source:'encounter'|'rehearsal';readonly actors:readonly HeistActor[];
 readonly rooms:readonly RoomId[];
}
export type HeistResolution='intercepted'|'biscuit'|'automatic'|'skipped'|'cancelled'|'disabled';
export interface HeistSnapshot {
 readonly id:number;readonly plan:HeistPlan;readonly elapsed:number;readonly holder:number;readonly leg:number;
 readonly legProgress:number;readonly returning:boolean;readonly returnProgress:number;
 readonly footprints:boolean;readonly announcement:string;readonly resolution?:HeistResolution;
}
export interface HeistRecord {id:number;plan:HeistPlan;resolution:HeistResolution;finding:string}
export const heistChaseMs=15000,heistReturnMs=3000;
const destinations:readonly RoomId[]=['reception','personnel','procurement','premises','memory','publication','executive'];
export function heistEligible(ordinal:string):boolean {
 return /^[1-9][0-9]+$/.test(ordinal)&&ordinal===Array.from(ordinal).reverse().join('');
}
export function heistTactic(emoji:string):HeistTactic {
 return emoji.includes('🐌')?'snail':emoji.includes('👻')?'ghost':emoji.includes('🐙')?'octopus':'runner';
}
function seed(text:string){let value=2166136261;for(const character of text)value=Math.imul(value^character.charCodeAt(0),16777619)>>>0;return value;}
export function planHeist(mandate:string,ordinal:string,authority:string,companions:readonly HeistCompanion[],source:HeistPlan['source']='encounter'):HeistPlan {
 if(!/^[1-9][0-9]*$/.test(mandate)||!heistEligible(ordinal)||!authority||companions.length<1)throw new Error('The heist requires a positive mandate, a multi-digit palindrome and a named accomplice.');
 const unique=[...new Map(companions.map(c=>[c.id,c])).values()].slice(0,3);
 if(unique.some(c=>!c.id||!c.name||!c.emoji))throw new Error('Anonymous suspects must first report to Personnel.');
 const actors=Object.freeze(unique.map(c=>Object.freeze({...c,tactic:heistTactic(c.emoji)})));
 const key=['stamp-heist-v1',source,mandate,ordinal,authority,...actors.map(a=>a.id)].join('|');
 let random=seed(key);const pool=[...destinations];
 for(let i=pool.length-1;i>0;i--){random=(Math.imul(random,1664525)+1013904223)>>>0;const j=random%(i+1);[pool[i],pool[j]]=[pool[j],pool[i]];}
 return Object.freeze({key,ordinal,mandate,source,actors,rooms:Object.freeze(['notary',...pool.slice(0,3)] as RoomId[])});
}
export function heistFinding(resolution:HeistResolution){return {
 intercepted:'Stamp recovered. The suspect claims this was a cross-departmental delivery.',
 biscuit:'Amnesty accepted. One biscuit has outperformed the entire security budget.',
 automatic:'The accomplices returned the stamp after discovering that stolen approval still requires approval.',
 skipped:'The chase was waived. The stamp returned through an undisclosed administrative shortcut.',
 cancelled:'The chase was adjourned and the stamp returned. No numerical work was repeated.',
 disabled:'Companion mischief is disabled. The stamp has reluctantly resumed its ordinary employment.'
 }[resolution];}
export function heistAntic(actor:HeistActor){return {
 snail:'An extremely slow getaway. Security has requested a slower pursuit.',
 ghost:'The ghost uses the wall. Its pursuing paperwork must use the door.',
 octopus:'Eight apparent stamps. Seven are unauthorized impressions of confidence.',
 runner:'The suspect is carrying approval without permission to carry approval.'
 }[actor.tactic];}
/** Owns fictional stamp custody only. It never owns a numerical record or a user pause. */
export class HeistCoordinator {
 private lease?:number;
 private readonly gate?:OfficeIncidentCoordinator;
 constructor(gate?:OfficeIncidentCoordinator){this.gate=gate;gate?.register('heist',reason=>this.finish(reason));}
 private serial=0;private pending?:{id:number;plan:HeistPlan;elapsed:number;footprints:boolean;announcement:string;resolution?:HeistResolution;returnFrom?:number};
 private last?:number;private allowed=false;private listeners=new Set<()=>void>();
 readonly records:HeistRecord[]=[];
 get active(){return !!this.pending;}
 get snapshot():HeistSnapshot|undefined {
  const p=this.pending;if(!p)return;
  const chase=p.returnFrom??Math.min(p.elapsed,heistChaseMs),leg=Math.min(2,Math.floor(chase/5000));
  return Object.freeze({...p,leg,holder:leg%p.plan.actors.length,legProgress:Math.min(1,(chase-leg*5000)/5000),returning:p.elapsed>=heistChaseMs,returnProgress:Math.max(0,(p.elapsed-heistChaseMs)/heistReturnMs)});
 }
 subscribe(listener:()=>void){this.listeners.add(listener);return()=>this.listeners.delete(listener);}
 private notify(){for(const listener of this.listeners)listener();}
 start(plan:HeistPlan){if(this.active)return false;if(this.gate){this.lease=this.gate.acquire('heist');if(this.lease===undefined)return false;}this.pending={id:++this.serial,plan,elapsed:0,footprints:false,announcement:plan.actors[0].name+' has stolen the approval stamp.'};this.last=undefined;this.allowed=false;this.notify();return true;}
 advance(now:number,allow:boolean,id=this.pending?.id){
  const p=this.pending;if(!p||id!==p.id)return;if(!Number.isFinite(now))throw new Error('A pursuit requires a finite clock.');
  const delta=this.last===undefined||!this.allowed||!allow?0:Math.max(0,now-this.last);this.last=Math.max(this.last??now,now);this.allowed=allow;
  if(!allow)return;const before=this.snapshot!;
  p.elapsed=Math.min(heistChaseMs+heistReturnMs,p.elapsed+delta);
  if(p.elapsed>=heistChaseMs&&!p.resolution){p.resolution='automatic';p.returnFrom=heistChaseMs;p.announcement=heistFinding('automatic');}
  else if(!this.snapshot!.returning&&before.holder!==this.snapshot!.holder)p.announcement=p.plan.actors[this.snapshot!.holder].name+' now holds the stamp. '+heistAntic(p.plan.actors[this.snapshot!.holder]);
  if(p.elapsed>=heistChaseMs+heistReturnMs){this.finish(p.resolution||'automatic');return;}
  if(delta)this.notify();
 }
 intercept(index:number,id=this.pending?.id){
  const s=this.snapshot;if(!s||s.id!==id||s.returning||!Number.isInteger(index)||!s.plan.actors[index])return false;
  if(index!==s.holder){this.pending!.announcement=s.plan.actors[index].name+' objects: “I was attending a meeting about my whereabouts.”';this.notify();return false;}
  this.recover('intercepted');return true;
 }
 follow(){const s=this.snapshot;if(!s||s.returning)return;this.pending!.footprints=true;this.pending!.announcement='Footprints lead from '+s.plan.rooms[Math.min(2,Math.floor(s.elapsed/5000))]+' toward '+s.plan.rooms[Math.min(3,Math.floor(s.elapsed/5000)+1)]+'. The trail has not applied for confidentiality.';this.notify();}
 recover(resolution:'biscuit'|'intercepted') {const p=this.pending;if(!p||p.resolution)return;p.resolution=resolution;p.returnFrom=p.elapsed;p.elapsed=heistChaseMs;p.announcement=heistFinding(resolution);this.last=undefined;this.allowed=false;this.notify();}
 finish(resolution:HeistResolution='skipped'){
  const p=this.pending;if(!p)return;this.records.push(Object.freeze({id:p.id,plan:p.plan,resolution,finding:heistFinding(resolution)}));if(this.records.length>10)this.records.shift();this.pending=undefined;this.last=undefined;this.allowed=false;if(this.lease!==undefined)this.gate?.release('heist',this.lease);this.lease=undefined;this.notify();
 }
}
