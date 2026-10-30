import {readFile} from 'node:fs/promises';
import {parseEnv} from 'node:util';
const env=parseEnv(await readFile(process.env.SLOPBUZZ_POSTHOG_ENV_FILE||'tmp/.env.posthog','utf8'));
const base=`https://us.posthog.com/api/projects/${env.POSTHOG_PROJECT_ID}`;
const apply=process.argv.includes('--apply');
async function api(path:string,method='GET',body?:unknown):Promise<any>{
 const response=await fetch(base+path,{method,headers:{Authorization:`Bearer ${env.POSTHOG_API_KEY}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});
 if(!response.ok)throw new Error(`PostHog ${method} ${path}: HTTP ${response.status}`);
 return response.json();
}
const filter=[{key:'application',value:'slopbuzz',operator:'exact',type:'event'},{key:'environment',value:'production',operator:'exact',type:'event'}];
function trend(event:string,math='total',breakdown?:string,property?:string){return {kind:'InsightVizNode',source:{kind:'TrendsQuery',dateRange:{date_from:'-30d'},interval:'day',series:[{kind:'EventsNode',event,math,...(property?{math_property:property}:{})}],properties:filter,trendsFilter:{display:breakdown?'ActionsTable':'ActionsLineGraph'},...(breakdown?{breakdownFilter:{breakdown,breakdown_type:'event'}}:{})}};}
const boards=[
 {key:'traffic',name:'Stakeholder Traffic & Market Presence',tiles:[
 ['Pageviews',trend('$pageview')],['Daily estimated visitors',trend('$pageview','dau')],['Sessions',trend('$pageview','unique_session')],
 ['Popular pages',trend('$pageview','total','$pathname')],['Referring domains',trend('$pageview','total','$referring_domain')],['Campaigns',trend('$pageview','total','utm_campaign')],['Browsers',trend('$pageview','total','$browser')],['Devices',trend('$pageview','total','$device_type')]]},
 {key:'engagement',name:'Numerical Engagement & Demonstration Yield',tiles:[
 ['Daily demo runs',trend('slopbuzz_demo_run')],['Demo outcomes',trend('slopbuzz_demo_run','total','outcome')],['Mean response milliseconds',trend('slopbuzz_demo_run','avg',undefined,'duration_ms')],['Cache outcomes',trend('slopbuzz_demo_run','total','cache_outcome')],['API requests',trend('slopbuzz_api_request')],['Popular API endpoints',trend('slopbuzz_api_request','total','endpoint')],['API outcomes',trend('slopbuzz_api_request','total','outcome')]]}
];
async function list(path:string){let result:any[]=[];let next:string|null=path;while(next){const r=await api(next);result.push(...r.results);next=r.next?new URL(r.next).pathname.replace(new URL(base).pathname,'')+new URL(r.next).search:null;}return result;}
const dashboards=await list('/dashboards/?limit=100');const insights=await list('/insights/?limit=100');
if(apply)await api('/','PATCH',{cookieless_server_hash_mode:2});
for(const board of boards){
 const marker=`slopbuzz-analytics-v1:${board.key}`;
 let dashboard=dashboards.find(d=>d.description?.startsWith(marker)&&!d.deleted);
 const payload={name:board.name,description:`${marker}\nProduction only. Daily visitor estimates are not cross-day unique people. Cookieless analytics does not provide geographic reporting.`,tags:['slopbuzz-analytics-v1']};
 if(apply)dashboard=await api(dashboard?`/dashboards/${dashboard.id}/`:'/dashboards/',dashboard?'PATCH':'POST',payload);
 for(const [name,query] of board.tiles){
  const id=`${marker}:${name}`;const previous=insights.find(i=>i.description===id&&!i.deleted);
  if(apply)await api(previous?`/insights/${previous.id}/`:'/insights/',previous?'PATCH':'POST',{name,description:id,query,dashboards:[dashboard.id],tags:['slopbuzz-analytics-v1']});
 }
 console.log(`${apply?'Configured':'Would configure'} ${board.name}${dashboard?`: https://us.posthog.com/project/${env.POSTHOG_PROJECT_ID}/dashboard/${dashboard.id}`:''}`);
}
