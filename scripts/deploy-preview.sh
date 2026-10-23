#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
if [[ "$(git symbolic-ref --quiet --short HEAD)" != "slopbuzz" ]]; then
  printf 'Deploy the merged slopbuzz branch, not an iteration branch.\n' >&2
  exit 1
fi
if ! git diff --quiet || ! git diff --cached --quiet; then
  printf 'Commit tracked changes before deploying the shared preview.\n' >&2
  exit 1
fi
export SLOPBUZZ_HTTP_PORT="${SLOPBUZZ_HTTP_PORT:-18088}"
export SLOPBUZZ_RELEASE_SHA="$(git rev-parse HEAD)"
docker compose -p slopbuzz-showcase up --build -d
preview_url="http://localhost:${SLOPBUZZ_HTTP_PORT}"
ready=false
for attempt in {1..30}; do
  if curl --fail --silent --show-error --max-time 2 "${preview_url}/readyz" >/dev/null 2>&1; then
    ready=true
    break
  fi
  sleep 1
done
if [[ "$ready" != true ]]; then
  printf 'Preview failed its readiness hearing at %s/readyz\n' "$preview_url" >&2
  exit 1
fi
release_report="$(curl --fail --silent --show-error --max-time 3 "${preview_url}/operations/release")"
if [[ "$release_report" != *"\"revision\":\"${SLOPBUZZ_RELEASE_SHA}\""* ]]; then
  printf 'Preview revision did not match %s\n' "$SLOPBUZZ_RELEASE_SHA" >&2
  exit 1
fi
printf 'Preview ready at %s/ (revision %s)\n' "$preview_url" "$SLOPBUZZ_RELEASE_SHA"
