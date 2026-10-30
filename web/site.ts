import {parseMandate,autocorrectMandate,addOrdinals,windowCount,chooseMagnitudeWarning,type MandateInteger} from './mandate-input';
import {trackUsage} from './telemetry';
import { request, config } from './runtime';
const byId = <T extends HTMLElement = HTMLElement>(id: string): T => { const node = document.getElementById(id); if (!node) throw new Error(`Missing element ${id}`); return node as T; };
const runForm = byId<HTMLFormElement>('run-form');
const limitInput = byId<HTMLInputElement>('limit');
const speedControl = byId<HTMLSelectElement>('display-speed');
const runButton = byId<HTMLButtonElement>('run-button');
const refreshButton = byId<HTMLButtonElement>('refresh-button');
const canaryButton = byId<HTMLButtonElement>('canary-button');
const recoveryButton = byId<HTMLButtonElement>('recovery-button');
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
function readingControls() {
  stopButton.setAttribute('aria-disabled', String(!reading));
  revealButton.textContent = streaming ? 'Waive disclosure delays' : 'Reveal complete output';
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


function showCanary(verdict: Canary, disposition = 'STATUS') {
  const label = verdict.state === 'PASSED' ? 'APPROVED'
    : verdict.state === 'FAILED' ? 'REJECTED' : 'NOT YET CONVENED';
  setCard('canary-value', label, verdict.state === 'PASSED');
  if (verdict.state !== 'NOT_RUN') {
    const leaseNote = disposition === 'REUSED' ? ' Prior ruling reused during the fifteen-second lease.'
      : disposition === 'EXECUTED' ? ' New rehearsal completed.' : '';
    setText('canary-status', `Rehearsal ${verdict.sequence}: ${verdict.finding.replaceAll('_', ' ').toLowerCase()}; ${verdict.observedLines} lines observed in ${Math.round(verdict.durationMicros / 1000)} milliseconds. Audit chain ${verdict.auditChainValid ? 'valid' : 'invalid'}.${leaseNote}`);
  }
}

async function runCanary() {
  if (canaryButton.getAttribute('aria-disabled') === 'true') return;
  canaryButton.setAttribute('aria-disabled', 'true');
  byId('canary-value').setAttribute('aria-busy', 'true');
  setText('canary-status', 'The assurance bureau is rehearsing the fifteen-number charter…');
  try {
    const reply = await request('/operations/canary', { method: 'POST' });
    const verdict = await reply.json();
    await refreshOperations();
    showCanary(verdict, reply.headers.get('X-SlopBuzz-Rehearsal') || 'STATUS');
  } catch (error) {
    setText('canary-status', `The rehearsal could not be completed: ${error.message}`);
  } finally {
    canaryButton.removeAttribute('aria-disabled');
    byId('canary-value').removeAttribute('aria-busy');
  }
}

function showRecovery(verdict: Recovery) {
  const label = verdict.state === 'PASSED' ? 'COPY MATCHED'
    : verdict.state === 'FAILED' ? 'REVIEW REQUIRED' : 'NOT YET CONVENED';
  setCard('recovery-value', label, verdict.state === 'PASSED');
  if (verdict.state !== 'NOT_RUN') {
    const medium = verdict.durable ? 'durable repository' : 'process-local store';
    setText('recovery-status', `Drill ${verdict.sequence}: ${verdict.finding.replaceAll('_', ' ').toLowerCase()}; ${verdict.storedEntries} entries in the ${medium}, reviewed in ${Math.round(verdict.durationMicros / 1000)} milliseconds.`);
  }
}

async function runRecovery() {
  if (recoveryButton.getAttribute('aria-disabled') === 'true') return;
  recoveryButton.setAttribute('aria-disabled', 'true');
  byId('recovery-value').setAttribute('aria-busy', 'true');
  setText('recovery-status', 'The bureau is reopening and comparing institutional memory…');
  try {
    const reply = await request('/operations/recovery', { method: 'POST' });
    showRecovery(await reply.json());
  } catch (error) {
    setText('recovery-status', `The recovery rehearsal could not be completed: ${error.message}`);
  } finally {
    recoveryButton.removeAttribute('aria-disabled');
    byId('recovery-value').removeAttribute('aria-busy');
  }
}

function setText(id: string, value: unknown) {
  byId(id).textContent = String(value);
}

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
  reading = true; paused = false; revealAll = false; readingControls();
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
  if(!answer.ok)throw new Error(`Extended proclamation desk returned ${answer.status}.`);
  const lines=(await answer.text()).trimEnd().split('\n');
  if(lines.length!==count)throw new Error('The response did not contain the authorized number of lines.');
  if(sequence!==mandateSequence)return;
  if(first) {
   first=false;const elapsed=Math.round(performance.now()-started);
   setText('latency',`${elapsed} ms · first batch`);setText('cache-result','BYPASS');runButton.removeAttribute('aria-disabled');output.removeAttribute('aria-busy');
   trackUsage({event:'slopbuzz_demo_run',outcome:'success',runtime_mode:config.mode,duration_ms:elapsed,cache_outcome:'BYPASS'});
  }
  setText('trace-result',answer.headers.get('X-SlopBuzz-Trace-Id')||'UNAVAILABLE');
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
  wakeReading?.(); reading = false; streaming=false; readingControls();
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
    if (!answer.ok) throw new Error(`Proclamation desk returned ${answer.status}.`);
    const text = await answer.text();
    trackUsage({event:'slopbuzz_demo_run',outcome:'success',runtime_mode:config.mode,duration_ms:elapsed,cache_outcome:answer.headers.get('X-SlopBuzz-Cache')||'UNKNOWN'});
    if (sequence !== mandateSequence) return;
    setText('latency', `${Math.round(elapsed)} ms`);
    setText('cache-result', answer.headers.get('X-SlopBuzz-Cache') || 'UNKNOWN');
    setText('trace-result', answer.headers.get('X-SlopBuzz-Trace-Id') || 'UNAVAILABLE');
    runButton.removeAttribute('aria-disabled');
    void refreshOperations();
    byId('output').removeAttribute('aria-busy');
    await revealOutput(text, sequence, Math.round(elapsed));
  } catch (error) {
    trackUsage({event:'slopbuzz_demo_run',outcome:'failure',runtime_mode:config.mode,duration_ms:performance.now()-started});
    if (sequence === mandateSequence) {
      reading=false;streaming=false;readingControls();
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

function parseLines(body: string) {
  return Object.fromEntries(body.trim().split(/\r?\n/).map((line) => {
    const split = line.indexOf('=');
    return [line.slice(0, split), line.slice(split + 1)];
  }));
}

function setCard(id: string, text: string, healthy: boolean) {
  const element = byId(id);
  element.textContent = text;
  element.classList.remove('status-good', 'status-warn');
  element.classList.add(healthy ? 'status-good' : 'status-warn');
}

async function refreshOperations() {
  if (refreshButton.getAttribute('aria-disabled') === 'true') return;
  refreshButton.setAttribute('aria-disabled', 'true');
  setText('operations-status', 'Refreshing the current institutional record…');
  const paths = ['/healthz', '/readyz', '/cache/status', '/operations/scorecard', '/audit/status', '/operations/canary', '/operations/release', '/operations/recovery'];
  const results = await Promise.allSettled(paths.map((path) => request(path)));
  let available = 0;
  try {
    const health = results[0].status === 'fulfilled' ? results[0].value : null;
    if (health?.ok) { setCard('health-value', 'LIVE', true); available++; }
    else setCard('health-value', 'UNAVAILABLE', false);

    const readiness = results[1].status === 'fulfilled' ? results[1].value : null;
    if (readiness) {
      const ballot = parseLines(await readiness.text());
      setCard('readiness-value', ballot.ready === 'true' ? 'APPROVED' : 'VETOED', ballot.ready === 'true');
      available++;
    } else setCard('readiness-value', 'UNAVAILABLE', false);

    const cache = results[2].status === 'fulfilled' ? results[2].value : null;
    if (cache?.ok) {
      const report = await cache.json();
      const cacheSummary = report.enabled
        ? `${report.hits} hits · ${report.misses} misses${report.errors ? ` · ${report.errors} errors` : ''}`
        : 'NOT CONFIGURED';
      setCard('cache-value', cacheSummary, report.enabled && report.errors === 0);
      available++;
    } else setCard('cache-value', 'UNAVAILABLE', false);

    const scorecard = results[3].status === 'fulfilled' ? results[3].value : null;
    if (scorecard?.ok) {
      const report = await scorecard.json();
      setCard('scorecard-value', `${report.successful} served · ${report.rejected} rejected`, true);
      available++;
    } else setCard('scorecard-value', 'UNAVAILABLE', false);

    const audit = results[4].status === 'fulfilled' ? results[4].value : null;
    if (audit?.ok) {
      const report = parseLines(await audit.text());
      setText('audit-committed', report.committed ?? '—');
      setText('audit-pending', report.pending ?? '—');
      setText('audit-dead', report.deadLetters ?? '—');
      setText('audit-chain', report.chainValid === 'true' ? 'YES' : 'NO');
      available++;
    }

    const canary = results[5].status === 'fulfilled' ? results[5].value : null;
    if (canary) {
      showCanary(await canary.json());
      available++;
    } else setCard('canary-value', 'UNAVAILABLE', false);

    const release = results[6].status === 'fulfilled' ? results[6].value : null;
    if (release?.ok) {
      const report = await release.json();
      setCard('release-value', report.revision === 'unknown'
        ? 'UNIDENTIFIED' : report.revision.slice(0, 12), report.revision !== 'unknown');
      available++;
    } else setCard('release-value', 'UNAVAILABLE', false);

    const recovery = results[7].status === 'fulfilled' ? results[7].value : null;
    if (recovery) {
      showRecovery(await recovery.json());
      available++;
    } else setCard('recovery-value', 'UNAVAILABLE', false);

    let evidence = null;
    try { evidence = await request('/audit/evidence'); } catch (_) { /* Report below. */ }
    if (evidence?.ok) {
      const report = await evidence.json();
      setText('control-aud', report.controls['AUD-001']);
      setText('control-msg', report.controls['MSG-001']);
      setText('control-iso', report.controls['ISO-9000']);
      setText('control-soc', report.controls['SOC-2']);
      setText('evidence-json', JSON.stringify(report, null, 2));
      available++;
    } else setText('evidence-json', 'Evidence is temporarily unavailable.');
    setText('operations-status', `${available} of 9 institutional desks reported. Last checked ${new Date().toLocaleTimeString()}.`);
  } catch (error) {
    setText('operations-status', `The operations review was interrupted: ${error.message}`);
  } finally {
    refreshButton.removeAttribute('aria-disabled');
  }
}

runForm.addEventListener('submit', runMandate);
refreshButton.addEventListener('click', refreshOperations);
canaryButton.addEventListener('click', runCanary);
recoveryButton.addEventListener('click', runRecovery);
document.querySelectorAll<HTMLButtonElement>('[data-limit]').forEach((button) => {
  button.addEventListener('click', () => {
    limitInput.value = button.dataset.limit || '15';
    runForm.requestSubmit();
  });
});

void loadForecast(15).catch(() => setText('operations-status', 'Forecast desk is temporarily unavailable.'));
void refreshOperations();

interface Canary {state: string;sequence: number;finding: string;observedLines: number;durationMicros: number;auditChainValid: boolean}
interface Recovery {state: string;sequence: number;finding: string;storedEntries: number;durationMicros: number;durable: boolean}
interface Forecast {numeralLines: number|string;fizzLines: number|string;buzzLines: number|string;fizzBuzzLines: number|string;workloadUnits: number|string}

interface ProcurementDossier {
 product: string; text: string; assembly: string; demonstration: boolean; auditTransactions: number;
 lineItems: {position: number; sku: string; character: string; quantity: number; inspection: string}[];
}
const procurementForm = byId<HTMLFormElement>('procurement-form');
const procurementButton = byId<HTMLButtonElement>('procurement-button');
procurementForm.addEventListener('submit', async event => {
 event.preventDefault();
 if (procurementButton.getAttribute('aria-disabled') === 'true') return;
 procurementButton.setAttribute('aria-disabled', 'true');
 byId('procurement-results').setAttribute('aria-busy', 'true');
 byId('procurement-results').hidden = true;
 setText('procurement-status', 'Receiving is reconciling each individual commercial obligation…');
 try {
  const product = byId<HTMLSelectElement>('procurement-product').value;
  const response = await request(`/procurement/dossier?product=${encodeURIComponent(product)}`);
  if (!response.ok) throw new Error(`The purchasing authority returned HTTP ${response.status}.`);
  const dossier: ProcurementDossier = await response.json();
  setText('procurement-summary', `${dossier.text} · ${dossier.assembly} · ${dossier.lineItems.length} individually received allocations`);
  const items = dossier.lineItems.map(item => {
   const li = document.createElement('li');
   const glyph = document.createElement('strong'); glyph.textContent = item.character;
   const receipt = document.createElement('span'); receipt.textContent = `${item.sku} · quantity ${item.quantity} · ${item.inspection}`;
   li.append(glyph, receipt); return li;
  });
  byId('procurement-items').replaceChildren(...items);
  setText('procurement-json', JSON.stringify(dossier, null, 2));
  byId('procurement-results').hidden = false;
  setText('procurement-status', `${dossier.product} certified. ${dossier.lineItems.length} separate line items accepted; no audit transaction committed.`);
 } catch (error) {
  setText('procurement-status', `Procurement inspection could not be completed. ${error.message} You may request another inspection.`);
 } finally {
  procurementButton.removeAttribute('aria-disabled');
  byId('procurement-results').removeAttribute('aria-busy');
 }
});
