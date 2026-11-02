import {readFileSync} from 'node:fs';
export interface UnicodeEmoji {emoji:string;name:string;group:string;subgroup:string;code:string}
// Conservative, reviewable allow-list of subgroups; reject human-bearing pictograms individually.
const excludedGroups=new Set(['People & Body','Component']);
const excludedNames=new Set(['new moon face','first quarter moon face','last quarter moon face','full moon face','sun with face','wind face','hamsa','no littering','Gemini','Virgo','Sagittarius','Aquarius','Ophiuchus','pirate flag','flag: Belize','flag: Isle of Man','flag: Montserrat','flag: British Virgin Islands','flag: French Polynesia','flag: Malta','flag: Guam','flag: Brunei','flag: St. Pierre & Miquelon','Statue of Liberty','moai','Japanese dolls','nesting dolls','performing arts','joker','identification card','passport control','customs','baggage claim','left luggage','men’s room','women’s room','restroom','baby symbol','litter in bin sign','potable water','wheelchair symbol','no pedestrians','children crossing','pedestrian crossing','bust in silhouette','busts in silhouette','family','couple with heart','wedding','hot springs','place of worship','x-ray','pregnant man','breast-feeding','disguised face','alien','robot','ghost','skull','skull and crossbones']);
export function eligibleEmoji():UnicodeEmoji[]{
 let group='',subgroup='';const rows:UnicodeEmoji[]=[];
 for(const line of readFileSync(new URL('../data/unicode/emoji-test-18.0.txt',import.meta.url),'utf8').split('\n')){
  if(line.startsWith('# group:'))group=line.slice(9);if(line.startsWith('# subgroup:'))subgroup=line.slice(12);
  const m=line.match(/^([A-F0-9 ]+); fully-qualified\s+# (\S+) E[0-9.]+ (.+)/);
  if(m&&!excludedGroups.has(group)&&!excludedNames.has(m[3])&&(group!=='Smileys & Emotion'||['cat-face','monkey-face','heart','emotion'].includes(subgroup)&&!['kiss mark','eye in speech bubble','fight cloud'].includes(m[3])||m[3]==='alien monster'))rows.push({emoji:m[2],name:m[3],group,subgroup,code:m[1].trim()});
 }
 return rows;
}
