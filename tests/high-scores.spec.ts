import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {demoAction,department} from './demo-controls';
import {auditLeaderboardReceipt} from '../deploy/leaderboard-audit';
import {netPoints,scoringStorageKey,type ScoringRun} from '../web/scoring-service';
import type {LeaderboardEntry,LeaderboardReceipt} from '../web/leaderboard-model';

// Network-mocked register tests must not be intercepted by the offline worker.
// The release's public checks exercise the real API with service workers enabled.
test.use({serviceWorkers:'block'});

async function mockRegister(page:Page){
 let name='',entry:LeaderboardEntry|null=null,participating=false;const receipts:LeaderboardReceipt[]=[];const failures:string[]=[];
 await page.route('https://challenges.cloudflare.com/turnstile/v0/api.js*',route=>route.fulfill({contentType:'text/javascript',body:'window.turnstile={render:function(host,options){queueMicrotask(function(){options.callback("test-token")});return "test-widget"},remove:function(){},reset:function(){}};'}));
 await page.route('**/api/high-scores**',async route=>{
  const request=route.request(),url=new URL(request.url()),path=url.pathname.replace('/api/high-scores',''),method=request.method(),asOf=new Date().toISOString();
  const personal=()=>({participating,name,entry,asOf,enabled:true,sitekey:'test-sitekey'});
  if(path==='/me'){
   if(method==='PUT'){name=request.postDataJSON().name;participating=true;}
   if(method==='DELETE'){name='';entry=null;participating=false;}
   await route.fulfill({json:personal()});return;
  }
  if(path===''||path==='/'){await route.fulfill({json:{entries:entry?[entry]:[],offset:Number(url.searchParams.get('offset')||0),limit:50,total:entry?1:0,cutoff:null,asOf,enabled:true,sitekey:'test-sitekey'}});return;}
  if(path==='/check'||path.startsWith('/runs/')){
   let receipt:LeaderboardReceipt;try{receipt=auditLeaderboardReceipt(request.postDataJSON());}catch(error){failures.push((error as Error).message);await route.fulfill({status:422,json:{error:(error as Error).message}});return;}
   const r=receipt.run,score=String(netPoints(r));
   if(path==='/check'){await route.fulfill({json:{qualifies:true,rank:1,score,runId:r.id,sequence:receipt.sequence,asOf}});return;}
   receipts.push(receipt);entry={id:'test-entry',name,runId:r.id,rank:1,score,through:r.verification.through,mandate:r.verification.mandate,status:r.status,rules:r.rules,identity:r.identity,conditions:r.conditions,attainedAt:asOf,updatedAt:asOf,stale:false};
   await route.fulfill({json:{...personal(),acceptedSequence:receipt.sequence,runId:r.id}});return;
  }
  await route.fulfill({status:404,json:{error:'Unknown test operation'}});
 });
 return {receipts,failures,entry:()=>entry};
}
test.beforeEach(async({page},info)=>{await page.route('**/runtime-config.json',async route=>{const response=await route.fetch();await route.fulfill({json:{...await response.json(),engine:info.project.metadata.engine}});});});
async function run(page:Page,limit='150',pace='225'){
 await department(page,'authorize');await demoAction(page,'fill','#limit',limit);await demoAction(page,'selectOption','#display-speed',pace);await demoAction(page,'click','#run-button');
}
async function current(page:Page){return page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).current as ScoringRun,scoringStorageKey);}
test('qualifies mid-run, keeps the dialog score live while typing, and publishes subsequent gains',async({page})=>{
 const register=await mockRegister(page);await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await run(page);
 await expect.poll(async()=>({
  open:await page.locator('#high-scores-dialog').isVisible(),errors:register.failures,
  state:await page.evaluate(()=>({error:window.__slopbuzzHighScores?.client.state.error,choice:window.__slopbuzzHighScores?.client.state.choice,enabled:window.__slopbuzzHighScores?.client.state.enabled}))
 })).toMatchObject({open:true,errors:[],state:{error:'',choice:'undecided',enabled:true}});
 await expect(page.locator('#high-scores-title')).toContainText('top 1,000');
 const first=await current(page);expect(first.status).toBe('active');await page.locator('#high-scores-name').fill('Still Typing_7');
 await expect.poll(async()=>BigInt((await current(page)).verification.through)).toBeGreaterThan(BigInt(first.verification.through)+2n);
 await expect(page.locator('#high-scores-name')).toHaveValue('Still Typing_7');
 await expect.poll(async()=>{const r=await current(page);return await page.locator('[data-high-scores-live]').textContent()===netPoints(r).toLocaleString('en-US');}).toBe(true);
 await page.getByRole('button',{name:'Publish my score',exact:true}).click();await expect.poll(()=>register.receipts.length).toBeGreaterThan(0);
 await page.keyboard.press('Escape');await expect(page.locator('#high-scores-dialog')).toBeHidden();await expect(page.locator('#score-cluster [data-high-score-standing]')).toContainText('#1');
 await demoAction(page,'click','#reveal-all');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect.poll(()=>register.entry()?.status).toBe('completed');
 expect(register.entry()?.score).toBe(String(netPoints(await current(page))));expect(register.failures).toEqual([]);
 if(await page.locator('#watch-settings').isVisible())await page.locator('#watch-settings-close').click();
 await page.locator('#score-cluster [data-high-scores-open]').click();await expect(page.locator('[data-high-scores-board]')).toContainText('Still Typing_7');
});
test('declining is remembered across runs and reloads; joining later and withdrawal remain available',async({page})=>{
 const register=await mockRegister(page);await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await run(page,'15','0');await expect(page.locator('#high-scores-dialog')).toBeVisible();await page.getByRole('button',{name:'Keep private',exact:true}).click();
 await run(page,'30','0');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#high-scores-dialog')).toBeHidden();expect(register.receipts).toHaveLength(0);
 await page.reload();await expect(page.locator('#health-value')).toHaveText('LIVE');await expect(page.locator('#high-scores-dialog')).toBeHidden();await page.locator('#score-cluster [data-high-scores-open]').click();await page.locator('[data-high-scores-tab="settings"]').click();await page.locator('#high-scores-name').fill('Later Clerk');await page.getByRole('button',{name:'Publish my score',exact:true}).click();await expect.poll(()=>register.receipts.length).toBeGreaterThan(0);
 await page.getByRole('button',{name:'Withdraw from the register',exact:true}).click();await expect(page.locator('#high-scores-status')).toContainText('removed');expect(register.entry()).toBeNull();expect(register.failures).toEqual([]);
});
test('trophy and register remain readable and keyboard accessible at 320px',async({page},info)=>{
 await mockRegister(page);await page.setViewportSize({width:320,height:568});await page.goto('/high-scores/');await expect(page.locator('#high-scores-list')).toContainText('No scores filed yet');await page.getByRole('button',{name:'My participation',exact:true}).click();
 await expect(page.locator('#high-scores-title')).toBeFocused();await page.locator('#high-scores-name').fill('Bad!');await page.getByRole('button',{name:'Publish my score',exact:true}).click();expect(await page.locator('#high-scores-name').evaluate((e:HTMLInputElement)=>e.checkValidity())).toBe(false);
 await page.locator('#high-scores-name').fill('Good_Name-2');expect((await new AxeBuilder({page}).include('#high-scores-dialog').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 if(info.project.name==='chromium-auto')await page.screenshot({path:info.outputPath('high-scores-320.png')});await page.keyboard.press('Escape');await expect(page.locator('#high-scores-dialog')).toBeHidden();await expect(page.getByRole('button',{name:'My participation',exact:true})).toBeFocused();
});
