# ADR 0036: Continuous playback and a mobile viewport that fits before paint

Only an explicit playback Pause holds a run. Navigation, focus, scrolling,
biographies, paperwork and document visibility do not change that state. The
separate personnel experiment follows the same rule. Return to current run
navigates without resuming a manually paused mandate. Stop, replacement runs,
explicit stepping and the finite reorganization procedure keep their existing
ownership and cancellation contracts.

`PresentationScheduler` uses animation frames for an available scene and timers
for offscreen work. Visibility changes switch the pending callback's driver,
so a suspended animation frame cannot strand the disclosure queue. The logical
clock uses elapsed time rather than treating a delayed callback as one capped
100-millisecond frame. Explicit pause boundaries earn no time. Browser or OS
suspension can still defer JavaScript execution; no background service or
server-side mandate is introduced.

Graphics readiness is a renderer concern. Playback proceeds while the optional
module loads or fails. The estate warms up before receiving its latest directed
cue, avoiding a readiness cycle caused by adding production scenery during its
initial compile. On return, rendering resumes at the latest recorded step.
Publication still happens exactly once at its supplied boundary. Hidden
reorganizations use the same continuing scheduler, preserving the estate's
atomic commit and the held numerical decision.

Mobile layout reserves a readable output card and uses a compact heading and
44-pixel SVG transport buttons. Accessible names and native tooltips describe
each action; Pause changes to a play icon and Resume name. Short landscape uses
adjacent output/office columns. Enlarged text keeps ordinary reflow and scrolling.

`DemoWorkspace.fit` measures document position rather than scroll-relative
position and uses the visual viewport when available. It writes the newly
compacted footer's measured reserve synchronously. Waiting for the footer's
ResizeObserver previously left the Authorize reserve in the first Observe
frame, creating a temporary scrollable page. No scroll gesture is needed to
repair the layout now; viewport resizing still updates it normally.

New authorizations commission Executive Hovering. Draft v2 preserves subsequent
explicit choices. A legacy draft retains cadence, companion preferences and
authority while adopting the new hovering default. Both draft versions are
cleared by the preserving interface-reset route; audit and companion storage
remain unchanged.

Validation samples the first six frames after submission from a scrolled
Authorize page, checks line visibility and stable geometry across portrait and
landscape viewports, exercises SVG keyboard actions, verifies explicit pause
survives navigation, and suspends animation frames while withholding graphics
to prove the independent clock still advances. Browser checks run serially.

Browser scheduling references: [animation frames](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
and [page visibility](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API).
