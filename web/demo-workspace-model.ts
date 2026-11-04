export const desks=['authorize','observe','experiment','facilities','evidence'] as const;
export type DemoDesk=typeof desks[number];
export const watchViews=['overview','output','office','companions','commentary'] as const;
export type WatchView=typeof watchViews[number];
export function readDesk(url:URL):DemoDesk {
 const explicit=url.searchParams.get('desk');
 if(desks.includes(explicit as DemoDesk))return explicit as DemoDesk;
 if(url.searchParams.get('tour')==='office-v1'||url.hash==='#office-tour')return 'facilities';
 if(/^#(precedent|chronicle|personnel|supervision-evidence)/.test(url.hash))return 'evidence';
 if(url.hash.startsWith('#premises'))return 'experiment';
 if(['#mandate-output','#output'].includes(url.hash))return 'observe';
 return 'authorize';
}
export function watchView(value:string,office:boolean,companions:boolean):WatchView {
 if(!watchViews.includes(value as WatchView))return 'overview';
 if(value==='office'&&!office||value==='companions'&&!companions)return 'output';
 return value as WatchView;
}
export function initialWatchView(mobile:boolean,office:boolean):WatchView{return mobile?(office?'office':'output'):'overview';}
export function deskURL(source:URL,desk:DemoDesk):URL {
 const next=new URL(source);next.searchParams.set('desk',desk);next.hash='';return next;
}
export interface PresentationPolicy {cadence:string;companions:boolean;authority:string;roll:boolean;hovering:boolean}
