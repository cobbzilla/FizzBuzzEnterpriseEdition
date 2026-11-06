import type {ExecutionEvent,ExecutionPacket,Folio} from './chronicle.ts';
import type {RoomId} from './office-content.ts';
import {addresses,foundingEstate,type EstateLayout,type OfficeAddress} from './office-layout.ts';

export type OfficeAction='paper'|'wire'|'recruit'|'boundary'|'classify'|'allocate'|'survey'|'evict'|'lease'|'release'|'requisition'|'deliver'|'glyph'|'assemble'|'fragment'|'notarize'|'print'|'audit'|'queue'|'commit'|'cleanup'|'succession'|'memory';
export type OfficeAnchor='desk'|'personnel'|'boundary'|'property'|'glyph'|'notary'|'printer'|'ledger'|'queue'|'memory';
export interface ScenePoint {x:number;y:number;z:number}
export interface GlyphReceipt {product:string;position:number;character:string;sku:string}
export type PersonnelLamp='APPROVED'|'REJECTED'|'NOT_REACHED'|undefined;
export interface OfficeShot {room:RoomId;anchor:OfficeAnchor;target:ScenePoint;alpha:number;beta:number;radius:number}
export interface ObservedOfficeStep {
 id:string;event:ExecutionEvent;source:'recorded'|'disclosure'|'rehearsal';ordinal:string;
 text:string;action:OfficeAction;shot:OfficeShot;hasFile:boolean;publication:boolean;
 arriveMs:number;workMs:number;holdMs:number;glyphs:readonly GlyphReceipt[];hrIndex:number;hrStates:readonly PersonnelLamp[];tenantCode?:string;
 origin?:OfficeAddress&{hrIndex:number};
}
export interface OfficeCue {step:ObservedOfficeStep;travel:number;work:number;hold:number;phase:'arrival'|'work'|'hold';complete:boolean}
export interface ObservationEnvelope {prefix:ExecutionEvent[];groups:Map<string,ExecutionEvent[]>;suffix:ExecutionEvent[];omitted:number;cache:string;recorded:boolean}

/** Preserve source order and event identity. No number of new business events is inferred. */
export function observationEnvelope(packet:ExecutionPacket,start:string,count:number):ObservationEnvelope {
 const first=BigInt(start),last=first+BigInt(Math.max(0,count))-1n;
 const result:ObservationEnvelope={prefix:[],groups:new Map(),suffix:[],omitted:packet.omitted,cache:packet.cache,recorded:packet.recorded};
 let entered=false;
 for(const event of packet.events){
  if(packet.cache==='HIT'&&!['REQUEST','COMPLETE','FAILED'].includes(event.kind)&&!event.kind.startsWith('CACHE_')&&!event.kind.startsWith('PRECEDENT_'))continue;
  const ordinal=event.ordinal===null?undefined:BigInt(event.ordinal);
  if(count>0&&ordinal!==undefined&&ordinal>=first&&ordinal<=last){entered=true;const group=result.groups.get(event.ordinal!)||[];group.push(event);result.groups.set(event.ordinal!,group);}
  else if(!entered)result.prefix.push(event);else result.suffix.push(event);
 }
 if(packet.precedent&&!packet.events.some(e=>e.kind.startsWith('PRECEDENT_'))){
  result.prefix.push(...packet.precedent.steps.map(e=>({ordinal:null,kind:'PRECEDENT_'+e.state,office:e.office,finding:e.finding,document:e.document})));
 }
 return result;
}

const personnelOffices=['Headcount Planning','Recruitment','Identity Office','Offer Authority','Induction','Probation Review','Independent Audit'];
export function identifyAction(event:ExecutionEvent,previous?:ObservedOfficeStep):{action:OfficeAction;room:RoomId;anchor:OfficeAnchor} {
 const kind=event.kind,office=event.office;
 if(kind.startsWith('HR_'))return {action:'recruit',room:'personnel',anchor:'personnel'};
 if(kind.startsWith('CACHE_')||kind.startsWith('PRECEDENT_'))return {action:'memory',room:'memory',anchor:'memory'};
 if(kind==='CONTINUATION'||kind==='EXTENDED_CONTINUATION')return {action:'boundary',room:'reception',anchor:'boundary'};
 if(kind.startsWith('PREMISES_')){
  const action:OfficeAction=kind==='PREMISES_RELEASE'?'release':kind==='PREMISES_DISCOVERY'?'survey':kind==='PREMISES_CERTIFICATE'?'lease':office.includes('Allocation')?'allocate':office.includes('Eviction')?'evict':office.includes('Lease')||office.includes('Auditor')?'lease':'survey';
  return {action,room:'premises',anchor:'property'};
 }
 const procurement:Partial<Record<string,OfficeAction>>={REQUISITION:'requisition',DELIVERY:'deliver',GLYPH_ACCEPTED:'glyph',GLYPH_ASSEMBLED:'assemble'};
 if(procurement[kind])return {action:procurement[kind]!,room:'procurement',anchor:'glyph'};
 if(kind==='NOTARY'||kind==='EXTENDED_NOTARY')return {action:'notarize',room:'notary',anchor:'notary'};
 if(kind==='PUBLICATION')return {action:'print',room:'publication',anchor:'printer'};
 if(kind==='DISCLOSE_OBSERVED')return event.office.startsWith('Retained')?{action:'memory',room:'memory',anchor:'memory'}:{action:'paper',room:'publication',anchor:'ledger'};
 if(kind==='AUDIT_APPEND')return {action:'audit',room:'publication',anchor:'ledger'};
 if(kind==='QUEUE_ENQUEUED')return {action:'queue',room:'publication',anchor:'queue'};
 if(kind==='TRANSACTION_COMMIT')return {action:'commit',room:'publication',anchor:'ledger'};
 if(kind==='TRANSACTION_CLEANUP')return {action:'cleanup',room:previous?.shot.room||'reception',anchor:previous?.shot.anchor||'desk'};
 if(kind.includes('SUCCESSION'))return {action:'succession',room:'reception',anchor:'boundary'};
 if(kind==='CLASSIFICATION'||kind==='EXTENDED_CLASSIFICATION')return {action:'classify',room:'reception',anchor:'desk'};
 if(kind==='ASSEMBLY')return {action:'wire',room:'reception',anchor:'desk'};
 if(kind==='FRAGMENT'||kind==='VISITOR')return {action:kind==='FRAGMENT'?'fragment':'classify',room:previous?.shot.room==='procurement'?'procurement':'reception',anchor:previous?.shot.room==='procurement'?'glyph':'desk'};
 return {action:kind==='NUMERAL'?'fragment':'paper',room:'reception',anchor:'desk'};
}

export function shotFor(room:RoomId,anchor:OfficeAnchor,hrIndex=-1,layout:EstateLayout=foundingEstate):OfficeShot {
 const book=addresses(layout),placement=book.placement(room),target=book.resolve({room,station:anchor});
 const historicNorth=layout.edition===0&&placement.position.z>0;
 const alpha=(historicNorth?Math.PI/2:-Math.PI/2+placement.yaw)+(anchor==='glyph'?.22:anchor==='notary'?-.22:anchor==='queue'?-.14:anchor==='personnel'?(hrIndex%2===0?-.12:.12):.1);
 return {room,anchor,target,alpha,beta:layout.edition>0||historicNorth?.7:anchor==='property'?.85:.93,radius:anchor==='glyph'?3.8:anchor==='printer'?3.7:anchor==='ledger'?3.9:anchor==='boundary'?5.5:4.6};
}

const substantial=new Set<OfficeAction>(['recruit','survey','evict','lease','glyph','assemble','notarize','print','audit','queue','commit','memory']);
function duration(action:OfficeAction,kind:string){
 if(kind==='PREMISES_DISCOVERY')return [1400,800];
 if(action==='print')return [1250,850];
 if(action==='notarize')return [1000,650];
 if(action==='glyph')return [800,550];
 if(action==='recruit')return [850,600];
 return substantial.has(action)?[750,550]:[420,360];
}

/** One supplied record becomes one observed action; repeated letters retain separate receipts. */
export function planOfficeSteps(events:readonly ExecutionEvent[],context:{id:string;ordinal?:string;text?:string;source?:ObservedOfficeStep['source'];hasFile?:boolean;previous?:ObservedOfficeStep},ensureDisclosure=false):ObservedOfficeStep[] {
 const result:ObservedOfficeStep[]=[],glyphs:GlyphReceipt[]=[],hrStates:PersonnelLamp[]=Array(7).fill(undefined);
 let previous=context.previous,tenantCode:string|undefined;
 for(const [index,event]of events.entries()){
  const match=event.kind==='GLYPH_ACCEPTED'?event.finding.match(/Accepted (FizzBuzz|Fizz|Buzz) position (\d+): character (\S), SKU ([^,]+)/):null;
  if(match&&glyphs.length<8)glyphs.push({product:match[1],position:Number(match[2]),character:match[3],sku:match[4]});
  const {action,room,anchor}=identifyAction(event,previous),hrIndex=personnelOffices.indexOf(event.office),shot=shotFor(room,anchor,hrIndex);
  const status=event.kind.slice(3);if(event.kind.startsWith('HR_')&&hrIndex>=0&&['APPROVED','REJECTED','NOT_REACHED'].includes(status))hrStates[hrIndex]=status as PersonnelLamp;
  if(event.kind==='PREMISES_DISCOVERY')tenantCode=event.finding.match(/U\+[A-Fa-f0-9]{4,6}/)?.[0];
  const same=previous?.shot.room===room&&previous.shot.anchor===anchor&&(action!=='recruit'||previous.hrIndex===hrIndex);
  const distance=previous?Math.hypot(previous.shot.target.x-shot.target.x,previous.shot.target.z-shot.target.z):0;
  const arriveMs=same?0:previous?.shot.room===room?620:1350+Math.round(distance*15);
  const [workMs,holdMs]=duration(action,event.kind);
  const step:ObservedOfficeStep={id:context.id+':'+index,event,source:context.source||'recorded',ordinal:context.ordinal||event.ordinal||'',text:context.text||'',action,shot,hasFile:context.hasFile??!!context.ordinal,publication:event.kind==='PUBLICATION'||event.kind==='DISCLOSE_OBSERVED',arriveMs,workMs,holdMs,glyphs:[...glyphs],hrIndex,hrStates:[...hrStates],tenantCode};
  if(previous)step.origin={room:previous.shot.room,station:previous.shot.anchor,hrIndex:previous.hrIndex};
  result.push(step);previous=step;
 }
 if(ensureDisclosure&&!result.some(s=>s.publication)){
  const event:ExecutionEvent={ordinal:context.ordinal||null,kind:'DISCLOSE_OBSERVED',office:'Observed Output Disclosure',finding:'Disclose the supplied text. No individual publication record accompanied this response; fresh production decisions are not inferred.',document:context.text||''};
  result.push(...planOfficeSteps([event],{...context,id:context.id+':disclosure',source:'disclosure',previous}));
 }
 return result;
}

export function planFolio(folio:Folio,id:string,previous?:ObservedOfficeStep):ObservedOfficeStep[]{
 const context={id,ordinal:folio.ordinal,text:folio.text,previous,hasFile:true};
 if(folio.cache==='HIT')return planOfficeSteps([
  {ordinal:folio.ordinal,kind:'CACHE_RECEIPT',office:'Institutional Memory',finding:'The response reported a cache hit. This retained line requires no fresh hiring, glyph procurement or numerical audit transaction.',document:folio.text},
  {ordinal:folio.ordinal,kind:'DISCLOSE_OBSERVED',office:'Retained Output Disclosure',finding:'Display the retained answer. This is a new UI disclosure of an already completed result.',document:folio.text},
 ],{...context,source:'disclosure'});
 return planOfficeSteps(folio.events,context,true);
}

export const stepDuration=(step:ObservedOfficeStep)=>step.arriveMs+step.workMs+step.holdMs;
export const smooth=(value:number)=>{const t=Math.max(0,Math.min(1,value));return t*t*(3-2*t);};
export function cueAt(step:ObservedOfficeStep,elapsed:number):OfficeCue {
 const travel=step.arriveMs?Math.min(1,elapsed/step.arriveMs):1;
 const work=Math.max(0,Math.min(1,(elapsed-step.arriveMs)/step.workMs));
 const hold=Math.max(0,Math.min(1,(elapsed-step.arriveMs-step.workMs)/step.holdMs));
 return {step,travel:smooth(travel),work:smooth(work),hold,phase:travel<1?'arrival':work<1?'work':'hold',complete:elapsed>=stepDuration(step)};
}

/** Elapsed time advances until explicitly held; visibility only chooses the callback driver. */
export class ObservationClock {
 elapsed=0;private last?:number;private allowed=false;
 readonly step:ObservedOfficeStep;
 constructor(step:ObservedOfficeStep){this.step=step;}
 tick(now:number,allow:boolean,manual=false,budget:{rate:number;maxAdvanceMs:number}={rate:1,maxAdvanceMs:Infinity}):OfficeCue {
  const delta=this.last===undefined||!this.allowed?0:Math.max(0,now-this.last);this.last=now;this.allowed=allow;
  const advance=budget.rate===Infinity?(delta>0?budget.maxAdvanceMs:0):delta*budget.rate;
  if(allow)this.elapsed=manual?stepDuration(this.step):Math.min(stepDuration(this.step),this.elapsed+Math.min(advance,budget.maxAdvanceMs));
  return cueAt(this.step,this.elapsed);
 }
}
