import {decodeDiscoveries,encodeDiscoveries,discoveryStorageKey,rarestDiscoveries,type Discovery} from './discovery-model';
interface DiscoveryStore {snapshot():readonly Discovery[];persistent():boolean;remember(finds:readonly Discovery[]):void;subscribe(listener:()=>void):()=>void}
const storeSymbol=Symbol.for('slopbuzz.discovery-store.v1');
type StoreHost=Window&{[storeSymbol]?:DiscoveryStore};
/** Bundled independently in demo and footer; the window holds exactly one subscription owner. */
export function discoveryStore():DiscoveryStore {
 const host=window as StoreHost;if(host[storeSymbol])return host[storeSymbol]!;
 let finds:Discovery[]=[],persistent=true;const listeners=new Set<()=>void>();
 const read=()=>{try{return decodeDiscoveries(localStorage.getItem(discoveryStorageKey));}catch{persistent=false;return [];}};
 finds=read();
 const merge=(incoming:readonly Discovery[])=>{const before=encodeDiscoveries(finds),wasPersistent=persistent;finds=rarestDiscoveries(finds,incoming,read());const after=encodeDiscoveries(finds);try{if(localStorage.getItem(discoveryStorageKey)!==after)localStorage.setItem(discoveryStorageKey,after);persistent=true;}catch{persistent=false;}if(before!==after||wasPersistent!==persistent)listeners.forEach(fn=>fn());};
 const store:DiscoveryStore={snapshot:()=>finds,persistent:()=>persistent,remember:merge,subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn);}};
 window.addEventListener('storage',event=>{if(event.key===discoveryStorageKey)merge(decodeDiscoveries(event.newValue));});host[storeSymbol]=store;return store;
}
