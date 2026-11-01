import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ChronicleLanguage,narrativeTemplates,corporateAsides,type NarrativeSituation} from '../web/chronicle-language.ts';

for(const situation of Object.keys(narrativeTemplates) as NarrativeSituation[])test(`${situation}: every wording is reachable, preserves evidence, and avoids immediate repeats`,()=>{
 const pool=narrativeTemplates[situation],facts='EXACT RECORDED FINDING: ordinal 9007199254740993; rejected; no new audit entry.';
 assert.ok(pool.length>=12);assert.equal(new Set(pool).size,pool.length);
 for(const template of pool)assert.equal(template.split('{facts}').length,2);
 const language=new ChronicleLanguage(()=>0),seen=new Set<number>();let previous=-1;
 for(let n=0;n<pool.length*4;n++){
  const prose=language.write(situation,facts),index=pool.findIndex(template=>prose.startsWith(template.replace('{facts}',()=>facts)+' '));
  assert.ok(index>=0);assert.notEqual(index,previous);previous=index;
  if(n<pool.length)seen.add(index);
  assert.equal(prose.split(facts).length,2);assert.ok(corporateAsides.some(aside=>prose.endsWith(aside)));
 }
 assert.equal(seen.size,pool.length);
});
test('corporate asides rotate without adjacent repetition or an unvisited option',()=>{
 const language=new ChronicleLanguage(()=>0.99999),seen=new Set<string>();let previous='';
 for(let n=0;n<corporateAsides.length*3;n++){
  const prose=language.write('classification','Recorded permissions.'),aside=corporateAsides.find(candidate=>prose.endsWith(candidate));assert.ok(aside);assert.notEqual(aside,previous);previous=aside;if(n<corporateAsides.length)seen.add(aside);
 }
 assert.equal(seen.size,corporateAsides.length);
});
test('literal evidence containing replacement syntax, markup and braces remains literal',()=>{
 const facts='$& $1 {facts} <script>untrusted witness</script>\nA second recorded line.';
 const result=new ChronicleLanguage(()=>0).write('fallback',facts);assert.ok(result.includes(facts));assert.equal(result.split(facts).length,2);
});
