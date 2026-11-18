import {PortfolioStore} from './portfolio-store';
import {pointRates,scoreRarities,portfolioPoints,appointmentCount,compactPoints,exactPoints,type PortfolioReceipt} from './portfolio-model';
import {node} from './companion-story';

export class PortfolioDesk extends PortfolioStore {
 private selected=document.querySelector<HTMLSelectElement>('#portfolio-run')!;
 constructor(){
  let storage:Storage|undefined;try{storage=localStorage;}catch{/* In-memory scoring remains available. */}
  super(storage);
  this.subscribe(()=>this.render());this.selected.addEventListener('change',()=>this.render());
  addEventListener('pagehide',()=>this.finish('interrupted'));this.render();
 }
 private render(){
  const {current,saved,persistent}=this.snapshot(),points=current?portfolioPoints(current):0n;
  for(const element of document.querySelectorAll<HTMLElement>('[data-portfolio-points]')){element.textContent=compactPoints(points);element.title=exactPoints(points)+' Portfolio Points';element.dataset.exact=String(points);}
  const button=document.querySelector<HTMLButtonElement>('#portfolio-open')!;
  button.setAttribute('aria-label','Portfolio Points: '+exactPoints(points)+'. Open score breakdown');
  const selected=this.selected.value;this.selected.replaceChildren();
  const option=node('option',current?.status==='active'?'Current run':'Latest banked run');option.value='current';this.selected.append(option);
  if(saved){const previous=node('option','Previous banked run');previous.value='saved';this.selected.append(previous);}
  this.selected.value=selected==='saved'&&saved?'saved':'current';this.selected.disabled=!saved;
  const receipt=this.selected.value==='saved'?saved:current;
  const set=(id:string,value:string)=>{document.getElementById(id)!.textContent=value;};
  const status:Record<PortfolioReceipt['status'],string>={active:'Earning points',completed:'Mandate complete · points banked',stopped:'Proceedings stopped · points banked',replaced:'Replaced mandate · points banked',interrupted:'Saved proceedings · points banked'};
  set('portfolio-status',receipt?status[receipt.status]:'Authorize a mandate to start earning.');
  set('portfolio-total',exactPoints(receipt?portfolioPoints(receipt):0n));
  set('portfolio-appearances',exactPoints(receipt?appointmentCount(receipt):0n));
  set('portfolio-distinct',String(receipt?.seen.length||0));
  const rows=document.getElementById('portfolio-tiers')!;
  rows.replaceChildren(...scoreRarities.map(tier=>{const row=node('tr'),label=node('th',tier);label.scope='row';const count=BigInt(receipt?.counts[tier]||'0');row.append(label,node('td',exactPoints(pointRates[tier])),node('td',exactPoints(count)),node('td',exactPoints(count*pointRates[tier])));return row;}));
  const best=receipt?.highest;set('portfolio-highest',best?`${best.emoji} ${best.name} · ${best.rarity} · ${exactPoints(pointRates[best.rarity])} points at ordinal ${best.ordinal}`:'No appointed companion yet.');
  set('portfolio-storage',persistent?'Points are saved in this browser. The latest run and previous banked run are retained; starting another run begins at zero.':'Browser storage is unavailable. Points remain available in this page until it closes.');
  const missing=BigInt(receipt?.unscored||'0'),disabled=BigInt(receipt?.disabled||'0');
  set('portfolio-coverage',`${exactPoints(disabled)} appointments disclosed with companions disabled.`+(missing?` ${exactPoints(missing)} appointments could not be verified; this is a partial score. Numerical output remains valid.`:''));
  document.getElementById('portfolio-incomplete')!.hidden=!current||current.unscored==='0';
  const conditions=receipt?`Mandate / seed: ${receipt.mandate}\nScored disclosure checkpoint: ${receipt.through}\nRules: ${receipt.rules}\nCatalog: ${receipt.catalogVersion||'Awaiting appointments'}\nSeed policy: ${receipt.seedPolicy}\nInitial authority: ${receipt.initialAuthority}\nAuthority changes: ${receipt.authorityChanges}\nAppointments by authority: ${Object.entries(receipt.authorities).map(([policy,count])=>policy+' = '+count).join('; ')||'None'}\nRun: ${receipt.id}\nStarted: ${receipt.startedAt}\nSaved: ${receipt.updatedAt}`:'No run receipt yet.';
  set('portfolio-receipt',conditions);
 }
}
