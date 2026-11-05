export type PlaybackIcon = 'pause' | 'play' | 'stop' | 'next' | 'options' | 'evidence' | 'waive';
const paths: Record<PlaybackIcon, string> = {
 pause: 'M9 5v14M15 5v14',
 play: 'M8 5l11 7-11 7V5Z',
 stop: 'M6 6h12v12H6Z',
 next: 'M5 5l10 7-10 7V5ZM19 5v14',
 options: 'M3 7h3m6 0h9M3 17h9m6 0h3M12 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM18 17a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
 evidence: 'M14 3H5v18h8M14 3l5 5h-5V3ZM8 8h3M8 12h3M8 16h3M20 17a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM20 20l2 2',
 waive: 'M3 5l8 7-8 7V5ZM12 5l8 7-8 7V5ZM22 5v14'
};

/** SVGs carry no competing text; the button keeps its live accessible name and tooltip. */
export function playbackIcon(button: HTMLButtonElement, icon: PlaybackIcon, label: string) {
 button.setAttribute('aria-label', label);button.title=label;button.classList.add('playback-icon');
 if(button.dataset.icon===icon)return;
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
 svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','2');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');
 const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',paths[icon]);svg.append(path);
 button.dataset.icon=icon;button.replaceChildren(svg);
}
