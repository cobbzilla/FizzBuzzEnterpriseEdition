# ADR 0046: The Register of Disproportionate Achievement

Status: Accepted. Date: 2026-11-23.

## Decisions

The public Worker owns a persistent Cloudflare D1 register. B2 continues to serve
the website and numerical execution remains in the browser. One browser
credential owns one visible candidate: the greatest of its current accepted run
scores and best banked result. The public register exposes at most 1,000 candidates.
Displaced entries remain stored so that falling scores and withdrawals can admit
the next eligible candidate. All run lengths and scoring editions compete together.

An active run may qualify after its first disclosed line. A native dialog offers
publication or privacy, and remembers the decision for this browser. The run
continues and its exact balance continues updating while the visitor types.
Existing protections stop heist clocks when their intervention controls are
obscured. The small trophy accompanies the score in Observe and the persistent
banner; a standalone `/high-scores/` page provides public access.

The enrollment invitation is a compact name form with publication and decline
actions. Successful enrollment closes it. A qualifying trophy click from an
undecided visitor opens this form even if the rank response arrives after the
click; a remembered decline goes directly to the board. Trophy SVGs are authored
in both score controls so navigation does not restore a text placeholder. Rank
labels contain only the position. Turnstile enrollment runs in invisible mode;
the dedicated widget is reconciled in place and the site's privacy policy links
to Cloudflare's Turnstile Privacy Addendum.

Names contain 1–24 trimmed ASCII letters, digits, spaces, hyphens or underscores,
including at least one letter or digit. Names are not unique identities. An opaque
Secure, HttpOnly, SameSite=Strict cookie authenticates ownership; only its SHA-256
digest is stored. Cookie loss creates a new identity. Withdrawal removes results
and participation. This is intentionally not a cross-device account system.

## Accounting and synchronization

The Worker audits `slopbuzz-leaderboard/v1` snapshots against a known scoring
manifest. It reconciles category, rule, gross, transfer and dividend totals;
checks direct rates, output classifications, bounded nonlinear awards, companion
coverage, milestones, badge counters and reorganization warrants. Three bounded
heist custody records allow exact debit/recovery reconciliation. A snapshot is
not evidence that a human actually performed the reported browser activity.
The UI and API do not describe these scores as authenticated gameplay.

Decimal strings preserve amounts beyond floating-point and SQL integer limits.
Ranking indexes sort digit count, then binary lexical score, descending. Ties use
server-recorded attainment time and a stable public entry identifier. The public
entry never contains the browser credential or private receipt body.

Conditional D1 writes and transactional candidate recomputation prevent stale
requests from undoing newer accounting. A live heist can lower the candidate;
the register never retains that run's previous peak. Retries are idempotent.
Clients coalesce changes and keep one score submission in flight, normally every
five seconds, at most once per second during a heist, and immediately for final
or incident-settled receipts. Visible standings refresh every fifteen seconds.
Outages leave numerical execution untouched and mark last-confirmed standings
as stale. Reconnection sends the latest balance, including losses.

Turnstile protects initial enrollment and Worker rate-limit bindings bound API
traffic. Same-origin writes, bounded JSON bodies and prepared statements protect
the receiving desk. These controls deter spam, not plausible forged activity.
Only newly created protocol-aware runs are submitted; older local receipts remain
available in their existing accounts. Retained rule validators must remain when
future rule editions are added, without repricing previous scores.

## Operations and validation

The existing publisher preflights Account D1 Edit and Turnstile Edit, creates or
reuses dedicated resources, applies checksummed migrations, retains Worker
secrets and deploys the API before publishing the new website. Disabling
submissions preserves reads and withdrawals. D1 persistence is independent of
Worker deployment. The operator removal command suppresses the associated
browser credential; it cannot prevent a person obtaining a fresh identity.

Local Miniflare tests exercise real D1 SQL, concurrent admission, precision,
heist losses, fallback results and the 1,000-entry boundary. Browser checks use
real scoring receipts and cover live typing, consent, updates, withdrawal and
responsive keyboard access. Browser qualification stays serial, resource-capped,
and stops and cleans its owned processes on failure.
