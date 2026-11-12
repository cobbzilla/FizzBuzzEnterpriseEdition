import {execFileSync,spawn} from 'node:child_process';
import {mkdir,mkdtemp,readFile,rm,writeFile} from 'node:fs/promises';
import {renameSync,writeFileSync} from 'node:fs';
import {tmpdir,totalmem} from 'node:os';
import {join,resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';

export interface ProcessRow {pid:number;parent:number;rss:number;started:string;command:string}
export function parseProcesses(text:string):ProcessRow[]{
 return text.split('\n').flatMap(line=>{
  const m=line.match(/^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\w+\s+\w+\s+\d+\s+[\d:]+\s+\d+)\s+(.+)$/);
  return m?[{pid:Number(m[1]),parent:Number(m[2]),rss:Number(m[3])*1024,started:m[4],command:m[5]}]:[];
 });
}
export function isTestBrowser(row:ProcessRow){
 const base=row.command.match(/^(?:\/Users\/[^/]+\/Library\/Caches|\/home\/[^/]+\/\.cache|\/root\/\.cache)\/(?:ms-playwright|ms-playwright-go)\/|^\/ms-playwright\//)?.[0];
 const configured=process.env.PLAYWRIGHT_BROWSERS_PATH,prefix=configured&&configured!=='0'?resolve(configured)+'/':undefined;
 const start=base||(prefix&&row.command.startsWith(prefix)?prefix:undefined);
 return !!start&&/^(?:chromium|chrome|firefox|webkit)[^/]*\//.test(row.command.slice(start.length));
}
export function isOrphanBrowser(row:ProcessRow){return row.parent===1&&isTestBrowser(row)&&/playwright_[^\s]*profile/.test(row.command)&&/--(?:remote-debugging-pipe|juggler-pipe|inspector-pipe)(?:\s|$)/.test(row.command)&&!row.command.includes('--type=');}
export function descendants(rows:ProcessRow[],root:number){const ids=new Set([root]);let changed=true;while(changed){changed=false;for(const row of rows)if(ids.has(row.parent)&&!ids.has(row.pid)){ids.add(row.pid);changed=true;}}return rows.filter(row=>ids.has(row.pid));}
export function sameProcess(a:ProcessRow,b:ProcessRow){return a.pid===b.pid&&a.started===b.started&&a.command===b.command;}
export function compressedBytes(text:string){const size=Number(text.match(/page size of (\d+) bytes/)?.[1]),pages=Number(text.match(/Pages occupied by compressor:\s+(\d+)/)?.[1]);if(!size||!Number.isFinite(pages))throw new Error('Cannot read macOS compressed-memory usage');return size*pages;}
export function resourceProblem(rows:ProcessRow[],compressed:number,memory=totalmem()){
 const browsers=rows.filter(isTestBrowser),rss=browsers.reduce((n,p)=>n+p.rss,0);
 if(browsers.length>30)return `Too many test browser processes (${browsers.length})`;
 if(rss>Math.min(3*1024**3,memory/8))return `Test browsers exceed their memory budget (${Math.ceil(rss/1024**2)} MiB RSS)`;
 if(compressed>memory/5)return 'System compressed memory exceeds 20% of physical RAM';
}
function processes(){return parseProcesses(execFileSync('ps',['-axo','pid=,ppid=,rss=,lstart=,command='],{encoding:'utf8',timeout:5000,maxBuffer:8*1024**2}));}
function compressed(){return process.platform==='darwin'?compressedBytes(execFileSync('vm_stat',{encoding:'utf8',timeout:5000})):0;}
const pause=(ms:number)=>new Promise<void>(r=>setTimeout(r,ms));
function signal(row:ProcessRow,kind:NodeJS.Signals){const current=processes().find(p=>p.pid===row.pid);if(current&&sameProcess(row,current))try{process.kill(row.pid,kind);}catch(e){if((e as NodeJS.ErrnoException).code!=='ESRCH')throw e;}}
async function cleanup(rows:ProcessRow[]){
 if(!rows.length)return;
 for(const row of rows.slice().reverse())signal(row,'SIGTERM');
 await pause(1500);
 let current=processes();for(const row of rows)if(current.some(p=>sameProcess(row,p)))signal(row,'SIGKILL');
 await pause(200);current=processes();if(rows.some(row=>current.some(p=>sameProcess(row,p))))throw new Error('Test process cleanup incomplete; refusing another browser run');
}
export async function guarded(command:string,args:string[]){
 if(!command)throw new Error('Usage: node scripts/browser-guard.ts COMMAND [ARGUMENTS]');
 if(!['darwin','linux'].includes(process.platform))throw new Error('Browser process supervision requires macOS or Linux');
 const initial=processes(),inherited=Number(process.env.SLOPBUZZ_BROWSER_GUARD_PID);
 // A nested release command shares its live ancestor's monitor and temporary profiles.
 if(initial.some(p=>p.pid===inherited)&&descendants(initial,inherited).some(p=>p.pid===process.pid)){
  const child=spawn(command,args,{stdio:'inherit'});return await new Promise<number>((res,rej)=>{child.once('error',rej);child.once('exit',code=>res(code??1));});
 }
 const directory=join(tmpdir(),'slopbuzz-browser-guards');await mkdir(directory,{recursive:true});
 const key=createHash('sha256').update(resolve('.')).digest('hex').slice(0,16),lock=join(directory,key+'.json');
 const self=initial.find(p=>p.pid===process.pid)!;
 try{await writeFile(lock,JSON.stringify(self),{flag:'wx'});}catch(error){
  if((error as NodeJS.ErrnoException).code!=='EEXIST')throw error;
  const owner=JSON.parse(await readFile(lock,'utf8')) as ProcessRow&{owned?:ProcessRow[]};
  if(initial.some(p=>sameProcess(p,owner)))throw new Error('Another guarded browser run is active for this checkout');
  await cleanup(owner.owned||[]);
  await rm(lock);await writeFile(lock,JSON.stringify(self),{flag:'wx'});
 }
 let timer:ReturnType<typeof setInterval>|undefined,abortTimer:ReturnType<typeof setTimeout>|undefined,workspace='',root:ProcessRow|undefined,aborted='',ending=false,ticks=0;
 const tracked=new Map<number,ProcessRow>();let child:ReturnType<typeof spawn>|undefined;
 const capture=()=>{
  const rows=processes();if(root)for(const row of descendants(rows,root.pid))tracked.set(row.pid,row);
  // Browser crash helpers can reparent immediately; the private profile directory proves ownership.
  for(const row of rows)if(workspace&&isTestBrowser(row)&&row.command.includes(workspace))tracked.set(row.pid,row);
  return rows;
 };
 const abort=(reason:string)=>{if(ending||aborted)return;aborted=reason;console.error('Browser guard stopping: '+reason);if(child?.pid){try{process.kill(-child.pid,'SIGTERM');}catch{};abortTimer=setTimeout(()=>{try{process.kill(-child!.pid!,'SIGKILL');}catch{};},5000);}};
 const interrupt=()=>abort('Interrupted');process.on('SIGINT',interrupt);process.on('SIGTERM',interrupt);
 try{
  const stale=initial.filter(isOrphanBrowser);if(stale.length){console.log(`Browser guard: cleaning ${stale.length} orphaned automation browser(s)`);await cleanup(stale.flatMap(p=>descendants(initial,p.pid)));}
  const existing=processes().filter(isTestBrowser);if(existing.length)throw new Error('An existing Playwright browser is still running; resolve its ownership before starting another suite');
  const problem=resourceProblem([],compressed());if(problem)throw new Error(problem);
  workspace=await mkdtemp(join(directory,'run-'));
  child=spawn(command,args,{stdio:'inherit',detached:true,env:{...process.env,TMPDIR:workspace,TMP:workspace,TEMP:workspace,SLOPBUZZ_BROWSER_GUARD_PID:String(process.pid)}});
  const exited=new Promise<number>((res,rej)=>{child!.once('error',rej);child!.once('exit',code=>res(code??1));});
  root=processes().find(p=>p.pid===child!.pid);capture();
  timer=setInterval(()=>{
   try{
    const rows=capture();
    const memory=compressed(),problem=resourceProblem(rows,memory);if(problem)abort(problem);
    if(++ticks%15===0){const browsers=rows.filter(isTestBrowser);console.log(`Browser guard: ${browsers.length} browser processes; ${Math.ceil(browsers.reduce((n,p)=>n+p.rss,0)/1024**2)} MiB browser RSS; ${Math.ceil(memory/1024**2)} MiB compressed`);}
    const next=lock+'.next';writeFileSync(next,JSON.stringify({...self,owned:[...tracked.values()]}));renameSync(next,lock);
   }catch(error){abort('Cannot monitor browser resources: '+(error as Error).message);if(child?.pid)try{process.kill(-child.pid,'SIGKILL');}catch{};}
  },2000);
  const code=await exited;if(aborted)throw new Error(aborted);return code;
 }finally{
  ending=true;if(timer)clearInterval(timer);if(abortTimer)clearTimeout(abortTimer);process.off('SIGINT',interrupt);process.off('SIGTERM',interrupt);
  let cleaned=false;
  try{capture();await cleanup([...tracked.values()]);cleaned=true;const remaining=processes().filter(isTestBrowser);if(remaining.length)throw new Error('Automation browser processes remain and need ownership review: '+remaining.map(p=>p.pid).join(', '));console.log('Browser guard: test processes cleaned up');}finally{
   if(cleaned){if(workspace)await rm(workspace,{recursive:true,force:true});await rm(lock,{force:true});}
   else writeFileSync(lock,JSON.stringify({...self,owned:[...tracked.values()]}));
  }
 }
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 guarded(process.argv[2],process.argv.slice(3)).then(code=>{process.exitCode=code;},error=>{console.error((error as Error).message);process.exitCode=1;});
}
