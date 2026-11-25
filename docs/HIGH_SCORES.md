# Persistent high scores

Four independent top-1,000 boards select each browser's best eligible full run:
Daily (24 hours), Weekly (7 days), Monthly (30 days), and All-time. Rolling ages
use server time, without midnight resets. First publication and genuine net-score
changes establish eligibility. Unchanged receipts, finalization without a score
change, refreshes, and renaming do not renew a result. Live heist losses replace
the prior score; earlier peaks are not retained. Ties use score attainment time
and stable identity. Decimal strings preserve arbitrary-precision amounts.

Ranks overlay sun, W, calendar, and trophy icons beside the score. Icons open the
corresponding board; the overlay and `/high-scores/?board=weekly` share four tabs,
50-row pagination, and personal standings. General entry defaults to Daily and
remembers the last selected board. Visible standings refresh every 15 seconds.

## Names and anonymous participation

Scores are recorded automatically after invisible Turnstile enrollment. Naming is
optional: the default is **Anonymous Coward**. Declining or dismissing the compact
name invitation remembers anonymous participation, including old `private`
preferences. A later trophy click opens scores directly. My participation can
save a name or return to Anonymous Coward without deleting scores. Cookies own
entries; duplicate names are allowed and never merge browsers. No IP addresses
are stored in D1. Browser credentials and complete receipts are never public.

Names allow ASCII letters, digits, spaces, hyphens and underscores, 1–24 characters
with an alphanumeric character. The field blocks forbidden typing and filters
paste, drop, autofill and composition results; server validation independently
rejects invalid names. Names are always rendered as text.

Banned names keep their scores but display Anonymous Coward publicly. Only their
own authenticated browser and the protected administrator can see the submitted
name. Public JSON never includes the hidden name. Matching ignores case and
separators, evaluates common ambiguous leet substitutions without enumerating
combinations, and permits adjacent transposition. Edit thresholds are zero for
normalized lengths 1–4, one for 5–9, and two for 10–24, with a 20% relative bound.
The shorter name determines the threshold. Matching is whole-name, not arbitrary
substring censorship. Admin previews show the matching rule and distance.
Versioned classification and read-time checks make bans effective before the
background flag refresh completes. The anonymous placeholder cannot be banned.

## Protected administration and credentials

`/admin/high-scores/` and every asset/API under it require Worker-enforced HTTP
Basic authentication over HTTPS. They are never uploaded as public B2 assets or
cached by the service worker. Admin mutations require same-origin JSON and the
`X-Scoreboard-Admin: 1` header. Authentication failures are throttled. Credentials
are verified using native Web Crypto HMAC verification.

Set credentials in ignored `.env.high-scores-admin`:

```dotenv
HIGH_SCORES_ADMIN_USERNAME=admin
HIGH_SCORES_ADMIN_PASSWORD=your-long-random-password
```

Publication generates a random 32-byte password into this file with mode 0600
when neither local nor remote credentials exist. It never prints the password.
Alternatively set both encrypted secrets in Cloudflare Workers & Pages →
slopbuzz-public-site → Settings → Variables and Secrets. Local values, when
provided, are authoritative on deployment; omit the local file when managing
rotation solely in the dashboard. Missing credentials leave administration closed.

Admin tabs inspect boards, search submitted names, preview/add/remove name bans,
and show recent administrative actions and notification outcomes. **Delete scores
and block browser** removes all scores associated with that credential, cancels
unsent emails and suppresses subsequent submissions. Clearing cookies or using a
different browser evades a browser-level block. The existing CLI remains usable:

```sh
pnpm scores:admin --remove PUBLIC_ENTRY_ID
```

## Notifications and provisioning

The Worker emails `jonathan@mooglegaps.com` from `fizzbuzz@glovebox.tools` once per
finalized run that is the browser's listed candidate on any board. All qualifying
ranks share one email. Anonymous/masked results qualify too. Live updates and
retries do not produce messages. Migration does not backfill notifications.

The publisher imports `RESEND_API_KEY` from ignored `.env.resend` into a Worker
secret. The sender domain must be verified in Resend. Sending-only keys cannot
list domain metadata; delivery outcomes remain visible in administration.
A transactional D1 outbox preserves work across failures. Atomic leases serialize
ownership, and fixed payloads plus Resend idempotency keys protect retries. A
one-minute scheduled handler drains bounded batches and respects throttling.
Resend retains idempotency keys for 24 hours; unresolved attempts older than that
are marked `review`, not automatically resent. Permanent provider errors are
marked `failed`. These records can be inspected by ID in Resend and the admin page.
Email failures never roll back scores or pause numerical execution.

Existing Account D1 Edit, Turnstile Edit, Workers Scripts Edit, Workers Routes
Edit, Zone Read and DNS Read permissions cover provisioning. The publisher
preserves the D1 database and Turnstile identities, adds the scheduled handler,
and keeps all secrets out of public artifacts. Ordered checksummed migrations
live in `deploy/migrations/`; never edit an applied migration.

`SLOPBUZZ_HIGH_SCORES_ENABLED=false` pauses enrollment/checks/submissions while
preserving reads, administration, and anonymization. Do not roll back to a Worker
predating name masking after bans exist. Preserve the database and secret bindings.

## API and retention

`GET /api/high-scores?board=daily&offset=0&limit=50` selects a board. Omitting board
retains the legacy all-time default. `GET /me`, `PUT /me` and run responses contain
all four `standings`, with `entry` remaining an all-time alias. `POST /check`
returns all qualifications and `qualifiesAny` while legacy rank/qualifies fields
retain all-time meaning. `PUT /me` accepts a name or `{anonymous:true}`; legacy
`DELETE /me` anonymizes without deleting scores or ownership.

Versioned `PUT /runs/:id` receipts are audited and sequenced. Current and recent
30-day results, best banked/all-time candidates and the latest finalized receipt
are retained; older receipts compact to replay anchors. Pending finals, including
lower rolling-window fallback candidates and heist losses, survive in the browser
outbox when storage is available. Locally inferred interruptions replay genuine
receipts rather than finalizing another tab's active run.

## Validation

`pnpm test:high-scores` runs real disposable Miniflare/D1 integration tests,
clock-driven rolling boundaries, matching, authentication, anonymity, deletion,
notification concurrency/retries, and client synchronization. `pnpm
preview:high-scores` provides persistent loopback D1. Static previews disable
score publication; browser feature tests mock enrollment and audit real receipts.
Browser suites run serially through the guarded commands. Never publish synthetic
scores to production. Dispose test browsers, workerd instances and owned servers.
