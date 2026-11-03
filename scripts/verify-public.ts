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
 const license=await fetch(origin+'/unicode-license.txt');assert.equal(license.status,200);assert.match(license.headers.get('content-type')||'',/text\/plain/);assert.ok((await license.text()).includes('UNICODE LICENSE V3'));
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
    if (url.origin === origin && /^\/(fizzbuzz|healthz|readyz|audit|operations|capacity|cache|procurement|onboarding|precedent|companions|premises)(\/|\?|$)/.test(url.pathname)) businessRequests.push(url.pathname);
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
   await expect(page.locator('#chronicle-entries [data-premises-ordinal="7"]')).toContainText('U+00A0');
   await expect(page.locator('#chronicle-entries [data-premises-ordinal="14"]')).toContainText('U+000A');
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
   await expect(page.locator('#companion-list li')).toHaveCount(7);
   await expect(page.locator('#discovery-list li')).toHaveCount(5);
   const bioOpener=page.locator('#companion-list button').first(),bio=page.locator('#companion-dialog');
   await bioOpener.click();await expect(bio.getByRole('button',{name:'Close companion file'})).toBeVisible();assert.equal(new URL(await page.locator('#companion-share-link').inputValue()).searchParams.get('limit'),'15');await bio.getByRole('button',{name:'Close companion file'}).click();await expect(bio).not.toBeVisible();await expect(bioOpener).toBeFocused();
   await bioOpener.click();await page.mouse.click(4,4);await expect(bio).not.toBeVisible();await expect(bioOpener).toBeFocused();
   await page.selectOption('#companion-strategy','ordinal-constellation-v1');
   await expect(page.locator('#companion-list')).toContainText('3 · Fizz · orange square — Gardener of Better Definitions');
   await page.uncheck('#emoji-companions');await expect(page.locator('#companion-list li')).toHaveCount(0);
   assert.deepEqual((await page.locator('#output').textContent())?.trim().split('\n'),expected);
   await page.check('#emoji-companions');await expect(page.locator('#companion-list li')).toHaveCount(7);
   await page.selectOption('#companion-strategy','factor-resonance-v1');
   await page.click('#run-button');
   await expect(page.locator('#cache-result')).toHaveText('HIT');
   await expect(page.locator('#personnel-origin')).toHaveText('Institutional memory answered. No new HR proceedings.');
   await expect(page.locator('#chronicle-entries')).toContainText('No fresh recruitment');
   await expect(page.locator('#precedent-status')).toContainText('Certificate of Authorized Non-Performance issued for 15 lines');
   await expect(page.locator('#precedent-steps li')).toHaveCount(5);
   assert.ok(Math.round((await page.locator('#precedent-scenario').boundingBox())!.height*1000)/1000>=48,'Court selector must retain its accessible native control height');
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
   for (const route of ['demo', 'bestiary', 'department-of-improbable-appointments', 'api', 'about', 'company-history', 'changelog', 'continuity-register', 'accessibility', 'validation', 'response']) {
    await page.goto(`${origin}/${route}/`);
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.getByRole('navigation',{name:'Primary navigation',exact:true}).getByRole('link',{name:'Companion bestiary',exact:true})).toHaveCount(0);
    if(route==='about'){await expect(page.locator('#discovery-list li')).toHaveCount(5);const retainedMandate=await page.evaluate(()=>JSON.parse(localStorage.getItem('slopbuzz:extraordinary-appointments:v1')!).finds[0].mandate as string);await page.locator('#discovery-list button').first().click();await expect(page.locator('#companion-dialog')).toContainText('Mandate: '+retainedMandate+'.');await page.keyboard.press('Escape');await expect(page.locator('#discovery-list button').first()).toBeFocused();}
    if (route === 'bestiary') await expect(page.locator('#bestiary-status')).toContainText('3200 companions');
    if (route === 'department-of-improbable-appointments') await expect(page.locator('#rarity-rows tr')).toHaveCount(3200);
    if (route === 'api') await expect(page.locator('#api-total')).toContainText('ratified operations');
    if ((route === 'about'||route === 'company-history')) await expect(page.getByRole('heading',{name:'Confounding the courage to convene'})).toBeVisible();
   }
   await page.goto(origin+'/demo/#office-tour');await expect(page.locator('#health-value')).toHaveText('LIVE');await page.click('#office-enter');await expect(page.locator('#office-canvas')).toHaveAttribute('data-renderer','babylon');await expect(page.locator('#office-canvas')).toHaveAttribute('data-rendered','true');
   await page.locator('#office-directory').getByRole('button',{name:/Executive$/}).click();await page.locator('#office-props').getByRole('button',{name:'The Exit Strategy',exact:true}).click();await page.locator('#office-story-actions').getByRole('button',{name:'Inspect the strategy'}).click();await expect(page.locator('#office-story-answer')).toContainText('cupboard');
   await page.locator('.office-options summary').click();await page.click('#office-offline');await expect(page.locator('#office-offline-status')).toContainText('saved for offline');await page.click('#office-close');
   await context.setOffline(true);
   await page.goto(origin + '/demo/');
   await expect(page.locator('#health-value')).toHaveText('LIVE');await page.click('#office-enter');await expect(page.locator('#office-canvas')).toHaveAttribute('data-rendered','true');await page.click('#office-close');
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
   await page.selectOption('#premises-scenario','bell');await page.click('#premises-submit');await expect(page.locator('#premises-status')).toContainText('U+0007');
   await page.selectOption('#premises-scenario','borrowed-lease');await page.click('#premises-submit');await expect(page.locator('#premises-status')).toContainText('Occupancy refused');await expect(page.locator('#premises-result')).toContainText('Reinspection confirmed 0 characters');
   await page.goto(origin+'/#operations');
   await page.click('#procurement-button');
   await expect(page.locator('#procurement-status')).toContainText('8 separate line items');
   await page.goto(origin+'/demo/');await page.locator('#companion-help a').click();await expect(page).toHaveURL(/\/bestiary\/$/);await expect(page.locator('#bestiary-status')).toContainText('3200 companions');await page.selectOption('#bestiary-kind','single');await page.fill('#bestiary-search','unicorn');await expect(page.locator('#bestiary-results article')).toHaveCount(1);
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
