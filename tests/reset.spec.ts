import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {build} from 'esbuild';
import {mkdtemp,readdir,symlink,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';
import {createStaticServer} from '../scripts/serve.ts';
import {demoNavigator} from '../scripts/demo-navigation.ts';

test.beforeEach(({},info)=>test.skip(info.project.metadata.engine==='js','The independent recovery bootstrap is shared by both Java engines.'));
async function custody(page:Page,scope:string){return page.evaluate(async scope=>{
 const module=await import(new URL('assets/tribunal.js',scope).href),client=new module.BrowserRuntimeClient();
 try{return await(await client.request('/audit/evidence')).json();}finally{client.close();}
},scope);}

for(const base of ['/', '/portfolio/slopbuzz/'])test(`reset escapes a retired worker with another tab open and preserves saved data: ${base}`,async({page,context})=>{
 const directory=await mkdtemp(`${tmpdir()}/slopbuzz-reset-`);
 // Link immutable build assets; recovery fixtures need no duplicate WASM tree.
 for(const name of await readdir('dist'))await symlink(resolve('dist',name),`${directory}/${name}`);
 const fixture=await build({entryPoints:['tests/fixtures/stale-reset-service-worker.ts'],bundle:true,format:'iife',target:'es2022',write:false});
 await writeFile(`${directory}/retired-worker.js`,fixture.outputFiles[0].text);
 const server=createStaticServer(directory,base);
 await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));
 const scope=`http://127.0.0.1:${(server.address() as {port:number}).port}${base}`;
 const oldCache=`slopbuzz-release-${encodeURIComponent(scope)}-retired-interface`;
 try{
  await page.goto(scope+'demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');await demoNavigator(page).run();await expect(page.locator('#discovery-list li')).toHaveCount(5);
  const before=await custody(page,scope),finds=await page.evaluate(()=>localStorage.getItem('slopbuzz:extraordinary-appointments:v1'));expect(before.journalEntries).toBe(15);expect(finds).not.toBeNull();
  await page.waitForFunction(()=>!!navigator.serviceWorker.controller);
  // A current worker must bypass even an accidentally cached recovery response.
  await page.evaluate(async scope=>{
   const cache=await caches.open((await caches.keys()).find(name=>name.startsWith(`slopbuzz-release-${encodeURIComponent(scope)}-`))!);
   for(const request of await cache.keys())if(new URL(request.url).pathname.startsWith(new URL('reset/',scope).pathname))throw new Error('Recovery was precached');
   await cache.put(scope+'reset/',new Response('<h1>Cached recovery trap</h1>',{headers:{'Content-Type':'text/html'}}));
   await cache.put(scope+'reset/reset.js',new Response('throw new Error("Cached reset script");',{headers:{'Content-Type':'text/javascript'}}));
  },scope);
  await page.goto(scope+'reset/');await expect(page).toHaveURL(scope);await expect(page.getByRole('link',{name:'Live demo',exact:true})).toBeVisible();
  expect(await page.evaluate(()=>new URL(navigator.serviceWorker.controller!.scriptURL).searchParams.has('recovery'))).toBe(true);
  await expect(page.locator('#health-value')).toHaveText('LIVE');await expect(page.locator('#discovery-list li')).toHaveCount(5);
  await page.evaluate(async scope=>{
   await navigator.serviceWorker.register(scope+'retired-worker.js',{scope:scope+'another-app/'});
   const registration=await navigator.serviceWorker.register(scope+'retired-worker.js',{scope});await registration.update();
  },scope);
  await page.waitForFunction(()=>navigator.serviceWorker.controller?.scriptURL.endsWith('/retired-worker.js'));
  await page.evaluate(async scope=>{
   await caches.open('another-application-cache');
   await caches.open(`slopbuzz-release-${encodeURIComponent(scope+'another-app/')}-retained`);
   sessionStorage.setItem('slopbuzz:authorization-draft:v1','old draft');sessionStorage.setItem('slopbuzz:authorization-draft:v2','current draft');sessionStorage.setItem('slopbuzz:estate:v1','old estate');sessionStorage.setItem('unrelated-preference','keep');
  },scope);
  const older=await context.newPage();await older.goto(scope);await expect(older.locator('h1')).toHaveText('Previous interface');
  await page.goto(scope+'demo/');await expect(page.locator('h1')).toHaveText('Previous interface');
  await page.goto(scope+'reset/');await expect(page).toHaveURL(scope);await expect(page.getByRole('link',{name:'Live demo',exact:true})).toBeVisible();expect(older.isClosed()).toBe(false);
  expect(await page.evaluate(()=>new URL(navigator.serviceWorker.controller!.scriptURL).searchParams.has('recovery'))).toBe(true);
  expect(await page.evaluate(()=>localStorage.getItem('slopbuzz:extraordinary-appointments:v1'))).toBe(finds);
  expect(await page.evaluate(()=>[sessionStorage.getItem('slopbuzz:authorization-draft:v1'),sessionStorage.getItem('slopbuzz:authorization-draft:v2'),sessionStorage.getItem('slopbuzz:estate:v1'),sessionStorage.getItem('unrelated-preference')])).toEqual([null,null,null,'keep']);
  const names=await page.evaluate(()=>caches.keys());expect(names).toContain('another-application-cache');expect(names).toContain(`slopbuzz-release-${encodeURIComponent(scope+'another-app/')}-retained`);
  expect(await page.evaluate(async()=>(await navigator.serviceWorker.getRegistrations()).map(registration=>registration.scope))).toContain(scope+'another-app/');
  // The retired controller may outlive unregister while its old tab stays open;
  // it must have no stale response left to serve to this tab's next navigation.
  expect(await page.evaluate(async({scope,oldCache})=>Promise.all(['','demo/'].map(async path=>!!await caches.match(scope+path,{cacheName:oldCache}))),{scope,oldCache})).toEqual([false,false]);
  await page.goto(scope+'demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');
  expect(await page.getByRole('navigation',{name:'Demo departments'}).getByRole('link').allTextContents()).toEqual(['Authorize','Observe','Experiment','Facilities','Evidence']);
  const after=await custody(page,scope);expect(after.journalEntries).toBe(before.journalEntries);expect(after.headDigest).toBe(before.headDigest);expect(await page.evaluate(()=>localStorage.getItem('slopbuzz:extraordinary-appointments:v1'))).toBe(finds);
  await context.setOffline(true);await page.reload();await expect(page.locator('#health-value')).toHaveText('LIVE');await expect(page.getByRole('navigation',{name:'Demo departments'})).toBeVisible();await context.setOffline(false);
  await older.close();
 }finally{server.close();server.closeAllConnections();await rm(directory,{recursive:true,force:true});}
});

test('full reset removes saved companions, browser databases, cookies and preferences',async({page,context})=>{
 const owner=await context.newPage();await owner.goto('/demo/');await expect(owner.locator('#health-value')).toHaveText('LIVE');await demoNavigator(owner).run();await expect(owner.locator('#discovery-list li')).toHaveCount(5);
 await page.goto('/demo/');await expect(page.locator('#health-value')).toHaveText('LIVE');expect((await custody(page,new URL('/',page.url()).href)).journalEntries).toBe(15);
 await page.evaluate(async()=>{
  localStorage.setItem('site-reset-probe','erase');sessionStorage.setItem('site-reset-probe','erase');document.cookie='site_reset_probe=erase; Path=/; SameSite=Lax';await caches.open('site-reset-probe');
  const database=await new Promise<IDBDatabase>((resolve,reject)=>{const request=indexedDB.open('site-reset-probe',1);request.onupgradeneeded=()=>request.result.createObjectStore('saved');request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});database.close();
 });
 await page.goto('/full-reset/');await page.waitForFunction(()=>location.pathname==='/'||document.querySelector<HTMLElement>('#reset-retry')?.hidden===false);
 if(new URL(page.url()).pathname==='/full-reset/'){
  await expect(page.locator('#reset-status')).toContainText('Close all other tabs');await owner.close();await page.getByRole('button',{name:'Retry application refresh'}).click();
 }
 await expect(page).toHaveURL(new URL('/',page.url()).href);await expect(page.locator('#health-value')).toHaveText('LIVE');
 expect(await page.evaluate(()=>[localStorage.getItem('slopbuzz:extraordinary-appointments:v1'),localStorage.getItem('site-reset-probe'),sessionStorage.getItem('site-reset-probe')])).toEqual([null,null,null]);
 expect(await page.evaluate(()=>document.cookie)).not.toContain('site_reset_probe');expect(await page.evaluate(()=>caches.keys())).not.toContain('site-reset-probe');expect(await page.evaluate(async()=>(await indexedDB.databases()).map(database=>database.name))).not.toContain('site-reset-probe');
 expect((await custody(page,new URL('/',page.url()).href)).journalEntries).toBe(0);
 if(!owner.isClosed())await owner.close();
 await context.setOffline(true);await page.reload();await expect(page.locator('#health-value')).toHaveText('LIVE');await context.setOffline(false);
});

for(const route of ['reset','full-reset'])test(`a failed refresh has an accessible keyboard retry and a homepage escape: ${route}`,async({page})=>{
 await page.addInitScript(()=>{if(/\/(?:full-)?reset\/$/.test(location.pathname))Object.defineProperty(navigator.serviceWorker,'getRegistrations',{configurable:true,value:()=>Promise.reject(new Error('Storage temporarily unavailable'))});});
 await page.goto('/'+route+'/');await expect(page.locator('#reset-status')).toContainText('could not finish');const retry=page.getByRole('button',{name:'Retry application refresh'});await expect(retry).toBeVisible();
 await retry.focus();await page.keyboard.press('Enter');await expect(page.locator('#reset-status')).toContainText('could not finish');await expect(retry).toBeFocused();await expect(retry).toHaveAttribute('aria-disabled','false');
 await page.setViewportSize({width:320,height:568});await page.evaluate(()=>document.styleSheets[0].insertRule('html{font-size:200% !important}'));expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();expect(audit.violations).toEqual([]);await expect(page.getByRole('link',{name:'Return to the homepage'})).toBeVisible();
 await page.evaluate(()=>Reflect.deleteProperty(navigator.serviceWorker,'getRegistrations'));await retry.click();await expect(page).toHaveURL(new URL('/',page.url()).href);await expect(page.getByRole('link',{name:'Live demo',exact:true})).toBeVisible();
});
