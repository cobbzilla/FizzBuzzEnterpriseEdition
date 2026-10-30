import {readFile} from 'node:fs/promises';
import {parseEnv} from 'node:util';
import {chromium} from '@playwright/test';
import {createStaticServer} from './serve.ts';
const env=parseEnv(await readFile(process.env.SLOPBUZZ_POSTHOG_ENV_FILE||'tmp/.env.posthog','utf8'));
const revision=`analytics-smoke-${crypto.randomUUID()}`;
const server=createStaticServer();await new Promise<void>(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch();
try {
 const page=await browser.newPage({serviceWorkers:'block',userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'});
 await page.addInitScript(()=>{Object.defineProperty(navigator,'webdriver',{get:()=>false});Object.defineProperty(navigator,'userAgentData',{get:()=>undefined});});
 await page.route('**/analytics-config.json',r=>r.fulfill({json:{enabled:true,allowLocal:true,token:env.POSTHOG_TOKEN,environment:'preview',revision}}));
 const delivery=page.waitForResponse(r=>r.url().startsWith('https://us.i.posthog.com/e/'));
 await page.goto(`http://127.0.0.1:${(server.address() as {port:number}).port}/`);
 if(!(await delivery).ok())throw new Error('Analytics ingestion rejected the smoke event');
 for(let attempt=0;attempt<30;attempt++) {
  const result=await fetch(`https://us.posthog.com/api/projects/${env.POSTHOG_PROJECT_ID}/query/`,{method:'POST',headers:{Authorization:`Bearer ${env.POSTHOG_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({refresh:'force_blocking',query:{kind:'HogQLQuery',query:`SELECT count() FROM events WHERE event = '$pageview' AND properties.release = '${revision}' AND properties.environment = 'preview'`}})});
  if(!result.ok)throw new Error(`Smoke verification query HTTP ${result.status}`);
  if((await result.json()).results?.[0]?.[0]>0){console.log('Preview smoke pageview confirmed in PostHog; excluded from production dashboards.');break;}
  if(attempt===29)throw new Error('Smoke event was accepted but not queryable within the verification window');
  await new Promise(r=>setTimeout(r,2000));
 }
}finally{await browser.close();server.close();server.closeAllConnections();}
