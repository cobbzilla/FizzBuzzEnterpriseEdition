import {request} from './runtime';
const output = document.querySelector('pre')!;
const path = new URL(location.href).searchParams.get('path') || '/operations/runtime';
document.querySelector('h1')!.textContent = `Official response: ${path}`;
try {
  const response = await request(path);
  output.textContent = `Status: ${response.status}\n${Array.from(response.headers, ([k,v]) => `${k}: ${v}`).join('\n')}\n\n${await response.text()}`;
} catch(error) {output.textContent = String(error);}
