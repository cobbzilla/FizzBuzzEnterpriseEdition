import {badgeRules} from './scoring-rules.ts';
const plane='<path d="m12 28 42-16-15 37-7-15-20-6Zm20 6 22-22M32 34l-3 14 10-9"/>';
/** Original, script-free line art. All badges share an ink-and-paper 64-unit plate. */
export const badgeArtwork:Readonly<Record<string,string>>={
 bingo:'<rect x="11" y="11" width="42" height="42" rx="5"/><path d="M32 11v42M11 32h42M16 41l10 10 25-30"/><path d="M20 18v7M39 18h8m-8 0v10m0-5h6"/>',
 century:'<path d="M16 9h32v46H16zM16 17h32M23 9V5m18 4V5"/><rect x="9" y="24" width="46" height="20" rx="4"/><path d="M21 29v10m9-10h6v10h-6zm13 0h6v10h-6zM23 49h18"/>',
 committee:'<path d="m10 17 31-6 8 39-31 6zM19 10h34v39H19z"/><circle cx="35" cy="24" r="5"/><path d="M26 36c1-9 17-9 18 0"/><circle cx="45" cy="46" r="11"/><path d="M41 41v10m5-10h4v10h-4z"/>',
 airline:plane+'<path d="M13 39c-9 9 2 20 12 13M18 38h-8v7h6c7 0 7 10 0 10h-5"/>',
 affairs:'<rect x="9" y="9" width="46" height="46" rx="7"/><path d="M14 16v32m8-9h22v8H22zM27 39v-8h12v8M32 31V20"/><circle cx="32" cy="18" r="5"/><path d="m44 17 2 2m2 4 2 2m-3 4 2 2"/>',
 spectrum:'<path d="M32 7c12 0 9 14 9 14s14-5 17 7-12 15-12 15 9 12-2 17-16-8-16-8-9 11-19 3 2-20 2-20-12-8-4-18 19-1 19-1S21 7 32 7Z"/><path d="m20 25 7 6 5-11 5 11 7-6-3 17H23z"/>',
 census:plane+'<path d="M11 17v-8l7 4zM25 10V3l7 4zM43 5v7l7-3zM56 25h6l-3 6zM53 41h7l-4 6zM45 53v7l-6-4zM25 55v7l-6-4zM9 47H3l3-6zM8 30H2l3-6z"/><path d="M18 43v9m5-9h5l-3 4 3 5h-5"/>',
 partitions:'<path d="m5 16 13-6 14 6 14-6 13 6v35l-13-6-14 6-14-6-13 6zM18 10v35m14-29v35m14-41v35M23 22v15m5-15v15M49 23h8m-8 7h8m-8 7h8m-5-17v20"/><path d="M11 27c-9-8-8 5 0 10 8-5 9-18 0-10Z"/><circle cx="39" cy="24" r="2"/><circle cx="38" cy="36" r="3"/>',
 departments:'<path d="m23 7 18 0 16 16v18L41 57H23L7 41V23zM23 7v11m18-11v11m16 5H46m11 18H46M41 57V46M23 57V46M7 41h11M7 23h11"/><circle cx="30" cy="30" r="11"/><path d="m38 38 13 13"/>',
 magnitude:'<path d="M7 55h50M10 55V39h12v16m0-16V25h12v30m0-30V11h12v44m0-44V5h9v50"/><path d="m6 29 8-8 7 3 13-15M27 9h7v7"/>',
 untouched:'<path d="m32 6 23 9-3 22c-2 10-14 17-20 21-6-4-18-11-20-21L9 15z"/><circle cx="32" cy="32" r="13"/><path d="M26 29h12m-12 6h12M32 21v22"/>',
 reappropriation:'<path d="M8 32V12h29v40H8V39m0-17h29M15 29h9m-9 8h9m-9 8h9M49 13v23c0 13-9 16-19 16m6-7-7 7 7 6"/><circle cx="49" cy="13" r="8"/><path d="M46 13h6m-3-4v8"/>',
 authority:'<path d="M9 36h46v18l-6-4-6 4-6-4-6 4-6-4-6 4-10-4zM15 36v-8h34v8M25 28V15h14v13"/><ellipse cx="32" cy="11" rx="12" ry="7"/><path d="m26 8 12 6m-12 0 12-6M17 41v5m10-5v5m10-5v5m10-5v5"/>',
 ratified:'<path d="M17 10h34v35c0 12-9 12-9 5H9c-8 0-8-10 0-10h8zM17 17H9c-8 0-8-7 0-7h8M24 20h18m-18 8h13m-13 8h9"/><circle cx="44" cy="42" r="10"/><path d="m38 42 4 4 8-9m-13 14-2 10 9-5 8 5-1-12"/>',
 legendary:'<rect x="9" y="29" width="46" height="26" rx="5"/><path d="M9 39h46M26 38v7h12v-7M22 29v-7h20v7m-10-25 4 9 10 1-8 7 2 10-8-5-8 5 2-10-8-7 10-1z"/>',
 mythic:'<path d="m32 5 5 13 13-6-3 14 14 5-13 6 5 14-14-4-7 13-6-13-14 5 5-14L3 31l14-5-4-14 13 6z"/><path d="m22 25 10-6 10 6v14l-10 6-10-6zm0 0 20 14m0-14L22 39"/><ellipse cx="32" cy="32" rx="31" ry="12" transform="rotate(-32 32 32)"/>',
};
export function badgeSVG(id:string):string {
 const artwork=badgeArtwork[id];if(!artwork)throw Error('Missing achievement artwork: '+id);
 return `<svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${artwork}</svg>`;
}
for(const badge of badgeRules)if(!badgeArtwork[badge.id])throw Error('Badge has no SVG');
