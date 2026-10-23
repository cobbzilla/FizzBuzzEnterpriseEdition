# ADR 0019: Issue a trace receipt for every public desk

## Decision

Attach one trace custody filter to every HTTP context, including static pages
and unknown paths handled by the root context. If a request presents a valid
W3C `traceparent` header, retain its trace ID and treat its parent ID as the
caller span. Generate a new random span ID for this request. A missing or
malformed header receives a new random trace ID and span ID. Version `00` must
have the exact four-field format; a higher version may carry an extension after
those fields. The forbidden `ff` version, uppercase hex, and all-zero IDs are
rejected.

Return `X-SlopBuzz-Trace-Id` and `X-SlopBuzz-Span-Id` with every response.
These are company receipt headers; they are not presented as a standardized
response-side `traceparent`. Log the trace ID, span ID, parent ID, method,
raw path, status, and elapsed microseconds at INFO when the exchange ends.
The output journal includes the current trace ID in its existing FINE-level
per-certificate log line. A worker-thread scope is removed in `finally` so a
later request cannot inherit another visitor's receipt.

The live demo displays the full trace ID after its service response. The API
guide describes the headers from the OpenAPI charter and shows receipts when
a visitor sends a live request. The charter declares both response headers
for every documented response.

## Consequences

Operators can search the application log by the receipt shown to a visitor
and, with FINE output logging enabled, follow its line certificates. The ID is
a correlation aid, not authentication: a caller may supply a valid trace ID.
No distributed tracing collector is claimed, and trace IDs are not added to
existing persisted audit rows, preserving the database and hash-chain format.

The admission format follows [W3C Trace Context](https://www.w3.org/TR/trace-context/).
The filter lifecycle follows the [Java 17 HTTP server filter contract](https://docs.oracle.com/en/java/javase/17/docs/api/jdk.httpserver/com/sun/net/httpserver/Filter.html).
