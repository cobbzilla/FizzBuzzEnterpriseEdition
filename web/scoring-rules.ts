import {integer as n,field as v,operation as op,product as mul,sum,clamp,lookup,validateExpression,type Expression} from './scoring-language.ts';
export const scoringVersion='enterprise-v2';
export type Category='Procedural work'|'Publication'|'Numerical distinctions'|'Companions'|'Extraordinary operations'|'Office literacy'|'Achievements'|'Completion dividend';
export type Scope='cycle'|'incident'|'flat';
export interface MeritRule {id:string;title:string;category:Category;scope:Scope;formula:Expression;eligibility:string;cap?:number}
const rates=(category:Category,scope:Scope,items:readonly (readonly [string,string,number,string?,number?])[]):MeritRule[]=>items.map(([id,title,rate,eligibility,cap])=>({id,title,category,scope,formula:mul(n(rate),v('quantity')),eligibility:eligibility||'Each actual completed occurrence, once per unique receipt.',...(cap===undefined?{}:{cap})}));
export const rarityTables={salary:{Common:'100',Uncommon:'250',Rare:'1000',Legendary:'10000',Mythic:'100000'},rarity:{Common:'1',Uncommon:'2',Rare:'5',Legendary:'10',Mythic:'25'},entrance:{Common:'0',Uncommon:'0',Rare:'0',Legendary:'250000',Mythic:'2500000'}} as const;
export const boostSchedule=[{every:'5000',factor:10,cycles:1},{every:'1000',factor:5,cycles:4},{every:'500',factor:3,cycles:10},{every:'250',factor:2,cycles:20}] as const;
export const scoringPolicy={recentReceipts:100,companionIdentities:3200,reorganizationEvery:'100',initialWarrants:'1',graceMs:3000,chaseMs:15000,fullRecoveryThroughMs:4000,minimumRecoveryFromMs:14000,heistLimit:3,flightPersonalities:13,partitionStyles:12,departments:8,loyaltyEvery:'10'} as const;
export const financialRules={
 budget:op('floorDivide',mul(v('openingScore'),n(800)),n(10000)),
 stolen:op('floorDivide',mul(v('budget'),clamp(op('subtract',v('elapsedMs'),n(scoringPolicy.graceMs)),n(0),n(scoringPolicy.chaseMs-scoringPolicy.graceMs))),n(scoringPolicy.chaseMs-scoringPolicy.graceMs)),
 recoveryBasisPoints:clamp(op('subtract',n(10000),op('floorDivide',mul(n(9),op('max',n(0),op('subtract',v('elapsedMs'),n(scoringPolicy.fullRecoveryThroughMs)))),n(10))),n(1000),n(10000)),
 recovery:op('min',v('stolen'),op('ceilDivide',mul(v('stolen'),v('recoveryBasisPoints')),n(10000)))
};
export const meritRules:readonly MeritRule[]=[
 ...rates('Procedural work','cycle',[
 ['runtime','Runtime readiness confirmed',2],['ownership','Execution ownership confirmed',2],['mandate','Mandate accepted',5],['bounds','Bounds validated',2],['boundDigit','Canonical bound digit validated',1],
 ['cacheLookup','Cache lookup',2],['cacheDisposition','Cache hit, miss or bypass established',3],['priorExam','Prior-work authority examination',5],['priorReuse','Prior-work reuse authorized',10],['window','New extended window admitted',5],
 ['hrPlanning','Headcount Planning approval',5],['hrRecruitment','Recruitment approval',5],['hrIdentity','Identity approval',5],['hrOffer','Offer approval',5],['hrInduction','Induction approval',5],['hrProbation','Probation approval',5],['hrAudit','Independent personnel audit',5],
 ['ballot','Continuation ballot',1],['continuation','Continuation certified',2],['context','Fizz, Buzz or numeral context appointed',2],['visitor','Shared visitor convened',2],['classification','Classification vote',2],['witness','Arithmetic witness',3],['printer','Printer consultation, including correct refusal',2],
 ['premises','Request-owned premises allocation',2],['vacancy','Initial vacancy inspection',2],['hiddenGlyph','Hidden character identified',1],['evictionDecision','Eviction decision, including not required',3],['evictedGlyph','Hidden character removed',1],['reinspection','Vacancy reinspection',3],['lease','Single-use lease',3],['premisesAudit','Independent premises audit',5],['vacancyCertificate','Vacancy certificate filed',3],
 ['transaction','Transaction opened',3],['requisition','Product requisition',4],['allocation','Position-specific glyph allocated',1],['delivery','Product delivered',3],['acceptedGlyph','Glyph accepted',4],['placedGlyph','Accepted glyph placed',1],['assembly','Completed word assembly certified',8],['numeral','Numeral conversion',3],['digit','Decimal digit placed',1],['fragment','Output fragment staged',2],['notary','Independent arithmetic or lexical notarization',8],['payload','Complete payload published',10],['audit','Audit record appended',8],['enqueue','Queue entry created',2],['acknowledge','Consumer acknowledgement',3],['commit','Transaction committed',5],['release','Occupancy released',2],['cleanup','Staging cleanup',2],['successionPetition','Succession petition',1],['successor','Successor certified',2],['advance','Ordinal advanced',1],['complete','Mandate completion recorded',10],['rejection','Certified rejection',3,'First certified rejection per logical operation; retries do not pay again.'],['rollback','Certified rollback',4,'Once per rejected logical operation. Errors themselves earn nothing.']
 ]),
 ...rates('Publication','cycle',[['line','New output line',5],['character','Visible output character',1],['separator','Line separator',1],['fizz','Fizz classification',10,'Exclusive of Buzz and FizzBuzz.'],['buzz','Buzz classification',15,'Exclusive of Fizz and FizzBuzz.'],['fizzbuzz','FizzBuzz classification',50,'Exclusive of Fizz and Buzz.']]),
 ...([
 ['digitSum','Decimal digit sum',op('digitSum',v('ordinal'))],
 ['zeroes','Trailing decimal zeroes',mul(n(25),op('trailingZeroes',v('ordinal')))],
 ['palindrome','Multi-digit palindrome',mul(n(100),op('digits',v('ordinal')),op('palindrome',v('ordinal')))],
 ['identical','Multi-digit identical digits',mul(n(150),op('digits',v('ordinal')),op('identicalDigits',v('ordinal')))],
 ['powerTen','Exact power of ten',mul(n(100),op('powerOfTen',v('ordinal')))]
 ] as const).map(([id,title,formula])=>({id,title,formula,category:'Numerical distinctions' as const,scope:'cycle' as const,eligibility:'Once per newly disclosed ordinal. Qualifying numerical distinctions stack.'})),
 {id:'appointment',title:'Companion salary and supplements',category:'Companions',scope:'cycle',formula:sum(mul(lookup('rarity','rarity'),sum(lookup('salary','rarity'),mul(n(250),v('paired')),mul(n(500),v('loyalty')))),mul(n(1000),v('first'))),eligibility:'Every genuine appointment, including repeats. Pair supplement once per appointment; loyalty every tenth appointment of the identity; first identity once per run.'},
 {id:'entrance',title:'Legendary or Mythic entrance grant',category:'Companions',scope:'flat',formula:lookup('entrance','rarity'),eligibility:'Every genuine appointment, including repeats. Never multiplied.'},
 ...rates('Extraordinary operations','incident',[
 ['flightManifest','Flight manifest registered',100],['flightCrew','Actual crew boarded',50,'Actual crew only; no companion appointment awarded.',3],['flightFold','Aircraft folded',200],['flightDeparture','Departure completed',300],['flightCheckpoint','Fan checkpoint passed',100,undefined,3],['flightLoop','Authorized holding loop completed',150,undefined,3],['flightPersonality','Signature personality maneuver completed',300],['flightApproach','Final approach',200],['flightLanding','Landing completed',1000],['flightFinding','Delivery finding recorded',500],['flightDelivery','Successful direct, courier or expedited delivery',500],['flightFan','Final effective non-default fan policy',100,'Once per fan; repeated adjustment does not repay.',3],['flightDestination','Non-default destination actually served',200],['flightFirstPilot','First completed flight by this personality',500,'Once per personality per run.'],['flightResume','Flight continued after reorganization',500,'Once per flight, after actual progress resumes.'],
 ['heistCase','Heist case registered',100],['heistSuspect','Actual suspect registered',50,undefined,3],['heistTactic','Signature tactic identified',300,'Once at identification; waiting for escape earns nothing.'],['heistFootprints','Footprints inspected',200,'Once per case.'],['heistAlibi','Distinct innocent alibi',100,undefined,2],['heistCatch','Successful player interception or amnesty',1000,'No award for automatic return, skip, disable or cancellation.'],['heistReturn','Stamp returned',500],['heistReport','Case report filed',250],['heistResume','Heist continued after reorganization',500,'Once per case, after actual progress resumes.']
 ]),
 ...rates('Extraordinary operations','flat',[
 ['moveCharter','Reorganization charter',100],['movePack','Room packed',25,undefined,8],['moveRoom','Room moved',50,undefined,8],['moveUnpack','Room unpacked',25,undefined,8],['moveAddress','Room address rebound',10,undefined,8],['movePartition','Room partition certified',25,undefined,8],['moveRoute','Directed route validated',1,undefined,56],['moveAmenity','Ninth amenity accommodated',100],['moveMinutes','Reorganization minutes filed',100],['moveResume','Interrupted work advanced afterward',250]
 ]),
 ...rates('Office literacy','flat',[
 ['biography','Appointed companion biography inspected',25,'First inspection of each actually appointed identity in this run.'],['evidence','Procedural evidence kind inspected',5,'First inspection of each kind of actual evidence in this run.'],['department','Department inspected',10,'First inspection of each department in this run.'],['curiosity','Authored curiosity response inspected',20,'First inspection of each authored response in this run.']
 ]),
 ...rates('Achievements','flat',[
 ['bingo','Bureaucratic Bingo',500,'Every fresh set of numeral, Fizz, Buzz and FizzBuzz; collection resets after award.'],['century','Century of Consequences',10000,'Every 100 newly disclosed lines.'],['committee','Appointment Committee',2500,'Every ten appointments, including repeats.'],['airline','Paper Airline',25000,'Every five successful natural flights.'],['affairs','Internal Affairs',15000,'Three player-resolved natural heists, once per run.'],['spectrum','Full Spectrum of Improbability',100000,'All five rarities appointed, once per run.'],['census','Personality Census',250000,'All thirteen pilot personalities completed, once per run.'],['partitions','Partition Connoisseur',25000,'All twelve styles installed through scored reorganizations, once per run.'],['departments','Departmental Completionist',2000,'All eight departments inspected, once per run.']
 ]),
 {id:'magnitude',title:'Orders of Magnitude',category:'Achievements',scope:'flat',formula:mul(n(1000),v('threshold')),eligibility:'Once at each completed-line count 10, 100, 1,000 and subsequent powers of ten.'},
 {id:'dividend',title:'Completion dividend',category:'Completion dividend',scope:'flat',formula:sum(n(5000),mul(n(100),v('completed')),op('floorDivide',v('netScore'),n(10))),eligibility:'Once after a positive-length mandate finishes and its incidents settle. Uses net score before this dividend; abandoned runs do not qualify.'}
];
export const ruleById=new Map(meritRules.map(rule=>[rule.id,rule]));
export interface BadgeRule {id:string;title:string;counter:string;target:string;repeat:boolean;award?:string;description:string}
export const badgeRules:readonly BadgeRule[]=[
 {id:'bingo',title:'Bureaucratic Bingo',counter:'bingo',target:'1',repeat:true,award:'bingo',description:'Complete a fresh set of numeral, Fizz, Buzz and FizzBuzz.'},
 {id:'century',title:'Century of Consequences',counter:'lines',target:'100',repeat:true,award:'century',description:'Disclose a century of output lines.'},
 {id:'committee',title:'Appointment Committee',counter:'appointments',target:'10',repeat:true,award:'committee',description:'Appoint ten companions. Repeats count.'},
 {id:'airline',title:'Paper Airline',counter:'flights',target:'5',repeat:true,award:'airline',description:'Complete five successful natural flights.'},
 {id:'affairs',title:'Internal Affairs',counter:'heists',target:'3',repeat:false,award:'affairs',description:'Resolve three natural heists by interception or amnesty.'},
 {id:'spectrum',title:'Full Spectrum of Improbability',counter:'rarities',target:'5',repeat:false,award:'spectrum',description:'Appoint all five rarities.'},
 {id:'census',title:'Personality Census',counter:'pilots',target:String(scoringPolicy.flightPersonalities),repeat:false,award:'census',description:'Complete flights with every pilot personality, including the acting clerk.'},
 {id:'partitions',title:'Partition Connoisseur',counter:'partitions',target:String(scoringPolicy.partitionStyles),repeat:false,award:'partitions',description:'Install every partition style through scored moves.'},
 {id:'departments',title:'Departmental Completionist',counter:'departments',target:String(scoringPolicy.departments),repeat:false,award:'departments',description:'Inspect every department.'},
 {id:'magnitude',title:'Orders of Magnitude',counter:'magnitude',target:'1',repeat:true,description:'Cross a power-of-ten completed-line milestone; award is 1,000 times the threshold.'},
 {id:'untouched',title:'Not One Point',counter:'untouched',target:'1',repeat:false,description:'Stop a heist with a positive budget before its first debit. Recognition only.'},
 {id:'reappropriation',title:'Reappropriation',counter:'reappropriation',target:'1',repeat:false,description:'Recover stolen points. Recognition only.'},
 {id:'authority',title:'Temporary Executive Powers',counter:'boosted',target:'1',repeat:false,description:'Complete a boosted cycle. Recognition only.'},
 {id:'ratified',title:'Ratified at Last',counter:'completed',target:'1',repeat:false,description:'Earn a completion dividend. Recognition only.'},
 {id:'legendary',title:'Legendary Appointment',counter:'legendary',target:'1',repeat:false,description:'Receive a Legendary appointment. Recognition only.'},
 {id:'mythic',title:'Mythic Appointment',counter:'mythic',target:'1',repeat:false,description:'Receive a Mythic appointment. Recognition only.'}
];
export const rulesManifest={version:scoringVersion,tables:rarityTables,boosts:boostSchedule,policy:scoringPolicy,financial:financialRules,rules:meritRules,badges:badgeRules};
export function validateRules(){
 if(ruleById.size!==meritRules.length||new Set(badgeRules.map(b=>b.id)).size!==badgeRules.length)throw Error('Duplicate rule or badge');
 for(const rule of meritRules){validateExpression(rule.formula,rarityTables);if(!rule.eligibility||!rule.title||rule.cap!==undefined&&rule.cap<1)throw Error('Incomplete rule');}
 for(const formula of Object.values(financialRules))validateExpression(formula,rarityTables);
 for(const badge of badgeRules)if(badge.award&&!ruleById.has(badge.award)||BigInt(badge.target)<1n)throw Error('Invalid badge criterion');
 for(const boost of boostSchedule)if(boost.cycles<1||boost.cycles>=Number(boost.every)||boost.factor<=1)throw Error('Unbounded boost');
}
validateRules();
/** Stable content identity shared by runtime and static guide; build additionally seals SHA-256. */
export function manifestIdentity(){let hash=2166136261;for(const c of JSON.stringify(rulesManifest))hash=Math.imul(hash^c.charCodeAt(0),16777619)>>>0;return hash.toString(16).padStart(8,'0');}
export const rulesIdentity=manifestIdentity();
export const guidePath=`scoring/${scoringVersion}/${rulesIdentity}/`;
