import {parseOfficeManifest,verifyOfficePackage} from './office-pack-contract';
import {scope,releaseAsset} from './release-assets';
import {officeCacheKey} from './office-pack-key';
export const officePackKey=(base=scope,url=releaseAsset('office-world.js'))=>officeCacheKey(base,url);
export async function saveOfficePack(){
 const url=releaseAsset('office-world.js'),key=officePackKey();if(!key)throw new Error('This deployment does not publish a versioned offline building.');
 const manifestReply=await fetch(releaseAsset('office-pack.json'));if(!manifestReply.ok)throw new Error('The building manifest could not be obtained.');const manifest=parseOfficeManifest(await manifestReply.json());
 const reply=await fetch(url);if(!reply.ok)throw new Error('The building could not be downloaded.');const bytes=await reply.arrayBuffer();await verifyOfficePackage(manifest,bytes);
 const cache=await caches.open(key);await cache.put(url,new Response(bytes,{headers:{'Content-Type':'text/javascript; charset=UTF-8','Cache-Control':'public, max-age=31536000, immutable'}}));return bytes.byteLength;
}
