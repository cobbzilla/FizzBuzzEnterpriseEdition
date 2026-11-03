import type {Companion} from '../catalog/bestiary';
export function node<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string){const n=document.createElement(tag);if(text)n.textContent=text;return n;}
export function characterStory(c:Companion){
 const fragment=document.createDocumentFragment();const glyph=node('span',c.emoji);glyph.className='companion-glyph';glyph.setAttribute('aria-hidden','true');fragment.append(glyph,node('p',(c.kind==='pair'?'Themed emoji pair':'Single emoji')+' · '+c.category+' · '+c.rarity+' · target frequency: '+c.weight.toLocaleString()+' of 1,000,000,000 tickets.'));
 const dl=node('dl');for(const [label,value] of [['Personality',c.personality],['Previously in this extraordinary career',c.backstory],['Motivating energy',c.energy],['Ultimate goal',c.goal]])dl.append(node('dt',label),node('dd',value));fragment.append(dl);return fragment;
}
