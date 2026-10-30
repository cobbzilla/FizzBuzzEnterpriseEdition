import {test,expect} from '@playwright/test';
test.use({serviceWorkers:'block',userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'});
import {gunzipSync} from 'node:zlib';
test('cookieless traffic and explicit usage are sanitized and non-blocking',async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(navigator,'webdriver',{get:()=>false});Object.defineProperty(navigator,'userAgentData',{get:()=>undefined});});
 const events:any[]=[];
 await page.route('**/analytics-config.json',r=>r.fulfill({json:{enabled:true,token:'phc_test',allowLocal:true,environment:'preview'}}));
 await page.route('https://us.i.posthog.com/**',async route=>{
  const request=route.request();const raw=request.postDataBuffer();
  if(raw){try{const data=JSON.parse(raw[0]===31&&raw[1]===139?gunzipSync(raw).toString():raw.toString());events.push(...(data.batch|| (Array.isArray(data)?data:[data])));}catch{}}
  await route.fulfill({json:{status:1}});
 });
 await page.goto('/?secret=do-not-send&utm_campaign=launch');
 await expect.poll(()=>events.filter(e=>e.event==='$pageview').length).toBe(1);
 await expect(page.locator('#health-value')).toHaveText('LIVE');
 await page.fill('#limit','3');await page.click('#run-button');
 await expect.poll(()=>events.filter(e=>e.event==='slopbuzz_demo_run').length).toBe(1);
 const demo=events.find(e=>e.event==='slopbuzz_demo_run');expect(demo.properties.outcome).toBe('success');
 expect(demo.properties.environment).toBe('preview');
 expect(JSON.stringify(events)).not.toContain('do-not-send');expect(demo.properties).not.toHaveProperty('limit');
 expect((await page.context().cookies()).filter(c=>c.name.includes('ph_'))).toEqual([]);
 expect(await page.evaluate(()=>Object.keys(localStorage).filter(k=>k.startsWith('ph_')))).toEqual([]);
 await page.goto('/api/');await expect(page.locator('#api-total')).toContainText('ratified');
 const card=page.locator('.api-card').first();await card.locator('summary').first().click();await card.getByRole('button').click();
 await expect.poll(()=>events.filter(e=>e.event==='slopbuzz_api_request').length).toBe(1);
 await page.route('https://us.i.posthog.com/**',route=>route.abort());
 await page.goto('/');await page.selectOption('#display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');
});
test('cookieless delivery continues when DNT and GPC are both enabled',async({page})=>{
 await page.addInitScript(()=>{
  Object.defineProperty(navigator,'webdriver',{get:()=>false});
  Object.defineProperty(navigator,'userAgentData',{get:()=>undefined});
  Object.defineProperty(navigator,'doNotTrack',{value:'1'});
  Object.defineProperty(navigator,'globalPrivacyControl',{value:true});
 });
 await page.route('**/analytics-config.json',r=>r.fulfill({json:{enabled:true,token:'phc_test',allowLocal:true,environment:'preview'}}));
 const events:any[]=[];
 await page.route('https://us.i.posthog.com/**',async route=>{
  const raw=route.request().postDataBuffer();
  if(raw){const data=JSON.parse(raw[0]===31&&raw[1]===139?gunzipSync(raw).toString():raw.toString());events.push(...(data.batch||(Array.isArray(data)?data:[data])));}
  await route.fulfill({json:{status:1}});
 });
 await page.goto('/');await expect(page.locator('#health-value')).toHaveText('LIVE');
 await expect.poll(()=>events.filter(e=>e.event==='$pageview').length).toBe(1);
 await page.selectOption('#display-speed','0');await page.click('#run-button');
 await expect.poll(()=>events.filter(e=>e.event==='slopbuzz_demo_run').length).toBe(1);
 expect(events.every(e=>e.properties.distinct_id==='$posthog_cookieless')).toBe(true);
 expect((await page.context().cookies()).filter(c=>c.name.includes('ph_'))).toEqual([]);
 expect(await page.evaluate(()=>Object.keys(localStorage).filter(k=>k.startsWith('ph_')))).toEqual([]);
});
test('explicit analytics disablement and default localhost policy prevent initialization',async({page})=>{
 const requests:string[]=[];
 page.on('request',r=>{if(r.url().includes('posthog.com'))requests.push(r.url());});
 for(const config of [{enabled:false,token:'phc_test',allowLocal:true},{enabled:true,token:'phc_test',allowLocal:false}]) {
  await page.route('**/analytics-config.json',r=>r.fulfill({json:config}));
  await page.goto('/');await expect(page.locator('#health-value')).toHaveText('LIVE');
  expect(requests).toEqual([]);
  await page.unroute('**/analytics-config.json');
 }
});
