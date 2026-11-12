import {releaseAsset} from './release-assets';
import {OfficeShotDirector,rebaseObservation} from './office-direction';
import {layoutToken} from './office-layout';
import {officeEstate} from './office-estate';
import {officeHeist} from './office-heist';
import {officeFlight} from './office-flight';
import {officeIncidents} from './office-incidents';
import {node} from './companion-story';
import {tourSeed} from './office-model';
import {observationEnvelope,planOfficeSteps,planFolio,ObservationClock,type ObservedOfficeStep,type OfficeCue,type ObservationEnvelope} from './office-supervision-model';
import {OfficeCadenceGovernor} from './office-cadence';
import type {ExecutionPacket,Folio,ExecutionEvent} from './chronicle';
import type {OfficeRenderer,OfficeSceneState,OfficeRenderFrame} from './office-renderer';
import type {Discovery} from './discovery-model';
import {playbackIcon} from './playback-controls';
import {PresentationScheduler} from './presentation-scheduler';

const element=<T extends HTMLElement=HTMLElement>(id:string)=>document.getElementById(id) as T;
interface ReadingAuthority {reading():boolean;paused():boolean;pause(value:boolean):void;wake():void;notice(text:string):void}

/** The observation clock owns disclosure; the Java operation has already completed. */
export class OfficeSupervisionDesk {
 private readonly checkbox=element<HTMLInputElement>('executive-hovering');
 private readonly cadence=element<HTMLSelectElement>('display-speed');
 private readonly pane=element('supervision-pane');
 private readonly canvas=element<HTMLCanvasElement>('supervision-canvas');
 private readonly media=matchMedia('(prefers-reduced-motion: reduce)');
 private readonly normalPaceHelp=element('pace-help').textContent||'';
 private readonly governor=new OfficeCadenceGovernor();private paintedAt=0;private paintedCue?:OfficeCue;
 private renderer?:OfficeRenderer;private module?:Promise<typeof import('./office-world')>;private loading?:Promise<void>;
 private ready=false;private fallback=false;private sceneActive=false;private sceneStartedAt=0;private readiness?:ReturnType<typeof setTimeout>;
 private epoch=0;private serial=0;private cancelFrame?:()=>void;private credits=0;
 private readonly scheduler=new PresentationScheduler(()=>this.visible());
 private envelope?:ObservationEnvelope;private prefixDone=false;private suffixDone=false;private lastStep?:ObservedOfficeStep;
 private activeStep?:ObservedOfficeStep;
 private latestCue?:OfficeCue;
 private packet?:ExecutionPacket;private readonly packetContexts=new WeakMap<ExecutionPacket,{start:string;count:number}>();
 private folio?:Folio;private published=false;private companion?:Discovery;private mandate='15';private mode='mandate';private observed=0;

 constructor(private readonly authority:ReadingAuthority){
  officeHeist.subscribe(()=>this.updateScene());officeFlight.subscribe(()=>this.updateScene());
  officeEstate.subscribe(event=>{this.updateScene();if(event.kind==='committed'){const label=element('supervision-current').querySelector('strong'),step=this.activeStep||this.lastStep;if(label&&step)label.textContent=label.textContent!.replace(/ · Address [A-D][1-3]$/,' · Address '+officeEstate.current.placements.find(p=>p.room===step.shot.room)!.address);}
   if(event.kind!=='progress'){this.syncControls();this.authority.wake();}});
  this.checkbox.addEventListener('change',()=>this.applyMode(true));
  this.cadence.addEventListener('change',()=>{this.pane.dataset.cadence=this.cadence.value;this.authority.wake();});
  element('supervision-autonomy').addEventListener('click',()=>{this.disable();this.checkbox.focus();});
  element('supervision-pause').addEventListener('click',()=>{if(this.authority.reading())this.authority.pause(!this.authority.paused());});
  element('supervision-next').addEventListener('click',()=>{if(!this.authority.reading()||!this.authority.paused()||officeEstate.moving||officeIncidents.active)return;if(!element<HTMLDialogElement>('office-fullscreen').open)element('mandate-output').scrollIntoView({block:'start',behavior:'instant'});this.credits=1;this.authority.wake();});
  const resize=new ResizeObserver(()=>{this.renderer?.resize();this.activity();});resize.observe(element('supervision-stage'));
  new IntersectionObserver(()=>this.activity(),{threshold:[0,.15]}).observe(element('supervision-stage'));
  document.addEventListener('visibilitychange',()=>this.activity(true));
  document.addEventListener('site-page-change',()=>this.activity(true));
  addEventListener('pageshow',()=>this.activity(true));
  document.addEventListener('demo-desk-change',()=>this.activity());
  document.addEventListener('demo-watch-layout',()=>{this.activity();requestAnimationFrame(()=>this.renderer?.resize());});
  document.addEventListener('office-fullscreen-change',()=>{this.activity();requestAnimationFrame(()=>this.renderer?.resize());});
  this.media.addEventListener('change',()=>this.updateScene());
  addEventListener('pagehide',()=>{this.interrupt();this.renderer?.dispose();clearTimeout(this.readiness);},{once:true});
  this.applyMode(false);
 }
 get enabled(){return this.checkbox.checked;}
 get generation(){return this.epoch;}
 get hasStepCredit(){return this.credits>0;}
 disable(){officeIncidents.finish('skipped');officeEstate.finish();if(!this.enabled)return;this.checkbox.checked=false;this.applyMode(false);this.authority.wake();}
 private applyMode(user:boolean){
  this.cadence.disabled=false;this.pane.dataset.cadence=this.cadence.value;this.pane.dataset.renderQuality=this.governor.quality;
  if(this.enabled){
   this.pane.hidden=false;element('mandate-output').dataset.supervised='true';
   element('pace-help').textContent='Full Board Ratification doubles each deliberation. Interdepartmental Sign-Off preserves established ceremony; Emergency Delegated Authority halves it. Executive Fiat uses the fastest pace the office can present smoothly. Change cadence at any time; every recorded decision keeps its place.';
   if(!this.authority.reading())this.current('Executive oversight is standing by for supplied proceedings. Run or replay a mandate to begin a new observation.');
   void this.ensureScene();
   // Navigation and focus belong to the workspace, including preference changes.
  }else{
   this.interrupt();
   this.pane.hidden=true;delete element('mandate-output').dataset.supervised;
   element('pace-help').textContent=this.normalPaceHelp;
  }
  this.activity();this.syncControls();document.dispatchEvent(new Event('demo-presentation-change'));if(user)this.authority.wake();
 }
 syncControls(){
  const reading=this.authority.reading(),paused=this.authority.paused();
  const button=element<HTMLButtonElement>('supervision-pause');playbackIcon(button,paused?'play':'pause',paused?'Resume':'Pause');button.setAttribute('aria-disabled',String(!reading));button.setAttribute('aria-pressed',String(paused));
  element('supervision-next').setAttribute('aria-disabled',String(!reading||!paused||officeEstate.moving||officeIncidents.active));
  if(officeEstate.moving&&reading)this.authority.notice('Facilities has suspended disclosure while all eight departments reconsider their addresses. Your pause and current decision are retained.');
  else if(officeIncidents.kind==='flight'&&reading)this.authority.notice('Paperwork is airborne. Proceedings will resume here after landing. Your Pause setting is retained.');
  else if(officeIncidents.active&&reading)this.authority.notice('The approval stamp is missing. Proceedings will resume at this decision when the chase resolves. Your Pause setting is retained.');
 }
 begin(mandate:string,mode='mandate'){
  this.interrupt();this.mandate=mandate;this.mode=mode;this.envelope=undefined;this.packet=undefined;this.prefixDone=false;this.suffixDone=false;this.lastStep=undefined;this.activeStep=undefined;this.folio=undefined;this.published=false;this.companion=undefined;this.observed=0;
  this.pane.dataset.observedSteps='0';this.pane.dataset.state='waiting';this.current('Reception is accepting the mandate. The executive is withholding trust.');this.renderer?.direct(null);this.updateScene();this.syncControls();
 }
 interrupt(){officeIncidents.finish('cancelled');officeEstate.finish();this.epoch++;this.credits=0;this.latestCue=undefined;this.cancelFrame?.();this.cancelFrame=undefined;this.scheduler.cancel();this.pane.dataset.state='stopped';}
 receive(packet:ExecutionPacket,start:string,count:number){this.packet=packet;this.packetContexts.set(packet,{start,count});this.envelope=observationEnvelope(packet,start,count);this.prefixDone=false;this.suffixDone=false;this.serial++;}
 async prelude(current:()=>boolean){
  if(!this.enabled||this.prefixDone||!this.envelope)return;this.prefixDone=true;this.folio=undefined;this.companion=undefined;this.published=false;
  const steps=planOfficeSteps(this.envelope.prefix,{id:'prelude-'+this.serial,hasFile:false,previous:this.lastStep});
  await this.play(steps,current);
 }
 async observe(folio:Folio,current:()=>boolean,publish:()=>void){
  if(!this.enabled)return;
  if(folio.packet&&folio.packet!==this.packet){await this.finishPacket(current);if(!current()||!this.enabled)return;const context=this.packetContexts.get(folio.packet);this.receive(folio.packet,context?.start||folio.ordinal,context?.count||1);}
  await this.prelude(current);if(!current()||!this.enabled)return;
  this.folio=folio;this.published=false;this.companion=undefined;
  await this.play(planFolio(folio,'folio-'+this.serial+'-'+folio.ordinal,this.lastStep),current,()=>{if(!current())return;this.published=true;publish();this.updateScene();});
 }
 async finishPacket(current:()=>boolean){
  if(!this.enabled||!this.envelope||this.suffixDone)return;await this.prelude(current);if(!current()||!this.enabled)return;
  this.suffixDone=true;this.folio=undefined;this.companion=undefined;this.published=false;
  await this.play(planOfficeSteps(this.envelope.suffix,{id:'conclusion-'+this.serial,hasFile:false,previous:this.lastStep}),current);
 }
 async rehearsal(event:ExecutionEvent,current:()=>boolean,preceding:ExecutionEvent[]=[]){
  if(!this.enabled)return;this.folio=undefined;this.companion=undefined;this.published=false;
  await this.play(planOfficeSteps([...preceding,event],{id:'rehearsal-'+ ++this.serial,source:'rehearsal',hasFile:false,previous:this.lastStep}).slice(-1),current,undefined,preceding.length,7);
 }
 remember(discovery:Discovery){if(!this.published||discovery.mandate!==this.mandate||discovery.assignment.ordinal!==this.folio?.ordinal)return;this.companion=discovery;this.updateScene();}
 clearCompanions(){this.companion=undefined;this.updateScene();}
 complete(){if(this.enabled){this.pane.dataset.state='complete';this.current('Observation is complete. The company is still withholding trust.');}this.syncControls();}
 private current(text:string){element('supervision-current').textContent=text;}
 private sceneState(step=this.activeStep||this.lastStep):OfficeSceneState{return {room:step?.shot.room||'reception',route:[],ordinal:this.folio?.ordinal||'',text:this.published?this.folio?.text||'':'PENDING',emoji:this.companion?.companion.emoji,companionName:this.companion?.companion.name,paused:true,reducedMotion:this.media.matches,quality:this.governor.quality,seed:tourSeed(this.mandate),layout:officeEstate.displayed,relocation:officeEstate.relocation,heist:officeHeist.snapshot,flight:officeFlight.snapshot};}
 private painted(frame:OfficeRenderFrame){this.paintedAt=frame.now;this.paintedCue=frame.cue;if(this.governor.observeFrame(frame.intervalMs,frame.renderMs)){this.pane.dataset.renderQuality=this.governor.quality;this.updateScene();}}
 private updateScene(step=this.activeStep||this.lastStep){try{this.renderer?.update(this.sceneState(step));}catch{this.graphicsFailure();}}
 private visible(){
  if(!this.enabled||document.hidden||document.querySelector('dialog[open]:not(#office-fullscreen)'))return false;
  if(document.body.classList.contains('demo-page')&&document.body.dataset.desk!=='observe')return false;
  const rect=element('supervision-stage').getBoundingClientRect(),bottom=innerHeight-(document.querySelector('#discovery-register')?.getBoundingClientRect().height||0);
  return rect.width>0&&Math.min(rect.bottom,bottom)-Math.max(rect.top,0)>=Math.min(60,rect.height*.2);
 }
 private activity(force=false){
  const rect=this.canvas.getBoundingClientRect(),active=this.visible()&&!this.canvas.hidden&&rect.width>0&&rect.height>0;
  if(force||active!==this.sceneActive){this.sceneActive=active;this.sceneStartedAt=performance.now();if(force&&active)this.renderer?.active(false);this.renderer?.active(active);if(active)this.renderer?.resize();}
  if(active&&this.ready&&!this.fallback&&performance.now()-Math.max(this.sceneStartedAt,this.paintedAt)>3000){this.graphicsFailure();return;}
  this.scheduler.refresh();
 }
 private armReadiness(){clearTimeout(this.readiness);this.readiness=setTimeout(()=>{if(this.ready||!this.enabled)return;if(this.sceneActive)this.graphicsFailure();else this.armReadiness();},20000);}
 private async ensureScene(){
  if(this.renderer){this.activity();this.renderer.resize();return;}if(this.fallback)return;if(this.loading)return this.loading;
  this.loading=(async()=>{
   try{
    this.module ||= import(releaseAsset('office-world.js').href) as Promise<typeof import('./office-world')>;
    const module=await this.module;if(!this.enabled)return;
    this.canvas.hidden=false;this.canvas.dataset.module=releaseAsset('office-world.js').href;this.canvas.dataset.renderer='babylon';
    this.renderer=module.createOffice({canvas:this.canvas,state:this.sceneState(),interactive:false,onRoom:()=>{},onProp:()=>{},onStep:()=>{},onView:()=>{},onHeistSuspect:(index,id)=>officeHeist.intercept(index,id),onHeistFootprint:()=>officeHeist.follow(),onFlightFan:(index,id)=>officeFlight.turn(index,id),onFlightRunway:(room,id)=>officeFlight.destination(room,id),onFrame:frame=>this.painted(frame),onReady:()=>{this.ready=true;if(this.latestCue)this.renderer?.direct(this.latestCue);clearTimeout(this.readiness);const loading=element('supervision-loading'),focused=loading.contains(document.activeElement);loading.hidden=true;if(focused)element('supervision-title').focus({preventScroll:true});},onProblem:()=>this.graphicsFailure()});
    this.sceneActive=!this.visible();this.activity();this.renderer.resize();this.armReadiness();
   }catch{this.module=undefined;this.graphicsFailure();}
  })().finally(()=>{this.loading=undefined;});return this.loading;
 }
 private graphicsFailure(){
  clearTimeout(this.readiness);const renderer=this.renderer;this.renderer=undefined;this.ready=true;this.fallback=true;this.canvas.hidden=true;this.canvas.dataset.renderer='evidence';
  try{renderer?.dispose();}catch{/* A lost device must still yield to the evidence view. */}
  this.activity();
  if(document.activeElement===this.canvas)element('supervision-title').focus({preventScroll:true});
  const loading=element('supervision-loading');loading.hidden=false;const retry=node('button','Requisition another graphics attempt');retry.type='button';retry.addEventListener('click',()=>{this.fallback=false;this.ready=false;this.module=undefined;this.canvas.removeAttribute('data-rendered');loading.replaceChildren(node('p','Facilities is arranging another graphics interview…'));element('supervision-title').focus({preventScroll:true});void this.ensureScene();});loading.replaceChildren(node('p','The 3D display is unavailable. Executive observation continues through the supplied evidence below. The numbers remain employable.'),retry);
 }
 private show(step:ObservedOfficeStep,index:number,total:number){
  this.activeStep=step;this.pane.dataset.room=step.shot.room;document.dispatchEvent(new CustomEvent('office-location',{detail:{view:'supervision'}}));
  this.pane.dataset.kind=step.event.kind;this.pane.dataset.ordinal=step.ordinal;this.pane.dataset.action=step.action;this.pane.dataset.state='running';
  const status=element('supervision-current');status.replaceChildren(node('strong',(index+1)+' / '+total+' · '+step.event.office+' · Address '+officeEstate.current.placements.find(p=>p.room===step.shot.room)!.address),document.createTextNode(step.event.finding));
  this.authority.notice((this.authority.paused()?'Paused observation':'Observing')+' · '+(index+1)+' / '+total+' · '+step.event.office);
  element('supervision-caption').scrollTop=0;
  const source=step.source==='rehearsal'?'Read-only personnel specimen. Numerical output is retained.':step.source==='disclosure'?'Observed result or cache receipt. Fresh production work is not inferred.':this.mode==='replay'?'Retained Java evidence. No business operation is being repeated.':'Recorded Java evidence. The operation has already completed; its UI disclosure is being choreographed.';
  element('supervision-source').textContent=source+(this.envelope?.omitted?' The source dossier omitted '+this.envelope.omitted+' entries; absent work is not reconstructed.':'');
  element('supervision-document').textContent=JSON.stringify(step.event,null,2).slice(0,12000);
  const progress=element<HTMLProgressElement>('supervision-progress');progress.max=total;progress.value=index;progress.setAttribute('aria-label','Observed decisions'+(step.ordinal?' for ordinal '+step.ordinal:''));
  this.updateScene(step);
 }
 private async play(steps:ObservedOfficeStep[],current:()=>boolean,publish?:()=>void,offset=0,total=steps.length){
  const epoch=this.epoch;void this.ensureScene();if(epoch!==this.epoch||!current()||!this.enabled)return;
  for(const [index,step]of steps.entries()){
   if(epoch!==this.epoch||!current()||!this.enabled)return;
   const done=await this.playOne(step,index+offset,total,epoch,current,publish);if(!done)return;this.lastStep=step;
  }
 }
 private playOne(step:ObservedOfficeStep,index:number,total:number,epoch:number,current:()=>boolean,publish?:()=>void):Promise<boolean>{
  return new Promise(resolve=>{
   const director=new OfficeShotDirector();step={...step,arriveMs:director.duration(step,officeEstate.current)};let layoutKey=layoutToken(officeEstate.current),arrivalFrames=director.minimumFrames(step,officeEstate.current);
   const clock=new ObservationClock(step);let shown=false,published=false,manual=false,settled=false,clockAt=0;
   const finish=(ok:boolean)=>{if(settled)return;settled=true;this.scheduler.cancel();if(this.cancelFrame===cancel)this.cancelFrame=undefined;resolve(ok);};
   const cancel=()=>finish(false);this.cancelFrame=cancel;
   const frame=(now:number)=>{
    if(epoch!==this.epoch||!this.enabled||!current()){finish(false);return;}
    const key=layoutToken(officeEstate.current);if(key!==layoutKey){const arrival=director.duration(step,officeEstate.current);clock.elapsed=rebaseObservation(clock.elapsed,step.arriveMs,arrival);step.arriveMs=arrival;arrivalFrames=director.minimumFrames(step,officeEstate.current);layoutKey=key;this.updateScene(step);}
    this.activity();const moving=officeEstate.moving||officeIncidents.active,paused=this.authority.paused();
    if(!shown){
     if(!moving&&(!paused||this.credits>0)){shown=true;this.show(step,index,total);}
     else{this.scheduler.request(frame);return;}
    }
    if(!moving&&paused&&this.credits>0){this.credits=0;manual=true;}
    const allow=!moving&&(!paused||manual);
    const painting=this.sceneActive&&this.ready&&!this.fallback;
    clockAt=Math.max(clockAt,painting?this.paintedAt:now);
    const cue:OfficeCue=clock.tick(clockAt,allow,manual,this.governor.budget(this.cadence.value,step,clock.elapsed,arrivalFrames,this.sceneActive,this.media.matches));this.latestCue=cue;if(this.ready)this.renderer?.direct(cue);
    if(this.pane.dataset.phase!==cue.phase){this.pane.dataset.phase=cue.phase;element<HTMLProgressElement>('supervision-progress').title=cue.phase==='arrival'?'Arriving at the next office':cue.phase==='work'?'The supplied decision is being illustrated':'A mandatory opportunity for executive contemplation';}
    if(!moving&&step.publication&&!published&&clock.elapsed>=step.arriveMs+step.workMs&&(!painting||manual||(this.paintedCue?.step.id===step.id&&this.paintedCue.work===1))){published=true;publish?.();}
    if(cue.complete){
     // Preserve one rendered final frame before moving to the next recorded decision.
     const acknowledge=()=>{
      if(epoch!==this.epoch||!current()){finish(false);return;}this.activity();
      if(officeEstate.moving||officeIncidents.active||(this.sceneActive&&this.ready&&!this.fallback&&!manual&&(this.paintedCue?.step.id!==step.id||!this.paintedCue.complete))){this.scheduler.request(acknowledge);return;}
      if(step.publication&&!published){published=true;publish?.();}
      this.observed++;this.pane.dataset.observedSteps=String(this.observed);this.pane.dataset.state='held';element<HTMLProgressElement>('supervision-progress').value=index+1;finish(true);
     };
     this.scheduler.request(acknowledge);
    }else this.scheduler.request(frame);
   };
   this.scheduler.request(frame);
  });
 }
}
