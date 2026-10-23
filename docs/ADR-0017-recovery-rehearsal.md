# ADR 0017: Rehearse institutional memory without issuing a new number

## Decision

The recovery bureau offers `GET /operations/recovery` for its latest process-local
verdict and `POST /operations/recovery` for an explicit read-only rehearsal. The
website presents both. A rehearsal takes the journal's append lock, opens a
fresh repository read, validates the live and stored hash chains independently,
then compares their counts and per-entry digests. Its result includes a finding,
stored count, head digest, elapsed time, and whether the configured H2 URL names
a file-backed store.

The bureau does not put a certificate in the audit ledger: documenting that a
read-only check occurred must not change the material being checked. A failed
rehearsal returns HTTP 503 and stays visible to later `GET` requests until the
next rehearsal or process restart. Loading errors are reported as
`STORAGE_UNAVAILABLE` without leaking database details to website visitors.

## Consequences

Operators can catch corruption or divergence introduced after process startup,
including a file that reopens but contains altered data. The append lock ensures
the comparison uses one stable point in time. The endpoint deliberately runs
only on POST so ordinary page loads and readiness checks avoid a full store scan.

This is an integrity rehearsal, not a backup, a restore, or proof that the disk
will survive an incident. The `durable` field is true only for a file-backed H2
URL; an ephemeral store can demonstrate agreement but cannot promise survival
of a process restart. The last verdict is process-local and may become stale
as soon as the next write occurs.
