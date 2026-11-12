import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {demoAction,department} from './demo-controls';
import {flightPersonalities} from '../web/office-flight-model';
import type {OfficeDiagnostics} from '../web/office-world';
const errors=new WeakMap<Page,string[]>();
test.beforeEach(async({page},info)=>{errors.set(page,[]);page.on('pageerror',e=>errors.get(page)!.push(e.message));await page.route('**/runtime-config.json',async route=>{const r=await route.fetch();await route.fulfill({json:{...await r.json(),engine:info.project.metadata.engine}});});});
test.afterEach(async({page})=>expect(errors.get(page)).toEqual([]));
async function ready(page:Page){await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');}
async function office(page:Page,graphics=true){await demoAction(page,'click','#office-enter');if(graphics)await expect(page.locator('#office-canvas')).toHaveAttribute('data-rendered','true');if(!await page.locator('#flight-pilot').isVisible())await page.locator('.office-mischief>summary').click();}
async function fly(page:Page,pilot='🐌',ordinal='100'){await page.selectOption('#flight-pilot',pilot);await page.selectOption('#flight-ordinal',ordinal);await page.click('#flight-rehearse');await expect(page.locator('#office-flight')).toBeVisible();}
async function scene(page:Page):Promise<OfficeDiagnostics>{return page.locator('#office-canvas').evaluate(async c=>{const canvas=c as HTMLCanvasElement,m=await import(canvas.dataset.module!);return m.inspectOffice(canvas);});}
async function audit(page:Page){return page.evaluate(async()=>{const m=await import(new URL('/assets/tribunal.js',location.href).href),client=new m.BrowserRuntimeClient();try{return await(await client.request('/audit/evidence')).json();}finally{client.close();}});}
const expected=(n:number)=>Array.from({length:n},(_,i)=>{const v=i+1;return v%15===0?'FizzBuzz':v%3===0?'Fizz':v%5===0?'Buzz':String(v);}).join('\n')+'\n';

test('a demonstration changes fans and runway, lands once and awards no production or discoveries',async({page})=>{
 await ready(page);await office(page);const before=await audit(page);await fly(page,'🐙','10000');await expect(page.locator('#office-flight')).toContainText('3 holding patterns');await expect(page.locator('#office-flight')).toContainText('circular-activity budget');
 await page.selectOption('#office-flight-destination','executive');await page.locator('#office-flight [data-fan="0"]').click();await expect(page.locator('#office-flight [data-fan="0"]')).toHaveAttribute('data-direction','right');await expect(page.locator('#office-flight .flight-route')).toContainText('Executive');
 await page.locator('#office-flight').getByRole('button',{name:'Land now',exact:true}).click();await expect(page.locator('#office-flight')).toHaveAttribute('data-phase','landing');await expect(page.locator('#office-flight')).toBeHidden();await expect(page.locator('#flight-records li')).toHaveCount(1);
 const after=await audit(page);expect(after.headDigest).toBe(before.headDigest);expect(after.journalEntries).toBe(before.journalEntries);await expect(page.locator('#discovery-list button')).toHaveCount(0);await expect(page.locator('#output')).toHaveText('Awaiting a duly authorized number.');
});

test('all twelve personalities render with fixed resources and ordinary offices keep their original budget',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','The shared renderer is exercised once per browser.');test.setTimeout(180000);await ready(page);await office(page);expect((await scene(page)).meshes).toBeLessThan(150);let ceiling:OfficeDiagnostics|undefined;
 // Babylon may allocate one default fallback material after a texture replacement; no per-flight growth is admitted.
 for(const [i,p]of flightPersonalities.filter(p=>p.id!=='clerk').entries()){
  await fly(page,p.glyph,['10','100','1000'][i%3]);await expect(page.locator('#office-flight')).toContainText(p.name);await expect.poll(async()=>(await scene(page)).flight?.tactic).toBe(p.id);const current=await scene(page);expect(Object.values(current.flight!.plane).every(Number.isFinite)).toBe(true);if(i===0)ceiling=current;else{expect(current.meshes).toBe(ceiling!.meshes);expect(current.estate.materials).toBeGreaterThanOrEqual(ceiling!.estate.materials);expect(current.estate.materials).toBeLessThanOrEqual(ceiling!.estate.materials+1);}
  await page.locator('#office-flight').getByRole('button',{name:'Land now',exact:true}).click();await expect(page.locator('#office-flight')).toBeHidden();
 }
 await expect(page.locator('#flight-records li')).toHaveCount(10);
});

test('native desk fans and runway picking change the flight through the actual canvas',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Native scene picking is shared.');await page.emulateMedia({reducedMotion:'reduce'});await ready(page);await office(page);await fly(page,'🐦','1000');await page.locator('#office-canvas').scrollIntoViewIfNeeded();await expect.poll(async()=>(await scene(page)).flight?.fans.length).toBe(3);
 async function pick(kind:'fan'|'runway'){
  const d=(await scene(page)).flight!,box=(await page.locator('#office-canvas').boundingBox())!,points=kind==='fan'?d.fans.map(f=>({...f,value:String(f.index)})):d.runways.filter(r=>r.room!=='memory').map(r=>({...r,value:r.room}));
  for(const p of points){const x=box.x+p.x,y=box.y+p.y;if(!await page.evaluate(({x,y})=>document.elementFromPoint(x,y)?.id==='office-canvas',{x,y}))continue;await page.mouse.click(x,y);if(kind==='fan'){const control=page.locator('#office-flight [data-fan="'+p.value+'"]');if(await control.getAttribute('data-direction')==='right')return true;}else if(await page.locator('#office-flight-destination').inputValue()===p.value)return true;}
  return false;
 }
 expect(await pick('fan')).toBe(true);expect(await pick('runway')).toBe(true);await page.locator('#office-flight').getByRole('button',{name:'Land now',exact:true}).click();await expect(page.locator('#office-flight')).toBeHidden();
});

test('live aviation holds the exact proceedings and preserves an explicit Pause after landing',async({page})=>{
 test.setTimeout(180000);await ready(page);await office(page);await page.locator('.office-mischief [data-heist-enabled]').uncheck();await department(page,'authorize');await page.fill('#limit','55');await page.uncheck('#authorize-executive-hovering');await page.selectOption('#authorize-display-speed','225');await page.click('#run-button');
 await expect.poll(async()=>Number((await page.locator('#output-count').textContent())!.split(' ')[0])).toBeGreaterThanOrEqual(35);await demoAction(page,'check','#executive-hovering');await demoAction(page,'selectOption','#display-speed','0');await page.selectOption('#watch-view','office');
 await expect(page.locator('#supervision-flight')).toBeVisible({timeout:120000});await expect(page.locator('#supervision-flight')).toContainText('40');const output=await page.locator('#output').textContent(),steps=await page.locator('#supervision-pane').getAttribute('data-observed-steps'),before=await audit(page);await page.waitForTimeout(300);expect(await page.locator('#output').textContent()).toBe(output);expect(await page.locator('#supervision-pane').getAttribute('data-observed-steps')).toBe(steps);
 await page.click('#supervision-pause');await page.locator('#supervision-flight').getByRole('button',{name:'Land now',exact:true}).click();await expect(page.locator('#supervision-flight')).toBeHidden();await expect(page.locator('#supervision-pause')).toHaveAttribute('aria-pressed','true');expect(await page.locator('#output').textContent()).toBe(output);
 await demoAction(page,'click','#reveal-all');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#output')).toHaveText(expected(55));const after=await audit(page);expect(after.headDigest).toBe(before.headDigest);expect(after.journalEntries).toBe(55);
});

test('a room move freezes air traffic, relocates its runway and restores the walking camera',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared relocation and geometry.');await ready(page);await office(page);await page.click('#office-walk');await fly(page,'🦀','1000');await page.click('#office-overview');expect((await scene(page)).view).toBe('walk');await page.selectOption('#office-flight-destination','personnel');await page.locator('#office-reorganization button').first().click();await expect(page.locator('#office-flight')).toContainText('Airspace frozen');
 const elapsed=await page.locator('#office-flight').getAttribute('data-elapsed');await page.waitForTimeout(250);expect(await page.locator('#office-flight').getAttribute('data-elapsed')).toBe(elapsed);
 await page.locator('#office-reorganization').getByRole('button',{name:'Waive the Moving Ceremony'}).click();await expect(page.locator('#office-reorganization')).toHaveAttribute('data-estate-edition','1');await expect(page.locator('#office-flight-destination')).toHaveValue('personnel');await expect.poll(async()=>(await scene(page)).camera.y).toBeGreaterThan(3);
 await page.locator('#office-flight').getByRole('button',{name:'Land now',exact:true}).click();await expect(page.locator('#office-flight')).toBeHidden();await expect.poll(async()=>(await scene(page)).camera.y).toBeCloseTo(1.35);
});

test('mobile fullscreen keeps the flight controls usable with reduced motion and keyboard input',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared mobile visual and accessibility check.');await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await ready(page);await office(page);await fly(page,'🦋','1000');await page.click('#office-fullscreen-enter');await expect(page.locator('#office-flight')).toBeVisible();const before=await scene(page);await page.waitForTimeout(200);const after=await scene(page);expect(after.camera).toEqual(before.camera);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 const axe=await new AxeBuilder({page}).include('#office-flight').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(axe.violations).toEqual([]);const land=page.locator('#office-flight').getByRole('button',{name:'Land now',exact:true});await land.focus();await page.keyboard.press('Enter');await expect(page.locator('#office-flight')).toBeHidden();await expect(page.locator('#office-fullscreen-exit')).toBeFocused();await page.keyboard.press('Escape');
});

test('an unattended diversion completes away from the demo and keeps only a fictional delivery finding',async({page})=>{
 await ready(page);await office(page);await fly(page,'🦊','10');await page.locator('#office-flight [data-fan="0"]').click();await page.getByRole('navigation',{name:'Primary navigation'}).getByRole('link',{name:'About',exact:true}).click();await expect(page.locator('#office-flight')).not.toHaveAttribute('data-active','true',{timeout:22000});await page.goBack();await expect(page.locator('#flight-records')).toContainText('ground courier');
});

test('readable aviation survives WebGL refusal and remembers its automatic-flight opt-out',async({page})=>{
 await page.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,kind:any,...args:any[]){if(String(kind).includes('webgl'))return null;return get.call(this,kind,...args);} as typeof get;});await ready(page);await office(page,false);await expect(page.locator('#office-canvas')).toHaveAttribute('data-renderer','directory');await fly(page,'🐢','100');await page.selectOption('#office-flight-destination','reception');await expect(page.locator('#office-flight .flight-route')).toContainText('Reception');await page.locator('#office-flight').getByRole('button',{name:'Land now',exact:true}).click();await expect(page.locator('#office-flight')).toBeHidden();await page.locator('.office-mischief [data-flight-enabled]').uncheck();await page.reload();await expect(page.locator('#health-value')).toHaveText('LIVE');await office(page,false);await expect(page.locator('.office-mischief [data-flight-enabled]')).not.toBeChecked();
});

test('heists and flights exclude one another; Stop and new mandates cannot release stale paperwork',async({page})=>{
 await ready(page);await page.fill('#limit','100');await page.uncheck('#authorize-executive-hovering');await page.selectOption('#authorize-display-speed','225');await page.click('#run-button');await office(page);await fly(page,'🐕');await page.click('#heist-rehearse');await expect(page.locator('#office-heist')).toBeHidden();await expect(page.locator('#heist-rehearsal-status')).toContainText('busy');const held=await page.locator('#output').textContent();await demoAction(page,'click','#stop-reading');await expect(page.locator('#office-flight')).toBeHidden();expect(await page.locator('#output').textContent()).toBe(held);
 await department(page,'facilities');await page.click('#heist-rehearse');await expect(page.locator('#office-heist')).toBeVisible();await page.click('#flight-rehearse');await expect(page.locator('#flight-rehearsal-status')).toContainText('Airspace occupied');await page.locator('#office-heist').getByRole('button',{name:'Skip the chase'}).click();await fly(page,'🦉');await department(page,'authorize');await page.fill('#limit','15');await page.selectOption('#authorize-display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#office-flight')).toBeHidden();await expect(page.locator('#output')).toHaveText(expected(15));await page.waitForTimeout(200);await expect(page.locator('#output')).toHaveText(expected(15));
});
