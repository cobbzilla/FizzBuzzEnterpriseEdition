import {request} from './runtime';
const output = document.querySelector('#response-output')!;
const status = document.querySelector('#response-status')!;
output.setAttribute('aria-busy','true');
const path = new URL(location.href).searchParams.get('path') || '/operations/runtime';
document.querySelector('h1')!.textContent = `Official response: ${path}`;
try {
  const response = await request(path);
  output.textContent = `Status: ${response.status}\n${Array.from(response.headers, ([k,v]) => `${k}: ${v}`).join('\n')}\n\n${await response.text()}`;
  status.textContent = `Response received. Status ${response.status}.`;
} catch(error) {status.textContent = `Response unavailable: ${error}`;}
finally {output.removeAttribute('aria-busy');}
