import type {ScoringRun} from './scoring-service.ts';

export const leaderboardAPI='/api/high-scores';
export const participationKey='slopbuzz:high-scores:participation:v1';
export const leaderboardLimit=1000;
export type Participation='undecided'|'private'|'public';
export interface LeaderboardReceipt {schema:'slopbuzz-leaderboard/v1';sequence:number;run:ScoringRun}
export interface LeaderboardEntry {
 id:string;runId:string;rank:number;name:string;score:string;through:string;mandate:string;
 status:ScoringRun['status'];rules:string;identity:string;conditions:Record<string,string>;
 attainedAt:string;updatedAt:string;stale:boolean;
}
export interface LeaderboardPage {entries:LeaderboardEntry[];total:number;offset:number;limit:number;cutoff:string|null;asOf:string;enabled:boolean;sitekey:string}
export interface QualificationResult {qualifies:boolean;rank:number|null;score:string;runId:string;sequence:number;asOf:string}
export interface PersonalStanding {participating:boolean;name:string;entry:LeaderboardEntry|null;asOf:string;enabled:boolean;sitekey:string}
export interface SubmissionResult extends PersonalStanding {acceptedSequence:number;runId:string}
export function leaderboardName(value:unknown):string {
 if(typeof value!=='string')throw Error('Enter a name using letters, digits, spaces, hyphens and underscores.');
 const name=value.trim();
 if(!/^[A-Za-z0-9 _-]{1,24}$/.test(name)||!/[A-Za-z0-9]/.test(name))throw Error('Use 1–24 ASCII letters, digits, spaces, hyphens or underscores, including at least one letter or digit.');
 return name;
}
export function decimalCompare(a:string,b:string){return a.length-b.length||(a<b?-1:a>b?1:0);}
export function publicationReceipt(run:ScoringRun):LeaderboardReceipt|undefined {
 if(run.publicationProtocol!==1||!Number.isSafeInteger(run.revision)||run.partial||BigInt(run.verification.through)<1n)return;
 return {schema:'slopbuzz-leaderboard/v1',sequence:run.revision!,run};
}
