import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
async function invoke(page:Page,path:string) {
 return page.evaluate(async path=>{
  const module=await import(new URL('assets/tribunal.js',location.origin+'/').href);
  const client=new module.BrowserRuntimeClient();try{const r=await client.request(path);return {status:r.status,body:await r.text(),cache:r.headers.get('X-SlopBuzz-Cache')};}finally{client.close();}
 },path);
}
test.beforeEach(async({page},info)=>{
 await page.route('**/runtime-config.json',async route=>{const r=await route.fetch();await route.fulfill({json:{...await r.json(),engine:info.project.metadata.engine}});});
});
test('numeric character governance is opt-in and can correct the current value',async({page})=>{
 await page.goto('/demo/');
 await expect(page.locator('#limit')).toHaveAttribute('type','text');
 await expect(page.locator('#limit')).not.toHaveAttribute('max');
 await expect(page.locator('#numeric-autocorrect')).not.toBeChecked();
 await page.fill('#limit','Dept -1,234.5x');
 await expect(page.locator('#limit')).toHaveValue('Dept -1,234.5x');
 await page.click('#run-button');await expect(page.locator('#limit')).toHaveAttribute('aria-invalid','true');
 await page.getByRole('checkbox',{name:'Enforce Numeric Character Governance'}).check();
 await expect(page.locator('#limit')).toHaveValue('12345');
 await expect(page.locator('#limit')).not.toHaveAttribute('aria-invalid','true');
 await page.fill('#limit','a9,007,199,254,740,993 obligations');
 await expect(page.locator('#limit')).toHaveValue('9007199254740993');
 await expect(page.locator('#magnitude-warning')).toBeVisible();
 await page.uncheck('#numeric-autocorrect');await page.fill('#limit','letters can remain');
 await expect(page.locator('#limit')).toHaveValue('letters can remain');
 await expect(page.locator('#magnitude-warning')).toBeHidden();
});
test('a mandate above one thousand completes with exact rolling output',async({page})=>{
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');
 const before=await invoke(page,'/audit/evidence');
 await page.fill('#limit','1234');await page.selectOption('#display-speed','0');await page.click('#run-button');
 await expect(page.locator('#run-status')).toContainText('Mandate complete. 1234 lines disclosed');
 await expect(page.locator('#cache-result')).toHaveText('BYPASS');
 await expect(page.locator('#magnitude-warning')).toBeHidden();
 const lines=(await page.locator('#output').textContent())!.trim().split('\n');
 const expected=Array.from({length:1000},(_,i)=>{const n=i+235;return n%15===0?'FizzBuzz':n%3===0?'Fizz':n%5===0?'Buzz':String(n);});
 expect(lines).toEqual(expected);
 expect(await page.locator('#output').evaluate(e=>e.scrollTop+e.clientHeight>=e.scrollHeight-2)).toBe(true);
 const after=await invoke(page,'/audit/evidence');expect(JSON.parse(after.body).journalEntries).toBe(JSON.parse(before.body).journalEntries);
});
test('BigInt mandates keep their exact bound, rotate a warning and can be stopped',async({page})=>{
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');
 await page.fill('#limit','9007199254740991');await expect(page.locator('#magnitude-warning')).toBeHidden();
 await page.fill('#limit','9007199254740993');await expect(page.locator('#magnitude-warning')).toBeVisible();
 const first=await page.locator('#magnitude-warning').textContent();
 await page.fill('#limit','9007199254740994');expect(await page.locator('#magnitude-warning').textContent()).not.toBe(first);
 await page.fill('#limit','9007199254740993');await page.selectOption('#display-speed','225');await page.click('#run-button');
 await expect(page.locator('#output-count')).toContainText('of 9007199254740993 lines');
 await expect(page.locator('#forecast-units')).toHaveText('13811038857269522');
 await page.click('#stop-reading');await expect(page.locator('#run-status')).toContainText('Proceedings stopped');
 const stopped=await page.locator('#output').textContent();await page.waitForTimeout(300);
 expect(await page.locator('#output').textContent()).toBe(stopped);
 await page.fill('#limit','15');await page.selectOption('#display-speed','0');await page.click('#run-button');
 await expect(page.locator('#run-status')).toContainText('Mandate complete');
 await expect(page.locator('#magnitude-warning')).toBeHidden();
});
test('extended disclosure can pause and waive delays without losing browser responsiveness',async({page})=>{
 await page.goto('/demo/');await page.fill('#limit','1001');await page.selectOption('#display-speed','225');await page.click('#run-button');
 await expect(page.locator('#output-count')).toContainText('of 1001 lines');
 await page.click('#pause-reading');const paused=await page.locator('#output').textContent();await page.waitForTimeout(300);
 expect(await page.locator('#output').textContent()).toBe(paused);
 await page.getByRole('button',{name:'Waive disclosure delays',exact:true}).click();
 await expect(page.locator('#run-status')).toContainText('Mandate complete. 1001 lines disclosed');
});
test('Java BigInteger windows agree with a native BigInt oracle beyond machine bounds',async({page})=>{
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');
 for(const start of ['2147483646','9007199254740990','9223372036854775807','100000000000000000000000000000000000000000000000001','1'+'0'.repeat(1000)+'1']) {
  const result=await invoke(page,`/fizzbuzz/window?start=${start}&count=20`);expect(result.status).toBe(200);
  const expected=Array.from({length:20},(_,i)=>{const n=BigInt(start)+BigInt(i);return n%15n===0n?'FizzBuzz':n%3n===0n?'Fizz':n%5n===0n?'Buzz':String(n);}).join('\n')+'\n';
  expect(result.body).toBe(expected);
  const forecast=JSON.parse((await invoke(page,`/capacity/forecast/extended?limit=${start}`)).body);
  const n=BigInt(start);expect(forecast.totalLines).toBe(start);expect(forecast.workloadUnits).toBe(String(n+n/3n+n/5n));
 }
});
test('extended API request desks preserve decimal strings and finite window validation',async({page})=>{
 await page.goto('/api/');const card=page.locator('#operation-discloseMagnitudeWindow');
 await card.locator('summary').first().click();
 await card.getByRole('textbox',{name:'Starting ordinal'}).fill('9007199254740993');
 await card.getByRole('spinbutton',{name:'Window lines'}).fill('2');await card.getByRole('button').click();
 await expect(card.getByRole('status')).toContainText('HTTP 200');
 await expect(card.getByRole('region',{name:'GET /fizzbuzz/window response'})).toContainText('9007199254740994');
 await card.getByRole('spinbutton',{name:'Window lines'}).fill('101');await card.getByRole('button').click();
 await expect(card.getByRole('status')).toHaveText('Enter a window count from 1 through 100.');
});
test('oversized policy notice and governance controls reflow accessibly',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','DOM is audited once per browser; arithmetic is checked in both engines.');
 await page.goto('/demo/');await page.fill('#limit','1'+'0'.repeat(100));await page.check('#numeric-autocorrect');
 const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
 expect(audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
 await page.setViewportSize({width:320,height:800});
 await page.evaluate(()=>document.styleSheets[0].insertRule('html {font-size:200% !important}'));
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
