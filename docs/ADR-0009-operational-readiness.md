# ADR 0009: The operational readiness commission

## Status

Approved for internal deployment decisions.

## Context

`/healthz` establishes that the HTTP desk can answer a request. It does not
establish that the audit chain is intact or the delivery institution is fit
to receive more certificates. The queue is pull-driven, so an ordinary pending
message is expected until `/audit/status` convenes a dispatch.

## Decision

`GET /readyz` convenes three electors over a single observation of the audit
journal and message queue:

* Integrity approves only when the in-memory journal chain verifies.
* Capacity approves when at most 10,000 certificates are pending, inclusive.
* Delivery approves only when there are no dead letters.

The commission requires unanimous approval. It returns a plain-text ballot
and HTTP 200 when ready, or HTTP 503 when any elector vetoes. `/healthz`
remains a liveness check and continues to answer 200 even if readiness fails.
The capacity allowance admits normal pull-driven backlog; it is a local policy
threshold, not a promised throughput or service level objective. This probe
does not repair a failed control, drain messages, or confer certification.
