# Public Participation Assurance Record

The showcase targets WCAG 2.2 Level AA. This record describes the checks and
remaining work; it is not a certification of complete conformance.

## Repeatable verification

Run `pnpm build` and `pnpm test:e2e`. The Playwright accessibility suite uses
axe-core's WCAG 2.0/2.1/2.2 A/AA and best-practice rules in Chromium, Firefox,
and WebKit. It covers all eight public HTML pages at desktop and 320 CSS
pixels, expanded API schemas, invalid input, and paused/completed output.
Separate lifecycle tests exercise both compiled Java engines. Results are
included in the release's browser-lifecycle report on the Validation Tribunal.

Keyboard assertions cover skip-link focus, named navigation, form errors,
pause/resume/reveal controls, retained focus, and optional output following.
Layout checks combine 320 CSS pixels (equivalent to a 1280-pixel viewport at
400% zoom), 200% root text size, and WCAG text-spacing overrides. Reduced-motion
and forced-color checks exercise preferences without changing the site CSP.

The shared header/footer are ordinary HTML fragments in
`src/main/resources/web/components/`. Both the static builder and JVM handler
expand these fragments before sending HTML, so navigation does not depend on
JavaScript. Add new pages to both builders and to the route list in
`tests/accessibility.spec.ts`.

## Human review and limits

The Executive Chronicle review covers its named fixed-height scroll region,
optional following, stable archive inspection during ongoing output, restoration
of the latest announcement, native personnel-paper dialog and explicit opener
focus restoration. The read-only accessibility audit found and corrected archive
reordering/eviction and inaccessible nested document scrolling. The outer
chronicle now handles document scrolling. Rechecks pass keyboard scrolling,
Escape, focus return, 320px, 200% text, increased text spacing, reduced motion and
axe rules without horizontal overflow or browser errors. Both numerical output
and the chronicle keep bounded heights as their contents grow.

The First Ordinal Onboarding review additionally exercises native decision
disclosures, case verdict announcements, synchronized Inspect paperwork state,
focus-preserving step-through, pause/resume/stop, and replay without new business
execution. Shared reading buttons identify both personnel and numerical regions.
Expanded approved and rejected records pass axe rules for WCAG 2.0/2.1/2.2 AA
and reflow at 320 CSS pixels with 200% text and increased text spacing. A read-only
accessibility auditor also manually exercised the keyboard and reduced-motion
paths on the local static build. These checks supplement the limits below.

Source review identified and corrected live regions inside busy containers,
missing reading controls, API heading gaps and input-error associations,
keyboard-inaccessible scroll areas, a stamp overlapping explanatory copy,
narrow-screen overflow, and insufficient focus contrast on dark surfaces.

Real VoiceOver/Safari, NVDA/Firefox or Chrome, screen magnification, switch
access, and user testing remain necessary. Automated DOM checks cannot prove
natural reading order, comprehensible announcements, or usability for every
assistive-technology combination. Check these manually before making any
formal conformance claim. The public Accessibility page explains the available
controls and provides a route for reporting barriers.
