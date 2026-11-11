import {HeistCoordinator,heistEligible,planHeist,heistAntic} from './office-heist-model.ts';
import {officeEstate} from './office-estate';
import {PresentationScheduler} from './presentation-scheduler';
import {node} from './companion-story';
import {companionCatalog} from './companions';
import type {Discovery} from './discovery-model';

/** This singleton stays in demo.js; GPU scenes receive immutable snapshots. */
export const officeHeist=new HeistCoordinator();
const scheduler=new PresentationScheduler(()=>!document.hidden&&document.body.dataset.sitePage==='demo');
function tick(now:number){officeHeist.advance(now,!officeEstate.moving);if(officeHeist.active)scheduler.request(tick);}
officeHeist.subscribe(()=>{if(officeHeist.active)scheduler.request(tick);else scheduler.cancel();});
for(const event of ['visibilitychange','site-page-change','demo-desk-change','office-fullscreen-change'])document.addEventListener(event,()=>scheduler.refresh());
addEventListener('pagehide',()=>{scheduler.cancel();officeHeist.finish('cancelled');},{once:true});

export class StampHeistDesk {
 private mandate='';private active=false;private seen=new Set<string>();private companions=new Map<string,Discovery>();private count=0;private last='0';private enabled=true;private rehearsalSerial=0;
 private views:HeistPanel[];private held=false;
 constructor(private readonly mayInterrupt:()=>boolean,private readonly wake:()=>void){
  try{this.enabled=sessionStorage.getItem('slopbuzz:stamp-heists:v1')!=='off';}catch{/* Refused preference storage does not close the office. */}
  this.views=['supervision','office'].map(prefix=>new HeistPanel(prefix));
  for(const checkbox of document.querySelectorAll<HTMLInputElement>('[data-heist-enabled]')){
   checkbox.checked=this.enabled;checkbox.addEventListener('change',()=>{this.enabled=checkbox.checked;for(const other of document.querySelectorAll<HTMLInputElement>('[data-heist-enabled]'))other.checked=this.enabled;try{sessionStorage.setItem('slopbuzz:stamp-heists:v1',this.enabled?'on':'off');}catch{}if(!this.enabled){++this.rehearsalSerial;officeHeist.finish('disabled');}});
  }
  document.getElementById('heist-rehearse')!.addEventListener('click',()=>void this.rehearse());
  document.getElementById('office-close')!.addEventListener('click',()=>{++this.rehearsalSerial;});
  officeHeist.subscribe(()=>{if(this.held!==officeHeist.active){this.held=officeHeist.active;this.wake();}this.records();});
 }
 begin(mandate:string){this.cancel();this.mandate=mandate;this.active=true;this.seen.clear();this.companions.clear();this.count=0;this.last='0';}
 complete(){this.active=false;}
 cancel(){this.active=false;++this.rehearsalSerial;officeHeist.finish('cancelled');}
 clear(){this.companions.clear();officeHeist.finish('cancelled');}
 remember(discovery:Discovery){
  if(!this.active||discovery.mandate!==this.mandate)return;
  const ordinal=discovery.assignment.ordinal,key=discovery.strategy+'|'+ordinal;
  this.companions.set(ordinal,discovery);while(this.companions.size>100)this.companions.delete(this.companions.keys().next().value!);
  if(this.seen.has(key))return;this.seen.add(key);while(this.seen.size>1000)this.seen.delete(this.seen.values().next().value!);
  if(!this.enabled||!this.mayInterrupt()||officeHeist.active||officeEstate.moving||this.count>=3||!heistEligible(ordinal)||BigInt(ordinal)-BigInt(this.last)<30n)return;
  const previous=[...this.companions.values()].filter(d=>d.strategy===discovery.strategy&&BigInt(d.assignment.ordinal)<BigInt(ordinal)).sort((a,b)=>BigInt(a.assignment.ordinal)>BigInt(b.assignment.ordinal)?-1:1);
  const roster=[discovery,...previous].filter((d,i,all)=>all.findIndex(a=>a.companion.id===d.companion.id)===i).slice(0,3).map(d=>d.companion);
  if(officeHeist.start(planHeist(this.mandate,ordinal,discovery.strategy,roster))){this.count++;this.last=ordinal;}
 }
 private async rehearse(){
  if(officeHeist.active)return;const serial=++this.rehearsalSerial,button=document.getElementById('heist-rehearse') as HTMLButtonElement,status=document.getElementById('heist-rehearsal-status')!;
  button.disabled=true;status.textContent='Security is recruiting three entirely fictional suspects…';
  try{
   const catalog=await companionCatalog();if(serial!==this.rehearsalSerial)return;
   const choice=(document.getElementById('heist-suspect') as HTMLSelectElement).value;
   const glyphs=[choice,...['🐌','👻','🐙'].filter(g=>g!==choice)];
   // The nonhuman catalog excludes faces. This visiting ghost is explicitly a
   // security stand-in, never a catalog entry or an earned discovery.
   const actors=glyphs.map(g=>g==='👻'?{id:'security-ghost-v1',name:'Ghost of Pending Approval',emoji:g}:catalog.entries.find(c=>c.emoji===g)).filter((c):c is NonNullable<typeof c>=>!!c);
   if(actors.length!==3)throw new Error('The complete rehearsal cast is unavailable.');
   const plan=planHeist('111','33','security-rehearsal-v1',actors,'rehearsal');
   if(officeHeist.start(plan)){status.textContent='Rehearsal in progress. These stand-ins earn no companion discoveries.';document.getElementById('office-stage')!.scrollIntoView({block:'nearest',behavior:'instant'});}
  }catch(error){if(serial===this.rehearsalSerial)status.textContent='The rehearsal could not start: '+(error as Error).message;}
  finally{button.disabled=false;}
 }
 private records(){
  const last=officeHeist.records.at(-1),target=document.getElementById('heist-records')!;
  const key=officeHeist.records.map(r=>r.id+':'+r.resolution).join('|');if(target.dataset.records===key)return;target.dataset.records=key;
  target.replaceChildren(...officeHeist.records.slice().reverse().map(r=>node('li',`${r.plan.source==='rehearsal'?'Security rehearsal':'Ordinal '+r.plan.ordinal}: ${r.plan.actors[0].name}. ${r.finding}`)));
  if(last)document.getElementById('heist-rehearsal-status')!.textContent=last.finding+' Numerical output and companion appointments retain their existing records.';
 }
}

class HeistPanel {
 private root:HTMLElement;private label:HTMLElement;private status:HTMLElement;private cast:HTMLElement;private actions:HTMLElement;private signature='';private lastStatus='';private record=0;
 constructor(private readonly prefix:string){
  this.root=node('section');this.root.className='heist-panel';this.root.id=prefix+'-heist';this.root.hidden=true;this.root.setAttribute('aria-label','The Great Rubber-Stamp Heist');
  this.label=node('strong');this.status=node('p');this.status.setAttribute('role','status');this.status.setAttribute('aria-live','polite');this.status.setAttribute('aria-atomic','true');
  this.cast=node('div');this.cast.className='heist-suspects';this.cast.setAttribute('role','group');this.cast.setAttribute('aria-label','Intercept a suspect');
  this.actions=node('div');this.actions.className='heist-actions';
  for(const [text,title,action] of [['👣','Follow footprints',()=>officeHeist.follow()],['🍪','Offer an amnesty biscuit',()=>officeHeist.recover('biscuit')],['↪','Skip the chase',()=>officeHeist.finish('skipped')]] as const){const b=node('button',text);b.type='button';b.title=title;b.setAttribute('aria-label',title);b.addEventListener('click',()=>{if(b.getAttribute('aria-disabled')!=='true')action();});this.actions.append(b);}
  this.root.append(this.label,this.status,this.cast,this.actions);document.getElementById(prefix==='office'?'office-stage':'supervision-stage')!.append(this.root);
  officeHeist.subscribe(()=>this.render());
  officeEstate.subscribe(event=>{if(event.kind!=='progress')this.render();});
 }
 private render(){
  const s=officeHeist.snapshot;
  if(!s){
   const record=officeHeist.records.at(-1);if(record&&record.id!==this.record){this.record=record.id;this.status.textContent=record.finding;}
   if(this.root.contains(document.activeElement)){const target=document.getElementById((document.getElementById('office-fullscreen') as HTMLDialogElement).open?'office-fullscreen-exit':this.prefix==='office'?'office-close':'supervision-pause');target?.focus({preventScroll:true});}
   this.root.hidden=true;this.root.removeAttribute('data-active');return;
  }
  this.root.hidden=false;this.root.dataset.active='true';this.root.dataset.heistId=String(s.id);this.root.dataset.holder=String(s.holder);this.root.dataset.phase=s.returning?'returning':'chase';
  const title=s.plan.source==='rehearsal'?'Security rehearsal · Stamp heist':'Stamp heist · '+s.plan.ordinal;
  if(this.label.textContent!==title)this.label.textContent=title;
  const status=(officeEstate.moving?'Pursuit held while Facilities moves the rooms. ':s.returning?'':heistAntic(s.plan.actors[s.holder])+' ')+s.announcement;
  if(this.lastStatus!==status){this.status.textContent=status;this.lastStatus=status;}
  if(this.signature!==s.id+'|'+s.plan.key){this.signature=s.id+'|'+s.plan.key;this.cast.replaceChildren(...s.plan.actors.map((actor,index)=>{const b=node('button',actor.emoji);b.type='button';b.title=actor.name;b.setAttribute('aria-label','Intercept '+actor.name);b.dataset.suspect=String(index);const id=s.id;b.addEventListener('click',()=>{if(b.getAttribute('aria-disabled')!=='true')officeHeist.intercept(index,id);});return b;}));}
  for(const button of this.cast.querySelectorAll<HTMLButtonElement>('button'))button.setAttribute('aria-disabled',String(s.returning||officeEstate.moving));
  for(const button of this.actions.querySelectorAll<HTMLButtonElement>('button'))button.setAttribute('aria-disabled',String((s.returning||officeEstate.moving)&&button.getAttribute('aria-label')!=='Skip the chase'));
 }
}
