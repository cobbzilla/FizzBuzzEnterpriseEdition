#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
export SLOPBUZZ_HTTP_PORT="${SLOPBUZZ_HTTP_PORT:-18088}"
docker compose -p slopbuzz-showcase up --build -d
printf 'Preview ready at http://localhost:%s/\n' "$SLOPBUZZ_HTTP_PORT"
