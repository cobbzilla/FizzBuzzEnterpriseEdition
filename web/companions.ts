import {request} from './runtime';
import type {Companion} from '../catalog/bestiary';
import {node} from './companion-story';
export {node,characterStory} from './companion-story';
import {companionDialog} from './companion-dialog';
import {discoveryStore,type DiscoveryRun} from './discovery-store';
import {seedPolicy,type Discovery} from './discovery-model';
export type {Companion};
export interface FactorEvidence {factors:string;cofactor:string;complete:boolean;divisions:number;divisionBudget:number;trialPrimeCeiling:number}
export interface Assignment {ordinal:string;flavor:'Fizz'|'Buzz'|'FizzBuzz';companionId:string;ticket:number;factors:FactorEvidence}
export interface Catalog {schema:string;version:string;tickets:number;entries:Companion[]}
export interface Policy {id:string;name:string;explanation:string}
let catalogPromise:Promise<Catalog>|undefined;
export async function companionCatalog(){
 if(!catalogPromise)catalogPromise=(async()=>{const r=await request('/companions/catalog');if(!r.ok)throw new Error('The bestiary returned '+r.status+'.');const data:Catalog=await r.json();if(data.schema!=='slopbuzz-companions/v1'||data.tickets!==1000000000||!Array.isArray(data.entries)||data.entries.length<200)throw new Error('The bestiary supplied an unfamiliar charter.');return data;})().catch(error=>{catalogPromise=undefined;throw error;});
 return catalogPromise;
}
export async function companionPolicies():Promise<Policy[]>{const r=await request('/companions/strategies');if(!r.ok)throw new Error('The strategy registry returned '+r.status+'.');const data=await r.json();if(!Array.isArray(data.strategies)||!data.strategies.length)throw new Error('No assignment strategy was supplied.');return data.strategies;}
/** Read-only presentation department. Numerical production never depends on a companion request. */
export class CompanionDesk {
 private readonly enabled=document.querySelector<HTMLInputElement>('#emoji-companions')!;
 private readonly policy=document.querySelector<HTMLSelectElement>('#companion-strategy')!;
 private readonly list=document.querySelector<HTMLOListElement>('#companion-list')!;
 private readonly scroller=document.querySelector<HTMLElement>('#companion-scroll')!;
 private readonly status=document.querySelector<HTMLElement>('#companion-status')!;
 private readonly dialog=document.querySelector<HTMLDialogElement>('#companion-dialog')!;
 private readonly latest=document.querySelector<HTMLButtonElement>('#companion-latest')!;
 private readonly roll=document.querySelector<HTMLElement>('#companion-roll')!;
 private readonly requireRoll=document.querySelector<HTMLInputElement>('#require-companion-roll-call')!;
 private rollScroll=0;
 private restoringRoll=false;private rollTransition=0;private rollVisible=false;
 private visible=new Map<string,string>();private batches=new Map<string,Promise<Assignment[]>>();private assigned=new Map<string,Assignment>();
 private lastSignature='';private entries=new Map<string,Companion>();private version='';private generation=0;private following=true;private mandate='15';
 private discoveryRun?:DiscoveryRun;
 constructor(private readonly office?:{remember(d:Discovery):void;clearCompanions():void}){
  const attendance=()=>{const transition=++this.rollTransition;this.restoringRoll=true;if(!this.requireRoll.checked){this.rollScroll=this.scroller.scrollTop;if(this.scroller.scrollHeight-this.scroller.clientHeight-this.rollScroll>=24)this.following=false;this.roll.hidden=true;}else{const following=this.following,position=this.rollScroll;this.roll.hidden=false;requestAnimationFrame(()=>{if(transition!==this.rollTransition||!this.requireRoll.checked)return;this.scroller.scrollTop=following?this.scroller.scrollHeight:position;requestAnimationFrame(()=>{if(transition===this.rollTransition)this.restoringRoll=false;});});}};
  this.requireRoll.addEventListener('change',attendance);attendance();
  this.enabled.addEventListener('change',()=>{this.office?.clearCompanions();this.generation++;this.following=true;this.list.replaceChildren();this.lastSignature='';this.latest.hidden=true;if(this.enabled.checked){this.status.textContent='Opening companion appointments for disclosed output…';void this.refresh();}else this.status.textContent='Companion allocation suspended. Official numerical output remains available.';});
  this.policy.addEventListener('change',()=>{this.office?.clearCompanions();this.generation++;this.batches.clear();this.assigned.clear();this.list.replaceChildren();this.lastSignature='';this.following=true;this.status.textContent='Consulting the selected allocation authority…';void this.refresh();});
  this.scroller.addEventListener('scroll',()=>{if(this.roll.hidden||this.restoringRoll||!this.scroller.getClientRects().length)return;this.rollScroll=this.scroller.scrollTop;const atBottom=this.scroller.scrollHeight-this.scroller.clientHeight-this.scroller.scrollTop<24;const resume=atBottom&&!this.following;this.following=atBottom;if(resume)this.render();});
  document.addEventListener('demo-watch-layout',()=>{const visible=this.scroller.getClientRects().length>0;if(visible&&!this.rollVisible){this.restoringRoll=true;this.scroller.scrollTop=this.following?this.scroller.scrollHeight:this.rollScroll;requestAnimationFrame(()=>{this.restoringRoll=false;});}this.rollVisible=visible;});
  this.latest.addEventListener('click',()=>{this.following=true;this.render();this.scroller.scrollTop=this.scroller.scrollHeight;});
  void companionPolicies().then(policies=>{const selected=new URL(location.href).searchParams.get('authority')||this.policy.value;this.policy.replaceChildren(...policies.map(p=>{const option=node('option',p.name);option.value=p.id;return option;}));if(policies.some(p=>p.id===selected))this.policy.value=selected;this.policy.disabled=false;}).catch(error=>{this.status.textContent='Companion policy registry unavailable: '+error.message;});
 }
 beginRun(mandate:string){this.reset(mandate);this.discoveryRun=discoveryStore().beginRun();}
 completeRun(){this.discoveryRun?.complete();}
 withdrawRun(){this.generation++;this.discoveryRun?.withdraw();this.discoveryRun=undefined;}
 reset(mandate:string){this.completeRun();this.discoveryRun=undefined;this.mandate=mandate;this.generation++;this.visible.clear();this.assigned.clear();this.batches.clear();this.list.replaceChildren();this.lastSignature='';this.following=true;this.latest.hidden=true;this.status.textContent=this.enabled.checked?'Awaiting the first disclosed Fizz, Buzz or FizzBuzz.':'Companions are disabled.';}
 disclose(start:string,lines:readonly string[]){for(let i=0;i<lines.length;i++){this.visible.set((BigInt(start)+BigInt(i)).toString(),lines[i]);}while(this.visible.size>1000)this.visible.delete(this.visible.keys().next().value!);if(this.enabled.checked)void this.refresh();}
 private async refresh(){
  const generation=this.generation;if(!this.enabled.checked)return;
  const policy=this.policy.value||'factor-resonance-v1',mandate=this.mandate;
  try{
   const catalog=await companionCatalog();if(generation!==this.generation)return;
   if(!this.entries.size){this.entries=new Map(catalog.entries.map(c=>[c.id,c]));this.version=catalog.version;}
   const starts=new Set<string>();for(const [ordinal,text] of this.visible)if(/^(Fizz|Buzz|FizzBuzz)$/.test(text))starts.add((((BigInt(ordinal)-1n)/100n)*100n+1n).toString());
   // Requests are finite read-only Java inspections, shared by all disclosed lines in that window.
   for(const start of starts){
    const key=mandate+'|'+policy+'|'+start;let batch=this.batches.get(key);
    if(!batch){batch=(async()=>{const reply=await request('/companions/window?start='+start+'&count=100&strategy='+policy+'&seed='+mandate);if(!reply.ok)throw new Error('Assignment desk returned '+reply.status+'.');const data=await reply.json();if(data.schema!=='slopbuzz-companion-window/v2'||data.seedPolicy!==seedPolicy||data.mandateSeed!==mandate||data.catalogVersion!==this.version||data.strategy!==policy||data.start!==start||data.count!==100||!Array.isArray(data.assignments))throw new Error('Assignment evidence belongs to a different charter.');return data.assignments as Assignment[];})();this.batches.set(key,batch);batch.catch(()=>{if(this.batches.get(key)===batch)this.batches.delete(key);});}
    const assignments=await batch;if(generation!==this.generation||!this.enabled.checked)return;
    const finds:Discovery[]=[];for(const a of assignments)if(this.visible.get(a.ordinal)===a.flavor&&this.entries.has(a.companionId)){this.assigned.set(a.ordinal,a);finds.push(this.discovery(a,this.entries.get(a.companionId)!,mandate,policy));}if(finds.length){if(this.discoveryRun)this.discoveryRun.remember(finds);else discoveryStore().remember(finds);for(const d of finds)this.office?.remember(d);}
   }
   for(const ordinal of this.assigned.keys())if(!this.visible.has(ordinal))this.assigned.delete(ordinal);
   while(this.batches.size>12)this.batches.delete(this.batches.keys().next().value!);
   if(generation===this.generation)this.render();
  }catch(error){if(generation===this.generation)this.status.textContent='Companion paperwork unavailable: '+error.message+' Numerical output is still valid. Toggle companions to retry.';}
 }
 private render(){
  const rows=[...this.visible.keys()].map(key=>this.assigned.get(key)).filter((a):a is Assignment=>!!a).slice(-100);
  const signature=rows.map(a=>a.ordinal+':'+a.companionId).join('|');if(signature===this.lastSignature)return;
  if((!this.following||this.list.contains(document.activeElement)||this.dialog.open)&&this.list.childElementCount){this.latest.hidden=false;return;}
  this.latest.hidden=true;const fragment=document.createDocumentFragment();
  for(const a of rows){const c=this.entries.get(a.companionId)!;const li=node('li');const button=node('button');button.type='button';button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','companion-dialog');const glyph=node('span',c.emoji);glyph.setAttribute('aria-hidden','true');button.append(glyph,node('span',a.ordinal+' · '+a.flavor+' · '+c.name+' · '+c.rarity));button.addEventListener('click',()=>this.inspect(a,c,button));li.append(button);fragment.append(li);}
  this.list.replaceChildren(fragment);this.lastSignature=signature;this.scroller.scrollTop=this.scroller.scrollHeight;
  const last=rows.at(-1);const c=last?this.entries.get(last.companionId):undefined;
  this.status.textContent=c?last!.ordinal+' has welcomed '+c.name+'. '+c.rarity+' companion; latest '+rows.length+' encounters shown.':this.visible.size?'No companion-bearing proclamation disclosed yet.':'Awaiting the first disclosed Fizz, Buzz or FizzBuzz.';
 }
 private discovery(a:Assignment,c:Companion,mandate=this.mandate,strategy=this.policy.value):Discovery{return {companion:c,assignment:a,mandate,strategy,catalogVersion:this.version,seedPolicy,discoveredAt:new Date().toISOString()};}
 private inspect(a:Assignment,c:Companion,invoker:HTMLElement){this.following=false;companionDialog().open(this.discovery(a,c),invoker);}
}
