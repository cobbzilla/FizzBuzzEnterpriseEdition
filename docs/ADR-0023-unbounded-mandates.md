# ADR 0023: Unbounded input magnitude and finite disclosure windows

## Input jurisdiction

The demo accepts non-negative decimal integers without an application magnitude
cap. The input is text with a numeric keyboard hint. Optional Numeric Character
Governance removes every character except ASCII digits 0–9, immediately when
enabled and on subsequent input. It starts unchecked; unchecked text is preserved
and validated on submission. Negative, fractional, scientific and hexadecimal
notation are not decimal upper limits.

TypeScript uses Number while `Number.isSafeInteger` holds and native BigInt
otherwise, parsing large values directly from their decimal text. No external
big-integer library is required. Beyond 9007199254740991, a small policy notice
is selected from twenty distinct warnings. Consecutive oversized entries select
different notices. Returning to an ordinary value hides the notice.

## Execution and custody

The established 0–1000 proclamation and cache/audit contracts remain available.
Larger demo mandates use `/fizzbuzz/window?start=N&count=C`, starting at one and
advancing through at most 100 lines per response. Shared Java BigInteger code
produces the output in JVM, WebAssembly and compiler-generated JavaScript; glyph
procurement supplies the words and an independent lexical witness checks them.
The count bound is a transport bound, not an upper limit on ordinal magnitude.

These extended windows are explicitly TRANSIENT and bypass retained audit/cache
storage. The UI discloses that distinction and retains its latest 1000 text nodes.
Pause stops disclosure, waived delays expedite finite batches, Stop invalidates
the current run, and realtime yields to the event loop between windows. Starting
a new mandate invalidates older replies. Already prepared transient windows have
no persistent side effects. Finite memory, computation time and browser arithmetic
capacity still govern what can physically be completed; an astronomical limit is
not presented as instantly completed.

`/capacity/forecast/extended?limit=N` calculates the mix and workload using Java
BigInteger. All numeric JSON fields are decimal strings to preserve exactness.
New API request desks retain those decimal strings. Legacy bounded endpoints keep
their existing schema, callers and fixtures. Extended output uses LF line endings.

## Validation

Tests cover the safe-number boundary, thousand-digit magnitudes, invalid text,
opt-in correction, all twenty warnings, independent native BigInt comparisons,
finite windows, exact forecast strings, stopping and replacement, pause/expedite,
rolling retention, scrolling, accessibility and keyboard operation. JVM fixtures
and the browser parity suite exercise the new endpoints in all six compiler/browser
combinations. Live release checks complete an extended run and stop a BigInt run.
No mandate bounds, output lines or warning text are added to analytics events.
