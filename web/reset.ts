import {officePackPrefix} from './office-pack-key';

// This entry point deliberately has no runtime, analytics or scene imports.
// It must be able to retire an older installation without starting another one.
const home=new URL('../',import.meta.url);
const status=document.getElementById('reset-status')!;
const retry=document.getElementById('reset-retry') as HTMLButtonElement;
const full=document.body.dataset.resetMode==='full';
let resetting=false;

async function bounded<T>(operation:Promise<T>):Promise<T>{
 let timer:ReturnType<typeof setTimeout>|undefined;
 try{return await Promise.race([operation,new Promise<never>((_,reject)=>{timer=setTimeout(()=>reject(new Error('The browser did not finish the refresh.')),15000);})]);}
 finally{clearTimeout(timer);}
}

function activateFresh(registration:ServiceWorkerRegistration,script:string):Promise<void>{
 return new Promise((resolve,reject)=>{
  const watched=new Set<ServiceWorker>(),requested=new Set<ServiceWorker>();
  const timer=setTimeout(()=>finish(new Error('The fresh offline release did not finish installing.')),60000);
  function finish(error?:Error){clearTimeout(timer);registration.removeEventListener('updatefound',inspect);for(const worker of watched)worker.removeEventListener('statechange',inspect);error?reject(error):resolve();}
  function inspect(){
   for(const worker of [registration.installing,registration.waiting,registration.active]){
    if(!worker||worker.scriptURL!==script)continue;
    if(!watched.has(worker)){watched.add(worker);worker.addEventListener('statechange',inspect);}
    if(worker.state==='activated'){finish();return;}
    if(worker.state==='redundant'){finish(new Error('The fresh offline release could not be installed.'));return;}
    if(worker.state==='installed'&&!requested.has(worker)){requested.add(worker);worker.postMessage({kind:'slopbuzz-reset-activate'});}
   }
  }
  registration.addEventListener('updatefound',inspect);inspect();
 });
}

async function forgetSavedData(){
 const erase=async()=>{
  // Keep storage deletion inside the repository lock: native "storage" clearing
  // can remove Chromium's lock bucket while an older Java runtime stays alive.
  if(navigator.locks){const state=await bounded(navigator.locks.query());if(state.held?.some(lock=>lock.name?.startsWith('slopbuzz:')&&lock.name!==`slopbuzz:${home.href}`))throw new Error('Close other application tabs first.');}
  if(typeof indexedDB.databases!=='function')throw new Error('This browser cannot enumerate its saved databases.');
  for(const database of await bounded(indexedDB.databases()))if(database.name)await bounded(new Promise<void>((resolve,reject)=>{
   const request=indexedDB.deleteDatabase(database.name!);request.onsuccess=()=>resolve();request.onerror=()=>reject(request.error);request.onblocked=()=>reject(new Error('Close other site tabs to release saved data.'));
  }));
  localStorage.clear();sessionStorage.clear();
  // Clear-Site-Data handles browser-managed cookies where supported. This also
  // expires script-visible cookies in browsers without that response feature.
  const paths=new Set(['/']);let path='';for(const part of location.pathname.split('/').filter(Boolean)){path+='/'+part;paths.add(path);paths.add(path+'/');}
  const domains=[''];const labels=location.hostname.split('.');for(let n=0;n<labels.length-1;n++)domains.push(`Domain=${labels.slice(n).join('.')};`);
  for(const cookie of document.cookie.split(';')){const name=cookie.slice(0,cookie.indexOf('=')).trim();if(name)for(const path of paths)for(const domain of domains)document.cookie=`${name}=; Max-Age=0; Path=${path}; ${domain} SameSite=Lax`;}
 };
 if(!navigator.locks){await erase();return;}
 const abort=new AbortController(),timer=setTimeout(()=>abort.abort(),1500);
 try{await navigator.locks.request(`slopbuzz:${home.href}`,{signal:abort.signal},erase);}finally{clearTimeout(timer);}
}

async function reset(){
 if(resetting)return;
 resetting=true;retry.setAttribute('aria-disabled','true');
 try{
  let reinstall=full;
  status.textContent='Retiring this application’s offline workers…';
  if('serviceWorker' in navigator){
   const registrations=await bounded(navigator.serviceWorker.getRegistrations());
   for(const registration of registrations)if(full||registration.scope===home.href){reinstall=true;await bounded(registration.unregister());}
  }
  status.textContent='Removing cached releases and optional office scenery…';
  if('caches' in window){
   const prefixes=[`slopbuzz-release-${encodeURIComponent(home.href)}-`,officePackPrefix(home.href)];
   for(const name of await bounded(caches.keys()))if(full||prefixes.some(prefix=>name.startsWith(prefix)))await bounded(caches.delete(name));
  }
  // Tab preferences can be abandoned without erasing discoveries or audit data.
  if(full){status.textContent='Erasing saved companions, preferences and local audit history…';await forgetSavedData();}
  else try{for(const key of ['slopbuzz:authorization-draft:v1','slopbuzz:authorization-draft:v2','slopbuzz:estate:v1','slopbuzz:stamp-heists:v1','slopbuzz:paper-aviation:v1'])sessionStorage.removeItem(key);}catch{/* Unavailable tab storage already falls back to defaults. */}
  if(reinstall){
   // The Java-hosted version has no offline worker. A browser deployment gets a
   // distinct script URL so even identical bytes perform a fresh installation.
   const probe=await bounded(fetch(new URL('sw.js',home),{method:'HEAD',cache:'no-store'}));
   if(probe.status!==404){
    if(!probe.ok)throw new Error('The latest offline release is unavailable.');
    status.textContent='Installing a fresh offline release before returning home…';
    const script=new URL('sw.js',home);script.searchParams.set('recovery',crypto.randomUUID());
    const registration=await bounded(navigator.serviceWorker.register(script,{scope:home.href,updateViaCache:'none'}));
    await activateFresh(registration,script.href);
   }
  }
  status.textContent='The previous administration has been relieved. Returning to the latest homepage…';
  location.replace(home.href);
 }catch{
  status.textContent=full?'The full reset could not finish. Close all other tabs for this site and try again. Some browser data may already have been cleared.':'The refresh could not finish. Close other tabs for this site and try again. Saved companions and audit history have been kept.';
  retry.hidden=false;
 }finally{resetting=false;retry.setAttribute('aria-disabled','false');}
}
retry.addEventListener('click',()=>void reset());
void reset();
