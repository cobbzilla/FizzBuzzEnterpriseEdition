# ADR 0034: An uncached route for browser recovery

An older offline worker can retain the whole previous interface while any of
its clients remain open. Reloading the page does not reliably replace that
worker. Visitors need a recovery URL reachable through an already installed
release, without inspecting browser developer tools or discarding discoveries.

`/reset/` is a standalone page whose TypeScript entry point imports no runtime,
analytics or renderer. Existing workers fetch this previously unknown route
from the network. New workers explicitly bypass the recovery directory, and
the build excludes its HTML and script from every offline precache. Public,
preview and Java hosts serve it with `Cache-Control: no-store`.

`/full-reset/` is a separate, equally uncached page with an explicit destructive
contract. It unregisters every origin worker, removes all CacheStorage entries,
deletes every enumerated IndexedDB database, clears local/session preferences
and expires accessible cookies. Saved companions and browser audit history are
included. Shared Java-server records are outside this operation and remain.
Only an actual navigation to the full-reset document receives
`Clear-Site-Data: "cache", "cookies"`; prefetches, scripts, HEAD requests and
the preserving route do not trigger native data clearing. The explicit browser
storage deletion runs while holding the existing repository Web Lock. We avoid
native `"storage"` clearing: Chromium can remove the lock bucket while an older
Java runtime retains its journal in memory, permitting that runtime to restore
supposedly erased records. An occupied repository or blocked database instead
produces a bounded failure asking the visitor to close other site tabs and retry.
The failure copy makes clear that some data may already have been removed.

Recovery unregisters only the registration at the application’s exact scope,
removes that scope’s release and optional-office caches, and clears the current
tab’s draft and estate preferences. It preserves localStorage discoveries,
curiosity records, IndexedDB audit data and other installations. When replacing
an installed browser worker, it registers a fresh script URL and requests
activation only from the recovery page. The worker validates that source before
waiving its normal waiting period. The fresh offline copy is installed before
redirection; normal background updates continue waiting for existing clients.
The Java host has no worker script and skips that installation phase. It uses
`location.replace` to reach the homepage without adding a recurring reset to
the Back history. The script’s own URL determines the application root so
subdirectory deployments behave the same way.

Each asynchronous storage phase has a bounded wait. Failure announces the
problem and exposes a focus-preserving Retry action and a homepage escape.
The shared footer provides a normal recovery link; a direct URL remains usable
when the older footer has no such link.

Validation models an older controlling worker and another open tab, verifies
saved discoveries and the audit chain, covers root and subdirectory hosts,
plants a poisoned recovery response in a current cache to prove bypass, and
checks error/retry accessibility and isolation from another installation.
The route requires a network connection to obtain the current release.
