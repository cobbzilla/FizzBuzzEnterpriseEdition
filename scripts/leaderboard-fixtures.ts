import {EnterpriseScoringService} from '../web/scoring-service.ts';
export async function makeScore(count=15,mandate=String(count),id=crypto.randomUUID()){
 const service=new EnterpriseScoringService(undefined,()=>new Date().toISOString(),()=>id);service.begin(mandate,'factor-resonance-v1',{engine:'auto',companions:'false'});
 const lines=Array.from({length:count},(_,i)=>{const n=i+1;return n%15===0?'FizzBuzz':n%3===0?'Fizz':n%5===0?'Buzz':String(n);});
 service.receive({start:'1',end:String(count),global:{},cycles:{},closing:{},complete:true});await service.disclose('1',lines,undefined,async()=>[]);return service;
}
