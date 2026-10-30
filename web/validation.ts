import {BrowserRuntimeClient,config,scope} from './runtime';
const report = await fetch(new URL('validation/report.json',scope)).then(r=>r.json());
document.querySelector('#release-report')!.textContent = JSON.stringify(report,null,2);
const button = document.querySelector<HTMLButtonElement>('#rehearse')!;
button.onclick = async () => {
  button.disabled = true;
  const id = crypto.randomUUID();
  const client = new BrowserRuntimeClient({...config,mode:'browser'},id);
  const verdict = document.querySelector('#verdict')!;
  verdict.textContent = 'Comparing the local Java runtime against bundled JVM fixtures…';
  try {
    const fixtures: {path:string;body:string;status:number}[] = await fetch(new URL('validation/fixtures.json',scope)).then(r=>{if(!r.ok)throw new Error('JVM fixtures have not been generated for this release');return r.json();});
    let passed=0;
    for(const expected of fixtures) {
      const response = await client.request(expected.path);
      if(response.status!==expected.status || await response.text()!==expected.body) throw new Error(`Disagreement at ${expected.path}`);
      passed++;
    }
    verdict.textContent = `${passed} bundled JVM fixtures matched. This is a local browser rehearsal, not a new JVM or CI run.`;
    document.querySelector('#rehearsal-output')!.textContent = await (await client.request('/audit/evidence')).text();
  } catch(error) {verdict.textContent=String(error);}
  finally {client.close(); indexedDB.deleteDatabase(`slopbuzz:${scope}:rehearsal:${id}`);button.disabled=false;}
};
