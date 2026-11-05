# SlopFizzBuzzEnterpriseEdition

Enterprise software marks a special high-grade class of software that makes
careful use of relevant software architecture design principles to build
particularly customizable and extensible solutions to real problems. This
project is an example of how the popular FizzBuzz game might be built were it
subject to the high quality standards of enterprise software.

The implementation is branded SlopFizzBuzz. Its printed answer to a number
divisible by both three and five is still the game's required `FizzBuzz`.

Build and test with `mvn package`. The application entry point is
`com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.Main`.
The [enterprise improvement ledger](CHANGELOG.md) records each formalized
investment as it enters the `slopbuzz` portfolio. The same journal is published
as a [readable website page](http://localhost:18088/changelog) and as
[`CHANGELOG.md`](http://localhost:18088/CHANGELOG.md) in the shared preview.
The [Executive Continuity and Sentiment Register](docs/EXECUTIVE_CONTINUITY_AND_SENTIMENT_REGISTER.md)
is its fictional diary companion, also readable at
`http://localhost:18088/continuity-register`.

[About the company](http://localhost:18088/about/) introduces both archives.
The [Accessibility page](http://localhost:18088/accessibility/) describes keyboard
and reading controls; [the review record](docs/ACCESSIBILITY_REVIEW.md) documents
repeatable checks and remaining assistive-technology testing.

See [Audience Measurement](docs/ANALYTICS.md) for optional PostHog configuration and dashboards.

## FizzBuzz

FizzBuzz is a game that has gained in popularity as a programming assignment to
weed out non-programmers during job interviews. The object of the assignment is
less about solving it correctly according to the below rules and more about
showing the programmer understands basic, necessary tools such as
`if`-/`else`-statements and loops. The rules of FizzBuzz are as follows:

For numbers 1 through 100,

* if the number is divisible by 3 print Fizz;
* if the number is divisible by 5 print Buzz;
* if the number is divisible by 3 and 5 (15) print FizzBuzz;
* else, print the number.

## Contributing

Although this project is intended as satire, we take openness and inclusivity
very seriously. To that end we have adopted the following code of conduct.

[Contributor Code of Conduct](CONTRIBUTING.md)

## Architecture

Before a number may enter the loop, two independent electors vote on its
eligibility. The [loop continuation franchise](docs/ADR-0001-loop-continuation-franchise.md)
records the governing procedure. This is an inclusive boundary, subject to
quorum.

Likewise, a number advances only after [ordinal succession proceedings](docs/ADR-0002-ordinal-succession.md)
certify its immediate successor.

Each generated line passes through an [output transaction and audit bureau](docs/ADR-0003-output-transactions.md),
which keeps process-local, hash-linked minutes.

Before that line can be published, a [three-seat classification ballot](docs/ADR-0014-classification-ballot.md)
must reconcile the Fizz, Buzz, and numeral strategies with an independent
arithmetic witness. The visitor receives number-bound certificates rather
than an informal verbal assurance.

After the printers have spoken, a [proclamation notary](docs/ADR-0020-proclamation-notary.md)
checks the complete line against its number and exact line ending. Only a
number-bound, text-bound seal permits the transaction desk to publish it.

## HTTP proclamation desk

The [HTTP entry point](docs/ADR-0005-http-proclamation.md) serves
`GET /fizzbuzz?limit=15` and `GET /healthz`. The limit defaults to 100 and
may range from 0 through 1000. Build and run the container with:

```sh
docker build -t slopbuzz .
docker run --rm -p 8080:8080 slopbuzz
```

Then request `http://localhost:8080/fizzbuzz?limit=15`.

## Persistent minutes

Set `SLOPBUZZ_AUDIT_JDBC_URL=jdbc:h2:file:/data/slopbuzz-audit` to keep the
[audit bureau's records](docs/ADR-0006-durable-audit-bureau.md) in an H2 database.
For the container, create a volume with `docker volume create slopbuzz-audit`
and run it with `-v slopbuzz-audit:/data` and that environment variable. The
bureau checks its stored hash chain on startup.

The [audit message queue](docs/ADR-0007-audit-message-queue.md) projects
delivery counts at `GET /audit/status`. The report includes pending and
dead-letter counts as well as the current chain check.

The [quality manual](docs/QUALITY_MANUAL.md) defines the internal controls
reported by `GET /audit/evidence`. Its [dossier decision](docs/ADR-0008-evidence-dossier.md)
keeps ISO 9000 and SOC 2 findings open until there is independent evidence.

The [readiness commission](docs/ADR-0009-operational-readiness.md) reports
`GET /readyz` as a three-vote deployment decision. The simpler `/healthz`
continues to report HTTP liveness.

The [capacity planning bureau](docs/ADR-0010-capacity-planning.md) forecasts
the mix of output lines at `GET /capacity/forecast?limit=15` without issuing
any actual proclamation.

The [service level scorecard](docs/ADR-0011-service-level-scorecard.md)
summarizes current-process HTTP proclamation outcomes at
`GET /operations/scorecard`.

The [synthetic assurance bureau](docs/ADR-0013-synthetic-assurance.md) accepts
`POST /operations/canary` to rehearse the real fifteen-number path against an
approved specimen; `GET /operations/canary` reads the latest process-local
verdict. An admitted rehearsal makes fifteen ordinary audit entries; the
[admission commission](docs/ADR-0015-rehearsal-admission.md) reuses that verdict
for repeat POSTs within fifteen seconds.

The [recovery rehearsal bureau](docs/ADR-0017-recovery-rehearsal.md) accepts
`POST /operations/recovery` to reopen and compare the audit repository with
the live hash chain. `GET /operations/recovery` reads the last verdict without
scanning the store. The drill is read-only and reports whether the configured
repository is file-backed; it does not restore a backup.

## Interactive world showcase

The showcase now defaults to a **static site running the real Java enterprise
inside the browser**, compiled to WebAssembly GC with a same-source JavaScript
fallback. Run `pnpm install --frozen-lockfile`, `pnpm build`, and `pnpm preview`,
then open http://localhost:18090/. Publish `dist/` to a static host.

The [browser residency charter](docs/BROWSER_RUNTIME.md) documents builds,
offline operation, persistent IndexedDB custody, cross-tab ownership, the
optional Java server configuration, and the comprehensive equivalence suite.
The public `/validation/` page shows release evidence and offers an isolated
rehearsal against JVM fixtures. `docker compose up --build -d` still runs the
Spring/Redis/H2 deployment.

The demo's mandatory disclosure cadence defaults to **Full Board Ratification**
and scrolls as each line appears. Choose **Executive Fiat** for immediate display with
no artificial delay; the measured service response time excludes playback.

Fizz, Buzz and FizzBuzz also receive optional **emoji companions**, enabled by
default. The bestiary has **3,200 characters: 1,364 single emoji and 1,836 themed
pairs**, each with a personality, backstory, motivating energy and ultimate goal.
The most familiar 10% receive 80% of appointments; the unicorn has one ticket
in a billion and cannot slip into a common paired appointment. Inspect the
searchable `/bestiary/`, or the unlisted full rarity inventory at
`/department-of-improbable-appointments/`.

The [companion charter](docs/ADR-0027-companion-appointment-strategies.md)
documents the actual Spring-injected Java strategies, exact bounded factor
evidence and scarcity weights. Read-only `GET /companions/catalog`,
`GET /companions/strategies` and
`GET /companions/window?start=1&count=15&strategy=factor-resonance-v1`
work in both runtimes. Switching strategies or companions never submits another
numerical mandate. `catalog/bestiary.ts` is the canonical TypeScript constant;
`node scripts/generate-companions.ts` emits portable Java, and
`pnpm test:companions` checks all dossiers, weights and generated-source custody.

Each freshly produced line also leases its actual output buffer through the
[Vacant String Real Estate and Occupancy Directorate](docs/ADR-0028-vacant-string-premises.md).
Every seventh ordinal initially houses one of ten named hidden characters.
The inspector identifies it, the eviction office removes it, and reinspection
proves actual vacancy before text moves in. The Executive Chronicle displays
those Java findings. The demo's read-only property desk and
`GET /premises/rehearsal?scenario=bell&ordinal=35` inspect the same authorities
without printing numbers or changing the audit/cache. BEL is named, never sounded.

Read the human API charter guide at `http://localhost:18088/api` in the shared
preview, or fetch `GET /openapi.json` for the OpenAPI 3.2.1 source used to
build that guide. The [charter decision](docs/ADR-0018-api-charter-and-ceremonial-playback.md)
records its scope and live request behavior.

Every HTTP response carries `X-SlopBuzz-Trace-Id` and
`X-SlopBuzz-Span-Id`. Supply a valid W3C `traceparent` header to preserve an
upstream trace ID; otherwise the [trace custody office](docs/ADR-0019-trace-custody.md)
creates a fresh one. The demo shows the trace receipt after each mandate.
Application logs include the receipt, and FINE-level output transaction logs
include it for individual lines. A receipt is a search key, not an identity or
external tracing service.

In this shared workspace, run `./scripts/deploy-preview.sh` to update the
long-lived local demo at `http://localhost:18088/` after a merge. It publishes the static site on port 18088, retains the Java service on port
18089, and preserves the existing Redis service and H2 audit volume.
The [release custody desk](docs/ADR-0016-release-custody.md) verifies readiness
and the deployed Git revision; the site displays that revision in Operations.

Public hosting uses B2 and a Cloudflare Worker Custom Domain. Run `pnpm publish:b2`
from the merged branch; see the [public publishing runbook](docs/B2_PUBLISHING.md)
for credentials, automatic DNS/TLS, and release verification.

If an older offline release hides a newly deployed interface, open `/reset/`
on the site, or choose **Refresh application** in the footer. This uncached
recovery page unregisters this installation’s service workers, removes its
cached releases and optional scenery, resets this tab’s mandate/estate
preferences, installs a fresh offline copy, and redirects to the homepage.
This recovery needs a network connection. Saved companions, curiosity
discoveries, IndexedDB audit history and other applications’ caches remain.
The same recovery route works on the static deployment and Java server.

For an intentional clean slate, `/full-reset/` also erases all browser-side
companions, discoveries, audit databases, preferences and cookies. Close other
site tabs if they still hold the audit repository, then use **Retry application
refresh**. Shared Java-server records are never deleted by either route. Both
routes install the latest interface before returning to the homepage.

Both office views offer **Full-screen**. In Observe, enable Executive Hovering
and use the button on the 3D view; live output, the current decision, the
running Chronicle, playback controls and an optional companion remain as compact
overlays. The panel selector can emphasize output or the log, or clear both.
In Facilities, enter the office and choose **Full-screen**; camera and route
controls remain at the edge, with the directory and paperwork in a drawer.
Browser full-screen is requested where supported, with a tab-sized fallback.
**Return to website** or Escape restores the normal layout without replaying
the mandate. Full-screen requires no additional business API requests.

The [Glyph Procurement Directorate](docs/ADR-0022-glyph-procurement.md) requires
position-specific receiving certificates for every Fizz/Buzz character. Inspect
its bill of materials in the website’s Operations section or through
`GET /procurement/dossier?product=FizzBuzz` in the configured runtime.

The web demo also accepts [arbitrary-magnitude upper limits](docs/ADR-0023-unbounded-mandates.md),
using native BigInt when Number would lose precision. Optional Numeric Character
Governance corrects pasted values; extended transient runs can be paused or stopped
and retain the latest 1000 lines. Twenty provisional policy warnings attend
requests beyond the ordinary-number jurisdiction.

The [Institutional Memory Court](docs/ADR-0026-prior-work-ratification.md) requires
five interchangeable Java offices to validate cached output before reuse.
Repeat a bounded mandate in the demo to inspect its Certificate of Authorized
Non-Performance, or try the isolated management petitions beneath the advisory
inventory. The same read-only cases are available through GET
/precedent/rehearsal?scenario=approved and the human API charter. Neither reuse
inspection nor a specimen rehearsal creates new numerical audit entries.

Companion sequences now include the exact mandate as a deterministic seed. Try
different limits, retain your five rarest disclosed friends in the shared footer,
and open a saved biography to copy its reproducible encounter link. Referrals
can be inspected without running the entire mandate. See [ADR 0029](docs/ADR-0029-mandate-seeded-discoveries.md).


The **Serious Business Office** opens from the homepage invitation or the demo's
visitor panel. Its Babylon.js cutaway has eight departments, 32 curiosities and
64 authored responses, with walking, room inspections and actual recorded file
routes. The complete HTML directory also works when 3D graphics are unavailable.
Use Facilities preferences to save the optional building for offline visits,
control animation/sound or choose a lower graphics budget. Share a room's link
to reopen a particular authored reply without automatically running its mandate.
See [ADR 0030](docs/ADR-0030-serious-business-office.md). `pnpm test:office` runs
its pure presentation/route/cache contract checks; browser tests cover the actual
rendered office and offline installation.

The Chronicle's **Require Companion Roll Call** preference controls the attendance
transcript independently of companion appointments. **Executive Hovering: Trust
Has Been Suspended** brings a choreographed view directly beneath Official Output.
The office owns disclosure cadence until Autonomy is restored; the preceding
ordinary cadence is then recovered. Pause or observe one decision at a time.
Each supplied Java event gets its own shot, and a line appears when its pictured
publication finishes. Audit, queue, commit, cleanup and succession continue
afterward. A fresh fifteen-number specimen has 436 events; observation takes
several minutes and stops advancing while the view is hidden or obscured.
Reduced motion supplies stationary views, and a graphics refusal retains readable
papers and controls. Java has already completed the underlying operation.
See [ADR 0031](docs/ADR-0031-executive-hovering.md). `pnpm test:supervision` checks
the evidence, exact ordinals, scene planning and observation clock; browser tests
cover actual 3D presentation, lifecycle, mobile co-visibility and disclosure.

**The Corporate Reorganization Machine** lets Facilities improve the same eight
departments by moving them. Enter the office or use Executive Hovering, then
choose **Announce Another Reorganization**. Every announcement alternates a 2×4
and 3×3 estate, rearranges the departments and supplies new partition policies:
pink hearts, jail bars, cheese with actual holes, and nine further approaches
to productive enclosure. The ninth square houses a seeded atrium or breakroom,
with six additional comic responses across the two perks.

The current decision waits while labeled crates move. Its camera and paperwork
resume through the new corridors without repeating the Java work or printing a
line twice. **Waive the Moving Ceremony**, reduced motion and disabled tour
animation apply the new arrangement immediately. The native floorplan, full
address register, perk inspections and **Minutes of Spatial Achievement** remain
available without graphics. Illustrated commute measurements describe scene
travel, not backend response time.

The latest ten relocations persist in this tab. **Copy This Approved Chaos**
shares a versioned `estate=estate-v1.<128-bit-seed>.<edition>` charter along with
the exact mandate, companion authority and selected visit. Links never autorun.
Legacy room links retain the founding estate; malformed charters and refused
storage receive a usable fallback and explanation. See [ADR 0032](docs/ADR-0032-corporate-reorganization.md).
`pnpm test:layout` checks layouts, partitions, relocation/shot clocks, and
session/record contracts. The standard publisher runs this family alongside the
existing validation gates.
