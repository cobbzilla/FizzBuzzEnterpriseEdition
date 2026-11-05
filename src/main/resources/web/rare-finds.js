// Generated from web/*.ts by scripts/build.ts. Do not edit.

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

// web/release-assets.ts
var scope = new URL("../", import.meta.url).href;

// web/companion-dialog.ts
var controllerSymbol = /* @__PURE__ */ Symbol.for("slopbuzz.companion-dialog.v1");
function companionDialog() {
  const dialog2 = document.querySelector("#companion-dialog");
  if (dialog2[controllerSymbol]) return dialog2[controllerSymbol];
  let invoker, beganOnBackdrop = false;
  dialog2.querySelector("[data-companion-close]").addEventListener("click", () => dialog2.close());
  const outside = (e) => {
    const b = dialog2.getBoundingClientRect();
    return e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom;
  };
  dialog2.addEventListener("pointerdown", (e) => {
    beganOnBackdrop = e.target === dialog2 && outside(e);
  });
  dialog2.addEventListener("pointercancel", () => {
    beganOnBackdrop = false;
  });
  dialog2.addEventListener("click", (e) => {
    const dismiss = dialog2.open && beganOnBackdrop && e.target === dialog2 && outside(e);
    beganOnBackdrop = false;
    if (dismiss) dialog2.close();
  });
  dialog2.addEventListener("close", () => {
    beganOnBackdrop = false;
    const target = invoker?.isConnected && invoker.getClientRects().length ? invoker : [document.querySelector("#discovery-toggle"), document.querySelector("#discovery-list button"), document.querySelector("main")].find((el) => el?.getClientRects().length);
    target?.focus();
    dialog2.dispatchEvent(new Event("companion-closed"));
  });
  const controller = { open(d, opener) {
    invoker = opener;
    const a = d.assignment, c = d.companion;
    dialog2.querySelector("h2").textContent = c.name + " \xB7 " + a.ordinal + " " + a.flavor;
    const body = dialog2.querySelector("[data-companion-story]");
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
    const status2 = node("p");
    status2.setAttribute("role", "status");
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(link.value);
        status2.textContent = "Encounter link copied. The recipient can inspect this appointment without running the full mandate.";
      } catch {
        link.focus();
        link.select();
        status2.textContent = "Copy the selected link using your browser\u2019s copy command.";
      }
    });
    body.append(label, link, copy, status2);
    if (!dialog2.open) dialog2.showModal();
    dialog2.querySelector(".companion-dialog-body").scrollTop = 0;
  } };
  dialog2[controllerSymbol] = controller;
  return controller;
}

// web/discovery-store.ts
var provisionalDiscoveryPrefix = "slopbuzz:provisional-appointments:";
var storeSymbol = /* @__PURE__ */ Symbol.for("slopbuzz.discovery-store.v2");
function createDiscoveryStore(storage) {
  let settled = [], finds = [], persistent = !!storage, publishedPersistent = persistent;
  const listeners = /* @__PURE__ */ new Set(), active = /* @__PURE__ */ new Map(), closed = /* @__PURE__ */ new Set();
  const read = () => {
    try {
      return decodeDiscoveries(storage?.getItem(discoveryStorageKey) || null);
    } catch {
      persistent = false;
      return [];
    }
  };
  const write = (key, value) => {
    try {
      if (!storage) throw new Error("Storage unavailable");
      if (value === void 0) storage.removeItem(key);
      else if (storage.getItem(key) !== value) storage.setItem(key, value);
      persistent = true;
    } catch {
      persistent = false;
    }
  };
  const reconcile = (withdrawal = false) => {
    const previous = finds;
    settled = rarestDiscoveries(settled, read());
    const pending2 = [];
    try {
      if (storage) for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key?.startsWith(provisionalDiscoveryPrefix) && !closed.has(key)) pending2.push(decodeDiscoveries(storage.getItem(key)));
      }
    } catch {
      persistent = false;
    }
    finds = rarestDiscoveries(settled, ...pending2, ...[...active.values()].map((run) => run.finds));
    if (encodeDiscoveries(previous) !== encodeDiscoveries(finds) || publishedPersistent !== persistent) {
      publishedPersistent = persistent;
      const remaining = new Set(finds.map(discoveryIdentity)), departed = withdrawal ? previous.filter((d) => !remaining.has(discoveryIdentity(d))) : [];
      listeners.forEach((fn) => fn({ departed }));
    }
  };
  const remember = (incoming) => {
    settled = rarestDiscoveries(settled, incoming, read());
    const value = encodeDiscoveries(settled);
    try {
      if (storage?.getItem(discoveryStorageKey) !== value) write(discoveryStorageKey, value);
    } catch {
      persistent = false;
    }
    reconcile();
  };
  const store2 = { snapshot: () => finds, persistent: () => persistent, remember, reconcile, subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }, settleAll() {
    for (const run of [...active.values()]) run.complete();
  }, beginRun() {
    const key = provisionalDiscoveryPrefix + crypto.randomUUID();
    let state = "active";
    const retire = () => {
      closed.add(key);
      active.delete(key);
      write(key);
    };
    const run = { finds: [], complete() {
      if (state !== "active") return;
      state = "complete";
      remember(run.finds);
      retire();
      reconcile();
    } };
    active.set(key, run);
    return { remember(incoming) {
      if (state === "withdrawn") return;
      if (state === "complete") {
        remember(incoming);
        return;
      }
      run.finds = rarestDiscoveries(run.finds, incoming);
      write(key, encodeDiscoveries(run.finds));
      reconcile();
    }, complete: () => run.complete(), withdraw() {
      if (state !== "active") return;
      state = "withdrawn";
      retire();
      reconcile(true);
    } };
  } };
  reconcile();
  return store2;
}
function discoveryStore() {
  const host = window;
  if (host[storeSymbol]) return host[storeSymbol];
  let storage;
  try {
    storage = window.localStorage;
  } catch {
  }
  const store2 = createDiscoveryStore(storage);
  window.addEventListener("storage", (event) => {
    if (event.key === discoveryStorageKey) store2.remember(decodeDiscoveries(event.newValue));
    else if (event.key?.startsWith(provisionalDiscoveryPrefix)) store2.reconcile(event.newValue === null);
  });
  addEventListener("pagehide", () => store2.settleAll());
  host[storeSymbol] = store2;
  return store2;
}

// web/rare-finds.ts
var register = document.querySelector("#discovery-register");
var list = document.querySelector("#discovery-list");
var status = document.querySelector("#discovery-status");
var latest = document.querySelector("#discovery-latest");
var dialog = document.querySelector("#companion-dialog");
var store = discoveryStore();
var pending = false;
var toggle = document.querySelector("#discovery-toggle");
var summary = document.querySelector("#discovery-summary");
var notice = node("span");
notice.className = "discovery-announcement";
notice.setAttribute("role", "status");
notice.setAttribute("aria-live", "polite");
document.body.append(notice);
var departures = node("div");
departures.className = "companion-departures";
departures.setAttribute("aria-hidden", "true");
document.body.append(departures);
toggle.addEventListener("click", () => {
  const expanded = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(expanded));
  register.dataset.expanded = String(expanded);
  size();
});
register.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && toggle.getClientRects().length && toggle.getAttribute("aria-expanded") === "true") {
    event.preventDefault();
    toggle.click();
    toggle.focus();
  }
});
function depart(finds) {
  if (!finds.length) return;
  notice.textContent = finds.length + " provisional companion" + (finds.length === 1 ? " has" : "s have") + " left the register. Their mandate was replaced.";
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rail = register.getBoundingClientRect();
  for (const [index, find] of finds.entries()) {
    const chip = [...list.querySelectorAll("li")].find((li) => li.dataset.companion === find.companion.id), box = chip?.getBoundingClientRect();
    const flight = node("span", find.companion.emoji);
    flight.className = "companion-departure";
    flight.setAttribute("aria-hidden", "true");
    const x = box?.width ? box.left + box.width / 2 : Math.min(innerWidth - 30, rail.left + 35 + index * 48), y = box?.height ? box.top + box.height / 2 : Math.min(innerHeight - 22, rail.top + 22);
    flight.style.left = Math.max(20, Math.min(innerWidth - 20, x)) + "px";
    flight.style.top = Math.max(20, Math.min(innerHeight - 20, y)) + "px";
    flight.style.setProperty("--flight-x", (index % 2 ? -1 : 1) * (100 + Math.random() * 180) + "px");
    flight.style.setProperty("--flight-y", -(y + 100) + "px");
    flight.style.setProperty("--flight-spin", (index % 2 ? -1 : 1) * (250 + Math.random() * 250) + "deg");
    departures.append(flight);
    flight.addEventListener("animationend", () => flight.remove(), { once: true });
    setTimeout(() => flight.remove(), 1500);
  }
}
function render(force = false) {
  if (!force && (list.contains(document.activeElement) || dialog.open)) {
    pending = true;
    latest.hidden = false;
    return;
  }
  const focused = force && list.contains(document.activeElement) ? document.activeElement?.closest("li")?.dataset.companion : void 0;
  const finds = store.snapshot();
  list.replaceChildren(...finds.map((d, index) => {
    const li = node("li"), button = node("button");
    li.dataset.companion = d.companion.id;
    button.type = "button";
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-controls", "companion-dialog");
    button.title = d.companion.name;
    const description = node("span", d.companion.weight + " of one billion tickets. Open saved biography.");
    description.hidden = true;
    description.id = "discovery-evidence-" + index;
    button.setAttribute("aria-describedby", description.id);
    const glyph = node("span", d.companion.emoji);
    glyph.setAttribute("aria-hidden", "true");
    const label = node("span", d.companion.rarity + " \xB7 " + d.companion.name);
    button.append(glyph, label);
    button.addEventListener("click", () => companionDialog().open(d, button));
    li.append(button, description);
    return li;
  }));
  summary.textContent = finds.length + " companion" + (finds.length === 1 ? "" : "s") + " on file";
  if (!finds.length) {
    toggle.setAttribute("aria-expanded", "false");
    register.dataset.expanded = "false";
  }
  status.textContent = (finds.length ? finds.length + " distinct finds \xB7 rarest first." : "No appointments filed. Run a mandate with companions enabled.") + (store.persistent() ? " Saved in this browser." : " Storage is unavailable; finds last for this page session.");
  pending = false;
  latest.hidden = true;
  if (focused) {
    const retained = [...list.querySelectorAll("li")].find((li) => li.dataset.companion === focused)?.querySelector("button");
    const target = retained || [toggle, list.querySelector("button"), document.querySelector("main")].find((el) => el && el.getClientRects().length);
    target?.focus({ preventScroll: true });
  }
  size();
}
store.subscribe((change) => {
  depart(change.departed);
  render(change.departed.length > 0);
});
latest.addEventListener("click", () => {
  render(true);
  list.querySelector("button")?.focus();
});
dialog.addEventListener("companion-closed", () => {
  if (pending) latest.hidden = false;
});
render();
function size() {
  document.documentElement.style.setProperty("--discovery-height", Math.ceil(register.getBoundingClientRect().height) + "px");
}
new ResizeObserver(size).observe(register);
size();
