import {execFileSync,spawn} from 'node:child_process';
import {readFile,writeFile,mkdir,mkdtemp,rm,cp} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {resolve} from 'node:path';
import {chromium,firefox,webkit} from '@playwright/test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const run=(cmd:string,args:string[])=>execFileSync(cmd,args,{stdio:'inherit'});
await mkdir('validation',{recursive:true});
await rm('validation/report.json',{force:true});
const temp=await mkdtemp(`${tmpdir()}/slopbuzz-tribunal-`);
const config=JSON.parse(await readFile('dist/runtime-config.json','utf8'));
run('mvn',['-q','-pl','server','-am','test-compile']);
run('mvn',['-q','-f','server/pom.xml','dependency:build-classpath',`-Dmdep.outputFile=${temp}/classpath`]);
const classpath=[resolve('server/target/test-classes'),resolve('server/target/classes'),resolve('core/target/classes'),(await readFile(`${temp}/classpath`,'utf8')).trim()].join(':');
execFileSync('java',['-Xmx1g','-cp',classpath,'EquivalenceFixtureMain',`${temp}/fixtures.tsv`,temp,config.revision],{stdio:['ignore','ignore','pipe']});
interface Fixture {method:string;path:string;status:number;body:string;headers:Record<string,string>}
const fixtures:Fixture[]=(await readFile(`${temp}/fixtures.tsv`,'utf8')).trimEnd().split('\n').map(line=>{
  const [method,path,status,body,rawHeaders='']=line.split('\t');
  return {method,path,status:Number(status),body:Buffer.from(body,'base64').toString(),headers:Object.fromEntries(Buffer.from(rawHeaders,'base64').toString().trim().split('\n').filter(Boolean).map(h=>{const i=h.indexOf(':');return [h.slice(0,i),h.slice(i+1)];}))};
});
for(let limit=0;limit<=1000;limit++) {
  const oracle=Array.from({length:limit},(_,i)=>{const n=i+1;return (n%3===0?'Fizz':'')+(n%5===0?'Buzz':'')||String(n);}).join('\n')+(limit?'\n':'');
  assert.equal(fixtures[limit].body,oracle,`JVM independent oracle ${limit}`);
}
const publicFixtures=fixtures.slice(0,1001).filter((_,i)=>[0,1,3,5,15,100,1000].includes(i)).map(f=>({...f,path:f.path.replace('/__validation/output','/fizzbuzz')}));
await writeFile('validation/fixtures.json',JSON.stringify(publicFixtures));
await cp('validation/fixtures.json','dist/validation/fixtures.json');
const port=18191;
const server=spawn(process.execPath,['scripts/serve.ts'],{env:{...process.env,PORT:String(port)},stdio:'pipe'});
await new Promise<void>((resolve,reject)=>{server.stdout.once('data',()=>resolve());server.once('error',reject);});
const results:{browser:string;engine:string;assertions:number;elapsedMillis:number}[]=[];
try {
 for(const [name,type] of Object.entries({chromium,firefox,webkit})) for(const engine of ['auto','js'] as const) {
  const started=Date.now();
  const browser=await type.launch();
  try {
   const context=await browser.newContext({serviceWorkers:'block'});
   const page=await context.newPage();
   await page.goto(`http://localhost:${port}/validation/`);
   const result=await page.evaluate(async({fixtures,engine})=>{
    const module=await import(new URL('../assets/tribunal.js',location.href).href);
    const id=crypto.randomUUID();
    const client=new module.BrowserRuntimeClient({...module.config,engine,validation:true},id);
    let assertions=0;
    try {
     const runtime=await (await client.request('/operations/runtime')).json();
     if(runtime.engine!==(engine==='js'?'js':'wasm'))throw new Error(`Unexpected engine: ${runtime.engine}`);
     for(const f of fixtures) {
      if(f.method==='ADVANCE'){await client.request(`/__validation/advance?millis=${f.path}`);continue;}
      const response=await client.request(f.path,{method:f.method,headers:{traceparent:'00-0123456789abcdef0123456789abcdef-0123456789abcdef-01'}});
      const body=await response.text();
      if(response.status!==f.status || body!==f.body) throw new Error(`${f.method} ${f.path}: expected ${f.status} ${f.body.slice(0,300)}, got ${response.status} ${body.slice(0,300)}`);
      for(const [name,value] of Object.entries(f.headers))if(response.headers.get(name)!==value)throw new Error(`${f.path}: header ${name} differs (${response.headers.get(name)} != ${value})`);
      if(!f.path.startsWith('/__validation')) {
       if(response.headers.get('X-SlopBuzz-Trace-Id')!=='0123456789abcdef0123456789abcdef')throw new Error('Trace propagation differs');
       if(!/^[a-f0-9]{16}$/.test(response.headers.get('X-SlopBuzz-Span-Id')||''))throw new Error('Invalid span');
      }
      assertions++;
     }
     return {assertions,engine:runtime.engine};
    } finally {client.close();indexedDB.deleteDatabase(`slopbuzz:${module.scope}:rehearsal:${id}`);}
   },{fixtures,engine});
   results.push({browser:name,...result,elapsedMillis:Date.now()-started});
   console.log(`${name}/${result.engine}: ${result.assertions} exact JVM comparisons passed`);
  } finally {await browser.close();}
 }
 const release=JSON.parse(await readFile('dist/release.json','utf8'));
 const report={...release,status:'PASSED',generatedAt:new Date().toISOString(),execution:process.env.CI ? 'CI' : 'local automated run',suite:'JVM Spring oracle + shared dispatcher vs actual browser Java',oracleLimits:1001,fixtures:fixtures.length,results,artifactSha256:createHash('sha256').update(await readFile(`dist/${config.assets}wasm/enterprise.wasm`)).digest('hex')};
 await writeFile('validation/report.json',JSON.stringify(report,null,2));
 await cp('validation/report.json','dist/validation/report.json');
} finally {server.kill();await rm(temp,{recursive:true,force:true});}
