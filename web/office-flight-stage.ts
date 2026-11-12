import {Scene} from '@babylonjs/core/scene';
import {Mesh} from '@babylonjs/core/Meshes/mesh';
import {MeshBuilder} from '@babylonjs/core/Meshes/meshBuilder';
import {VertexData} from '@babylonjs/core/Meshes/mesh.vertexData';
import {TransformNode} from '@babylonjs/core/Meshes/transformNode';
import {StandardMaterial} from '@babylonjs/core/Materials/standardMaterial';
import {Color3} from '@babylonjs/core/Maths/math.color';
import {Vector3} from '@babylonjs/core/Maths/math.vector';
import {rooms} from './office-content';
import {addresses,routes,pointAlong,layoutToken,type EstateLayout} from './office-layout';
import type {FlightSnapshot} from './office-flight-model';

/** Allocated at first departure, with a fixed inventory for every personality. */
export function createFlightStage(scene:Scene,emojiMaterial:(glyph:string)=>StandardMaterial,textMaterial:(name:string,lines:string[])=>StandardMaterial){
 const root=new TransformNode('Paper Aviation Authority',scene),plane=new TransformNode('One ceremonial aircraft',scene);plane.parent=root;
 const material=(name:string,color:string)=>{const m=new StandardMaterial(name,scene);m.diffuseColor=Color3.FromHexString(color);m.backFaceCulling=false;return m;};
 const paper=material('Aircraft-grade stationery','#fff7df'),ink=material('Air-traffic ink','#244b61'),green=material('Runway clearance','#74c7a1'),orange=material('Desk fan caution','#e6a35c'),metal=material('Fan grille','#637984');
 const box=(name:string,w:number,h:number,d:number,parent:TransformNode,m:StandardMaterial)=>{const b=MeshBuilder.CreateBox(name,{width:w,height:h,depth:d},scene);b.parent=parent;b.material=m;b.isPickable=false;return b;};
 paper.emissiveColor=Color3.FromHexString('#fff7df').scale(.55);
 const wings=[-1,1].map(sign=>{const wing=new Mesh('Folded paper wing',scene),data=new VertexData();data.positions=[0,0,1.5,sign*1.25,0,-.85,0,.04,-.35];data.indices=sign<0?[0,2,1]:[0,1,2];const normals:number[]=[];VertexData.ComputeNormals(data.positions,data.indices,normals);data.normals=normals;data.applyToMesh(wing);wing.material=paper;wing.parent=plane;wing.isPickable=false;return wing;});
 const flatSheet=box('Unfolded delivery copy',1.65,.025,2.3,plane,paper);flatSheet.position.z=.2;
 const keel=box('Folded centre crease',.06,.18,1.65,plane,ink);keel.position.z=.15;
 const tail=MeshBuilder.CreatePlane('Flight manifest on the wing',{width:1,height:.38,sideOrientation:Mesh.DOUBLESIDE},scene);tail.parent=plane;tail.position.set(0,.05,-.55);tail.rotation.x=Math.PI/2;tail.isPickable=false;
 const sprites=Array.from({length:3},(_,i)=>{const sprite=MeshBuilder.CreatePlane('Aviation crew '+i,{size:1.3,sideOrientation:Mesh.DOUBLESIDE},scene);sprite.parent=root;sprite.billboardMode=Mesh.BILLBOARDMODE_ALL;sprite.isPickable=false;return sprite;});
 const batons=Array.from({length:8},(_,i)=>{const baton=box('Clearance baton '+i,.09,.62,.09,root,i%2?orange:green);return baton;});
 const shield=MeshBuilder.CreateSphere('Portable turtle terminal',{diameter:1.15,segments:12},scene);shield.scaling.set(1,.55,.6);shield.parent=root;shield.material=green;shield.isPickable=false;
 const receipt=box('Oversized return receipt',.65,.9,.025,root,paper);
 const compass=MeshBuilder.CreateTorus('Peer-reviewed navigation compass',{diameter:1.1,thickness:.07,tessellation:24},scene);compass.parent=root;compass.material=orange;compass.isPickable=false;
 const fans=Array.from({length:3},(_,i)=>{const group=new TransformNode('Desk fan '+(i+1),scene);group.parent=root;const foot=box('Fan base',.7,.12,.5,group,ink);foot.position.y=.06;const stalk=box('Fan stalk',.09,.75,.09,group,metal);stalk.position.y=.45;const rotor=new TransformNode('Fan rotor',scene);rotor.parent=group;rotor.position.y=.95;
  const ring=MeshBuilder.CreateTorus('Turn fan '+(i+1),{diameter:.85,thickness:.12,tessellation:20},scene);ring.rotation.x=Math.PI/2;ring.parent=rotor;ring.material=orange;ring.isPickable=true;
  for(let blade=0;blade<3;blade++){const b=box('Fan blade',.12,.7,.06,rotor,metal);b.rotation.z=blade*Math.PI*2/3;}
  const arrow=box('Wind direction arrow',.09,.05,.95,group,green);arrow.position.set(0,.14,.7);const tip=MeshBuilder.CreateCylinder('Wind arrow tip',{height:.35,diameterTop:0,diameterBottom:.35,tessellation:3},scene);tip.parent=group;tip.rotation.x=Math.PI/2;tip.position.set(0,.14,1.3);tip.material=green;tip.isPickable=false;
  return {group,rotor,ring};});
 const runways=rooms.map(room=>{const group=new TransformNode('Runway '+room.short,scene);group.parent=root;const strip=box('Select runway '+room.short,1.05,.04,2.4,group,ink);strip.isPickable=true;for(let i=0;i<3;i++){const light=box('Runway centre light',.15,.05,.35,group,green);light.position.set(0,.04,-.7+i*.7);}return {room:room.id,group,strip};});
 let identity='',pathKey='',path:ReturnType<ReturnType<typeof routes>['route']>=[],lastTime=0,phase='',landingStart=Vector3.Zero(),currentId=0;
 const v=(p:{x:number;y:number;z:number})=>new Vector3(p.x,p.y,p.z);
 return {plane,sprites,fans,runways,hide(){root.setEnabled(false);},
  suspend(){for(const sprite of sprites)sprite.setEnabled(false);for(const fan of fans)fan.group.setEnabled(false);for(const runway of runways)runway.group.setEnabled(false);for(const prop of [...batons,shield,receipt,compass])prop.setEnabled(false);},
  update(s:FlightSnapshot,layout:EstateLayout,reduced:boolean){
   root.setEnabled(true);const book=addresses(layout),key=layoutToken(layout)+'|'+s.destination+'|'+s.arrival;
   if(key!==pathKey){pathKey=key;path=routes(layout).route({room:'publication',station:'printer'},{room:s.arrival,station:'desk'});}
   if(identity!==s.plan.key){identity=s.plan.key;for(const [i,sprite]of sprites.entries()){sprite.material?.dispose(true,true);sprite.material=emojiMaterial(s.plan.actors[i]?.emoji||'');}tail.material?.dispose(true,true);tail.material=textMaterial('Flight '+s.plan.ordinal,[s.plan.text,s.plan.ordinal.length>16?s.plan.ordinal.slice(0,7)+'…'+s.plan.ordinal.slice(-5):s.plan.ordinal]);}
   const start=v(book.resolve({room:'publication',station:'printer'})),end=v(book.resolve({room:s.arrival,station:'desk'})),target=v(book.resolve({room:s.destination,station:'desk'})),now=s.elapsed/1000,t=s.progress;
   const cruise=s.phase==='folding'?0:s.phase==='cruise'?(reduced?0:t):1,p=pointAlong(path,cruise),next=pointAlong(path,Math.min(1,cruise+.015));let position=new Vector3(p.x,3.4+Math.sin(cruise*Math.PI)*.9,p.z),bank=0;
   for(let i=0;i<3;i++){const impulse=Math.sin(Math.max(0,Math.min(1,(cruise-(i+1)/4)*4))*Math.PI)*s.applied[i];position.x+=impulse*.9;bank+=impulse*.35;}
   if(s.phase==='folding'){position=start.add(new Vector3(0,.08,0));plane.rotation.y=.7;}else if(s.phase==='cruise')plane.rotation.y=Math.atan2(next.x-p.x,next.z-p.z);
   else if(s.phase==='holding'){const a=t*Math.PI*2*s.plan.loops,r=1.5*Math.sin(t*Math.PI);position=end.add(new Vector3(Math.sin(a)*r,2.4,Math.cos(a)*r));plane.rotation.y=a+Math.PI/2;bank=.22;}
   if(currentId!==s.id){currentId=s.id;phase='';lastTime=s.elapsed;plane.position.copyFrom(position);}
   if(s.phase==='landing'){if(phase!=='landing')landingStart=plane.position.clone();position=Vector3.Lerp(landingStart,end.add(new Vector3(0,.12,0)),t);plane.rotation.y=Math.atan2(end.x-landingStart.x,end.z-landingStart.z);}
   if(reduced){position=s.phase==='folding'||s.phase==='cruise'?start.add(new Vector3(0,.2,0)):end.add(new Vector3(0,.2,0));bank=0;plane.rotation.y=.7;}
   const blend=reduced||phase!==s.phase?1:Math.min(1,Math.max(.05,(s.elapsed-lastTime)/130));plane.position.copyFrom(Vector3.Lerp(plane.position,position,blend));plane.rotation.z=reduced?0:bank+(s.plan.tactic==='butterfly'?Math.sin(now*4)*.18:s.plan.tactic==='cat'?Math.sin(now*3)*.28:0);plane.rotation.x=reduced?0:s.phase==='landing'?.12:s.plan.tactic==='penguin'?-.08:Math.sin(now*2)*.04;
   const flat=s.phase==='folding'?Math.max(0,1-t/.7):s.phase==='landing'?Math.max(0,(t-.65)/.35):0;flatSheet.setEnabled(flat>0);flatSheet.visibility=reduced?1:flat;keel.visibility=1-flat;
   for(const [i,wing]of wings.entries()){wing.visibility=1-flat;wing.rotation.z=(i?1:-1)*(s.phase==='folding'?(reduced?.25:.25+(1-t)*1.1):s.phase==='landing'?.25*(1-t):.25);}
   for(const [i,fan]of fans.entries()){fan.group.setEnabled(true);const q=pointAlong(path,(i+1)/4);fan.group.position.set(q.x+(i%2?.9:-.9),.1,q.z);fan.group.rotation.y=s.fans[i]*Math.PI/3;fan.rotor.rotation.z=reduced?0:now*7;for(const mesh of fan.rotor.getChildMeshes()){mesh.isPickable=true;mesh.metadata={flightFan:i,flightId:s.id};}}
   for(const runway of runways){runway.group.setEnabled(true);const q=book.local(runway.room,{x:1.3,y:.1,z:.2});runway.group.position.set(q.x,q.y,q.z);runway.group.rotation.y=book.placement(runway.room).yaw;runway.strip.material=runway.room===s.destination?green:ink;runway.strip.metadata={flightRunway:runway.room,flightId:s.id};}
   for(const [i,sprite]of sprites.entries()){sprite.setEnabled(i<s.plan.actors.length);sprite.scaling.setAll(1);sprite.rotation.z=0;sprite.visibility=1;const q=book.local(s.destination,{x:i===1?-1.5:1.5,y:1.3,z:.8});sprite.position.set(q.x,q.y,q.z);}
   const pilot=sprites[0],ground=new Vector3(p.x,.85,p.z),air=plane.position.add(new Vector3(-.7,.6,0));pilot.position.copyFrom(air);
   batons.forEach(b=>b.setEnabled(false));shield.setEnabled(false);receipt.setEnabled(false);compass.setEnabled(false);
   const motion=reduced?0:now;
   switch(s.plan.tactic){
    case 'snail': {const q=pointAlong(path,s.phase==='folding'?0:Math.pow(cruise,.55));pilot.position.set(q.x,.45,q.z);pilot.scaling.setAll(.8);break;}
    case 'octopus':pilot.position.copyFrom(air);batons.forEach((b,i)=>{b.setEnabled(true);const a=i*Math.PI/4+motion*.8;b.position.copyFrom(pilot.position.add(new Vector3(Math.cos(a)*.9,Math.sin(a)*.7,.1)));b.rotation.z=-a;});break;
    case 'cat':pilot.position.copyFrom(ground.add(new Vector3(.7,Math.max(0,Math.sin(motion*3))*.9,0)));pilot.scaling.y=reduced?1:.8+Math.max(0,Math.sin(motion*3))*.2;break;
    case 'dog':pilot.position.copyFrom(ground.add(new Vector3(-.5,Math.abs(Math.sin(motion*5))*.35,-.5)));receipt.setEnabled(true);receipt.position.copyFrom(pilot.position.add(new Vector3(.5,.3,0)));break;
    case 'bee':{const a=Math.floor(motion*3)%6*Math.PI/3;pilot.position.copyFrom(air.add(new Vector3(Math.cos(a)*.8,Math.sin(a)*.6,0)));break;}
    case 'butterfly':pilot.position.copyFrom(air.add(new Vector3(Math.sin(motion*4),Math.sin(motion*6)*.4,0)));pilot.scaling.x=.75+(reduced?0:Math.abs(Math.sin(motion*5))*.4);break;
    case 'turtle':pilot.position.copyFrom(ground);shield.setEnabled(true);shield.position.copyFrom(ground.add(new Vector3(0,-.1,.15)));pilot.scaling.setAll(s.phase==='folding'?.35:.85);break;
    case 'penguin':pilot.position.copyFrom(ground.add(new Vector3(.5,-.25,0)));pilot.rotation.z=reduced?0:Math.PI/3;break;
    case 'crab':pilot.position.copyFrom(ground.add(new Vector3(Math.sin(motion*3)*.8,0,0)));break;
    case 'fox':pilot.position.copyFrom(Vector3.Lerp(start,target,Math.min(1,cruise*4)).add(new Vector3(.7,.25,0)));break;
    case 'owl':compass.setEnabled(true);compass.position.copyFrom(air.add(new Vector3(0,.9,0)));compass.rotation.z=motion;pilot.position.copyFrom(air.add(new Vector3(Math.sin(motion)*.5,0,Math.cos(motion)*.5)));break;
    case 'bird':pilot.position.copyFrom(ground.add(new Vector3(0,Math.abs(Math.sin(motion*4))*.35,0)));break;
    default:receipt.setEnabled(true);receipt.position.copyFrom(air.add(new Vector3(.7,0,0)));pilot.position.y+=Math.sin(motion*3)*.2;
   }
   if(s.phase==='landing'&&s.arrival!==s.destination){pilot.position.copyFrom(Vector3.Lerp(end,target,Math.max(0,(t-.35)/.65)));pilot.position.y=1.2;receipt.setEnabled(true);receipt.position.copyFrom(pilot.position.add(new Vector3(.6,.2,0)));}
   if(reduced){pilot.position.copyFrom(start.add(new Vector3(1,.5,0)));}
   phase=s.phase;lastTime=s.elapsed;return plane.position;
  }
 };
}
