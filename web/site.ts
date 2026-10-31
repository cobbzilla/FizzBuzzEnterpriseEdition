import {request} from './runtime';
import {byId,setText} from './dom';
const refreshButton = byId<HTMLButtonElement>('refresh-button');
const canaryButton = byId<HTMLButtonElement>('canary-button');
const recoveryButton = byId<HTMLButtonElement>('recovery-button');

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

refreshButton.addEventListener('click', refreshOperations);
canaryButton.addEventListener('click', runCanary);
recoveryButton.addEventListener('click', runRecovery);

void refreshOperations();

interface Canary {state: string;sequence: number;finding: string;observedLines: number;durationMicros: number;auditChainValid: boolean}
interface Recovery {state: string;sequence: number;finding: string;storedEntries: number;durationMicros: number;durable: boolean}
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
