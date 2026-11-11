import {Scene} from '@babylonjs/core/scene';
import {Mesh} from '@babylonjs/core/Meshes/mesh';
import {MeshBuilder} from '@babylonjs/core/Meshes/meshBuilder';
import {TransformNode} from '@babylonjs/core/Meshes/transformNode';
import {StandardMaterial} from '@babylonjs/core/Materials/standardMaterial';
import {Color3} from '@babylonjs/core/Maths/math.color';
import {Vector3} from '@babylonjs/core/Maths/math.vector';
import {addresses,routes,pointAlong,layoutToken,type EstateLayout,type Point} from './office-layout.ts';
import type {HeistSnapshot} from './office-heist-model.ts';

/** A fixed cast, eight stamps, twelve footprints and three pursuing sheets. */
export function createHeistStage(scene:Scene,emojiMaterial:(emoji:string)=>StandardMaterial){
 const root=new TransformNode('Stamp heist cast',scene);let identity='',routeKey='',paths:readonly (readonly Point[])[]=[];
 const material=(name:string,color:string)=>{const m=new StandardMaterial(name,scene);m.diffuseColor=Color3.FromHexString(color);return m;};
 const red=material('Unlicensed stamp ink','#b62d43'),wood=material('Stolen stamp handle','#bc945b'),paper=material('Pursuing paperwork','#fff7e4'),trail=material('Incriminating footprints','#ce5536');
 const sprites=Array.from({length:3},(_,index)=>{const mesh=MeshBuilder.CreatePlane('Heist suspect '+index,{size:1.55,sideOrientation:Mesh.DOUBLESIDE},scene);mesh.parent=root;mesh.billboardMode=Mesh.BILLBOARDMODE_ALL;mesh.isPickable=true;return mesh;});
 const stamps=Array.from({length:8},(_,index)=>{const group=new TransformNode('Approval stamp '+index,scene);group.parent=root;const base=MeshBuilder.CreateBox('Stamp ink pad',{width:.58,height:.16,depth:.4},scene);base.material=red;base.parent=group;const handle=MeshBuilder.CreateCylinder('Stamp grip',{height:.42,diameter:.22,tessellation:12},scene);handle.material=wood;handle.parent=group;handle.position.y=.28;for(const m of group.getChildMeshes())m.isPickable=false;return group;});
 const crumbs=Array.from({length:12},(_,index)=>{const mesh=MeshBuilder.CreateSphere('Footprint '+index,{diameter:.2,segments:6},scene);mesh.scaling.set(.6,.15,1.3);mesh.material=trail;mesh.parent=root;mesh.isPickable=true;mesh.metadata={heistFootprint:true};return mesh;});
 const pursuers=Array.from({length:3},()=>{const mesh=MeshBuilder.CreatePlane('Pursuing affidavit',{width:.4,height:.6,sideOrientation:Mesh.DOUBLESIDE},scene);mesh.material=paper;mesh.parent=root;mesh.billboardMode=Mesh.BILLBOARDMODE_ALL;mesh.isPickable=false;return mesh;});
 const biscuit=MeshBuilder.CreatePlane('Amnesty biscuit',{size:.75,sideOrientation:Mesh.DOUBLESIDE},scene);biscuit.parent=root;biscuit.material=emojiMaterial('🍪');biscuit.billboardMode=Mesh.BILLBOARDMODE_ALL;biscuit.isPickable=false;
 let target=Vector3.Zero();
 return {
  root,sprites,
  hide(){root.setEnabled(false);},
  update(s:HeistSnapshot,layout:EstateLayout,reduced:boolean){
   root.setEnabled(true);const book=addresses(layout),key=s.plan.key+'|'+layoutToken(layout);
   if(key!==routeKey){routeKey=key;const planner=routes(layout);paths=s.plan.rooms.slice(0,3).map((room,i)=>planner.route({room,station:'desk'},{room:s.plan.rooms[i+1],station:'desk'}));}
   if(identity!==s.plan.key){identity=s.plan.key;for(const [i,sprite]of sprites.entries()){sprite.material?.dispose(true,true);sprite.material=emojiMaterial(s.plan.actors[i]?.emoji||'');}}
   const leg=s.leg,actor=s.plan.actors[s.holder],path=paths[leg];
   const t=reduced?0:actor.tactic==='snail'?Math.pow(s.legProgress,3):s.legProgress;
   const start=book.resolve({room:s.plan.rooms[leg],station:'desk'}),end=book.resolve({room:s.plan.rooms[leg+1],station:'desk'});
   const p=actor.tactic==='ghost'?{x:start.x+(end.x-start.x)*t,y:0,z:start.z+(end.z-start.z)*t}:pointAlong(path,t);
   const carrier=new Vector3(p.x,1.5+(reduced?0:Math.sin(s.elapsed/180)*.12),p.z);
   for(const [i,sprite]of sprites.entries()){
    sprite.setEnabled(i<s.plan.actors.length);sprite.metadata={heistSuspect:i,heistId:s.id};
    if(i===s.holder)sprite.position.copyFrom(carrier);else{const stop=book.local(s.plan.rooms[Math.min(3,leg+1)],{x:i===0?-1.5:1.5,y:1.5,z:-1.6});sprite.position.set(stop.x,stop.y,stop.z);}
    sprite.visibility=i===s.holder&&actor.tactic==='ghost'?.7:1;
   }
   const notary=book.local('notary',{x:-2.35,y:1,z:-1.6}),returnTarget=new Vector3(notary.x,notary.y,notary.z);
   const stampPosition=s.returning?Vector3.Lerp(carrier,returnTarget,reduced?1:s.returnProgress):carrier.add(new Vector3(.55,-.1,0));
   if(s.returning&&!reduced)stampPosition.y+=Math.sin(s.returnProgress*Math.PI)*3;
   for(const [i,stamp]of stamps.entries()){
    stamp.setEnabled(i===0||actor.tactic==='octopus'&&!s.returning);stamp.position.copyFrom(stampPosition);
    if(i>0){const a=i*Math.PI/4+(reduced?0:s.elapsed/600);stamp.position.addInPlace(new Vector3(Math.cos(a)*.8,Math.sin(a)*.5,Math.sin(a)*.5));}
    stamp.rotation.y=reduced?0:s.elapsed/300;
   }
   for(const [i,crumb]of crumbs.entries()){crumb.setEnabled(s.footprints&&!s.returning);const pt=pointAlong(path,t*i/12);crumb.position.set(pt.x+(i%2?.1:-.1),.12,pt.z);}
   for(const [i,sheet]of pursuers.entries()){sheet.setEnabled(!s.returning);const pt=pointAlong(path,Math.max(0,s.legProgress-.12-i*.05));sheet.position.set(pt.x,.7,pt.z);}
   biscuit.setEnabled(s.resolution==='biscuit');biscuit.position.copyFrom(carrier.add(new Vector3(-.6,.2,0)));
   target=s.returning?stampPosition:carrier;return target;
  },
  get target(){return target;}
 };
}
