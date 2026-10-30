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
    if (url.origin === origin && /^\/(fizzbuzz|healthz|readyz|audit|operations|capacity|cache|procurement)(\/|\?|$)/.test(url.pathname)) businessRequests.push(url.pathname);
   });
   await page.goto(origin + '/');
   await expect(page.locator('#health-value')).toHaveText('LIVE');
   await page.selectOption('#display-speed', '0');
   await page.click('#run-button');
   await expect(page.locator('#run-status')).toContainText('Mandate complete');
   const expected = Array.from({length: 15}, (_, i) => (i + 1) % 15 === 0 ? 'FizzBuzz' : (i + 1) % 3 === 0 ? 'Fizz' : (i + 1) % 5 === 0 ? 'Buzz' : String(i + 1));
   assert.deepEqual((await page.locator('#output').textContent())?.trim().split('\n'), expected);
   await page.click('#run-button');
   await expect(page.locator('#cache-result')).toHaveText('HIT');
   await page.fill('#limit','1001');await page.click('#run-button');
   await expect(page.locator('#run-status')).toContainText('Mandate complete. 1001 lines disclosed');
   await page.fill('#limit','9007199254740993');await expect(page.locator('#magnitude-warning')).toBeVisible();
   await page.click('#run-button');await expect(page.locator('#output-count')).toContainText('of 9007199254740993 lines');
   await page.click('#stop-reading');await expect(page.locator('#run-status')).toContainText('Proceedings stopped');
   await page.click('#procurement-button');
   await expect(page.locator('#procurement-status')).toContainText('8 separate line items');
   await expect(page.locator('#procurement-items li')).toHaveCount(8);
   await page.click('#canary-button');
   await expect(page.locator('#canary-value')).toHaveText('APPROVED');
   await page.click('#recovery-button');
   await expect(page.locator('#recovery-value')).toHaveText('COPY MATCHED');
   await page.waitForFunction(() => !!navigator.serviceWorker.controller, null, {timeout: 120000});
   for (const route of ['api', 'company-history', 'changelog', 'continuity-register', 'accessibility', 'validation', 'response']) {
    await page.goto(`${origin}/${route}/`);
    await expect(page.locator('main h1')).toHaveCount(1);
    if (route === 'api') await expect(page.locator('#api-total')).toContainText('ratified operations');
   }
   await context.setOffline(true);
   await page.goto(origin + '/');
   await expect(page.locator('#health-value')).toHaveText('LIVE');
   await page.selectOption('#display-speed', '0');
   await page.fill('#limit', '16');
   await page.click('#run-button');
   await expect(page.locator('#run-status')).toContainText('Mandate complete');
   assert.equal((await page.locator('#output').textContent())?.trim().split('\n').at(-1), '16');
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
