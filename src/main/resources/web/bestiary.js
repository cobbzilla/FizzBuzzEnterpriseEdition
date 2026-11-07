// Generated from web/*.ts by scripts/build.ts. Do not edit.

// web/runtime-protocol.ts
var runtimeProtocol = 1;
function isTransientOperation(path, method = "GET") {
  return method === "GET" && ["/premises/rehearsal", "/companions/catalog", "/companions/strategies", "/companions/window", "/operations/runtime", "/fizzbuzz/window", "/fizzbuzz/window/explained", "/capacity/forecast/extended", "/procurement/dossier", "/onboarding/rehearsal", "/precedent/rehearsal"].includes(path.split("?")[0]);
}

// web/release-assets.ts
var scope = new URL("../", import.meta.url).href;
var releaseFile = (path) => new URL(
  (typeof RELEASE_ASSET_DIRECTORY === "string" ? RELEASE_ASSET_DIRECTORY : "") + path,
  scope
);

// web/runtime.ts
var configurationKey = /* @__PURE__ */ Symbol.for("slopbuzz:runtime-configuration:v1");
var configurationURL = releaseFile("runtime-config.json").href;
var configurations = globalThis;
if (configurations[configurationKey] && configurations[configurationKey].url !== configurationURL) throw Error("A different release configuration already owns this page.");
configurations[configurationKey] ||= { url: configurationURL, load: fetch(configurationURL, { cache: "no-cache" }).then((r) => {
  if (!r.ok) throw Error("Deployment configuration is unavailable");
  return r.json();
}) };
var config = await configurations[configurationKey].load;
var BrowserRuntimeClient = class _BrowserRuntimeClient {
  constructor(configuration = config, isolated, transient = false) {
    this.configuration = configuration;
    if (!navigator.locks || !globalThis.crypto?.subtle) throw new Error("This browser requires a secure context, Web Locks, IndexedDB and Web Crypto.");
    this.channel = new BroadcastChannel(`slopbuzz:${scope}${isolated ? `:rehearsal:${isolated}` : ""}`);
    this.channel.onmessage = (event) => this.pending.get(event.data.id)?.(event.data);
    this.worker = new Worker(new URL(`${configuration.assets}runtime-worker.js`, scope));
    this.worker.postMessage({ config: configuration, scope, isolated, transient });
    addEventListener("pagehide", this.onHide, { once: true });
  }
  configuration;
  channel;
  worker;
  pending = /* @__PURE__ */ new Map();
  compatibleOwners = /* @__PURE__ */ new Map();
  transientClient;
  narrativeCapabilities = /* @__PURE__ */ new Map();
  closed = false;
  onHide = () => this.close();
  close() {
    if (this.closed) return;
    this.closed = true;
    removeEventListener("pagehide", this.onHide);
    this.transientClient?.close();
    this.worker.terminate();
    this.channel.close();
  }
  async owner() {
    if (this.closed) throw Error("This runtime client has been closed.");
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
    if (owner.revision !== this.configuration.revision) {
      if (!this.compatibleOwners.has(owner.leader)) {
        this.compatibleOwners.set(owner.leader, this.verifyCompatibility(owner));
      }
      await this.compatibleOwners.get(owner.leader);
      if (isTransientOperation(path, options.method)) {
        this.transientClient ||= new _BrowserRuntimeClient(this.configuration, crypto.randomUUID(), true);
        return this.transientClient.request(path, options);
      }
    }
    return this.dispatch(owner, path, options);
  }
  async proclamation(path) {
    const owner = await this.owner();
    if (owner.error) throw new Error(owner.error);
    if (owner.revision !== this.configuration.revision) {
      if (!this.compatibleOwners.has(owner.leader)) this.compatibleOwners.set(owner.leader, this.verifyCompatibility(owner));
      await this.compatibleOwners.get(owner.leader);
      if (isTransientOperation(path)) {
        this.transientClient ||= new _BrowserRuntimeClient(this.configuration, crypto.randomUUID(), true);
        return this.transientClient.proclamation(path);
      }
    }
    if (!this.narrativeCapabilities.has(owner.leader)) this.narrativeCapabilities.set(owner.leader, this.dispatch(owner, "/operations/runtime").then(async (response) => response.ok ? response.json() : {}));
    const info = await this.narrativeCapabilities.get(owner.leader);
    return annotate(await this.dispatch(owner, info.narrative === 1 ? explainedPath(path) : path), info);
  }
  async verifyCompatibility(owner) {
    const response = await this.dispatch(owner, "/operations/runtime");
    const runtime2 = response.ok ? await response.json() : {};
    if (runtime2.protocol !== runtimeProtocol || runtime2.mode !== "browser" || runtime2.revision !== owner.revision || runtime2.storage !== "IndexedDB") {
      throw new Error("The open audit runtime uses an unsupported protocol. Close other site tabs, then reload. No mandate was submitted.");
    }
  }
  dispatch(owner, path, options = {}) {
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
      this.channel.postMessage({ kind: "request", id, leader: owner.leader, revision: owner.revision, path, method: options.method || "GET", traceparent: new Headers(options.headers).get("traceparent") || "" });
    });
  }
};
var ServerRuntimeClient = class {
  capabilities;
  request(path, options = {}) {
    return fetch(`${(config.apiBaseUrl || "").replace(/\/$/, "")}${path}`, { ...options, cache: "no-store" });
  }
  async proclamation(path) {
    this.capabilities ||= this.request("/operations/runtime").then(async (response) => response.ok ? response.json() : {});
    const info = await this.capabilities;
    return annotate(await this.request(info.narrative === 1 ? explainedPath(path) : path), info);
  }
};
function explainedPath(path) {
  const split = path.indexOf("?");
  return (split < 0 ? path : path.slice(0, split)) + "/explained" + (split < 0 ? "" : path.slice(split));
}
function annotate(response, info) {
  const headers = new Headers(response.headers);
  const safe = Object.fromEntries(["mode", "engine", "storage", "cache", "revision", "protocol", "narrative"].filter((key) => info[key] !== void 0).map((key) => [key, info[key]]));
  headers.set("X-SlopBuzz-Execution-Runtime", JSON.stringify(safe).replace(/[^\x20-\x7e]/g, (char) => "\\u" + char.charCodeAt(0).toString(16).padStart(4, "0")));
  return new Response(response.body, { status: response.status, headers });
}
if (!["browser", "server"].includes(config.mode)) throw new Error("Unrecognized runtime mode");
var ownerKey = /* @__PURE__ */ Symbol.for("slopbuzz:runtime-owner:v1");
var owners = globalThis;
var edition = [scope, config.mode, config.revision, config.engine].join("|");
if (owners[ownerKey] && owners[ownerKey].edition !== edition) throw Error("A different release already owns this page. Finish the current mandate before refreshing.");
owners[ownerKey] ||= { edition, client: config.mode === "server" ? new ServerRuntimeClient() : new BrowserRuntimeClient() };
var runtime = owners[ownerKey].client;
var request = (path, options) => path === "/openapi.json" && (!options?.method || options.method === "GET") ? fetch(releaseFile("openapi.json")) : runtime.request(path, options);
if ("serviceWorker" in navigator && config.mode === "browser") {
  void navigator.serviceWorker.register(new URL("sw.js", scope), { scope: new URL(scope).pathname }).catch((error) => console.warn("Offline installation unavailable", error));
}
var desks = /^\/(?:companions\/|fizzbuzz|onboarding\/rehearsal|precedent\/rehearsal|procurement\/dossier|capacity\/forecast|healthz|readyz|cache\/status|operations\/|audit\/)/;
function mapOperationalLinks() {
  if (config.mode === "browser") document.querySelectorAll("a[href]").forEach((link) => {
    const url = new URL(link.href);
    const base = new URL(scope).pathname.replace(/\/$/, "");
    const path = url.pathname.slice(base.length) + url.search;
    if (url.origin !== location.origin || !desks.test(path)) return;
    link.href = new URL(`response/?path=${encodeURIComponent(path)}`, scope).href;
  });
}
if (!owners[ownerKey].linksBound) {
  owners[ownerKey].linksBound = true;
  document.addEventListener("site-page-change", mapOperationalLinks);
}
mapOperationalLinks();

// web/companion-story.ts
function node(tag, text) {
  const n = document.createElement(tag);
  if (text) n.textContent = text;
  return n;
}
function characterStory(c) {
  const fragment = document.createDocumentFragment();
  const glyph = node("span", c.emoji);
  glyph.className = "companion-glyph";
  glyph.setAttribute("aria-hidden", "true");
  fragment.append(glyph, node("p", (c.kind === "pair" ? "Themed emoji pair" : "Single emoji") + " \xB7 " + c.category + " \xB7 " + c.rarity + " \xB7 target frequency: " + c.weight.toLocaleString() + " of 1,000,000,000 tickets."));
  const dl = node("dl");
  for (const [label, value] of [["Personality", c.personality], ["Previously in this extraordinary career", c.backstory], ["Motivating energy", c.energy], ["Ultimate goal", c.goal]]) dl.append(node("dt", label), node("dd", value));
  fragment.append(dl);
  return fragment;
}

// web/companions.ts
var catalogPromise;
async function companionCatalog() {
  if (!catalogPromise) catalogPromise = (async () => {
    const r = await request("/companions/catalog");
    if (!r.ok) throw new Error("The bestiary returned " + r.status + ".");
    const data = await r.json();
    if (data.schema !== "slopbuzz-companions/v1" || data.tickets !== 1e9 || !Array.isArray(data.entries) || data.entries.length < 200) throw new Error("The bestiary supplied an unfamiliar charter.");
    return data;
  })().catch((error) => {
    catalogPromise = void 0;
    throw error;
  });
  return catalogPromise;
}

// web/bestiary.ts
var search = document.querySelector("#bestiary-search");
var category = document.querySelector("#bestiary-category");
var rarity = document.querySelector("#bestiary-rarity");
var kind = document.querySelector("#bestiary-kind");
var list = document.querySelector("#bestiary-results");
var status = document.querySelector("#bestiary-status");
var previous = document.querySelector("#bestiary-previous");
var next = document.querySelector("#bestiary-next");
search.closest("form").addEventListener("submit", (event) => event.preventDefault());
var entries = [];
var page = 0;
var pageSize = 24;
function render() {
  const term = search.value.toLocaleLowerCase().trim();
  const matches = entries.filter((c) => (!kind.value || c.kind === kind.value) && (!category.value || c.category === category.value) && (!rarity.value || c.rarity === rarity.value) && [c.name, c.emoji, c.personality, c.backstory, c.energy, c.goal].join(" ").toLocaleLowerCase().includes(term));
  const pages = Math.max(1, Math.ceil(matches.length / pageSize));
  page = Math.min(page, pages - 1);
  list.replaceChildren();
  for (const c of matches.slice(page * pageSize, (page + 1) * pageSize)) {
    const article = node("article");
    article.className = "panel bestiary-card";
    article.append(node("h2", c.name), characterStory(c));
    list.append(article);
  }
  status.textContent = matches.length + " companions found. Page " + (page + 1) + " of " + pages + ".";
  previous.disabled = false;
  next.disabled = false;
  previous.setAttribute("aria-disabled", String(page === 0));
  next.setAttribute("aria-disabled", String(page + 1 === pages));
}
for (const control of [search, category, rarity, kind]) control.addEventListener(control === search ? "input" : "change", () => {
  page = 0;
  render();
});
previous.addEventListener("click", () => {
  if (previous.getAttribute("aria-disabled") === "true") return;
  page--;
  render();
});
next.addEventListener("click", () => {
  if (next.getAttribute("aria-disabled") === "true") return;
  page++;
  render();
});
async function load() {
  try {
    status.textContent = "Opening the nonhuman personnel archive\u2026";
    entries = (await companionCatalog()).entries;
    for (const c of [...new Set(entries.map((c2) => c2.category))]) {
      const option = node("option", c);
      option.value = c;
      category.append(option);
    }
    render();
  } catch (error) {
    status.textContent = "The bestiary could not be opened: " + error.message;
    document.querySelector("#bestiary-retry").hidden = false;
  }
}
document.querySelector("#bestiary-retry").addEventListener("click", () => void load());
void load();
