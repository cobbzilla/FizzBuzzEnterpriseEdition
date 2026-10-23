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
investment as it enters the `slopbuzz` portfolio.

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
verdict. Each rehearsal makes fifteen ordinary audit entries.

## Interactive world showcase

Run `docker compose up --build -d` and open `http://localhost:8080/` to see
the [interactive website](docs/ADR-0012-world-showcase.md), including a live
FizzBuzz demo, forecast, operational desks, evidence dossier, and an About
section for The Serious Business Company, Inc. The stack uses a private Redis
cache and a durable H2 audit volume. See the [showcase runbook](docs/SHOWCASE_RUNBOOK.md)
for deployment and verification notes.
