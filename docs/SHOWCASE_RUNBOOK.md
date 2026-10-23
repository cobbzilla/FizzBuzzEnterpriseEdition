# World showcase operating notes

## Run the complete local demonstration

```sh
docker compose up --build -d
```

For the shared workspace preview, run `./scripts/deploy-preview.sh` instead. It
keeps the Compose project running at `http://localhost:18088/` and rebuilds
the app in place after each `slopbuzz` merge, preserving Redis and H2 state.
It requires a clean mainline checkout, waits for readiness, and checks that
`GET /operations/release` reports the deployed Git SHA.

Open `http://localhost:8080/`. Set `SLOPBUZZ_HTTP_PORT` before starting if
port 8080 is already in use. The Compose stack includes the Java website,
private Redis cache, and an H2 audit volume. Redis has a 64 MB limit and LRU
eviction. The H2 database remains open briefly between line commits to avoid
repeated file opening. The cache is disposable; the audit volume is durable.

Open `/api` for the searchable human guide or `/openapi.json` for its OpenAPI
3.2.1 source. The guide's request controls call the same origin; POST controls
run their documented actions only when selected.

Run the mandate for 15 twice. The first response should report `MISS` in the
page and `X-SlopBuzz-Cache` header; the second should report `HIT`. The
operations section shows cache counters and the current audit state. A cache
hit does not create a second set of line certificates.

The demo reveals one line at a time at its default **Boardroom deliberation**
pace and keeps the latest line scrolled into view. **Unsupervised reality**
renders all lines immediately. The elapsed measurement ends when the HTTP
response arrives, before the visual reading begins.

After a mandate, copy its trace receipt from the page. The HTTP response also
contains `X-SlopBuzz-Trace-Id` and `X-SlopBuzz-Span-Id`; the application log
records the same values with request status and duration. A valid incoming
`traceparent` keeps its trace ID and receives a new span. The guide at `/api`
lists these headers and shows them beside live responses. Trace IDs correlate
logs; they do not prove who made a request.

Select **Convene rehearsal** in Operations to run the synthetic assurance
bureau. A passing run reports fifteen observed lines, a valid audit chain, and
an approved verdict. It creates fifteen fresh audit entries even if the
fifteen-number answer is already cached, because the rehearsal exercises the
real Spring path. `GET /operations/canary` reads the last verdict. A POST
starts a new rehearsal when the fifteen-second admission lease has expired;
inside that lease it returns the same verdict with
`X-SlopBuzz-Rehearsal: REUSED` and creates no new audit entries. Its result
is process-local.

Select **Rehearse recovery** to reopen and verify the audit repository without
adding certificates. The verdict reports whether the stored copy matches the
live ledger at that instant, how many entries were read, and whether H2 uses a
file-backed URL. `GET /operations/recovery` reads the latest process-local
result. A failed POST returns 503. This inspection does not test backup restore.

Without Redis, `java` and the original Docker image still serve correct
FizzBuzz answers and the website. The cache reports `BYPASS` and the
application continues to work. Set `SLOPBUZZ_REDIS_HOST` and optionally
`SLOPBUZZ_REDIS_PORT` to use a private Redis service outside Compose.

## Public deployment

Place the app behind an HTTPS reverse proxy with a public hostname. Forward
the loopback-bound app port to the proxy; do not expose Redis or the H2 volume publicly. Keep the
same-origin website and API together so browser requests need no cross-origin
permissions. Arrange TLS termination, hostname, resource sizing, and
monitoring in the target host's deployment system. The repository does not
claim a public deployment or a domain until those steps are performed.

## Verification charter

* `mvn clean package` compiles the website into the jar and runs the Java
  suite, including HTTP asset, security-header, Redis protocol, and fallback
  checks.
* Check keyboard access to the navigation, form, pace selector, preset buttons,
  operations refresh, canary and recovery rehearsals, API search and request
  controls, and evidence disclosure; ensure focus stays visible.
* Run the form at limits 0, 15, 100, and 1000. Verify the output, forecast,
  status announcement, response time, and cache state.
* Check narrow and wide layouts, 200% zoom, and a reduced-motion preference.
* Reload after a deployment and check that CSS and JavaScript URLs carry their
  current content fingerprints. A matching ETag should return 304; a changed
  asset fingerprint should cause a fresh request.
* Review the page against WCAG 2.2 AA. Semantic and ARIA checks establish a
  target, not a formal conformance finding.
* For a warm-cache response-time sample, issue repeated requests to
  `/fizzbuzz?limit=1000` and record client-observed durations. The one-second
  target is a local demonstration measure; network conditions may differ.

On 2026-10-22, a local Docker Compose check on a Mac measured a cold audited
999-number response at 484 ms after H2 connection tuning. Thirty warm Redis
responses each at limits 15 and 1000 were all cache hits: p95 was 45 ms and
5 ms respectively. These are loopback samples, not a production SLA.

After the classification ballot was added on 2026-10-22, a fresh 991-number
mandate on the same local Compose stack returned 991 correct lines in 567 ms
with `X-SlopBuzz-Cache: MISS`. This is another single loopback observation,
not a production response-time guarantee.

The final mobile browser checks at 390 and 320 CSS pixels found no horizontal overflow;
Tab reached the skip link first and the first 18 controls, including the demo
and operations buttons, had a visible 3 px focus outline. An invalid mandate
focused its input and populated the associated error message. An axe-core WCAG 2.2/best-practice scan found
zero violations and 46 passing rules. Its one incomplete rule was color
contrast over the decorative grid; manual worst-case color pairs in that
region were at least 4.66:1 for text, and the brand and memorandum pairs were
at least 5.36:1. Automated and manual checks do not establish a certification.
