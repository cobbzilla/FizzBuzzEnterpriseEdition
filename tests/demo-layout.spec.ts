import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {department} from './demo-controls';

async function ready(page:Page){await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');}
async function run(page:Page,limit='15',hover=false){await department(page,'authorize');await page.fill('#limit',limit);await page.uncheck('#authorize-executive-hovering');await page.selectOption('#authorize-display-speed',hover?'225':'0');await page.locator('#authorize-executive-hovering').setChecked(hover);await page.click('#run-button');await expect(page.locator('body')).toHaveAttribute('data-desk','observe');}
async function custody(page:Page){return page.evaluate(async()=>{const m=await import(new URL('/assets/tribunal.js',location.href).href),client=new m.BrowserRuntimeClient();try{return await(await client.request('/audit/evidence')).json();}finally{client.close();}});}
async function pause(page:Page){await expect(page.locator('#supervision-pause')).toHaveAttribute('aria-disabled','false');await page.locator('#supervision-pause').focus();if(await page.locator('#supervision-pause').getAttribute('aria-pressed')==='false')await page.keyboard.press('Space');}

test('five addressable departments separate authorization from observation without submitting on navigation',async({page})=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));await ready(page);
 expect(await page.getByRole('navigation',{name:'Demo departments'}).getByRole('link').allTextContents()).toEqual(['Authorize','Observe','Experiment','Facilities','Evidence']);
 await department(page,'observe');await expect(page.locator('#observe-empty')).toBeVisible();await expect(page.locator('#observe-title')).toBeFocused();expect((await custody(page)).journalEntries).toBe(0);
 await department(page,'authorize');await run(page);await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#display-speed')).toHaveValue('0');await expect(page.locator('#observe-title')).toBeFocused();await expect(page.locator('#output')).toHaveText('1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n');expect((await custody(page)).journalEntries).toBe(15);
 for(const [hash,desk]of [['#precedent-case','evidence'],['#premises-result','experiment'],['#office-tour','facilities']]){await page.goto('/demo/'+hash);await expect(page.locator('body')).toHaveAttribute('data-desk',desk);await page.getByRole('link',{name:'Skip to main content'}).focus();await page.keyboard.press('Enter');await page.evaluate(()=>new Promise<void>(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r()))));await expect(page.locator('main')).toBeFocused();await expect(page.locator('body')).toHaveAttribute('data-desk',desk);}
 expect((await custody(page)).journalEntries).toBe(15);expect(errors).toEqual([]);
});
test('draft changes, navigation, browser history and resume retain one paused mandate',async({page})=>{
 await ready(page);await page.fill('#limit','100');await page.selectOption('#authorize-display-speed','225');await page.click('#run-button');await expect(page.locator('#output-count')).toContainText('of 100');
 await department(page,'authorize');const held=await page.locator('#output').textContent(),before=await custody(page);await page.fill('#limit','999');await page.selectOption('#authorize-companion-strategy','ordinal-constellation-v1');await page.waitForTimeout(500);expect(await page.locator('#output').textContent()).toBe(held);await expect(page.locator('#companion-strategy')).toHaveValue('factor-resonance-v1');
 await page.goBack();await expect(page.locator('body')).toHaveAttribute('data-desk','observe');await expect(page.locator('#pause-reading')).toHaveText('Resume');expect((await custody(page)).headDigest).toBe(before.headDigest);
 await department(page,'authorize');await page.click('#resume-current');await expect(page.locator('#observed-mandate')).toHaveText('Mandate 100');await expect(page.locator('#pause-reading')).toHaveText('Pause');await page.click('#stop-reading');
});
test('all Watch arrangements share the same evidence and companion biography pauses the presentation',async({page})=>{
 await ready(page);await run(page);await expect(page.locator('#companion-list li')).toHaveCount(7);const before=await custody(page);
 for(const view of ['output','companions','commentary','overview']){await page.selectOption('#watch-view',view);await expect(page.locator('#mandate-output')).toHaveAttribute('data-watch-view',view);}
 await expect(page.locator('#spotlight-open')).toBeEnabled();await page.click('#spotlight-open');await expect(page.locator('#companion-dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('#spotlight-open')).toBeFocused();
 await page.selectOption('#watch-view','commentary');await expect(page.locator('#chronicle-scroll')).toBeVisible();await page.locator('#chronicle-scroll').evaluate(e=>e.scrollTop=0);const position=await page.locator('#chronicle-scroll').evaluate(e=>e.scrollTop);await department(page,'evidence');await expect(page.locator('#chronicle-scroll')).toBeVisible();expect(await page.locator('#chronicle-scroll').evaluate(e=>e.scrollTop)).toBe(position);expect((await custody(page)).headDigest).toBe(before.headDigest);
});
test('experiments own their results and leave production personnel, output and custody intact',async({page})=>{
 await ready(page);await run(page);await expect(page.locator('#run-status')).toContainText('Mandate complete');const output=await page.locator('#output').textContent(),origin=await page.locator('#personnel-origin').textContent(),before=await custody(page);
 await department(page,'experiment');await page.selectOption('#experiment-speed','0');await page.click('[data-personnel-scenario=two]');await expect(page.locator('#experiment-status')).toContainText('rehearsal rejected');await expect(page.locator('#experiment-personnel-verdict')).toHaveText('Application rejected');expect(await page.locator('#personnel-origin').textContent()).toBe(origin);expect(await page.locator('#output').textContent()).toBe(output);
 await page.selectOption('#experiment-view','precedent');await page.selectOption('#experiment-precedent-scenario','missing-line');await page.click('#experiment-precedent-submit');await expect(page.locator('#experiment-precedent-status')).toContainText('Reuse rejected');expect((await custody(page)).headDigest).toBe(before.headDigest);
 await page.selectOption('#experiment-view','premises');await page.selectOption('#premises-scenario','bell');await page.click('#premises-submit');await expect(page.locator('#premises-result')).toContainText('U+0007');expect((await custody(page)).headDigest).toBe(before.headDigest);
});
test('the supervised clock advances through selected views without requiring a visible GPU canvas',async({page})=>{
 await ready(page);await run(page,'1',true);await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered','true',{timeout:60000});await pause(page);await page.selectOption('#watch-view','output');const before=Number(await page.locator('#supervision-pane').getAttribute('data-observed-steps'));await page.click('#supervision-next');await expect.poll(async()=>Number(await page.locator('#supervision-pane').getAttribute('data-observed-steps')),{timeout:15000}).toBeGreaterThan(before);await expect(page.locator('#watch-output')).toBeVisible();await expect(page.locator('#supervision-pane')).toBeHidden();const event=JSON.parse((await page.locator('#supervision-document').textContent())!);await expect(page.locator('#run-status')).toContainText(event.office);await page.click('#stop-reading');
});
test('Watch fits short portrait and landscape screens and keeps the selected stage usable',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared layout covered once per browser.');await ready(page);await run(page);await expect(page.locator('#run-status')).toContainText('Mandate complete');await run(page,'1',true);await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered','true',{timeout:60000});await pause(page);
 for(const [width,height]of [[390,844],[320,568],[844,390],[1440,1000]]){
  await page.setViewportSize({width,height});await page.selectOption('#watch-view',width<=700||height<500?'office':'overview');
  await expect.poll(async()=>page.locator('#desk-observe').evaluate(e=>e.getBoundingClientRect().bottom<=document.querySelector('#discovery-register')!.getBoundingClientRect().top)).toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1&&document.documentElement.scrollHeight<=innerHeight+1)).toBe(true);
  const scene=(await page.locator('#supervision-stage').boundingBox())!,transport=(await page.locator('.watch-transport').boundingBox())!,footer=(await page.locator('#discovery-register').boundingBox())!;
  expect(scene.height).toBeGreaterThan(70);expect(transport.y+transport.height).toBeLessThanOrEqual(footer.y);expect(scene.y+scene.height).toBeLessThanOrEqual(transport.y);
 }
 await page.click('#stop-reading');
});
test('all five desks and enlarged Watch retain keyboard-accessible, readable content',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared accessibility covered once per browser.');await ready(page);await run(page);await expect(page.locator('#run-status')).toContainText('Mandate complete');
 for(const desk of ['authorize','observe','experiment','facilities','evidence']){await department(page,desk);const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();expect(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);}
 await department(page,'observe');await page.setViewportSize({width:320,height:568});await page.evaluate(()=>{for(const rule of ['html {font-size:200% !important}','* {line-height:1.5 !important;letter-spacing:.12em !important;word-spacing:.16em !important}'])document.styleSheets[0].insertRule(rule);});await expect(page.locator('body')).toHaveAttribute('data-expanded-text','true');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await page.locator('#stop-reading').scrollIntoViewIfNeeded();await expect(page.locator('#stop-reading')).toBeInViewport();
});
test('enlarged text leaves footer links unobscured and gives the office meaningful space',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared enlarged layout covered once per browser.');await ready(page);await run(page);await expect(page.locator('#run-status')).toContainText('Mandate complete');await page.setViewportSize({width:320,height:568});await department(page,'authorize');const ordinaryBack=page.locator('.site-footer a[href="#main"]');await ordinaryBack.focus();await ordinaryBack.scrollIntoViewIfNeeded();await expect.poll(()=>ordinaryBack.evaluate(e=>{const r=e.getBoundingClientRect(),target=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return !!target&&(target===e||e.contains(target));})).toBe(true);await department(page,'observe');await page.evaluate(()=>{for(const rule of ['html{font-size:200% !important}','*{line-height:1.5 !important;letter-spacing:.12em !important;word-spacing:.16em !important}'])document.styleSheets[0].insertRule(rule);});await expect(page.locator('body')).toHaveAttribute('data-expanded-text','true');
 await department(page,'authorize');const back=page.locator('.site-footer a[href="#main"]');await back.focus();await back.scrollIntoViewIfNeeded();await expect.poll(()=>back.evaluate(e=>{const r=e.getBoundingClientRect(),target=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return !!target&&(target===e||e.contains(target));})).toBe(true);
 await page.fill('#limit','1');await page.check('#authorize-executive-hovering');await page.click('#run-button');await expect(page.locator('#watch-view')).toHaveValue('office');expect((await page.locator('#supervision-stage').boundingBox())!.height).toBeGreaterThan(200);await page.click('#stop-reading');await expect(page.locator('#run-status')).toContainText('Proceedings stopped');
});
test('all companion and office combinations reclaim space and disabled Roll Call never leaves an empty view',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared feature combinations covered once per browser.');await page.setViewportSize({width:320,height:568});await ready(page);
 for(const [office,companions]of [[false,false],[false,true],[true,false],[true,true]]){
  await department(page,'authorize');await page.locator('#authorize-emoji-companions').setChecked(companions);await run(page,'3',office);
  if(office){await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered','true',{timeout:60000});await pause(page);}else await expect(page.locator('#run-status')).toContainText('Mandate complete');
  const principal=page.locator(office?'#supervision-stage':'#output');expect((await principal.boundingBox())!.height).toBeGreaterThan(70);await expect(page.locator('#companion-spotlight')).toBeVisible({visible:companions});
  if(office)await page.click('#stop-reading');
 }
 await page.selectOption('#watch-view','companions');await page.click('#watch-settings-toggle');await page.uncheck('#require-companion-roll-call');await page.click('#watch-settings-close');await expect(page.locator('#watch-view')).toHaveValue('output');await expect(page.locator('#companion-roll')).toBeHidden();await expect(page.locator('#watch-output')).toBeVisible();
});
