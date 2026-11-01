// Generated from web/*.ts by scripts/build.ts. Do not edit.

// web/runtime-protocol.ts
var runtimeProtocol = 1;
function isTransientOperation(path, method = "GET") {
  return method === "GET" && ["/operations/runtime", "/fizzbuzz/window", "/fizzbuzz/window/explained", "/capacity/forecast/extended", "/procurement/dossier", "/onboarding/rehearsal"].includes(path.split("?")[0]);
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
var request = (path, options) => path === "/openapi.json" && (!options?.method || options.method === "GET") ? fetch(releaseFile("openapi.json")) : runtime.request(path, options);
if ("serviceWorker" in navigator && config.mode === "browser") {
  void navigator.serviceWorker.register(new URL("sw.js", scope), { scope: new URL(scope).pathname }).catch((error) => console.warn("Offline installation unavailable", error));
}
var desks = /^\/(?:fizzbuzz|onboarding\/rehearsal|procurement\/dossier|capacity\/forecast|healthz|readyz|cache\/status|operations\/|audit\/)/;
if (config.mode === "browser") document.querySelectorAll("a[href]").forEach((link) => {
  const url = new URL(link.href);
  const base = new URL(scope).pathname.replace(/\/$/, "");
  const path = url.pathname.slice(base.length) + url.search;
  if (url.origin !== location.origin || !desks.test(path)) return;
  link.href = new URL(`response/?path=${encodeURIComponent(path)}`, scope).href;
});

// web/dom.ts
var byId = (id) => {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Missing element ${id}`);
  return node;
};
function setText(id, value) {
  byId(id).textContent = String(value);
}

// web/site.ts
var refreshButton = byId("refresh-button");
var canaryButton = byId("canary-button");
var recoveryButton = byId("recovery-button");
function showCanary(verdict, disposition = "STATUS") {
  const label = verdict.state === "PASSED" ? "APPROVED" : verdict.state === "FAILED" ? "REJECTED" : "NOT YET CONVENED";
  setCard("canary-value", label, verdict.state === "PASSED");
  if (verdict.state !== "NOT_RUN") {
    const leaseNote = disposition === "REUSED" ? " Prior ruling reused during the fifteen-second lease." : disposition === "EXECUTED" ? " New rehearsal completed." : "";
    setText("canary-status", `Rehearsal ${verdict.sequence}: ${verdict.finding.replaceAll("_", " ").toLowerCase()}; ${verdict.observedLines} lines observed in ${Math.round(verdict.durationMicros / 1e3)} milliseconds. Audit chain ${verdict.auditChainValid ? "valid" : "invalid"}.${leaseNote}`);
  }
}
async function runCanary() {
  if (canaryButton.getAttribute("aria-disabled") === "true") return;
  canaryButton.setAttribute("aria-disabled", "true");
  byId("canary-value").setAttribute("aria-busy", "true");
  setText("canary-status", "The assurance bureau is rehearsing the fifteen-number charter\u2026");
  try {
    const reply = await request("/operations/canary", { method: "POST" });
    const verdict = await reply.json();
    await refreshOperations();
    showCanary(verdict, reply.headers.get("X-SlopBuzz-Rehearsal") || "STATUS");
  } catch (error) {
    setText("canary-status", `The rehearsal could not be completed: ${error.message}`);
  } finally {
    canaryButton.removeAttribute("aria-disabled");
    byId("canary-value").removeAttribute("aria-busy");
  }
}
function showRecovery(verdict) {
  const label = verdict.state === "PASSED" ? "COPY MATCHED" : verdict.state === "FAILED" ? "REVIEW REQUIRED" : "NOT YET CONVENED";
  setCard("recovery-value", label, verdict.state === "PASSED");
  if (verdict.state !== "NOT_RUN") {
    const medium = verdict.durable ? "durable repository" : "process-local store";
    setText("recovery-status", `Drill ${verdict.sequence}: ${verdict.finding.replaceAll("_", " ").toLowerCase()}; ${verdict.storedEntries} entries in the ${medium}, reviewed in ${Math.round(verdict.durationMicros / 1e3)} milliseconds.`);
  }
}
async function runRecovery() {
  if (recoveryButton.getAttribute("aria-disabled") === "true") return;
  recoveryButton.setAttribute("aria-disabled", "true");
  byId("recovery-value").setAttribute("aria-busy", "true");
  setText("recovery-status", "The bureau is reopening and comparing institutional memory\u2026");
  try {
    const reply = await request("/operations/recovery", { method: "POST" });
    showRecovery(await reply.json());
  } catch (error) {
    setText("recovery-status", `The recovery rehearsal could not be completed: ${error.message}`);
  } finally {
    recoveryButton.removeAttribute("aria-disabled");
    byId("recovery-value").removeAttribute("aria-busy");
  }
}
function parseLines(body) {
  return Object.fromEntries(body.trim().split(/\r?\n/).map((line) => {
    const split = line.indexOf("=");
    return [line.slice(0, split), line.slice(split + 1)];
  }));
}
function setCard(id, text, healthy) {
  const element = byId(id);
  element.textContent = text;
  element.classList.remove("status-good", "status-warn");
  element.classList.add(healthy ? "status-good" : "status-warn");
}
async function refreshOperations() {
  if (refreshButton.getAttribute("aria-disabled") === "true") return;
  refreshButton.setAttribute("aria-disabled", "true");
  setText("operations-status", "Refreshing the current institutional record\u2026");
  const paths = ["/healthz", "/readyz", "/cache/status", "/operations/scorecard", "/audit/status", "/operations/canary", "/operations/release", "/operations/recovery"];
  const results = await Promise.allSettled(paths.map((path) => request(path)));
  let available = 0;
  try {
    const health = results[0].status === "fulfilled" ? results[0].value : null;
    if (health?.ok) {
      setCard("health-value", "LIVE", true);
      available++;
    } else setCard("health-value", "UNAVAILABLE", false);
    const readiness = results[1].status === "fulfilled" ? results[1].value : null;
    if (readiness) {
      const ballot = parseLines(await readiness.text());
      setCard("readiness-value", ballot.ready === "true" ? "APPROVED" : "VETOED", ballot.ready === "true");
      available++;
    } else setCard("readiness-value", "UNAVAILABLE", false);
    const cache = results[2].status === "fulfilled" ? results[2].value : null;
    if (cache?.ok) {
      const report = await cache.json();
      const cacheSummary = report.enabled ? `${report.hits} hits \xB7 ${report.misses} misses${report.errors ? ` \xB7 ${report.errors} errors` : ""}` : "NOT CONFIGURED";
      setCard("cache-value", cacheSummary, report.enabled && report.errors === 0);
      available++;
    } else setCard("cache-value", "UNAVAILABLE", false);
    const scorecard = results[3].status === "fulfilled" ? results[3].value : null;
    if (scorecard?.ok) {
      const report = await scorecard.json();
      setCard("scorecard-value", `${report.successful} served \xB7 ${report.rejected} rejected`, true);
      available++;
    } else setCard("scorecard-value", "UNAVAILABLE", false);
    const audit = results[4].status === "fulfilled" ? results[4].value : null;
    if (audit?.ok) {
      const report = parseLines(await audit.text());
      setText("audit-committed", report.committed ?? "\u2014");
      setText("audit-pending", report.pending ?? "\u2014");
      setText("audit-dead", report.deadLetters ?? "\u2014");
      setText("audit-chain", report.chainValid === "true" ? "YES" : "NO");
      available++;
    }
    const canary = results[5].status === "fulfilled" ? results[5].value : null;
    if (canary) {
      showCanary(await canary.json());
      available++;
    } else setCard("canary-value", "UNAVAILABLE", false);
    const release = results[6].status === "fulfilled" ? results[6].value : null;
    if (release?.ok) {
      const report = await release.json();
      setCard("release-value", report.revision === "unknown" ? "UNIDENTIFIED" : report.revision.slice(0, 12), report.revision !== "unknown");
      available++;
    } else setCard("release-value", "UNAVAILABLE", false);
    const recovery = results[7].status === "fulfilled" ? results[7].value : null;
    if (recovery) {
      showRecovery(await recovery.json());
      available++;
    } else setCard("recovery-value", "UNAVAILABLE", false);
    let evidence = null;
    try {
      evidence = await request("/audit/evidence");
    } catch (_) {
    }
    if (evidence?.ok) {
      const report = await evidence.json();
      setText("control-aud", report.controls["AUD-001"]);
      setText("control-msg", report.controls["MSG-001"]);
      setText("control-iso", report.controls["ISO-9000"]);
      setText("control-soc", report.controls["SOC-2"]);
      setText("evidence-json", JSON.stringify(report, null, 2));
      available++;
    } else setText("evidence-json", "Evidence is temporarily unavailable.");
    setText("operations-status", `${available} of 9 institutional desks reported. Last checked ${(/* @__PURE__ */ new Date()).toLocaleTimeString()}.`);
  } catch (error) {
    setText("operations-status", `The operations review was interrupted: ${error.message}`);
  } finally {
    refreshButton.removeAttribute("aria-disabled");
  }
}
refreshButton.addEventListener("click", refreshOperations);
canaryButton.addEventListener("click", runCanary);
recoveryButton.addEventListener("click", runRecovery);
void refreshOperations();
var procurementForm = byId("procurement-form");
var procurementButton = byId("procurement-button");
procurementForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (procurementButton.getAttribute("aria-disabled") === "true") return;
  procurementButton.setAttribute("aria-disabled", "true");
  byId("procurement-results").setAttribute("aria-busy", "true");
  byId("procurement-results").hidden = true;
  setText("procurement-status", "Receiving is reconciling each individual commercial obligation\u2026");
  try {
    const product = byId("procurement-product").value;
    const response = await request(`/procurement/dossier?product=${encodeURIComponent(product)}`);
    if (!response.ok) throw new Error(`The purchasing authority returned HTTP ${response.status}.`);
    const dossier = await response.json();
    setText("procurement-summary", `${dossier.text} \xB7 ${dossier.assembly} \xB7 ${dossier.lineItems.length} individually received allocations`);
    const items = dossier.lineItems.map((item) => {
      const li = document.createElement("li");
      const glyph = document.createElement("strong");
      glyph.textContent = item.character;
      const receipt = document.createElement("span");
      receipt.textContent = `${item.sku} \xB7 quantity ${item.quantity} \xB7 ${item.inspection}`;
      li.append(glyph, receipt);
      return li;
    });
    byId("procurement-items").replaceChildren(...items);
    setText("procurement-json", JSON.stringify(dossier, null, 2));
    byId("procurement-results").hidden = false;
    setText("procurement-status", `${dossier.product} certified. ${dossier.lineItems.length} separate line items accepted; no audit transaction committed.`);
  } catch (error) {
    setText("procurement-status", `Procurement inspection could not be completed. ${error.message} You may request another inspection.`);
  } finally {
    procurementButton.removeAttribute("aria-disabled");
    byId("procurement-results").removeAttribute("aria-busy");
  }
});
