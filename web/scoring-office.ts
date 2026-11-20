import {officeFlight} from './office-flight';
import {officeHeist} from './office-heist';
import {officeEstate} from './office-estate';
import {foldMs,cruiseMs,loopMs,type FlightSnapshot,type FlightResolution} from './office-flight-model';
import type {HeistSnapshot,HeistResolution} from './office-heist-model';
import type {EnterpriseScoringService} from './scoring-service';

/** Translate completed office facts, never pixels, narration or button-click counts. */
export class OfficeScoringAdapter {
 private busy=false;private seenFlight=0;private seenHeist=0;private lastHeistTick='';private priorElapsed=0;private moveRun?:string;private moveHadWork=false;
 private flightOwner?:{id:number;run?:string};private heistOwner?:{id:number;run?:string};
 constructor(private readonly scoring:EnterpriseScoringService){
  officeFlight.subscribe(()=>this.sync());officeHeist.subscribe(()=>this.sync());scoring.subscribe(()=>this.sync());
  officeEstate.subscribe(event=>{
   if(event.kind==='staged'){this.moveRun=scoring.runId;this.moveHadWork=!!scoring.runId&&(BigInt(scoring.through)>0n||officeFlight.active||officeHeist.active);}
   if(event.kind==='committed'){scoring.reorganized(event.relocation.to.placements.map(p=>p.partition).filter(p=>p!=='classic'),!!event.relocation.to.amenity,this.moveHadWork,this.moveRun);this.moveRun=undefined;}
   if(event.kind==='cancelled')this.moveRun=undefined;
  });
 }
 private sync(){
  if(this.busy)return;this.busy=true;
  try{
   const flight=officeFlight.snapshot,heist=officeHeist.snapshot;
   if(flight&&this.flightOwner?.id!==flight.id)this.flightOwner={id:flight.id,run:this.scoring.runId};
   if(heist&&this.heistOwner?.id!==heist.id)this.heistOwner={id:heist.id,run:this.scoring.runId};
   if(flight)this.flight(flight);else {const ended=officeFlight.records.at(-1);if(ended&&ended.id>this.seenFlight)this.flight(ended.snapshot,ended.resolution);}
   if(heist)this.heist(heist);else {const ended=officeHeist.records.at(-1);if(ended&&ended.id>this.seenHeist)this.heist(ended.snapshot,ended.resolution);}
  }finally{this.busy=false;}
 }
 private flight(s:FlightSnapshot,resolution?:FlightResolution){
  if(s.plan.source!=='encounter'){if(resolution)this.seenFlight=s.id;return;}
  const id=String(s.id),run=this.scoring.runId;if(!run||this.flightOwner?.run!==run){if(resolution)this.seenFlight=s.id;return;}if(BigInt(s.plan.ordinal)>BigInt(this.scoring.through))return;
  const rarity=s.plan.actors[0].rarity;if(!rarity){this.scoring.markPartial();this.seenFlight=s.id;return;}
  if(!this.scoring.incident)this.scoring.startIncident('flight',id,s.plan.ordinal,rarity,run);
  const delivered=!!resolution&&['landed','redirected','expedited','skipped'].includes(resolution),successful=delivered&&resolution!=='skipped';
  const loops=Math.min(s.plan.loops,Math.max(0,Math.floor((s.flown-foldMs-cruiseMs)/loopMs)));
  this.scoring.incidentWork(id,{flightManifest:1,flightCrew:s.plan.actors.length,flightFold:s.flown>=foldMs?1:0,flightDeparture:s.flown>=foldMs?1:0,flightCheckpoint:s.passed,flightLoop:loops,flightPersonality:s.flown>=foldMs?1:0,flightApproach:s.phase==='landing'?1:0,flightLanding:successful?1:0,flightFinding:delivered?1:0,flightDelivery:delivered?1:0,flightFan:delivered?s.applied.filter(f=>f!==0).length:0,flightDestination:delivered&&s.destination!=='memory'&&s.arrival===s.destination?1:0},run);
  if(s.elapsed>this.priorElapsed)this.scoring.resumedIncident(id,run);this.priorElapsed=s.elapsed;
  if(resolution){this.seenFlight=s.id;this.scoring.finishIncident(id,successful,s.plan.tactic,run);this.priorElapsed=0;}
 }
 private heist(s:HeistSnapshot,resolution?:HeistResolution){
  if(s.plan.source!=='encounter'){if(resolution)this.seenHeist=s.id;return;}
  const id=String(s.id),run=this.scoring.runId;if(!run||this.heistOwner?.run!==run){if(resolution)this.seenHeist=s.id;return;}if(BigInt(s.plan.ordinal)>BigInt(this.scoring.through))return;
  const rarity=s.plan.actors[0].rarity;if(!rarity){this.scoring.markPartial();this.seenHeist=s.id;return;}
  if(!this.scoring.incident)this.scoring.startIncident('heist',id,s.plan.ordinal,rarity,run);
  this.scoring.incidentWork(id,{heistCase:1,heistSuspect:s.plan.actors.length,heistTactic:1,heistFootprints:s.footprints?1:0,heistAlibi:s.alibis.length},run);
  const outcome=s.resolution||resolution,player=outcome==='intercepted'||outcome==='biscuit';
  const tick=run+'|'+id+'|'+Math.floor(s.chaseElapsed/250)+'|'+outcome;
  if(tick!==this.lastHeistTick){this.lastHeistTick=tick;this.scoring.advanceHeist(id,s.chaseElapsed,player?'player':outcome==='automatic'?'automatic':resolution?'cancelled':undefined,run);}
  if(s.elapsed>this.priorElapsed)this.scoring.resumedIncident(id,run);this.priorElapsed=s.elapsed;
  if(resolution){const closed=player||resolution==='automatic';this.scoring.incidentWork(id,{heistReturn:closed?1:0,heistReport:closed?1:0},run);this.seenHeist=s.id;this.scoring.finishIncident(id,closed,undefined,run);this.priorElapsed=0;}
 }
}
