import {readFile,writeFile,chmod} from 'node:fs/promises';
import {randomBytes} from 'node:crypto';
import {parseEnv} from 'node:util';
import type {CloudflareCall} from './cloudflare-api.ts';
const adminFile='.env.high-scores-admin';
export async function readOptionalEnvironment(file:string){try{return parseEnv(await readFile(file,'utf8'));}catch(error){if((error as NodeJS.ErrnoException).code==='ENOENT')return {};throw error;}}
export async function prepareScoreSecrets(cf:CloudflareCall,account:string,worker:string,dry=false){
 let existing:{name:string}[]=[];try{existing=await cf(`${account}/workers/scripts/${worker}/secrets`);}catch(error){if(!(error instanceof Error&&/HTTP 404/.test(error.message)))throw error;}
 const has=(name:string)=>existing.some(s=>s.name===name);
 let admin=await readOptionalEnvironment(adminFile);
 if(!Object.keys(admin).length&&!has('HIGH_SCORES_ADMIN_USERNAME')&&!has('HIGH_SCORES_ADMIN_PASSWORD')){
  if(dry)throw Error('Configure .env.high-scores-admin before a publication dry run.');
  admin={HIGH_SCORES_ADMIN_USERNAME:'admin',HIGH_SCORES_ADMIN_PASSWORD:randomBytes(32).toString('base64url')};
  await writeFile(adminFile,Object.entries(admin).map(([k,v])=>k+'='+v).join('\n')+'\n',{mode:0o600,flag:'wx'});
  console.log('Generated administrator credentials in ignored .env.high-scores-admin (owner-readable only).');
 }
 if(Object.keys(admin).length){
  if(!/^[A-Za-z0-9_-]{1,64}$/.test(admin.HIGH_SCORES_ADMIN_USERNAME||'')||(admin.HIGH_SCORES_ADMIN_PASSWORD||'').length<20)throw Error('Administrator credentials require a simple username and a password of at least 20 characters.');
  if(!dry)await chmod(adminFile,0o600);
 }else if(!has('HIGH_SCORES_ADMIN_USERNAME')||!has('HIGH_SCORES_ADMIN_PASSWORD'))throw Error('Configure both administrator Worker secrets.');
 const resend=await readOptionalEnvironment('.env.resend');
 const values:Record<string,string>={...admin,...(resend.RESEND_API_KEY?{RESEND_API_KEY:resend.RESEND_API_KEY}:{})};
 if(!values.RESEND_API_KEY&&!has('RESEND_API_KEY'))throw Error('Set RESEND_API_KEY in ignored .env.resend or the Worker secrets.');
 return {values,bindings:Object.entries(values).filter(([name])=>['HIGH_SCORES_ADMIN_USERNAME','HIGH_SCORES_ADMIN_PASSWORD','RESEND_API_KEY'].includes(name)).map(([name,text])=>({type:'secret_text',name,text}))};
}
export async function verifyResendDomain(key:string,send:typeof fetch=fetch){
 const response=await send('https://api.resend.com/domains',{headers:{Authorization:'Bearer '+key},signal:AbortSignal.timeout(15000)});
 const data=await response.json() as {name?:string;data?:{name:string;status:string}[]};
 if([401,403].includes(response.status)&&data.name==='restricted_api_key'){console.log('Resend sending-only key cannot inspect domain metadata; delivery failures will remain visible in administration.');return;}
 if(!response.ok)throw Error('Resend domain preflight failed: HTTP '+response.status);
 if(!data.data?.some(d=>d.name==='glovebox.tools'&&d.status==='verified'))throw Error('Verify glovebox.tools in Resend before enabling high-score notifications.');
 console.log('Resend sender domain glovebox.tools is verified.');
}
