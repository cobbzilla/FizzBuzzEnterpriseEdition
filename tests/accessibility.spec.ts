import {demoControl,demoAction} from './demo-controls';
import {test, expect, type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import axe from 'axe-core';
// These DOM tests mock fixtures; offline cache behavior has its own lifecycle suite.
test.use({serviceWorkers:'block'});
const routes = ['', 'demo/', 'bestiary/', 'department-of-improbable-appointments/', 'api/', 'about/', 'company-history/', 'changelog/', 'continuity-register/', 'validation/', 'response/', 'accessibility/'];
const tags=['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice'];
const archiveRules=axe.getRules(tags).map(rule=>rule.ruleId).filter(rule=>rule!=='color-contrast');
if(archiveRules.length<=50)throw new Error('Archive accessibility rule inventory is incomplete');
async function audit(page: Page) {
  const result=await new AxeBuilder({page}).options({resultTypes:['violations','incomplete']}).withTags(tags).analyze();
  expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
}
test.beforeEach(({}, info) => {test.skip(info.project.metadata.engine === 'js', 'DOM accessibility is covered once per browser; lifecycle tests cover both Java engines.');});
// A fresh test context per batch prevents the 3,200-row axe trees accumulating.
// The guarded isolated runner also retires the entire browser between batches.
for(const width of [1280,320])for(let start=0;start<archiveRules.length;start+=8){
 const rules=archiveRules.slice(start,start+8);
 test(`complete archive accessibility at ${width}px: ${rules.join(', ')}`,async({page})=>{
  test.setTimeout(90000);await page.setViewportSize({width,height:800});
  await page.goto('/department-of-improbable-appointments/');
  await expect(page.locator('#rarity-status')).toContainText('All 3,200');
  await expect(page.locator('#rarity-rows tr')).toHaveCount(3200);
  // Legacy single-document execution avoids intermediate cross-frame node copies.
  expect(page.frames()).toHaveLength(1);
  const result=await new AxeBuilder({page}).setLegacyMode().options({resultTypes:['violations','incomplete']}).withRules(rules).analyze();
  expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
 });
}
// Contrast retains rendered geometry for every inspected text node. Keep all
// rows rendered, but partition inspected rows so narrow-screen scans stay bounded.
for(const width of [1280,320])for(const start of [-1,0,400,800,1200,1600,2000,2400,2800]){
 test(`archive contrast at ${width}px: ${start<0?'page chrome':`rows ${start+1}–${start+400}`}`,async({page})=>{
  await page.setViewportSize({width,height:800});await page.goto('/department-of-improbable-appointments/');
  await expect(page.locator('#rarity-status')).toContainText('All 3,200');await expect(page.locator('#rarity-rows tr')).toHaveCount(3200);expect(page.frames()).toHaveLength(1);
  let builder=new AxeBuilder({page}).setLegacyMode().options({resultTypes:['violations','incomplete']}).withRules(['color-contrast']);
  if(start<0)builder=builder.exclude('#rarity-rows');
  else{const selector=`#rarity-rows > tr:nth-child(n+${start+1}):nth-child(-n+${start+400})`;await expect(page.locator(selector)).toHaveCount(400);builder=builder.include(selector);}
  const result=await builder.analyze();expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
 });
}
for (const route of routes) for(const registerWidth of route === 'department-of-improbable-appointments/'?[1280,320]:[undefined]) {
  test(`accessible shared reception and reflow: /${route}${registerWidth?` (${registerWidth}px)`:''}`, async({page, browserName})=>{
    // Archive rule batches run above; retain its navigation and reflow checks here.
    if(registerWidth){test.setTimeout(180000);await page.setViewportSize({width:registerWidth,height:800});}
    await page.goto(`/${route}`);
    if(route === 'bestiary/')await expect(page.locator('#bestiary-status')).toContainText('3200 companions');
    if(route === 'department-of-improbable-appointments/')await expect(page.locator('#rarity-status')).toContainText('All 3,200');
    if(route === 'api/') await expect(page.locator('#api-total')).toContainText('ratified operations');
    if(route === '') await expect(page.locator('#operations-health-value')).toHaveText('LIVE');
    if(route === 'response/') await expect(page.locator('#response-status')).toContainText('Response received');
    const nav = page.getByRole('navigation',{name:'Primary navigation',exact:true});
    expect(await nav.getByRole('link').allTextContents()).toEqual(['Live demo','Operations','API charter','About','Validation tribunal']);
    await expect(page.locator('main h1:visible')).toHaveCount(1);
    await expect(page.locator('#runtime-status, #offline-status')).toHaveCount(0);
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
    await expect(page.getByRole('link',{name:'Skip to main content'})).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
    if(!registerWidth){await audit(page);await page.setViewportSize({width:320,height:800});await audit(page);}
    // 320 CSS pixels approximates 400% zoom on a 1280px desktop. Also enlarge text 200%.
    await page.evaluate(()=>{
      const sheet = document.styleSheets[0];
      for(const rule of ['html {font-size:200% !important}', '* {line-height:1.5 !important; letter-spacing:.12em !important; word-spacing:.16em !important;}', 'p {margin-bottom:2em !important;}']) sheet.insertRule(rule, sheet.cssRules.length);
    });
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    if((route === 'about/'||route === 'company-history/')) {
      await expect(page.getByRole('link',{name:'Read the changelog',exact:true})).toBeVisible();
      await expect(page.getByRole('link',{name:'Read the continuity register',exact:true})).toBeVisible();
    }
  });
}
test('keyboard reading controls preserve focus, pause output and allow immediate completion',async({page})=>{
  await page.goto('/demo/'); await expect(page.locator('#health-value')).toHaveText('LIVE');
  await demoAction(page,'fill','#limit','100');
  await demoAction(page,'selectOption','#display-speed','225');
  await (await demoControl(page,'#run-button')).focus(); await page.keyboard.press('Enter');
  await expect(page.locator('#output-count')).toContainText('of 100');
  await expect(page.locator('#observe-title')).toBeFocused();
  await (await demoControl(page,'#pause-reading')).focus(); await page.keyboard.press('Enter');
  await expect(page.locator('#run-status')).toContainText('paused');
  const pausedOutput = await page.locator('#output').textContent();
  await page.waitForTimeout(2000);
  expect(await page.locator('#output').textContent()).toBe(pausedOutput);
  await expect(page.locator('#pause-reading')).toBeFocused();
  await audit(page);
  await page.keyboard.press('Enter');
  await expect(page.locator('#run-status')).toContainText('resumed');
  await (await demoControl(page,'#follow-output')).uncheck();
  // Choose a reading position explicitly; paced disclosure may already have scrolled before pause.
  await (await demoControl(page,'#output')).focus(); await page.keyboard.press('Home');
  await expect.poll(()=>page.locator('#output').evaluate(e=>e.scrollTop)).toBe(0);
  await (await demoControl(page,'#reveal-all')).focus(); await page.keyboard.press('Enter');
  await expect(page.locator('#run-status')).toContainText('All 100 lines are visible');
  expect(await page.locator('#output').evaluate(e=>e.scrollTop)).toBe(0);
  await expect(page.locator('#reveal-all')).toBeFocused();
  await demoAction(page,'check','#follow-output');
  expect(await page.locator('#output').evaluate(e=>e.scrollTop+e.clientHeight>=e.scrollHeight-2)).toBe(true);
  await demoAction(page,'fill','#limit','-1');await demoAction(page,'click','#run-button');
  await expect(page.locator('#limit')).toBeFocused();
  await expect(page.locator('#limit')).toHaveAttribute('aria-invalid','true');
  await audit(page);
});
test('expanded API schemas, invalid parameters, filtering and response regions',async({page})=>{
  await page.goto('/api/');await expect(page.locator('#api-total')).toContainText('ratified operations');
  await page.locator('details').evaluateAll(nodes=>nodes.forEach(n=>(n as HTMLDetailsElement).open=true));
  await audit(page);
  const desk=page.locator('.api-try').filter({has:page.locator('input')}).first();
  await desk.locator('input').fill('-1');await desk.getByRole('button').click();
  await expect(desk.locator('input')).toBeFocused();
  await expect(desk.locator('input')).toHaveAttribute('aria-invalid','true');
  await expect(desk.locator('input')).toHaveAccessibleDescription('Enter a whole number from 0 through 1000.');
  await desk.locator('input').fill('3');await desk.getByRole('button').click();
  await expect(desk.getByRole('status')).toContainText('HTTP 200');
  await expect(desk.locator('input')).not.toHaveAttribute('aria-invalid','true');
  await audit(page);
  await page.setViewportSize({width:320,height:800});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await demoAction(page,'fill','#api-search','nonexistent committee');
  await expect(page.locator('#api-status')).toContainText('0 of');
  await expect(page.locator('#api-sections a:visible')).toHaveCount(0);
});
test('reduced motion and forced colors preserve keyboard focus and controls',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce',forcedColors:'active'});
  await page.goto('/demo/');
  expect(await page.locator('html').evaluate(e=>getComputedStyle(e).scrollBehavior)).toBe('auto');
  await (await demoControl(page,'#run-button')).focus();
  expect(await page.locator('#run-button').evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
  await expect(page.locator('#run-button')).toBeVisible();
});
test('validation rehearsal announces its result and reveals a named evidence region',async({page})=>{
  // A short known JVM specimen tests presentation; the separate parity suite covers every limit.
  await page.route('**/validation/fixtures.json',route=>route.fulfill({json:[{path:'/fizzbuzz?limit=3',status:200,body:'1\n2\nFizz\n'}]}));
  await page.goto('/validation/');
  await expect(page.locator('#report-status')).toContainText('loaded');
  await (await demoControl(page,'#rehearse')).focus();await page.keyboard.press('Enter');
  await expect(page.locator('#verdict')).toContainText('1 bundled JVM fixtures matched');
  await expect(page.locator('#rehearsal-output')).toBeVisible();
  await expect(page.locator('#rehearse')).toBeFocused();
  await audit(page);
});
