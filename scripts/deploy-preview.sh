#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if [[ "$(git symbolic-ref --quiet --short HEAD)" != "slopbuzz" ]]; then
  printf 'Deploy the merged slopbuzz branch.\n' >&2
  exit 1
fi
if ! git diff --quiet || ! git diff --cached --quiet; then
  printf 'Commit tracked changes before deploying the shared preview.\n' >&2
  exit 1
fi
export SLOPBUZZ_RELEASE_SHA="$(git rev-parse HEAD)"
pnpm install --frozen-lockfile
pnpm build
pnpm test:parity
pnpm test:e2e
# Seal the verified report and fixtures into the offline release.
node scripts/build.ts --assets-only
# Keep the existing JVM/H2 installation, including its original named volume, on a separate port.
SLOPBUZZ_HTTP_PORT=18089 docker compose -p slopbuzz-showcase up --build -d
SLOPBUZZ_HTTP_PORT=18088 docker compose -p slopbuzz-static -f compose.static.yaml up --build -d
node scripts/verify-preview.ts
printf 'Browser enterprise: http://localhost:18088/\nJava enterprise: http://localhost:18089/\n'
