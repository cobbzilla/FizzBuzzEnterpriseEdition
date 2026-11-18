import {decodePortfolio,newPortfolio,PortfolioRun,portfolioStorageKey,type PortfolioReceipt,type PortfolioStatus} from './portfolio-model.ts';
import type {Discovery} from './discovery-model.ts';

export interface PortfolioState {current?:PortfolioReceipt;saved?:PortfolioReceipt;persistent:boolean}
/** Current checkpoint plus the most recently banked run. No unbounded score history. */
export class PortfolioStore {
 private current?:PortfolioRun;private saved?:PortfolioRun;private active?:PortfolioRun;
 private persistent:boolean;private listeners=new Set<()=>void>();
 private storage?:Pick<Storage,'getItem'|'setItem'>;private now:()=>string;private id:()=>string;
 constructor(storage?:Pick<Storage,'getItem'|'setItem'>,now=()=>new Date().toISOString(),id:()=>string=()=>crypto.randomUUID()){
  this.storage=storage;this.now=now;this.id=id;
  this.persistent=!!storage;
  try{const data=JSON.parse(storage?.getItem(portfolioStorageKey)||'null');if(data?.schema===portfolioStorageKey){const current=decodePortfolio(data.current),saved=decodePortfolio(data.saved);if(current){this.current=new PortfolioRun(current);if(current.status==='active')this.current.close('interrupted',this.now());}if(saved)this.saved=new PortfolioRun(saved);}}catch{this.persistent=false;}
 }
 snapshot():PortfolioState{return {current:this.current?.snapshot(),saved:this.saved?.snapshot(),persistent:this.persistent};}
 subscribe(listener:()=>void){this.listeners.add(listener);return()=>this.listeners.delete(listener);}
 private publish(){
  try{if(!this.storage)throw Error('Storage unavailable');this.storage.setItem(portfolioStorageKey,JSON.stringify({schema:portfolioStorageKey,current:this.current?.snapshot(),saved:this.saved?.snapshot()}));this.persistent=true;}catch{this.persistent=false;}
  for(const listener of this.listeners)listener();
 }
 begin(mandate:string,authority:string){this.finish('replaced');this.saved=this.current||this.saved;this.current=this.active=new PortfolioRun(newPortfolio(this.id(),mandate,authority,this.now()));this.publish();}
 finish(status:Exclude<PortfolioStatus,'active'>){if(this.active){this.active.close(status,this.now());this.active=undefined;this.publish();}}
 /** Capture ownership before awaiting Java: a late response can never credit a newer run. */
 async disclose(start:string,lines:readonly string[],authority:string|undefined,load:()=>Promise<readonly Discovery[]>){
  const run=this.active;if(!run)return;
  try{const finds=authority?await load():[];run.disclose(start,lines,authority,finds,this.now());}
  catch{run.disclose(start,lines,authority,[],this.now(),true);}
  if(run===this.current||run===this.saved)this.publish();
 }
}
