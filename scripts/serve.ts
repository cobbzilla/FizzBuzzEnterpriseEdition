import {proxyIntake} from '../deploy/intake-proxy.ts';
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
export function createStaticServer(directory='dist',base='/',configOverride?: Record<string,unknown>) {
const root=resolve(directory);
const types:Record<string,string>={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.wasm':'application/wasm','.svg':'image/svg+xml','.md':'text/markdown'};
return createServer(async(req,res)=>{
  try {
    const url=new URL(req.url!,`http://${req.headers.host||'localhost'}`);
    if(url.pathname.startsWith('/intake/')) {
      const headers=new Headers();for(const [name,value] of Object.entries(req.headers))if(value)headers.set(name,Array.isArray(value)?value.join(','):value);
      const chunks:Buffer[]=[];for await(const chunk of req)chunks.push(Buffer.from(chunk));
      const request=new Request(url,{method:req.method,headers,...(!['GET','HEAD'].includes(req.method||'GET')?{body:Buffer.concat(chunks)}:{})});
      const response=await proxyIntake(request,fetch,req.socket.remoteAddress);
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
    res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Content-Security-Policy':(path.endsWith('/runtime-worker.js') ? "default-src 'self'; script-src 'self' 'unsafe-eval'; connect-src 'self'" : "default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self'; img-src 'self' data:; connect-src 'self'; worker-src 'self'; base-uri 'none'; frame-ancestors 'none'")});
    res.end(req.method==='HEAD'?undefined:data);
  } catch {res.writeHead(404);res.end('Unknown desk\n');}
});
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
 const port=Number(process.env.PORT||18090);const base=process.env.SLOPBUZZ_BASE_PATH||'/';
 createStaticServer(process.env.SLOPBUZZ_STATIC_DIR||'dist',base).listen(port,'127.0.0.1',()=>console.log(`Static preview: http://localhost:${port}${base}`));
}
