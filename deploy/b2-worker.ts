import {proxyIntake} from './intake-proxy.ts';
export interface Env {B2_ORIGIN:string}
export async function serve(request:Request,env:Env,fetchOrigin:typeof fetch=fetch):Promise<Response>{
 const url=new URL(request.url);
 if(url.protocol!=='https:'){url.protocol='https:';return Response.redirect(url.href,308);}
 if(url.pathname.startsWith('/intake/'))return proxyIntake(request,fetchOrigin,request.headers.get('CF-Connecting-IP')||undefined);
 if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405,headers:{Allow:'GET, HEAD'}});
 let path:string;try{path=decodeURIComponent(url.pathname);}catch{return new Response('Invalid path',{status:400});}
 if(path.startsWith('//')||path.split('/').some(p=>p==='..'||p==='.'||p.includes('\\')||p.includes('\0')))return new Response('Invalid path',{status:400});
 if(!path.endsWith('/')&&!path.split('/').pop()!.includes('.')){url.pathname+='/';return Response.redirect(url.href,308);}
 if(path.endsWith('/'))path+='index.html';
 const target=new URL(path.slice(1).split('/').map(encodeURIComponent).join('/'),env.B2_ORIGIN);
 if(!target.href.startsWith(env.B2_ORIGIN))return new Response('Invalid path',{status:400});
 const immutable=/^\/assets\/[a-f0-9]{16}\//.test(path);
 const headers=new Headers();for(const name of ['range','if-none-match','if-modified-since']){const value=request.headers.get(name);if(value)headers.set(name,value);}
 let upstream:Response;
 // Workers supports manual/follow redirects, and only nonnegative cacheTtl.
 // Mutable objects must bypass edge storage rather than receive a negative TTL.
 try{upstream=await fetchOrigin(target,{method:request.method,headers,redirect:'manual',...(immutable?{cf:{cacheTtl:31536000}}:{cache:'no-store'})} as RequestInit);}catch{return new Response('Origin temporarily unavailable',{status:502});}
 if(!upstream.ok&&upstream.status!==304)return new Response(upstream.status===404?'Not found':'Origin unavailable',{status:upstream.status===404?404:502});
 const result=new Headers();for(const name of ['content-type','content-length','etag','last-modified','content-range','accept-ranges']){const value=upstream.headers.get(name);if(value)result.set(name,value);}
 result.set('Cache-Control',immutable?'public, max-age=31536000, immutable':'no-cache');
 result.set('X-Content-Type-Options','nosniff');result.set('Referrer-Policy','strict-origin-when-cross-origin');
 result.set('Content-Security-Policy',path.endsWith('/runtime-worker.js')?"default-src 'self'; script-src 'self' 'unsafe-eval'; connect-src 'self'":"default-src 'self'; script-src 'self' 'wasm-unsafe-eval'; style-src 'self'; img-src 'self' data:; connect-src 'self'; worker-src 'self'; base-uri 'none'; frame-ancestors 'none'");
 return new Response(request.method==='HEAD'?null:upstream.body,{status:upstream.status,headers:result});
}
export default {fetch:(request:Request,env:Env)=>serve(request,env)};
