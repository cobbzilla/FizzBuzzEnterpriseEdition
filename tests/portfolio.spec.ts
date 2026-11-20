import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {demoAction,department,watch} from './demo-controls';
import {scoringStorageKey,netPoints,type ScoringRun} from '../web/scoring-service';
import {rulesIdentity,guidePath} from '../web/scoring-rules';
import {portfolioStorageKey,newPortfolio} from '../web/portfolio-model';
import {bestiary,catalogVersion} from '../catalog/bestiary';

test.beforeEach(async({page},info)=>{await page.route('**/runtime-config.json',async route=>{const response=await route.fetch();await route.fulfill({json:{...await response.json(),engine:info.project.metadata.engine}});});});
async function ready(page:Page){await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');}
async function run(page:Page,limit='15',pace='0'){
 await department(page,'authorize');await demoAction(page,'fill','#limit',limit);await demoAction(page,'selectOption','#display-speed',pace);await demoAction(page,'click','#run-button');
 if(pace==='0')await expect(page.locator('#run-status')).toContainText('Mandate complete');
}
async function receipt(page:Page){return page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).current as ScoringRun,scoringStorageKey);}
async function breakdown(page:Page){await watch(page);await page.click('#portfolio-open');await expect(page.locator('#score-dialog')).toBeVisible();await expect(page.locator('#portfolio-record')).toBeVisible();}
async function close(page:Page){await page.click('#score-close');await expect(page.locator('#score-dialog')).not.toBeVisible();}
async function expectedAppointments(page:Page,limit:number){
 return page.evaluate(async limit=>{
  const m=await import(new URL('/assets/tribunal.js',location.href).href),client=new m.BrowserRuntimeClient();
  try{
   const catalog=await(await client.request('/companions/catalog')).json(),entries=new Map<string,{rarity:string;kind:string}>(catalog.entries.map((c:{id:string;rarity:string;kind:string})=>[c.id,c]));
   const salary:Record<string,bigint>={Common:100n,Uncommon:250n,Rare:1000n,Legendary:10000n,Mythic:100000n},rarity:Record<string,bigint>={Common:1n,Uncommon:2n,Rare:5n,Legendary:10n,Mythic:25n},entrance:Record<string,bigint>={Common:0n,Uncommon:0n,Rare:0n,Legendary:250000n,Mythic:2500000n};
   const counts:Record<string,number>={Common:0,Uncommon:0,Rare:0,Legendary:0,Mythic:0},identities=new Map<string,number>();let points=0n,appearances=0;
   for(let start=1;start<=limit;start+=100){const window=await(await client.request(`/companions/window?start=${start}&count=100&strategy=factor-resonance-v1&seed=${limit}`)).json();for(const a of window.assignments)if(BigInt(a.ordinal)<=BigInt(limit)){
    const c=entries.get(a.companionId)!,count=(identities.get(a.companionId)||0)+1;identities.set(a.companionId,count);counts[c.rarity]++;appearances++;
    const ordinal=Number(a.ordinal),milestone=Math.floor((ordinal-1)/250)*250,offset=ordinal-milestone;
    const [factor,duration]=milestone%5000===0?[10,1]:milestone%1000===0?[5,4]:milestone%500===0?[3,10]:[2,20];
    const boost=milestone>0&&offset<=duration?BigInt(factor):1n;
    points+=boost*(rarity[c.rarity]*(salary[c.rarity]+(c.kind==='pair'?250n:0n)+(count%10===0?500n:0n))+(count===1?1000n:0n))+entrance[c.rarity];
   }}
   return {points:String(points),appearances,distinct:identities.size,counts};
  }finally{client.close();}
 },limit);
}

test('every repeated appointment pays exactly across 1500 lines and bounded output retention',async({page})=>{
 await ready(page);await run(page,'1500');const expected=await expectedAppointments(page,1500),bank=await receipt(page);expect(expected.appearances).toBe(700);expect(expected.distinct).toBeLessThan(expected.appearances);
 expect(bank.categories.Companions).toBe(expected.points);expect(bank.verification.through).toBe('1500');expect(bank.verification.unscored).toBe('0');expect(bank.partial).toBe(false);expect(bank.verification.seen).toHaveLength(expected.distinct);expect(bank.counters.boosted).toBe('74');
 expect(bank.verification.counts).toEqual(Object.fromEntries(Object.entries(expected.counts).map(([tier,count])=>[tier,String(count)])));expect(bank.recent.length).toBeLessThanOrEqual(100);
 await expect(page.locator('#portfolio-open [data-portfolio-points]')).toHaveAttribute('data-exact',String(netPoints(bank)));expect((await page.locator('#output').textContent())!.trim().split('\n')).toHaveLength(1000);
 await breakdown(page);await expect(page.locator('#portfolio-appearances')).toHaveText('700');await expect(page.locator('#portfolio-total')).toHaveText(netPoints(bank).toLocaleString('en-US'));await expect(page.locator('#portfolio-tiers tr')).toHaveCount(5);await expect(page.locator('#portfolio-highest')).toContainText('Highest rarity');
});
test('completed biographies, authority swaps, replay and opening accounts cannot mint points',async({page})=>{
 await ready(page);await run(page);const original=await receipt(page);await watch(page,'companions');await page.locator('#companion-list button').first().click();await page.keyboard.press('Escape');
 await demoAction(page,'selectOption','#companion-strategy','ordinal-constellation-v1');await expect(page.locator('#companion-status')).toContainText('7');expect(await receipt(page)).toEqual(original);
 await demoAction(page,'click','#personnel-replay');await expect(page.locator('#run-status')).toContainText('Execution replay complete');expect(await receipt(page)).toEqual(original);await breakdown(page);await close(page);await breakdown(page);expect(await receipt(page)).toEqual(original);
});
test('cached runs pay actual reuse work and the same full companion salaries',async({page})=>{
 await ready(page);await run(page);const first=await receipt(page);expect(BigInt(first.buckets['acceptedGlyph|1'].points)).toBeGreaterThan(0n);await run(page);const second=await receipt(page);expect(second.id).not.toBe(first.id);expect(second.categories.Companions).toBe(first.categories.Companions);await expect(page.locator('#cache-result')).toHaveText('HIT');
 expect(second.buckets['priorExam|1'].quantity).toBe('5');expect(second.buckets['acceptedGlyph|1']).toBeUndefined();expect(second.partial).toBe(false);expect(BigInt(second.dividend)).toBeGreaterThan(0n);
 await breakdown(page);await page.selectOption('#portfolio-run','saved');await expect(page.locator('#portfolio-appearances')).toHaveText('7');await expect(page.locator('#portfolio-status')).toContainText('points banked');
});
test('pause, stop, replacement and reload retain the same banked net points',async({page})=>{
 await ready(page);await run(page,'150','225');await expect.poll(async()=>BigInt((await receipt(page)).verification.through)).toBeGreaterThanOrEqual(6n);await demoAction(page,'click','#pause-reading');
 await expect.poll(async()=>(await receipt(page)).verification.through).toBe((await page.locator('#output').textContent())!.trim().split('\n').length.toString());const held=await receipt(page);await department(page,'authorize');
 await expect(page.locator('#active-run-banner')).toBeVisible();await expect(page.locator('#active-run-banner [data-portfolio-points]')).toHaveAttribute('data-exact',String(netPoints(held)));
 await page.click('#active-run-return');await demoAction(page,'click','#stop-reading');expect(netPoints(await receipt(page))).toBe(netPoints(held));expect((await receipt(page)).dividend).toBe('0');await breakdown(page);await expect(page.locator('#portfolio-status')).toContainText('stopped');await page.reload();await expect(page.locator('#health-value')).toHaveText('LIVE');expect(netPoints(await receipt(page))).toBe(netPoints(held));
 await run(page);await breakdown(page);await page.selectOption('#portfolio-run','saved');await expect(page.locator('#portfolio-status')).toContainText('stopped');
});
test('companions disabled still earn procedural output points without retroactive appointments',async({page})=>{
 await ready(page);await demoAction(page,'uncheck','#emoji-companions');await run(page);const before=await receipt(page);expect(before.verification.disabled).toBe('7');expect(Object.values(before.verification.counts)).toEqual(['0','0','0','0','0']);expect(BigInt(before.categories.Publication!)).toBe(253n);expect(before.categories.Companions).toBeUndefined();
 await demoAction(page,'check','#emoji-companions');await watch(page,'companions');await expect(page.locator('#companion-list li')).toHaveCount(7);expect(netPoints(await receipt(page))).toBe(netPoints(before));
});
test('a live authority change pays subsequent appointments and replacement retains old conditions',async({page})=>{
 await ready(page);await run(page,'150','225');await expect.poll(async()=>BigInt((await receipt(page)).verification.through)).toBeGreaterThanOrEqual(6n);await demoAction(page,'click','#pause-reading');
 const first=await receipt(page);await demoAction(page,'selectOption','#companion-strategy','ordinal-constellation-v1');expect((await receipt(page)).verification.counts).toEqual(first.verification.counts);await demoAction(page,'click','#pause-reading');
 await expect.poll(async()=>BigInt((await receipt(page)).verification.through)).toBeGreaterThanOrEqual(BigInt(first.verification.through)+6n);await demoAction(page,'click','#pause-reading');const switched=await receipt(page);expect(switched.verification.authorityChanges).toBe('1');expect(BigInt(switched.verification.authorities['ordinal-constellation-v1'])).toBeGreaterThan(0n);
 await run(page);const saved=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).saved as ScoringRun,scoringStorageKey);expect(saved.id).toBe(switched.id);expect(saved.status).toBe('replaced');expect(saved.verification.counts).toEqual(switched.verification.counts);await breakdown(page);await page.selectOption('#portfolio-run','saved');await expect(page.locator('#portfolio-status')).toContainText('Replaced mandate');
});
test('score overlay is readable at 320px, keyboard dismissible, and exposes locked and earned SVG badges',async({page},info)=>{
 await page.setViewportSize({width:320,height:568});await ready(page);await run(page);await page.locator('#portfolio-open').focus();await page.keyboard.press('Enter');await expect(page.locator('#score-dialog')).toBeVisible();await expect(page.locator('#score-title')).toBeFocused();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);expect((await new AxeBuilder({page}).include('#score-dialog').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze()).violations).toEqual([]);
 await page.click('[data-score-tab="badges"]');await expect(page.locator('.score-badge')).toHaveCount(16);await expect(page.locator('.score-badge svg')).toHaveCount(16);await expect(page.locator('[data-badge="bingo"]')).toHaveAttribute('data-earned','true');await expect(page.locator('[data-badge="century"]')).toContainText('Locked');expect((await new AxeBuilder({page}).include('#score-dialog').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()).violations).toEqual([]);
 if(info.project.name==='chromium-auto')await page.screenshot({path:info.outputPath('scoring-badges-320.png')});await page.keyboard.press('Escape');await expect(page.locator('#score-dialog')).not.toBeVisible();await expect(page.locator('#portfolio-open')).toBeFocused();
 await page.setViewportSize({width:1280,height:800});await breakdown(page);if(info.project.name==='chromium-auto')await page.screenshot({path:info.outputPath('scoring-breakdown-desktop.png')});
});
test('enormous legacy scores retain every locale-formatted digit without widening the page',async({page})=>{
 const now='2026-11-18T12:00:00.000Z',k=10n**80n,c=Object.values(bestiary).find(c=>c.rarity==='Common')!,saved=newPortfolio('enormous',String(15n*k),'factor-resonance-v1',now);
 Object.assign(saved,{status:'stopped',through:saved.mandate,catalogVersion,counts:{Common:String(7n*k),Uncommon:'0',Rare:'0',Legendary:'0',Mythic:'0'},seen:[c.id],highest:{id:c.id,name:c.name,emoji:c.emoji,rarity:c.rarity,ordinal:'3'},authorities:{'factor-resonance-v1':String(7n*k)}});
 await page.addInitScript(({key,saved})=>localStorage.setItem(key,JSON.stringify({schema:key,current:saved})),{key:portfolioStorageKey,saved});await ready(page);await watch(page);await expect(page.locator('#portfolio-open [data-portfolio-points]')).toHaveText((70n*k).toLocaleString('en-US'));await breakdown(page);await expect(page.locator('#portfolio-total')).toHaveText((70n*k).toLocaleString('en-US'));await expect(page.locator('#score-rules-link')).toHaveAttribute('href',/companion-portfolio-v1/);await page.setViewportSize({width:320,height:568});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test('badge cabinet survives a new run while the current run starts a fresh collection',async({page})=>{
 await ready(page);await run(page);await run(page,'1');await page.locator('#score-cluster [data-score-open="badges"]').click();await expect(page.locator('[data-badge="bingo"]')).toHaveAttribute('data-earned','false');await page.click('#badges-cabinet');await expect(page.locator('[data-badge="bingo"]')).toHaveAttribute('data-earned','true');await expect(page.locator('[data-badge="bingo"]')).toContainText('First earned');
});
test('generated versioned guide matches the run and navigation preserves an active mandate',async({page})=>{
 await ready(page);await run(page,'150','225');await demoAction(page,'click','#pause-reading');const before=await receipt(page);await breakdown(page);await expect(page.locator('#score-rules-link')).toHaveAttribute('href',new RegExp(guidePath));await page.click('#score-rules-link');await expect(page).toHaveURL(new RegExp(guidePath));await expect(page.locator('#main')).toContainText(rulesIdentity);await expect(page.locator('#rule-appointment')).toBeVisible();await expect(page.locator('#heists')).toContainText('2,460');
 const manifest=await(await page.request.get('/'+guidePath+'rules.json')).json();expect(manifest.identity).toBe(before.identity);expect(manifest.version).toBe(before.rules);await page.click('#active-run-return');await expect(page.locator('#pause-reading')).toHaveAttribute('aria-pressed','true');expect((await receipt(page)).id).toBe(before.id);await demoAction(page,'click','#stop-reading');
});
test('score and badges remain keyboard accessible inside fullscreen and with enlarged text',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Presentation is shared between numerical engines.');
 await ready(page);await run(page);await demoAction(page,'check','#executive-hovering');await watch(page,'office');await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered','true');await page.click('#supervision-fullscreen');
 await page.locator('#office-fullscreen #portfolio-open').click();await expect(page.locator('#office-fullscreen #score-dialog')).toBeVisible();await page.click('[data-score-tab="badges"]');await expect(page.locator('.score-badge')).toHaveCount(16);await page.locator('#score-close').focus();await page.keyboard.press('Enter');await expect(page.locator('#score-dialog')).toBeHidden();await expect(page.locator('#office-fullscreen')).toBeVisible();await expect(page.locator('#portfolio-open')).toBeFocused();await page.click('#office-fullscreen-exit');
 await page.setViewportSize({width:320,height:568});await page.evaluate(()=>{for(const rule of ['html{font-size:200% !important}','*{line-height:1.5 !important;letter-spacing:.12em !important;word-spacing:.16em !important}'])document.styleSheets[0].insertRule(rule);});await breakdown(page);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await page.locator('[data-score-category="Companions"]>summary').click();const table=page.getByRole('region',{name:'Companions award details',exact:true});await table.focus();await expect(table).toBeFocused();await page.keyboard.press('ArrowRight');
 await page.locator('#score-close').scrollIntoViewIfNeeded();await expect(page.locator('#score-close')).toBeInViewport();if(info.project.name==='chromium-auto')await page.screenshot({path:info.outputPath('scoring-enlarged-320.png')});await close(page);
});
test('rules navigation from the persistent banner leaves focus on the new page',async({page})=>{
 await ready(page);await run(page,'150','225');await demoAction(page,'click','#pause-reading');await department(page,'authorize');await page.locator('#active-run-banner [data-score-open="breakdown"]').click();await page.click('#score-rules-link');await expect(page.locator('.scoring-guide h1')).toBeFocused();await expect(page.locator('#score-dialog')).toBeHidden();await page.click('#active-run-return');await demoAction(page,'click','#stop-reading');
});
test('an idle second tab receives new badges without replacing the completed score',async({page,context})=>{
 await ready(page);await run(page,'150','225');await expect.poll(async()=>BigInt((await receipt(page)).verification.through)).toBeGreaterThanOrEqual(3n);await demoAction(page,'click','#pause-reading');const id=(await receipt(page)).id,other=await context.newPage();
 try{await ready(other);await demoAction(page,'click','#reveal-all');await expect(page.locator('#run-status')).toContainText('Mandate complete');await watch(other);await other.locator('#score-cluster [data-score-open="badges"]').click();await other.click('#badges-cabinet');await expect(other.locator('[data-badge="ratified"]')).toHaveAttribute('data-earned','true');const bank=await receipt(page);expect(bank.id).toBe(id);expect(bank.verification.through).toBe('150');expect(bank.status).toBe('completed');expect(BigInt(bank.dividend)).toBeGreaterThan(0n);}
 finally{await other.close();}
});
