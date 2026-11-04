import {rooms,type RoomId} from './office-content.ts';

export const layoutVersion='estate-v1';
export const partitionStyles=[
 {id:'hearts',name:'Giant pink hearts',claim:'Psychological Safety Infrastructure',placard:'PSYCHOLOGICAL SAFETY'},
 {id:'bars',name:'Jail bars',claim:'Employee Autonomy Framework',placard:'EMPLOYEE AUTONOMY'},
 {id:'picket',name:'White picket fences',claim:'Boundaryless Collaboration',placard:'BOUNDARYLESS COLLABORATION'},
 {id:'cheese',name:'Giant cheese panels',claim:'A More Porous Organization',placard:'POROUS ORGANIZATION'},
 {id:'blinds',name:'Venetian blinds',claim:'Radical Transparency',placard:'RADICAL TRANSPARENCY'},
 {id:'tape',name:'Tangled red tape',claim:'Frictionless Delivery',placard:'FRICTIONLESS DELIVERY'},
 {id:'hedges',name:'Tall hedges',claim:'Organic Growth',placard:'ORGANIC GROWTH'},
 {id:'cardboard',name:'Cardboard fortifications',claim:'Permanent Interim Arrangements',placard:'PERMANENT INTERIM'},
 {id:'cabinets',name:'Filing cabinets',claim:'Open Access to Information',placard:'OPEN ACCESS'},
 {id:'bubbles',name:'Bubble-wrap panels',claim:'Organizational Resilience',placard:'RESILIENCE'},
 {id:'dominoes',name:'Oversized dominoes',claim:'Independent Risk Containment',placard:'RISK CONTAINMENT'},
 {id:'waffles',name:'Waffle grids',claim:'Matrix Management',placard:'MATRIX MANAGEMENT'},
] as const;
export type PartitionId='classic'|typeof partitionStyles[number]['id'];
export type StationId='desk'|'personnel'|'boundary'|'property'|'glyph'|'notary'|'printer'|'ledger'|'queue'|'memory'|'entrance';
export interface Point {x:number;y:number;z:number}
export interface OfficeAddress {room:RoomId;station:StationId}
export interface Placement {room:RoomId;slot:number;address:string;position:Point;yaw:number;partition:PartitionId}
export interface EstateLayout {version:typeof layoutVersion;seed:string;edition:number;rows:2|3;columns:3|4;placements:readonly Placement[];amenity?:{slot:number;address:string;kind:'atrium'|'breakroom';position:Point};bounds:{minX:number;maxX:number;minZ:number;maxZ:number}}
export interface EstateLayoutStrategy {create(seed:string,edition:number):EstateLayout}
export interface OfficeAddressBook {placement(room:RoomId):Placement;resolve(address:OfficeAddress):Point;local(room:RoomId,point:Point):Point;door(room:RoomId):Point;outside(room:RoomId):Point}
export interface CorridorRoutePlanner {route(from:OfficeAddress,to:OfficeAddress):readonly Point[]}
export const stationOffsets:Readonly<Record<StationId,Point>>={desk:{x:-.3,y:1.1,z:-.9},personnel:{x:-.3,y:1.1,z:-.9},boundary:{x:0,y:1.05,z:-1.65},property:{x:-2.35,y:.9,z:-1.6},glyph:{x:-.25,y:1.15,z:-.65},notary:{x:-2.35,y:1.1,z:-1.6},printer:{x:-2.35,y:.9,z:-1.6},ledger:{x:-.3,y:1.1,z:-.65},queue:{x:2.35,y:1,z:-1.6},memory:{x:-2.35,y:1.15,z:-1.6},entrance:{x:0,y:0,z:2.35}};
const width=7.2,depth=6.8;
const hash=(value:string)=>{let n=2166136261;for(const c of value)n=Math.imul(n^c.charCodeAt(0),16777619);return n>>>0;};
function random(seed:string){let n=hash(seed);return()=>{n+=0x6D2B79F5;let t=n;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
function shuffle<T>(values:readonly T[],rng:()=>number){const out=[...values];for(let i=out.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[out[i],out[j]]=[out[j],out[i]];}return out;}
const rounded=(n:number)=>Math.round(n*1e6)/1e6;
export const distance=(a:Point,b:Point)=>Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z);
const slotPosition=(slot:number,rows:number,columns:number):Point=>({x:rounded((slot%columns-(columns-1)/2)*width),y:0,z:rounded((Math.floor(slot/columns)-(rows-1)/2)*depth)});
const slotAddress=(slot:number,columns:number)=>String.fromCharCode(65+slot%columns)+(Math.floor(slot/columns)+1);
function generate(seed:string,edition:number,rows:2|3,columns:3|4):EstateLayout {
 if(!/^[a-f0-9]{32}$/.test(seed)||!Number.isSafeInteger(edition)||edition<0||edition>1000000)throw new Error('Facilities received an unfamiliar estate charter.');
 const rng=random(seed+':'+edition),slots=Array.from({length:rows*columns},(_,i)=>i),amenitySlot=rows===3?Math.floor(rng()*9):-1;
 const available=slots.filter(i=>i!==amenitySlot),order=edition===0?rooms.map(r=>r.id):shuffle(rooms.map(r=>r.id),rng);
 const palette=shuffle([...partitionStyles.map(s=>s.id)],rng);if(edition===1){palette.splice(palette.indexOf('hearts'),1);palette.splice(palette.indexOf('bars'),1);palette.unshift('hearts','bars');}
 const placements=order.map((room,i)=>{const slot=available[i],row=Math.floor(slot/columns);return Object.freeze({room,slot,address:slotAddress(slot,columns),position:Object.freeze(slotPosition(slot,rows,columns)),yaw:edition===0?0:row===rows-1?Math.PI:0,partition:edition===0?'classic' as const:palette[i]});});
 const amenity=amenitySlot<0?undefined:Object.freeze({slot:amenitySlot,address:slotAddress(amenitySlot,columns),kind:rng()<.5?'atrium' as const:'breakroom' as const,position:Object.freeze(slotPosition(amenitySlot,rows,columns))});
 return Object.freeze({version:layoutVersion,seed,edition,rows,columns,placements:Object.freeze(placements),amenity,bounds:Object.freeze({minX:-columns*width/2,maxX:columns*width/2,minZ:-rows*depth/2,maxZ:rows*depth/2})});
}
export const rowEstate:EstateLayoutStrategy={create:(s,e)=>generate(s,e,2,4)};
export const squareEstate:EstateLayoutStrategy={create:(s,e)=>generate(s,e,3,3)};
export function estate(seed:string,edition:number):EstateLayout{return (edition%2?squareEstate:rowEstate).create(seed,edition);}
export const foundingEstate=estate('00000000000000000000000000000000',0);
export function nextEstate(layout:EstateLayout){if(layout.edition>=1000000)throw new Error('One million transformations require a new company.');return estate(layout.seed,layout.edition+1);}
export function layoutToken(layout:EstateLayout){return layout.version+'.'+layout.seed+'.'+layout.edition;}
export function parseLayoutToken(token:string):EstateLayout {const m=/^estate-v1\.([a-f0-9]{32})\.(0|[1-9][0-9]{0,6})$/.exec(token);if(!m)throw new Error('This relocation memo uses an unfamiliar estate charter.');return estate(m[1],Number(m[2]));}
export function addresses(layout:EstateLayout):OfficeAddressBook {
 const placement=(room:RoomId)=>{const p=layout.placements.find(p=>p.room===room);if(!p)throw new Error('The estate has misplaced '+room+'.');return p;};
 const local=(room:RoomId,point:Point):Point=>{const p=placement(room),c=Math.cos(p.yaw),s=Math.sin(p.yaw);return {x:rounded(p.position.x+point.x*c+point.z*s),y:point.y,z:rounded(p.position.z-point.x*s+point.z*c)};};
 return {placement,local,resolve:a=>local(a.room,stationOffsets[a.station]),door:room=>local(room,{x:0,y:0,z:2.75}),outside:room=>local(room,{x:0,y:0,z:depth/2})};
}
const pointKey=(p:Point)=>rounded(p.x)+','+rounded(p.z);
export interface CorridorGraph {points:ReadonlyMap<string,Point>;links:ReadonlyMap<string,readonly string[]>}
/** Intersections and door aprons share one rectilinear network outside room footprints. */
export function corridorGraph(layout:EstateLayout):CorridorGraph {
 const points=new Map<string,Point>(),links=new Map<string,string[]>(),book=addresses(layout);
 const add=(p:Point)=>{const k=pointKey(p);points.set(k,p);if(!links.has(k))links.set(k,[]);return k;};
 const connect=(a:Point,b:Point)=>{const ka=add(a),kb=add(b);if(ka===kb)return;links.get(ka)!.push(kb);links.get(kb)!.push(ka);};
 const xs=Array.from({length:layout.columns+1},(_,i)=>rounded(layout.bounds.minX+i*width)),zs=Array.from({length:layout.rows+1},(_,i)=>rounded(layout.bounds.minZ+i*depth));
 for(const z of zs){const row=[...xs.map(x=>({x,y:0,z})),...layout.placements.map(p=>book.outside(p.room)).filter(p=>Math.abs(p.z-z)<.001)].sort((a,b)=>a.x-b.x);for(let i=1;i<row.length;i++)connect(row[i-1],row[i]);}
 for(const x of xs)for(let i=1;i<zs.length;i++)connect({x,y:0,z:zs[i-1]},{x,y:0,z:zs[i]});
 return {points,links};
}
function graphRoute(graph:CorridorGraph,from:Point,to:Point):Point[]{
 const start=pointKey(from),end=pointKey(to),scores=new Map([[start,0]]),previous=new Map<string,string>(),remaining=new Set(graph.points.keys());
 while(remaining.size){let current:string|undefined,best=Infinity;for(const k of remaining){const d=scores.get(k)??Infinity;if(d<best){best=d;current=k;}}if(!current)break;remaining.delete(current);if(current===end){const path=[end];while(path.at(-1)!==start)path.push(previous.get(path.at(-1)!)!);return path.reverse().map(k=>graph.points.get(k)!);}
  for(const k of graph.links.get(current)||[]){const d=best+distance(graph.points.get(current)!,graph.points.get(k)!);if(d<(scores.get(k)??Infinity)){scores.set(k,d);previous.set(k,current);}}
 }
 throw new Error('Facilities cannot approve an unreachable department.');
}
const compact=(points:readonly Point[])=>points.filter((p,i)=>i===0||distance(p,points[i-1])>.00001);
export function routes(layout:EstateLayout):CorridorRoutePlanner {
 const book=addresses(layout),graph=corridorGraph(layout);
 const ground=(p:Point)=>({...p,y:0});
 const inside=(a:OfficeAddress)=>{const offset=stationOffsets[a.station],side=offset.x<-.9?-1.25:1.25,hub=book.local(a.room,{x:0,y:0,z:1.05});return a.station==='entrance'?compact([ground(book.resolve(a)),hub]):compact([ground(book.resolve(a)),book.local(a.room,{x:side,y:0,z:offset.z}),book.local(a.room,{x:side,y:0,z:1.05}),hub]);};
 const exit=(a:OfficeAddress)=>compact([...inside(a),book.door(a.room),book.outside(a.room)]);
 return {route:(from,to)=>{if(from.room===to.room)return from.station===to.station?[ground(book.resolve(from))]:compact([...inside(from),...inside(to).reverse()]);return compact([...exit(from),...graphRoute(graph,book.outside(from.room),book.outside(to.room)),...exit(to).reverse()]);}};
}
export const routeLength=(points:readonly Point[])=>points.slice(1).reduce((sum,p,i)=>sum+distance(points[i],p),0);
/** Fit actual estate corners into the orbital camera's horizontal and vertical frusta. */
export function estateOverviewRadius(layout:EstateLayout,aspect:number,alpha:number,beta:number,fov:number){
 if(![aspect,alpha,beta,fov].every(Number.isFinite)||aspect<=0||fov<=0||fov>=Math.PI)throw new Error('Facilities cannot frame this perspective.');
 const n={x:Math.cos(alpha)*Math.sin(beta),y:Math.cos(beta),z:Math.sin(alpha)*Math.sin(beta)},right={x:-Math.sin(alpha),z:Math.cos(alpha)},up={x:-Math.cos(alpha)*Math.cos(beta),y:Math.sin(beta),z:-Math.sin(alpha)*Math.cos(beta)},tan=Math.tan(fov/2);let radius=0;
 for(const x of [layout.bounds.minX-.6,layout.bounds.maxX+.6])for(const z of [layout.bounds.minZ-.7,layout.bounds.maxZ+.7])for(const y of [-.5,3.3]){const yy=y-.2,depth=x*n.x+yy*n.y+z*n.z,horizontal=Math.abs(x*right.x+z*right.z),vertical=Math.abs(x*up.x+yy*up.y+z*up.z);radius=Math.max(radius,depth+horizontal/(tan*aspect),depth+vertical/tan);}
 return Math.max(layout.edition===0?33:20,radius*1.08);
}
export function pointAlong(points:readonly Point[],fraction:number):Point {
 if(!points.length)throw new Error('A journey requires an address.');if(fraction>=1)return points.at(-1)!;if(fraction<=0)return points[0];let remaining=routeLength(points)*Math.max(0,Math.min(1,fraction));
 for(let i=1;i<points.length;i++){const length=distance(points[i-1],points[i]);if(remaining<=length&&length>0){const t=remaining/length;return {x:points[i-1].x+(points[i].x-points[i-1].x)*t,y:points[i-1].y+(points[i].y-points[i-1].y)*t,z:points[i-1].z+(points[i].z-points[i-1].z)*t};}remaining-=length;}return points.at(-1)!;
}
export function validateEstate(layout:EstateLayout){
 if(layout.version!==layoutVersion||!Number.isSafeInteger(layout.edition)||layout.edition<0||layout.edition>1000000||!/^[a-f0-9]{32}$/.test(layout.seed)||layout.rows!==(layout.edition%2?3:2)||layout.columns!==(layout.edition%2?3:4))throw new Error('The estate charter has an unsupported topology or edition.');
 if(layout.placements.length!==8||new Set(layout.placements.map(p=>p.room)).size!==8||new Set(layout.placements.map(p=>p.slot)).size!==8)throw new Error('Every department requires one unique office.');
 for(const p of layout.placements){if(!rooms.some(r=>r.id===p.room)||!Number.isInteger(p.slot)||p.slot<0||p.slot>=layout.rows*layout.columns||p.address!==slotAddress(p.slot,layout.columns)||![p.position.x,p.position.y,p.position.z].every(Number.isFinite)||distance(p.position,slotPosition(p.slot,layout.rows,layout.columns))>.00001||![0,Math.PI].includes(p.yaw)||p.partition!=='classic'&&!partitionStyles.some(s=>s.id===p.partition))throw new Error('A department has an unrecognized address or partition.');}
 if((layout.rows===3)!==!!layout.amenity||layout.amenity&&layout.placements.some(p=>p.slot===layout.amenity!.slot))throw new Error('The amenity has occupied a department.');
 if(!Object.values(layout.bounds).every(Number.isFinite)||layout.bounds.minX!==-layout.columns*width/2||layout.bounds.maxX!==layout.columns*width/2||layout.bounds.minZ!==-layout.rows*depth/2||layout.bounds.maxZ!==layout.rows*depth/2)throw new Error('The estate bounds do not match its charter.');
 if(layout.amenity){const a=layout.amenity;if(!['atrium','breakroom'].includes(a.kind)||!Number.isInteger(a.slot)||a.slot<0||a.slot>=9||a.address!==slotAddress(a.slot,layout.columns)||!Object.values(a.position).every(Number.isFinite)||distance(a.position,slotPosition(a.slot,layout.rows,layout.columns))>.00001)throw new Error('The amenity has no valid address.');}
 const planner=routes(layout);for(const from of rooms)for(const to of rooms){const path=planner.route({room:from.id,station:'entrance'},{room:to.id,station:'entrance'});if(!path.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)&&Number.isFinite(p.z)))throw new Error('A department has escaped geometry.');}
 return layout;
}
