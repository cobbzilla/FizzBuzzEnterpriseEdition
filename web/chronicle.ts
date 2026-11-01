import {byId,setText} from './dom';
import {parseDossier,type PersonnelDossier} from './onboarding';
import {parsePrecedent,type PrecedentDossier} from './precedent';
import {ChronicleLanguage,type NarrativeSituation} from './chronicle-language';
export interface ExecutionEvent {ordinal:string|null;kind:string;office:string;finding:string;document:string|null}
export interface ExecutionPacket {text:string;events:ExecutionEvent[];omitted:number;cache:string;runtime:Record<string,unknown>;recorded:boolean;precedent?:PrecedentDossier}
export interface Folio {ordinal:string;text:string;events:readonly ExecutionEvent[];cache:string;recorded:boolean;runtime:Record<string,unknown>;narrative?:readonly string[]}
export async function readProclamation(response:Response):Promise<ExecutionPacket>{
 const runtime=JSON.parse(response.headers.get('X-SlopBuzz-Execution-Runtime')||'{}');
 const packet:ExecutionPacket={text:'',events:[] as ExecutionEvent[],omitted:0,cache:response.headers.get('X-SlopBuzz-Cache')||'UNKNOWN',runtime,recorded:false};
 const precedent=response.headers.get('X-SlopBuzz-Precedent-Trace');
 if(precedent&&precedent.length<=8192)try{const data=parsePrecedent(JSON.parse(precedent));if(data.purpose==='MANDATE')packet.precedent=data;}catch{/* Optional court papers must not prevent disclosure of correct numerical output. */}
 if(!response.headers.get('Content-Type')?.includes('application/json')){
  const raw=response.headers.get('X-SlopBuzz-Onboarding-Trace');
  if(raw&&raw.length<=8192)try{const personnel=parseDossier(JSON.parse(raw));if(personnel.purpose==='MANDATE')packet.events=personnel.steps.map(step=>({ordinal:'1',kind:'HR_'+step.state,office:step.office,finding:step.finding,document:step.document}));}catch{/* A missing optional dossier must not erase the observed output. */}
  return {...packet,text:await response.text()};
 }
 const data=await response.json();
 if(data?.schema!=='slopbuzz-execution/v1'||typeof data.text!=='string'||!Array.isArray(data.trace?.events)||data.trace.events.length>50000||!Number.isSafeInteger(data.trace.omitted)||data.trace.omitted<0||data.trace.events.some((e:ExecutionEvent)=>!e||(e.ordinal!==null&&(typeof e.ordinal!=='string'||!/^\d+$/.test(e.ordinal)))||['kind','office','finding'].some(k=>typeof(e as unknown as Record<string,unknown>)[k]!=='string')||(e.document!==null&&typeof e.document!=='string')))throw new Error('The execution dossier could not be read. No second mandate was submitted.');
 return {...packet,text:data.text,events:data.trace.events,omitted:data.trace.omitted,recorded:true};
}
function node<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string,className?:string){const result=document.createElement(tag);if(text!==undefined)result.textContent=text;if(className)result.className=className;return result;}
function title(folio:Folio){
 if(folio.ordinal==='1')return 'One has reported for duty';
 if(folio.text==='FizzBuzz')return 'A cross-departmental branding initiative has concluded';
 if(folio.text==='Fizz')return 'The Fizz delegation has been admitted';
 if(folio.text==='Buzz')return 'The Buzz delegation has been admitted';
 return `Ordinal ${folio.ordinal} has retained its numerical identity`;
}
function paragraphs(folio:Folio,language:ChronicleLanguage):string[]{
 const events=folio.events,parts:string[]=[];
 const add=(situation:NarrativeSituation,facts:string)=>parts.push(language.write(situation,facts));
 if(folio.ordinal==='1')add('one','One has reported for duty. The first position is now visibly occupied by exactly one. Zero remains outside the staffing plan; Two must wait for an authorized succession.');
 if(folio.cache==='HIT'){add('cache',`Institutional Memory reissued the approved answer “${folio.text}”. No fresh recruitment, classification, glyph requisition or numerical audit transaction was conducted for this cache hit.`);add('cacheProvenance',`The observed output is ${folio.text}. Its current disclosure is new; the underlying business result was already held in the output cache. Historical per-line certificates are not manufactured for this replay.`);return parts;}
 const hr=events.filter(e=>e.kind.startsWith('HR_'));
 if(hr.length)add('personnel','Personnel has supplied the actual case file. '+hr.map(e=>`${e.office}: ${e.finding}`).join(' '));
 if(!folio.recorded){add('legacy',`The observed proclamation is “${folio.text}”. The earlier administration returned the answer without forwarding a detailed execution dossier. ${hr.length?'Its supplied personnel approvals are recorded above; the other departments are explained as procedure.':'We can explain the company’s procedure while keeping those explanations distinct from recorded decisions.'}`);add('procedure',`Under the current procedure, One completes recruitment and induction before a new sequence starts. Each ordinal is classified for Fizz, Buzz or its own decimal identity, and word output obtains its approved characters through procurement. The procedure’s contracts are described here; individual historical approvals are not reconstructed.`);add('procedure',`A retained mandate uses staged output, an independent notary, the audit repository and its message queue. Extended-magnitude windows use exact arithmetic and an independent lexical witness without retained audit transactions. The selected runtime’s old receipt does not establish which newer offices attended this particular case.`);return parts;}
 const assembly=events.find(e=>e.kind==='ASSEMBLY');if(assembly)add('assembly',assembly.finding+' The visitor then consulted each certified strategy before allowing its printer to speak.');
 const classification=events.find(e=>e.kind==='CLASSIFICATION'||e.kind==='EXTENDED_CLASSIFICATION');if(classification)add('classification',classification.finding);
 const procurement=events.filter(e=>['REQUISITION','DELIVERY','GLYPH_ACCEPTED','GLYPH_ASSEMBLED'].includes(e.kind));
 if(procurement.length){const received=procurement.filter(e=>e.kind==='GLYPH_ACCEPTED');const zs=received.filter(e=>e.finding.includes('character z,'));add('procurement',`Glyph Procurement received ${received.length} individually inspected character allocations${zs.length?`, including ${zs.length} separately certified z’s`:''}. `+procurement.filter(e=>e.kind!=='GLYPH_ACCEPTED').map(e=>e.finding).join(' ')+' Every position’s receiving decision is available in the department documents.');}
 const numeral=events.find(e=>e.kind==='NUMERAL');if(numeral)add('numeral',numeral.finding);
 const begin=events.find(e=>e.kind==='TRANSACTION_BEGIN'),fragments=events.filter(e=>e.kind==='FRAGMENT');
 if(begin)add('transaction',begin.finding+` ${fragments.length} fragments entered custody: `+fragments.map(e=>JSON.stringify(e.document)).join(', ')+'. Even the line ending is accounted for; the public receives a complete proclamation.');
 const departments={NOTARY:'notary',PUBLICATION:'publication',AUDIT_APPEND:'audit',QUEUE_ENQUEUED:'queued',TRANSACTION_COMMIT:'commit',TRANSACTION_CLEANUP:'cleanup',SUCCESSION:'succession',EXTENDED_NOTARY:'extendedNotary',EXTENDED_SUCCESSION:'extendedSuccession'} as const;
 for(const [kind,situation]of Object.entries(departments)){
  const selected=events.filter(e=>e.kind===kind);if(selected.length)add(situation,selected.map(e=>`${e.office}: ${e.finding}`).join(' '));
 }
 if(!parts.length)add('fallback',`The recorded output “${folio.text}” has entered the transcript. The accompanying department documents contain the observed decisions for ordinal ${folio.ordinal}.`);
 return parts;
}
export class ExecutiveChronicle {
 private readonly language=new ChronicleLanguage();
 private readonly rehearsals=new WeakMap<PersonnelDossier,readonly string[]>();
 private packet?:ExecutionPacket;
 private groups=new Map<string,ExecutionEvent[]>();
 private snapshots=new Map<string,Folio>();
 private options=new Map<string,HTMLOptionElement>();
 private rendered=new Map<string,HTMLElement>();
 private serial=0;
 private collapsed=0;
 private inspected?:HTMLElement;
 private pending=false;
 private pendingNotes:{text:string;heading:string}[]=[];
 private pinned=true;
 private pinAfterResize=false;
 private body=byId('chronicle-scroll');
 private entries=byId('chronicle-entries');
 private follow=byId<HTMLInputElement>('follow-chronicle');
 private selector=byId<HTMLSelectElement>('chronicle-ordinal');
 constructor(){
  const pause=()=>{if(this.body.scrollHeight-this.body.clientHeight<=4)return;this.pinned=false;this.pinAfterResize=false;};
  this.body.addEventListener('scroll',()=>{
   if(this.pinAfterResize)return;
   this.pinned=this.atBottom();
   if(this.pinned&&this.follow.checked&&this.pending)this.latest();
  },{passive:true});
  this.body.addEventListener('wheel',event=>{if(event.deltaY<0&&!event.ctrlKey)pause();},{passive:true});
  this.body.addEventListener('keydown',event=>{if(['ArrowUp','PageUp','Home'].includes(event.key)||(event.key===' '&&event.shiftKey))pause();});
  let touchY:number|undefined;
  this.body.addEventListener('touchstart',event=>{touchY=event.touches[0]?.clientY;},{passive:true});
  this.body.addEventListener('touchmove',event=>{const next=event.touches[0]?.clientY;if(next!==undefined&&touchY!==undefined&&next>touchY)pause();touchY=next;},{passive:true});
  this.body.addEventListener('pointerdown',event=>{const bounds=this.body.getBoundingClientRect();if(this.body.offsetWidth-this.body.clientWidth>2&&event.clientX>=bounds.left+this.body.clientWidth)pause();},{passive:true});
  this.follow.addEventListener('change',()=>{if(this.follow.checked)this.latest();});
  this.selector.addEventListener('change',()=>{if(this.selector.value==='latest'){this.latest();return;}const folio=this.snapshots.get(this.selector.value);if(!folio)return;this.follow.checked=false;this.inspected?.remove();this.inspected=this.render(folio);this.inspected.prepend(node('p','Archive inspection · original completed record','chronicle-source'));this.inspected.classList.add('chronicle-inspection');this.body.prepend(this.inspected);this.body.scrollTop=0;setText('chronicle-current',`Inspecting recorded ordinal ${folio.ordinal}. New output can continue without moving this reading position.`);});
  const layout=()=>{if(this.pinAfterResize){this.pinAfterResize=false;this.followBottom();}const panel=byId('mandate-output');panel.dataset.viewportFit=String(innerHeight>600&&panel.getBoundingClientRect().height<=innerHeight-24);};
  let frame=0;const schedule=()=>{if(!frame)frame=requestAnimationFrame(()=>{frame=0;layout();});};
  const resize=new ResizeObserver(schedule);
  resize.observe(this.body);resize.observe(this.entries);resize.observe(byId('mandate-output'));resize.observe(byId('mandate-output').querySelector('.output-dock')!);
  window.addEventListener('resize',()=>{this.pinAfterResize=this.isFollowing();schedule();});
 }
 get records():Folio[]{return [...this.snapshots.values()];}
 begin(limit:string,mode='mandate'){
  this.packet=undefined;this.groups.clear();this.snapshots.clear();this.options.clear();this.rendered.clear();this.collapsed=0;this.serial++;this.pending=false;this.pendingNotes=[];this.follow.checked=true;this.pinned=true;this.pinAfterResize=false;
  this.inspected?.remove();this.inspected=undefined;this.entries.replaceChildren();this.selector.replaceChildren(node('option','Latest proceedings'));this.selector.options[0].value='latest';
  this.note(this.language.write(mode==='replay'?'replay':'reception',mode==='replay'?'The clerk is rereading completed proceedings. No business operation will be executed again.':`Reception accepted an upper limit of ${limit}. The input passed decimal validation. The company is obtaining a result and will explain each number as it becomes visible.`),'Mandate reception');
  setText('chronicle-current',mode==='replay'?'Replaying completed corporate minutes.':'The committees have received a numerical mandate.');
 }
 receive(packet:ExecutionPacket){
  this.packet=packet;this.groups.clear();for(const event of packet.events){if(event.ordinal!==null){const group=this.groups.get(event.ordinal)||[];group.push(event);this.groups.set(event.ordinal,group);}}
 const global=packet.events.filter(e=>e.ordinal===null&&!['COMPLETE','FAILED'].includes(e.kind)&&!e.kind.startsWith('PRECEDENT_'));
  if(global.length)this.note(this.language.write('global',global.map(e=>`${e.office}: ${e.finding}`).join(' ')),'Recorded reception and operating path');
  if(packet.precedent){
   this.note(this.language.write(packet.precedent.status==='APPROVED'?'courtApproved':'courtRejected',packet.precedent.status==='APPROVED'?'Institutional Memory offered prior text. Five actual Java offices examined the current reuse petition.':'Institutional Memory offered an inadmissible precedent. The court refused reuse before a single fresh production run was authorized. The rejected text has not been disclosed as the answer.'),'Prior Work Ratification and Institutional Memory Court');
   for(const step of packet.precedent.steps)this.note(this.language.write('office',`${step.state==='APPROVED'?'Approved':step.state==='REJECTED'?'Rejected':'Not reached'}. ${step.finding} ${step.document}`),step.office);
  }
  const {engine,storage,cache}=packet.runtime;
  if(engine)this.note(this.language.write('runtime',`The appointed implementation is ${String(engine)}. Its declared repository is ${String(storage||'unspecified')} and its cache adapter is ${String(cache||'unspecified')}. ${packet.cache==='HIT'?'Institutional memory answered without convening a fresh production workforce.':'The following account distinguishes actual Java decisions from explanatory context.'}`),'Execution arrangements');
  if(packet.omitted)this.note(this.language.write('omitted',`${packet.omitted} observation entries exceeded the finite dossier allowance. Numerical output remains independently available.`),'Observation allowance');
 }
 disclose(start:string,lines:readonly string[]){
  let ordinal=BigInt(start);const folios=lines.map(text=>{const value=ordinal.toString();ordinal++;return {ordinal:value,text,events:this.groups.get(value)||[],cache:this.packet?.cache||'UNKNOWN',recorded:this.packet?.recorded||false,runtime:this.packet?.runtime||{}};});
  this.discloseFolios(folios);return folios;
 }
 discloseFolios(folios:readonly Folio[]){
  for(const folio of folios){this.snapshots.set(folio.ordinal,folio);if(!this.options.has(folio.ordinal)){const option=node('option',`Ordinal ${folio.ordinal}`);option.value=folio.ordinal;this.options.set(folio.ordinal,option);this.selector.append(option);}
   while(this.snapshots.size>1000){const oldest=this.snapshots.keys().next().value!;this.snapshots.delete(oldest);if(this.selector.value!==oldest){this.options.get(oldest)?.remove();this.options.delete(oldest);}}
  }
  this.pauseIfReading();if(!this.isFollowing()){this.pending=true;return;}
  for(const folio of folios.slice(-24)){const old=this.rendered.get(folio.ordinal);if(old){old.remove();this.rendered.delete(folio.ordinal);}const article=this.render(folio);this.rendered.set(folio.ordinal,article);this.entries.append(article);}
  this.trim();const last=folios.at(-1);if(last&&!this.inspected){this.selector.value='latest';setText('chronicle-current',`Ordinal ${last.ordinal}: ${title(last)}. Official output: ${last.text}.`);}this.followBottom();
 }
 private render(folio:Folio){
  const article=node('article',undefined,'chronicle-folio');article.dataset.ordinal=folio.ordinal;
  article.append(node('p',`Ordinal ${folio.ordinal} · ${folio.cache==='HIT'?'Institutional memory':folio.recorded?'Recorded Java proceedings':folio.events.length?'Recorded personnel · procedure explained':'Observed output · procedure explained'}`,'chronicle-source'),node('h4',title(folio)));
  folio.narrative??=Object.freeze(paragraphs(folio,this.language));
  for(const paragraph of folio.narrative)article.append(node('p',paragraph,'chronicle-prose'));
  if(folio.events.length){const details=node('details');details.append(node('summary',`Inspect ${folio.events.length} department records for ordinal ${folio.ordinal}`));const list=node('ol');for(const event of folio.events){const item=node('li');item.append(node('strong',event.office),node('p',event.finding));if(event.document)item.append(node('pre',event.document,'chronicle-document'));list.append(item);}details.append(list);article.append(details);}
  return article;
 }
 private trim(){
  for(const [key,article]of this.rendered){if(this.rendered.size<=24)break;if(article.contains(document.activeElement))continue;article.remove();this.rendered.delete(key);this.collapsed++;}
  let notice=this.entries.querySelector<HTMLElement>('.chronicle-archive-note');if(this.collapsed){if(!notice){notice=node('p',undefined,'chronicle-archive-note');this.entries.prepend(notice);}notice.textContent=`Earlier narration has been condensed for a finite browser. Inspect any of the latest ${this.snapshots.size} disclosed ordinals using the selector.`;}
 }
 note(text:string,heading='Corporate minutes'){
  this.pauseIfReading();if(!this.isFollowing()){this.pending=true;this.pendingNotes.push({text,heading});if(this.pendingNotes.length>16)this.pendingNotes.shift();return;}
  const article=node('article',undefined,'chronicle-note');article.append(node('h4',heading),node('p',text));this.entries.append(article);
  const notes=this.entries.querySelectorAll('.chronicle-note');if(notes.length>16)notes[0].remove();this.followBottom();
 }
 rehearsal(data:PersonnelDossier,count:number){
  this.pauseIfReading();
  const key=`rehearsal-${data.caseId}`;let article=this.entries.querySelector<HTMLElement>(`[data-rehearsal="${CSS.escape(key)}"]`);
  if(!article){article=node('article',undefined,'chronicle-note');article.dataset.rehearsal=key;this.entries.append(article);}
  let prose=this.rehearsals.get(data);if(!prose){prose=Object.freeze([this.language.write('rehearsal','This is a read-only rehearsal using the actual personnel offices. Existing numerical output is retained; the rehearsal creates no numerical audit entries.'),...data.steps.map(decision=>this.language.write('office',`${decision.office} — ${decision.state==='APPROVED'?'Approved':decision.state==='REJECTED'?'Rejected':'Not reached'}. ${decision.finding} ${decision.document}`))]);this.rehearsals.set(data,prose);}
  article.replaceChildren(node('h4',`Management intervention: applicant ${data.candidate}`),node('p',prose[0]));
  for(const paragraph of prose.slice(1,count+1))article.append(node('p',paragraph));
  setText('chronicle-current',count===7?(data.status==='APPROVED'?'Personnel rehearsal approved: One may start work.':`Personnel rehearsal rejected by ${data.steps.find(e=>e.state==='REJECTED')!.office}.`):`Reading completed personnel rehearsal: ${count} of 7 offices.`);
  const rehearsals=this.entries.querySelectorAll('[data-rehearsal]');if(rehearsals.length>8)rehearsals[0].remove();this.followBottom();
 }
 finish(zero=false){
  if(zero&&!this.inspected)setText('chronicle-current','Zero-number mandate complete. No numerical output was required.');
  if(zero)this.note(this.language.write(this.packet?.cache==='HIT'?'zeroCache':this.packet?.recorded?'zeroFresh':'zeroLegacy',this.packet?.cache==='HIT'?'Institutional memory reissued the zero-work mandate. No new recruitment, numerical line or audit entry was required.':this.packet?.recorded?'The company hired One for a zero-work mandate. The loop boundary then declined every numerical iteration. No line was printed and no numerical audit entry was needed.':'The observed zero-number mandate published no lines. Under the current procedure One is initialized before the loop boundary declines all work; this older response supplied no individual personnel certificates.'),'Zero-number mandate');
  const denied=[...this.groups.values()].filter(events=>!this.snapshots.has(events[0]?.ordinal||'')).flat().filter(e=>e.kind==='CONTINUATION');
  this.note(this.language.write('finish',(denied.length?denied.map(e=>e.finding).join(' ')+' ':'')+'The requested disclosures are complete. Replay and inspection read these retained minutes without submitting another mandate.'),'Proceedings concluded');
 }
 private atBottom(){return this.body.scrollHeight-this.body.clientHeight-this.body.scrollTop<=4;}
 private isFollowing(){return this.follow.checked&&this.pinned;}
 private pauseIfReading(){if(!this.pinAfterResize&&!this.atBottom())this.pinned=false;}
 private followBottom(){if(this.isFollowing())this.body.scrollTop=this.body.scrollHeight;}
 private latest(){this.inspected?.remove();this.inspected=undefined;this.follow.checked=true;this.pinned=true;this.pinAfterResize=false;this.selector.value='latest';for(const [ordinal,option]of this.options)if(!this.snapshots.has(ordinal)){option.remove();this.options.delete(ordinal);}if(this.pending){this.pending=false;const notes=this.pendingNotes;this.pendingNotes=[];this.entries.replaceChildren();this.rendered.clear();this.note(this.language.write('resume','Following has resumed at the latest retained minutes. No business operation was submitted again.'),'Reading position restored');this.discloseFolios(this.records.slice(-24));for(const entry of notes)this.note(entry.text,entry.heading);}const last=this.records.at(-1);if(last)setText('chronicle-current',`Ordinal ${last.ordinal}: ${title(last)}. Official output: ${last.text}.`);this.followBottom();}
}
