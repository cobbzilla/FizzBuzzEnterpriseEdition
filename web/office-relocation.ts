import {officeEstate} from './office-estate';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let frame=0;
function visible(){
 if(document.hidden)return false;
 if(document.querySelector('dialog[open]:not(#office-modal):not(#office-fullscreen)'))return false;
 return ['office-stage','supervision-stage'].some(id=>{const el=document.getElementById(id);if(!el||el.closest('[hidden]'))return false;const r=el.getBoundingClientRect();return r.width>0&&Math.min(r.bottom,innerHeight)-Math.max(r.top,0)>Math.min(60,r.height*.2);});
}
function tick(now:number){frame=0;if(!officeEstate.moving)return;if(reduced.matches||(document.getElementById('office-motion') as HTMLInputElement|null)?.checked===false){officeEstate.finish();return;}officeEstate.advance(now,visible());if(officeEstate.moving)frame=requestAnimationFrame(tick);}
officeEstate.subscribe(event=>{if(event.kind==='staged'&&!frame)frame=requestAnimationFrame(tick);});
reduced.addEventListener('change',()=>{if(reduced.matches)officeEstate.finish();});
addEventListener('pagehide',()=>{cancelAnimationFrame(frame);officeEstate.finish();},{once:true});
export function requestReorganization(){officeEstate.request();if(reduced.matches)officeEstate.finish();}
