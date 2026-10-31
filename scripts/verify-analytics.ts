import {readFile} from 'node:fs/promises';
import {parseEnv} from 'node:util';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium, expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {createStaticServer} from './serve.ts';

/** Send marked preview traffic through the real first-party receiving desk. */
export async function verifyAnalytics(origin: string, expectedRevision?: string, publicToken?: string): Promise<string> {
 origin = new URL(origin).origin;
 const revision = `analytics-smoke-${crypto.randomUUID()}`;
 const browser = await chromium.launch();
 try {
  const page = await browser.newPage({serviceWorkers:'block', userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',extraHTTPHeaders:{DNT:'1','Sec-GPC':'1'}});
  await page.addInitScript(() => {
   Object.defineProperty(navigator,'webdriver',{get:()=>false});
   Object.defineProperty(navigator,'userAgentData',{get:()=>undefined});
   Object.defineProperty(navigator,'doNotTrack',{value:'1'});
   Object.defineProperty(navigator,'globalPrivacyControl',{value:true});
  });
  const direct: string[] = [];
  page.on('request', request => {if(new URL(request.url()).hostname.endsWith('posthog.com')) direct.push(request.url());});
  await page.route('**/analytics-config.json',async route => {
   const response = await route.fetch();const config = await response.json();
   if(expectedRevision) assert.equal(config.revision, expectedRevision);
   assert.equal(new URL(config.apiHost, origin).origin, origin);
   assert.equal(config.apiHost, '/intake');
   await route.fulfill({json:{...config,token:config.token||publicToken,enabled:true,allowLocal:true,environment:'preview',revision}});
  });
  const isIntake = (url: string) => {const u=new URL(url);return u.origin===origin&&u.pathname==='/intake/e/';};
  const delivery = page.waitForResponse(response => isIntake(response.url()), {timeout:30000});
  await page.goto(origin+'/demo/');
  const accepted = await delivery;
  assert.equal(accepted.status(),200,'First-party pageview rejected');
  assert.equal(accepted.headers()['cache-control'],'no-store');
  await expect(page.locator('#health-value')).toHaveText('LIVE');
  await page.selectOption('#display-speed','0');
  const demo = page.waitForResponse(response => isIntake(response.url()), {timeout:30000});
  await page.click('#run-button');
  assert.equal((await demo).status(),200,'First-party demo event rejected');
  await expect(page.locator('#run-status')).toContainText('Mandate complete');
  assert.deepEqual(direct,[],'Browser contacted PostHog directly');
  assert.deepEqual((await page.context().cookies()).filter(cookie=>cookie.name.includes('ph_')),[]);
  console.log('First-party PostHog pageview and demo accepted with DNT/GPC enabled; smoke traffic tagged preview.');
 } finally {await browser.close();}
 return revision;
}

async function main() {
 const env=parseEnv(await readFile(process.env.SLOPBUZZ_POSTHOG_ENV_FILE||'tmp/.env.posthog','utf8'));
 const server=process.env.SLOPBUZZ_PUBLIC_URL?undefined:createStaticServer();
 if(server) await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));
 const origin=process.env.SLOPBUZZ_PUBLIC_URL||`http://127.0.0.1:${(server!.address() as {port:number}).port}`;
 try {
  const revision=await verifyAnalytics(origin,undefined,env.POSTHOG_TOKEN);
  for(let attempt=0;attempt<30;attempt++) {
   const result=await fetch(`https://us.posthog.com/api/projects/${env.POSTHOG_PROJECT_ID}/query/`,{method:'POST',headers:{Authorization:`Bearer ${env.POSTHOG_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({refresh:'force_blocking',query:{kind:'HogQLQuery',query:`SELECT count() FROM events WHERE event = '$pageview' AND properties.release = '${revision}' AND properties.environment = 'preview'`}})});
   if(!result.ok) throw new Error(`Smoke verification query HTTP ${result.status}`);
   if((await result.json()).results?.[0]?.[0]>0) {console.log('First-party smoke pageview confirmed in PostHog; excluded from production dashboards.');return;}
   await new Promise(resolve=>setTimeout(resolve,2000));
  }
  throw new Error('Smoke event accepted but not queryable within the verification window');
 } finally {server?.close();server?.closeAllConnections();}
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))void main().catch(error=>{console.error(error.message);process.exitCode=1;});
