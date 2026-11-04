import {requestReorganization} from './office-relocation';
import {officeEstate} from './office-estate';
import {partitionStyles} from './office-layout';
import {rooms} from './office-content';
import {node} from './companion-story';

/** Both offices report the same Facilities transaction. */
export class ReorganizationPanel {
 private readonly button=node('button','Announce Another Reorganization');private readonly status=node('p');private readonly details=node('details');private readonly table=node('table');private readonly skip=node('button','Waive the Moving Ceremony');private readonly progress=node('progress');private phase='';
 constructor(container:HTMLElement){
  container.classList.add('reorganization-panel');this.button.type='button';this.button.className='button button-secondary';this.button.addEventListener('click',()=>{if(officeEstate.moving)return;try{requestReorganization();}catch(error){this.status.textContent=error instanceof Error?error.message:'Facilities has deferred certainty.';}});
  this.status.className='field-help';this.status.setAttribute('role','status');this.status.setAttribute('aria-live','polite');this.details.append(node('summary','Inspect the current workplace arrangement'));this.table.className='estate-addresses';this.details.append(this.table);this.skip.type='button';this.skip.addEventListener('click',()=>{this.button.focus({preventScroll:true});officeEstate.finish();});this.progress.max=1;this.progress.setAttribute('aria-label','Facilities relocation progress');container.append(this.button,this.skip,this.progress,this.status,this.details);officeEstate.subscribe(event=>{this.transaction();if(event.kind==='committed'||event.kind==='cancelled')this.render();});this.render();this.transaction();
 }
 setReading(_reading:boolean){this.button.title='Authorize a new arrangement of the same responsibilities. Current proceedings wait for Facilities.';}
 private transaction(){const r=officeEstate.relocation;this.button.setAttribute('aria-disabled',String(!!r));if(!r&&document.activeElement===this.skip)this.button.focus({preventScroll:true});this.skip.hidden=!r;this.progress.hidden=!r;if(!r){this.phase='';return;}this.progress.value=r.progress;this.button.parentElement!.dataset.relocationPhase=r.phase;if(this.phase!==r.phase){this.phase=r.phase;this.status.textContent=({packing:'Packing every department. Responsibilities are being carefully separated from accountability.',moving:'All eight offices are in transit. The moving boxes have been granted acting management authority.',unpacking:'Unpacking the approved future. These addresses remain provisional until Facilities declares victory.',returning:'Returning to the interrupted decision. No work has been repeated; no responsibility has been reduced.'})[r.phase];}}
 private render(){
  const l=officeEstate.current;delete this.button.parentElement!.dataset.relocationPhase;this.status.textContent='Estate edition '+l.edition+' · '+l.rows+' × '+l.columns+(l.amenity?' · '+l.amenity.kind+' at '+l.amenity.address:' · all available space is committed to seriousness');
  this.status.parentElement!.dataset.estateEdition=String(l.edition);const head=node('thead'),row=node('tr');for(const name of ['Department','Address','Partition policy']){const th=node('th',name);th.scope='col';row.append(th);}head.append(row);const body=node('tbody');
  for(const p of [...l.placements].sort((a,b)=>a.slot-b.slot)){const tr=node('tr'),theme=partitionStyles.find(s=>s.id===p.partition);tr.append(node('td',rooms.find(r=>r.id===p.room)!.short),node('td',p.address),node('td',theme?theme.name+' · '+theme.claim:'Founding architectural certainty'));body.append(tr);}if(l.amenity){const tr=node('tr');tr.append(node('td',l.amenity.kind==='atrium'?'Atrium: Chief Growth Officer in residence':'Breakroom: mandatory optional restoration'),node('td',l.amenity.address),node('td','The company is accommodating the appearance of a perk.'));body.append(tr);}this.table.replaceChildren(node('caption','Current department addresses'),head,body);
 }
}
