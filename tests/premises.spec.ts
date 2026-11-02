import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test.beforeEach(async({page},info)=>{await page.route('**/runtime-config.json',async route=>{const r=await route.fetch();await route.fulfill({json:{...await r.json(),engine:info.project.metadata.engine}});});});
async function invoke(page:Page,path:string){return page.evaluate(async path=>{const m=await import(new URL('/assets/tribunal.js',location.href).href);const c=new m.BrowserRuntimeClient();try{const r=await c.request(path);return {status:r.status,body:await r.json()};}finally{c.close();}},path);}
async function run(page:Page){await page.selectOption('#display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');}
const expected=Array.from({length:15},(_,i)=>{const n=i+1;return n%15===0?'FizzBuzz':n%3===0?'Fizz':n%5===0?'Buzz':String(n);}).join('\n')+'\n';

test('actual production identifies hidden tenants before publication; replay is stable and cache hits invent no new premises',async({page})=>{
 const network:string[]=[];page.on('request',r=>{if(new URL(r.url()).pathname.startsWith('/premises/'))network.push(r.url());});
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await run(page);expect(await page.locator('#output').textContent()).toBe(expected);
 const seven=page.locator('#chronicle-entries [data-premises-ordinal="7"]');await expect(seven).toContainText('NO-BREAK SPACE');await expect(seven).toContainText('U+00A0');await expect(seven).toContainText('Reinspection confirmed 0 characters');
 await expect(page.locator('#chronicle-entries [data-premises-ordinal="14"]')).toContainText('LINE FEED');
 const prose=await page.locator('#chronicle-entries article[data-ordinal="7"] .chronicle-prose').allTextContents();const before=await invoke(page,'/audit/evidence');expect(before.body.journalEntries).toBe(15);
 await page.click('#personnel-replay');await expect(page.locator('#run-status')).toContainText('Execution replay complete');expect(await page.locator('#chronicle-entries article[data-ordinal="7"] .chronicle-prose').allTextContents()).toEqual(prose);
 await run(page);await expect(page.locator('#cache-result')).toHaveText('HIT');await expect(page.locator('#chronicle-entries .premises-card')).toHaveCount(0);expect((await invoke(page,'/audit/evidence')).body.headDigest).toBe(before.body.headDigest);expect(network).toEqual([]);
});

test('ten named hidden occupants and four management failures use the real offices without numerical side effects',async({page})=>{
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');const before=await invoke(page,'/audit/evidence');const output=await page.locator('#output').textContent();
 for(const [scenario,code]of [['non-breaking-space','U+00A0'],['newline','U+000A'],['tab','U+0009'],['vertical-tab','U+000B'],['bell','U+0007'],['carriage-return','U+000D'],['form-feed','U+000C'],['zero-width-space','U+200B'],['byte-order-mark','U+FEFF'],['word-joiner','U+2060']]){
  await page.selectOption('#premises-scenario',scenario);await page.click('#premises-submit');await expect(page.locator('#premises-status')).toContainText(code);await expect(page.locator('#premises-result')).toContainText('Reinspection confirmed 0 characters');await expect(page.locator('#premises-result details')).toHaveCount(6);
 }
 for(const scenario of ['occupied','failed-eviction','borrowed-lease','reused-lease']){await page.selectOption('#premises-scenario',scenario);await page.click('#premises-submit');await expect(page.locator('#premises-status')).toContainText('Occupancy refused');await expect(page.locator('#premises-result')).toContainText('No usable lease issued');}
 await page.fill('#premises-ordinal','0');await page.click('#premises-submit');await expect(page.locator('#premises-ordinal')).toBeFocused();await expect(page.locator('#premises-ordinal')).toHaveAttribute('aria-invalid','true');
 expect(await page.locator('#output').textContent()).toBe(output);expect((await invoke(page,'/audit/evidence')).body.headDigest).toBe(before.body.headDigest);
});

test('thousand-digit windows use the same leased premises and keep hidden occupants out of exact output',async({page})=>{
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');const ordinal='7'.repeat(1000);const response=await invoke(page,`/fizzbuzz/window/explained?start=${ordinal}&count=1`);expect(response.status).toBe(200);const n=BigInt(ordinal);expect(response.body.text).toBe((n%15n===0n?'FizzBuzz':n%3n===0n?'Fizz':n%5n===0n?'Buzz':ordinal)+'\n');
 const record=response.body.trace.events.find((e:{kind:string})=>e.kind==='PREMISES_CERTIFICATE');expect(record.ordinal).toBe(ordinal);expect(JSON.parse(record.document).tenants[0].codePoint).toBe('U+00A0');expect((await invoke(page,'/audit/evidence')).body.journalEntries).toBe(0);
});

test('the human API charter exposes property scenarios and exact prospective tenants',async({page})=>{
 await page.goto('/api/');const card=page.locator('#operation-rehearsePremisesInspection');await card.locator('summary').first().click();await card.getByRole('combobox',{name:'Property condition'}).selectOption('bell');await card.getByLabel('Prospective numerical tenant').fill('35');await card.getByRole('button',{name:'Send GET request to /premises/rehearsal'}).click();await expect(card.getByRole('status')).toContainText('HTTP 200');await expect(card.getByRole('region',{name:'GET /premises/rehearsal response',exact:true})).toContainText('U+0007');
});

test('property inspection and office papers remain readable at mobile widths and enlarged text',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Duplicate DOM inspection');await page.setViewportSize({width:320,height:844});await page.goto('/demo/');await page.selectOption('#premises-scenario','bell');await page.locator('#premises-submit').focus();await page.keyboard.press('Enter');await expect(page.locator('#premises-status')).toContainText('U+0007');await expect(page.locator('#premises-submit')).toBeFocused();await page.locator('#premises-result summary').first().focus();await page.keyboard.press('Enter');await expect(page.locator('#premises-result details').first()).toHaveAttribute('open','');
 await page.evaluate(()=>{const sheet=document.styleSheets[0];for(const rule of ['html{font-size:200% !important}','*{letter-spacing:.12em !important;word-spacing:.16em !important;line-height:1.5 !important}'])sheet.insertRule(rule,sheet.cssRules.length);});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 expect((await new AxeBuilder({page}).include('.premises-panel').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']).analyze()).violations).toEqual([]);
});
