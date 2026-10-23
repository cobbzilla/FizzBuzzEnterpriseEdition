# ADR 0020: Notarize each assembled proclamation before publication

## Status

Approved for every output transaction.

## Context

The classification council certifies which printers may speak for a number,
but the transaction desk previously trusted the final assembled text. A
misconfigured printer could publish an unauthorized word, another number, or
an extra line ending while holding an otherwise valid classification ballot.

## Decision

Before publishing an output transaction, the proclamation notary independently
derives the only authorized text for its positive integer: the applicable
`Fizz` and `Buzz` tokens, or the decimal numeral if neither applies, followed
by exactly one platform line separator. It compares the complete staged text
with that result. A match receives an immutable notarial seal bound to both
the integer and the exact payload; the transaction desk verifies that binding
immediately before publication. A mismatch aborts the transaction and records
the rejected payload in the audit journal without releasing any bytes.

The notary is deliberately separate from the earlier three-seat ballot. The
ballot rules on strategy votes; the notary rules on the printers' actual
finished work. Neither office can quietly substitute for the other.

## Consequences

Even the line ending now has a designated approval authority. Successful
output remains byte-for-byte identical, including the required `FizzBuzz`
answer for multiples of fifteen. Invalid printer output becomes an auditable
aborted transaction instead of a public proclamation.
