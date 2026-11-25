import type {BrowserContext} from '@playwright/test';
import {participationKey} from '../web/leaderboard-model.ts';

/** Keep live verification read-only without intercepting service-worker traffic. */
export async function protectProductionScores(context: BrowserContext) {
 // Firefox network interception prevents service-worker navigation while offline.
 // Install this before application code captures fetch, including after reloads.
 await context.addInitScript(key=>{
  localStorage.setItem(key,'anonymous');
  const nativeFetch=window.fetch.bind(window);
  window.fetch=async(input,init)=>{
   const url=new URL(input instanceof Request?input.url:input,location.href);
   if(url.origin===location.origin&&/^\/api\/high-scores(?:\/|$)/.test(url.pathname)){
    const method=(init?.method||(input instanceof Request?input.method:'GET')).toUpperCase();
    if(!['GET','HEAD'].includes(method))return Response.json({error:'Publication is disabled in release verification.'},{status:503});
    if(url.pathname.endsWith('/me'))return Response.json({participating:false,name:'',entry:null,enabled:false,sitekey:'',asOf:new Date().toISOString()});
   }
   return nativeFetch(input,init);
  };
 },participationKey);
}
