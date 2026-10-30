// Generated from web/*.ts by scripts/build.ts. Do not edit.

// web/mandate-input.ts
function parseMandate(raw) {
  const text = raw.trim();
  if (!/^[0-9]+$/.test(text)) return null;
  const ordinary = Number(text);
  return Number.isSafeInteger(ordinary) ? ordinary : BigInt(text);
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

// web/telemetry.ts
function trackUsage(detail) {
  window.dispatchEvent(new CustomEvent("slopbuzz:usage", { detail }));
}

// web/runtime-protocol.ts
var runtimeProtocol = 1;
function isTransientOperation(path, method = "GET") {
  return method === "GET" && ["/fizzbuzz/window", "/capacity/forecast/extended", "/procurement/dossier"].includes(path.split("?")[0]);
}

// web/runtime.ts
var scope = new URL("../", import.meta.url).href;
var config = await fetch(new URL("runtime-config.json", scope), { cache: "no-cache" }).then((r) => {
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
  request(path, options = {}) {
    return fetch(`${(config.apiBaseUrl || "").replace(/\/$/, "")}${path}`, { ...options, cache: "no-store" });
  }
};
if (!["browser", "server"].includes(config.mode)) throw new Error("Unrecognized runtime mode");
var runtime = config.mode === "server" ? new ServerRuntimeClient() : new BrowserRuntimeClient();
var request = (path, options) => path === "/openapi.json" && (!options?.method || options.method === "GET") ? fetch(new URL("openapi.json", scope)) : runtime.request(path, options);
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

// web/site.ts
var byId = (id) => {
  const node = document.getElementById(id);
  if (!node) throw new Error(`Missing element ${id}`);
  return node;
};
var runForm = byId("run-form");
var limitInput = byId("limit");
var speedControl = byId("display-speed");
var runButton = byId("run-button");
var refreshButton = byId("refresh-button");
var canaryButton = byId("canary-button");
var recoveryButton = byId("recovery-button");
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
function readingControls() {
  stopButton.setAttribute("aria-disabled", String(!reading));
  revealButton.textContent = streaming ? "Waive disclosure delays" : "Reveal complete output";
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
function setText(id, value) {
  byId(id).textContent = String(value);
}
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
async function revealOutput(text, sequence, serviceMillis) {
  reading = true;
  paused = false;
  revealAll = false;
  readingControls();
  const lines = text ? text.trimEnd().split(/\r?\n/) : [];
  const output = byId("output");
  output.textContent = lines.length ? "" : "The zero-number mandate produces no lines.";
  setText("output-count", `0 of ${lines.length} lines`);
  setText("run-status", `Service answered in ${serviceMillis} milliseconds. The ceremonial reading is in progress.`);
  for (let index = 0; index < lines.length; index++) {
    if (sequence !== mandateSequence) return;
    while (paused && sequence === mandateSequence) await waitForPace();
    if (sequence !== mandateSequence) return;
    if (revealAll || Number(speedControl.value) === 0) {
      output.append(document.createTextNode(`${lines.slice(index).join("\n")}
`));
      followLatest();
      setText("output-count", `${lines.length} ${lines.length === 1 ? "line" : "lines"}`);
      break;
    }
    output.append(document.createTextNode(`${lines[index]}
`));
    followLatest();
    setText("output-count", `${index + 1} of ${lines.length} lines`);
    if (index < lines.length - 1) await waitForPace(Number(speedControl.value));
  }
  if (sequence === mandateSequence) {
    setText("output-count", `${lines.length} ${lines.length === 1 ? "line" : "lines"}`);
    reading = false;
    readingControls();
    setText("run-status", `Mandate complete. The service answered in ${serviceMillis} milliseconds; ${serviceMillis < 1e3 ? "under" : "above"} the one-second target. All ${lines.length} lines are visible.`);
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
  function append(lines) {
    const top = output.scrollTop;
    const height = parseFloat(getComputedStyle(output).lineHeight) || 20;
    const fragment = document.createDocumentFragment();
    for (const line of lines) fragment.append(document.createTextNode(line + "\n"));
    output.append(fragment);
    let removed = 0;
    while (output.childNodes.length > 1e3) {
      output.firstChild.remove();
      removed++;
    }
    if (followOutput.checked) followLatest();
    else output.scrollTop = Math.max(0, top - removed * height);
    disclosed = addOrdinals(disclosed, lines.length);
    setText("output-count", `${disclosed} of ${limit} lines \xB7 latest ${Math.min(1e3, output.childNodes.length)} retained`);
  }
  while (sequence === mandateSequence) {
    while (paused && sequence === mandateSequence) await waitForPace();
    if (sequence !== mandateSequence) return;
    const count = windowCount(next, limit);
    const answer = await request(`/fizzbuzz/window?start=${next}&count=${count}`);
    if (!answer.ok) throw new Error(`Extended proclamation desk returned ${answer.status}.`);
    const lines = (await answer.text()).trimEnd().split("\n");
    if (lines.length !== count) throw new Error("The response did not contain the authorized number of lines.");
    if (sequence !== mandateSequence) return;
    if (first) {
      first = false;
      const elapsed = Math.round(performance.now() - started);
      setText("latency", `${elapsed} ms \xB7 first batch`);
      setText("cache-result", "BYPASS");
      runButton.removeAttribute("aria-disabled");
      output.removeAttribute("aria-busy");
      trackUsage({ event: "slopbuzz_demo_run", outcome: "success", runtime_mode: config.mode, duration_ms: elapsed, cache_outcome: "BYPASS" });
    }
    setText("trace-result", answer.headers.get("X-SlopBuzz-Trace-Id") || "UNAVAILABLE");
    for (let i = 0; i < lines.length; ) {
      while (paused && sequence === mandateSequence) await waitForPace();
      if (sequence !== mandateSequence) return;
      if (revealAll || Number(speedControl.value) === 0) {
        append(lines.slice(i));
        i = lines.length;
      } else {
        append([lines[i++]]);
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
    setText("run-status", `Mandate complete. ${disclosed} lines disclosed; the latest ${output.childNodes.length} remain visible. Extended proceedings are transient.`);
  }
}
async function runMandate(event) {
  event.preventDefault();
  if (runButton.getAttribute("aria-disabled") === "true") return;
  const limit = validateLimit();
  if (limit === null) return;
  const sequence = ++mandateSequence;
  wakeReading?.();
  reading = false;
  streaming = false;
  readingControls();
  runButton.setAttribute("aria-disabled", "true");
  byId("output").setAttribute("aria-busy", "true");
  setText("run-status", `The committee is considering ${limit} numbers\u2026`);
  setText("trace-result", "Awaiting a receipt");
  byId("output").textContent = "Awaiting a duly authorized number.";
  setText("output-count", "0 lines");
  void loadForecast(limit, sequence).catch(() => {
    if (sequence === mandateSequence) setText("forecast-units", "Unavailable");
  });
  const started = performance.now();
  try {
    if (typeof limit === "bigint" || limit > 1e3) {
      await streamMandate(limit, sequence, started);
      return;
    }
    const answer = await request(`/fizzbuzz?limit=${limit}`);
    const elapsed = performance.now() - started;
    if (!answer.ok) throw new Error(`Proclamation desk returned ${answer.status}.`);
    const text = await answer.text();
    trackUsage({ event: "slopbuzz_demo_run", outcome: "success", runtime_mode: config.mode, duration_ms: elapsed, cache_outcome: answer.headers.get("X-SlopBuzz-Cache") || "UNKNOWN" });
    if (sequence !== mandateSequence) return;
    setText("latency", `${Math.round(elapsed)} ms`);
    setText("cache-result", answer.headers.get("X-SlopBuzz-Cache") || "UNKNOWN");
    setText("trace-result", answer.headers.get("X-SlopBuzz-Trace-Id") || "UNAVAILABLE");
    runButton.removeAttribute("aria-disabled");
    void refreshOperations();
    byId("output").removeAttribute("aria-busy");
    await revealOutput(text, sequence, Math.round(elapsed));
  } catch (error) {
    trackUsage({ event: "slopbuzz_demo_run", outcome: "failure", runtime_mode: config.mode, duration_ms: performance.now() - started });
    if (sequence === mandateSequence) {
      reading = false;
      streaming = false;
      readingControls();
      setText("run-status", error.name === "AbortError" ? "The desk did not answer within eight seconds. Please try again." : `The mandate could not be completed: ${error.message}`);
    }
  } finally {
    if (sequence === mandateSequence) {
      runButton.removeAttribute("aria-disabled");
      byId("output").removeAttribute("aria-busy");
    }
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
runForm.addEventListener("submit", runMandate);
refreshButton.addEventListener("click", refreshOperations);
canaryButton.addEventListener("click", runCanary);
recoveryButton.addEventListener("click", runRecovery);
document.querySelectorAll("[data-limit]").forEach((button) => {
  button.addEventListener("click", () => {
    limitInput.value = button.dataset.limit || "15";
    runForm.requestSubmit();
  });
});
void loadForecast(15).catch(() => setText("operations-status", "Forecast desk is temporarily unavailable."));
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
