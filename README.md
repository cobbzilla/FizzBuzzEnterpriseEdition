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
