import {readFile} from 'node:fs/promises';
import {parseEnv} from 'node:util';
export type CloudflareCall=(path:string,method?:string,body?:unknown)=>Promise<any>;
export async function publishingEnvironment(){
 let source:string;try{source=await readFile('.b2.env','utf8');}catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;source=await readFile('.env.b2','utf8');}
 return {...parseEnv(source),...process.env};
}
export function cloudflareClient(token:string):CloudflareCall {
 return async(path,method='GET',body)=>{
  const response=await fetch('https://api.cloudflare.com/client/v4'+path,{method,headers:{Authorization:`Bearer ${token}`,...(body instanceof FormData?{}:{'Content-Type':'application/json'})},body:body instanceof FormData?body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(60000)});
  const data=await response.json();if(!response.ok||!data.success)throw Error(`Cloudflare ${method} failed: HTTP ${response.status}; codes ${data.errors?.map((e:{code:number})=>e.code).join(',')||'unknown'}. Check the account-scoped token permissions.`);
  return data.result;
 };
}
