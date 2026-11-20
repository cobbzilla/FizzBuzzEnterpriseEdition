# ADR 0045: Enterprise Points and the Department of Earned Importance

Status: Accepted. Date: 2026-11-20.

The companion-only portfolio rewarded appointments but omitted almost all of the
work visible in the office. Scoring now credits actual completed work, temporary
executive authority and extraordinary operations while keeping numerical output
and audit custody independent of presentation rewards.

## Decisions

`web/scoring-language.ts` defines a closed TypeScript expression language with
exact integer arithmetic, table lookups, bounded financial formulas and decimal
properties. `web/scoring-rules.ts` is the authoritative manifest for prices,
scopes, boost durations, achievement criteria and heist economics. Expressions
are evaluated without `eval`; the same AST renders human-readable formulas.

`EnterpriseScoringService` owns run accounts, bounded category/rate aggregates,
the last 100 award receipts, incident custody, reorganization warrants and badge
progress. Quantities and amounts serialize as decimal strings and calculate with
BigInt. `Intl.NumberFormat` formats integers directly. The presenter never
calculates an award, debit or refund.

Java emits price-free `slopbuzz-work/v1` counters through `ExecutionWorkObserver`
and `StructuredWorkReceipt`. A request retains at most 1,002 ordinal groups and
128 work kinds per group, independently of the narrative trace's retention cap.
The adapter releases cycle counters alongside genuine output disclosure. Cache
hits report reuse work without inventing manufacturing. Missing work evidence
marks a partial score without changing FizzBuzz output. Asynchronous appointment
evidence retains its originating run and captured cycle, even after replacement.

Milestone boosts begin on the following number cycle: every 250 lines grants
×2 for 20 cycles, every 500 grants ×3 for 10, every 1,000 grants ×5 for four and
every 5,000 grants ×10 for one. Only the strongest grant applies. Incident awards
capture the triggering cycle and actor rarity. Entrance grants, achievements,
literacy, manual moves and dividends are flat; theft and recovery are transfers.

Natural heists expose a fixed eight-percent budget taken from the opening net
balance before their own rewards. Three active seconds of grace precede linear
theft through second fifteen. Player recovery is complete through second four,
then declines to a ten-percent floor by second fourteen; automatic resolution
returns nothing. Integer refunds round up but never exceed the debit. Pause,
relocation, hidden pages and obscured financial/intervention controls stop the
clock. Disabling future incidents cannot dismiss an active liability. Rehearsals
have no financial effect.

`OfficeScoringAdapter` consumes completed logical flight, heist and relocation
facts. It does not infer completion from animation frames or count repeated UI
clicks. Natural flights retain their existing unlimited cadence. Scored moves
consume one warrant only on successful completion; subsequent progress proves
that interrupted work actually resumed.

## Presentation and persistence

Observe and the persistent active-run banner offer a compact exact balance and
badge control. A native dialog contains reconciled components, formula details,
receipts and the sixteen original SVG badges. Locked states retain readable
labels and progress. Contextual heist controls show exposure and recovery with
bounded financial announcements. Native modal focus, fullscreen relocation and
keyboard-scrollable tables preserve access on narrow or enlarged displays.

The browser retains the latest and previous run plus a bounded achievement
cabinet. Ordinary refresh/installation reset preserves them; full site reset
clears them. Legacy `slopbuzz:companion-portfolio:v1` receipts keep their original
prices and guide. Records identify the rules, mandate and execution conditions;
they are local evidence for future high-score work, not authenticated rankings.

`scripts/scoring-guide.ts` generates `/scoring/`, machine-readable rules and
immutable `/scoring/enterprise-v2/<identity>/` editions. The build checks manifest
identity, seals the JSON with SHA-256 and emits all retained archive editions.
The static guide works without JavaScript; progressive enhancement localizes
numbers. Guide routes participate in the persistent site shell and offline cache.

## Validation

Independent scoring fixtures cover exact totals, multiplier boundaries, repeated
appointments, debit/recovery rounding, receipt deduplication, late ownership,
long-run bounds, legacy records and generated formulas. Java tests establish
work receipt completeness under exhausted narrative retention. Browser checks
exercise natural incidents, keyboard/contrast behavior, narrow layouts,
navigation and persistence alongside the existing cross-engine parity and
serial browser release gates. Each browser case uses a fresh resource-capped
container and verifies cleanup before another case begins.
