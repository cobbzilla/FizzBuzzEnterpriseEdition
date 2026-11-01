import {test,expect} from '@playwright/test';
import {spawn} from 'node:child_process';
import {readFile,mkdtemp,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {tmpdir} from 'node:os';
test('generated TypeScript interface runs against the optional Spring JVM server',async({page})=>{
  const directory=await mkdtemp(`${tmpdir()}/slopbuzz-server-ui-`);
  const classpath=[resolve('server/target/classes'),resolve('core/target/classes'),(await readFile('server/target/classpath.txt','utf8')).trim()].join(':');
  const child=spawn('java',['-cp',classpath,'com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http.HttpMain'],{env:{...process.env,PORT:'0',SLOPBUZZ_REDIS_HOST:'',SLOPBUZZ_AUDIT_JDBC_URL:`jdbc:h2:file:${directory}/audit;DB_CLOSE_DELAY=-1`},stdio:'pipe'});
  try {
    const port=await new Promise<string>((resolve,reject)=>{child.stdout.on('data',data=>{const match=String(data).match(/SLOPBUZZ_LISTENING=(\d+)/);if(match)resolve(match[1]);});child.once('exit',code=>reject(new Error(`Server exited ${code}`)));child.once('error',reject);});
    await page.goto(`http://127.0.0.1:${port}/demo/`);await expect(page.locator('#health-value')).toHaveText('LIVE');
    await page.selectOption('#display-speed','0');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete');await expect(page.locator('#cache-result')).toHaveText('BYPASS');
    await expect(page.locator('#personnel-verdict')).toHaveText('Approved to start at 1');
    await page.selectOption('#precedent-scenario','lowercase-fizz');await page.click('#precedent-submit');await expect(page.locator('#precedent-status')).toContainText('Reuse rejected by Independent Lexical Bench');
    await page.click('[data-personnel-scenario="zero"]');await expect(page.locator('#personnel-verdict')).toHaveText('Application rejected');
    await page.fill('#limit','1001');await page.click('#run-button');await expect(page.locator('#run-status')).toContainText('Mandate complete. 1001 lines disclosed');
    await page.goto(`http://127.0.0.1:${port}/#operations`);
    await page.click('#procurement-button');await expect(page.locator('#procurement-status')).toContainText('8 separate line items');
    await page.click('#recovery-button');await expect(page.locator('#recovery-value')).toHaveText('COPY MATCHED');
    await page.goto(`http://127.0.0.1:${port}/api/`);await expect(page.locator('#api-total')).toContainText('ratified operations');
    for(const route of ['company-history','accessibility','validation','response']) {
      await page.goto(`http://127.0.0.1:${port}/${route}/`);
      await expect(page.getByRole('navigation',{name:'Primary navigation'})).toContainText('Company History');
      await expect(page.locator('main h1')).toHaveCount(1);
    }
    await expect(page.locator('#response-status')).toContainText('Response received');
  } finally {await new Promise<void>(resolve=>{child.once('exit',()=>resolve());if(child.exitCode!==null)resolve();else child.kill();});await rm(directory,{recursive:true,force:true});}
});
