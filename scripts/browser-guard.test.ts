import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp,readFile,rm,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {parseProcesses,isTestBrowser,isOrphanBrowser,descendants,sameProcess,compressedBytes,resourceProblem,type ProcessRow} from './browser-guard.ts';
const browser=(pid=20,parent=10):ProcessRow=>({pid,parent,rss:300*1024**2,started:'Thu Nov 12 08:00:00 2026',command:'/Users/example/Library/Caches/ms-playwright/chromium-100/chrome-mac/Chrome for Testing.app/Contents/MacOS/Chrome --remote-debugging-pipe --user-data-dir=/tmp/playwright_chromium_profile-abc'});
test('process parser preserves spaced executable paths and exact start identity',()=>{const row=browser();assert.deepEqual(parseProcesses(` 20 10 307200 Thu Nov 12 08:00:00 2026 ${row.command}`),[row]);assert.deepEqual(parseProcesses('not a process'),[]);});
test('ordinary user browsers and shell commands mentioning Playwright are excluded',()=>{for(const command of ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome --remote-debugging-pipe','/Applications/Firefox.app/Contents/MacOS/firefox','/bin/bash -c /Users/example/Library/Caches/ms-playwright/chromium-100/chrome --remote-debugging-pipe'])assert.equal(isTestBrowser({...browser(),command}),false);});
test('only an orphaned browser root with a test profile is eligible for preflight cleanup',()=>{assert.equal(isOrphanBrowser(browser(20,1)),true);assert.equal(isOrphanBrowser(browser()),false);assert.equal(isOrphanBrowser({...browser(20,1),command:browser().command+' --type=renderer'}),false);assert.equal(isOrphanBrowser({...browser(20,1),command:browser().command.replace('--remote-debugging-pipe','')}),false);assert.equal(isOrphanBrowser({...browser(20,1),command:browser().command.replace('playwright_chromium_profile','personal')}),false);});
test('a reused PID or changed executable never inherits ownership',()=>{const a=browser();assert.equal(sameProcess(a,{...a}),true);assert.equal(sameProcess(a,{...a,started:'Fri Nov 13 08:00:00 2026'}),false);assert.equal(sameProcess(a,{...a,command:'/Applications/Google Chrome.app'}),false);});
test('descendant traversal admits only the owned tree regardless of row order',()=>{const rows=[browser(30,20),browser(90,1),browser(20,10),browser(10,1)];assert.deepEqual(descendants(rows,10).map(p=>p.pid),[30,20,10]);});
test('normal browser multiprocess operation stays within budget',()=>assert.equal(resourceProblem([browser()],512*1024**2,32*1024**3),undefined));
test('accumulating browser processes, excessive RSS and compression each stop the run',()=>{assert.match(resourceProblem(Array.from({length:31},(_,i)=>({...browser(i),rss:1})),0,32*1024**3)!,/Too many/);assert.match(resourceProblem([{...browser(),rss:4*1024**3}],0,32*1024**3)!,/memory budget/);assert.match(resourceProblem([],7*1024**3,32*1024**3)!,/compressed memory/);});
test('compressed memory is measured in the hosts page size and invalid readings fail closed',()=>{assert.equal(compressedBytes('Mach Virtual Memory Statistics: (page size of 16384 bytes)\nPages occupied by compressor: 123.'),123*16384);assert.throws(()=>compressedBytes('no reading'));});
test('a failed nested command cleans an orphaned child that ignores termination',{timeout:20000},async()=>{
 const dir=await mkdtemp(join(tmpdir(),'slopbuzz-guard-fixture-')),pidFile=join(dir,'child.pid');let pid=0;
 try{
  await writeFile(join(dir,'child.ts'),"process.on('SIGTERM',()=>{});setInterval(()=>{},1000);\n");
  await writeFile(join(dir,'parent.ts'),"import {spawn} from 'node:child_process';import {writeFileSync} from 'node:fs';const child=spawn(process.execPath,[process.argv[2]],{detached:true,stdio:'ignore'});child.unref();writeFileSync(process.argv[3],String(child.pid));setTimeout(()=>process.exit(7),3000);\n");
  const guard=resolve('scripts/browser-guard.ts'),child=spawn(process.execPath,[guard,process.execPath,guard,process.execPath,join(dir,'parent.ts'),join(dir,'child.ts'),pidFile],{cwd:dir,env:{...process.env,SLOPBUZZ_BROWSER_GUARD_PID:''},stdio:['ignore','pipe','pipe']});
  let output='';child.stdout.on('data',b=>output+=b);child.stderr.on('data',b=>output+=b);
  const code=await new Promise<number|null>((res,rej)=>{child.once('error',rej);child.once('exit',res);});pid=Number(await readFile(pidFile,'utf8'));assert.equal(code,7,output);assert.match(output,/test processes cleaned up/);assert.throws(()=>process.kill(pid,0),{code:'ESRCH'});
 }finally{if(pid)try{process.kill(pid,'SIGKILL');}catch{}await rm(dir,{recursive:true,force:true});}
});
