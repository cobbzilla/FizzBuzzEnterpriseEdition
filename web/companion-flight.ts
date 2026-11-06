export interface FlightPoint {x:number;y:number}
export interface FlightPlan {duration:number;target:FlightPoint;frames:Keyframe[]}
const fold=(value:number,low:number,high:number)=>{const span=Math.max(1,high-low),phase=((value-low)%(2*span)+2*span)%(2*span);return low+(phase<=span?phase:2*span-phase);};
/** Independent durations, wall rebounds and springy lift; no early disappearance. */
export function companionFlight(start:FlightPoint,viewport:{width:number;height:number},random= Math.random):FlightPlan {
 const draw=()=>Math.max(0,Math.min(1,random())),duration=4000+draw()*6000,edge=draw(),margin=40;
 const target=edge<.7?{x:20+draw()*Math.max(1,viewport.width-40),y:-margin}: {x:edge<.85?-margin:viewport.width+margin,y:draw()*viewport.height*.2};
 const sway=(.18+draw()*.3)*viewport.width*(draw()<.5?-1:1),bounce=25+draw()*35,frames:Keyframe[]=[];
 for(let index=0;index<=40;index++){
  const t=index/40,progress=(1-Math.cos(Math.PI*t))/2;
  const rawX=start.x+(target.x-start.x)*progress+Math.sin(3*Math.PI*t)*sway*(1-t);
  const rawY=start.y+(target.y-start.y)*progress+Math.sin(5*Math.PI*t)*bounce*(1-t);
  const exit=Math.max(0,(t-.85)/.15),blend=exit*exit*(3-2*exit),x=fold(rawX,18,viewport.width-18)*(1-blend)+rawX*blend,y=Math.min(rawY,2*(viewport.height-18)-rawY);
  const turn=Math.sin(6*Math.PI*t)*16+(x-start.x)/Math.max(1,viewport.width)*12;
  frames.push({offset:t,transform:`translate(${x-start.x}px,${y-start.y}px) rotate(${turn}deg) scale(${1+Math.sin(Math.PI*t)*.12})`,opacity:t<.95?1:(1-t)/.05});
 }
 return {duration,target,frames};
}
