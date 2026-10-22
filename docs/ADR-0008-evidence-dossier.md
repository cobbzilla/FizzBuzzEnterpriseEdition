# ADR 0008: A compliance evidence dossier

## Status

Issued internally; no external certification requested.

## Decision

`GET /audit/evidence` publishes a point-in-time JSON dossier with journal
counts, queue counts, the current chain head, control findings, and a digest
of the declared fields. AUD-001 passes when the in-memory journal chain
verifies. MSG-001 passes when no messages are pending or dead-lettered.
ISO-9000 and SOC-2 remain OPEN until independent evidence exists.

The [quality manual](QUALITY_MANUAL.md) is the controlled document for those
identifiers. The endpoint is an internal self-assessment, not an assurance
report. Its digest is a checksum, not a signature.
