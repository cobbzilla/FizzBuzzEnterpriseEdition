import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile,stat,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {parseEnv} from 'node:util';
import {prepareScoreSecrets,verifyResendDomain} from './high-scores-secrets.ts';

test('credential provisioning generates private files once and preserves existing secrets',async()=>{
 const cwd=process.cwd(),folder=await mkdtemp(join(tmpdir(),'scoreboard-secrets-'));
 try{process.chdir(folder);await writeFile('.env.resend','RESEND_API_KEY=test-not-a-provider-key\n');const cf=async()=>[];
  const first=await prepareScoreSecrets(cf,'/accounts/test','worker');const file=await readFile('.env.high-scores-admin','utf8'),settings=parseEnv(file);
  assert.equal(settings.HIGH_SCORES_ADMIN_USERNAME,'admin');assert.equal(settings.HIGH_SCORES_ADMIN_PASSWORD!.length,43);assert.equal((await stat('.env.high-scores-admin')).mode&0o777,0o600);
  assert.ok(first.bindings.every(b=>b.type==='secret_text'));const second=await prepareScoreSecrets(cf,'/accounts/test','worker');assert.equal(second.values.HIGH_SCORES_ADMIN_PASSWORD,first.values.HIGH_SCORES_ADMIN_PASSWORD);
  await rm('.env.high-scores-admin');await rm('.env.resend');const existing=async()=>['HIGH_SCORES_ADMIN_USERNAME','HIGH_SCORES_ADMIN_PASSWORD','RESEND_API_KEY'].map(name=>({name}));assert.deepEqual((await prepareScoreSecrets(existing,'/accounts/test','worker')).bindings,[]);
  await assert.rejects(()=>prepareScoreSecrets(cf,'/accounts/test','worker',true),/Configure/);
 }finally{process.chdir(cwd);await rm(folder,{recursive:true,force:true});}
});

test('Resend preflight accepts a verified domain or sending-only key and rejects invalid configuration',async()=>{
 await verifyResendDomain('test',async()=>Response.json({data:[{name:'glovebox.tools',status:'verified'}]}));
 await verifyResendDomain('test',async()=>Response.json({name:'restricted_api_key'},{status:401}));
 await assert.rejects(()=>verifyResendDomain('test',async()=>Response.json({name:'validation_error'},{status:401})),/HTTP 401/);
 await assert.rejects(()=>verifyResendDomain('test',async()=>Response.json({data:[{name:'glovebox.tools',status:'pending'}]})),/Verify glovebox/);
});
