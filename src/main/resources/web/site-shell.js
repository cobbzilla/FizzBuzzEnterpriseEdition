// Generated from web/*.ts by scripts/build.ts. Do not edit.

// web/release-assets.ts
var scope = new URL("../", import.meta.url).href;

// web/site-navigation.ts
var pages = /* @__PURE__ */ new Set(["", "demo", "api", "about", "company-history", "accessibility", "validation", "bestiary", "department-of-improbable-appointments", "changelog", "continuity-register", "response"]);
function sitePage(url) {
  const base = new URL(scope);
  if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return;
  const path = url.pathname.slice(base.pathname.length).replace(/\/$/, "");
  return path === "company-history" ? "about" : pages.has(path) ? path : void 0;
}

// web/site-shell.ts
var views = /* @__PURE__ */ new Map();
var shellURL = document.querySelector("script[data-site-shell]").src;
var styleLoads = /* @__PURE__ */ new Map();
var persistent = ".site-header,.skip-link,.site-footer,#discovery-register,#companion-dialog,#active-run-banner,#active-run-announcement,.discovery-announcement,.companion-departures,.estate-announcement,script";
var active;
var serial = 0;
var loading;
var notice = document.createElement("p");
notice.className = "site-navigation-notice";
notice.setAttribute("role", "status");
notice.setAttribute("aria-live", "polite");
notice.hidden = true;
var retry = document.createElement("button");
retry.type = "button";
retry.className = "button button-secondary";
retry.textContent = "Resubmit the navigation paperwork";
retry.hidden = true;
var retryURL;
retry.addEventListener("click", () => {
  if (retryURL) void navigate(retryURL, true);
});
document.querySelector(".site-header").after(notice, retry);
var outlet = document.createElement("div");
outlet.id = "site-pages";
retry.after(outlet);
function absolute(root, url) {
  for (const element of root.querySelectorAll("[href],[src],[action]")) for (const attribute of ["href", "src", "action"]) {
    const value = element.getAttribute(attribute);
    if (value === null) continue;
    if (attribute === "href" && value === "#main") element.dataset.siteMainLink = "true";
    element.setAttribute(attribute, new URL(value, url).href);
  }
}
function adopt(source, url) {
  absolute(source, url);
  const key = sitePage(url);
  const root = document.createElement("div");
  root.dataset.sitePage = key || "home";
  root.hidden = true;
  root.inert = true;
  for (const element of [...source.body.children]) if (!element.matches(persistent) && element !== notice && element !== retry && element !== outlet) root.append(element);
  const main = root.querySelector("main");
  if (!main) throw Error("The destination has no main content.");
  const view = { key, root, main, title: source.title, description: source.querySelector('meta[name="description"]')?.content || "", classes: source.body.className, module: source.querySelector('link[rel="slopbuzz-page-module"]')?.href, scroll: { x: 0, y: 0 } };
  main.id = "site-main-" + (key || "home");
  views.set(key, view);
  outlet.append(root);
  return view;
}
function styles(source) {
  return Promise.all([...source.querySelectorAll('link[rel="stylesheet"]')].map((link) => {
    if (styleLoads.has(link.href)) return styleLoads.get(link.href);
    if ([...document.querySelectorAll('link[rel="stylesheet"]')].some((existing) => existing.href === link.href)) return;
    const pending = new Promise((resolve, reject) => {
      const copy = link.cloneNode();
      copy.onload = () => resolve();
      copy.onerror = () => {
        copy.remove();
        styleLoads.delete(link.href);
        reject(Error("The destination stylesheet could not be loaded."));
      };
      document.head.append(copy);
    });
    styleLoads.set(link.href, pending);
    return pending;
  }));
}
function show(view, url) {
  if (active && active !== view) {
    active.scroll = { x: scrollX, y: scrollY };
    document.dispatchEvent(new CustomEvent("site-page-leaving", { detail: { page: active.key } }));
    for (const dialog of document.querySelectorAll("dialog[open]")) dialog.close();
    active.root.hidden = true;
    active.root.inert = true;
    active.main.id = "site-main-" + (active.key || "home");
  }
  active = view;
  view.main.id = "main";
  view.root.hidden = false;
  view.root.inert = false;
  document.title = view.title;
  document.body.className = view.classes;
  document.body.dataset.sitePage = view.key || "home";
  if (view.key !== "demo") {
    delete document.body.dataset.desk;
    document.body.dataset.companyMenu = "closed";
    document.querySelector("#company-menu").hidden = true;
  }
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = view.description;
  for (const link of document.querySelectorAll(".site-header nav a")) {
    if (sitePage(new URL(link.href)) === view.key) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  for (const link of document.querySelectorAll("[data-site-main-link]")) {
    const target = new URL(url);
    target.hash = "main";
    link.href = target.href;
  }
}
function failure(url, error) {
  retryURL = url;
  notice.hidden = false;
  retry.hidden = false;
  notice.textContent = "Navigation could not be ratified. Any authorized mandate continues. " + (error instanceof Error ? error.message : "The destination is unavailable.");
}
async function navigate(url, push, restore = false) {
  const key = sitePage(url);
  if (key === void 0) return;
  const ticket = ++serial;
  loading?.abort();
  loading = void 0;
  notice.hidden = true;
  retry.hidden = true;
  retryURL = void 0;
  try {
    let view = views.get(key);
    if (!view) {
      loading = new AbortController();
      const response = await fetch(url, { signal: loading.signal });
      if (!response.ok) throw Error("The destination returned HTTP " + response.status + ".");
      const source = new DOMParser().parseFromString(await response.text(), "text/html");
      absolute(source, url);
      if (source.querySelector("script[data-site-shell]")?.src !== shellURL) throw Error("This destination belongs to another release. Finish or stop the current mandate before refreshing the application.");
      await styles(source);
      if (ticket !== serial) return;
      view = adopt(source, url);
    }
    if (ticket !== serial) return;
    if (push) history.pushState({ ...history.state }, "", url);
    show(view, url);
    document.dispatchEvent(new CustomEvent("site-page-change", { detail: { page: key, url: url.href, history: restore } }));
    view.loaded ||= view.module ? import(view.module) : Promise.resolve();
    await view.loaded;
    if (ticket !== serial) return;
    document.dispatchEvent(new CustomEvent("site-page-ready", { detail: { page: key, url: url.href, history: restore } }));
    if (url.hash) {
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (target && view.root.contains(target)) {
        target.scrollIntoView();
        if (target.tabIndex < 0) target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
    } else {
      const heading = [...view.main.querySelectorAll("h1")].find((element) => element.getClientRects().length) || view.main;
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      window.scrollTo({ left: restore ? view.scroll.x : 0, top: restore ? view.scroll.y : 0, behavior: "instant" });
    }
  } catch (error) {
    if (ticket !== serial || error.name === "AbortError") return;
    failure(url, error);
  } finally {
    if (ticket === serial) loading = void 0;
  }
}
absolute(document, new URL(location.href));
active = adopt(document, new URL(location.href));
show(active, new URL(location.href));
document.documentElement.dataset.siteShell = "ready";
history.scrollRestoration = "manual";
document.addEventListener("click", (event) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
  if (!link || link.hasAttribute("download") || link.target && link.target !== "_self" || link.dataset.deskLink) return;
  const url = new URL(link.href), current = new URL(location.href);
  if (sitePage(url) === void 0) return;
  if (url.pathname === current.pathname && url.search === current.search && url.hash) return;
  event.preventDefault();
  void navigate(url, true);
});
addEventListener("popstate", () => void navigate(new URL(location.href), false, true));
document.addEventListener("site-navigate", (event) => {
  const detail = event.detail;
  void navigate(detail.url, true).then(detail.resolve, detail.reject);
});
addEventListener("pagehide", () => {
  loading?.abort();
}, { once: true });
var initial = active;
initial.loaded = initial.module ? import(initial.module) : Promise.resolve();
void initial.loaded.then(() => {
  if (active === initial) document.dispatchEvent(new CustomEvent("site-page-ready", { detail: { page: initial.key, url: location.href, initial: true } }));
}).catch((error) => {
  if (active === initial) failure(new URL(location.href), error);
});
