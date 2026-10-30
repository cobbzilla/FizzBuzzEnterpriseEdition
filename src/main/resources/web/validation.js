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
  async request(path, options = {}) {
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
      this.channel.postMessage({ kind: "request", id, leader: owner.leader, revision: this.configuration.revision, path, method: options.method || "GET", traceparent: new Headers(options.headers).get("traceparent") || "" });
    });
  }
};
var ServerRuntimeClient = class {
  request(path, options = {}) {
    return fetch(`${(config.apiBaseUrl || "").replace(/\/$/, "")}${path}`, { ...options, cache: "no-store" });
  }
};
if (!["browser", "server"].includes(config.mode)) throw new Error("Unrecognized runtime mode");
var runtime = config.mode === "server" ? new ServerRuntimeClient() : new BrowserRuntimeClient();
if ("serviceWorker" in navigator && config.mode === "browser") {
  void navigator.serviceWorker.register(new URL("sw.js", scope), { scope: new URL(scope).pathname }).catch((error) => console.warn("Offline installation unavailable", error));
}
var desks = /^\/(?:fizzbuzz|procurement\/dossier|capacity\/forecast|healthz|readyz|cache\/status|operations\/|audit\/)/;
if (config.mode === "browser") document.querySelectorAll("a[href]").forEach((link) => {
  const url = new URL(link.href);
  const base = new URL(scope).pathname.replace(/\/$/, "");
  const path = url.pathname.slice(base.length) + url.search;
  if (url.origin !== location.origin || !desks.test(path)) return;
  link.href = new URL(`response/?path=${encodeURIComponent(path)}`, scope).href;
});

// web/validation.ts
try {
  const report = await fetch(new URL("validation/report.json", scope)).then((r) => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  });
  document.querySelector("#release-report").textContent = JSON.stringify(report, null, 2);
  document.querySelector("#report-status").textContent = "Release record loaded.";
} catch (error) {
  document.querySelector("#report-status").textContent = `Release record unavailable: ${error}`;
}
var button = document.querySelector("#rehearse");
if (config.mode === "server") {
  button.disabled = true;
  document.querySelector("#verdict").textContent = "Local rehearsals are available in the browser deployment. This deployment uses the Java server.";
}
button.onclick = async () => {
  if (button.getAttribute("aria-disabled") === "true") return;
  button.setAttribute("aria-disabled", "true");
  const id = crypto.randomUUID();
  let client;
  const verdict = document.querySelector("#verdict");
  verdict.textContent = "Comparing the local Java runtime against bundled JVM fixtures\u2026";
  try {
    client = new BrowserRuntimeClient({ ...config, mode: "browser" }, id);
    const fixtures = await fetch(new URL("validation/fixtures.json", scope)).then((r) => {
      if (!r.ok) throw new Error("JVM fixtures have not been generated for this release");
      return r.json();
    });
    let passed = 0;
    for (const expected of fixtures) {
      const response = await client.request(expected.path);
      if (response.status !== expected.status || await response.text() !== expected.body) throw new Error(`Disagreement at ${expected.path}`);
      passed++;
    }
    verdict.textContent = `${passed} bundled JVM fixtures matched. This is a local browser rehearsal, not a new JVM or CI run.`;
    document.querySelector("#rehearsal-output").hidden = false;
    document.querySelector("#rehearsal-output").textContent = await (await client.request("/audit/evidence")).text();
  } catch (error) {
    verdict.textContent = String(error);
  } finally {
    client?.close();
    indexedDB.deleteDatabase(`slopbuzz:${scope}:rehearsal:${id}`);
    button.removeAttribute("aria-disabled");
  }
};
