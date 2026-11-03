export const officePackPrefix=(base:string)=>`slopbuzz-office-${encodeURIComponent(base)}-`;
export function officeCacheKey(base:string,url:URL){const id=url.pathname.match(/\/assets\/([a-f0-9]{16})\/office-world\.js$/)?.[1];return id?officePackPrefix(base)+id:undefined;}
