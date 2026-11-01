import {readFile} from 'node:fs/promises';
import {build} from 'esbuild';
import {test,expect,type Page} from '@playwright/test';

const legacyRevision='0000000000000000000000000000000000000001';
// Model a network/hard refresh while retaining the legacy tab's dedicated worker.
// Offline service-worker installation and activation are covered in browser.spec.ts.
test.use({serviceWorkers:'block'});
let legacyWorker:string,unsupportedWorker:string,personnelWorker:string;
test.beforeAll(async()=>{
  const source=await readFile('tests/fixtures/legacy-runtime-worker.ts','utf8');
  const compile=async(contents:string)=>(await build({stdin:{contents,resolveDir:`${process.cwd()}/tests/fixtures`,loader:'ts'},bundle:true,write:false,format:'iife',target:'es2022'})).outputFiles[0].text;
  // The frozen transport fixture loads this build's compiled Java. Strip only
  // the newly introduced response headers to model its pre-HR business release.
  legacyWorker=await compile(source.replace("reply({kind: 'reply', id: message.id, revision: config.revision, leader, result});","delete result.headers['X-SlopBuzz-Onboarding-Trace']; delete result.headers['X-SlopBuzz-Onboarding-State']; reply({kind: 'reply', id: message.id, revision: config.revision, leader, result});"));
  personnelWorker=await compile(source);
  unsupportedWorker=await compile(source.replace('protocol:1','protocol:999'));
});
async function invoke(page:Page,path:string){
  return page.evaluate(async path=>{
    // The tribunal exports the client to keep validation on the production transport.
    const m=await import(new URL('/assets/tribunal.js',location.href).href);
    const client=new m.BrowserRuntimeClient();
    try {const r=await client.request(path);return {status:r.status,body:await r.text(),revision:r.headers.get('X-SlopBuzz-Executing-Revision')};}finally{client.close();}
  },path);
}
async function installLegacy(page:Page,engine:string,unsupported=false){
  await page.route('**/runtime-config.json',async route=>{
    const response=await route.fetch();await route.fulfill({json:{...await response.json(),revision:legacyRevision,engine}});
  });
  await page.route('**/runtime-worker.js',route=>route.fulfill({contentType:'text/javascript',body:unsupported?unsupportedWorker:legacyWorker}));
  await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');
}
test.beforeEach(async({context},info)=>{
  await context.route('**/runtime-config.json',async route=>{
    const response=await route.fetch();await route.fulfill({json:{...await response.json(),engine:info.project.metadata.engine}});
  });
});
test('hard reload beside a frozen legacy owner keeps demo, BigInt and one durable journal working',async({page,context},info)=>{
  await installLegacy(page,info.project.metadata.engine);
  await page.selectOption('#display-speed','0');await page.fill('#limit','17');await page.click('#run-button');
  await expect(page.locator('#run-status')).toContainText('Mandate complete');
  const next=await context.newPage();await next.goto('/demo/');await next.reload();
  await expect(next.locator('#health-value')).toHaveText('LIVE');
  await next.selectOption('#display-speed','0');
  for(const limit of ['1','15','1234']){
    await next.fill('#limit',limit);await next.click('#run-button');
    await expect(next.locator('#run-status')).toContainText('Mandate complete');
    await expect(next.locator('#output-count')).toContainText(`${limit} line`);
  }
  const currentRevision=await next.evaluate(async()=>(await (await fetch('/runtime-config.json')).json()).revision);
  const retained=await invoke(next,'/audit/evidence');expect(retained.revision).toBe(legacyRevision);
  await next.fill('#limit','19');await next.click('#run-button');await expect(next.locator('#run-status')).toContainText('Mandate complete');
  await expect(next.locator('#personnel-verdict')).toHaveText('Earlier administration');
  await expect(next.locator('#chronicle-entries')).toContainText('One has reported for duty');
  await expect(next.locator('#chronicle-entries')).toContainText('without forwarding a detailed execution dossier');
  const beforeRehearsal=await invoke(next,'/audit/evidence');
  await next.click('[data-personnel-scenario="zero"]');await expect(next.locator('#personnel-verdict')).toHaveText('Application rejected');
  const afterRehearsal=await invoke(next,'/audit/evidence');expect(JSON.parse(afterRehearsal.body).journalEntries).toBe(JSON.parse(beforeRehearsal.body).journalEntries);
  expect(JSON.parse(retained.body).journalEntries).toBe(33);
  const window=await invoke(next,'/fizzbuzz/window?start=9007199254740993&count=2');
  expect(window.status).toBe(200);expect(window.body).toBe('Fizz\n9007199254740994\n');expect(window.revision).toBe(currentRevision);
  const forecast=await invoke(next,'/capacity/forecast/extended?limit=9007199254740993');
  expect(JSON.parse(forecast.body).totalLines).toBe('9007199254740993');expect(forecast.revision).toBe(currentRevision);
  await next.goto('/#operations');
  await next.click('#procurement-button');await expect(next.locator('#procurement-status')).toContainText('8 separate line items');
  await next.goto('/demo/');
  await next.fill('#limit','9007199254740993');await next.selectOption('#display-speed','225');await next.click('#run-button');
  await expect(next.locator('#output-count')).toContainText('of 9007199254740993 lines');await next.click('#stop-reading');
  // Release-local desks have not created a second persistent journal or even a DB.
  expect(await next.evaluate(async()=>(await indexedDB.databases()).map(db=>db.name))).toEqual([`slopbuzz:${new URL(next.url()).origin}/`]);
  const before=JSON.parse((await invoke(next,'/audit/evidence')).body);
  await page.close();
  await expect.poll(async()=>JSON.parse((await invoke(next,'/operations/runtime')).body).revision).toBe(currentRevision);
  const after=await invoke(next,'/audit/evidence');expect(after.revision).toBe(currentRevision);
  expect(JSON.parse(after.body).headDigest).toBe(before.headDigest);expect(JSON.parse(after.body).journalEntries).toBe(52);
  await next.fill('#limit','17');await next.selectOption('#display-speed','0');await next.click('#run-button');
  await expect(next.locator('#run-status')).toContainText('Mandate complete');await expect(next.locator('#cache-result')).toHaveText('HIT');
});
test('an earlier HR-aware owner contributes its real personnel record without invented later proceedings',async({page,context},info)=>{
 await page.route('**/runtime-config.json',async route=>{const response=await route.fetch();await route.fulfill({json:{...await response.json(),revision:legacyRevision,engine:info.project.metadata.engine}});});
 await page.route('**/runtime-worker.js',route=>route.fulfill({contentType:'text/javascript',body:personnelWorker}));
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');
 const next=await context.newPage();await next.goto('/demo/');await next.selectOption('#display-speed','0');await next.fill('#limit','1');await next.click('#run-button');await expect(next.locator('#run-status')).toContainText('Mandate complete');
 await expect(next.locator('#chronicle-entries')).toContainText('Personnel has supplied the actual case file');await expect(next.locator('#chronicle-entries')).toContainText('Recorded personnel · procedure explained');await expect(next.locator('#chronicle-entries')).toContainText('other departments are explained as procedure');
 expect(JSON.parse((await invoke(next,'/audit/evidence')).body).journalEntries).toBe(1);
});
test('an unknown legacy protocol is refused before a mandate is submitted',async({page,context},info)=>{
  await installLegacy(page,info.project.metadata.engine,true);
  const next=await context.newPage();await next.goto('/demo/');
  await expect(next.locator('#health-value')).toHaveText('UNAVAILABLE');
  await next.click('#run-button');await expect(next.locator('#run-status')).toContainText('unsupported protocol');
  expect(JSON.parse((await invoke(page,'/audit/evidence')).body).journalEntries).toBe(0);
});
test('a transient release worker refuses retained operations',async({page})=>{
  await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');
  const error=await page.evaluate(async()=>{
    const m=await import(new URL('/assets/tribunal.js',location.href).href);
    const client=new m.BrowserRuntimeClient(m.config,crypto.randomUUID(),true);
    try{await client.request('/fizzbuzz?limit=15');return 'UNEXPECTED SUCCESS';}catch(error){return String(error);}finally{client.close();}
  });
  expect(error).toContain('cannot access retained proceedings');expect(JSON.parse((await invoke(page,'/audit/evidence')).body).journalEntries).toBe(0);
});
