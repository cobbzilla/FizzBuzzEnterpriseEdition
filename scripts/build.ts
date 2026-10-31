import {execFileSync} from 'node:child_process';
import {mkdir, readFile, writeFile, cp, rm, readdir} from 'node:fs/promises';
import {build} from 'esbuild';
import {marked} from 'marked';
import {createHash} from 'node:crypto';
import {analyticsConfig} from './analytics-config.ts';
import {sourceIdentity} from './source-identity.ts';
const analytics = await analyticsConfig();
const run = (command: string, args: string[]) => execFileSync(command, args, {stdio:'inherit'});
await build({entryPoints:['web/analytics.ts','web/site.ts','web/demo.ts','web/api.ts','web/response.ts','web/validation.ts'],outdir:'src/main/resources/web',bundle:true,format:'esm',target:'es2022',banner:{js:'// Generated from web/*.ts by scripts/build.ts. Do not edit.'}});
if (!process.argv.includes('--assets-only')) {
  run('mvn', ['-q', 'install']);
  run('mvn', ['-q', '-f', 'browser/pom.xml', 'package']);
}
const revision = process.env.SLOPBUZZ_RELEASE_SHA || execFileSync('git', ['rev-parse','HEAD'], {encoding:'utf8'}).trim();
const dirty = !!execFileSync('git', ['status','--porcelain','--untracked-files=no'], {encoding:'utf8'}).trim();
const sourceDigest = await sourceIdentity();
const identity = createHash('sha256').update(revision).update(sourceDigest).update(JSON.stringify(analytics)).update(process.env.SLOPBUZZ_RUNTIME || 'browser').update(process.env.SLOPBUZZ_API_BASE_URL || '').digest('hex').slice(0,16);
await rm('dist', {recursive:true,force:true});
await mkdir('dist/assets', {recursive:true});
const assets = `assets/${identity}/`;
await cp('browser/target/gate/wasm', `dist/${assets}wasm`, {recursive:true});
await cp('browser/target/gate/js', `dist/${assets}js`, {recursive:true});
await build({entryPoints:['web/analytics.ts','web/site.ts','web/demo.ts','web/api.ts','web/response.ts','web/validation.ts','web/tribunal.ts'],outdir:'dist/assets',bundle:true,format:'esm',target:'es2022'});
await build({entryPoints:['web/runtime-worker.ts'],outfile:`dist/${assets}runtime-worker.js`,bundle:true,format:'iife',target:'es2022'});
for (const asset of ['site.css','api.css','mark.svg','openapi.json']) await cp(`src/main/resources/web/${asset}`, `dist/${asset === 'openapi.json' ? '' : 'assets/'}${asset}`);
// Older offline workers ignore query strings. New markup needs its own CSS path.
for (const stylesheet of ['site.css','api.css']) await cp(`src/main/resources/web/${stylesheet}`, `dist/${assets}${stylesheet}`);
const raw = [['CHANGELOG.md','CHANGELOG.md'],['docs/EXECUTIVE_CONTINUITY_AND_SENTIMENT_REGISTER.md','continuity-register.md']];
for (const [source,target] of raw) await cp(source, `dist/${target}`);
const pages = [['index.html',''],['demo.html','demo'],['api.html','api'],['changelog.html','changelog'],['continuity.html','continuity-register'],['history.html','company-history'],['accessibility.html','accessibility'],['validation.html','validation'],['response.html','response']];
const header = await readFile('src/main/resources/web/components/header.html', 'utf8');
const footer = await readFile('src/main/resources/web/components/footer.html', 'utf8');
function relativeLinks(html: string, nested: boolean) {
  return html.replace(/(href|src)="\/(?!\/)([^"]*)"/g, (_, attr, path) => {
    const [base, suffix = ''] = path.split(/(?=[?#])/);
    const folder = ['demo','api','changelog','continuity-register','validation','response','company-history','accessibility'].includes(base) ? `${base}/` : base;
    return `${attr}="${nested ? '../' : './'}${folder}${suffix}"`;
  });
}
for (const [template,folder] of pages) {
  let html = await readFile(`src/main/resources/web/${template}`, 'utf8');
  html = html.replace('<!--LEDGER_CONTENT-->', await marked.parse(await readFile(raw[0][0],'utf8'))).replace('<!--REGISTER_CONTENT-->', await marked.parse(await readFile(raw[1][0],'utf8')));
  const active = folder === 'demo' ? 'DEMO' : folder === 'api' ? 'API' : folder === 'company-history' ? 'HISTORY' : folder === 'validation' ? 'VALIDATION' : '';
  html = html.replace('<!--SITE_HEADER-->', header).replace('<!--SITE_FOOTER-->', footer).replace(`<!--NAV_${active}-->`, 'aria-current="page"').replace(/<!--NAV_[A-Z]+-->/g, '').replace('Run the real Java service. Repeat a mandate to observe Redis remember what the committee already decided.', 'Run the real Java enterprise in your browser. Repeat a mandate to observe institutional memory recall the committee’s decision.').replaceAll('Redis memory','Institutional cache').replaceAll('>Redis<','>Cache<').replace('shared Redis memory','swappable institutional memory').replace('HTTP liveness','Runtime liveness');
  for (const stylesheet of ['site.css','api.css']) html = html.replaceAll(`href="/assets/${stylesheet}"`, `href="/${assets}${stylesheet}"`);
  await mkdir(`dist/${folder}`,{recursive:true});
  await writeFile(`dist/${folder ? folder+'/' : ''}index.html`,relativeLinks(html,!!folder));
}
await writeFile('dist/analytics-config.json',JSON.stringify({...analytics,revision}));
await writeFile('dist/runtime-config.json',JSON.stringify({mode:process.env.SLOPBUZZ_RUNTIME || 'browser',apiBaseUrl:process.env.SLOPBUZZ_API_BASE_URL || '',revision,assets,engine:process.env.SLOPBUZZ_ENGINE || 'auto'}));
await writeFile('dist/release.json', JSON.stringify({revision,dirty,sourceDigest,build:identity,protocol:1}));
let report: Record<string, unknown> = {revision,dirty,sourceDigest,status:'NOT_RUN',note:'No matching validation report for this source and revision.'};
try {
  const previous=JSON.parse(await readFile('validation/report.json','utf8'));
  if(previous.revision===revision && previous.sourceDigest===sourceDigest) report=previous;
  const e2e=JSON.parse(await readFile('validation/e2e-summary.json','utf8'));
  if(e2e.revision===revision && e2e.sourceDigest===sourceDigest) report.browserLifecycle=e2e;
} catch { /* Unverified builds are explicitly labeled. */ }
await writeFile('dist/validation/report.json',JSON.stringify(report,null,2));
try { await cp('validation/fixtures.json','dist/validation/fixtures.json'); } catch { /* Fixtures are produced by the JVM validation runner. */ }
async function files(directory: string): Promise<string[]> {
  const result: string[] = [];
  for (const entry of await readdir(directory,{withFileTypes:true})) {
    const path = `${directory}/${entry.name}`;
    if(entry.isDirectory()) result.push(...await files(path)); else result.push(path.slice(5));
  } return result;
}
const paths = await files('dist');
paths.push('', 'demo/', 'api/', 'changelog/', 'continuity-register/', 'response/', 'validation/', 'company-history/', 'accessibility/');
// Evidence can arrive after the first preview of the same source revision.
// Give that complete bundle a new cache so installed previews receive the sealed report.
const evidenceSeal = createHash('sha256').update(await readFile('dist/validation/report.json')).digest('hex').slice(0,12);
await build({entryPoints:['web/sw.ts'],outfile:'dist/sw.js',bundle:true,format:'iife',define:{RELEASE:JSON.stringify(`${identity}-${evidenceSeal}`),FILES:JSON.stringify(paths)}});
console.log(`Static enterprise ratified in dist/ (${revision}${dirty ? ', working tree' : ''}).`);
