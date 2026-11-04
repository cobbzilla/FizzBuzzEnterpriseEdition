import {addresses,routes,routeLength,pointAlong,layoutToken,type EstateLayout,type Point} from './office-layout.ts';
import {shotFor,type OfficeAnchor,type ObservedOfficeStep,type OfficeCue} from './office-supervision-model.ts';
export interface DirectedPose {target:Point;file:Point;alpha:number;beta:number;radius:number}
const lerp=(a:number,b:number,t:number)=>a+(b-a)*t;
const angle=(a:number,b:number,t:number)=>a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*t;
/** A bounded, replaceable presentation director. Coordinates never live in the evidence. */
export class OfficeShotDirector {
 private key='';private path:readonly Point[]=[];
 route(step:ObservedOfficeStep,layout:EstateLayout){const key=layoutToken(layout)+'|'+step.origin?.room+'|'+step.origin?.station+'|'+step.shot.room+'|'+step.shot.anchor;if(key!==this.key){this.key=key;this.path=step.origin?routes(layout).route(step.origin,{room:step.shot.room,station:step.shot.anchor}):[addresses(layout).resolve({room:step.shot.room,station:step.shot.anchor})];}return this.path;}
 duration(step:ObservedOfficeStep,layout:EstateLayout){if(!step.origin)return step.arriveMs;const same=step.origin.room===step.shot.room;if(same&&step.origin.station===step.shot.anchor)return step.origin.hrIndex===step.hrIndex?0:620;return Math.round((same?650:1150)+routeLength(this.route(step,layout))/6*1000);}
 pose(cue:OfficeCue,layout:EstateLayout):DirectedPose {
  const step=cue.step,to=shotFor(step.shot.room,step.shot.anchor,step.hrIndex,layout),t=cue.travel;
  const from=step.origin?shotFor(step.origin.room,step.origin.station as OfficeAnchor,step.origin.hrIndex,layout):{...to,target:{x:0,y:.2,z:0},alpha:-Math.PI/2.6,beta:.88,radius:33};
  const p=pointAlong(this.route(step,layout),t),cross=!!step.origin&&step.origin.room!==step.shot.room;
  const target=step.origin?{x:p.x,y:lerp(from.target.y,to.target.y,t)+Math.sin(t*Math.PI)*.3,z:p.z}:{x:lerp(0,to.target.x,t),y:lerp(.2,to.target.y,t),z:lerp(0,to.target.z,t)};
  return {target,file:{x:p.x,y:0,z:p.z},alpha:angle(from.alpha,to.alpha,t),beta:lerp(from.beta,to.beta,t)-(cross?Math.sin(t*Math.PI)*.12:0),radius:lerp(from.radius,to.radius,t)+(cross?Math.sin(t*Math.PI)*5:0)};
 }
}
/** Keep either arrival fraction or completed work time when Facilities changes the commute. */
export function rebaseObservation(elapsed:number,oldArrival:number,newArrival:number){return elapsed<oldArrival&&oldArrival>0?elapsed/oldArrival*newArrival:Math.max(0,elapsed-oldArrival)+newArrival;}
