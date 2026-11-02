import {byId,setText} from './dom';
import {request} from './runtime';

import {parsePremises,type PremisesDossier} from './premises-model';
export {parsePremises} from './premises-model';

function element<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string,className?:string){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(className)n.className=className;return n;}
export function premisesCard(d:PremisesDossier,details=false):HTMLElement {
 const card=element('div',undefined,'premises-card');card.dataset.premisesOrdinal=d.ordinal;card.dataset.premisesVerdict=d.status;
 card.append(element('p',`Premises inspection · Ordinal ${d.ordinal}`,'eyebrow'));
 const verdict=d.status==='REJECTED'?'Occupancy refused':d.tenants.length?'Hidden occupants removed; vacancy certified':'Vacancy certified; lease issued';
 card.append(element('p',verdict,'premises-verdict'));
 const plan=element('dl',undefined,'premises-floorplan');
 const before=d.initialLength===null?'No valid initial survey received':d.tenants.length?`${d.initialLength} UTF-16 unit${d.initialLength===1?'':'s'} occupied`: 'Empty: 0 characters';
 for(const [label,text]of [['Initial survey',before],['Before numerical occupancy',d.vacancyCertified?'Reinspection confirmed 0 characters':'Vacancy authorization withheld'],['Lease',d.status==='APPROVED'?'Issued to this request and this premises':'No usable lease issued']]){const row=element('div');row.append(element('dt',label),element('dd',text));plan.append(row);}
 card.append(plan);
 if(d.tenants.length){const list=element('ul',undefined,'premises-tenants');for(const tenant of d.tenants){const row=element('li');row.append(element('strong',`${tenant.name} · ${tenant.codePoint}`),element('p',`Position ${tenant.position}. ${tenant.excuse}`));list.append(row);}card.append(list);}
 card.append(element('p',d.purpose==='REHEARSAL'?'Read-only specimen. Its lease is closed after inspection; no numerical output, cache entry or audit transaction is created.':'This is the actual pre-occupancy inspection. Authorized numerical text moves in after vacancy is certified.','field-help'));
 if(details){const list=element('ol',undefined,'personnel-steps');list.setAttribute('aria-label','Six premises office decisions');for(const [index,step]of d.steps.entries()){const item=element('li');item.dataset.verdict=step.state;const disclosure=element('details'),summary=element('summary');const number=element('span',String(index+1).padStart(2,'0'),'personnel-index');number.setAttribute('aria-hidden','true');summary.append(number,element('span',step.office,'personnel-office'),element('span',step.state.replaceAll('_',' ').toLowerCase(),'personnel-badge'));disclosure.append(summary,element('p',step.finding),element('p',step.document,'field-help'));item.append(disclosure);list.append(item);}card.append(list);}
 return card;
}
export class PremisesDesk {
 private busy=false;private serial=0;
 constructor(){byId('premises-form').addEventListener('submit',event=>{event.preventDefault();if(!this.busy)void this.inspect();});}
 private async inspect(){
  const ordinal=byId<HTMLInputElement>('premises-ordinal'),scenario=byId<HTMLSelectElement>('premises-scenario').value;
  if(!/^[1-9][0-9]*$/.test(ordinal.value)){ordinal.setAttribute('aria-invalid','true');setText('premises-error','Enter a positive whole number with no leading zeros.');ordinal.focus();return;}
  ordinal.removeAttribute('aria-invalid');setText('premises-error','');const requestedOrdinal=ordinal.value;const serial=++this.serial;this.busy=true;
  byId('premises-submit').setAttribute('aria-disabled','true');byId('premises-result').setAttribute('aria-busy','true');setText('premises-status','The property offices are inspecting a read-only specimen…');
  try{const response=await request(`/premises/rehearsal?scenario=${encodeURIComponent(scenario)}&ordinal=${requestedOrdinal}`);if(!response.ok)throw new Error(`Inspection desk returned ${response.status}.`);const data=parsePremises(await response.json());if(data.purpose!=='REHEARSAL'||data.ordinal!==requestedOrdinal)throw new Error('The specimen belongs to another premises request.');if(serial!==this.serial)return;byId('premises-result').replaceChildren(premisesCard(data,true));const refusal=data.steps.find(s=>s.state==='REJECTED');setText('premises-status',refusal?`Occupancy refused by ${refusal.office}. ${refusal.finding}`:data.tenants.length?`Inspection identified and removed ${data.tenants.map(t=>`${t.name}, ${t.codePoint}`).join('; ')}. Reinspection passed; specimen lease issued and closed.`:'Vacant premises approved. Specimen lease issued and closed.');}
  catch(error){if(serial===this.serial)setText('premises-status',`The property inspection could not be completed: ${(error as Error).message} No numerical mandate was submitted.`);}
  finally{if(serial===this.serial){this.busy=false;byId('premises-submit').setAttribute('aria-disabled','false');byId('premises-result').setAttribute('aria-busy','false');}}
 }
}
