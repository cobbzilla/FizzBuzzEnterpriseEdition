import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test.beforeEach(async({page},info)=>{await page.route('**/runtime-config.json',async route=>{const response=await route.fetch();await route.fulfill({json:{...await response.json(),engine:info.project.metadata.engine}});});});
async function invoke(page:Page,path:string){return page.evaluate(async path=>{const m=await import(new URL('/assets/tribunal.js',location.href).href);const client=new m.BrowserRuntimeClient();try{return await(await client.request(path)).json();}finally{client.close();}},path);}
async function run(page:Page,limit:string){await page.fill('#limit',limit);await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');}
async function bottom(page:Page){await expect.poll(()=>page.locator('#chronicle-scroll').evaluate(e=>Math.abs(e.scrollTop+e.clientHeight-e.scrollHeight)<3)).toBe(true);}

test('the answer is first and the chronicle has fixed height, scrolls and follows its latest entry',async({page})=>{
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await page.selectOption('#display-speed','0');
 const height=await page.locator('#chronicle-scroll').evaluate(e=>e.clientHeight);
 await run(page,'1');await expect(page.locator('#chronicle-entries')).toContainText('One has reported for duty');await run(page,'100');
 expect(await page.locator('#chronicle-scroll').evaluate(e=>e.clientHeight)).toBe(height);
 expect(await page.locator('#chronicle-scroll').evaluate(e=>e.scrollHeight)).toBeGreaterThan(height*3);await bottom(page);
 const output=(await page.locator('#output').boundingBox())!,chronicle=(await page.locator('#chronicle-title').boundingBox())!;expect(output.y+output.height).toBeLessThan(chronicle.y);
 await expect(page.locator('#personnel-dialog')).not.toBeVisible();await expect(page.locator('#chronicle-entries')).toContainText('4 separately certified z’s');
 await page.setViewportSize({width:390,height:844});await bottom(page);
 const controls=(await page.locator('#mandate-controls').boundingBox())!,mobileOutput=(await page.locator('#mandate-output').boundingBox())!,advisory=(await page.locator('#advisory-inventory').boundingBox())!;
 expect(mobileOutput.y).toBeGreaterThanOrEqual(controls.y+controls.height);expect(advisory.y).toBeGreaterThanOrEqual(mobileOutput.y+mobileOutput.height+31);
});

test('One is narrated as soon as it appears without waiting through seven HR pauses',async({page})=>{
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await page.fill('#limit','3');await page.click('#run-button');
 await expect(page.locator('#output')).toHaveText('1\n',{timeout:2000});await expect(page.locator('#chronicle-current')).toContainText('One has reported for duty');
 await expect(page.locator('#chronicle-entries [data-ordinal="3"]')).toHaveCount(0);await page.click('#pause-reading');
 const before=await page.locator('#chronicle-entries').textContent();await page.waitForTimeout(300);expect(await page.locator('#chronicle-entries').textContent()).toBe(before);
 await page.click('#reveal-all');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#chronicle-entries')).toContainText('Glyph Procurement received 4 individually inspected character allocations');
});

test('an archive inspection survives new output and Latest restores chronological order',async({page})=>{
 await page.goto('/demo/');await page.selectOption('#display-speed','225');await page.fill('#limit','100');await page.click('#run-button');
 await expect(page.locator('#chronicle-ordinal option[value="2"]')).toHaveCount(1);await page.selectOption('#chronicle-ordinal','2');
 await expect(page.locator('#follow-chronicle')).not.toBeChecked();await page.selectOption('#display-speed','0');await expect(page.locator('#run-status')).toContainText('Mandate complete');
 await expect(page.locator('.chronicle-inspection')).toHaveAttribute('data-ordinal','2');await expect(page.locator('#chronicle-current')).toContainText('Inspecting recorded ordinal 2');
 expect(await page.locator('#chronicle-scroll').evaluate(e=>e.scrollTop)).toBe(0);
 await page.selectOption('#chronicle-ordinal','1');await expect(page.locator('.chronicle-inspection')).toHaveAttribute('data-ordinal','1');
 await page.selectOption('#chronicle-ordinal','latest');await expect(page.locator('.chronicle-inspection')).toHaveCount(0);await expect(page.locator('#chronicle-current')).toContainText('Ordinal 100');
 expect(await page.locator('.chronicle-folio').last().getAttribute('data-ordinal')).toBe('100');await bottom(page);
});

test('scrolling up pauses automatic following and reaching the bottom resumes it',async({page})=>{
 await page.goto('/demo/');await page.selectOption('#display-speed','225');await page.fill('#limit','100');await page.click('#run-button');await expect(page.locator('#chronicle-ordinal option[value="3"]')).toHaveCount(1);await bottom(page);
 const scroll=page.locator('#chronicle-scroll');await scroll.hover();await page.mouse.wheel(0,-260);
 await expect.poll(()=>scroll.evaluate(e=>e.scrollHeight-e.clientHeight-e.scrollTop>100)).toBe(true);
 await scroll.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
 const before={top:await scroll.evaluate(e=>e.scrollTop),text:await page.locator('#chronicle-entries').textContent()};await expect(page.locator('#follow-chronicle')).toBeChecked();
 await page.selectOption('#display-speed','0');await expect(page.locator('#run-status')).toContainText('Mandate complete');
 expect(await scroll.evaluate(e=>e.scrollTop)).toBeCloseTo(before.top,0);expect(await page.locator('#chronicle-entries').textContent()).toBe(before.text);
 await page.setViewportSize({width:1100,height:800});await expect.poll(()=>scroll.evaluate(e=>e.scrollHeight-e.clientHeight-e.scrollTop>50)).toBe(true);
 await scroll.hover();
 // Firefox limits a single wheel gesture to roughly a viewport; keep scrolling
 // until the reader actually reaches the bottom instead of assuming a huge delta does.
 await expect.poll(async()=>{await page.mouse.wheel(0,600);await scroll.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));return scroll.evaluate(e=>Math.abs(e.scrollTop+e.clientHeight-e.scrollHeight)<3);}).toBe(true);
 await expect(page.locator('#chronicle-current')).toContainText('Ordinal 100');
 expect((await invoke(page,'/audit/evidence')).journalEntries).toBe(100);
});
test('keyboard scrolling retains earlier minutes and End restores the latest',async({page})=>{
 await page.goto('/demo/');await page.selectOption('#display-speed','225');await page.fill('#limit','100');await page.click('#run-button');await expect(page.locator('#chronicle-ordinal option[value="3"]')).toHaveCount(1);await bottom(page);
 const scroll=page.locator('#chronicle-scroll');await scroll.focus();await page.keyboard.press('Home');await expect.poll(()=>scroll.evaluate(e=>e.scrollTop)).toBe(0);
 const text=await page.locator('#chronicle-entries').textContent();await page.selectOption('#display-speed','0');await expect(page.locator('#run-status')).toContainText('Mandate complete');expect(await page.locator('#chronicle-entries').textContent()).toBe(text);expect(await scroll.evaluate(e=>e.scrollTop)).toBe(0);
 await scroll.focus();await page.keyboard.press('End');await bottom(page);await expect(page.locator('#chronicle-current')).toContainText('Ordinal 100');
});
test('turning following off preserves the visible minutes while the business continues',async({page})=>{
 await page.goto('/demo/');await page.selectOption('#display-speed','225');await page.fill('#limit','100');await page.click('#run-button');await expect(page.locator('#chronicle-ordinal option[value="3"]')).toHaveCount(1);
 await page.uncheck('#follow-chronicle');const before=await page.locator('#chronicle-entries').textContent();await page.selectOption('#display-speed','0');await expect(page.locator('#run-status')).toContainText('Mandate complete');expect(await page.locator('#chronicle-entries').textContent()).toBe(before);
 await page.check('#follow-chronicle');await expect(page.locator('#chronicle-current')).toContainText('Ordinal 100');await bottom(page);expect((await invoke(page,'/audit/evidence')).journalEntries).toBe(100);
});
test('replay, step-through and paperwork inspection do not submit the business again',async({page})=>{
 await page.goto('/demo/');await page.selectOption('#display-speed','0');await run(page,'15');const before=await invoke(page,'/audit/evidence');expect(before.journalEntries).toBe(15);
 await page.click('#personnel-replay');await expect(page.locator('#run-status')).toContainText('Execution replay complete');expect((await invoke(page,'/audit/evidence')).journalEntries).toBe(15);
 await page.click('#personnel-step');await expect(page.locator('#chronicle-current')).toContainText('One has reported for duty');await page.click('#personnel-step');await expect(page.locator('#chronicle-current')).toContainText('Ordinal 2');
 await page.click('#personnel-documents');await expect(page.locator('#personnel-dialog')).toBeVisible();await expect(page.locator('#personnel-dialog-close')).toBeFocused();await page.click('#personnel-documents-toggle');await expect(page.locator('#personnel-steps details[open]')).toHaveCount(7);
 await page.keyboard.press('Escape');await expect(page.locator('#personnel-documents')).toBeFocused();expect((await invoke(page,'/audit/evidence')).headDigest).toBe(before.headDigest);
});

test('cache hits and zero mandates tell their own actual story',async({page})=>{
 await page.goto('/demo/');await page.selectOption('#display-speed','0');await run(page,'3');await run(page,'3');
 await expect(page.locator('#chronicle-entries')).toContainText('No fresh recruitment');await expect(page.locator('#chronicle-entries')).not.toContainText('Personnel has supplied the actual case file');
 await run(page,'0');await expect(page.locator('#chronicle-entries')).toContainText('hired One for a zero-work mandate');await expect(page.locator('#output')).toHaveText('The zero-number mandate produces no lines.');
 await run(page,'0');await expect(page.locator('#chronicle-entries')).toContainText('No new recruitment');expect((await invoke(page,'/audit/evidence')).journalEntries).toBe(3);
});

test('long realtime windows retain bounded output, records and rendered narration',async({page})=>{
 await page.goto('/demo/');await page.selectOption('#display-speed','0');await run(page,'2500');
 await expect(page.locator('#chronicle-entries')).toContainText('transient');await expect(page.locator('#chronicle-entries')).not.toContainText('Appended sequence');
 expect(await page.locator('.chronicle-folio').count()).toBeLessThanOrEqual(24);expect(await page.locator('#chronicle-ordinal option').count()).toBeLessThanOrEqual(1001);expect((await invoke(page,'/audit/evidence')).journalEntries).toBe(0);
 const lines=(await page.locator('#output').textContent())!.trim().split('\n');expect(lines.length).toBe(1000);expect(lines.at(-1)).toBe('Buzz');await bottom(page);
});

test('narrative, named scroll regions and modal papers remain accessible at enlarged text',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared DOM audited once per browser; both Java engines exercise the chronicle.');
 await page.goto('/demo/');await page.selectOption('#display-speed','0');await run(page,'15');await page.selectOption('#chronicle-ordinal','15');await page.locator('.chronicle-inspection summary').click();
 let result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
 await page.setViewportSize({width:320,height:800});await page.evaluate(()=>{for(const rule of ['html {font-size:200% !important}','* {line-height:1.5 !important; letter-spacing:.12em !important;word-spacing:.16em !important}'])document.styleSheets[0].insertRule(rule);});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.click('#personnel-documents');await page.click('#personnel-documents-toggle');result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();expect(result.violations.map(v=>v.id)).toEqual([]);
});
