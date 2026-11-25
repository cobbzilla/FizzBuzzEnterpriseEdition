import {Miniflare} from 'miniflare';
import {build} from 'esbuild';
import {readFile,readdir} from 'node:fs/promises';
import type {LeaderboardDatabase} from '../deploy/d1.ts';
import {highScores,type HighScoresEnv} from '../deploy/high-scores.ts';

/** One disposable workerd/D1 instance; callers must await dispose in finally. */
export async function localLeaderboard(persist=false){
 const compiled=await build({entryPoints:['deploy/b2-worker.ts'],bundle:true,format:'esm',write:false,target:'es2022'});
 const mf=new Miniflare({modules:true,script:compiled.outputFiles[0].text,compatibilityDate:'2026-07-30',d1Databases:{HIGH_SCORES:'high-scores-local'},...(persist?{d1Persist:'tmp/high-scores-d1'}:{}),bindings:{B2_ORIGIN:'https://invalid.example/',HIGH_SCORES_ENABLED:'true',TURNSTILE_SITEKEY:'1x00000000000000000000AA',TURNSTILE_SECRET:'local-only'}});
 try{
  const db=await mf.getD1Database('HIGH_SCORES');
  for(const file of (await readdir('deploy/migrations')).filter(n=>n.endsWith('.sql')).sort()){const sql=await readFile('deploy/migrations/'+file,'utf8');await db.batch(sql.split(';').filter(s=>s.trim()).map(s=>db.prepare(s)));}
  const env:HighScoresEnv={HIGH_SCORES:db as unknown as LeaderboardDatabase,HIGH_SCORES_ENABLED:'true',TURNSTILE_SITEKEY:'1x00000000000000000000AA',TURNSTILE_SECRET:'local-only'};
  return {mf,db,env,dispatch:(request:Request,send:typeof fetch=fetch)=>highScores(request,env,send),dispose:()=>mf.dispose()};
 }catch(error){await mf.dispose();throw error;}
}
