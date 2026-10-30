import {createStaticServer} from '../scripts/serve.ts';
import {test,expect,type Page} from '@playwright/test';
async function invoke(page:Page,path:string,method='GET') {
  return page.evaluate(async({path,method})=>{
    const module=await import(new URL('assets/tribunal.js',location.origin+'/').href);
    const client=new module.BrowserRuntimeClient();
    try {const r=await client.request(path,{method});return {status:r.status,body:await r.text(),cache:r.headers.get('X-SlopBuzz-Cache')};}finally{client.close();}
  },{path,method});
}
test.beforeEach(async({page},info)=>{
  await page.route('**/runtime-config.json',async route=>{
    const response=await route.fetch();const json=await response.json();
    await route.fulfill({json:{...json,engine:info.project.metadata.engine}});
  });
});
test('local UI, cache, receipts, docs, cadence and scrolling',async({page})=>{
  const network:string[]=[];page.on('request',request=>network.push(new URL(request.url()).pathname));
  await page.goto('/');
  await expect(page.locator('#runtime-status')).toContainText('Local Java');
  await expect(page.locator('#display-speed')).toHaveValue('1800');
  expect(await page.locator('#display-speed option').allTextContents()).not.toContain('ms/line');
  await page.selectOption('#display-speed','0');await page.fill('#limit','100');await page.click('#run-button');
  await expect(page.locator('#run-status')).toContainText('Mandate complete');
  await expect(page.locator('#cache-result')).toHaveText('MISS');
  expect(await page.locator('#output').evaluate(e=>e.scrollTop+e.clientHeight>=e.scrollHeight-2)).toBe(true);
  await page.click('#run-button');await expect(page.locator('#cache-result')).toHaveText('HIT');
  await page.click('#canary-button');await expect(page.locator('#canary-value')).toHaveText('APPROVED');
  await page.click('#recovery-button');await expect(page.locator('#recovery-value')).toHaveText('COPY MATCHED');
  await page.getByRole('link',{name:'Cache report'}).click();await expect(page.locator('pre')).toContainText('slopbuzz-cache/v1');
  await page.goto('/api/');await expect(page.locator('#api-total')).toContainText('ratified operations');
  await page.goto('/changelog/');await expect(page.locator('main')).toContainText('browser-enterprise-runtime');
  await page.goto('/continuity-register/');await expect(page.locator('main')).toContainText('WebAssembly');
  expect(network.filter(p=>/^\/(fizzbuzz|healthz|readyz|audit|operations|capacity|cache)/.test(p))).toEqual([]);
});
test('reload, simultaneous tabs and owner death preserve one journal',async({page,context})=>{
  await page.goto('/');await expect(page.locator('#runtime-status')).toContainText('Local Java');
  const other=await context.newPage();await other.goto('/');await expect(other.locator('#runtime-status')).toContainText('Local Java');
  const answers=await Promise.all([invoke(page,'/fizzbuzz?limit=17'),invoke(other,'/fizzbuzz?limit=17')]);
  expect(answers.map(r=>r.cache).sort()).toEqual(['HIT','MISS']);
  const first=JSON.parse((await invoke(page,'/audit/evidence')).body);expect(first.journalEntries).toBe(17);
  await page.close();
  const second=JSON.parse((await invoke(other,'/audit/evidence')).body);expect(second.headDigest).toBe(first.headDigest);
  expect((await invoke(other,'/fizzbuzz?limit=17')).cache).toBe('HIT');
  await other.reload();await expect(other.locator('#runtime-status')).toContainText('Local Java');
  const third=JSON.parse((await invoke(other,'/audit/evidence')).body);expect(third.headDigest).toBe(first.headDigest);
});
test('fresh recovery detects tampering and restart refuses corrupt data',async({page})=>{
  await page.goto('/');await expect(page.locator('#runtime-status')).toContainText('Local Java');await invoke(page,'/fizzbuzz?limit=3');
  await page.evaluate(async()=>{
    const db=await new Promise<IDBDatabase>((resolve,reject)=>{const r=indexedDB.open(`slopbuzz:${location.origin}/`);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});
    await new Promise<void>((resolve,reject)=>{const tx=db.transaction('entries','readwrite');tx.objectStore('entries').put('1|1|COMMITTED|GENESIS|bad|1\n',1);tx.oncomplete=()=>resolve();tx.onabort=()=>reject(tx.error);});db.close();
  });
  const recovery=await invoke(page,'/operations/recovery','POST');expect(recovery.status).toBe(503);expect(recovery.body).toContain('STORED_INVALID');
  await page.reload();await expect(page.locator('#runtime-status')).toContainText('could not be admitted');
});
test('whole release works with its origin server stopped',async({page},info)=>{
  const server=createStaticServer('dist','/',{engine:info.project.metadata.engine});
  await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));
  const port=(server.address() as {port:number}).port;
  try {
    await page.goto(`http://127.0.0.1:${port}/`);await expect(page.locator('#runtime-status')).toContainText('Local Java');
    await expect(page.locator('#offline-status')).toContainText('installed');
    await page.evaluate(async()=>{await navigator.serviceWorker.ready;if(!navigator.serviceWorker.controller)await new Promise<void>(resolve=>navigator.serviceWorker.addEventListener('controllerchange',()=>resolve(),{once:true}));});
    await page.unroute('**/runtime-config.json');
    await new Promise<void>(resolve=>{server.close(()=>resolve());server.closeAllConnections();});
    await page.reload();await expect(page.locator('#runtime-status')).toContainText(info.project.metadata.engine==='js'?'JavaScript fallback':'WebAssembly');
    await page.selectOption('#display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');
    await page.goto(`http://127.0.0.1:${port}/api/`);await expect(page.locator('#api-total')).toContainText('ratified operations');
    await page.goto(`http://127.0.0.1:${port}/continuity-register/`);await expect(page.locator('main')).toContainText('WebAssembly');
  }finally{server.close();server.closeAllConnections();}
});
test('repository rejection rolls back and cache expiry is honored',async({page})=>{
  await page.goto('/');await expect(page.locator('#runtime-status')).toContainText('Local Java');await invoke(page,'/fizzbuzz?limit=2');
  await page.evaluate(async()=>{
    const db=await new Promise<IDBDatabase>(resolve=>{const r=indexedDB.open(`slopbuzz:${location.origin}/`);r.onsuccess=()=>resolve(r.result);});
    await new Promise<void>((resolve,reject)=>{const tx=db.transaction('cache','readwrite');tx.objectStore('cache').put({expires:0,body:'forged stale answer'},'2');tx.oncomplete=()=>resolve();tx.onabort=()=>reject(tx.error);});
    // A real duplicate-key failure must abort the complete transaction.
    await new Promise<void>((resolve,reject)=>{const tx=db.transaction('entries','readwrite');tx.objectStore('entries').add('must roll back',999);tx.objectStore('entries').add('duplicate',1);tx.oncomplete=()=>reject(new Error('Unexpected commit'));tx.onabort=()=>resolve();});
    const absent=await new Promise<unknown>(resolve=>{const r=db.transaction('entries').objectStore('entries').get(999);r.onsuccess=()=>resolve(r.result);});if(absent!==undefined)throw new Error('Partial transaction survived');db.close();
  });
  const result=await invoke(page,'/fizzbuzz?limit=2');expect(result.cache).toBe('MISS');expect(result.body).toBe('1\n2\n');
  expect(JSON.parse((await invoke(page,'/audit/evidence')).body).journalEntries).toBe(4);
});

test('subdirectory hosting resolves workers, docs and API assets',async({page},info)=>{
  const server=createStaticServer('dist','/portfolio/slopbuzz/',{engine:info.project.metadata.engine});
  await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));
  const port=(server.address() as {port:number}).port;
  try {
    await page.goto(`http://127.0.0.1:${port}/portfolio/slopbuzz/`);
    await expect(page.locator('#runtime-status')).toContainText('Local Java');
    await page.selectOption('#display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');
    await page.getByRole('link',{name:'API charter',exact:true}).click();await expect(page.locator('#api-total')).toContainText('ratified operations');
  }finally{server.close();server.closeAllConnections();}
});
test('a different release cannot submit work to the current owner',async({page})=>{
  await page.goto('/');await expect(page.locator('#runtime-status')).toContainText('Local Java');
  const error=await page.evaluate(async()=>{
    const m=await import(new URL('/assets/tribunal.js',location.href).href);
    const client=new m.BrowserRuntimeClient({...m.config,revision:'0000000000000000000000000000000000000000'});
    try {await client.request('/fizzbuzz?limit=15');return 'UNEXPECTED SUCCESS';}catch(error){return String(error);}finally{client.close();}
  });
  expect(error).toContain('older release');expect(JSON.parse((await invoke(page,'/audit/evidence')).body).journalEntries).toBe(0);
});
test('failed audit append is not acknowledged or cached; transaction state is released',async({page})=>{
  await page.goto('/');await expect(page.locator('#runtime-status')).toContainText('Local Java');
  const inject=async(remove:boolean)=>page.evaluate(async remove=>{
    const db=await new Promise<IDBDatabase>(resolve=>{const r=indexedDB.open(`slopbuzz:${location.origin}/`);r.onsuccess=()=>resolve(r.result);});
    await new Promise<void>((resolve,reject)=>{const tx=db.transaction('entries','readwrite');if(remove)tx.objectStore('entries').delete(1);else tx.objectStore('entries').add('injected conflicting sequence',1);tx.oncomplete=()=>resolve();tx.onabort=()=>reject(tx.error);});db.close();
  },remove);
  await inject(false);expect((await invoke(page,'/fizzbuzz?limit=2')).status).toBe(500);
  await inject(true);const result=await invoke(page,'/fizzbuzz?limit=2');expect(result.status).toBe(200);expect(result.cache).toBe('MISS');expect(result.body).toBe('1\n2\n');
});

test('an installed update waits for the current release to close',async({page,context},info)=>{
  const {mkdtemp,cp,readFile,writeFile,rm}=await import('node:fs/promises');
  const {tmpdir}=await import('node:os');
  const directory=await mkdtemp(`${tmpdir()}/slopbuzz-update-`);
  await cp('dist',directory,{recursive:true});
  const server=createStaticServer(directory,'/',{engine:info.project.metadata.engine});
  await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));
  const origin=`http://127.0.0.1:${(server.address() as {port:number}).port}`;
  try {
    await page.goto(origin);await expect(page.locator('#offline-status')).toContainText('installed');
    const oldKeys=await page.evaluate(()=>caches.keys());
    const worker=await readFile(`${directory}/sw.js`,'utf8');
    await writeFile(`${directory}/sw.js`,worker.replace(/(var|const) cacheName = ([^;]+);/, '$1 cacheName = $2 + "-successor";'));
    await page.evaluate(async()=>{await (await navigator.serviceWorker.ready).update();});
    await expect.poll(()=>page.evaluate(async()=>!!(await navigator.serviceWorker.getRegistration())?.waiting)).toBe(true);
    // The old controller remains authoritative while this tab can submit requests.
    await page.selectOption('#display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');
    await page.close();
    const next=await context.newPage();await next.goto(origin);await expect(next.locator('#runtime-status')).toContainText('Local Java');
    await expect.poll(()=>next.evaluate(()=>caches.keys())).not.toEqual(oldKeys);
    await next.close();
  }finally{server.close();server.closeAllConnections();await rm(directory,{recursive:true,force:true});}
});
