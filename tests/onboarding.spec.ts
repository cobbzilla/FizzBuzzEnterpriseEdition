import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
async function evidence(page:Page){
 return page.evaluate(async()=>{
  const module=await import(new URL('/assets/tribunal.js',location.href).href);
  const client=new module.BrowserRuntimeClient();
  try{return await(await client.request('/audit/evidence')).json();}finally{client.close();}
 });
}
test.beforeEach(async({page},info)=>{
 await page.route('**/runtime-config.json',async route=>{const response=await route.fetch();await route.fulfill({json:{...await response.json(),engine:info.project.metadata.engine}});});
});
test('real mandate evidence names all seven authorities and a cache hit hires nobody',async({page})=>{
 const network:string[]=[];page.on('request',r=>{if(/^\/(onboarding|fizzbuzz)(\/|$)/.test(new URL(r.url()).pathname))network.push(r.url());});
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');
 await page.selectOption('#display-speed','0');await page.fill('#limit','15');await page.click('#run-button');
 await expect(page.locator('#run-status')).toContainText('Mandate complete');
 await expect(page.locator('#personnel-verdict')).toHaveText('Approved to start at 1');
 expect(await page.locator('.personnel-office').allTextContents()).toEqual(['Headcount Planning','Recruitment','Identity Office','Offer Authority','Induction','Probation Review','Independent Audit']);
 expect(await page.locator('.personnel-badge').allTextContents()).toEqual(Array(7).fill('Approved'));
 const trace=(await page.locator('#trace-result').textContent())!;
 await expect(page.locator('#personnel-origin')).toContainText(`Case HR-${trace}`);
 await page.click('#personnel-documents');await expect(page.locator('#personnel-steps details[open]')).toHaveCount(7);
 await expect(page.locator('#personnel-steps')).toContainText('INITIAL-ORDINAL-HANDBOOK/v1');
 await expect(page.locator('#output')).toContainText('FizzBuzz');const before=await evidence(page);expect(before.journalEntries).toBe(15);
 await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');
 await expect(page.locator('#personnel-origin')).toHaveText('Institutional memory answered. No new HR proceedings.');
 await expect(page.locator('#personnel-steps')).toBeHidden();expect((await evidence(page)).journalEntries).toBe(15);
 await page.fill('#limit','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');
 await expect(page.locator('#personnel-verdict')).toHaveText('Approved to start at 1');await expect(page.locator('#output')).toHaveText('The zero-number mandate produces no lines.');
 expect((await evidence(page)).journalEntries).toBe(15);expect(network).toEqual([]);
});
test('management interventions fail at the actual responsible office and retain numerical output',async({page})=>{
 await page.goto('/demo/');await page.selectOption('#display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');
 const transcript=await page.locator('#output').textContent(),before=await evidence(page);
 for(const [scenario,rejection]of [['zero',2],['two',2],['missing-induction',5]] as const){
  await page.click(`[data-personnel-scenario="${scenario}"]`);await expect(page.locator('#run-status')).toContainText('Personnel rehearsal rejected');
  await expect(page.locator('#personnel-origin')).toContainText('Read-only rehearsal');
  expect(await page.locator('.personnel-badge').allTextContents()).toEqual(Array.from({length:7},(_,i)=>i<rejection?'Approved':i===rejection?'Rejected':'Not reached'));
  await expect(page.locator('#personnel-status')).toContainText(rejection===2?'Identity Office':'Probation Review');
  expect(await page.locator('#output').textContent()).toBe(transcript);
 }
 await page.click('[data-personnel-scenario="approved"]');await expect(page.locator('#run-status')).toContainText('Personnel rehearsal approved');
 const after=await evidence(page);expect(after.journalEntries).toBe(before.journalEntries);expect(after.headDigest).toBe(before.headDigest);
});
test('paced reading pauses, stops, replays and steps through existing evidence without rerunning work',async({page})=>{
 await page.goto('/demo/');await page.selectOption('#display-speed','225');await page.click('[data-personnel-scenario="approved"]');
 await expect(page.locator('#personnel-status')).toContainText('Reading completed proceedings');
 await page.locator('#pause-reading').focus();await page.keyboard.press('Enter');
 const beforePause=await page.locator('.personnel-badge').allTextContents();await page.waitForTimeout(450);expect(await page.locator('.personnel-badge').allTextContents()).toEqual(beforePause);
 await expect(page.locator('#pause-reading')).toBeFocused();
 await page.click('#stop-reading');await expect(page.locator('#personnel-status')).toContainText('adjourned');
 await page.locator('#personnel-step').focus();await page.keyboard.press('Enter');
 await expect(page.locator('#personnel-status')).toContainText('1 of 7');await expect(page.locator('#personnel-step')).toBeFocused();
 for(let i=2;i<=7;i++)await page.keyboard.press('Enter');await expect(page.locator('#personnel-verdict')).toHaveText('Approved to start at 1');
 const before=await evidence(page);await page.click('#personnel-replay');await page.click('#reveal-all');
 await expect(page.locator('#run-status')).toContainText('Personnel replay complete');expect((await evidence(page)).journalEntries).toBe(before.journalEntries);
 await expect(page.locator('#personnel-origin')).toContainText('Replay of read-only rehearsal');
 await page.click('#personnel-documents');await expect(page.locator('#personnel-documents')).toHaveAttribute('aria-expanded','true');
 await page.locator('#personnel-steps summary').first().click();await expect(page.locator('#personnel-documents')).toHaveAttribute('aria-expanded','false');
});
test('a newer mandate interrupts old playback and owns the displayed record',async({page})=>{
 await page.goto('/demo/');await page.click('[data-personnel-scenario="zero"]');await expect(page.locator('#personnel-status')).toContainText('Reading completed proceedings');
 await page.fill('#limit','2');await page.selectOption('#display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');
 await expect(page.locator('#personnel-verdict')).toHaveText('Approved to start at 1');await expect(page.locator('#personnel-origin')).toContainText('Mandate record');
 await expect(page.locator('#output')).toHaveText('1\n2\n');expect((await evidence(page)).journalEntries).toBe(2);
});
test('the API charter exposes actual rejection records through an operable scenario selector',async({page})=>{
 await page.goto('/api/');const card=page.locator('#operation-rehearseOrdinalOnboarding');await card.locator('summary').first().click();
 await card.getByRole('combobox',{name:'Personnel scenario'}).selectOption('missing-induction');await card.getByRole('button',{name:'Send GET request to /onboarding/rehearsal'}).click();
 await expect(card.getByRole('status')).toContainText('HTTP 200');await expect(card.getByRole('region',{name:'GET /onboarding/rehearsal response'})).toContainText('"status":"REJECTED"');
});
test('expanded personnel records remain accessible and reflow with enlarged text',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared DOM audited once per browser; both Java engines exercise all decisions.');
 await page.goto('/demo/');await page.selectOption('#display-speed','0');await page.click('[data-personnel-scenario="zero"]');await expect(page.locator('#personnel-verdict')).toHaveText('Application rejected');
 await page.click('#personnel-documents');
 const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();expect(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
 await page.setViewportSize({width:320,height:800});await page.evaluate(()=>{for(const rule of ['html {font-size:200% !important}','* {line-height:1.5 !important; letter-spacing:.12em !important; word-spacing:.16em !important}'])document.styleSheets[0].insertRule(rule);});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test('page scripts, runtime configuration and charter select the same immutable release',async({page})=>{
 const paths:string[]=[];page.on('request',r=>paths.push(new URL(r.url()).pathname));
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');
 const release=await(await page.request.get('/release.json')).json();
 expect(paths).toContain(`/assets/demo.${release.build}.js`);expect(paths).toContain(`/assets/${release.build}/runtime-config.json`);expect(paths).not.toContain('/runtime-config.json');
 await page.goto('/api/');await expect(page.locator('#api-total')).toContainText('ratified operations');expect(paths).toContain(`/assets/${release.build}/openapi.json`);
 await expect(page.getByRole('link',{name:'Download OpenAPI JSON'})).toHaveAttribute('href',`../assets/${release.build}/openapi.json`);
});
test('an installed offline clerk cannot substitute stale stable scripts or configuration',async({page})=>{
 await page.goto('/');await expect(page.locator('#health-value')).toHaveText('LIVE');
 await page.evaluate(async()=>{
  await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise<void>(resolve=>navigator.serviceWorker.addEventListener('controllerchange',()=>resolve(),{once:true}));
  for(const key of await caches.keys()){
   const cache=await caches.open(key);
   for(const [path,body,type]of [['assets/demo.js','throw new Error("Obsolete instructions");','text/javascript'],['assets/api.js','throw new Error("Obsolete API instructions");','text/javascript'],['runtime-config.json','{"mode":"unrecognized old release"}','application/json'],['openapi.json','{}','application/json']])await cache.put(new URL(path,location.origin+'/'),new Response(body,{headers:{'Content-Type':type}}));
  }
 });
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');
 await page.selectOption('#display-speed','0');await page.click('[data-personnel-scenario="two"]');await expect(page.locator('#personnel-verdict')).toHaveText('Application rejected');
 await page.goto('/api/');await expect(page.locator('#operation-rehearseOrdinalOnboarding')).toBeVisible();expect(errors).toEqual([]);
});
