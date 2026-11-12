import {rooms,type RoomId} from './office-content.ts';
import type {OfficeIncidentCoordinator} from './office-incident-model.ts';
export const flightPersonalities=[
 {id:'snail',glyph:'🐌',match:['🐌'],name:'Runway Due Diligence Officer',brief:'Inspects every millimetre of runway before accepting a very effective tailwind.',fold:'The snail is checking whether the runway has moved since its last inspection.',cruise:'Tailwind accepted. Security has requested permission to be astonished.',land:'The snail requests a slower round of applause.'},
 {id:'octopus',glyph:'🐙',match:['🐙','🦑'],name:'Eight Conflicting Clearances',brief:'Waves eight landing batons while the runway indicator provides the actual instruction.',fold:'Eight arms have approved eight mutually exclusive departures.',cruise:'Seven batons advise caution. The eighth has declared itself management.',land:'All eight arms claim sole credit for the landing.'},
 {id:'cat',glyph:'🐈',match:['🐈','🐱'],name:'Unscheduled Wing Inspector',brief:'Crouches, pounces and swats the plane into a theatrical bank.',fold:'The cat has mistaken the flight plan for something that should be on the floor.',cruise:'One paw has introduced an unsolicited course correction.',land:'The cat sits on the arrival paperwork. Custody is technically established.'},
 {id:'dog',glyph:'🐕',match:['🐕','🐶','🦮','🐩'],name:'Director of Fetch',brief:'Bounds after the plane and carries an oversized return receipt.',fold:'The dog is certain this is a fetch contract.',cruise:'The aircraft is being enthusiastically followed by its return department.',land:'Delivery complete. The dog would like to commission exactly the same flight again.'},
 {id:'bee',glyph:'🐝',match:['🐝'],name:'Buzz Air',brief:'Flies a little hexagonal inspection around the aircraft.',fold:'The bee has invoiced the company for use of the word Buzz.',cruise:'Six-sided due diligence confirms the plane is neither flower nor competitor.',land:'The bee files a pollen-weight baggage claim.'},
 {id:'butterfly',glyph:'🦋',match:['🦋'],name:'Crosswind Appreciation Society',brief:'Flutters between the wings while the plane makes a gentle slalom.',fold:'The butterfly has selected a departure based on how lovely it might be.',cruise:'The scenic route has discovered an even more scenic route.',land:'Arrival has been classified as a particularly successful flutter.'},
 {id:'turtle',glyph:'🐢',match:['🐢'],name:'Portable Control Tower',brief:'Retracts behind a tiny shield during takeoff, then peeks out to supervise.',fold:'The turtle has brought its own terminal and would prefer to remain inside it.',cruise:'A cautious head emerges to certify that outside still exists.',land:'The turtle declares the journey acceptable in retrospect.'},
 {id:'penguin',glyph:'🐧',match:['🐧'],name:'Runway Belly-Slide Specialist',brief:'Slides along the departure strip and supervises a very low approach.',fold:'The penguin requests a runway polished to executive standards.',cruise:'Takeoff has been delegated. Sliding remains an internal competency.',land:'The penguin has arrived first and is pretending this was the plan.'},
 {id:'crab',glyph:'🦀',match:['🦀','🦞'],name:'Lateral Movement Consultant',brief:'Side-steps the aircraft while insisting sideways is a strategic direction.',fold:'The crab has approved departure subject to a ninety-degree reinterpretation.',cruise:'Forward progress is being delivered through lateral expertise.',land:'The crab accepts the landing on a strictly sideways basis.'},
 {id:'fox',glyph:'🦊',match:['🦊'],name:'Shortcut Procurement Specialist',brief:'Takes a shortcut beneath the route and waits smugly at the arrival desk.',fold:'The fox has already found a more interesting route to the destination.',cruise:'The fox is cutting across the paperwork while the paperwork follows the process.',land:'The fox was here first. Its expense claim was here yesterday.'},
 {id:'owl',glyph:'🦉',match:['🦉'],name:'Night Shift Navigation Scholar',brief:'Orbits a floating compass and studies the route with excessive care.',fold:'The owl has annotated the departure clearance in three margins.',cruise:'A rotating compass has become the subject of a peer review.',land:'The owl publishes a brief twelve-volume account of this arrival.'},
 {id:'bird',glyph:'🐦',match:['🐦','🦜','🦆','🦅','🦢','🦚','🦩','🕊'],name:'Grounded Aviation Expert',brief:'Hops along beneath the plane: personal flight is not approved for business travel.',fold:'The bird has been informed that only the paperwork may fly.',cruise:'The bird follows on foot under the Personal Aviation Exclusion Policy.',land:'The bird declines to comment on the efficiency of this arrangement.'},
 {id:'clerk',glyph:'📎',match:[],name:'Acting Assistant to the Pilot',brief:'Bobs beside the aircraft and waves an excessively large boarding pass.',fold:'The pilot is checking the boarding pass of the boarding pass.',cruise:'The passenger manifest contains one document and several expectations.',land:'One complete piece of paperwork has successfully changed departments.'}
] as const;
export type FlightPersonality=typeof flightPersonalities[number]['id'];
export function personalityFor(emoji:string){return flightPersonalities.find(p=>p.match.some(g=>emoji.includes(g)))||flightPersonalities.at(-1)!;}
export function personality(id:FlightPersonality){return flightPersonalities.find(p=>p.id===id)!;}
export interface FlightActor {readonly id:string;readonly name:string;readonly emoji:string}
export interface FlightPlan {readonly key:string;readonly ordinal:string;readonly mandate:string;readonly text:string;readonly loops:number;readonly overflow:boolean;readonly tactic:FlightPersonality;readonly actors:readonly FlightActor[];readonly source:'encounter'|'rehearsal';readonly alternatives:readonly RoomId[]}
export type FanDirection=-1|0|1;
export type FlightPhase='folding'|'cruise'|'holding'|'landing';
export type FlightResolution='landed'|'redirected'|'expedited'|'skipped'|'cancelled'|'disabled';
export interface FlightSnapshot {readonly id:number;readonly plan:FlightPlan;readonly elapsed:number;readonly phase:FlightPhase;readonly progress:number;readonly destination:RoomId;readonly arrival:RoomId;readonly fans:readonly FanDirection[];readonly applied:readonly FanDirection[];readonly passed:number;readonly announcement:string;readonly expedited:boolean}
export interface FlightRecord {id:number;plan:FlightPlan;destination:RoomId;arrival:RoomId;resolution:FlightResolution;finding:string}
export const foldMs=1800,cruiseMs=6000,loopMs=2000,landingMs=2500;
export function flightEligible(ordinal:string){return ordinal.endsWith('0')&&/^[1-9][0-9]*0$/.test(ordinal);}
export function holdingLoops(ordinal:string){if(!flightEligible(ordinal))throw new Error('Only positive, zero-ending ordinals have departure clearance.');return Math.min(3,ordinal.length-ordinal.replace(/0+$/,'').length);}
function hash(value:string){let n=2166136261;for(const c of value)n=Math.imul(n^c.charCodeAt(0),16777619)>>>0;return n;}
export function planFlight(mandate:string,ordinal:string,text:string,authority:string,cast:readonly FlightActor[],source:FlightPlan['source']='encounter'):FlightPlan {
 if(mandate.trim()!==mandate||!/^[1-9][0-9]*$/.test(mandate)||!authority||!text||!cast.length)throw new Error('A flight needs an exact mandate, supplied text, authority and pilot.');
 const actors=[...new Map(cast.map(a=>[a.id,a])).values()].slice(0,3);if(actors.some(a=>!a.id||!a.name||!a.emoji))throw new Error('Anonymous pilots must first report to Personnel.');
 const loops=holdingLoops(ordinal),key=['paper-aviation-v1',source,mandate,ordinal,text,authority,...actors.map(a=>a.id)].join('|');
 const alternatives=rooms.map(r=>r.id).filter(id=>id!=='publication').sort((a,b)=>hash(key+a)-hash(key+b)||a.localeCompare(b));
 return Object.freeze({key,ordinal,mandate,text,loops,overflow:/0000$/.test(ordinal),tactic:personalityFor(actors[0].emoji).id,actors:Object.freeze(actors.map(a=>Object.freeze({...a}))),source,alternatives:Object.freeze(alternatives)});
}
export function flightFinding(resolution:FlightResolution,arrival:RoomId){return {
 landed:'The paperwork has landed. Its contents remain precisely as important as before.',
 redirected:arrival==='executive'?'Executive received the document and declined to become operationally involved. A ground courier completed delivery.':'Crosswind delivered the paperwork to '+rooms.find(r=>r.id===arrival)!.short+'. A ground courier corrected the departmental enthusiasm.',
 expedited:'Direct delivery authorized. Several committees have been deprived of a loop.',
 skipped:'The remaining aviation ceremony was waived. The paperwork arrived by administrative shortcut.',
 cancelled:'Flight cancelled. Its illustrated copy was filed; no numerical work was repeated.',
 disabled:'Paper aviation is disabled. The document has reluctantly resumed travelling flat.'
 }[resolution];}
export class FlightCoordinator {
 private serial=0;private lease?:number;private last?:number;private allowed=false;private listeners=new Set<()=>void>();
 private pending?:{id:number;plan:FlightPlan;elapsed:number;destination:RoomId;fans:FanDirection[];applied:FanDirection[];passed:number;expedited:boolean;notice:string};
 readonly records:FlightRecord[]=[];
 private readonly gate?:OfficeIncidentCoordinator;
 constructor(gate?:OfficeIncidentCoordinator){this.gate=gate;gate?.register('flight',reason=>this.finish(reason));}
 get active(){return !!this.pending;}
 subscribe(listener:()=>void){this.listeners.add(listener);return()=>this.listeners.delete(listener);}
 private notify(){for(const listener of this.listeners)listener();}
 get snapshot():FlightSnapshot|undefined {
  const p=this.pending;if(!p)return;const landingAt=foldMs+cruiseMs+p.plan.loops*loopMs;
  const phase:FlightPhase=p.elapsed<foldMs?'folding':p.elapsed<foldMs+cruiseMs?'cruise':p.elapsed<landingAt?'holding':'landing';
  const start=phase==='folding'?0:phase==='cruise'?foldMs:phase==='holding'?foldMs+cruiseMs:landingAt,duration=phase==='folding'?foldMs:phase==='cruise'?cruiseMs:phase==='holding'?p.plan.loops*loopMs:landingMs;
  const drift=p.applied.reduce<number>((a,b)=>a+b,0),alternatives=p.plan.alternatives.filter(r=>r!==p.destination),arrival=p.expedited||!drift?p.destination:alternatives[drift<0?0:1];
  const person=personality(p.plan.tactic),announcement=p.notice||(phase==='folding'?person.fold:phase==='landing'?person.land:person.cruise);
  return Object.freeze({...p,phase,progress:Math.min(1,(p.elapsed-start)/duration),arrival,announcement,fans:Object.freeze([...p.fans]),applied:Object.freeze([...p.applied])});
 }
 start(plan:FlightPlan){if(this.active)return false;if(this.gate){this.lease=this.gate.acquire('flight');if(this.lease===undefined)return false;}this.pending={id:++this.serial,plan,elapsed:0,destination:'memory',fans:[0,0,0],applied:[0,0,0],passed:0,expedited:false,notice:''};this.last=undefined;this.allowed=false;this.notify();return true;}
 advance(now:number,allow:boolean,id=this.pending?.id){
  const p=this.pending;if(!p||p.id!==id)return;if(!Number.isFinite(now))throw new Error('Air traffic requires a finite clock.');
  const delta=this.last===undefined||!this.allowed||!allow?0:Math.max(0,now-this.last);this.last=Math.max(this.last??now,now);this.allowed=allow;if(!allow||!delta)return;
  const before=this.snapshot!.phase;p.elapsed=Math.min(foldMs+cruiseMs+p.plan.loops*loopMs+landingMs,p.elapsed+delta);
  if(!p.expedited)for(let i=p.passed;i<3;i++)if(p.elapsed>=foldMs+cruiseMs*(i+1)/4){p.applied[i]=p.fans[i];p.passed=i+1;}
  if(before!==this.snapshot!.phase)p.notice='';
  if(p.elapsed>=foldMs+cruiseMs+p.plan.loops*loopMs+landingMs){const s=this.snapshot!;this.finish(p.expedited?'expedited':s.arrival===s.destination?'landed':'redirected');return;}this.notify();
 }
 destination(room:RoomId,id=this.pending?.id){const p=this.pending;if(!p||p.id!==id||this.snapshot!.phase==='landing'||!rooms.some(r=>r.id===room))return false;p.destination=room;p.notice='Runway reassigned to '+rooms.find(r=>r.id===room)!.short+'. The destination has been notified of its promotion.';this.notify();return true;}
 turn(index:number,id=this.pending?.id){const p=this.pending;if(!p||p.id!==id||!Number.isInteger(index)||index<0||index>2||this.snapshot!.phase==='landing')return false;p.fans[index]=(p.fans[index]===0?1:p.fans[index]===1?-1:0);if(index<p.passed)p.applied[index]=p.fans[index];p.notice='Fan '+(index+1)+': '+(p.fans[index]===0?'straight':p.fans[index]<0?'left':'right')+'. Wind direction is now official policy.';this.notify();return true;}
 land(id=this.pending?.id){const p=this.pending;if(!p||p.id!==id||this.snapshot!.phase==='landing')return false;p.expedited=true;p.elapsed=foldMs+cruiseMs+p.plan.loops*loopMs;p.notice='Direct delivery authorized. The remaining circular activity has been cancelled.';this.last=undefined;this.allowed=false;this.notify();return true;}
 finish(resolution:FlightResolution='skipped'){const s=this.snapshot;if(!s)return;this.records.push(Object.freeze({id:s.id,plan:s.plan,destination:s.destination,arrival:s.arrival,resolution,finding:flightFinding(resolution,s.arrival)}));if(this.records.length>10)this.records.shift();this.pending=undefined;this.last=undefined;this.allowed=false;if(this.lease!==undefined)this.gate?.release('flight',this.lease);this.lease=undefined;this.notify();}
}
