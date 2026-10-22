# SlopFizzBuzz quality manual

Document ID: QM-SLOP-001
Revision: 1
Owner: The Committee for the Documentation of Committee Decisions

## Scope

This manual governs the internal evidence that accompanies SlopFizzBuzz output.
It does not assert certification, an external audit, or compliance with ISO
9000 or SOC 2.

## Control register

| Control | Question | Internal evidence | Result source |
| --- | --- | --- | --- |
| AUD-001 | Does the stored audit chain verify? | Recomputed hash chain | `GET /audit/evidence` |
| MSG-001 | Have queued events cleared without dead letters? | Queue projection and dead-letter count | `GET /audit/evidence` |
| ISO-9000 | Has an applicable quality management system been externally assessed? | No assessment on file | Always OPEN |
| SOC-2 | Has an independent service organization audit been completed? | No report on file | Always OPEN |

## Evidence handling

The dossier includes a SHA-256 digest of its declared fields and the journal
head. The digest detects accidental changes to the dossier's contents when a
copy is compared with the original. It is not a digital signature. The
underlying journal may use a file-backed H2 database when configured; queue
state and dead letters remain process-local.

The quality manual is revised when a control's evidence, scope, or result rule
changes. The revision process is, naturally, subject to a future revision.
