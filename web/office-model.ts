import {roomById,officeVersion,type RoomId} from './office-content.ts';
import type {ExecutionEvent,Folio} from './chronicle';
import type {Discovery} from './discovery-model';
export interface RouteStep {room:RoomId;label:string;source:'recorded'|'receipt'|'disclosed';finding:string}
export interface OfficeFile {mandate:string;ordinal:string;text:string;events:readonly ExecutionEvent[];cache:string;recorded:boolean;omitted:number;globals:readonly ExecutionEvent[];sourceOmitted:number}
export const roomForEvent=(e:ExecutionEvent):RoomId|undefined=>{
 const k=e.kind;if(k.startsWith('HR_'))return 'personnel';if(k.startsWith('PREMISES_'))return 'premises';if(['REQUISITION','DELIVERY','GLYPH_ACCEPTED','GLYPH_ASSEMBLED'].includes(k))return 'procurement';if(k==='NOTARY'||k==='EXTENDED_NOTARY')return 'notary';if(k.startsWith('CACHE_')||k.startsWith('PRECEDENT_'))return 'memory';if(['PUBLICATION','AUDIT_APPEND','QUEUE_ENQUEUED','TRANSACTION_COMMIT'].includes(k))return 'publication';if(['ASSEMBLY','CLASSIFICATION','EXTENDED_CLASSIFICATION','TRANSACTION_BEGIN','NUMERAL','SUCCESSION','EXTENDED_SUCCESSION'].includes(k))return 'reception';return undefined;
};
export function routeFor(file:OfficeFile|undefined):RouteStep[]{
 if(!file)return [];
 if(file.cache==='HIT')return [{room:'memory',label:'Institutional memory returned prior text',source:'receipt',finding:'The response reported a cache hit. Fresh recruitment, procurement and printing are not inferred.'},{room:'publication',label:'Retained result disclosed',source:'disclosed',finding:'The retained text '+file.text+' was disclosed in the demo.'}];
 const route:RouteStep[]=[];for(const e of file.events){const room=roomForEvent(e);if(room&&route.at(-1)?.room!==room)route.push({room,label:e.office,source:'recorded',finding:e.finding});}
 // A visual route is a bounded summary of supplied evidence, never a reconstructed call stack.
 const capped=route.slice(0,23);if(capped.at(-1)?.room!=='publication')capped.push({room:'publication',label:'Observed output disclosed',source:'disclosed',finding:'The demo disclosed '+file.text+'. '+(file.recorded?'The route summarizes the supplied records.':'No complete production dossier accompanied this result.')});return capped;
}
export class OfficeArchive {
 mandate='15';mode='mandate';private latest?:string;files=new Map<string,OfficeFile>();companions=new Map<string,Discovery>();globals:ExecutionEvent[]=[];selected='latest';omitted=0;disclosed=0;
 begin(mandate:string,mode='mandate'){this.mandate=mandate;this.mode=mode;this.latest=undefined;this.files.clear();this.companions.clear();this.globals=[];this.selected='latest';this.omitted=0;this.disclosed=0;}
 receive(events:readonly ExecutionEvent[],omitted:number){this.globals=events.filter(e=>e.ordinal===null).slice(0,300);this.omitted=omitted;}
 disclose(folios:readonly Folio[]){for(const f of folios){if(!this.files.has(f.ordinal))this.disclosed++;this.latest=f.ordinal;this.files.set(f.ordinal,{mandate:this.mandate,ordinal:f.ordinal,text:f.text,events:f.events.slice(0,300),cache:f.cache,recorded:f.recorded,omitted:Math.max(0,f.events.length-300),globals:this.globals,sourceOmitted:this.omitted});}
  this.trim();
 }
 private trim(){while(this.files.size>32){const victim=[...this.files.keys()].find(k=>k!=='1'&&k!==this.selected&&k!==this.latest);if(!victim)break;this.files.delete(victim);this.companions.delete(victim);}}
 choose(ordinal:string,snapshot?:OfficeFile,companion?:Discovery){if(ordinal==='latest'){this.selected='latest';return;}if(!this.files.has(ordinal)){if(!snapshot||snapshot.ordinal!==ordinal||snapshot.mandate!==this.mandate)return;this.files.set(ordinal,snapshot);}this.selected=ordinal;if(companion)this.remember(companion);this.trim();}
 inspect(f:Folio){if(!this.files.has(f.ordinal))this.files.set(f.ordinal,{mandate:this.mandate,ordinal:f.ordinal,text:f.text,events:f.events.slice(0,300),cache:f.cache,recorded:f.recorded,omitted:Math.max(0,f.events.length-300),globals:[],sourceOmitted:0});this.selected=f.ordinal;this.mode='inspection';this.trim();}
 current(){return this.selected==='latest'?this.files.get(this.latest||''):this.files.get(this.selected);}
 remember(d:Discovery){if(d.mandate!==this.mandate||!this.files.has(d.assignment.ordinal))return;this.companions.set(d.assignment.ordinal,d);}
 evidence(room:RoomId){const file=this.current();const actual=(file?.cache==='HIT'?[]:file?.events||[]).filter(e=>roomForEvent(e)===room);const global=(file?.globals||this.globals).filter(e=>roomForEvent(e)===room);return [...global,...actual].slice(0,60);}
}
export function tourSeed(text:string){let h=2166136261;for(let i=0;i<text.length;i++)h=Math.imul(h^text.charCodeAt(i),16777619);return h>>>0;}
export function officeShare(scope:string,mandate:string,room:RoomId,prop?:string,authority='factor-resonance-v1',action?:number){const url=new URL('demo/',scope);url.search=new URLSearchParams({limit:mandate,authority,tour:officeVersion,room,...(prop?{prop}: {}),...(action===0||action===1?{action:String(action)}:{})}).toString();url.hash='office-tour';return url.href;}
export function parseTourLink(search:string){const p=new URLSearchParams(search);if(p.get('tour')!==officeVersion)return;const room=roomById(p.get('room')||'reception');if(!room)return;const prop=room.props.find(x=>x.id===p.get('prop'));const action=p.get('action');return {room:room.id,prop:prop?.id,action:prop&&(action==='0'||action==='1')?Number(action):undefined};}
