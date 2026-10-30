import {readFile,readdir} from 'node:fs/promises';
import {parseEnv} from 'node:util';
import {execFileSync} from 'node:child_process';
import {build} from 'esbuild';
import {settings,metadata,digest} from './b2-support.ts';
import {needsUpload,uploadFiles,type RemoteFile} from './b2-upload.ts';
import {verifyPublic} from './verify-public.ts';
async function main(){
 let file='.b2.env';let contents:string;try{contents=await readFile(file,'utf8');}catch(e){if((e as NodeJS.ErrnoException).code!=='ENOENT')throw e;file='.env.b2';contents=await readFile(file,'utf8');}
 const e={...parseEnv(contents),...process.env};const c=settings(e);
 const git=(...args:string[])=>execFileSync('git',args,{encoding:'utf8'}).trim();
 if(!c.dry&&(git('branch','--show-current')!=='slopbuzz'||git('status','--porcelain','--untracked-files=no')))throw new Error('Publish a clean, merged slopbuzz branch');
 const cfBase='https://api.cloudflare.com/client/v4';
 async function cf(path:string,method='GET',body?:unknown){
  const response=await fetch(cfBase+path,{method,headers:{Authorization:`Bearer ${e.CLOUDFLARE_API_TOKEN}`,...(body instanceof FormData?{}:{'Content-Type':'application/json'})},body:body instanceof FormData?body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(60000)});
  const data=await response.json();if(!response.ok||!data.success)throw new Error(`Cloudflare ${method} failed: HTTP ${response.status}, codes ${data.errors?.map((x:{code:number})=>x.code).join(',')}`);return data.result;
 }
 const zone=await cf(`/zones/${e.CLOUDFLARE_ZONE_ID}`);
 if(zone.account?.id!==e.CLOUDFLARE_ACCOUNT_ID||zone.status!=='active'||!(c.url.hostname===zone.name||c.url.hostname.endsWith('.'+zone.name)))throw new Error('Public hostname must belong to the configured active Cloudflare zone');
 const account=`/accounts/${e.CLOUDFLARE_ACCOUNT_ID}`;
 const domains=await cf(account+'/workers/domains');const domain=domains.find((d:any)=>d.hostname===c.url.hostname);
 if(domain&&(domain.service!==c.worker||domain.environment!=='production'))throw new Error('Hostname already belongs to a different Worker');
 if(!domain){const records=await cf(`/zones/${e.CLOUDFLARE_ZONE_ID}/dns_records?name=${encodeURIComponent(c.url.hostname)}`);if(records.some((d:any)=>['A','AAAA','CNAME'].includes(d.type)))throw new Error('Conflicting DNS record exists; no record has been replaced');}
 const authorization=await fetch('https://api.backblazeb2.com/b2api/v4/b2_authorize_account',{headers:{Authorization:'Basic '+Buffer.from(e.B2_KEY_ID+':'+e.B2_APP_KEY).toString('base64')},signal:AbortSignal.timeout(30000)});
 if(!authorization.ok)throw new Error(`B2 authentication HTTP ${authorization.status}`);
 const auth=await authorization.json();const storage=auth.apiInfo.storageApi;
 async function b2(operation:string,body:unknown){const r=await fetch(storage.apiUrl+'/b2api/v4/'+operation,{method:'POST',headers:{Authorization:auth.authorizationToken,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(60000)});if(!r.ok)throw new Error(`B2 ${operation} HTTP ${r.status}`);return r.json();}
 const allowed=storage.allowed;
 if(!['readFiles','writeFiles','listFiles'].every(k=>allowed.capabilities.includes(k)))throw new Error('B2 key needs readFiles, writeFiles, and listFiles');
 if(allowed.namePrefix&&!c.prefix.startsWith(allowed.namePrefix))throw new Error('B2 prefix is outside the key scope');
 const buckets=await b2('b2_list_buckets',{accountId:auth.accountId,bucketId:e.B2_BUCKET_ID});const bucket=buckets.buckets.find((b:any)=>b.bucketId===e.B2_BUCKET_ID);
 if(bucket?.bucketType!=='allPublic')throw new Error('Target bucket must be public');
 const origin=`${storage.downloadUrl}/file/${encodeURIComponent(bucket.bucketName)}/${c.prefix}`;
 console.log(`${c.dry?'Dry run':'Publishing'} ${c.url.origin} from ${bucket.bucketName}/${c.prefix}`);
 const childEnv={...process.env,SLOPBUZZ_RUNTIME:'browser',SLOPBUZZ_ENGINE:'auto',SLOPBUZZ_API_BASE_URL:'',SLOPBUZZ_RELEASE_SHA:git('rev-parse','HEAD'),SLOPBUZZ_ANALYTICS_ENABLED:e.SLOPBUZZ_ANALYTICS_ENABLED||'true',SLOPBUZZ_ANALYTICS_ENVIRONMENT:'production',SLOPBUZZ_ANALYTICS_ALLOW_LOCAL:'false',SLOPBUZZ_POSTHOG_ENV_FILE:e.SLOPBUZZ_POSTHOG_ENV_FILE||'tmp/.env.posthog'};
 const run=(...args:string[])=>execFileSync('pnpm',args,{stdio:'inherit',env:childEnv});
 run('typecheck');run('test:publish');run('build');run('test:parity');run('test:e2e');execFileSync('node',['scripts/build.ts','--assets-only'],{stdio:'inherit',env:childEnv});
 if(!c.dry&&git('status','--porcelain','--untracked-files=no'))throw new Error('Build changed tracked sources; commit generated assets before publishing');
 async function files(directory:string):Promise<string[]>{const result:string[]=[];for(const d of await readdir(directory,{withFileTypes:true})){if(d.isSymbolicLink())throw new Error('Symlink in publication tree');const p=directory+'/'+d.name;if(d.isDirectory())result.push(...await files(p));else result.push(p.slice(5));}return result;}
 const privateValues=[e.B2_APP_KEY,e.CLOUDFLARE_API_TOKEN];
 // The build receives a public project token, never the PostHog management key.
 try {
  const analyticsEnv=parseEnv(await readFile(childEnv.SLOPBUZZ_POSTHOG_ENV_FILE,'utf8'));
  for(const [name,value] of Object.entries(analyticsEnv))if(name!=='POSTHOG_TOKEN'&&/TOKEN|KEY|SECRET|PASSWORD/i.test(name)&&value)privateValues.push(value);
 } catch(error) {if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;}
 const paths=await files('dist');
 const payloads=await Promise.all(paths.map(async path=>{const bytes=await readFile('dist/'+path);for(const key of privateValues)if(key&&bytes.includes(Buffer.from(key)))throw new Error('Credential found in publication tree');return {path,bytes,sha1:digest(bytes),...metadata(path)};}));
 // Metadata is compared as well as content: a caching fix must not be skipped.
 const remote=new Map<string,RemoteFile>();let start:string|undefined;
 do{const page=await b2('b2_list_file_names',{bucketId:e.B2_BUCKET_ID,prefix:c.prefix,startFileName:start,maxFileCount:10000});for(const f of page.files)remote.set(f.fileName,f);start=page.nextFileName;}while(start);
 const changed=payloads.filter(p=>needsUpload(p,remote.get(c.prefix+p.path)));
 const compiled=await build({entryPoints:['deploy/b2-worker.ts'],bundle:true,format:'esm',target:'es2022',write:false});const code=compiled.outputFiles[0].text;
 console.log(`${changed.length} uploads; ${payloads.length-changed.length} unchanged files. Worker: ${c.worker}.`);
 if(c.dry){console.log('Dry run complete; no remote changes made.');return;}
 await uploadFiles(changed,c.prefix,()=>b2('b2_get_upload_url',{bucketId:e.B2_BUCKET_ID}));
 const form=new FormData();form.set('metadata',JSON.stringify({main_module:'worker.mjs',compatibility_date:'2026-10-30',bindings:[{type:'plain_text',name:'B2_ORIGIN',text:origin}]}));form.set('worker.mjs',new Blob([code],{type:'application/javascript+module'}),'worker.mjs');
 await cf(account+'/workers/scripts/'+c.worker,'PUT',form);
 if(!domain)await cf(account+'/workers/domains','PUT',{hostname:c.url.hostname,service:c.worker,environment:'production',zone_id:e.CLOUDFLARE_ZONE_ID});
 console.log('Files uploaded and Worker domain configured. Checking DNS/TLS and release…');
 let ready=false;for(let attempt=0;attempt<60;attempt++){try{const r=await fetch(c.url.origin+'/release.json',{cache:'no-store',signal:AbortSignal.timeout(5000)});if(r.ok&&(await r.json()).revision===childEnv.SLOPBUZZ_RELEASE_SHA){ready=true;break;}}catch{}if(attempt%10===0)console.log('Waiting for public DNS/TLS propagation…');await new Promise(r=>setTimeout(r,3000));}
 if(!ready)throw new Error('Upload complete; public DNS/TLS or release verification is still pending. Rerun after propagation.');
 await verifyPublic(c.url.origin,childEnv.SLOPBUZZ_RELEASE_SHA);console.log(`Published and verified ${c.url.origin} at ${childEnv.SLOPBUZZ_RELEASE_SHA}`);
}
void main().catch(error=>{console.error(error.message);process.exitCode=1;});
