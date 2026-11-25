import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {demoAction,department} from './demo-controls';
import {auditLeaderboardReceipt} from '../deploy/leaderboard-audit';
import {netPoints,scoringStorageKey,type ScoringRun} from '../web/scoring-service';
import {anonymousName,scoreboards} from '../web/scoreboards';
import {participationKey,type LeaderboardEntry,type LeaderboardReceipt} from '../web/leaderboard-model';

// Network-mocked register tests must not be intercepted by the offline worker.
// The release's public checks exercise the real API with service workers enabled.
test.use({serviceWorkers:'block'});

async function mockRegister(page:Page,holdQualification=false,rank=1){
 let name='',entry:LeaderboardEntry|null=null,participating=false;const receipts:LeaderboardReceipt[]=[];const failures:string[]=[];const previous=new Map<string,LeaderboardReceipt>();
 let releaseQualification!:()=>void;const qualificationReady=new Promise<void>(resolve=>{releaseQualification=resolve;});if(!holdQualification)releaseQualification();
 await page.context().route('https://challenges.cloudflare.com/turnstile/v0/api.js*',route=>route.fulfill({contentType:'text/javascript',body:'window.turnstile={render:function(host,options){queueMicrotask(function(){options.callback("test-token")});return "test-widget"},remove:function(){},reset:function(){}};'}));
 await page.context().route('**/api/high-scores**',async route=>{
  const request=route.request(),url=new URL(request.url()),path=url.pathname.replace('/api/high-scores',''),method=request.method(),asOf=new Date().toISOString();
  const standings=()=>Object.fromEntries(scoreboards.map(b=>[b.id,entry]));const personal=()=>({participating,name,entry,standings:standings(),asOf,enabled:true,sitekey:'test-sitekey'});
  if(path==='/me'){
   if(method==='PUT'){name=request.postDataJSON().anonymous?anonymousName:request.postDataJSON().name;participating=true;if(entry)entry={...entry,name};}
   if(method==='DELETE'){name=anonymousName;if(entry)entry={...entry,name};}
   await route.fulfill({json:personal()});return;
  }
  if(path===''||path==='/'){await route.fulfill({json:{board:url.searchParams.get('board')||'all-time',entries:entry?[entry]:[],offset:Number(url.searchParams.get('offset')||0),limit:50,total:entry?1:0,cutoff:null,asOf,enabled:true,sitekey:'test-sitekey'}});return;}
  if(path==='/check'||path.startsWith('/runs/')){
   let receipt:LeaderboardReceipt;try{const data=request.postDataJSON() as LeaderboardReceipt,prior=path==='/check'?undefined:previous.get(data.run.id);receipt=auditLeaderboardReceipt(data,prior&&JSON.stringify(prior)!==JSON.stringify(data)?prior:undefined);}catch(error){failures.push((error as Error).message);await route.fulfill({status:422,json:{error:(error as Error).message}});return;}
   const r=receipt.run,score=String(netPoints(r));
   if(path==='/check'){await qualificationReady;await route.fulfill({json:{qualifies:true,rank,score,runId:r.id,sequence:receipt.sequence,asOf}});return;}
   receipts.push(receipt);previous.set(r.id,receipt);entry={id:'test-entry',name,runId:r.id,rank,score,through:r.verification.through,mandate:r.verification.mandate,status:r.status,rules:r.rules,identity:r.identity,conditions:r.conditions,attainedAt:asOf,updatedAt:asOf,stale:false};
   await qualificationReady;await route.fulfill({json:{...personal(),acceptedSequence:receipt.sequence,runId:r.id}});return;
  }
  await route.fulfill({status:404,json:{error:'Unknown test operation'}});
 });
 return {receipts,failures,entry:()=>entry,releaseQualification};
}
test.beforeEach(async({page},info)=>{await page.route('**/runtime-config.json',async route=>{const response=await route.fetch();await route.fulfill({json:{...await response.json(),engine:info.project.metadata.engine}});});});
async function run(page:Page,limit='150',pace='225'){
 await department(page,'authorize');await demoAction(page,'fill','#limit',limit);await demoAction(page,'selectOption','#display-speed',pace);await demoAction(page,'click','#run-button');
}
async function current(page:Page){return page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).current as ScoringRun,scoringStorageKey);}
test('qualifies mid-run, keeps the dialog score live while typing, and publishes subsequent gains',async({page},info)=>{
 const register=await mockRegister(page);await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await run(page);
 await expect.poll(async()=>({
  open:await page.locator('#high-scores-dialog').isVisible(),errors:register.failures,
  state:await page.evaluate(()=>({error:window.__slopbuzzHighScores?.client.state.error,choice:window.__slopbuzzHighScores?.client.state.choice,enabled:window.__slopbuzzHighScores?.client.state.enabled}))
 })).toMatchObject({open:true,errors:[],state:{error:'',choice:'undecided',enabled:true}});
 await expect(page.locator('#high-scores-title')).toContainText('top 1,000');
 await expect(page.locator('#high-scores-dialog')).toHaveAttribute('data-minimal','true');await expect(page.locator('#high-scores-name')).toBeFocused();
 await expect(page.locator('#high-scores-dialog button:visible')).toHaveCount(2);await expect(page.locator('[data-high-scores-tab="board"]')).toBeHidden();await expect(page.locator('[data-high-scores-board]')).toBeHidden();
 const bounds=await page.locator('#high-scores-dialog').boundingBox();expect(bounds!.width).toBeLessThanOrEqual(418);expect(bounds!.height).toBeLessThan(360);
 if(info.project.name==='chromium-auto')await page.screenshot({path:info.outputPath('compact-high-score-invitation.png')});
 const first=await current(page);expect(first.status).toBe('active');await page.locator('#high-scores-name').fill('Still Typing_7');
 await expect.poll(async()=>BigInt((await current(page)).verification.through)).toBeGreaterThan(BigInt(first.verification.through)+2n);
 await expect(page.locator('#high-scores-name')).toHaveValue('Still Typing_7');
 await expect.poll(async()=>{const r=await current(page);return await page.locator('[data-high-scores-live]').textContent()===netPoints(r).toLocaleString('en-US');}).toBe(true);
 expect(await page.locator('#high-scores-name').evaluate((e:HTMLInputElement)=>({valid:e.checkValidity(),message:e.validationMessage}))).toEqual({valid:true,message:''});
 // Keep the pointer pressed through live updates: Safari must still submit.
 const publish=page.getByRole('button',{name:'Save name',exact:true});await expect(publish).toBeEnabled();await publish.hover();await page.mouse.down();
 const pressed=await current(page);await expect.poll(async()=>BigInt((await current(page)).verification.through)).toBeGreaterThan(BigInt(pressed.verification.through)+2n);await page.mouse.up();
 await expect.poll(async()=>({filed:register.receipts.length>0,errors:register.failures,state:await page.evaluate(()=>({choice:window.__slopbuzzHighScores?.client.state.choice,error:window.__slopbuzzHighScores?.client.state.error})),status:await page.locator('#high-scores-status').textContent()})).toMatchObject({filed:true,errors:[],state:{choice:'public',error:''}});
 await expect(page.locator('#high-scores-dialog')).toBeHidden();await expect(page.locator('#score-cluster [data-high-score-standing]')).toHaveText(['1','1','1','1']);
 await demoAction(page,'click','#reveal-all');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect.poll(()=>register.entry()?.status).toBe('completed');
 expect(register.entry()?.score).toBe(String(netPoints(await current(page))));expect(register.failures).toEqual([]);
 if(await page.locator('#watch-settings').isVisible())await page.locator('#watch-settings-close').click();
 await page.locator('#score-cluster [data-high-scores-open]:visible').first().click();await expect(page.locator('[data-high-scores-board]')).toContainText('Still Typing_7');
});
test('anonymous choice is remembered across runs and reloads; naming later and anonymizing preserve scores',async({page})=>{
 const register=await mockRegister(page);await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await run(page,'15','0');await expect(page.locator('#high-scores-dialog')).toBeVisible();await page.getByRole('button',{name:'Continue anonymously',exact:true}).click();
 await run(page,'30','0');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#high-scores-dialog')).toBeHidden();expect(register.receipts.length).toBeGreaterThan(0);expect(register.entry()?.name).toBe(anonymousName);
 await page.reload();await expect(page.locator('#health-value')).toHaveText('LIVE');await expect(page.locator('#high-scores-dialog')).toBeHidden();await page.locator('#score-cluster [data-high-scores-open]:visible').first().click();await expect(page.locator('[data-high-scores-board]')).toBeVisible();await expect(page.locator('#high-scores-name')).toBeHidden();await page.locator('[data-high-scores-tab="settings"]').click();await page.locator('#high-scores-name').fill('Later Clerk');await page.getByRole('button',{name:'Save name',exact:true}).click();await expect.poll(()=>register.receipts.length).toBeGreaterThan(0);await expect(page.locator('#high-scores-dialog')).toBeHidden();
 await page.locator('#score-cluster [data-high-scores-open]:visible').first().click();await page.locator('[data-high-scores-tab="settings"]').click();
 await page.getByRole('button',{name:'Use Anonymous Coward',exact:true}).click();await expect(page.locator('#high-scores-status')).toContainText('Anonymous Coward');expect(register.entry()?.name).toBe(anonymousName);expect(register.failures).toEqual([]);
});
test('visiting the public register and returning preserves the active mandate and live score',async({page})=>{
 await mockRegister(page);await page.addInitScript(key=>localStorage.setItem(key,'private'),participationKey);
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await run(page,'1000');const first=await current(page);
 await page.locator('#portfolio-open').click();await page.locator('#score-rules-link').click();await expect(page).toHaveURL(/\/scoring\//);
 await page.getByRole('link',{name:'Top scores',exact:true}).click();await expect(page).toHaveURL(/\/high-scores\/$/);await expect(page.locator('body')).toHaveAttribute('data-site-page','high-scores');await expect(page.locator('#high-scores-list')).toContainText(anonymousName);
 await expect.poll(async()=>{const r=await current(page);return r.id===first.id&&r.status==='active'&&BigInt(r.verification.through)>BigInt(first.verification.through);}).toBe(true);
 await page.getByRole('button',{name:'My participation',exact:true}).click();await expect(page.locator('#high-scores-dialog')).toBeVisible();await page.keyboard.press('Escape');
 await page.getByRole('link',{name:'Earn an unreasonable amount of credit',exact:true}).click();await department(page,'observe');const returned=await current(page);expect(returned.id).toBe(first.id);expect(returned.status).toBe('active');expect(BigInt(returned.verification.through)).toBeGreaterThan(BigInt(first.verification.through));
 await expect(page.locator('#score-cluster .score-trophy-button:visible svg')).toHaveCount(4);await expect(page.locator('#active-run-banner .score-trophy-button[data-scoreboard] svg')).toHaveCount(4);
 await expect(page.locator('#score-cluster [data-high-score-standing]')).toHaveText(['1','1','1','1']);await expect(page.locator('#active-run-banner [data-high-score-standing]')).toHaveText(['1','1','1','1']);
});
test('opening another tab cannot finalize or freeze the owner’s live high score',async({page,context})=>{
 const register=await mockRegister(page);await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await run(page,'1000');await expect(page.locator('#high-scores-dialog')).toBeVisible();
 await page.locator('#high-scores-name').fill('Two Tab Clerk');await page.getByRole('button',{name:'Save name',exact:true}).click();await expect.poll(()=>register.receipts.length).toBeGreaterThan(0);await page.keyboard.press('Escape');
 await demoAction(page,'click','#pause-reading');await expect.poll(async()=>register.entry()?.score===String(netPoints(await current(page)))).toBe(true);const paused=await current(page);
 const count=register.receipts.length,other=await context.newPage();
 try{await other.goto('/demo/');await expect(other.locator('#health-value')).toHaveText('LIVE');await expect.poll(()=>register.receipts.length).toBeGreaterThan(count);expect(register.entry()?.status).toBe('active');expect(register.entry()?.runId).toBe(paused.id);expect(register.failures).toEqual([]);}
 finally{await other.close();}
 await demoAction(page,'click','#pause-reading');await expect.poll(async()=>BigInt((await current(page)).verification.through)).toBeGreaterThan(BigInt(paused.verification.through)+2n);await expect.poll(()=>BigInt(register.entry()!.score)).toBeGreaterThan(netPoints(paused));expect(register.failures).toEqual([]);
});
test('trophy and register remain readable and keyboard accessible at 320px',async({page},info)=>{
 await mockRegister(page);await page.setViewportSize({width:320,height:568});await page.goto('/high-scores/');await expect(page.locator('#high-scores-list')).toContainText('No scores filed yet');await page.getByRole('button',{name:'My participation',exact:true}).click();
 await expect(page.locator('#high-scores-name')).toBeFocused();await expect(page.locator('#high-scores-dialog button:visible')).toHaveCount(2);await page.locator('#high-scores-name').fill('Bad!');await expect(page.locator('#high-scores-name')).toHaveValue('Bad');
 await page.locator('#high-scores-name').fill('Good_Name-2');expect((await new AxeBuilder({page}).include('#high-scores-dialog').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 if(info.project.name==='chromium-auto')await page.screenshot({path:info.outputPath('high-scores-320.png')});await page.keyboard.press('Escape');await expect(page.locator('#high-scores-dialog')).toBeHidden();await expect(page.getByRole('button',{name:'My participation',exact:true})).toBeFocused();
});
for(const pending of [false,true])test(`the first qualifying trophy click opens compact name entry${pending?' even before the rank response arrives':''}`,async({page})=>{
 const register=await mockRegister(page,true);await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await run(page,'1000');
 if(await page.locator('#company-menu').isVisible())await page.locator('#company-menu').click();
 await page.getByRole('navigation',{name:'Primary navigation',exact:true}).getByRole('link',{name:'About',exact:true}).click();await expect(page).toHaveURL(/\/about\/$/);
 const trophy=page.locator('#active-run-banner .score-trophy-button:visible').first();await expect(trophy.locator('svg')).toHaveCount(1);await expect(page.locator('#high-scores-dialog')).toBeHidden();
 if(!pending){register.releaseQualification();await expect(trophy).toHaveText('1');}
 await trophy.click();if(pending){await expect(page.locator('[data-high-scores-board]')).toBeVisible();register.releaseQualification();}
 await expect(page.locator('#high-scores-dialog')).toHaveAttribute('data-minimal','true');await expect(page.locator('#high-scores-title')).toContainText('Congratulations');await expect(page.locator('#high-scores-name')).toBeFocused();await expect(page.locator('#high-scores-dialog button:visible')).toHaveCount(2);
 await page.getByRole('button',{name:'Continue anonymously',exact:true}).click();await expect(trophy).toBeFocused();await trophy.click();await expect(page.locator('[data-high-scores-board]')).toBeVisible();await expect(page.locator('#high-scores-name')).toBeHidden();expect(register.receipts.length).toBeGreaterThan(0);expect(register.entry()?.name).toBe(anonymousName);
});

test('four-board tabs support keyboard selection, deep links, and stable navigation',async({page})=>{
 await mockRegister(page);await page.goto('/high-scores/?board=weekly');
 const tabs=page.locator('#high-scores-list [role="tab"]');await expect(tabs).toHaveCount(4);await expect(page.getByRole('tab',{name:'Weekly',exact:true})).toHaveAttribute('aria-selected','true');
 await expect(page.locator('#high-scores-list .scoreboard-window')).toHaveText('Last 7 days');await page.getByRole('tab',{name:'Weekly',exact:true}).focus();await page.keyboard.press('ArrowRight');
 await expect(page.getByRole('tab',{name:'Monthly',exact:true})).toBeFocused();await expect(page).toHaveURL(/board=monthly/);await expect(page.locator('#high-scores-list .scoreboard-window')).toHaveText('Last 30 days');
 await page.keyboard.press('End');await expect(page.getByRole('tab',{name:'All-time',exact:true})).toBeFocused();await expect(page.locator('#high-scores-list .scoreboard-window')).toHaveText('All recorded scores');
 await page.getByRole('button',{name:'My participation',exact:true}).click();await page.keyboard.press('Escape');await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await department(page,'observe');await page.locator('#score-cluster [data-high-scores-open]:visible').first().click();await expect(page.locator('#high-scores-dialog [role=tab][aria-selected=true]')).toHaveText('All-time');await page.keyboard.press('Escape');await page.goto('/high-scores/?board=all-time');
 expect((await new AxeBuilder({page}).include('#high-scores-list').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
});

test('score icons overlay four-digit ranks and open their matching board',async({page},info)=>{
 await mockRegister(page,false,1000);await page.setViewportSize({width:320,height:568});await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await run(page,'1000');await expect(page.locator('#high-scores-dialog')).toBeVisible();await page.getByRole('button',{name:'Continue anonymously',exact:true}).click();await demoAction(page,'click','#pause-reading');
 await expect(page.locator('#score-cluster [data-high-score-standing]')).toHaveText(['1,000','1,000','1,000','1,000']);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 for(const button of await page.locator('#score-cluster .scoreboard-rank:visible').all()){const size=await button.boundingBox();expect(size!.width).toBeGreaterThanOrEqual(44);expect(size!.height).toBeGreaterThanOrEqual(44);}
 if(info.project.name==='chromium-auto')await page.screenshot({path:info.outputPath('four-standing-icons-320.png')});
 await page.locator('#score-cluster [data-scoreboard="monthly"]').click();await expect(page.locator('#high-scores-dialog [role="tab"][aria-selected="true"]')).toHaveText('Monthly');await expect(page.locator('#high-scores-dialog .scoreboard-window')).toHaveText('Last 30 days');await page.keyboard.press('Escape');
 if(await page.locator('#company-menu').isVisible())await page.locator('#company-menu').click();await page.getByRole('navigation',{name:'Primary navigation',exact:true}).getByRole('link',{name:'About',exact:true}).click();await expect(page.locator('#active-run-banner')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);if(info.project.name==='chromium-auto')await page.screenshot({path:info.outputPath('four-standing-banner-320.png')});
});
