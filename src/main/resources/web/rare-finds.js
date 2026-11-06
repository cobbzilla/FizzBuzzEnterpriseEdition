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

// web/companion-tile.ts
function companionGlyph(discovery) {
  const glyph = node("span", discovery.companion.emoji);
  glyph.className = "companion-glyph";
  glyph.dataset.companionIdentity = discoveryIdentity(discovery);
  glyph.dataset.rarity = discovery.companion.rarity;
  glyph.setAttribute("aria-hidden", "true");
  return glyph;
}
function companionTile(discovery) {
  const { companion: c, assignment: a } = discovery, button = node("button");
  button.type = "button";
  button.className = "companion-chip";
  button.dataset.rarity = c.rarity;
  button.dataset.companion = c.id;
  button.setAttribute("aria-label", c.rarity + " \xB7 " + c.name);
  button.setAttribute("aria-haspopup", "dialog");
  button.setAttribute("aria-controls", "companion-dialog");
  button.title = c.rarity + " \xB7 " + c.name + " \xB7 " + c.weight + " of one billion tickets \xB7 mandate " + discovery.mandate + " \xB7 ordinal " + a.ordinal;
  button.append(companionGlyph(discovery));
  button.addEventListener("click", () => companionDialog().open(discovery, button));
  return button;
}

// web/companion-flight.ts
var fold = (value, low, high) => {
  const span = Math.max(1, high - low), phase = ((value - low) % (2 * span) + 2 * span) % (2 * span);
  return low + (phase <= span ? phase : 2 * span - phase);
};
function companionFlight(start, viewport, random = Math.random) {
  const draw = () => Math.max(0, Math.min(1, random())), duration = 4e3 + draw() * 6e3, edge = draw(), margin = 40;
  const target = edge < 0.7 ? { x: 20 + draw() * Math.max(1, viewport.width - 40), y: -margin } : { x: edge < 0.85 ? -margin : viewport.width + margin, y: draw() * viewport.height * 0.2 };
  const sway = (0.18 + draw() * 0.3) * viewport.width * (draw() < 0.5 ? -1 : 1), bounce = 25 + draw() * 35, frames = [];
  for (let index = 0; index <= 40; index++) {
    const t = index / 40, progress = (1 - Math.cos(Math.PI * t)) / 2;
    const rawX = start.x + (target.x - start.x) * progress + Math.sin(3 * Math.PI * t) * sway * (1 - t);
    const rawY = start.y + (target.y - start.y) * progress + Math.sin(5 * Math.PI * t) * bounce * (1 - t);
    const exit = Math.max(0, (t - 0.85) / 0.15), blend = exit * exit * (3 - 2 * exit), x = fold(rawX, 18, viewport.width - 18) * (1 - blend) + rawX * blend, y = Math.min(rawY, 2 * (viewport.height - 18) - rawY);
    const turn = Math.sin(6 * Math.PI * t) * 16 + (x - start.x) / Math.max(1, viewport.width) * 12;
    frames.push({ offset: t, transform: `translate(${x - start.x}px,${y - start.y}px) rotate(${turn}deg) scale(${1 + Math.sin(Math.PI * t) * 0.12})`, opacity: t < 0.95 ? 1 : (1 - t) / 0.05 });
  }
  return { duration, target, frames };
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
var closing = false;
var displayed = [];
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
departures.inert = true;
document.body.append(departures);
var flying = /* @__PURE__ */ new Map();
var arrivals = /* @__PURE__ */ new Set();
var motion = matchMedia("(prefers-reduced-motion: reduce)");
toggle.addEventListener("click", () => {
  const expanded = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(expanded));
  register.dataset.expanded = String(expanded);
  toggle.setAttribute("aria-label", (expanded ? "Collapse" : "Expand") + " saved companion appointments");
  size();
});
register.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && toggle.getClientRects().length && toggle.getAttribute("aria-expanded") === "true") {
    event.preventDefault();
    toggle.click();
    toggle.focus();
  }
});
function depart() {
  const remaining = new Set(store.snapshot().map(discoveryIdentity)), leaving = displayed.filter((find) => !remaining.has(discoveryIdentity(find)));
  if (!leaving.length) return;
  notice.textContent = leaving.length + " provisional companion" + (leaving.length === 1 ? " has" : "s have") + " left the register. Their mandate was replaced.";
  for (const find of leaving) {
    const identity = discoveryIdentity(find);
    if (motion.matches || flying.has(identity)) continue;
    const glyph = [...register.querySelectorAll(".companion-glyph")].find((el) => {
      const box2 = el.getBoundingClientRect();
      return el.dataset.companionIdentity === identity && box2.width && box2.height && box2.right > 0 && box2.left < innerWidth && box2.bottom > 0 && box2.top < innerHeight;
    });
    if (!glyph) continue;
    const box = glyph.getBoundingClientRect(), font = getComputedStyle(glyph).font, plan = companionFlight({ x: box.left + box.width / 2, y: box.top + box.height / 2 }, { width: innerWidth, height: innerHeight });
    Object.assign(glyph.style, { left: box.left + "px", top: box.top + "px", width: box.width + "px", height: box.height + "px", font });
    glyph.classList.add("companion-departure");
    glyph.dataset.duration = String(plan.duration);
    glyph.dataset.targetX = String(plan.target.x);
    glyph.dataset.targetY = String(plan.target.y);
    departures.append(glyph);
    let animation, timer;
    const finish = () => {
      if (flying.get(identity) !== finish) return;
      flying.delete(identity);
      clearTimeout(timer);
      animation?.cancel();
      glyph.remove();
      if (store.snapshot().some((find2) => discoveryIdentity(find2) === identity)) arrivals.add(identity);
      if (!closing) render();
    };
    flying.set(identity, finish);
    try {
      animation = glyph.animate(plan.frames, { duration: plan.duration, easing: "linear", fill: "forwards" });
      void animation.finished.then(finish, finish);
      timer = setTimeout(finish, plan.duration + 1e3);
    } catch {
      finish();
    }
  }
}
function render(force = false) {
  if (!force && (list.contains(document.activeElement) || dialog.open)) {
    pending = true;
    latest.hidden = false;
    return;
  }
  const focused = force && list.contains(document.activeElement) ? document.activeElement?.closest("li")?.dataset.companion : void 0;
  const finds = store.snapshot().filter((find) => !flying.has(discoveryIdentity(find)));
  displayed = finds;
  list.replaceChildren(...finds.map((d, index) => {
    const li = node("li"), button = companionTile(d);
    li.dataset.companion = d.companion.id;
    const description = node("span", d.companion.weight + " of one billion tickets. Open saved biography.");
    description.hidden = true;
    description.id = "discovery-evidence-" + index;
    button.setAttribute("aria-describedby", description.id);
    if (arrivals.delete(discoveryIdentity(d))) button.dataset.arrival = "true";
    li.append(button, description);
    return li;
  }));
  summary.replaceChildren(...finds.map(companionGlyph));
  toggle.title = finds.length + " saved companion" + (finds.length === 1 ? "" : "s");
  if (!finds.length) {
    toggle.setAttribute("aria-expanded", "false");
    register.dataset.expanded = "false";
    toggle.setAttribute("aria-label", "Expand saved companion appointments");
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
  if (change.departed.length) depart();
  render(change.departed.length > 0);
});
latest.addEventListener("click", () => {
  render(true);
  list.querySelector("button")?.focus();
});
dialog.addEventListener("companion-closed", () => {
  if (pending) latest.hidden = false;
});
motion.addEventListener("change", () => {
  if (motion.matches) for (const finish of [...flying.values()]) finish();
});
addEventListener("pagehide", () => {
  closing = true;
  for (const finish of [...flying.values()]) finish();
});
render();
function size() {
  document.documentElement.style.setProperty("--discovery-height", Math.ceil(register.getBoundingClientRect().height) + "px");
}
new ResizeObserver(size).observe(register);
size();
