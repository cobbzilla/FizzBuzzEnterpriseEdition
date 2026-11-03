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
  narrativeCapabilities = /* @__PURE__ */ new Map();
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
var runtime = config.mode === "server" ? new ServerRuntimeClient() : new BrowserRuntimeClient();
var proclamation = (path) => runtime.proclamation(path);
var request = (path, options) => path === "/openapi.json" && (!options?.method || options.method === "GET") ? fetch(releaseFile("openapi.json")) : runtime.request(path, options);
if ("serviceWorker" in navigator && config.mode === "browser") {
  void navigator.serviceWorker.register(new URL("sw.js", scope), { scope: new URL(scope).pathname }).catch((error) => console.warn("Offline installation unavailable", error));
}
var desks = /^\/(?:companions\/|fizzbuzz|onboarding\/rehearsal|precedent\/rehearsal|procurement\/dossier|capacity\/forecast|healthz|readyz|cache\/status|operations\/|audit\/)/;
if (config.mode === "browser") document.querySelectorAll("a[href]").forEach((link) => {
  const url = new URL(link.href);
  const base = new URL(scope).pathname.replace(/\/$/, "");
  const path = url.pathname.slice(base.length) + url.search;
  if (url.origin !== location.origin || !desks.test(path)) return;
  link.href = new URL(`response/?path=${encodeURIComponent(path)}`, scope).href;
});

// web/companion-story.ts
function node(tag, text2) {
  const n = document.createElement(tag);
  if (text2) n.textContent = text2;
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

// web/discovery-model.ts
var seedPolicy = "mandate-v1";
var discoveryStorageKey = "slopbuzz:extraordinary-appointments:v1";
var decimal = (x) => typeof x === "string" && /^(0|[1-9][0-9]*)$/.test(x);
var text = (x) => typeof x === "string" && x.length > 0;
function validDiscovery(x) {
  if (!x || !decimal(x.mandate) || !text(x.strategy) || !text(x.catalogVersion) || x.seedPolicy !== seedPolicy || typeof x.discoveredAt !== "string" || !Number.isFinite(Date.parse(x.discoveredAt))) return false;
  const c = x.companion, a = x.assignment, f = a?.factors;
  if (!c || !["single", "pair"].includes(c.kind) || !Array.isArray(c.components) || !c.components.every(text) || !["Common", "Uncommon", "Rare", "Legendary", "Mythic"].includes(c.rarity) || !Number.isSafeInteger(c.weight) || c.weight < 1 || c.weight > 1e9) return false;
  if (!["id", "emoji", "name", "category", "personality", "backstory", "energy", "goal"].every((key) => text(c[key]))) return false;
  if (!a || !decimal(a.ordinal) || a.ordinal === "0" || BigInt(a.ordinal) > BigInt(x.mandate) || !["Fizz", "Buzz", "FizzBuzz"].includes(a.flavor) || a.companionId !== c.id || !Number.isSafeInteger(a.ticket) || a.ticket < 0 || a.ticket >= 1e9) return false;
  const n = BigInt(a.ordinal), flavor = n % 15n === 0n ? "FizzBuzz" : n % 3n === 0n ? "Fizz" : n % 5n === 0n ? "Buzz" : "";
  return flavor === a.flavor && !!f && text(f.factors) && decimal(f.cofactor) && typeof f.complete === "boolean" && Number.isInteger(f.divisions) && f.divisions >= 0 && Number.isInteger(f.divisionBudget) && f.divisionBudget >= f.divisions && Number.isInteger(f.trialPrimeCeiling);
}
function discoveryIdentity(d) {
  return d.catalogVersion + "|" + d.companion.id;
}
var provenance = (d) => JSON.stringify([d.discoveredAt, d.mandate, d.assignment.ordinal, d.strategy, d.assignment.ticket]);
function rarestDiscoveries(...collections) {
  const distinct = /* @__PURE__ */ new Map();
  for (const collection of collections) for (const d of collection) {
    if (!validDiscovery(d)) continue;
    const id = discoveryIdentity(d), previous = distinct.get(id);
    if (!previous || provenance(d) < provenance(previous)) distinct.set(id, d);
  }
  return [...distinct.values()].sort((a, b) => a.companion.weight - b.companion.weight || discoveryIdentity(a).localeCompare(discoveryIdentity(b), "en")).slice(0, 5);
}
function decodeDiscoveries(value) {
  try {
    const x = JSON.parse(value || "null");
    return x?.schema === "slopbuzz-discoveries/v1" && Array.isArray(x.finds) ? rarestDiscoveries(x.finds) : [];
  } catch {
    return [];
  }
}
var encodeDiscoveries = (finds) => JSON.stringify({ schema: "slopbuzz-discoveries/v1", finds });
function discoveryLink(d, scope2) {
  const url = new URL("demo/", scope2);
  url.search = new URLSearchParams({ limit: d.mandate, authority: d.strategy, catalog: d.catalogVersion, seedPolicy: d.seedPolicy, ordinal: d.assignment.ordinal, companion: d.companion.id }).toString();
  return url.href;
}

// web/companion-dialog.ts
var controllerSymbol = /* @__PURE__ */ Symbol.for("slopbuzz.companion-dialog.v1");
function companionDialog() {
  const dialog = document.querySelector("#companion-dialog");
  if (dialog[controllerSymbol]) return dialog[controllerSymbol];
  let invoker, beganOnBackdrop = false;
  dialog.querySelector("[data-companion-close]").addEventListener("click", () => dialog.close());
  const outside = (e) => {
    const b = dialog.getBoundingClientRect();
    return e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom;
  };
  dialog.addEventListener("pointerdown", (e) => {
    beganOnBackdrop = e.target === dialog && outside(e);
  });
  dialog.addEventListener("pointercancel", () => {
    beganOnBackdrop = false;
  });
  dialog.addEventListener("click", (e) => {
    const dismiss = dialog.open && beganOnBackdrop && e.target === dialog && outside(e);
    beganOnBackdrop = false;
    if (dismiss) dialog.close();
  });
  dialog.addEventListener("close", () => {
    beganOnBackdrop = false;
    if (invoker?.isConnected) invoker.focus();
    dialog.dispatchEvent(new Event("companion-closed"));
  });
  const controller = { open(d, opener) {
    invoker = opener;
    const a = d.assignment, c = d.companion;
    dialog.querySelector("h2").textContent = c.name + " \xB7 " + a.ordinal + " " + a.flavor;
    const body = dialog.querySelector("[data-companion-story]");
    body.replaceChildren(characterStory(c));
    body.append(node("h3", "Allocation evidence"), node("p", "Mandate: " + d.mandate + ". Strategy: " + d.strategy + ". Seed policy: " + d.seedPolicy + ". Catalog: " + d.catalogVersion + ". Ticket: " + a.ticket + "."), node("p", "Extracted exact factors: " + a.factors.factors + ". " + (a.factors.complete ? "Complete factorization." : "Unresolved exact cofactor: " + a.factors.cofactor + ". This cofactor is not certified prime.") + " Division checks: " + a.factors.divisions + " of " + a.factors.divisionBudget + "."));
    const label = node("label", "Reproducible encounter link");
    label.htmlFor = "companion-share-link";
    const link = node("input");
    link.id = "companion-share-link";
    link.type = "url";
    link.readOnly = true;
    link.value = discoveryLink(d, scope);
    const copy = node("button", "Copy encounter link");
    copy.type = "button";
    const status = node("p");
    status.setAttribute("role", "status");
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(link.value);
        status.textContent = "Encounter link copied. The recipient can inspect this appointment without running the full mandate.";
      } catch {
        link.focus();
        link.select();
        status.textContent = "Copy the selected link using your browser\u2019s copy command.";
      }
    });
    body.append(label, link, copy, status);
    if (!dialog.open) dialog.showModal();
    dialog.querySelector(".companion-dialog-body").scrollTop = 0;
  } };
  dialog[controllerSymbol] = controller;
  return controller;
}

// web/discovery-store.ts
var storeSymbol = /* @__PURE__ */ Symbol.for("slopbuzz.discovery-store.v1");
function discoveryStore() {
  const host = window;
  if (host[storeSymbol]) return host[storeSymbol];
  let finds = [], persistent = true;
  const listeners = /* @__PURE__ */ new Set();
  const read = () => {
    try {
      return decodeDiscoveries(localStorage.getItem(discoveryStorageKey));
    } catch {
      persistent = false;
      return [];
    }
  };
  finds = read();
  const merge = (incoming) => {
    const before = encodeDiscoveries(finds), wasPersistent = persistent;
    finds = rarestDiscoveries(finds, incoming, read());
    const after = encodeDiscoveries(finds);
    try {
      if (localStorage.getItem(discoveryStorageKey) !== after) localStorage.setItem(discoveryStorageKey, after);
      persistent = true;
    } catch {
      persistent = false;
    }
    if (before !== after || wasPersistent !== persistent) listeners.forEach((fn) => fn());
  };
  const store = { snapshot: () => finds, persistent: () => persistent, remember: merge, subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  } };
  window.addEventListener("storage", (event) => {
    if (event.key === discoveryStorageKey) merge(decodeDiscoveries(event.newValue));
  });
  host[storeSymbol] = store;
  return store;
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
async function companionPolicies() {
  const r = await request("/companions/strategies");
  if (!r.ok) throw new Error("The strategy registry returned " + r.status + ".");
  const data = await r.json();
  if (!Array.isArray(data.strategies) || !data.strategies.length) throw new Error("No assignment strategy was supplied.");
  return data.strategies;
}
var CompanionDesk = class {
  enabled = document.querySelector("#emoji-companions");
  policy = document.querySelector("#companion-strategy");
  list = document.querySelector("#companion-list");
  scroller = document.querySelector("#companion-scroll");
  status = document.querySelector("#companion-status");
  dialog = document.querySelector("#companion-dialog");
  latest = document.querySelector("#companion-latest");
  visible = /* @__PURE__ */ new Map();
  batches = /* @__PURE__ */ new Map();
  assigned = /* @__PURE__ */ new Map();
  lastSignature = "";
  entries = /* @__PURE__ */ new Map();
  version = "";
  generation = 0;
  following = true;
  mandate = "15";
  constructor() {
    this.enabled.addEventListener("change", () => {
      this.generation++;
      this.following = true;
      this.list.replaceChildren();
      this.lastSignature = "";
      this.latest.hidden = true;
      if (this.enabled.checked) {
        this.status.textContent = "Opening companion appointments for disclosed output\u2026";
        void this.refresh();
      } else this.status.textContent = "Companion allocation suspended. Official numerical output remains available.";
    });
    this.policy.addEventListener("change", () => {
      this.generation++;
      this.batches.clear();
      this.assigned.clear();
      this.list.replaceChildren();
      this.lastSignature = "";
      this.following = true;
      this.status.textContent = "Consulting the selected allocation authority\u2026";
      void this.refresh();
    });
    this.scroller.addEventListener("scroll", () => {
      const atBottom = this.scroller.scrollHeight - this.scroller.clientHeight - this.scroller.scrollTop < 24;
      const resume = atBottom && !this.following;
      this.following = atBottom;
      if (resume) this.render();
    });
    this.latest.addEventListener("click", () => {
      this.following = true;
      this.render();
      this.scroller.scrollTop = this.scroller.scrollHeight;
    });
    void companionPolicies().then((policies) => {
      const selected = new URL(location.href).searchParams.get("authority") || this.policy.value;
      this.policy.replaceChildren(...policies.map((p) => {
        const option = node("option", p.name);
        option.value = p.id;
        return option;
      }));
      if (policies.some((p) => p.id === selected)) this.policy.value = selected;
      this.policy.disabled = false;
    }).catch((error) => {
      this.status.textContent = "Companion policy registry unavailable: " + error.message;
    });
  }
  reset(mandate) {
    this.mandate = mandate;
    this.generation++;
    this.visible.clear();
    this.assigned.clear();
    this.batches.clear();
    this.list.replaceChildren();
    this.lastSignature = "";
    this.following = true;
    this.latest.hidden = true;
    this.status.textContent = this.enabled.checked ? "Awaiting the first disclosed Fizz, Buzz or FizzBuzz." : "Companions are disabled.";
  }
  disclose(start, lines2) {
    for (let i = 0; i < lines2.length; i++) {
      this.visible.set((BigInt(start) + BigInt(i)).toString(), lines2[i]);
    }
    while (this.visible.size > 1e3) this.visible.delete(this.visible.keys().next().value);
    if (this.enabled.checked) void this.refresh();
  }
  async refresh() {
    const generation = this.generation;
    if (!this.enabled.checked) return;
    const policy = this.policy.value || "factor-resonance-v1", mandate = this.mandate;
    try {
      const catalog = await companionCatalog();
      if (generation !== this.generation) return;
      if (!this.entries.size) {
        this.entries = new Map(catalog.entries.map((c) => [c.id, c]));
        this.version = catalog.version;
      }
      const starts = /* @__PURE__ */ new Set();
      for (const [ordinal, text2] of this.visible) if (/^(Fizz|Buzz|FizzBuzz)$/.test(text2)) starts.add(((BigInt(ordinal) - 1n) / 100n * 100n + 1n).toString());
      for (const start of starts) {
        const key = mandate + "|" + policy + "|" + start;
        let batch = this.batches.get(key);
        if (!batch) {
          batch = (async () => {
            const reply = await request("/companions/window?start=" + start + "&count=100&strategy=" + policy + "&seed=" + mandate);
            if (!reply.ok) throw new Error("Assignment desk returned " + reply.status + ".");
            const data = await reply.json();
            if (data.schema !== "slopbuzz-companion-window/v2" || data.seedPolicy !== seedPolicy || data.mandateSeed !== mandate || data.catalogVersion !== this.version || data.strategy !== policy || data.start !== start || data.count !== 100 || !Array.isArray(data.assignments)) throw new Error("Assignment evidence belongs to a different charter.");
            return data.assignments;
          })();
          this.batches.set(key, batch);
          batch.catch(() => {
            if (this.batches.get(key) === batch) this.batches.delete(key);
          });
        }
        const assignments = await batch;
        if (generation !== this.generation || !this.enabled.checked) return;
        const finds = [];
        for (const a of assignments) if (this.visible.get(a.ordinal) === a.flavor && this.entries.has(a.companionId)) {
          this.assigned.set(a.ordinal, a);
          finds.push(this.discovery(a, this.entries.get(a.companionId), mandate, policy));
        }
        if (finds.length) discoveryStore().remember(finds);
      }
      for (const ordinal of this.assigned.keys()) if (!this.visible.has(ordinal)) this.assigned.delete(ordinal);
      while (this.batches.size > 12) this.batches.delete(this.batches.keys().next().value);
      if (generation === this.generation) this.render();
    } catch (error) {
      if (generation === this.generation) this.status.textContent = "Companion paperwork unavailable: " + error.message + " Numerical output is still valid. Toggle companions to retry.";
    }
  }
  render() {
    const rows = [...this.visible.keys()].map((key) => this.assigned.get(key)).filter((a) => !!a).slice(-100);
    const signature = rows.map((a) => a.ordinal + ":" + a.companionId).join("|");
    if (signature === this.lastSignature) return;
    if ((!this.following || this.list.contains(document.activeElement) || this.dialog.open) && this.list.childElementCount) {
      this.latest.hidden = false;
      return;
    }
    this.latest.hidden = true;
    const fragment = document.createDocumentFragment();
    for (const a of rows) {
      const c2 = this.entries.get(a.companionId);
      const li = node("li");
      const button = node("button");
      button.type = "button";
      button.setAttribute("aria-haspopup", "dialog");
      button.setAttribute("aria-controls", "companion-dialog");
      const glyph = node("span", c2.emoji);
      glyph.setAttribute("aria-hidden", "true");
      button.append(glyph, node("span", a.ordinal + " \xB7 " + a.flavor + " \xB7 " + c2.name + " \xB7 " + c2.rarity));
      button.addEventListener("click", () => this.inspect(a, c2, button));
      li.append(button);
      fragment.append(li);
    }
    this.list.replaceChildren(fragment);
    this.lastSignature = signature;
    this.scroller.scrollTop = this.scroller.scrollHeight;
    const last = rows.at(-1);
    const c = last ? this.entries.get(last.companionId) : void 0;
    this.status.textContent = c ? last.ordinal + " has welcomed " + c.name + ". " + c.rarity + " companion; latest " + rows.length + " encounters shown." : this.visible.size ? "No companion-bearing proclamation disclosed yet." : "Awaiting the first disclosed Fizz, Buzz or FizzBuzz.";
  }
  discovery(a, c, mandate = this.mandate, strategy = this.policy.value) {
    return { companion: c, assignment: a, mandate, strategy, catalogVersion: this.version, seedPolicy, discoveredAt: (/* @__PURE__ */ new Date()).toISOString() };
  }
  inspect(a, c, invoker) {
    this.following = false;
    companionDialog().open(this.discovery(a, c), invoker);
  }
};

// web/mandate-input.ts
function parseMandate(raw) {
  const text2 = raw.trim();
  if (!/^[0-9]+$/.test(text2)) return null;
  const ordinary = Number(text2);
  return Number.isSafeInteger(ordinary) ? ordinary : BigInt(text2);
}
var autocorrectMandate = (raw) => raw.replace(/[^0-9]/g, "");
var addOrdinals = (value, count) => typeof value === "bigint" ? value + BigInt(count) : value + count;
function windowCount(next, limit) {
  if (typeof next === "bigint" && typeof limit === "bigint") return Number(limit - next + 1n < 100n ? limit - next + 1n : 100n);
  return Math.min(100, Number(limit) - Number(next) + 1);
}
var magnitudeWarnings = Object.freeze([
  "PROVISIONAL INCIDENT: Your integer may possibly have exceeded its delegated magnitude authority.",
  "POLICY REVIEW PENDING: This request might have crossed an undocumented numerical border.",
  "PRELIMINARY ESCALATION: An oversized ordinal may have entered circulation without executive indemnity.",
  "POSSIBLE CONTROL BREACH: The requested magnitude appears larger than the committee\u2019s confidence.",
  "UNCONFIRMED NUMERICAL EMERGENCY: Your upper limit may require a larger filing cabinet.",
  "POTENTIAL JURISDICTIONAL EVENT: This integer might be operating beyond the ordinary-number charter.",
  "TENTATIVE COMPLIANCE ALERT: A digit may have arrived without its magnitude escort.",
  "CONDITIONAL SEVERITY ONE: Your request could conceivably exceed our ceremonial insurance allowance.",
  "SUSPECTED ORDINAL EXCESS: Management cannot presently exclude the possibility of too much number.",
  "PROVISIONAL GOVERNANCE FAILURE: This value may have outgrown its approved organizational chart.",
  "MAGNITUDE EXCEPTION SUSPECTED: The decimal expansion might require a second board of directors.",
  "POSSIBLE POLICY DEVIATION: An unauthorized quantity of integer may be present in this request.",
  "PRECAUTIONARY EXECUTIVE NOTICE: Your number could be larger than the policy author anticipated.",
  "UNVERIFIED BOUNDARY INCIDENT: The requested ordinal may have escaped the standard arithmetic enclosure.",
  "CONTINGENT DISCIPLINARY REVIEW: Someone might possibly need to explain all these digits.",
  "PRELIMINARY RISK FINDING: This upper limit may have exceeded the building\u2019s authorized numerical load.",
  "POTENTIAL CHARTER OVERRUN: The committee has not ruled out a surplus of mathematical ambition.",
  "PROVISIONAL EXCESS-MAGNITUDE NOTICE: This request may require an unusually solemn signature.",
  "SUSPECTED SCALE VIOLATION: Your integer might be too substantial for the current stationery.",
  "POSSIBLE ENTERPRISE INCIDENT: This value may have activated a policy nobody has finished writing."
]);
function chooseMagnitudeWarning(previous = -1, random = Math.random) {
  const width = previous >= 0 ? magnitudeWarnings.length - 1 : magnitudeWarnings.length;
  let index = Math.min(width - 1, Math.floor(random() * width));
  if (previous >= 0 && index >= previous) index++;
  return { index, text: magnitudeWarnings[index] };
}

// web/shared-encounter.ts
function prepareSharedEncounter(input) {
  const query = new URL(location.href).searchParams, limit = query.get("limit");
  if (limit === null) return;
  let mandate;
  try {
    mandate = String(parseMandate(limit));
  } catch {
    return;
  }
  input.value = mandate;
  input.dispatchEvent(new Event("input"));
  const ordinal = query.get("ordinal"), strategy = query.get("authority"), catalogVersion = query.get("catalog"), expected = query.get("companion");
  const panel = node("section");
  panel.className = "shared-encounter";
  panel.setAttribute("aria-labelledby", "shared-encounter-title");
  const title2 = node("h3", "Interdepartmental encounter referral");
  title2.id = "shared-encounter-title";
  const status = node("p", "The referred mandate is ready. Run it to reproduce the sequence. No numerical mandate has been submitted.");
  status.setAttribute("role", "status");
  panel.append(title2, status);
  document.querySelector("#companion-help").after(panel);
  if (!ordinal || !/^[1-9][0-9]*$/.test(ordinal) || BigInt(ordinal) > BigInt(mandate) || !strategy || !catalogVersion || !expected || query.get("seedPolicy") !== seedPolicy) {
    status.textContent = "The mandate was prefilled. This referral has incomplete or unsupported encounter evidence; select an authority and run to explore.";
    return;
  }
  const button = node("button", "Inspect shared appointment");
  button.type = "button";
  button.setAttribute("aria-haspopup", "dialog");
  button.setAttribute("aria-controls", "companion-dialog");
  panel.append(button);
  button.addEventListener("click", async () => {
    if (button.getAttribute("aria-disabled") === "true") return;
    button.setAttribute("aria-disabled", "true");
    status.textContent = "Verifying the referred appointment with the Java allocation authority\u2026";
    try {
      const catalog = await companionCatalog();
      if (catalog.version !== catalogVersion) throw new Error("This referral uses a different catalog version.");
      const response = await request("/companions/window?start=" + ordinal + "&count=1&strategy=" + encodeURIComponent(strategy) + "&seed=" + mandate);
      if (!response.ok) throw new Error("The referred authority could not approve this appointment.");
      const data = await response.json(), a = data.assignments?.[0], c = catalog.entries.find((c2) => c2.id === expected);
      if (data.schema !== "slopbuzz-companion-window/v2" || data.seedPolicy !== seedPolicy || data.mandateSeed !== mandate || data.catalogVersion !== catalogVersion || data.strategy !== strategy || data.start !== ordinal || data.count !== 1 || data.assignments?.length !== 1 || a?.ordinal !== ordinal || a.companionId !== expected || !c) throw new Error("This referral does not reproduce the claimed appointment.");
      const discovery = { companion: c, assignment: a, mandate, strategy, catalogVersion, seedPolicy, discoveredAt: (/* @__PURE__ */ new Date()).toISOString() };
      if (!validDiscovery(discovery)) throw new Error("The referral supplied invalid evidence.");
      status.textContent = "Appointment verified. This inspection did not print numbers or add a discovery to your register.";
      companionDialog().open(discovery, button);
    } catch (error) {
      status.textContent = "Referral could not be verified: " + error.message + " Run the mandate to explore current appointments.";
    } finally {
      button.setAttribute("aria-disabled", "false");
    }
  });
}

// web/telemetry.ts
function trackUsage(detail) {
  window.dispatchEvent(new CustomEvent("slopbuzz:usage", { detail }));
}

// web/dom.ts
var byId = (id) => {
  const node3 = document.getElementById(id);
  if (!node3) throw new Error(`Missing element ${id}`);
  return node3;
};
function setText(id, value) {
  byId(id).textContent = String(value);
}

// web/onboarding.ts
function parseDossier(value) {
  const data = value;
  if (!data || data.schema !== "slopbuzz-onboarding/v1" || typeof data.caseId !== "string" || !["MANDATE", "REHEARSAL"].includes(data.purpose) || !Number.isInteger(data.candidate) || !["APPROVED", "REJECTED"].includes(data.status) || !Array.isArray(data.steps) || data.steps.length !== 7 || data.steps.some((step) => !step || !["APPROVED", "REJECTED", "NOT_REACHED"].includes(step.state) || ["office", "rule", "received", "finding", "document"].some((key) => typeof step[key] !== "string"))) throw new Error("The personnel record has an unsupported format.");
  if (data.status === "APPROVED" && (data.candidate !== 1 || data.startingOrdinal !== 1 || data.steps.some((step) => step.state !== "APPROVED")) || data.status === "REJECTED" && (data.startingOrdinal !== null || !data.steps.some((step) => step.state === "REJECTED"))) throw new Error("The personnel verdict contradicts its recorded decisions.");
  return data;
}
var PersonnelProceedings = class {
  constructor(actions) {
    this.actions = actions;
    document.querySelectorAll("[data-personnel-scenario]").forEach((button) => button.addEventListener("click", () => {
      if (button.getAttribute("aria-disabled") !== "true") actions.rehearse(button.dataset.personnelScenario);
    }));
    byId("personnel-replay").addEventListener("click", () => {
      if ((this.dossier || this.playbackAvailable) && !this.busy) actions.replay();
    });
    byId("personnel-step").addEventListener("click", () => {
      if ((this.dossier || this.playbackAvailable) && !this.busy) actions.step();
    });
    byId("personnel-documents").addEventListener("click", () => {
      if (!this.dossier || this.busy) return;
      byId("personnel-documents").focus();
      byId("personnel-dialog").showModal();
    });
    byId("personnel-dialog-close").addEventListener("click", () => byId("personnel-dialog").close());
    byId("personnel-dialog").addEventListener("close", () => byId("personnel-documents").focus({ preventScroll: true }));
    byId("personnel-documents-toggle").addEventListener("click", () => {
      const open = byId("personnel-documents-toggle").getAttribute("aria-expanded") !== "true";
      this.rows.forEach((row) => row.details.open = open);
      this.synchronizeDisclosure();
    });
    this.updateControls();
  }
  actions;
  dossier;
  visible = 0;
  rows = [];
  source = "";
  busy = false;
  playbackAvailable = false;
  setPlaybackAvailable(available) {
    this.playbackAvailable = available;
    this.updateControls();
  }
  synchronizeDisclosure() {
    const open = this.rows.length > 0 && this.rows.every((row) => row.details.open);
    byId("personnel-documents-toggle").setAttribute("aria-expanded", String(open));
    setText("personnel-documents-toggle", open ? "Fold all documents" : "Expand all documents");
  }
  get record() {
    return this.dossier;
  }
  get progress() {
    return this.visible;
  }
  setBusy(busy) {
    this.busy = busy;
    this.updateControls();
  }
  updateControls() {
    for (const id of ["personnel-replay", "personnel-step"]) byId(id).setAttribute("aria-disabled", String(!this.dossier && !this.playbackAvailable || this.busy));
    byId("personnel-documents").setAttribute("aria-disabled", String(!this.dossier || this.busy));
    document.querySelectorAll("[data-personnel-scenario]").forEach((button) => button.setAttribute("aria-disabled", String(this.busy)));
  }
  loading() {
    this.clear("Obtaining the personnel file\u2026", "Awaiting response");
    this.setBusy(true);
  }
  clear(message, verdict = "No new proceedings") {
    this.dossier = void 0;
    this.rows = [];
    this.visible = 0;
    this.busy = false;
    byId("personnel-steps").replaceChildren();
    byId("personnel-steps").hidden = true;
    setText("personnel-origin", message);
    setText("personnel-verdict", verdict);
    setText("personnel-status", "No new personnel decisions are available to read.");
    byId("personnel-step").textContent = "Step through";
    this.synchronizeDisclosure();
    this.updateControls();
  }
  responseRecord(response) {
    const state = response.headers.get("X-SlopBuzz-Onboarding-State");
    if (state === "CACHE_REUSED" || response.headers.get("X-SlopBuzz-Cache") === "HIT") {
      this.clear("Institutional memory answered. No new HR proceedings.", "Cache answered");
      return;
    }
    const raw = response.headers.get("X-SlopBuzz-Onboarding-Trace");
    if (!raw) {
      this.clear("The output supplies the observed result. This administration did not forward individual personnel certificates; the chronicle explains the procedure.", "Earlier administration");
      return;
    }
    try {
      if (raw.length > 8192) throw new Error("Personnel record exceeds the response charter.");
      const data = parseDossier(JSON.parse(raw));
      if (data.purpose !== "MANDATE") throw new Error("A mandate needs its own recorded proceedings.");
      return data;
    } catch {
      this.clear("The accompanying personnel record could not be inspected. Numerical output remains independently available.", "Evidence unavailable");
    }
  }
  rehearsalRecord(value) {
    const data = parseDossier(value);
    if (data.purpose !== "REHEARSAL") throw new Error("The desk returned an unrecognized rehearsal record.");
    return data;
  }
  prepare(data, source) {
    this.dossier = data;
    this.visible = 0;
    this.source = source || (data.purpose === "REHEARSAL" ? "Read-only rehearsal" : "Mandate record");
    setText("personnel-origin", `${this.source} \xB7 Applicant ${data.candidate} \xB7 Position: Initial ordinal \xB7 Case ${data.caseId}`);
    setText("personnel-verdict", "Reading completed record");
    setText("personnel-status", "Reading completed proceedings \xB7 0 of 7 offices disclosed.");
    setText("personnel-step", "Step through");
    this.rows = data.steps.map((step, index) => {
      const item = document.createElement("li");
      item.dataset.read = "false";
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      details.addEventListener("toggle", () => this.synchronizeDisclosure());
      const number = document.createElement("span");
      number.className = "personnel-index";
      number.textContent = String(index + 1).padStart(2, "0");
      number.setAttribute("aria-hidden", "true");
      const office = document.createElement("span");
      office.className = "personnel-office";
      office.textContent = step.office;
      const badge = document.createElement("span");
      badge.className = "personnel-badge";
      badge.textContent = "Not yet read";
      summary.append(number, office, badge);
      details.append(summary);
      const facts = document.createElement("dl");
      for (const [label, text2] of [["Rule", step.rule], ["Received", step.received], ["Recorded decision", step.state === "APPROVED" ? "Approved" : step.state === "REJECTED" ? "Rejected" : "Not reached"], ["Finding", step.finding], ["Issued document", step.document]]) {
        const row = document.createElement("div"), term = document.createElement("dt"), value = document.createElement("dd");
        term.textContent = label;
        value.textContent = text2;
        row.append(term, value);
        facts.append(row);
      }
      const note = document.createElement("p");
      note.className = "personnel-record-note";
      note.textContent = "This is a completed Java decision record. Opening the document does not rerun the office.";
      details.append(facts, note);
      item.append(details);
      return { item, badge, details };
    });
    byId("personnel-steps").replaceChildren(...this.rows.map((row) => row.item));
    byId("personnel-steps").hidden = false;
    this.setBusy(false);
    this.synchronizeDisclosure();
  }
  disclose(count) {
    if (!this.dossier) return;
    this.visible = Math.max(0, Math.min(count, 7));
    this.rows.forEach((row, index) => {
      const read = index < this.visible;
      const state = this.dossier.steps[index].state;
      row.item.dataset.read = String(read);
      row.item.dataset.verdict = read ? state : "UNREAD";
      row.badge.textContent = read ? state === "APPROVED" ? "Approved" : state === "REJECTED" ? "Rejected" : "Not reached" : "Not yet read";
    });
    const last = this.dossier.steps[Math.max(0, this.visible - 1)];
    setText("personnel-status", this.visible === 7 ? this.dossier.status === "APPROVED" ? "All seven offices disclosed. Commencement authorized at 1." : `Personnel application rejected by ${this.dossier.steps.find((step) => step.state === "REJECTED").office}. Subsequent offices were not reached.` : `Reading completed proceedings \xB7 ${this.visible} of 7 offices disclosed${this.visible ? `. ${last.office}: ${last.state === "APPROVED" ? "approved" : last.state === "REJECTED" ? "rejected" : "not reached"}` : ""}.`);
    setText("personnel-verdict", this.visible === 7 ? this.dossier.status === "APPROVED" ? "Approved to start at 1" : "Application rejected" : "Reading completed record");
    setText("personnel-step", this.visible > 0 && this.visible < 7 ? "Next office" : "Step through");
    this.actions.disclosed?.(this.dossier, this.visible);
  }
  async read(data, clock, source) {
    this.prepare(data, source);
    for (let i = 0; i < data.steps.length; i++) {
      await clock.waitWhilePaused();
      if (!clock.current()) return;
      this.disclose(i + 1);
      if (i < data.steps.length - 1) await clock.delay();
    }
  }
  startStepThrough() {
    if (this.dossier) this.prepare(this.dossier, `Step-through inspection of ${this.dossier.purpose === "REHEARSAL" ? "rehearsal" : "mandate record"}`);
  }
  step() {
    this.disclose(this.visible + 1);
  }
  stopReading() {
    this.setBusy(false);
    if (this.dossier && this.visible < 7) setText("personnel-status", `Reading adjourned after ${this.visible} of 7 offices. Replay or inspect the completed record when ready.`);
    else if (!this.dossier) this.clear("Proceedings adjourned before a personnel file was disclosed.");
  }
};

// web/precedent.ts
function parsePrecedent(value) {
  const d = value;
  if (!d || d.schema !== "slopbuzz-precedent/v1" || !["MANDATE", "REHEARSAL"].includes(d.purpose) || typeof d.caseId !== "string" || !["APPROVED", "REJECTED"].includes(d.status) || !Number.isSafeInteger(d.limit) || d.limit < 0 || d.limit > 1e3 || !Number.isSafeInteger(d.repositoryLimit) || !Number.isSafeInteger(d.bodyCharacters) || d.bodyCharacters < 0 || !Array.isArray(d.steps) || d.steps.length !== 5 || d.steps.some((s) => !s || !["APPROVED", "REJECTED", "NOT_REACHED"].includes(s.state) || ["office", "rule", "received", "finding", "document"].some((k) => typeof s[k] !== "string"))) throw new Error("The court returned an unrecognized case file.");
  const rejected = d.steps.findIndex((s) => s.state === "REJECTED");
  if (d.status === "APPROVED" ? d.certifiedLines !== d.limit || d.steps.some((s) => s.state !== "APPROVED") : d.certifiedLines !== null || rejected < 0 || d.steps.some((s, i) => s.state !== (i < rejected ? "APPROVED" : i === rejected ? "REJECTED" : "NOT_REACHED"))) throw new Error("The court returned inconsistent decisions.");
  return d;
}
function element(tag, text2) {
  const n = document.createElement(tag);
  if (text2 !== void 0) n.textContent = text2;
  return n;
}
var PrecedentView = class {
  serial = 0;
  busy = false;
  latest;
  form = byId("precedent-form");
  button = byId("precedent-submit");
  list = byId("precedent-steps");
  expand = byId("precedent-expand");
  constructor() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!this.busy) void this.rehearse();
    });
    this.expand.addEventListener("click", () => {
      const details = [...this.list.querySelectorAll("details")];
      const open = details.some((d) => !d.open);
      details.forEach((d) => d.open = open);
      this.synchronize();
    });
    byId("precedent-latest").addEventListener("click", () => {
      if (this.latest) {
        ++this.serial;
        this.setBusy(false);
        this.show(this.latest);
      }
    });
  }
  setBusy(busy) {
    this.busy = busy;
    this.button.setAttribute("aria-disabled", String(busy));
    this.list.setAttribute("aria-busy", String(busy));
  }
  synchronize() {
    const details = [...this.list.querySelectorAll("details")], all = details.length > 0 && details.every((d) => d.open);
    this.expand.setAttribute("aria-expanded", String(all));
    this.expand.textContent = all ? "Collapse court documents" : "Expand court documents";
  }
  waiting(extended = false) {
    ++this.serial;
    this.latest = void 0;
    this.setBusy(false);
    this.clear(extended ? "Extended proceedings bypass retained institutional memory. No prior-work court is convened." : "Awaiting a repository result. The court convenes only if prior text is offered.");
  }
  mandate(data, cache) {
    ++this.serial;
    this.setBusy(false);
    this.latest = data;
    byId("precedent-latest").setAttribute("aria-disabled", String(!data));
    if (data) this.show(data);
    else this.clear(cache === "HIT" ? "An earlier administration reused institutional memory without forwarding current court papers. Historical approvals are not reconstructed." : cache === "MISS" ? "The repository offered no prior text. Fresh production proceeded without convening a reuse court." : "The repository was bypassed. No prior-work license was required.");
  }
  clear(message) {
    setText("precedent-source", message);
    setText("precedent-status", "No court case is open.");
    this.list.replaceChildren();
    this.expand.hidden = true;
    byId("precedent-latest").setAttribute("aria-disabled", String(!this.latest));
    this.synchronize();
  }
  show(d) {
    setText("precedent-source", `${d.purpose === "MANDATE" ? "Actual mandate reuse proceedings" : "Read-only specimen rehearsal"} \xB7 Case ${d.caseId} \xB7 Requested ${d.limit} lines \xB7 Repository key ${d.repositoryLimit}. These are current reuse decisions, not the original production history.${d.purpose === "MANDATE" && d.status === "REJECTED" ? " This cached candidate was refused before the ordinary fresh-production path was attempted. The numerical result is shown above." : ""}`);
    const objection = d.steps.find((s) => s.state === "REJECTED");
    setText("precedent-status", d.status === "APPROVED" ? `Reuse approved. Certificate of Authorized Non-Performance issued for ${d.certifiedLines} lines.` : `Reuse rejected by ${objection.office}. ${objection.finding}`);
    const rows = d.steps.map((step, index) => {
      const item = element("li");
      item.dataset.verdict = step.state;
      const details = element("details"), summary = element("summary");
      const order = element("span", String(index + 1).padStart(2, "0"));
      order.className = "personnel-index";
      order.setAttribute("aria-hidden", "true");
      const office = element("span", step.office);
      office.className = "personnel-office";
      const state = element("span", step.state === "APPROVED" ? "Approved" : step.state === "REJECTED" ? "Rejected" : "Not reached");
      state.className = "personnel-badge";
      summary.append(order, office, state);
      details.append(summary);
      const facts = element("dl");
      for (const [label, text2] of [["Published rule", step.rule], ["Received", step.received], ["Finding", step.finding], ["Issued document", step.document]]) {
        const row = element("div");
        row.append(element("dt", label), element("dd", text2));
        facts.append(row);
      }
      details.append(facts);
      details.addEventListener("toggle", () => this.synchronize());
      item.append(details);
      return item;
    });
    this.list.replaceChildren(...rows);
    this.expand.hidden = false;
    this.synchronize();
  }
  async rehearse() {
    const serial = ++this.serial, scenario = byId("precedent-scenario").value;
    this.setBusy(true);
    setText("precedent-status", "The court is examining a read-only specimen. Your numerical output and cache are retained.");
    try {
      const response = await request(`/precedent/rehearsal?scenario=${encodeURIComponent(scenario)}`);
      if (!response.ok) throw new Error(`Court desk returned ${response.status}.`);
      const data = parsePrecedent(await response.json());
      if (data.purpose !== "REHEARSAL") throw new Error("The specimen desk returned a different purpose.");
      if (serial === this.serial) this.show(data);
    } catch (error) {
      if (serial === this.serial) setText("precedent-status", `The court rehearsal could not be opened: ${error.message} No numerical mandate was submitted.`);
    } finally {
      if (serial === this.serial) this.setBusy(false);
    }
  }
};

// web/chronicle-language.ts
var lines = (source) => Object.freeze(source.trim().split("\n").map((line) => line.trim()));
var narrativeTemplates = {
  premises: lines(`
{facts} Facilities has proved that the empty room was empty, an achievement it intends to occupy prominently in its annual report.
The numerical tenant has completed its property formalities. {facts}
{facts} An absence of characters has been established through a sufficient presence of officials.
The company has obtained documentary title to the space between nothing and something. {facts}
{facts} The premises were inspected before anyone had the opportunity to write on them.
Our new address contains no addressable occupants yet. {facts}
{facts} Facilities has issued permission for the deliverable to have somewhere to be.
An empty buffer has secured the institutional recognition previously denied to empty buffers. {facts}
{facts} The vacancy certificate is a historical finding; the company expects its successful premises to become less vacant shortly.
The lease covers exactly the room the inspector visited, a detail Legal has underlined twice. {facts}
{facts} No character acquired tenancy through the mere availability of floor space.
The organization can now distinguish an empty string from an empty string without the appropriate documents. {facts}
`),
  premisesDiscovery: lines(`
{facts} The invisible tenant was visible to the department whose entire operating model requires finding one.
Facilities discovered that nothing was already being occupied. {facts}
{facts} The room contained an unauthorized absence with a Unicode identity.
An apparently vacant property has produced a surprisingly articulate eviction file. {facts}
{facts} The inspector declined to accept invisibility as evidence of non-residence.
The hidden occupant's code point has been entered into the minutes with unusual satisfaction. {facts}
{facts} A character had acquired premises without acquiring permission to be a character here.
The company has removed the squatter while retaining its forwarding designation. {facts}
{facts} The board appreciates an inspection capable of detecting the sort of tenant the board cannot see.
Vacancy has required corrective action, which Facilities regards as a particularly profitable form of emptiness. {facts}
{facts} The occupant left before numerical move-in; its documentary footprint remains considerable.
The property now qualifies as empty for reasons considerably longer than its former contents. {facts}
`),
  one: lines(`
{facts} The starting position has achieved the headcount traditionally associated with being first.
The numerical reception desk can finally point to an occupant. {facts}
{facts} Our opening deliverable has the modest dimensions of a single character and the bearing of a senior appointment.
The enterprise has reached its first visible staffing milestone. {facts}
{facts} A beginning has been located within the beginning and is now available for stakeholder inspection.
The first place is occupied with an exactness management finds reassuring. {facts}
{facts} Our numerical workforce is now large enough to begin its organizational chart.
The transcript has acquired its inaugural tenant. {facts}
{facts} The company recognizes the considerable strategic importance of arriving before two.
A solitary digit has entered public service. {facts}
{facts} The inaugural position is small, yet already sufficient to justify a heading.
We have obtained observable evidence that the sequence has begun. {facts}
`),
  cache: lines(`
{facts} Yesterday's answer has returned with the confidence of a consultant billing for institutional knowledge.
Institutional Memory has spared the production departments another performance. {facts}
{facts} The result enjoys a second public appearance without incurring a second numerical career.
The company has selected recollection as its delivery methodology. {facts}
{facts} Remembering the answer remains our most mature productivity initiative.
Prior work has secured another engagement. {facts}
{facts} The workforce may admire its earlier achievement from a respectful administrative distance.
The institutional drawer has supplied the deliverable. {facts}
{facts} This is the company's celebrated ability to answer the same question without developing new opinions.
An existing answer has been invited back onto the stage. {facts}
{facts} Numerical productivity is being achieved through the disciplined conservation of previous productivity.
The enterprise is benefiting from a result it already knows how to have. {facts}
`),
  cacheProvenance: lines(`
{facts} A fresh reading does not acquire a fresh past.
The clerk distinguishes this disclosure from the work that originally produced it. {facts}
{facts} Corporate memory is useful enough without a fictional autobiography.
The answer's current appearance and its historical manufacture occupy separate columns. {facts}
{facts} Repetition is permitted to improve visibility without pretending to improve chronology.
The provenance desk has declined to embellish the earlier shift. {facts}
{facts} An attractive new paragraph confers no authority to invent an old receipt.
We acknowledge the present disclosure and preserve the limits of the supplied history. {facts}
{facts} Institutional nostalgia is being kept within its evidentiary budget.
The transcript may repeat itself; the supporting history receives no imaginary additions. {facts}
{facts} Our commitment to storytelling remains subject to the existence of the story's documents.
The company is remembering a result rather than reenacting its original employment arrangements. {facts}
`),
  personnel: lines(`
{facts} A literal has acquired the sort of documentary support usually reserved for a disputed acquisition.
Personnel's contribution can now be inspected rather than inferred from the presence of a digit. {facts}
{facts} Recruitment has reached the exceptional stage at which its paperwork supports an actual beginning.
The case papers have entered the minutes with their own reasons intact. {facts}
{facts} The starting value is accompanied by a defensible explanation of why it was allowed to start.
The personnel record is available for a level of scrutiny normally disproportionate to one. {facts}
{facts} The company has made numerical commencement an intelligible employment matter.
The recorded personnel findings follow in their own institutional voices. {facts}
{facts} This is what a starting constant looks like after receiving adequate organizational attention.
The workforce evidence has arrived, including the reasons behind the decisions. {facts}
{facts} An appointment that once fit in a character now comes with a reading obligation.
The personnel department has supplied the papers on which this account actually relies. {facts}
`),
  legacy: lines(`
{facts} The earlier administration's filing limits are respected even when they inconvenience our literary ambitions.
The answer is visible; the scope of the accompanying record is stated here. {facts}
{facts} The clerk offers useful context without commissioning a fictional past.
An earlier administration has supplied a result with a more modest documentary entourage. {facts}
{facts} Corporate history receives an explanatory caption rather than a manufactured certificate.
The present narrator has reached the edge of the earlier paperwork. {facts}
{facts} We may explain the organization while declining to pretend we observed its every historical gesture.
The earlier response is being read within the limits of what it actually forwarded. {facts}
{facts} The company's enthusiasm for detail has encountered a legitimate archival boundary.
An older record can still support a useful account of the visible outcome. {facts}
{facts} The minutes distinguish evidence from the procedures a newer administration would explain.
The institutional archive is being treated as an archive, with all its inconvenient omissions. {facts}
`),
  procedure: lines(`
{facts} This is procedural context, supplied for comprehension rather than retrospective decoration.
The current operating model provides the following explanation. {facts}
{facts} These are the company's arrangements, described without impersonating an absent historical witness.
For orientation, the clerk consults the published procedure. {facts}
{facts} The explanatory diagram has been kept distinct from an actual attendance sheet.
The process can be understood even where individual earlier receipts were not supplied. {facts}
{facts} Corporate context is available without rewriting the date on anyone's paperwork.
The current procedure supplies a map of the offices involved. {facts}
{facts} A map remains useful while openly admitting that it is a map.
The following institutional context accompanies the recorded limits above. {facts}
{facts} The company has authorized explanation without granting it the powers of time travel.
The clerk describes the operating arrangements as procedure. {facts}
`),
  assembly: lines(`
{facts} The abstraction budget has been deployed before anyone is permitted to say anything brief.
The factories have supplied the organizational shape required for this ordinal. {facts}
{facts} Our approach to a small answer begins with a properly furnished collection of contexts.
The implementation has assembled the machinery through which this number will speak. {facts}
{facts} Each abstraction may now experience the dignity of having been necessary to the architecture.
The context assembly has entered the actual record. {facts}
{facts} A direct answer would have left several excellent interfaces with nothing to do.
The factories have established the appropriate distance between an integer and its printed form. {facts}
{facts} The company considers this a suitably substantial introduction to a short line of text.
The appointed contexts are ready for the recorded proceedings. {facts}
{facts} Numerical simplicity has received the infrastructure its simplicity so plainly demanded.
The enterprise has given this ordinal its required structural representation. {facts}
`),
  classification: lines(`
{facts} The number's enthusiasm has no standing beyond the permissions actually recorded.
Classification has entered its findings before the result takes public form. {facts}
{facts} The company's branding privileges remain conditional on arithmetic rather than seniority.
The ordinal has encountered the eligibility arrangements governing its public identity. {facts}
{facts} A positive attitude cannot confer divisibility.
The recorded classification determines which output departments may participate. {facts}
{facts} Our market positioning continues to depend on the number in front of us.
The identity question has received its formal numerical answer. {facts}
{facts} Every permitted contribution must live within the arithmetic franchise.
The recorded permissions are available for inspection. {facts}
{facts} The company can now distinguish a qualified brand contribution from an ambitious suggestion.
The classification findings supply the actual basis for what follows. {facts}
`),
  procurement: lines(`
{facts} Matching characters do not create a transferable entitlement to one another's paperwork.
Procurement has translated a small word into separately accountable commercial obligations. {facts}
{facts} The repeated letters retain individual dignity and individual receiving evidence.
The word's material supply chain is present in the record. {facts}
{facts} Economies of scale do not excuse borrowing a neighboring character's acceptance papers.
The character positions have received the procurement attention their apparent simplicity invited. {facts}
{facts} A word may be short while its bill of materials remains professionally ambitious.
The approved glyphs have passed through their recorded commercial arrangements. {facts}
{facts} The company is finally able to discuss spelling in the language of accountable acquisition.
The receiving evidence accounts for the letters used here. {facts}
{facts} Repetition within a word offers no exemption from position-specific responsibility.
The procurement record explains how these characters reached this proclamation. {facts}
`),
  numeral: lines(`
{facts} The enterprise has protected the digit from the reputational exposure of a direct answer.
The number has acquired the representation in which the public will encounter it. {facts}
{facts} A familiar-looking numeral may still represent a commendable quantity of mediation.
The recorded conversion has made the ordinal suitable for textual office life. {facts}
{facts} Our representation policy gives an ordinary number ample opportunity to become an organizational concern.
The numeral's preparation appears in the actual proceedings. {facts}
{facts} The company respects the difference between having a number and being prepared to print it.
The conversion desk has supplied the recorded textual representation. {facts}
{facts} Apparent obviousness is no reason to waive an appropriate layer of indirection.
The ordinal has reached its public spelling through the documented conversion. {facts}
{facts} A plain numeral can now enjoy the support of a less plain implementation.
The record explains the representation through which this number is disclosed. {facts}
`),
  transaction: lines(`
{facts} Even an invisible line ending deserves to know who is responsible for it.
The output has entered its recorded staging arrangements. {facts}
{facts} Corporate completeness is being assembled from separately accountable pieces.
The transaction desk is keeping the proclamation's components within their actual custody. {facts}
{facts} The company prefers its fragments to acquire a collective identity before meeting the public.
The recorded staging facts explain how the line was prepared. {facts}
{facts} A character's willingness to appear does not itself constitute publication authority.
The proclamation's pieces have received their documented treatment. {facts}
{facts} The numerical answer is being handled with the procedural gravity of a much larger deliverable.
The output chamber has supplied the following custody facts. {facts}
{facts} Line assembly is an occasion on which our appetite for completeness is unusually well placed.
The transaction record accounts for the components of this proclamation. {facts}
`),
  notary: lines(`
{facts} The notarial role gives correctness an opportunity to survive the enthusiasm that produced it.
The independent lexical check has entered the record. {facts}
{facts} Our confidence is strengthened by asking a separate authority to distrust it appropriately.
The proclamation's exact wording has received its recorded notarial examination. {facts}
{facts} A convincing-looking answer must still endure the inconvenient question of whether it is right.
The notary's finding supplies the actual lexical evidence here. {facts}
{facts} The company has found a useful application for disciplined suspicion.
The independent check concerns the complete proclamation rather than the ambition of its authors. {facts}
{facts} Correctness remains a condition of publication even at our impressive level of ceremony.
The recorded notarial finding is available alongside the other department papers. {facts}
{facts} A short line has received the benefit of a second, independently skeptical look.
The lexical inspection has supplied the evidence attributed to it. {facts}
`),
  publication: lines(`
{facts} The answer has reached the public-facing part of its administrative career.
The publication desk's actual action is entered here. {facts}
{facts} A brief proclamation has emerged from an organization with no corresponding ambition toward brevity.
The record identifies the point at which the text left its preparation arrangements. {facts}
{facts} The company can now point to a deliverable in addition to a description of its controls.
The publication facts explain this line's public appearance. {facts}
{facts} Stakeholders receive the answer with the dignity due to a completed little sentence.
The output's recorded release is available for scrutiny. {facts}
{facts} Our public-facing achievement remains compact enough to fit beside its own heading.
The proceedings have reached the recorded publication action. {facts}
{facts} A visible answer is an encouraging development in any organization devoted to explaining itself.
The line's appearance follows the publication facts recorded here. {facts}
`),
  audit: lines(`
{facts} The numerical past has acquired another piece of evidence on which future doubt may exercise itself.
The audit record supplies its actual addition to institutional memory. {facts}
{facts} The company is giving this small event a properly accountable relationship with its predecessors.
The journal's recorded action belongs in the minutes. {facts}
{facts} An answer may be fleeting; its numerical record has a more serious attitude toward continuity.
The ledger has supplied the following facts about this proclamation. {facts}
{facts} Our historical confidence now has a concrete entry to refer to.
The audit evidence describes the action actually taken by the journal. {facts}
{facts} The company has made remembering this line a distinct professional responsibility.
The recorded journal action gives this proclamation its place in the retained history. {facts}
{facts} Numerical accountability is being maintained one inconveniently inspectable event at a time.
The audit department's observed contribution is reported here. {facts}
`),
  queued: lines(`
{facts} Placement in a mailbox does not confer the life experience of having been delivered.
The message-custody record states what has actually happened. {facts}
{facts} The company distinguishes a place in the queue from a receipt at the destination.
The queue's recorded action is available without an embellished delivery claim. {facts}
{facts} A message may have administrative standing while still having somewhere to go.
The numerical minutes have encountered the recorded messaging arrangements. {facts}
{facts} Our enthusiasm for distribution remains subject to the evidence of actual receipt.
The mailbox's contribution is recorded in its proper scope. {facts}
{facts} The company is keeping dispatch vocabulary within the limits of the supplied facts.
The messaging record explains this event's actual custody position. {facts}
{facts} In a serious organization, a queue is entitled to remain a queue until something more has happened.
The observed message handling appears here with its original finding intact. {facts}
`),
  commit: lines(`
{facts} The transaction's resolution has acquired the permanence actually stated by the record.
The commitment facts are entered without enlarging their scope. {facts}
{facts} The company appreciates a decision that can say precisely what it has committed to.
The recorded transaction resolution follows. {facts}
{facts} A small deliverable has reached a consequential point in its paperwork.
The transaction desk's actual commitment is recorded here. {facts}
{facts} Our ability to conclude a transaction remains an achievement worthy of its own paragraph.
The proceedings identify the transaction outcome through the supplied finding. {facts}
{facts} Administrative certainty is most useful when attached to a specific completed action.
The transaction's recorded conclusion is available to the reader. {facts}
{facts} The company has reached the part of the ceremony where this particular obligation can be settled.
The actual commitment finding belongs to this proclamation. {facts}
`),
  cleanup: lines(`
{facts} Even the machinery supporting a short answer deserves an orderly end to its immediate assignment.
The cleanup finding records the transaction desk's actual housekeeping. {facts}
{facts} The company considers leaving appropriate room for subsequent work a defensible operating habit.
The transaction's recorded cleanup appears here. {facts}
{facts} Administrative residue is being accounted for within the scope stated by the finding.
The desk has supplied its actual closing housekeeping record. {facts}
{facts} Our commitment to procedure includes knowing when this particular procedure has finished using its workspace.
The cleanup evidence is retained in the proceedings. {facts}
{facts} A completed line should not require its successors to inherit avoidable transaction clutter.
The recorded housekeeping belongs to this output's supporting machinery. {facts}
{facts} The company is prepared to take even the tidying up of indirection seriously.
The transaction desk's cleanup action has entered the minutes. {facts}
`),
  succession: lines(`
{facts} The next integer's ambitions remain subject to the advancement actually authorized.
The succession record supplies the basis for moving beyond this ordinal. {facts}
{facts} The company has given counting onward the documentary support usually associated with promotion.
The ordinal transition appears with its actual authorization intact. {facts}
{facts} Being next is an administrative position with an arithmetic qualification.
The advancement evidence explains the transition permitted here. {facts}
{facts} Our numerical career ladder continues to favor precisely the appropriate amount of progress.
The successor's recorded authority has entered the minutes. {facts}
{facts} Corporate ambition has been reconciled with the specific advancement in the finding.
The proceedings account for the next ordinal through their actual succession evidence. {facts}
{facts} A sequence can grow responsibly while remaining exceptionally tiresome to explain.
The recorded transition supplies this number's contribution to onward institutional movement. {facts}
`),
  extendedNotary: lines(`
{facts} This transient window receives lexical scrutiny without acquiring a fictional retained audit history.
The extended path's independent wording check is recorded in its proper scope. {facts}
{facts} An enormous ordinal can be inspected without pretending it passed through the retained transaction desk.
The finite window's lexical witness supplies the following finding. {facts}
{facts} The company's enthusiasm for magnitude has not eliminated its obligation to check the text.
The independent extended-path inspection appears here. {facts}
{facts} This is exact textual scrutiny within a transient response, with no invented database ceremony.
The extended proclamation's observed lexical evidence is available. {facts}
{facts} A large number receives a finite, honestly described inspection.
The window's actual independent finding accompanies its visible text. {facts}
{facts} Corporate scale may be vast while the scope of this particular receipt remains precise.
The extended lexical record states what was actually inspected. {facts}
`),
  extendedSuccession: lines(`
{facts} The exact advancement belongs to this transient path, without borrowed bounded-integer certificates.
The extended window records its own numerical movement. {facts}
{facts} Magnitude does not justify an approximate relationship with the next ordinal.
The BigInteger path's actual advancement appears here. {facts}
{facts} The company can proceed beyond ordinary magnitude without rounding its career ladder.
The transient succession finding describes the exact movement observed. {facts}
{facts} This transition is reported under its own implementation's arrangements.
The window's advancement record supplies the actual next-step facts. {facts}
{facts} Large-scale ambition is being expressed through a precisely described small advancement.
The extended path has furnished its own movement evidence. {facts}
{facts} The narrator has declined to dress an exact BigInteger step in a bounded office's borrowed uniform.
The transient ordinal transition is recorded as it actually occurred. {facts}
`),
  fallback: lines(`
{facts} The clerk preserves the observed result without recruiting additional evidence from imagination.
The supplied record supports this account of the visible proclamation. {facts}
{facts} The company's literary confidence remains limited by what was actually forwarded.
The observed line and its available documents are acknowledged here. {facts}
{facts} A modest record can still be described with appropriate institutional care.
The transcript contains the outcome stated in the accompanying facts. {facts}
{facts} Nothing in the narrator's enthusiasm authorizes an extra historical decision.
The available evidence receives the following account. {facts}
{facts} The company has retained the result and the boundaries of its explanation together.
The proclamation is reported within the scope of its supplied documents. {facts}
{facts} Corporate prose can be expansive while its factual claims remain disciplined.
The clerk has entered the visible result with the evidence actually available. {facts}
`),
  reception: lines(`
{facts} The institution has encountered another opportunity to make a straightforward request feel properly received.
Reception opens its account of the mandate. {facts}
{facts} A small numerical instruction has acquired the company's undivided procedural attention.
The incoming request has reached the explanatory part of its journey. {facts}
{facts} The company will now demonstrate the organizational consequences of taking an upper limit seriously.
Reception has the following facts for the minutes. {facts}
{facts} Our capacity to surround a simple instruction with context remains available on demand.
The mandate arrives with the following recorded scope. {facts}
{facts} The enterprise has found a suitably compact starting point for a much less compact explanation.
The clerk begins with what the request actually asks. {facts}
{facts} An upper limit is an excellent occasion for the company to exhibit very few corresponding limits on prose.
The numerical request has entered reception's account. {facts}
`),
  replay: lines(`
{facts} Institutional memory is permitted another reading without being assigned another working day.
The clerk returns to the retained proceedings. {facts}
{facts} A second account of the same record requires attention rather than fresh numerical manufacture.
The existing minutes have been reopened for inspection. {facts}
{facts} The company supports renewed comprehension without a renewed production invoice.
The reader is revisiting evidence already retained. {facts}
{facts} Our capacity to repeat ourselves is being exercised under an unusually honest description.
The completed record is available for another reading. {facts}
{facts} Familiar proceedings may receive fresh attention while keeping their original outcomes.
The clerk is returning to the same institutional record. {facts}
{facts} The company can explain an achievement again without having to achieve it again.
The retained evidence is being brought back into view. {facts}
`),
  courtApproved: lines(`
{facts} The company has made permission to avoid fresh numerical work a properly supported institutional achievement.
The prior-work court's approved outcome enters the minutes. {facts}
{facts} Remembering an answer can now enjoy an accountable relationship with the permission to reuse it.
The actual reuse findings have reached their approved conclusion. {facts}
{facts} Non-performance has acquired the documentary distinction its advocates always believed it deserved.
The court's recorded approvals accompany this reuse of institutional memory. {facts}
{facts} The organization is prepared to take the avoidance of unnecessary production very seriously indeed.
The current reuse petition has received the approvals recorded here. {facts}
{facts} The company has found a professionally satisfying amount of work in deciding not to repeat numerical work.
The court's actual reuse authority is entered into this account. {facts}
{facts} A remembered result now has an appropriately substantial present-tense permission slip.
The approved institutional-memory case supplies its current findings. {facts}
`),
  courtRejected: lines(`
{facts} Institutional memory is useful enough without granting every drawer the authority to be correct.
The prior-work court's actual objection is entered here. {facts}
{facts} A familiar-looking answer has encountered a justified limit on the company's nostalgia.
The recorded court decision declines this proposed reuse. {facts}
{facts} Management's confidence in yesterday has been subjected to the inconvenience of examination.
The reuse petition has reached the rejection stated by its actual papers. {facts}
{facts} The company is prepared to remember that a particular memory should not be adopted.
The objection to the offered precedent appears in the current proceedings. {facts}
{facts} A filing cabinet is being kept distinct from an authority on numerical truth.
The court has supplied the actual grounds on which reuse was refused. {facts}
{facts} Institutional affection for prior work has met an appropriately specific evidentiary objection.
The current precedent has been declined within the scope of the recorded findings. {facts}
`),
  office: lines(`
{facts} The office's recorded state is allowed to speak without a decorative upgrade.
The case file supplies this office entry. {facts}
{facts} A reason and a document are more useful than an executive impression of progress.
The recorded office position appears with its actual scope intact. {facts}
{facts} The narrator has granted this entry no powers beyond its stated decision.
The office record is entered in the language of its actual finding. {facts}
{facts} The company distinguishes an issued authority from an office that was never reached.
The case papers account for this office as follows. {facts}
{facts} Institutional precision includes acknowledging the decisions that did not occur.
The office's place in this case is described by the supplied papers. {facts}
{facts} The account has preserved the finding rather than substituting a reassuring-looking badge.
This entry retains the office state and document actually recorded. {facts}
`),
  runtime: lines(`
{facts} The execution arrangements are reported without hiring an imaginary second infrastructure department.
The selected implementation supplies the following operating context. {facts}
{facts} The company has kept its explanation attached to the machinery actually appointed.
The operating arrangements enter the minutes under their own names. {facts}
{facts} An implementation may be interchangeable while the description of this execution remains specific.
The current execution context is available for inspection. {facts}
{facts} Our enthusiasm for infrastructure has been limited to the infrastructure declared here.
The record identifies the implementation and its operating arrangements. {facts}
{facts} The narrator is working with the appointed implementation rather than a more impressive imaginary deployment.
The execution context has supplied the following factual introductions. {facts}
{facts} A serious explanation should at least know which machinery performed the work.
The actual operating context accompanies these proceedings. {facts}
`),
  omitted: lines(`
{facts} The institution has acknowledged the limits of its filing space before filling them with invention.
The finite observation allowance has the following consequence. {facts}
{facts} The company's appetite for documentation has encountered the browser's capacity to retain it.
The clerk reports the observation limit openly. {facts}
{facts} An omission in the explanatory record does not authorize an omission in honesty about that record.
The supplied dossier has reached the documented allowance. {facts}
{facts} Corporate verbosity remains subject to an actual storage boundary.
The observation allowance is disclosed in the following terms. {facts}
{facts} The company can describe the edge of its evidence without pretending the edge is another approval.
The finite record has supplied its own limitation notice. {facts}
{facts} Our documentation strategy includes recognizing when a filing cabinet is full.
The clerk records the limit on retained observations. {facts}
`),
  rehearsal: lines(`
{facts} Management may inspect a bad idea without requiring the real numerical service to live through it.
The isolated personnel application supplies the scope of this reading. {facts}
{facts} The company has provided an unusually productive home for speculative interventions.
The rehearsal is being reported under its actual read-only remit. {facts}
{facts} An experiment in paperwork can be educational without becoming a new numerical assignment.
The specimen proceedings begin with the following boundaries. {facts}
{facts} Corporate curiosity has acquired a suitable distance from the retained numerical history.
The management rehearsal has supplied its limited purpose. {facts}
{facts} The company supports examining an intervention before allowing it to become an incident.
The read-only application has entered its own explanatory account. {facts}
{facts} A rehearsal is a respectable place to discover that management's confidence requires qualification.
The personnel specimen is being read within its recorded scope. {facts}
`),
  zeroFresh: lines(`
{facts} The absence of deliverables has received a remarkably well-supported beginning.
The zero-work mandate has reached its actual conclusion. {facts}
{facts} The company has demonstrated that an empty workload need not imply an empty organizational purpose.
The recorded zero-number outcome enters the minutes. {facts}
{facts} Nothing has been printed with a level of institutional care difficult to express in nothing.
The fresh zero-work proceedings supply the following facts. {facts}
{facts} Our ability to coordinate the absence of output remains one of our most exact achievements.
The company has reached the recorded outcome of this zero-number assignment. {facts}
{facts} An unused starting position can still illustrate the impressive scale of our commitment to starting positions.
The zero-work record explains the activity surrounding its lack of numerical lines. {facts}
{facts} The enterprise has achieved a carefully supported numerical silence.
The actual zero-number proceedings have concluded in the following terms. {facts}
`),
  zeroCache: lines(`
{facts} The company has remembered how to achieve nothing without asking production to rediscover it.
Institutional memory has supplied the zero-work result. {facts}
{facts} The empty answer has returned with precisely the same commendable absence of numerical ambition.
The cached zero-number mandate receives its own current disclosure. {facts}
{facts} Reusing nothing is a respectable application of the company's conservation policies.
The institution has recalled its prior zero-work achievement. {facts}
{facts} The answer's lack of characters is being preserved with admirable consistency.
The remembered zero-number result is reported here. {facts}
{facts} Nothing's second appearance has avoided the expense of another numerical production campaign.
The zero-work memory has supplied the following outcome. {facts}
{facts} Corporate recollection has proved equal to the considerable challenge of an empty deliverable.
The cached absence of numerical lines is being disclosed again. {facts}
`),
  zeroLegacy: lines(`
{facts} The empty result is visible without a fictional reconstruction of its older employment records.
The earlier zero-number response supplies the limits of this account. {facts}
{facts} The company can explain the current procedure while remaining honest about the older record.
The observed zero-work result is entered within its actual evidentiary scope. {facts}
{facts} A lack of output does not confer unlimited permission to imagine the supporting history.
The earlier administration's empty result is being read as supplied. {facts}
{facts} Institutional explanation remains possible without forging a commencement certificate.
The older zero-work response receives the following factual account. {facts}
{facts} The narrator has kept numerical silence distinct from documentary omniscience.
The available zero-number evidence and procedural context are recorded here. {facts}
{facts} An empty answer is entitled to an honest account of what accompanied it.
The earlier zero-work result has reached the current minutes within its recorded limits. {facts}
`),
  finish: lines(`
{facts} The company has reached the point at which further explanation can become optional inspection.
The clerk closes this reading with the following actual scope. {facts}
{facts} A completed disclosure may now enjoy the professional dignity of being left available to read.
The requested reading has reached its stated conclusion. {facts}
{facts} Corporate continuity is preserved without demanding another numerical performance.
The current proceedings can now be revisited under these arrangements. {facts}
{facts} The answer has been given; its account remains open to comprehension.
The disclosure record has reached the following conclusion. {facts}
{facts} The company considers an inspectable finish a defensible milestone.
The clerk enters the concluding facts of this reading. {facts}
{facts} Our institutional explanation is ready to become institutional reading material.
The requested disclosures have reached the limits stated here. {facts}
`),
  resume: lines(`
{facts} The present has been allowed back into view at the reader's own invitation.
The clerk returns the display to its latest retained minutes. {facts}
{facts} The company recognizes a useful distinction between renewed reading and renewed production.
The reading position has resumed under the following arrangements. {facts}
{facts} The retained history can catch up without asking the business to start over.
The latest minutes have been restored to the visible reading. {facts}
{facts} Reader authority has supplied the appropriate basis for returning to the current account.
The clerk has brought the retained proceedings back into their latest view. {facts}
{facts} The company can restore the present without confiscating the past.
The renewed following of the minutes is recorded here. {facts}
{facts} The reader's return is a sufficient occasion for resuming the explanation.
The visible account has returned to the latest retained evidence. {facts}
`),
  global: lines(`
{facts} These are the supplied operating facts, entered without additional ceremonial inventions.
The request-level record provides this account. {facts}
{facts} The company has given its actual operating observations a place in the minutes.
The recorded reception and operating path are reported here. {facts}
{facts} The narrator's role is to explain these findings rather than expand their authority.
The observed request-level proceedings supply the following context. {facts}
{facts} The company can be expansive about the record while retaining the record's actual boundaries.
The operating findings enter this account in their supplied form. {facts}
{facts} The explanatory department is relying on the observations actually forwarded.
The current record has furnished these operating facts. {facts}
{facts} Corporate fluency is being exercised within the jurisdiction of the available evidence.
The recorded operating path receives its place in this reading. {facts}
`)
};
var corporateAsides = lines(`
Management regards brevity as an undocumented dependency.
The company's confidence is measured in clauses per sentence.
Our organizational chart remains a growth industry.
An uncomplicated explanation would raise difficult questions about departmental headcount.
The business case for further explanation is, regrettably, self-sustaining.
We continue to treat obviousness as an opportunity for institutional development.
The company expects exceptional returns on the careful administration of small things.
Every abstraction deserves the chance to feel indispensable.
Our competitive advantage remains unusually difficult to summarize on purpose.
We recognize the strategic potential of making a familiar answer feel thoroughly supervised.
The institution maintains a strong professional interest in its own continued necessity.
The cost of a sentence is outside the numerical mandate's present scope.
The company's appetite for context remains comfortably ahead of demand.
Simplicity has proved a remarkably fertile source of administrative employment.
We measure organizational maturity by the number of ordinary things requiring an explanation.
Corporate ambition remains available in quantities exceeding the size of the answer.
The company is pleased with how much organization a small result can support.
An integer's modest needs continue to inspire our most extensive arrangements.
We regard unnecessary confidence and unnecessary committees as separate accounting categories.
The enterprise takes pride in the amount of structure a short answer can carry.
Our documentation has demonstrated considerably more room for growth than the game rules.
The company considers a clear explanation an excellent foundation for a longer explanation.
We remain committed to an impressive ratio of institutional vocabulary to printed characters.
Our confidence in the organization occasionally exceeds the organization's confidence in a direct answer.
The enterprise has found considerable strategic room between a requirement and its implementation.
We recognize that a small task can sustain a surprisingly substantial professional ecosystem.
The company remains a reliable source of its own supporting material.
Our market-leading ability to elaborate continues to require no additional numerical features.
The institution has yet to encounter an obvious fact it could not give a reporting structure.
Management's affection for process remains greater than the answer's apparent need for it.
The company is investing in comprehensibility at a scale the original exercise could scarcely have anticipated.
We thank the number for its patience with the organization built around it.
`);
var ChronicleLanguage = class {
  bags = /* @__PURE__ */ new Map();
  random;
  constructor(random = Math.random) {
    this.random = random;
  }
  pick(key, options) {
    let bag = this.bags.get(key);
    if (!bag) {
      bag = { remaining: [] };
      this.bags.set(key, bag);
    }
    if (!bag.remaining.length) {
      bag.remaining = options.map((_, index2) => index2);
      for (let i = bag.remaining.length - 1; i > 0; i--) {
        const j = Math.floor(this.random() * (i + 1));
        [bag.remaining[i], bag.remaining[j]] = [bag.remaining[j], bag.remaining[i]];
      }
      const end = bag.remaining.length - 1;
      if (end > 0 && bag.remaining[end] === bag.last) [bag.remaining[0], bag.remaining[end]] = [bag.remaining[end], bag.remaining[0]];
    }
    const index = bag.remaining.pop();
    bag.last = index;
    return options[index];
  }
  write(situation, facts) {
    return this.pick(situation, narrativeTemplates[situation]).replace("{facts}", () => facts) + " " + this.pick("corporate-asides", corporateAsides);
  }
};

// web/premises-model.ts
var offices = ["Premises Allocation Office", "Character-by-Character Vacancy Inspector", "Hidden Occupant Eviction Authority", "Vacancy Reinspection Office", "Single-Use Occupancy Lease Authority", "Independent Premises Auditor"];
function parsePremises(value) {
  const d = value;
  const invalid = () => {
    throw new Error("The premises office supplied inconsistent inspection papers.");
  };
  if (!d || d.schema !== "slopbuzz-premises/v1" || typeof d.ordinal !== "string" || !/^\d+$/.test(d.ordinal) || d.ordinal[0] === "0" || !["MANDATE", "REHEARSAL"].includes(d.purpose) || !["APPROVED", "REJECTED"].includes(d.status) || typeof d.vacancyCertified !== "boolean" || !(d.initialLength === null || Number.isSafeInteger(d.initialLength) && d.initialLength >= 0 && d.initialLength <= 256) || !Array.isArray(d.tenants) || d.tenants.length > 256 || !Array.isArray(d.steps) || d.steps.length !== offices.length) invalid();
  let position = 0;
  for (const tenant of d.tenants) {
    if (!tenant || tenant.position !== position || typeof tenant.name !== "string" || typeof tenant.excuse !== "string" || typeof tenant.recognized !== "boolean" || typeof tenant.codePoint !== "string" || !/^U\+[0-9A-F]{4,6}$/.test(tenant.codePoint)) invalid();
    const point = Number.parseInt(tenant.codePoint.slice(2), 16);
    if (point > 1114111) invalid();
    position += point > 65535 ? 2 : 1;
  }
  if (d.initialLength === null && d.tenants.length > 0 || d.initialLength !== null && d.initialLength !== position) invalid();
  let rejected = false;
  for (const [index, step] of d.steps.entries()) {
    if (!step || step.office !== offices[index] || typeof step.finding !== "string" || typeof step.document !== "string") invalid();
    if (rejected) {
      if (step.state !== "NOT_REACHED") invalid();
      continue;
    }
    if (step.state === "REJECTED") {
      rejected = true;
      continue;
    }
    const allowed = index === 1 ? ["APPROVED", "DISCOVERED"] : index === 2 ? ["APPROVED", "NOT_REQUIRED"] : ["APPROVED"];
    if (!allowed.includes(step.state)) invalid();
  }
  if (rejected !== (d.status === "REJECTED") || d.status === "APPROVED" && (d.initialLength === null || d.tenants.some((t) => !t.recognized))) invalid();
  if (d.steps[1].state === "DISCOVERED" && d.tenants.length === 0) invalid();
  if (d.vacancyCertified !== (d.steps[3].state === "APPROVED")) invalid();
  if (["APPROVED", "DISCOVERED"].includes(d.steps[1].state) && d.initialLength === null) invalid();
  if (d.steps[1].state === "APPROVED" && d.tenants.length !== 0) invalid();
  if (d.steps[2].state === "NOT_REQUIRED" && d.tenants.length !== 0) invalid();
  if (d.steps[2].state === "APPROVED" && d.tenants.length === 0) invalid();
  return d;
}

// web/premises.ts
function element2(tag, text2, className) {
  const n = document.createElement(tag);
  if (text2 !== void 0) n.textContent = text2;
  if (className) n.className = className;
  return n;
}
function premisesCard(d, details = false) {
  const card = element2("div", void 0, "premises-card");
  card.dataset.premisesOrdinal = d.ordinal;
  card.dataset.premisesVerdict = d.status;
  card.append(element2("p", `Premises inspection \xB7 Ordinal ${d.ordinal}`, "eyebrow"));
  const verdict = d.status === "REJECTED" ? "Occupancy refused" : d.tenants.length ? "Hidden occupants removed; vacancy certified" : "Vacancy certified; lease issued";
  card.append(element2("p", verdict, "premises-verdict"));
  const plan = element2("dl", void 0, "premises-floorplan");
  const before = d.initialLength === null ? "No valid initial survey received" : d.tenants.length ? `${d.initialLength} UTF-16 unit${d.initialLength === 1 ? "" : "s"} occupied` : "Empty: 0 characters";
  for (const [label, text2] of [["Initial survey", before], ["Before numerical occupancy", d.vacancyCertified ? "Reinspection confirmed 0 characters" : "Vacancy authorization withheld"], ["Lease", d.status === "APPROVED" ? "Issued to this request and this premises" : "No usable lease issued"]]) {
    const row = element2("div");
    row.append(element2("dt", label), element2("dd", text2));
    plan.append(row);
  }
  card.append(plan);
  if (d.tenants.length) {
    const list = element2("ul", void 0, "premises-tenants");
    for (const tenant of d.tenants) {
      const row = element2("li");
      row.append(element2("strong", `${tenant.name} \xB7 ${tenant.codePoint}`), element2("p", `Position ${tenant.position}. ${tenant.excuse}`));
      list.append(row);
    }
    card.append(list);
  }
  card.append(element2("p", d.purpose === "REHEARSAL" ? "Read-only specimen. Its lease is closed after inspection; no numerical output, cache entry or audit transaction is created." : "This is the actual pre-occupancy inspection. Authorized numerical text moves in after vacancy is certified.", "field-help"));
  if (details) {
    const list = element2("ol", void 0, "personnel-steps");
    list.setAttribute("aria-label", "Six premises office decisions");
    for (const [index, step] of d.steps.entries()) {
      const item = element2("li");
      item.dataset.verdict = step.state;
      const disclosure = element2("details"), summary = element2("summary");
      const number = element2("span", String(index + 1).padStart(2, "0"), "personnel-index");
      number.setAttribute("aria-hidden", "true");
      summary.append(number, element2("span", step.office, "personnel-office"), element2("span", step.state.replaceAll("_", " ").toLowerCase(), "personnel-badge"));
      disclosure.append(summary, element2("p", step.finding), element2("p", step.document, "field-help"));
      item.append(disclosure);
      list.append(item);
    }
    card.append(list);
  }
  return card;
}
var PremisesDesk = class {
  busy = false;
  serial = 0;
  constructor() {
    byId("premises-form").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!this.busy) void this.inspect();
    });
  }
  async inspect() {
    const ordinal = byId("premises-ordinal"), scenario = byId("premises-scenario").value;
    if (!/^[1-9][0-9]*$/.test(ordinal.value)) {
      ordinal.setAttribute("aria-invalid", "true");
      setText("premises-error", "Enter a positive whole number with no leading zeros.");
      ordinal.focus();
      return;
    }
    ordinal.removeAttribute("aria-invalid");
    setText("premises-error", "");
    const requestedOrdinal = ordinal.value;
    const serial = ++this.serial;
    this.busy = true;
    byId("premises-submit").setAttribute("aria-disabled", "true");
    byId("premises-result").setAttribute("aria-busy", "true");
    setText("premises-status", "The property offices are inspecting a read-only specimen\u2026");
    try {
      const response = await request(`/premises/rehearsal?scenario=${encodeURIComponent(scenario)}&ordinal=${requestedOrdinal}`);
      if (!response.ok) throw new Error(`Inspection desk returned ${response.status}.`);
      const data = parsePremises(await response.json());
      if (data.purpose !== "REHEARSAL" || data.ordinal !== requestedOrdinal) throw new Error("The specimen belongs to another premises request.");
      if (serial !== this.serial) return;
      byId("premises-result").replaceChildren(premisesCard(data, true));
      const refusal = data.steps.find((s) => s.state === "REJECTED");
      setText("premises-status", refusal ? `Occupancy refused by ${refusal.office}. ${refusal.finding}` : data.tenants.length ? `Inspection identified and removed ${data.tenants.map((t) => `${t.name}, ${t.codePoint}`).join("; ")}. Reinspection passed; specimen lease issued and closed.` : "Vacant premises approved. Specimen lease issued and closed.");
    } catch (error) {
      if (serial === this.serial) setText("premises-status", `The property inspection could not be completed: ${error.message} No numerical mandate was submitted.`);
    } finally {
      if (serial === this.serial) {
        this.busy = false;
        byId("premises-submit").setAttribute("aria-disabled", "false");
        byId("premises-result").setAttribute("aria-busy", "false");
      }
    }
  }
};

// web/chronicle.ts
async function readProclamation(response) {
  const runtime2 = JSON.parse(response.headers.get("X-SlopBuzz-Execution-Runtime") || "{}");
  const packet = { text: "", events: [], omitted: 0, cache: response.headers.get("X-SlopBuzz-Cache") || "UNKNOWN", runtime: runtime2, recorded: false };
  const precedent2 = response.headers.get("X-SlopBuzz-Precedent-Trace");
  if (precedent2 && precedent2.length <= 8192) try {
    const data2 = parsePrecedent(JSON.parse(precedent2));
    if (data2.purpose === "MANDATE") packet.precedent = data2;
  } catch {
  }
  if (!response.headers.get("Content-Type")?.includes("application/json")) {
    const raw = response.headers.get("X-SlopBuzz-Onboarding-Trace");
    if (raw && raw.length <= 8192) try {
      const personnel2 = parseDossier(JSON.parse(raw));
      if (personnel2.purpose === "MANDATE") packet.events = personnel2.steps.map((step) => ({ ordinal: "1", kind: "HR_" + step.state, office: step.office, finding: step.finding, document: step.document }));
    } catch {
    }
    return { ...packet, text: await response.text() };
  }
  const data = await response.json();
  if (data?.schema !== "slopbuzz-execution/v1" || typeof data.text !== "string" || !Array.isArray(data.trace?.events) || data.trace.events.length > 5e4 || !Number.isSafeInteger(data.trace.omitted) || data.trace.omitted < 0 || data.trace.events.some((e) => !e || e.ordinal !== null && (typeof e.ordinal !== "string" || !/^\d+$/.test(e.ordinal)) || ["kind", "office", "finding"].some((k) => typeof e[k] !== "string") || e.document !== null && typeof e.document !== "string")) throw new Error("The execution dossier could not be read. No second mandate was submitted.");
  return { ...packet, text: data.text, events: data.trace.events, omitted: data.trace.omitted, recorded: true };
}
function node2(tag, text2, className) {
  const result = document.createElement(tag);
  if (text2 !== void 0) result.textContent = text2;
  if (className) result.className = className;
  return result;
}
function title(folio) {
  if (folio.ordinal === "1") return "One has reported for duty";
  if (folio.text === "FizzBuzz") return "A cross-departmental branding initiative has concluded";
  if (folio.text === "Fizz") return "The Fizz delegation has been admitted";
  if (folio.text === "Buzz") return "The Buzz delegation has been admitted";
  return `Ordinal ${folio.ordinal} has retained its numerical identity`;
}
function paragraphs(folio, language) {
  const events = folio.events, parts = [];
  const add = (situation, facts) => parts.push(language.write(situation, facts));
  if (folio.ordinal === "1") add("one", "One has reported for duty. The first position is now visibly occupied by exactly one. Zero remains outside the staffing plan; Two must wait for an authorized succession.");
  if (folio.cache === "HIT") {
    add("cache", `Institutional Memory reissued the approved answer \u201C${folio.text}\u201D. No fresh recruitment, classification, glyph requisition or numerical audit transaction was conducted for this cache hit.`);
    add("cacheProvenance", `The observed output is ${folio.text}. Its current disclosure is new; the underlying business result was already held in the output cache. Historical per-line certificates are not manufactured for this replay.`);
    return parts;
  }
  const hr = events.filter((e) => e.kind.startsWith("HR_"));
  if (hr.length) add("personnel", "Personnel has supplied the actual case file. " + hr.map((e) => `${e.office}: ${e.finding}`).join(" "));
  if (!folio.recorded) {
    add("legacy", `The observed proclamation is \u201C${folio.text}\u201D. The earlier administration returned the answer without forwarding a detailed execution dossier. ${hr.length ? "Its supplied personnel approvals are recorded above; the other departments are explained as procedure." : "We can explain the company\u2019s procedure while keeping those explanations distinct from recorded decisions."}`);
    add("procedure", `Under the current procedure, One completes recruitment and induction before a new sequence starts. Each ordinal is classified for Fizz, Buzz or its own decimal identity, and word output obtains its approved characters through procurement. The procedure\u2019s contracts are described here; individual historical approvals are not reconstructed.`);
    add("procedure", `A retained mandate uses staged output, an independent notary, the audit repository and its message queue. Extended-magnitude windows use exact arithmetic and an independent lexical witness without retained audit transactions. The selected runtime\u2019s old receipt does not establish which newer offices attended this particular case.`);
    return parts;
  }
  const assembly = events.find((e) => e.kind === "ASSEMBLY");
  if (assembly) add("assembly", assembly.finding + " The visitor then consulted each certified strategy before allowing its printer to speak.");
  const premises = events.filter((e) => e.kind.startsWith("PREMISES_") && e.kind !== "PREMISES_CERTIFICATE");
  if (premises.length) add(premises.some((e) => e.kind === "PREMISES_DISCOVERY") ? "premisesDiscovery" : "premises", premises.map((e) => `${e.office}: ${e.finding}`).join(" "));
  const classification = events.find((e) => e.kind === "CLASSIFICATION" || e.kind === "EXTENDED_CLASSIFICATION");
  if (classification) add("classification", classification.finding);
  const procurement = events.filter((e) => ["REQUISITION", "DELIVERY", "GLYPH_ACCEPTED", "GLYPH_ASSEMBLED"].includes(e.kind));
  if (procurement.length) {
    const received = procurement.filter((e) => e.kind === "GLYPH_ACCEPTED");
    const zs = received.filter((e) => e.finding.includes("character z,"));
    add("procurement", `Glyph Procurement received ${received.length} individually inspected character allocations${zs.length ? `, including ${zs.length} separately certified z\u2019s` : ""}. ` + procurement.filter((e) => e.kind !== "GLYPH_ACCEPTED").map((e) => e.finding).join(" ") + " Every position\u2019s receiving decision is available in the department documents.");
  }
  const numeral = events.find((e) => e.kind === "NUMERAL");
  if (numeral) add("numeral", numeral.finding);
  const begin = events.find((e) => e.kind === "TRANSACTION_BEGIN"), fragments = events.filter((e) => e.kind === "FRAGMENT");
  if (begin) add("transaction", begin.finding + ` ${fragments.length} fragments entered custody: ` + fragments.map((e) => JSON.stringify(e.document)).join(", ") + ". Even the line ending is accounted for; the public receives a complete proclamation.");
  const departments = { NOTARY: "notary", PUBLICATION: "publication", AUDIT_APPEND: "audit", QUEUE_ENQUEUED: "queued", TRANSACTION_COMMIT: "commit", TRANSACTION_CLEANUP: "cleanup", SUCCESSION: "succession", EXTENDED_NOTARY: "extendedNotary", EXTENDED_SUCCESSION: "extendedSuccession" };
  for (const [kind, situation] of Object.entries(departments)) {
    const selected = events.filter((e) => e.kind === kind);
    if (selected.length) add(situation, selected.map((e) => `${e.office}: ${e.finding}`).join(" "));
  }
  if (!parts.length) add("fallback", `The recorded output \u201C${folio.text}\u201D has entered the transcript. The accompanying department documents contain the observed decisions for ordinal ${folio.ordinal}.`);
  return parts;
}
var ExecutiveChronicle = class {
  language = new ChronicleLanguage();
  rehearsals = /* @__PURE__ */ new WeakMap();
  packet;
  groups = /* @__PURE__ */ new Map();
  snapshots = /* @__PURE__ */ new Map();
  options = /* @__PURE__ */ new Map();
  rendered = /* @__PURE__ */ new Map();
  serial = 0;
  collapsed = 0;
  inspected;
  pending = false;
  pendingNotes = [];
  pinned = true;
  pinAfterResize = false;
  body = byId("chronicle-scroll");
  entries = byId("chronicle-entries");
  follow = byId("follow-chronicle");
  selector = byId("chronicle-ordinal");
  constructor() {
    const pause = () => {
      if (this.body.scrollHeight - this.body.clientHeight <= 4) return;
      this.pinned = false;
      this.pinAfterResize = false;
    };
    this.body.addEventListener("scroll", () => {
      if (this.pinAfterResize) return;
      this.pinned = this.atBottom();
      if (this.pinned && this.follow.checked && this.pending) this.latest();
    }, { passive: true });
    this.body.addEventListener("wheel", (event) => {
      if (event.deltaY < 0 && !event.ctrlKey) pause();
    }, { passive: true });
    this.body.addEventListener("keydown", (event) => {
      if (["ArrowUp", "PageUp", "Home"].includes(event.key) || event.key === " " && event.shiftKey) pause();
    });
    let touchY;
    this.body.addEventListener("touchstart", (event) => {
      touchY = event.touches[0]?.clientY;
    }, { passive: true });
    this.body.addEventListener("touchmove", (event) => {
      const next = event.touches[0]?.clientY;
      if (next !== void 0 && touchY !== void 0 && next > touchY) pause();
      touchY = next;
    }, { passive: true });
    this.body.addEventListener("pointerdown", (event) => {
      const bounds = this.body.getBoundingClientRect();
      if (this.body.offsetWidth - this.body.clientWidth > 2 && event.clientX >= bounds.left + this.body.clientWidth) pause();
    }, { passive: true });
    this.follow.addEventListener("change", () => {
      if (this.follow.checked) this.latest();
    });
    this.selector.addEventListener("change", () => {
      if (this.selector.value === "latest") {
        this.latest();
        return;
      }
      const folio = this.snapshots.get(this.selector.value);
      if (!folio) return;
      this.follow.checked = false;
      this.inspected?.remove();
      this.inspected = this.render(folio);
      this.inspected.prepend(node2("p", "Archive inspection \xB7 original completed record", "chronicle-source"));
      this.inspected.classList.add("chronicle-inspection");
      this.body.prepend(this.inspected);
      this.body.scrollTop = 0;
      setText("chronicle-current", `Inspecting recorded ordinal ${folio.ordinal}. New output can continue without moving this reading position.`);
    });
    const layout = () => {
      if (this.pinAfterResize) {
        this.pinAfterResize = false;
        this.followBottom();
      }
      const panel = byId("mandate-output");
      panel.dataset.viewportFit = String(innerHeight > 600 && panel.getBoundingClientRect().height <= innerHeight - 24 - (document.querySelector("#discovery-register")?.getBoundingClientRect().height || 0));
    };
    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        layout();
      });
    };
    const resize = new ResizeObserver(schedule);
    const discoveries = document.querySelector("#discovery-register");
    if (discoveries) resize.observe(discoveries);
    resize.observe(this.body);
    resize.observe(this.entries);
    resize.observe(byId("mandate-output"));
    resize.observe(byId("mandate-output").querySelector(".output-dock"));
    window.addEventListener("resize", () => {
      this.pinAfterResize = this.isFollowing();
      schedule();
    });
  }
  get records() {
    return [...this.snapshots.values()];
  }
  begin(limit, mode = "mandate") {
    this.packet = void 0;
    this.groups.clear();
    this.snapshots.clear();
    this.options.clear();
    this.rendered.clear();
    this.collapsed = 0;
    this.serial++;
    this.pending = false;
    this.pendingNotes = [];
    this.follow.checked = true;
    this.pinned = true;
    this.pinAfterResize = false;
    this.inspected?.remove();
    this.inspected = void 0;
    this.entries.replaceChildren();
    this.selector.replaceChildren(node2("option", "Latest proceedings"));
    this.selector.options[0].value = "latest";
    this.note(this.language.write(mode === "replay" ? "replay" : "reception", mode === "replay" ? "The clerk is rereading completed proceedings. No business operation will be executed again." : `Reception accepted an upper limit of ${limit}. The input passed decimal validation. The company is obtaining a result and will explain each number as it becomes visible.`), "Mandate reception");
    setText("chronicle-current", mode === "replay" ? "Replaying completed corporate minutes." : "The committees have received a numerical mandate.");
  }
  receive(packet) {
    this.packet = packet;
    this.groups.clear();
    for (const event of packet.events) {
      if (event.ordinal !== null) {
        const group = this.groups.get(event.ordinal) || [];
        group.push(event);
        this.groups.set(event.ordinal, group);
      }
    }
    const global = packet.events.filter((e) => e.ordinal === null && !["COMPLETE", "FAILED"].includes(e.kind) && !e.kind.startsWith("PRECEDENT_"));
    if (global.length) this.note(this.language.write("global", global.map((e) => `${e.office}: ${e.finding}`).join(" ")), "Recorded reception and operating path");
    if (packet.precedent) {
      this.note(this.language.write(packet.precedent.status === "APPROVED" ? "courtApproved" : "courtRejected", packet.precedent.status === "APPROVED" ? "Institutional Memory offered prior text. Five actual Java offices examined the current reuse petition." : "Institutional Memory offered an inadmissible precedent. The court refused reuse before a single fresh production run was authorized. The rejected text has not been disclosed as the answer."), "Prior Work Ratification and Institutional Memory Court");
      for (const step of packet.precedent.steps) this.note(this.language.write("office", `${step.state === "APPROVED" ? "Approved" : step.state === "REJECTED" ? "Rejected" : "Not reached"}. ${step.finding} ${step.document}`), step.office);
    }
    const { engine, storage, cache } = packet.runtime;
    if (engine) this.note(this.language.write("runtime", `The appointed implementation is ${String(engine)}. Its declared repository is ${String(storage || "unspecified")} and its cache adapter is ${String(cache || "unspecified")}. ${packet.cache === "HIT" ? "Institutional memory answered without convening a fresh production workforce." : "The following account distinguishes actual Java decisions from explanatory context."}`), "Execution arrangements");
    if (packet.omitted) this.note(this.language.write("omitted", `${packet.omitted} observation entries exceeded the finite dossier allowance. Numerical output remains independently available.`), "Observation allowance");
  }
  disclose(start, lines2) {
    let ordinal = BigInt(start);
    const folios = lines2.map((text2) => {
      const value = ordinal.toString();
      ordinal++;
      return { ordinal: value, text: text2, events: this.groups.get(value) || [], cache: this.packet?.cache || "UNKNOWN", recorded: this.packet?.recorded || false, runtime: this.packet?.runtime || {} };
    });
    this.discloseFolios(folios);
    return folios;
  }
  discloseFolios(folios) {
    for (const folio of folios) {
      this.snapshots.set(folio.ordinal, folio);
      if (!this.options.has(folio.ordinal)) {
        const option = node2("option", `Ordinal ${folio.ordinal}`);
        option.value = folio.ordinal;
        this.options.set(folio.ordinal, option);
        this.selector.append(option);
      }
      while (this.snapshots.size > 1e3) {
        const oldest = this.snapshots.keys().next().value;
        this.snapshots.delete(oldest);
        if (this.selector.value !== oldest) {
          this.options.get(oldest)?.remove();
          this.options.delete(oldest);
        }
      }
    }
    this.pauseIfReading();
    if (!this.isFollowing()) {
      this.pending = true;
      return;
    }
    for (const folio of folios.slice(-24)) {
      const old = this.rendered.get(folio.ordinal);
      if (old) {
        old.remove();
        this.rendered.delete(folio.ordinal);
      }
      const article = this.render(folio);
      this.rendered.set(folio.ordinal, article);
      this.entries.append(article);
    }
    this.trim();
    const last = folios.at(-1);
    if (last && !this.inspected) {
      this.selector.value = "latest";
      setText("chronicle-current", `Ordinal ${last.ordinal}: ${title(last)}. Official output: ${last.text}.`);
    }
    this.followBottom();
  }
  render(folio) {
    const article = node2("article", void 0, "chronicle-folio");
    article.dataset.ordinal = folio.ordinal;
    article.append(node2("p", `Ordinal ${folio.ordinal} \xB7 ${folio.cache === "HIT" ? "Institutional memory" : folio.recorded ? "Recorded Java proceedings" : folio.events.length ? "Recorded personnel \xB7 procedure explained" : "Observed output \xB7 procedure explained"}`, "chronicle-source"), node2("h4", title(folio)));
    folio.narrative ??= Object.freeze(paragraphs(folio, this.language));
    for (const paragraph of folio.narrative) article.append(node2("p", paragraph, "chronicle-prose"));
    const certificate = folio.events.find((e) => e.kind === "PREMISES_CERTIFICATE");
    if (certificate?.document) try {
      const data = parsePremises(JSON.parse(certificate.document));
      if (data.ordinal === folio.ordinal && data.purpose === "MANDATE" && folio.cache !== "HIT") article.append(premisesCard(data));
    } catch {
    }
    if (folio.events.length) {
      const details = node2("details");
      details.append(node2("summary", `Inspect ${folio.events.length} department records for ordinal ${folio.ordinal}`));
      const list = node2("ol");
      for (const event of folio.events) {
        const item = node2("li");
        item.append(node2("strong", event.office), node2("p", event.finding));
        if (event.document) item.append(node2("pre", event.document, "chronicle-document"));
        list.append(item);
      }
      details.append(list);
      article.append(details);
    }
    return article;
  }
  trim() {
    for (const [key, article] of this.rendered) {
      if (this.rendered.size <= 24) break;
      if (article.contains(document.activeElement)) continue;
      article.remove();
      this.rendered.delete(key);
      this.collapsed++;
    }
    let notice = this.entries.querySelector(".chronicle-archive-note");
    if (this.collapsed) {
      if (!notice) {
        notice = node2("p", void 0, "chronicle-archive-note");
        this.entries.prepend(notice);
      }
      notice.textContent = `Earlier narration has been condensed for a finite browser. Inspect any of the latest ${this.snapshots.size} disclosed ordinals using the selector.`;
    }
  }
  note(text2, heading = "Corporate minutes") {
    this.pauseIfReading();
    if (!this.isFollowing()) {
      this.pending = true;
      this.pendingNotes.push({ text: text2, heading });
      if (this.pendingNotes.length > 16) this.pendingNotes.shift();
      return;
    }
    const article = node2("article", void 0, "chronicle-note");
    article.append(node2("h4", heading), node2("p", text2));
    this.entries.append(article);
    const notes = this.entries.querySelectorAll(".chronicle-note");
    if (notes.length > 16) notes[0].remove();
    this.followBottom();
  }
  rehearsal(data, count) {
    this.pauseIfReading();
    const key = `rehearsal-${data.caseId}`;
    let article = this.entries.querySelector(`[data-rehearsal="${CSS.escape(key)}"]`);
    if (!article) {
      article = node2("article", void 0, "chronicle-note");
      article.dataset.rehearsal = key;
      this.entries.append(article);
    }
    let prose = this.rehearsals.get(data);
    if (!prose) {
      prose = Object.freeze([this.language.write("rehearsal", "This is a read-only rehearsal using the actual personnel offices. Existing numerical output is retained; the rehearsal creates no numerical audit entries."), ...data.steps.map((decision) => this.language.write("office", `${decision.office} \u2014 ${decision.state === "APPROVED" ? "Approved" : decision.state === "REJECTED" ? "Rejected" : "Not reached"}. ${decision.finding} ${decision.document}`))]);
      this.rehearsals.set(data, prose);
    }
    article.replaceChildren(node2("h4", `Management intervention: applicant ${data.candidate}`), node2("p", prose[0]));
    for (const paragraph of prose.slice(1, count + 1)) article.append(node2("p", paragraph));
    setText("chronicle-current", count === 7 ? data.status === "APPROVED" ? "Personnel rehearsal approved: One may start work." : `Personnel rehearsal rejected by ${data.steps.find((e) => e.state === "REJECTED").office}.` : `Reading completed personnel rehearsal: ${count} of 7 offices.`);
    const rehearsals = this.entries.querySelectorAll("[data-rehearsal]");
    if (rehearsals.length > 8) rehearsals[0].remove();
    this.followBottom();
  }
  finish(zero = false) {
    if (zero && !this.inspected) setText("chronicle-current", "Zero-number mandate complete. No numerical output was required.");
    if (zero) this.note(this.language.write(this.packet?.cache === "HIT" ? "zeroCache" : this.packet?.recorded ? "zeroFresh" : "zeroLegacy", this.packet?.cache === "HIT" ? "Institutional memory reissued the zero-work mandate. No new recruitment, numerical line or audit entry was required." : this.packet?.recorded ? "The company hired One for a zero-work mandate. The loop boundary then declined every numerical iteration. No line was printed and no numerical audit entry was needed." : "The observed zero-number mandate published no lines. Under the current procedure One is initialized before the loop boundary declines all work; this older response supplied no individual personnel certificates."), "Zero-number mandate");
    const denied = [...this.groups.values()].filter((events) => !this.snapshots.has(events[0]?.ordinal || "")).flat().filter((e) => e.kind === "CONTINUATION");
    this.note(this.language.write("finish", (denied.length ? denied.map((e) => e.finding).join(" ") + " " : "") + "The requested disclosures are complete. Replay and inspection read these retained minutes without submitting another mandate."), "Proceedings concluded");
  }
  atBottom() {
    return this.body.scrollHeight - this.body.clientHeight - this.body.scrollTop <= 4;
  }
  isFollowing() {
    return this.follow.checked && this.pinned;
  }
  pauseIfReading() {
    if (!this.pinAfterResize && !this.atBottom()) this.pinned = false;
  }
  followBottom() {
    if (this.isFollowing()) this.body.scrollTop = this.body.scrollHeight;
  }
  latest() {
    this.inspected?.remove();
    this.inspected = void 0;
    this.follow.checked = true;
    this.pinned = true;
    this.pinAfterResize = false;
    this.selector.value = "latest";
    for (const [ordinal, option] of this.options) if (!this.snapshots.has(ordinal)) {
      option.remove();
      this.options.delete(ordinal);
    }
    if (this.pending) {
      this.pending = false;
      const notes = this.pendingNotes;
      this.pendingNotes = [];
      this.entries.replaceChildren();
      this.rendered.clear();
      this.note(this.language.write("resume", "Following has resumed at the latest retained minutes. No business operation was submitted again."), "Reading position restored");
      this.discloseFolios(this.records.slice(-24));
      for (const entry of notes) this.note(entry.text, entry.heading);
    }
    const last = this.records.at(-1);
    if (last) setText("chronicle-current", `Ordinal ${last.ordinal}: ${title(last)}. Official output: ${last.text}.`);
    this.followBottom();
  }
};

// web/demo.ts
var runForm = byId("run-form");
var limitInput = byId("limit");
var speedControl = byId("display-speed");
var runButton = byId("run-button");
var mandateSequence = 0;
var pauseButton = byId("pause-reading");
var revealButton = byId("reveal-all");
var stopButton = byId("stop-reading");
var streaming = false;
var followOutput = byId("follow-output");
var reading = false;
var paused = false;
var revealAll = false;
var wakeReading;
var activityMode = "mandate";
var manualStep = false;
var chronicle = new ExecutiveChronicle();
var precedent = new PrecedentView();
new PremisesDesk();
var companions = new CompanionDesk();
var currentLimit = "15";
var lastPlayback;
var inspection;
var personnel = new PersonnelProceedings({ rehearse: (scenario) => void rehearsePersonnel(scenario), replay: () => void replayPersonnel(), step: stepPersonnel, disclosed: (data, count) => {
  if (data.purpose === "REHEARSAL") chronicle.rehearsal(data, count);
} });
function discloseLines(start, lines2) {
  companions.disclose(start, lines2);
  chronicle.disclose(start, lines2);
  lastPlayback = { kind: "mandate", folios: chronicle.records, limit: currentLimit, personnel: personnel.record };
  personnel.setPlaybackAvailable(true);
}
function readingControls() {
  stopButton.setAttribute("aria-disabled", String(!reading));
  revealButton.textContent = activityMode === "rehearsal" || activityMode === "replay" ? "Reveal completed proceedings" : streaming ? "Waive disclosure delays" : "Reveal complete output";
  pauseButton.setAttribute("aria-disabled", String(!reading));
  revealButton.setAttribute("aria-disabled", String(!reading));
  pauseButton.textContent = paused ? "Resume reading" : "Pause reading";
}
pauseButton.addEventListener("click", () => {
  if (!reading) return;
  paused = !paused;
  readingControls();
  setText("run-status", paused ? "Ceremonial reading paused. Resume or reveal the complete output when ready." : "Ceremonial reading resumed.");
  wakeReading?.();
});
revealButton.addEventListener("click", () => {
  if (!reading) return;
  revealAll = true;
  paused = false;
  wakeReading?.();
});
speedControl.addEventListener("change", () => wakeReading?.());
function followLatest() {
  if (followOutput.checked) byId("output").scrollTop = byId("output").scrollHeight;
}
followOutput.addEventListener("change", followLatest);
readingControls();
var autocorrect = byId("numeric-autocorrect");
var warnedValue = "";
var warningIndex = -1;
function inspectMagnitude() {
  if (autocorrect.checked) {
    const before = limitInput.value;
    const caret = limitInput.selectionStart;
    limitInput.value = autocorrectMandate(before);
    if (caret !== null) {
      const position = autocorrectMandate(before.slice(0, caret)).length;
      limitInput.setSelectionRange(position, position);
    }
  }
  let limit;
  try {
    limit = parseMandate(limitInput.value);
  } catch {
    limit = null;
  }
  const warning = byId("magnitude-warning");
  warning.hidden = typeof limit !== "bigint";
  if (typeof limit === "bigint" && limitInput.value !== warnedValue) {
    const selected = chooseMagnitudeWarning(warningIndex);
    warningIndex = selected.index;
    warning.textContent = selected.text;
    warnedValue = limitInput.value;
  } else if (typeof limit !== "bigint") warnedValue = "";
  return limit;
}
limitInput.addEventListener("input", () => {
  inspectMagnitude();
  limitInput.removeAttribute("aria-invalid");
  setText("limit-error", "");
});
autocorrect.addEventListener("change", () => {
  inspectMagnitude();
  limitInput.removeAttribute("aria-invalid");
  setText("limit-error", "");
});
function validateLimit() {
  const limit = inspectMagnitude();
  if (limit === null) {
    limitInput.setAttribute("aria-invalid", "true");
    setText("limit-error", "Enter a non-negative whole number using digits 0\u20139.");
    limitInput.focus();
    return null;
  }
  limitInput.removeAttribute("aria-invalid");
  setText("limit-error", "");
  return limit;
}
stopButton.addEventListener("click", () => {
  if (!reading) return;
  ++mandateSequence;
  reading = false;
  streaming = false;
  paused = false;
  wakeReading?.();
  readingControls();
  runButton.removeAttribute("aria-disabled");
  byId("output").removeAttribute("aria-busy");
  personnel.stopReading();
  chronicle.note("The ceremonial disclosure was adjourned. Already printed numbers and their minutes remain available; this does not reverse completed business operations.", "Proceedings adjourned");
  setText("run-status", "Proceedings stopped. Already disclosed lines remain visible.");
});
function showForecast(forecast) {
  setText("forecast-numerals", forecast.numeralLines);
  setText("forecast-fizz", forecast.fizzLines);
  setText("forecast-buzz", forecast.buzzLines);
  setText("forecast-joint", forecast.fizzBuzzLines);
  setText("forecast-units", forecast.workloadUnits);
}
async function loadForecast(limit, sequence = mandateSequence) {
  const desk = typeof limit === "number" && limit <= 1e3 ? "/capacity/forecast" : "/capacity/forecast/extended";
  const reply = await request(`${desk}?limit=${limit}`);
  if (!reply.ok) throw new Error(`Forecast desk returned ${reply.status}.`);
  const forecast = await reply.json();
  if (sequence === mandateSequence) showForecast(forecast);
}
function waitForPace(milliseconds) {
  return new Promise((resolve) => {
    let timer;
    const finish = () => {
      clearTimeout(timer);
      if (wakeReading === finish) wakeReading = void 0;
      resolve();
    };
    wakeReading = finish;
    if (milliseconds !== void 0) timer = setTimeout(finish, milliseconds);
  });
}
async function revealOutput(text2, sequence, serviceMillis) {
  readingControls();
  const lines2 = text2 ? text2.trimEnd().split(/\r?\n/) : [];
  const output = byId("output");
  output.textContent = lines2.length ? "" : "The zero-number mandate produces no lines.";
  setText("output-count", `0 of ${lines2.length} lines`);
  setText("run-status", `Service answered in ${serviceMillis} milliseconds. The ceremonial reading is in progress.`);
  for (let index = 0; index < lines2.length; index++) {
    if (sequence !== mandateSequence) return;
    while (paused && sequence === mandateSequence) await waitForPace();
    if (sequence !== mandateSequence) return;
    if (revealAll || Number(speedControl.value) === 0) {
      discloseLines(String(index + 1), lines2.slice(index));
      output.append(document.createTextNode(`${lines2.slice(index).join("\n")}
`));
      followLatest();
      setText("output-count", `${lines2.length} ${lines2.length === 1 ? "line" : "lines"}`);
      break;
    }
    output.append(document.createTextNode(`${lines2[index]}
`));
    discloseLines(String(index + 1), [lines2[index]]);
    followLatest();
    setText("output-count", `${index + 1} of ${lines2.length} lines`);
    if (index < lines2.length - 1) await waitForPace(Number(speedControl.value));
  }
  if (sequence === mandateSequence) {
    setText("output-count", `${lines2.length} ${lines2.length === 1 ? "line" : "lines"}`);
    reading = false;
    readingControls();
    chronicle.finish(lines2.length === 0);
    setText("run-status", `Mandate complete. The service answered in ${serviceMillis} milliseconds; ${serviceMillis < 1e3 ? "under" : "above"} the one-second target. All ${lines2.length} lines are visible.`);
  }
}
async function streamMandate(limit, sequence, started) {
  let next = typeof limit === "bigint" ? 1n : 1;
  let disclosed = typeof limit === "bigint" ? 0n : 0;
  let first = true;
  streaming = true;
  reading = true;
  paused = false;
  revealAll = false;
  readingControls();
  const output = byId("output");
  output.textContent = "";
  function append(lines2) {
    discloseLines(String(addOrdinals(disclosed, 1)), lines2);
    const top = output.scrollTop;
    const height = parseFloat(getComputedStyle(output).lineHeight) || 20;
    const fragment = document.createDocumentFragment();
    for (const line of lines2) fragment.append(document.createTextNode(line + "\n"));
    output.append(fragment);
    let removed = 0;
    while (output.childNodes.length > 1e3) {
      output.firstChild.remove();
      removed++;
    }
    if (followOutput.checked) followLatest();
    else output.scrollTop = Math.max(0, top - removed * height);
    disclosed = addOrdinals(disclosed, lines2.length);
    setText("output-count", `${disclosed} of ${limit} lines \xB7 latest ${Math.min(1e3, output.childNodes.length)} retained`);
  }
  while (sequence === mandateSequence) {
    while (paused && sequence === mandateSequence) await waitForPace();
    if (sequence !== mandateSequence) return;
    const count = windowCount(next, limit);
    const answer = await proclamation(`/fizzbuzz/window?start=${next}&count=${count}`);
    const packet = await readProclamation(answer);
    const text2 = packet.text;
    const lines2 = answer.ok ? text2.trimEnd().split("\n") : [];
    if (answer.ok && lines2.length !== count) throw new Error("The response did not contain the authorized number of lines.");
    if (sequence !== mandateSequence) return;
    chronicle.receive(packet);
    setText("trace-result", answer.headers.get("X-SlopBuzz-Trace-Id") || "UNAVAILABLE");
    if (first) {
      first = false;
      const elapsed = Math.round(performance.now() - started);
      setText("latency", `${elapsed} ms \xB7 first batch`);
      setText("cache-result", "BYPASS");
      runButton.removeAttribute("aria-disabled");
      output.removeAttribute("aria-busy");
      if (answer.ok) trackUsage({ event: "slopbuzz_demo_run", outcome: "success", runtime_mode: config.mode, duration_ms: elapsed, cache_outcome: "BYPASS" });
      const record = personnel.responseRecord(answer);
      if (record) {
        personnel.prepare(record);
        personnel.disclose(7);
      }
      if (sequence !== mandateSequence) return;
    }
    if (!answer.ok) throw new Error(`Extended proclamation desk returned ${answer.status}.`);
    for (let i = 0; i < lines2.length; ) {
      while (paused && sequence === mandateSequence) await waitForPace();
      if (sequence !== mandateSequence) return;
      if (revealAll || Number(speedControl.value) === 0) {
        append(lines2.slice(i));
        i = lines2.length;
      } else {
        append([lines2[i++]]);
        if (disclosed !== limit) await waitForPace(Number(speedControl.value));
      }
    }
    if (disclosed === limit) break;
    next = addOrdinals(next, count);
    setText("run-status", `Extended proceedings in progress. ${disclosed} lines disclosed; use Stop proceedings to adjourn.`);
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  if (sequence === mandateSequence) {
    reading = false;
    streaming = false;
    readingControls();
    chronicle.finish();
    setText("run-status", `Mandate complete. ${disclosed} lines disclosed; the latest ${output.childNodes.length} remain visible. Extended proceedings are transient.`);
  }
}
async function runMandate(event) {
  event.preventDefault();
  if (runButton.getAttribute("aria-disabled") === "true") return;
  const limit = validateLimit();
  if (limit === null) return;
  const sequence = ++mandateSequence;
  companions.reset(String(limit));
  wakeReading?.();
  reading = false;
  streaming = false;
  activityMode = "mandate";
  manualStep = false;
  inspection = void 0;
  lastPlayback = void 0;
  currentLimit = String(limit);
  readingControls();
  personnel.setPlaybackAvailable(false);
  personnel.loading();
  chronicle.begin(currentLimit);
  runButton.setAttribute("aria-disabled", "true");
  precedent.waiting(typeof limit === "bigint" || limit > 1e3);
  byId("output").setAttribute("aria-busy", "true");
  setText("run-status", `The committee is considering ${limit} numbers\u2026`);
  setText("trace-result", "Awaiting a receipt");
  byId("output").textContent = "Awaiting a duly authorized number.";
  setText("output-count", "0 lines");
  if (matchMedia("(max-width: 900px)").matches) {
    byId("output").focus({ preventScroll: true });
    byId("mandate-output").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  }
  void loadForecast(limit, sequence).catch(() => {
    if (sequence === mandateSequence) setText("forecast-units", "Unavailable");
  });
  const started = performance.now();
  try {
    if (typeof limit === "bigint" || limit > 1e3) {
      await streamMandate(limit, sequence, started);
      return;
    }
    const answer = await proclamation(`/fizzbuzz?limit=${limit}`);
    const elapsed = performance.now() - started;
    const packet = await readProclamation(answer);
    const text2 = packet.text;
    if (answer.ok) trackUsage({ event: "slopbuzz_demo_run", outcome: "success", runtime_mode: config.mode, duration_ms: elapsed, cache_outcome: answer.headers.get("X-SlopBuzz-Cache") || "UNKNOWN" });
    if (sequence !== mandateSequence) return;
    chronicle.receive(packet);
    precedent.mandate(packet.precedent, packet.cache);
    setText("latency", `${Math.round(elapsed)} ms`);
    setText("cache-result", answer.headers.get("X-SlopBuzz-Cache") || "UNKNOWN");
    setText("trace-result", answer.headers.get("X-SlopBuzz-Trace-Id") || "UNAVAILABLE");
    runButton.removeAttribute("aria-disabled");
    byId("output").removeAttribute("aria-busy");
    reading = true;
    paused = false;
    revealAll = false;
    readingControls();
    const record = personnel.responseRecord(answer);
    if (record) {
      personnel.prepare(record);
      personnel.disclose(7);
    }
    lastPlayback = { kind: "mandate", folios: [], limit: currentLimit, personnel: record };
    personnel.setPlaybackAvailable(true);
    if (sequence !== mandateSequence) return;
    if (!answer.ok) throw new Error(`Proclamation desk returned ${answer.status}.`);
    await revealOutput(text2, sequence, Math.round(elapsed));
  } catch (error) {
    trackUsage({ event: "slopbuzz_demo_run", outcome: "failure", runtime_mode: config.mode, duration_ms: performance.now() - started });
    if (sequence === mandateSequence) {
      reading = false;
      streaming = false;
      readingControls();
      personnel.setBusy(false);
      if (!personnel.record) personnel.clear("The request failed before any personnel record could be inspected.", "Evidence unavailable");
      chronicle.note(`The operation could not complete: ${error.message}. No automatic second mandate was submitted.`, "Exception management");
      setText("run-status", error.name === "AbortError" ? "The desk did not answer within eight seconds. Please try again." : `The mandate could not be completed: ${error.message}`);
    }
  } finally {
    if (sequence === mandateSequence) {
      runButton.removeAttribute("aria-disabled");
      byId("output").removeAttribute("aria-busy");
    }
  }
}
function personnelClock(sequence) {
  return {
    current: () => sequence === mandateSequence,
    waitWhilePaused: async () => {
      while (paused && sequence === mandateSequence) await waitForPace();
    },
    delay: async () => {
      if (!revealAll && Number(speedControl.value) > 0 && sequence === mandateSequence) await waitForPace(Number(speedControl.value));
    }
  };
}
function beginPersonnelActivity(mode) {
  const sequence = ++mandateSequence;
  wakeReading?.();
  activityMode = mode;
  manualStep = mode === "inspection";
  reading = mode !== "inspection";
  streaming = false;
  paused = false;
  revealAll = false;
  runButton.removeAttribute("aria-disabled");
  byId("output").removeAttribute("aria-busy");
  readingControls();
  return sequence;
}
async function rehearsePersonnel(scenario) {
  const sequence = beginPersonnelActivity("rehearsal");
  personnel.loading();
  setText("run-status", "Opening a read-only personnel rehearsal. Numerical output already shown is retained.");
  try {
    const response = await request(`/onboarding/rehearsal?scenario=${scenario}`);
    if (!response.ok) throw new Error(`Personnel desk returned ${response.status}.`);
    const data = personnel.rehearsalRecord(await response.json());
    if (sequence !== mandateSequence) return;
    lastPlayback = { kind: "rehearsal", data };
    personnel.setPlaybackAvailable(true);
    await personnel.read(data, personnelClock(sequence));
    if (sequence !== mandateSequence) return;
    setText("run-status", `Personnel rehearsal ${data.status === "APPROVED" ? "approved" : "rejected"}. No numerical output was requested by this rehearsal.`);
  } catch (error) {
    if (sequence === mandateSequence) {
      personnel.clear("The personnel rehearsal could not be opened.");
      setText("run-status", `Personnel rehearsal could not be completed: ${error.message}`);
    }
  } finally {
    if (sequence === mandateSequence) {
      reading = false;
      personnel.setBusy(false);
      readingControls();
    }
  }
}
async function replayPersonnel() {
  const saved = lastPlayback;
  if (!saved) return;
  const sequence = beginPersonnelActivity("replay");
  if (saved.kind === "rehearsal") {
    setText("run-status", "Replaying recorded personnel proceedings. Numerical output is retained.");
    await personnel.read(saved.data, personnelClock(sequence), "Replay of read-only rehearsal");
    if (sequence === mandateSequence) {
      reading = false;
      readingControls();
      setText("run-status", "Personnel replay complete. The recorded business operation was not executed again.");
    }
    return;
  }
  companions.reset(saved.limit);
  chronicle.begin(saved.limit, "replay");
  setText("run-status", "Replaying the retained numerical output and its corporate minutes. No mandate was submitted.");
  const output = byId("output");
  output.textContent = "";
  for (let i = 0; i < saved.folios.length; ) {
    while (paused && sequence === mandateSequence) await waitForPace();
    if (sequence !== mandateSequence) return;
    const batch = revealAll || Number(speedControl.value) === 0 ? saved.folios.slice(i) : saved.folios.slice(i, i + 1);
    for (const folio of batch) companions.disclose(folio.ordinal, [folio.text]);
    chronicle.discloseFolios(batch);
    output.append(document.createTextNode(batch.map((f) => f.text + "\n").join("")));
    i += batch.length;
    followLatest();
    setText("output-count", i + " of " + saved.folios.length + " retained lines");
    if (i < saved.folios.length && !revealAll && Number(speedControl.value) > 0) await waitForPace(Number(speedControl.value));
  }
  if (sequence === mandateSequence) {
    if (!saved.folios.length) output.textContent = "The zero-number mandate produces no lines.";
    chronicle.finish(saved.limit === "0");
    reading = false;
    readingControls();
    setText("run-status", "Execution replay complete. No business operation was executed again.");
  }
}
function stepPersonnel() {
  const saved = lastPlayback;
  if (!saved) return;
  if (saved.kind === "rehearsal") {
    if (!manualStep || personnel.progress === 7) {
      beginPersonnelActivity("inspection");
      personnel.startStepThrough();
    }
    personnel.step();
    setText("run-status", "Inspecting recorded personnel paperwork: " + personnel.progress + " of 7 offices disclosed. Numerical output is retained.");
    return;
  }
  if (!manualStep || !inspection || inspection.index >= inspection.folios.length) {
    beginPersonnelActivity("inspection");
    inspection = { folios: saved.folios, index: 0 };
    chronicle.begin(saved.limit, "replay");
  }
  const folio = inspection.folios[inspection.index++];
  if (folio) chronicle.discloseFolios([folio]);
  else chronicle.finish(saved.limit === "0");
  setText("personnel-step", inspection.index < inspection.folios.length ? "Next ordinal" : "Step through");
  setText("run-status", "Inspecting completed execution: " + Math.min(inspection.index, inspection.folios.length) + " of " + inspection.folios.length + " retained ordinals. Numerical output is retained.");
}
runForm.addEventListener("submit", runMandate);
document.querySelectorAll("[data-limit]").forEach((button) => {
  button.addEventListener("click", () => {
    limitInput.value = button.dataset.limit || "15";
    runForm.requestSubmit();
  });
});
void loadForecast(15).catch(() => setText("forecast-units", "Unavailable"));
void request("/healthz").then((reply) => setText("health-value", reply.ok ? "LIVE" : "UNAVAILABLE")).catch(() => setText("health-value", "UNAVAILABLE"));
prepareSharedEncounter(limitInput);
