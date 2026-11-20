import {EnterpriseScoringService,netPoints,cycleAuthority,heistFinancials,cabinetStorageKey,scoreCategories,type ScoringRun} from './scoring-service';
import {badgeRules,guidePath,ruleById,rarityTables,scoringPolicy} from './scoring-rules';
import {badgeSVG} from './scoring-badges';
import {formatPoints as fmt} from './scoring-format';
import {portfolioPoints,appointmentCount,pointRates,type PortfolioStatus} from './portfolio-model';
import {node} from './companion-story';
import {scope} from './release-assets';
import {describe} from './scoring-language';

/** One compact presenter over the accounting service; it never computes an award. */
export class PortfolioDesk extends EnterpriseScoringService {
 private dialog=document.createElement('dialog');private selected!:HTMLSelectElement;private invoker?:HTMLElement;private tab='breakdown';private cabinetMode=false;private timer?:ReturnType<typeof setTimeout>;private lastMilestone='';private inventory='';private restoreFocus=true;private lastFinancialStage='';
 constructor(){
  let storage:Storage|undefined;try{storage=localStorage;}catch{}super(storage);
  this.dialog.id='score-dialog';this.dialog.className='score-dialog';this.dialog.setAttribute('aria-labelledby','score-title');
  this.dialog.innerHTML=`<header class="score-dialog-heading"><div><p class="eyebrow">Department of Earned Importance</p><h2 id="score-title" tabindex="-1">Enterprise Points</h2></div><button type="button" id="score-close" aria-label="Close score and badges">×</button></header>
   <div class="score-tabs" role="group" aria-label="Score view"><button type="button" data-score-tab="breakdown" aria-pressed="true">Score breakdown</button><button type="button" data-score-tab="badges" aria-pressed="false">Achievement cabinet</button><a id="score-rules-link">Scoring rules ↗</a></div>
   <section id="portfolio-record" aria-label="Score breakdown"><label class="portfolio-run-control" for="portfolio-run">Run <select id="portfolio-run"></select></label><p id="portfolio-status"></p>
   <dl class="portfolio-totals"><div><dt>Net Enterprise Points</dt><dd id="portfolio-total">0</dd></div><div><dt>Paid appointments</dt><dd id="portfolio-appearances">0</dd></div><div><dt>Different companions</dt><dd id="portfolio-distinct">0</dd></div></dl>
   <p id="score-reconciliation"></p><p id="portfolio-coverage"></p><div id="score-components"></div>
   <h3>Companion appointment register</h3><div class="portfolio-table" tabindex="0" role="region" aria-label="Companion appointment rates and counts"><table><caption>Every appointment pays, including repeats</caption><thead><tr><th scope="col">Rarity</th><th scope="col">Salary</th><th scope="col">Rarity factor</th><th scope="col">Entrance grant</th><th scope="col">Appointments</th></tr></thead><tbody id="portfolio-tiers"></tbody></table></div>
   <p id="portfolio-highest"></p><p id="portfolio-storage"></p><details><summary>Run receipt and conditions</summary><pre id="portfolio-receipt" tabindex="0" role="region" aria-label="Scoring run receipt"></pre></details>
   <details><summary>Recent award receipts</summary><ol id="score-recent"></ol></details></section>
   <section id="score-badges" aria-labelledby="badges-title" hidden><h3 id="badges-title">The Cabinet of Disproportionate Recognition</h3><div class="score-tabs" role="group" aria-label="Badge collection"><button type="button" id="badges-run" aria-pressed="true">This run</button><button type="button" id="badges-cabinet" aria-pressed="false">My cabinet</button></div><p id="badges-help"></p><div id="badge-grid" class="badge-grid"></div></section>`;
  document.querySelector('#portfolio-record')?.remove();document.body.append(this.dialog);
  this.selected=this.dialog.querySelector('#portfolio-run')!;
  for(const badge of badgeRules){const article=node('article');article.className='score-badge';article.dataset.badge=badge.id;const icon=node('span');icon.className='badge-art';icon.innerHTML=badgeSVG(badge.id);const progress=node('p');progress.dataset.badgeProgress='';article.append(icon,node('h4',badge.title),node('p',badge.description),progress);this.dialog.querySelector('#badge-grid')!.append(article);}
  for(const category of scoreCategories){const details=node('details');details.dataset.scoreCategory=category;const summary=node('summary'),total=node('strong');total.dataset.categoryTotal='';summary.append(node('span',category),total);const container=node('div');container.className='portfolio-table';container.tabIndex=0;container.setAttribute('role','region');container.setAttribute('aria-label',category+' award details');const table=node('table');table.innerHTML='<thead><tr><th scope="col">Completed work and base formula</th><th scope="col">Quantity</th><th scope="col">Factor</th><th scope="col">Points</th></tr></thead><tbody></tbody>';container.append(table);details.append(summary,container);this.dialog.querySelector('#score-components')!.append(details);}
  document.addEventListener('click',event=>{const target=event.target instanceof Element?event.target.closest<HTMLElement>('[data-score-open],#portfolio-open,[data-evidence="portfolio"]'):null;if(!target)return;event.preventDefault();this.open(target.dataset.scoreOpen==='badges'?'badges':'breakdown',target);});
  this.dialog.querySelector('#score-close')!.addEventListener('click',()=>this.dialog.close());
  document.addEventListener('site-page-leaving',()=>{if(this.dialog.open)this.restoreFocus=false;});
  this.dialog.addEventListener('close',()=>{document.dispatchEvent(new Event('score-dialog-change'));if(this.restoreFocus&&this.invoker?.getClientRects().length)this.invoker.focus({preventScroll:true});});
  for(const button of this.dialog.querySelectorAll<HTMLElement>('[data-score-tab]'))button.addEventListener('click',()=>{this.tab=button.dataset.scoreTab!;this.render();});
  this.dialog.querySelector('#badges-run')!.addEventListener('click',()=>{this.cabinetMode=false;this.render();});this.dialog.querySelector('#badges-cabinet')!.addEventListener('click',()=>{this.cabinetMode=true;this.render();});
  this.selected.addEventListener('change',()=>this.render());this.subscribe(()=>this.schedule());
  document.addEventListener('score-inspection',event=>{const {kind,identity}=(event as CustomEvent<{kind:string;identity:string}>).detail||{};if(['biography','evidence','department','curiosity'].includes(kind)&&typeof identity==='string')this.inspect(kind as 'biography'|'evidence'|'department'|'curiosity',identity);});
  window.addEventListener('storage',event=>{if(event.key===cabinetStorageKey)try{this.mergeCabinet(JSON.parse(event.newValue||'{}'));}catch{}});
  addEventListener('pagehide',()=>{clearTimeout(this.timer);this.finish('interrupted');});
  for(const button of document.querySelectorAll<HTMLElement>('.score-badge-button[data-score-open="badges"]')){button.innerHTML=badgeSVG('ratified');button.setAttribute('aria-label','Open achievement badges');button.title='Achievement cabinet';}
  this.render();
 }
 private schedule(){if(this.timer)return;this.timer=setTimeout(()=>{this.timer=undefined;this.render();},250);}
 private open(tab:string,invoker:HTMLElement){this.tab=tab;this.invoker=invoker;this.restoreFocus=true;if(!this.dialog.open)this.dialog.showModal();this.render();this.dialog.querySelector<HTMLElement>('#score-title')!.focus();document.dispatchEvent(new Event('score-dialog-change'));}
 private render(){
  const {current,saved,legacy,cabinet,persistent}=this.snapshot(),points=current?netPoints(current):legacy?portfolioPoints(legacy):0n;
  for(const element of document.querySelectorAll<HTMLElement>('[data-portfolio-points]')){const text=fmt(points);if(element.textContent!==text)element.textContent=text;element.title=text+' Enterprise Points';element.dataset.exact=String(points);}
  const boost=cycleAuthority(BigInt(current?.verification.through||'0')+1n);
  for(const element of document.querySelectorAll<HTMLElement>('[data-score-boost]')){element.hidden=!current||current.status!=='active'||boost.factor===1;element.textContent=`×${fmt(BigInt(boost.factor))} · ${fmt(BigInt(boost.remaining))} cycles left`;}
  const partial=document.getElementById('portfolio-incomplete');if(partial)partial.hidden=!current?.partial;
  const incident=current?.incident,last=current?.recent.at(-1);
  let activity=last?`+${fmt(BigInt(last.points))} · ${(ruleById.get(last.rule)?.title||last.rule)}`:'Every small step earns its place.';
  if(incident?.kind==='heist'){
   const stolen=BigInt(incident.stolen),returned=heistFinancials(BigInt(incident.opening),incident.elapsed,true).recovery;
   const percent=new Intl.NumberFormat(undefined,{style:'percent',maximumFractionDigits:2}).format(Number(incident.recoveryBasisPoints)/10000);
   activity=incident.settled?`${fmt(stolen)} stolen · ${fmt(BigInt(incident.recovered))} recovered`:incident.elapsed<scoringPolicy.graceMs?`Stamp heist · ${fmt(BigInt(Math.ceil((scoringPolicy.graceMs-incident.elapsed)/1000)))}s grace · ${fmt(BigInt(incident.budget))} at risk`:`${fmt(stolen)} stolen · Recover ${percent}: ${fmt(returned)} · ${fmt(BigInt(incident.budget)-stolen)} still at risk`;
  }
  for(const element of document.querySelectorAll<HTMLElement>('[data-score-activity]')){element.textContent=activity;element.classList.toggle('score-theft',incident?.kind==='heist');}
  let financialAnnouncer:HTMLElement|undefined;
  const modal=[...document.querySelectorAll<HTMLDialogElement>('dialog[open]')].at(-1);
  for(const panel of document.querySelectorAll<HTMLElement>('.heist-panel')){
   let finance=panel.querySelector<HTMLElement>('.heist-finance');if(!finance){finance=node('p');finance.className='heist-finance';panel.querySelector('strong')!.after(finance);const live=node('span');live.className='workspace-sr';live.dataset.heistAnnouncement='';live.setAttribute('aria-atomic','true');panel.append(live);}
   finance.hidden=incident?.kind!=='heist';finance.textContent=activity;panel.dataset.scoreHeist=incident?.kind==='heist'?incident.id:'';
   const live=panel.querySelector<HTMLElement>('[data-heist-announcement]')!,rect=panel.getBoundingClientRect();
   const visible=!financialAnnouncer&&!panel.hidden&&(!modal||modal.contains(panel))&&rect.width>0&&rect.height>0&&rect.bottom>0&&rect.top<innerHeight;
   live.setAttribute('aria-live',visible?'polite':'off');if(visible)financialAnnouncer=live;
  }
  if(incident?.kind==='heist'&&financialAnnouncer){const stage=incident.settled?'settled':incident.elapsed<scoringPolicy.graceMs?'grace':Number(incident.recoveryBasisPoints)<=1000?'minimum':Number(incident.recoveryBasisPoints)<=5000?'half':'theft',key=incident.id+'|'+stage;if(key!==this.lastFinancialStage){this.lastFinancialStage=key;financialAnnouncer.textContent=activity;}}
  if(last&&BigInt(last.points)>=10000n){const key=current!.id+'|'+last.at+'|'+last.rule+'|'+last.points;if(key!==this.lastMilestone){this.lastMilestone=key;const announcer=document.getElementById('score-announcement');if(announcer)announcer.textContent=activity;}}
  if(!this.dialog.open)return;
  const inventory=[current?.id,saved?.id,!!legacy].join('|');
  if(inventory!==this.inventory){this.inventory=inventory;const selected=this.selected.value;this.selected.replaceChildren();
   for(const [key,r,label]of [['current',current,'Current / latest run'],['saved',saved,'Previous banked run'],['legacy',legacy,'Legacy companion portfolio']] as const)if(r){const option=node('option',label);option.value=key;this.selected.append(option);}
   if([...this.selected.options].some(o=>o.value===selected))this.selected.value=selected;
  }
  const receipt=this.selected.value==='saved'?saved:this.selected.value==='legacy'?undefined:current,old=this.selected.value==='legacy'?legacy:undefined,verification=receipt?.verification||old;
  this.selected.disabled=this.selected.options.length<2;
  this.dialog.querySelector<HTMLElement>('#portfolio-record')!.hidden=this.tab!=='breakdown';this.dialog.querySelector<HTMLElement>('#score-badges')!.hidden=this.tab!=='badges';
  for(const button of this.dialog.querySelectorAll<HTMLElement>('[data-score-tab]'))button.setAttribute('aria-pressed',String(button.dataset.scoreTab===this.tab));
  this.dialog.querySelector<HTMLAnchorElement>('#score-rules-link')!.href=new URL(old?'scoring/companion-portfolio-v1/':receipt?`scoring/${receipt.rules}/${receipt.identity}/`:guidePath,scope).href;
  const set=(id:string,text:string)=>this.dialog.querySelector<HTMLElement>('#'+id)!.textContent=text;
  const statuses:Record<PortfolioStatus,string>={active:'Earning points',completed:'Mandate complete · points banked',stopped:'Proceedings stopped · points banked',replaced:'Replaced mandate · points banked',interrupted:'Interrupted proceedings · points banked'};
  set('portfolio-status',verification?(old?'Legacy rules · ':'')+statuses[verification.status]:'Authorize a mandate to start earning.');
  set('portfolio-total',fmt(receipt?netPoints(receipt):old?portfolioPoints(old):0n));set('portfolio-appearances',fmt(verification?appointmentCount(verification):0n));set('portfolio-distinct',fmt(BigInt(verification?.seen.length||0)));
  set('score-reconciliation',receipt?`${fmt(BigInt(receipt.gross))} earned − ${fmt(BigInt(receipt.stolen))} stolen + ${fmt(BigInt(receipt.recovered))} recovered + ${fmt(BigInt(receipt.dividend))} completion dividend = ${fmt(netPoints(receipt))} net points.`:old?'This historical receipt retains its original companion-only rates.':'No work has been credited yet.');
  set('portfolio-coverage',`${fmt(BigInt(verification?.disabled||'0'))} appointments disclosed with companions disabled.`+(receipt?.partial?' Some procedural or appointment evidence was unavailable; this is a partial score. Numerical output remains valid.':''));
  for(const details of this.dialog.querySelectorAll<HTMLDetailsElement>('[data-score-category]')){
   details.hidden=!!old;
   const category=details.dataset.scoreCategory!;details.querySelector<HTMLElement>('[data-category-total]')!.textContent=fmt(BigInt(receipt?.categories[category as keyof ScoringRun['categories']]||'0'));
   const rows=Object.entries(receipt?.buckets||{}).filter(([key])=>ruleById.get(key.split('|')[0])?.category===category).map(([key,bucket])=>{const [id,factor]=key.split('|'),rule=ruleById.get(id)!,row=node('tr'),label=node('th',rule.title);label.scope='row';label.append(node('small',describe(rule.formula,value=>fmt(BigInt(value)))));row.append(label,node('td',fmt(BigInt(bucket.quantity))),node('td','×'+fmt(BigInt(factor))),node('td',fmt(BigInt(bucket.points))));return row;});details.querySelector('tbody')!.replaceChildren(...rows);
  }
  this.dialog.querySelector('#portfolio-tiers')!.replaceChildren(...Object.keys(rarityTables.salary).map(tier=>{const rarity=tier as keyof typeof rarityTables.salary,row=node('tr'),label=node('th',tier);label.scope='row';row.append(label,node('td',fmt(old?pointRates[rarity]:BigInt(rarityTables.salary[rarity]))),node('td','×'+(old?'1':rarityTables.rarity[rarity])),node('td',fmt(old?0n:BigInt(rarityTables.entrance[rarity]))),node('td',fmt(BigInt(verification?.counts[rarity]||'0'))));return row;}));
  const best=verification?.highest;set('portfolio-highest',best?`Highest rarity appointed: ${best.emoji} ${best.name} · ${best.rarity} · ordinal ${fmt(BigInt(best.ordinal))}.`:'No appointed companion yet.');
  set('portfolio-storage',persistent?'The latest run, previous run and achievement cabinet are saved in this browser. New runs start at zero; ordinary refresh preserves the cabinet.':'Browser storage is unavailable. Accounting remains available until this page closes.');
  set('portfolio-receipt',receipt?JSON.stringify({run:receipt.id,rules:receipt.rules,identity:receipt.identity,mandate:receipt.verification.mandate,through:receipt.verification.through,status:receipt.status,startedAt:receipt.startedAt,conditions:receipt.conditions,initialAuthority:receipt.verification.initialAuthority,lastAuthority:receipt.verification.lastAuthority,authorityChanges:receipt.verification.authorityChanges,warrants:receipt.warrants},null,2):old?JSON.stringify(old,null,2):'No run receipt yet.');
  this.dialog.querySelector('#score-recent')!.replaceChildren(...(receipt?.recent||[]).slice().reverse().map(r=>node('li',`${(ruleById.get(r.rule)?.title||r.rule)}: ${fmt(BigInt(r.quantity))} occurrence(s) · ×${fmt(BigInt(r.factor))} · +${fmt(BigInt(r.points))}${r.detail?' · '+r.detail:''}`)));
  this.dialog.querySelector('#badges-run')!.setAttribute('aria-pressed',String(!this.cabinetMode));this.dialog.querySelector('#badges-cabinet')!.setAttribute('aria-pressed',String(this.cabinetMode));
  set('badges-help',this.cabinetMode?'Your browser’s cabinet retains first-earned dates and highest tiers. Locked badges remain visible.':'Progress in the selected run. Recognition-only badges add no hidden points.');
  for(const badge of badgeRules){const card=this.dialog.querySelector<HTMLElement>(`[data-badge="${badge.id}"]`)!,tier=this.cabinetMode?cabinet[badge.id]?.tier:receipt?.badges[badge.id],progress=BigInt(receipt?.counters[badge.counter]||'0');card.dataset.earned=String(!!tier&&BigInt(tier)>0n);card.querySelector('[data-badge-progress]')!.textContent=tier&&BigInt(tier)>0n?`✓ Earned · ${fmt(BigInt(tier))} ${badge.repeat?'completion(s)':'award'}${this.cabinetMode?' · First earned '+new Date(cabinet[badge.id].firstEarned).toLocaleDateString():''}`:`Locked${this.cabinetMode?'':' · '+fmt(progress)+' / '+fmt(BigInt(badge.target))}`;}
 }
}
