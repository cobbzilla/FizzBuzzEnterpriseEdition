import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {observationEnvelope,planOfficeSteps,planFolio,stepDuration,cueAt,ObservationClock,type ObservedOfficeStep} from '../web/office-supervision-model.ts';
import type {ExecutionEvent,ExecutionPacket,Folio} from '../web/chronicle.ts';

const sample=JSON.parse(await readFile(new URL('../tests/fixtures/office-fresh-15.json',import.meta.url),'utf8'));
const packet:ExecutionPacket={text:sample.text,events:sample.events,omitted:sample.omitted,cache:'MISS',runtime:{},recorded:true};
const event=(kind:string,ordinal:string|null='1',office='Supplied Office',finding='Supplied finding',document:string|null=null):ExecutionEvent=>({kind,ordinal,office,finding,document});
const folio=(events:ExecutionEvent[]=[],cache='MISS',ordinal='1',text='1'):Folio=>({ordinal,text,events,cache,recorded:events.length>0,runtime:{}});
function completeSample(){
 const envelope=observationEnvelope(packet,'1',15);let steps=planOfficeSteps(envelope.prefix,{id:'prefix',hasFile:false});
 for(const [i,text]of packet.text.trimEnd().split('\n').entries())steps.push(...planFolio(folio(envelope.groups.get(String(i+1)),'MISS',String(i+1),text),'line-'+i,steps.at(-1)));
 steps.push(...planOfficeSteps(envelope.suffix,{id:'suffix',hasFile:false,previous:steps.at(-1)}));return steps;
}

test('a real fifteen-number dossier retains every one of its 436 events in exact source order',()=>{
 const steps=completeSample();assert.equal(steps.length,436);assert.deepEqual(steps.map(s=>s.event),packet.events);assert.equal(new Set(steps.map(s=>s.id)).size,steps.length);
 assert.equal(packet.text,'1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n');
});
test('every numerical line is released at its actual publication and its audit and cleanup continue afterward',()=>{
 const steps=completeSample();for(let n=1;n<=15;n++){
  const line=steps.filter(s=>s.ordinal===String(n));const printing=line.findIndex(s=>s.publication);
  assert.ok(printing>line.findIndex(s=>s.event.kind==='NOTARY'));assert.equal(line.filter(s=>s.publication).length,1);
  for(const kind of ['AUDIT_APPEND','QUEUE_ENQUEUED','TRANSACTION_COMMIT','PREMISES_RELEASE','TRANSACTION_CLEANUP','SUCCESSION'])assert.ok(line.findIndex(s=>s.event.kind===kind)>printing);
 }
});
test('the ordinary fifteen-number mandate is genuinely a several-minute observation rather than a line timer',t=>{
 const steps=completeSample(),duration=steps.reduce((sum,s)=>sum+stepDuration(s),0);assert.ok(duration>180000);
 t.diagnostic('Authored foreground observation for fresh 15: '+Math.round(duration/1000)+' seconds, before reading pauses or background tabs.');
});
test('the two z obligations in each product and all four at fifteen have independent positions',()=>{
 const steps=completeSample().filter(s=>s.ordinal==='15');const allocations=steps.filter(s=>s.event.kind==='GLYPH_ACCEPTED');
 assert.equal(allocations.length,8);const receipts=allocations.at(-1)!.glyphs;assert.equal(receipts.length,8);assert.equal(receipts.filter(r=>r.character==='z').length,4);
 assert.equal(new Set(receipts.map(r=>r.product+':'+r.position)).size,8);assert.deepEqual(receipts.map(r=>r.character).join(''),'FizzBuzz');
 assert.deepEqual(allocations.map(s=>s.glyphs.length),[1,2,3,4,5,6,7,8]);
});
test('seven supplied HR approvals light seven offices before the first publication',()=>{
 const steps=completeSample();const hr=steps.filter(s=>s.event.kind==='HR_APPROVED');assert.equal(hr.length,7);assert.deepEqual(hr.map(s=>s.hrIndex),[0,1,2,3,4,5,6]);assert.ok(steps.indexOf(hr.at(-1)!)<steps.findIndex(s=>s.publication));
});
test('the final counter refusal and completion are shown without creating a sixteenth numerical file',()=>{
 const envelope=observationEnvelope(packet,'1',15),steps=planOfficeSteps(envelope.suffix,{id:'end',hasFile:false});assert.deepEqual(steps.map(s=>s.event.kind),['CONTINUATION','COMPLETE']);assert.ok(steps.every(s=>!s.hasFile&&!s.publication));assert.ok(steps[0].event.finding.includes('WITHHOLD'));
});
test('an empty result may show actual initialization but creates no number, publication, or invented audit',()=>{
 const zero:ExecutionPacket={...packet,text:'',events:[event('HR_APPROVED','1','Recruitment'),event('CONTINUATION','1'),event('COMPLETE',null)]};
 const envelope=observationEnvelope(zero,'1',0);const steps=planOfficeSteps(envelope.prefix,{id:'zero',hasFile:false});assert.equal(steps.length,3);assert.ok(steps.every(s=>!s.hasFile&&!s.publication));assert.equal(envelope.groups.size,0);
});
test('cache receipts never animate fresh hiring, procurement, printing, or a new audit transaction',()=>{
 const steps=planFolio(folio([event('HR_APPROVED'),event('GLYPH_ACCEPTED'),event('AUDIT_APPEND')],'HIT'),'hit');
 assert.equal(steps.length,2);assert.ok(steps.every(s=>s.action==='memory'));assert.equal(steps.filter(s=>s.publication).length,1);assert.ok(steps.every(s=>s.source==='disclosure'&&s.event.kind!=='PUBLICATION'));
});
test('historical production documents on an older cache response cannot become current zero-work proceedings',()=>{
 const old:ExecutionPacket={...packet,cache:'HIT',text:'',events:[event('REQUEST',null),event('HR_APPROVED','1'),event('PREMISES_APPROVED','1'),event('CACHE_HIT',null),event('COMPLETE',null)]};
 const envelope=observationEnvelope(old,'1',0);assert.deepEqual(envelope.prefix.map(e=>e.kind),['REQUEST','CACHE_HIT','COMPLETE']);assert.equal(envelope.groups.size,0);
});
test('an absent legacy dossier permits only an explicitly identified observed disclosure',()=>{
 const steps=planFolio(folio([],'UNKNOWN'),'old');assert.equal(steps.length,1);assert.equal(steps[0].source,'disclosure');assert.equal(steps[0].event.kind,'DISCLOSE_OBSERVED');assert.equal(steps[0].action,'paper');assert.ok(steps[0].event.finding.includes('not inferred'));
});
test('a partially supplied dossier is preserved and missing publication receives no forged certificate',()=>{
 const actual=event('NOTARY');const steps=planFolio(folio([actual]),'partial');assert.equal(steps[0].event,actual);assert.equal(steps.length,2);assert.equal(steps[1].source,'disclosure');assert.equal(steps[1].publication,true);assert.ok(steps[1].event.finding.includes('No individual publication record'));
});
test('repeated records, fragments, and a literal newline are not silently deduplicated',()=>{
 const fragment=event('FRAGMENT','1','Output Staging','Staged a newline','\n');const steps=planOfficeSteps([fragment,fragment],{id:'two',ordinal:'1'});assert.equal(steps.length,2);assert.equal(steps[0].event.document,'\n');assert.notEqual(steps[0].id,steps[1].id);
});
test('a newly encountered department gets its supplied paper, rather than a fabricated routine',()=>{
 const e=event('FUTURE_OFFICE','1','Some Later Committee','Actual new finding');const steps=planOfficeSteps([e],{id:'new',ordinal:'1'});assert.equal(steps.length,1);assert.equal(steps[0].event,e);assert.equal(steps[0].action,'paper');assert.equal(steps[0].publication,false);
});
test('a thousand-digit window keeps exact source ordinals and a distinct terminal refusal',()=>{
 const start='9'.repeat(1000),next=(BigInt(start)+1n).toString(),end=(BigInt(start)+2n).toString();
 const p:ExecutionPacket={...packet,text:'Fizz\nBuzz\n',events:[event('REQUEST',null),event('PUBLICATION',start),event('PUBLICATION',next),event('CONTINUATION',end),event('COMPLETE',null)]};
 const e=observationEnvelope(p,start,2);assert.deepEqual([...e.groups.keys()],[start,next]);assert.equal(e.suffix[0].ordinal,end);
 const step=planFolio(folio(e.groups.get(start),'MISS',start,'Fizz'),'large')[0];assert.equal(step.ordinal,start);assert.ok(Object.values(step.shot.target).every(Number.isFinite));
});
test('the omission count survives observation partitioning and is not filled with imaginary records',()=>{
 const e=observationEnvelope({...packet,events:[event('NOTARY')],omitted:1234},'1',1);assert.equal(e.omitted,1234);assert.equal(e.groups.get('1')!.length,1);assert.equal(e.prefix.length+e.suffix.length,0);
});
test('read-only rejected personnel papers remain rehearsals with no numerical file or publication',()=>{
 const steps=planOfficeSteps([event('HR_REJECTED','0','Identity Office'),event('HR_NOT_REACHED','0','Offer Authority')],{id:'hr',source:'rehearsal',hasFile:false});assert.ok(steps.every(s=>s.source==='rehearsal'&&!s.hasFile&&!s.publication));
});
test('a rejection is never repainted as an approval when a later office was not reached',()=>{
 const steps=planOfficeSteps([event('HR_APPROVED','0','Headcount Planning'),event('HR_REJECTED','0','Identity Office'),event('HR_NOT_REACHED','0','Offer Authority')],{id:'rejected',source:'rehearsal',hasFile:false});
 assert.equal(steps.at(-1)!.hrStates[0],'APPROVED');assert.equal(steps.at(-1)!.hrStates[1],undefined);assert.equal(steps.at(-1)!.hrStates[2],'REJECTED');assert.equal(steps.at(-1)!.hrStates[3],'NOT_REACHED');
});
test('the discovered tenant keeps its actual identity during the subsequent eviction',()=>{
 const steps=completeSample().filter(s=>s.ordinal==='7'),discovery=steps.find(s=>s.event.kind==='PREMISES_DISCOVERY')!,eviction=steps.find(s=>s.action==='evict')!;
 assert.equal(discovery.tenantCode,'U+00A0');assert.equal(eviction.tenantCode,discovery.tenantCode);
});
test('all authored shots stay finite and within the estate for actual source records',()=>{
 for(const step of completeSample()){assert.ok(Object.values(step.shot.target).every(Number.isFinite));assert.ok(Math.abs(step.shot.target.x)<15);assert.ok(Math.abs(step.shot.target.z)<8);assert.ok(step.shot.radius>=3&&step.shot.radius<=6);assert.ok(step.arriveMs>=0&&step.workMs>0&&step.holdMs>0);}
});

const clockStep=():ObservedOfficeStep=>planOfficeSteps([event('PUBLICATION')],{id:'clock',ordinal:'1',text:'1'})[0];
test('background time never makes an observation jump to its conclusion',()=>{
 const clock=new ObservationClock(clockStep());clock.tick(0,true);clock.tick(20,true);clock.tick(1000000,false);assert.equal(clock.elapsed,20);clock.tick(1000016,true);assert.equal(clock.elapsed,36);
});
test('a hidden-tab frame discontinuity earns at most one bounded foreground frame',()=>{
 const clock=new ObservationClock(clockStep());clock.tick(0,true);clock.tick(1000000,true);assert.equal(clock.elapsed,100);assert.equal(clock.tick(1000016,true).complete,false);
});
test('manual stepping can complete exactly one visible decision while a hidden view earns nothing',()=>{
 const step=clockStep(),clock=new ObservationClock(step);assert.equal(clock.tick(0,false,true).complete,false);const cue=clock.tick(20,true,true);assert.equal(cue.complete,true);assert.equal(clock.elapsed,stepDuration(step));assert.equal(clock.tick(50,true,true).work,1);
});
test('arrival, work, and reading hold are distinct, bounded, ordered phases',()=>{
 const step=clockStep();assert.equal(cueAt(step,0).phase,'arrival');assert.equal(cueAt(step,step.arriveMs).phase,'work');assert.equal(cueAt(step,step.arriveMs+step.workMs).phase,'hold');assert.equal(cueAt(step,stepDuration(step)-1).complete,false);assert.equal(cueAt(step,stepDuration(step)).complete,true);
});
test('clock reversal and a paused frame cannot retract or advance a supplied decision',()=>{
 const clock=new ObservationClock(clockStep());clock.tick(100,true);clock.tick(120,true);clock.tick(110,true);assert.equal(clock.elapsed,20);clock.tick(1000,false);assert.equal(clock.elapsed,20);
});
