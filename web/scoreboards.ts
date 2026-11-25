export const anonymousName='Anonymous Coward';
export const dayMs=86400000;
export const scoreboards=[
 {id:'daily',label:'Daily',window:'Last 24 hours',duration:dayMs},
 {id:'weekly',label:'Weekly',window:'Last 7 days',duration:7*dayMs},
 {id:'monthly',label:'Monthly',window:'Last 30 days',duration:30*dayMs},
 {id:'all-time',label:'All-time',window:'All recorded scores',duration:0}
] as const;
export type Scoreboard=typeof scoreboards[number]['id'];
export function isScoreboard(value:unknown):value is Scoreboard{return scoreboards.some(b=>b.id===value);}
export function boardCutoff(board:Scoreboard,now:number){const duration=scoreboards.find(b=>b.id===board)!.duration;return duration?now-duration:-1;}
export function scoreboardIcon(board:Scoreboard){
 const paths:Record<Scoreboard,string>={
  daily:'<circle cx="22" cy="22" r="13"/><path d="M22 2v4m0 32v4M2 22h4m32 0h4M8 8l3 3m22 22 3 3M8 36l3-3m22-22 3-3"/>',
  weekly:'<path d="m4 7 8 31 10-19 10 19 8-31"/>',
  monthly:'<rect x="4" y="7" width="36" height="33" rx="4"/><path d="M4 15h36M13 3v8M31 3v8"/>',
  'all-time':'<path d="M10 5h24v13c0 8-5 13-12 13s-12-5-12-13V5Zm0 5H3v7c0 6 4 10 11 10m20-17h7v7c0 6-4 10-11 10M22 31v8m-8 2h16"/>'
 };
 return `<svg viewBox="0 0 44 44" width="40" height="40" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[board]}</g></svg>`;
}
