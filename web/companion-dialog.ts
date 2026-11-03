import {characterStory,node} from './companion-story';
import {discoveryLink,type Discovery} from './discovery-model';
import {scope} from './release-assets';
interface DialogController {open(discovery:Discovery,invoker:HTMLElement):void}
const controllerSymbol=Symbol.for('slopbuzz.companion-dialog.v1');
type DialogHost=HTMLDialogElement&{[controllerSymbol]?:DialogController};
export function companionDialog():DialogController {
 const dialog=document.querySelector<DialogHost>('#companion-dialog')!;if(dialog[controllerSymbol])return dialog[controllerSymbol]!;
 let invoker:HTMLElement|undefined,beganOnBackdrop=false;
 dialog.querySelector('[data-companion-close]')!.addEventListener('click',()=>dialog.close());
 const outside=(e:MouseEvent)=>{const b=dialog.getBoundingClientRect();return e.clientX<b.left||e.clientX>b.right||e.clientY<b.top||e.clientY>b.bottom;};
 dialog.addEventListener('pointerdown',e=>{beganOnBackdrop=e.target===dialog&&outside(e);});dialog.addEventListener('pointercancel',()=>{beganOnBackdrop=false;});
 dialog.addEventListener('click',e=>{const dismiss=dialog.open&&beganOnBackdrop&&e.target===dialog&&outside(e);beganOnBackdrop=false;if(dismiss)dialog.close();});
 dialog.addEventListener('close',()=>{beganOnBackdrop=false;if(invoker?.isConnected)invoker.focus();dialog.dispatchEvent(new Event('companion-closed'));});
 const controller:DialogController={open(d,opener){invoker=opener;const a=d.assignment,c=d.companion;dialog.querySelector('h2')!.textContent=c.name+' · '+a.ordinal+' '+a.flavor;
  const body=dialog.querySelector<HTMLElement>('[data-companion-story]')!;body.replaceChildren(characterStory(c));body.append(node('h3','Allocation evidence'),node('p','Mandate: '+d.mandate+'. Strategy: '+d.strategy+'. Seed policy: '+d.seedPolicy+'. Catalog: '+d.catalogVersion+'. Ticket: '+a.ticket+'.'),node('p','Extracted exact factors: '+a.factors.factors+'. '+(a.factors.complete?'Complete factorization.':'Unresolved exact cofactor: '+a.factors.cofactor+'. This cofactor is not certified prime.')+' Division checks: '+a.factors.divisions+' of '+a.factors.divisionBudget+'.'));
  const label=node('label','Reproducible encounter link');label.htmlFor='companion-share-link';const link=node('input');link.id='companion-share-link';link.type='url';link.readOnly=true;link.value=discoveryLink(d,scope);const copy=node('button','Copy encounter link');copy.type='button';const status=node('p');status.setAttribute('role','status');copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(link.value);status.textContent='Encounter link copied. The recipient can inspect this appointment without running the full mandate.';}catch{link.focus();link.select();status.textContent='Copy the selected link using your browser’s copy command.';}});body.append(label,link,copy,status);
  if(!dialog.open)dialog.showModal();dialog.querySelector<HTMLElement>('.companion-dialog-body')!.scrollTop=0;
 }};dialog[controllerSymbol]=controller;return controller;
}
