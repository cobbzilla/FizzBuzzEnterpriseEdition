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
    if (invoker?.isConnected) invoker.focus();
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
  const store2 = { snapshot: () => finds, persistent: () => persistent, remember: merge, subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  } };
  window.addEventListener("storage", (event) => {
    if (event.key === discoveryStorageKey) merge(decodeDiscoveries(event.newValue));
  });
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
function render(force = false) {
  if (!force && (list.contains(document.activeElement) || dialog.open)) {
    pending = true;
    latest.hidden = false;
    return;
  }
  const finds = store.snapshot();
  list.replaceChildren(...finds.map((d) => {
    const li = node("li"), button = node("button");
    button.type = "button";
    button.setAttribute("aria-haspopup", "dialog");
    button.setAttribute("aria-controls", "companion-dialog");
    button.title = d.companion.name;
    button.setAttribute("aria-label", d.companion.rarity + " \xB7 " + d.companion.name + " \xB7 " + d.companion.weight + " of one billion tickets. Open saved biography.");
    const glyph = node("span", d.companion.emoji);
    glyph.setAttribute("aria-hidden", "true");
    const label = node("span", d.companion.rarity + " \xB7 " + d.companion.name);
    button.append(glyph, label);
    button.addEventListener("click", () => companionDialog().open(d, button));
    li.append(button);
    return li;
  }));
  status.textContent = (finds.length ? finds.length + " distinct finds \xB7 rarest first." : "No appointments filed. Run a mandate with companions enabled.") + (store.persistent() ? " Saved in this browser." : " Storage is unavailable; finds last for this page session.");
  pending = false;
  latest.hidden = true;
}
store.subscribe(() => render());
latest.addEventListener("click", () => {
  render(true);
  list.querySelector("button")?.focus();
});
dialog.addEventListener("companion-closed", () => {
  if (pending) latest.hidden = false;
});
render();
var size = () => document.documentElement.style.setProperty("--discovery-height", Math.ceil(register.getBoundingClientRect().height) + "px");
new ResizeObserver(size).observe(register);
size();
