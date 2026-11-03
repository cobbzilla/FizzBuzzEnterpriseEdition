/// <reference lib="webworker" />
import {officePackPrefix} from './office-pack-key';
declare const self: ServiceWorkerGlobalScope;
declare const RELEASE: string;
declare const FILES: string[];
const prefix = `slopbuzz-release-${encodeURIComponent(self.registration.scope)}-`;
const cacheName = `${prefix}${RELEASE}`;
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    try { await cache.addAll(FILES.map(path => new Request(new URL(path, self.registration.scope), {cache: 'reload'}))); }
    catch(error) { await caches.delete(cacheName); throw error; }
    // No skipWaiting: update only when all clients of the prior release close.
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(prefix) && key !== cacheName) await caches.delete(key);
      const packs=officePackPrefix(self.registration.scope);
      if(key.startsWith(packs)&&key!==packs+RELEASE.slice(0,16))await caches.delete(key);
    }
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || !url.href.startsWith(self.registration.scope)) return;
  event.respondWith((async () => {
    const optionalId=url.pathname.match(/\/assets\/([a-f0-9]{16})\/office-world\.js$/)?.[1];
    if(optionalId){const saved=await caches.match(event.request,{cacheName:officePackPrefix(self.registration.scope)+optionalId});return saved||fetch(event.request);}
    const cache = await caches.open(cacheName);
    // Query strings belong to the response viewer, not to separate shell versions.
    const cached = await cache.match(url.origin + url.pathname);
    return cached || fetch(event.request);
  })());
});
export {};
