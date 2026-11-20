import {formatPoints} from './scoring-format';
/** Progressive enhancement only: the complete generated guide remains readable without JS. */
function localize(){for(const element of document.querySelectorAll<HTMLElement>('[data-score-number]'))try{element.textContent=formatPoints(BigInt(element.dataset.scoreNumber!));}catch{/* Preserve readable generated text. */}}
localize();document.addEventListener('site-page-ready',localize);
