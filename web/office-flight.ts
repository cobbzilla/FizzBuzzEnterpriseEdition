import {FlightCoordinator,flightEligible,planFlight,personality} from './office-flight-model.ts';
import {officeIncidents} from './office-incidents';
import {officeEstate} from './office-estate';
import {PresentationScheduler} from './presentation-scheduler';
import {node} from './companion-story';
import {rooms,type RoomId} from './office-content';
import type {Discovery} from './discovery-model';
export const officeFlight=new FlightCoordinator(officeIncidents);
const scheduler=new PresentationScheduler(()=>!document.hidden&&document.body.dataset.sitePage==='demo');
function tick(now:number){officeFlight.advance(now,!officeEstate.moving);if(officeFlight.active)scheduler.request(tick);}
officeFlight.subscribe(()=>{if(officeFlight.active)scheduler.request(tick);else scheduler.cancel();});
for(const event of ['visibilitychange','site-page-change','demo-desk-change','office-fullscreen-change'])document.addEventListener(event,()=>scheduler.refresh());
addEventListener('pagehide',()=>{scheduler.cancel();officeFlight.finish('cancelled');},{once:true});
export class PaperAviationDesk {
 private mandate='';private active=false;private enabled=true;private latest=0n;private companions=new Map<string,Discovery>();
 constructor(private readonly mayInterrupt:()=>boolean){
  try{this.enabled=sessionStorage.getItem('slopbuzz:paper-aviation:v1')!=='off';}catch{}
  for(const checkbox of document.querySelectorAll<HTMLInputElement>('[data-flight-enabled]')){checkbox.checked=this.enabled;checkbox.addEventListener('change',()=>{this.enabled=checkbox.checked;for(const other of document.querySelectorAll<HTMLInputElement>('[data-flight-enabled]'))other.checked=this.enabled;try{sessionStorage.setItem('slopbuzz:paper-aviation:v1',this.enabled?'on':'off');}catch{}officeIncidents.flightsAvailable=this.enabled&&this.active&&this.mayInterrupt();if(!this.enabled)officeFlight.finish('disabled');});}
  for(const prefix of ['office','supervision'])new FlightPanel(prefix);
  officeFlight.subscribe(()=>this.records());
 }
 begin(mandate:string){this.cancel();this.mandate=mandate;this.active=true;this.latest=0n;this.companions.clear();}
 complete(){this.active=false;officeIncidents.flightsAvailable=false;}
 cancel(){this.active=false;officeIncidents.flightsAvailable=false;officeFlight.finish('cancelled');}
 clear(){this.companions.clear();officeFlight.finish('cancelled');}
 remember(d:Discovery){
  officeIncidents.flightsAvailable=this.active&&this.enabled&&this.mayInterrupt();
  if(!this.active||d.mandate!==this.mandate)return;const ordinal=d.assignment.ordinal;
  this.companions.set(ordinal,d);while(this.companions.size>100)this.companions.delete(this.companions.keys().next().value!);
  if(BigInt(ordinal)<=this.latest)return;this.latest=BigInt(ordinal);
  if(!this.enabled||!this.mayInterrupt()||officeEstate.moving||!flightEligible(ordinal)||!officeIncidents.admits('flight',ordinal))return;
  const previous=[...this.companions.values()].filter(p=>p.strategy===d.strategy&&BigInt(p.assignment.ordinal)<BigInt(ordinal)).reverse();
  const cast=[d,...previous].filter((p,i,all)=>all.findIndex(a=>a.companion.id===p.companion.id)===i).slice(0,3).map(p=>p.companion);
  if(officeFlight.start(planFlight(this.mandate,ordinal,d.assignment.flavor,d.strategy,cast)))officeIncidents.record('flight',ordinal);
 }
 private records(){const target=document.getElementById('flight-records')!,key=officeFlight.records.map(r=>r.id+':'+r.resolution).join('|');if(target.dataset.records===key)return;target.dataset.records=key;
  target.replaceChildren(...officeFlight.records.slice().reverse().map(r=>node('li',`${r.plan.source==='rehearsal'?'Test flight':'Flight'} ${r.plan.ordinal} · ${r.plan.actors[0].name} · ${r.plan.loops} holding pattern${r.plan.loops===1?'':'s'}. ${r.finding}`)));
  const last=officeFlight.records.at(-1);if(last)document.getElementById('flight-status')!.textContent=last.finding;
 }
}
class FlightPanel {
 private root=node('section');private label=node('strong');private pilot=node('p');private phases=node('p');private hold=node('p');private status=node('p');private map=node('p');private destination=node('select');private fans:HTMLButtonElement[]=[];private land=node('button','Land now');private lastStatus='';
 constructor(private readonly prefix:string){
  this.root.id=prefix+'-flight';this.root.className='flight-panel';this.root.hidden=true;this.root.setAttribute('aria-label','Paper Airplane Air-Traffic Control');
  this.pilot.className='flight-pilot';this.phases.className='flight-phases';this.hold.className='flight-hold';this.hold.textContent='Proceedings held until landing.';
  this.status.setAttribute('role','status');this.status.setAttribute('aria-live','polite');this.status.setAttribute('aria-atomic','true');this.map.className='flight-route';this.map.setAttribute('aria-label','Readable flight route');
  const controls=node('div');controls.className='flight-controls';const label=node('label','Landing department');this.destination.id=prefix+'-flight-destination';label.htmlFor=this.destination.id;
  for(const room of rooms){const option=node('option',room.short);option.value=room.id;this.destination.append(option);}
  this.destination.addEventListener('change',()=>{if(!officeEstate.moving)officeFlight.destination(this.destination.value as RoomId);this.render();});
  controls.append(label,this.destination);for(let i=0;i<3;i++){const b=node('button');b.type='button';b.dataset.fan=String(i);b.addEventListener('click',()=>{if(!officeEstate.moving)officeFlight.turn(i);});this.fans.push(b);controls.append(b);}
  this.land.type='button';this.land.addEventListener('click',()=>{if(!officeEstate.moving)officeFlight.land();});controls.append(this.land);
  this.root.append(this.label,this.pilot,this.hold,this.phases,this.status,this.map,controls);document.getElementById(prefix==='office'?'office-stage':'supervision-stage')!.append(this.root);
  officeFlight.subscribe(()=>this.render());officeEstate.subscribe(event=>{if(event.kind!=='progress')this.render();});
 }
 private render(){const s=officeFlight.snapshot;if(!s){if(this.root.contains(document.activeElement))document.getElementById((document.getElementById('office-fullscreen') as HTMLDialogElement).open?'office-fullscreen-exit':this.prefix==='office'?'office-close':'supervision-pause')?.focus({preventScroll:true});this.root.hidden=true;this.root.removeAttribute('data-active');return;}
  this.root.hidden=false;this.root.dataset.active='true';this.root.dataset.phase=s.phase;this.root.dataset.flightId=String(s.id);this.root.dataset.tactic=s.plan.tactic;this.root.dataset.elapsed=String(Math.floor(s.elapsed));this.root.dataset.arrival=s.arrival;
  const pilot=personality(s.plan.tactic),title=`${s.plan.source==='rehearsal'?'Test flight':'Flight'} ${s.plan.text.toUpperCase()}-${s.plan.ordinal} · ${s.plan.loops} holding pattern${s.plan.loops===1?'':'s'}`;
  if(this.label.textContent!==title)this.label.textContent=title;
  const name=s.plan.actors[0].emoji+' '+s.plan.actors[0].name+' · '+pilot.name;if(this.pilot.textContent!==name)this.pilot.textContent=name;
  const hold=officeEstate.moving?'Airspace frozen while Facilities moves the rooms.':'Proceedings held until landing.';if(this.hold.textContent!==hold)this.hold.textContent=hold;
  if(this.phases.dataset.phase!==s.phase){this.phases.dataset.phase=s.phase;this.phases.replaceChildren(...(['folding','cruise','holding','landing'] as const).map((phase,i)=>{const step=node('span',['Folding','Flying','Holding','Landing'][i]);if(phase===s.phase)step.setAttribute('aria-current','step');return step;}));}
  const status=(officeEstate.moving?'Airspace frozen while Facilities moves the rooms. ':pilot.name+'. ')+s.announcement+(s.plan.overflow?' Additional circular activity exceeds the circular-activity budget.':'');
  if(status!==this.lastStatus){this.status.textContent=status;this.lastStatus=status;}
  const destination=rooms.find(r=>r.id===s.destination)!,arrival=rooms.find(r=>r.id===s.arrival)!,address=officeEstate.current.placements.find(p=>p.room===s.destination)!.address;
  const route=`Publication → ${s.phase} → ${destination.short} (${address})${s.arrival!==s.destination?' · Crosswind diversion: '+arrival.short+' → ground courier':''}`;if(this.map.textContent!==route)this.map.textContent=route;
  if(this.destination.value!==s.destination)this.destination.value=s.destination;this.destination.setAttribute('aria-disabled',String(s.phase==='landing'||officeEstate.moving));
  for(const [i,b]of this.fans.entries()){const direction=s.fans[i]===0?'straight':s.fans[i]<0?'left':'right';b.textContent=`${i+1} ${s.fans[i]===0?'↑':s.fans[i]<0?'←':'→'}`;b.setAttribute('aria-label',`Turn fan ${i+1}, currently ${direction}`);b.title=`Fan ${i+1}: ${direction}`;b.dataset.direction=direction;b.setAttribute('aria-disabled',String(s.phase==='landing'||officeEstate.moving));}
  this.land.setAttribute('aria-disabled',String(s.phase==='landing'||officeEstate.moving));
 }
}
