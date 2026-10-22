# ADR 0010: The capacity planning bureau

## Status

Forecasts are approved for advisory circulation.

## Context

The company can produce up to one thousand lines on demand, yet historically
entered each numerical undertaking without a forecast of its Fizz and Buzz
inventory. Such uncertainty needlessly exposes the board to surprises at 15.

## Decision

`GET /capacity/forecast?limit=N` publishes a JSON forecast for mandates from
0 through 1000, defaulting to 100. It reports the expected number of numeral,
Fizz, Buzz, and FizzBuzz lines. The bureau applies inclusion and exclusion to
the multiples of 3, 5, and 15. It never runs the proclamation engine or writes
audit minutes.

For internal planning theater, each numeral line consumes one workload unit,
each Fizz or Buzz line two, and each FizzBuzz line three. Workload units are a
fictional planning measure; they are neither prices nor measured compute use.
The forecast is advisory and does not authorize or block `/fizzbuzz`.
