import {scope} from './release-assets';

const pages=new Set(['','demo','api','about','company-history','accessibility','validation','bestiary','department-of-improbable-appointments','changelog','continuity-register','response']);
export function sitePage(url:URL):string|undefined {
 const base=new URL(scope);if(url.origin!==base.origin||!url.pathname.startsWith(base.pathname))return;
 const path=url.pathname.slice(base.pathname.length).replace(/\/$/,'');
 return path==='company-history'?'about':pages.has(path)?path:undefined;
}
export function onDemoPage(){return sitePage(new URL(location.href))==='demo';}
export function openSitePage(url:URL|string):Promise<void>{
 return new Promise((resolve,reject)=>document.dispatchEvent(new CustomEvent('site-navigate',{detail:{url:new URL(url,scope),resolve,reject}})));
}
