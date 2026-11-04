import {estate,foundingEstate,nextEstate,parseLayoutToken,validateEstate,type EstateLayout} from './office-layout.ts';

/** One state owner in demo.js. The separately bundled renderer receives snapshots. */
export class OfficeEstate {
 private value:EstateLayout;private listeners=new Set<()=>void>();
 constructor(initial:EstateLayout=foundingEstate){this.value=validateEstate(initial);}
 get current(){return this.value;}
 subscribe(listener:()=>void){this.listeners.add(listener);return()=>this.listeners.delete(listener);}
 reorganize(){const candidate=validateEstate(nextEstate(this.value));this.value=candidate;for(const listener of this.listeners)listener();return candidate;}
}
let initial=foundingEstate;
try{const token=new URL(location.href).searchParams.get('estate');if(token)initial=parseLayoutToken(token);else{const bytes=crypto.getRandomValues(new Uint8Array(16));initial=estate([...bytes].map(b=>b.toString(16).padStart(2,'0')).join(''),0);}}catch{/* A malformed memo leaves the founding estate available. */}
export const officeEstate=new OfficeEstate(initial);
