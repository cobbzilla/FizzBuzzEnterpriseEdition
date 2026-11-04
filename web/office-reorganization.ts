import {officeEstate} from './office-estate';
import {partitionStyles} from './office-layout';
import {rooms} from './office-content';
import {node} from './companion-story';

/** Basic controls are shared by both views; relocation ceremony is supplied next. */
export class ReorganizationPanel {
 private readonly button=node('button','Announce Another Reorganization');private readonly status=node('p');private readonly details=node('details');private readonly table=node('table');private busy=false;
 constructor(container:HTMLElement){
  container.classList.add('reorganization-panel');this.button.type='button';this.button.className='button button-secondary';this.button.addEventListener('click',()=>{if(this.busy)return;try{officeEstate.reorganize();}catch(error){this.status.textContent=error instanceof Error?error.message:'Facilities has deferred certainty.';}});
  this.status.className='field-help';this.status.setAttribute('role','status');this.status.setAttribute('aria-live','polite');this.details.append(node('summary','Inspect the current workplace arrangement'));this.table.className='estate-addresses';this.details.append(this.table);container.append(this.button,this.status,this.details);officeEstate.subscribe(()=>this.render());this.render();
 }
 setReading(reading:boolean){this.busy=reading;this.button.disabled=reading;this.button.title=reading?'Complete or stop the reading before relocating the company.':'Authorize a new arrangement of the same responsibilities.';}
 private render(){
  const l=officeEstate.current;this.status.textContent='Estate edition '+l.edition+' · '+l.rows+' × '+l.columns+(l.amenity?' · '+l.amenity.kind+' at '+l.amenity.address:' · all available space is committed to seriousness');
  this.status.parentElement!.dataset.estateEdition=String(l.edition);const head=node('thead'),row=node('tr');for(const name of ['Department','Address','Partition policy']){const th=node('th',name);th.scope='col';row.append(th);}head.append(row);const body=node('tbody');
  for(const p of [...l.placements].sort((a,b)=>a.slot-b.slot)){const tr=node('tr'),theme=partitionStyles.find(s=>s.id===p.partition);tr.append(node('td',rooms.find(r=>r.id===p.room)!.short),node('td',p.address),node('td',theme?theme.name+' · '+theme.claim:'Founding architectural certainty'));body.append(tr);}if(l.amenity){const tr=node('tr');tr.append(node('td',l.amenity.kind==='atrium'?'Atrium: Chief Growth Officer in residence':'Breakroom: mandatory optional restoration'),node('td',l.amenity.address),node('td','The company is accommodating the appearance of a perk.'));body.append(tr);}this.table.replaceChildren(node('caption','Current department addresses'),head,body);
 }
}
