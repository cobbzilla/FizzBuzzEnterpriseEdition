# Persistent high scores

The website's trophy opens the public Top 1,000 register. `/high-scores/` provides
the same list without starting the Java runtime or 3-D office. A browser gets one
entry, combining its best banked run with its current accepted live results.
All rule editions and run lengths compete together. Heist losses can lower a
live result; an earlier peak from that run is not retained.

## Permissions and provisioning

Add **Account → D1 → Edit** and **Account → Turnstile → Edit** to the existing
deployment token, scoped to the account that owns the public Worker. Cloudflare's
API also calls the latter permission `Turnstile Sites Write`. Existing Workers
Scripts Edit, Workers Routes Edit, Zone Read and DNS Read remain required.

`pnpm publish:b2` manages a database named `<worker-name>-scores` and a Turnstile
widget named `<worker-name> high scores`. It reuses their identities on subsequent
deployments. `deploy/migrations/` contains ordered, checksummed migrations. Never
edit a migration after it has been applied; add a new one. The Turnstile secret
exists only in the Worker binding and is checked against the publication tree
before upload. API failures never print credential values or SQL response bodies.

`SLOPBUZZ_HIGH_SCORES_ENABLED=false` disables checks, enrollment and score writes
while keeping public reads and withdrawal available. Restoring `true` resumes
submissions. Turning this switch off does not remove persistent scores.

For rollback, disable submissions and deploy the previous compatible Worker;
keep the database and bindings. Cloudflare D1 Time Travel is available through
the dashboard if data recovery is necessary. Ordinary redeployment does not
recreate or empty the database.

## Local validation

Run `pnpm test:high-scores` for the auditor, synchronization, deployment and real
Miniflare D1 integration tests. The suite disposes its workerd instance afterward.
`pnpm preview:high-scores` runs a loopback preview with a persistent local D1 store
under ignored `tmp/high-scores-d1`. Its local-only adapter accepts the Turnstile
test widget; production code always verifies enrollment with Cloudflare.

The normal static preview returns a disabled, empty register so unrelated browser
suites never acquire an unsolicited publication dialog. Feature browser tests
explicitly enable their mock register and audit the actual browser-generated
receipts. Run those through the guarded, serial browser workflow.

## API and privacy

The API lives under `/api/high-scores`. `GET /` returns 50 ranked rows by default
(`offset` 0–950; `limit` 1–50). `POST /check` audits an unpublished receipt without
storing it. `GET /me` returns browser participation; `PUT /me` enrolls or changes
the name; `DELETE /me` withdraws. `PUT /runs/:id` accepts a versioned, sequenced
score snapshot. Only the last snapshot is stored for an active run; the recent
100 award receipts are not treated as a complete event log.
The best and most recent finalized snapshots are retained. Older finalized
receipts shrink to sequence/digest anchors so compaction cannot admit replays.

Public rows disclose the chosen name, exact score, run length, status, conditions,
scoring edition and update time. Amounts and ordinals are decimal strings.
Browser credentials, private receipts and IP addresses are not public. No IP
addresses are stored in D1. Turnstile and rate limits protect enrollment without
claiming to prove actual gameplay. Automated tests must not publish fake scores
to the production register.

Names are rendered as text and allow only ASCII letters, digits, spaces, hyphens
and underscores, 1–24 characters after trimming, with an alphanumeric character.
Duplicate names are permitted. Cookies identify the browser, not a person. Full
site reset or manual cookie deletion loses ownership; withdraw first if the
public entry should be removed too.

To remove an abusive entry and suppress its browser credential:

```sh
pnpm scores:admin --remove PUBLIC_ENTRY_ID
```

This uses the existing private Cloudflare token; there is no public admin route.
Changing browsers or clearing cookies can evade browser-level suppression.
