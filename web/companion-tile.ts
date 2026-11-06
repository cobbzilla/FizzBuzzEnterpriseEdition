import {node} from './companion-story';
import {companionDialog} from './companion-dialog';
import {discoveryIdentity,type Discovery} from './discovery-model';

export function companionGlyph(discovery:Discovery){
 const glyph=node('span',discovery.companion.emoji);glyph.className='companion-glyph';glyph.dataset.companionIdentity=discoveryIdentity(discovery);glyph.dataset.rarity=discovery.companion.rarity;glyph.setAttribute('aria-hidden','true');return glyph;
}
/** The visible mark is an emoji; its full identity and rarity remain available. */
export function companionTile(discovery:Discovery){
 const {companion:c,assignment:a}=discovery,button=node('button');button.type='button';button.className='companion-chip';button.dataset.rarity=c.rarity;button.dataset.companion=c.id;
 button.setAttribute('aria-label',c.rarity+' · '+c.name);button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-controls','companion-dialog');
 button.title=c.rarity+' · '+c.name+' · '+c.weight+' of one billion tickets · mandate '+discovery.mandate+' · ordinal '+a.ordinal;
 button.append(companionGlyph(discovery));button.addEventListener('click',()=>companionDialog().open(discovery,button));return button;
}
