import {officeEstate} from './office-estate';
import {OfficeTourDesk} from './office-tour';
import {OfficeSupervisionDesk} from './office-supervision';
import {ReorganizationPanel} from './office-reorganization';
import {prepareSharedEncounter} from './shared-encounter';
import {CompanionDesk} from './companions';
import {parseMandate,autocorrectMandate,addOrdinals,windowCount,chooseMagnitudeWarning,type MandateInteger} from './mandate-input';
import {trackUsage} from './telemetry';
import { request, config,proclamation } from './runtime';
import {byId,setText} from './dom';
import {PersonnelProceedings,type PersonnelDossier} from './onboarding';
import {ExecutiveChronicle,readProclamation,type Folio,type ExecutionPacket} from './chronicle';
import {PrecedentView} from './precedent';
import {PremisesDesk} from './premises';
import {DemoWorkspace} from './demo-workspace';
import {PersonnelExperiment} from './personnel-experiment';
import {playbackIcon} from './playback-controls';
const runForm = byId<HTMLFormElement>('run-form');
const limitInput = byId<HTMLInputElement>('limit');
const speedControl = byId<HTMLSelectElement>('display-speed');
const runButton = byId<HTMLButtonElement>('run-button');
let mandateSequence = 0;
const pauseButton = byId<HTMLButtonElement>('pause-reading');
const revealButton = byId<HTMLButtonElement>('reveal-all');
const stopButton = byId<HTMLButtonElement>('stop-reading');
let streaming = false;
const followOutput = byId<HTMLInputElement>('follow-output');
let reading = false;
let paused = false;
let revealAll = false;
let wakeReading: (() => void) | undefined;
let activityMode:'mandate'|'replay'|'inspection'='mandate';
let manualStep=false;
let forecastSequence=0;
const chronicle=new ExecutiveChronicle();
const precedent=new PrecedentView();
new PrecedentView('experiment-');
new PremisesDesk();
let workspace:DemoWorkspace|undefined;
const office=new OfficeTourDesk();
const supervision=new OfficeSupervisionDesk({reading:()=>reading,paused:()=>paused,pause:setReadingPaused,wake:()=>{wakeReading?.();readingControls();},notice:text=>setText('run-status',text)});
officeEstate.subscribe(event=>{if(event.kind!=='progress'){wakeReading?.();}});
const reorganizationPanels=[new ReorganizationPanel(byId('supervision-reorganization')),new ReorganizationPanel(byId('office-reorganization'))];
const companions=new CompanionDesk({remember:discovery=>{office.remember(discovery);supervision.remember(discovery);workspace?.remember(discovery);},clearCompanions:()=>{office.clearCompanions();supervision.clearCompanions();workspace?.clearCompanions();}});
let currentLimit='15';
let receivedPacket:ExecutionPacket|undefined;
let lastPlayback:{kind:'mandate';folios:Folio[];limit:string;personnel?:PersonnelDossier;packet?:ExecutionPacket}|undefined;
let inspection:{folios:Folio[];index:number}|undefined;
const personnel=new PersonnelProceedings({rehearse:()=>{},replay:()=>void replayPersonnel(),step:stepPersonnel},'');
new PersonnelExperiment();
workspace=new DemoWorkspace({placeChronicle:target=>chronicle.place(target)});
function discloseLines(start:string,lines:readonly string[]){companions.disclose(start,lines);const folios=chronicle.disclose(start,lines);office.disclose(currentLimit,folios);workspace?.disclosed(folios.at(-1));lastPlayback={kind:'mandate',folios:chronicle.records,limit:currentLimit,personnel:personnel.record,packet:receivedPacket};personnel.setPlaybackAvailable(true);}
const immediate=()=>revealAll||(!supervision.enabled&&Number(speedControl.value)===0);
async function observeLine(folio:Folio,sequence:number,publish:()=>void){
 let published=false;const release=()=>{if(published||sequence!==mandateSequence)return;published=true;publish();};
 while(supervision.enabled&&!revealAll){const generation=supervision.generation;await supervision.observe(folio,()=>sequence===mandateSequence,release);if(sequence!==mandateSequence)return false;if(generation===supervision.generation||!supervision.enabled)break;}
 if(sequence!==mandateSequence)return false;
 while((officeEstate.moving||paused&&!supervision.enabled)&&sequence===mandateSequence)await waitForPace();
 if(sequence!==mandateSequence)return false;release();return true;
}
function readingControls() {
  for(const panel of reorganizationPanels)panel.setReading(reading);
  stopButton.setAttribute('aria-disabled', String(!reading));
  revealButton.textContent = activityMode==='replay'?'Reveal completed proceedings':streaming ? 'Waive disclosure delays' : 'Reveal complete output';
  pauseButton.setAttribute('aria-disabled', String(!reading));
  revealButton.setAttribute('aria-disabled', String(!reading));
  playbackIcon(pauseButton,paused?'play':'pause',paused?'Resume reading':'Pause reading');
  pauseButton.setAttribute('aria-pressed',String(paused));
  if(supervision.enabled)revealButton.textContent='Restore autonomy and reveal output';
  supervision.syncControls();
}
function setReadingPaused(value:boolean){
  if (!reading) return;
  if(paused===value)return;
  paused = value;
  const office=supervision.enabled?byId('supervision-current').querySelector('strong')?.textContent:undefined;
  setText('run-status', office?'Observation '+(paused?'paused':'resumed')+' · '+office:paused ? 'Ceremonial reading paused. Resume or reveal the complete output when ready.' : 'Ceremonial reading resumed.');
  readingControls();
  wakeReading?.();
}
pauseButton.addEventListener('click',()=>setReadingPaused(!paused));
revealButton.addEventListener('click', () => {
  if (!reading) return;
  supervision.disable();
  revealAll = true; paused = false; wakeReading?.();
});
speedControl.addEventListener('change', () => wakeReading?.());
function followLatest() { if (followOutput.checked) byId('output').scrollTop = byId('output').scrollHeight; }
followOutput.addEventListener('change', followLatest);
readingControls();


const autocorrect = byId<HTMLInputElement>('numeric-autocorrect');
let warnedValue = '';
let warningIndex = -1;
function inspectMagnitude() {
 if (autocorrect.checked) {
  const before = limitInput.value;const caret = limitInput.selectionStart;
  limitInput.value = autocorrectMandate(before);
  if (caret !== null) {const position=autocorrectMandate(before.slice(0,caret)).length;limitInput.setSelectionRange(position,position);}
 }
 let limit: MandateInteger | null;
 try {limit=parseMandate(limitInput.value);} catch {limit=null;}
 const warning=byId('magnitude-warning');
 warning.hidden=typeof limit!=='bigint';
 if(typeof limit==='bigint'&&limitInput.value!==warnedValue) {
  const selected=chooseMagnitudeWarning(warningIndex);warningIndex=selected.index;
  warning.textContent=selected.text;warnedValue=limitInput.value;
 } else if(typeof limit!=='bigint') warnedValue='';
 return limit;
}
let forecastTimer:ReturnType<typeof setTimeout>|undefined;
limitInput.addEventListener('input',()=>{const limit=inspectMagnitude();limitInput.removeAttribute('aria-invalid');setText('limit-error','');clearTimeout(forecastTimer);if(limit!==null)forecastTimer=setTimeout(()=>void loadForecast(limit).catch(()=>setText('forecast-units','Unavailable')),180);});
autocorrect.addEventListener('change',()=>{inspectMagnitude();limitInput.removeAttribute('aria-invalid');setText('limit-error','');});
function validateLimit() {
 const limit=inspectMagnitude();
 if(limit===null) {
  limitInput.setAttribute('aria-invalid','true');setText('limit-error','Enter a non-negative whole number using digits 0–9.');limitInput.focus();return null;
 }
 limitInput.removeAttribute('aria-invalid');setText('limit-error','');return limit;
}
stopButton.addEventListener('click',()=>{
 if(!reading)return;
 (officeEstate.finish(),++mandateSequence);reading=false;streaming=false;paused=false;wakeReading?.();readingControls();
 supervision.interrupt();
 runButton.removeAttribute('aria-disabled');byId('output').removeAttribute('aria-busy');
 personnel.stopReading();
 chronicle.note('The ceremonial disclosure was adjourned. Already printed numbers and their minutes remain available; this does not reverse completed business operations.','Proceedings adjourned');
 setText('run-status','Proceedings stopped. Already disclosed lines remain visible.');
});

function showForecast(forecast: Forecast) {
  setText('forecast-numerals', forecast.numeralLines);
  setText('forecast-fizz', forecast.fizzLines);
  setText('forecast-buzz', forecast.buzzLines);
  setText('forecast-joint', forecast.fizzBuzzLines);
  setText('forecast-units', forecast.workloadUnits);
}

async function loadForecast(limit: MandateInteger, _sequence = mandateSequence) {
  const sequence=++forecastSequence;
  const desk=typeof limit==='number'&&limit<=1000?'/capacity/forecast':'/capacity/forecast/extended';
  const reply = await request(`${desk}?limit=${limit}`);
  if (!reply.ok) throw new Error(`Forecast desk returned ${reply.status}.`);
  const forecast = await reply.json();
  if (sequence === forecastSequence) showForecast(forecast);
}

function waitForPace(milliseconds?: number) {
  return new Promise<void>((resolve) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      clearTimeout(timer);
      if (wakeReading === finish) wakeReading = undefined;
      resolve();
    };
    wakeReading = finish;
    if (milliseconds !== undefined) timer = setTimeout(finish, milliseconds);
  });
}

async function revealOutput(text: string, sequence: number, serviceMillis: number) {
  readingControls();
  const lines = text ? text.trimEnd().split(/\r?\n/) : [];
  const output = byId('output');
  output.textContent = lines.length ? '' : 'The zero-number mandate produces no lines.';
  setText('output-count', `0 of ${lines.length} lines`);
  setText('run-status', supervision.enabled?`Java answered in ${serviceMillis} ms. Executive observation now controls disclosure.`:`Service answered in ${serviceMillis} milliseconds. The ceremonial reading is in progress.`);
  if(supervision.enabled)await supervision.prelude(()=>sequence===mandateSequence);
  for (let index = 0; index < lines.length; index++) {
    if (sequence !== mandateSequence) return;
    while ((officeEstate.moving || paused && !supervision.enabled) && sequence === mandateSequence) await waitForPace();
    if (sequence !== mandateSequence) return;
    if (immediate()) {
      discloseLines(String(index+1),lines.slice(index));
      output.append(document.createTextNode(`${lines.slice(index).join('\n')}\n`));
      followLatest();
      setText('output-count', `${lines.length} ${lines.length === 1 ? 'line' : 'lines'}`);
      break;
    }
    const ordinal=String(index+1);
    if(!await observeLine(chronicle.folio(ordinal,lines[index]),sequence,()=>{
     output.append(document.createTextNode(`${lines[index]}\n`));discloseLines(ordinal,[lines[index]]);followLatest();setText('output-count',`${index+1} of ${lines.length} lines`);
    }))return;
    if (index < lines.length - 1 && !supervision.enabled && !revealAll) await waitForPace(Number(speedControl.value));
  }
  if(supervision.enabled)await supervision.finishPacket(()=>sequence===mandateSequence);
  if (sequence === mandateSequence) {
    setText('output-count', `${lines.length} ${lines.length === 1 ? 'line' : 'lines'}`);
    reading = false; readingControls();
    chronicle.finish(lines.length===0);office.complete(lines.length===0);
    supervision.complete();
    setText('run-status', `Mandate complete. The service answered in ${serviceMillis} milliseconds; ${serviceMillis < 1000 ? 'under' : 'above'} the one-second target. All ${lines.length} lines are visible.`);
  }
}

async function streamMandate(limit: MandateInteger, sequence: number, started: number) {
 let next: MandateInteger=typeof limit==='bigint'?1n:1;
 let disclosed: MandateInteger=typeof limit==='bigint'?0n:0;
 let first=true;
 streaming=true;reading=true;paused=false;revealAll=false;readingControls();
 const output=byId('output');output.textContent='';
 function append(lines:string[]) {
  discloseLines(String(addOrdinals(disclosed,1)),lines);
  const top=output.scrollTop;const height=parseFloat(getComputedStyle(output).lineHeight)||20;
  const fragment=document.createDocumentFragment();for(const line of lines)fragment.append(document.createTextNode(line+'\n'));output.append(fragment);
  let removed=0;while(output.childNodes.length>1000){output.firstChild!.remove();removed++;}
  if(followOutput.checked)followLatest();else output.scrollTop=Math.max(0,top-removed*height);
  disclosed=addOrdinals(disclosed,lines.length);
  const bound=supervision.enabled&&String(limit).length>24?String(limit).slice(0,8)+'… ('+String(limit).length+' digits)':String(limit);
  setText('output-count',`${disclosed} of ${bound} lines · latest ${Math.min(1000,output.childNodes.length)} retained`);
 }
 while(sequence===mandateSequence) {
  while(paused&&(!supervision.enabled||!supervision.hasStepCredit)&&sequence===mandateSequence)await waitForPace();
  if(sequence!==mandateSequence)return;
  const count=windowCount(next,limit);
  const answer=await proclamation(`/fizzbuzz/window?start=${next}&count=${count}`);
  const packet=await readProclamation(answer);const text=packet.text;
  const lines=answer.ok?text.trimEnd().split('\n'):[];
  if(answer.ok&&lines.length!==count)throw new Error('The response did not contain the authorized number of lines.');
  if(sequence!==mandateSequence)return;
  receivedPacket=packet;chronicle.receive(packet);office.receive(packet);supervision.receive(packet,String(next),lines.length);
  setText('trace-result',answer.headers.get('X-SlopBuzz-Trace-Id')||'UNAVAILABLE');
  if(first) {
   first=false;const elapsed=Math.round(performance.now()-started);
   setText('latency',`${elapsed} ms · first batch`);setText('cache-result','BYPASS');runButton.removeAttribute('aria-disabled');output.removeAttribute('aria-busy');
   if(answer.ok)trackUsage({event:'slopbuzz_demo_run',outcome:'success',runtime_mode:config.mode,duration_ms:elapsed,cache_outcome:'BYPASS'});
   const record=personnel.responseRecord(answer);
   if(record){personnel.prepare(record);personnel.disclose(7);}
   if(sequence!==mandateSequence)return;
  }
  if(!answer.ok)throw new Error(`Extended proclamation desk returned ${answer.status}.`);
  for(let i=0;i<lines.length;) {
   while(paused&&!supervision.enabled&&sequence===mandateSequence)await waitForPace();
   if(sequence!==mandateSequence)return;
   if(immediate()) {append(lines.slice(i));i=lines.length;}
   else {
    const ordinal=String(addOrdinals(disclosed,1)),line=lines[i];
    if(!await observeLine(chronicle.folio(ordinal,line),sequence,()=>append([line])))return;i++;
    if(disclosed!==limit&&!supervision.enabled&&!revealAll)await waitForPace(Number(speedControl.value));
   }
  }
  if(supervision.enabled)await supervision.finishPacket(()=>sequence===mandateSequence);
  if(sequence!==mandateSequence)return;
  if(disclosed===limit)break;
  next=addOrdinals(next,count);
  setText('run-status',`Extended proceedings in progress. ${disclosed} lines disclosed; use Stop proceedings to adjourn.`);
  // Even Executive Fiat must return the floor to the browser between finite batches.
  await new Promise(resolve=>setTimeout(resolve,0));
 }
 if(sequence===mandateSequence) {
  reading=false;streaming=false;readingControls();
  chronicle.finish();
  supervision.complete();
  setText('run-status',`Mandate complete. ${disclosed} lines disclosed; the latest ${output.childNodes.length} remain visible. Extended proceedings are transient.`);
 }
}

async function runMandate(event: Event) {
  event.preventDefault();
  if (runButton.getAttribute('aria-disabled') === 'true') return;
  const limit = validateLimit();
  if (limit === null) return;
  workspace!.commitDraft(String(limit));
  const sequence = ++mandateSequence;
  companions.reset(String(limit));
  wakeReading?.(); reading = false; streaming=false;activityMode='mandate';manualStep=false;inspection=undefined;lastPlayback=undefined;receivedPacket=undefined;currentLimit=String(limit);supervision.begin(currentLimit);readingControls();personnel.setPlaybackAvailable(false);personnel.loading();chronicle.begin(currentLimit);office.begin(currentLimit);
  runButton.setAttribute('aria-disabled', 'true');
  precedent.waiting(typeof limit==='bigint'||limit>1000);
  byId('output').setAttribute('aria-busy', 'true');
  setText('run-status', supervision.enabled&&String(limit).length>24?`The committee is considering a ${String(limit).length}-digit mandate…`:`The committee is considering ${limit} numbers…`);
  setText('trace-result', 'Awaiting a receipt');
  byId('output').textContent = 'Awaiting a duly authorized number.';
  setText('output-count', '0 lines');
  void loadForecast(limit, sequence).catch(() => {
    if (sequence === mandateSequence) setText('forecast-units', 'Unavailable');
  });
  const started = performance.now();
  try {
    if(typeof limit==='bigint'||limit>1000) {await streamMandate(limit,sequence,started);return;}
    const answer = await proclamation(`/fizzbuzz?limit=${limit}`);
    const elapsed = performance.now() - started;
    const packet=await readProclamation(answer);const text=packet.text;
    if(answer.ok)trackUsage({event:'slopbuzz_demo_run',outcome:'success',runtime_mode:config.mode,duration_ms:elapsed,cache_outcome:answer.headers.get('X-SlopBuzz-Cache')||'UNKNOWN'});
    if (sequence !== mandateSequence) return;
    receivedPacket=packet;chronicle.receive(packet);office.receive(packet);supervision.receive(packet,'1',text?text.trimEnd().split(/\r?\n/).length:0);
    precedent.mandate(packet.precedent,packet.cache);
    setText('latency', `${Math.round(elapsed)} ms`);
    setText('cache-result', answer.headers.get('X-SlopBuzz-Cache') || 'UNKNOWN');
    setText('trace-result', answer.headers.get('X-SlopBuzz-Trace-Id') || 'UNAVAILABLE');
    runButton.removeAttribute('aria-disabled');
    byId('output').removeAttribute('aria-busy');
    reading=true;paused=false;revealAll=false;readingControls();
    const record=personnel.responseRecord(answer);
    if(record){personnel.prepare(record);personnel.disclose(7);}
    lastPlayback={kind:'mandate',folios:[],limit:currentLimit,personnel:record,packet};personnel.setPlaybackAvailable(true);
    if(sequence!==mandateSequence)return;
    if (!answer.ok) throw new Error(`Proclamation desk returned ${answer.status}.`);
    await revealOutput(text, sequence, Math.round(elapsed));
  } catch (error) {
    trackUsage({event:'slopbuzz_demo_run',outcome:'failure',runtime_mode:config.mode,duration_ms:performance.now()-started});
    if (sequence === mandateSequence) {
      reading=false;streaming=false;readingControls();
      supervision.interrupt();
      personnel.setBusy(false);
      if(!personnel.record)personnel.clear('The request failed before any personnel record could be inspected.','Evidence unavailable');
      chronicle.note(`The operation could not complete: ${error.message}. No automatic second mandate was submitted.`,'Exception management');
      setText('run-status', error.name === 'AbortError'
        ? 'The desk did not answer within eight seconds. Please try again.'
        : `The mandate could not be completed: ${error.message}`);
    }
  } finally {
    if (sequence === mandateSequence) {
      runButton.removeAttribute('aria-disabled');
      byId('output').removeAttribute('aria-busy');
    }
  }
}

function beginPersonnelActivity(mode:'replay'|'inspection'){
 const sequence=++mandateSequence;wakeReading?.();supervision.interrupt();activityMode=mode;manualStep=mode==='inspection';reading=mode!=='inspection';streaming=false;paused=false;revealAll=false;
 runButton.removeAttribute('aria-disabled');byId('output').removeAttribute('aria-busy');readingControls();
 if(supervision.enabled&&mode!=='inspection'){byId('supervision-title').focus({preventScroll:true});byId('mandate-output').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 return sequence;
}
async function replayPersonnel(){
 const saved=lastPlayback;if(!saved)return;
 workspace!.navigate('observe');
 const sequence=beginPersonnelActivity('replay');
 workspace!.clearCompanions();companions.reset(saved.limit);chronicle.begin(saved.limit,'replay');office.begin(saved.limit,'replay');supervision.begin(saved.limit,'replay');setText('run-status','Replaying the retained numerical output and its corporate minutes. No mandate was submitted.');
 const output=byId('output');output.textContent='';
 if(!saved.folios.length&&saved.packet){supervision.receive(saved.packet,'1',0);if(supervision.enabled)await supervision.prelude(()=>sequence===mandateSequence);}
 for(let i=0;i<saved.folios.length;){
  while(paused&&!supervision.enabled&&sequence===mandateSequence)await waitForPace();if(sequence!==mandateSequence)return;
  const batch=immediate()?saved.folios.slice(i):saved.folios.slice(i,i+1),shown=i+batch.length;
  const publish=()=>{for(const folio of batch)companions.disclose(folio.ordinal,[folio.text]);chronicle.discloseFolios(batch);workspace!.disclosed(batch.at(-1));office.disclose(saved.limit,batch);output.append(document.createTextNode(batch.map(f=>f.text+'\n').join('')));followLatest();setText('output-count',shown+' of '+saved.folios.length+' retained lines');};
  if(batch.length===1){if(!await observeLine(batch[0],sequence,publish))return;}else publish();i+=batch.length;
  if(i<saved.folios.length&&!supervision.enabled&&!revealAll&&Number(speedControl.value)>0)await waitForPace(Number(speedControl.value));
 }
 if(supervision.enabled)await supervision.finishPacket(()=>sequence===mandateSequence);
 if(sequence===mandateSequence){if(!saved.folios.length)output.textContent='The zero-number mandate produces no lines.';chronicle.finish(saved.limit==='0');office.complete(saved.limit==='0');reading=false;readingControls();supervision.complete();setText('run-status','Execution replay complete. No business operation was executed again.');}
}
function stepPersonnel(){
 const saved=lastPlayback;if(!saved)return;
 if(!manualStep||!inspection||inspection.index>=inspection.folios.length){beginPersonnelActivity('inspection');inspection={folios:saved.folios,index:0};chronicle.begin(saved.limit,'replay');}
 const folio=inspection.folios[inspection.index++];if(folio){chronicle.discloseFolios([folio]);office.inspect(folio);}else chronicle.finish(saved.limit==='0');
 setText('personnel-step',inspection.index<inspection.folios.length?'Next ordinal':'Step through');
 setText('run-status','Inspecting completed execution: '+Math.min(inspection.index,inspection.folios.length)+' of '+inspection.folios.length+' retained ordinals. Numerical output is retained.');
}

runForm.addEventListener('submit',runMandate);
document.querySelectorAll<HTMLButtonElement>('[data-limit]').forEach((button) => {
  button.addEventListener('click', () => {
    limitInput.value = button.dataset.limit || '15';
    limitInput.dispatchEvent(new Event('input'));
    runForm.requestSubmit();
  });
});

void loadForecast(15).catch(()=>setText('forecast-units','Unavailable'));
void request('/healthz').then(reply=>setText('health-value',reply.ok?'LIVE':'UNAVAILABLE')).catch(()=>setText('health-value','UNAVAILABLE'));

interface Forecast {numeralLines: number|string;fizzLines: number|string;buzzLines: number|string;fizzBuzzLines: number|string;workloadUnits: number|string}

prepareSharedEncounter(limitInput);
