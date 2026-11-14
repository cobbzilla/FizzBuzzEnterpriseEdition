import {execFileSync} from 'node:child_process';
import {readFile,writeFile,rm} from 'node:fs/promises';
const release=JSON.parse(await readFile('dist/release.json','utf8'));
execFileSync('mvn',['-q','-f','server/pom.xml','dependency:build-classpath','-Dmdep.outputFile=target/classpath.txt'],{stdio:'inherit'});
await rm('validation/e2e-summary.json',{force:true});
if(process.env.SLOPBUZZ_BROWSER_CONTAINER)await(await import('./e2e-isolated.ts')).isolatedE2E();
else execFileSync('pnpm',['exec','playwright','test'],{stdio:'inherit'});
const {stats}=JSON.parse(await readFile('validation/e2e.json','utf8'));
await writeFile('validation/e2e-summary.json',JSON.stringify({...release,status:'PASSED',stats},null,2));
