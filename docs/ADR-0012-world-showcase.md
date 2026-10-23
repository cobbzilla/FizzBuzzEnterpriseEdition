# ADR 0012: The world showcase and Redis memory bureau

## Status

Approved for a containerized public demonstration.

## Context

The enterprise had eleven decisions, multiple operational desks, and no
single page on which a visitor could actually see them work. Repeated public
requests for the same deterministic numerical mandate also forced the Spring
committee to rediscover a settled answer.

## Decision

The existing Java HTTP process serves a responsive, same-origin website at
`/`. Native HTML forms, buttons, landmarks, headings, and disclosure controls
provide the structure. JavaScript modules use Fetch to run the live service,
forecast its line mix, and display health, readiness, cache, scorecard, audit,
and evidence reports. Status changes are announced through persistent live
regions, inputs have visible labels and errors, and reduced-motion preferences
are respected. The implementation targets the applicable [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/)
criteria and uses [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
where native HTML alone does not convey dynamic status. Automated checks and
manual keyboard review are recorded in the showcase runbook; neither alone
constitutes an accessibility certification.

When `SLOPBUZZ_REDIS_HOST` is configured, the HTTP proclamation desk first
consults Redis for the full answer to a validated limit. A hit returns the
cached bytes, while a miss runs the real Spring service and stores the result
with a one-day expiry using [Redis `SET ... EX`](https://redis.io/docs/latest/commands/set/).
The cache uses RESP2 over a private network, a 200 ms connection/read timeout,
and fails open to the real engine if Redis is unavailable. Redis is bounded to
64 MB with [allkeys-lru eviction](https://redis.io/docs/latest/develop/reference/eviction/)
in the supplied Compose stack. Cached replies are reported with
`X-SlopBuzz-Cache` and at `GET /cache/status`.

The Compose H2 URL holds the database open briefly between individual audit
commits with `DB_CLOSE_DELAY=10`. [H2's performance guidance](https://h2database.com/html/performance.html)
identifies repeated database opening as especially slow when the last
connection closes. Each certificate is still committed separately.

The output audit journal records generated lines. A cache hit serves an
already generated answer without creating duplicate line certificates; HTTP
requests, including hits, remain counted by the service scorecard. The
showcase displays client-measured elapsed time and a one-second target. That
target is evaluated against local smoke measurements, not asserted as a
universal guarantee for every network and host.
