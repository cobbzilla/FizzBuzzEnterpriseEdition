import {byId} from './dom';
import {companionTile} from './companion-tile';
import type {Discovery} from './discovery-model';

export class RecentAppointments {
 private readonly panel=byId('companion-spotlight');private readonly host=byId('spotlight-appointments');
 private readonly dialog=byId<HTMLDialogElement>('companion-dialog');private history=new Map<string,Discovery>();private queued=false;private frame=0;
 constructor(){
  new ResizeObserver(()=>this.schedule()).observe(this.host);
  this.host.addEventListener('focusout',()=>queueMicrotask(()=>this.render()));
  this.dialog.addEventListener('companion-closed',()=>this.render());
  document.addEventListener('demo-watch-layout',()=>this.schedule());document.addEventListener('office-fullscreen-change',()=>this.schedule());
 }
 clear(){this.history.clear();this.queued=false;this.host.replaceChildren();const placeholder=document.createElement('button');placeholder.id='spotlight-open';placeholder.type='button';placeholder.disabled=true;placeholder.className='companion-chip';placeholder.setAttribute('aria-label','Awaiting a companion');const glyph=document.createElement('span');glyph.id='spotlight-glyph';glyph.className='companion-glyph';glyph.setAttribute('aria-hidden','true');glyph.textContent='◇';placeholder.append(glyph);this.host.append(placeholder);byId('spotlight-name').textContent='Awaiting a companion';byId('spotlight-detail').textContent='No disclosed friend has reported for duty.';byId('spotlight-energy').textContent='';this.schedule();}
 remember(discovery:Discovery){
  const previous=this.history.get(discovery.assignment.ordinal);if(previous?.companion.id===discovery.companion.id&&previous.strategy===discovery.strategy&&previous.catalogVersion===discovery.catalogVersion)return;
  this.history.set(discovery.assignment.ordinal,discovery);
  const ordered=[...this.history.values()].sort((a,b)=>BigInt(a.assignment.ordinal)>BigInt(b.assignment.ordinal)?-1:1).slice(0,100);
  this.history=new Map(ordered.map(d=>[d.assignment.ordinal,d]));this.queued=true;this.schedule();
 }
 private render(){
  if(!this.queued||this.host.contains(document.activeElement)||this.dialog.open)return;
  this.queued=false;const rows=[...this.history.values()];this.host.replaceChildren(...rows.map((d,index)=>{const button=companionTile(d);button.dataset.ordinal=d.assignment.ordinal;if(!index){button.id='spotlight-open';button.querySelector('.companion-glyph')!.id='spotlight-glyph';}return button;}));
  if(rows.length){const latest=rows[0];byId('spotlight-name').textContent=latest.companion.name;byId('spotlight-detail').textContent=latest.assignment.ordinal+' · '+latest.assignment.flavor+' · '+latest.companion.rarity;byId('spotlight-energy').textContent=latest.companion.energy;}
  this.layout();
 }
 private schedule(){if(!this.frame)this.frame=requestAnimationFrame(()=>{this.frame=0;this.render();this.layout();});}
 private layout(){
  const compact=this.panel.getBoundingClientRect().height<128*(parseFloat(getComputedStyle(document.documentElement).fontSize)/16);if(this.panel.dataset.compact!==String(compact))this.panel.dataset.compact=String(compact);
  const box=this.host.getBoundingClientRect();if(!box.width||!box.height)return;
  const buttons=[...this.host.querySelectorAll<HTMLButtonElement>('button')],focused=this.host.contains(document.activeElement);
  for(const button of buttons)button.hidden=false;
  const mobile=matchMedia('(max-width:700px)').matches,first=buttons[0]?.getBoundingClientRect();
  const gap=parseFloat(getComputedStyle(this.host).gap)||0,padding=parseFloat(getComputedStyle(this.host).paddingTop)||0;
  const capacity=first?Math.max(1,Math.floor((box.width-2*padding+gap)/(first.width+gap))*Math.floor((box.height-2*padding+gap)/(first.height+gap))):1;
  const title=!mobile&&capacity>1?'Latest appointments':'Latest appointment';if(byId('spotlight-title').textContent!==title)byId('spotlight-title').textContent=title;
  let shown=0;for(const button of buttons){const rect=button.getBoundingClientRect(),fits=rect.bottom<=box.bottom-padding+1&&rect.right<=box.right-padding+1;button.hidden=(mobile&&shown>=1)||!fits;if(!button.hidden)shown++;}
  this.panel.dataset.capacity=String(mobile?1:capacity);this.panel.dataset.appointments=String(shown);
  if(focused&&document.activeElement?.closest('[hidden]'))buttons.find(button=>!button.hidden)?.focus({preventScroll:true});
 }
}
