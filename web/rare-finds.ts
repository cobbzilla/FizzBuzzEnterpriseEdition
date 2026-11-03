import {node} from './companion-story';
import {companionDialog} from './companion-dialog';
import {discoveryStore} from './discovery-store';
const register=document.querySelector<HTMLElement>('#discovery-register')!,list=document.querySelector<HTMLOListElement>('#discovery-list')!,status=document.querySelector<HTMLElement>('#discovery-status')!,latest=document.querySelector<HTMLButtonElement>('#discovery-latest')!,dialog=document.querySelector<HTMLDialogElement>('#companion-dialog')!;
const store=discoveryStore();let pending=false;
function render(force=false){
 if(!force&&(list.contains(document.activeElement)||dialog.open)){pending=true;latest.hidden=false;return;}
 const finds=store.snapshot();list.replaceChildren(...finds.map((d,index)=>{const li=node('li'),button=node('button');button.type='button';button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','companion-dialog');button.title=d.companion.name;const description=node('span',d.companion.weight+' of one billion tickets. Open saved biography.');description.hidden=true;description.id='discovery-evidence-'+index;button.setAttribute('aria-describedby',description.id);const glyph=node('span',d.companion.emoji);glyph.setAttribute('aria-hidden','true');const label=node('span',d.companion.rarity+' · '+d.companion.name);button.append(glyph,label);button.addEventListener('click',()=>companionDialog().open(d,button));li.append(button,description);return li;}));
 status.textContent=(finds.length?finds.length+' distinct finds · rarest first.':'No appointments filed. Run a mandate with companions enabled.')+(store.persistent()?' Saved in this browser.':' Storage is unavailable; finds last for this page session.');pending=false;latest.hidden=true;
}
store.subscribe(()=>render());latest.addEventListener('click',()=>{render(true);list.querySelector('button')?.focus();});dialog.addEventListener('companion-closed',()=>{if(pending)latest.hidden=false;});render();
const size=()=>document.documentElement.style.setProperty('--discovery-height',Math.ceil(register.getBoundingClientRect().height)+'px');new ResizeObserver(size).observe(register);size();
