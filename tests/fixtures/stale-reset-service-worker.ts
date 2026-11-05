/// <reference lib="webworker" />
declare const self:ServiceWorkerGlobalScope;
const oldCache=`slopbuzz-release-${encodeURIComponent(self.registration.scope)}-retired-interface`;
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(oldCache);
 const oldPage='<!doctype html><html lang="en"><head><title>Previous release</title></head><body><h1>Previous interface</h1></body></html>';
 for(const path of ['', 'demo/'])await cache.put(new URL(path,self.registration.scope),new Response(oldPage,{headers:{'Content-Type':'text/html'}}));
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 if(event.request.method==='GET'&&url.href.startsWith(self.registration.scope))event.respondWith((async()=>{
  const cache=await caches.open(oldCache);
  return await cache.match(url.origin+url.pathname)||fetch(event.request);
 })());
});
export {};
