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
  return method === "GET" && ["/fizzbuzz/window", "/capacity/forecast/extended", "/procurement/dossier", "/onboarding/rehearsal"].includes(path.split("?")[0]);
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

// web/onboarding.ts
function parseDossier(value) {
  const data = value;
  if (!data || data.schema !== "slopbuzz-onboarding/v1" || typeof data.caseId !== "string" || !["MANDATE", "REHEARSAL"].includes(data.purpose) || !Number.isInteger(data.candidate) || !["APPROVED", "REJECTED"].includes(data.status) || !Array.isArray(data.steps) || data.steps.length !== 7 || data.steps.some((step) => !step || !["APPROVED", "REJECTED", "NOT_REACHED"].includes(step.state) || ["office", "rule", "received", "finding", "document"].some((key) => typeof step[key] !== "string"))) throw new Error("The personnel record has an unsupported format.");
  if (data.status === "APPROVED" && (data.candidate !== 1 || data.startingOrdinal !== 1 || data.steps.some((step) => step.state !== "APPROVED")) || data.status === "REJECTED" && (data.startingOrdinal !== null || !data.steps.some((step) => step.state === "REJECTED"))) throw new Error("The personnel verdict contradicts its recorded decisions.");
  return data;
}
var PersonnelProceedings = class {
  dossier;
  visible = 0;
  rows = [];
  source = "";
  busy = false;
  synchronizeDisclosure() {
    const open = this.rows.length > 0 && this.rows.every((row) => row.details.open);
    byId("personnel-documents").setAttribute("aria-expanded", String(open));
    setText("personnel-documents", open ? "Fold paperwork" : "Inspect paperwork");
  }
  constructor(actions) {
    document.querySelectorAll("[data-personnel-scenario]").forEach((button) => button.addEventListener("click", () => {
      if (button.getAttribute("aria-disabled") !== "true") actions.rehearse(button.dataset.personnelScenario);
    }));
    byId("personnel-replay").addEventListener("click", () => {
      if (this.dossier && !this.busy) actions.replay();
    });
    byId("personnel-step").addEventListener("click", () => {
      if (this.dossier && !this.busy) actions.step();
    });
    byId("personnel-documents").addEventListener("click", () => {
      if (!this.dossier || this.busy) return;
      const open = byId("personnel-documents").getAttribute("aria-expanded") !== "true";
      this.rows.forEach((row) => row.details.open = open);
      byId("personnel-documents").setAttribute("aria-expanded", String(open));
      byId("personnel-documents").textContent = open ? "Fold paperwork" : "Inspect paperwork";
    });
    this.updateControls();
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
    for (const id of ["personnel-replay", "personnel-step", "personnel-documents"]) byId(id).setAttribute("aria-disabled", String(!this.dossier || this.busy));
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
    byId("personnel-documents").setAttribute("aria-expanded", "false");
    byId("personnel-documents").textContent = "Inspect paperwork";
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
      this.clear("No personnel record accompanied this response. Submit a rehearsal to inspect the current personnel procedure.", "Evidence unavailable");
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
    byId("personnel-documents").setAttribute("aria-expanded", "false");
    setText("personnel-documents", "Inspect paperwork");
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
      for (const [label, text] of [["Rule", step.rule], ["Received", step.received], ["Recorded decision", step.state === "APPROVED" ? "Approved" : step.state === "REJECTED" ? "Rejected" : "Not reached"], ["Finding", step.finding], ["Issued document", step.document]]) {
        const row = document.createElement("div"), term = document.createElement("dt"), value = document.createElement("dd");
        term.textContent = label;
        value.textContent = text;
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
var personnel = new PersonnelProceedings({ rehearse: (scenario) => void rehearsePersonnel(scenario), replay: () => void replayPersonnel(), step: stepPersonnel });
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
    const text = await answer.text();
    const lines = answer.ok ? text.trimEnd().split("\n") : [];
    if (answer.ok && lines.length !== count) throw new Error("The response did not contain the authorized number of lines.");
    if (sequence !== mandateSequence) return;
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
        setText("run-status", `Service answered in ${elapsed} milliseconds. Reading completed personnel proceedings\u2026`);
        await personnel.read(record, personnelClock(sequence));
      }
      if (sequence !== mandateSequence) return;
    }
    if (!answer.ok) throw new Error(`Extended proclamation desk returned ${answer.status}.`);
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
  activityMode = "mandate";
  manualStep = false;
  readingControls();
  personnel.loading();
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
    const text = await answer.text();
    if (answer.ok) trackUsage({ event: "slopbuzz_demo_run", outcome: "success", runtime_mode: config.mode, duration_ms: elapsed, cache_outcome: answer.headers.get("X-SlopBuzz-Cache") || "UNKNOWN" });
    if (sequence !== mandateSequence) return;
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
      setText("run-status", `Service answered in ${Math.round(elapsed)} milliseconds. Reading completed personnel proceedings\u2026`);
      await personnel.read(record, personnelClock(sequence));
    }
    if (sequence !== mandateSequence) return;
    if (!answer.ok) throw new Error(`Proclamation desk returned ${answer.status}.`);
    await revealOutput(text, sequence, Math.round(elapsed));
  } catch (error) {
    trackUsage({ event: "slopbuzz_demo_run", outcome: "failure", runtime_mode: config.mode, duration_ms: performance.now() - started });
    if (sequence === mandateSequence) {
      reading = false;
      streaming = false;
      readingControls();
      personnel.setBusy(false);
      if (!personnel.record) personnel.clear("The request failed before any personnel record could be inspected.", "Evidence unavailable");
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
  const record = personnel.record;
  if (!record) return;
  const sequence = beginPersonnelActivity("replay");
  setText("run-status", "Replaying recorded personnel proceedings. Numerical output is retained.");
  await personnel.read(record, personnelClock(sequence), `Replay of ${record.purpose === "REHEARSAL" ? "read-only rehearsal" : "mandate record"}`);
  if (sequence === mandateSequence) {
    reading = false;
    readingControls();
    setText("run-status", "Personnel replay complete. The recorded business operation was not executed again.");
  }
}
function stepPersonnel() {
  if (!personnel.record) return;
  if (!manualStep || personnel.progress === 7) {
    beginPersonnelActivity("inspection");
    personnel.startStepThrough();
  }
  personnel.step();
  setText("run-status", `Inspecting recorded personnel paperwork: ${personnel.progress} of 7 offices disclosed. Numerical output is retained.`);
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
