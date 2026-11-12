import {demoNavigator} from './demo-navigation.ts';
import {chromium,expect} from '@playwright/test';
import {launchBrowser} from './browser-launch.ts';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const revision=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
for(const port of [18088,18089]) {
 let ready=false;
 for(let attempt=0;attempt<30;attempt++) {
  try {const r=await fetch(`http://localhost:${port}/${port===18088?'release.json':'operations/release'}`);if(r.ok && (await r.json()).revision===revision){ready=true;break;}}catch {/* startup in progress */}
  await new Promise(resolve=>setTimeout(resolve,1000));
 }
 assert.ok(ready,`Preview ${port} did not identify the merged revision`);
}
const browser=await launchBrowser(chromium);
try {
 const page=await browser.newPage();
 await page.goto('http://localhost:18088/demo/');
 await page.waitForFunction(()=>document.querySelector('#health-value')?.textContent === 'LIVE',null,{timeout:60000});
 const release=await page.request.get('http://localhost:18088/release.json').then(r=>r.json());assert.equal(release.revision,revision);assert.equal(release.dirty,false);
 const evidence=await page.request.get('http://localhost:18088/validation/report.json').then(r=>r.json());assert.equal(evidence.revision,revision);assert.equal(evidence.status,'PASSED');assert.equal(evidence.browserLifecycle.status,'PASSED');
 await page.uncheck('#authorize-executive-hovering');await page.selectOption('#authorize-display-speed','0');await page.click('#run-button');
 await page.waitForFunction(()=>document.querySelector('#run-status')?.textContent?.includes('Mandate complete'));
 assert.equal((await page.locator('#output').textContent())?.split('\n').filter(Boolean).length,15);
 assert.ok((await page.locator('#chronicle-entries').textContent())?.includes('One has reported for duty'));
 assert.ok((await page.locator('#chronicle-entries [data-premises-ordinal="7"]').textContent())?.includes('U+00A0'));
 await demoNavigator(page).watch('commentary');
 await demoNavigator(page).experiment('premises');
 await page.selectOption('#premises-scenario','bell');await page.click('#premises-submit');await page.waitForFunction(()=>document.querySelector('#premises-status')?.textContent?.includes('U+0007'));
 await demoNavigator(page).evidence('chronicle');assert.ok(await page.locator('#chronicle-scroll').evaluate(element=>element.scrollHeight>element.clientHeight));
 assert.equal(await page.locator('#runtime-status, #offline-status').count(),0);
 await demoNavigator(page).options(()=>page.check('#executive-hovering'));await demoNavigator(page).watch('office');await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered','true');await page.click('#supervision-fullscreen');await expect(page.locator('#office-fullscreen #output')).toBeVisible();await expect(page.locator('#office-fullscreen #chronicle-scroll')).toBeVisible();await page.click('#office-fullscreen-exit');await expect(page.locator('#supervision-fullscreen')).toBeFocused();await demoNavigator(page).options(()=>page.uncheck('#executive-hovering'));
 for(const port of [18088,18089]) {
  for(const route of ['demo','bestiary','department-of-improbable-appointments','about','company-history','accessibility','api','validation']) {
   await page.goto(`http://localhost:${port}/${route}/`);
   assert.equal(await page.getByRole('navigation',{name:'Primary navigation'}).getByRole('link',{name:'About',exact:true}).count(),1);
   assert.equal(await page.getByRole('navigation',{name:'Primary navigation'}).getByRole('link',{name:'Companion bestiary',exact:true}).count(),0);
   assert.equal(await page.locator('main h1:visible').count(),1);
   if(route==='bestiary')await page.waitForFunction(()=>document.querySelector('#bestiary-status')?.textContent?.includes('3200 companions'));
   if(route==='department-of-improbable-appointments')await page.waitForFunction(()=>document.querySelector('#rarity-rows')?.children.length===3200);
   if(route==='demo'){await demoNavigator(page).desk('facilities');await page.click('#office-enter');await expect(page.locator('#office-canvas')).toHaveAttribute('data-rendered','true');await page.click('#office-fullscreen-enter');await expect(page.locator('#office-fullscreen #office-canvas')).toBeVisible();await page.click('#office-fullscreen-exit');await expect(page.locator('#office-fullscreen-enter')).toBeFocused();}
  }
 }
 console.log(`Deployed static runtime verified at ${revision}`);
} finally {await browser.close();}
