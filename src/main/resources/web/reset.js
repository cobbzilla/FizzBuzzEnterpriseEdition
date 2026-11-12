// Generated from web/reset.ts by scripts/build.ts. Do not edit.

// web/office-pack-key.ts
var officePackPrefix = (base) => `slopbuzz-office-${encodeURIComponent(base)}-`;

// web/reset.ts
var home = new URL("../", import.meta.url);
var status = document.getElementById("reset-status");
var retry = document.getElementById("reset-retry");
var full = document.body.dataset.resetMode === "full";
var resetting = false;
async function bounded(operation) {
  let timer;
  try {
    return await Promise.race([operation, new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error("The browser did not finish the refresh.")), 15e3);
    })]);
  } finally {
    clearTimeout(timer);
  }
}
function activateFresh(registration, script) {
  return new Promise((resolve, reject) => {
    const watched = /* @__PURE__ */ new Set(), requested = /* @__PURE__ */ new Set();
    const timer = setTimeout(() => finish(new Error("The fresh offline release did not finish installing.")), 6e4);
    function finish(error) {
      clearTimeout(timer);
      registration.removeEventListener("updatefound", inspect);
      for (const worker of watched) worker.removeEventListener("statechange", inspect);
      error ? reject(error) : resolve();
    }
    function inspect() {
      for (const worker of [registration.installing, registration.waiting, registration.active]) {
        if (!worker || worker.scriptURL !== script) continue;
        if (!watched.has(worker)) {
          watched.add(worker);
          worker.addEventListener("statechange", inspect);
        }
        if (worker.state === "activated") {
          finish();
          return;
        }
        if (worker.state === "redundant") {
          finish(new Error("The fresh offline release could not be installed."));
          return;
        }
        if (worker.state === "installed" && !requested.has(worker)) {
          requested.add(worker);
          worker.postMessage({ kind: "slopbuzz-reset-activate" });
        }
      }
    }
    registration.addEventListener("updatefound", inspect);
    inspect();
  });
}
async function forgetSavedData() {
  const erase = async () => {
    if (navigator.locks) {
      const state = await bounded(navigator.locks.query());
      if (state.held?.some((lock) => lock.name?.startsWith("slopbuzz:") && lock.name !== `slopbuzz:${home.href}`)) throw new Error("Close other application tabs first.");
    }
    if (typeof indexedDB.databases !== "function") throw new Error("This browser cannot enumerate its saved databases.");
    for (const database of await bounded(indexedDB.databases())) if (database.name) await bounded(new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(database.name);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(new Error("Close other site tabs to release saved data."));
    }));
    localStorage.clear();
    sessionStorage.clear();
    const paths = /* @__PURE__ */ new Set(["/"]);
    let path = "";
    for (const part of location.pathname.split("/").filter(Boolean)) {
      path += "/" + part;
      paths.add(path);
      paths.add(path + "/");
    }
    const domains = [""];
    const labels = location.hostname.split(".");
    for (let n = 0; n < labels.length - 1; n++) domains.push(`Domain=${labels.slice(n).join(".")};`);
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.slice(0, cookie.indexOf("=")).trim();
      if (name) for (const path2 of paths) for (const domain of domains) document.cookie = `${name}=; Max-Age=0; Path=${path2}; ${domain} SameSite=Lax`;
    }
  };
  if (!navigator.locks) {
    await erase();
    return;
  }
  const abort = new AbortController(), timer = setTimeout(() => abort.abort(), 1500);
  try {
    await navigator.locks.request(`slopbuzz:${home.href}`, { signal: abort.signal }, erase);
  } finally {
    clearTimeout(timer);
  }
}
async function reset() {
  if (resetting) return;
  resetting = true;
  retry.setAttribute("aria-disabled", "true");
  try {
    let reinstall = full;
    status.textContent = "Retiring this application\u2019s offline workers\u2026";
    if ("serviceWorker" in navigator) {
      const registrations = await bounded(navigator.serviceWorker.getRegistrations());
      for (const registration of registrations) if (full || registration.scope === home.href) {
        reinstall = true;
        await bounded(registration.unregister());
      }
    }
    status.textContent = "Removing cached releases and optional office scenery\u2026";
    if ("caches" in window) {
      const prefixes = [`slopbuzz-release-${encodeURIComponent(home.href)}-`, officePackPrefix(home.href)];
      for (const name of await bounded(caches.keys())) if (full || prefixes.some((prefix) => name.startsWith(prefix))) await bounded(caches.delete(name));
    }
    if (full) {
      status.textContent = "Erasing saved companions, preferences and local audit history\u2026";
      await forgetSavedData();
    } else try {
      for (const key of ["slopbuzz:authorization-draft:v1", "slopbuzz:authorization-draft:v2", "slopbuzz:estate:v1", "slopbuzz:stamp-heists:v1", "slopbuzz:paper-aviation:v1"]) sessionStorage.removeItem(key);
    } catch {
    }
    if (reinstall) {
      const probe = await bounded(fetch(new URL("sw.js", home), { method: "HEAD", cache: "no-store" }));
      if (probe.status !== 404) {
        if (!probe.ok) throw new Error("The latest offline release is unavailable.");
        status.textContent = "Installing a fresh offline release before returning home\u2026";
        const script = new URL("sw.js", home);
        script.searchParams.set("recovery", crypto.randomUUID());
        const registration = await bounded(navigator.serviceWorker.register(script, { scope: home.href, updateViaCache: "none" }));
        await activateFresh(registration, script.href);
      }
    }
    status.textContent = "The previous administration has been relieved. Returning to the latest homepage\u2026";
    location.replace(home.href);
  } catch {
    status.textContent = full ? "The full reset could not finish. Close all other tabs for this site and try again. Some browser data may already have been cleared." : "The refresh could not finish. Close other tabs for this site and try again. Saved companions and audit history have been kept.";
    retry.hidden = false;
  } finally {
    resetting = false;
    retry.setAttribute("aria-disabled", "false");
  }
}
retry.addEventListener("click", () => void reset());
void reset();
