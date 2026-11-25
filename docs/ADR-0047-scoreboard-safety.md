# ADR 0047: Rolling Comparative Importance and Administrative Discretion

Status: Accepted. Date: 2026-11-24. Supersedes ADR 0046's single-board and voluntary
score-upload decisions; its receipt accounting and browser identity remain.

Daily, weekly and monthly are rolling 24-hour, 7-day and 30-day windows, with an
additional all-time board. A server-accepted net-score change renews eligibility
for the full run score. Every board chooses one candidate per browser before
ranking. This requires retaining lower recent final scores and updating outbox
compaction, rather than merely filtering the former all-time winner table.

Scores are recorded anonymously even when a visitor declines naming. Anonymous
Coward is a presentation, not a shared identity. A name ban likewise changes
presentation without disqualification. Restricted Damerau–Levenshtein compares
character equivalence sets for leet substitutions, with conservative short-name
thresholds and bounded work. Public responses mask names before serialization;
private owner responses may show the original. Versioned bans are rechecked at
read time while stored classifications catch up.

Worker-served administration protects HTML, scripts, styles and APIs with Basic
authentication over HTTPS. Its credentials and Resend key are encrypted Worker
secrets, excluded from public B2 artifacts. Admin deletion atomically blocks the
browser credential and removes its results; name banning is a separate action.

Finalized qualifying submissions enqueue one notification per owner/run in their
D1 transaction. Delivery uses leases, a frozen payload and stable Resend
idempotency keys, with scheduled retry independent of visitor traffic. Ambiguous
attempts outside the provider's 24-hour deduplication window require review.
Scoring continues during email failures. No retrospective migration emails.

See HIGH_SCORES.md for credential configuration, public APIs, moderation, retention,
operations, validation and rollback requirements.
