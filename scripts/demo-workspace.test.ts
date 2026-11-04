import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readDesk,deskURL,watchView,initialWatchView} from '../web/demo-workspace-model.ts';
test('explicit desks take priority over legacy tour entry and unknown desks fail to a usable view',()=>{
 assert.equal(readDesk(new URL('https://example.test/demo/?desk=evidence&tour=office-v1')),'evidence');
 assert.equal(readDesk(new URL('https://example.test/demo/?tour=office-v1&limit=9007199254740993')),'facilities');
 assert.equal(readDesk(new URL('https://example.test/demo/#office-tour')),'facilities');
 assert.equal(readDesk(new URL('https://example.test/demo/?desk=unapproved')),'authorize');
 assert.equal(readDesk(new URL('https://example.test/demo/#precedent-case')),'evidence');
});
test('department navigation retains exact shared encounter and estate evidence without changing its source',()=>{
 const source=new URL('https://example.test/demo/?limit=9007199254740993&authority=ordinal-constellation-v1&companion=unicorn&estate=sealed#office-tour');
 const next=deskURL(source,'observe');assert.equal(next.searchParams.get('desk'),'observe');assert.equal(next.searchParams.get('limit'),'9007199254740993');assert.equal(next.searchParams.get('estate'),'sealed');assert.equal(next.searchParams.get('companion'),'unicorn');assert.equal(next.hash,'');assert.equal(source.hash,'#office-tour');
});
test('watch selection honors available features and mobile focus without inventing an enabled office',()=>{
 assert.equal(initialWatchView(true,true),'office');assert.equal(initialWatchView(true,false),'output');assert.equal(initialWatchView(false,true),'overview');
 assert.equal(watchView('office',false,true),'output');assert.equal(watchView('companions',true,false),'output');assert.equal(watchView('commentary',false,false),'commentary');assert.equal(watchView('unknown',true,true),'overview');
});
