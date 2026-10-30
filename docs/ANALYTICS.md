# Office of Audience Measurement

PostHog counts page visits and completed demo/API requests. Tracking is cookieless:
no identification, session replay, automatic click capture, or analytics storage.
Daily visitors are estimates, not cross-day unique people. Numerical inputs,
outputs, audit records, and receipts are excluded. Do Not Track and Global Privacy
Control do not disable this cookieless census. This is an explicit site policy;
collection can still be disabled through the analytics configuration. Offline use never depends on analytics.

Production static build:

```
SLOPBUZZ_POSTHOG_ENV_FILE=tmp/.env.posthog SLOPBUZZ_ANALYTICS_ENABLED=true pnpm build
```

Only the public `POSTHOG_TOKEN` is exposed in `analytics-config.json`. The personal
`POSTHOG_API_KEY` is used only for dashboard setup and optional ingestion
verification:

```
pnpm analytics:setup           # read-only preview
pnpm analytics:setup --apply   # enable cookieless ingestion and upsert dashboards
```

The optional Java server accepts `POSTHOG_TOKEN`, `SLOPBUZZ_ANALYTICS_ENABLED`,
`SLOPBUZZ_ANALYTICS_ENVIRONMENT` (production or preview), and
`SLOPBUZZ_ANALYTICS_ALLOW_LOCAL`. Static builds accept the same variables.
Defaults disable tracking; localhost requires explicit ALLOW_LOCAL=true and is
always tagged preview. CI intercepts ingestion and never sends real traffic.
Set enabled=false and rebuild/restart to disable tracking. Existing offline
releases update under the normal close-tabs service-worker lifecycle.

Dashboards filter application=slopbuzz and environment=production, last 30 days:

- [Stakeholder Traffic & Market Presence](https://us.posthog.com/project/698218/dashboard/2280332)
- [Numerical Engagement & Demonstration Yield](https://us.posthog.com/project/698218/dashboard/2280333)

The existing starter dashboard is preserved. Provisioning uses stable description
markers and can be rerun without duplicating dashboards or insights. No public
sharing is enabled. The bundled SDK sends to `/intake/e/` on the site's own hostname. The Cloudflare
Worker forwards POST bodies and SDK query parameters only to PostHog's fixed US
`/e/` endpoint. Cookies and authorization headers are discarded; the trusted edge
address is forwarded for cookieless daily estimation. Responses use `no-store`,
retain upstream success/failure status, and cannot set cookies. Other intake paths
are rejected, and cross-origin browser submissions are refused.

The public static CSP now permits only same-origin connections. No additional DNS
record, hostname or certificate is needed. The local TypeScript preview uses the
same proxy handler; nginx supplies the corresponding local container route. The
optional standalone Java server retains direct US ingestion, since it does not
run behind this Worker. Its existing CSP and analytics configuration remain valid.
Static hosting elsewhere must supply the first-party intake route when analytics
is enabled. The Java FizzBuzz business service remains local in browser mode.

Public deployment now exercises real pageview and demo beacons through the proxy
with DNT/GPC enabled. Smoke events are tagged `environment=preview` and excluded
from production dashboards. Run `SLOPBUZZ_PUBLIC_URL=https://fizzbuzz.biz node
scripts/verify-analytics.ts` for an additional management-API query confirming the
smoke pageview actually arrived in PostHog. Management credentials are used only
by that optional verification command and dashboard setup, never by the Worker.
