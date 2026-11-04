import type {PartitionId} from './office-layout.ts';
export type PartColor='pink'|'brass'|'white'|'yellow'|'wood'|'red'|'green'|'cardboard'|'steel'|'bubble'|'black'|'waffle';
export interface PartitionPart {shape:'box'|'sphere'|'cylinder'|'cone'|'heart'|'cheese';size:[number,number,number];position:[number,number,number];color:PartColor;angle?:number}
export interface PartitionStrategy {parts(width:number):readonly PartitionPart[]}
export const partitionColors:Record<PartColor,string>={pink:'#e67caa',brass:'#c59943',white:'#fff7e4',yellow:'#e8b835',wood:'#bd9162',red:'#c54942',green:'#548657',cardboard:'#bd8752',steel:'#729196',bubble:'#b8dcd9',black:'#243e40',waffle:'#d6a758'};
export function partitionParts(style:Exclude<PartitionId,'classic'>,width:number):PartitionPart[]{
 if(!Number.isFinite(width)||width<1||width>6)throw new Error('A partition requires a comprehensible width.');
 const parts:PartitionPart[]=[],add=(shape:PartitionPart['shape'],color:PartColor,size:PartitionPart['size'],position:PartitionPart['position'],angle=0)=>parts.push({shape,color,size,position,angle});
 const box=(color:PartColor,w:number,h:number,d:number,x:number,y:number,z=0,angle=0)=>add('box',color,[w,h,d],[x,y,z],angle);
 const spread=(spacing:number,callback:(x:number,index:number)=>void)=>{const count=Math.max(1,Math.floor(width/spacing));for(let i=0;i<count;i++)callback((i-(count-1)/2)*(width/count),i);};
 if(style==='hearts'){spread(1.7,x=>{add('heart','pink',[Math.min(1.65,width-.12),1.8,.14],[x,1.12,0]);box('brass',.07,.8,.07,x,.4);});}
 if(style==='bars'){spread(.25,x=>add('cylinder','steel',[.065,1.85,.065],[x,.95,0]));for(const y of [.15,1.8])box('black',width,.09,.1,0,y);}
 if(style==='picket'){spread(.26,x=>{box('white',.16,1.05,.1,x,.55);add('cone','white',[.2,.18,.14],[x,1.165,0]);});for(const y of [.3,.82])box('white',width,.09,.08,0,y,.07);}
 if(style==='cheese'){const count=Math.max(1,Math.floor(width/1.5));for(let i=0;i<count;i++)add('cheese','yellow',[width/count-.035,1.8,.18],[(i-(count-1)/2)*(width/count),1,0]);}
 if(style==='blinds'){for(let i=0;i<9;i++)box('wood',width,.13,.16,0,.25+i*.19,0,.06);for(const x of [-width*.3,width*.3])box('white',.025,1.9,.025,x,1,.1);}
 if(style==='tape'){for(const x of [-width/2+.08,width/2-.08])add('cylinder','brass',[.07,1.8,.07],[x,.9,0]);const length=Math.hypot(width-.16,.8),angle=Math.atan2(.8,width-.16);for(const y of [.65,1.1])for(const sign of [-1,1])box('red',length,.075,.045,0,y,sign*.03,sign*angle);}
 if(style==='hedges'){box('green',width,1.35,.22,0,.76);spread(.5,x=>add('sphere','green',[.55,.6,.34],[x,1.48,0]));box('wood',width,.16,.32,0,.15);}
 if(style==='cardboard'){spread(.8,(x,i)=>{for(let row=0;row<2;row++){box('cardboard',width/Math.max(1,Math.floor(width/.8))-.04,.73,.24,x,.43+row*.76);box('white',.08,.69,.025,x,.43+row*.76,-.135);}box('wood',.35,.035,.03,x,.7,-.15,i%2?.08:-.08);});}
 if(style==='cabinets'){spread(.85,x=>{box('steel',.7,1.8,.25,x,.94);for(let i=0;i<4;i++){box('black',.63,.025,.03,x,.35+i*.4,-.14);box('brass',.17,.04,.065,x,.45+i*.4,-.18);}});}
 if(style==='bubbles'){for(let y=0;y<4;y++)spread(.38,x=>add('sphere','bubble',[.33,.33,.2],[x,.35+y*.38,0]));for(const y of [.15,1.7])box('white',width,.045,.05,0,y,.06);}
 if(style==='dominoes'){spread(.9,(x,i)=>{box('white',.72,1.8,.18,x,.95);box('black',.63,.035,.025,x,.95,-.105);for(const y of [.4,.65,1.25,1.5])for(const dx of [-.17,.17])add('sphere','black',[.08,.08,.035],[x+dx,y,-.11]);if(i%2===0)add('sphere','black',[.08,.08,.035],[x,1.1,-.11]);});}
 if(style==='waffles'){spread(.3,x=>box('waffle',.11,1.75,.17,x,.95));for(let i=0;i<6;i++)box('waffle',width,.11,.17,0,.2+i*.3);}
 return parts;
}
const strategy=(style:Exclude<PartitionId,'classic'>):PartitionStrategy=>({parts:width=>partitionParts(style,width)});
export const partitionStrategies={hearts:strategy('hearts'),bars:strategy('bars'),picket:strategy('picket'),cheese:strategy('cheese'),blinds:strategy('blinds'),tape:strategy('tape'),hedges:strategy('hedges'),cardboard:strategy('cardboard'),cabinets:strategy('cabinets'),bubbles:strategy('bubbles'),dominoes:strategy('dominoes'),waffles:strategy('waffles')} satisfies Record<Exclude<PartitionId,'classic'>,PartitionStrategy>;
export interface SolidData {positions:number[];indices:number[];uvs:number[]}
const raw=():SolidData=>({positions:[],indices:[],uvs:[]});
const vertex=(data:SolidData,x:number,y:number,z:number)=>{const index=data.positions.length/3;data.positions.push(x,y,z);data.uvs.push(x+.5,y+.5);return index;};
const quad=(d:SolidData,a:number[],b:number[],c:number[],e:number[])=>{const ids=[a,b,c,e].map(p=>vertex(d,p[0],p[1],p[2]));d.indices.push(ids[0],ids[1],ids[2],ids[0],ids[2],ids[3]);};
/** Original closed heart silhouette; caps and perimeter are real geometry. */
export function heartSolid():SolidData {
 const d=raw(),points=Array.from({length:64},(_,i)=>{const t=i/64*Math.PI*2;return [16*Math.sin(t)**3/32,(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t)+2.5)/29];});
 for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length];for(const z of [-.5,.5]){const ids=[[0,0,z],[a[0],a[1],z],[b[0],b[1],z]].map(p=>vertex(d,...p as [number,number,number]));d.indices.push(...(z<0?ids:[ids[0],ids[2],ids[1]]));}quad(d,[a[0],a[1],-.5],[a[0],a[1],.5],[b[0],b[1],.5],[b[0],b[1],-.5]);}
 return d;
}
/** A rectangular cheese tile with a genuine through-hole, including its inner wall. */
export function cheeseSolid():SolidData {
 const d=raw(),angles=[...Array.from({length:48},(_,i)=>i/48*Math.PI*2),Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4].sort((a,b)=>a-b).filter((a,i,all)=>i===0||a-all[i-1]>.00001);
 const ring=(angle:number,inner:boolean,z:number)=>{const c=Math.cos(angle),s=Math.sin(angle),r=inner?.24:.5/Math.max(Math.abs(c),Math.abs(s));return [r*c,r*s,z];};
 for(let i=0;i<angles.length;i++){const a=angles[i],b=angles[(i+1)%angles.length];for(const z of [-.5,.5]){const p=[ring(a,true,z),ring(a,false,z),ring(b,false,z),ring(b,true,z)];if(z>0)p.reverse();quad(d,p[0],p[1],p[2],p[3]);}quad(d,ring(a,true,-.5),ring(b,true,-.5),ring(b,true,.5),ring(a,true,.5));quad(d,ring(a,false,-.5),ring(a,false,.5),ring(b,false,.5),ring(b,false,-.5));}for(let i=0;i<d.indices.length;i+=3)[d.indices[i+1],d.indices[i+2]]=[d.indices[i+2],d.indices[i+1]];return d;
}
