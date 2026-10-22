# ADR 0003: Transactional output and the audit bureau

## Status

Provisionally ratified. The word “transactional” has been approved by the
terminology committee.

## Context

FizzBuzz output had been assembled through several independent writes. The
existing exception-safe adapter also swallowed failures, leaving no record of
what a number attempted to say.

## Decision

One number now opens one thread-bound output transaction. Existing printers
stage their fragments in that transaction. On success, the coordinator publishes
the complete line with one write. On failure, staged fragments are discarded.
An in-memory audit journal records committed and aborted attempts in a SHA-256
hash chain. Java Util Logging emits detailed commit messages at FINE and
warnings for aborts.

This is a process-local ceremony. It does not make the terminal, a database, or
an external observer transactional, and the journal does not survive process
exit. Those deficiencies are suitable subjects for future governance meetings.
