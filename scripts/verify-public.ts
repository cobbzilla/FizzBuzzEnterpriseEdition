import {verifyAnalytics} from './verify-analytics.ts';
import assert from 'node:assert/strict';
import {chromium, firefox, webkit, expect} from '@playwright/test';

/** Exercise the deployed artifact, including HTTPS, CSP and real service workers. */
export async function verifyPublic(origin: string, revision: string) {
 const get = async (path: string) => {
  const response = await fetch(origin + path, {signal: AbortSignal.timeout(30000)});
  assert.equal(response.status, 200, path);
  return response.json();
 };
 const release = await get('/release.json');
 assert.equal(release.revision, revision);
 assert.equal(release.dirty, false);
 const evidence = await get('/validation/report.json');
 assert.equal(evidence.revision, revision);
 assert.equal(evidence.status, 'PASSED');
 assert.equal(evidence.browserLifecycle.status, 'PASSED');
 const config = await get('/runtime-config.json');
 assert.equal(config.mode, 'browser');
 assert.equal(config.apiBaseUrl, '');
 const missing = await fetch(origin + '/definitely-missing.html');
 assert.equal(missing.status, 404);
 const redirect = await fetch(origin + '/api?review=public', {redirect: 'manual'});
 assert.equal(redirect.status, 308);
 assert.equal(redirect.headers.get('location'), origin + '/api/?review=public');
 const head = await fetch(origin + '/sw.js', {method: 'HEAD'});
 assert.equal(head.status, 200);
 assert.equal(head.headers.get('cache-control'), 'no-cache');

 for (const engine of [chromium, firefox, webkit]) {
  const browser = await engine.launch();
  try {
   const context = await browser.newContext();
   const page = await context.newPage();
   page.setDefaultTimeout(60000);
   const businessRequests: string[] = [];
   page.on('request', request => {
    const url = new URL(request.url());
    if (url.origin === origin && /^\/(fizzbuzz|healthz|readyz|audit|operations|capacity|cache|procurement|onboarding|precedent)(\/|\?|$)/.test(url.pathname)) businessRequests.push(url.pathname);
   });
   await page.goto(origin + '/demo/');
   await expect(page.locator('#health-value')).toHaveText('LIVE');
   const stylesheet = new URL(await page.locator('link[rel=stylesheet]').first().getAttribute('href') || '', page.url());
   assert.equal(stylesheet.pathname, '/' + config.assets + 'site.css', 'Page must use its release-specific stylesheet');
   const spacing = await page.evaluate(() => ({padding:parseFloat(getComputedStyle(document.querySelector('#mandate-output')!).paddingLeft),gap:parseFloat(getComputedStyle(document.querySelector('.demo-workspace')!).rowGap)}));
   assert.ok(spacing.padding >= 22 && spacing.gap >= 32, 'Published demo must retain its output padding and advisory spacing');
   await page.selectOption('#display-speed', '0');
   const chronicleHeight=await page.locator('#chronicle-scroll').evaluate(element=>element.clientHeight);
   await page.click('#run-button');
   await expect(page.locator('#run-status')).toContainText('Mandate complete');
   await expect(page.locator('#personnel-verdict')).toHaveText('Approved to start at 1');
   await expect(page.locator('#chronicle-entries')).toContainText('One has reported for duty');
   await expect(page.locator('#chronicle-entries')).toContainText('4 separately certified z’s');
   assert.equal(await page.locator('#chronicle-scroll').evaluate(element=>element.clientHeight),chronicleHeight);
   await expect.poll(()=>page.locator('#chronicle-scroll').evaluate(element=>Math.abs(element.scrollTop+element.clientHeight-element.scrollHeight)<3)).toBe(true);
   const chronicle=page.locator('#chronicle-scroll');
   await chronicle.hover();await page.mouse.wheel(0,-260);
   await expect.poll(()=>chronicle.evaluate(element=>element.scrollHeight-element.clientHeight-element.scrollTop>50)).toBe(true);
   await page.setViewportSize({width:1100,height:800});
   await page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
   assert.ok(await chronicle.evaluate(element=>element.scrollHeight-element.clientHeight-element.scrollTop>50),'Reading earlier minutes must survive layout changes without being pulled to the bottom');
   await chronicle.focus();await page.keyboard.press('End');
   await expect.poll(()=>chronicle.evaluate(element=>Math.abs(element.scrollTop+element.clientHeight-element.scrollHeight)<3)).toBe(true);
   const expected = Array.from({length: 15}, (_, i) => (i + 1) % 15 === 0 ? 'FizzBuzz' : (i + 1) % 3 === 0 ? 'Fizz' : (i + 1) % 5 === 0 ? 'Buzz' : String(i + 1));
   assert.deepEqual((await page.locator('#output').textContent())?.trim().split('\n'), expected);
   await page.click('#run-button');
   await expect(page.locator('#cache-result')).toHaveText('HIT');
   await expect(page.locator('#personnel-origin')).toHaveText('Institutional memory answered. No new HR proceedings.');
   await expect(page.locator('#chronicle-entries')).toContainText('No fresh recruitment');
   await expect(page.locator('#precedent-status')).toContainText('Certificate of Authorized Non-Performance issued for 15 lines');
   await expect(page.locator('#precedent-steps li')).toHaveCount(5);
   assert.ok((await page.locator('#precedent-scenario').boundingBox())!.height>=48,'Court selector must retain its accessible native control height');
   await page.selectOption('#precedent-scenario','lowercase-fizz');await page.click('#precedent-submit');
   await expect(page.locator('#precedent-status')).toContainText('Reuse rejected by Independent Lexical Bench');
   await page.click('#precedent-latest');await expect(page.locator('#precedent-status')).toContainText('Reuse approved');
   await page.click('[data-personnel-scenario="zero"]');await expect(page.locator('#personnel-verdict')).toHaveText('Application rejected');
   await expect(page.locator('#personnel-status')).toContainText('Identity Office');
   await page.fill('#limit','1001');await page.click('#run-button');
   await expect(page.locator('#run-status')).toContainText('Mandate complete. 1001 lines disclosed');
   await page.fill('#limit','9007199254740993');await expect(page.locator('#magnitude-warning')).toBeVisible();
   await page.click('#run-button');await expect(page.locator('#output-count')).toContainText('of 9007199254740993 lines');
   await page.click('#stop-reading');await expect(page.locator('#run-status')).toContainText('Proceedings stopped');
   await page.goto(origin+'/#operations');
   await page.click('#procurement-button');
   await expect(page.locator('#procurement-status')).toContainText('8 separate line items');
   await expect(page.locator('#procurement-items li')).toHaveCount(8);
   await page.click('#canary-button');
   await expect(page.locator('#canary-value')).toHaveText('APPROVED');
   await page.click('#recovery-button');
   await expect(page.locator('#recovery-value')).toHaveText('COPY MATCHED');
   await page.waitForFunction(() => !!navigator.serviceWorker.controller, null, {timeout: 120000});
   for (const route of ['demo', 'api', 'company-history', 'changelog', 'continuity-register', 'accessibility', 'validation', 'response']) {
    await page.goto(`${origin}/${route}/`);
    await expect(page.locator('main h1')).toHaveCount(1);
    if (route === 'api') await expect(page.locator('#api-total')).toContainText('ratified operations');
    if (route === 'company-history') await expect(page.getByRole('heading',{name:'Confounding the courage to convene'})).toBeVisible();
   }
   await context.setOffline(true);
   await page.goto(origin + '/demo/');
   await expect(page.locator('#health-value')).toHaveText('LIVE');
   await page.selectOption('#display-speed', '0');
   await page.fill('#limit', '16');
   await page.click('#run-button');
   await expect(page.locator('#run-status')).toContainText('Mandate complete');
   await page.click('[data-personnel-scenario="missing-induction"]');await expect(page.locator('#personnel-verdict')).toHaveText('Application rejected');
   await expect(page.locator('#personnel-status')).toContainText('Probation Review');
   assert.equal((await page.locator('#output').textContent())?.trim().split('\n').at(-1), '16');
   await page.selectOption('#precedent-scenario','wrong-mandate');await page.click('#precedent-submit');
   await expect(page.locator('#precedent-status')).toContainText('Reuse rejected by Mandate Jurisdiction Chamber');
   await page.goto(origin+'/#operations');
   await page.click('#procurement-button');
   await expect(page.locator('#procurement-status')).toContainText('8 separate line items');
   await page.goto(origin + '/api/');
   await expect(page.locator('#api-total')).toContainText('ratified operations');
   assert.deepEqual(businessRequests, []);
   console.log(`${engine.name()}: public runtime, cache, recovery, navigation and offline execution passed.`);
  } finally {
   await browser.close();
  }
 }
 if ((await get('/analytics-config.json')).enabled) await verifyAnalytics(origin, revision);
}
