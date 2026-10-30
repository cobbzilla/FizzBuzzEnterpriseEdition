import {resolve} from 'node:path';
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {chromium} from '@playwright/test';
import {execFileSync} from 'node:child_process';
execFileSync('mvn',['-q','-f','browser/pom.xml','package','-Dbrowser.mainClass=com.seriouscompany.browser.CompilerGate',`-Dbrowser.outputDirectory=${resolve('browser/target/compiler-gate')}`],{stdio:'inherit'});
execFileSync('pnpm',['exec','tsc','--ignoreConfig','browser/gate-host.ts','--target','ES2022','--module','ES2022','--outDir','browser/target/host','--skipLibCheck'],{stdio:'inherit'});
const host = await readFile('browser/target/host/gate-host.js','utf8');
const server = createServer(async (request, response) => {
  try {
    const path = new URL(request.url!, 'http://localhost').pathname;
    if (path === '/') {response.setHeader('Content-Type','text/html');response.end('<!doctype html><script type="module" src="/host.js"></script>');return;}
    if (path === '/host.js') {response.setHeader('Content-Type','text/javascript');response.end(host);return;}
    if (!/^\/(wasm|js)\/[\w.-]+$/.test(path)) {response.writeHead(404).end();return;}
    response.setHeader('Content-Type',path.endsWith('.wasm')?'application/wasm':'text/javascript');
    response.end(await readFile(`browser/target/compiler-gate${path}`));
  } catch(error) {response.writeHead(500).end(String(error));}
});
await new Promise<void>(resolve=>server.listen(0,'127.0.0.1',resolve));
const address=server.address() as {port:number};
let previous='GENESIS', output='';
for(let number=1;number<=15;number++) {
  const payload=(number%15===0?'FizzBuzz':number%3===0?'Fizz':number%5===0?'Buzz':String(number))+'\n';
  output+=payload;
  previous=createHash('sha256').update(`${previous}:${number}:${number}:COMMITTED:${payload.length}:${payload}`).digest('hex');
}
const browser=await chromium.launch({headless:true});
try {
  for(const engine of ['wasm','js']) {
    const page=await browser.newPage();
    page.on('pageerror', error=>console.error(error));
    await page.goto(`http://127.0.0.1:${address.port}/?engine=${engine}`);
    await page.waitForFunction(()=>Boolean((window as Window & {enterpriseResult?: string}).enterpriseResult),{},{timeout:30000});
    const actual=await page.evaluate(()=>(window as Window & {enterpriseResult?: string}).enterpriseResult);
    if(actual!==output+'HEAD='+previous) throw Error(`${engine} gate failed: ${actual}`);
    const entries=await page.evaluate(async name=>new Promise<number>((resolve,reject)=>{
      const open=indexedDB.open(`slopbuzz-compiler-gate-${name}`);
      open.onsuccess=()=>{const count=open.result.transaction('entries').objectStore('entries').count();count.onsuccess=()=>{open.result.close();resolve(count.result)};count.onerror=()=>reject(count.error)};
      open.onerror=()=>reject(open.error);
    }),engine);
    if(entries!==15) throw Error(`${engine}: only ${entries} committed records`);
    console.log(`${engine}: real Java pipeline, SHA-256 chain and 15 IndexedDB commits passed`);
    await page.close();
  }
} finally {await browser.close();server.close();}
