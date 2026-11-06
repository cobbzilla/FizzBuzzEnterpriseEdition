# ADR 0039: Whole-glyph presentation and actual companion departures

The persistent rarest-five register uses emoji-only buttons. Each retains its
accessible name, rarity, ticket-weight description and existing biography/share
dialog. The five rarity categories use distinct border treatments and shapes
as well as color; Mythic adds an ornate gradient and slow glow. Reduced motion
disables decorative animation. The mobile disclosure previews the glyphs while
collapsed, exposes complete tiles when expanded, and reserves the measured footer
height. Desktop empty space is stable so late discovery replies do not resize a
Chronicle beneath a reader. Short landscape layouts use a tighter reserve.

Latest Appointments keeps up to 100 disclosed encounters for the current mandate,
ordered by exact ordinal descending. Duplicate deliveries for one encounter do
not rebuild it. Rendering is batched to a frame. The view measures actual tile
bounds and shows whole tiles that fit; smaller panes reduce their padding and
tile size. Its label is plural when desktop capacity exceeds one. Mobile keeps
one current appointment. A new mandate clears the actual pane immediately,
including when the replacement has no companion-bearing output. Focus and open
biographies defer ordinary updates until their reader can finish.

Withdrawal retains the existing run-owned receipt model. Completed finds and
other tabs' appointments keep their existing ownership. Presentation compares
the displayed register with the resulting store snapshot and moves only a
visible, actually withdrawn glyph into an inert flight layer. It does not clone
that glyph or animate an appointment that was never displayed. The old tile
is removed in the same turn. Flights have independent 4–10 second durations,
nonlinear lift, lateral sway, rebounds and random destinations along the top or
the upper 20 percent of either side. The glyph stays full-sized and visible
through most of its journey. Completion or a bounded cleanup removes its node.

An identity in flight is temporarily withheld from the rendered register. If
another valid mandate appoints the same deterministic character immediately,
its independently owned record is admitted by the store and presented as a fresh
arrival after the departure ends. With no fresh appointment, nothing reappears.
Late replies from the withdrawn run remain rejected. Switching to reduced motion
removes flights immediately; page departure cancels their presentation cleanup
without recovering withdrawn records. No Java arithmetic or audit schema changes.

Validation covers all five rarity styles, single glyphs and themed pairs,
keyboard biographies, enlarged text and narrow layouts, responsive recent-view
capacity, actual DOM identity during flight, real animation durations and exit
destinations, durable withdrawal, same-character reappointment and motion
preference changes. Browser jobs run serially. Pure trajectory and receipt tests
also cover duration boundaries, spring lift and stale-owner rejection.

The layout review also exposed delayed Firefox scroll events during Chronicle
relocation. Relocation now samples the visible position before moving the panel
and preserves a scroll performed during its pending frame. Following new minutes
still resumes at the bottom; navigation retains an earlier reading position.
