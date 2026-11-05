import {byId} from './dom';

type OfficeView = 'observe' | 'facilities';
type PanelView = 'both' | 'output' | 'log' | 'none';

/** Presentation ownership only: the same canvases, controls and records move in and out. */
class OfficeFullscreen {
  private readonly dialog = byId<HTMLDialogElement>('office-fullscreen');
  private readonly surface = byId('office-fullscreen-surface');
  private readonly panels = byId<HTMLSelectElement>('office-fullscreen-panels');
  private readonly exit = byId<HTMLButtonElement>('office-fullscreen-exit');
  private restorations: (() => void)[] = [];
  private invoker?: HTMLElement;
  private native = false;
  private serial = 0;
  private position = {x: 0, y: 0};
  mode?: OfficeView;
  placeChronicle?: (target: HTMLElement) => void;

  constructor() {
    this.exit.addEventListener('click', () => this.close());
    this.dialog.addEventListener('cancel', event => {event.preventDefault(); this.close();});
    this.dialog.addEventListener('close', () => {if (!this.dialog.open) this.close();});
    this.panels.addEventListener('change', () => this.layout());
    addEventListener('resize', () => {if (this.mode) this.adapt();});
    document.addEventListener('demo-watch-layout', () => {if (this.mode === 'observe') this.layout();});
    byId('office-fullscreen-inspect').addEventListener('click', () => this.inspection(byId('office-fullscreen-drawer').hidden === true));
    byId('office-fullscreen-drawer-close').addEventListener('click', () => this.inspection(false, true));
    byId('office-fullscreen-drawer').addEventListener('keydown', event => {
      if (event.key === 'Escape') {event.preventDefault(); event.stopPropagation(); this.inspection(false, true);}
    });
    document.addEventListener('fullscreenchange', () => {
      if (!this.mode) return;
      if (document.fullscreenElement === this.surface) this.native = true;
      else if (this.native) this.close();
    });
    document.addEventListener('demo-presentation-change', () => {
      if (this.mode !== 'observe') return;
      if (!byId<HTMLInputElement>('executive-hovering').checked) this.close();
      else this.layout();
    });
    const resize = new ResizeObserver(() => {
      this.surface.style.setProperty('--immersive-controls-height', Math.ceil(byId('office-fullscreen-controls').getBoundingClientRect().height) + 'px');
      this.surface.style.setProperty('--immersive-header-height', Math.ceil(byId('office-fullscreen-header').getBoundingClientRect().height) + 'px');
    });
    resize.observe(byId('office-fullscreen-controls'));
    resize.observe(byId('office-fullscreen-header'));
    addEventListener('pagehide', () => this.close(false), {once: true});
  }

  open(mode: OfficeView, invoker: HTMLElement) {
    if (this.mode) return;
    if (mode === 'observe' && !byId<HTMLInputElement>('executive-hovering').checked) return;
    // An enlarged Facilities visit returns to its usual slot before this presentation.
    byId<HTMLDialogElement>('office-modal').close();
    this.mode = mode;
    const serial = ++this.serial;
    this.invoker = invoker;
    this.position = {x: scrollX, y: scrollY};
    this.surface.dataset.view = mode;
    document.documentElement.classList.add('office-is-fullscreen');
    byId('office-fullscreen-title').textContent = mode === 'observe' ? 'Executive Occupation of the Entire Screen' : 'The Serious Business Office · Full estate access';
    byId('office-fullscreen-panel-control').hidden = mode !== 'observe';
    byId('office-fullscreen-inspect').hidden = mode !== 'facilities';
    this.adapt();
    this.panels.value = this.surface.dataset.largeText === 'true' ? 'none' : (innerWidth < 360 || innerHeight < 450) ? 'log' : 'both';
    if (mode === 'observe') {
      this.move(byId('supervision-pane'), 'office-fullscreen-stage');
      this.move(byId('watch-output'), 'office-fullscreen-output-slot');
      this.move(byId('supervision-caption'), 'office-fullscreen-current-slot');
      this.move(byId('chronicle-scroll').closest<HTMLElement>('.chronicle')!, 'office-fullscreen-log-slot', true);
      this.move(document.querySelector<HTMLElement>('.watch-transport')!, 'office-fullscreen-controls');
      this.move(byId('watch-settings'), 'office-fullscreen-settings');
      this.move(byId('companion-spotlight'), 'office-fullscreen-companion');
    } else {
      this.move(byId('office-stage'), 'office-fullscreen-stage');
      this.move(document.querySelector<HTMLElement>('.office-toolbar')!, 'office-fullscreen-controls');
      this.move(byId('office-walking-controls'), 'office-fullscreen-controls');
      const playback = document.createElement('div');
      playback.className = 'immersive-route-controls';
      byId('office-fullscreen-controls').append(playback);
      this.restorations.push(() => playback.remove());
      this.move(byId('office-pause'), playback);
      this.move(byId('office-next'), playback);
      for (const element of [byId('office-camera-help'), document.querySelector<HTMLElement>('.office-inspection')!, document.querySelector<HTMLElement>('.office-playback')!, byId('office-route-status'), byId('office-route'), byId('office-reorganization'), document.querySelector<HTMLElement>('.office-options')!]) this.move(element, 'office-fullscreen-inspection-slot');
    }
    const notice = byId(mode === 'observe' ? 'run-status' : 'office-status');
    this.move(notice, 'office-fullscreen-notice');
    // Native dialogs must remain within the element granted browser full-screen.
    for (const id of ['companion-dialog', 'personnel-dialog']) this.move(byId(id), this.surface);
    this.inspection(false);
    this.layout();
    this.dialog.showModal();
    this.exit.focus({preventScroll: true});
    this.changed();
    byId('office-fullscreen-status').textContent = 'The office fills this tab. Return to website restores your previous view.';
    // Request synchronously in the button gesture. Denial leaves the usable tab-sized view.
    if (document.fullscreenEnabled && this.surface.requestFullscreen) {
      try {
        void this.surface.requestFullscreen({navigationUI: 'hide'}).then(() => {
          if (serial !== this.serial || !this.mode) {
            if (document.fullscreenElement === this.surface) void document.exitFullscreen().catch(() => {});
          } else {
            this.native = true;
            byId('office-fullscreen-status').textContent = 'Browser full-screen is active. Escape or Return to website leaves the office view.';
          }
        }).catch(() => {
          if (serial === this.serial && this.mode) byId('office-fullscreen-status').textContent = 'Browser full-screen is unavailable. The office still fills this tab; all controls remain available.';
        });
      } catch { /* The tab-sized presentation remains available. */ }
    }
  }

  close(restoreFocus = true) {
    if (!this.mode) return;
    const observed = this.mode === 'observe';
    this.mode = undefined;
    this.serial++;
    this.native = false;
    for (const child of this.surface.querySelectorAll<HTMLDialogElement>('dialog[open]')) child.close();
    this.dialog.close();
    for (const restore of this.restorations.reverse()) restore();
    this.restorations = [];
    document.documentElement.classList.remove('office-is-fullscreen');
    const nativeExit = document.fullscreenElement === this.surface ? document.exitFullscreen().catch(() => {}) : Promise.resolve();
    this.changed();
    if (restoreFocus) {
      const invoker = this.invoker, position = this.position, serial = this.serial;
      void nativeExit.then(() => requestAnimationFrame(() => {
        if (serial !== this.serial || this.mode) return;
        const target = invoker?.getClientRects().length ? invoker : observed && byId('executive-hovering').getClientRects().length ? byId('executive-hovering') : observed ? byId('watch-settings-toggle') : byId('office-enter');
        target.focus({preventScroll: true});
        window.scrollTo({left: position.x, top: position.y, behavior: 'instant'});
      }));
    }
  }

  inspection(open: boolean, focus = false) {
    byId('office-fullscreen-drawer').hidden = !open;
    byId('office-fullscreen-inspect').setAttribute('aria-expanded', String(open));
    if (focus) byId('office-fullscreen-inspect').focus({preventScroll: true});
  }

  private move(element: HTMLElement, destination: string | HTMLElement, chronicle = false) {
    const target = typeof destination === 'string' ? byId(destination) : destination;
    const marker = document.createComment('Retained office presentation slot');
    element.before(marker);
    if (chronicle && this.placeChronicle) this.placeChronicle(target);
    else target.append(element);
    this.restorations.push(() => {
      if (chronicle && this.placeChronicle) {this.placeChronicle(marker.parentElement!); marker.remove();}
      else marker.replaceWith(element);
    });
  }

  private layout() {
    const panels = this.panels.value as PanelView;
    byId('office-fullscreen-output').hidden = this.mode !== 'observe' || !['both', 'output'].includes(panels);
    byId('office-fullscreen-log').hidden = this.mode !== 'observe' || !['both', 'log'].includes(panels);
    byId('office-fullscreen-companion').hidden = this.mode !== 'observe' || panels === 'none' || !byId<HTMLInputElement>('emoji-companions').checked || !byId<HTMLInputElement>('require-companion-roll-call').checked;
    this.surface.dataset.panels = panels;
  }

  private adapt() {
    const large = parseFloat(getComputedStyle(document.documentElement).fontSize) > 20;
    this.surface.dataset.largeText = String(large);
    const names = large ? ['Both', 'Output', 'Log', 'Hide'] : ['Output + log', 'Output', 'Running log', 'Hide panels'];
    [...this.panels.options].forEach((option, index) => {if (option.textContent !== names[index]) option.textContent = names[index];});
  }

  private changed() {document.dispatchEvent(new Event('office-fullscreen-change'));}
}

let presentation: OfficeFullscreen | undefined;
export function officeFullscreen() {return presentation ||= new OfficeFullscreen();}
