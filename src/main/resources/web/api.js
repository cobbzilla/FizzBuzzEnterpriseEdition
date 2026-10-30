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
    return new Promise((resolve2, reject) => {
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
        resolve2(reply);
      });
      send();
    });
  }
  async request(path, options = {}) {
    const owner = await this.owner();
    if (owner.error) throw new Error(owner.error);
    if (owner.revision !== this.configuration.revision) throw new Error("An older release owns the repository. Close other tabs and reload.");
    const id = crypto.randomUUID();
    return new Promise((resolve2, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error("The runtime stopped responding. The outcome is unknown; inspect the audit before resubmitting."));
      }, 12e4);
      this.pending.set(id, (reply) => {
        clearTimeout(timeout);
        this.pending.delete(id);
        if (reply.error) reject(new Error(reply.error));
        else resolve2(new Response(reply.result.body, { status: reply.result.status, headers: reply.result.headers }));
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
var request = (path, options) => path === "/openapi.json" && (!options?.method || options.method === "GET") ? fetch(new URL("openapi.json", scope)) : runtime.request(path, options);
if ("serviceWorker" in navigator && config.mode === "browser") {
  void navigator.serviceWorker.register(new URL("sw.js", scope), { scope: new URL(scope).pathname }).catch((error) => console.warn("Offline installation unavailable", error));
}
var desks = /^\/(?:fizzbuzz|capacity\/forecast|healthz|readyz|cache\/status|operations\/|audit\/)/;
if (config.mode === "browser") document.querySelectorAll("a[href]").forEach((link) => {
  const url = new URL(link.href);
  const base = new URL(scope).pathname.replace(/\/$/, "");
  const path = url.pathname.slice(base.length) + url.search;
  if (url.origin !== location.origin || !desks.test(path)) return;
  link.href = new URL(`response/?path=${encodeURIComponent(path)}`, scope).href;
});

// web/api.ts
var byId = (id) => document.getElementById(id);
var operations = byId("api-operations");
var search = byId("api-search");
var status = byId("api-status");
var sections = byId("api-sections");
var cards = [];
function element(tag, className = "", value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== void 0) node.textContent = String(value);
  return node;
}
function resolve(spec, value) {
  if (!value?.$ref) return value;
  if (!value.$ref.startsWith("#/")) return void 0;
  let node = spec;
  for (const key of value.$ref.slice(2).split("/")) node = node?.[key];
  return node;
}
function table(name, headers, rows) {
  const wrap = element("div", "api-table-wrap");
  wrap.tabIndex = 0;
  wrap.setAttribute("role", "region");
  wrap.setAttribute("aria-label", name);
  const grid = element("table", "api-table");
  const heading = element("thead");
  const headerRow = element("tr");
  headers.forEach((name2) => {
    const th = element("th", "", name2);
    th.scope = "col";
    headerRow.append(th);
  });
  heading.append(headerRow);
  grid.append(heading);
  const body = element("tbody");
  rows.forEach((row) => {
    const line = element("tr");
    row.forEach((value) => line.append(element("td", "", value)));
    body.append(line);
  });
  grid.append(body);
  wrap.append(grid);
  return wrap;
}
function schemaFields(spec, response, name) {
  const content = response.content || {};
  const media = Object.keys(content)[0];
  const schema = resolve(spec, content[media]?.schema);
  if (!schema?.properties) return void 0;
  const detail = element("details", "api-schema-detail");
  detail.append(element("summary", "", `Response fields \xB7 ${media}`));
  const required = new Set(schema.required || []);
  detail.append(table(`${name} response fields`, ["Field", "Type", "Meaning"], Object.entries(schema.properties).map(([name2, field]) => [
    `${name2}${required.has(name2) ? " *" : ""}`,
    field.type || (field.$ref ? "object" : "value"),
    field.description || (field.enum ? field.enum.join(" \xB7 ") : field.const === void 0 ? "\u2014" : String(field.const))
  ])));
  return detail;
}
function tryDesk(path, method, operation) {
  const panel = element("div", "api-try");
  panel.append(element("h4", "", "Live request desk"));
  const hasLimit = (operation.parameters || []).some((parameter) => parameter.$ref?.endsWith("/Limit") || parameter.name === "limit");
  const requestedPath = hasLimit ? `${path}?limit=15` : path;
  const command = method === "post" ? `curl -i -X POST '${config.mode === "server" ? new URL(config.apiBaseUrl || "/", location.origin).href.replace(/\/$/, "") : "http://localhost:18089"}${path}'` : `curl -i '${config.mode === "server" ? new URL(config.apiBaseUrl || "/", location.origin).href.replace(/\/$/, "") : "http://localhost:18089"}${requestedPath}'`;
  panel.append(element("p", "", "Server deployment example (cURL cannot call an in-browser runtime):"));
  panel.append(element("code", "", command));
  const id = `request-${method}-${path.replace(/[^a-z0-9]/gi, "-")}`;
  const controls = element("div", "api-try-controls");
  let input = null;
  if (hasLimit) {
    const label = element("label", "", "Upper limit");
    input = element("input");
    input.id = `${id}-limit`;
    input.setAttribute("aria-describedby", `${id}-status`);
    input.addEventListener("input", () => input.removeAttribute("aria-invalid"));
    input.type = "number";
    input.min = "0";
    input.max = "1000";
    input.step = "1";
    input.value = "15";
    label.append(input);
    controls.append(label);
  }
  const button = element("button", "", method === "post" ? "Send POST request" : "Send GET request");
  button.type = "button";
  button.setAttribute("aria-label", `${button.textContent} to ${path}`);
  button.setAttribute("aria-controls", `${id}-output`);
  controls.append(button);
  panel.append(controls);
  const report = element("p", "api-try-status", method === "post" ? "This explicit action may update process-local state or add audit entries." : "The response comes from the configured runtime.");
  report.id = `${id}-status`;
  report.setAttribute("aria-atomic", "true");
  report.setAttribute("role", "status");
  report.setAttribute("aria-live", "polite");
  panel.append(report);
  const output = element("pre", "api-try-output");
  output.id = `${id}-output`;
  output.hidden = true;
  output.tabIndex = 0;
  output.setAttribute("role", "region");
  output.setAttribute("aria-label", `${method.toUpperCase()} ${path} response`);
  panel.append(output);
  button.addEventListener("click", async () => {
    if (button.getAttribute("aria-disabled") === "true") return;
    if (input && (!/^\d+$/.test(input.value) || Number(input.value) > 1e3)) {
      report.textContent = "Enter a whole number from 0 through 1000.";
      input.setAttribute("aria-invalid", "true");
      input.focus();
      return;
    }
    input?.removeAttribute("aria-invalid");
    const url = input ? `${path}?limit=${input.value}` : path;
    button.setAttribute("aria-disabled", "true");
    report.textContent = "The desk is reviewing your request\u2026";
    const started = performance.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8e3);
    try {
      const reply = await request(url, { method: method.toUpperCase(), cache: "no-store", signal: controller.signal });
      const body = await reply.text();
      const elapsed = Math.round(performance.now() - started);
      const trace = reply.headers.get("X-SlopBuzz-Trace-Id") || "unavailable";
      const span = reply.headers.get("X-SlopBuzz-Span-Id") || "unavailable";
      report.textContent = `HTTP ${reply.status} \xB7 ${elapsed} ms \xB7 ${reply.headers.get("content-type") || "unknown type"} \xB7 receipt ${trace.slice(0, 12)}`;
      const visibleBody = body.length > 16e3 ? `${body.slice(0, 16e3)}
\u2026 response shortened in this view` : body || "(empty body)";
      output.textContent = `X-SlopBuzz-Trace-Id: ${trace}
X-SlopBuzz-Span-Id: ${span}

${visibleBody}`;
      output.hidden = false;
    } catch (error) {
      report.textContent = error.name === "AbortError" ? "The desk did not answer within eight seconds." : `The request failed: ${error.message}`;
    } finally {
      clearTimeout(timer);
      button.removeAttribute("aria-disabled");
    }
  });
  return panel;
}
function renderOperation(spec, path, method, operation, index) {
  const card = element("details", "api-card");
  card.id = `operation-${operation.operationId || index}`;
  const header = element("summary", "api-card-header");
  header.append(element("span", `api-method ${method}`, method.toUpperCase()));
  header.append(element("code", "api-path", path));
  header.append(element("span", "api-summary", operation.summary || path));
  card.append(header);
  const body = element("div", "api-card-body");
  body.append(element("h3", "api-operation-title", `${method.toUpperCase()} ${path}: ${operation.summary || "Operation"}`));
  body.append(element("p", "api-description", operation.description || "No additional guidance."));
  const parameters = (operation.parameters || []).map((parameter) => resolve(spec, parameter)).filter((value) => !!value);
  if (parameters.length) {
    body.append(element("h4", "", "Parameters"));
    body.append(table(`${method.toUpperCase()} ${path} parameters`, ["Name", "Location", "Requirement"], parameters.map((parameter) => [
      parameter.name,
      parameter.in,
      `${parameter.required ? "Required" : "Optional"} \xB7 ${parameter.description || ""}`
    ])));
  }
  body.append(element("h4", "", "Responses"));
  const responses = element("div", "api-responses");
  Object.entries(operation.responses || {}).forEach(([code, responseValue]) => {
    const response = resolve(spec, responseValue);
    const row = element("div", "api-response");
    row.append(element("strong", "", code));
    const description = element("p", "", response.description || "Response");
    const media = Object.keys(response.content || {})[0];
    if (media) description.append(element("small", "", media));
    row.append(description);
    responses.append(row);
    if (response.headers && Object.keys(response.headers).length) {
      const headerDetail = element("details", "api-schema-detail");
      headerDetail.append(element("summary", "", `HTTP ${code} response headers`));
      headerDetail.append(table(`${method.toUpperCase()} ${path} HTTP ${code} headers`, ["Header", "Meaning"], Object.entries(response.headers).map(([name, value]) => [
        name,
        resolve(spec, value)?.description || "See the machine-readable charter."
      ])));
      responses.append(headerDetail);
    }
    const fields = schemaFields(spec, response, `${method.toUpperCase()} ${path} HTTP ${code}`);
    if (fields) responses.append(fields);
  });
  body.append(responses);
  body.append(tryDesk(path, method, operation));
  card.append(body);
  return card;
}
function filterCards() {
  const needle = search.value.trim().toLocaleLowerCase();
  let visible = 0;
  document.querySelectorAll(".api-department").forEach((department) => {
    let groupVisible = 0;
    cards.filter((item) => item.department === department).forEach((item) => {
      const match = !needle || item.searchText.includes(needle);
      item.card.hidden = !match;
      if (match) groupVisible++;
    });
    department.hidden = groupVisible === 0;
    sections.querySelector(`a[href="#${department.id}"]`).hidden = department.hidden;
    visible += groupVisible;
  });
  status.textContent = `${visible} of ${cards.length} operations shown${needle ? ` for \u201C${search.value.trim()}\u201D` : ""}.`;
}
function render(spec) {
  byId("api-version").textContent = spec.openapi;
  operations.replaceChildren();
  sections.replaceChildren();
  cards = [];
  const entries = Object.entries(spec.paths).flatMap(([path, methods]) => Object.entries(methods).filter(([method]) => ["get", "post", "put", "patch", "delete"].includes(method)).map(([method, operation]) => ({ path, method, operation })));
  (spec.tags || []).forEach((tag, tagIndex) => {
    const members = entries.filter(({ operation }) => (operation.tags || []).includes(tag.name));
    if (!members.length) return;
    const department = element("section", "api-department");
    department.id = `department-${tagIndex}`;
    department.append(element("h2", "", tag.name));
    department.append(element("p", "", tag.description || ""));
    const link = element("a", "", tag.name);
    link.href = `#${department.id}`;
    sections.append(link);
    members.forEach(({ path, method, operation }, index) => {
      const card = renderOperation(spec, path, method, operation, index);
      department.append(card);
      cards.push({
        card,
        department,
        searchText: `${tag.name} ${path} ${method} ${operation.summary || ""} ${operation.description || ""}`.toLocaleLowerCase()
      });
    });
    operations.append(department);
  });
  byId("api-total").textContent = `${cards.length} ratified operations \xB7 ${Object.keys(spec.paths).length} paths`;
  filterCards();
}
search.addEventListener("input", filterCards);
try {
  const reply = await fetch(new URL("openapi.json", scope), { cache: "no-cache" });
  if (!reply.ok) throw new Error(`HTTP ${reply.status}`);
  render(await reply.json());
} catch (error) {
  status.textContent = `The charter could not be loaded: ${error.message}. Open the raw JSON link or try again.`;
}
