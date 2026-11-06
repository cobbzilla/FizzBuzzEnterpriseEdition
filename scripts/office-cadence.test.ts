import test from 'node:test';
import assert from 'node:assert/strict';
import {OfficeCadenceGovernor,officeCadenceRate} from '../web/office-cadence.ts';
import {ObservationClock,planOfficeSteps,stepDuration,type ObservedOfficeStep} from '../web/office-supervision-model.ts';
import {OfficeShotDirector} from '../web/office-direction.ts';
import {foundingEstate} from '../web/office-layout.ts';

const step=():ObservedOfficeStep=>({...planOfficeSteps([{kind:'PUBLICATION',ordinal:'1',office:'Publication',finding:'Print one',document:'1'}],{id:'cadence',ordinal:'1',text:'1'})[0],arriveMs:0});
function simulate(cadence:string,hz=60){
 const action=step(),clock=new ObservationClock(action),governor=new OfficeCadenceGovernor(),arrival=new OfficeShotDirector().minimumFrames(action,foundingEstate);
 for(let frame=0;frame<10000;frame++){const cue=clock.tick(frame*1000/hz,true,false,governor.budget(cadence,action,clock.elapsed,arrival,true));if(cue.complete)return {frames:frame,millis:frame*1000/hz};}
 throw Error('The finite observation did not finish.');
}
test('office authorities preserve baseline, double Board deliberation and accelerate Emergency without changing ordinary values',()=>{
 assert.equal(officeCadenceRate('800'),1);assert.equal(officeCadenceRate('1800'),.5);assert.equal(officeCadenceRate('225'),2);assert.equal(officeCadenceRate('0'),Infinity);assert.equal(officeCadenceRate('unknown'),1);
 const board=simulate('1800'),normal=simulate('800'),emergency=simulate('225'),fiat=simulate('0');
 assert.ok(Math.abs(board.millis-normal.millis*2)<=50);assert.ok(Math.abs(emergency.millis-normal.millis/2)<=50);assert.ok(fiat.millis<emergency.millis);
});
test('Fiat earns the same complete motion samples on slow and fast displays instead of skipping work',()=>{
 const quick=simulate('0',60),slow=simulate('0',20);assert.equal(quick.frames,slow.frames);assert.equal(slow.millis,quick.millis*3);assert.ok(quick.frames>=18);
});
test('a stalled visible frame cannot teleport through an arrival, its work and its publication',()=>{
 const action={...step(),arriveMs:1200},clock=new ObservationClock(action),governor=new OfficeCadenceGovernor();clock.tick(0,true);
 const cue=clock.tick(100000,true,false,governor.budget('0',action,clock.elapsed,40,true));assert.equal(clock.elapsed,30);assert.equal(cue.phase,'arrival');assert.ok(cue.travel<.01);assert.equal(cue.work,0);assert.equal(cue.complete,false);
});
test('clock timestamps from the same painted frame earn no extra motion even at Fiat',()=>{
 const action=step(),clock=new ObservationClock(action),governor=new OfficeCadenceGovernor();clock.tick(100,true);
 for(let i=0;i<10;i++)clock.tick(100,true,false,governor.budget('0',action,clock.elapsed,18,true));assert.equal(clock.elapsed,0);
 clock.tick(116,true,false,governor.budget('0',action,clock.elapsed,18,true));assert.ok(clock.elapsed>0);
});
test('live authority changes preserve partial work and explicit pauses retain their full custody',()=>{
 const action=step(),clock=new ObservationClock(action),governor=new OfficeCadenceGovernor();clock.tick(0,true);clock.tick(100,true);const held=clock.elapsed;
 clock.tick(200,false,false,governor.budget('0',action,clock.elapsed,18,true));clock.tick(2000,false,false,governor.budget('225',action,clock.elapsed,18,true));assert.equal(clock.elapsed,held);
 clock.tick(2016,true,false,governor.budget('225',action,clock.elapsed,18,true));assert.equal(clock.elapsed,held);clock.tick(2032,true,false,governor.budget('225',action,clock.elapsed,18,true));assert.equal(clock.elapsed,held+32);assert.equal(clock.step.event,action.event);
});
test('background and graphics-free observation keep running; only explicit pause stops time',()=>{
 for(const cadence of ['1800','800','225','0']){const action=step(),clock=new ObservationClock(action),governor=new OfficeCadenceGovernor();clock.tick(0,true);assert.equal(clock.tick(100000,true,false,governor.budget(cadence,action,clock.elapsed,18,false)).complete,true);assert.equal(clock.elapsed,stepDuration(action));}
});
test('reduced motion needs no travelling samples while retaining every authored phase',()=>{
 const action=step(),clock=new ObservationClock(action),governor=new OfficeCadenceGovernor();clock.tick(0,true);const cue=clock.tick(16,true,false,governor.budget('0',action,clock.elapsed,18,true,true));assert.equal(cue.work,1);assert.equal(cue.complete,false);assert.equal(cue.phase,'hold');
});
test('quality reduction requires sustained slow rendering and recovery requires a long stable interval',()=>{
 const governor=new OfficeCadenceGovernor();governor.observeFrame(1000,90);for(let i=0;i<60;i++)governor.observeFrame(1000/60,3);assert.equal(governor.quality,'standard');
 for(let i=0;i<40;i++)governor.observeFrame(100,40);assert.equal(governor.quality,'economy');
 for(let i=0;i<100;i++)governor.observeFrame(1000/60,3);assert.equal(governor.quality,'economy');
 for(let i=0;i<180;i++)governor.observeFrame(1000/60,3);assert.equal(governor.quality,'standard');
});
