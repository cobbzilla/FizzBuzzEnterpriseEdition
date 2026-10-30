export type MandateInteger = number | bigint;
export function parseMandate(raw: string): MandateInteger | null {
 const text=raw.trim();
 if(!/^[0-9]+$/.test(text)) return null;
 const ordinary=Number(text);
 return Number.isSafeInteger(ordinary) ? ordinary : BigInt(text);
}
export const autocorrectMandate = (raw: string) => raw.replace(/[^0-9]/g,'');
export const addOrdinals = (value: MandateInteger, count: number): MandateInteger => typeof value==='bigint'?value+BigInt(count):value+count;
export function windowCount(next: MandateInteger, limit: MandateInteger): number {
 if(typeof next==='bigint'&&typeof limit==='bigint') return Number(limit-next+1n<100n?limit-next+1n:100n);
 return Math.min(100,Number(limit)-Number(next)+1);
}
export const magnitudeWarnings = Object.freeze([
 'PROVISIONAL INCIDENT: Your integer may possibly have exceeded its delegated magnitude authority.',
 'POLICY REVIEW PENDING: This request might have crossed an undocumented numerical border.',
 'PRELIMINARY ESCALATION: An oversized ordinal may have entered circulation without executive indemnity.',
 'POSSIBLE CONTROL BREACH: The requested magnitude appears larger than the committee’s confidence.',
 'UNCONFIRMED NUMERICAL EMERGENCY: Your upper limit may require a larger filing cabinet.',
 'POTENTIAL JURISDICTIONAL EVENT: This integer might be operating beyond the ordinary-number charter.',
 'TENTATIVE COMPLIANCE ALERT: A digit may have arrived without its magnitude escort.',
 'CONDITIONAL SEVERITY ONE: Your request could conceivably exceed our ceremonial insurance allowance.',
 'SUSPECTED ORDINAL EXCESS: Management cannot presently exclude the possibility of too much number.',
 'PROVISIONAL GOVERNANCE FAILURE: This value may have outgrown its approved organizational chart.',
 'MAGNITUDE EXCEPTION SUSPECTED: The decimal expansion might require a second board of directors.',
 'POSSIBLE POLICY DEVIATION: An unauthorized quantity of integer may be present in this request.',
 'PRECAUTIONARY EXECUTIVE NOTICE: Your number could be larger than the policy author anticipated.',
 'UNVERIFIED BOUNDARY INCIDENT: The requested ordinal may have escaped the standard arithmetic enclosure.',
 'CONTINGENT DISCIPLINARY REVIEW: Someone might possibly need to explain all these digits.',
 'PRELIMINARY RISK FINDING: This upper limit may have exceeded the building’s authorized numerical load.',
 'POTENTIAL CHARTER OVERRUN: The committee has not ruled out a surplus of mathematical ambition.',
 'PROVISIONAL EXCESS-MAGNITUDE NOTICE: This request may require an unusually solemn signature.',
 'SUSPECTED SCALE VIOLATION: Your integer might be too substantial for the current stationery.',
 'POSSIBLE ENTERPRISE INCIDENT: This value may have activated a policy nobody has finished writing.',
]);
export function chooseMagnitudeWarning(previous=-1,random=Math.random): {index:number;text:string} {
 const width=previous>=0?magnitudeWarnings.length-1:magnitudeWarnings.length;
 let index=Math.min(width-1,Math.floor(random()*width));
 if(previous>=0&&index>=previous)index++;
 return {index,text:magnitudeWarnings[index]};
}
