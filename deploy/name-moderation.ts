import {anonymousName} from '../web/scoreboards.ts';
export interface NameBan {id:string;name:string;created_ms:number}
export const normalizeName=(name:string)=>name.toLowerCase().replace(/[ _-]/g,'');
const alternatives:Record<string,string>={'0':'0o','1':'1il','2':'2z','3':'3e','4':'4a','5':'5s','6':'6g','7':'7t','8':'8b','9':'9gq'};
const equivalent=(a:string,b:string)=>[...(alternatives[a]||a)].some(c=>(alternatives[b]||b).includes(c));
/** Restricted Damerau–Levenshtein with character sets: all leet alternatives, O(24²), no combinatorial expansion. */
export function nameDistance(left:string,right:string){
 const a=normalizeName(left),b=normalizeName(right),d=Array.from({length:a.length+1},()=>Array<number>(b.length+1).fill(0));
 for(let i=0;i<=a.length;i++)d[i][0]=i;for(let j=0;j<=b.length;j++)d[0][j]=j;
 for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++){
  d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(equivalent(a[i-1],b[j-1])?0:1));
  if(i>1&&j>1&&equivalent(a[i-1],b[j-2])&&equivalent(a[i-2],b[j-1]))d[i][j]=Math.min(d[i][j],d[i-2][j-2]+1);
 }
 return d[a.length][b.length];
}
export function matchName(name:string,bans:NameBan[]){
 if(normalizeName(name)===normalizeName(anonymousName))return null;
 const length=normalizeName(name).length;
 for(const ban of bans){const shorter=Math.min(length,normalizeName(ban.name).length),longer=Math.max(length,normalizeName(ban.name).length),distance=nameDistance(name,ban.name),limit=shorter<5?0:shorter<10?1:2;if(distance<=limit&&distance<=longer*.2)return {banId:ban.id,name:ban.name,distance};}
 return null;
}
