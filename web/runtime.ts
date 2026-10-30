import type { RuntimeClient, RuntimeConfig, WorkerReply } from './contracts';
export const scope = new URL('../', import.meta.url).href;
export const config: RuntimeConfig = await fetch(new URL('runtime-config.json', scope), {cache: 'no-cache'}).then(r => {
  if (!r.ok) throw new Error('Deployment configuration is unavailable');
  return r.json();
});
export class BrowserRuntimeClient implements RuntimeClient {
  private channel: BroadcastChannel;
  private worker: Worker;
  private pending = new Map<string, (reply: WorkerReply) => void>();
  constructor(private configuration = config, isolated?: string) {
    if (!navigator.locks || !globalThis.crypto?.subtle) throw new Error('This browser requires a secure context, Web Locks, IndexedDB and Web Crypto.');
    this.channel = new BroadcastChannel(`slopbuzz:${scope}${isolated ? `:rehearsal:${isolated}` : ''}`);
    this.channel.onmessage = (event: MessageEvent<WorkerReply>) => this.pending.get(event.data.id)?.(event.data);
    this.worker = new Worker(new URL(`${configuration.assets}runtime-worker.js`, scope));
    this.worker.postMessage({config: configuration, scope, isolated});
    addEventListener('pagehide', () => this.close(), {once: true});
  }
  close() { this.worker.terminate(); this.channel.close(); }
  private async owner(): Promise<WorkerReply> {
    const id = crypto.randomUUID();
    return new Promise((resolve, reject) => {
      const send = () => this.channel.postMessage({kind: 'hello', id, revision: this.configuration.revision});
      const retry = setInterval(send, 150);
      const timeout = setTimeout(() => { clearInterval(retry); this.pending.delete(id); reject(new Error('Runtime initialization timed out. No request was submitted.')); }, 60_000);
      this.pending.set(id, reply => {clearInterval(retry); clearTimeout(timeout); this.pending.delete(id); resolve(reply);});
      send();
    });
  }
  async request(path: string, options: RequestInit = {}): Promise<Response> {
    const owner = await this.owner();
    if (owner.error) throw new Error(owner.error);
    if (owner.revision !== this.configuration.revision) throw new Error('An older release owns the repository. Close other tabs and reload.');
    const id = crypto.randomUUID();
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {this.pending.delete(id); reject(new Error('The runtime stopped responding. The outcome is unknown; inspect the audit before resubmitting.'));}, 120_000);
      this.pending.set(id, reply => {
        clearTimeout(timeout); this.pending.delete(id);
        if (reply.error) reject(new Error(reply.error));
        else resolve(new Response(reply.result!.body, {status: reply.result!.status, headers: reply.result!.headers}));
      });
      this.channel.postMessage({kind: 'request', id, leader: owner.leader, revision: this.configuration.revision, path, method: options.method || 'GET', traceparent: new Headers(options.headers).get('traceparent') || ''});
    });
  }
}
class ServerRuntimeClient implements RuntimeClient {
  request(path: string, options: RequestInit = {}) {
    return fetch(`${(config.apiBaseUrl || '').replace(/\/$/, '')}${path}`, {...options, cache: 'no-store'});
  }
}
if (!['browser', 'server'].includes(config.mode)) throw new Error('Unrecognized runtime mode');
export const runtime: RuntimeClient = config.mode === 'server' ? new ServerRuntimeClient() : new BrowserRuntimeClient();
export const request = (path: string, options?: RequestInit) => path === '/openapi.json' && (!options?.method || options.method === 'GET') ? fetch(new URL('openapi.json',scope)) : runtime.request(path, options);
// Offline installation is an infrastructure concern, not a site-wide announcement.
if ('serviceWorker' in navigator && config.mode === 'browser') {
  void navigator.serviceWorker.register(new URL('sw.js', scope), {scope: new URL(scope).pathname})
    .catch(error => console.warn('Offline installation unavailable', error));
}
// Raw operational links remain useful on a static host, without pretending to be HTTP endpoints.
const desks = /^\/(?:fizzbuzz|capacity\/forecast|healthz|readyz|cache\/status|operations\/|audit\/)/;
if (config.mode === 'browser') document.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(link => {
  const url = new URL(link.href);
  const base = new URL(scope).pathname.replace(/\/$/, '');
  const path = url.pathname.slice(base.length) + url.search;
  if (url.origin !== location.origin || !desks.test(path)) return;
  link.href = new URL(`response/?path=${encodeURIComponent(path)}`, scope).href;
});
