import {proxyIntake} from '../deploy/intake-proxy.ts';
import {highScoreCSP} from '../deploy/high-scores.ts';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
export function createStaticServer(directory='dist',base='/',configOverride?: Record<string,unknown>,scores?:(request:Request)=>Promise<Response>) {
const root=resolve(directory);
const types:Record<string,string>={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.wasm':'application/wasm','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.md':'text/markdown'};
return createServer(async(req,res)=>{
  try {
    const url=new URL(req.url!,`http://${req.headers.host||'localhost'}`);
    if(url.pathname.startsWith('/intake/')||url.pathname==='/api/high-scores'||url.pathname.startsWith('/api/high-scores/')) {
      const headers=new Headers();for(const [name,value] of Object.entries(req.headers))if(value)headers.set(name,Array.isArray(value)?value.join(','):value);
      const chunks:Buffer[]=[];for await(const chunk of req)chunks.push(Buffer.from(chunk));
      const request=new Request(url,{method:req.method,headers,...(!['GET','HEAD'].includes(req.method||'GET')?{body:Buffer.concat(chunks)}:{})});
      const response=url.pathname.startsWith('/intake/')?await proxyIntake(request,fetch,req.socket.remoteAddress):scores?await scores(request):Response.json({participating:false,name:'',entry:null,entries:[],total:0,offset:0,limit:50,cutoff:null,enabled:false,sitekey:'',asOf:new Date().toISOString()},{headers:{'Cache-Control':'no-store'}});
      res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));return;
    }
    if(!url.pathname.startsWith(base)) {res.writeHead(404);res.end();return;}
    let path=resolve(root,decodeURIComponent(url.pathname.slice(base.length)));
    if(path!==root&&!path.startsWith(root+'/')) {res.writeHead(403);res.end();return;}
    if((await stat(path)).isDirectory()) {
      if(!url.pathname.endsWith('/')) {res.writeHead(308,{Location:url.pathname+'/'+url.search});res.end();return;}
      path+='/index.html';
    }
    let data=await readFile(path);
    if(path.endsWith('/runtime-config.json') && configOverride) data=Buffer.from(JSON.stringify({...JSON.parse(data.toString()),...configOverride}));
    const fullDocument=/\/full-reset\/(?:index\.html)?$/.test(url.pathname)&&req.method==='GET'&&req.headers['sec-fetch-mode']==='navigate'&&req.headers['sec-fetch-dest']==='document'&&!req.headers['sec-purpose']&&!req.headers.purpose;
    res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream','Cache-Control':/^(?:full-)?reset\//.test(url.pathname.slice(base.length))?'no-store':'no-cache',...(fullDocument?{'Clear-Site-Data':'"cache", "cookies"'}:{}),'X-Content-Type-Options':'nosniff','Content-Security-Policy':(path.endsWith('/runtime-worker.js') ? "default-src 'self'; script-src 'self' 'unsafe-eval'; connect-src 'self'" : highScoreCSP)});
    res.end(req.method==='HEAD'?undefined:data);
  } catch {res.writeHead(404);res.end('Unknown desk\n');}
});
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
 const port=Number(process.env.PORT||18090);const base=process.env.SLOPBUZZ_BASE_PATH||'/';
 createStaticServer(process.env.SLOPBUZZ_STATIC_DIR||'dist',base).listen(port,'127.0.0.1',()=>console.log(`Static preview: http://localhost:${port}${base}`));
}
