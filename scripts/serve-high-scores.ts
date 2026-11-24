import {createStaticServer} from './serve.ts';
import {localLeaderboard} from './high-scores-local.ts';
const local=await localLeaderboard(true);
// Local-only adapter: the real Worker never bypasses Turnstile verification.
const server=createStaticServer('dist','/',undefined,request=>local.dispatch(request,async()=>Response.json({success:true,hostname:new URL(request.url).hostname,action:'leaderboard-enroll'})));
server.listen(Number(process.env.PORT||18090),'127.0.0.1',()=>console.log('Local leaderboard preview is ready on loopback.'));
for(const signal of ['SIGINT','SIGTERM'] as const)process.on(signal,()=>{server.close(()=>void local.dispose().then(()=>{process.exitCode=0;}));server.closeAllConnections();});
