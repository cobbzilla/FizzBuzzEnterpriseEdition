import {node} from './companion-story';
import {companionTile,companionGlyph} from './companion-tile';
import {companionFlight} from './companion-flight';
import {discoveryStore} from './discovery-store';
import {discoveryIdentity,type Discovery} from './discovery-model';
const register=document.querySelector<HTMLElement>('#discovery-register')!,list=document.querySelector<HTMLOListElement>('#discovery-list')!,status=document.querySelector<HTMLElement>('#discovery-status')!,latest=document.querySelector<HTMLButtonElement>('#discovery-latest')!,dialog=document.querySelector<HTMLDialogElement>('#companion-dialog')!;
const store=discoveryStore();let pending=false,closing=false;let displayed:readonly Discovery[]=[];
const toggle=document.querySelector<HTMLButtonElement>('#discovery-toggle')!,summary=document.querySelector<HTMLElement>('#discovery-summary')!;
const notice=node('span');notice.className='discovery-announcement';notice.setAttribute('role','status');notice.setAttribute('aria-live','polite');document.body.append(notice);
const departures=node('div');departures.className='companion-departures';departures.setAttribute('aria-hidden','true');departures.inert=true;document.body.append(departures);
const flying=new Map<string,()=>void>(),arrivals=new Set<string>(),motion=matchMedia('(prefers-reduced-motion: reduce)');
toggle.addEventListener('click',()=>{const expanded=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(expanded));register.dataset.expanded=String(expanded);toggle.setAttribute('aria-label',(expanded?'Collapse':'Expand')+' saved companion appointments');size();});
register.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getClientRects().length&&toggle.getAttribute('aria-expanded')==='true'){event.preventDefault();toggle.click();toggle.focus();}});

function depart(){
 const remaining=new Set(store.snapshot().map(discoveryIdentity)),leaving=displayed.filter(find=>!remaining.has(discoveryIdentity(find)));
 if(!leaving.length)return;
 notice.textContent=leaving.length+' provisional companion'+(leaving.length===1?' has':'s have')+' left the register. Their mandate was replaced.';
 for(const find of leaving){
  const identity=discoveryIdentity(find);if(motion.matches||flying.has(identity))continue;
  const glyph=[...register.querySelectorAll<HTMLElement>('.companion-glyph')].find(el=>{const box=el.getBoundingClientRect();return el.dataset.companionIdentity===identity&&box.width&&box.height&&box.right>0&&box.left<innerWidth&&box.bottom>0&&box.top<innerHeight;});
  if(!glyph)continue;
  const box=glyph.getBoundingClientRect(),font=getComputedStyle(glyph).font,plan=companionFlight({x:box.left+box.width/2,y:box.top+box.height/2},{width:innerWidth,height:innerHeight});
  // Move the visible glyph itself. The old tile is removed by the same render.
  Object.assign(glyph.style,{left:box.left+'px',top:box.top+'px',width:box.width+'px',height:box.height+'px',font});
  glyph.classList.add('companion-departure');glyph.dataset.duration=String(plan.duration);glyph.dataset.targetX=String(plan.target.x);glyph.dataset.targetY=String(plan.target.y);departures.append(glyph);
  let animation:Animation|undefined,timer:ReturnType<typeof setTimeout>;
  const finish=()=>{if(flying.get(identity)!==finish)return;flying.delete(identity);clearTimeout(timer);animation?.cancel();glyph.remove();if(store.snapshot().some(find=>discoveryIdentity(find)===identity))arrivals.add(identity);if(!closing)render();};
  flying.set(identity,finish);
  try{animation=glyph.animate(plan.frames,{duration:plan.duration,easing:'linear',fill:'forwards'});void animation.finished.then(finish,finish);timer=setTimeout(finish,plan.duration+1000);}catch{finish();}
 }
}
function render(force=false){
 if(!force&&(list.contains(document.activeElement)||dialog.open)){pending=true;latest.hidden=false;return;}
 const focused=force&&list.contains(document.activeElement)?document.activeElement?.closest<HTMLElement>('li')?.dataset.companion:undefined;
 const finds=store.snapshot().filter(find=>!flying.has(discoveryIdentity(find)));displayed=finds;
 list.replaceChildren(...finds.map((d,index)=>{const li=node('li'),button=companionTile(d);li.dataset.companion=d.companion.id;
  const description=node('span',d.companion.weight+' of one billion tickets. Open saved biography.');description.hidden=true;description.id='discovery-evidence-'+index;button.setAttribute('aria-describedby',description.id);
  if(arrivals.delete(discoveryIdentity(d)))button.dataset.arrival='true';li.append(button,description);return li;}));
 summary.replaceChildren(...finds.map(companionGlyph));toggle.title=finds.length+' saved companion'+(finds.length===1?'':'s');
 if(!finds.length){toggle.setAttribute('aria-expanded','false');register.dataset.expanded='false';toggle.setAttribute('aria-label','Expand saved companion appointments');}
 status.textContent=(finds.length?finds.length+' distinct finds · rarest first.':'No appointments filed. Run a mandate with companions enabled.')+(store.persistent()?' Saved in this browser.':' Storage is unavailable; finds last for this page session.');pending=false;latest.hidden=true;
 if(focused){const retained=[...list.querySelectorAll<HTMLLIElement>('li')].find(li=>li.dataset.companion===focused)?.querySelector('button');const target=retained||[toggle,list.querySelector('button'),document.querySelector<HTMLElement>('main')].find(el=>el&&el.getClientRects().length);target?.focus({preventScroll:true});}
 size();
}
store.subscribe(change=>{if(change.departed.length)depart();render(change.departed.length>0);});latest.addEventListener('click',()=>{render(true);list.querySelector('button')?.focus();});dialog.addEventListener('companion-closed',()=>{if(pending)latest.hidden=false;});
motion.addEventListener('change',()=>{if(motion.matches)for(const finish of [...flying.values()])finish();});
addEventListener('pagehide',()=>{closing=true;for(const finish of [...flying.values()])finish();});
render();
function size(){document.documentElement.style.setProperty('--discovery-height',Math.ceil(register.getBoundingClientRect().height)+'px');}
new ResizeObserver(size).observe(register);size();
