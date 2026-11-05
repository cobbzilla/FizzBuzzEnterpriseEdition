import {byId} from './dom';
import {desks,deskURL,readDesk,watchView,initialWatchView,type DemoDesk,type PresentationPolicy,type WatchView} from './demo-workspace-model';
import {companionDialog} from './companion-dialog';
import type {Discovery} from './discovery-model';
import type {Folio} from './chronicle';
import {officeEstate} from './office-estate';
import {requestReorganization} from './office-relocation';

export interface RunPresentation {
 pause():void;resume():void;
 placeChronicle(target:HTMLElement):void;
}
/** One mounted workspace owns navigation; it never submits or remounts a run. */
export class DemoWorkspace {
 private desk:DemoDesk='authorize';
 private readonly watch=byId<HTMLSelectElement>('watch-view');
 private readonly stage=byId('mandate-output');
 private readonly policyIds=['display-speed','emoji-companions','companion-strategy','require-companion-roll-call','executive-hovering'];
 private activeMandate='';private discovery?:Discovery;private pendingDiscovery?:Discovery;
 private committed=false;private applying=false;private manualView=false;
 private preferredAuthority=new URL(location.href).searchParams.get('authority')||'';
 private scroll=new Map<DemoDesk,number>();
 constructor(private readonly run:RunPresentation){
  document.querySelectorAll<HTMLAnchorElement>('[data-desk-link]').forEach(link=>link.addEventListener('click',event=>{
   if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   event.preventDefault();this.navigate(link.dataset.deskLink as DemoDesk);
  }));
  document.querySelectorAll<HTMLElement>('[data-go-desk]').forEach(button=>button.addEventListener('click',()=>this.navigate(button.dataset.goDesk as DemoDesk)));
  document.querySelectorAll<HTMLElement>('[data-evidence]').forEach(button=>button.addEventListener('click',()=>this.evidence(button.dataset.evidence!)));
  this.watch.addEventListener('change',()=>{this.manualView=true;this.layout();});
  document.addEventListener('demo-presentation-change',()=>this.layout());
  // A draft describes a future presentation; it does not control live regions yet.
  byId('authorize-require-companion-roll-call').removeAttribute('aria-controls');
  byId('authorize-executive-hovering').removeAttribute('aria-controls');
  byId<HTMLSelectElement>('experiment-view').addEventListener('change',()=>this.sections('experiment'));
  byId<HTMLSelectElement>('evidence-view').addEventListener('change',()=>this.sections('evidence'));
  byId('resume-current').addEventListener('click',()=>{this.navigate('observe');this.run.resume();});
  byId('office-choose-mandate').addEventListener('click',()=>{this.navigate('authorize');byId('limit').focus();});
  byId('watch-settings-toggle').addEventListener('click',()=>this.settings(byId('watch-settings').hidden===true));
  byId('watch-settings-close').addEventListener('click',()=>{this.settings(false);byId('watch-settings-toggle').focus();});
  byId('watch-settings').addEventListener('keydown',event=>{if(event.key==='Escape'){event.stopPropagation();this.settings(false);byId('watch-settings-toggle').focus();}});
  byId('watch-reorganize').addEventListener('click',()=>{this.settings(false);requestReorganization();byId('watch-waive').focus({preventScroll:true});});
  byId('watch-waive').addEventListener('click',()=>{officeEstate.finish();byId('watch-settings-toggle').focus({preventScroll:true});});
  byId('watch-settings-toggle').before(byId('watch-waive'));
  byId('watch-settings').append(byId('reveal-all'),byId('follow-output').closest('label')!);
  const ticker=document.createElement('span');ticker.id='watch-latest';byId('observed-mandate').after(ticker);
  byId('watch-waive').textContent='Waive';byId('watch-waive').setAttribute('aria-label','Waive the Moving Ceremony');
  byId('supervision-next').textContent='Next';byId('supervision-next').setAttribute('aria-label','Next recorded decision');
  byId('stop-reading').textContent='Stop';
  byId('companion-spotlight').tabIndex=0;byId('companion-spotlight').setAttribute('role','region');
  byId('run-status').tabIndex=0;byId('run-status').addEventListener('focus',()=>this.run.pause());
  byId('supervision-current').removeAttribute('role');byId('supervision-current').setAttribute('aria-live','off');
  byId('company-menu').addEventListener('click',()=>this.companyMenu(document.body.dataset.companyMenu!=='open'));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.body.dataset.companyMenu==='open'){this.companyMenu(false);byId('company-menu').focus();}});
  officeEstate.subscribe(()=>{byId('watch-waive').hidden=!officeEstate.moving;});
  byId('spotlight-open').addEventListener('click',()=>{if(this.discovery)companionDialog().open(this.discovery,byId('spotlight-open'));});
  byId('companion-dialog').addEventListener('close',()=>{if(this.pendingDiscovery)this.remember(this.pendingDiscovery);});
  byId('spotlight-open').addEventListener('blur',()=>queueMicrotask(()=>{if(this.pendingDiscovery&&!document.querySelector('dialog[open]'))this.remember(this.pendingDiscovery);}));
  for(const id of this.policyIds){
   byId('authorize-'+id).addEventListener('change',()=>{this.draftSummary();this.saveDraft();});
   byId(id).addEventListener('change',()=>{if(!this.committed&&!this.applying)this.copyLiveToDraft();this.layout();});
  }
  byId('limit').addEventListener('input',()=>this.draftSummary());
  const registry=byId<HTMLSelectElement>('companion-strategy');
  new MutationObserver(()=>{
   const draft=byId<HTMLSelectElement>('authorize-companion-strategy'),selected=draft.value;
   draft.replaceChildren(...[...registry.options].map(option=>option.cloneNode(true)));
   const wanted=this.preferredAuthority||selected;if([...draft.options].some(option=>option.value===wanted)){draft.value=wanted;this.preferredAuthority='';}
   draft.disabled=registry.disabled;this.draftSummary();
  }).observe(registry,{childList:true,attributes:true,attributeFilter:['disabled']});
  document.querySelectorAll<HTMLElement>('[data-open-personnel]').forEach(button=>button.addEventListener('click',()=>{
   // The actual opener is visible again before the native dialog restores focus.
   const trigger=byId('personnel-documents');trigger.dispatchEvent(new MouseEvent('click')); 
  }));
  new MutationObserver(()=>{byId('personnel-record-summary').textContent=byId('personnel-origin').textContent;}).observe(byId('personnel-origin'),{childList:true,characterData:true,subtree:true});
  new MutationObserver(()=>{if(document.querySelector('dialog[open]'))this.run.pause();}).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)this.run.pause();});
  addEventListener('popstate',()=>{const desk=readDesk(new URL(location.href));if(desk!==this.desk)this.show(desk,false);else this.retainDesk(desk);});
  const resize=new ResizeObserver(()=>this.fit());resize.observe(document.querySelector('.site-header')!);resize.observe(byId('discovery-register'));
  resize.observe(document.querySelector('.authorization-actions')!);
  addEventListener('resize',()=>{if(!this.manualView&&this.committed){this.watch.value=initialWatchView(matchMedia('(max-width: 700px), (max-height: 500px)').matches,this.live().hovering);this.layout();}else this.fit();});
  const hash=location.hash;if(hash.startsWith('#precedent'))this.select('evidence-view').value='precedent';if(hash.startsWith('#personnel'))this.select('evidence-view').value='personnel';if(hash.startsWith('#premises'))this.select('experiment-view').value='premises';
  this.restoreDraft();this.draftSummary();this.sections('experiment');this.sections('evidence');
  this.show(readDesk(new URL(location.href)),false,false);
 }
 get observing(){return this.desk==='observe';}
 private input(id:string){return byId<HTMLInputElement>(id);}
 private select(id:string){return byId<HTMLSelectElement>(id);}
 private policy(prefix=''):PresentationPolicy{return {cadence:this.select(prefix+'display-speed').value,companions:this.input(prefix+'emoji-companions').checked,authority:this.select(prefix+'companion-strategy').value,roll:this.input(prefix+'require-companion-roll-call').checked,hovering:this.input(prefix+'executive-hovering').checked};}
 live(){return this.policy();}
 private copyLiveToDraft(){for(const id of this.policyIds){const source=byId<HTMLInputElement|HTMLSelectElement>(id),draft=byId<HTMLInputElement|HTMLSelectElement>('authorize-'+id);if(source instanceof HTMLInputElement)(draft as HTMLInputElement).checked=source.checked;else if(source.value!=='executive-hovering')draft.value=source.value;}this.draftSummary();}
 commitDraft(mandate:string){
  const policy=this.policy('authorize-');this.applying=true;
  // Restore ordinary cadence before changing it; the director owns the special option.
  const hover=this.input('executive-hovering');if(hover.checked){hover.checked=false;hover.dispatchEvent(new Event('change'));}
  this.select('display-speed').value=policy.cadence;this.select('display-speed').dispatchEvent(new Event('change'));
  for(const [id,value]of [['emoji-companions',policy.companions],['require-companion-roll-call',policy.roll]] as const){const input=this.input(id);if(input.checked!==value){input.checked=value;input.dispatchEvent(new Event('change'));}}
  const authority=this.select('companion-strategy');if(authority.value!==policy.authority){authority.value=policy.authority;authority.dispatchEvent(new Event('change'));}
  if(policy.hovering){hover.checked=true;hover.dispatchEvent(new Event('change'));}this.applying=false;
  this.activeMandate=mandate;this.discovery=undefined;this.pendingDiscovery=undefined;this.committed=true;this.manualView=false;
  byId('watch-latest').textContent='';
  this.watch.value=initialWatchView(matchMedia('(max-width: 700px), (max-height: 500px)').matches,policy.hovering);
  byId('observed-mandate').textContent=mandate.length>28?mandate.slice(0,12)+'… · '+mandate.length+'-digit mandate':'Mandate '+mandate;
  byId('observe-empty').hidden=true;this.stage.hidden=false;byId('resume-current').hidden=false;
  this.clearCompanions();this.saveDraft();this.navigate('observe');this.layout();
 }
 navigate(desk:DemoDesk){this.show(desk,true);}
 private retainDesk(desk:DemoDesk){
  // Legacy fragments also arrive within an already mounted document. Keep the
  // selected desk when a native skip link replaces that fragment with #main.
  const entry=new URL(location.href);
  if(desk!=='authorize'&&entry.searchParams.get('desk')!==desk){entry.searchParams.set('desk',desk);history.replaceState(history.state,'',entry);}
 }
 private show(desk:DemoDesk,push:boolean,focus=true){
  const before=this.desk;
  if(before!==desk)this.scroll.set(before,scrollY);
  if(desk!=='observe')this.run.pause();
  if(before==='observe'&&desk!=='observe')this.placeChronicle(false);
  this.desk=desk;document.body.dataset.desk=desk;this.companyMenu(false);byId('company-menu').hidden=desk!=='observe';this.settings(false);
  for(const key of desks)byId('desk-'+key).hidden=key!==desk;
  const url=deskURL(new URL(location.href),desk);
  if(push&&readDesk(new URL(location.href))!==desk)history.pushState({...history.state},'',url);
  this.retainDesk(desk);
  document.querySelectorAll<HTMLAnchorElement>('[data-desk-link]').forEach(link=>{const key=link.dataset.deskLink as DemoDesk;link.href=deskURL(new URL(location.href),key).href;if(key===desk)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});
  this.layout();
  if(focus){const heading=byId('desk-'+desk).querySelector<HTMLElement>('h1')!;heading.focus({preventScroll:true});window.scrollTo({top:desk==='observe'?0:this.scroll.get(desk)||0,behavior:'instant'});}
  document.dispatchEvent(new CustomEvent('demo-desk-change',{detail:{desk}}));
  requestAnimationFrame(()=>this.fit());
 }
 evidence(record:string){this.select('evidence-view').value=record;this.sections('evidence');this.navigate('evidence');}
 private sections(kind:'experiment'|'evidence'){
  const value=this.select(kind+'-view').value,attribute=kind==='experiment'?'experiment':'record';
  document.querySelectorAll<HTMLElement>('[data-'+attribute+']').forEach(section=>section.hidden=section.dataset[attribute]!==value);
  if(kind==='evidence'&&this.desk==='evidence')this.placeChronicle(false);
 }
 private settings(open:boolean){byId('watch-settings').hidden=!open;byId('watch-settings-toggle').setAttribute('aria-expanded',String(open));}
 private placeChronicle(watch:boolean){
  this.run.placeChronicle(byId(watch?'watch-chronicle-slot':'evidence-chronicle-slot'));
 }
 private layout(){
  const policy=this.live(),view=watchView(this.watch.value,policy.hovering,policy.companions&&policy.roll);
  this.watch.value=view;this.stage.dataset.watchView=view;this.stage.dataset.companions=String(policy.companions);this.stage.dataset.office=String(policy.hovering);
  const officeOption=this.watch.querySelector<HTMLOptionElement>('[value="office"]')!,companionOption=this.watch.querySelector<HTMLOptionElement>('[value="companions"]')!;
  officeOption.disabled=!policy.hovering;officeOption.textContent=policy.hovering?'Office':'Office — enable Executive Hovering';
  companionOption.disabled=!policy.companions||!policy.roll;companionOption.textContent=!policy.companions?'Companions — commission appointments':!policy.roll?'Companions — enable Roll Call':'Companions';
  this.placeChronicle(this.observing&&view==='commentary');this.fit();
  document.dispatchEvent(new Event('demo-watch-layout'));
 }
 private companyMenu(open:boolean){document.body.dataset.companyMenu=open?'open':'closed';byId('company-menu').setAttribute('aria-expanded',String(open));}
 private fit(){document.body.dataset.expandedText=String(parseFloat(getComputedStyle(document.documentElement).fontSize)>20);document.documentElement.style.setProperty('--authorization-height',Math.ceil(document.querySelector('.authorization-actions')!.getBoundingClientRect().height)+'px');if(!this.observing)return;const top=byId('desk-observe').getBoundingClientRect().top,bottom=byId('discovery-register').getBoundingClientRect().height;byId('desk-observe').style.setProperty('--observe-height',Math.max(120,innerHeight-top-bottom-8)+'px');}
 disclosed(folio:Folio|undefined){
  if(!folio)return;const host=byId('watch-prose'),text=folio.narrative?.slice(0,2)||folio.events.slice(0,2).map(event=>event.office+': '+event.finding);
  byId('watch-latest').textContent=' · '+folio.ordinal+': '+folio.text;
  // Preserve a reader's selected commentary; the complete chronicle has its own follow contract.
  if(host.contains(document.activeElement)||host.scrollTop>8)return;
  const title=document.createElement('strong');title.textContent='Ordinal '+folio.ordinal+' · '+folio.text;
  host.replaceChildren(title,...text.map(text=>{const p=document.createElement('p');p.textContent=text;return p;}));
 }
 clearCompanions(){this.discovery=undefined;this.pendingDiscovery=undefined;byId('spotlight-glyph').textContent='◇';byId('spotlight-name').textContent=this.live().companions?'Awaiting a companion':'Appointments suspended';byId('spotlight-detail').textContent='No disclosed friend has reported for duty.';byId('spotlight-energy').textContent='';byId<HTMLButtonElement>('spotlight-open').disabled=true;}
 remember(discovery:Discovery){
  if(discovery.mandate!==this.activeMandate||this.discovery&&BigInt(discovery.assignment.ordinal)<BigInt(this.discovery.assignment.ordinal))return;
  if(document.activeElement===byId('spotlight-open')||byId<HTMLDialogElement>('companion-dialog').open){this.pendingDiscovery=discovery;return;}
  this.pendingDiscovery=undefined;this.discovery=discovery;const c=discovery.companion;
  byId('spotlight-glyph').textContent=c.emoji;byId('spotlight-name').textContent=c.name;byId('spotlight-detail').textContent=discovery.assignment.ordinal+' · '+discovery.assignment.flavor+' · '+c.rarity;byId('spotlight-energy').textContent=c.energy;byId<HTMLButtonElement>('spotlight-open').disabled=false;
 }
 private draftSummary(){const p=this.policy('authorize-');byId('authorization-summary').textContent=(this.input('limit').value||'Unspecified')+' numbers · '+(p.companions?'companions commissioned':'no companion appointments')+' · '+(p.hovering?'executive supervision authorized':'ordinary disclosure');const cadence=this.select('authorize-display-speed');cadence.disabled=p.hovering;byId('authorize-pace-help').textContent=p.hovering?'Executive Hovering governs every recorded decision; ordinary cadence resumes when supervision is withdrawn.':'Choose the ceremonial reading pace. Executive Fiat introduces no delay.';}
 private saveDraft(){try{sessionStorage.setItem('slopbuzz:authorization-draft:v1',JSON.stringify(this.policy('authorize-')));}catch{/* A configuration remains usable without storage. */}}
 private restoreDraft(){
  try{
   const p=JSON.parse(sessionStorage.getItem('slopbuzz:authorization-draft:v1')||'null') as PresentationPolicy|null;if(!p)return;
   for(const [id,value]of [['emoji-companions',p.companions],['require-companion-roll-call',p.roll],['executive-hovering',p.hovering]] as const)if(typeof value==='boolean')this.input('authorize-'+id).checked=value;
   if(['1800','800','225','0'].includes(p.cadence))this.select('authorize-display-speed').value=p.cadence;
   if(!this.preferredAuthority&&typeof p.authority==='string')this.preferredAuthority=p.authority;
  }catch{/* Invalid preferences are discarded, never executed. */}
 }
}
