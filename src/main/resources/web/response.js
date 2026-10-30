// Generated from web/*.ts by scripts/build.ts. Do not edit.

// web/runtime.ts
var scope = new URL("../", import.meta.url).href;
var config = await fetch(new URL("runtime-config.json", scope), { cache: "no-cache" }).then((r) => {
  if (!r.ok) throw new Error("Deployment configuration is unavailable");
  return r.json();
});
var BrowserRuntimeClient = class {
  constructor(configuration = config, isolated) {
    this.configuration = configuration;
    if (!navigator.locks || !globalThis.crypto?.subtle) throw new Error("This browser requires a secure context, Web Locks, IndexedDB and Web Crypto.");
    this.channel = new BroadcastChannel(`slopbuzz:${scope}${isolated ? `:rehearsal:${isolated}` : ""}`);
    this.channel.onmessage = (event) => this.pending.get(event.data.id)?.(event.data);
    this.worker = new Worker(new URL(`${configuration.assets}runtime-worker.js`, scope));
    this.worker.postMessage({ config: configuration, scope, isolated });
    addEventListener("pagehide", () => this.close(), { once: true });
  }
  configuration;
  channel;
  worker;
  pending = /* @__PURE__ */ new Map();
  close() {
    this.worker.terminate();
    this.channel.close();
  }
  async owner() {
    const id = crypto.randomUUID();
    return new Promise((resolve, reject) => {
      const send = () => this.channel.postMessage({ kind: "hello", id, revision: this.configuration.revision });
      const retry = setInterval(send, 150);
      const timeout = setTimeout(() => {
        clearInterval(retry);
        this.pending.delete(id);
        reject(new Error("Runtime initialization timed out. No request was submitted."));
      }, 6e4);
      this.pending.set(id, (reply) => {
        clearInterval(retry);
        clearTimeout(timeout);
        this.pending.delete(id);
        resolve(reply);
      });
      send();
    });
  }
  async request(path2, options = {}) {
    const owner = await this.owner();
    if (owner.error) throw new Error(owner.error);
    if (owner.revision !== this.configuration.revision) throw new Error("An older release owns the repository. Close other tabs and reload.");
    const id = crypto.randomUUID();
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error("The runtime stopped responding. The outcome is unknown; inspect the audit before resubmitting."));
      }, 12e4);
      this.pending.set(id, (reply) => {
        clearTimeout(timeout);
        this.pending.delete(id);
        if (reply.error) reject(new Error(reply.error));
        else resolve(new Response(reply.result.body, { status: reply.result.status, headers: reply.result.headers }));
      });
      this.channel.postMessage({ kind: "request", id, leader: owner.leader, revision: this.configuration.revision, path: path2, method: options.method || "GET", traceparent: new Headers(options.headers).get("traceparent") || "" });
    });
  }
};
var ServerRuntimeClient = class {
  request(path2, options = {}) {
    return fetch(`${(config.apiBaseUrl || "").replace(/\/$/, "")}${path2}`, { ...options, cache: "no-store" });
  }
};
if (!["browser", "server"].includes(config.mode)) throw new Error("Unrecognized runtime mode");
var runtime = config.mode === "server" ? new ServerRuntimeClient() : new BrowserRuntimeClient();
var request = (path2, options) => path2 === "/openapi.json" && (!options?.method || options.method === "GET") ? fetch(new URL("openapi.json", scope)) : runtime.request(path2, options);
if ("serviceWorker" in navigator && config.mode === "browser") {
  void navigator.serviceWorker.register(new URL("sw.js", scope), { scope: new URL(scope).pathname }).catch((error) => console.warn("Offline installation unavailable", error));
}
var desks = /^\/(?:fizzbuzz|procurement\/dossier|capacity\/forecast|healthz|readyz|cache\/status|operations\/|audit\/)/;
if (config.mode === "browser") document.querySelectorAll("a[href]").forEach((link) => {
  const url = new URL(link.href);
  const base = new URL(scope).pathname.replace(/\/$/, "");
  const path2 = url.pathname.slice(base.length) + url.search;
  if (url.origin !== location.origin || !desks.test(path2)) return;
  link.href = new URL(`response/?path=${encodeURIComponent(path2)}`, scope).href;
});

// web/response.ts
var output = document.querySelector("#response-output");
var status = document.querySelector("#response-status");
output.setAttribute("aria-busy", "true");
var path = new URL(location.href).searchParams.get("path") || "/operations/runtime";
document.querySelector("h1").textContent = `Official response: ${path}`;
try {
  const response = await request(path);
  output.textContent = `Status: ${response.status}
${Array.from(response.headers, ([k, v]) => `${k}: ${v}`).join("\n")}

${await response.text()}`;
  status.textContent = `Response received. Status ${response.status}.`;
} catch (error) {
  status.textContent = `Response unavailable: ${error}`;
} finally {
  output.removeAttribute("aria-busy");
}
