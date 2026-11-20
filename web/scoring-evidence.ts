import type {ScoringEvidence,WorkReceipt} from './scoring-service.ts';
import {ruleById} from './scoring-rules.ts';
export interface StructuredWork {schema:'slopbuzz-work/v1';complete:boolean;ordinals:Readonly<Record<string,WorkReceipt>>}
export function parseStructuredWork(value:unknown):StructuredWork|undefined {
 try{const work=value as StructuredWork;if(!work||work.schema!=='slopbuzz-work/v1'||typeof work.complete!=='boolean'||!work.ordinals||Object.keys(work.ordinals).length>1002)return;
  for(const [ordinal,counts]of Object.entries(work.ordinals)){
   if(ordinal!=='global'&&!/^[1-9][0-9]*$/.test(ordinal)||!counts||Object.keys(counts).length>128)return;
   for(const [id,count]of Object.entries(counts))if(ruleById.get(id)?.category!=='Procedural work'||!/^\d+$/.test(count)||count.length>12)return;
  }
  return work;
 }catch{return;}
}
/** Split the immutable Java receipt into admission, number cycles and final administrative work. */
export function scoringEvidence(work:StructuredWork|undefined,start:string,length:number,mandate:string):ScoringEvidence {
 const end=String(BigInt(start)+BigInt(length)-1n),global:Record<string,string>={},closing:Record<string,string>={},cycles:Record<string,WorkReceipt>={};
 const add=(target:Record<string,string>,id:string,count:string)=>target[id]=String(BigInt(target[id]||'0')+BigInt(count));
 for(const [ordinal,counts]of Object.entries(work?.ordinals||{})){
  if(ordinal==='global'){for(const [id,count]of Object.entries(counts)){if(id==='complete'){if(end===mandate)add(closing,id,count);}else add(global,id,count);}}
  else if(BigInt(ordinal)>=BigInt(start)&&BigInt(ordinal)<=BigInt(end))cycles[ordinal]=counts;
  else if(BigInt(ordinal)===BigInt(end)+1n)for(const [id,count]of Object.entries(counts))add(closing,id,count);
 }
 return {start,end,global,closing,cycles,complete:work?.complete===true};
}
