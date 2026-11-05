# ADR 0037: Provisional appointments and compact mobile filing

The mobile discovery register is absent when empty. With saved or provisional
finds, it starts as one compact, expandable bar. Its disclosure button retains
a 44-pixel touch target, an accessible name, `aria-expanded`, and a relationship
to the actual content. Escape collapses it and restores focus. The desktop
presentation retains its existing list. Measured footer height continues to
reserve page space and determine the Observe viewport budget.

Authorize displays a red, plainly worded Mandate Collision Imminent notice while
a run is loading, reading, or explicitly paused. On wide screens it sits beside
the heading; narrow screens stack it for readable text. Returning to Authorize
brings the notice above the fixed action
bar on short or narrow screens, rather than restoring a scroll position that
hides it. Invalid input does not
replace the run. A valid submission invalidates the old presentation generation
before applying the new policy, including when the previous response is pending.
Previously completed Java transactions and audit evidence are not reversed.

An unfinished production run owns a provisional discovery receipt under a unique
localStorage key. The register ranks completed discoveries plus each receipt's
five rarest discoveries, while the original completed-discovery key remains
compatible with existing archives. Replacement removes only the owned receipt.
This restores any older five finds it displaced and preserves another tab's
receipt, including another encounter with the same companion. Storage events
re-read provisional keys rather than unioning them into permanent history, so
an observing tab cannot resurrect a withdrawn appointment from its cached view.

Completion or explicit Stop settles the receipt into completed history. Ordinary
page departure also settles it, preserving discoveries across reloads and normal
navigation. Late assignment replies after completion can still settle; replies
after withdrawal are rejected by the receipt and the presentation generation.
Storage refusal retains the same ownership rules in page memory and reports
session-only storage. No audit database or Java endpoint is changed.

Only companions leaving the visible rarest-five register because of withdrawal
receive the fly-away treatment. Decorative glyphs animate in a clipped,
non-interactive overlay and remove themselves after the animation or a bounded
fallback timer. Collapsed mobile registers provide the departure origin too.
Reduced motion removes the finds immediately without flight; a polite status
announces the withdrawal. Focus and biography dismissal retain a usable target
when another tab withdraws a selected appointment.

Validation covers displaced completed finds, concurrent receipts, stale replies,
completion, page departure and storage refusal at the store boundary. Browser
checks exercise mobile collapse, empty-state height, keyboard and enlarged-text
access, the red warning, invalid submissions, replacement, cross-tab withdrawal,
reduced motion and absence of late numerical output. Browser jobs run serially.
