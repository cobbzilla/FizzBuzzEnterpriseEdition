import {byId,setText} from './dom';
export type PersonnelScenario='approved'|'zero'|'two'|'missing-induction';
export interface OfficeDecision {office:string;state:'APPROVED'|'REJECTED'|'NOT_REACHED';rule:string;received:string;finding:string;document:string}
export interface PersonnelDossier {schema:'slopbuzz-onboarding/v1';caseId:string;purpose:'MANDATE'|'REHEARSAL';candidate:number;status:'APPROVED'|'REJECTED';startingOrdinal:1|null;steps:readonly OfficeDecision[]}
export interface PersonnelPlayback {current:()=>boolean;waitWhilePaused:()=>Promise<void>;delay:()=>Promise<void>}
export function parseDossier(value:unknown):PersonnelDossier {
 const data=value as PersonnelDossier;
 if(!data||data.schema!=='slopbuzz-onboarding/v1'||typeof data.caseId!=='string'||!['MANDATE','REHEARSAL'].includes(data.purpose)||!Number.isInteger(data.candidate)||!['APPROVED','REJECTED'].includes(data.status)||!Array.isArray(data.steps)||data.steps.length!==7||data.steps.some(step=>!step||!['APPROVED','REJECTED','NOT_REACHED'].includes(step.state)||['office','rule','received','finding','document'].some(key=>typeof (step as unknown as Record<string,unknown>)[key]!=='string')))throw new Error('The personnel record has an unsupported format.');
 if((data.status==='APPROVED'&&(data.candidate!==1||data.startingOrdinal!==1||data.steps.some(step=>step.state!=='APPROVED')))||(data.status==='REJECTED'&&(data.startingOrdinal!==null||!data.steps.some(step=>step.state==='REJECTED'))))throw new Error('The personnel verdict contradicts its recorded decisions.');
 return data;
}
export class PersonnelProceedings {
 private dossier?:PersonnelDossier;
 private visible=0;
 private rows:{item:HTMLLIElement;badge:HTMLElement;details:HTMLDetailsElement}[]=[];
 private source='';
 private busy=false;
 private playbackAvailable=false;
 setPlaybackAvailable(available:boolean){this.playbackAvailable=available;this.updateControls();}
 private synchronizeDisclosure(){
  const open=this.rows.length>0&&this.rows.every(row=>row.details.open);
  byId('personnel-documents-toggle').setAttribute('aria-expanded',String(open));
  setText('personnel-documents-toggle',open?'Fold all documents':'Expand all documents');
 }
 constructor(private actions:{rehearse:(scenario:PersonnelScenario)=>void;replay:()=>void;step:()=>void;disclosed?:(data:PersonnelDossier,count:number)=>void}){
  document.querySelectorAll<HTMLButtonElement>('[data-personnel-scenario]').forEach(button=>button.addEventListener('click',()=>{if(button.getAttribute('aria-disabled')!=='true')actions.rehearse(button.dataset.personnelScenario as PersonnelScenario);}));
  byId('personnel-replay').addEventListener('click',()=>{if((this.dossier||this.playbackAvailable)&&!this.busy)actions.replay();});
  byId('personnel-step').addEventListener('click',()=>{if((this.dossier||this.playbackAvailable)&&!this.busy)actions.step();});
  byId('personnel-documents').addEventListener('click',()=>{
   if(!this.dossier||this.busy)return;
   byId('personnel-documents').focus();
   byId<HTMLDialogElement>('personnel-dialog').showModal();
  });
  byId('personnel-dialog-close').addEventListener('click',()=>byId<HTMLDialogElement>('personnel-dialog').close());
  byId('personnel-dialog').addEventListener('close',()=>byId('personnel-documents').focus({preventScroll:true}));
  byId('personnel-documents-toggle').addEventListener('click',()=>{const open=byId('personnel-documents-toggle').getAttribute('aria-expanded')!=='true';this.rows.forEach(row=>row.details.open=open);this.synchronizeDisclosure();});
  this.updateControls();
 }
 get record(){return this.dossier;}
 get progress(){return this.visible;}
 setBusy(busy:boolean){this.busy=busy;this.updateControls();}
 private updateControls(){
  for(const id of ['personnel-replay','personnel-step'])byId(id).setAttribute('aria-disabled',String((!this.dossier&&!this.playbackAvailable)||this.busy));
  byId('personnel-documents').setAttribute('aria-disabled',String(!this.dossier||this.busy));
  document.querySelectorAll('[data-personnel-scenario]').forEach(button=>button.setAttribute('aria-disabled',String(this.busy)));
 }
 loading(){this.clear('Obtaining the personnel file…','Awaiting response');this.setBusy(true);}
 clear(message:string,verdict='No new proceedings'){
  this.dossier=undefined;this.rows=[];this.visible=0;this.busy=false;
  byId('personnel-steps').replaceChildren();byId('personnel-steps').hidden=true;
  setText('personnel-origin',message);setText('personnel-verdict',verdict);setText('personnel-status','No new personnel decisions are available to read.');
  byId('personnel-step').textContent='Step through';this.synchronizeDisclosure();
  this.updateControls();
 }
 responseRecord(response:Response):PersonnelDossier|undefined{
  const state=response.headers.get('X-SlopBuzz-Onboarding-State');
  if(state==='CACHE_REUSED'||response.headers.get('X-SlopBuzz-Cache')==='HIT'){
   this.clear('Institutional memory answered. No new HR proceedings.','Cache answered');return;
  }
  const raw=response.headers.get('X-SlopBuzz-Onboarding-Trace');
  if(!raw){this.clear('The output supplies the observed result. This administration did not forward individual personnel certificates; the chronicle explains the procedure.','Earlier administration');return;}
  try{if(raw.length>8192)throw new Error('Personnel record exceeds the response charter.');const data=parseDossier(JSON.parse(raw));if(data.purpose!=='MANDATE')throw new Error('A mandate needs its own recorded proceedings.');return data;}
  catch{this.clear('The accompanying personnel record could not be inspected. Numerical output remains independently available.','Evidence unavailable');}
 }
 rehearsalRecord(value:unknown):PersonnelDossier{const data=parseDossier(value);if(data.purpose!=='REHEARSAL')throw new Error('The desk returned an unrecognized rehearsal record.');return data;}
 prepare(data:PersonnelDossier,source?:string){
  this.dossier=data;this.visible=0;this.source=source||(data.purpose==='REHEARSAL'?'Read-only rehearsal':'Mandate record');
  setText('personnel-origin',`${this.source} · Applicant ${data.candidate} · Position: Initial ordinal · Case ${data.caseId}`);
  setText('personnel-verdict','Reading completed record');setText('personnel-status','Reading completed proceedings · 0 of 7 offices disclosed.');
  setText('personnel-step','Step through');
  this.rows=data.steps.map((step,index)=>{
   const item=document.createElement('li');item.dataset.read='false';
   const details=document.createElement('details');const summary=document.createElement('summary');
   details.addEventListener('toggle',()=>this.synchronizeDisclosure());
   const number=document.createElement('span');number.className='personnel-index';number.textContent=String(index+1).padStart(2,'0');number.setAttribute('aria-hidden','true');
   const office=document.createElement('span');office.className='personnel-office';office.textContent=step.office;
   const badge=document.createElement('span');badge.className='personnel-badge';badge.textContent='Not yet read';
   summary.append(number,office,badge);details.append(summary);
   const facts=document.createElement('dl');
   for(const [label,text]of [['Rule',step.rule],['Received',step.received],['Recorded decision',step.state==='APPROVED'?'Approved':step.state==='REJECTED'?'Rejected':'Not reached'],['Finding',step.finding],['Issued document',step.document]]){
    const row=document.createElement('div'),term=document.createElement('dt'),value=document.createElement('dd');term.textContent=label;value.textContent=text;row.append(term,value);facts.append(row);
   }
   const note=document.createElement('p');note.className='personnel-record-note';note.textContent='This is a completed Java decision record. Opening the document does not rerun the office.';
   details.append(facts,note);item.append(details);return {item,badge,details};
  });
  byId('personnel-steps').replaceChildren(...this.rows.map(row=>row.item));byId('personnel-steps').hidden=false;this.setBusy(false);
  this.synchronizeDisclosure();
 }
 disclose(count:number){
  if(!this.dossier)return;
  this.visible=Math.max(0,Math.min(count,7));
  this.rows.forEach((row,index)=>{
   const read=index<this.visible;const state=this.dossier!.steps[index].state;row.item.dataset.read=String(read);row.item.dataset.verdict=read?state:'UNREAD';
   row.badge.textContent=read?(state==='APPROVED'?'Approved':state==='REJECTED'?'Rejected':'Not reached'):'Not yet read';
  });
  const last=this.dossier.steps[Math.max(0,this.visible-1)];
  setText('personnel-status',this.visible===7?(this.dossier.status==='APPROVED'?'All seven offices disclosed. Commencement authorized at 1.':`Personnel application rejected by ${this.dossier.steps.find(step=>step.state==='REJECTED')!.office}. Subsequent offices were not reached.`):`Reading completed proceedings · ${this.visible} of 7 offices disclosed${this.visible?`. ${last.office}: ${last.state==='APPROVED'?'approved':last.state==='REJECTED'?'rejected':'not reached'}`:''}.`);
  setText('personnel-verdict',this.visible===7?(this.dossier.status==='APPROVED'?'Approved to start at 1':'Application rejected'):'Reading completed record');
  setText('personnel-step',this.visible>0&&this.visible<7?'Next office':'Step through');
  this.actions.disclosed?.(this.dossier,this.visible);
 }
 async read(data:PersonnelDossier,clock:PersonnelPlayback,source?:string){
  this.prepare(data,source);
  for(let i=0;i<data.steps.length;i++){
   await clock.waitWhilePaused();if(!clock.current())return;this.disclose(i+1);
   if(i<data.steps.length-1)await clock.delay();
  }
 }
 startStepThrough(){if(this.dossier)this.prepare(this.dossier,`Step-through inspection of ${this.dossier.purpose==='REHEARSAL'?'rehearsal':'mandate record'}`);}
 step(){this.disclose(this.visible+1);}
 stopReading(){
  this.setBusy(false);
  if(this.dossier&&this.visible<7)setText('personnel-status',`Reading adjourned after ${this.visible} of 7 offices. Replay or inspect the completed record when ready.`);
  else if(!this.dossier)this.clear('Proceedings adjourned before a personnel file was disclosed.');
 }
}
