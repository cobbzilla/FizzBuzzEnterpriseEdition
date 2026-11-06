import {test,expect,type Page} from '@playwright/test';
import {demoNavigator,paintedControl} from '../scripts/demo-navigation';
import type {OfficePaint} from '../web/office-world';

test.beforeEach(async({page},info)=>{await page.route('**/runtime-config.json',async route=>{const response=await route.fetch();await route.fulfill({json:{...await response.json(),engine:info.project.metadata.engine}});});});
async function click(page:Page,id:string){await(await paintedControl(page,page.locator(id))).click();}
async function start(page:Page){
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await expect(page.locator('#authorize-display-speed')).toBeEnabled();await page.fill('#limit','15');await page.selectOption('#authorize-display-speed','800');await page.check('#authorize-executive-hovering');await click(page,'#run-button');await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-rendered','true',{timeout:60000});await expect.poll(()=>paint(page)).toBeTruthy();await click(page,'#supervision-pause');await expect(page.locator('#supervision-pause')).toHaveAttribute('aria-pressed','true');
 const frame=(await paint(page)).frame;await page.waitForFunction(async previous=>{const canvas=document.querySelector<HTMLCanvasElement>('#supervision-canvas')!,module=await import(canvas.dataset.module!);return module.inspectOfficePaint(canvas)?.frame>=previous+2;},frame);
}
async function paint(page:Page):Promise<OfficePaint>{return page.evaluate(async()=>{const canvas=document.querySelector<HTMLCanvasElement>('#supervision-canvas')!,module=await import(canvas.dataset.module!);return module.inspectOfficePaint(canvas);});}

test('live cadence stays enabled and changes authority without restarting or unpausing the current decision',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Shared controls covered once per browser.');await start(page);const before=await paint(page),observed=await page.locator('#supervision-pane').getAttribute('data-observed-steps');
 for(const cadence of ['1800','800','225','0']){
  await demoNavigator(page).options(()=>page.selectOption('#display-speed',cadence));await expect(page.locator('#display-speed')).toBeEnabled();await expect(page.locator('#display-speed')).toHaveValue(cadence);await expect(page.locator('#executive-hovering')).toBeChecked();await expect(page.locator('#supervision-pause')).toHaveAttribute('aria-pressed','true');await expect(page.locator('#supervision-pane')).toHaveAttribute('data-observed-steps',observed!);
  const after=await paint(page);expect(after.id).toBe(before.id);expect(after.travel).toBe(before.travel);expect(after.work).toBe(before.work);
 }
 await click(page,'#supervision-pause');await expect.poll(()=>page.locator('#supervision-pane').getAttribute('data-observed-steps'),{timeout:15000}).not.toBe(observed);await click(page,'#stop-reading');
});

test('Fiat budgets actual slow frames, reduces graphics cost and paints the work before its official output',async({page},info)=>{
 test.skip(info.project.metadata.engine==='js','Actual shared rendering covered once per browser.');test.setTimeout(90000);await start(page);await demoNavigator(page).options(()=>page.selectOption('#display-speed','0'));
 for(let i=0;i<80;i++){if(await page.locator('#supervision-pane').getAttribute('data-kind')==='NOTARY')break;const before=await page.locator('#supervision-pane').getAttribute('data-observed-steps');await page.locator('#supervision-next').focus();await page.keyboard.press('Space');await expect.poll(()=>page.locator('#supervision-pane').getAttribute('data-observed-steps')).not.toBe(before);}
 await expect(page.locator('#supervision-pane')).toHaveAttribute('data-kind','NOTARY');await expect(page.locator('#output')).toHaveText('');
 await page.evaluate(async()=>{
  const canvas=document.querySelector<HTMLCanvasElement>('#supervision-canvas')!,module=await import(canvas.dataset.module!),native=requestAnimationFrame.bind(window),cancel=cancelAnimationFrame.bind(window),timers=new Map<number,number>();let requests=0,sampleFrame=0,lastFrame=-1,stalled=false;
  const samples:OfficePaint[]=[],publications:{text:string;paint?:OfficePaint}[]=[];
  window.requestAnimationFrame=callback=>{const id=native(()=>{const delay=++requests===30?(stalled=true,400):35;timers.set(id,window.setTimeout(()=>{timers.delete(id);callback(performance.now());},delay));});return id;};
  window.cancelAnimationFrame=id=>{cancel(id);const timer=timers.get(id);if(timer!==undefined)clearTimeout(timer);timers.delete(id);};
  const sample=()=>{const current=module.inspectOfficePaint(canvas);if(current&&current.frame!==lastFrame&&samples.length<1600){samples.push(current);lastFrame=current.frame;}sampleFrame=native(sample);};sampleFrame=native(sample);
  const observer=new MutationObserver(()=>{const text=document.querySelector('#output')!.textContent||'';if(text.endsWith('\n')&&text.trim())publications.push({text,paint:module.inspectOfficePaint(canvas)});});observer.observe(document.querySelector('#output')!,{childList:true,subtree:true,characterData:true});
  (window as Window&{cadenceProbe?:unknown}).cadenceProbe={samples,publications,get stalled(){return stalled;},stop(){observer.disconnect();cancel(sampleFrame);for(const timer of timers.values())clearTimeout(timer);timers.clear();window.requestAnimationFrame=native;window.cancelAnimationFrame=cancel;}};
 });
 await click(page,'#supervision-pause');await expect(page.locator('#supervision-pane')).toHaveAttribute('data-render-quality','economy',{timeout:15000});await expect(page.locator('#output')).toContainText('1\n',{timeout:45000});
 const result=await page.evaluate(()=>{const probe=(window as Window&{cadenceProbe?:{samples:OfficePaint[];publications:{text:string;paint?:OfficePaint}[];stalled:boolean;stop():void}}).cadenceProbe!;probe.stop();return {samples:probe.samples,publications:probe.publications,stalled:probe.stalled};});await click(page,'#stop-reading');
 expect(result.stalled).toBe(true);expect(result.samples.length).toBeGreaterThan(30);expect(result.samples.some(sample=>sample.quality==='economy')).toBe(true);
 let moving=0;for(let i=1;i<result.samples.length;i++){const a=result.samples[i-1],b=result.samples[i],frames=b.frame-a.frame;expect(Math.hypot(b.camera.x-a.camera.x,b.camera.y-a.camera.y,b.camera.z-a.camera.z)).toBeLessThanOrEqual(3*frames);if(a.id!==b.id)continue;expect(b.travel).toBeGreaterThanOrEqual(a.travel);expect(b.work).toBeGreaterThanOrEqual(a.work);expect(b.travel-a.travel).toBeLessThanOrEqual(.09*frames);expect(b.work-a.work).toBeLessThanOrEqual(.19*frames);if(b.travel>a.travel||b.work>a.work)moving++;}
 expect(moving).toBeGreaterThan(15);expect(result.publications.length).toBeGreaterThan(0);for(const publication of result.publications){expect(publication.paint?.kind).toBe('PUBLICATION');expect(publication.paint?.work).toBe(1);}
 await info.attach('actual-painted-motion',{body:JSON.stringify(result),contentType:'application/json'});
});

test.describe('explicit graphics refusal',()=>{
test.use({serviceWorkers:'block'});
test('Fiat retains every number and audit entry when the optional graphics module is unavailable',async({page})=>{
 let refused=false;await page.route('**/office-world.js',route=>{refused=true;return route.abort();});await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await page.fill('#limit','1');await page.selectOption('#authorize-display-speed','0');await expect(page.locator('#authorize-executive-hovering')).toBeChecked();await click(page,'#run-button');await expect.poll(()=>refused).toBe(true);await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-renderer','evidence');await expect(page.locator('#run-status')).toContainText('Mandate complete',{timeout:15000});await expect(page.locator('#output')).toHaveText('1\n');await expect(page.locator('#executive-hovering')).toBeChecked();await expect(page.locator('#display-speed')).toBeEnabled();
 const entries=await page.evaluate(async()=>{const module=await import(new URL('/assets/tribunal.js',location.href).href),client=new module.BrowserRuntimeClient();try{return(await(await client.request('/audit/evidence')).json()).journalEntries;}finally{client.close();}});expect(entries).toBe(1);
});
test('a renderer cleanup failure cannot strand Fiat or leak an unhandled error into the evidence view',async({page})=>{
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 await page.route('**/office-world.js',route=>route.fulfill({contentType:'application/javascript',body:'export function createOffice(options){queueMicrotask(()=>{options.onReady();options.onProblem("Simulated lost device");});return {direct(){},update(){},active(){},resize(){},dispose(){throw new Error("Simulated lost-device cleanup failure");}}}'}));
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await page.fill('#limit','1');await page.selectOption('#authorize-display-speed','0');await click(page,'#run-button');await expect(page.locator('#supervision-canvas')).toHaveAttribute('data-renderer','evidence');await expect(page.locator('#run-status')).toContainText('Mandate complete',{timeout:15000});await expect(page.locator('#output')).toHaveText('1\n');expect(errors).toEqual([]);
});
});
