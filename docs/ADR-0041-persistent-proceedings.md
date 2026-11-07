# ADR 0041: Proceedings survive visits to other departments

The static and Java-server sites use a persistent TypeScript shell for ordinary
internal navigation. The shared header, footer, saved companions and active-run
bar remain mounted. Each known page is adopted once, initialized once and kept
hidden and inert while another page is visible. Only the current main region
has the `main` identifier. The Company History alias reuses About's controller;
query strings do not allocate additional controllers. External links, downloads,
modified clicks and explicit reset pages retain browser navigation.
The header's external source icon explicitly opens a new tab, keeping the
authorized run alive in the original tab.

Page scripts are declared separately from the shell, which imports the active
page's controller. Separately bundled controllers share one runtime owner for
their release, mode and site scope. Visiting Home or the API does not create a
new competing Java worker. Page-local identifiers, forms and headings remain
unambiguous when multiple page trees have been retained. Relative URLs are
resolved against their source page before adoption, including subdirectory
deployments. Browser history, titles, primary-navigation state, keyboard focus,
skip links and scroll restoration follow the visible page. Analytics records
one sanitized pageview per actual page change.

An authorized demo retains its document, generation, received execution packet,
disclosure cursor, Chronicle, companion appointments, cadence and explicit pause.
Site navigation never submits the mandate again. The global bar reports actual
disclosed values and returns to Observe. A completed run stays completed. A new
authorization retains the existing generation cancellation and provisional
companion withdrawal rules. Shared-number links prefill a future authorization;
they never silently replace production.

GPU activity follows the visible office, independently of logical disclosure.
Leaving the demo closes its enlarged presentations, stops hidden rendering and
suspends optional audio; returning restarts the existing renderer at the current
decision. No visibility or navigation handler sets the user's pause flag.
The presentation scheduler races each animation callback against one bounded
timer and invalidates stale callbacks, so a dropped animation callback cannot
become an indefinite hold or invoke a later decision twice. A ready renderer
that stops painting for three seconds yields to the existing readable evidence
view; the logical proceedings continue without requiring Play. Actual painted
frames still govern visible motion while rendering is healthy.

Navigation fetches are cancelable, page/controller retention is bounded by the
fixed route inventory, and only one shared runtime is retained. A failed fetch
leaves the current run intact and provides a keyboard-accessible retry. A page
from another release is refused without unloading the active mandate.

This lifetime covers navigation within an open site document. Reload, browser
closure and process death remain distinct from internal navigation; no hidden
server execution or automatic replay is inferred from them.

Validation follows real header journeys and Back/Forward in Chromium, Firefox
and WebKit, checking exact audit counts, one runtime, hidden progress, resumed
painting, completion away from the demo, explicit pauses, replacements, page
fetch failure, lost animation callbacks, reusable page controls and accessibility.
The Java-server adapter and sanitized route analytics are checked separately.
