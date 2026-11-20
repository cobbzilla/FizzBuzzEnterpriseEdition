/** A closed, serializable scoring language. No source strings or opaque callbacks. */
export type Expression = {constant:string}|{variable:string}|{lookup:string;key:string}|{op:Operator;args:readonly Expression[]};
export type Operator='add'|'subtract'|'multiply'|'floorDivide'|'ceilDivide'|'min'|'max'|'mod'|'equal'|'atLeast'|'digits'|'digitSum'|'trailingZeroes'|'palindrome'|'identicalDigits'|'powerOfTen';
export type Facts=Readonly<Record<string,string|bigint|number>>;
export type Tables=Readonly<Record<string,Readonly<Record<string,string>>>>;
export const integer=(value:string|number|bigint):Expression=>({constant:String(value)});
export const field=(variable:string):Expression=>({variable});
export const operation=(op:Operator,...args:Expression[]):Expression=>({op,args});
export const lookup=(table:string,key:string):Expression=>({lookup:table,key});
export const sum=(...args:Expression[])=>operation('add',...args);
export const product=(...args:Expression[])=>operation('multiply',...args);
export const clamp=(value:Expression,low:Expression,high:Expression)=>operation('min',high,operation('max',low,value));
const arities:Record<Operator,readonly [number,number]>={add:[1,100],subtract:[2,2],multiply:[1,100],floorDivide:[2,2],ceilDivide:[2,2],min:[2,100],max:[2,100],mod:[2,2],equal:[2,2],atLeast:[2,2],digits:[1,1],digitSum:[1,1],trailingZeroes:[1,1],palindrome:[1,1],identicalDigits:[1,1],powerOfTen:[1,1]};
export function validateExpression(e:Expression,tables:Tables):void {
 if('constant'in e){if(!/^-?\d+$/.test(e.constant))throw Error('Non-integer scoring constant');return;}
 if('variable'in e){if(!/^[a-zA-Z][a-zA-Z0-9]*$/.test(e.variable))throw Error('Invalid scoring variable');return;}
 if('lookup'in e){if(!tables[e.lookup]||!e.key)throw Error('Missing scoring table');return;}
 const arity=arities[e.op];if(!arity||e.args.length<arity[0]||e.args.length>arity[1])throw Error('Undocumented scoring operator');
 for(const arg of e.args)validateExpression(arg,tables);
}
export function evaluate(e:Expression,facts:Facts,tables:Tables={}):bigint {
 if('constant'in e)return BigInt(e.constant);
 if('variable'in e){if(facts[e.variable]===undefined)throw Error('Missing scoring fact: '+e.variable);return BigInt(facts[e.variable]);}
 if('lookup'in e){const value=tables[e.lookup]?.[String(facts[e.key])];if(value===undefined)throw Error('Unknown scoring table entry');return BigInt(value);}
 const a=e.args.map(arg=>evaluate(arg,facts,tables)),[x,y]=a,s=x.toString();
 switch(e.op){
  case 'add':return a.reduce((n,v)=>n+v,0n);
  case 'subtract':return x-y;
  case 'multiply':return a.reduce((n,v)=>n*v,1n);
  case 'floorDivide':if(x<0n||y<=0n)throw Error('Invalid floor division');return x/y;
  case 'ceilDivide':if(x<0n||y<=0n)throw Error('Invalid ceiling division');return (x+y-1n)/y;
  case 'min':return a.reduce((n,v)=>v<n?v:n);
  case 'max':return a.reduce((n,v)=>v>n?v:n);
  case 'mod':if(y<=0n)throw Error('Invalid modulus');return x%y;
  case 'equal':return x===y?1n:0n;
  case 'atLeast':return x>=y?1n:0n;
  case 'digits':return BigInt(s.length);
  case 'digitSum':return [...s].reduce((n,d)=>n+BigInt(d),0n);
  case 'trailingZeroes':return BigInt(s.length-s.replace(/0+$/,'').length);
  case 'palindrome':return s.length>1&&s===[...s].reverse().join('')?1n:0n;
  case 'identicalDigits':return s.length>1&&/^(\d)\1+$/.test(s)?1n:0n;
  case 'powerOfTen':return /^10+$/.test(s)?BigInt(s.length-1):0n;
 }
}
/** Every evaluator operator must also have a human-readable rendering. */
export function describe(e:Expression,number:(n:bigint)=>string=String):string {
 if('constant'in e)return number(BigInt(e.constant));
 if('variable'in e)return e.variable.replace(/[A-Z]/g,c=>' '+c.toLowerCase());
 if('lookup'in e)return e.lookup+' for '+e.key;
 const a=e.args.map(arg=>describe(arg,number));
 const infix:Partial<Record<Operator,string>>={add:' + ',subtract:' − ',multiply:' × ',equal:' = ',atLeast:' ≥ ',mod:' mod '};
 if(infix[e.op])return '('+a.join(infix[e.op])+')';
 if(e.op==='floorDivide'||e.op==='ceilDivide')return (e.op==='floorDivide'?'floor':'ceil')+'('+a.join(' ÷ ')+')';
 return e.op.replace(/[A-Z]/g,c=>' '+c.toLowerCase())+'('+a.join(', ')+')';
}
