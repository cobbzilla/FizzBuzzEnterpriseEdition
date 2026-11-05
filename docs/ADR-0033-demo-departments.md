# ADR 0033: Departmental Allocation of Executive Attention

Status: accepted, 4 November 2026.

The demo has five full-page views: Authorize, Observe, Experiment, Facilities
and Evidence. They are addressable through the `desk` query parameter on the
existing static `/demo/` entry. Native navigation links support opening a new
tab, browser Back/Forward, static hosting, nested hosting and offline visits.
The shared header retains a compact, keyboard-operable company menu while
Observe is active. Other pages retain their existing header arrangement.

## Ownership and lifecycle

One mounted `demo.ts` module owns the numerical session and original controllers.
`DemoWorkspace` receives a Chronicle placement port; it owns navigation
and presentation placement, never numerical requests. Changing a department
does not construct another runtime client, reset the output or submit Java work.
As amended by [ADR 0036](ADR-0036-continuous-mobile-playback.md), leaving Observe,
backgrounding the document and opening a dialog do not pause disclosure. An
explicit Pause remains in force across those transitions. Return to current run
only navigates; resuming requires the explicit playback control.

Authorize has distinct draft controls. Run validates the exact upper limit,
commits the presentation policy once, starts one mandate and opens Observe.
Live presentation options operate on the current run without changing the next
draft. Reload restores presentation preferences rather than executing a mandate;
shared encounter links continue to prefill or verify read-only evidence.
Arbitrary exact integers, finite streaming windows and bounded retained output
keep their existing contracts. Replay reads retained evidence, not Java again.

## Observation and graphics

Observe offers Overview, Official Output, Office, Companions and Commentary.
Desktop Overview composes the relevant panels. Narrow screens start with a
purpose-built Output or Office focus. Short screens may show just the selected
principal view, a compact current companion and accessible playback controls.
The layout reserves actual space for the rarest-five discovery register.
Enlarged text uses ordinary scrolling instead of reducing type or clipping work.

The office disclosure clock is independent of attention and canvas visibility.
Switching Watch arrangements therefore never causes an unexplained stall.
Hidden canvases stop GPU rendering, while a timer keeps logical playback moving.
Java evidence still owns the step
order and publication boundary; reduced motion and unavailable graphics retain
readable captions, paperwork and stepping. Reorganization retains its atomic
estate authority and retained presentation cursor.

The Chronicle has one DOM owner and one reader-owned following state. Its node
moves between Evidence and the focused Commentary arrangement without rebuilding
records. Companion spotlight, encounter list, retained discoveries and office
illustration consume the same deterministic Java assignments; they do not draw
new tickets when a view changes. A focused or modal biography is not replaced
under its reader.

## Independent experiments

Personnel specimens own their own dossier, playback clock and native dialog.
Production personnel records remain unchanged. Prior-work experiments use a
separate `PrecedentView` namespace from the actual mandate's reuse decisions.
Vacant-premises experiments retain their existing read-only Java authority.
None of these views may mutate numerical output, retained cache or audit custody.

## Verification

Exercise all five departments, browser history, same-tab resumption, draft versus
live policy, shared links, four office/companion combinations, short portrait and
landscape screens, enlarged text, keyboard/dialog focus, readable graphics
fallbacks, evidence replay and bounded streaming. Existing regression controls
navigate through the real departments before exercising relocated functionality.
Keep the JVM, both browser engines, parity and three-browser release gates.
