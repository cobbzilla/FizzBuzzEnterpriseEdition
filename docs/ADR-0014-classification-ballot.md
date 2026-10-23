# ADR 0014: Three-seat classification ballot

## Status

Approved for every positive integer entering the output chamber.

## Context

The three legacy strategies each answered a private yes/no question while the
visitor printed the result. The company had no shared record that their
answers were mutually coherent. A rogue numeral vote could have joined a Fizz
or Buzz vote in the same line without a formal objection.

## Decision

Before the visitor prints a line, a classification ballot box collects Fizz,
Buzz, and numeral votes from the existing Spring-assembled strategies. A
numeral is authorized exactly when neither word is authorized. An independent
arithmetic witness checks the Fizz and Buzz votes against division by three
and five. Contradictions veto the ballot, abort that line's output transaction,
and appear in the audit journal as an aborted entry.

An approved ballot issues three single-number strategy certificates. The
existing visitor receives those certificates with the original printers, so
it makes the same FizzBuzz decision without asking the legacy strategies a
second time. A certificate rejects use for another number or an unrecognized
seat. No ballot changes the required printed words or newline contract.

The website's live mandate exercises this procedure for every generated
number. The ballot remains internal because the public API publishes the
resulting line and the audit bureau records its transaction. One thousand
separate tests cover every number in the HTTP jurisdiction, alongside
adversarial tests for contradictory votes and certificate misuse.
