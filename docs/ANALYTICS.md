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
`POSTHOG_API_KEY` is exclusively for the dashboard provisioning command:

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
sharing is enabled. The no-external SDK bundle requires only the US ingestion
origin in connect-src; third-party scripts remain disallowed.
