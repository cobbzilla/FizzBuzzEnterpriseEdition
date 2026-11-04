import {estate,foundingEstate,parseLayoutToken} from './office-layout.ts';
import {RelocationCoordinator} from './office-relocation-model.ts';

/** One state owner in demo.js. The separately bundled renderer receives snapshots. */
export class OfficeEstate extends RelocationCoordinator {}
let initial=foundingEstate;
try{const token=new URL(location.href).searchParams.get('estate');if(token)initial=parseLayoutToken(token);else{const bytes=crypto.getRandomValues(new Uint8Array(16));initial=estate([...bytes].map(b=>b.toString(16).padStart(2,'0')).join(''),0);}}catch{/* A malformed memo leaves the founding estate available. */}
export const officeEstate=new OfficeEstate(initial);
