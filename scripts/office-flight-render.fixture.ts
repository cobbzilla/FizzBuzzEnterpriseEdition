import assert from 'node:assert/strict';
import {NullEngine} from '@babylonjs/core/Engines/nullEngine';
import {Scene} from '@babylonjs/core/scene';
import {StandardMaterial} from '@babylonjs/core/Materials/standardMaterial';
import {createFlightStage} from '../web/office-flight-stage';
import {FlightCoordinator,planFlight,flightPersonalities} from '../web/office-flight-model';
import {foundingEstate,nextEstate} from '../web/office-layout';
export function verifyRenderInventory(){
 const engine=new NullEngine(),scene=new Scene(engine);
 try{
  const stage=createFlightStage(scene,g=>new StandardMaterial(g,scene),name=>new StandardMaterial(name,scene));let inventory:{meshes:number;materials:number}|undefined;
  for(let cycle=0;cycle<10;cycle++)for(const p of flightPersonalities){
   const flight=new FlightCoordinator();flight.start(planFlight('10000','1000','Buzz','factor-resonance-v1',[{id:p.id,name:p.name,emoji:p.glyph}]));flight.advance(0,true);
   for(const time of [0,1900,4000,7900,10000,14000]){
    flight.advance(time,true);for(const layout of [foundingEstate,nextEstate(foundingEstate)])for(const reduced of [false,true]){
     const target=stage.update(flight.snapshot!,layout,reduced);assert.ok([target.x,target.y,target.z].every(Number.isFinite));
     for(const mesh of scene.meshes)assert.ok([mesh.position.x,mesh.position.y,mesh.position.z].every(Number.isFinite),mesh.name);
    }
   }
   const current={meshes:scene.meshes.length,materials:scene.materials.length};if(inventory)assert.deepEqual(current,inventory);else inventory=current;
   stage.hide();assert.equal(scene.getTransformNodeByName('Paper Aviation Authority')!.isEnabled(),false);
  }
  assert.ok(inventory!.meshes<160);
 }finally{scene.dispose();engine.dispose();}
}
