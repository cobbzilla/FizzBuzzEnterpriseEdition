import {node} from './companion-story';
import {companionDialog} from './companion-dialog';
import {discoveryStore} from './discovery-store';
import type {Discovery} from './discovery-model';
const register=document.querySelector<HTMLElement>('#discovery-register')!,list=document.querySelector<HTMLOListElement>('#discovery-list')!,status=document.querySelector<HTMLElement>('#discovery-status')!,latest=document.querySelector<HTMLButtonElement>('#discovery-latest')!,dialog=document.querySelector<HTMLDialogElement>('#companion-dialog')!;
const store=discoveryStore();let pending=false;
const toggle=document.querySelector<HTMLButtonElement>('#discovery-toggle')!,summary=document.querySelector<HTMLElement>('#discovery-summary')!;
const notice=node('span');notice.className='discovery-announcement';notice.setAttribute('role','status');notice.setAttribute('aria-live','polite');document.body.append(notice);
const departures=node('div');departures.className='companion-departures';departures.setAttribute('aria-hidden','true');document.body.append(departures);
toggle.addEventListener('click',()=>{const expanded=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(expanded));register.dataset.expanded=String(expanded);size();});
register.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getClientRects().length&&toggle.getAttribute('aria-expanded')==='true'){event.preventDefault();toggle.click();toggle.focus();}});
function depart(finds:readonly Discovery[]){
 if(!finds.length)return;
 notice.textContent=finds.length+' provisional companion'+(finds.length===1?' has':'s have')+' left the register. Their mandate was replaced.';
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const rail=register.getBoundingClientRect();
 for(const [index,find]of finds.entries()){
  const chip=[...list.querySelectorAll<HTMLElement>('li')].find(li=>li.dataset.companion===find.companion.id),box=chip?.getBoundingClientRect();
  const flight=node('span',find.companion.emoji);flight.className='companion-departure';flight.setAttribute('aria-hidden','true');
  const x=box?.width?box.left+box.width/2:Math.min(innerWidth-30,rail.left+35+index*48),y=box?.height?box.top+box.height/2:Math.min(innerHeight-22,rail.top+22);
  flight.style.left=Math.max(20,Math.min(innerWidth-20,x))+'px';flight.style.top=Math.max(20,Math.min(innerHeight-20,y))+'px';
  flight.style.setProperty('--flight-x',((index%2?-1:1)*(100+Math.random()*180))+'px');flight.style.setProperty('--flight-y',-(y+100)+'px');flight.style.setProperty('--flight-spin',((index%2?-1:1)*(250+Math.random()*250))+'deg');
  departures.append(flight);flight.addEventListener('animationend',()=>flight.remove(),{once:true});setTimeout(()=>flight.remove(),1500);
 }
}
function render(force=false){
 if(!force&&(list.contains(document.activeElement)||dialog.open)){pending=true;latest.hidden=false;return;}
 const focused=force&&list.contains(document.activeElement)?document.activeElement?.closest<HTMLElement>('li')?.dataset.companion:undefined;
 const finds=store.snapshot();list.replaceChildren(...finds.map((d,index)=>{const li=node('li'),button=node('button');li.dataset.companion=d.companion.id;button.type='button';button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','companion-dialog');button.title=d.companion.name;const description=node('span',d.companion.weight+' of one billion tickets. Open saved biography.');description.hidden=true;description.id='discovery-evidence-'+index;button.setAttribute('aria-describedby',description.id);const glyph=node('span',d.companion.emoji);glyph.setAttribute('aria-hidden','true');const label=node('span',d.companion.rarity+' · '+d.companion.name);button.append(glyph,label);button.addEventListener('click',()=>companionDialog().open(d,button));li.append(button,description);return li;}));
 summary.textContent=finds.length+' companion'+(finds.length===1?'':'s')+' on file';
 if(!finds.length){toggle.setAttribute('aria-expanded','false');register.dataset.expanded='false';}
 status.textContent=(finds.length?finds.length+' distinct finds · rarest first.':'No appointments filed. Run a mandate with companions enabled.')+(store.persistent()?' Saved in this browser.':' Storage is unavailable; finds last for this page session.');pending=false;latest.hidden=true;
 if(focused){const retained=[...list.querySelectorAll<HTMLLIElement>('li')].find(li=>li.dataset.companion===focused)?.querySelector('button');const target=retained||[toggle,list.querySelector('button'),document.querySelector<HTMLElement>('main')].find(el=>el&&el.getClientRects().length);target?.focus({preventScroll:true});}
 size();
}
store.subscribe(change=>{depart(change.departed);render(change.departed.length>0);});latest.addEventListener('click',()=>{render(true);list.querySelector('button')?.focus();});dialog.addEventListener('companion-closed',()=>{if(pending)latest.hidden=false;});render();
function size(){document.documentElement.style.setProperty('--discovery-height',Math.ceil(register.getBoundingClientRect().height)+'px');}
new ResizeObserver(size).observe(register);size();
