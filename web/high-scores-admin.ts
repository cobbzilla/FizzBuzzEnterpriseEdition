/** Compiled with the Worker and served only behind its Basic authentication boundary. */
export function adminApplication(){
 const root=document.getElementById('admin')!,status=document.getElementById('status')!,rows=document.getElementById('rows')!,bans=document.getElementById('bans')!,events=document.getElementById('events')!;
 let board='daily',offset=0,generation=0;
 const request=async(path:string,method='GET',body?:unknown)=>{const r=await fetch('/admin/high-scores/api/'+path,{method,credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json','X-Scoreboard-Admin':'1'},...(body===undefined?{}:{body:JSON.stringify(body)})});const data=await r.json();if(!r.ok)throw Error(data.error||'Administration request failed');return data;};
 const el=(tag:string,text='')=>{const node=document.createElement(tag);node.textContent=text;return node;};
 const action=(label:string,run:()=>Promise<void>)=>{const button=el('button',label);button.addEventListener('click',()=>{void run().catch(error=>{status.textContent=error.message;});});return button;};
 const load=async()=>{
  const current=++generation;status.textContent='Loading…';const data=await request('boards?board='+board+'&offset='+offset);if(current!==generation)return;
  rows.replaceChildren();for(const entry of data.entries){const tr=el('tr');tr.append(el('th','#'+entry.rank.toLocaleString()),el('td',entry.name),el('td',entry.submittedName),el('td',BigInt(entry.score).toLocaleString()));const controls=el('td');controls.append(action('Ban name and variants',async()=>{const input=document.getElementById('ban-name') as HTMLInputElement;input.value=entry.submittedName;await preview();input.focus();}),action('Delete scores and block browser',async()=>{if(!confirm(`Delete every score for ${entry.submittedName} and block this browser credential?`))return;await request('people/'+entry.id,'DELETE');await load();}));tr.append(controls);rows.append(tr);}
  status.textContent=`${data.total?offset+1:0}–${Math.min(offset+50,data.total)} of ${data.total}`;
  (document.getElementById('previous') as HTMLButtonElement).disabled=offset===0;(document.getElementById('next') as HTMLButtonElement).disabled=offset+50>=data.total;
  const settings=await request('moderation');if(current!==generation)return;
  bans.replaceChildren();for(const ban of settings.bans){const li=el('li',ban.name+' ');li.append(action('Remove ban',async()=>{await request('bans/'+ban.id,'DELETE');await load();}));bans.append(li);}
  events.textContent=JSON.stringify({notifications:settings.notifications,actions:settings.actions},null,2);
 };
 const preview=async()=>{const name=(document.getElementById('ban-name') as HTMLInputElement).value;const result=await request('preview','POST',{name});document.getElementById('preview')!.textContent=JSON.stringify(result,null,2);};
 root.querySelectorAll<HTMLButtonElement>('[data-board]').forEach(button=>{button.addEventListener('click',()=>{board=button.dataset.board!;offset=0;root.querySelectorAll('[data-board]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));void load().catch(e=>{status.textContent=e.message;});});});
 document.getElementById('previous')!.addEventListener('click',()=>{offset=Math.max(0,offset-50);void load().catch(e=>{status.textContent=e.message;});});document.getElementById('next')!.addEventListener('click',()=>{offset+=50;void load().catch(e=>{status.textContent=e.message;});});
 const input=document.getElementById('ban-name') as HTMLInputElement;
 input.addEventListener('beforeinput',e=>{if(!e.isComposing&&e.inputType==='insertText'&&e.data&&e.data.length===1&&/[^A-Za-z0-9 _-]/.test(e.data))e.preventDefault();});
 const clean=()=>{const at=input.selectionStart??input.value.length,n=input.value.slice(0,at).replace(/[^A-Za-z0-9 _-]/g,'').length;input.value=input.value.replace(/[^A-Za-z0-9 _-]/g,'').slice(0,24);input.setSelectionRange(n,n);};input.addEventListener('input',e=>{if(!(e as InputEvent).isComposing)clean();});input.addEventListener('compositionend',clean);
 document.getElementById('test-name')!.addEventListener('click',()=>{void preview().catch(e=>{status.textContent=e.message;});});
 document.getElementById('ban-form')!.addEventListener('submit',e=>{e.preventDefault();void(async()=>{await preview();if(!confirm('Ban this name and matching spelling variants? Their scores remain visible anonymously.'))return;await request('bans','POST',{name:input.value});input.value='';await load();})().catch(error=>{status.textContent=error.message;});});
 document.getElementById('search-form')!.addEventListener('submit',e=>{e.preventDefault();void request('search?q='+encodeURIComponent((document.getElementById('search-name') as HTMLInputElement).value)).then(data=>{const result=document.getElementById('search-results')!;result.replaceChildren();for(const person of data.people){const p=el('p',`${person.name} · ${person.blocked?'Blocked':'Active'} · ${person.id} `);p.append(action('Delete scores and block browser',async()=>{if(confirm('Delete all scores and block this browser?')){await request('people/'+person.id,'DELETE');await load();p.remove();}}));result.append(p);}}).catch(error=>{status.textContent=error.message;});});
 void load().catch(error=>{status.textContent=error.message;});
}
