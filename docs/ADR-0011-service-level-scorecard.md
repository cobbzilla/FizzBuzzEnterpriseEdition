# ADR 0011: The service level scorecard

## Status

Minutes approved for the current process.

## Context

The audit journal records each numerical output transaction, while the HTTP
desk did not summarize the fate of requests made to it. A board reviewing the
service could count certificates but could not distinguish a malformed limit
from a successfully served proclamation.

## Decision

The HTTP desk records each exact `/fizzbuzz` request as successful, rejected,
or failed. Rejections include invalid limits and unsupported methods. Unknown
lookalike paths are outside this desk's charter. Elapsed microseconds are
measured with a monotonic clock from handler entry through response writing.

`GET /operations/scorecard` publishes a JSON snapshot with outcome counts,
total requests, cumulative elapsed microseconds, and the maximum observed
duration. Updates and snapshots are synchronized across the four HTTP workers.
The ledger resets when the process restarts; it is an operations view, not the
durable audit journal. The data describes observations and makes no promise
about future latency or availability.
