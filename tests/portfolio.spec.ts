import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {demoAction,department,watch} from './demo-controls';
import {portfolioStorageKey,newPortfolio,type PortfolioReceipt} from '../web/portfolio-model';
import {bestiary,catalogVersion} from '../catalog/bestiary';

test.beforeEach(async({page},info)=>{await page.route('**/runtime-config.json',async route=>{const response=await route.fetch();await route.fulfill({json:{...await response.json(),engine:info.project.metadata.engine}});});});
async function ready(page:Page){await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');}
async function run(page:Page,limit='15',pace='0'){
 await department(page,'authorize');await demoAction(page,'fill','#limit',limit);await demoAction(page,'selectOption','#display-speed',pace);await demoAction(page,'click','#run-button');
 if(pace==='0')await expect(page.locator('#run-status')).toContainText('Mandate complete');
}
async function receipt(page:Page){return page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).current as PortfolioReceipt,portfolioStorageKey);}
async function breakdown(page:Page){await watch(page);await page.click('#portfolio-open');await expect(page.locator('#portfolio-record')).toBeVisible();}
async function expectedPayments(page:Page,limit:number){
 return page.evaluate(async limit=>{
  const m=await import(new URL('/assets/tribunal.js',location.href).href),client=new m.BrowserRuntimeClient();
  try{
   const catalog=await(await client.request('/companions/catalog')).json(),entries=new Map<string,{rarity:string}>(catalog.entries.map((c:{id:string;rarity:string})=>[c.id,c]));
   const rates:Record<string,number>={Common:10,Uncommon:25,Rare:100,Legendary:400,Mythic:1000},counts:Record<string,number>={Common:0,Uncommon:0,Rare:0,Legendary:0,Mythic:0},seen=new Set<string>();let points=0,appearances=0;
   for(let start=1;start<=limit;start+=100){const window=await(await client.request(`/companions/window?start=${start}&count=100&strategy=factor-resonance-v1&seed=${limit}`)).json();for(const a of window.assignments)if(BigInt(a.ordinal)<=BigInt(limit)){const c=entries.get(a.companionId)!;counts[c.rarity]++;points+=rates[c.rarity];appearances++;seen.add(a.companionId);}}
   return {points,appearances,distinct:seen.size,counts};
  }finally{client.close();}
 },limit);
}

test('all appointments pay exact rarity rates beyond the retained output and rarest-five showcase',async({page})=>{
 await ready(page);await run(page,'1500');const expected=await expectedPayments(page,1500);expect(expected.appearances).toBe(700);expect(expected.distinct).toBeLessThan(expected.appearances);
 await expect(page.locator('#portfolio-open [data-portfolio-points]')).toHaveAttribute('data-exact',String(expected.points));
 const bank=await receipt(page);expect(bank.through).toBe('1500');expect(bank.unscored).toBe('0');expect(bank.seen).toHaveLength(expected.distinct);expect(bank.counts).toEqual(Object.fromEntries(Object.entries(expected.counts).map(([tier,count])=>[tier,String(count)])));
 expect((await page.locator('#output').textContent())!.trim().split('\n')).toHaveLength(1000);await breakdown(page);await expect(page.locator('#portfolio-appearances')).toHaveText('700');await expect(page.locator('#portfolio-distinct')).toHaveText(String(expected.distinct));await expect(page.locator('#portfolio-total')).toHaveText(expected.points.toLocaleString('en-US'));await expect(page.locator('#portfolio-tiers tr')).toHaveCount(5);await expect(page.locator('#portfolio-highest')).not.toHaveText('No appointed companion yet.');
});
test('biographies, authority swaps, replay and reopening the score cannot mint points',async({page})=>{
 await ready(page);await run(page);const original=await receipt(page);await watch(page,'companions');await expect(page.locator('#companion-list li')).toHaveCount(7);await page.locator('#companion-list button').first().click();await page.keyboard.press('Escape');
 await demoAction(page,'selectOption','#companion-strategy','ordinal-constellation-v1');await expect(page.locator('#companion-status')).toContainText('7');expect((await receipt(page)).counts).toEqual(original.counts);
 await demoAction(page,'click','#personnel-replay');await expect(page.locator('#run-status')).toContainText('Execution replay complete');expect(await receipt(page)).toEqual(original);await breakdown(page);await watch(page);await breakdown(page);expect((await receipt(page)).counts).toEqual(original.counts);
});
test('a fresh cached mandate resets its score and earns the same full payments',async({page})=>{
 await ready(page);await run(page);const first=await receipt(page);await run(page);const second=await receipt(page);expect(second.id).not.toBe(first.id);expect(second.counts).toEqual(first.counts);await expect(page.locator('#cache-result')).toHaveText('HIT');
 await breakdown(page);await page.selectOption('#portfolio-run','saved');await expect(page.locator('#portfolio-appearances')).toHaveText('7');await expect(page.locator('#portfolio-status')).toContainText('points banked');
});
test('pause, stop, replacement and reload retain banked points without advancing a stopped run',async({page})=>{
 await ready(page);await run(page,'150','225');await expect.poll(async()=>BigInt((await receipt(page)).through)).toBeGreaterThanOrEqual(6n);await demoAction(page,'click','#pause-reading');
 await expect.poll(async()=>{const r=await receipt(page);return r.through;}).toBe((await page.locator('#output').textContent())!.trim().split('\n').length.toString());const held=await receipt(page);await department(page,'authorize');
 await expect(page.locator('#active-run-banner')).toBeVisible();await expect(page.locator('#active-run-banner [data-portfolio-points]')).toHaveAttribute('data-exact',await page.locator('#portfolio-open [data-portfolio-points]').getAttribute('data-exact')||'');
 await page.click('#active-run-banner');await demoAction(page,'click','#stop-reading');expect((await receipt(page)).counts).toEqual(held.counts);await breakdown(page);await expect(page.locator('#portfolio-status')).toContainText('stopped');await page.reload();await expect(page.locator('#health-value')).toHaveText('LIVE');expect((await receipt(page)).counts).toEqual(held.counts);
 await run(page,'15');await breakdown(page);await page.selectOption('#portfolio-run','saved');await expect(page.locator('#portfolio-status')).toContainText('stopped');
});
test('turning companions on later cannot earn appointments disclosed while disabled',async({page})=>{
 await ready(page);await demoAction(page,'uncheck','#emoji-companions');await run(page);let bank=await receipt(page);expect(bank.disabled).toBe('7');expect(Object.values(bank.counts)).toEqual(['0','0','0','0','0']);
 await demoAction(page,'check','#emoji-companions');await watch(page,'companions');await expect(page.locator('#companion-list li')).toHaveCount(7);bank=await receipt(page);expect(bank.disabled).toBe('7');await expect(page.locator('#portfolio-open [data-portfolio-points]')).toHaveAttribute('data-exact','0');
});
test('a live authority change pays only subsequent appointments and replacement banks the unfinished run',async({page})=>{
 await ready(page);await run(page,'150','225');await expect.poll(async()=>BigInt((await receipt(page)).through)).toBeGreaterThanOrEqual(6n);await demoAction(page,'click','#pause-reading');
 const first=await receipt(page);await demoAction(page,'selectOption','#companion-strategy','ordinal-constellation-v1');expect((await receipt(page)).counts).toEqual(first.counts);await demoAction(page,'click','#pause-reading');
 await expect.poll(async()=>BigInt((await receipt(page)).through)).toBeGreaterThanOrEqual(BigInt(first.through)+6n);await demoAction(page,'click','#pause-reading');const switched=await receipt(page);expect(switched.authorityChanges).toBe('1');expect(BigInt(switched.authorities['ordinal-constellation-v1'])).toBeGreaterThan(0n);
 await run(page,'15');const saved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).saved as PortfolioReceipt,portfolioStorageKey);expect(saved.id).toBe(switched.id);expect(saved.status).toBe('replaced');expect(saved.counts).toEqual(switched.counts);await breakdown(page);await page.selectOption('#portfolio-run','saved');await expect(page.locator('#portfolio-status')).toContainText('Replaced mandate');
});
test('score breakdown remains readable and keyboard operable on mobile',async({page},info)=>{
 await page.setViewportSize({width:390,height:844});await ready(page);await run(page);if(info.project.name==='chromium-auto')await page.screenshot({path:info.outputPath('portfolio-observe-mobile.png')});await page.locator('#portfolio-open').focus();await page.keyboard.press('Enter');await expect(page.locator('#portfolio-record')).toBeVisible();await expect(page.locator('#evidence-title')).toBeFocused();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect((await new AxeBuilder({page}).include('#portfolio-record').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze()).violations).toEqual([]);
 if(info.project.name==='chromium-auto'){await page.screenshot({path:info.outputPath('portfolio-mobile.png'),fullPage:true});await page.setViewportSize({width:1280,height:800});await page.screenshot({path:info.outputPath('portfolio-desktop.png'),fullPage:true});}
});
test('enormous banked scores display compactly while preserving every exact digit',async({page})=>{
 const now='2026-11-18T12:00:00.000Z',k=10n**80n,c=Object.values(bestiary).find(c=>c.rarity==='Common')!,saved=newPortfolio('enormous',String(15n*k),'factor-resonance-v1',now);
 Object.assign(saved,{status:'stopped',through:saved.mandate,catalogVersion,counts:{Common:String(7n*k),Uncommon:'0',Rare:'0',Legendary:'0',Mythic:'0'},seen:[c.id],highest:{id:c.id,name:c.name,emoji:c.emoji,rarity:c.rarity,ordinal:'3'},authorities:{'factor-resonance-v1':String(7n*k)}});
 await page.addInitScript(({key,saved})=>localStorage.setItem(key,JSON.stringify({schema:key,current:saved})),{key:portfolioStorageKey,saved});await ready(page);await watch(page);await expect(page.locator('#portfolio-open [data-portfolio-points]')).toHaveAttribute('data-exact',String(70n*k));expect((await new AxeBuilder({page}).include('#portfolio-open').withRules(['label-content-name-mismatch']).analyze()).violations).toEqual([]);await breakdown(page);await expect(page.locator('#portfolio-total')).toHaveText((70n*k).toLocaleString('en-US'));await page.setViewportSize({width:390,height:844});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
