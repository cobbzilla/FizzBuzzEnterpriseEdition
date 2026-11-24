import {readFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import type {CloudflareCall} from './cloudflare-api.ts';
export async function scoreDatabase(cf:CloudflareCall,account:string,worker:string,create=false):Promise<string>{
 const name=worker+'-scores',databases=await cf(account+'/d1/database?name='+encodeURIComponent(name));
 const existing=databases.find((d:{name:string})=>d.name===name);if(existing)return existing.uuid;
 if(!create)throw Error('The high-score database has not been provisioned.');
 const database=await cf(account+'/d1/database','POST',{name});return database.uuid;
}
export async function scoreQuery(cf:CloudflareCall,account:string,id:string,sql:string,params:(string|number)[]=[]){
 const results=await cf(`${account}/d1/database/${id}/query`,'POST',{sql,params});
 if(!Array.isArray(results)||results.some(r=>r.success!==true))throw Error('A high-score database operation failed.');return results;
}
export async function ensureHighScores(cf:CloudflareCall,account:string,worker:string,hostname:string,enabled:boolean){
 const database=await scoreDatabase(cf,account,worker,true);
 await scoreQuery(cf,account,database,'CREATE TABLE IF NOT EXISTS leaderboard_migrations (name TEXT PRIMARY KEY, applied_ms INTEGER NOT NULL, checksum TEXT NOT NULL) STRICT');
 for(const name of (await readdir('deploy/migrations')).filter(n=>/^\d+-[a-z0-9-]+\.sql$/.test(n)).sort()){
  const sql=await readFile('deploy/migrations/'+name,'utf8'),checksum=createHash('sha256').update(sql).digest('hex');
  const prior=(await scoreQuery(cf,account,database,'SELECT checksum FROM leaderboard_migrations WHERE name=?1',[name]))[0].results;
  if(prior.length){if(prior[0].checksum!==checksum)throw Error('An applied high-score migration was changed: '+name);continue;}
  // Each migration is idempotent; record its checksum only after all its statements succeed.
  await scoreQuery(cf,account,database,sql);
  await scoreQuery(cf,account,database,'INSERT INTO leaderboard_migrations(name,applied_ms,checksum) VALUES(?1,?2,?3)',[name,Date.now(),checksum]);
 }
 const widgets=await cf(account+'/challenges/widgets'),name=worker+' high scores';
 const existing=widgets.find((w:{name:string})=>w.name===name);
 const widget=existing?await cf(account+'/challenges/widgets/'+existing.sitekey):await cf(account+'/challenges/widgets','POST',{name,domains:[hostname],mode:'managed',clearance_level:'no_clearance'});
 if(!widget.domains?.includes(hostname)||!widget.sitekey||!widget.secret)throw Error('The high-score Turnstile widget must belong to this public hostname and expose its secret to the publisher.');
 return {database,secret:widget.secret,bindings:[
  {type:'d1',name:'HIGH_SCORES',id:database},
  {type:'plain_text',name:'HIGH_SCORES_ENABLED',text:String(enabled)},
  {type:'plain_text',name:'TURNSTILE_SITEKEY',text:widget.sitekey},
  {type:'secret_text',name:'TURNSTILE_SECRET',text:widget.secret},
  ...[{name:'SCORES_READ_LIMIT',limit:240},{name:'SCORES_WRITE_LIMIT',limit:120},{name:'SCORES_ENROLL_LIMIT',limit:5}].map(({name,limit})=>({type:'ratelimit',name,namespace_id:String(createHash('sha256').update(worker+':'+name).digest().readUInt32BE(0)||1),simple:{limit,period:60}}))
 ]};
}
