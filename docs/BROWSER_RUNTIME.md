# Sovereign Browser Residency Charter

The default showcase is a static site. Java business code is compiled by
TeaVM 0.16.0 into WebAssembly GC and, separately, JavaScript. TypeScript
supplies the host adapters and interface. There is no TypeScript FizzBuzz
implementation. The JVM implementation remains available through Spring.

## Ratification commands

Requirements: Java 17, Maven, Node 22.18+ (or Node 24+), pnpm 10.

```
pnpm install --frozen-lockfile
pnpm exec playwright install chromium firefox webkit
pnpm build
pnpm typecheck
pnpm test:parity
pnpm test:e2e
node scripts/build.ts --assets-only
pnpm preview
```

Open http://localhost:18090/. Publish `dist/` on any static HTTP(S) host.
Directory indexes, relative links, and assets support a hosting subdirectory.
`file://` is not supported. IndexedDB, Web Locks, Web Crypto, workers, and
service workers require a compatible browser and a secure context (localhost
is allowed). WebAssembly GC failure selects JavaScript compiled from the
same Java; it never selects a server. The runtime API identifies the engine.

`mvn clean verify` builds core/server and runs JVM tests. `mvn -Pbrowser
install` also compiles both browser targets. Historical sources stay in
`src/`; module compiler boundaries select portable core and JVM adapters.
Spring annotations are compile-time metadata for the core. H2, Redis sockets,
HTTP listeners, environment-based audit configuration, and JCA hashing belong
to the server artifact. Browser hashing uses Web Crypto through `AuditDigest`.

## Optional server deployment

```
SLOPBUZZ_RUNTIME=server SLOPBUZZ_API_BASE_URL=/java-api pnpm build
```

This writes `runtime-config.json` with server mode and the chosen API prefix.
The supplied nginx configuration proxies `/java-api/` to the JVM on port
18089. Alternatively host the generated assets beside the Java API under a
same-origin reverse proxy. Cross-origin deployments need explicit CORS and
CSP configuration on the host. Browser mode is the default and has no public
mode selector. The Java server's bundled UI uses server mode automatically.

`docker compose up --build -d` still starts the JVM, Redis, and H2 stack.
The merged-preview deployment script builds and validates the static release,
then serves it at http://localhost:18088/ and keeps the existing JVM/H2 stack
at http://localhost:18089/. Its original named audit volume is retained.

## Custody and limitations

Each origin and site base path owns an IndexedDB database. An exclusive Web
Lock appoints one dedicated worker. Other tabs forward requests over a
BroadcastChannel; the owner serializes them. Audit appends use `add`, never
an overwrite, and await transaction completion before acknowledging success.
A lost owner releases its lock. The successor reopens and verifies the chain,
rehydrates the queue, and begins fresh transient scorecard/rehearsal state.
The persistent cache survives and retains the shared 24-hour policy, bounded
to the 1001 accepted limits. Cache failure bypasses caching; audit failure
cannot be represented as a successful proclamation. Existing per-line
transaction semantics remain: a failed mandate may have committed earlier
lines. Unknown outcomes are never automatically retried.

Browser persistence is subject to user deletion, quota, private-mode rules,
and browser eviction. It is neither a backup nor shared corporate storage.
Audit chains detect changes; they are not authentication against a person
who controls the browser. ISO 9000 and SOC 2 remain OPEN. No certificates are
invented by relocating the enterprise.

The offline worker installs the entire release, including both compiled
engines, documentation, fixtures, and the validation report, before declaring
it available offline. Failed installation does not replace the active release.
New workers wait for old tabs to close; no `skipWaiting` or mid-request takeover.
Different revisions cannot share a live owner. Closing all site tabs permits an installed update.

TeaVM's generated WebAssembly JSO wrappers use dynamic JavaScript functions.
The supplied hosts allow `unsafe-eval` **only in the runtime worker's response
CSP**. The HTML document retains its stricter policy. A host that forbids those
wrappers selects the JavaScript fallback. Serve `.wasm` as `application/wasm`.
Runtime scripts and fonts are bundled, and business operations stay local.
Optional cookieless analytics is forwarded to PostHog through the first-party
intake proxy; it is not required for offline operation.

## Evidence

`pnpm test:parity` obtains output from the real Spring graph for every limit
0–1000, checks an independent mathematical oracle, then compares actual
Chromium, Firefox, and WebKit execution in both compiler targets. Stateful
fixtures use the shared dispatcher with a fixed clock and an isolated H2
repository. Their bodies, statuses, and contract headers are compared exactly;
trace identity propagation and fresh span shape are checked separately.
Production time is never replaced by the fixed tribunal clock.

`pnpm test:e2e` checks the actual UI, cache, tab coordination, recovery,
corruption refusal, an actually stopped origin, subdirectory hosting, safe
release updates, append rejection, and IndexedDB transaction rollback. A
portable fault tribunal also exercises queue retries, dead letters, duplicate
delivery, notarial rejection, Unicode hashing, and cache bypass in all six
browser/compiler combinations.
JVM tests continue to cover queue retry/dead-letter behavior, notarial
rejection, storage failures, and the HTTP adapter. Temporary databases and
fresh browser contexts isolate verification from the deployed audit volume.

`/validation/` publishes release-specific results. Its button runs a separate
browser database against bundled JVM fixtures. That local rehearsal is not a
new JVM execution or a CI certification. A missing or mismatched report is
shown as NOT_RUN, never inherited as a pass from another release.

## Extended numerical mandates

The main demo has no upper magnitude cap. It uses Number through the safe integer
boundary and native BigInt beyond it, with optional numeric-character correction.
Extended runs use the shared Java BigInteger window and forecast bureaus; they
work offline and in server mode. These windows are transient and do not grow the
retained audit/cache repository. Output retains the latest 1000 displayed lines,
with pause, expedited disclosure and Stop controls. See
[ADR 0023](ADR-0023-unbounded-mandates.md) for contracts and precision guarantees.
