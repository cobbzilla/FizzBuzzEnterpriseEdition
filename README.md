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

[Company History](http://localhost:18088/company-history/) introduces both archives.
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

The [Glyph Procurement Directorate](docs/ADR-0022-glyph-procurement.md) requires
position-specific receiving certificates for every Fizz/Buzz character. Inspect
its bill of materials in the website’s Operations section or through
`GET /procurement/dossier?product=FizzBuzz` in the configured runtime.
