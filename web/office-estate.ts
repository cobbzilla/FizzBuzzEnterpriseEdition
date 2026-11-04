import {estate,foundingEstate,parseLayoutToken,layoutToken} from './office-layout.ts';
import {RelocationCoordinator} from './office-relocation-model.ts';
import {estateMemo,readEstateSession,writeEstateSession,type EstateMemo} from './office-estate-records.ts';

/** One state owner in demo.js. The separately bundled renderer receives snapshots. */
export class OfficeEstate extends RelocationCoordinator {}
export const estateRecords:{notice:string;history:EstateMemo[]}={notice:'',history:[]};
const key='slopbuzz:estate:v1';let initial=foundingEstate;
try{
 const url=new URL(location.href),token=url.searchParams.get('estate');let saved:ReturnType<typeof readEstateSession>|undefined;
 try{const raw=sessionStorage.getItem(key);if(raw)saved=readEstateSession(raw);}catch{estateRecords.notice='Facilities could not read its saved minutes. This arrangement remains available for the current visit.';}
 if(token!==null){try{initial=parseLayoutToken(token);if(saved&&layoutToken(saved.current)===token)estateRecords.history=saved.history;}catch{estateRecords.notice='This relocation memo is malformed or belongs to an unfamiliar edition. The founding estate is open; counting and inspections remain available.';}}
 else if(url.searchParams.has('tour'))initial=foundingEstate;
 else if(saved){initial=saved.current;estateRecords.history=saved.history;}
 else {const bytes=crypto.getRandomValues(new Uint8Array(16));initial=estate([...bytes].map(b=>b.toString(16).padStart(2,'0')).join(''),0);}
}catch{/* Pure Node consumers have no browser address or storage. */}
export const officeEstate=new OfficeEstate(initial);
officeEstate.subscribe(event=>{
 if(event.kind!=='committed')return;
 estateRecords.history.push(estateMemo(event.relocation.from,event.relocation.to));estateRecords.history=estateRecords.history.slice(-10);
 try{sessionStorage.setItem(key,writeEstateSession(officeEstate.current,estateRecords.history));}catch{estateRecords.notice='Facilities cannot save this visit in tab storage. The current arrangement and its minutes remain available until this page closes.';}
 try{const url=new URL(location.href);url.searchParams.set('estate',layoutToken(officeEstate.current));history.replaceState(history.state,'',url);}catch{/* A blocked address book does not close the estate. */}
});
