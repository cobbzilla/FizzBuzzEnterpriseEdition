export interface PremisesTenant {position:number;codePoint:string;name:string;excuse:string;recognized:boolean}
export interface PremisesStep {office:string;state:'APPROVED'|'DISCOVERED'|'NOT_REQUIRED'|'REJECTED'|'NOT_REACHED';finding:string;document:string}
export interface PremisesDossier {schema:'slopbuzz-premises/v1';ordinal:string;purpose:'MANDATE'|'REHEARSAL';status:'APPROVED'|'REJECTED';initialLength:number|null;vacancyCertified:boolean;tenants:PremisesTenant[];steps:PremisesStep[]}
const offices=['Premises Allocation Office','Character-by-Character Vacancy Inspector','Hidden Occupant Eviction Authority','Vacancy Reinspection Office','Single-Use Occupancy Lease Authority','Independent Premises Auditor'];
export function parsePremises(value:unknown):PremisesDossier {
 const d=value as PremisesDossier;
 const invalid=()=>{throw new Error('The premises office supplied inconsistent inspection papers.');};
 if(!d||d.schema!=='slopbuzz-premises/v1'||typeof d.ordinal!=='string'||!/^\d+$/.test(d.ordinal)||d.ordinal[0]==='0'||!['MANDATE','REHEARSAL'].includes(d.purpose)||!['APPROVED','REJECTED'].includes(d.status)||typeof d.vacancyCertified!=='boolean'||!(d.initialLength===null||(Number.isSafeInteger(d.initialLength)&&d.initialLength>=0&&d.initialLength<=256))||!Array.isArray(d.tenants)||d.tenants.length>256||!Array.isArray(d.steps)||d.steps.length!==offices.length)invalid();
 let position=0;
 for(const tenant of d.tenants){
  if(!tenant||tenant.position!==position||typeof tenant.name!=='string'||typeof tenant.excuse!=='string'||typeof tenant.recognized!=='boolean'||typeof tenant.codePoint!=='string'||!/^U\+[0-9A-F]{4,6}$/.test(tenant.codePoint))invalid();
  const point=Number.parseInt(tenant.codePoint.slice(2),16);if(point>0x10ffff)invalid();position+=point>0xffff?2:1;
 }
 if((d.initialLength===null&&d.tenants.length>0)||(d.initialLength!==null&&d.initialLength!==position))invalid();
 let rejected=false;
 for(const [index,step]of d.steps.entries()){
  if(!step||step.office!==offices[index]||typeof step.finding!=='string'||typeof step.document!=='string')invalid();
  if(rejected){if(step.state!=='NOT_REACHED')invalid();continue;}
  if(step.state==='REJECTED'){rejected=true;continue;}
  const allowed=index===1?['APPROVED','DISCOVERED']:index===2?['APPROVED','NOT_REQUIRED']:['APPROVED'];if(!allowed.includes(step.state))invalid();
 }
 if(rejected!==(d.status==='REJECTED')||(d.status==='APPROVED'&&(d.initialLength===null||d.tenants.some(t=>!t.recognized))))invalid();
 if(d.steps[1].state==='DISCOVERED'&&d.tenants.length===0)invalid();
 if(d.vacancyCertified!==(d.steps[3].state==='APPROVED'))invalid();
 if(['APPROVED','DISCOVERED'].includes(d.steps[1].state)&&d.initialLength===null)invalid();
 if(d.steps[1].state==='APPROVED'&&d.tenants.length!==0)invalid();
 if(d.steps[2].state==='NOT_REQUIRED'&&d.tenants.length!==0)invalid();
 if(d.steps[2].state==='APPROVED'&&d.tenants.length===0)invalid();
 return d;
}
