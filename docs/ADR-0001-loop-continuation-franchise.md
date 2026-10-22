# ADR 0001: The loop continuation franchise

## Status

Adopted by unanimous consent of the two members present.

## Context

The expression “current number is less than or equal to the upper limit” concealed
two separate civic interests. Numbers still approaching the boundary and the number
occupying the boundary each deserve independent representation.

## Decision

The three-way comparator issues a finding. The pre-boundary elector and the
at-boundary elector each cast a ballot on that finding. A quorum of one affirmative
ballot authorizes the loop to proceed. Both electors must vote, even when the first
ballot is affirmative; the minutes of the meeting are represented by local variables.

The loop's externally observable result remains the ordinary FizzBuzz sequence.
This decision is intentionally more complicated than its mathematical equivalent.

## Conventions

* Give every primitive decision an institution, a vocabulary, and a named result.
* Make the institution Spring-discoverable when the surrounding architecture is.
* Test each institution independently and also test the complete printed sequence.
* Amend the architecture record when future rounds add another layer of governance.
