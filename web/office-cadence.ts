import type {ObservedOfficeStep} from './office-supervision-model';

/** Disclosure values stay compatible with ordinary reading; office rates are explicit. */
export function officeCadenceRate(value:string):number {
 return value==='1800'?.5:value==='225'?2:value==='0'?Infinity:1;
}
export interface OfficeTickBudget {rate:number;maxAdvanceMs:number}
const movingWork=new Set(['wire','recruit','survey','evict','lease','release','deliver','glyph','assemble','notarize','print','audit','queue','commit','succession','memory']);

/** Actual painted frames govern motion, rather than a guessed device score. */
export class OfficeCadenceGovernor {
 quality:'standard'|'economy'='standard';
 private interval=1000/60;private cost=0;private samples=0;private slow=0;private recovered=0;
 observeFrame(intervalMs:number,renderMs:number){
  if(intervalMs<=0)return false;
  this.interval+=.15*(Math.min(100,intervalMs)-this.interval);this.cost+=.15*(Math.min(100,Math.max(0,renderMs))-this.cost);this.samples++;
  const struggling=this.interval>28||this.cost>18;
  this.slow=struggling?this.slow+1:0;this.recovered=!struggling&&this.interval<20&&this.cost<10?this.recovered+1:0;
  const before=this.quality;
  if(this.samples>=12&&this.slow>=12)this.quality='economy';
  else if(this.quality==='economy'&&this.recovered>=180)this.quality='standard';
  return before!==this.quality;
 }
 budget(value:string,step:ObservedOfficeStep,elapsed:number,arrivalFrames:number,painted:boolean,reducedMotion=false):OfficeTickBudget {
  const rate=officeCadenceRate(value);if(!painted)return {rate,maxAdvanceMs:Infinity};
  let duration:number,end:number,frames:number;
  if(elapsed<step.arriveMs){duration=step.arriveMs;end=step.arriveMs;frames=arrivalFrames;}
  else if(elapsed<step.arriveMs+step.workMs){duration=step.workMs;end=step.arriveMs+step.workMs;frames=movingWork.has(step.action)?16:8;}
  else{duration=step.holdMs;end=step.arriveMs+step.workMs+step.holdMs;frames=2;}
  return {rate,maxAdvanceMs:Math.max(0,Math.min(end-elapsed,duration/Math.max(1,reducedMotion?1:frames)))};
 }
}
