import {naturalFlight} from './flight-navigation.ts';
import {demoNavigator} from './demo-navigation.ts';
import {verifyAnalytics} from './verify-analytics.ts';
import assert from 'node:assert/strict';
import {chromium, firefox, webkit, expect} from '@playwright/test';
import {launchBrowser} from './browser-launch.ts';
import {scoringStorageKey,cabinetStorageKey,netPoints,type ScoringRun} from '../web/scoring-service.ts';
import {guidePath,rulesIdentity} from '../web/scoring-rules.ts';
import {protectProductionScores} from './protect-production-scores.ts';

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
 for(const path of ['/reset/','/reset/reset.js','/full-reset/']){const response=await fetch(origin+path,{method:'HEAD'});assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'no-store');}
 const scores=await get('/api/high-scores?limit=1');assert(Array.isArray(scores.entries));assert(scores.total>=0&&scores.total<=1000);assert.equal(typeof scores.enabled,'boolean');assert.equal(typeof scores.sitekey,'string');
 for(const board of ['daily','weekly','monthly','all-time']){const data=await get('/api/high-scores?board='+board+'&limit=1');assert.equal(data.board,board);assert(data.total<=1000);}
 for(const path of ['/admin/high-scores/','/admin/high-scores/app.js','/admin/high-scores/api/boards'])assert.equal((await fetch(origin+path)).status,401);
 const personal=await fetch(origin+'/api/high-scores/me');assert.equal(personal.status,200);assert.equal(personal.headers.get('cache-control'),'no-store');assert.equal((await personal.json()).participating,false);

 for (const engine of [chromium, firefox, webkit]) {
  let browser = await launchBrowser(engine);
  try {
   let context = await browser.newContext();
   // Release verification must never publish synthetic scores or interrupt other
   // demo checks with a genuine live qualification invitation.
   await protectProductionScores(context);
   let page = await context.newPage();
   let demo=demoNavigator(page);
   page.setDefaultTimeout(60000);
   const businessRequests: string[] = [];
   const publicationRequests: string[] = [];
   const observeRequests=()=>page.on('request', request => {
    const url = new URL(request.url());
    if (url.origin === origin && /^\/(fizzbuzz|healthz|readyz|audit|operations|capacity|cache|procurement|onboarding|precedent|companions|premises)(\/|\?|$)/.test(url.pathname)) businessRequests.push(url.pathname);
    if(url.origin===origin&&/^\/api\/high-scores(?:\/|$)/.test(url.pathname)&&!['GET','HEAD'].includes(request.method()))publicationRequests.push(request.method()+' '+url.pathname);
   });
   observeRequests();
   const freshBrowser=async()=>{
    assert.deepEqual(businessRequests,[]);assert.deepEqual(publicationRequests,[],'Release verification must not send score mutations');await browser.close();browser=await launchBrowser(engine);
    context=await browser.newContext();await protectProductionScores(context);page=await context.newPage();page.setDefaultTimeout(60000);demo=demoNavigator(page);observeRequests();
   };
   await page.goto(origin+'/high-scores/');await expect(page.locator('#high-scores-list')).toContainText('Top');
   await expect(page.locator('#high-scores-list [role="status"]')).toContainText(/No scores filed yet|of [\d,]+ · Updated/);
   await page.goto(origin + '/demo/');
   // Playwright assertions have their own timeout; honor the runtime's cold-start budget.
   await expect(page.locator('#health-value')).toHaveText('LIVE',{timeout:60000});
   const stylesheet = new URL(await page.locator('link[rel=stylesheet]').first().getAttribute('href') || '', page.url());
   assert.equal(stylesheet.pathname, '/' + config.assets + 'site.css', 'Page must use its release-specific stylesheet');
   assert.deepEqual(await page.getByRole('navigation',{name:'Demo departments'}).getByRole('link').allTextContents(),['Authorize','Observe','Experiment','Facilities','Evidence']);
   await expect(page.locator('#authorize-require-companion-roll-call')).toBeChecked();await expect(page.locator('#authorize-executive-hovering')).toBeChecked();
   await demo.run();await expect(page.locator('#observe-title')).toBeFocused();
   await page.locator('#score-cluster [data-high-scores-open]:visible').first().click();await expect(page.locator('#high-scores-dialog')).toBeVisible();await page.locator('[data-high-scores-close]').click();
   const firstScore=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).current as ScoringRun,scoringStorageKey);assert.equal(firstScore.identity,rulesIdentity);assert.equal(firstScore.partial,false);assert.equal(firstScore.categories.Publication,'253');assert.equal(firstScore.categories['Numerical distinctions'],'691');assert(BigInt(firstScore.dividend)>0n);
   await expect(page.locator('#portfolio-open [data-portfolio-points]')).toHaveAttribute('data-exact',String(netPoints(firstScore)));
   await page.click('#portfolio-open');await expect(page.locator('#portfolio-record')).toBeVisible();await expect(page.locator('#portfolio-appearances')).toHaveText('7');await expect(page.locator('#portfolio-total')).toHaveText(netPoints(firstScore).toLocaleString('en-US'));await expect(page.locator('#score-rules-link')).toHaveAttribute('href',origin+'/'+guidePath);await page.click('[data-score-tab="badges"]');await expect(page.locator('.score-badge svg')).toHaveCount(16);await expect(page.locator('[data-badge="bingo"]')).toHaveAttribute('data-earned','true');await page.click('#score-close');await demo.watch('overview');
   await demo.options(()=>page.check('#executive-hovering'));await expect(page.locator('#display-speed')).toBeEnabled();await expect(page.locator('#display-speed')).toHaveValue('0');await demo.watch('office');await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered','true');
   await page.setViewportSize({width:390,height:667});
   await expect.poll(()=>page.evaluate(()=>{
    const output=document.querySelector<HTMLElement>('#output')!,style=getComputedStyle(output);
    return document.documentElement.scrollHeight<=innerHeight+1&&output.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom)>=parseFloat(style.lineHeight)*2-1;
   })).toBe(true);
   await expect(page.locator('#discovery-list li')).toHaveCount(5);await expect(page.locator('#discovery-toggle')).toHaveAttribute('aria-expanded','false');assert.ok((await page.locator('#discovery-register').boundingBox())!.height<=48);await page.click('#discovery-toggle');await expect(page.locator('#discovery-list')).toBeVisible();await page.click('#discovery-toggle');await expect(page.locator('#discovery-list')).toBeHidden();
   for(const id of ['stop-reading','supervision-pause','supervision-next','watch-settings-toggle']){
    const button=page.locator('#'+id);assert.equal((await button.textContent())?.trim(),'');await expect(button.locator('svg')).toHaveAttribute('aria-hidden','true');assert.ok(await button.getAttribute('aria-label'));
   }
   await page.setViewportSize({width:1100,height:800});
   await demo.options(()=>page.click('#supervision-autonomy'));await expect(page.locator('#display-speed')).toHaveValue('0');await expect(page.locator('#display-speed option[value="executive-hovering"]')).toHaveCount(0);await demo.watch('commentary');
   await expect(page.locator('#personnel-verdict')).toHaveText('Approved to start at 1');
   await expect(page.locator('#chronicle-entries')).toContainText('One has reported for duty');
   await expect(page.locator('#chronicle-entries')).toContainText('4 separately certified z’s');
   await expect(page.locator('#chronicle-entries [data-premises-ordinal="7"]')).toContainText('U+00A0');
   await expect(page.locator('#chronicle-entries [data-premises-ordinal="14"]')).toContainText('U+000A');
   assert.ok(await page.locator('#chronicle-scroll').evaluate(element=>element.clientHeight>100));
   await expect.poll(()=>page.locator('#chronicle-scroll').evaluate(element=>Math.abs(element.scrollTop)<3)).toBe(true);
   assert.deepEqual(await page.locator('#chronicle-entries .chronicle-folio').evaluateAll(elements=>elements.map(element=>(element as HTMLElement).dataset.ordinal)),Array.from({length:15},(_,index)=>String(15-index)));
   const chronicle=page.locator('#chronicle-scroll');
   await chronicle.hover();await page.mouse.wheel(0,260);
   await expect.poll(()=>chronicle.evaluate(element=>element.scrollTop>50)).toBe(true);
   await page.setViewportSize({width:1100,height:800});
   await page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
   assert.ok(await chronicle.evaluate(element=>element.scrollTop>50),'Reading earlier minutes must survive layout changes without being pulled to the top');
   await chronicle.focus();await page.keyboard.press('Home');
   await expect.poll(()=>chronicle.evaluate(element=>Math.abs(element.scrollTop)<3)).toBe(true);
   const expected = Array.from({length: 15}, (_, i) => (i + 1) % 15 === 0 ? 'FizzBuzz' : (i + 1) % 3 === 0 ? 'Fizz' : (i + 1) % 5 === 0 ? 'Buzz' : String(i + 1));
   assert.deepEqual((await page.locator('#output').textContent())?.trim().split('\n'), expected);
   await expect(page.locator('#companion-list li')).toHaveCount(7);
   await expect(page.locator('#discovery-list li')).toHaveCount(5);
   await demo.options(()=>page.check('#executive-hovering'));await demo.watch('office');await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered','true');await page.click('#supervision-fullscreen');
   await expect(page.locator('#office-fullscreen #output')).toBeVisible();await expect(page.locator('#office-fullscreen #chronicle-scroll')).toBeVisible();assert.deepEqual((await page.locator('#output').textContent())?.trim().split('\n'),expected);
   await page.click('#office-fullscreen-exit');await expect(page.locator('#office-fullscreen')).not.toBeVisible();await expect(page.locator('#supervision-fullscreen')).toBeFocused();await demo.options(()=>page.uncheck('#executive-hovering'));
   await demo.watch('companions');
   const bioOpener=page.locator('#companion-list button').first(),bio=page.locator('#companion-dialog');
   await bioOpener.click();await expect(bio.getByRole('button',{name:'Close companion file'})).toBeVisible();assert.equal(new URL(await page.locator('#companion-share-link').inputValue()).searchParams.get('limit'),'15');await bio.getByRole('button',{name:'Close companion file'}).click();await expect(bio).not.toBeVisible();await expect(bioOpener).toBeFocused();
   await bioOpener.click();await page.mouse.click(4,4);await expect(bio).not.toBeVisible();await expect(bioOpener).toBeFocused();
   await demo.options(()=>page.selectOption('#companion-strategy','ordinal-constellation-v1'));
   await expect(page.locator('#companion-list')).toContainText('3 · Fizz · orange square — Gardener of Better Definitions');
   await demo.options(()=>page.uncheck('#emoji-companions'));await expect(page.locator('#companion-list li')).toHaveCount(0);
   assert.deepEqual((await page.locator('#output').textContent())?.trim().split('\n'),expected);
   await demo.options(()=>page.check('#emoji-companions'));await expect(page.locator('#companion-list li')).toHaveCount(7);
   await demo.options(()=>page.selectOption('#companion-strategy','factor-resonance-v1'));
   await demo.run();
   await expect(page.locator('#cache-result')).toHaveText('HIT');
   const cachedScore=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).current as ScoringRun,scoringStorageKey);assert.equal(cachedScore.categories.Companions,firstScore.categories.Companions);assert.equal(cachedScore.buckets['acceptedGlyph|1'],undefined);assert.equal(cachedScore.buckets['priorExam|1'].quantity,'5');await expect(page.locator('#portfolio-open [data-portfolio-points]')).toHaveAttribute('data-exact',String(netPoints(cachedScore)));
   await expect(page.locator('#personnel-origin')).toHaveText('Institutional memory answered. No new HR proceedings.');
   await expect(page.locator('#chronicle-entries')).toContainText('No fresh recruitment');
   await expect(page.locator('#precedent-status')).toContainText('Certificate of Authorized Non-Performance issued for 15 lines');
   await expect(page.locator('#precedent-steps li')).toHaveCount(5);
   await demo.experiment('precedent');assert.ok(Math.round((await page.locator('#experiment-precedent-scenario').boundingBox())!.height*1000)/1000>=48);
   await page.selectOption('#experiment-precedent-scenario','lowercase-fizz');await page.click('#experiment-precedent-submit');await expect(page.locator('#experiment-precedent-status')).toContainText('Reuse rejected by Independent Lexical Bench');
   await expect(page.locator('#precedent-status')).toContainText('Reuse approved');
   await demo.experiment('personnel');await page.selectOption('#experiment-speed','0');await page.click('[data-personnel-scenario="zero"]');await expect(page.locator('#experiment-personnel-verdict')).toHaveText('Application rejected');await expect(page.locator('#experiment-personnel-status')).toContainText('Identity Office');await expect(page.locator('#personnel-origin')).toHaveText('Institutional memory answered. No new HR proceedings.');
   await demo.run('1001');await expect(page.locator('#run-status')).toContainText('Mandate complete. 1001 lines disclosed');
   await demo.desk('authorize');await page.fill('#limit','9007199254740993');await expect(page.locator('#magnitude-warning')).toBeVisible();await page.click('#run-button');await expect(page.locator('#output-count')).toContainText('of 9007199254740993 lines');await page.click('#stop-reading');await expect(page.locator('#run-status')).toContainText('Proceedings stopped');
   await page.goto(origin+'/#operations');
   await page.click('#procurement-button');
   await expect(page.locator('#procurement-status')).toContainText('8 separate line items');
   await expect(page.locator('#procurement-items li')).toHaveCount(8);
   await page.click('#canary-button');
   await expect(page.locator('#canary-value')).toHaveText('APPROVED');
   await page.click('#recovery-button');
   await expect(page.locator('#recovery-value')).toHaveText('COPY MATCHED');
   await page.waitForFunction(() => !!navigator.serviceWorker.controller, null, {timeout: 120000});
   for (const route of ['demo', 'bestiary', 'department-of-improbable-appointments', 'api', 'about', 'company-history', 'changelog', 'continuity-register', 'accessibility', 'validation', 'response','scoring',guidePath.slice(0,-1)]) {
    await page.goto(`${origin}/${route}/`);
    await expect(page.locator('main h1:visible')).toHaveCount(1);
    await expect(page.getByRole('navigation',{name:'Primary navigation',exact:true}).getByRole('link',{name:'Companion bestiary',exact:true})).toHaveCount(0);
    if(route==='about'){await expect(page.locator('#discovery-list li')).toHaveCount(5);const retainedMandate=await page.evaluate(()=>JSON.parse(localStorage.getItem('slopbuzz:extraordinary-appointments:v1')!).finds[0].mandate as string);await page.locator('#discovery-list button').first().click();await expect(page.locator('#companion-dialog')).toContainText('Mandate: '+retainedMandate+'.');await page.keyboard.press('Escape');await expect(page.locator('#discovery-list button').first()).toBeFocused();}
    if (route === 'bestiary') await expect(page.locator('#bestiary-status')).toContainText('3200 companions');
    if (route === 'department-of-improbable-appointments') await expect(page.locator('#rarity-rows tr')).toHaveCount(3200);
    if (route === 'api') await expect(page.locator('#api-total')).toContainText('ratified operations');
    if(route.startsWith('scoring'))await expect(page.locator('#main')).toContainText(rulesIdentity);
    if ((route === 'about'||route === 'company-history')) await expect(page.getByRole('heading',{name:'Confounding the courage to convene'})).toBeVisible();
   }
   console.log(`${engine.name()}: public controls, numerical runtime and navigation passed; releasing that browser.`);
   await freshBrowser();
   await page.goto(origin+'/demo/#office-tour');await expect(page.locator('#health-value')).toHaveText('LIVE',{timeout:60000});await demo.desk('facilities');await page.click('#office-enter');await expect(page.locator('#office-canvas')).toHaveAttribute('data-renderer','babylon');await expect(page.locator('#office-canvas')).toHaveAttribute('data-rendered','true');
   await page.click('#office-fullscreen-enter');await expect(page.locator('#office-fullscreen #office-canvas')).toBeVisible();await page.click('#office-fullscreen-inspect');await expect(page.locator('#office-fullscreen #office-directory')).toBeVisible();await page.click('#office-fullscreen-exit');await expect(page.locator('#office-fullscreen-enter')).toBeFocused();
   await page.locator('#office-directory').getByRole('button',{name:/Executive$/}).click();await page.locator('#office-props').getByRole('button',{name:'The Exit Strategy',exact:true}).click();await page.locator('#office-story-actions').getByRole('button',{name:'Inspect the strategy'}).click();await expect(page.locator('#office-story-answer')).toContainText('cupboard');
   if(!await page.locator('#heist-suspect').isVisible())await page.locator('.heist-security>summary').click();await page.selectOption('#heist-suspect','🐙');await page.click('#heist-rehearse');await expect(page.locator('#office-heist')).toContainText('Eight apparent stamps');await page.locator('#office-heist').getByRole('button',{name:'Offer an amnesty biscuit'}).click();await expect(page.locator('#office-heist')).toBeHidden();await expect(page.locator('#heist-records')).toContainText('One biscuit');
   await naturalFlight(page,{limit:'55'});await page.selectOption('#supervision-flight-destination','executive');await page.locator('#supervision-flight [data-fan="0"]').click();await page.locator('#supervision-flight').getByRole('button',{name:'Land now',exact:true}).click();await expect(page.locator('#supervision-flight')).toBeHidden();await expect(page.locator('#flight-records')).toContainText('Direct delivery');await demo.options(()=>page.click('#reveal-all'));await expect(page.locator('#run-status')).toContainText('Mandate complete');
   console.log(`${engine.name()}: public office and natural aviation passed; releasing graphics before offline installation.`);
   await freshBrowser();await page.goto(origin+'/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE',{timeout:60000});await demo.desk('facilities');await page.click('#office-enter');await expect(page.locator('#office-canvas')).toHaveAttribute('data-rendered','true');
   await page.waitForFunction(()=>!!navigator.serviceWorker.controller,null,{timeout:120000});
   await page.locator('.office-options summary').click();await page.click('#office-offline');await expect(page.locator('#office-offline-status')).toContainText('saved for offline');await page.click('#office-close');
   await context.setOffline(true);
   await page.goto(origin + '/demo/');
   await expect(page.locator('#health-value')).toHaveText('LIVE');await demo.desk('facilities');await page.click('#office-enter');await expect(page.locator('#office-canvas')).toHaveAttribute('data-rendered','true');await page.click('#office-fullscreen-enter');await expect(page.locator('#office-fullscreen #office-canvas')).toBeVisible();await page.click('#office-fullscreen-exit');await expect(page.locator('#office-fullscreen-enter')).toBeFocused();await page.click('#office-close');
   await expect(page.locator('#health-value')).toHaveText('LIVE');
   await page.click('#office-enter');if(!await page.locator('#heist-suspect').isVisible())await page.locator('.heist-security>summary').click();await page.selectOption('#heist-suspect','👻');await page.click('#heist-rehearse');await expect(page.locator('#office-heist')).toContainText('ghost uses the wall');await page.locator('#office-heist').getByRole('button',{name:'Skip the chase'}).click();await expect(page.locator('#office-heist')).toBeHidden();await page.click('#office-close');
   await naturalFlight(page,{limit:'55'});await expect(page.locator('#supervision-flight')).toContainText('Proceedings held until landing');await page.locator('#supervision-flight').getByRole('button',{name:'Land now',exact:true}).click();await expect(page.locator('#supervision-flight')).toBeHidden();await demo.options(()=>page.click('#reveal-all'));await expect(page.locator('#run-status')).toContainText('Mandate complete');
   await demo.run('16');
   await expect(page.locator('#portfolio-open [data-portfolio-points]')).not.toHaveAttribute('data-exact','0');
   await page.click('#portfolio-open');await page.click('#score-rules-link');await expect(page.locator('#rule-appointment')).toBeVisible();await expect(page.locator('#main')).toContainText(rulesIdentity);await page.locator('#main').getByRole('link',{name:'Return to the office',exact:true}).click();await expect(page.locator('#health-value')).toHaveText('LIVE');
   await demo.experiment('personnel');await page.selectOption('#experiment-speed','0');await page.click('[data-personnel-scenario="missing-induction"]');await expect(page.locator('#experiment-personnel-verdict')).toHaveText('Application rejected');await expect(page.locator('#experiment-personnel-status')).toContainText('Probation Review');assert.equal((await page.locator('#output').textContent())?.trim().split('\n').at(-1),'16');
   await demo.experiment('precedent');await page.selectOption('#experiment-precedent-scenario','wrong-mandate');await page.click('#experiment-precedent-submit');await expect(page.locator('#experiment-precedent-status')).toContainText('Reuse rejected by Mandate Jurisdiction Chamber');
   await demo.experiment('premises');await page.selectOption('#premises-scenario','bell');await page.click('#premises-submit');await expect(page.locator('#premises-status')).toContainText('U+0007');await page.selectOption('#premises-scenario','borrowed-lease');await page.click('#premises-submit');await expect(page.locator('#premises-status')).toContainText('Occupancy refused');await expect(page.locator('#premises-result')).toContainText('Reinspection confirmed 0 characters');
   await page.goto(origin+'/#operations');
   await page.click('#procurement-button');
   await expect(page.locator('#procurement-status')).toContainText('8 separate line items');
   await page.goto(origin+'/demo/');await page.locator('#authorize-companion-help a').click();await expect(page).toHaveURL(/\/bestiary\/$/);await expect(page.locator('#bestiary-status')).toContainText('3200 companions');await page.selectOption('#bestiary-kind','single');await page.fill('#bestiary-search','unicorn');await expect(page.locator('#bestiary-results article')).toHaveCount(1);
   await page.goto(origin + '/api/');
   await expect(page.locator('#api-total')).toContainText('ratified operations');
   console.log(`${engine.name()}: public aviation and offline execution passed; releasing graphics before reset checks.`);
   await freshBrowser();await page.goto(origin+'/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE',{timeout:60000});await demo.run('15');await expect(page.locator('#discovery-list li')).toHaveCount(5);await page.waitForFunction(()=>!!navigator.serviceWorker.controller,null,{timeout:120000});await context.setOffline(true);
   await page.goto(origin+'/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await page.uncheck('#authorize-executive-hovering');await page.selectOption('#authorize-display-speed','225');await page.fill('#limit','1000');await page.click('#run-button');await demo.desk('authorize');await expect(page.locator('#mandate-collision-warning')).toBeVisible();await demo.run('0');await demo.desk('authorize');await expect(page.locator('#mandate-collision-warning')).toBeHidden();await expect(page.locator('#output')).toContainText('produces no lines');
   const savedFinds=await page.evaluate(()=>localStorage.getItem('slopbuzz:extraordinary-appointments:v1'));
   const savedScore=await page.evaluate(key=>localStorage.getItem(key),scoringStorageKey),savedBadges=await page.evaluate(key=>localStorage.getItem(key),cabinetStorageKey);assert.ok(savedScore);assert.ok(savedBadges);
   await context.setOffline(false);await page.goto(origin+'/reset/');await expect(page).toHaveURL(origin+'/',{timeout:90000});await expect(page.getByRole('link',{name:'Live demo',exact:true})).toBeVisible();
   assert.equal(await page.evaluate(()=>localStorage.getItem('slopbuzz:extraordinary-appointments:v1')),savedFinds);
   assert.equal(await page.evaluate(key=>localStorage.getItem(key),scoringStorageKey),savedScore);assert.equal(await page.evaluate(key=>localStorage.getItem(key),cabinetStorageKey),savedBadges);
   await page.getByRole('link',{name:'Live demo',exact:true}).click();await expect(page.getByRole('navigation',{name:'Demo departments'}).getByRole('link')).toHaveCount(5);
   await page.goto(origin+'/full-reset/');await expect(page).toHaveURL(origin+'/',{timeout:90000});assert.equal(await page.evaluate(()=>localStorage.getItem('slopbuzz:extraordinary-appointments:v1')),null);
   assert.equal(await page.evaluate(key=>localStorage.getItem(key),scoringStorageKey),null);assert.equal(await page.evaluate(key=>localStorage.getItem(key),cabinetStorageKey),null);
   assert.deepEqual(businessRequests, []);
   assert.deepEqual(publicationRequests,[],'Release verification must not send score mutations');
   console.log(`${engine.name()}: public runtime, cache, recovery, navigation and offline execution passed.`);
  } finally {
   await browser.close();
  }
 }
 if ((await get('/analytics-config.json')).enabled) await verifyAnalytics(origin, revision);
}
