// Generated from web/*.ts by scripts/build.ts. Do not edit.

// web/runtime-protocol.ts
var runtimeProtocol = 1;
function isTransientOperation(path2, method = "GET") {
  return method === "GET" && ["/fizzbuzz/window", "/capacity/forecast/extended", "/procurement/dossier", "/onboarding/rehearsal"].includes(path2.split("?")[0]);
}

// web/release-assets.ts
var scope = new URL("../", import.meta.url).href;
var releaseFile = (path2) => new URL(
  (typeof RELEASE_ASSET_DIRECTORY === "string" ? RELEASE_ASSET_DIRECTORY : "") + path2,
  scope
);

// web/runtime.ts
var config = await fetch(releaseFile("runtime-config.json"), { cache: "no-cache" }).then((r) => {
  if (!r.ok) throw new Error("Deployment configuration is unavailable");
  return r.json();
});
var BrowserRuntimeClient = class _BrowserRuntimeClient {
  constructor(configuration = config, isolated, transient = false) {
    this.configuration = configuration;
    if (!navigator.locks || !globalThis.crypto?.subtle) throw new Error("This browser requires a secure context, Web Locks, IndexedDB and Web Crypto.");
    this.channel = new BroadcastChannel(`slopbuzz:${scope}${isolated ? `:rehearsal:${isolated}` : ""}`);
    this.channel.onmessage = (event) => this.pending.get(event.data.id)?.(event.data);
    this.worker = new Worker(new URL(`${configuration.assets}runtime-worker.js`, scope));
    this.worker.postMessage({ config: configuration, scope, isolated, transient });
    addEventListener("pagehide", () => this.close(), { once: true });
  }
  configuration;
  channel;
  worker;
  pending = /* @__PURE__ */ new Map();
  compatibleOwners = /* @__PURE__ */ new Map();
  transientClient;
  close() {
    this.transientClient?.close();
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
    if (owner.revision !== this.configuration.revision) {
      if (!this.compatibleOwners.has(owner.leader)) {
        this.compatibleOwners.set(owner.leader, this.verifyCompatibility(owner));
      }
      await this.compatibleOwners.get(owner.leader);
      if (isTransientOperation(path2, options.method)) {
        this.transientClient ||= new _BrowserRuntimeClient(this.configuration, crypto.randomUUID(), true);
        return this.transientClient.request(path2, options);
      }
    }
    return this.dispatch(owner, path2, options);
  }
  async verifyCompatibility(owner) {
    const response = await this.dispatch(owner, "/operations/runtime");
    const runtime2 = response.ok ? await response.json() : {};
    if (runtime2.protocol !== runtimeProtocol || runtime2.mode !== "browser" || runtime2.revision !== owner.revision || runtime2.storage !== "IndexedDB") {
      throw new Error("The open audit runtime uses an unsupported protocol. Close other site tabs, then reload. No mandate was submitted.");
    }
  }
  dispatch(owner, path2, options = {}) {
    const id = crypto.randomUUID();
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error("The runtime stopped responding. The outcome is unknown; inspect the audit before resubmitting."));
      }, 12e4);
      this.pending.set(id, (reply) => {
        if (reply.kind !== "reply" || reply.leader !== owner.leader || reply.revision !== owner.revision) return;
        clearTimeout(timeout);
        this.pending.delete(id);
        if (reply.error) reject(new Error(reply.error));
        else {
          const headers = new Headers(reply.result.headers);
          headers.set("X-SlopBuzz-Executing-Revision", reply.revision);
          resolve(new Response(reply.result.body, { status: reply.result.status, headers }));
        }
      });
      this.channel.postMessage({ kind: "request", id, leader: owner.leader, revision: owner.revision, path: path2, method: options.method || "GET", traceparent: new Headers(options.headers).get("traceparent") || "" });
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
var request = (path2, options) => path2 === "/openapi.json" && (!options?.method || options.method === "GET") ? fetch(releaseFile("openapi.json")) : runtime.request(path2, options);
if ("serviceWorker" in navigator && config.mode === "browser") {
  void navigator.serviceWorker.register(new URL("sw.js", scope), { scope: new URL(scope).pathname }).catch((error) => console.warn("Offline installation unavailable", error));
}
var desks = /^\/(?:fizzbuzz|onboarding\/rehearsal|procurement\/dossier|capacity\/forecast|healthz|readyz|cache\/status|operations\/|audit\/)/;
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
