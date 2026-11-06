# ADR 0038: Continuous production disclosure and compact supervisory controls

The workspace owns a single persistent run bar above the company header. It is
visible on Authorize, Experiment, Facilities and Evidence while production is
loading, reading or explicitly paused. Observe hides it. Its value comes from
the same disclosed folio that publishes Official Output, including streamed
mandates and retained proceedings. Starting another mandate clears the value;
pending responses cannot advertise a previous run's accomplishment. Completion,
Stop and failure remove the bar. Navigation does not pause the mandate.

The bar is a native button with a compact 44-pixel minimum height, keyboard activation and a
visible focus indicator. It returns to Observe through the existing workspace
navigation contract, preserving output, current step, policy and explicit pause.
A separate polite status announces lifecycle changes; the continuously changing
value is not a live region. The compact label and value remain single lines
with visual truncation and a complete accessible name. Facilities full-screen
moves the same button into its dialog and reserves its height above the header.
Enlarged text grows the bar rather than clipping its lines, and a resize observer
reserves its actual height inside Facilities full-screen. Bounded status notices
are keyboard-focusable while in full-screen, so enlarged text remains scrollable;
closing restores their previous focusability. Closing the dialog
restores it to its original position. No additional business
request, timer or duplicate running state is introduced.

Full-screen entry and exit use decorative SVG icons with accessible names and
matching hover titles. On narrow screens, transport icons occupy 36-pixel visual
boxes separated by 12 pixels; four-pixel hit-area extensions retain 44-pixel
touch targets without overlap. The full-screen attendance notice uses one line
instead of a reserved multi-line blank area. Desktop full-screen output, log and
controls share their safe-area-aware bottom edge, with separate horizontal space
for each panel. Narrow screens retain the stacked overlay layout.

Browser checks cover icon semantics and keyboard entry/exit, bottom alignment
at multiple desktop widths, compact mobile geometry, actual extended-area pointer
activation, accessibility scans, ordinary and streamed output, pending/replaced
mandates, paused return navigation and the bar inside Facilities full-screen.
Existing scene-rendering and enlarged-text checks remain part of release review.
Browser jobs run serially. The shared Java runtime and audit storage are unchanged.
