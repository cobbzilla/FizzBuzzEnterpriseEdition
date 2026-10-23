# ADR 0013: Synthetic assurance bureau

## Status

Approved for explicit rehearsal.

## Context

Liveness proves that the HTTP desk can answer, readiness proves that three
internal electors approve, and the scorecard proves that requests reached an
outcome. None of those statements proves that the Spring ceremony still
produces the right fifteen lines.

## Decision

An admitted `POST /operations/canary` runs the same Spring-managed `SlopFizzBuzz` service
as a real proclamation, captures its output, and compares every byte with a
fixed fifteen-line specimen. The result also checks the audit hash chain. The
response is a JSON verdict with a sequence, issue time, duration, observed
line count, and an unambiguous finding. A failed rehearsal returns HTTP 503.
`GET /operations/canary` reports the last verdict without running the service.
Before the first rehearsal, it reports `NOT_RUN`. Subsequent POSTs inside the
[admission lease](ADR-0015-rehearsal-admission.md) reuse the latest verdict.

The bureau keeps verdicts in process memory; restart resets the sequence and
status. Each rehearsal generates fifteen normal audit entries, so the action
is explicit and is not run automatically during page load or readiness checks.
The specimen is fixed data separate from the FizzBuzz strategy and is checked
with exact text equality. The verdict is a synthetic check, not an external
certification or a substitute for the full test suite.

The interactive showcase supplies a dedicated button and live result, while
the read endpoint remains usable by deployment monitoring. The bureau serializes
its own rehearsals so the latest verdict has a clear order; ordinary customer
proclamations may still run concurrently.
