import {request} from './runtime';
const output = document.querySelector('#response-output')!;
const status = document.querySelector('#response-status')!;
output.setAttribute('aria-busy','true');
const root=output.closest('[data-site-page]')||document;let previous='',serial=0;
async function receive(){
const url=new URL(location.href);if(!url.pathname.replace(/\/$/,'').endsWith('/response'))return;
const path=url.searchParams.get('path')||'/operations/runtime';if(path===previous)return;previous=path;const ticket=++serial;
root.querySelector('h1')!.textContent = `Official response: ${path}`;output.setAttribute('aria-busy','true');
try {
  const response = await request(path);
  if(ticket!==serial)return;
  output.textContent = `Status: ${response.status}\n${Array.from(response.headers, ([k,v]) => `${k}: ${v}`).join('\n')}\n\n${await response.text()}`;
  status.textContent = `Response received. Status ${response.status}.`;
} catch(error) {status.textContent = `Response unavailable: ${error}`;}
finally {if(ticket===serial)output.removeAttribute('aria-busy');}
}
document.addEventListener('site-page-change',()=>void receive());void receive();
