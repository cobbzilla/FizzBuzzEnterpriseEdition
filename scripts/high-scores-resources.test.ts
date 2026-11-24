import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ensureHighScores} from './high-scores-resources.ts';
import type {CloudflareCall} from './cloudflare-api.ts';
function api(){
 const calls:{path:string;method:string;body:any}[]=[],migrations=new Map<string,string>();let exists=false,widget=false;
 const cf:CloudflareCall=async(path,method='GET',body:any)=>{
  calls.push({path,method,body});
  if(path.includes('/d1/database?'))return exists?[{uuid:'database-id',name:'test-worker-scores'}]:[];
  if(path.endsWith('/d1/database')&&method==='POST'){exists=true;return {uuid:'database-id'};}
  if(path.endsWith('/query')){if(body.sql.startsWith('SELECT checksum'))return [{success:true,results:migrations.has(body.params[0])?[{checksum:migrations.get(body.params[0])}]:[]}];if(body.sql.startsWith('INSERT INTO leaderboard_migrations'))migrations.set(body.params[0],body.params[2]);return [{success:true,results:[]}];}
  if(path.endsWith('/challenges/widgets')&&method==='GET')return widget?[{name:'test-worker high scores',sitekey:'public-sitekey'}]:[];
  if(path.includes('/challenges/widgets')){widget=true;return {domains:['scores.example'],sitekey:'public-sitekey',secret:'private-secret'};}
  throw Error('Unexpected cloud operation');
 };return {cf,calls,migrations};
}
test('resource setup is repeatable, preserves database identity and keeps the secret out of public bindings',async()=>{
 const a=api(),first=await ensureHighScores(a.cf,'/accounts/test','test-worker','scores.example',true),second=await ensureHighScores(a.cf,'/accounts/test','test-worker','scores.example',false);
 assert.equal(first.database,second.database);assert.equal(a.calls.filter(c=>c.path.endsWith('/d1/database')&&c.method==='POST').length,1);assert.equal(a.calls.filter(c=>c.path.endsWith('/challenges/widgets')&&c.method==='POST').length,1);
 assert.equal(first.bindings.find(b=>b.name==='TURNSTILE_SECRET')?.type,'secret_text');const flag=second.bindings.find(b=>b.name==='HIGH_SCORES_ENABLED');assert.equal(flag&&'text'in flag?flag.text:undefined,'false');assert.equal(first.bindings.filter(b=>b.type==='ratelimit').length,3);
 a.migrations.set('0001-high-scores.sql','tampered');await assert.rejects(()=>ensureHighScores(a.cf,'/accounts/test','test-worker','scores.example',true),/migration was changed/);
});
