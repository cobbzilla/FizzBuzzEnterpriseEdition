# Public Numerical Distribution Office

The public site is configured for **https://fizzbuzz.biz**. Its static HTML,
TypeScript bundles and compiled Java/WASM artifacts live in a public Backblaze
B2 bucket. A Cloudflare Worker serves them at the public hostname. Business
operations still execute in each visitor's browser; the Worker only serves files.

## Publish

From the repository root, on a clean, merged `slopbuzz` checkout:

```sh
pnpm install --frozen-lockfile
pnpm publish:b2
```

Use Node 22.18 or newer, pnpm, Java 17 and Maven; install the Playwright browsers
with `pnpm exec playwright install` on a new machine. The publisher runs the
TypeScript checks, publisher tests, Maven/TeaVM build, JVM/browser parity suite,
and browser lifecycle/accessibility/analytics suite before any remote mutation.
It seals the resulting evidence into the release, uploads, configures the Worker,
and checks the public HTTPS site in Chromium, Firefox and WebKit, including offline
execution. A failed check exits nonzero. Existing local preview containers remain
running; this command publishes the public site only.

The publisher reads `.b2.env`, falling back to `.env.b2` if the first file is absent.
The current installation uses `.env.b2`. Process environment values override the
file. Both names and their editor backups are excluded from Git and Docker contexts.

```dotenv
B2_BUCKET_ID=your-public-bucket-id
B2_KEY_ID=your-bucket-key-id
B2_APP_KEY=your-bucket-application-key
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ZONE_ID=your-active-zone-id
CLOUDFLARE_API_TOKEN=your-api-token
SLOPBUZZ_PUBLIC_URL=https://fizzbuzz.biz

# Optional; these are the defaults:
B2_PREFIX=site/
CLOUDFLARE_WORKER_NAME=slopbuzz-public-site
B2_PUBLISH_DRY_RUN=false
SLOPBUZZ_ANALYTICS_ENABLED=true
SLOPBUZZ_POSTHOG_ENV_FILE=tmp/.env.posthog
```

The B2 key must list the selected bucket and have `readFiles`, `writeFiles` and
`listFiles` within the selected prefix. The bucket must already be public; the
publisher never changes its policy or lifecycle. The Cloudflare token needs
Workers Scripts Edit on the account, Workers Routes Edit on the zone, Zone Read,
and DNS Read for conflict detection. The zone must be active and belong to the
account. An account-owned token is supported; `/user/tokens/verify` is not used.
The specified Worker is managed by this command, including its code and bindings.
Use a dedicated Worker name; unrelated Workers are not modified.

Analytics defaults to production mode, with local collection disabled. The
PostHog file must contain the public `POSTHOG_TOKEN` when enabled. Disable analytics
explicitly if no project is configured. Only the public project token enters the
site; management credentials and deployment credentials must remain private.

For a preflight that builds and tests but makes no remote changes, set
`B2_PUBLISH_DRY_RUN=true` in the env file, then run the same command. It lists the
required uploads and unchanged files. Restore `false` to publish.

## Hostnames, DNS and TLS

`SLOPBUZZ_PUBLIC_URL` can be any HTTPS origin in the configured Cloudflare zone.
No hostname is compiled into the browser application. Subdirectory deployment
URLs are rejected by this publisher; the application itself supports base paths.
Changing the hostname changes browser storage scope, so visitors receive a fresh
local audit database at the new origin.

Do **not** manually create a Worker route or CNAME. The publisher creates or reuses
a **Worker Custom Domain**. Cloudflare creates the DNS record and manages the
certificate and its renewal. See [Cloudflare Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
An existing binding to another Worker, or a conflicting A/AAAA/CNAME record,
causes an error rather than replacing someone else's configuration. The publisher
does not remove older custom domains when the configured hostname changes.

TLS/DNS provisioning may take longer than the publisher's polling window. In that
case it reports that uploads succeeded but public verification is pending, and
exits nonzero. Wait for Cloudflare provisioning, then rerun the same command.
The public URL is not declared verified until an HTTPS release check and browser
checks pass.

## Release custody and caching

Only `dist/` is uploaded. MIME types include `application/wasm`; SHA-1 checksums are
supplied to B2 and checked in its response. Existing objects with the same content
and cache metadata are skipped. Four consumers upload concurrently, each with its
own upload token. Failures retry up to four attempts and refresh the token.

Dependencies precede pages, and `sw.js` is uploaded last. Uploads are **ordered,
not atomic across files**: a first-time visitor during deployment can temporarily
see a mixture of stable assets. Existing installed service workers retain their
cached release, and activate an update after the old tabs close. No old objects
are deleted, so installed releases can still fetch their versioned dependencies.
Retention and storage costs remain a bucket-operations responsibility.

Versioned `/assets/<build>/` files cache for one year. Mutable pages, configuration,
evidence, and the service worker use `no-cache` and bypass the Worker subrequest
cache. Publication compares metadata as well as bytes, so cache-policy repairs
are not silently skipped. A retry may create an additional B2 object version;
the configured bucket lifecycle governs old versions.

The Worker maps directory URLs to `index.html`, redirects extensionless routes to
their slash form while preserving query parameters, supports GET/HEAD and genuine
404s, and keeps origin paths within the configured bucket prefix. It forwards no
cookies or authorization headers to B2. Browser queries remain in the address bar
but are not sent to object storage. CSP permits the local Java runtimes and same-origin connections.
`POST /intake/e/` is handled before static routing and forwarded to the fixed
PostHog US ingestion endpoint with credentials stripped and caching disabled. The Worker contains the public B2 origin,
never a B2 credential.
