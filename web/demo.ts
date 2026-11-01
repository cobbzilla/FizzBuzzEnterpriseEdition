import {parseMandate,autocorrectMandate,addOrdinals,windowCount,chooseMagnitudeWarning,type MandateInteger} from './mandate-input';
import {trackUsage} from './telemetry';
import { request, config } from './runtime';
import {byId,setText} from './dom';
import {PersonnelProceedings,type PersonnelPlayback,type PersonnelScenario} from './onboarding';
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
let activityMode:'mandate'|'rehearsal'|'replay'|'inspection'='mandate';
let manualStep=false;
const personnel=new PersonnelProceedings({rehearse:scenario=>void rehearsePersonnel(scenario),replay:()=>void replayPersonnel(),step:stepPersonnel});
function readingControls() {
  stopButton.setAttribute('aria-disabled', String(!reading));
  revealButton.textContent = activityMode==='rehearsal'||activityMode==='replay'?'Reveal completed proceedings':streaming ? 'Waive disclosure delays' : 'Reveal complete output';
  pauseButton.setAttribute('aria-disabled', String(!reading));
  revealButton.setAttribute('aria-disabled', String(!reading));
  pauseButton.textContent = paused ? 'Resume reading' : 'Pause reading';
}
pauseButton.addEventListener('click', () => {
  if (!reading) return;
  paused = !paused;
  readingControls();
  setText('run-status', paused ? 'Ceremonial reading paused. Resume or reveal the complete output when ready.' : 'Ceremonial reading resumed.');
  wakeReading?.();
});
revealButton.addEventListener('click', () => {
  if (!reading) return;
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
limitInput.addEventListener('input',()=>{inspectMagnitude();limitInput.removeAttribute('aria-invalid');setText('limit-error','');});
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
 ++mandateSequence;reading=false;streaming=false;paused=false;wakeReading?.();readingControls();
 runButton.removeAttribute('aria-disabled');byId('output').removeAttribute('aria-busy');
 personnel.stopReading();
 setText('run-status','Proceedings stopped. Already disclosed lines remain visible.');
});

function showForecast(forecast: Forecast) {
  setText('forecast-numerals', forecast.numeralLines);
  setText('forecast-fizz', forecast.fizzLines);
  setText('forecast-buzz', forecast.buzzLines);
  setText('forecast-joint', forecast.fizzBuzzLines);
  setText('forecast-units', forecast.workloadUnits);
}

async function loadForecast(limit: MandateInteger, sequence = mandateSequence) {
  const desk=typeof limit==='number'&&limit<=1000?'/capacity/forecast':'/capacity/forecast/extended';
  const reply = await request(`${desk}?limit=${limit}`);
  if (!reply.ok) throw new Error(`Forecast desk returned ${reply.status}.`);
  const forecast = await reply.json();
  if (sequence === mandateSequence) showForecast(forecast);
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
  setText('run-status', `Service answered in ${serviceMillis} milliseconds. The ceremonial reading is in progress.`);
  for (let index = 0; index < lines.length; index++) {
    if (sequence !== mandateSequence) return;
    while (paused && sequence === mandateSequence) await waitForPace();
    if (sequence !== mandateSequence) return;
    if (revealAll || Number(speedControl.value) === 0) {
      output.append(document.createTextNode(`${lines.slice(index).join('\n')}\n`));
      followLatest();
      setText('output-count', `${lines.length} ${lines.length === 1 ? 'line' : 'lines'}`);
      break;
    }
    output.append(document.createTextNode(`${lines[index]}\n`));
    followLatest();
    setText('output-count', `${index + 1} of ${lines.length} lines`);
    if (index < lines.length - 1) await waitForPace(Number(speedControl.value));
  }
  if (sequence === mandateSequence) {
    setText('output-count', `${lines.length} ${lines.length === 1 ? 'line' : 'lines'}`);
    reading = false; readingControls();
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
  const top=output.scrollTop;const height=parseFloat(getComputedStyle(output).lineHeight)||20;
  const fragment=document.createDocumentFragment();for(const line of lines)fragment.append(document.createTextNode(line+'\n'));output.append(fragment);
  let removed=0;while(output.childNodes.length>1000){output.firstChild!.remove();removed++;}
  if(followOutput.checked)followLatest();else output.scrollTop=Math.max(0,top-removed*height);
  disclosed=addOrdinals(disclosed,lines.length);
  setText('output-count',`${disclosed} of ${limit} lines · latest ${Math.min(1000,output.childNodes.length)} retained`);
 }
 while(sequence===mandateSequence) {
  while(paused&&sequence===mandateSequence)await waitForPace();
  if(sequence!==mandateSequence)return;
  const count=windowCount(next,limit);
  const answer=await request(`/fizzbuzz/window?start=${next}&count=${count}`);
  const text=await answer.text();
  const lines=answer.ok?text.trimEnd().split('\n'):[];
  if(answer.ok&&lines.length!==count)throw new Error('The response did not contain the authorized number of lines.');
  if(sequence!==mandateSequence)return;
  setText('trace-result',answer.headers.get('X-SlopBuzz-Trace-Id')||'UNAVAILABLE');
  if(first) {
   first=false;const elapsed=Math.round(performance.now()-started);
   setText('latency',`${elapsed} ms · first batch`);setText('cache-result','BYPASS');runButton.removeAttribute('aria-disabled');output.removeAttribute('aria-busy');
   if(answer.ok)trackUsage({event:'slopbuzz_demo_run',outcome:'success',runtime_mode:config.mode,duration_ms:elapsed,cache_outcome:'BYPASS'});
   const record=personnel.responseRecord(answer);
   if(record){setText('run-status',`Service answered in ${elapsed} milliseconds. Reading completed personnel proceedings…`);await personnel.read(record,personnelClock(sequence));}
   if(sequence!==mandateSequence)return;
  }
  if(!answer.ok)throw new Error(`Extended proclamation desk returned ${answer.status}.`);
  for(let i=0;i<lines.length;) {
   while(paused&&sequence===mandateSequence)await waitForPace();
   if(sequence!==mandateSequence)return;
   if(revealAll||Number(speedControl.value)===0) {append(lines.slice(i));i=lines.length;}
   else {append([lines[i++]]);if(disclosed!==limit)await waitForPace(Number(speedControl.value));}
  }
  if(disclosed===limit)break;
  next=addOrdinals(next,count);
  setText('run-status',`Extended proceedings in progress. ${disclosed} lines disclosed; use Stop proceedings to adjourn.`);
  // Even Executive Fiat must return the floor to the browser between finite batches.
  await new Promise(resolve=>setTimeout(resolve,0));
 }
 if(sequence===mandateSequence) {
  reading=false;streaming=false;readingControls();
  setText('run-status',`Mandate complete. ${disclosed} lines disclosed; the latest ${output.childNodes.length} remain visible. Extended proceedings are transient.`);
 }
}

async function runMandate(event: Event) {
  event.preventDefault();
  if (runButton.getAttribute('aria-disabled') === 'true') return;
  const limit = validateLimit();
  if (limit === null) return;
  const sequence = ++mandateSequence;
  wakeReading?.(); reading = false; streaming=false;activityMode='mandate';manualStep=false;readingControls();personnel.loading();
  runButton.setAttribute('aria-disabled', 'true');
  byId('output').setAttribute('aria-busy', 'true');
  setText('run-status', `The committee is considering ${limit} numbers…`);
  setText('trace-result', 'Awaiting a receipt');
  byId('output').textContent = 'Awaiting a duly authorized number.';
  setText('output-count', '0 lines');
  void loadForecast(limit, sequence).catch(() => {
    if (sequence === mandateSequence) setText('forecast-units', 'Unavailable');
  });
  const started = performance.now();
  try {
    if(typeof limit==='bigint'||limit>1000) {await streamMandate(limit,sequence,started);return;}
    const answer = await request(`/fizzbuzz?limit=${limit}`);
    const elapsed = performance.now() - started;
    const text = await answer.text();
    if(answer.ok)trackUsage({event:'slopbuzz_demo_run',outcome:'success',runtime_mode:config.mode,duration_ms:elapsed,cache_outcome:answer.headers.get('X-SlopBuzz-Cache')||'UNKNOWN'});
    if (sequence !== mandateSequence) return;
    setText('latency', `${Math.round(elapsed)} ms`);
    setText('cache-result', answer.headers.get('X-SlopBuzz-Cache') || 'UNKNOWN');
    setText('trace-result', answer.headers.get('X-SlopBuzz-Trace-Id') || 'UNAVAILABLE');
    runButton.removeAttribute('aria-disabled');
    byId('output').removeAttribute('aria-busy');
    reading=true;paused=false;revealAll=false;readingControls();
    const record=personnel.responseRecord(answer);
    if(record){setText('run-status',`Service answered in ${Math.round(elapsed)} milliseconds. Reading completed personnel proceedings…`);await personnel.read(record,personnelClock(sequence));}
    if(sequence!==mandateSequence)return;
    if (!answer.ok) throw new Error(`Proclamation desk returned ${answer.status}.`);
    await revealOutput(text, sequence, Math.round(elapsed));
  } catch (error) {
    trackUsage({event:'slopbuzz_demo_run',outcome:'failure',runtime_mode:config.mode,duration_ms:performance.now()-started});
    if (sequence === mandateSequence) {
      reading=false;streaming=false;readingControls();
      personnel.setBusy(false);
      if(!personnel.record)personnel.clear('The request failed before any personnel record could be inspected.','Evidence unavailable');
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

function personnelClock(sequence:number):PersonnelPlayback {
 return {
  current:()=>sequence===mandateSequence,
  waitWhilePaused:async()=>{while(paused&&sequence===mandateSequence)await waitForPace();},
  delay:async()=>{if(!revealAll&&Number(speedControl.value)>0&&sequence===mandateSequence)await waitForPace(Number(speedControl.value));},
 };
}
function beginPersonnelActivity(mode:'rehearsal'|'replay'|'inspection'){
 const sequence=++mandateSequence;wakeReading?.();activityMode=mode;manualStep=mode==='inspection';reading=mode!=='inspection';streaming=false;paused=false;revealAll=false;
 runButton.removeAttribute('aria-disabled');byId('output').removeAttribute('aria-busy');readingControls();return sequence;
}
async function rehearsePersonnel(scenario:PersonnelScenario){
 const sequence=beginPersonnelActivity('rehearsal');personnel.loading();
 setText('run-status','Opening a read-only personnel rehearsal. Numerical output already shown is retained.');
 try {
  const response=await request(`/onboarding/rehearsal?scenario=${scenario}`);
  if(!response.ok)throw new Error(`Personnel desk returned ${response.status}.`);
  const data=personnel.rehearsalRecord(await response.json());if(sequence!==mandateSequence)return;
  await personnel.read(data,personnelClock(sequence));if(sequence!==mandateSequence)return;
  setText('run-status',`Personnel rehearsal ${data.status==='APPROVED'?'approved':'rejected'}. No numerical output was requested by this rehearsal.`);
 }catch(error){if(sequence===mandateSequence){personnel.clear('The personnel rehearsal could not be opened.');setText('run-status',`Personnel rehearsal could not be completed: ${error.message}`);}}
 finally{if(sequence===mandateSequence){reading=false;personnel.setBusy(false);readingControls();}}
}
async function replayPersonnel(){
 const record=personnel.record;if(!record)return;
 const sequence=beginPersonnelActivity('replay');setText('run-status','Replaying recorded personnel proceedings. Numerical output is retained.');
 await personnel.read(record,personnelClock(sequence),`Replay of ${record.purpose==='REHEARSAL'?'read-only rehearsal':'mandate record'}`);
 if(sequence===mandateSequence){reading=false;readingControls();setText('run-status','Personnel replay complete. The recorded business operation was not executed again.');}
}
function stepPersonnel(){
 if(!personnel.record)return;
 if(!manualStep||personnel.progress===7){beginPersonnelActivity('inspection');personnel.startStepThrough();}
 personnel.step();setText('run-status',`Inspecting recorded personnel paperwork: ${personnel.progress} of 7 offices disclosed. Numerical output is retained.`);
}

runForm.addEventListener('submit',runMandate);
document.querySelectorAll<HTMLButtonElement>('[data-limit]').forEach((button) => {
  button.addEventListener('click', () => {
    limitInput.value = button.dataset.limit || '15';
    runForm.requestSubmit();
  });
});

void loadForecast(15).catch(()=>setText('forecast-units','Unavailable'));
void request('/healthz').then(reply=>setText('health-value',reply.ok?'LIVE':'UNAVAILABLE')).catch(()=>setText('health-value','UNAVAILABLE'));

interface Forecast {numeralLines: number|string;fizzLines: number|string;buzzLines: number|string;fizzBuzzLines: number|string;workloadUnits: number|string}
