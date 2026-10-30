import {test, expect, type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
// These DOM tests mock fixtures; offline cache behavior has its own lifecycle suite.
test.use({serviceWorkers:'block'});
const routes = ['', 'api/', 'company-history/', 'changelog/', 'continuity-register/', 'validation/', 'response/', 'accessibility/'];
async function audit(page: Page) {
  const result = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze();
  expect(result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
}
test.beforeEach(({}, info) => {test.skip(info.project.metadata.engine === 'js', 'DOM accessibility is covered once per browser; lifecycle tests cover both Java engines.');});
for (const route of routes) {
  test(`accessible shared reception and reflow: /${route}`, async({page, browserName})=>{
    await page.goto(`/${route}`);
    if(route === 'api/') await expect(page.locator('#api-total')).toContainText('ratified operations');
    if(route === '') await expect(page.locator('#health-value')).toHaveText('LIVE');
    if(route === 'response/') await expect(page.locator('#response-status')).toContainText('Response received');
    const nav = page.getByRole('navigation',{name:'Primary navigation',exact:true});
    expect(await nav.getByRole('link').allTextContents()).toEqual(['Live demo','Operations','API charter','Company History','About','Validation tribunal']);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('#runtime-status, #offline-status')).toHaveCount(0);
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
    await expect(page.getByRole('link',{name:'Skip to main content'})).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
    await audit(page);
    await page.setViewportSize({width:320,height:800});
    await audit(page);
    // 320 CSS pixels approximates 400% zoom on a 1280px desktop. Also enlarge text 200%.
    await page.evaluate(()=>{
      const sheet = document.styleSheets[0];
      for(const rule of ['html {font-size:200% !important}', '* {line-height:1.5 !important; letter-spacing:.12em !important; word-spacing:.16em !important;}', 'p {margin-bottom:2em !important;}']) sheet.insertRule(rule, sheet.cssRules.length);
    });
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    if(route === 'company-history/') {
      await expect(page.getByRole('link',{name:'Read the changelog',exact:true})).toBeVisible();
      await expect(page.getByRole('link',{name:'Read the continuity register',exact:true})).toBeVisible();
    }
  });
}
test('keyboard reading controls preserve focus, pause output and allow immediate completion',async({page})=>{
  await page.goto('/'); await expect(page.locator('#health-value')).toHaveText('LIVE');
  await page.fill('#limit','100');
  await page.locator('#run-button').focus(); await page.keyboard.press('Enter');
  await expect(page.locator('#output-count')).toContainText('of 100');
  await expect(page.locator('#run-button')).toBeFocused();
  await page.locator('#pause-reading').focus(); await page.keyboard.press('Enter');
  await expect(page.locator('#run-status')).toContainText('paused');
  const pausedOutput = await page.locator('#output').textContent();
  await page.waitForTimeout(2000);
  expect(await page.locator('#output').textContent()).toBe(pausedOutput);
  await expect(page.locator('#pause-reading')).toBeFocused();
  await audit(page);
  await page.keyboard.press('Enter');
  await expect(page.locator('#run-status')).toContainText('resumed');
  await page.locator('#follow-output').uncheck();
  await page.locator('#reveal-all').focus(); await page.keyboard.press('Enter');
  await expect(page.locator('#run-status')).toContainText('All 100 lines are visible');
  expect(await page.locator('#output').evaluate(e=>e.scrollTop)).toBe(0);
  await expect(page.locator('#reveal-all')).toBeFocused();
  await page.check('#follow-output');
  expect(await page.locator('#output').evaluate(e=>e.scrollTop+e.clientHeight>=e.scrollHeight-2)).toBe(true);
  await page.fill('#limit','-1');await page.click('#run-button');
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
  await page.fill('#api-search','nonexistent committee');
  await expect(page.locator('#api-status')).toContainText('0 of');
  await expect(page.locator('#api-sections a:visible')).toHaveCount(0);
});
test('reduced motion and forced colors preserve keyboard focus and controls',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce',forcedColors:'active'});
  await page.goto('/');
  expect(await page.locator('html').evaluate(e=>getComputedStyle(e).scrollBehavior)).toBe('auto');
  await page.locator('#run-button').focus();
  expect(await page.locator('#run-button').evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
  await expect(page.locator('#run-button')).toBeVisible();
});
test('validation rehearsal announces its result and reveals a named evidence region',async({page})=>{
  // A short known JVM specimen tests presentation; the separate parity suite covers every limit.
  await page.route('**/validation/fixtures.json',route=>route.fulfill({json:[{path:'/fizzbuzz?limit=3',status:200,body:'1\n2\nFizz\n'}]}));
  await page.goto('/validation/');
  await expect(page.locator('#report-status')).toContainText('loaded');
  await page.locator('#rehearse').focus();await page.keyboard.press('Enter');
  await expect(page.locator('#verdict')).toContainText('1 bundled JVM fixtures matched');
  await expect(page.locator('#rehearsal-output')).toBeVisible();
  await expect(page.locator('#rehearse')).toBeFocused();
  await audit(page);
});
