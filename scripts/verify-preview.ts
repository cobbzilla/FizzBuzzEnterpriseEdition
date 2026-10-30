import {chromium} from '@playwright/test';
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
const browser=await chromium.launch();
try {
 const page=await browser.newPage();
 await page.goto('http://localhost:18088/');
 await page.waitForFunction(()=>document.querySelector('#health-value')?.textContent === 'LIVE',null,{timeout:60000});
 const release=await page.request.get('http://localhost:18088/release.json').then(r=>r.json());assert.equal(release.revision,revision);assert.equal(release.dirty,false);
 const evidence=await page.request.get('http://localhost:18088/validation/report.json').then(r=>r.json());assert.equal(evidence.revision,revision);assert.equal(evidence.status,'PASSED');assert.equal(evidence.browserLifecycle.status,'PASSED');
 await page.selectOption('#display-speed','0');await page.click('#run-button');
 await page.waitForFunction(()=>document.querySelector('#run-status')?.textContent?.includes('Mandate complete'));
 assert.equal((await page.locator('#output').textContent())?.split('\n').filter(Boolean).length,15);
 assert.equal(await page.locator('#runtime-status, #offline-status').count(),0);
 for(const port of [18088,18089]) {
  for(const route of ['company-history','accessibility','api','validation']) {
   await page.goto(`http://localhost:${port}/${route}/`);
   assert.equal(await page.getByRole('navigation',{name:'Primary navigation'}).getByRole('link',{name:'Company History',exact:true}).count(),1);
   assert.equal(await page.locator('main h1').count(),1);
  }
 }
 console.log(`Deployed static runtime verified at ${revision}`);
} finally {await browser.close();}
