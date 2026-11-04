import {releaseAsset} from './release-assets';
import {officeEstate} from './office-estate';
import {node} from './companion-story';
import {tourSeed} from './office-model';
import {hoveringLabel,hoveringCadence,observationEnvelope,planOfficeSteps,planFolio,ObservationClock,type ObservedOfficeStep,type OfficeCue,type ObservationEnvelope} from './office-supervision-model';
import type {ExecutionPacket,Folio,ExecutionEvent} from './chronicle';
import type {OfficeRenderer,OfficeSceneState} from './office-renderer';
import type {Discovery} from './discovery-model';

const element=<T extends HTMLElement=HTMLElement>(id:string)=>document.getElementById(id) as T;
interface ReadingAuthority {reading():boolean;paused():boolean;pause(value:boolean):void;wake():void;notice(text:string):void}

/** The observation clock owns disclosure; the Java operation has already completed. */
export class OfficeSupervisionDesk {
 private readonly checkbox=element<HTMLInputElement>('executive-hovering');
 private readonly cadence=element<HTMLSelectElement>('display-speed');
 private readonly pane=element('supervision-pane');
 private readonly canvas=element<HTMLCanvasElement>('supervision-canvas');
 private readonly media=matchMedia('(prefers-reduced-motion: reduce)');
 private normalCadence=this.cadence.value;
 private readonly normalPaceHelp=element('pace-help').textContent||'';
 private renderer?:OfficeRenderer;private module?:Promise<typeof import('./office-world')>;private loading?:Promise<void>;
 private ready=false;private fallback=false;private sceneActive=false;private readiness?:ReturnType<typeof setTimeout>;
 private epoch=0;private serial=0;private frame=0;private cancelFrame?:()=>void;private credits=0;
 private envelope?:ObservationEnvelope;private prefixDone=false;private suffixDone=false;private lastStep?:ObservedOfficeStep;
 private activeStep?:ObservedOfficeStep;
 private packet?:ExecutionPacket;private readonly packetContexts=new WeakMap<ExecutionPacket,{start:string;count:number}>();
 private folio?:Folio;private published=false;private companion?:Discovery;private mandate='15';private mode='mandate';private observed=0;private blocked='';

 constructor(private readonly authority:ReadingAuthority){
  officeEstate.subscribe(()=>this.updateScene());
  this.checkbox.addEventListener('change',()=>this.applyMode(true));
  element('supervision-autonomy').addEventListener('click',()=>{this.disable();this.checkbox.focus();});
  element('supervision-pause').addEventListener('click',()=>{if(this.authority.reading())this.authority.pause(!this.authority.paused());});
  element('supervision-next').addEventListener('click',()=>{if(!this.authority.reading()||!this.authority.paused())return;element('mandate-output').scrollIntoView({block:'start',behavior:'instant'});this.credits=1;this.authority.wake();});
  element('supervision-evidence').addEventListener('toggle',()=>{if((element('supervision-evidence') as HTMLDetailsElement).open&&this.authority.reading())this.authority.pause(true);});
  element('supervision-caption').addEventListener('focusin',()=>{if(this.authority.reading())this.authority.pause(true);});
  element('supervision-caption').addEventListener('wheel',()=>{if(this.authority.reading())this.authority.pause(true);},{passive:true});
  element('supervision-caption').addEventListener('touchstart',()=>{if(this.authority.reading())this.authority.pause(true);},{passive:true});
  const resize=new ResizeObserver(()=>{this.renderer?.resize();this.activity();});resize.observe(element('supervision-stage'));
  new IntersectionObserver(()=>this.activity(),{threshold:[0,.15]}).observe(element('supervision-stage'));
  document.addEventListener('visibilitychange',()=>this.activity());
  this.media.addEventListener('change',()=>this.updateScene());
  addEventListener('pagehide',()=>{this.interrupt();this.renderer?.dispose();clearTimeout(this.readiness);},{once:true});
  this.applyMode(false);
 }
 get enabled(){return this.checkbox.checked;}
 get generation(){return this.epoch;}
 get hasStepCredit(){return this.credits>0;}
 get ordinaryCadence(){return Number(this.normalCadence);}
 disable(){if(!this.enabled)return;this.checkbox.checked=false;this.applyMode(false);this.authority.wake();}
 private applyMode(user:boolean){
  if(this.enabled){
   if(this.cadence.value!==hoveringCadence)this.normalCadence=this.cadence.value;
   let option=this.cadence.querySelector<HTMLOptionElement>('option[value="'+hoveringCadence+'"]');
   if(!option){option=node('option',hoveringLabel);option.value=hoveringCadence;option.disabled=true;this.cadence.append(option);}
   this.cadence.value=hoveringCadence;this.cadence.disabled=true;this.pane.hidden=false;element('mandate-output').dataset.supervised='true';
   element('pace-help').textContent='Executive Hovering owns the disclosure queue. Each recorded decision must be witnessed. Restore Autonomy or uncheck Executive Hovering to recover your preceding cadence.';
   if(!this.authority.reading())this.current('Executive oversight is standing by for supplied proceedings. Run or replay a mandate to begin a new observation.');
   void this.ensureScene();
   if(user)requestAnimationFrame(()=>{if(!this.enabled)return;element('supervision-title').focus({preventScroll:true});element('mandate-output').scrollIntoView({block:'start',behavior:this.media.matches?'instant':'smooth'});});
  }else{
   this.interrupt();this.cadence.disabled=false;this.cadence.querySelector('option[value="'+hoveringCadence+'"]')?.remove();this.cadence.value=this.normalCadence;
   this.pane.hidden=true;delete element('mandate-output').dataset.supervised;
   element('pace-help').textContent=this.normalPaceHelp;
  }
  this.activity();this.syncControls();if(user)this.authority.wake();
 }
 syncControls(){
  const reading=this.authority.reading(),paused=this.authority.paused();
  const button=element<HTMLButtonElement>('supervision-pause');button.textContent=paused?'Resume':'Pause';button.setAttribute('aria-disabled',String(!reading));button.setAttribute('aria-pressed',String(paused));
  element('supervision-next').setAttribute('aria-disabled',String(!reading||!paused));
  if(this.enabled&&reading&&!paused&&!this.visible())this.authority.notice('Executive observation is waiting for attention. Return to the office view to continue.');
 }
 begin(mandate:string,mode='mandate'){
  this.interrupt();this.mandate=mandate;this.mode=mode;this.envelope=undefined;this.packet=undefined;this.prefixDone=false;this.suffixDone=false;this.lastStep=undefined;this.activeStep=undefined;this.folio=undefined;this.published=false;this.companion=undefined;this.observed=0;this.blocked='';
  this.pane.dataset.observedSteps='0';this.pane.dataset.state='waiting';this.current('Reception is accepting the mandate. The executive is withholding trust.');this.renderer?.direct(null);this.updateScene();this.syncControls();
 }
 interrupt(){this.epoch++;this.credits=0;this.cancelFrame?.();this.cancelFrame=undefined;cancelAnimationFrame(this.frame);this.frame=0;this.pane.dataset.state='stopped';}
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
 private sceneState(step=this.activeStep||this.lastStep):OfficeSceneState{return {room:step?.shot.room||'reception',route:[],ordinal:this.folio?.ordinal||'',text:this.published?this.folio?.text||'':'PENDING',emoji:this.companion?.companion.emoji,companionName:this.companion?.companion.name,paused:true,reducedMotion:this.media.matches,quality:'standard',seed:tourSeed(this.mandate),layout:officeEstate.current};}
 private updateScene(step=this.activeStep||this.lastStep){this.renderer?.update(this.sceneState(step));}
 private visible(){
  if(!this.enabled||document.hidden||document.querySelector('dialog[open]'))return false;
  const rect=element('supervision-stage').getBoundingClientRect(),bottom=innerHeight-(document.querySelector('#discovery-register')?.getBoundingClientRect().height||0);
  return rect.width>0&&Math.min(rect.bottom,bottom)-Math.max(rect.top,0)>=Math.min(60,rect.height*.2);
 }
 private activity(){const active=this.visible();if(active!==this.sceneActive){this.sceneActive=active;this.renderer?.active(active);}}
 private armReadiness(){clearTimeout(this.readiness);this.readiness=setTimeout(()=>{if(this.ready||!this.enabled)return;if(this.visible())this.graphicsFailure();else this.armReadiness();},20000);}
 private async ensureScene(){
  if(this.renderer){this.activity();this.renderer.resize();return;}if(this.fallback)return;if(this.loading)return this.loading;
  this.loading=(async()=>{
   try{
    this.module ||= import(releaseAsset('office-world.js').href) as Promise<typeof import('./office-world')>;
    const module=await this.module;if(!this.enabled)return;
    this.canvas.hidden=false;this.canvas.dataset.module=releaseAsset('office-world.js').href;this.canvas.dataset.renderer='babylon';
    this.renderer=module.createOffice({canvas:this.canvas,state:this.sceneState(),interactive:false,onRoom:()=>{},onProp:()=>{},onStep:()=>{},onView:()=>{},onReady:()=>{this.ready=true;clearTimeout(this.readiness);const loading=element('supervision-loading'),focused=loading.contains(document.activeElement);loading.hidden=true;if(focused)element('supervision-title').focus({preventScroll:true});},onProblem:()=>this.graphicsFailure()});
    this.sceneActive=!this.visible();this.activity();this.renderer.resize();this.armReadiness();
   }catch{this.module=undefined;this.graphicsFailure();}
  })().finally(()=>{this.loading=undefined;});return this.loading;
 }
 private graphicsFailure(){
  clearTimeout(this.readiness);this.renderer?.dispose();this.renderer=undefined;this.ready=true;this.fallback=true;this.canvas.hidden=true;this.canvas.dataset.renderer='evidence';
  if(document.activeElement===this.canvas)element('supervision-title').focus({preventScroll:true});
  const loading=element('supervision-loading');loading.hidden=false;const retry=node('button','Requisition another graphics attempt');retry.type='button';retry.addEventListener('click',()=>{this.fallback=false;this.ready=false;this.module=undefined;this.canvas.removeAttribute('data-rendered');loading.replaceChildren(node('p','Facilities is arranging another graphics interview…'));element('supervision-title').focus({preventScroll:true});void this.ensureScene();});loading.replaceChildren(node('p','The 3D display is unavailable. Executive observation continues through the supplied evidence below. The numbers remain employable.'),retry);
 }
 private show(step:ObservedOfficeStep,index:number,total:number){
  this.activeStep=step;
  this.pane.dataset.kind=step.event.kind;this.pane.dataset.ordinal=step.ordinal;this.pane.dataset.action=step.action;this.pane.dataset.state='running';
  const status=element('supervision-current');status.replaceChildren(node('strong',(index+1)+' / '+total+' · '+step.event.office),document.createTextNode(step.event.finding));
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
   const clock=new ObservationClock(step);let shown=false,published=false,manual=false,settled=false;
   const finish=(ok:boolean)=>{if(settled)return;settled=true;cancelAnimationFrame(this.frame);this.frame=0;if(this.cancelFrame===cancel)this.cancelFrame=undefined;resolve(ok);};
   const cancel=()=>finish(false);this.cancelFrame=cancel;
   const frame=(now:number)=>{
    if(epoch!==this.epoch||!this.enabled||!current()){finish(false);return;}
    this.activity();const visible=this.visible(),paused=this.authority.paused();
    const waiting=!visible?'attention':paused?'paused':'';
    if(waiting!==this.blocked){const previous=this.blocked;this.blocked=waiting;if(this.authority.reading()){if(waiting==='attention')this.authority.notice('Executive observation is waiting for attention. Return to the office view to continue.');else if(previous==='attention'&&!waiting)this.authority.notice('Executive observation resumed. The office controls disclosure.');}}
    if(!shown){
     if((this.ready||this.fallback)&&visible&&(!paused||this.credits>0)){shown=true;this.show(step,index,total);}
     else{this.frame=requestAnimationFrame(frame);return;}
    }
    if(paused&&this.credits>0&&visible){this.credits=0;manual=true;}
    const allow=visible&&(this.ready||this.fallback)&&(!paused||manual);
    const cue:OfficeCue=clock.tick(now,allow,manual);this.renderer?.direct(cue);
    if(this.pane.dataset.phase!==cue.phase){this.pane.dataset.phase=cue.phase;element<HTMLProgressElement>('supervision-progress').title=cue.phase==='arrival'?'Arriving at the next office':cue.phase==='work'?'The supplied decision is being illustrated':'A mandatory opportunity for executive contemplation';}
    if(step.publication&&!published&&clock.elapsed>=step.arriveMs+step.workMs){published=true;publish?.();}
    if(cue.complete){
     // Preserve one rendered final frame before moving to the next recorded decision.
     const acknowledge=()=>{if(epoch!==this.epoch||!current()){finish(false);return;}this.activity();if(!this.visible()){this.frame=requestAnimationFrame(acknowledge);return;}this.observed++;this.pane.dataset.observedSteps=String(this.observed);this.pane.dataset.state='held';element<HTMLProgressElement>('supervision-progress').value=index+1;finish(true);};
     this.frame=requestAnimationFrame(acknowledge);
    }else this.frame=requestAnimationFrame(frame);
   };
   this.frame=requestAnimationFrame(frame);
  });
 }
}
