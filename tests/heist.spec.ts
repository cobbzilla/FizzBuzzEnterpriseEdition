import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {demoAction,department} from './demo-controls';
import type {OfficeDiagnostics} from '../web/office-world';

const errors=new WeakMap<Page,string[]>();
test.beforeEach(async({page},info)=>{
 errors.set(page,[]);page.on('pageerror',e=>errors.get(page)!.push(e.message));
 await page.route('**/runtime-config.json',async route=>{const response=await route.fetch();await route.fulfill({json:{...await response.json(),engine:info.project.metadata.engine}});});
});
test.afterEach(async({page})=>expect(errors.get(page)).toEqual([]));
async function ready(page:Page){await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');}
async function office(page:Page,graphics=true){await demoAction(page,'click','#office-enter');if(graphics)await expect(page.locator('#office-canvas')).toHaveAttribute('data-rendered','true');await page.locator('.heist-security>summary').click();}
async function rehearse(page:Page,actor='🐌'){await page.selectOption('#heist-suspect',actor);await page.click('#heist-rehearse');await expect(page.locator('#office-heist')).toBeVisible();}
async function scene(page:Page,selector='#office-canvas'):Promise<OfficeDiagnostics>{return page.locator(selector).evaluate(async c=>{const canvas=c as HTMLCanvasElement,m=await import(canvas.dataset.module!);return m.inspectOffice(canvas);});}
async function audit(page:Page){return page.evaluate(async()=>{const m=await import(new URL('/assets/tribunal.js',location.href).href),client=new m.BrowserRuntimeClient();try{return await(await client.request('/audit/evidence')).json();}finally{client.close();}});}
const expected=(n:number)=>Array.from({length:n},(_,i)=>{const v=i+1;return v%15===0?'FizzBuzz':v%3===0?'Fizz':v%5===0?'Buzz':String(v);}).join('\n')+'\n';

test('suspects, footprints, alibis and biscuit amnesty work without awarding discoveries or writing audit entries',async({page})=>{
 await ready(page);await office(page);const before=await audit(page);
 await rehearse(page);await expect(page.locator('#office-heist')).toContainText('extremely slow');await page.locator('#office-heist [data-suspect="1"]').click();await expect(page.locator('#office-heist')).toContainText('whereabouts');
 await page.locator('#office-heist').getByRole('button',{name:'Follow footprints'}).click();await expect(page.locator('#office-heist')).toContainText('Footprints lead');
 await page.locator('#office-heist').getByRole('button',{name:'Offer an amnesty biscuit'}).click();await expect(page.locator('#office-heist')).toHaveAttribute('data-phase','returning');await expect(page.locator('#office-heist')).toBeHidden();
 await expect(page.locator('#heist-records')).toContainText('One biscuit');expect((await audit(page)).headDigest).toBe(before.headDigest);expect((await audit(page)).journalEntries).toBe(before.journalEntries);await expect(page.locator('#discovery-list button')).toHaveCount(0);await expect(page.locator('#output')).toHaveText('Awaiting a duly authorized number.');
});

test('the cast renders all three antics and repeated pursuits keep geometry and materials bounded',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','The same renderer is covered once per browser.');await ready(page);await office(page);let ceiling:OfficeDiagnostics|undefined;
 for(let i=0;i<9;i++){
  const glyph=['🐌','👻','🐙'][i%3];await rehearse(page,glyph);await expect(page.locator('#office-heist')).toContainText(glyph==='🐌'?'slow':glyph==='👻'?'wall':'Eight');await expect.poll(async()=>(await scene(page)).heist?.actors.length).toBe(3);const current=await scene(page);if(i===2)ceiling=current;if(i>2){expect(current.meshes).toBe(ceiling!.meshes);expect(current.estate.materials).toBe(ceiling!.estate.materials);}
  await page.locator('#office-heist').getByRole('button',{name:'Skip the chase'}).click();await expect(page.locator('#office-heist')).toBeHidden();
 }
 await expect(page.locator('#heist-records li')).toHaveCount(9);
});

test('a native click on the current 3D suspect recovers the stamp',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Native picking is shared by both numerical engines.');await ready(page);await office(page);await rehearse(page,'👻');
 await expect.poll(async()=>(await scene(page)).heist?.actors.length).toBe(3);
 // The ghost starts at the top of its route. Intercept while it is visible
 // beside the compact incident controls, using the actual projected mesh.
 for(let attempt=0;attempt<8&&await page.locator('#office-heist').getAttribute('data-phase')==='chase';attempt++){
  const current=await scene(page),actor=current.heist!.actors.find(a=>a.index===current.heist!.holder)!,box=(await page.locator('#office-canvas').boundingBox())!;
  const point={x:box.x+actor.x,y:box.y+actor.y};await page.mouse.click(point.x,point.y);if(await page.locator('#office-heist').getAttribute('data-phase')==='returning')break;await page.waitForTimeout(120);
 }
 await expect(page.locator('#office-heist')).toHaveAttribute('data-phase','returning');await expect(page.locator('#office-heist')).toBeHidden();await expect(page.locator('#heist-records')).toContainText('Stamp recovered');
});

test('an unattended chase returns its stamp while the visitor is on another page',async({page})=>{
 await ready(page);await office(page);await rehearse(page);await page.getByRole('navigation',{name:'Primary navigation'}).getByRole('link',{name:'About',exact:true}).click();
 await expect(page.locator('#office-heist')).toHaveAttribute('data-active','true');await expect(page.locator('#office-heist')).not.toHaveAttribute('data-active','true',{timeout:25000});
 await page.goBack();await expect(page.locator('#heist-records')).toContainText('stolen approval still requires approval');
});

test('a live palindrome freezes disclosure, preserves an explicit pause, and resumes without duplicate output',async({page})=>{
 test.setTimeout(180000);await ready(page);await page.fill('#limit','45');await page.uncheck('#authorize-executive-hovering');await page.selectOption('#authorize-display-speed','225');await page.click('#run-button');
 await expect.poll(async()=>Number((await page.locator('#output-count').textContent())!.split(' ')[0])).toBeGreaterThanOrEqual(28);
 await demoAction(page,'check','#executive-hovering');await demoAction(page,'selectOption','#display-speed','0');await page.selectOption('#watch-view','office');
 await expect(page.locator('#supervision-heist')).toBeVisible({timeout:120000});await expect(page.locator('#supervision-heist')).toContainText('33');
 const output=await page.locator('#output').textContent(),observed=await page.locator('#supervision-pane').getAttribute('data-observed-steps'),before=await audit(page);
 await page.waitForTimeout(500);expect(await page.locator('#output').textContent()).toBe(output);expect(await page.locator('#supervision-pane').getAttribute('data-observed-steps')).toBe(observed);
 await page.locator('#supervision-pause').click();await page.locator('#supervision-heist').getByRole('button',{name:'Skip the chase'}).click();await expect(page.locator('#supervision-pause')).toHaveAttribute('aria-pressed','true');await page.waitForTimeout(250);expect(await page.locator('#output').textContent()).toBe(output);
 await demoAction(page,'click','#reveal-all');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#output')).toHaveText(expected(45));const after=await audit(page);expect(after.journalEntries).toBe(45);expect(after.headDigest).toBe(before.headDigest);
});

test('reorganization suspends a pursuit and releases it into the new layout',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','The shared relocation coordinator is covered once per browser.');await ready(page);await office(page);await page.click('#office-walk');await rehearse(page,'🐙');await page.locator('#office-reorganization button').first().click();
 await expect(page.locator('#office-reorganization')).toHaveAttribute('data-relocation-phase','moving',{timeout:15000});await expect(page.locator('#office-heist')).toContainText('Pursuit held');const holder=await page.locator('#office-heist').getAttribute('data-holder');await page.waitForTimeout(200);expect(await page.locator('#office-heist').getAttribute('data-holder')).toBe(holder);
 await page.locator('#office-reorganization').getByRole('button',{name:'Waive the Moving Ceremony'}).click();await expect(page.locator('#office-reorganization')).toHaveAttribute('data-estate-edition','1');await expect.poll(async()=>(await scene(page)).heist?.actors.length).toBe(3);await expect.poll(async()=>(await scene(page)).camera.y).toBeGreaterThan(3);await page.locator('#office-heist').getByRole('button',{name:'Skip the chase'}).click();await expect(page.locator('#office-heist')).toBeHidden();await expect.poll(async()=>(await scene(page)).camera.y).toBeCloseTo(1.35);
});

test('mobile full-screen keeps named controls usable and reduced motion retains a stationary chase',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared mobile and motion behavior is covered once per browser.');await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await ready(page);await office(page);await rehearse(page,'🐙');await page.click('#office-fullscreen-enter');await expect(page.locator('#office-fullscreen')).toBeVisible();await expect(page.locator('#office-heist')).toBeVisible();
 const before=await scene(page);await page.waitForTimeout(250);const after=await scene(page);expect(after.camera).toEqual(before.camera);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 const result=await new AxeBuilder({page}).include('#office-heist').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(result.violations).toEqual([]);
 await page.locator('#office-heist').getByRole('button',{name:'Offer an amnesty biscuit'}).focus();await page.keyboard.press('Enter');await expect(page.locator('#office-heist')).toBeHidden();await page.keyboard.press('Escape');await expect(page.locator('#office-fullscreen')).not.toBeVisible();
});

test('the readable chase works without WebGL and its opt-out survives reload',async({page})=>{
 await page.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,kind:any,...args:any[]){if(String(kind).includes('webgl'))return null;return get.call(this,kind,...args);} as typeof get;});
 await ready(page);await office(page,false);await expect(page.locator('#office-canvas')).toHaveAttribute('data-renderer','directory');await rehearse(page);await page.locator('#office-heist [data-suspect="0"]').click();await expect(page.locator('#office-heist')).toBeHidden();
 await page.locator('.heist-security [data-heist-enabled]').uncheck();await page.reload();await expect(page.locator('#health-value')).toHaveText('LIVE');await office(page,false);await expect(page.locator('.heist-security [data-heist-enabled]')).not.toBeChecked();
});

test('Stop and replacement mandates cancel a pending pursuit without releasing stale output',async({page})=>{
 await ready(page);await page.fill('#limit','100');await page.uncheck('#authorize-executive-hovering');await page.selectOption('#authorize-display-speed','225');await page.click('#run-button');await expect(page.locator('#output-count')).toContainText('of 100');
 await office(page);await rehearse(page);const held=await page.locator('#output').textContent();await page.waitForTimeout(200);expect(await page.locator('#output').textContent()).toBe(held);
 await demoAction(page,'click','#stop-reading');await expect(page.locator('#office-heist')).toBeHidden();expect(await page.locator('#output').textContent()).toBe(held);
 await department(page,'facilities');await rehearse(page);await department(page,'authorize');await page.fill('#limit','15');await page.selectOption('#authorize-display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#output')).toHaveText(expected(15));await expect(page.locator('#office-heist')).toBeHidden();
 await page.waitForTimeout(250);await expect(page.locator('#output')).toHaveText(expected(15));
});
