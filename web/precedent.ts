import {byId,setText} from './dom';
import {request} from './runtime';

export interface PrecedentDecision {office:string;state:'APPROVED'|'REJECTED'|'NOT_REACHED';rule:string;received:string;finding:string;document:string}
export interface PrecedentDossier {schema:'slopbuzz-precedent/v1';caseId:string;purpose:'MANDATE'|'REHEARSAL';limit:number;repositoryLimit:number;bodyCharacters:number;certifiedLines:number|null;status:'APPROVED'|'REJECTED';steps:PrecedentDecision[]}
export function parsePrecedent(value:unknown):PrecedentDossier {
 const d=value as PrecedentDossier;
 if(!d||d.schema!=='slopbuzz-precedent/v1'||!['MANDATE','REHEARSAL'].includes(d.purpose)||typeof d.caseId!=='string'||!['APPROVED','REJECTED'].includes(d.status)||!Number.isSafeInteger(d.limit)||d.limit<0||d.limit>1000||!Number.isSafeInteger(d.repositoryLimit)||!Number.isSafeInteger(d.bodyCharacters)||d.bodyCharacters<0||!Array.isArray(d.steps)||d.steps.length!==5||d.steps.some(s=>!s||!['APPROVED','REJECTED','NOT_REACHED'].includes(s.state)||['office','rule','received','finding','document'].some(k=>typeof (s as unknown as Record<string,unknown>)[k]!=='string')))throw new Error('The court returned an unrecognized case file.');
 const rejected=d.steps.findIndex(s=>s.state==='REJECTED');
 if(d.status==='APPROVED'?(d.certifiedLines!==d.limit||d.steps.some(s=>s.state!=='APPROVED')):(d.certifiedLines!==null||rejected<0||d.steps.some((s,i)=>s.state!==(i<rejected?'APPROVED':i===rejected?'REJECTED':'NOT_REACHED'))))throw new Error('The court returned inconsistent decisions.');
 return d;
}
function element<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;}
export class PrecedentView {
 private serial=0;private busy=false;private latest?:PrecedentDossier;
 private readonly form=byId<HTMLFormElement>('precedent-form');private readonly button=byId<HTMLButtonElement>('precedent-submit');
 private readonly list=byId('precedent-steps');private readonly expand=byId<HTMLButtonElement>('precedent-expand');
 constructor(){
  this.form.addEventListener('submit',event=>{event.preventDefault();if(!this.busy)void this.rehearse();});
  this.expand.addEventListener('click',()=>{const details=[...this.list.querySelectorAll('details')];const open=details.some(d=>!d.open);details.forEach(d=>d.open=open);this.synchronize();});
  byId('precedent-latest').addEventListener('click',()=>{if(this.latest){++this.serial;this.setBusy(false);this.show(this.latest);}});
 }
 private setBusy(busy:boolean){this.busy=busy;this.button.setAttribute('aria-disabled',String(busy));this.list.setAttribute('aria-busy',String(busy));}
 private synchronize(){const details=[...this.list.querySelectorAll('details')],all=details.length>0&&details.every(d=>d.open);this.expand.setAttribute('aria-expanded',String(all));this.expand.textContent=all?'Collapse court documents':'Expand court documents';}
 waiting(extended=false){++this.serial;this.latest=undefined;this.setBusy(false);this.clear(extended?'Extended proceedings bypass retained institutional memory. No prior-work court is convened.':'Awaiting a repository result. The court convenes only if prior text is offered.');}
 mandate(data:PrecedentDossier|undefined,cache:string){
  ++this.serial;this.setBusy(false);this.latest=data;byId('precedent-latest').setAttribute('aria-disabled',String(!data));
  if(data)this.show(data);
  else this.clear(cache==='HIT'?'An earlier administration reused institutional memory without forwarding current court papers. Historical approvals are not reconstructed.':cache==='MISS'?'The repository offered no prior text. Fresh production proceeded without convening a reuse court.':'The repository was bypassed. No prior-work license was required.');
 }
 private clear(message:string){setText('precedent-source',message);setText('precedent-status','No court case is open.');this.list.replaceChildren();this.expand.hidden=true;byId('precedent-latest').setAttribute('aria-disabled',String(!this.latest));this.synchronize();}
 private show(d:PrecedentDossier){
  setText('precedent-source',`${d.purpose==='MANDATE'?'Actual mandate reuse proceedings':'Read-only specimen rehearsal'} · Case ${d.caseId} · Requested ${d.limit} lines · Repository key ${d.repositoryLimit}. These are current reuse decisions, not the original production history.${d.purpose==='MANDATE'&&d.status==='REJECTED'?' This cached candidate was refused before the ordinary fresh-production path was attempted. The numerical result is shown above.':''}`);
  const objection=d.steps.find(s=>s.state==='REJECTED');
  setText('precedent-status',d.status==='APPROVED'?`Reuse approved. Certificate of Authorized Non-Performance issued for ${d.certifiedLines} lines.`:`Reuse rejected by ${objection!.office}. ${objection!.finding}`);
  const rows=d.steps.map((step,index)=>{
   const item=element('li');item.dataset.verdict=step.state;const details=element('details'),summary=element('summary');
   const order=element('span',String(index+1).padStart(2,'0'));order.className='personnel-index';order.setAttribute('aria-hidden','true');
   const office=element('span',step.office);office.className='personnel-office';const state=element('span',step.state==='APPROVED'?'Approved':step.state==='REJECTED'?'Rejected':'Not reached');state.className='personnel-badge';
   summary.append(order,office,state);details.append(summary);const facts=element('dl');
   for(const [label,text]of [['Published rule',step.rule],['Received',step.received],['Finding',step.finding],['Issued document',step.document]]){const row=element('div');row.append(element('dt',label),element('dd',text));facts.append(row);}
   details.append(facts);details.addEventListener('toggle',()=>this.synchronize());item.append(details);return item;
  });
  this.list.replaceChildren(...rows);this.expand.hidden=false;this.synchronize();
 }
 private async rehearse(){
  const serial=++this.serial,scenario=byId<HTMLSelectElement>('precedent-scenario').value;this.setBusy(true);setText('precedent-status','The court is examining a read-only specimen. Your numerical output and cache are retained.');
  try{const response=await request(`/precedent/rehearsal?scenario=${encodeURIComponent(scenario)}`);if(!response.ok)throw new Error(`Court desk returned ${response.status}.`);const data=parsePrecedent(await response.json());if(data.purpose!=='REHEARSAL')throw new Error('The specimen desk returned a different purpose.');if(serial===this.serial)this.show(data);}
  catch(error){if(serial===this.serial)setText('precedent-status',`The court rehearsal could not be opened: ${(error as Error).message} No numerical mandate was submitted.`);}
  finally{if(serial===this.serial)this.setBusy(false);}
 }
}
