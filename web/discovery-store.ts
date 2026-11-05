import {decodeDiscoveries,encodeDiscoveries,discoveryStorageKey,discoveryIdentity,rarestDiscoveries,type Discovery} from './discovery-model.ts';
export const provisionalDiscoveryPrefix='slopbuzz:provisional-appointments:';
export interface DiscoveryChange {departed:readonly Discovery[]}
export interface DiscoveryRun {remember(finds:readonly Discovery[]):void;complete():void;withdraw():void}
interface DiscoveryStore {snapshot():readonly Discovery[];persistent():boolean;remember(finds:readonly Discovery[]):void;beginRun():DiscoveryRun;subscribe(listener:(change:DiscoveryChange)=>void):()=>void;reconcile(withdrawal?:boolean):void;settleAll():void}
const storeSymbol=Symbol.for('slopbuzz.discovery-store.v2');
type StoreHost=Window&{[storeSymbol]?:DiscoveryStore};
/** Completed finds use the original union; each unfinished run owns a separate receipt. */
export function createDiscoveryStore(storage?:Storage):DiscoveryStore {
 let settled:Discovery[]=[],finds:Discovery[]=[],persistent=!!storage,publishedPersistent=persistent;
 const listeners=new Set<(change:DiscoveryChange)=>void>(),active=new Map<string,{finds:Discovery[];complete():void}>(),closed=new Set<string>();
 const read=()=>{try{return decodeDiscoveries(storage?.getItem(discoveryStorageKey)||null);}catch{persistent=false;return [];}};
 const write=(key:string,value?:string)=>{try{if(!storage)throw new Error('Storage unavailable');if(value===undefined)storage.removeItem(key);else if(storage.getItem(key)!==value)storage.setItem(key,value);persistent=true;}catch{persistent=false;}};
 const reconcile=(withdrawal=false)=>{
  const previous=finds;settled=rarestDiscoveries(settled,read());const pending:Discovery[][]=[];
  try{if(storage)for(let i=0;i<storage.length;i++){const key=storage.key(i);if(key?.startsWith(provisionalDiscoveryPrefix)&&!closed.has(key))pending.push(decodeDiscoveries(storage.getItem(key)));}}catch{persistent=false;}
  finds=rarestDiscoveries(settled,...pending,...[...active.values()].map(run=>run.finds));
  if(encodeDiscoveries(previous)!==encodeDiscoveries(finds)||publishedPersistent!==persistent){publishedPersistent=persistent;const remaining=new Set(finds.map(discoveryIdentity)),departed=withdrawal?previous.filter(d=>!remaining.has(discoveryIdentity(d))):[];listeners.forEach(fn=>fn({departed}));}
 };
 const remember=(incoming:readonly Discovery[])=>{settled=rarestDiscoveries(settled,incoming,read());const value=encodeDiscoveries(settled);try{if(storage?.getItem(discoveryStorageKey)!==value)write(discoveryStorageKey,value);}catch{persistent=false;}reconcile();};
 const store:DiscoveryStore={snapshot:()=>finds,persistent:()=>persistent,remember,reconcile,subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn);},settleAll(){for(const run of [...active.values()])run.complete();},beginRun(){
  const key=provisionalDiscoveryPrefix+crypto.randomUUID();let state:'active'|'complete'|'withdrawn'='active';
  const retire=()=>{closed.add(key);active.delete(key);write(key);};
  const run={finds:[] as Discovery[],complete(){if(state!=='active')return;state='complete';remember(run.finds);retire();reconcile();}};active.set(key,run);
  return {remember(incoming){if(state==='withdrawn')return;if(state==='complete'){remember(incoming);return;}run.finds=rarestDiscoveries(run.finds,incoming);write(key,encodeDiscoveries(run.finds));reconcile();},complete:()=>run.complete(),withdraw(){if(state!=='active')return;state='withdrawn';retire();reconcile(true);}};
 }};
 reconcile();return store;
}
/** Bundled independently in demo and footer; the window holds exactly one subscription owner. */
export function discoveryStore():DiscoveryStore {
 const host=window as StoreHost;if(host[storeSymbol])return host[storeSymbol]!;
 let storage:Storage|undefined;try{storage=window.localStorage;}catch{/* Session-only discoveries remain usable. */}
 const store=createDiscoveryStore(storage);
 window.addEventListener('storage',event=>{if(event.key===discoveryStorageKey)store.remember(decodeDiscoveries(event.newValue));else if(event.key?.startsWith(provisionalDiscoveryPrefix))store.reconcile(event.newValue===null);});
 addEventListener('pagehide',()=>store.settleAll());host[storeSymbol]=store;return store;
}
