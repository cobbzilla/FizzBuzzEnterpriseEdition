# World showcase operating notes

## Run the complete local demonstration

```sh
docker compose up --build -d
```

Open `http://localhost:8080/`. Set `SLOPBUZZ_HTTP_PORT` before starting if
port 8080 is already in use. The Compose stack includes the Java website,
private Redis cache, and an H2 audit volume. Redis has a 64 MB limit and LRU
eviction. The H2 database remains open briefly between line commits to avoid
repeated file opening. The cache is disposable; the audit volume is durable.

Run the mandate for 15 twice. The first response should report `MISS` in the
page and `X-SlopBuzz-Cache` header; the second should report `HIT`. The
operations section shows cache counters and the current audit state. A cache
hit does not create a second set of line certificates.

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
* Check keyboard access to the navigation, form, preset buttons, operations
  refresh, and evidence disclosure; ensure focus stays visible.
* Run the form at limits 0, 15, 100, and 1000. Verify the output, forecast,
  status announcement, response time, and cache state.
* Check narrow and wide layouts, 200% zoom, and a reduced-motion preference.
* Review the page against WCAG 2.2 AA. Semantic and ARIA checks establish a
  target, not a formal conformance finding.
* For a warm-cache response-time sample, issue repeated requests to
  `/fizzbuzz?limit=1000` and record client-observed durations. The one-second
  target is a local demonstration measure; network conditions may differ.

On 2026-10-22, a local Docker Compose check on a Mac measured a cold audited
999-number response at 484 ms after H2 connection tuning. Thirty warm Redis
responses each at limits 15 and 1000 were all cache hits: p95 was 45 ms and
5 ms respectively. These are loopback samples, not a production SLA.

The final mobile browser checks at 390 and 320 CSS pixels found no horizontal overflow;
Tab reached the skip link first and the first 18 controls, including the demo
and operations buttons, had a visible 3 px focus outline. An invalid mandate
focused its input and populated the associated error message. An axe-core WCAG 2.2/best-practice scan found
zero violations and 46 passing rules. Its one incomplete rule was color
contrast over the decorative grid; manual worst-case color pairs in that
region were at least 4.66:1 for text, and the brand and memorandum pairs were
at least 5.36:1. Automated and manual checks do not establish a certification.
