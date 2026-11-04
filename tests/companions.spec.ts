import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {createStaticServer} from '../scripts/serve.ts';
test.beforeEach(async({page},info)=>{await page.route('**/runtime-config.json',async route=>{const response=await route.fetch();await route.fulfill({json:{...await response.json(),engine:info.project.metadata.engine}});});});
async function inspect(page:Page,path='/audit/evidence'){return page.evaluate(async path=>{const m=await import(new URL('/assets/tribunal.js',location.href).href);const client=new m.BrowserRuntimeClient();try{return await(await client.request(path)).json();}finally{client.close();}},path);}
const output=Array.from({length:15},(_,i)=>{const n=i+1;return n%15===0?'FizzBuzz':n%3===0?'Fizz':n%5===0?'Buzz':String(n);}).join('\n')+'\n';
async function run(page:Page,limit='15'){await page.fill('#limit',limit);await page.selectOption('#display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');}

test('default companions tell exact stories without changing output or audit; strategies really swap',async({page})=>{
 const network:string[]=[];page.on('request',r=>{if(new URL(r.url()).pathname.startsWith('/companions/'))network.push(r.url());});
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await expect(page.locator('#emoji-companions')).toBeChecked();await run(page);await expect(page.locator('#companion-list li')).toHaveCount(7);
 expect(await page.locator('#output').textContent()).toBe(output);await expect(page.locator('#companion-list')).toContainText('3 · Fizz · flag: Central African Republic');await expect(page.locator('#companion-list')).toContainText('15 · FizzBuzz · flag: England');const before=await inspect(page);expect(before.journalEntries).toBe(15);
 await page.locator('#companion-list button').first().click();await expect(page.locator('#companion-dialog')).toBeVisible();await expect(page.locator('#companion-dialog')).toContainText('Motivating energy');await expect(page.locator('#companion-dialog')).toContainText('Extracted exact factors: 3. Complete factorization.');await page.keyboard.press('Escape');await expect(page.locator('#companion-list button').first()).toBeFocused();
 await page.selectOption('#companion-strategy','ordinal-constellation-v1');await expect(page.locator('#companion-list')).toContainText('3 · Fizz · orange square — Gardener of Better Definitions');await expect(page.locator('#companion-list')).toContainText('15 · FizzBuzz · field hockey — Marshal of Shared Victories');
 await page.uncheck('#emoji-companions');await expect(page.locator('#companion-list li')).toHaveCount(0);expect(await page.locator('#output').textContent()).toBe(output);await page.check('#emoji-companions');await expect(page.locator('#companion-list li')).toHaveCount(7);
 await page.click('#personnel-replay');await expect(page.locator('#run-status')).toContainText('Execution replay complete');await expect(page.locator('#companion-list li')).toHaveCount(7);const after=await inspect(page);expect(after.journalEntries).toBe(15);expect(after.headDigest).toBe(before.headDigest);expect(network).toEqual([]);
});

test.describe('companion biography dismissal',()=>{
 test.use({hasTouch:true});
 test('mobile biography keeps its X visible, dismisses from the backdrop and preserves reading gestures and focus',async({page},info)=>{
  await page.setViewportSize({width:390,height:667});await page.goto('/demo/');await run(page);const opener=page.locator('#companion-list button').first();const dialog=page.locator('#companion-dialog'),close=dialog.getByRole('button',{name:'Close companion file'}),body=dialog.getByRole('region',{name:'Companion biography'});
  await opener.tap();await expect(dialog).toBeVisible();await expect(close).toBeFocused();await body.getByText('Personality',{exact:true}).tap();await expect(dialog).toBeVisible();
  expect(await body.evaluate(e=>e.scrollHeight>e.clientHeight)).toBe(true);await body.evaluate(e=>{e.scrollTop=e.scrollHeight;});await expect(close).toBeInViewport();const target=(await close.boundingBox())!;expect(target.width).toBeGreaterThanOrEqual(44);expect(target.height).toBeGreaterThanOrEqual(44);
  if(info.project.metadata.engine!=='js')expect((await new AxeBuilder({page}).include('#companion-dialog').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']).analyze()).violations).toEqual([]);
  await close.tap();await expect(dialog).not.toBeVisible();await expect(opener).toBeFocused();
  await opener.tap();expect(await body.evaluate(e=>e.scrollTop)).toBe(0);await page.touchscreen.tap(4,4);await expect(dialog).not.toBeVisible();await expect(opener).toBeFocused();
  await opener.tap();const inside=(await body.boundingBox())!;await page.mouse.move(inside.x+30,inside.y+60);await page.mouse.down();await page.mouse.move(4,4);await page.mouse.up();await expect(dialog).toBeVisible();await page.evaluate(()=>document.styleSheets[0].insertRule('html{font-size:200% !important}'));await expect(close).toBeInViewport();expect(await dialog.evaluate(e=>e.scrollWidth<=e.clientWidth+1)).toBe(true);await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(opener).toBeFocused();
 });
});

test('all 3200 stories are searchable and scarce companions disclose honest ticket weights',async({page})=>{
 // The compiled-Java owner has a 60-second cold initialization contract.
 await page.goto('/demo/');await page.locator('#companion-help a').click();await expect(page).toHaveURL(/\/bestiary\/$/);await expect(page.locator('#bestiary-status')).toContainText('3200 companions found. Page 1 of 134',{timeout:60000});await expect(page.locator('#bestiary-results article')).toHaveCount(24);
 await page.selectOption('#bestiary-kind','single');await page.fill('#bestiary-search','unicorn');await expect(page.locator('#bestiary-results article')).toHaveCount(1);await expect(page.locator('#bestiary-results')).toContainText('1 of 1,000,000,000 tickets');await expect(page.locator('#bestiary-results')).toContainText('Make one impossible promise responsibly possible.');
 await page.fill('#bestiary-search','');await page.selectOption('#bestiary-rarity','Mythic');await expect(page.locator('#bestiary-results article')).toHaveCount(11);await page.selectOption('#bestiary-rarity','');await page.selectOption('#bestiary-category','Animals & Nature');await expect(page.locator('#bestiary-status')).toContainText('161 companions found');
 await page.locator('#bestiary-next').focus();await page.keyboard.press('Enter');await expect(page.locator('#bestiary-status')).toContainText('Page 2 of 7');await expect(page.locator('#bestiary-next')).toBeFocused();await page.fill('#bestiary-search','unfindable corporate porcupine');await expect(page.locator('#bestiary-status')).toHaveText('0 companions found. Page 1 of 1.');await expect(page.locator('#bestiary-next')).toHaveAttribute('aria-disabled','true');
});

test('finite exact-ordinal assignment explains unresolved factors and refuses malformed parameters',async({page})=>{
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');const before=await inspect(page);const start=(10n**1000n+5n).toString();const data=await inspect(page,'/companions/window?start='+start+'&count=1&strategy=factor-resonance-v1');expect(data.assignments).toHaveLength(1);expect(data.assignments[0].ordinal).toBe(start);expect(data.assignments[0].factors.complete).toBe(false);expect(data.assignments[0].factors.divisions).toBeLessThanOrEqual(128);expect((await inspect(page)).journalEntries).toBe(before.journalEntries);
 const result=await page.evaluate(async()=>{const m=await import(new URL('/assets/tribunal.js',location.href).href);const client=new m.BrowserRuntimeClient();try{const statuses=[];for(const path of ['/companions/window?start=0&count=1&strategy=factor-resonance-v1','/companions/window?start=1&count=101&strategy=factor-resonance-v1','/companions/window?start=1&count=1&strategy=missing','/companions/catalog?x=1'])statuses.push((await client.request(path)).status);return statuses;}finally{client.close();}});expect(result).toEqual([400,400,400,400]);
});

test('streamed companions are bounded and do not pull a reader down older encounters',async({page})=>{
 await page.goto('/demo/');await run(page,'1200');await expect(page.locator('#companion-list li')).toHaveCount(100);await expect(page.locator('#companion-list')).toContainText('1200 · FizzBuzz');expect(await page.locator('#output').evaluate(el=>el.childNodes.length)).toBe(1000);
 await page.fill('#limit','1600');await page.selectOption('#display-speed','225');await page.click('#run-button');await expect(page.locator('#companion-list li')).toHaveCount(7,{timeout:20000});
 const scroller=page.locator('#companion-scroll');await scroller.evaluate(el=>{el.scrollTop=0;el.dispatchEvent(new Event('scroll'));});const top=await scroller.evaluate(el=>el.scrollTop);await expect(page.locator('#companion-latest')).toBeVisible();expect(await scroller.evaluate(el=>el.scrollTop)).toBe(top);await page.click('#companion-latest');await expect(page.locator('#companion-latest')).toBeHidden();await page.click('#stop-reading');
});

test('the API charter executes both strategies with exact decimal controls',async({page})=>{
 await page.goto('/api/');const card=page.locator('#operation-inspectCompanionWindow');await card.locator('summary').first().click();await card.getByRole('combobox',{name:'Assignment authority'}).selectOption('ordinal-constellation-v1');await card.getByRole('button',{name:'Send GET request to /companions/window'}).click();await expect(card.getByRole('status')).toContainText('HTTP 200');await expect(card.getByRole('region',{name:'GET /companions/window response'})).toContainText('"strategy":"ordinal-constellation-v1"');await card.getByLabel('Mandate seed (optional)').fill('9007199254740993');await card.getByRole('button',{name:'Send GET request to /companions/window'}).click();await expect(card.getByRole('region',{name:'GET /companions/window response'})).toContainText('"mandateSeed":"9007199254740993"');
});

test('an installed bestiary and its Java allocations remain usable offline',async({page},info)=>{
 const server=createStaticServer('dist','/',{engine:info.project.metadata.engine});await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));const port=(server.address() as {port:number}).port;
 try{await page.goto(`http://127.0.0.1:${port}/bestiary/`);await expect(page.locator('#bestiary-status')).toContainText('3200 companions found');await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await page.unroute('**/runtime-config.json');await new Promise<void>(resolve=>{server.close(()=>resolve());server.closeAllConnections();});await page.reload();await page.selectOption('#bestiary-kind','single');await page.fill('#bestiary-search','unicorn');await expect(page.locator('#bestiary-results article')).toHaveCount(1);expect(await page.evaluate(async()=>await(await fetch(new URL('../unicode-license.txt',location.href))).text())).toContain('UNICODE LICENSE V3');await page.goto(`http://127.0.0.1:${port}/demo/`);await run(page);await expect(page.locator('#companion-list li')).toHaveCount(7);}finally{server.close();server.closeAllConnections();}
});

test('companion controls, stories and bestiary remain accessible at narrow widths and enlarged text',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared DOM audited once per browser; both compilers execute assignments.');
 await page.goto('/demo/');await run(page);await expect(page.locator('#companion-list li')).toHaveCount(7);await page.locator('#companion-list button').first().click();expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze()).violations).toEqual([]);await page.keyboard.press('Escape');
 await page.goto('/bestiary/');await expect(page.locator('#bestiary-status')).toContainText('3200');expect((await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze()).violations).toEqual([]);
 await page.setViewportSize({width:320,height:800});await page.evaluate(()=>{for(const css of ['html {font-size:200% !important}','* {line-height:1.5 !important;letter-spacing:.12em !important;word-spacing:.16em !important}'])document.styleSheets[0].insertRule(css);});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);expect((await page.locator('#bestiary-category').boundingBox())!.height).toBeGreaterThanOrEqual(96);
});

test('the unlisted inventory shows every character in decreasing ticket order without pagination',async({page})=>{
 await page.goto('/department-of-improbable-appointments/');await expect(page.locator('#rarity-status')).toContainText('All 3,200 companions');const rows=page.locator('#rarity-rows tr');await expect(rows).toHaveCount(3200);const weights=await rows.evaluateAll(rows=>rows.map(row=>Number(row.lastElementChild!.textContent!.split(' / ')[0].replaceAll(',',''))));expect(weights[0]).toBe(2500000);expect(weights.at(-1)).toBe(1);expect(weights.every((w,i)=>!i||w<=weights[i-1])).toBe(true);await expect(rows.last()).toContainText('unicorn');await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content','noindex,nofollow');await expect(page.locator('header a[href="/department-of-improbable-appointments/"]')).toHaveCount(0);
});

test('mobile mandate submission reveals Official output and respects reduced motion',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await run(page);await expect.poll(()=>page.locator('#mandate-output').evaluate(el=>Math.abs(el.getBoundingClientRect().top)<4)).toBe(true);await expect(page.locator('#output')).toBeInViewport();await expect(page.locator('#output')).toBeFocused();await page.keyboard.press('Tab');await expect(page.locator('#numeric-autocorrect')).not.toBeFocused();expect(await page.locator('#output').textContent()).toBe(output);
});

test('ongoing disclosures retain a keyboard reader and a story dialog opener',async({page})=>{
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await page.fill('#limit','100');await page.selectOption('#display-speed','225');await page.click('#run-button');await expect(page.locator('#companion-list li')).toHaveCount(7);const reader=page.locator('#companion-list button').last();const label=await reader.locator('span').last().textContent();await reader.focus();await expect(page.locator('#companion-latest')).toBeVisible();await expect(page.getByRole('button',{name:label!.trim()})).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('#companion-dialog')).toBeVisible();await expect(page.locator('#chronicle-ordinal option[value="24"]')).toHaveCount(1);await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:label!.trim()})).toBeFocused();await page.click('#stop-reading');
});

test('reaching a bestiary pagination boundary retains the initiating control',async({page})=>{
 await page.goto('/bestiary/');await expect(page.locator('#bestiary-status')).toContainText('3200 companions');await page.selectOption('#bestiary-rarity','Mythic');await expect(page.locator('#bestiary-status')).toContainText('32 companions found');await page.locator('#bestiary-next').focus();await page.keyboard.press('Enter');await expect(page.locator('#bestiary-status')).toContainText('Page 2 of 2');await expect(page.locator('#bestiary-next')).toBeFocused();await expect(page.locator('#bestiary-next')).toHaveAttribute('aria-disabled','true');await page.keyboard.press('Enter');await expect(page.locator('#bestiary-status')).toContainText('Page 2 of 2');
});

test('a late assignment reply cannot undo a newer policy or checkbox decision',async({page})=>{
 await page.addInitScript(()=>{
  const Native=BroadcastChannel;const delayed=new Set<string>();const evidence=window as unknown as {companionDelayed:number;companionLateReplies:number};evidence.companionDelayed=0;evidence.companionLateReplies=0;
  window.BroadcastChannel=class extends Native {
   constructor(name:string){super(name);this.addEventListener('message',event=>{if(event.data.kind==='reply'&&delayed.has(event.data.id))evidence.companionLateReplies++;});}
   postMessage(message:{kind?:string;id?:string;path?:string}){if(message.kind==='request'&&message.path?.startsWith('/companions/window?')&&message.path.includes('factor-resonance-v1')){delayed.add(message.id!);evidence.companionDelayed++;setTimeout(()=>super.postMessage(message),600);}else super.postMessage(message);}
  };
 });
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await run(page);
 await page.waitForFunction(()=>(window as unknown as {companionDelayed:number}).companionDelayed>0);
 await page.selectOption('#companion-strategy','ordinal-constellation-v1');await page.uncheck('#emoji-companions');await page.check('#emoji-companions');await expect(page.locator('#companion-list')).toContainText('3 · Fizz · orange square — Gardener of Better Definitions');const current=await page.locator('#companion-list').textContent();
 await page.waitForFunction(()=>(window as unknown as {companionLateReplies:number}).companionLateReplies>0);expect(await page.locator('#companion-list').textContent()).toBe(current);expect((await inspect(page)).journalEntries).toBe(15);
});

test('mandate seeds vary encounters, reproduce on replay, and ignore unsubmitted edits',async({page})=>{
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await run(page,'15');await expect(page.locator('#companion-list li')).toHaveCount(7);const first=await page.locator('#companion-list').textContent();
 await run(page,'16');await expect(page.locator('#companion-list li')).toHaveCount(7);const second=await page.locator('#companion-list').textContent();expect(second).not.toBe(first);
 await page.fill('#limit','999');await page.selectOption('#companion-strategy','ordinal-constellation-v1');await expect(page.locator('#companion-list li')).toHaveCount(7);await page.selectOption('#companion-strategy','factor-resonance-v1');await expect(page.locator('#companion-list')).toHaveText(second!);
 await page.click('#personnel-replay');await expect(page.locator('#run-status')).toContainText('Execution replay complete');await expect(page.locator('#companion-list')).toHaveText(second!);
 await run(page,'15');await expect(page.locator('#companion-list')).toHaveText(first!);
});

test('only disclosed companions become persistent finds; stories and links work on reading pages',async({page})=>{
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await run(page,'3');await expect(page.locator('#companion-list li')).toHaveCount(1);await expect(page.locator('#discovery-list li')).toHaveCount(1);expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('slopbuzz:extraordinary-appointments:v1')!).finds.every((d:any)=>d.mandate==='3'&&d.assignment.ordinal==='3'))).toBe(true);
 await run(page,'15');await expect(page.locator('#companion-list li')).toHaveCount(7);await expect(page.locator('#discovery-list li')).toHaveCount(5);
 const records=await page.evaluate(()=>JSON.parse(localStorage.getItem('slopbuzz:extraordinary-appointments:v1')!).finds);expect(records.map((d:any)=>d.companion.weight)).toEqual(records.map((d:any)=>d.companion.weight).sort((a:number,b:number)=>a-b));expect(new Set(records.map((d:any)=>d.companion.id)).size).toBe(5);
 await page.goto('/about/');await expect(page.locator('#discovery-list li')).toHaveCount(5);const opener=page.locator('#discovery-list button').first();await opener.click();await expect(page.locator('#companion-dialog')).toBeVisible();await expect(page.locator('#companion-dialog')).toContainText(records[0].companion.backstory);const link=await page.locator('#companion-share-link').inputValue();expect(new URL(link).searchParams.get('limit')).toBe(records[0].mandate);await page.keyboard.press('Escape');await expect(opener).toBeFocused();
 await page.reload();await expect(page.locator('#discovery-list li')).toHaveCount(5);await page.goto(link);await expect(page.locator('#health-value')).toHaveText('LIVE');await expect(page.locator('#limit')).toHaveValue(records[0].mandate);expect(await page.locator('#output').textContent()).not.toContain('Fizz');const before=await inspect(page);await page.getByRole('button',{name:'Inspect shared appointment'}).click();await expect(page.locator('#companion-dialog')).toBeVisible();await expect(page.locator('#companion-dialog')).toContainText(records[0].companion.name);await page.keyboard.press('Escape');expect((await inspect(page)).journalEntries).toBe(before.journalEntries);
 const bad=new URL(link);bad.searchParams.set('companion','invented-friend');await page.goto(bad.href);await page.getByRole('button',{name:'Inspect shared appointment'}).focus();await page.keyboard.press('Enter');await expect(page.locator('.shared-encounter [role=status]')).toContainText('does not reproduce');await expect(page.getByRole('button',{name:'Inspect shared appointment'})).toBeFocused();await expect(page.locator('#companion-dialog')).not.toBeVisible();
});

test('two tabs merge the rarest finds without replacing a focused collection',async({page,context})=>{
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await run(page,'15');await expect(page.locator('#discovery-list li')).toHaveCount(5);const reader=await context.newPage();try{
 await reader.goto('/about/');await expect(reader.locator('#discovery-list li')).toHaveCount(5);await reader.locator('#discovery-list button').first().focus();const held=await reader.locator('#discovery-list').textContent();await run(page,'1000');await expect(page.locator('#companion-list')).toContainText('1000 · Buzz');await expect(reader.locator('#discovery-latest')).toBeVisible();expect(await reader.locator('#discovery-list').textContent()).toBe(held);await reader.click('#discovery-latest');await expect(reader.locator('#discovery-list')).toHaveText((await page.locator('#discovery-list').textContent())!);await expect(reader.locator('#discovery-list button').first()).toBeFocused();
 }finally{await reader.close();}
});

test('storage failure preserves session finds and reports the actual limitation',async({page})=>{
 await page.addInitScript(()=>{const get=Storage.prototype.getItem,set=Storage.prototype.setItem;Storage.prototype.getItem=function(key){if(key==='slopbuzz:extraordinary-appointments:v1')throw new DOMException('Unavailable','SecurityError');return get.call(this,key);};Storage.prototype.setItem=function(key,value){if(key==='slopbuzz:extraordinary-appointments:v1')throw new DOMException('Unavailable','QuotaExceededError');return set.call(this,key,value);};});
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await run(page);await expect(page.locator('#discovery-list li')).toHaveCount(5);await expect(page.locator('#discovery-status')).toContainText('Storage is unavailable');await page.locator('#discovery-list button').first().click();await expect(page.locator('#companion-dialog')).toBeVisible();expect(await page.locator('#output').textContent()).toBe(output);
});

test('fixed register reserves page space and its biographies remain accessible at 320px and 200% text',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared DOM audited once per browser.');await page.setViewportSize({width:320,height:667});await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await run(page,'100');await expect(page.locator('#discovery-list li')).toHaveCount(5);await expect(page.locator('#discovery-list').getByRole('button',{name:'Uncommon · Japanese “not free of charge” button',exact:true})).toHaveCount(1);await expect(page.locator('#discovery-list').getByRole('button',{name:'Uncommon · Japanese “not free of charge” button',exact:true})).toHaveAccessibleDescription('98958 of one billion tickets. Open saved biography.');await page.evaluate(()=>document.styleSheets[0].insertRule('html{font-size:200% !important}'));
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);const geometry=await page.evaluate(()=>({padding:parseFloat(getComputedStyle(document.body).paddingBottom),height:document.querySelector('#discovery-register')!.getBoundingClientRect().height}));expect(geometry.padding).toBeGreaterThanOrEqual(geometry.height-1);
 expect((await new AxeBuilder({page}).include('#discovery-register').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']).analyze()).violations).toEqual([]);await page.locator('#discovery-list button').last().focus();const chip=(await page.locator('#discovery-list button').last().boundingBox())!,rail=(await page.locator('#discovery-list').boundingBox())!;expect(chip.width).toBeLessThanOrEqual(rail.width+1);expect(chip.x).toBeGreaterThanOrEqual(rail.x-1);expect(chip.x+chip.width).toBeLessThanOrEqual(rail.x+rail.width+1);await page.locator('#discovery-list button').last().click();await expect(page.locator('#companion-dialog')).toBeVisible();await expect(page.getByRole('button',{name:'Close companion file'})).toBeInViewport();await page.keyboard.press('Escape');await expect(page.locator('#discovery-list button').last()).toBeFocused();
});

test.describe('the reading estate before its JavaScript clerk arrives',()=>{
 test.use({javaScriptEnabled:false});
 test('the fixed register leaves footer navigation reachable with scripts disabled',async({page},info)=>{
  test.skip(info.project.metadata.engine==='js','Shared static DOM covered once per browser.');await page.setViewportSize({width:390,height:667});await page.goto('/about/');const link=page.locator('.site-footer a[href="#main"]');await link.scrollIntoViewIfNeeded();const target=(await link.boundingBox())!,register=(await page.locator('#discovery-register').boundingBox())!;expect(target.y+target.height).toBeLessThanOrEqual(register.y+1);await link.click();await expect(page).toHaveURL(/#main$/);
 });
});

test('a slow Java worker keeps the archive readable until its supported cold-start budget completes',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared worker readiness contract covered once per browser.');
 await page.addInitScript(()=>{const Native=Worker;window.Worker=class extends Native {constructor(url:string|URL,options?:WorkerOptions){super(url,options);const send=this.postMessage.bind(this) as (message:unknown,transfer?:Transferable[]|StructuredSerializeOptions)=>void;this.postMessage=(message:unknown,transfer?:Transferable[]|StructuredSerializeOptions)=>{if(message&&typeof message==='object'&&'config' in message)setTimeout(()=>send(message,transfer),18000);else send(message,transfer);};}};});
 await page.goto('/bestiary/');await expect(page.locator('#bestiary-status')).toHaveText('Opening the nonhuman personnel archive…');await expect(page.locator('#bestiary-status')).toContainText('3200 companions found. Page 1 of 134',{timeout:60000});await expect(page.locator('#bestiary-results article')).toHaveCount(24);await page.selectOption('#bestiary-kind','single');await page.fill('#bestiary-search','unicorn');await expect(page.locator('#bestiary-results article')).toHaveCount(1);
});
