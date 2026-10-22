# ADR 0007: Audit message delivery proceedings

## Status

Queued for immediate consideration.

## Context

The database retains audit certificates, but no separate institution was
informed when a certificate arrived. A report assembled directly from the
journal would be distressingly straightforward.

## Decision

After the journal commits an entry to its store, it publishes a copy to a
process-local message queue. A status projection consumes a fixed batch when
`GET /audit/status` is called. Failed deliveries retry on later polls. The
third failure sends a message to a dead-letter list. Successful delivery is
idempotent by certificate digest.

On startup, the queue receives all entries loaded from the audit store, so a
new process can rebuild its projection. The HTTP status report distinguishes
committed, aborted, pending, and dead-letter counts and reports whether the
journal's in-memory chain verifies.

The queue and dead-letter list are in memory. Only the source journal is
durable. This is a pull-driven message queue, not an external broker or an
assurance of delivery to any other process.
