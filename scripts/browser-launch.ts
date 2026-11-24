import type {BrowserType} from '@playwright/test';
import {execFileSync} from 'node:child_process';
import {boundedContainer} from './browser-guard.ts';

/** The same browser checks can run in a locally resource-capped Playwright container. */
export const browserConnection=()=>process.env.SLOPBUZZ_BROWSER_WS_ENDPOINT?{
 wsEndpoint:process.env.SLOPBUZZ_BROWSER_WS_ENDPOINT,
 exposeNetwork:'<loopback>',timeout:30000
}:undefined;
/** Release charged browser file cache between serial parity/public phases too. */
export async function renewOwnedServer(endpoint:string){
 const name=process.env.SLOPBUZZ_BROWSER_CONTAINER;if(!name)return;
 const docker=(...args:string[])=>execFileSync('docker',args,{encoding:'utf8',timeout:15000});
 const identity=JSON.parse(docker('inspect',name))[0],id=boundedContainer(identity,endpoint);
 let clean=false;for(let i=0;i<20&&!clean;i++){clean=!/\/ms-playwright\//.test(docker('top',id,'-eo','pid,ppid,args'));if(!clean)await new Promise(r=>setTimeout(r,250));}
 if(!clean)throw Error('A prior owned browser is still running; refusing another launch');
 docker('restart','--timeout','5',id);
 const renewed=JSON.parse(docker('inspect',id))[0];boundedContainer(renewed,endpoint);
 if(JSON.stringify(renewed.NetworkSettings.Ports)!==JSON.stringify(identity.NetworkSettings.Ports))throw Error('Owned browser endpoint changed during renewal');
 let ready=false;const readinessStarted=Date.now();
 // A fresh, resource-capped server can take longer than five seconds to start.
 // Continue waiting without launching a browser or weakening ownership checks.
 for(;Date.now()-readinessStarted<30000&&!ready;){
  // Docker can accept TCP before Playwright has opened its WebSocket server.
  ready=docker('logs','--since',renewed.State.StartedAt,id).includes('Listening on ws://');
  if(!ready)await new Promise(r=>setTimeout(r,100));
 }
 if(!ready)throw Error('Renewed owned browser server did not become ready within 30 seconds');
}
export async function launchBrowser(type:BrowserType){const connection=browserConnection();if(connection){await renewOwnedServer(connection.wsEndpoint);return type.connect(connection.wsEndpoint,{exposeNetwork:connection.exposeNetwork,timeout:connection.timeout});}return type.launch();}
