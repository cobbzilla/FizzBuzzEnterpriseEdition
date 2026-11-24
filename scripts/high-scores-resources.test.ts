import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ensureHighScores} from './high-scores-resources.ts';
import type {CloudflareCall} from './cloudflare-api.ts';
function api(mode?:'managed'|'invisible',domains=['scores.example']){
 const calls:{path:string;method:string;body:any}[]=[],migrations=new Map<string,string>();let exists=false,widget=mode?{name:'test-worker high scores',mode,domains,clearance_level:'no_clearance',bot_fight_mode:false,sitekey:'public-sitekey',secret:'private-secret'}:undefined;
 const cf:CloudflareCall=async(path,method='GET',body:any)=>{
  calls.push({path,method,body});
  if(path.includes('/d1/database?'))return exists?[{uuid:'database-id',name:'test-worker-scores'}]:[];
  if(path.endsWith('/d1/database')&&method==='POST'){exists=true;return {uuid:'database-id'};}
  if(path.endsWith('/query')){if(body.sql.startsWith('SELECT checksum'))return [{success:true,results:migrations.has(body.params[0])?[{checksum:migrations.get(body.params[0])}]:[]}];if(body.sql.startsWith('INSERT INTO leaderboard_migrations'))migrations.set(body.params[0],body.params[2]);return [{success:true,results:[]}];}
  if(path.endsWith('/challenges/widgets')&&method==='GET')return widget?[{name:'test-worker high scores',sitekey:'public-sitekey'}]:[];
  if(path.includes('/challenges/widgets')){if(method==='POST'||method==='PUT')widget={...widget,...body,sitekey:'public-sitekey',secret:'private-secret'};return widget;}
  throw Error('Unexpected cloud operation');
 };return {cf,calls,migrations};
}
test('resource setup is repeatable, preserves database identity and keeps the secret out of public bindings',async()=>{
 const a=api(),first=await ensureHighScores(a.cf,'/accounts/test','test-worker','scores.example',true),second=await ensureHighScores(a.cf,'/accounts/test','test-worker','scores.example',false);
 assert.equal(first.database,second.database);assert.equal(a.calls.filter(c=>c.path.endsWith('/d1/database')&&c.method==='POST').length,1);assert.equal(a.calls.filter(c=>c.path.endsWith('/challenges/widgets')&&c.method==='POST').length,1);
 assert.equal(a.calls.find(c=>c.path.endsWith('/challenges/widgets')&&c.method==='POST')?.body.mode,'invisible');assert.equal(a.calls.filter(c=>c.method==='PUT').length,0);
 assert.equal(first.bindings.find(b=>b.name==='TURNSTILE_SECRET')?.type,'secret_text');const flag=second.bindings.find(b=>b.name==='HIGH_SCORES_ENABLED');assert.equal(flag&&'text'in flag?flag.text:undefined,'false');assert.equal(first.bindings.filter(b=>b.type==='ratelimit').length,3);
 a.migrations.set('0001-high-scores.sql','tampered');await assert.rejects(()=>ensureHighScores(a.cf,'/accounts/test','test-worker','scores.example',true),/migration was changed/);
});
test('existing managed enrollment becomes invisible without rotating its identity or losing hostnames',async()=>{
 const a=api('managed',['scores.example','second.scores.example']);
 const first=await ensureHighScores(a.cf,'/accounts/test','test-worker','scores.example',true);
 await ensureHighScores(a.cf,'/accounts/test','test-worker','scores.example',true);
 const updates=a.calls.filter(c=>c.path.includes('/challenges/widgets')&&c.method==='PUT');assert.equal(updates.length,1);
 assert.deepEqual(updates[0].body,{name:'test-worker high scores',domains:['scores.example','second.scores.example'],mode:'invisible',clearance_level:'no_clearance',bot_fight_mode:false});
 assert.equal(first.secret,'private-secret');const sitekey=first.bindings.find(b=>b.name==='TURNSTILE_SITEKEY');assert.equal(sitekey&&'text'in sitekey?sitekey.text:undefined,'public-sitekey');
});
test('a widget belonging to another hostname is not silently changed',async()=>{
 const a=api('managed',['someone-else.example']);await assert.rejects(()=>ensureHighScores(a.cf,'/accounts/test','test-worker','scores.example',true),/must belong/);assert.equal(a.calls.filter(c=>c.method==='PUT').length,0);
});
