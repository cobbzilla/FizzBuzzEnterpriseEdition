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
async function fallback(page:Page){await page.addInitScript(()=>{
 const native=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,kind:string,...args:unknown[]){if(kind.includes('webgl'))return null;return Reflect.apply(native,this,[kind,...args]);} as typeof native;
 Object.defineProperty(document,'fullscreenEnabled',{configurable:true,value:true});Element.prototype.requestFullscreen=()=>Promise.reject(new DOMException('Browser declined full-screen','NotAllowedError'));
});}
async function paced(page:Page,limit='100'){await demoNavigator(page).desk('authorize');await page.uncheck('#authorize-executive-hovering');await page.selectOption('#authorize-display-speed','225');await page.fill('#limit',limit);await page.click('#run-button');await expect(page.locator('#output-count')).toContainText('of '+limit);}
async function matchesOutput(page:Page){await expect.poll(()=>page.evaluate(()=>{const banner=document.querySelector<HTMLElement>('#active-run-banner')!,lines=document.querySelector('#output')!.textContent!.trim().split('\n');return document.querySelector('#active-run-value')!.textContent===lines.at(-1)+' · certified ordinal '+banner.dataset.latestOrdinal;})).toBe(true);}

test('all fullscreen entry and return controls are named SVG buttons with keyboard operation',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared icon presentation is checked once per browser.');await fallback(page);await ready(page);await demoNavigator(page).run();await demoNavigator(page).options(()=>page.check('#executive-hovering'));await demoNavigator(page).watch('office');
 for(const id of ['supervision-fullscreen','office-fullscreen-enter','office-fullscreen-exit']){const button=page.locator('#'+id);expect((await button.textContent())?.trim()).toBe('');await expect(button.locator('svg')).toHaveAttribute('aria-hidden','true');expect(await button.getAttribute('aria-label')).toBeTruthy();expect(await button.getAttribute('title')).toBe(await button.getAttribute('aria-label'));}
 await page.locator('#supervision-fullscreen').focus();await page.keyboard.press('Space');await expect(page.locator('#office-fullscreen')).toBeVisible();await expect(page.locator('#office-fullscreen-exit')).toBeFocused();await page.keyboard.press('Space');await expect(page.locator('#office-fullscreen')).toBeHidden();await expect(page.locator('#supervision-fullscreen')).toBeFocused();
 await demoNavigator(page).desk('facilities');await page.click('#office-enter');await page.locator('#office-fullscreen-enter').focus();await page.keyboard.press('Enter');await expect(page.locator('#office-fullscreen')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('#office-fullscreen-enter')).toBeFocused();
});

test('desktop fullscreen output, log and controls share a bottom edge without covering each other',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared desktop geometry is checked once per browser.');await fallback(page);await ready(page);await demoNavigator(page).run();await demoNavigator(page).options(()=>page.check('#executive-hovering'));await demoNavigator(page).watch('office');await page.click('#supervision-fullscreen');
 for(const width of [901,1024,1280,1920]){await page.setViewportSize({width,height:800});await expect.poll(()=>page.evaluate(()=>{
  const a=document.querySelector('#office-fullscreen-output')!.getBoundingClientRect(),b=document.querySelector('#office-fullscreen-log')!.getBoundingClientRect(),c=document.querySelector('#office-fullscreen-controls')!.getBoundingClientRect();return Math.abs(a.bottom-c.bottom)<1&&Math.abs(b.bottom-c.bottom)<1&&a.right+10<=c.left&&c.right+10<=b.left;
 })).toBe(true);}
 await page.screenshot({path:info.outputPath('aligned-fullscreen-desktop.png')});await page.click('#office-fullscreen-exit');
});

test('mobile playback uses compact spaced icons, full touch targets and a single-line fullscreen status',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared mobile geometry is checked once per browser.');await fallback(page);await page.setViewportSize({width:390,height:667});await ready(page);await page.fill('#limit','1');await page.click('#run-button');await expect(page.locator('#supervision-pause')).toHaveAttribute('aria-disabled','false');await page.click('#supervision-pause');await page.click('#supervision-fullscreen');
 for(const [width,height]of [[390,667],[320,568],[844,390]]){
  await page.setViewportSize({width,height});
  const geometry=await page.evaluate(()=>{
   const notice=document.querySelector<HTMLElement>('#run-status')!,bar=document.querySelector('.watch-transport')!,buttons=[...bar.querySelectorAll<HTMLButtonElement>('button.playback-icon')].filter(button=>button.getClientRects().length),rects=buttons.map(button=>button.getBoundingClientRect());
   return {notice:notice.getBoundingClientRect().height,line:parseFloat(getComputedStyle(notice).lineHeight),widths:rects.map(rect=>rect.width),heights:rects.map(rect=>rect.height),gaps:rects.slice(1).map((rect,i)=>rect.left-rects[i].right),touch:buttons.map(button=>getComputedStyle(button,'::before').inset)};
  });
  expect(geometry.notice).toBeLessThanOrEqual(geometry.line+1);expect(geometry.widths.every(n=>n===36)).toBe(true);expect(geometry.heights.every(n=>n===36)).toBe(true);expect(geometry.gaps.every(n=>n>=12)).toBe(true);expect(geometry.touch.every(n=>n==='-4px')).toBe(true);
 }
 await page.setViewportSize({width:390,height:667});await page.screenshot({path:info.outputPath('compact-fullscreen-mobile.png')});expect((await new AxeBuilder({page}).include('#office-fullscreen').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']).analyze()).violations).toEqual([]);
 const button=(await page.locator('#watch-settings-toggle').boundingBox())!;await page.mouse.click(button.x-3,button.y+button.height/2);await expect(page.locator('#watch-settings')).toBeVisible();await page.click('#watch-settings-close');await page.click('#office-fullscreen-exit');await expect(page.locator('#stop-reading')).toHaveCSS('width','36px');await page.click('#stop-reading');
});

test('the top bar follows real values on every other desk and returns to the same paused or running mandate',async({page},info)=>{
 await ready(page);await expect(page.locator('#active-run-banner')).toBeHidden();await paced(page,'1001');await expect(page.locator('#output')).toContainText('Fizz');await page.click('#pause-reading');const trace=await page.locator('#trace-result').textContent(),held=await page.locator('#output').textContent();
 for(const desk of ['authorize','experiment','facilities','evidence']){await demoNavigator(page).desk(desk);await expect(page.locator('#active-run-banner')).toBeVisible();await expect(page.locator('#active-run-state')).toHaveText('Executive hold remains in force');await matchesOutput(page);expect((await page.locator('#active-run-banner').boundingBox())!.height).toBeLessThanOrEqual(44);}
 if(info.project.name==='chromium-auto'){await page.screenshot({path:info.outputPath('running-bar-desktop.png')});await page.setViewportSize({width:390,height:667});expect((await page.locator('#active-run-banner').boundingBox())!.height).toBe(44);expect((await new AxeBuilder({page}).include('#active-run-banner').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']).analyze()).violations).toEqual([]);await page.screenshot({path:info.outputPath('running-bar-mobile.png')});await page.setViewportSize({width:1280,height:720});}
 await page.locator('#active-run-banner').focus();await page.keyboard.press('Space');await expect(page.locator('body')).toHaveAttribute('data-desk','observe');await expect(page.locator('#observe-title')).toBeFocused();await expect(page.locator('#active-run-banner')).toBeHidden();await expect(page.locator('#pause-reading')).toHaveAttribute('aria-pressed','true');expect(await page.locator('#output').textContent()).toBe(held);expect(await page.locator('#trace-result').textContent()).toBe(trace);
 await page.click('#pause-reading');await demoNavigator(page).desk('authorize');await expect(page.locator('#active-run-state')).toHaveText('Authorized production continues');const before=Number(await page.locator('#active-run-banner').getAttribute('data-latest-ordinal'));await expect.poll(async()=>Number(await page.locator('#active-run-banner').getAttribute('data-latest-ordinal'))).toBeGreaterThan(before);await matchesOutput(page);
 await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));expect((await page.locator('#active-run-banner').boundingBox())!.y).toBeCloseTo(0,0);await page.click('#active-run-banner');await page.click('#stop-reading');await demoNavigator(page).desk('evidence');await expect(page.locator('#active-run-banner')).toBeHidden();
});

test('a loading or replacement mandate never advertises a value from the previous run',async({page})=>{
 await page.addInitScript(()=>{const Native=BroadcastChannel;const host=window as Window&{releaseHeldMandate?:()=>void;heldMandates?:number;oldReply?:boolean};const pending:(()=>void)[]=[],ids=new Set<string>();host.heldMandates=0;host.oldReply=false;host.releaseHeldMandate=()=>pending.splice(0).forEach(send=>send());window.BroadcastChannel=class extends Native{
  constructor(name:string){super(name);this.addEventListener('message',event=>{if(event.data.kind==='reply'&&ids.has(event.data.id))host.oldReply=true;});}
  postMessage(message:{kind?:string;id?:string;path?:string}){if(message.kind==='request'&&message.path?.startsWith('/fizzbuzz')&&new URL(message.path,'https://example.test').searchParams.get('limit')==='15'){host.heldMandates!++;ids.add(message.id!);pending.push(()=>super.postMessage(message));}else super.postMessage(message);}
 };});
 await ready(page);await demoNavigator(page).run('3');await demoNavigator(page).desk('authorize');await page.uncheck('#authorize-executive-hovering');await page.selectOption('#authorize-display-speed','225');await page.fill('#limit','15');await page.click('#run-button');
 await page.waitForFunction(()=>(window as Window&{heldMandates?:number}).heldMandates!>0);await demoNavigator(page).desk('authorize');await expect(page.locator('#active-run-value')).toHaveText('Awaiting the first certified value');await expect(page.locator('#active-run-banner')).toHaveAttribute('data-latest-ordinal','');
 await demoNavigator(page).run('0');await demoNavigator(page).desk('evidence');await expect(page.locator('#active-run-banner')).toBeHidden();await page.evaluate(()=>(window as Window&{releaseHeldMandate?:()=>void}).releaseHeldMandate!());await page.waitForFunction(()=>(window as Window&{oldReply?:boolean}).oldReply);await expect(page.locator('#active-run-banner')).toBeHidden();await expect(page.locator('#output')).toContainText('produces no lines');
});

test('Facilities fullscreen retains a live production bar and its action returns to Observe',async({page})=>{
 await fallback(page);await ready(page);await paced(page,'1001');await expect(page.locator('#output')).toContainText('Fizz');await demoNavigator(page).desk('facilities');await page.click('#office-enter');await page.click('#office-fullscreen-enter');await expect(page.locator('#office-fullscreen #active-run-banner')).toBeVisible();
 const banner=(await page.locator('#active-run-banner').boundingBox())!,header=(await page.locator('#office-fullscreen-header').boundingBox())!;expect(banner.y).toBe(0);expect(header.y).toBeGreaterThanOrEqual(banner.y+banner.height+7);await matchesOutput(page);
 const before=Number(await page.locator('#active-run-banner').getAttribute('data-latest-ordinal'));await expect.poll(async()=>Number(await page.locator('#active-run-banner').getAttribute('data-latest-ordinal'))).toBeGreaterThan(before);await page.click('#active-run-banner');await expect(page.locator('#office-fullscreen')).toBeHidden();await expect(page.locator('body')).toHaveAttribute('data-desk','observe');await expect(page.locator('#pause-reading')).toHaveAttribute('aria-pressed','false');await expect(page.locator('#active-run-banner')).toBeHidden();await page.click('#stop-reading');
});
