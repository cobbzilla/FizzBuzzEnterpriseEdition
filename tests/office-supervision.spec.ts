import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {hoveringLabel,hoveringCadence} from '../web/office-supervision-model';
import type {OfficeDiagnostics} from '../web/office-world';

const errors=new WeakMap<Page,string[]>();
test.beforeEach(async({page},info)=>{errors.set(page,[]);page.on('pageerror',e=>errors.get(page)!.push(e.message));await page.route('**/runtime-config.json',async route=>{const r=await route.fetch();await route.fulfill({json:{...await r.json(),engine:info.project.metadata.engine}});});});
test.afterEach(async({page})=>{expect(errors.get(page)).toEqual([]);});
async function reception(page:Page){await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');}
async function enable(page:Page,n='1'){await page.fill('#limit',n);await page.check('#executive-hovering');await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered','true',{timeout:60000});}
async function pause(page:Page){const control=page.locator('#supervision-pause');await expect(control).toHaveAttribute('aria-disabled','false');await control.focus();if(await control.getAttribute('aria-pressed')==='false')await control.press('Space');await expect(control).toHaveAttribute('aria-pressed','true');}
async function observed(page:Page){return Number(await page.locator('#supervision-pane').getAttribute('data-observed-steps')||0);}
async function next(page:Page){const before=await observed(page);await page.locator('#supervision-next').focus();await page.keyboard.press('Space');await expect.poll(()=>observed(page),{intervals:[20,35,50],timeout:15000}).toBeGreaterThan(before);return await page.locator('#supervision-pane').getAttribute('data-kind')||'';}
async function finishManually(page:Page,maximum=100){const kinds:string[]=[];for(let i=0;i<maximum;i++){if(await page.locator('#supervision-pause').getAttribute('aria-disabled')==='true')return kinds;kinds.push(await next(page));}throw new Error('Observed sequence did not finish within its finite specimen allowance.');}
async function audit(page:Page){return page.evaluate(async()=>{const m=await import(new URL('/assets/tribunal.js',location.href).href),client=new m.BrowserRuntimeClient();try{return await(await client.request('/audit/evidence')).json();}finally{client.close();}});}
async function diagnostics(page:Page):Promise<OfficeDiagnostics>{return page.evaluate(async()=>{const c=document.querySelector<HTMLCanvasElement>('#supervision-canvas')!,m=await import(c.dataset.module!);return m.inspectOffice(c);});}

test('attendance is independently optional and showing it restores a reader or the newest actual appointments',async({page})=>{
 await reception(page);await expect(page.locator('#require-companion-roll-call')).toBeChecked();await expect(page.locator('#executive-hovering')).not.toBeChecked();await expect(page.locator('#supervision-pane')).toBeHidden();await expect(page.locator('#display-speed option[value="'+hoveringCadence+'"]').first()).toHaveCount(0);
 await page.selectOption('#display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#companion-list li')).toHaveCount(7);
 await page.uncheck('#require-companion-roll-call');await expect(page.locator('#companion-roll')).toBeHidden();await expect(page.locator('#emoji-companions')).toBeChecked();await page.fill('#limit','30');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#companion-list li')).toHaveCount(14);expect(await page.evaluate(()=>localStorage.getItem('slopbuzz:extraordinary-appointments:v1'))).not.toBeNull();
 await page.check('#require-companion-roll-call');await expect(page.locator('#companion-roll')).toBeVisible();await expect.poll(()=>page.locator('#companion-scroll').evaluate(e=>e.scrollHeight-e.clientHeight-e.scrollTop)).toBeLessThan(24);
 await page.locator('#companion-scroll').evaluate(e=>e.scrollTop=0);await expect.poll(()=>page.locator('#companion-scroll').evaluate(e=>e.scrollTop)).toBe(0);await page.uncheck('#require-companion-roll-call');await page.check('#require-companion-roll-call');expect(await page.locator('#companion-scroll').evaluate(e=>e.scrollTop)).toBe(0);
});

test('the otherwise absent cadence is owned by the checkbox and restores each previous authority',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared cadence DOM covered once per browser.');await reception(page);
 for(const cadence of ['225','0','1800']){
  await page.selectOption('#display-speed',cadence);await page.check('#executive-hovering');await expect(page.locator('#display-speed')).toBeDisabled();await expect(page.locator('#display-speed')).toHaveValue(hoveringCadence);const option=page.locator('#display-speed option[value="'+hoveringCadence+'"]');await expect(option).toHaveText(hoveringLabel);await expect(option).toBeDisabled();
  const output=(await page.locator('#output').boundingBox())!,scene=(await page.locator('#supervision-stage').boundingBox())!,roll=(await page.locator('#companion-roll').boundingBox())!;expect(scene.y).toBeGreaterThan(output.y+output.height);expect(scene.y+scene.height).toBeLessThan(roll.y);
  await page.click('#supervision-autonomy');await expect(page.locator('#executive-hovering')).not.toBeChecked();await expect(page.locator('#display-speed')).toBeEnabled();await expect(page.locator('#display-speed')).toHaveValue(cadence);await expect(option).toHaveCount(0);await expect(page.locator('#executive-hovering')).toBeFocused();
 }
});

test('a real line waits for its pictured publication, then every audit and cleanup step is separately observed',async({page})=>{
 test.setTimeout(180000);await reception(page);await enable(page);await page.click('#run-button');await pause(page);expect(await page.locator('#output').textContent()).toBe('');
 const before=await observed(page);await page.waitForTimeout(350);expect(await observed(page)).toBe(before);const initialAudit=await audit(page);expect(initialAudit.journalEntries).toBe(1);
 const kinds:string[]=[];let published=false;
 for(let i=0;i<60;i++){
  if((await page.locator('#run-status').textContent())?.includes('Mandate complete'))break;
  const kind=await next(page);kinds.push(kind);if(kind==='PUBLICATION')published=true;expect(await page.locator('#output').textContent()).toBe(published?'1\n':'');
 }
 await expect(page.locator('#run-status')).toContainText('Mandate complete');expect(kinds.filter(k=>k==='HR_APPROVED')).toHaveLength(7);expect(kinds.filter(k=>k==='PUBLICATION')).toHaveLength(1);
 const publication=kinds.indexOf('PUBLICATION');for(const kind of ['NOTARY','AUDIT_APPEND','QUEUE_ENQUEUED','TRANSACTION_COMMIT','PREMISES_RELEASE','TRANSACTION_CLEANUP','SUCCESSION'])expect(kinds).toContain(kind);
 expect(kinds.indexOf('NOTARY')).toBeLessThan(publication);for(const kind of ['AUDIT_APPEND','QUEUE_ENQUEUED','TRANSACTION_COMMIT','PREMISES_RELEASE','TRANSACTION_CLEANUP','SUCCESSION'])expect(kinds.indexOf(kind)).toBeGreaterThan(publication);
 const finalAudit=await audit(page);expect(finalAudit.journalEntries).toBe(initialAudit.journalEntries);expect(finalAudit.headDigest).toBe(initialAudit.headDigest);const scene=await diagnostics(page);expect(scene.fileActors).toBe(0);expect(scene.meshes).toBeLessThan(300);
});

test('an unattended or obscured view pauses and resuming off-screen reports the actual wait',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared attention controls covered once per browser.');await reception(page);await page.selectOption('#display-speed','0');await page.fill('#limit','3');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#discovery-list button')).not.toHaveCount(0);
 await enable(page,'1');await page.click('#run-button');await expect(page.locator('#supervision-pane')).toHaveAttribute('data-kind','REQUEST');await pause(page);await page.locator('.site-footer').scrollIntoViewIfNeeded();await page.locator('#pause-reading').dispatchEvent('click');await expect(page.locator('#run-status')).toContainText('waiting for attention');const away=await observed(page);await page.waitForTimeout(400);expect(await observed(page)).toBe(away);
 await page.locator('#mandate-output').evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));await expect.poll(()=>observed(page),{timeout:15000}).toBeGreaterThan(away);await page.locator('#discovery-list button').first().click();await expect(page.locator('#companion-dialog')).toBeVisible();const covered=await observed(page);await page.waitForTimeout(400);expect(await observed(page)).toBe(covered);await page.keyboard.press('Escape');await page.click('#stop-reading');
});

test('mid-reading mode changes and a newer mandate cannot duplicate or release the previous number',async({page})=>{
 await reception(page);await page.fill('#limit','3');await page.selectOption('#display-speed','800');await page.click('#run-button');await expect(page.locator('#output')).toHaveText('1\n');await page.check('#executive-hovering');await expect(page.locator('#display-speed')).toBeDisabled();await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered','true');await page.waitForTimeout(250);expect(await page.locator('#output').textContent()).toBe('1\n');
 await page.fill('#limit','1');await page.click('#run-button');await pause(page);await page.click('#supervision-autonomy');await expect(page.locator('#display-speed')).toHaveValue('800');await page.click('#reveal-all');await expect(page.locator('#run-status')).toContainText('Mandate complete');expect(await page.locator('#output').textContent()).toBe('1\n');await page.waitForTimeout(150);expect(await page.locator('#output').textContent()).toBe('1\n');
});

test('cached and zero mandates show only their available work and never fabricate numerical files',async({page})=>{
 test.setTimeout(180000);await reception(page);await page.selectOption('#display-speed','0');await page.fill('#limit','3');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');const initial=await audit(page);
 await enable(page,'3');await page.click('#run-button');await expect(page.locator('#cache-result')).toHaveText('HIT');await pause(page);const kinds=await finishManually(page,50);expect(kinds.some(k=>k.startsWith('HR_')||k.startsWith('PREMISES_')||['REQUISITION','GLYPH_ACCEPTED','PUBLICATION','AUDIT_APPEND','TRANSACTION_COMMIT'].includes(k))).toBe(false);expect(await page.locator('#output').textContent()).toBe('1\n2\nFizz\n');expect((await audit(page)).journalEntries).toBe(initial.journalEntries);
 await page.fill('#limit','0');await page.click('#run-button');await pause(page);const zero=await finishManually(page,30);expect(zero).toContain('HR_APPROVED');expect(zero).not.toContain('PUBLICATION');expect((await diagnostics(page)).fileActors).toBe(0);await expect(page.locator('#output')).toContainText('produces no lines');
});

test('a graphics refusal keeps readable evidence, stepping, and correct numerical output',async({page})=>{
 test.setTimeout(180000);await page.addInitScript(()=>{const native=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,kind:any,...args:any[]){if(String(kind).includes('webgl'))return null;return native.call(this,kind,...args);} as typeof native;});
 await reception(page);await page.fill('#limit','1');await page.check('#executive-hovering');await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-renderer','evidence');await page.click('#run-button');await pause(page);await finishManually(page,60);expect(await page.locator('#output').textContent()).toBe('1\n');await expect(page.locator('#supervision-loading')).toContainText('supplied evidence');
});

test('the office and output share the mobile viewport; reduced motion and long paperwork remain operable',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared visual/accessibility layout covered once per browser.');test.setTimeout(180000);await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await reception(page);await page.selectOption('#display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#companion-list li')).toHaveCount(7);await enable(page);await page.click('#run-button');await pause(page);
 for(let i=0;i<30;i++){if(await next(page)==='PREMISES_CERTIFICATE')break;}
 await page.locator('#mandate-output').evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));
 for(const width of [390,320]){await page.setViewportSize({width,height:width===320?667:844});await page.locator('#mandate-output').evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));const geometry=await page.evaluate(()=>{const a=document.querySelector('#output')!.getBoundingClientRect(),b=document.querySelector('#supervision-stage')!.getBoundingClientRect(),footer=document.querySelector('#discovery-register')!.getBoundingClientRect();return {output:a.top,scene:b.bottom,available:innerHeight-footer.height};});expect(geometry.output).toBeGreaterThanOrEqual(-1);expect(geometry.scene).toBeLessThanOrEqual(geometry.available+1);}
 await page.locator('#supervision-evidence summary').click();await expect(page.locator('#supervision-document')).toHaveAttribute('tabindex','0');await page.locator('#supervision-document').focus();await page.keyboard.press('PageDown');await expect.poll(()=>page.locator('#supervision-document').evaluate(e=>e.scrollTop)).toBeGreaterThan(0);
 await page.evaluate(()=>{for(const rule of ['html{font-size:200% !important}','*{line-height:1.5 !important;letter-spacing:.12em !important;word-spacing:.16em !important}'])document.styleSheets[0].insertRule(rule);});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 const violations=await new AxeBuilder({page}).include('#mandate-output').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();expect(violations.violations).toEqual([]);await page.click('#stop-reading');
});

test('retained replay and personnel specimens obey the scene without new production',async({page})=>{
 test.setTimeout(240000);await reception(page);await page.selectOption('#display-speed','0');await page.fill('#limit','1');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');const original=await audit(page);
 await enable(page);await page.click('#personnel-replay');await pause(page);await finishManually(page,60);await expect(page.locator('#run-status')).toContainText('replay complete');expect(await page.locator('#output').textContent()).toBe('1\n');expect((await audit(page)).journalEntries).toBe(original.journalEntries);
 await page.click('[data-personnel-scenario="zero"]');await pause(page);await finishManually(page,10);await expect(page.locator('#personnel-verdict')).toHaveText('Application rejected');expect((await diagnostics(page)).fileActors).toBe(0);expect(await page.locator('#output').textContent()).toBe('1\n');expect((await audit(page)).journalEntries).toBe(original.journalEntries);
});

test('an exact extended bound can be observed and adjourned without creating retained audit work',async({page})=>{
 test.setTimeout(180000);await reception(page);await enable(page,'9007199254740993');const original=await audit(page);await page.click('#run-button');await pause(page);
 for(let i=0;i<40;i++){await next(page);if((await page.locator('#output').textContent())?.startsWith('1\n'))break;}
 await expect(page.locator('#output')).toHaveText('1\n');await expect(page.locator('#limit')).toHaveValue('9007199254740993');await page.click('#stop-reading');const count=await observed(page);await page.waitForTimeout(200);expect(await observed(page)).toBe(count);expect((await audit(page)).journalEntries).toBe(original.journalEntries);await expect(page.locator('#run-status')).toContainText('Proceedings stopped');
});

test.describe('delayed optional graphics',()=>{
 test.use({serviceWorkers:'block'});
 test('restoring autonomy never waits for a late renderer and the old load releases no numbers',async({page})=>{
  let release!:()=>void;const gate=new Promise<void>(resolve=>{release=resolve;});let requested=false;
  await page.route('**/office-world.js',async route=>{requested=true;await gate;if(!page.isClosed())await route.continue().catch(()=>{});});
  try{
   await reception(page);await page.selectOption('#display-speed','0');await page.fill('#limit','1');await page.check('#executive-hovering');await expect.poll(()=>requested).toBe(true);await page.click('#run-button');await expect(page.locator('#supervision-pause')).toHaveAttribute('aria-disabled','false');await page.click('#supervision-autonomy');
   await expect(page.locator('#run-status')).toContainText('Mandate complete');expect(await page.locator('#output').textContent()).toBe('1\n');release();await page.check('#executive-hovering');await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered','true');expect(await page.locator('#output').textContent()).toBe('1\n');
  }finally{release();}
 });
});
