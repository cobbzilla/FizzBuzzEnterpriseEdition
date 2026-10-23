const byId = (id) => document.getElementById(id);
const runForm = byId('run-form');
const limitInput = byId('limit');
const speedControl = byId('display-speed');
const runButton = byId('run-button');
const refreshButton = byId('refresh-button');
const canaryButton = byId('canary-button');
const recoveryButton = byId('recovery-button');
let mandateSequence = 0;

async function request(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    return await fetch(path, {
      method: options.method || 'GET',
      signal: controller.signal,
      cache: 'no-store',
      headers: { Accept: 'application/json, text/plain;q=0.9' },
    });
  } finally {
    clearTimeout(timer);
  }
}

function showCanary(verdict, disposition = 'STATUS') {
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
  canaryButton.disabled = true;
  byId('canary-value').setAttribute('aria-busy', 'true');
  setText('canary-status', 'The assurance bureau is rehearsing the fifteen-number charter…');
  try {
    const reply = await request('/operations/canary', { method: 'POST' });
    const verdict = await reply.json();
    await refreshOperations();
    showCanary(verdict, reply.headers.get('X-SlopBuzz-Rehearsal'));
  } catch (error) {
    setText('canary-status', `The rehearsal could not be completed: ${error.message}`);
  } finally {
    canaryButton.disabled = false;
    byId('canary-value').removeAttribute('aria-busy');
  }
}

function showRecovery(verdict) {
  const label = verdict.state === 'PASSED' ? 'COPY MATCHED'
    : verdict.state === 'FAILED' ? 'REVIEW REQUIRED' : 'NOT YET CONVENED';
  setCard('recovery-value', label, verdict.state === 'PASSED');
  if (verdict.state !== 'NOT_RUN') {
    const medium = verdict.durable ? 'durable repository' : 'process-local store';
    setText('recovery-status', `Drill ${verdict.sequence}: ${verdict.finding.replaceAll('_', ' ').toLowerCase()}; ${verdict.storedEntries} entries in the ${medium}, reviewed in ${Math.round(verdict.durationMicros / 1000)} milliseconds.`);
  }
}

async function runRecovery() {
  recoveryButton.disabled = true;
  byId('recovery-value').setAttribute('aria-busy', 'true');
  setText('recovery-status', 'The bureau is reopening and comparing institutional memory…');
  try {
    const reply = await request('/operations/recovery', { method: 'POST' });
    showRecovery(await reply.json());
  } catch (error) {
    setText('recovery-status', `The recovery rehearsal could not be completed: ${error.message}`);
  } finally {
    recoveryButton.disabled = false;
    byId('recovery-value').removeAttribute('aria-busy');
  }
}

function setText(id, value) {
  byId(id).textContent = String(value);
}

function validateLimit() {
  const raw = limitInput.value.trim();
  const number = Number(raw);
  if (!/^\d+$/.test(raw) || !Number.isInteger(number) || number < 0 || number > 1000) {
    limitInput.setAttribute('aria-invalid', 'true');
    setText('limit-error', 'Enter a whole number from 0 through 1000.');
    limitInput.focus();
    return null;
  }
  limitInput.removeAttribute('aria-invalid');
  setText('limit-error', '');
  return number;
}

function showForecast(forecast) {
  setText('forecast-numerals', forecast.numeralLines);
  setText('forecast-fizz', forecast.fizzLines);
  setText('forecast-buzz', forecast.buzzLines);
  setText('forecast-joint', forecast.fizzBuzzLines);
  setText('forecast-units', forecast.workloadUnits);
}

async function loadForecast(limit, sequence = mandateSequence) {
  const reply = await request(`/capacity/forecast?limit=${limit}`);
  if (!reply.ok) throw new Error(`Forecast desk returned ${reply.status}.`);
  const forecast = await reply.json();
  if (sequence === mandateSequence) showForecast(forecast);
}

function waitForPace(milliseconds) {
  return new Promise((resolve) => {
    let timer;
    const finish = () => {
      clearTimeout(timer);
      speedControl.removeEventListener('change', finish);
      resolve();
    };
    timer = setTimeout(finish, milliseconds);
    speedControl.addEventListener('change', finish);
  });
}

async function revealOutput(text, sequence, serviceMillis) {
  const lines = text ? text.trimEnd().split(/\r?\n/) : [];
  const output = byId('output');
  output.textContent = lines.length ? '' : 'The zero-number mandate produces no lines.';
  setText('output-count', `0 of ${lines.length} lines`);
  setText('run-status', `Service answered in ${serviceMillis} milliseconds. The ceremonial reading is in progress.`);
  for (let index = 0; index < lines.length; index++) {
    if (sequence !== mandateSequence) return;
    if (Number(speedControl.value) === 0) {
      output.append(document.createTextNode(`${lines.slice(index).join('\n')}\n`));
      output.scrollTop = output.scrollHeight;
      setText('output-count', `${lines.length} ${lines.length === 1 ? 'line' : 'lines'}`);
      break;
    }
    output.append(document.createTextNode(`${lines[index]}\n`));
    output.scrollTop = output.scrollHeight;
    setText('output-count', `${index + 1} of ${lines.length} lines`);
    if (index < lines.length - 1) await waitForPace(Number(speedControl.value));
  }
  if (sequence === mandateSequence) {
    setText('output-count', `${lines.length} ${lines.length === 1 ? 'line' : 'lines'}`);
    setText('run-status', `Mandate complete. The service answered in ${serviceMillis} milliseconds; ${serviceMillis < 1000 ? 'under' : 'above'} the one-second target. All ${lines.length} lines are visible.`);
  }
}

async function runMandate(event) {
  event.preventDefault();
  const limit = validateLimit();
  if (limit === null) return;
  const sequence = ++mandateSequence;
  runButton.disabled = true;
  byId('demo').setAttribute('aria-busy', 'true');
  setText('run-status', `The committee is considering ${limit} numbers…`);
  setText('trace-result', 'Awaiting a receipt');
  byId('output').textContent = 'Awaiting a duly authorized number.';
  setText('output-count', '0 lines');
  void loadForecast(limit, sequence).catch(() => {
    if (sequence === mandateSequence) setText('forecast-units', 'Unavailable');
  });
  const started = performance.now();
  try {
    const answer = await request(`/fizzbuzz?limit=${limit}`);
    const elapsed = performance.now() - started;
    if (!answer.ok) throw new Error(`Proclamation desk returned ${answer.status}.`);
    const text = await answer.text();
    if (sequence !== mandateSequence) return;
    setText('latency', `${Math.round(elapsed)} ms`);
    setText('cache-result', answer.headers.get('X-SlopBuzz-Cache') || 'UNKNOWN');
    setText('trace-result', answer.headers.get('X-SlopBuzz-Trace-Id') || 'UNAVAILABLE');
    runButton.disabled = false;
    void refreshOperations();
    await revealOutput(text, sequence, Math.round(elapsed));
  } catch (error) {
    if (sequence === mandateSequence) {
      setText('run-status', error.name === 'AbortError'
        ? 'The desk did not answer within eight seconds. Please try again.'
        : `The mandate could not be completed: ${error.message}`);
    }
  } finally {
    if (sequence === mandateSequence) {
      runButton.disabled = false;
      byId('demo').removeAttribute('aria-busy');
    }
  }
}

function parseLines(body) {
  return Object.fromEntries(body.trim().split(/\r?\n/).map((line) => {
    const split = line.indexOf('=');
    return [line.slice(0, split), line.slice(split + 1)];
  }));
}

function setCard(id, text, healthy) {
  const element = byId(id);
  element.textContent = text;
  element.classList.remove('status-good', 'status-warn');
  element.classList.add(healthy ? 'status-good' : 'status-warn');
}

async function refreshOperations() {
  refreshButton.disabled = true;
  byId('operations').setAttribute('aria-busy', 'true');
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
    refreshButton.disabled = false;
    byId('operations').removeAttribute('aria-busy');
  }
}

runForm.addEventListener('submit', runMandate);
refreshButton.addEventListener('click', refreshOperations);
canaryButton.addEventListener('click', runCanary);
recoveryButton.addEventListener('click', runRecovery);
document.querySelectorAll('[data-limit]').forEach((button) => {
  button.addEventListener('click', () => {
    limitInput.value = button.dataset.limit;
    runForm.requestSubmit();
  });
});

void loadForecast(15).catch(() => setText('operations-status', 'Forecast desk is temporarily unavailable.'));
void refreshOperations();
