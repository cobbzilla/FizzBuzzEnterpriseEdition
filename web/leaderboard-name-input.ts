/** A real input restriction, including paste/autofill; server validation remains authoritative. */
export function restrictLeaderboardName(input:HTMLInputElement){
 input.addEventListener('beforeinput',event=>{if(!event.isComposing&&event.inputType==='insertText'&&event.data&&event.data.length===1&&/[^A-Za-z0-9 _-]/.test(event.data))event.preventDefault();});
 const clean=()=>{const position=input.selectionStart??input.value.length,before=input.value.slice(0,position);const value=input.value.replace(/[^A-Za-z0-9 _-]/g,'').slice(0,24);if(value!==input.value){input.value=value;const caret=Math.min(before.replace(/[^A-Za-z0-9 _-]/g,'').length,value.length);input.setSelectionRange(caret,caret);}input.setCustomValidity('');};
 input.addEventListener('input',event=>{if(!(event as InputEvent).isComposing)clean();});input.addEventListener('compositionend',clean);
}
