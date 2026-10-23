# ADR 0016: Release custody and content-addressed showcase assets

## Status

Approved for the shared preview.

## Context

The preview could rebuild the app container while a browser continued to use
CSS and JavaScript cached for an hour under stable filenames. The deploy script
also announced readiness when Compose started the container, before the Java
readiness commission answered. Neither the site nor the script identified the
Git revision actually declared by the running process.

## Decision

The static site handler computes SHA-256 fingerprints for its assets and puts
them in the HTML's asset URLs. A matching fingerprint receives an immutable,
one-year cache policy; a response for an unversioned or mismatched URL uses
`no-cache`. Each
asset and page also has a strong ETag. Matching `If-None-Match` requests receive
HTTP 304 with no body, following [HTTP semantics](https://www.rfc-editor.org/rfc/rfc9110.html)
and [HTTP caching rules](https://www.rfc-editor.org/rfc/rfc9111.html). The page
itself remains `no-cache`, so a reload discovers new fingerprints after a
deployment. Existing URLs and the same-origin security headers remain intact.

`GET /operations/release` reports the full revision declared in
`SLOPBUZZ_RELEASE_SHA` and the process start time. The site shows the first
twelve characters. Standalone runs without that environment value report
`unknown`; the endpoint does not claim a cryptographic build attestation.

The shared preview script accepts only a clean, merged `slopbuzz` checkout,
exports its full Git SHA to Compose, rebuilds the app, waits for `/readyz`,
then compares `/operations/release` with the SHA it deployed. It reports the
preview URL only after those checks pass. Redis and the H2 volume remain in
place across app container recreations.
