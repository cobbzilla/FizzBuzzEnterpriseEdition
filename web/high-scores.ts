import {LeaderboardClient} from './leaderboard-client.ts';
import {leaderboardName,type LeaderboardPage} from './leaderboard-model.ts';
import {netPoints,type EnterpriseScoringService} from './scoring-service.ts';
import {formatPoints} from './scoring-format.ts';
import {anonymousName,isScoreboard,scoreboards,scoreboardIcon,type Scoreboard} from './scoreboards.ts';
import {restrictLeaderboardName} from './leaderboard-name-input.ts';
import {scope} from './release-assets.ts';

interface Turnstile {render(container:HTMLElement,options:Record<string,unknown>):string;remove(id:string):void;reset(id:string):void}
declare global {interface Window {turnstile?:Turnstile;__slopbuzzHighScores?:HighScoreDesk}}
const element=<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string)=>{const e=document.createElement(tag);if(text)e.textContent=text;return e;};
const number=(value:string|number)=>formatPoints(BigInt(value));

const selectedBoard=(queryFirst=true):Scoreboard=>{const query=new URL(location.href).searchParams.get('board');if(queryFirst&&isScoreboard(query))return query;try{const saved=localStorage.getItem('slopbuzz:scoreboard');if(isScoreboard(saved))return saved;}catch{}return 'daily';};
class RankingView {
 private selected=selectedBoard();private generation=0;
 private offset=0;private loading=false;private table:HTMLTableSectionElement;private status:HTMLParagraphElement;private previous:HTMLButtonElement;private next:HTMLButtonElement;private own:HTMLParagraphElement;
 constructor(readonly host:HTMLElement,private client:LeaderboardClient){
  host.innerHTML='<div class="scoreboard-tabs" role="tablist" aria-label="Scoreboards"></div><p class="scoreboard-window"></p><p class="leaderboard-own"></p><p class="leaderboard-list-status" role="status"></p><div class="leaderboard-table" tabindex="0" role="region" aria-label="Top scores table"><table><caption>Top 1,000 · one entry per browser</caption><thead><tr><th scope="col">Rank</th><th scope="col">Name and mandate</th><th scope="col">Enterprise Points</th></tr></thead><tbody></tbody></table></div><div class="leaderboard-pagination"><button type="button" data-page="previous">Previous 50</button><button type="button" data-page="next">Next 50</button></div>';
  try{localStorage.setItem('slopbuzz:scoreboard',this.selected);}catch{}
  const tabs=host.querySelector('.scoreboard-tabs')!;
  for(const b of scoreboards){const button=element('button');button.type='button';button.dataset.scoreboard=b.id;button.setAttribute('role','tab');button.innerHTML=scoreboardIcon(b.id);button.append(document.createTextNode(b.label));button.addEventListener('click',()=>this.select(b.id));button.addEventListener('keydown',event=>{const keys=['ArrowRight','ArrowLeft','Home','End'];if(!keys.includes(event.key))return;event.preventDefault();const i=scoreboards.findIndex(b=>b.id===this.selected),next=event.key==='Home'?0:event.key==='End'?3:(i+(event.key==='ArrowRight'?1:3))%4;this.select(scoreboards[next].id);(tabs.children[next] as HTMLElement).focus();});tabs.append(button);}
  this.updateTabs();
  this.table=host.querySelector('tbody')!;this.status=host.querySelector('.leaderboard-list-status')!;this.own=host.querySelector('.leaderboard-own')!;
  this.previous=host.querySelector('[data-page="previous"]')!;this.next=host.querySelector('[data-page="next"]')!;
  this.previous.addEventListener('click',()=>{this.offset=Math.max(0,this.offset-50);void this.refresh();});this.next.addEventListener('click',()=>{this.offset+=50;void this.refresh();});
 }
 select(board:Scoreboard){this.selected=board;this.offset=0;this.loading=false;++this.generation;try{localStorage.setItem('slopbuzz:scoreboard',board);}catch{}if(this.host.id==='high-scores-list'){const url=new URL(location.href);url.searchParams.set('board',board);history.replaceState(history.state,'',url);}this.updateTabs();this.table.replaceChildren();void this.refresh();}
 private updateTabs(){for(const button of this.host.querySelectorAll<HTMLButtonElement>('[role="tab"]')){const active=button.dataset.scoreboard===this.selected;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;}this.host.querySelector('.scoreboard-window')!.textContent=scoreboards.find(b=>b.id===this.selected)!.window;}
 async refresh(){if(this.loading)return;this.loading=true;const generation=++this.generation,board=this.selected;
  try{const page=await this.client.list(this.offset,board);if(generation===this.generation)this.render(page);}catch(error){if(generation===this.generation)this.status.textContent=(error as Error).message+' Previous results, if any, may be out of date.';}
  finally{if(generation===this.generation)this.loading=false;}
 }
 private render(page:LeaderboardPage){
  const expanded=new Set([...this.table.querySelectorAll<HTMLDetailsElement>('details[open]')].map(e=>e.closest<HTMLElement>('tr')!.dataset.entryId));
  const focused=this.table.contains(document.activeElement)?{id:document.activeElement?.closest<HTMLElement>('tr')?.dataset.entryId,tag:document.activeElement?.tagName}:undefined;
  const own=this.client.state.personal?.standings?.[this.selected]??(this.selected==='all-time'?this.client.state.personal?.entry:null);
  this.own.textContent=own?own.rank<=1000?`Your published best: #${number(own.rank)} · ${number(own.score)} points${own.stale?' · awaiting a fresh run update':''}.`:`Your published best is currently outside the top 1,000.`:'Scores are recorded anonymously until their owner chooses a public name.';
  this.status.textContent=page.total?`${number(this.offset+1)}–${number(Math.min(this.offset+50,page.total))} of ${number(page.total)} · Updated ${new Date(page.asOf).toLocaleTimeString()}`:'No scores filed yet. Numerical greatness awaits its first volunteer.';
  this.previous.disabled=this.offset===0;this.next.disabled=this.offset+50>=page.total;
  this.table.replaceChildren(...page.entries.map(entry=>{
   const row=element('tr');row.dataset.entryId=entry.id;if(own?.id===entry.id)row.className='leaderboard-my-entry';
   const rank=element('th','#'+number(entry.rank));rank.scope='row';const info=element('td');info.append(element('strong',own?.id===entry.id?this.client.state.personal!.name:entry.name));
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
 private trophyOfferRun?:string;
 private lastClientError='';private verificationPromise?:Promise<string>;private challengeHost?:HTMLElement;private serverClockOffset=0;private lastStandingAsOf='';
 constructor(){
  let storage:Storage|undefined;try{storage=localStorage;}catch{}
  this.client=new LeaderboardClient(fetch,storage);
  this.dialog=element('dialog');this.dialog.id='high-scores-dialog';this.dialog.className='high-scores-dialog';this.dialog.setAttribute('aria-labelledby','high-scores-title');
  this.dialog.innerHTML=`<header class="score-dialog-heading"><div><p class="eyebrow" data-registration-detail>Office of Competitive Importance</p><h2 id="high-scores-title" tabindex="-1">Top scores</h2></div><button type="button" data-high-scores-close data-registration-detail aria-label="Close top scores">×</button></header>
   <div class="score-tabs" data-registration-detail><button type="button" data-high-scores-tab="board">Top 1,000</button><button type="button" data-high-scores-tab="settings">My participation</button><a href="${new URL('scoring/',scope).href}">Scoring rules ↗</a></div>
   <section data-high-scores-board></section>
   <form class="leaderboard-enrollment" hidden><p data-high-scores-explanation></p><p class="leaderboard-live-score"><strong data-high-scores-live>0</strong> Enterprise Points <span data-high-scores-rank></span></p>
    <label for="high-scores-name">Your public name</label><input id="high-scores-name" name="name" type="text" minlength="1" maxlength="24" pattern="[A-Za-z0-9 _\\-]+" autocomplete="nickname" aria-describedby="high-scores-name-help" placeholder="Enter your name" title="1–24 letters, digits, spaces, hyphens or underscores" required>
    <p id="high-scores-name-help" data-registration-detail>1–24 letters A–Z, digits, spaces, hyphens or underscores. Include at least one letter or digit. Names are public and need not be unique.</p>
    <p data-registration-detail>Scores update automatically from future runs in this browser. Heists can lower a live result. Your best banked result remains a fallback.</p><div data-turnstile></div>
    <div class="leaderboard-actions"><button class="button button-primary" type="submit">Save name</button><button class="button button-secondary" type="button" data-high-scores-decline>Continue anonymously</button><button class="button button-secondary" type="button" data-high-scores-withdraw hidden>Use Anonymous Coward</button></div>
   </form><p id="high-scores-status" role="status" aria-live="polite"></p><p class="leaderboard-audit-note" data-registration-detail>Receipts are checked for accounting consistency. Browser activity is not independently authenticated. All scoring editions compete together.</p>`;
  document.body.append(this.dialog);this.board=this.dialog.querySelector('[data-high-scores-board]')!;this.boardView=new RankingView(this.board,this.client);
  this.form=this.dialog.querySelector('form')!;this.name=this.form.querySelector('input')!;this.status=this.dialog.querySelector('#high-scores-status')!;this.score=this.form.querySelector('[data-high-scores-live]')!;this.rank=this.form.querySelector('[data-high-scores-rank]')!;this.submit=this.form.querySelector('[type="submit"]')!;this.decline=this.form.querySelector('[data-high-scores-decline]')!;this.withdraw=this.form.querySelector('[data-high-scores-withdraw]')!;
  this.dialog.querySelector('[data-high-scores-close]')!.addEventListener('click',()=>this.close());
  this.dialog.addEventListener('cancel',event=>{event.preventDefault();this.close();});
  this.dialog.addEventListener('close',()=>{this.trophyOfferRun=undefined;if(this.mode!=='board'&&this.client.state.choice==='undecided')this.client.decline();this.removeChallenge();document.dispatchEvent(new Event('score-dialog-change'));if(this.restoreFocus){const target=this.invoker?.getClientRects().length?this.invoker:this.invoker?.closest('[data-scoreboard-strip]')?.querySelector<HTMLButtonElement>('button:not([hidden])');target?.focus({preventScroll:true});}});
  for(const tab of this.dialog.querySelectorAll<HTMLButtonElement>('[data-high-scores-tab]'))tab.addEventListener('click',()=>this.open(tab.dataset.highScoresTab as 'board'|'settings',tab));
  this.decline.addEventListener('click',()=>{this.client.decline();this.close();});
  this.withdraw.addEventListener('click',()=>void this.perform(async()=>{await this.client.withdraw();this.status.textContent='Your scores are now displayed as Anonymous Coward.';this.name.value='';this.removeChallenge();}));
  restrictLeaderboardName(this.name);
  this.form.addEventListener('submit',event=>{event.preventDefault();let name:string;try{name=leaderboardName(this.name.value);}catch(error){this.name.setCustomValidity((error as Error).message);this.name.reportValidity();return;}
   const joining=this.dialog.dataset.minimal==='true';
   void this.perform(async()=>{await this.client.enroll(name,this.client.state.personal?.participating?'':await this.challenge());this.removeChallenge();if(joining)this.dialog.close();else this.status.textContent='Your public name has been saved.';});
  });
  document.addEventListener('click',event=>{const target=event.target instanceof Element?event.target.closest<HTMLElement>('[data-high-scores-open]'):null;if(target){event.preventDefault();
   if(target.dataset.highScoresOpen==='settings')this.open('settings',target);
   else{this.trophyOfferRun=this.client.state.choice==='undecided'?this.client.state.current?.id:undefined;this.open(this.qualifiesForInvitation()?'invite':'board',target);}
  }});
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
  this.client.setVerification(()=>this.challenge());this.mountPage();void this.client.start();
 }
 attach(scoring:EnterpriseScoringService){this.client.attach(scoring);}
 private mountPage(){const host=document.getElementById('high-scores-list');if(host&&this.pageView?.host!==host)this.pageView=new RankingView(host,this.client);if(host?.getClientRects().length)void this.pageView!.refresh();this.render();}
 private qualifiesForInvitation(){const s=this.client.state;if(s.choice!=='undecided'||!s.enabled||s.stale||!s.current)return false;return Object.values(s.personal?.standings||{'all-time':s.personal?.entry}).some(e=>e?.runId===s.current!.id&&e.rank<=1000)||s.qualification?.runId===s.current.id&&!!(s.qualification.qualifiesAny??s.qualification.qualifies);}

 private open(mode:'board'|'invite'|'settings',invoker?:HTMLElement){
  if(mode==='board')this.boardView.select(isScoreboard(invoker?.dataset.scoreboard)?invoker.dataset.scoreboard:selectedBoard(false));
  this.mode=mode;if(mode!=='board')this.trophyOfferRun=undefined;if(invoker&&!this.dialog.contains(invoker))this.invoker=invoker;
  this.restoreFocus=true;
  this.status.textContent='';this.name.value=this.client.state.personal?.name===anonymousName?'':this.client.state.personal?.name||this.name.value;
  if(!this.dialog.open)this.dialog.showModal();
  this.render();(this.dialog.dataset.minimal==='true'?this.name:this.dialog.querySelector<HTMLElement>('#high-scores-title')!).focus({preventScroll:true});document.dispatchEvent(new Event('score-dialog-change'));
  if(mode==='board')void this.boardView.refresh();
 }
 private close(){this.trophyOfferRun=undefined;if(this.mode!=='board'&&this.client.state.choice==='undecided')this.client.decline();this.dialog.close();}
 private async perform(action:()=>Promise<void>){
  if(this.requestBusy)return;this.requestBusy=true;this.render();
  try{await action();}catch(error){this.status.textContent=(error as Error).message;if(this.widget)window.turnstile?.reset(this.widget);this.token='';}
  finally{this.requestBusy=false;this.render();}
 }
 private render(){
  if(this.rendering)return;this.rendering=true;
  try{
   const state=this.client.state,current=state.current,entry=state.personal?.entry;
   const qualification=state.qualification;
   if(state.personal&&!state.stale&&state.personal.asOf!==this.lastStandingAsOf){this.lastStandingAsOf=state.personal.asOf;this.serverClockOffset=Date.parse(state.personal.asOf)-Date.now();}
   let standing='';
   for(const host of document.querySelectorAll<HTMLElement>('[data-scoreboard-strip]')){
    let visible=0;
    for(const b of scoreboards){const e=state.personal?.standings?.[b.id]??(b.id==='all-time'?entry:null),estimate=qualification?.runId===current?.id?qualification?.standings?.[b.id]??(b.id==='all-time'?qualification:null):null;
     const expired=!!e&&b.duration>0&&Date.parse(e.attainedAt)+b.duration<=Date.now()+this.serverClockOffset;
     const rank=e&&!expired&&e.rank<=1000?e.rank:!state.personal?.participating&&estimate?.qualifies?estimate.rank:null;
     let button=host.querySelector<HTMLButtonElement>('[data-scoreboard="'+b.id+'"]');
     if(!button){button=element('button');button.type='button';button.className='score-trophy-button scoreboard-rank';button.dataset.highScoresOpen='board';button.dataset.scoreboard=b.id;button.innerHTML=scoreboardIcon(b.id)+'<span data-high-score-standing></span>';host.append(button);}
     button.hidden=!rank;if(!rank)continue;visible++;
     const text=number(rank),label=button.querySelector<HTMLElement>('[data-high-score-standing]')!;if(label.textContent!==text)label.textContent=text;
     const description=b.label+', '+b.window+', '+(e?'rank ':'estimated rank ')+text+(e?' · '+number(e.score)+' points'+(current&&e.runId!==current.id?' · earlier run':''):' · not yet recorded')+(state.stale||e?.stale?' · last confirmed standing':'');button.title=description;button.setAttribute('aria-label','Open '+description);button.classList.toggle('leaderboard-stale',state.stale||!!e?.stale);standing+=(standing?' · ':'')+b.label+' #'+text;
    }
    host.dataset.placed=String(visible);
    const fallback=host.querySelector<HTMLButtonElement>('[data-high-scores-open]:not([data-scoreboard])');if(fallback)fallback.hidden=visible>0;
   }
   if(this.qualifiesForInvitation()&&this.dialog.open&&this.mode==='board'&&this.trophyOfferRun===current?.id){this.rendering=false;this.open('invite');return;}
   if(state.invitation&&this.qualifiesForInvitation()&&!this.dialog.open&&!document.hidden&&document.body.dataset.sitePage==='demo'&&!document.querySelector('dialog[open]:not(#office-fullscreen)')){this.rendering=false;this.open('invite');return;}
   if(!this.dialog.open)return;
   this.board.hidden=this.mode!=='board';this.form.hidden=this.mode==='board';
   const minimal=this.mode==='invite'||this.mode==='settings'&&(!state.personal?.participating||state.personal.name===anonymousName);
   this.dialog.dataset.minimal=String(minimal);
   for(const detail of this.dialog.querySelectorAll<HTMLElement>('[data-registration-detail]'))detail.hidden=minimal;
   this.form.querySelector<HTMLElement>('[data-high-scores-explanation]')!.hidden=minimal;
   this.dialog.querySelector('#high-scores-title')!.textContent=minimal?(this.qualifiesForInvitation()?'Congratulations! You made the top 1,000.':'Join the top scores'):this.mode==='settings'?'My high-score participation':'Top 1,000 scores';
   this.form.querySelector('[data-high-scores-explanation]')!.textContent=state.choice==='public'?'Scores are recorded automatically. You can change your public name or use Anonymous Coward.':state.choice==='anonymous'?'Your scores appear as Anonymous Coward. You can choose a name whenever you like.':`${current?.status==='active'?'Your mandate is still running. ':''}Would you like to add your name to your score?`;
   this.score.textContent=current?number(String(netPoints(current))):entry?number(entry.score):'0';
   this.rank.textContent=standing?`· ${standing}${state.stale?' · awaiting update':''}`:'';
   // Preserve the pressed button across live score updates. Replacing its text
   // during a pointer press can cancel WebKit's eventual click.
   const submitLabel='Save name';
   if(this.submit.textContent!==submitLabel)this.submit.textContent=submitLabel;
   const submitDisabled=this.requestBusy||!state.enabled;
   if(this.submit.disabled!==submitDisabled)this.submit.disabled=submitDisabled;
   this.decline.hidden=!minimal;this.withdraw.hidden=minimal||!state.personal?.participating||state.personal.name===anonymousName;this.withdraw.disabled=this.requestBusy;
   if(state.error)this.status.textContent=state.error;
   else if(!state.enabled)this.status.textContent='Score submissions are temporarily unavailable. Your demo can continue.';
   else if(this.lastClientError&&this.status.textContent===this.lastClientError)this.status.textContent='';
   this.lastClientError=state.error;
   if(this.mode!=='board'&&!this.widget&&!this.requestBusy)void this.challenge();
  }finally{this.rendering=false;}
 }
 private challenge():Promise<string>{
  if(this.verificationPromise)return this.verificationPromise;
  this.verificationPromise=(async()=>{
   if(!this.client.state.sitekey)throw Error('Score verification is not configured.');
   if(!window.turnstile){this.challengeLoading??=new Promise<void>((resolve,reject)=>{const script=element('script');script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';script.async=true;const timer=setTimeout(()=>{script.remove();reject(Error('Score verification could not load. Your run continues.'));},15000);script.onload=()=>{clearTimeout(timer);resolve();};script.onerror=()=>{clearTimeout(timer);script.remove();reject(Error('Score verification could not load.'));};document.head.append(script);});await this.challengeLoading;}
   this.challengeHost??=element('div');if(!this.challengeHost.isConnected)document.body.append(this.challengeHost);
   return new Promise<string>((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Score verification timed out. Your run continues.')),20000);this.widget=window.turnstile!.render(this.challengeHost!,{sitekey:this.client.state.sitekey,action:'leaderboard-enroll',theme:'auto',callback:(token:string)=>{clearTimeout(timer);resolve(token);},'expired-callback':()=>{clearTimeout(timer);reject(Error('Score verification expired.'));},'error-callback':()=>{clearTimeout(timer);reject(Error('Score verification needs another attempt.'));}});});
  })().finally(()=>{this.verificationPromise=undefined;this.challengeLoading=undefined;this.removeChallenge();});return this.verificationPromise;
 }
 private removeChallenge(){if(this.verificationPromise)return;if(this.widget)window.turnstile?.remove(this.widget);this.widget=undefined;this.token='';}

}
export function highScoreDesk(){return window.__slopbuzzHighScores??=new HighScoreDesk();}
highScoreDesk();
