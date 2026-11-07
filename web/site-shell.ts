import {sitePage} from './site-navigation';

interface View {key:string;root:HTMLElement;main:HTMLElement;title:string;description:string;canonical?:string;robots?:string;classes:string;module?:string;loaded?:Promise<unknown>;scroll:{x:number;y:number}}
const views=new Map<string,View>(),shellURL=document.querySelector<HTMLScriptElement>('script[data-site-shell]')!.src;
const styleLoads=new Map<string,Promise<void>>();
const persistent='.site-header,.skip-link,.site-footer,#discovery-register,#companion-dialog,#active-run-banner,#active-run-announcement,.discovery-announcement,.companion-departures,.estate-announcement,script';
let active:View,serial=0,loading:AbortController|undefined;
const notice=document.createElement('p');notice.className='site-navigation-notice';notice.setAttribute('role','status');notice.setAttribute('aria-live','polite');notice.hidden=true;
const retry=document.createElement('button');retry.type='button';retry.className='button button-secondary';retry.textContent='Resubmit the navigation paperwork';retry.hidden=true;
let retryURL:URL|undefined;retry.addEventListener('click',()=>{if(retryURL)void navigate(retryURL,true);});
document.querySelector('.site-header')!.after(notice,retry);
const outlet=document.createElement('div');outlet.id='site-pages';retry.after(outlet);

function absolute(root:ParentNode,url:URL){
 for(const element of root.querySelectorAll<HTMLElement>('[href],[src],[action]'))for(const attribute of ['href','src','action']){
  const value=element.getAttribute(attribute);if(value===null)continue;
  if(attribute==='href'&&value==='#main')element.dataset.siteMainLink='true';
  element.setAttribute(attribute,new URL(value,url).href);
 }
}
function adopt(source:Document,url:URL):View {
 absolute(source,url);const key=sitePage(url)!;
 const root=document.createElement('div');root.dataset.sitePage=key||'home';root.hidden=true;root.inert=true;
 for(const element of [...source.body.children])if(!element.matches(persistent)&&element!==notice&&element!==retry&&element!==outlet)root.append(element);
 const main=root.querySelector<HTMLElement>('main')!;if(!main)throw Error('The destination has no main content.');
 const view:View={key,root,main,title:source.title,description:source.querySelector<HTMLMetaElement>('meta[name="description"]')?.content||'',canonical:source.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href,robots:source.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content,classes:source.body.className,module:source.querySelector<HTMLLinkElement>('link[rel="slopbuzz-page-module"]')?.href,scroll:{x:0,y:0}};
 main.id='site-main-'+(key||'home');views.set(key,view);outlet.append(root);return view;
}
function styles(source:Document):Promise<unknown[]> {
 return Promise.all([...source.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')].map(link=>{
  if(styleLoads.has(link.href))return styleLoads.get(link.href);
  if([...document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')].some(existing=>existing.href===link.href))return;
  const pending=new Promise<void>((resolve,reject)=>{const copy=link.cloneNode() as HTMLLinkElement;copy.onload=()=>resolve();copy.onerror=()=>{copy.remove();styleLoads.delete(link.href);reject(Error('The destination stylesheet could not be loaded.'));};document.head.append(copy);});styleLoads.set(link.href,pending);return pending;
 }));
}
function show(view:View,url:URL){
 if(active&&active!==view){active.scroll={x:scrollX,y:scrollY};document.dispatchEvent(new CustomEvent('site-page-leaving',{detail:{page:active.key}}));for(const dialog of document.querySelectorAll<HTMLDialogElement>('dialog[open]'))dialog.close();active.root.hidden=true;active.root.inert=true;active.main.id='site-main-'+(active.key||'home');}
 active=view;view.main.id='main';view.root.hidden=false;view.root.inert=false;document.title=view.title;document.body.className=view.classes;document.body.dataset.sitePage=view.key||'home';
 if(view.key!=='demo'){delete document.body.dataset.desk;document.body.dataset.companyMenu='closed';document.querySelector<HTMLButtonElement>('#company-menu')!.hidden=true;}
 const description=document.querySelector<HTMLMetaElement>('meta[name="description"]');if(description)description.content=view.description;
 let canonical=document.querySelector<HTMLLinkElement>('link[rel="canonical"]');if(view.canonical){if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.append(canonical);}canonical.href=view.canonical;}else canonical?.remove();
 let robots=document.querySelector<HTMLMetaElement>('meta[name="robots"]');if(view.robots){if(!robots){robots=document.createElement('meta');robots.name='robots';document.head.append(robots);}robots.content=view.robots;}else robots?.remove();
 for(const link of document.querySelectorAll<HTMLAnchorElement>('.site-header nav a')){if(sitePage(new URL(link.href))===view.key)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');}
 for(const link of document.querySelectorAll<HTMLAnchorElement>('[data-site-main-link]')){const target=new URL(url);target.hash='main';link.href=target.href;}
}
function failure(url:URL,error:unknown){retryURL=url;notice.hidden=false;retry.hidden=false;notice.textContent='Navigation could not be ratified. Any authorized mandate continues. '+(error instanceof Error?error.message:'The destination is unavailable.');}
async function navigate(url:URL,push:boolean,restore=false){
 const key=sitePage(url);if(key===undefined)return;
 const ticket=++serial;loading?.abort();loading=undefined;notice.hidden=true;retry.hidden=true;retryURL=undefined;
 try{
  let view=views.get(key);
  if(!view){
   loading=new AbortController();const response=await fetch(url,{signal:loading.signal});if(!response.ok)throw Error('The destination returned HTTP '+response.status+'.');
   const source=new DOMParser().parseFromString(await response.text(),'text/html');absolute(source,url);
   if(source.querySelector<HTMLScriptElement>('script[data-site-shell]')?.src!==shellURL)throw Error('This destination belongs to another release. Finish or stop the current mandate before refreshing the application.');
   await styles(source);if(ticket!==serial)return;view=adopt(source,url);
  }
  if(ticket!==serial)return;
  if(push)history.pushState({...history.state},'',url);show(view,url);
  document.dispatchEvent(new CustomEvent('site-page-change',{detail:{page:key,url:url.href,history:restore}}));
  view.loaded ||=view.module?import(view.module):Promise.resolve();await view.loaded;
  if(ticket!==serial)return;
  document.dispatchEvent(new CustomEvent('site-page-ready',{detail:{page:key,url:url.href,history:restore}}));
  if(url.hash){const target=document.getElementById(decodeURIComponent(url.hash.slice(1)));if(target&&view.root.contains(target)){target.scrollIntoView();if(target.tabIndex<0)target.tabIndex=-1;target.focus({preventScroll:true});}}
  else{const heading=[...view.main.querySelectorAll<HTMLElement>('h1')].find(element=>element.getClientRects().length)||view.main;heading.tabIndex=-1;heading.focus({preventScroll:true});window.scrollTo({left:restore?view.scroll.x:0,top:restore?view.scroll.y:0,behavior:'instant'});}
 }catch(error){if(ticket!==serial||(error as Error).name==='AbortError')return;failure(url,error);}
 finally{if(ticket===serial)loading=undefined;}
}

absolute(document,new URL(location.href));active=adopt(document,new URL(location.href));show(active,new URL(location.href));
document.documentElement.dataset.siteShell='ready';history.scrollRestoration='manual';
document.addEventListener('click',event=>{
 if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
 const link=event.target instanceof Element?event.target.closest<HTMLAnchorElement>('a[href]'):null;if(!link||link.hasAttribute('download')||link.target&&link.target!=='_self'||link.dataset.deskLink)return;
 const url=new URL(link.href),current=new URL(location.href);if(sitePage(url)===undefined)return;
 if(url.pathname===current.pathname&&url.search===current.search&&url.hash)return;
 event.preventDefault();void navigate(url,true);
});
addEventListener('popstate',()=>void navigate(new URL(location.href),false,true));
document.addEventListener('site-navigate',event=>{const detail=(event as CustomEvent<{url:URL;resolve():void;reject(reason:unknown):void}>).detail;void navigate(detail.url,true).then(detail.resolve,detail.reject);});
addEventListener('pagehide',()=>{loading?.abort();},{once:true});
const initial=active;initial.loaded=initial.module?import(initial.module):Promise.resolve();
void initial.loaded.then(()=>{if(active===initial)document.dispatchEvent(new CustomEvent('site-page-ready',{detail:{page:initial.key,url:location.href,initial:true}}));}).catch(error=>{if(active===initial)failure(new URL(location.href),error);});
