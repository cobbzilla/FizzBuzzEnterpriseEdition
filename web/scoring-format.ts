export function pointsFormatter(locales?:string|string[]){return new Intl.NumberFormat(locales,{useGrouping:true,maximumFractionDigits:0});}
export const formatPoints=(value:bigint,locales?:string|string[])=>pointsFormatter(locales||(typeof navigator==='undefined'?undefined:[...navigator.languages])).format(value);
