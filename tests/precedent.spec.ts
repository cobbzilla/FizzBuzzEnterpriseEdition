import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {createStaticServer} from '../scripts/serve.ts';
test.beforeEach(async({page},info)=>{await page.route('**/runtime-config.json',async route=>{const response=await route.fetch();await route.fulfill({json:{...await response.json(),engine:info.project.metadata.engine}});});});
async function inspect(page:Page,path='/audit/evidence'){return page.evaluate(async path=>{const m=await import(new URL('/assets/tribunal.js',location.href).href);const client=new m.BrowserRuntimeClient();try{return await(await client.request(path)).json();}finally{client.close();}},path);}
async function run(page:Page,limit='15'){await page.fill('#limit',limit);await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');}
const expected=Array.from({length:15},(_,i)=>{const n=i+1;return n%15===0?'FizzBuzz':n%3===0?'Fizz':n%5===0?'Buzz':String(n);}).join('\n')+'\n';
async function fileCandidate(page:Page,body:string,expires:number){await page.evaluate(async({body,expires})=>{
 const db=await new Promise<IDBDatabase>((resolve,reject)=>{const r=indexedDB.open(`slopbuzz:${location.origin}/`);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});
 try{await new Promise<void>((resolve,reject)=>{const tx=db.transaction('cache','readwrite');tx.objectStore('cache').put({expires,body},'15');tx.oncomplete=()=>resolve();tx.onabort=()=>reject(tx.error);});}finally{db.close();}
},{body,expires});}

test('a second mandate convenes five real offices and produces no new numerical audit entries',async({page})=>{
 const network:string[]=[];page.on('request',r=>{if(/^\/(fizzbuzz|precedent)(\/|$)/.test(new URL(r.url()).pathname))network.push(r.url());});
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await page.selectOption('#display-speed','0');await run(page);
 await expect(page.locator('#precedent-source')).toContainText('no prior text');const before=await inspect(page);expect(before.journalEntries).toBe(15);
 await run(page);await expect(page.locator('#cache-result')).toHaveText('HIT');await expect(page.locator('#precedent-status')).toContainText('Certificate of Authorized Non-Performance issued for 15 lines');
 await expect(page.locator('#precedent-source')).toContainText('Actual mandate reuse proceedings');expect(await page.locator('#precedent-steps .personnel-badge').allTextContents()).toEqual(Array(5).fill('Approved'));
 await expect(page.locator('#chronicle-entries')).toContainText('Certificate of Authorized Non-Performance');await expect(page.locator('#chronicle-entries')).toContainText('No fresh recruitment');
 await page.click('#precedent-expand');await expect(page.locator('#precedent-steps details[open]')).toHaveCount(5);await expect(page.locator('#precedent-steps')).toContainText('without invoking production strategies');
 expect(await page.locator('#output').textContent()).toBe(expected);const after=await inspect(page);expect(after.journalEntries).toBe(15);expect(after.headDigest).toBe(before.headDigest);expect(network).toEqual([]);
});
test('read-only objections reach the responsible offices and preserve the actual mandate case',async({page})=>{
 await page.goto('/demo/');await page.selectOption('#display-speed','0');await run(page);await run(page);const before=await inspect(page),cache=await inspect(page,'/cache/status');
 for(const [scenario,rejection]of [['wrong-mandate',1],['missing-line',2],['lowercase-fizz',3]] as const){
  await page.selectOption('#precedent-scenario',scenario);await page.locator('#precedent-submit').focus();await page.keyboard.press('Enter');await expect(page.locator('#precedent-status')).toContainText('Reuse rejected');
  await expect(page.locator('#precedent-submit')).toBeFocused();await expect(page.locator('#precedent-source')).toContainText('Read-only specimen rehearsal');
  expect(await page.locator('#precedent-steps .personnel-badge').allTextContents()).toEqual(Array.from({length:5},(_,i)=>i<rejection?'Approved':i===rejection?'Rejected':'Not reached'));expect(await page.locator('#output').textContent()).toBe(expected);
 }
 await page.selectOption('#precedent-scenario','zero');await page.click('#precedent-submit');await expect(page.locator('#precedent-status')).toContainText('issued for 0 lines');
 await page.click('#precedent-latest');await expect(page.locator('#precedent-status')).toContainText('issued for 15 lines');await expect(page.locator('#precedent-source')).toContainText('Actual mandate reuse proceedings');
 expect(await inspect(page,'/cache/status')).toEqual(cache);const after=await inspect(page);expect(after.headDigest).toBe(before.headDigest);expect(after.journalEntries).toBe(before.journalEntries);
});
test('a poisoned raw cache entry is rejected and replaced after one production run',async({page})=>{
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await page.selectOption('#display-speed','0');await fileCandidate(page,expected.replaceAll('Fizz','fizz'),Date.now()+60_000);await run(page);
 await expect(page.locator('#cache-result')).toHaveText('MISS');await expect(page.locator('#precedent-status')).toContainText('Reuse rejected by Independent Lexical Bench');await expect(page.locator('#chronicle-entries')).toContainText('inadmissible precedent');expect(await page.locator('#output').textContent()).toBe(expected);
 expect((await inspect(page)).journalEntries).toBe(15);expect((await inspect(page,'/cache/status')).rejectedPrecedents).toBe(1);await run(page);await expect(page.locator('#cache-result')).toHaveText('HIT');expect((await inspect(page)).journalEntries).toBe(15);
});
test('expired institutional memory is a miss, while raw zero-work memory remains compatible',async({page})=>{
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await page.selectOption('#display-speed','0');await fileCandidate(page,expected,Date.now()-10);await run(page);
 await expect(page.locator('#cache-result')).toHaveText('MISS');await expect(page.locator('#precedent-steps li')).toHaveCount(0);expect((await inspect(page,'/cache/status')).rejectedPrecedents).toBe(0);
 await run(page,'0');await run(page,'0');await expect(page.locator('#precedent-status')).toContainText('issued for 0 lines');expect((await inspect(page)).journalEntries).toBe(15);
});
test('the human API charter exposes the same real court decisions',async({page})=>{
 await page.goto('/api/');const card=page.locator('#operation-rehearsePriorWork');await card.locator('summary').first().click();await card.getByRole('combobox',{name:'Court petition'}).selectOption('missing-line');await card.getByRole('button',{name:'Send GET request to /precedent/rehearsal'}).click();
 await expect(card.getByRole('status')).toContainText('HTTP 200');await expect(card.getByRole('region',{name:'GET /precedent/rehearsal response'})).toContainText('"status":"REJECTED"');
});
test('offline court proceedings inspect specimens and leave the retained mandate alone',async({page},info)=>{
 const server=createStaticServer('dist','/',{engine:info.project.metadata.engine});await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));const port=(server.address() as {port:number}).port;
 try{
  await page.goto(`http://127.0.0.1:${port}/demo/`);await expect(page.locator('#health-value')).toHaveText('LIVE');await page.selectOption('#display-speed','0');await run(page);await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
  await page.unroute('**/runtime-config.json');await new Promise<void>(resolve=>{server.close(()=>resolve());server.closeAllConnections();});
  await page.reload();await page.selectOption('#display-speed','0');await run(page);await expect(page.locator('#precedent-status')).toContainText('issued for 15 lines');
  await page.selectOption('#precedent-scenario','wrong-mandate');await page.click('#precedent-submit');await expect(page.locator('#precedent-status')).toContainText('Reuse rejected by Mandate Jurisdiction Chamber');expect((await inspect(page)).journalEntries).toBe(15);
 }finally{server.close();server.closeAllConnections();}
});
test('court controls, documents and states remain accessible under enlarged text',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared DOM audited once per browser; both compilers exercise the court.');
 await page.goto('/demo/');await page.selectOption('#precedent-scenario','missing-line');await page.click('#precedent-submit');await expect(page.locator('#precedent-status')).toContainText('Reuse rejected');await page.click('#precedent-expand');
 expect((await page.locator('#precedent-scenario').boundingBox())!.height).toBeGreaterThanOrEqual(48);
 await expect(page.locator('#precedent-expand')).toHaveAttribute('aria-expanded','true');await page.locator('#precedent-steps summary').first().click();await expect(page.locator('#precedent-expand')).toHaveAttribute('aria-expanded','false');
 const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();expect(audit.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))).toEqual([]);
 await page.setViewportSize({width:320,height:800});await page.evaluate(()=>{for(const css of ['html {font-size:200% !important}','* {line-height:1.5 !important;letter-spacing:.12em !important;word-spacing:.16em !important}'])document.styleSheets[0].insertRule(css);});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);expect((await page.locator('#precedent-scenario').boundingBox())!.height).toBeGreaterThanOrEqual(96);
});
