import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {demoNavigator} from '../scripts/demo-navigation';

const errors=new WeakMap<Page,string[]>();
test.beforeEach(async({page},info)=>{
 errors.set(page,[]);page.on('pageerror',error=>errors.get(page)!.push(error.message));
 await page.route('**/runtime-config.json',async route=>{const response=await route.fetch();await route.fulfill({json:{...await response.json(),engine:info.project.metadata.engine}});});
});
test.afterEach(async({page})=>expect(errors.get(page)||[]).toEqual([]));
async function ready(page:Page){await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');}
async function paced(page:Page){await demoNavigator(page).desk('authorize');await page.uncheck('#authorize-executive-hovering');await page.selectOption('#authorize-display-speed','225');await page.fill('#limit','1000');await page.click('#run-button');}
const ids=(page:Page)=>page.locator('#discovery-list li').evaluateAll(items=>items.map(item=>(item as HTMLElement).dataset.companion!));

test('mobile saved finds are absent when empty, collapsed when present, and expandable without losing biography access',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared mobile presentation is covered once per browser.');
 await page.setViewportSize({width:390,height:667});await ready(page);await expect(page.locator('#discovery-register')).toBeHidden();
 expect(await page.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--discovery-height'))).toBe('0px');
 await demoNavigator(page).run();await expect(page.locator('#discovery-list li')).toHaveCount(5);await expect(page.locator('#discovery-toggle')).toHaveAttribute('aria-expanded','false');await expect(page.locator('#discovery-list')).toBeHidden();
 expect((await page.locator('#discovery-register').boundingBox())!.height).toBeLessThanOrEqual(48);
 await page.screenshot({path:info.outputPath('mobile-register-collapsed.png')});
 await page.locator('#discovery-toggle').focus();await page.keyboard.press('Space');await expect(page.locator('#discovery-list')).toBeVisible();await expect(page.locator('#discovery-toggle')).toHaveAttribute('aria-expanded','true');
 const opener=page.locator('#discovery-list button').first();await opener.click();await expect(page.locator('#companion-dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(opener).toBeFocused();await page.keyboard.press('Escape');await expect(page.locator('#discovery-toggle')).toBeFocused();await expect(page.locator('#discovery-list')).toBeHidden();
 await demoNavigator(page).desk('authorize');await expect(page.locator('#mandate-collision-warning')).toBeHidden();expect((await page.locator('#discovery-register').boundingBox())!.height).toBeLessThanOrEqual(48);
 await page.click('#discovery-toggle');await page.evaluate(()=>document.styleSheets[0].insertRule('html{font-size:200% !important}'));expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 expect((await new AxeBuilder({page}).include('#discovery-register').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']).analyze()).violations).toEqual([]);
 await page.evaluate(()=>document.styleSheets[0].deleteRule(0));await page.setViewportSize({width:1280,height:800});await expect(page.locator('#discovery-toggle')).toBeHidden();await expect(page.locator('#discovery-list')).toBeVisible();
});

test('replacing an unfinished mandate flies away its finds and restores completed discoveries without releasing old output',async({page},info)=>{
 await ready(page);await demoNavigator(page).run('3');await expect(page.locator('#discovery-list li')).toHaveCount(1);const baseline=await ids(page);
 await paced(page);await expect.poll(async()=>(await ids(page)).some(id=>!baseline.includes(id))).toBe(true);await page.click('#pause-reading');await demoNavigator(page).desk('authorize');
 await expect(page.locator('#mandate-collision-warning')).toBeVisible();const heading=(await page.locator('.authorize-heading > div:first-child').boundingBox())!,warning=(await page.locator('#mandate-collision-warning').boundingBox())!;expect(warning.x).toBeGreaterThanOrEqual(heading.x+heading.width);
 await expect(page.locator('#mandate-collision-warning')).toBeInViewport();
 if(info.project.metadata.engine==='auto'){
  await page.screenshot({path:info.outputPath('mandate-collision-desktop.png')});
  expect((await new AxeBuilder({page}).include('#desk-authorize').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']).analyze()).violations).toEqual([]);
 }
 const held=await page.locator('#output').textContent();await page.fill('#limit','not authorized');await page.click('#run-button');await expect(page.locator('#limit')).toHaveAttribute('aria-invalid','true');await expect(page.locator('#mandate-collision-warning')).toBeVisible();expect(await page.locator('#output').textContent()).toBe(held);
 await page.fill('#limit','0');await page.click('#run-button');await expect(page.locator('.companion-departure')).not.toHaveCount(0);await expect.poll(()=>ids(page)).toEqual(baseline);await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#output')).toContainText('produces no lines');
 if(info.project.metadata.engine==='auto')await page.screenshot({path:info.outputPath('companions-resign.png')});
 await expect(page.locator('.companion-departure')).toHaveCount(0);await page.waitForTimeout(300);await expect(page.locator('#output')).toContainText('produces no lines');await demoNavigator(page).desk('authorize');await expect(page.locator('#mandate-collision-warning')).toBeHidden();
 await page.reload();await expect.poll(()=>ids(page)).toEqual(baseline);expect(await page.evaluate(()=>Object.keys(localStorage).filter(key=>key.startsWith('slopbuzz:provisional-appointments:')))).toEqual([]);
});

test('mobile replacement honors reduced motion and reclaims an emptied footer immediately',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared reduced-motion presentation is covered once per browser.');await page.setViewportSize({width:320,height:568});await page.emulateMedia({reducedMotion:'reduce'});await ready(page);await paced(page);await expect(page.locator('#discovery-list li')).not.toHaveCount(0);await demoNavigator(page).desk('authorize');await expect(page.locator('#mandate-collision-warning')).toBeVisible();
 await expect(page.locator('#mandate-collision-warning')).toBeInViewport();
 await page.screenshot({path:info.outputPath('mandate-collision-mobile.png')});
 const warning=(await page.locator('#mandate-collision-warning').boundingBox())!,actions=(await page.locator('.authorization-actions').boundingBox())!;expect(warning.y).toBeGreaterThanOrEqual(0);expect(warning.y+warning.height).toBeLessThanOrEqual(actions.y);
 await page.fill('#limit','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#discovery-register')).toBeHidden();await expect(page.locator('.companion-departure')).toHaveCount(0);await expect(page.locator('.discovery-announcement')).toContainText('mandate was replaced');
 expect(await page.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--discovery-height'))).toBe('0px');await expect(page.locator('#output')).toContainText('produces no lines');
});

test('another reading tab removes withdrawn appointments without resurrecting them from its cached register',async({page,context},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared cross-tab register is covered once per browser.');await ready(page);await demoNavigator(page).run('3');await expect(page.locator('#discovery-list li')).toHaveCount(1);const baseline=await ids(page),reader=await context.newPage();
 try{
  await reader.goto('/about/');await expect(reader.locator('#discovery-list li')).toHaveCount(1);await paced(page);await expect.poll(async()=>(await ids(reader)).some(id=>!baseline.includes(id))).toBe(true);
  const newId=(await ids(reader)).find(id=>!baseline.includes(id))!;
  await reader.locator('#discovery-list li').evaluateAll((items,id)=>{(items.find(item=>(item as HTMLElement).dataset.companion===id)!.querySelector('button') as HTMLButtonElement).focus();},newId);
  await demoNavigator(page).desk('authorize');await page.fill('#limit','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect.poll(()=>ids(reader)).toEqual(baseline);await expect(reader.locator('#discovery-list button').first()).toBeFocused();
  await reader.reload();await expect.poll(()=>ids(reader)).toEqual(baseline);await expect.poll(()=>ids(page)).toEqual(baseline);
 }finally{await reader.close();}
});

test('a late assignment response from an aborted run cannot file a new companion',async({page})=>{
 await page.addInitScript(()=>{const Native=BroadcastChannel;const host=window as Window&{delayedAppointments?:number;lateAppointments?:number;releaseAppointments?:()=>void};host.delayedAppointments=0;host.lateAppointments=0;const delayed=new Set<string>(),pending:(()=>void)[]=[];host.releaseAppointments=()=>pending.splice(0).forEach(send=>send());window.BroadcastChannel=class extends Native{
  constructor(name:string){super(name);this.addEventListener('message',event=>{if(event.data.kind==='reply'&&delayed.has(event.data.id))host.lateAppointments!++;});}
  postMessage(message:{kind?:string;id?:string;path?:string}){if(message.kind==='request'&&message.path?.startsWith('/companions/window?')){host.delayedAppointments!++;delayed.add(message.id!);pending.push(()=>super.postMessage(message));}else super.postMessage(message);}
 };});
 await ready(page);await paced(page);await page.waitForFunction(()=>(window as Window&{delayedAppointments?:number}).delayedAppointments!>0);await demoNavigator(page).desk('authorize');await page.fill('#limit','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');await page.evaluate(()=>(window as Window&{releaseAppointments?:()=>void}).releaseAppointments!());await page.waitForFunction(()=>(window as Window&{lateAppointments?:number}).lateAppointments!>0);await page.waitForTimeout(50);await expect(page.locator('#discovery-list li')).toHaveCount(0);await expect(page.locator('#companion-list li')).toHaveCount(0);await expect(page.locator('#output')).toContainText('produces no lines');
});

test('a replacement can start while the old mandate is loading and its late response cannot replace the new output',async({page})=>{
 await page.addInitScript(()=>{const Native=BroadcastChannel;const host=window as Window&{oldMandateReplied?:boolean;releaseMandate?:()=>void};host.oldMandateReplied=false;const delayed=new Set<string>(),pending:(()=>void)[]=[];host.releaseMandate=()=>pending.splice(0).forEach(send=>send());window.BroadcastChannel=class extends Native{
  constructor(name:string){super(name);this.addEventListener('message',event=>{if(event.data.kind==='reply'&&delayed.has(event.data.id))host.oldMandateReplied=true;});}
  postMessage(message:{kind?:string;id?:string;path?:string}){if(message.kind==='request'&&message.path?.startsWith('/fizzbuzz')&&new URL(message.path,'https://example.test').searchParams.get('limit')==='15'){delayed.add(message.id!);pending.push(()=>super.postMessage(message));}else super.postMessage(message);}
 };});
 await ready(page);await page.click('#run-button');await demoNavigator(page).desk('authorize');await expect(page.locator('#mandate-collision-warning')).toBeVisible();await expect(page.locator('#run-button')).not.toHaveAttribute('aria-disabled','true');await page.fill('#limit','0');await page.uncheck('#authorize-executive-hovering');await page.selectOption('#authorize-display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');expect(await page.evaluate(()=>(window as Window&{oldMandateReplied?:boolean}).oldMandateReplied)).toBe(false);await page.evaluate(()=>(window as Window&{releaseMandate?:()=>void}).releaseMandate!());await page.waitForFunction(()=>(window as Window&{oldMandateReplied?:boolean}).oldMandateReplied);await expect(page.locator('#output')).toContainText('produces no lines');await expect(page.locator('#observed-mandate')).toHaveText('Mandate 0');await expect(page.locator('#discovery-list li')).toHaveCount(0);
});
