import {LeaderboardClient} from './leaderboard-client.ts';
import {leaderboardName,type LeaderboardPage} from './leaderboard-model.ts';
import {netPoints,type EnterpriseScoringService} from './scoring-service.ts';
import {formatPoints} from './scoring-format.ts';
import {scope} from './release-assets.ts';

const trophy='<svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true" focusable="false"><path d="M10 5h12v7c0 5-3 8-6 8s-6-3-6-8V5Zm0 3H5v3c0 4 3 6 7 6m10-9h5v3c0 4-3 6-7 6M16 20v6m-6 2h12M13 4h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="m16 8 1 2 2 .3-1.5 1.4.4 2.1-1.9-1-1.9 1 .4-2.1-1.5-1.4 2-.3Z" fill="currentColor"/></svg>';
interface Turnstile {render(container:HTMLElement,options:Record<string,unknown>):string;remove(id:string):void;reset(id:string):void}
declare global {interface Window {turnstile?:Turnstile;__slopbuzzHighScores?:HighScoreDesk}}
const element=<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string)=>{const e=document.createElement(tag);if(text)e.textContent=text;return e;};
const number=(value:string|number)=>formatPoints(BigInt(value));

class RankingView {
 private offset=0;private loading=false;private table:HTMLTableSectionElement;private status:HTMLParagraphElement;private previous:HTMLButtonElement;private next:HTMLButtonElement;private own:HTMLParagraphElement;
 constructor(readonly host:HTMLElement,private client:LeaderboardClient){
  host.innerHTML='<p class="leaderboard-own"></p><p class="leaderboard-list-status" role="status"></p><div class="leaderboard-table" tabindex="0" role="region" aria-label="Top scores table"><table><caption>Top 1,000 · one entry per browser</caption><thead><tr><th scope="col">Rank</th><th scope="col">Name and mandate</th><th scope="col">Enterprise Points</th></tr></thead><tbody></tbody></table></div><div class="leaderboard-pagination"><button type="button" data-page="previous">Previous 50</button><button type="button" data-page="next">Next 50</button></div>';
  this.table=host.querySelector('tbody')!;this.status=host.querySelector('.leaderboard-list-status')!;this.own=host.querySelector('.leaderboard-own')!;
  this.previous=host.querySelector('[data-page="previous"]')!;this.next=host.querySelector('[data-page="next"]')!;
  this.previous.addEventListener('click',()=>{this.offset=Math.max(0,this.offset-50);void this.refresh();});this.next.addEventListener('click',()=>{this.offset+=50;void this.refresh();});
 }
 async refresh(){if(this.loading)return;this.loading=true;
  try{const page=await this.client.list(this.offset);this.render(page);}catch(error){this.status.textContent=(error as Error).message+' Previous results, if any, may be out of date.';}
  finally{this.loading=false;}
 }
 private render(page:LeaderboardPage){
  const expanded=new Set([...this.table.querySelectorAll<HTMLDetailsElement>('details[open]')].map(e=>e.closest<HTMLElement>('tr')!.dataset.entryId));
  const focused=this.table.contains(document.activeElement)?{id:document.activeElement?.closest<HTMLElement>('tr')?.dataset.entryId,tag:document.activeElement?.tagName}:undefined;
  const own=this.client.state.personal?.entry;
  this.own.textContent=own?own.rank<=1000?`Your published best: #${number(own.rank)} · ${number(own.score)} points${own.stale?' · awaiting a fresh run update':''}.`:`Your published best is currently outside the top 1,000.`:'Scores appear only after their owner chooses to publish.';
  this.status.textContent=page.total?`${number(this.offset+1)}–${number(Math.min(this.offset+50,page.total))} of ${number(page.total)} · Updated ${new Date(page.asOf).toLocaleTimeString()}`:'No scores filed yet. Numerical greatness awaits its first volunteer.';
  this.previous.disabled=this.offset===0;this.next.disabled=this.offset+50>=page.total;
  this.table.replaceChildren(...page.entries.map(entry=>{
   const row=element('tr');row.dataset.entryId=entry.id;if(own?.id===entry.id)row.className='leaderboard-my-entry';
   const rank=element('th','#'+number(entry.rank));rank.scope='row';const info=element('td');info.append(element('strong',entry.name));
   if(own?.id===entry.id)info.append(element('span',' · You'));
   const status=entry.stale?'Awaiting update':entry.status==='active'?'Earning points':entry.status==='completed'?'Completed':'Points banked';
   info.append(element('p',`${number(entry.through)} lines · ${status}`));
   const details=element('details'),summary=element('summary','Run conditions');details.open=expanded.has(entry.id);details.append(summary);
   details.append(element('p',`Mandate: ${number(entry.mandate)} · Rules: ${entry.rules} / ${entry.identity}`));
   const link=element('a','Scoring edition');link.href=new URL(`scoring/${entry.rules}/${entry.identity}/`,scope).href;details.append(link);
   for(const [name,value]of Object.entries(entry.conditions))details.append(element('p',`${name}: ${value}`));
   details.append(element('p','Score recorded '+new Date(entry.updatedAt).toLocaleString()));info.append(details);
   const score=element('td',number(entry.score));score.className='leaderboard-points';row.append(rank,info,score);return row;
  }));
  if(focused){const row=[...this.table.rows].find(r=>r.dataset.entryId===focused.id);row?.querySelector<HTMLElement>(focused.tag==='A'?'a':'summary')?.focus({preventScroll:true});}
 }
}

export class HighScoreDesk {
 readonly client:LeaderboardClient;
 private dialog:HTMLDialogElement;private board:HTMLElement;private boardView:RankingView;private form:HTMLFormElement;private name:HTMLInputElement;
 private status:HTMLElement;private score:HTMLElement;private rank:HTMLElement;private submit:HTMLButtonElement;private decline:HTMLButtonElement;private withdraw:HTMLButtonElement;
 private invoker?:HTMLElement;private mode:'board'|'invite'|'settings'='board';private widget?:string;private token='';private challengeLoading?:Promise<void>;private requestBusy=false;private rendering=false;
 private pageView?:RankingView;private interval:ReturnType<typeof setInterval>;
 private restoreFocus=true;
 private lastClientError='';
 constructor(){
  let storage:Storage|undefined;try{storage=localStorage;}catch{}
  this.client=new LeaderboardClient(fetch,storage);
  this.dialog=element('dialog');this.dialog.id='high-scores-dialog';this.dialog.className='high-scores-dialog';this.dialog.setAttribute('aria-labelledby','high-scores-title');
  this.dialog.innerHTML=`<header class="score-dialog-heading"><div><p class="eyebrow">Office of Competitive Importance</p><h2 id="high-scores-title" tabindex="-1">Top scores</h2></div><button type="button" data-high-scores-close aria-label="Close top scores">×</button></header>
   <div class="score-tabs"><button type="button" data-high-scores-tab="board">Top 1,000</button><button type="button" data-high-scores-tab="settings">My participation</button><a href="${new URL('scoring/',scope).href}">Scoring rules ↗</a></div>
   <section data-high-scores-board></section>
   <form class="leaderboard-enrollment" hidden><p data-high-scores-explanation></p><p class="leaderboard-live-score"><strong data-high-scores-live>0</strong> Enterprise Points <span data-high-scores-rank></span></p>
    <label for="high-scores-name">Public display name</label><input id="high-scores-name" name="name" type="text" minlength="1" maxlength="24" pattern="[A-Za-z0-9 _\\-]+" autocomplete="nickname" aria-describedby="high-scores-name-help" required>
    <p id="high-scores-name-help">1–24 letters A–Z, digits, spaces, hyphens or underscores. Include at least one letter or digit. Names are public and need not be unique.</p>
    <p>Publishing also enables automatic updates from future runs in this browser. Heists can lower a live result. Your best banked result remains a fallback.</p><div data-turnstile></div>
    <div class="leaderboard-actions"><button class="button button-primary" type="submit">Publish my score</button><button class="button button-secondary" type="button" data-high-scores-decline>Keep private</button><button class="button button-secondary" type="button" data-high-scores-withdraw hidden>Withdraw from the register</button></div>
   </form><p id="high-scores-status" role="status" aria-live="polite"></p><p class="leaderboard-audit-note">Receipts are checked for accounting consistency. Browser activity is not independently authenticated. All scoring editions compete together.</p>`;
  document.body.append(this.dialog);this.board=this.dialog.querySelector('[data-high-scores-board]')!;this.boardView=new RankingView(this.board,this.client);
  this.form=this.dialog.querySelector('form')!;this.name=this.form.querySelector('input')!;this.status=this.dialog.querySelector('#high-scores-status')!;this.score=this.form.querySelector('[data-high-scores-live]')!;this.rank=this.form.querySelector('[data-high-scores-rank]')!;this.submit=this.form.querySelector('[type="submit"]')!;this.decline=this.form.querySelector('[data-high-scores-decline]')!;this.withdraw=this.form.querySelector('[data-high-scores-withdraw]')!;
  this.dialog.querySelector('[data-high-scores-close]')!.addEventListener('click',()=>this.close());
  this.dialog.addEventListener('cancel',event=>{event.preventDefault();this.close();});
  this.dialog.addEventListener('close',()=>{if(this.mode==='invite'&&this.client.state.choice==='undecided')this.client.decline();this.removeChallenge();document.dispatchEvent(new Event('score-dialog-change'));if(this.restoreFocus&&this.invoker?.getClientRects().length)this.invoker.focus({preventScroll:true});});
  for(const tab of this.dialog.querySelectorAll<HTMLButtonElement>('[data-high-scores-tab]'))tab.addEventListener('click',()=>this.open(tab.dataset.highScoresTab as 'board'|'settings',tab));
  this.decline.addEventListener('click',()=>{this.client.decline();this.close();});
  this.withdraw.addEventListener('click',()=>void this.perform(async()=>{await this.client.withdraw();this.status.textContent='Your entry has been removed. This browser will keep future scores private.';this.name.value='';this.removeChallenge();}));
  this.name.addEventListener('input',()=>this.name.setCustomValidity(''));
  this.form.addEventListener('submit',event=>{event.preventDefault();let name:string;try{name=leaderboardName(this.name.value);}catch(error){this.name.setCustomValidity((error as Error).message);this.name.reportValidity();return;}
   void this.perform(async()=>{await this.client.enroll(name,this.token);this.mode='settings';this.status.textContent='Participation saved. Your current score is being checked and filed.';this.removeChallenge();});
  });
  document.addEventListener('click',event=>{const target=event.target instanceof Element?event.target.closest<HTMLElement>('[data-high-scores-open]'):null;if(target){event.preventDefault();this.open(target.dataset.highScoresOpen==='settings'?'settings':'board',target);}});
  this.client.subscribe(()=>this.render());
  document.addEventListener('site-page-change',()=>this.mountPage());
  document.addEventListener('site-page-leaving',()=>{this.restoreFocus=false;});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden){this.client.resume();this.render();}});
  document.addEventListener('score-dialog-change',()=>this.render());
  document.addEventListener('close',()=>this.render(),true);
  addEventListener('online',()=>this.client.resume());
  window.addEventListener('storage',event=>{if(event.key==='slopbuzz:high-scores:participation:v1')void this.client.refresh();});
  addEventListener('pagehide',()=>{clearInterval(this.interval);this.client.dispose();this.removeChallenge();},{once:true});
  this.interval=setInterval(()=>{if(!document.hidden){if(this.dialog.open&&this.mode==='board')void this.boardView.refresh();if(document.body.dataset.sitePage==='high-scores')void this.pageView?.refresh();}},15000);
  for(const button of document.querySelectorAll<HTMLElement>('[data-high-scores-open]'))if(button.classList.contains('score-trophy-button'))button.innerHTML=trophy+'<span data-high-score-standing></span>';
  this.mountPage();void this.client.start();
 }
 attach(scoring:EnterpriseScoringService){this.client.attach(scoring);}
 private mountPage(){const host=document.getElementById('high-scores-list');if(host&&this.pageView?.host!==host)this.pageView=new RankingView(host,this.client);if(host?.getClientRects().length)void this.pageView!.refresh();}
 private open(mode:'board'|'invite'|'settings',invoker?:HTMLElement){
  this.mode=mode;if(invoker&&!this.dialog.contains(invoker))this.invoker=invoker;
  this.restoreFocus=true;
  this.status.textContent='';this.name.value=this.client.state.personal?.name||this.name.value;
  if(!this.dialog.open)this.dialog.showModal();
  this.render();this.dialog.querySelector<HTMLElement>('#high-scores-title')!.focus({preventScroll:true});document.dispatchEvent(new Event('score-dialog-change'));
  if(mode==='board')void this.boardView.refresh();else void this.challenge();
 }
 private close(){if(this.mode==='invite')this.client.decline();this.dialog.close();}
 private async perform(action:()=>Promise<void>){
  if(this.requestBusy)return;this.requestBusy=true;this.render();
  try{await action();}catch(error){this.status.textContent=(error as Error).message;if(this.widget)window.turnstile?.reset(this.widget);this.token='';}
  finally{this.requestBusy=false;this.render();}
 }
 private render(){
  if(this.rendering)return;this.rendering=true;
  try{
   const state=this.client.state,current=state.current,entry=state.personal?.entry;
   const ownCurrent=!!entry&&entry.runId===current?.id;
   let standing=entry&&entry.rank<=1000?`${ownCurrent?'':'Best '}#${number(entry.rank)}`:'';
   const qualification=state.qualification;
   if(state.choice!=='public'&&qualification&&qualification.runId===current?.id&&qualification.qualifies)standing='Would rank #'+number(qualification.rank!);
   for(const label of document.querySelectorAll<HTMLElement>('[data-high-score-standing]')){label.textContent=standing;label.classList.toggle('leaderboard-stale',state.stale||!!entry?.stale);label.title=standing?(state.stale?'Last confirmed standing. ':entry&&!ownCurrent?`Previous best: ${number(entry.score)} points. `:'')+'Rank is updated periodically.':'';label.closest('button')?.setAttribute('aria-label','Open top scores'+(standing?'. '+standing:''));}
   if(state.invitation&&!this.dialog.open&&!document.hidden&&document.body.dataset.sitePage==='demo'&&!document.querySelector('dialog[open]:not(#office-fullscreen)')){this.rendering=false;this.open('invite');return;}
   if(!this.dialog.open)return;
   this.board.hidden=this.mode!=='board';this.form.hidden=this.mode==='board';
   this.dialog.querySelector('#high-scores-title')!.textContent=this.mode==='invite'?'Your score has entered the top 1,000':this.mode==='settings'?'My high-score participation':'Top 1,000 scores';
   this.form.querySelector('[data-high-scores-explanation]')!.textContent=state.choice==='public'?'This browser participates automatically. You can change its public name or withdraw.':state.choice==='private'?'Your scores are private. You can join the register whenever you choose.':`${current?.status==='active'?'Your mandate is still running. ':''}Would you like your score to appear in the public register?`;
   this.score.textContent=current?number(String(netPoints(current))):entry?number(entry.score):'0';
   this.rank.textContent=standing?`· ${standing}${state.stale?' · awaiting update':''}`:'';
   this.submit.textContent=state.personal?.participating?'Save public name':'Publish my score';
   this.submit.disabled=this.requestBusy||!state.enabled||!state.personal?.participating&&!this.token;
   this.decline.hidden=!!state.personal?.participating;this.withdraw.hidden=!state.personal?.participating;this.withdraw.disabled=this.requestBusy;
   if(state.error)this.status.textContent=state.error;
   else if(!state.enabled)this.status.textContent='Score submissions are temporarily unavailable. Your demo can continue.';
   else if(this.lastClientError&&this.status.textContent===this.lastClientError)this.status.textContent='';
   this.lastClientError=state.error;
   if(this.mode!=='board'&&!this.widget&&!this.requestBusy)void this.challenge();
  }finally{this.rendering=false;}
 }
 private async challenge(){
  if(this.widget||this.client.state.personal?.participating||!this.client.state.enabled||!this.client.state.sitekey)return;
  try{
   if(!window.turnstile){
    this.challengeLoading??=new Promise<void>((resolve,reject)=>{const script=element('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;const timer=setTimeout(()=>{script.remove();reject(Error('Verification could not load. Your demo can continue; try joining again later.'));},15000);script.onload=()=>{clearTimeout(timer);resolve();};script.onerror=()=>{clearTimeout(timer);script.remove();reject(Error('Verification could not load.'));};document.head.append(script);});
    await this.challengeLoading;
   }
   if(!this.dialog.open||this.mode==='board'||this.widget)return;
   this.widget=window.turnstile!.render(this.form.querySelector('[data-turnstile]')!,{sitekey:this.client.state.sitekey,action:'leaderboard-enroll',theme:'auto',callback:(token:string)=>{this.token=token;this.render();},'expired-callback':()=>{this.token='';this.render();},'error-callback':()=>{this.token='';this.status.textContent='Verification needs another attempt. Your run continues.';this.render();}});
  }catch(error){this.challengeLoading=undefined;this.status.textContent=(error as Error).message;}
 }
 private removeChallenge(){if(this.widget)window.turnstile?.remove(this.widget);this.widget=undefined;this.token='';}
}
export function highScoreDesk(){return window.__slopbuzzHighScores??=new HighScoreDesk();}
highScoreDesk();
