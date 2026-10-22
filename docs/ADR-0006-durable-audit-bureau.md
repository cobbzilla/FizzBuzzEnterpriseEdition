# ADR 0006: A database for the audit bureau

## Status

Filed in triplicate, two copies in the database.

## Context

The hash-linked audit journal forgot every entry when its process exited. This
made its chain of custody rather short.

## Decision

The journal submits each entry to an audit store before accepting it locally.
The default store retains the previous process-local behavior. If
`SLOPBUZZ_AUDIT_JDBC_URL` is set, an H2 JDBC repository stores entries in a
table, one committed insert per output transaction. On startup, the journal
loads the stored entries and verifies the entire hash chain before serving.

For a file-backed database, use a URL such as
`jdbc:h2:file:/data/slopbuzz-audit`. The directory must be writable by the
process. A container needs a mounted volume for that path if its audit history
must survive replacement.

The database records the facts asserted by this process. A hash chain detects
later changes to recorded rows, but it is not a signed or externally anchored
audit log. This decision does not assert ISO 9000 or SOC 2 certification.
