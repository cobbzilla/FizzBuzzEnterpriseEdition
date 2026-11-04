import {PersonnelProceedings,type PersonnelDossier,type PersonnelScenario} from './onboarding';
import {byId} from './dom';
import {request} from './runtime';

/** An experiment owns its own dossier and clock, never the numerical session. */
export class PersonnelExperiment {
 private readonly view:PersonnelProceedings;
 private serial=0;private reading=false;private paused=false;private stepping=false;private saved?:PersonnelDossier;
 private wake?:()=>void;
 constructor(){
  this.view=new PersonnelProceedings({rehearse:scenario=>void this.rehearse(scenario),replay:()=>{if(this.saved)void this.play(this.saved,true);},step:()=>{this.serial++;this.reading=false;this.wake?.();if(!this.stepping||this.view.progress===7){this.view.startStepThrough();this.stepping=true;}this.view.step();this.controls();}},'experiment-');
  byId('experiment-pause').addEventListener('click',()=>{if(this.reading){this.paused=!this.paused;this.wake?.();this.controls();}});
  byId('experiment-stop').addEventListener('click',()=>{this.serial++;this.reading=false;this.wake?.();this.view.stopReading();this.status('Rehearsal adjourned. The numerical mandate and its production papers remain intact.');this.controls();});
  document.addEventListener('demo-desk-change',(event)=>{if((event as CustomEvent).detail.desk!=='experiment'&&this.reading){this.paused=true;this.wake?.();this.controls();}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&this.reading){this.paused=true;this.wake?.();this.controls();}});
  this.controls();
 }
 private status(text:string){byId('experiment-status').textContent=text;}
 private controls(){for(const id of ['experiment-pause','experiment-stop'])byId(id).setAttribute('aria-disabled',String(!this.reading));byId('experiment-pause').textContent=this.paused?'Resume rehearsal':'Pause rehearsal';}
 private wait(ms?:number){return new Promise<void>(resolve=>{let timer:ReturnType<typeof setTimeout>|undefined;const finish=()=>{clearTimeout(timer);if(this.wake===finish)this.wake=undefined;resolve();};this.wake=finish;if(ms!==undefined)timer=setTimeout(finish,ms);});}
 private async rehearse(scenario:PersonnelScenario){
  const serial=++this.serial;this.wake?.();this.reading=false;this.view.loading();this.status('Obtaining a read-only personnel specimen…');this.controls();
  try{const reply=await request('/onboarding/rehearsal?scenario='+encodeURIComponent(scenario));if(!reply.ok)throw new Error('Personnel desk returned '+reply.status+'.');const data=this.view.rehearsalRecord(await reply.json());if(serial!==this.serial)return;this.saved=data;this.view.setPlaybackAvailable(true);await this.play(data,false);}
  catch(error){if(serial===this.serial){this.view.clear('The specimen could not be obtained.');this.status('Personnel rehearsal failed: '+error.message+' No numerical mandate was submitted.');}}
 }
 private async play(data:PersonnelDossier,replay:boolean){
  const serial=++this.serial;this.wake?.();this.reading=true;this.stepping=false;this.paused=byId('desk-experiment').hidden===true;this.controls();
  this.status(replay?'Replaying the retained specimen. No Java operation will be repeated.':'Reading completed personnel proceedings. Production output remains intact.');
  await this.view.read(data,{current:()=>serial===this.serial,waitWhilePaused:async()=>{while(this.paused&&serial===this.serial)await this.wait();},delay:async()=>{const delay=Number(byId<HTMLSelectElement>('experiment-speed').value);if(delay)await this.wait(delay);}},replay?'Replay of read-only rehearsal':undefined);
  if(serial!==this.serial)return;this.reading=false;this.view.setBusy(false);this.status('Personnel '+(replay?'replay complete':data.status==='APPROVED'?'rehearsal approved':'rehearsal rejected')+'. Numerical output and production evidence are retained.');this.controls();
 }
}
