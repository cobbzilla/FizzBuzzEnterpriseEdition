import {companionCatalog,node} from './companions';
const status=document.querySelector<HTMLElement>('#rarity-status')!;
const rows=document.querySelector<HTMLElement>('#rarity-rows')!;
async function load(){try{
 const catalog=await companionCatalog();const entries=[...catalog.entries].sort((a,b)=>b.weight-a.weight||(a.id<b.id?-1:a.id>b.id?1:0));
 for(let offset=0;offset<entries.length;offset+=100){const fragment=document.createDocumentFragment();for(const [i,c] of entries.slice(offset,offset+100).entries()){const tr=node('tr');const rank=node('th',String(offset+i+1));rank.scope='row';const glyph=node('span',c.emoji);glyph.setAttribute('aria-hidden','true');const name=node('td');name.append(glyph,document.createTextNode(' '+c.name));tr.append(rank,name,node('td',c.category),node('td',c.rarity),node('td',c.weight.toLocaleString()+' / 1,000,000,000'));fragment.append(tr);}rows.append(fragment);await new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));}
 status.textContent='All '+entries.length.toLocaleString()+' companions, ordered from most common to least common. Every row is present; nothing is paginated.';
}catch(error){status.textContent='The restricted inventory could not be read: '+error.message;document.querySelector<HTMLButtonElement>('#rarity-retry')!.hidden=false;}}
document.querySelector('#rarity-retry')!.addEventListener('click',()=>{rows.replaceChildren();void load();});void load();
