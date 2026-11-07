import {officeEstate} from './office-estate';
import {PresentationScheduler} from './presentation-scheduler';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function visible(){
 if(document.hidden)return false;
 if(document.querySelector('dialog[open]:not(#office-modal):not(#office-fullscreen)'))return false;
 return ['office-stage','supervision-stage'].some(id=>{const el=document.getElementById(id);if(!el||el.closest('[hidden]'))return false;const r=el.getBoundingClientRect();return r.width>0&&Math.min(r.bottom,innerHeight)-Math.max(r.top,0)>Math.min(60,r.height*.2);});
}
const scheduler=new PresentationScheduler(visible);
function tick(now:number){if(!officeEstate.moving)return;if(reduced.matches||(document.getElementById('office-motion') as HTMLInputElement|null)?.checked===false){officeEstate.finish();return;}officeEstate.advance(now,true);if(officeEstate.moving)scheduler.request(tick);}
officeEstate.subscribe(event=>{if(event.kind==='staged')scheduler.request(tick);else if(event.kind==='committed'||event.kind==='cancelled')scheduler.cancel();});
for(const event of ['visibilitychange','site-page-change','demo-desk-change','demo-watch-layout','office-fullscreen-change'])document.addEventListener(event,()=>scheduler.refresh());
reduced.addEventListener('change',()=>{if(reduced.matches)officeEstate.finish();});
addEventListener('pagehide',()=>{scheduler.cancel();officeEstate.finish();},{once:true});
export function requestReorganization(){officeEstate.request();if(reduced.matches)officeEstate.finish();}
