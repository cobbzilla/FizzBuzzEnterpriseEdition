import {companionCatalog,type Assignment} from './companions';
import {node} from './companion-story';
import {companionDialog} from './companion-dialog';
import {seedPolicy,validDiscovery,type Discovery} from './discovery-model';
import {request} from './runtime';
import {parseMandate} from './mandate-input';
/** A shared link prefills, but never submits an unbounded numerical mandate. */
let previousReferral='';
export function prepareSharedEncounter(input:HTMLInputElement){
 const query=new URL(location.href).searchParams,limit=query.get('limit');if(limit===null)return;
 const referral=['limit','ordinal','authority','catalog','companion','seedPolicy'].map(key=>query.get(key)||'').join('|');if(referral===previousReferral)return;
 let mandate:string;try{mandate=String(parseMandate(limit));}catch{return;}
 previousReferral=referral;document.querySelector('.shared-encounter')?.remove();
 input.value=mandate;input.dispatchEvent(new Event('input'));
 const authority=document.querySelector<HTMLSelectElement>('#authorize-companion-strategy');if(authority&&[...authority.options].some(option=>option.value===query.get('authority'))){authority.value=query.get('authority')!;authority.dispatchEvent(new Event('change'));}
 if(!query.has('ordinal')&&!query.has('companion'))return;
 const ordinal=query.get('ordinal'),strategy=query.get('authority'),catalogVersion=query.get('catalog'),expected=query.get('companion');
 const panel=node('section');panel.className='shared-encounter';panel.setAttribute('aria-labelledby','shared-encounter-title');const title=node('h3','Interdepartmental encounter referral');title.id='shared-encounter-title';const status=node('p','The referred mandate is ready. Run it to reproduce the sequence. No numerical mandate has been submitted.');status.setAttribute('role','status');panel.append(title,status);document.querySelector('#authorize-companion-help, #companion-help')!.after(panel);
 if(!ordinal||!/^[1-9][0-9]*$/.test(ordinal)||BigInt(ordinal)>BigInt(mandate)||!strategy||!catalogVersion||!expected||query.get('seedPolicy')!==seedPolicy){status.textContent='The mandate was prefilled. This referral has incomplete or unsupported encounter evidence; select an authority and run to explore.';return;}
 const button=node('button','Inspect shared appointment');button.type='button';button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','companion-dialog');panel.append(button);
 button.addEventListener('click',async()=>{if(button.getAttribute('aria-disabled')==='true')return;button.setAttribute('aria-disabled','true');status.textContent='Verifying the referred appointment with the Java allocation authority…';try{
  const catalog=await companionCatalog();if(catalog.version!==catalogVersion)throw new Error('This referral uses a different catalog version.');
  const response=await request('/companions/window?start='+ordinal+'&count=1&strategy='+encodeURIComponent(strategy)+'&seed='+mandate);if(!response.ok)throw new Error('The referred authority could not approve this appointment.');
  const data=await response.json(),a:Assignment|undefined=data.assignments?.[0],c=catalog.entries.find(c=>c.id===expected);
  if(data.schema!=='slopbuzz-companion-window/v2'||data.seedPolicy!==seedPolicy||data.mandateSeed!==mandate||data.catalogVersion!==catalogVersion||data.strategy!==strategy||data.start!==ordinal||data.count!==1||data.assignments?.length!==1||a?.ordinal!==ordinal||a.companionId!==expected||!c)throw new Error('This referral does not reproduce the claimed appointment.');
  const discovery:Discovery={companion:c,assignment:a,mandate,strategy,catalogVersion,seedPolicy,discoveredAt:new Date().toISOString()};if(!validDiscovery(discovery))throw new Error('The referral supplied invalid evidence.');
  status.textContent='Appointment verified. This inspection did not print numbers or add a discovery to your register.';companionDialog().open(discovery,button);
 }catch(error){status.textContent='Referral could not be verified: '+error.message+' Run the mandate to explore current appointments.';}finally{button.setAttribute('aria-disabled','false');}});
}
