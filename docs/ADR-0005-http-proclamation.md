# ADR 0005: The HTTP proclamation desk

## Status

Open for public business.

## Context

The enterprise's number ceremony was reachable only through a local main
method. Capturing its global standard output for each HTTP request would make
concurrent clients share a podium.

## Decision

An HTTP server invokes the existing Spring service. Each request receives a
thread-local output audience; the transaction coordinator publishes complete
lines to that audience while ordinary CLI calls continue to use standard
output. Four worker threads can therefore hear separate petitions at once.

* `GET /fizzbuzz?limit=N` returns plain text for limits 0 through 1000.
  Without a limit, the mandate is 100.
* `GET /healthz` returns `ok`.
* Invalid limits receive 400, and other methods receive 405.

The HTTP entry point registers a shutdown hook to close the server and Spring
context when the process receives a normal termination signal. A multi-stage
container image supplies the runtime dependencies alongside the application
jar. The application itself remains a surprisingly large ceremony for printing
at most one thousand short lines.
