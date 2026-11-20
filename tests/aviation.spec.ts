import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {demoAction,department} from './demo-controls';
import {naturalFlight} from '../scripts/flight-navigation';
import {flightInterval} from '../web/office-incident-model';
import type {OfficeDiagnostics} from '../web/office-world';
import {scoringStorageKey,type ScoringRun} from '../web/scoring-service';
const errors=new WeakMap<Page,string[]>();
test.beforeEach(async({page},info)=>{page.setDefaultTimeout(15000);errors.set(page,[]);page.on('pageerror',e=>errors.get(page)!.push(e.message));await page.route('**/runtime-config.json',async route=>{const r=await route.fetch();await route.fulfill({json:{...await r.json(),engine:info.project.metadata.engine}});});});
test.afterEach(async({page})=>expect(errors.get(page)).toEqual([]));
async function ready(page:Page){await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');}
async function scene(page:Page):Promise<OfficeDiagnostics>{return page.locator('#supervision-canvas').evaluate(async c=>{const canvas=c as HTMLCanvasElement,m=await import(canvas.dataset.module!);return m.inspectOffice(canvas);});}
async function audit(page:Page){return page.evaluate(async()=>{const m=await import(new URL('/assets/tribunal.js',location.href).href),client=new m.BrowserRuntimeClient();try{return await(await client.request('/audit/evidence')).json();}finally{client.close();}});}
async function land(page:Page){await page.locator('#supervision-flight').getByRole('button',{name:'Land now',exact:true}).click();await expect(page.locator('#supervision-flight')).toBeHidden();}
const expected=(n:number)=>Array.from({length:n},(_,i)=>{const v=i+1;return v%15===0?'FizzBuzz':v%3===0?'Fizz':v%5===0?'Buzz':String(v);}).join('\n')+'\n';

test('matching setup controls commit independently, persist, and expose no manual flight launch',async({page})=>{
 await ready(page);await expect(page.locator('#authorize-executive-hovering')).toBeChecked();await expect(page.locator('#flight-rehearse,#flight-pilot,#flight-ordinal')).toHaveCount(0);
 for(const id of ['stamp-heists','paper-flights']){await expect(page.locator('#authorize-'+id)).toBeChecked();await page.uncheck('#authorize-'+id);await expect(page.locator('#'+id)).toBeChecked();}
 await page.reload();await expect(page.locator('#health-value')).toHaveText('LIVE');await expect(page.locator('#authorize-paper-flights')).not.toBeChecked();await expect(page.locator('#authorize-stamp-heists')).not.toBeChecked();
 await page.uncheck('#authorize-executive-hovering');await page.selectOption('#authorize-display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');
 await demoAction(page,'check','#paper-flights');await department(page,'authorize');await expect(page.locator('#authorize-paper-flights')).not.toBeChecked();
 await page.check('#authorize-paper-flights');await expect(page.locator('#stamp-heists')).not.toBeChecked();
 await demoAction(page,'click','#office-enter');await page.locator('.office-mischief>summary').click();await expect(page.locator('.office-mischief [data-flight-enabled]')).toBeChecked();await expect(page.locator('.office-mischief [data-heist-enabled]')).not.toBeChecked();
});

test('legacy drafts acquire saved antic preferences while retaining their supervision policy',async({page})=>{
 await page.addInitScript(()=>{sessionStorage.setItem('slopbuzz:authorization-draft:v2',JSON.stringify({cadence:'225',companions:false,authority:'factor-resonance-v1',roll:false,hovering:true}));sessionStorage.setItem('slopbuzz:paper-aviation:v1','off');sessionStorage.setItem('slopbuzz:stamp-heists:v1','off');});
 await ready(page);await expect(page.locator('#authorize-executive-hovering')).toBeChecked();await expect(page.locator('#authorize-paper-flights')).not.toBeChecked();await expect(page.locator('#authorize-stamp-heists')).not.toBeChecked();await expect(page.locator('#authorize-emoji-companions')).not.toBeChecked();
 await page.check('#authorize-paper-flights');expect(await page.evaluate(()=>JSON.parse(sessionStorage.getItem('slopbuzz:authorization-draft:v3')!))).toEqual({cadence:'225',companions:false,authority:'factor-resonance-v1',roll:false,hovering:true,heists:false,flights:true});
});

test('automatic flight takes the best view, holds exact proceedings, and restores the chosen view and Pause',async({page})=>{
 test.setTimeout(180000);await ready(page);await naturalFlight(page,{limit:'55',view:'output'});
 await expect(page.locator('#watch-view')).toHaveValue('office');await expect(page.locator('#watch-view')).toBeDisabled();await expect(page.locator('#supervision-flight .flight-pilot')).not.toBeEmpty();await expect(page.locator('#supervision-flight')).toContainText('Proceedings held until landing');
 await page.screenshot({path:test.info().outputPath('automatic-flight.png')});
 const output=await page.locator('#output').textContent(),before=await audit(page),steps=await page.locator('#supervision-pane').getAttribute('data-observed-steps');
 await page.click('#supervision-pause');await page.selectOption('#supervision-flight-destination','executive');await page.locator('#supervision-flight [data-fan="0"]').click();await expect(page.locator('#supervision-flight .flight-route')).toContainText('Executive');await page.waitForTimeout(250);
 expect(await page.locator('#output').textContent()).toBe(output);expect(await page.locator('#supervision-pane').getAttribute('data-observed-steps')).toBe(steps);
 await land(page);await expect(page.locator('#watch-view')).toHaveValue('output');await expect(page.locator('#watch-view')).toBeEnabled();await expect(page.locator('#supervision-pause')).toHaveAttribute('aria-pressed','true');await expect(page.locator('#flight-arrival-notice')).toContainText('arrived');expect(await page.locator('#output').textContent()).toBe(output);
 const score=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).current as ScoringRun,scoringStorageKey);expect(score.counters.flights).toBe('1');expect(Object.keys(score.buckets).some(key=>key.startsWith('flightManifest|'))).toBe(true);expect(Object.keys(score.buckets).some(key=>key.startsWith('flightDelivery|'))).toBe(true);expect(score.incident).toBeUndefined();
 const after=await audit(page);expect(after.headDigest).toBe(before.headDigest);expect(after.journalEntries).toBe(before.journalEntries);
 await demoAction(page,'click','#reveal-all');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#output')).toHaveText(expected(55));
});

test('live authority locks only during an antic and reallocation cannot replay old departures',async({page})=>{
 test.setTimeout(180000);await ready(page);await naturalFlight(page);await page.click('#supervision-pause');
 await page.click('#watch-settings-toggle');await expect(page.locator('#companion-strategy')).toBeDisabled();await expect(page.locator('#companion-authority-help')).toContainText('held until');await expect(page.locator('#authorize-companion-strategy')).toBeEnabled();await page.click('#watch-settings-close');
 await land(page);const before=await audit(page),output=await page.locator('#output').textContent();
 await demoAction(page,'selectOption','#companion-strategy','ordinal-constellation-v1');await expect(page.locator('#companion-list')).toContainText('3 · Fizz');await page.waitForTimeout(300);await expect(page.locator('#flight-records li')).toHaveCount(1);await expect(page.locator('#supervision-flight')).toBeHidden();expect(await page.locator('#output').textContent()).toBe(output);expect((await audit(page)).headDigest).toBe(before.headDigest);
 await expect(page.locator('#authorize-companion-strategy')).toHaveValue('factor-resonance-v1');
});

test('more than two natural flights depart in one mandate with both antics enabled',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','The schedule is also covered by exact integer model checks.');test.setTimeout(240000);await ready(page);await naturalFlight(page,{limit:'350'});let ordinal=30n;
 for(let i=1n;i<=3n;i++){
  await page.click('#supervision-pause');await land(page);await expect(page.locator('#flight-records li')).toHaveCount(Number(i));if(i===3n)break;
  const next=ordinal+flightInterval('350',i);
  await demoAction(page,'uncheck','#executive-hovering');await demoAction(page,'selectOption','#display-speed','225');await page.click('#pause-reading');
  await expect.poll(async()=>Number((await page.locator('#output-count').textContent())!.split(' ')[0]),{timeout:40000}).toBeGreaterThanOrEqual(Number(next)-6);
  await page.click('#pause-reading');await demoAction(page,'check','#executive-hovering');await demoAction(page,'selectOption','#display-speed','0');await page.click('#supervision-pause');
  await expect(page.locator('#supervision-flight')).toBeVisible({timeout:120000});await expect(page.locator('#supervision-flight')).toContainText('-'+next);ordinal=next;
 }
});

test('native fan and runway picking operate in the automatically selected scene',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Native rendering is shared.');test.setTimeout(180000);await page.emulateMedia({reducedMotion:'reduce'});await ready(page);await naturalFlight(page);await expect.poll(async()=>(await scene(page)).flight?.fans.length).toBe(3);
 async function pick(kind:'fan'|'runway'){
  const d=(await scene(page)).flight!,box=(await page.locator('#supervision-canvas').boundingBox())!,points=kind==='fan'?d.fans.map(f=>({...f,value:String(f.index)})):d.runways.filter(r=>r.room!=='memory').map(r=>({...r,value:r.room}));
  for(const p of points){const x=box.x+p.x,y=box.y+p.y;if(!await page.evaluate(({x,y})=>document.elementFromPoint(x,y)?.id==='supervision-canvas',{x,y}))continue;await page.mouse.click(x,y);if(kind==='fan'){if(await page.locator('#supervision-flight [data-fan="'+p.value+'"]').getAttribute('data-direction')==='right')return true;}else if(await page.locator('#supervision-flight-destination').inputValue()===p.value)return true;}return false;
 }
 expect(await pick('fan')).toBe(true);expect(await pick('runway')).toBe(true);await land(page);
});

test('room moves freeze flight time and resume the selected runway in fullscreen',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared relocation geometry.');test.setTimeout(180000);await ready(page);await naturalFlight(page);await page.click('#supervision-fullscreen');await page.selectOption('#supervision-flight-destination','personnel');await page.click('#watch-settings-toggle');await page.click('#watch-reorganize');await expect(page.locator('#supervision-flight')).toContainText('Airspace frozen');
 const elapsed=await page.locator('#supervision-flight').getAttribute('data-elapsed');await page.waitForTimeout(250);expect(await page.locator('#supervision-flight').getAttribute('data-elapsed')).toBe(elapsed);
 await page.click('#watch-waive');await expect(page.locator('#supervision-flight-destination')).toHaveValue('personnel');await land(page);await expect(page.locator('#office-fullscreen')).toBeVisible();await page.keyboard.press('Escape');
});

test('mobile fullscreen makes the pilot and controls readable with reduced motion and keyboard input',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared accessibility and visual check.');test.setTimeout(180000);await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});
 // Simulate one expensive first draw: its completion must refresh the graphics
 // heartbeat, even when compilation took longer than the missing-frame timeout.
 await page.addInitScript(()=>{
  let delayed=false;
  for(const type of [globalThis.WebGLRenderingContext,globalThis.WebGL2RenderingContext].filter(Boolean))for(const name of ['drawElements','drawArrays','drawElementsInstanced','drawArraysInstanced']){
   const prototype=type.prototype as unknown as Record<string,(...args:number[])=>void>,draw=prototype[name];if(!draw)continue;
   prototype[name]=function(...args:number[]){if(!delayed){delayed=true;document.documentElement.dataset.slowOfficeDraw='true';const until=performance.now()+3200;while(performance.now()<until){/* One bounded cold shader simulation. */}}return draw.apply(this,args);};
  }
 });
 await ready(page);await naturalFlight(page);await expect(page.locator('html')).toHaveAttribute('data-slow-office-draw','true');await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered','true');await expect(page.locator('#supervision-canvas')).toBeVisible();
 const inlineCanvas=await page.locator('#supervision-canvas').boundingBox(),inlinePanel=await page.locator('#supervision-flight').boundingBox();expect(inlineCanvas!.y+inlineCanvas!.height).toBeLessThanOrEqual(inlinePanel!.y+1);await page.screenshot({path:test.info().outputPath('mobile-flight-inline.png')});
 await page.click('#supervision-fullscreen');await expect(page.locator('#supervision-flight')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);const canvas=await page.locator('#supervision-canvas').boundingBox(),panel=await page.locator('#supervision-flight').boundingBox();expect(canvas!.height).toBeGreaterThan(100);
 // Native Firefox fullscreen uses the physical display, overriding the emulated width.
 if(await page.evaluate(()=>matchMedia('(max-width:700px)').matches))expect(canvas!.y+canvas!.height).toBeLessThanOrEqual(panel!.y+1);else expect(canvas!.x+canvas!.width).toBeLessThanOrEqual(panel!.x+1);
 await page.screenshot({path:test.info().outputPath('mobile-flight.png')});
 const axe=await new AxeBuilder({page}).include('#supervision-flight').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(axe.violations).toEqual([]);
 const button=page.locator('#supervision-flight').getByRole('button',{name:'Land now',exact:true});await button.focus();await page.keyboard.press('Enter');await expect(page.locator('#supervision-flight')).toBeHidden();await page.keyboard.press('Escape');
});

test('readable automatic aviation survives WebGL refusal and opt-out safely restores the view',async({page})=>{
 test.setTimeout(180000);await page.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,kind:any,...args:any[]){if(String(kind).includes('webgl'))return null;return get.call(this,kind,...args);} as typeof get;});await ready(page);await naturalFlight(page);await page.selectOption('#supervision-flight-destination','reception');await expect(page.locator('#supervision-flight .flight-route')).toContainText('Reception');
 await demoAction(page,'uncheck','#paper-flights');await expect(page.locator('#supervision-flight')).toBeHidden();await expect(page.locator('#watch-view')).toHaveValue('output');await expect(page.locator('body')).not.toHaveAttribute('data-flight-spotlight','true');
 await page.reload();await expect(page.locator('#health-value')).toHaveText('LIVE');await expect(page.locator('#paper-flights')).not.toBeChecked();
});

test('Stop and replacement mandates cancel flight custody without resurrecting the old view',async({page})=>{
 test.setTimeout(180000);await ready(page);await naturalFlight(page);const held=await page.locator('#output').textContent();await page.click('#stop-reading');await expect(page.locator('#supervision-flight')).toBeHidden();expect(await page.locator('#output').textContent()).toBe(held);
 await department(page,'authorize');await page.fill('#limit','15');await page.uncheck('#authorize-executive-hovering');await page.selectOption('#authorize-display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#output')).toHaveText(expected(15));await expect(page.locator('body')).not.toHaveAttribute('data-flight-spotlight','true');
});

test('an unattended diversion finishes after leaving the demo and retains its delivery finding',async({page})=>{
 test.setTimeout(180000);await ready(page);await naturalFlight(page);await page.locator('#supervision-flight [data-fan="0"]').click();await page.click('#company-menu');await page.getByRole('navigation',{name:'Primary navigation'}).getByRole('link',{name:'About',exact:true}).click();await expect(page.locator('#supervision-flight')).not.toHaveAttribute('data-active','true',{timeout:22000});await page.goBack();await expect(page.locator('#flight-records')).toContainText('ground courier');await expect(page.locator('body')).not.toHaveAttribute('data-flight-spotlight','true');
});
