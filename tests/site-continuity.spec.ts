import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {demoNavigator} from '../scripts/demo-navigation';

test.beforeEach(async({page},info)=>{
 await page.route('**/runtime-config.json',async route=>{const response=await route.fetch();await route.fulfill({json:{...await response.json(),engine:info.project.metadata.engine}});});
 await page.addInitScript(()=>{
  const Native=Worker,state={id:crypto.randomUUID(),workers:0};Object.assign(window,{continuity:state});
  window.Worker=class extends Native{constructor(url:string|URL,options?:WorkerOptions){super(url,options);if(String(url).includes('runtime-worker.js'))state.workers++;}};
 });
});
async function header(page:Page,name:string){const nav=page.locator('#company-navigation');if(!await nav.isVisible())await page.click('#company-menu');await nav.getByRole('link',{name,exact:true}).click();}
async function start(page:Page,limit='30',hover=false,cadence='225'){
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await page.fill('#limit',limit);await page.setChecked('#authorize-executive-hovering',hover);await page.selectOption('#authorize-display-speed',cadence);await page.click('#run-button');
}
async function lines(page:Page){return page.locator('#output').evaluate(element=>(element.textContent||'').trim().split('\n').filter(Boolean).length);}
async function audit(page:Page){return page.evaluate(async()=>{const module=await import(new URL('/assets/tribunal.js',location.href).href),client=new module.BrowserRuntimeClient();try{return(await(await client.request('/audit/evidence')).json()).journalEntries;}finally{client.close();}});}

test('header journeys retain one document and runtime while ordinary production completes exactly once',async({page})=>{
 await start(page,'40');await expect(page.locator('#output')).toContainText('1\n');const before=await lines(page),identity=await page.evaluate(()=>(window as Window&{continuity?:unknown}).continuity);
 await page.locator('.brand').click();await expect(page.locator('body')).toHaveAttribute('data-site-page','home');await expect(page.locator('#operations-health-value')).toHaveText('LIVE');await expect(page.locator('#active-run-banner')).toBeVisible();
 await expect.poll(()=>lines(page)).toBeGreaterThan(before);await header(page,'API charter');await expect(page.locator('#api-total')).toContainText('ratified operations');await header(page,'About');await expect(page.locator('#founding-title')).toBeVisible();await header(page,'Live demo');
 await expect(page.locator('body')).toHaveAttribute('data-desk','observe');await expect(page.locator('#pause-reading')).toHaveAttribute('aria-pressed','false');await expect(page.locator('#run-status')).toContainText('Mandate complete');expect(await lines(page)).toBe(40);
 expect(await page.evaluate(()=>(window as Window&{continuity?:unknown}).continuity)).toEqual(identity);expect(await audit(page)).toBe(40);await expect(page.locator('#main')).toHaveCount(1);await expect(page.locator('.site-header')).toHaveCount(1);await expect(page.locator('#discovery-register')).toHaveCount(1);
});

test('supervised production advances off-page and resumes real painting without Play across history and repeated visits',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared rendering tested once per browser.');await start(page,'15',true,'0');await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered','true',{timeout:60000});const before=Number(await page.locator('#supervision-pane').getAttribute('data-observed-steps'));
 await header(page,'API charter');await expect(page.locator('#api-total')).toContainText('ratified operations');await expect.poll(async()=>Number(await page.locator('#supervision-pane').getAttribute('data-observed-steps'))).toBeGreaterThan(before);
 await page.goBack();await expect(page.locator('body')).toHaveAttribute('data-site-page','demo');await expect(page.locator('#supervision-pause')).toHaveAttribute('aria-pressed','false');const returned=Number(await page.locator('#supervision-pane').getAttribute('data-observed-steps'));
 await expect.poll(async()=>Number(await page.locator('#supervision-pane').getAttribute('data-observed-steps'))).toBeGreaterThan(returned);await page.goForward();await expect(page.locator('body')).toHaveAttribute('data-site-page','api');await page.click('#active-run-banner');await expect(page.locator('body')).toHaveAttribute('data-desk','observe');await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-renderer','babylon');await expect(page.locator('#supervision-pause')).toHaveAttribute('aria-pressed','false');await page.click('#stop-reading');expect(await audit(page)).toBe(15);
});

test('completion away from the demo remains completed, and explicit pauses and replacement runs retain their meaning',async({page})=>{
 await start(page,'3',false,'800');await header(page,'About');await expect(page.locator('#founding-title')).toBeVisible();await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#active-run-banner')).toBeHidden();await header(page,'Live demo');await expect(page.locator('#output')).toHaveText('1\n2\nFizz\n');expect(await audit(page)).toBe(3);
 await demoNavigator(page).desk('authorize');await page.fill('#limit','50');await page.selectOption('#authorize-display-speed','225');await page.click('#run-button');await expect(page.locator('#output')).toContainText('1\n');await page.click('#pause-reading');await header(page,'API charter');await expect(page.locator('#api-total')).toContainText('ratified operations');const held=await lines(page);await header(page,'About');await header(page,'Live demo');await expect(page.locator('#pause-reading')).toHaveAttribute('aria-pressed','true');expect(await lines(page)).toBe(held);
 await demoNavigator(page).desk('authorize');await page.fill('#limit','2');await page.selectOption('#authorize-display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#output')).toHaveText('1\n2\n');expect(await audit(page)).toBe(55);
});

test('retained pages keep working, remain accessible, and have a bounded set of controllers',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared page lifecycle tested once per browser.');await start(page,'15');await page.click('#stop-reading');
 for(const name of ['API charter','About','Validation tribunal','API charter']){await header(page,name);await expect(page.locator('#main')).toHaveCount(1);await expect(page.locator('main:visible')).toHaveCount(1);}
 await expect(page.locator('#api-total')).toContainText('ratified operations');await page.fill('#api-search','Fizz');await expect(page.locator('#api-status')).not.toHaveText('');
 await page.locator('.brand').click();await expect(page.locator('#operations-health-value')).toHaveText('LIVE');await page.locator('.site-footer').getByRole('link',{name:'About',exact:true}).click();await expect(page.locator('#founding-title')).toBeVisible();
 const scan=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(scan.violations).toEqual([]);expect(await page.evaluate(()=>(window as Window&{continuity?:{workers:number}}).continuity?.workers)).toBe(1);expect(await page.locator('[data-site-page]').count()).toBeLessThanOrEqual(13);
 await expect(page.locator('.repository-link')).toHaveAttribute('target','_blank');await expect(page.locator('.repository-link')).toHaveAttribute('rel','noopener noreferrer');
});

test.describe('navigation and rendering fault recovery',()=>{
 test.use({serviceWorkers:'block'});
 test('a failed page fetch preserves the active run and offers a working retry',async({page})=>{
  let refused=false;await page.route('**/api/',route=>{if(!refused){refused=true;return route.abort();}return route.continue();});await start(page,'30');await expect(page.locator('#output')).toContainText('1\n');const before=await lines(page);await header(page,'API charter');await expect(page.locator('.site-navigation-notice')).toContainText('Any authorized mandate continues');await expect.poll(()=>lines(page)).toBeGreaterThan(before);await page.getByRole('button',{name:'Resubmit the navigation paperwork'}).click();await expect(page.locator('#api-total')).toContainText('ratified operations');await header(page,'Live demo');await expect(page.locator('#pause-reading')).toHaveAttribute('aria-pressed','false');
  // Completion can legitimately beat navigation on a busy host; prove the outcome instead of racing Stop.
  await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#output')).toHaveText(Array.from({length:30},(_,i)=>{const n=i+1;return n%15===0?'FizzBuzz':n%3===0?'Fizz':n%5===0?'Buzz':String(n);}).join('\n')+'\n');expect(await audit(page)).toBe(30);
 });
 test('lost animation callbacks cannot strand visible production or require a manual Play',async({page},info)=>{
  test.skip(info.project.metadata.engine==='js','Shared scheduler tested once per browser.');await start(page,'1',true,'0');await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered','true',{timeout:60000});
  await page.evaluate(()=>{window.requestAnimationFrame=()=>2147483000;});await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-renderer','evidence');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#output')).toHaveText('1\n');await expect(page.locator('#supervision-pause')).toHaveAttribute('aria-pressed','false');expect(await audit(page)).toBe(1);
 });
});
