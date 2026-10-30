import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseMandate,autocorrectMandate,addOrdinals,windowCount,magnitudeWarnings,chooseMagnitudeWarning} from '../web/mandate-input.ts';
test('ordinary integers retain Number arithmetic through the exact boundary',()=>{
 for(const text of ['0','15','1001','2147483648','9007199254740991'])assert.equal(typeof parseMandate(text),'number');
 assert.equal(parseMandate('9007199254740991'),Number.MAX_SAFE_INTEGER);
 assert.equal(parseMandate('00015'),15);
});
test('oversized decimals enter BigInt without passing through an imprecise Number',()=>{
 for(const text of ['9007199254740992','9007199254740993','9223372036854775807','1'+'0'.repeat(1000)]){
  const result=parseMandate(text);assert.equal(typeof result,'bigint');assert.equal(String(result),text);
 }
});
test('unchecked text remains invalid until explicit digit governance removes other characters',()=>{
 for(const raw of ['',' ','-15','1.5','1e9','0x15','NaN','Infinity','letters123'])assert.equal(parseMandate(raw),null);
 assert.equal(autocorrectMandate('Office -9,007.199_254x740y993'),'9007199254740993');
 assert.equal(autocorrectMandate('no numbers'),'');
 assert.equal(parseMandate(autocorrectMandate('000,015 obligations')),15);
});
test('finite windows advance exactly across the Number and BigInt boundaries',()=>{
 assert.equal(windowCount(1001,1001),1);assert.equal(windowCount(1,1001),100);
 assert.equal(windowCount(9007199254740991n,9007199254740993n),3);
 assert.equal(addOrdinals(9007199254740991n,100),9007199254741091n);
 assert.equal(addOrdinals(1000,1),1001);
});
test('twenty distinct policy concerns are reachable and consecutive concerns differ',()=>{
 assert.equal(magnitudeWarnings.length,20);assert.equal(new Set(magnitudeWarnings).size,20);
 const seen=new Set<string>();for(let i=0;i<20;i++)seen.add(chooseMagnitudeWarning(-1,()=>i/20).text);
 assert.equal(seen.size,20);
 for(let previous=0;previous<20;previous++)for(let i=0;i<19;i++)assert.notEqual(chooseMagnitudeWarning(previous,()=>i/19).index,previous);
});
