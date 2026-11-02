# ADR-0028: Vacant String Real Estate and Occupancy Directorate

Status: accepted. Shared Java business implementation; TypeScript presentation.

## Corporate problem

An output transaction previously allocated a `StringBuilder` and immediately
allowed characters to move in. The extended-magnitude path began a line with an
empty string. Neither possessed a surveyed property, an eviction jurisdiction,
a lease, or evidence that nothing had been there before something arrived.

The company now obtains permission to occupy its empty output buffers.

## Authorities and custody

Five replaceable interfaces govern six office decisions: `PremisesAllocator`,
`VacancyInspector`, `EvictionAuthority`, `OccupancyLeaseAuthority` and
`PremisesAuditor`. The inspector performs both the initial survey and vacancy
reinspection. Spring injects the default offices into
`VacantStringPremisesDirectorate`; reflection-free assembly uses the same
implementations. `OutputTransactionCoordinator` accepts an injected directorate,
and the shared dispatcher gives that directorate to extended line production.

The six decisions are allocation, initial survey, eviction, reinspection,
leasing and independent audit. Discovery is a recorded finding, not a failed
numerical result. An initially empty property needs no eviction. A later lease
refusal retains the fact that vacancy reinspection succeeded, when it did.
Rejected offices identify their reason; subsequent offices are not reached.

Each request has an exact positive decimal ordinal and purpose. Requests,
premises, surveys and leases bind by Java object identity. A matching printed
ordinal does not transfer custody between requests. Survey snapshots and their
identified tenants are immutable. Writable storage remains encapsulated in the
premises; a lease admits appends only while its particular premises remain open.
Closed premises cannot issue a second lease. Release is idempotent and discards
the private staging contents after publication or failure cleanup.

The directorate checks actual allocation ownership, current survey snapshots,
completed eviction and active lease bindings at the relevant boundaries. The
independent auditor also verifies the actual zero-length buffer. A foreign
survey is refused before its contents enter the current request's dossier.

## Occasional invisible tenants

The default, replaceable allocator supplies one initial hidden character at
every seventh positive ordinal. It cycles through ten registered occupants:

| Code point | Declared occupant |
| --- | --- |
| U+00A0 | NO-BREAK SPACE, a non-breaking space |
| U+000A | LINE FEED, newline |
| U+0009 | HORIZONTAL TABULATION, TAB |
| U+000B | VERTICAL TABULATION, VT |
| U+0007 | ALERT, BEL, historically called bell |
| U+000D | CARRIAGE RETURN, CR |
| U+000C | FORM FEED, FF |
| U+200B | ZERO WIDTH SPACE |
| U+FEFF | ZERO WIDTH NO-BREAK SPACE, BOM |
| U+2060 | WORD JOINER |

Names and control aliases follow the Unicode Character Database's
[UnicodeData](https://www.unicode.org/Public/18.0.0/ucd/UnicodeData.txt) and
[NameAliases](https://www.unicode.org/Public/18.0.0/ucd/NameAliases.txt).
BEL is represented by a readable name and code point; the site plays no sound.

This is a reproducible fictional property condition, not a random defect in
arithmetic or storage. Ordinal seven actually receives a buffer containing a
non-breaking space. The inspector reads that content, identifies it, and the
eviction office removes it. A second inspection proves that the actual buffer
is empty before a lease is usable. The discovered character never enters the
numerical payload. Ordinal fourteen similarly has an initial newline removed;
the legitimate line separator is appended later under the issued lease.

Residues are computed iteratively over the exact decimal string modulo seventy.
There is no floating-point narrowing, recursive decimal regex or arbitrary
magnitude ceiling. Initial surveys admit at most 256 UTF-16 units to bound fault
specimens. Subsequent leased output and ordinal magnitudes have no such cap.
Unknown or visible occupants require a different jurisdiction and are refused,
rather than silently discarded. Mixed initial occupancy is cleared only when
every surveyed character belongs to the registered removal procedure.

## Production and observation

Retained production leases the actual transaction staging buffer before any
fragment enters it. The existing independent proclamation notary checks the
complete payload; publication and audit retain their established contracts.
Commit and abort release the room even when audit persistence fails. The
standalone fragment-writing compatibility path retains its existing behavior;
this policy governs complete numerical production transactions.

Extended windows lease each actual line assembly, append the authorized text
and LF, and release after copying the completed line into the finite response.
They retain their existing transient audit/cache behavior and independent
lexical witness. A zero-number mandate produces no line and acquires no line
lease. Cache hits and older owners do not acquire imaginary new certificates.

Existing execution custody records the actual offices and discoveries. One
`PREMISES_CERTIFICATE` event carries an immutable `slopbuzz-premises/v1` dossier
for an approved production case. The pre-occupancy vacancy is a historical
snapshot, not a claim that the occupied buffer remains empty afterward.
Optional observers cannot authorize or veto a business operation.

## Public experience

Official output remains first. Each applicable chronicle folio explains the
actual property process, with separate varied phrase pools for vacancy and
hidden-occupant discovery. Selected prose stays stable during inspection and
replay. A compact card names discovered occupants and distinguishes initial
occupancy, vacancy reinspection and the usable lease. Existing department papers
retain the literal decisions. Chronological panels keep their fixed height and
reader-controlled following.

The demo includes a read-only property inspection desk below the existing
advisory and court panels. It offers ordinary and empty properties, all ten
named characters, an unauthorized visible tenant, a non-performing eviction
office, a borrowed lease and an already closed lease. These are separate
specimens, not historical evidence for a previous mandate.

`GET /premises/rehearsal` accepts optional `scenario` and `ordinal`; defaults
are `survey` and `7`. Recognized business refusals return a 200 REJECTED dossier;
invalid queries return 400 and other methods return 405. Successful specimens
have `Cache-Control: no-store` and `X-SlopBuzz-Proceedings: READ_ONLY_REHEARSAL`.
Their leases close before return. They create no numerical output, audit entry,
cache record or queue message. The operation is available through the human API
charter and the current read-only runtime during legacy-owner overlap.

All controls have explicit labels. Six native disclosure controls expose the
office documents; only a concise inspection result is live-announced. Names and
code points use text nodes, never raw hidden characters or HTML interpolation.
Mobile and enlarged text use a single-column layout. There are no new mandatory
reading delays, header entries or links to the bestiary.

## Validation

Parameterized JVM cases inspect 140 consecutive ordinals and separately prove
their exact publication and audit payloads. Additional tests cover all ten
registered characters, stale and foreign surveys, matching-ordinal foreign
requests, borrowed and expired leases, invisible unregistered occupants,
supplementary code points, failed eviction, audit veto, cleanup, concurrency,
unbounded leased text and thousand-digit ordinals. A shared portable tribunal
sustains the same ownership and removal objections in JVM and browser engines.

Exact equivalence fixtures include every specimen and malformed query, supported
methods, explained numerical production, and the portable tribunal. TypeScript
contract tests reject inconsistent status, office order, Unicode positions and
invented vacancy. Browser tests cover real discoveries, stable replay, honest
cache reuse, all objections, zero audit side effects, exact large windows,
offline operation, older owner overlap, optional Java mode, keyboard access,
mobile reflow and automated accessibility. Publishing retains the full gate.
