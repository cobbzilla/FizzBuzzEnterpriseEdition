import type {HighScoresEnv} from './high-scores.ts';
import {LeaderboardStore} from './leaderboard-store.ts';
import {anonymousName,isScoreboard,scoreboards} from '../web/scoreboards.ts';
import {leaderboardName} from '../web/leaderboard-model.ts';
import {matchName,normalizeName} from './name-moderation.ts';
import {adminApplication} from '../web/high-scores-admin.ts';
const prefix='/admin/high-scores/';
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','X-Robots-Tag':'noindex, nofollow','Content-Security-Policy':"default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'"};
const json=(body:unknown,status=200)=>Response.json(body,{status,headers});
async function authenticated(request:Request,env:HighScoresEnv){
 const authorization=request.headers.get('Authorization')||'';if(!/^Basic [A-Za-z0-9+/]+=*$/i.test(authorization)||authorization.length>4096)return false;
 try{const bytes=Uint8Array.from(atob(authorization.slice(6)),c=>c.charCodeAt(0)),encoder=new TextEncoder();
  const key=await crypto.subtle.importKey('raw',encoder.encode(env.HIGH_SCORES_ADMIN_PASSWORD!),{name:'HMAC',hash:'SHA-256'},false,['sign','verify']);
  const signature=await crypto.subtle.sign('HMAC',key,encoder.encode(env.HIGH_SCORES_ADMIN_USERNAME+':'+env.HIGH_SCORES_ADMIN_PASSWORD));
  return crypto.subtle.verify('HMAC',key,signature,bytes);
 }catch{return false;}
}
export async function scoreAdmin(request:Request,env:HighScoresEnv,now=Date.now):Promise<Response>{
 if(!env.HIGH_SCORES_ADMIN_USERNAME||!env.HIGH_SCORES_ADMIN_PASSWORD)return json({error:'Administration credentials are not configured.'},503);
 if(!await authenticated(request,env)){
  if(env.SCORES_ADMIN_LIMIT&&!await env.SCORES_ADMIN_LIMIT.limit({key:request.headers.get('CF-Connecting-IP')||'local-preview'}).then(r=>r.success))return json({error:'Too many authentication attempts.'},429);
  return new Response('Administrator authentication required',{status:401,headers:{...headers,'WWW-Authenticate':'Basic realm="FizzBuzz score administration", charset="UTF-8"'}});
 }
 const url=new URL(request.url),path=url.pathname.slice(prefix.length);
 if(url.pathname===prefix.slice(0,-1))return new Response(null,{status:308,headers:{...headers,Location:prefix}});
 if(!url.pathname.startsWith(prefix))return json({error:'Not found'},404);
 if(!['GET','HEAD'].includes(request.method)&&(request.headers.get('Origin')!==url.origin||request.headers.get('Sec-Fetch-Site')==='cross-site'||request.headers.get('X-Scoreboard-Admin')!=='1'||!request.headers.get('Content-Type')?.startsWith('application/json')))return json({error:'A same-origin administrative request is required.'},403);
 if(path==='app.js'&&request.method==='GET')return new Response(`(${adminApplication.toString()})();`,{headers:{...headers,'Content-Type':'text/javascript; charset=utf-8'}});
 if(path==='style.css'&&request.method==='GET')return new Response('body{font:16px system-ui;margin:2rem;color:#173333;background:#f6faf7}main{max-width:80rem;margin:auto}button,input{font:inherit;min-height:44px;padding:.4rem .7rem;margin:.2rem}button{cursor:pointer}button[aria-pressed=true]{background:#173333;color:white}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:.6rem;border-bottom:1px solid #ccd}pre{white-space:pre-wrap;overflow-wrap:anywhere}section{margin-block:2rem}.scroll{overflow:auto}button:focus-visible,input:focus-visible{outline:3px solid #386c19;outline-offset:2px}@media(max-width:600px){body{margin:.7rem}}',{headers:{...headers,'Content-Type':'text/css'}});
 if(path===''&&request.method==='GET')return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Scoreboard administration</title><link rel="stylesheet" href="${prefix}style.css"><script src="${prefix}app.js" defer></script></head><body><main id="admin"><h1>Scoreboard administration</h1><p>Name bans preserve scores and hide names. Deletion removes a browser’s scores and blocks its credential.</p><nav aria-label="Scoreboards">${scoreboards.map((b,i)=>`<button data-board="${b.id}" aria-pressed="${i===0}">${b.label}</button>`).join('')}</nav><p id="status" role="status"></p><div class="scroll"><table><thead><tr><th>Rank</th><th>Public name</th><th>Submitted name</th><th>Points</th><th>Actions</th></tr></thead><tbody id="rows"></tbody></table></div><button id="previous">Previous 50</button><button id="next">Next 50</button><section><h2>Find a browser entry</h2><form id="search-form"><label for="search-name">Name</label><input id="search-name" maxlength="24"><button>Search</button></form><div id="search-results"></div></section><section><h2>Name bans</h2><form id="ban-form"><label for="ban-name">Name to test or ban</label><input id="ban-name" maxlength="24" required pattern="[A-Za-z0-9 _\\-]+"><button type="button" id="test-name">Preview matches</button><button>Ban name and variants</button></form><pre id="preview"></pre><ul id="bans"></ul></section><section><h2>Recent moderation and email delivery</h2><pre id="events"></pre></section><a href="/high-scores/">Public scoreboards</a></main></body></html>`,{headers:{...headers,'Content-Type':'text/html; charset=utf-8'}});
 if(!env.HIGH_SCORES)return json({error:'Score storage is unavailable.'},503);
 const db=env.HIGH_SCORES.withSession('first-primary'),store=new LeaderboardStore(db,now);
 try{
  if(path==='api/boards'&&request.method==='GET'){
   const board=url.searchParams.get('board')||'daily',offset=Number(url.searchParams.get('offset')||0);if(!isScoreboard(board)||!Number.isInteger(offset)||offset<0||offset>950)return json({error:'Invalid board or page.'},400);
   const page=await store.list(offset,50,board,true);const bans=await store.bans();return json({...page,entries:page.entries.map(e=>({...e,name:matchName(e.submittedName!,bans)?anonymousName:e.name}))});
  }
  if(path==='api/search'&&request.method==='GET'){const q=(url.searchParams.get('q')||'').slice(0,24);return json({people:(await db.prepare('SELECT id,name,blocked FROM leaderboard_people WHERE instr(lower(name),lower(?1))>0 ORDER BY created_ms DESC LIMIT 100').bind(q).all()).results});}
  if(path==='api/moderation'&&request.method==='GET')return json({bans:await store.bans(),notifications:(await db.prepare('SELECT id,owner_id,run_id,state,attempts,created_ms,resend_id,error FROM leaderboard_notifications ORDER BY created_ms DESC LIMIT 50').all()).results,actions:(await db.prepare('SELECT * FROM leaderboard_admin_audit ORDER BY created_ms DESC LIMIT 50').all()).results});
  if(/^api\/people\/[a-f0-9-]{36}$/.test(path)&&request.method==='DELETE'){await store.withdraw(path.split('/')[2]);return json({deleted:true});}
  if(/^api\/bans\/[a-f0-9-]{36}$/.test(path)&&request.method==='DELETE'){
   const id=path.split('/')[2];await db.batch([db.prepare('DELETE FROM leaderboard_name_bans WHERE id=?1').bind(id),db.prepare('UPDATE leaderboard_moderation_version SET version=version+1 WHERE id=1'),db.prepare('INSERT INTO leaderboard_admin_audit VALUES(?1,?2,?3,?4)').bind(crypto.randomUUID(),'unban-name',id,now())]);return json({removed:true});
  }
  if(['api/bans','api/preview'].includes(path)&&request.method==='POST'){
   const reader=request.body?.getReader();let encoded='';if(reader){const decoder=new TextDecoder();for(;;){const chunk=await reader.read();if(chunk.done)break;encoded+=decoder.decode(chunk.value,{stream:true});if(encoded.length>2048){await reader.cancel();return json({error:'Request is too large.'},413);}}}
   let data:{name?:unknown};try{data=JSON.parse(encoded);}catch{return json({error:'Invalid JSON.'},400);}
   const name=leaderboardName(data.name);if(normalizeName(name)===normalizeName(anonymousName))return json({error:'The system anonymous placeholder cannot be banned.'},400);
   if(path==='api/preview'){
    const people=(await db.prepare('SELECT id,name FROM leaderboard_people WHERE blocked=0').all<{id:string;name:string}>()).results;
    return json({matchesExistingBan:matchName(name,await store.bans()),affected:people.flatMap(p=>{const match=matchName(p.name,[{id:'preview',name,created_ms:now()}]);return match?[{...p,distance:match.distance}]:[]})});
   }
   await db.batch([db.prepare('INSERT OR IGNORE INTO leaderboard_name_bans VALUES(?1,?2,?3)').bind(crypto.randomUUID(),name,now()),db.prepare('UPDATE leaderboard_moderation_version SET version=version+1 WHERE id=1'),db.prepare('INSERT INTO leaderboard_admin_audit VALUES(?1,?2,?3,?4)').bind(crypto.randomUUID(),'ban-name',name,now())]);return json({banned:true});
  }
  return json({error:'Unknown administrative operation.'},404);
 }catch(error){return json({error:error instanceof Error&&/^(Use 1–24|Enter a name)/.test(error.message)?error.message:'Administration request failed.'},400);}
}
