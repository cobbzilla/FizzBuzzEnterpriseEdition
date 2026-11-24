import assert from 'node:assert/strict';
import {execFileSync,spawn} from 'node:child_process';
import {readFile,writeFile,readdir,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {sourceIdentity} from './source-identity.ts';
import {renewOwnedServer} from './browser-launch.ts';

interface Result {status:string;errors:unknown[]}
interface Spec {id:string;title:string;file?:string;tests:{expectedStatus:string;status:string;annotations:{type:string}[];results:Result[]}[]}
interface Suite {specs?:Spec[];suites?:Suite[]}
interface Report extends Suite {config:unknown;errors:unknown[];stats:{startTime:string;duration:number;expected:number;skipped:number;unexpected:number;flaky:number}}
const specs=(s:Suite):Spec[]=>[...(s.specs||[]),...(s.suites||[]).flatMap(specs)];
const json=async<T>(path:string):Promise<T>=>JSON.parse(await readFile(path,'utf8'));
const hash=(text:string|Buffer)=>createHash('sha256').update(text).digest('hex');
const docker=(...args:string[])=>execFileSync('docker',args,{encoding:'utf8',timeout:15000});

/** One browser process per case, verified cleanup, and resumable identical-artifact evidence. */
export async function isolatedE2E(selection:string[]=[]){
 const name=process.env.SLOPBUZZ_BROWSER_CONTAINER;
 assert(name&&process.env.SLOPBUZZ_BROWSER_WS_ENDPOINT,'Isolated qualification requires the explicitly owned browser container and endpoint');
 const identity=JSON.parse(docker('inspect',name))[0],container=identity.Id as string;
 assert.equal(identity.Config.Labels['slopbuzz.task'],'paper-aviation');
 for(const bindings of Object.values(identity.HostConfig.PortBindings) as {HostPort:string}[][])assert(bindings.every(binding=>binding.HostPort),'Use explicit loopback host ports so browser-server restarts preserve the endpoint');
 const limit=identity.HostConfig.Memory as number;assert(limit>0&&limit<=1536*1024*1024,'Use a browser container capped at 1.5 GiB');
 const release=await json<{revision:string;sourceDigest:string;build:string}>('dist/release.json');
 const revision=()=>execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
 assert.equal(revision(),release.revision,'Build the committed revision before qualification');
 assert.equal(await sourceIdentity(),release.sourceDigest,'Build the current source before qualification');
 async function assets(){const h=createHash('sha256');async function walk(folder:string){for(const item of (await readdir(folder,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){const path=folder+'/'+item.name;if(item.isDirectory())await walk(path);else h.update(path).update(await readFile(path));}}await walk('dist');return h.digest('hex');}
 const assetDigest=await assets(),folder='validation/isolated-'+release.sourceDigest.slice(0,16)+'-'+hash(JSON.stringify(selection)).slice(0,8);await mkdir(folder,{recursive:true});
 const collection=folder+'/collection.json';
 execFileSync('pnpm',['exec','playwright','test',...selection,'--list','--reporter=json'],{stdio:'inherit',env:{...process.env,PLAYWRIGHT_JSON_OUTPUT_FILE:collection}});
 const inventory=await json<Report>(collection);
 // Exercise the account and its responsive surfaces before long natural-flight
 // scenarios. Every collected case still runs, with the complete order sealed
 // into the checkpoint alongside source and artifact hashes.
 const priority=['high-scores.spec.ts','portfolio.spec.ts','demo-layout.spec.ts','chronicle.spec.ts','heist.spec.ts','office-fullscreen.spec.ts'];
 const rank=(spec:Spec)=>{const index=priority.indexOf(spec.file?.split('/').at(-1)||'');return index<0?priority.length:index;};
 const ordered=specs(inventory).sort((a,b)=>rank(a)-rank(b)),ids=ordered.map(s=>s.id);assert.equal(new Set(ids).size,ids.length);assert(ids.length>0);
 const checkpointPath=folder+'/checkpoint.json';
 let checkpoint:{sourceDigest:string;assetDigest:string;ids:string[];completed:{id:string;hash:string}[]};
 try{checkpoint=await json(checkpointPath);}catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;checkpoint={sourceDigest:release.sourceDigest,assetDigest,ids,completed:[]};}
 assert.equal(checkpoint.sourceDigest,release.sourceDigest);assert.equal(checkpoint.assetDigest,assetDigest);assert.deepEqual(checkpoint.ids,ids);
 function pressure(){const lines=docker('exec',container,'cat','/sys/fs/cgroup/memory.current','/sys/fs/cgroup/memory.events').trim().split('\n');assert(Number(lines[0])<limit*.95,'Browser container is approaching its memory cap: '+lines[0]+' bytes');for(const line of lines.slice(1))if(/^(max|oom|oom_kill|oom_group_kill) /.test(line))assert.equal(Number(line.split(' ')[1]),0,'Browser memory pressure: '+line);return Number(lines[0]);}
 async function clean(){for(let i=0;i<20;i++){if(!/\/ms-playwright\//.test(docker('top',container,'-eo','pid,ppid,args'))){pressure();return;}await new Promise(resolve=>setTimeout(resolve,250));}throw new Error('Prior browser has not exited; refusing to start another case');}
 async function prepare(){
  await clean();
  {
   // Retire the server, display and charged file cache as well as each browser.
   // Restart only after verified browser exit, never as a retry of a failed case.
   // A fresh cgroup per case also releases WebKit's charged file cache.
   await renewOwnedServer(process.env.SLOPBUZZ_BROWSER_WS_ENDPOINT!);
   assert.deepEqual(JSON.parse(docker('inspect',container))[0].NetworkSettings.Ports,identity.NetworkSettings.Ports);
   await clean();
   console.log('Browser server residency renewed; '+Math.ceil(pressure()/1024**2)+' MiB before the next case.');
  }
 }
 async function runCase(report:string,selected:string){
  await new Promise<void>((resolve,reject)=>{
   const child=spawn('pnpm',['exec','playwright','test',...selection,'--last-failed','--trace=off','--output='+report.replace(/\.json$/,'-artifacts'),'--reporter=line,json'],{stdio:'inherit',env:{...process.env,PLAYWRIGHT_LAST_RUN_OUTPUT_FILE:selected,PLAYWRIGHT_JSON_OUTPUT_FILE:report}});
   let failure:Error|undefined;const watch=setInterval(()=>{try{pressure();}catch(error){failure=error as Error;child.kill('SIGTERM');}},2000);
   child.once('error',error=>{clearInterval(watch);reject(error);});child.once('exit',code=>{clearInterval(watch);if(failure)reject(failure);else if(code!==0)reject(new Error('Isolated browser case failed; qualification stopped'));else resolve();});
  });
 }
 const suites:Suite[]=[],stats={startTime:new Date().toISOString(),duration:0,expected:0,skipped:0,unexpected:0,flaky:0};
 try{
  await clean();
  for(const [i,id]of ids.entries()){
   assert(/^[a-zA-Z0-9-]+$/.test(id));const path=folder+'/'+id+'.json',saved=checkpoint.completed[i];
   if(saved){assert.equal(saved.id,id);assert.equal(hash(await readFile(path)),saved.hash);}else{
    await prepare();const selected=folder+'/selected.json';await writeFile(selected,JSON.stringify({status:'failed',failedTests:[id]}));
    console.log(`Isolated browser case ${i+1}/${ids.length}: ${ordered[i].title}`);await runCase(path,selected);await clean();
   }
   const report=await json<Report>(path),cases=specs(report);assert.equal(cases.length,1);assert.equal(cases[0].id,id);assert.deepEqual(report.errors,[]);assert.equal(report.stats.unexpected,0);assert.equal(report.stats.flaky,0);
   const test=cases[0].tests[0],result=test.results.at(-1);assert(result);
   if(test.expectedStatus==='passed'){assert.equal(test.status,'expected');assert.equal(result.status,'passed');assert.deepEqual(result.errors,[]);stats.expected++;}
   else{assert.equal(test.expectedStatus,'skipped');assert.equal(test.status,'skipped');assert.equal(result.status,'skipped');assert(test.annotations.some(a=>a.type==='skip'));stats.skipped++;}
   suites.push(...(report.suites||[]));stats.duration+=report.stats.duration;
   if(!saved){checkpoint.completed.push({id,hash:hash(await readFile(path))});await writeFile(checkpointPath,JSON.stringify(checkpoint));}
   console.log(`Verified ${i+1}/${ids.length}; ${stats.expected} passed, ${stats.skipped} intentional skips; prior browser exited.`);
  }
  await clean();assert.equal(revision(),release.revision);assert.equal(await sourceIdentity(),release.sourceDigest);assert.equal(await assets(),assetDigest);assert.equal(stats.expected+stats.skipped,ids.length);
  // Focused development checks cannot stand in for the complete release gate.
  await writeFile(selection.length?folder+'/report.json':'validation/e2e.json',JSON.stringify({config:inventory.config,suites,errors:[],stats},null,2));
 }catch(error){
  // Immutable container identity and ownership were verified before any test began.
  try{docker('stop','--timeout','5',container);docker('rm',container);}catch{}
  throw error;
 }
}
