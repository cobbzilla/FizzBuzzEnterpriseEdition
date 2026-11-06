import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {demoNavigator} from '../scripts/demo-navigation';

const errors=new WeakMap<Page,string[]>();
test.beforeEach(async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared layout and playback policy is exercised once per browser.');
 errors.set(page,[]);page.on('pageerror',error=>errors.get(page)!.push(error.message));
});
test.afterEach(async({page})=>expect(errors.get(page)||[]).toEqual([]));
async function reception(page:Page){await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');}
const steps=(page:Page)=>page.locator('#supervision-pane').getAttribute('data-observed-steps').then(value=>Number(value||0));
const printed=(page:Page)=>page.locator('#output').textContent().then(value=>value?.split('\n').filter(Boolean).length||0);

test('new and migrated authorizations commission Executive Hovering; an explicit opt-out survives reload',async({page})=>{
 await page.addInitScript(()=>{if(!sessionStorage.getItem('legacy-seeded')){sessionStorage.setItem('legacy-seeded','true');sessionStorage.setItem('slopbuzz:authorization-draft:v1',JSON.stringify({cadence:'225',companions:false,roll:false,hovering:false,authority:'factor-resonance-v1'}));}});
 await reception(page);await expect(page.locator('#authorize-executive-hovering')).toBeChecked();await expect(page.locator('#authorize-display-speed')).toHaveValue('225');await expect(page.locator('#authorize-display-speed')).toBeEnabled();await expect(page.locator('#authorize-emoji-companions')).not.toBeChecked();
 await page.uncheck('#authorize-executive-hovering');await page.reload();await expect(page.locator('#health-value')).toHaveText('LIVE');await expect(page.locator('#authorize-executive-hovering')).not.toBeChecked();
 await page.evaluate(()=>sessionStorage.clear());await page.reload();await expect(page.locator('#authorize-executive-hovering')).toBeChecked();
});

test('the first mobile office frame fits without scrolling or clipping numerical lines',async({page},info)=>{
 test.setTimeout(180000);
 await page.addInitScript(()=>{
  type Sample={viewport:number;document:number;desk:number;stage:number;content:number;line:number};
  const host=window as Window&{firstOfficeFrames?:Sample[]};
  document.addEventListener('submit',event=>{
   if((event.target as Element).id!=='run-form')return;
   host.firstOfficeFrames=[];let frame=0;
   const sample=()=>{const desk=document.querySelector('#desk-observe')!,stage=document.querySelector('#supervision-stage')!,output=document.querySelector<HTMLElement>('#output')!,style=getComputedStyle(output);host.firstOfficeFrames!.push({viewport:innerHeight,document:document.documentElement.scrollHeight,desk:desk.getBoundingClientRect().height,stage:stage.getBoundingClientRect().height,content:output.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom),line:parseFloat(style.lineHeight)});if(++frame<6)requestAnimationFrame(sample);};requestAnimationFrame(sample);
  },true);
 });
 await reception(page);
 for(const [width,height]of [[390,844],[390,667],[320,568],[844,390]]){
  await page.setViewportSize({width,height});await demoNavigator(page).desk('authorize');await page.fill('#limit','1');await page.check('#authorize-executive-hovering');await page.evaluate(()=>window.scrollTo(0,2000));await page.click('#run-button');
  await expect(page.locator('#supervision-pause')).toHaveAttribute('aria-disabled','false');
  await page.waitForFunction(()=>(window as Window&{firstOfficeFrames?:unknown[]}).firstOfficeFrames?.length===6);
  const frames=await page.evaluate(()=>(window as Window&{firstOfficeFrames?:{viewport:number;document:number;desk:number;stage:number;content:number;line:number}[]}).firstOfficeFrames!);
  for(const frame of frames){expect(frame.document,JSON.stringify(frames)).toBeLessThanOrEqual(frame.viewport+1);expect(frame.stage,JSON.stringify(frames)).toBeGreaterThan(65);expect(frame.stage).toBeLessThan(frame.viewport*.7);expect(frame.content,JSON.stringify(frames)).toBeGreaterThanOrEqual(frame.line*2-1);}
  expect(Math.max(...frames.map(frame=>frame.desk))-Math.min(...frames.map(frame=>frame.desk))).toBeLessThan(2);
  await page.click('#stop-reading');
 }
 await page.setViewportSize({width:390,height:667});await demoNavigator(page).run();await demoNavigator(page).options(()=>page.check('#executive-hovering'));await page.selectOption('#watch-view','office');await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered','true');
 await page.screenshot({path:info.outputPath('mobile-office.png')});
 const audit=await new AxeBuilder({page}).include('#desk-observe').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']).analyze();expect(audit.violations).toEqual([]);
});

test('navigation, status focus, and companion biographies do not pause ordinary disclosure',async({page})=>{
 await reception(page);await page.uncheck('#authorize-executive-hovering');await page.selectOption('#authorize-display-speed','225');await page.fill('#limit','100');await page.click('#run-button');await expect.poll(()=>printed(page)).toBeGreaterThan(3);
 let before=await printed(page);await demoNavigator(page).desk('authorize');await expect.poll(()=>printed(page)).toBeGreaterThan(before+1);
 await page.click('#resume-current');await expect(page.locator('#pause-reading')).toHaveAttribute('aria-pressed','false');await page.focus('#run-status');before=await printed(page);await expect.poll(()=>printed(page)).toBeGreaterThan(before+1);
 await page.locator('#discovery-list button').first().click();await expect(page.locator('#companion-dialog')).toBeVisible();before=await printed(page);await expect.poll(()=>printed(page)).toBeGreaterThan(before+1);await expect(page.locator('#pause-reading')).toHaveAttribute('aria-pressed','false');await page.locator('[data-companion-close]').click();
 await page.click('#pause-reading');await expect(page.locator('#pause-reading')).toHaveAttribute('aria-pressed','true');const held=await printed(page);await demoNavigator(page).desk('evidence');await page.waitForTimeout(500);expect(await printed(page)).toBe(held);await demoNavigator(page).desk('observe');await page.click('#pause-reading');await expect.poll(()=>printed(page)).toBeGreaterThan(held);await page.click('#stop-reading');
});

test('the supervised clock runs without animation frames or graphics readiness, and only explicit Pause holds it',async({page})=>{
 test.setTimeout(60000);let release!:()=>void;const gate=new Promise<void>(resolve=>release=resolve);
 await page.route('**/office-world.js',async route=>{await gate;await route.abort();});
 try{
  await reception(page);await page.selectOption('#authorize-display-speed','800');await page.fill('#limit','1');await page.click('#run-button');await expect(page.locator('#supervision-pause')).toHaveAttribute('aria-disabled','false');
  await page.evaluate(()=>{const host=window as Window&{realOfficeFrame?:typeof requestAnimationFrame};host.realOfficeFrame=requestAnimationFrame;window.requestAnimationFrame=()=>0;Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});
  const before=await steps(page);await expect.poll(()=>steps(page),{timeout:15000}).toBeGreaterThan(before+1);await expect(page.locator('#supervision-pause')).toHaveAttribute('aria-pressed','false');
  await page.evaluate(()=>document.querySelector<HTMLButtonElement>('#supervision-pause')!.click());await expect(page.locator('#supervision-pause')).toHaveAttribute('aria-pressed','true');await page.waitForTimeout(150);const held=await steps(page);await page.waitForTimeout(350);expect(await steps(page)).toBe(held);
  await page.evaluate(()=>document.querySelector<HTMLButtonElement>('#supervision-next')!.click());await expect.poll(()=>steps(page)).toBe(held+1);await page.waitForTimeout(200);expect(await steps(page)).toBe(held+1);
  await page.evaluate(()=>{const host=window as Window&{realOfficeFrame?:typeof requestAnimationFrame};window.requestAnimationFrame=host.realOfficeFrame!;Reflect.deleteProperty(document,'hidden');document.dispatchEvent(new Event('visibilitychange'));});await page.click('#stop-reading');
 }finally{release();}
});

test('SVG transport controls retain names, tooltips and keyboard pause/resume state',async({page})=>{
 await reception(page);await page.fill('#limit','1');await page.click('#run-button');await expect(page.locator('#supervision-pause')).toHaveAttribute('aria-disabled','false');
 for(const id of ['stop-reading','supervision-pause','supervision-next','watch-settings-toggle']){const button=page.locator('#'+id);expect((await button.textContent())?.trim()).toBe('');await expect(button.locator('svg')).toHaveAttribute('aria-hidden','true');expect(await button.getAttribute('aria-label')).toBeTruthy();expect(await button.getAttribute('title')).toBe(await button.getAttribute('aria-label'));}
 const pause=page.locator('#supervision-pause');await pause.focus();await page.keyboard.press('Space');await expect(pause).toHaveAttribute('data-icon','play');await expect(pause).toHaveAttribute('aria-label','Resume');await page.keyboard.press('Space');await expect(pause).toHaveAttribute('data-icon','pause');await expect(pause).toHaveAttribute('aria-label','Pause');
 await page.click('#watch-settings-toggle');await expect(page.locator('#watch-settings-toggle')).toHaveAttribute('aria-expanded','true');await page.click('#watch-settings-close');await page.click('#stop-reading');
});
