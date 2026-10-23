# ADR 0018: Ratify the public API and pace its proclamation theater

## Decision

Publish `GET /openapi.json` as an OpenAPI 3.2.1 document covering the public
proclamation, forecast, liveness, readiness, release, cache, audit, canary,
recovery, and charter desks. `GET /api` serves a readable guide. Its JavaScript
reads that exact JSON document and constructs searchable operation cards,
parameter and response tables, example commands, and live same-origin request
controls. The guide uses local assets and the showcase's visual language.
Static assets carry content fingerprints; the HTML and charter revalidate on
every visit. The contract test compares the charter's paths with live HTTP
routes so a missing desk cannot quietly retain its board-approved listing.

The showcase also offers four ceremonial reading paces. Boardroom deliberation
is selected by default. Unsupervised reality renders the received response in
one pass without a timer. Other paces reveal one line at a time and scroll the
output region to its newest line. Changing pace during playback takes effect
on the next line; submitting another mandate supersedes an unfinished reading.
The pace never adds latency to the Java service response, which is measured
before playback begins.

## Consequences

Human and machine readers now consume one contract, while the website's
numerical theater can be appreciated without a high-speed camera. The guide's
live POST controls perform the documented actions when clicked: a fresh canary
may create audit entries, and a recovery drill reads the repository. They are
not invoked on page load. The contract describes actual behavior, including
the process-local scope of operational verdicts and the absence of external
ISO 9000 or SOC 2 certification.

OpenAPI 3.2.1 is the published specification version selected for this
charter: <https://spec.openapis.org/oas/v3.2.1.html>.
