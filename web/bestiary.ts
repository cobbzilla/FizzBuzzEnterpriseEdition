import {companionCatalog,characterStory,node,type Companion} from './companions';
const search=document.querySelector<HTMLInputElement>('#bestiary-search')!;
const category=document.querySelector<HTMLSelectElement>('#bestiary-category')!;
const rarity=document.querySelector<HTMLSelectElement>('#bestiary-rarity')!;
const kind=document.querySelector<HTMLSelectElement>('#bestiary-kind')!;
const list=document.querySelector<HTMLElement>('#bestiary-results')!;
const status=document.querySelector<HTMLElement>('#bestiary-status')!;
const previous=document.querySelector<HTMLButtonElement>('#bestiary-previous')!;
const next=document.querySelector<HTMLButtonElement>('#bestiary-next')!;
document.querySelector('form')!.addEventListener('submit',event=>event.preventDefault());
let entries:Companion[]=[];let page=0;const pageSize=24;
function render(){
 const term=search.value.toLocaleLowerCase().trim();const matches=entries.filter(c=>(!kind.value||c.kind===kind.value)&&(!category.value||c.category===category.value)&&(!rarity.value||c.rarity===rarity.value)&&[c.name,c.emoji,c.personality,c.backstory,c.energy,c.goal].join(' ').toLocaleLowerCase().includes(term));
 const pages=Math.max(1,Math.ceil(matches.length/pageSize));page=Math.min(page,pages-1);list.replaceChildren();
 for(const c of matches.slice(page*pageSize,(page+1)*pageSize)){const article=node('article');article.className='panel bestiary-card';article.append(node('h2',c.name),characterStory(c));list.append(article);}
 status.textContent=matches.length+' companions found. Page '+(page+1)+' of '+pages+'.';previous.disabled=false;next.disabled=false;previous.setAttribute('aria-disabled',String(page===0));next.setAttribute('aria-disabled',String(page+1===pages));
}
for(const control of [search,category,rarity,kind])control.addEventListener(control===search?'input':'change',()=>{page=0;render();});
previous.addEventListener('click',()=>{if(previous.getAttribute('aria-disabled')==='true')return;page--;render();});next.addEventListener('click',()=>{if(next.getAttribute('aria-disabled')==='true')return;page++;render();});
async function load(){try{status.textContent='Opening the nonhuman personnel archive…';entries=(await companionCatalog()).entries;for(const c of [...new Set(entries.map(c=>c.category))]){const option=node('option',c);option.value=c;category.append(option);}render();}catch(error){status.textContent='The bestiary could not be opened: '+error.message;document.querySelector<HTMLButtonElement>('#bestiary-retry')!.hidden=false;}}
document.querySelector('#bestiary-retry')!.addEventListener('click',()=>void load());void load();
