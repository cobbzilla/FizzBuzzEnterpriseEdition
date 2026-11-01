# ADR 0024: First Ordinal Onboarding and Probation Directorate

The presentation described here was superseded by
[ADR 0025](ADR-0025-executive-execution-chronicle.md): output now precedes the
scrolling execution chronicle, and personnel case papers open separately. The
request-bound HR evidence and approval policy remain in force.

## Decision

The production loop initializer obtains its starting ordinal from seven Java
interfaces: `HeadcountPlanningAuthority`, `InitialOrdinalRecruiter`,
`OrdinalIdentityOffice`, `OrdinalOfferAuthority`, `OrdinalInductionRegistrar`,
`OrdinalProbationBoard` and `CommencementCertificateAuditor`. Spring injects the
stateless implementations. The no-argument initializer used by the explicit
browser graph constructs those same implementations. There is no human approver.

Headcount funds one Initial ordinal position; Recruitment nominates 1; Identity
requires literal equality to 1; Offer binds the verified applicant; Induction
records `INITIAL-ORDINAL-HANDBOOK/v1` and three ordered acknowledgments; Probation
requires that evidence; Independent Audit separately verifies every predecessor
object identity, vacancy policy, candidate, handbook, acknowledgment and ordinal.
The directorate returns the actual auditor result only if it equals 1. Consumer
guards also refuse a substituted initializer that changes the starting point.

Documents are immutable. Two case objects displaying the same reference do not
share custody. These references are request trace labels, not cryptographic
identities. No persistent HR database, employment or real certification is implied.
A zero-line mandate still initializes at 1, then its existing loop condition
declines to proceed. Extended windows obtain clearance when starting at 1; arbitrary
later starts retain their exact BigInteger value and do not rehire the first ordinal.
The independent numerical notary and mathematical test oracle remain independent.

## Request-bound evidence

`PersonnelEvidenceCustody` captures a completed dossier in a lexically scoped,
nested, thread-local capture. Each dispatcher response gets its own captured
record, never a mutable global last result. Rehearsal inspection does not populate
a mandate capture. The trace contains seven ordered decisions: APPROVED, REJECTED,
or NOT_REACHED. A rejected office supplies its actual reason; downstream offices
are explicitly not reached. The ordinal is null after rejection.

`X-SlopBuzz-Onboarding-Trace` contains ASCII-escaped JSON with schema
`slopbuzz-onboarding/v1`. Records larger than 8192 characters are omitted with
state UNAVAILABLE. The plain-text output body is unchanged. The header is captured
from actual production initialization, including failures; it is neither copied
into output cache entries nor persisted in the numerical audit journal. A cache
hit reports state CACHE_REUSED and no new trace. Later extended windows report
CONTINUATION and no trace. Services without evidence report UNAVAILABLE or omit
the headers; the UI acknowledges the absence rather than reconstructing history.

## Visible proceedings

The right-hand Official Output panel displays the case above the numerical
transcript. Each native disclosure exposes its office, rule, input, recorded
decision, finding and issued document. The left-hand speed, pause, stop and
immediate disclosure controls govern both proceedings and output. This is labeled
as reading completed proceedings: service latency is measured before reading.
Realtime adds no ceremonial delay. Replay and step-through read the captured
record without another business request. Beginning another reading or mandate
supersedes the previous disclosure; displayed numerical output is retained when
switching to a rehearsal or record inspection.

`GET /onboarding/rehearsal?scenario=approved|zero|two|missing-induction` exercises
the same Java authorities. Omission defaults to approved; ambiguous, unknown,
encoded and extra query parameters return 400. Other methods return 405 with
Allow GET. Valid rejected applications return HTTP 200 and dossier status REJECTED.
Zero and two fail Identity Office; missing induction fails Probation Review.
Rehearsals use no numerical journal or cache and return no-store. The OpenAPI
charter supplies a human-readable operation card with an operable scenario selector.

During overlap with an older persistent worker, read-only rehearsals use the
current release's transient Java worker. The old owner retains the only persistent
journal. Browser execution, both TeaVM targets, offline use and server mode share
the same authorities. No fabricated trace fills a legacy response's missing evidence.

## Release and verification

Static HTML references release-addressed script filenames and release-addressed
configuration, API charter and validation evidence. Stable aliases remain for
older pages and tools. Older service workers that ignore URL queries cannot
substitute a former release's scripts or config for new markup. The JVM's generated
bundles retain their existing content-fingerprinted serving convention.

The portable objection tribunal challenges 101 candidates and 23 independently
forged personnel files in the JVM and both browser compilers. Additional tests
cover substituted offices, false auditors, immutable arrays, nested and concurrent
captures, Spring wiring, zero output, arbitrary-magnitude continuation, actual HTTP
headers, cache hits, rejected requests and read-only rehearsal isolation. Browser
checks cover the decision record, case binding, playback cancellation, keyboard
focus, native disclosures, ARIA synchronization, enlarged text, all three browser
engines, legacy ownership, stopped-origin offline use and the optional JVM UI.
