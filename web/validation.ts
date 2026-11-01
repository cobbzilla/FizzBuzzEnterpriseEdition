import {BrowserRuntimeClient,config,scope} from './runtime';
import {releaseFile} from './release-assets';
try {
  const report = await fetch(releaseFile('validation/report.json')).then(r=>{if(!r.ok) throw new Error(`HTTP ${r.status}`);return r.json();});
  document.querySelector('#release-report')!.textContent = JSON.stringify(report,null,2);
  document.querySelector('#report-status')!.textContent = 'Release record loaded.';
} catch(error) {document.querySelector('#report-status')!.textContent = `Release record unavailable: ${error}`;}
const button = document.querySelector<HTMLButtonElement>('#rehearse')!;
if(config.mode === 'server') {
  button.disabled = true;
  document.querySelector('#verdict')!.textContent = 'Local rehearsals are available in the browser deployment. This deployment uses the Java server.';
}
button.onclick = async () => {
  if(button.getAttribute('aria-disabled') === 'true') return;
  button.setAttribute('aria-disabled', 'true');
  const id = crypto.randomUUID();
  let client: BrowserRuntimeClient | undefined;
  const verdict = document.querySelector('#verdict')!;
  verdict.textContent = 'Comparing the local Java runtime against bundled JVM fixtures…';
  try {
    client = new BrowserRuntimeClient({...config,mode:'browser'},id);
    const fixtures: {path:string;body:string;status:number}[] = await fetch(releaseFile('validation/fixtures.json')).then(r=>{if(!r.ok)throw new Error('JVM fixtures have not been generated for this release');return r.json();});
    let passed=0;
    for(const expected of fixtures) {
      const response = await client.request(expected.path);
      if(response.status!==expected.status || await response.text()!==expected.body) throw new Error(`Disagreement at ${expected.path}`);
      passed++;
    }
    verdict.textContent = `${passed} bundled JVM fixtures matched. This is a local browser rehearsal, not a new JVM or CI run.`;
    document.querySelector<HTMLElement>('#rehearsal-output')!.hidden = false;
    document.querySelector('#rehearsal-output')!.textContent = await (await client.request('/audit/evidence')).text();
  } catch(error) {verdict.textContent=String(error);}
  finally {client?.close(); indexedDB.deleteDatabase(`slopbuzz:${scope}:rehearsal:${id}`);button.removeAttribute('aria-disabled');}
};
