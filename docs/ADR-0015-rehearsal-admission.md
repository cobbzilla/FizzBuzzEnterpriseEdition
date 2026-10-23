# ADR 0015: Rehearsal admission commission

## Status

Approved for the single-process public showcase.

## Context

Each synthetic canary POST bypasses Redis and writes fifteen ordinary H2
audit entries. A public demo button could therefore grow the durable journal
with repeated clicks even though the verified answer is identical.

## Decision

The HTTP canary desk uses a process-local admission commission. The first POST
runs the real fifteen-number rehearsal and receives an `EXECUTED` receipt.
POSTs arriving within fifteen seconds of that run's completion receive the
same verdict with a `REUSED` receipt and create no new audit entries. The
commission uses a monotonic clock, serializes admission decisions, and starts
a fresh lease after each actual run. Both passing and failing verdicts are
reused within their lease. `GET /operations/canary` remains read-only.

The verdict JSON and status code retain their existing meaning. POST responses
add `X-SlopBuzz-Rehearsal: EXECUTED|REUSED` and
`X-SlopBuzz-Rehearsal-Lease-Seconds`; both methods send
`Cache-Control: no-store`. The website states whether it received a new hearing or an earlier
ruling. A process restart clears the lease. Each replica would have its own
lease, so this is a bounded local demonstration policy, not a distributed
rate limit for a multi-replica public service.

The shared-workspace Compose preview is redeployed in place with
`scripts/deploy-preview.sh` after each merge, preserving its Redis and H2 volumes.
