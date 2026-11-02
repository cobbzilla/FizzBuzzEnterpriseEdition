import {additionalStories} from './additional-stories.ts';
import {flagStories} from './flag-stories.ts';
import {specialisms} from './companion-specialisms.ts';
import {symbols} from './symbols.ts';
import {animalStories} from './animal-stories.ts';
import {foodStories} from './food-stories.ts';
import {placeStories} from './place-stories.ts';
import {playStories} from './play-stories.ts';
import {objectStories} from './object-stories.ts';
import {symbolStories} from './symbol-stories.ts';
export const catalogVersion='nonhuman-18.0-v1';
export const rarities=['Common','Uncommon','Rare','Legendary','Mythic'] as const;
export type Rarity=typeof rarities[number];
export interface Companion {readonly kind:'single'|'pair';readonly components:readonly string[];readonly id:string;readonly emoji:string;readonly name:string;readonly category:string;readonly rarity:Rarity;readonly weight:number;readonly personality:string;readonly backstory:string;readonly energy:string;readonly goal:string}
const temperaments=[
 'Quietly resourceful; distrusts an impressive answer without a useful question.',
 'Warmly stubborn; considers kindness a perfectly serious operating principle.',
 'Playfully exacting; leaves room for surprise inside a carefully checked plan.',
 'Patiently curious; prefers a thoughtful detour to a confident wrong turn.',
 'Gently audacious; will question the framework while offering it a biscuit.',
 'Briskly affectionate; remembers the forgotten detail and the forgotten thank-you.',
 'Soft-spoken and tenacious; regards a small helpful act as a respectable ambition.',
 'Delightfully sceptical; checks the evidence before joining the applause.',
 'Tenderly practical; brings a useful tool and a reassuring presence.',
 'Brightly independent; likes company more than hierarchy.',
 'Carefully exuberant; celebrates the little wins without inflating the numbers.',
 'Steadfastly imaginative; keeps a sensible contingency for the beautiful impossible.',
 'Mischievously methodical; annotates the loophole before slipping through it.',
 'Thoughtfully sociable; makes space for the quietest contribution.',
 'Unhurriedly brave; takes the next real step instead of announcing a giant leap.',
 'Earnestly peculiar; has one unusual talent and no interest in becoming generic.',
 'Cheerfully observant; spots a chance for delight in an unpromising corner.',
 'Protectively gentle; sets a clear boundary and leaves a welcoming gate.',
 'Humbly inventive; would rather mend a useful thing than unveil a grand replacement.',
 'Resolutely hopeful; admits the difficulty without cancelling the possibility.',
 'Wryly diligent; finishes the necessary task before satirizing its approval chain.',
 'Calmly adventurous; checks the footing and then enjoys the view.',
 'Fiercely considerate; refuses to confuse being important with being loud.',
 'Lovably particular; has excellent reasons for a very small preference.',
 'Openly wondering; asks the unfashionable question with impeccable good manners.',
 'Reliably whimsical; can be trusted with both the spare key and the unexpected idea.',
 'Frankly tender; regards care as work worth doing properly.',
 'Restlessly constructive; channels its fidgets into one achievable improvement.',
 'Solemnly silly; maintains immaculate minutes of entirely delightful incidents.',
 'Independently generous; gives help without attaching a loyalty programme.',
 'Fondly meticulous; notices the tiny thing that makes somebody feel welcome.',
 'Politely irrepressible; returns with a revised plan and an encouraging grin.'
] as const;
const energies=[
 'The relief of finding the missing useful thing.', 'A promise kept when nobody was checking.',
 'The first convincing sign that a hard day can improve.', 'A small shared joke after the difficult part.',
 'The pleasure of getting an overlooked detail right.', 'A clear path through previously intimidating uncertainty.',
 'Gratitude expressed before it becomes a ceremonial initiative.', 'An ordinary kindness that does not ask for an invoice.',
 'The quiet confidence of a well-maintained tool.', 'A new possibility that still respects the old foundations.',
 'The moment a complicated explanation finally makes sense.', 'The warm feeling of being expected and welcome.',
 'A gentle correction delivered without humiliation.', 'Useful work whose importance outlasts its announcement.',
 'Enough room to try again without a performance hearing.', 'A little beauty discovered outside the official brief.',
 'The comfort of a dependable companion on an uncertain route.', 'One brave question asked in a room full of confident answers.',
 'A finite task completed without inventing an endless sequel.', 'The satisfying click of a plan meeting real evidence.',
 'The freedom to grow without abandoning a beloved quirk.', 'A shared success with properly shared credit.',
 'A peaceful pause that nobody needs to justify.', 'The happy surprise of an excellent modest result.',
 'A safe place for a fragile beginning.', 'A familiar ritual that makes change less frightening.',
 'The knowledge that somebody noticed the invisible effort.', 'A door opened thoughtfully rather than dramatically.',
 'A useful repair instead of a glorious replacement programme.', 'Honest hope with the difficult facts still attached.',
 'A thoughtful welcome for something that does not quite fit.', 'The courage to be helpful before becoming impressive.'
] as const;
function hash(text:string){let h=2166136261;for(let i=0;i<text.length;i++)h=Math.imul(h^text.charCodeAt(i),16777619);return h>>>0;}
const stories=new Map<string,{backstory:string;goal:string}>();
for(const text of [animalStories,foodStories,placeStories,playStories,objectStories,symbolStories,additionalStories,flagStories])for(const row of text.trim().split('\n')){
 const [name,backstory,goal,...extra]=row.split('|');if(!name||!backstory||!goal||extra.length||stories.has(name))throw new Error('Invalid or duplicate editorial seed: '+name);stories.set(name,{backstory:backstory.replaceAll('\u00ad',''),goal});
}
const singles:Omit<Companion,'rarity'|'weight'>[]=symbols.map(symbol=>{
 const story=stories.get(symbol.name);if(!story)throw new Error('Missing character story: '+symbol.name);
 const id='e-'+symbol.code.toLowerCase().replaceAll(/ +/g,'-');
 return {kind:'single' as const,components:Object.freeze([symbol.emoji]),id,emoji:symbol.emoji,name:symbol.name,category:symbol.group,personality:temperaments[hash(id+'personality')%temperaments.length],backstory:story.backstory,energy:energies[hash(id+'energy')%energies.length],goal:story.goal};
});
const mythicSingleNames=['unicorn','phoenix','dragon','dodo','mammoth','flying saucer','milky way','ringed planet','four leaf clover','comet','gem stone'];
const paired:typeof singles=[];
// Every admitted single character gets a subject-appropriate second career. Additional
// appointments use a different chapter and badge, never skin tones or qualification aliases.
for(let round=0;singles.length+paired.length<3200;round++)for(const base of singles.filter(c=>!mythicSingleNames.includes(c.name))){
 if(singles.length+paired.length>=3200)break;
 const options=specialisms[base.category];if(!options?.length)throw new Error('Missing department: '+base.category);
 const available=options.filter(theme=>theme.badge!==base.emoji);const theme=available[(hash(base.id+'career')+round)%available.length];
 const name=base.name+' — '+theme.title;const id='p-'+base.id+'-'+[...theme.badge].map(c=>c.codePointAt(0)!.toString(16)).join('-');
 if(paired.some(c=>c.id===id))throw new Error('Duplicate second career: '+id);
 paired.push({kind:'pair',components:Object.freeze([base.emoji,theme.badge]),id,emoji:base.emoji+' '+theme.badge,name,category:base.category,personality:base.personality+' '+theme.habit,backstory:base.backstory+' '+theme.chapter,energy:theme.energy+' '+base.energy,goal:theme.goal+' Its private ambition remains: '+base.goal});
}
const entries=[...singles,...paired];
const mythics=[...mythicSingleNames];
for(const c of paired.slice().sort((a,b)=>hash(a.id)-hash(b.id)))if(mythics.length<32)mythics.push(c.name);
const ranked=entries.filter(c=>!mythics.includes(c.name)).sort((a,b)=>hash(a.id)-hash(b.id)||a.id.localeCompare(b.id));
const tiers=[ranked.slice(0,320),ranked.slice(320,2240),ranked.slice(2240,3040),ranked.slice(3040),mythics.map(name=>entries.find(c=>c.name===name)!)];
const budgets=[800000000,190000000,9990000,9472,528];
const assigned=new Map<string,Companion>();
for(let tier=0;tier<tiers.length;tier++)tiers[tier].forEach((c,i)=>{
 const weight=tier===4?i+1:Math.floor(budgets[tier]/tiers[tier].length)+(i<budgets[tier]%tiers[tier].length?1:0);
 assigned.set(c.id,Object.freeze({...c,rarity:rarities[tier],weight}));
});
/** Immutable, versioned character authority. Every symbol has an individually authored story and aspiration. */
export const bestiary:Readonly<Record<string,Companion>>=Object.freeze(Object.fromEntries(entries.map(c=>[c.id,assigned.get(c.id)!])));
