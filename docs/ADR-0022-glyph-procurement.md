# ADR 0022: Enterprise Glyph Procurement Directorate

## Decision

Literal Fizz/Buzz production now passes through five swappable Java contracts:
`GlyphCatalog`, `GlyphRequisitionAuthority`, `GlyphSupplier`,
`GlyphReceivingInspector`, and `GlyphAssembler`. Spring injects their stateless
implementations; the explicit assembly constructs the same graph for TeaVM.
The existing string-returner factories retain their roles in the proclamation.

The catalog contains exactly F, i, z, B and u. A requisition fixes the approved
product and immutable position-specific SKU list. A supplier produces one delivery
per position. Receiving validates order identity, position, SKU, character case,
and quantity before issuing an immutable acceptance certificate. Assembly verifies
each certificate's order and position before releasing the text. Identical product
names do not confer interchangeable requisition identity. Reassembling the same
accepted order is deterministic; these objects are not cryptographic identities
or single-use inventory tokens.

No inventory is depleted. No procurement persistence, timers or network service
is introduced. FizzBuzz has eight positions and four independent z allocations.
Numerals and line endings retain their existing implementation. The notary still
checks independently constructed expected output, outside this procurement graph.

## Public demonstration

`GET /procurement/dossier?product=FizzBuzz` exercises this implementation and
returns the text, assembly certification and ordered receiving line items.
Fizz and Buzz are also accepted; omission defaults to FizzBuzz. Product case and
query shape are exact; unknown, extra, repeated and encoded query values are
rejected with 400. Other methods receive 405 and `Allow: GET`; unknown paths
remain 404. The OpenAPI charter describes the response and powers its request desk.

This is a fresh inspection demonstration, not stored provenance for a historical
mandate. It creates no audit transactions. The Operations panel invokes the shared
RuntimeClient; browser execution and offline use require no business HTTP request.
The optional Java deployment exposes the same dispatcher through its HTTP adapter.

## Evidence

The hostile-supplier tribunal rejects missing, surplus, reordered, foreign,
mis-cased, wrong-SKU, wrong-quantity and null deliveries; it also rejects duplicate,
reordered, missing and foreign certificates. JVM tests cover catalog uniqueness,
immutable requisitions, concurrent order isolation, supplier substitution, Spring
wiring and real string-returner participation. Stateful parity fixtures include
all products and error responses; the portable tribunal runs in both compiler
targets in Chromium, Firefox and WebKit. UI tests inspect each position, enforce
zero audit growth, exercise the API request desk, keyboard access, reflow, error
recovery, server mode and a genuinely stopped-origin offline release.
