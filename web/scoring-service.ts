import {evaluate,type Facts} from './scoring-language.ts';
import {badgeRules,boostSchedule,financialRules,meritRules,rarityTables,ruleById,rulesIdentity,scoringPolicy,scoringVersion,type Category} from './scoring-rules.ts';
import {PortfolioRun,newPortfolio,decodePortfolio,portfolioStorageKey,type PortfolioReceipt,type PortfolioStatus} from './portfolio-model.ts';
import type {Discovery} from './discovery-model.ts';
import type {Rarity} from '../catalog/bestiary.ts';

export const scoringStorageKey='slopbuzz:enterprise-score:v2',cabinetStorageKey='slopbuzz:badge-cabinet:v2';
export type WorkReceipt=Readonly<Record<string,string>>;
export interface ScoringEvidence {start:string;end:string;global:WorkReceipt;cycles:Readonly<Record<string,WorkReceipt>>;closing:WorkReceipt;complete:boolean}
export interface AwardReceipt {rule:string;quantity:string;factor:string;points:string;at:string;detail:string}
export interface AwardBucket {quantity:string;points:string;awards:string}
export interface BadgeUnlock {firstEarned:string;tier:string}
export interface IncidentAccount {id:string;kind:'flight'|'heist';ordinal:string;rarity:Rarity;boost:number;counts:Record<string,string>;opening:string;budget:string;stolen:string;recovered:string;elapsed:number;settled:boolean;recoveryBasisPoints:string;resumed:boolean}
export interface ScoringRun {
 rules:typeof scoringVersion;identity:string;id:string;status:PortfolioStatus;startedAt:string;updatedAt:string;
 verification:PortfolioReceipt;conditions:Record<string,string>;gross:string;stolen:string;recovered:string;dividend:string;
 categories:Partial<Record<Category,string>>;buckets:Record<string,AwardBucket>;recent:AwardReceipt[];
 counters:Record<string,string>;badges:Record<string,string>;identities:Record<string,string>;rarities:Rarity[];pilots:string[];partitions:string[];departments:string[];inspections:string[];bingo:string[];
 warrants:string;pendingResume:string;incident?:IncidentAccount;lastIncidents:Record<string,string>;partial:boolean;
}
export interface ScoringState {current?:ScoringRun;saved?:ScoringRun;legacy?:PortfolioReceipt;cabinet:Record<string,BadgeUnlock>;persistent:boolean}
const increment=(object:Record<string,string>,key:string,amount:bigint)=>object[key]=String(BigInt(object[key]||'0')+amount);
export const netPoints=(r:ScoringRun)=>BigInt(r.gross)-BigInt(r.stolen)+BigInt(r.recovered)+BigInt(r.dividend);
export function cycleAuthority(cycle:string|bigint):{factor:number;remaining:number;milestone:string}{
 const value=BigInt(cycle);if(value<=1n)return {factor:1,remaining:0,milestone:'0'};
 // Windows do not overlap. A milestone grants only its strongest authority, beginning next cycle.
 const interval=BigInt(boostSchedule.at(-1)!.every),latest=(value-1n)/interval*interval;
 if(latest>0n){const policy=boostSchedule.find(p=>latest%BigInt(p.every)===0n)!;const offset=value-latest;if(offset<=BigInt(policy.cycles))return {factor:policy.factor,remaining:policy.cycles-Number(offset)+1,milestone:String(latest)};}
 return {factor:1,remaining:0,milestone:'0'};
}
export function heistFinancials(opening:bigint,elapsed:number,successful=false){
 const time=Math.max(0,Math.floor(elapsed)),budget=evaluate(financialRules.budget,{openingScore:opening}),stolen=evaluate(financialRules.stolen,{budget,elapsedMs:time});
 const recoveryBasisPoints=time>=scoringPolicy.chaseMs?0n:evaluate(financialRules.recoveryBasisPoints,{elapsedMs:time});
 const recovery=successful?evaluate(financialRules.recovery,{stolen,recoveryBasisPoints}):0n;
 return {budget,stolen,recoveryBasisPoints,recovery};
}
const decimal=(s:unknown):s is string=>typeof s==='string'&&/^(0|[1-9][0-9]*)$/.test(s);
export function decodeScoringRun(value:unknown):ScoringRun|undefined {
 try{
  const r=value as ScoringRun;if(!r||r.rules!==scoringVersion||!/^[a-f0-9]{8}$/.test(r.identity)||!r.id||!decodePortfolio(r.verification)||r.verification.id!==r.id||r.verification.status!==r.status||![r.startedAt,r.updatedAt].every(d=>Number.isFinite(Date.parse(d))))return;
  if(!['gross','stolen','recovered','dividend','warrants','pendingResume'].every(k=>decimal(r[k as keyof ScoringRun]))||BigInt(r.recovered)>BigInt(r.stolen)||netPoints(r)<0n)return;
  if(!Array.isArray(r.recent)||r.recent.length>scoringPolicy.recentReceipts||!Array.isArray(r.inspections)||r.inspections.length>10000||Object.keys(r.identities).length>scoringPolicy.companionIdentities)return;
  for(const map of [r.counters,r.badges,r.identities,r.categories])if(!map||Object.values(map).some(v=>!decimal(v)))return;
  if(!r.buckets||Object.keys(r.buckets).length>2000||Object.entries(r.buckets).some(([id,b])=>!/^\w+\|[1-9][0-9]*$/.test(id)||![b.points,b.quantity,b.awards].every(decimal)))return;
  const total=BigInt(r.gross)+BigInt(r.dividend);
  if(Object.values(r.buckets).reduce((sum,b)=>sum+BigInt(b.points),0n)!==total||Object.values(r.categories).reduce((sum,p)=>sum+BigInt(p!),0n)!==total)return;
  if(r.recent.some(x=>!/^\w+$/.test(x.rule)||![x.points,x.quantity,x.factor].every(decimal)))return;
  if(![r.rarities,r.pilots,r.partitions,r.departments,r.bingo].every(a=>Array.isArray(a)&&a.length<=3200&&a.every(v=>typeof v==='string')))return;
  if(r.incident&&(![r.incident.opening,r.incident.budget,r.incident.stolen,r.incident.recovered].every(decimal)||!Number.isFinite(r.incident.elapsed)||r.incident.elapsed<0||BigInt(r.incident.budget)>BigInt(r.incident.opening)||BigInt(r.incident.stolen)>BigInt(r.incident.budget)||BigInt(r.incident.recovered)>BigInt(r.incident.stolen)))return;
  return structuredClone(r);
 }catch{return;}
}
/** One owner adjudicates awards, custody transfers and badges. Presenters cannot mutate its balance. */
export class EnterpriseScoringService {
 private current?:ScoringRun;private saved?:ScoringRun;private legacy?:PortfolioReceipt;private active?:ScoringRun;private verification?:PortfolioRun;private adjudicating?:ScoringRun;
 private evidence?:ScoringEvidence;private evidenceThrough='0';private lastEvidenceStart='0';private cabinet:Record<string,BadgeUnlock>={};private persistent:boolean;
 private listeners=new Set<()=>void>();private storage?:Pick<Storage,'getItem'|'setItem'>;private clock:()=>string;private id:()=>string;
 constructor(storage?:Pick<Storage,'getItem'|'setItem'>,clock=()=>new Date().toISOString(),id=()=>crypto.randomUUID()){
  this.storage=storage;this.clock=clock;this.id=id;this.persistent=!!storage;
  try{
   const data=JSON.parse(storage?.getItem(scoringStorageKey)||'null');this.current=decodeScoringRun(data?.current);this.saved=decodeScoringRun(data?.saved);
   const old=JSON.parse(storage?.getItem(portfolioStorageKey)||'null');this.legacy=decodePortfolio(old?.current)||decodePortfolio(old?.saved);
   this.mergeCabinet(JSON.parse(storage?.getItem(cabinetStorageKey)||'{}'),false);
   if(this.current?.status==='active'){this.current.status='interrupted';this.current.verification.status='interrupted';this.current.incident=undefined;this.current.updatedAt=this.clock();}
  }catch{this.persistent=false;}
 }
 snapshot():ScoringState{return structuredClone({current:this.current,saved:this.saved,legacy:this.legacy,cabinet:this.cabinet,persistent:this.persistent});}
 get runId(){return this.active?.id;}
 get through(){return this.active?.verification.through||'0';}
 get incident(){return this.active?.incident?structuredClone(this.active.incident):undefined;}
 subscribe(listener:()=>void){this.listeners.add(listener);return()=>this.listeners.delete(listener);}
 mergeCabinet(value:unknown,publish=true){
  if(value&&typeof value==='object')for(const badge of badgeRules){const candidate=(value as Record<string,BadgeUnlock>)[badge.id];if(!candidate||!decimal(candidate.tier)||!Number.isFinite(Date.parse(candidate.firstEarned)))continue;const old=this.cabinet[badge.id];this.cabinet[badge.id]={tier:old&&BigInt(old.tier)>BigInt(candidate.tier)?old.tier:candidate.tier,firstEarned:old&&old.firstEarned<candidate.firstEarned?old.firstEarned:candidate.firstEarned};}
  if(publish)this.publish();
 }
 private publish(){
  if(this.active)this.active.updatedAt=this.clock();
  try{if(!this.storage)throw Error('Storage unavailable');this.mergeCabinet(JSON.parse(this.storage.getItem(cabinetStorageKey)||'{}'),false);this.storage.setItem(scoringStorageKey,JSON.stringify({current:this.current,saved:this.saved}));this.storage.setItem(cabinetStorageKey,JSON.stringify(this.cabinet));this.persistent=true;}catch{this.persistent=false;}
  for(const listener of this.listeners)listener();
 }
 begin(mandate:string,authority:string,conditions:Record<string,string>={}){
  this.finish('replaced');this.saved=this.current||this.saved;
  const now=this.clock(),verification=newPortfolio(this.id(),mandate,authority,now);this.verification=new PortfolioRun(verification);
  this.current=this.active={rules:scoringVersion,identity:rulesIdentity,id:verification.id,status:'active',startedAt:now,updatedAt:now,verification,conditions,gross:'0',stolen:'0',recovered:'0',dividend:'0',categories:{},buckets:{},recent:[],counters:{},badges:{},identities:{},rarities:[],pilots:[],partitions:[],departments:[],inspections:[],bingo:[],warrants:scoringPolicy.initialWarrants,pendingResume:'0',lastIncidents:{},partial:false};
  this.evidence=undefined;this.evidenceThrough='0';this.lastEvidenceStart='0';
  this.award('mandate');this.award('bounds');this.award('boundDigit',{quantity:mandate.length});this.publish();
 }
 markPartial(){if(this.active){this.active.partial=true;this.publish();}}
 /** Receipts are request-local, uncapped by the narrative trace, and released with their output. */
 receive(evidence:ScoringEvidence,runId=this.runId){
  const r=this.active;if(!r||runId!==r.id||BigInt(evidence.end)<BigInt(evidence.start)-1n||BigInt(evidence.start)<=BigInt(this.evidenceThrough)||evidence.start===this.lastEvidenceStart)return;
  this.evidence=evidence;this.evidenceThrough=evidence.end;this.lastEvidenceStart=evidence.start;
  if(!evidence.complete)r.partial=true;
  this.work(evidence.global,1);if(evidence.end==='0')this.work(evidence.closing,1);
  this.publish();
 }
 private work(receipt:WorkReceipt,factor:number){const run=this.adjudicating||this.active!;for(const [id,quantity]of Object.entries(receipt)){const rule=ruleById.get(id);if(!rule||rule.category!=='Procedural work'||!decimal(quantity)){run.partial=true;continue;}if(['runtime','ownership'].includes(id)&&run.buckets[id+'|1'])continue;this.award(id,{quantity},factor);}}
 /** Capture ownership before asynchronous companion evidence; old work never enters a newer run. */
 async disclose(start:string,lines:readonly string[],authority:string|undefined,load:()=>Promise<readonly Discovery[]>){
  const run=this.active,verification=this.verification,packet=this.evidence;if(!run||!verification)return;
  let finds:readonly Discovery[]=[];let unavailable=false;
  try{finds=authority?await load():[];}catch{unavailable=true;}
  if(run!==this.current&&run!==this.saved||run.status==='completed')return;
  try{if(!verification.disclose(start,lines,authority,finds,this.clock(),unavailable))return;}
  catch{unavailable=true;finds=[];if(!verification.disclose(start,lines,authority,[],this.clock(),true))return;}
  const byOrdinal=new Map(finds.map(d=>[d.assignment.ordinal,d]));this.adjudicating=run;
  try{
  for(const [index,text]of lines.entries()){
   const ordinal=BigInt(start)+BigInt(index),factor=cycleAuthority(ordinal).factor;
   const facts=packet?.cycles[String(ordinal)];if(facts)this.work(facts,factor);else if(packet?.complete!==true)run.partial=true;
   this.award('line',{},factor);this.award('character',{quantity:text.length},factor);this.award('separator',{},factor);
   const flavor=['Fizz','Buzz','FizzBuzz'].includes(text)?text.toLowerCase():'numeral';if(flavor!=='numeral')this.award(flavor,{},factor);
   for(const id of ['digitSum','zeroes','palindrome','identical','powerTen'])this.award(id,{ordinal},factor);
   if(!run.bingo.includes(flavor))run.bingo.push(flavor);if(run.bingo.length===4){run.bingo=[];this.count('bingo');}
   const discovery=byOrdinal.get(String(ordinal));if(discovery&&!unavailable){const c=discovery.companion,count=BigInt(run.identities[c.id]||'0')+1n;run.identities[c.id]=String(count);this.award('appointment',{rarity:c.rarity,paired:c.kind==='pair'?1:0,loyalty:count%BigInt(scoringPolicy.loyaltyEvery)===0n?1:0,first:count===1n?1:0},factor);this.award('entrance',{rarity:c.rarity});this.count('appointments');if(!run.rarities.includes(c.rarity)){run.rarities.push(c.rarity);this.count('rarities');}if(c.rarity==='Legendary')this.count('legendary');if(c.rarity==='Mythic')this.count('mythic');}
   this.count('lines');if(factor>1)this.count('boosted');
   if(ordinal%BigInt(scoringPolicy.reorganizationEvery)===0n)run.warrants=String(BigInt(run.warrants)+1n);
   if(/^10+$/.test(String(ordinal))){this.award('magnitude',{threshold:ordinal});this.count('magnitude');}
   if(BigInt(run.pendingResume)>0n){this.award('moveResume',{quantity:run.pendingResume});run.pendingResume='0';}
   if(packet&&String(ordinal)===packet.end)this.work(packet.closing,1);
  }
  run.verification=verification.snapshot();run.updatedAt=this.clock();if(unavailable)run.partial=true;
  }finally{this.adjudicating=undefined;}
  this.publish();
 }
 private award(id:string,facts:Facts={},factor=1){
  const r=this.adjudicating||this.active,rule=ruleById.get(id);if(!r||!rule)return;
  const quantity=BigInt(facts.quantity??1);if(quantity<0n)throw Error('Negative award quantity');
  const multiplier=rule.scope==='flat'?1:factor,points=evaluate(rule.formula,{quantity,...facts},rarityTables)*BigInt(multiplier);if(points<=0n)return;
  if(rule.category==='Completion dividend')r.dividend=String(BigInt(r.dividend)+points);else r.gross=String(BigInt(r.gross)+points);
  increment(r.categories as Record<string,string>,rule.category,points);
  const key=id+'|'+multiplier,bucket=r.buckets[key]??={quantity:'0',points:'0',awards:'0'};increment(bucket as unknown as Record<string,string>,'quantity',quantity);increment(bucket as unknown as Record<string,string>,'points',points);increment(bucket as unknown as Record<string,string>,'awards',1n);
  r.recent.push({rule:id,quantity:String(quantity),factor:String(multiplier),points:String(points),at:this.clock(),detail:Object.entries(facts).filter(([key])=>key!=='quantity').map(([key,value])=>key+'='+value).join('; ')});if(r.recent.length>scoringPolicy.recentReceipts)r.recent.splice(0,r.recent.length-scoringPolicy.recentReceipts);
 }
 private count(counter:string,amount=1n){
  const r=(this.adjudicating||this.active)!;increment(r.counters,counter,amount);
  for(const badge of badgeRules.filter(b=>b.counter===counter)){
   const progress=BigInt(r.counters[counter]),tier=badge.repeat?progress/BigInt(badge.target):progress>=BigInt(badge.target)?1n:0n,previous=BigInt(r.badges[badge.id]||'0');
   if(tier<=previous)continue;r.badges[badge.id]=String(tier);if(badge.award)this.award(badge.award,{quantity:tier-previous});
   const old=this.cabinet[badge.id];this.cabinet[badge.id]={firstEarned:old?.firstEarned||this.clock(),tier:old&&BigInt(old.tier)>tier?old.tier:String(tier)};
  }
 }
 startIncident(kind:'flight'|'heist',id:string,ordinal:string,rarity:Rarity,runId=this.runId){
  const r=this.active;if(!r||runId!==r.id||r.incident||BigInt(ordinal)>BigInt(r.verification.through)||!rarityTables.rarity[rarity]||BigInt(id)<=BigInt(r.lastIncidents[kind]||'0'))return false;
  r.lastIncidents[kind]=id;const opening=netPoints(r);r.incident={kind,id,ordinal,rarity,boost:cycleAuthority(ordinal).factor,counts:{},opening:String(opening),budget:String(kind==='heist'?heistFinancials(opening,0).budget:0),stolen:'0',recovered:'0',elapsed:0,settled:false,recoveryBasisPoints:'10000',resumed:false};this.publish();return true;
 }
 incidentWork(id:string,work:Readonly<Record<string,number>>,runId=this.runId){
  const r=this.active,i=r?.incident;if(!r||!i||i.id!==id||r.id!==runId)return;
  let changed=false;for(const [ruleId,quantity]of Object.entries(work)){const rule=ruleById.get(ruleId);if(!rule||!ruleId.startsWith(i.kind)||!Number.isSafeInteger(quantity)||quantity<0)continue;const count=BigInt(Math.min(quantity,rule.cap??1)),before=BigInt(i.counts[ruleId]||'0');if(count>before){i.counts[ruleId]=String(count);this.award(ruleId,{quantity:count-before},i.boost*Number(rarityTables.rarity[i.rarity]));changed=true;}}
  if(changed)this.publish();
 }
 advanceHeist(id:string,elapsed:number,resolution?:'player'|'automatic'|'cancelled',runId=this.runId){
  const r=this.active,i=r?.incident;if(!r||!i||i.kind!=='heist'||i.id!==id||r.id!==runId||i.settled)return;
  if(!Number.isFinite(elapsed)||elapsed<i.elapsed)return;
  const f=heistFinancials(BigInt(i.opening),elapsed,resolution==='player'),delta=f.stolen-BigInt(i.stolen);
  i.elapsed=elapsed;i.stolen=String(f.stolen);i.recoveryBasisPoints=String(f.recoveryBasisPoints);r.stolen=String(BigInt(r.stolen)+delta);
  if(resolution){i.settled=true;if(resolution==='player'&&elapsed<scoringPolicy.chaseMs){i.recovered=String(f.recovery);r.recovered=String(BigInt(r.recovered)+f.recovery);this.incidentWork(id,{heistCatch:1},runId);if(f.budget>0n&&f.stolen===0n)this.count('untouched');if(f.recovery>0n)this.count('reappropriation');this.count('heists');}}
  this.publish();
 }
 finishIncident(id:string,successful:boolean,personality?:string,runId=this.runId){
  const r=this.active,i=r?.incident;if(!r||!i||i.id!==id||r.id!==runId)return;
  if(i.kind==='flight'&&successful){if(personality&&!r.pilots.includes(personality)){r.pilots.push(personality);this.incidentWork(id,{flightFirstPilot:1},runId);this.count('pilots');}this.count('flights');}
  r.incident=undefined;this.publish();
 }
 reorganized(partitions:readonly string[],amenity:boolean,interrupted:boolean,runId=this.runId){
  const r=this.active;if(!r||r.id!==runId||BigInt(r.warrants)<1n)return false;
  r.warrants=String(BigInt(r.warrants)-1n);
  for(const [id,quantity]of Object.entries({moveCharter:1,movePack:8,moveRoom:8,moveUnpack:8,moveAddress:8,movePartition:8,moveRoute:56,moveAmenity:amenity?1:0,moveMinutes:1}))this.award(id,{quantity});
  for(const style of partitions)if(!r.partitions.includes(style)){r.partitions.push(style);this.count('partitions');}
  if(interrupted)r.pendingResume=String(BigInt(r.pendingResume)+1n);if(r.incident)r.incident.resumed=true;this.publish();return true;
 }
 resumedIncident(id:string,runId=this.runId){const r=this.active,i=r?.incident;if(!r||!i||i.id!==id||r.id!==runId||!i.resumed)return;i.resumed=false;this.incidentWork(id,{[i.kind+'Resume']:1},runId);if(BigInt(r.pendingResume)>0n){this.award('moveResume',{quantity:r.pendingResume});r.pendingResume='0';}this.publish();}
 inspect(kind:'biography'|'evidence'|'department'|'curiosity',identity:string){
  const r=this.active;if(!r||!identity||identity.length>200||kind==='biography'&&!r.identities[identity])return;
  const key=kind+'|'+identity;if(r.inspections.includes(key)||r.inspections.length>=10000)return;r.inspections.push(key);this.award(kind);
  if(kind==='department'&&!r.departments.includes(identity)){r.departments.push(identity);this.count('departments');}this.publish();
 }
 finish(status:Exclude<PortfolioStatus,'active'>){
  const r=this.active;if(!r)return;
  if(status==='completed'&&(r.incident||r.verification.through!==r.verification.mandate))throw Error('Cannot bank unfinished proceedings');
  if(status==='completed'&&BigInt(r.verification.through)>0n){this.award('dividend',{completed:r.verification.through,netScore:netPoints(r)});this.count('completed');}
  r.status=status;r.updatedAt=this.clock();this.verification?.close(status,this.clock());r.verification=this.verification!.snapshot();r.incident=undefined;this.active=undefined;this.verification=undefined;this.evidence=undefined;this.publish();
 }
}
export const scoreCategories=[...new Set(meritRules.map(r=>r.category))];
