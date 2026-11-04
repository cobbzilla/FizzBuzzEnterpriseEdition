import type {Scene} from '@babylonjs/core/scene';
import {Mesh} from '@babylonjs/core/Meshes/mesh';
import {MeshBuilder} from '@babylonjs/core/Meshes/meshBuilder';
import {VertexData} from '@babylonjs/core/Meshes/mesh.vertexData';
import {TransformNode} from '@babylonjs/core/Meshes/transformNode';
import {StandardMaterial} from '@babylonjs/core/Materials/standardMaterial';
import {MultiMaterial} from '@babylonjs/core/Materials/multiMaterial';
import {Color3} from '@babylonjs/core/Maths/math.color';
import {partitionColors,partitionStrategies,heartSolid,cheeseSolid} from './office-partition-model';
import type {PartitionId} from './office-layout';
import type {RoomId} from './office-content';

export function createPartitionFactory(scene:Scene){
 const materials=new Map<string,StandardMaterial>();
 const mat=(key:string,hex:string,hidden=false)=>{let m=materials.get(key);if(!m){m=new StandardMaterial('partition '+key,scene);m.diffuseColor=Color3.FromHexString(hex);m.specularColor=new Color3(.08,.08,.08);if(hidden){m.alpha=0;m.disableColorWrite=true;m.disableDepthWrite=true;}materials.set(key,m);}return m;};
 const invisible=mat('collision','#ffffff',true),classic=mat('founding','#fff7e4');
 return (room:RoomId,style:PartitionId,parent:TransformNode)=>{
  const root=new TransformNode('partition policy '+room,scene),visuals:Mesh[]=[],colliders:Mesh[]=[];
  const box=(w:number,h:number,d:number,x:number,y:number,z:number,m:StandardMaterial,collision=false)=>{const a=MeshBuilder.CreateBox('partition '+room,{width:w,height:h,depth:d},scene);a.position.set(x,y,z);a.material=m;a.parent=root;a.isPickable=false;a.receiveShadows=true;a.checkCollisions=collision;if(collision)colliders.push(a);else visuals.push(a);return a;};
  const panels=[{x:-1.925,z:2.75,width:2.55,yaw:0},{x:1.925,z:2.75,width:2.55,yaw:0},{x:-3.14,z:0,width:5.6,yaw:-Math.PI/2},...(style==='classic'?[]:[{x:3.14,z:0,width:5.6,yaw:Math.PI/2}])];
  if(style==='classic'){
   for(const x of [-1.925,1.925])box(2.55,2.2,.16,x,1.13,2.75,classic,true);
   box(1.3,.22,.16,0,2.12,2.75,classic,true);box(.16,1.45,5.6,-3.14,.77,0,classic,true);
  }else{
   for(const panel of panels){
    const frame=new TransformNode('partition edge',scene);frame.parent=root;frame.position.set(panel.x,0,panel.z);frame.rotation.y=panel.yaw;
    for(const p of partitionStrategies[style].parts(panel.width)){
     let mesh:Mesh;
     if(p.shape==='heart'||p.shape==='cheese'){
      mesh=new Mesh('partition '+p.shape,scene);const raw=p.shape==='heart'?heartSolid():cheeseSolid(),data=new VertexData();data.positions=raw.positions;data.indices=raw.indices;data.uvs=raw.uvs;const normals:number[]=[];VertexData.ComputeNormals(raw.positions,raw.indices,normals);data.normals=normals;data.applyToMesh(mesh);
     }else if(p.shape==='sphere')mesh=MeshBuilder.CreateSphere('partition bubbles',{diameter:1,segments:8},scene);
     else if(p.shape==='cylinder'||p.shape==='cone')mesh=MeshBuilder.CreateCylinder('partition upright',{height:1,diameterBottom:1,diameterTop:p.shape==='cone'?0:1,tessellation:p.shape==='cone'?4:10},scene);
     else mesh=MeshBuilder.CreateBox('partition component',{size:1},scene);
     mesh.parent=frame;mesh.position.set(...p.position);mesh.scaling.set(...p.size);mesh.rotation.z=p.angle||0;mesh.material=mat(p.color,partitionColors[p.color]);mesh.isPickable=false;mesh.receiveShadows=true;visuals.push(mesh);
    }
    const collider=box(panel.width,1.8,.16,panel.x,.95,panel.z,invisible,true);collider.rotation.y=panel.yaw;
   }
  }
  const merged=visuals.length?Mesh.MergeMeshes(visuals,true,true,undefined,false,true):null;
  if(merged){merged.parent=root;merged.isPickable=false;merged.receiveShadows=true;merged.metadata={partition:room};}
  for(const child of root.getChildren())if(child instanceof TransformNode&&!(child instanceof Mesh)&&!child.getChildMeshes().length)child.dispose();
  root.parent=parent;
  const meshes=root.getChildMeshes();
  return {root,meshes,style,dispose(){const owned=merged?.material;if(owned instanceof MultiMaterial)owned.dispose(false,false,false);root.dispose(false,false);}};
 };
}
