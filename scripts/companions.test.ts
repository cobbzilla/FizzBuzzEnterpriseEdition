import {test} from 'node:test';import assert from 'node:assert/strict';
import {bestiary,catalogVersion,rarities} from '../catalog/bestiary.ts';import {symbols} from '../catalog/symbols.ts';import {eligibleEmoji} from './emoji-provenance.ts';import {generateCompanions} from './generate-companions.ts';
const entries=Object.values(bestiary);
test('three thousand two hundred distinct nonhuman colleagues have complete and unique dossiers',()=>{
 assert.equal(entries.length,3200);assert.deepEqual(entries.filter(c=>c.kind==='single').map(c=>c.emoji),eligibleEmoji().map(c=>c.emoji));assert.equal(new Set(entries.map(c=>c.id)).size,3200);assert.equal(new Set(entries.map(c=>c.emoji)).size,3200);assert.equal(new Set(entries.map(c=>c.backstory)).size,3200);assert.equal(new Set(entries.map(c=>c.goal)).size,3200);assert.ok(Object.isFrozen(bestiary));
 const allowed=new Set<string>(symbols.map(s=>s.emoji));assert.equal(entries.filter(c=>c.kind==='single').length,1364);assert.equal(entries.filter(c=>c.kind==='pair').length,1836);
 for(const c of entries){assert.ok(c.components.every(part=>allowed.has(part)));assert.equal(c.components.length,c.kind==='single'?1:2);assert.ok(Object.isFrozen(c));for(const field of ['id','name','category','personality','backstory','energy','goal'] as const)assert.ok(c[field].length>0,c.name+' '+field);assert.ok(c.backstory.length>30,c.name);assert.ok(c.goal.length>15,c.name);}
});
test('the positive integer weights exactly honour the billion-ticket inequality charter',()=>{
 assert.equal(entries.reduce((s,c)=>s+c.weight,0),1e9);const count=[320,1920,800,128,32],budget=[800000000,190000000,9990000,9472,528];
 rarities.forEach((rarity,i)=>{const tier=entries.filter(c=>c.rarity===rarity);assert.equal(tier.length,count[i]);assert.equal(tier.reduce((s,c)=>s+c.weight,0),budget[i]);});
 const myths=entries.filter(c=>c.rarity==='Mythic').sort((a,b)=>a.weight-b.weight);assert.deepEqual(myths.map(c=>c.weight),Array.from({length:32},(_,i)=>i+1));assert.equal(myths[0].name,'unicorn');assert.ok(myths.every(c=>c.weight<1000));for(const c of entries)assert.ok(Number.isInteger(c.weight)&&c.weight>0);
});
test('people, faces, gestures and skin-tone padding cannot enter the admitted inventory',()=>{
 assert.ok(symbols.every(c=>!['People & Body','Component'].includes(c.group)));for(const c of symbols){assert.ok(!/\b(person|woman |man |face|hand|dolls|silhouette|Statue of Liberty|moai)\b/.test(c.name)||['monkey face','dog face','cat face','tiger face','horse face','cow face','pig face','mouse face','rabbit face','dragon face','folding hand fan'].includes(c.name),c.name);assert.ok(!/1F3F[B-F]/.test(c.code));}
});
test('the eleven singular Mythics cannot sneak into common paired appointments',()=>{const mythicGlyphs=new Set(entries.filter(c=>c.kind==='single'&&c.rarity==='Mythic').map(c=>c.emoji));for(const c of entries.filter(c=>c.kind==='pair'))assert.ok(c.components.every(part=>!mythicGlyphs.has(part)),c.name);});

test('the emitted portable Java sources match the canonical TypeScript constant',async()=>{assert.equal(catalogVersion,'nonhuman-18.0-v1');assert.equal(await generateCompanions(true),3200);});
