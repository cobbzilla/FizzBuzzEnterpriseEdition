import posthog from 'posthog-js/dist/module.no-external';
import type {Usage} from './telemetry';
const scope = new URL('../',import.meta.url);
const allowed = new Set(['$pageview','$pageleave','slopbuzz_demo_run','slopbuzz_api_request']);
const local = ['localhost','127.0.0.1','[::1]'].includes(location.hostname);
function cleanUrl(value: unknown) {try {const u=new URL(String(value));return u.origin+u.pathname;}catch{return '';}}
async function initialize() {
 const response=await fetch(new URL('analytics-config.json',scope));
 if(!response.ok) return;
 const config=await response.json();
 if(!config.enabled || !config.token || (local&&!config.allowLocal) || navigator.doNotTrack==='1' || (navigator as Navigator & {globalPrivacyControl?:boolean}).globalPrivacyControl) return;
 const pageUrl=new URL(location.href);let active=false;
 const properties={application:'slopbuzz',environment:local?'preview':config.environment,release:config.revision,$current_url:cleanUrl(location.href),$pathname:location.pathname,$referrer:document.referrer?new URL(document.referrer).origin:'',$referring_domain:document.referrer?new URL(document.referrer).hostname:'$direct',...Object.fromEntries(['utm_source','utm_medium','utm_campaign'].filter(k=>pageUrl.searchParams.has(k)).map(k=>[k,pageUrl.searchParams.get(k)!.slice(0,150)]))};
 posthog.init(config.token,{
  api_host:'https://us.i.posthog.com',cookieless_mode:'always',person_profiles:'never',
  autocapture:false,capture_pageview:false,capture_pageleave:false,disable_session_recording:true,disable_surveys:true,
  capture_heatmaps:false,capture_dead_clicks:false,capture_exceptions:false,capture_performance:false,
  advanced_disable_flags:true,disable_external_dependency_loading:true,persistence:'memory',disable_persistence:true,
  request_batching:false,
  before_send:event=>{
   if(!event || !allowed.has(event.event) || !navigator.onLine) return null;
   for(const key of Object.keys(event.properties)) {
    if(/url|referrer/i.test(key) && typeof event.properties[key]==='string') event.properties[key]=cleanUrl(event.properties[key]);
    if(/initial|search|hash|title/.test(key)) delete event.properties[key];
   }
   return event;
  }
 });
 function capture(name:string,extra:Record<string,unknown>={}) {if(navigator.onLine) posthog.capture(name,{...properties,...extra});}
 const enter=()=>{if(!active){active=true;capture('$pageview');}};
 const leave=()=>{if(active){active=false;capture('$pageleave');}};
 enter();window.addEventListener('pagehide',leave);window.addEventListener('pageshow',e=>{if(e.persisted)enter();});
 window.addEventListener('slopbuzz:usage',event=>{
  const d=(event as CustomEvent<Usage>).detail;
  if(!['slopbuzz_demo_run','slopbuzz_api_request'].includes(d.event))return;
  capture(d.event,{outcome:d.outcome,runtime_mode:d.runtime_mode,duration_ms:Math.max(0,Math.round(d.duration_ms)),status:d.status,endpoint:d.endpoint?.split(/[?#]/)[0],method:d.method,cache_outcome:d.cache_outcome});
 });
}
void initialize().catch(e=>console.warn('Analytics initialization unavailable',e));
