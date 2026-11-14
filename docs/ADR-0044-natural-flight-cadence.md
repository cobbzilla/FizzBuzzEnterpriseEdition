# ADR 0044: Natural flight cadence and automatic office attention

Status: accepted, 14 November 2026.

## Scheduling and custody

Automatic flights have no lifetime quota. Ordinal 30 is the first opportunity.
After an actual departure, a versioned FNV-1a hash of the exact mandate and
flight sequence chooses a gap of 60, 70, 80, 90 or 100 disclosed numbers.
Only newly disclosed zero-ending ordinals can depart. A monotonic disclosure
frontier prevents policy changes from replaying old flight opportunities.
All ordinal and sequence arithmetic uses BigInt; identities remain exact.

The shared incident coordinator enforces exclusive custody and thirty numbers
between incidents. Flights do not consume the three-heist allowance. When
aviation is available and due, a later heist cannot take its opportunity. Busy
departures defer to the next eligible disclosure; no backlog is accumulated.
Disabling aviation releases its reservation. The next interval starts from the
actual departure, so delayed flights never catch up in a burst.

## Controls and visitor experience

Authorize and live presentation settings expose matching heist and aviation
permissions. The authorization draft is separate from the current presentation
and is stored as v3 with migration from earlier drafts and tab preferences.
Facilities mirrors live permissions. Public flight rehearsal controls are
removed: aircraft arise naturally from numerical proceedings.

Companion allocation authority remains interchangeable because it is a read-only
presentation policy. It reassigns disclosed and subsequent companions without
repeating numerical production. Live changes are locked while any incident or
room relocation owns the scene; the next-run selector stays editable.

An automatic departure selects the office view and gives it the viewing area.
The camera frames aircraft and pilot closely, and a fixed twelve-piece trail
emphasizes movement without accumulating particles. The adjacent flight desk
identifies the actual pilot, explains the hold, and marks each phase. On mobile
the desk sits below the canvas. Fullscreen retains the same controls. Landing
restores the prior view and reading position; Stop, replacement and opt-out
release the same presentation ownership. Reorganization freezes flight time
and takes camera priority until the rooms settle. Explicit Pause survives.

Reduced motion retains static scene positions and readable phase announcements.
Graphics refusal keeps the automatic viewing transition and HTML flight desk.
The first-frame allowance starts again when a hidden office becomes visible;
hidden time does not consume graphics initialization time. The stall heartbeat
records completed paints, so a slow successful draw is not treated as a missing
frame. A delayed-first-draw regression covers the mobile flight in all browsers.
The immutable numerical record, audit chain and discovery policy remain intact.

## Verification

Model tests cover reproducible spacing, thousands of flights, heist fairness,
busy deferral, exact large integers and stale custody. A NullEngine renderer
check exercises every personality across phases, layouts and reduced motion,
verifying a fixed inventory without starting a browser. Browser checks use real
automatic departures to test draft isolation, live policy locks, view recovery,
multiple flights in one run, native scene controls, fullscreen, relocation,
reduced motion, graphics refusal and cancellation. Public verification exercises
natural departures online and offline. Browser runs are serial and guarded.
