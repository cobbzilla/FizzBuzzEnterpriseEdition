import {decodeScoringRun,heistFinancials,netPoints,type ScoringRun} from '../web/scoring-service.ts';
import {evaluate,type Expression} from '../web/scoring-language.ts';
import {rulesIdentity,rulesManifest,scoringPolicy,rarityTables} from '../web/scoring-rules.ts';
import type {LeaderboardReceipt} from '../web/leaderboard-model.ts';

// Retain old entries when adding an edition. Never reinterpret a receipt under new prices.
export const acceptedEditions=new Map([[rulesIdentity,rulesManifest]]);
export class ReceiptError extends Error {}
const requireFact=(truth:unknown,message:string):void=>{if(!truth)throw new ReceiptError(message);};
const boundedDecimal=(v:unknown):v is string=>typeof v==='string'&&v.length<=4096&&/^(0|[1-9][0-9]*)$/.test(v);
const linear=(e:Expression):boolean=>'constant'in e||'variable'in e&&e.variable==='quantity'||'op'in e&&e.args.every(linear);
const sum=(values:Iterable<string>)=>[...values].reduce((s,v)=>s+BigInt(v),0n);

/** Accounting audit, deliberately not a claim to authenticate browser activity. */
export function auditLeaderboardReceipt(value:unknown,previous?:LeaderboardReceipt):LeaderboardReceipt {
 const receipt=value as LeaderboardReceipt,r=receipt?.run;
 requireFact(receipt?.schema==='slopbuzz-leaderboard/v1'&&Number.isSafeInteger(receipt.sequence)&&receipt.sequence>0,'Unsupported receipt or sequence.');
 requireFact(r?.publicationProtocol===1&&r.revision===receipt.sequence,'This run predates live score publication.');
 requireFact(!r.publicationInterrupted,'Local display inferences are not publication receipts.');
 requireFact(/^[A-Za-z0-9_-]{1,80}$/.test(r?.id||''),'Invalid run identity.');
 const edition=acceptedEditions.get(r?.identity);requireFact(edition&&r.rules===edition.version,'Unsupported scoring edition.');
 // Bound decimal conversion and collection sizes before the existing local decoder runs.
 const scan=(x:unknown,depth=0):void=>{
  requireFact(depth<=12,'Receipt nesting is too deep.');
  if(typeof x==='string')requireFact(x.length<=4096,'Receipt value is too long.');
  else if(Array.isArray(x)){requireFact(x.length<=10000,'Receipt collection is too large.');for(const v of x)scan(v,depth+1);}
  else if(x&&typeof x==='object'){const pairs=Object.entries(x);requireFact(pairs.length<=10000,'Receipt map is too large.');for(const [k,v]of pairs){requireFact(k.length<=240&&!['__proto__','constructor','prototype'].includes(k),'Invalid receipt key.');scan(v,depth+1);}}
 };
 scan(r);
 requireFact(decodeScoringRun(r)&&!r.partial,'The scoring receipt is incomplete or does not reconcile.');
 requireFact(r.verification.unscored==='0','Unscored appointments cannot enter the register.');
 const through=BigInt(r.verification.through),digits=BigInt(r.verification.through.length),total=netPoints(r);
 requireFact(through>0n&&total>0n,'Disclose at least one line with positive points.');
 requireFact(Object.entries(r.conditions).length<=12&&Object.values(r.conditions).every(v=>typeof v==='string'&&v.length<=100),'Invalid run conditions.');
 for(const map of [r.categories,r.counters,r.identities,r.badges])for(const count of Object.values(map))requireFact(boundedDecimal(count),'Invalid exact count.');
 requireFact(BigInt(r.counters.lines||'0')===through,'Line counters do not match disclosure.');
 const quantities=new Map<string,bigint>(),categoryTotals=new Map<string,bigint>();
 const rules=new Map(edition!.rules.map(rule=>[rule.id,rule]));
 for(const [key,bucket]of Object.entries(r.buckets)){
  const [id,factorText]=key.split('|'),rule=rules.get(id),factor=BigInt(factorText);
  requireFact(rule,'Unknown award rule.');
  const factors=rule!.scope==='flat'?[1]:rule!.scope==='cycle'?[1,2,3,5,10]:[1,2,3,5,10].flatMap(n=>[1,2,5,10,25].map(m=>n*m));
  requireFact(factors.includes(Number(factor)),'Multiplier is outside the scoring charter.');
  requireFact([bucket.quantity,bucket.awards,bucket.points].every(boundedDecimal),'Invalid award bucket.');
  const quantity=BigInt(bucket.quantity),awards=BigInt(bucket.awards),points=BigInt(bucket.points),base=points/factor;
  requireFact(quantity>0n&&awards>0n&&awards<=quantity&&points%factor===0n,'Invalid award accounting.');
  if(linear(rule!.formula))requireFact(points===evaluate(rule!.formula,{quantity},edition!.tables)*factor,'Award rate does not match its edition.');
  if(rule!.category==='Procedural work')requireFact(quantity<=64n*(through+1n)*(digits+BigInt(r.verification.mandate.length)+1n),'Procedural work exceeds the run bounds.');
  const bounds:Record<string,bigint>={digitSum:9n*digits,zeroes:25n*digits,palindrome:100n*digits,identical:150n*digits,powerTen:100n*(digits-1n),appointment:2519750n};
  if(id in bounds)requireFact(quantity<=through&&base<=quantity*bounds[id],'Nonlinear award exceeds its factual bounds.');
  quantities.set(id,(quantities.get(id)||0n)+quantity);
  categoryTotals.set(rule!.category,(categoryTotals.get(rule!.category)||0n)+points);
 }
 for(const [category,points]of categoryTotals)requireFact(BigInt(r.categories[category as keyof typeof r.categories]||'0')===points,'Category total does not match its awards.');
 requireFact(Object.keys(r.categories).every(k=>categoryTotals.has(k)),'Unknown score category.');
 const qty=(id:string)=>quantities.get(id)||0n;
 requireFact(qty('mandate')===1n&&qty('bounds')===1n&&qty('boundDigit')===BigInt(r.verification.mandate.length)&&qty('runtime')<=1n&&qty('ownership')<=1n,'Run admission was credited more than once.');
 requireFact(qty('line')===through&&qty('separator')===through,'Publication counts do not match disclosure.');
 requireFact(qty('character')<=through*(digits>8n?digits:8n),'Character count exceeds disclosed output.');
 requireFact(qty('fizz')===through/3n-through/15n&&qty('buzz')===through/5n-through/15n&&qty('fizzbuzz')===through/15n,'Classification counts do not match disclosed ordinals.');
 const appointments=sum(Object.values(r.verification.counts));
 requireFact(qty('appointment')===appointments&&sum(Object.values(r.identities))===appointments&&BigInt(r.counters.appointments||'0')===appointments,'Companion counts do not reconcile.');
 requireFact(appointments+BigInt(r.verification.disabled)===through/3n+through/5n-through/15n,'Companion coverage does not match disclosure.');
 const legendary=BigInt(r.verification.counts.Legendary),mythic=BigInt(r.verification.counts.Mythic);
 requireFact(qty('entrance')===legendary+mythic&&BigInt(r.buckets['entrance|1']?.points||'0')===legendary*BigInt(rarityTables.entrance.Legendary)+mythic*BigInt(rarityTables.entrance.Mythic),'Entrance grants do not match rarity counts.');
 for(const [id,kind]of [['biography','biography'],['evidence','evidence'],['department','department'],['curiosity','curiosity']])requireFact(qty(id)===BigInt(r.inspections.filter(x=>x.startsWith(kind+'|')).length),'Inspection award count does not match its identities.');
 const moves=qty('moveCharter');
 requireFact(moves<=1n+through/100n&&BigInt(r.warrants)===1n+through/100n-moves,'Reorganization warrants do not reconcile.');
 for(const [id,n]of Object.entries({movePack:8,moveRoom:8,moveUnpack:8,moveAddress:8,movePartition:8,moveRoute:56,moveMinutes:1}))requireFact(qty(id)===moves*BigInt(n),'Reorganization awards do not match completed moves.');
 for(const badge of edition!.badges){
  const count=BigInt(r.counters[badge.counter]||'0'),target=BigInt(badge.target),tier=badge.repeat?count/target:count>=target?1n:0n;
  requireFact(BigInt(r.badges[badge.id]||'0')===tier,'Badge tier does not match progress.');
  if(badge.award)requireFact(qty(badge.award)===tier,'Badge award does not match its tier.');
 }
 let magnitude=0n,milestones=0n;for(let n=10n;n<=through;n*=10n){magnitude+=1000n*n;milestones++;}
 requireFact(BigInt(r.buckets['magnitude|1']?.points||'0')===magnitude&&qty('magnitude')===milestones,'Magnitude awards do not match disclosure.');
 const dividend=r.status==='completed'?5000n+100n*through+(BigInt(r.gross)-BigInt(r.stolen)+BigInt(r.recovered))/10n:0n;
 requireFact(BigInt(r.dividend)===dividend,'Completion dividend is invalid.');
 requireFact(r.status!=='completed'||r.verification.through===r.verification.mandate&&!r.incident,'Completed run has unfinished work.');
 const heists=[...(r.closedHeists||[]),...(r.incident?.kind==='heist'?[r.incident]:[])];
 requireFact(heists.length<=scoringPolicy.heistLimit&&new Set(heists.map(h=>h.id)).size===heists.length,'Invalid heist custody.');
 for(const h of heists){
  requireFact([h.opening,h.stolen,h.recovered,h.budget].every(boundedDecimal)&&Number.isFinite(h.elapsed)&&h.elapsed>=0&&h.elapsed<=scoringPolicy.chaseMs,'Invalid heist amounts.');
  const f=heistFinancials(BigInt(h.opening),h.elapsed,BigInt(h.recovered)>0n);
  requireFact(h.budget===String(f.budget)&&h.stolen===String(f.stolen)&&h.recovered===String(f.recovery),'Heist transfers do not match their timing.');
 }
 requireFact(sum(heists.map(h=>h.stolen))===BigInt(r.stolen)&&sum(heists.map(h=>h.recovered))===BigInt(r.recovered),'Heist ledger does not reconcile.');
 requireFact(qty('heistCase')===BigInt(heists.length),'Heist case count does not match custody.');
 requireFact(qty('flightLanding')===BigInt(r.counters.flights||'0')&&qty('flightFirstPilot')===BigInt(r.pilots.length)&&qty('heistCatch')===BigInt(r.counters.heists||'0'),'Incident achievements do not match their completion counters.');
 for(const rule of edition!.rules.filter(x=>x.scope==='incident'))requireFact(qty(rule.id)<=qty(rule.id.startsWith('flight')?'flightManifest':'heistCase')*BigInt(rule.cap??1),'Incident award exceeds its per-incident cap.');
 if(previous){
  const p=previous.run;
  requireFact(p.id===r.id&&p.identity===r.identity&&p.startedAt===r.startedAt&&p.verification.mandate===r.verification.mandate&&p.verification.initialAuthority===r.verification.initialAuthority&&JSON.stringify(p.conditions)===JSON.stringify(r.conditions),'Run properties changed after admission.');
  requireFact(p.status==='active'||p.status!=='completed'&&p.status===r.status,'This run has already been finalized.');
  requireFact(through>=BigInt(p.verification.through),'Disclosure cannot move backward.');
  for(const k of ['gross','stolen','recovered','dividend'] as const)requireFact(BigInt(r[k])>=BigInt(p[k]),'Cumulative accounting cannot move backward.');
  for(const [key,b]of Object.entries(p.buckets))requireFact(BigInt(r.buckets[key]?.points||'0')>=BigInt(b.points)&&BigInt(r.buckets[key]?.quantity||'0')>=BigInt(b.quantity),'Earned awards cannot disappear.');
 }
 return structuredClone(receipt);
}
