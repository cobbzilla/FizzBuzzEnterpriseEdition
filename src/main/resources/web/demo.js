// Generated from web/*.ts by scripts/build.ts. Do not edit.

// web/office-content.ts
var prop = (id, name, object, story, a, aa, b, bb) => ({ id, name, object, story, actions: [{ label: a, answer: aa }, { label: b, answer: bb }] });
var officeVersion = "office-v1";
var rooms = [
  { id: "reception", name: "Reception & Queue Formation", short: "Reception", subtitle: "Please take a number. Numbers must first take a number.", color: "#d7bf83", props: [
    prop("ticket-machine", "The ticket machine", "kiosk", "A brass plaque explains that the queue for tickets is ticketed. The machine is very proud of having eliminated uncertainty about where to wait.", "Request a ticket", "Your request has been placed in the queue for permission to join the queue. The estimated waiting time is one successful organizational transformation.", "Ask who is ahead of you", "The machine prints a blank ticket. Nobody is ahead of you. Nobody has seniority."),
    prop("authorized-shortcut", "Authorized shortcut", "door", "The arrow promises Reception in only one corridor. You are standing in Reception. The arrow is technically delivering exceptional value.", "Take the shortcut", "You arrive at Reception. A congratulatory notice welcomes you back from your successful cross-functional journey. Your departure and arrival have been recorded as two office visits.", "Suggest a shorter route", "The Committee for Reducing Corridors requests a longer corridor in which to discuss your suggestion."),
    prop("suggestion-shredder", "Your Voice Matters", "shredder", "The suggestion box sits directly on a shredder. A little green lamp indicates that stakeholder feedback is being processed in real time.", "Submit a suggestion", "The machine makes a thoughtful noise and produces twelve narrow action items. The company celebrates its most granular feedback to date.", "Ask for a receipt", "A receipt is printed, read aloud to the shredder, and processed. You are thanked for your commitment to a paperless feedback culture."),
    prop("visitor-badge", "Visitor identity desk", "badge", "A badge says VISITOR. Under it, in smaller type: A visitor is someone wearing a visitor badge. The definition has survived three independent audits.", "Request a permanent badge", "Your permanent badge says TEMPORARY PERMANENT VISITOR. It expires when permanence is redefined.", "Ask to leave", "Departure is available at any time through the visible Close office control. Reception is disappointed by this unusually humane policy.")
  ] },
  { id: "personnel", name: "First Ordinal Recruitment", short: "Recruitment", subtitle: "One vacancy. One candidate. Seven offices. Tremendous competition.", color: "#b7d0ba", props: [
    prop("portrait-of-one", "Employee of the Entire Sequence", "portrait", "A framed numeral 1 looks down upon an empty chair. Nobody can remember whether the portrait was taken before or after its induction.", "Congratulate One", "One thanks you for recognizing its individual contribution. It would also like to recognize itself as the team that made the contribution possible.", "Nominate Two", "Two has excellent potential but was not present at the beginning. The panel encourages it to apply for a later beginning."),
    prop("orientation-chair", "Orientation chair", "chair", "The chair has completed orientation six times. It understands the company better than anyone and is therefore ineligible for promotion.", "Offer the chair a promotion", "The chair declines a standing appointment. HR records a regrettable lack of flexibility.", "Ask where One sits", "One has been granted a flexible seating arrangement consisting of this one chair. The company calls this choice."),
    prop("welcome-cake", "The induction cake", "cake", "A cake reads WELCOME TO YOUR PROBATIONARY COMMENCEMENT. The slice marked 1 has its own probationary period.", "Request a slice", "Catering asks whether you intend to eat the slice or merely occupy it. Facilities has strong views about unauthorized occupancy.", "Read the ingredients", "Sugar, flour, and the unanimous confidence of seven independently appointed offices. May contain traces of ambition."),
    prop("headcount-chart", "Strategic headcount forecast", "chart", "A chart rises impressively from zero to one. The vertical axis begins at 0.999. The board has described the growth as unprecedented.", "Ask about recruitment costs", "The company recruited exactly one employee and established seven offices to support the appointment. HR describes the ratio as people-first.", "Set a stretch target", "The stretch target is 1.0. HR has already convened a working group to distinguish it from 1.")
  ] },
  { id: "procurement", name: "Glyph Procurement & Receiving", short: "Procurement", subtitle: "The second z is a separate commercial obligation.", color: "#e0b19c", props: [
    prop("second-z", "The second z", "crate", "Two identical crates contain two different contractual obligations. The second z insists that similarity is not consent to unpaid overtime.", "Ask to reuse the first z", "Receiving refuses. The first z is already at work. Asking it to appear twice would constitute an undocumented secondment.", "Offer the second z a title", "The z accepts Senior Terminal Consonant. The other z immediately requests a parity review."),
    prop("approved-forklift", "The requisition forklift", "forklift", "A tiny forklift is licensed to carry one letter. It has been waiting all morning for written confirmation that F is not two letters standing on each other.", "Load a capital B", "The forklift requests a structural drawing showing whether the two bulges are independent business units.", "Ask about lowercase stock", "Lowercase inventory is competitively priced and entirely inadmissible. Procurement calls this a strong supplier relationship."),
    prop("purchase-order", "Eight positions, eight promises", "papers", "An enormous purchase order itemizes F, i, z, z, B, u, z, z. Each z has initialed its own row, creating an exciting new legibility problem.", "Consolidate the line items", "Four z requisitions are merged into one requisition to request four separate z requisitions. Procurement reports a 75% reduction in top-level complexity.", "Request expedited shipping", "Your letters arrive in alphabetical order. Assembly requests that they return through the approved entrance."),
    prop("supplier-phone", "The inexhaustible supplier", "phone", "A telephone connects to an inexhaustible fictional supplier. Its hold message says that your character is very important to us.", "Ask when z will arrive", "The supplier says z is last on its list, then clarifies that the list is alphabetical and delivery is immediate.", "Request a supplier review", "The supplier awards Procurement five stars for ordering the same five things forever. Both parties describe this as a diversified portfolio.")
  ] },
  { id: "premises", name: "Vacant String Estate Agency", short: "Premises", subtitle: "Certified nothing. Ready for immediate numerical occupation.", color: "#b4c9d9", props: [
    prop("invisible-tenant", "The invisible tenant", "room", "An apparently empty miniature room contains a tiny sign reading SITTING TENANT. This is fictional tour scenery; an actual discovered character is identified in the evidence panel.", "Knock politely", "A non-breaking space says it cannot leave because it has made a binding commitment to remain attached to the premises.", "Request an inspection", "The sign produces a tenancy agreement whose signature is a blank space. Legal considers the execution flawless."),
    prop("bel-doorbell", "The confiscated BEL", "bell", "A brass bell is labeled BEL, NOT A PERSONALITY TRAIT. The inspector keeps it in a soundproof evidence cabinet.", "Ring the bell", "The cabinet displays DING. An internal memo apologizes for the unauthorized appearance of a word outside the numerical production system.", "Ask why it was evicted", "The bell was found occupying an empty string and repeatedly announcing that nobody was there."),
    prop("vertical-staircase", "The vertical tab staircase", "stairs", "A staircase goes up exactly one decorative step and immediately comes back down. The sign calls it an executive development pathway.", "Take the development pathway", "You return with exactly the same elevation and a certificate of increased potential.", "Ask for a horizontal tab", "The horizontal tab has requested a transfer to Workplace Spacing. Both departments have become considerably wider."),
    prop("vacancy-certificate", "Certificate of nothing", "frame", "A large frame contains no picture. It is the most comprehensively documented object in the room.", "Inspect the frame", "The frame is occupied by its vacancy certificate. Facilities has opened an incident concerning the certificate\u2019s effect on vacancy.", "Move in", "This is a tour display. Actual numerical occupants obtain real request-bound leases through the production offices. The miniature landlord nevertheless asks for three references.")
  ] },
  { id: "notary", name: "Independent Proclamation Notary", short: "Notary", subtitle: "Trust, but convene a separate office to inspect the trust.", color: "#c3bad6", props: [
    prop("rubber-stamp", "The approval stamp", "stamp", "The stamp reads APPROVED. A smaller stamp reads APPROVED FOR APPROVAL. The second stamp is waiting for the first to become available.", "Stamp the approval", "A third stamp appears: ACKNOWLEDGED. It declines to express an opinion on the first two stamps.", "Ask for a digital signature", "The stamp is photographed at extremely high resolution. Digital transformation is declared complete."),
    prop("magnifying-glass", "The independent lens", "lens", "A magnifying glass sits under a second magnifying glass. The second has been appointed to ensure that the first is not making things up.", "Look more closely", "The company becomes larger while its purpose remains exactly the same. Strategy considers this a successful growth intervention.", "Ask who inspects the second lens", "The inspector points to the perfectly visible lens directory. The tour mercifully declines to generate an infinite number of lenses."),
    prop("capitalization-court", "The capitalization bench", "papers", "A capital F and a lowercase f sit at opposite ends of a desk. The lowercase f has brought excellent references and the wrong identity.", "Hear the lowercase appeal", "The bench recognizes the applicant\u2019s potential while declining to recognize it as Fizz.", "Approve BuzzFizz", "Both words have arrived, but the independent witness notices that they are standing in the wrong order. Communications blames a matrix reporting structure."),
    prop("notary-plant", "Independent botanical witness", "plant", "A plant has been placed beside the desk to make scrutiny feel more welcoming. It has received no instructions and is therefore the most independent thing in the room.", "Ask for its opinion", "The plant offers a new leaf. The bench records this as constructive feedback.", "Request more transparency", "The pot is replaced by an identical pot containing a policy on transparency. The plant\u2019s roots remain undisclosed.")
  ] },
  { id: "memory", name: "Institutional Memory Archives", short: "Memory", subtitle: "We remember everything except why.", color: "#c4c5a0", props: [
    prop("forgotten-shelf", "The forgotten shelf", "shelves", "Rows of files are impeccably indexed under THINGS WE WILL CERTAINLY REMEMBER. A sticky note asks whose files these are.", "Ask whether we met before", "The archive finds a perfect record of our previous meeting and asks you to introduce yourself for continuity purposes.", "Find the filing policy", "The policy is filed under FINDING THE FILING POLICY. Access requires familiarity with the filing policy."),
    prop("memory-ladder", "The career ladder", "stairs", "A ladder reaches a shelf labeled LOW-HANGING FRUIT. A second sign says the ladder is reserved for senior stakeholders.", "Climb the career ladder", "At the top is a memorandum congratulating you on the climb and inviting you to support someone else\u2019s ladder.", "Ask what is on the bottom shelf", "The bottom shelf contains strategic priorities. They have been placed there to ensure that everyone can step over them."),
    prop("reuse-court", "The Non-Performance Award", "trophy", "A trophy celebrates work that was correctly not done again. Its maker has produced an identical second trophy pending review.", "Congratulate the archive", "The archive recalls your congratulations from an earlier engagement and returns a certified copy of its thanks.", "Demand fresh work", "The archive asks why. It records your answer, in case someone asks the same question again."),
    prop("expiry-clock", "The relevance clock", "clock", "A clock has two hands: CURRENT and FORMERLY CURRENT. Their disagreement is described as a healthy succession pipeline.", "Ask what time it is", "It is the right time to revisit our assumptions. The clock declines to give a more operational answer.", "Request permanent relevance", "Your request will remain permanently relevant until the applicable expiry policy changes.")
  ] },
  { id: "publication", name: "Official Publication & Distribution", short: "Publication", subtitle: "Please remain calm. A complete line is about to happen.", color: "#9fc9c2", props: [
    prop("serious-printer", "The very serious printer", "printer", "A printer waits beneath a banner reading EVERY LINE A MILESTONE. It has never experienced a normal day.", "Print a test page", "The test page says TEST PAGE. A committee is astonished by the precision of the deliverable.", "Ask why it is so large", "The printer accommodates both the numerical output and the organization\u2019s expectations of itself."),
    prop("paper-airport", "The paper departure lounge", "papers", "A single sheet waits at a miniature departure gate. Its destination is THE USER. It has arrived three hours early.", "Announce boarding", "The sheet is asked to prove that it is the same sheet whose boarding was announced. Boarding pauses for document reconciliation.", "Request priority boarding", "Priority boarding gives the sheet permission to wait in a smaller, more exclusive queue."),
    prop("output-conveyor", "The complete-line conveyor", "conveyor", "A conveyor carries perfectly ordinary sheets with extraordinary confidence. A sign warns that fragments must travel together.", "Separate the fragments", "The belt refuses to stage a family separation. Fizz and its line ending continue under joint custody.", "Accelerate the conveyor", "The conveyor writes URGENT on the same delivery schedule. Operations calls this an escalation path."),
    prop("celebration-budget", "Strategic confetti reserve", "confetti", "A small jar contains a single paper triangle. The celebration budget has been optimized for shareholder confidence.", "Release the confetti", "The triangle moves ceremonially to the other side of the jar. Leadership thanks everyone for making the moment possible.", "Request a larger celebration", "The company authorizes a larger jar. The triangle is encouraged to grow into its expanded responsibilities.")
  ] },
  { id: "executive", name: "Executive Alignment & Exemptions", short: "Executive", subtitle: "The organization has never been more organized around organizing.", color: "#c9b48c", props: [
    prop("open-door", "Open Door Policy", "door", "A closed door carries an OPEN DOOR POLICY poster. Behind it is another closed door, demonstrating depth of commitment.", "Open the door", "The second door welcomes you to a more senior level of openness. It has requested that you knock through the appropriate channels.", "Ask to speak directly", "Direct communication is available by scheduling a conversation with the office that schedules direct communication."),
    prop("work-life-plant", "Work\u2013Life Balance", "plant", "A plant labeled WORK\u2013LIFE BALANCE leans toward the exit. It has submitted a flexible growing request.", "Water the plant", "The plant receives a resilience webinar. It would still quite like water.", "Approve flexible growing", "The plant may lean toward any window, provided it remains facing its desk during core hours."),
    prop("strategy-whiteboard", "The strategy whiteboard", "chart", "The board contains one enormous circle labeled ALIGNMENT. Around it is a second circle labeled ALIGNMENT ON ALIGNMENT.", "Request a concrete action", "A third circle is drawn. It is labeled ACTION ORIENTATION. The meeting declares itself outcome-focused.", "Erase a circle", "The company forms a task force to understand the emerging alignment gap."),
    prop("exit-strategy", "The Exit Strategy", "badge", "An exquisitely framed EXIT STRATEGY points toward a stationery cupboard. The actual Close office control remains available to every visitor.", "Inspect the strategy", "The cupboard contains several ways forward, all of them folders. The company celebrates a diversified exit portfolio.", "Leave a final thought", "Thank you for your time and attention. Your continued ability to leave has been approved as an exceptional stakeholder benefit.")
  ] }
];
var roomById = (id) => rooms.find((r) => r.id === id);

// web/office-layout.ts
var layoutVersion = "estate-v1";
var partitionStyles = [
  { id: "hearts", name: "Giant pink hearts", claim: "Psychological Safety Infrastructure", placard: "PSYCHOLOGICAL SAFETY" },
  { id: "bars", name: "Jail bars", claim: "Employee Autonomy Framework", placard: "EMPLOYEE AUTONOMY" },
  { id: "picket", name: "White picket fences", claim: "Boundaryless Collaboration", placard: "BOUNDARYLESS COLLABORATION" },
  { id: "cheese", name: "Giant cheese panels", claim: "A More Porous Organization", placard: "POROUS ORGANIZATION" },
  { id: "blinds", name: "Venetian blinds", claim: "Radical Transparency", placard: "RADICAL TRANSPARENCY" },
  { id: "tape", name: "Tangled red tape", claim: "Frictionless Delivery", placard: "FRICTIONLESS DELIVERY" },
  { id: "hedges", name: "Tall hedges", claim: "Organic Growth", placard: "ORGANIC GROWTH" },
  { id: "cardboard", name: "Cardboard fortifications", claim: "Permanent Interim Arrangements", placard: "PERMANENT INTERIM" },
  { id: "cabinets", name: "Filing cabinets", claim: "Open Access to Information", placard: "OPEN ACCESS" },
  { id: "bubbles", name: "Bubble-wrap panels", claim: "Organizational Resilience", placard: "RESILIENCE" },
  { id: "dominoes", name: "Oversized dominoes", claim: "Independent Risk Containment", placard: "RISK CONTAINMENT" },
  { id: "waffles", name: "Waffle grids", claim: "Matrix Management", placard: "MATRIX MANAGEMENT" }
];
var stationOffsets = { desk: { x: -0.3, y: 1.1, z: -0.9 }, personnel: { x: -0.3, y: 1.1, z: -0.9 }, boundary: { x: 0, y: 1.05, z: -1.65 }, property: { x: -2.35, y: 0.9, z: -1.6 }, glyph: { x: -0.25, y: 1.15, z: -0.65 }, notary: { x: -2.35, y: 1.1, z: -1.6 }, printer: { x: -2.35, y: 0.9, z: -1.6 }, ledger: { x: -0.3, y: 1.1, z: -0.65 }, queue: { x: 2.35, y: 1, z: -1.6 }, memory: { x: -2.35, y: 1.15, z: -1.6 }, entrance: { x: 0, y: 0, z: 2.35 } };
var width = 7.2;
var depth = 6.8;
var hash = (value) => {
  let n = 2166136261;
  for (const c of value) n = Math.imul(n ^ c.charCodeAt(0), 16777619);
  return n >>> 0;
};
function random(seed2) {
  let n = hash(seed2);
  return () => {
    n += 1831565813;
    let t = n;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function shuffle(values, rng) {
  const out = [...values];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
var rounded = (n) => Math.round(n * 1e6) / 1e6;
var distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
var slotPosition = (slot, rows, columns) => ({ x: rounded((slot % columns - (columns - 1) / 2) * width), y: 0, z: rounded((Math.floor(slot / columns) - (rows - 1) / 2) * depth) });
var slotAddress = (slot, columns) => String.fromCharCode(65 + slot % columns) + (Math.floor(slot / columns) + 1);
function generate(seed2, edition2, rows, columns) {
  if (!/^[a-f0-9]{32}$/.test(seed2) || !Number.isSafeInteger(edition2) || edition2 < 0 || edition2 > 1e6) throw new Error("Facilities received an unfamiliar estate charter.");
  const rng = random(seed2 + ":" + edition2), slots = Array.from({ length: rows * columns }, (_, i) => i), amenitySlot = rows === 3 ? Math.floor(rng() * 9) : -1;
  const available = slots.filter((i) => i !== amenitySlot), order = edition2 === 0 ? rooms.map((r) => r.id) : shuffle(rooms.map((r) => r.id), rng);
  const palette = shuffle([...partitionStyles.map((s) => s.id)], rng);
  if (edition2 === 1) {
    palette.splice(palette.indexOf("hearts"), 1);
    palette.splice(palette.indexOf("bars"), 1);
    palette.unshift("hearts", "bars");
  }
  const placements = order.map((room, i) => {
    const slot = available[i], row = Math.floor(slot / columns);
    return Object.freeze({ room, slot, address: slotAddress(slot, columns), position: Object.freeze(slotPosition(slot, rows, columns)), yaw: edition2 === 0 ? 0 : row === rows - 1 ? Math.PI : 0, partition: edition2 === 0 ? "classic" : palette[i] });
  });
  const amenity = amenitySlot < 0 ? void 0 : Object.freeze({ slot: amenitySlot, address: slotAddress(amenitySlot, columns), kind: rng() < 0.5 ? "atrium" : "breakroom", position: Object.freeze(slotPosition(amenitySlot, rows, columns)) });
  return Object.freeze({ version: layoutVersion, seed: seed2, edition: edition2, rows, columns, placements: Object.freeze(placements), amenity, bounds: Object.freeze({ minX: -columns * width / 2, maxX: columns * width / 2, minZ: -rows * depth / 2, maxZ: rows * depth / 2 }) });
}
var rowEstate = { create: (s, e) => generate(s, e, 2, 4) };
var squareEstate = { create: (s, e) => generate(s, e, 3, 3) };
function estate(seed2, edition2) {
  return (edition2 % 2 ? squareEstate : rowEstate).create(seed2, edition2);
}
var foundingEstate = estate("00000000000000000000000000000000", 0);
function nextEstate(layout) {
  if (layout.edition >= 1e6) throw new Error("One million transformations require a new company.");
  return estate(layout.seed, layout.edition + 1);
}
function layoutToken(layout) {
  return layout.version + "." + layout.seed + "." + layout.edition;
}
function parseLayoutToken(token) {
  const m = /^estate-v1\.([a-f0-9]{32})\.(0|[1-9][0-9]{0,6})$/.exec(token);
  if (!m) throw new Error("This relocation memo uses an unfamiliar estate charter.");
  return estate(m[1], Number(m[2]));
}
function addresses(layout) {
  const placement = (room) => {
    const p = layout.placements.find((p2) => p2.room === room);
    if (!p) throw new Error("The estate has misplaced " + room + ".");
    return p;
  };
  const local = (room, point) => {
    const p = placement(room), c = Math.cos(p.yaw), s = Math.sin(p.yaw);
    return { x: rounded(p.position.x + point.x * c + point.z * s), y: point.y, z: rounded(p.position.z - point.x * s + point.z * c) };
  };
  return { placement, local, resolve: (a) => local(a.room, stationOffsets[a.station]), door: (room) => local(room, { x: 0, y: 0, z: 2.75 }), outside: (room) => local(room, { x: 0, y: 0, z: depth / 2 }) };
}
var pointKey = (p) => rounded(p.x) + "," + rounded(p.z);
function corridorGraph(layout) {
  const points = /* @__PURE__ */ new Map(), links = /* @__PURE__ */ new Map(), book = addresses(layout);
  const add = (p) => {
    const k = pointKey(p);
    points.set(k, p);
    if (!links.has(k)) links.set(k, []);
    return k;
  };
  const connect = (a, b) => {
    const ka = add(a), kb = add(b);
    if (ka === kb) return;
    links.get(ka).push(kb);
    links.get(kb).push(ka);
  };
  const xs = Array.from({ length: layout.columns + 1 }, (_, i) => rounded(layout.bounds.minX + i * width)), zs = Array.from({ length: layout.rows + 1 }, (_, i) => rounded(layout.bounds.minZ + i * depth));
  for (const z of zs) {
    const row = [...xs.map((x) => ({ x, y: 0, z })), ...layout.placements.map((p) => book.outside(p.room)).filter((p) => Math.abs(p.z - z) < 1e-3)].sort((a, b) => a.x - b.x);
    for (let i = 1; i < row.length; i++) connect(row[i - 1], row[i]);
  }
  for (const x of xs) for (let i = 1; i < zs.length; i++) connect({ x, y: 0, z: zs[i - 1] }, { x, y: 0, z: zs[i] });
  return { points, links };
}
function graphRoute(graph, from, to) {
  const start = pointKey(from), end = pointKey(to), scores = /* @__PURE__ */ new Map([[start, 0]]), previous = /* @__PURE__ */ new Map(), remaining = new Set(graph.points.keys());
  while (remaining.size) {
    let current, best = Infinity;
    for (const k of remaining) {
      const d = scores.get(k) ?? Infinity;
      if (d < best) {
        best = d;
        current = k;
      }
    }
    if (!current) break;
    remaining.delete(current);
    if (current === end) {
      const path = [end];
      while (path.at(-1) !== start) path.push(previous.get(path.at(-1)));
      return path.reverse().map((k) => graph.points.get(k));
    }
    for (const k of graph.links.get(current) || []) {
      const d = best + distance(graph.points.get(current), graph.points.get(k));
      if (d < (scores.get(k) ?? Infinity)) {
        scores.set(k, d);
        previous.set(k, current);
      }
    }
  }
  throw new Error("Facilities cannot approve an unreachable department.");
}
var compact = (points) => points.filter((p, i) => i === 0 || distance(p, points[i - 1]) > 1e-5);
function routes(layout) {
  const book = addresses(layout), graph = corridorGraph(layout);
  const ground = (p) => ({ ...p, y: 0 });
  const inside = (a) => {
    const offset = stationOffsets[a.station], side = offset.x < -0.9 ? -1.25 : 1.25, hub = book.local(a.room, { x: 0, y: 0, z: 1.05 });
    return a.station === "entrance" ? compact([ground(book.resolve(a)), hub]) : compact([ground(book.resolve(a)), book.local(a.room, { x: side, y: 0, z: offset.z }), book.local(a.room, { x: side, y: 0, z: 1.05 }), hub]);
  };
  const exit = (a) => compact([...inside(a), book.door(a.room), book.outside(a.room)]);
  return { route: (from, to) => {
    if (from.room === to.room) return from.station === to.station ? [ground(book.resolve(from))] : compact([...inside(from), ...inside(to).reverse()]);
    return compact([...exit(from), ...graphRoute(graph, book.outside(from.room), book.outside(to.room)), ...exit(to).reverse()]);
  } };
}
var routeLength = (points) => points.slice(1).reduce((sum, p, i) => sum + distance(points[i], p), 0);
function pointAlong(points, fraction) {
  if (!points.length) throw new Error("A journey requires an address.");
  if (fraction >= 1) return points.at(-1);
  if (fraction <= 0) return points[0];
  let remaining = routeLength(points) * Math.max(0, Math.min(1, fraction));
  for (let i = 1; i < points.length; i++) {
    const length = distance(points[i - 1], points[i]);
    if (remaining <= length && length > 0) {
      const t = remaining / length;
      return { x: points[i - 1].x + (points[i].x - points[i - 1].x) * t, y: points[i - 1].y + (points[i].y - points[i - 1].y) * t, z: points[i - 1].z + (points[i].z - points[i - 1].z) * t };
    }
    remaining -= length;
  }
  return points.at(-1);
}
function validateEstate(layout) {
  if (layout.version !== layoutVersion || !Number.isSafeInteger(layout.edition) || layout.edition < 0 || layout.edition > 1e6 || !/^[a-f0-9]{32}$/.test(layout.seed) || layout.rows !== (layout.edition % 2 ? 3 : 2) || layout.columns !== (layout.edition % 2 ? 3 : 4)) throw new Error("The estate charter has an unsupported topology or edition.");
  if (layout.placements.length !== 8 || new Set(layout.placements.map((p) => p.room)).size !== 8 || new Set(layout.placements.map((p) => p.slot)).size !== 8) throw new Error("Every department requires one unique office.");
  for (const p of layout.placements) {
    if (!rooms.some((r) => r.id === p.room) || !Number.isInteger(p.slot) || p.slot < 0 || p.slot >= layout.rows * layout.columns || p.address !== slotAddress(p.slot, layout.columns) || ![p.position.x, p.position.y, p.position.z].every(Number.isFinite) || distance(p.position, slotPosition(p.slot, layout.rows, layout.columns)) > 1e-5 || ![0, Math.PI].includes(p.yaw) || p.partition !== "classic" && !partitionStyles.some((s) => s.id === p.partition)) throw new Error("A department has an unrecognized address or partition.");
  }
  if (layout.rows === 3 !== !!layout.amenity || layout.amenity && layout.placements.some((p) => p.slot === layout.amenity.slot)) throw new Error("The amenity has occupied a department.");
  if (!Object.values(layout.bounds).every(Number.isFinite) || layout.bounds.minX !== -layout.columns * width / 2 || layout.bounds.maxX !== layout.columns * width / 2 || layout.bounds.minZ !== -layout.rows * depth / 2 || layout.bounds.maxZ !== layout.rows * depth / 2) throw new Error("The estate bounds do not match its charter.");
  if (layout.amenity) {
    const a = layout.amenity;
    if (!["atrium", "breakroom"].includes(a.kind) || !Number.isInteger(a.slot) || a.slot < 0 || a.slot >= 9 || a.address !== slotAddress(a.slot, layout.columns) || !Object.values(a.position).every(Number.isFinite) || distance(a.position, slotPosition(a.slot, layout.rows, layout.columns)) > 1e-5) throw new Error("The amenity has no valid address.");
  }
  const planner = routes(layout);
  for (const from of rooms) for (const to of rooms) {
    const path = planner.route({ room: from.id, station: "entrance" }, { room: to.id, station: "entrance" });
    if (!path.every((p) => Number.isFinite(p.x) && Number.isFinite(p.y) && Number.isFinite(p.z))) throw new Error("A department has escaped geometry.");
  }
  return layout;
}

// web/office-relocation-model.ts
var relocationDuration = 12500;
var relocationPhase = (p) => p < 0.15 ? "packing" : p < 0.72 ? "moving" : p < 0.86 ? "unpacking" : "returning";
function sealEstate(layout) {
  validateEstate(layout);
  const frozen = Object.isFrozen(layout) && Object.isFrozen(layout.bounds) && Object.isFrozen(layout.placements) && layout.placements.every((p) => Object.isFrozen(p) && Object.isFrozen(p.position)) && (!layout.amenity || Object.isFrozen(layout.amenity) && Object.isFrozen(layout.amenity.position));
  if (frozen) return layout;
  return Object.freeze({ ...layout, bounds: Object.freeze({ ...layout.bounds }), placements: Object.freeze(layout.placements.map((p) => Object.freeze({ ...p, position: Object.freeze({ ...p.position }) }))), amenity: layout.amenity ? Object.freeze({ ...layout.amenity, position: Object.freeze({ ...layout.amenity.position }) }) : void 0 });
}
var RelocationCoordinator = class {
  value;
  authority;
  listeners = /* @__PURE__ */ new Set();
  pending;
  serial = 0;
  last;
  allowed = false;
  constructor(initial2 = foundingEstate, authority = nextEstate) {
    this.value = sealEstate(initial2);
    this.authority = authority;
  }
  get current() {
    return this.value;
  }
  get moving() {
    return !!this.pending;
  }
  get relocation() {
    const p = this.pending;
    if (!p) return;
    const progress = p.elapsed / relocationDuration;
    return Object.freeze({ id: p.id, from: p.from, to: p.to, progress, phase: relocationPhase(progress) });
  }
  get displayed() {
    const p = this.relocation;
    return p && p.progress >= 0.72 ? p.to : this.value;
  }
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  notify(kind, relocation) {
    for (const listener of this.listeners) listener({ kind, relocation });
  }
  request() {
    if (this.pending) return this.pending.to;
    const candidate = sealEstate(this.authority(this.value));
    if (candidate.edition !== this.value.edition + 1 || candidate.rows === this.value.rows || candidate.seed !== this.value.seed) throw new Error("Facilities must alternate estates and advance exactly one edition.");
    for (const room of this.value.placements) {
      const moved = candidate.placements.find((p) => p.room === room.room);
      if (distance(room.position, moved.position) < 0.5) throw new Error("Every department must experience an actual relocation.");
    }
    this.pending = { id: ++this.serial, from: this.value, to: candidate, elapsed: 0 };
    this.last = void 0;
    this.allowed = false;
    this.notify("staged", this.relocation);
    return candidate;
  }
  advance(now, allow, id = this.pending?.id) {
    if (!this.pending || id !== this.pending.id) return;
    if (!Number.isFinite(now)) throw new Error("A relocation requires a finite clock.");
    const delta = this.last === void 0 || !this.allowed ? 0 : Math.max(0, now - this.last);
    this.last = now;
    this.allowed = allow;
    if (!allow) return;
    this.pending.elapsed = Math.min(relocationDuration, this.pending.elapsed + delta);
    if (this.pending.elapsed >= relocationDuration) {
      this.finish();
      return;
    }
    if (delta) this.notify("progress", this.relocation);
  }
  finish() {
    const p = this.relocation;
    if (!p) return false;
    this.value = p.to;
    this.pending = void 0;
    this.last = void 0;
    this.allowed = false;
    this.notify("committed", Object.freeze({ ...p, progress: 1, phase: "returning" }));
    return true;
  }
  cancel() {
    const p = this.relocation;
    if (!p) return false;
    this.pending = void 0;
    this.last = void 0;
    this.allowed = false;
    this.notify("cancelled", p);
    return true;
  }
  /** Immediate application is useful to read a saved or reduced-motion charter. */
  reorganize() {
    const target = this.request();
    this.finish();
    return target;
  }
};

// web/office-estate-records.ts
var titles = ["The Great Boundaryless Containment", "Project Horizontal Ascendancy", "The Accountability Dispersal Initiative", "Operation Unbroken Silos", "The Furniture-Led Recovery", "A Return to Forward Thinking", "The Strategic Proximity Correction", "Project Tomorrow Was Yesterday", "The Workplace Simplification Complex", "The Final Interim Configuration", "The Synergy Redistribution Event", "The Transformational Transformation"];
var rationales = ["The old rooms had become dangerously familiar. Familiarity permits decisions without asking where to go.", "An independent consultant observed that our office had an arrangement. We have acted decisively on this finding.", "Staff could locate the printer from memory. This constituted an unmanaged concentration of institutional knowledge.", "The company requires a change of direction. Facilities has supplied several, including a turn past the new wall.", "Our previous floorplan contained silos. These new enclosures have each signed a declaration denying that description.", "Management promised movement. No specific mention was made of progress.", "The board wished to see a matrix. Facilities would like the board to stop using metaphors around contractors.", "The estate was aligned with the last strategy. A new strategy has since been left in a meeting room.", "The shortest route had become a single point of failure. We have diversified the inconvenience.", "Several desks reported a sense of stability. The company takes such allegations seriously.", "A photograph suggested we had finished organizing. Facilities regrets the misleading impression.", "Our long-term vision remains unchanged: to have a long-term vision after the next move."];
var estateLabel = (l) => "Edition " + l.edition + " \xB7 " + l.rows + "\xD7" + l.columns;
var qualifiedAddress = (l, room) => estateLabel(l) + " / " + l.placements.find((p) => p.room === room).address;
function meanCommute(l) {
  const planner = routes(l);
  let total = 0, count = 0;
  for (const from of rooms) for (const to of rooms) if (from !== to) {
    total += routeLength(planner.route({ room: from.id, station: "desk" }, { room: to.id, station: "desk" }));
    count++;
  }
  return total / count;
}
function estateMemo(from, to) {
  if (from.seed !== to.seed || to.edition !== from.edition + 1) throw new Error("These minutes do not describe one consecutive relocation.");
  const before = meanCommute(from), after = meanCommute(to), change = (after / before - 1) * 100;
  const finding = Math.abs(change) < 0.05 ? "Paper travel is unchanged. Facilities has nevertheless achieved a complete renewal of the signage." : change > 0 ? "Illustrated paper travel increased " + change.toFixed(1) + "%. Facilities reports improved cross-functional exposure." : "Illustrated paper travel decreased " + Math.abs(change).toFixed(1) + "%. Facilities is investigating the accidental efficiency.";
  return Object.freeze({ from, to, title: titles[(to.edition - 1) % titles.length], rationale: rationales[(to.edition - 1) % rationales.length], before, after, finding });
}
function readEstateSession(raw) {
  if (raw.length > 12e3) throw new Error("Facilities has exceeded its filing cabinet.");
  const record = JSON.parse(raw);
  if (record.schema !== "slopbuzz-estate-session/v1" || typeof record.current !== "string" || !Array.isArray(record.history) || record.history.length > 10) throw new Error("The saved estate charter is unfamiliar.");
  const current = parseLayoutToken(record.current), history2 = [];
  for (const pair of record.history) {
    if (!Array.isArray(pair) || pair.length !== 2 || pair.some((p) => typeof p !== "string")) throw new Error("Incomplete relocation minutes.");
    const from = parseLayoutToken(pair[0]), to = parseLayoutToken(pair[1]);
    if (history2.length && layoutToken(history2.at(-1).to) !== layoutToken(from)) throw new Error("The minutes are out of sequence.");
    history2.push(estateMemo(from, to));
  }
  if (history2.length && layoutToken(history2.at(-1).to) !== layoutToken(current)) throw new Error("The minutes refer to another estate.");
  return { current, history: history2 };
}
function writeEstateSession(current, history2) {
  return JSON.stringify({ schema: "slopbuzz-estate-session/v1", current: layoutToken(current), history: history2.slice(-10).map((m) => [layoutToken(m.from), layoutToken(m.to)]) });
}
var amenities = {
  atrium: { name: "The Strategic Growth Atrium", story: "One plant has been promoted to Chief Growth Officer. Its superior performance is attributed to remaining silent during planning. The benches are for admiring growth; sitting is interpreted as a development objective.", actions: [{ label: "Inspect the promotion", answer: "The fern grew four millimeters without a stand-up. Management has requisitioned a root-cause analysis and a smaller pot." }, { label: "Review the seating policy", answer: "The benches are permanently available for the idea of taking a break. Physical occupancy requires a compelling business case." }, { label: "Request natural light", answer: "The skylight is a forecast. Facilities has installed a plaque confirming that brighter days remain on the roadmap." }] },
  breakroom: { name: "The Compulsory Optional Restoration Suite", story: "A coffee machine occupies the ninth cell as an independent cost center. The mugs say WE VALUE YOUR INPUT. None has a handle. A biscuit is being withheld pending clarification of whether crumbs count as deliverables.", actions: [{ label: "Request a coffee", answer: "The machine dispenses a cup of hot water and a statement of intent. The bean dependency is in procurement. It has been in procurement since the founding." }, { label: "Inspect the biscuit", answer: "It is a display biscuit. Consuming company culture is encouraged in principle, but this would compromise the exhibit." }, { label: "Read the fridge notice", answer: "PLEASE LABEL ALL ITEMS WITH NAME, DATE, COST CENTER, AND SUCCESSION PLAN. An unlabeled yogurt has been appointed interim facilities director." }] }
};

// web/office-estate.ts
var OfficeEstate = class extends RelocationCoordinator {
};
var estateRecords = { notice: "", history: [] };
var key = "slopbuzz:estate:v1";
var initial = foundingEstate;
try {
  const url = new URL(location.href), token = url.searchParams.get("estate");
  let saved;
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) saved = readEstateSession(raw);
  } catch {
    estateRecords.notice = "Facilities could not read its saved minutes. This arrangement remains available for the current visit.";
  }
  if (token !== null) {
    try {
      initial = parseLayoutToken(token);
      if (saved && layoutToken(saved.current) === token) estateRecords.history = saved.history;
    } catch {
      estateRecords.notice = "This relocation memo is malformed or belongs to an unfamiliar edition. The founding estate is open; counting and inspections remain available.";
    }
  } else if (url.searchParams.has("tour")) initial = foundingEstate;
  else if (saved) {
    initial = saved.current;
    estateRecords.history = saved.history;
  } else {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    initial = estate([...bytes].map((b) => b.toString(16).padStart(2, "0")).join(""), 0);
  }
} catch {
}
var officeEstate = new OfficeEstate(initial);
officeEstate.subscribe((event) => {
  if (event.kind !== "committed") return;
  estateRecords.notice = "";
  estateRecords.history.push(estateMemo(event.relocation.from, event.relocation.to));
  estateRecords.history = estateRecords.history.slice(-10);
  try {
    sessionStorage.setItem(key, writeEstateSession(officeEstate.current, estateRecords.history));
  } catch {
    estateRecords.notice = "Facilities cannot save this visit in tab storage. The current arrangement and its minutes remain available until this page closes.";
  }
  try {
    const url = new URL(location.href);
    if (document.body.dataset.sitePage === "demo") {
      url.searchParams.set("estate", layoutToken(officeEstate.current));
      history.replaceState(history.state, "", url);
    }
  } catch {
  }
});

// web/office-heist-model.ts
var heistChaseMs = 15e3;
var heistReturnMs = 3e3;
var destinations = ["reception", "personnel", "procurement", "premises", "memory", "publication", "executive"];
function heistEligible(ordinal) {
  return /^[1-9][0-9]+$/.test(ordinal) && ordinal === Array.from(ordinal).reverse().join("");
}
function heistTactic(emoji) {
  return emoji.includes("\u{1F40C}") ? "snail" : emoji.includes("\u{1F47B}") ? "ghost" : emoji.includes("\u{1F419}") ? "octopus" : "runner";
}
function seed(text2) {
  let value = 2166136261;
  for (const character of text2) value = Math.imul(value ^ character.charCodeAt(0), 16777619) >>> 0;
  return value;
}
function planHeist(mandate, ordinal, authority, companions2, source = "encounter") {
  if (!/^[1-9][0-9]*$/.test(mandate) || !heistEligible(ordinal) || !authority || companions2.length < 1) throw new Error("The heist requires a positive mandate, a multi-digit palindrome and a named accomplice.");
  const unique = [...new Map(companions2.map((c) => [c.id, c])).values()].slice(0, 3);
  if (unique.some((c) => !c.id || !c.name || !c.emoji)) throw new Error("Anonymous suspects must first report to Personnel.");
  const actors = Object.freeze(unique.map((c) => Object.freeze({ ...c, tactic: heistTactic(c.emoji) })));
  const key2 = ["stamp-heist-v1", source, mandate, ordinal, authority, ...actors.map((a) => a.id)].join("|");
  let random2 = seed(key2);
  const pool = [...destinations];
  for (let i = pool.length - 1; i > 0; i--) {
    random2 = Math.imul(random2, 1664525) + 1013904223 >>> 0;
    const j = random2 % (i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return Object.freeze({ key: key2, ordinal, mandate, source, actors, rooms: Object.freeze(["notary", ...pool.slice(0, 3)]) });
}
function heistFinding(resolution) {
  return {
    intercepted: "Stamp recovered. The suspect claims this was a cross-departmental delivery.",
    biscuit: "Amnesty accepted. One biscuit has outperformed the entire security budget.",
    automatic: "The accomplices returned the stamp after discovering that stolen approval still requires approval.",
    skipped: "The chase was waived. The stamp returned through an undisclosed administrative shortcut.",
    cancelled: "The chase was adjourned and the stamp returned. No numerical work was repeated.",
    disabled: "Companion mischief is disabled. The stamp has reluctantly resumed its ordinary employment."
  }[resolution];
}
function heistAntic(actor) {
  return {
    snail: "An extremely slow getaway. Security has requested a slower pursuit.",
    ghost: "The ghost uses the wall. Its pursuing paperwork must use the door.",
    octopus: "Eight apparent stamps. Seven are unauthorized impressions of confidence.",
    runner: "The suspect is carrying approval without permission to carry approval."
  }[actor.tactic];
}
var HeistCoordinator = class {
  serial = 0;
  pending;
  last;
  allowed = false;
  listeners = /* @__PURE__ */ new Set();
  records = [];
  get active() {
    return !!this.pending;
  }
  get snapshot() {
    const p = this.pending;
    if (!p) return;
    const chase = p.returnFrom ?? Math.min(p.elapsed, heistChaseMs), leg = Math.min(2, Math.floor(chase / 5e3));
    return Object.freeze({ ...p, leg, holder: leg % p.plan.actors.length, legProgress: Math.min(1, (chase - leg * 5e3) / 5e3), returning: p.elapsed >= heistChaseMs, returnProgress: Math.max(0, (p.elapsed - heistChaseMs) / heistReturnMs) });
  }
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  notify() {
    for (const listener of this.listeners) listener();
  }
  start(plan) {
    if (this.active) return false;
    this.pending = { id: ++this.serial, plan, elapsed: 0, footprints: false, announcement: plan.actors[0].name + " has stolen the approval stamp." };
    this.last = void 0;
    this.allowed = false;
    this.notify();
    return true;
  }
  advance(now, allow, id = this.pending?.id) {
    const p = this.pending;
    if (!p || id !== p.id) return;
    if (!Number.isFinite(now)) throw new Error("A pursuit requires a finite clock.");
    const delta = this.last === void 0 || !this.allowed || !allow ? 0 : Math.max(0, now - this.last);
    this.last = Math.max(this.last ?? now, now);
    this.allowed = allow;
    if (!allow) return;
    const before = this.snapshot;
    p.elapsed = Math.min(heistChaseMs + heistReturnMs, p.elapsed + delta);
    if (p.elapsed >= heistChaseMs && !p.resolution) {
      p.resolution = "automatic";
      p.returnFrom = heistChaseMs;
      p.announcement = heistFinding("automatic");
    } else if (!this.snapshot.returning && before.holder !== this.snapshot.holder) p.announcement = p.plan.actors[this.snapshot.holder].name + " now holds the stamp. " + heistAntic(p.plan.actors[this.snapshot.holder]);
    if (p.elapsed >= heistChaseMs + heistReturnMs) {
      this.finish(p.resolution || "automatic");
      return;
    }
    if (delta) this.notify();
  }
  intercept(index, id = this.pending?.id) {
    const s = this.snapshot;
    if (!s || s.id !== id || s.returning || !Number.isInteger(index) || !s.plan.actors[index]) return false;
    if (index !== s.holder) {
      this.pending.announcement = s.plan.actors[index].name + " objects: \u201CI was attending a meeting about my whereabouts.\u201D";
      this.notify();
      return false;
    }
    this.recover("intercepted");
    return true;
  }
  follow() {
    const s = this.snapshot;
    if (!s || s.returning) return;
    this.pending.footprints = true;
    this.pending.announcement = "Footprints lead from " + s.plan.rooms[Math.min(2, Math.floor(s.elapsed / 5e3))] + " toward " + s.plan.rooms[Math.min(3, Math.floor(s.elapsed / 5e3) + 1)] + ". The trail has not applied for confidentiality.";
    this.notify();
  }
  recover(resolution) {
    const p = this.pending;
    if (!p || p.resolution) return;
    p.resolution = resolution;
    p.returnFrom = p.elapsed;
    p.elapsed = heistChaseMs;
    p.announcement = heistFinding(resolution);
    this.last = void 0;
    this.allowed = false;
    this.notify();
  }
  finish(resolution = "skipped") {
    const p = this.pending;
    if (!p) return;
    this.records.push(Object.freeze({ id: p.id, plan: p.plan, resolution, finding: heistFinding(resolution) }));
    if (this.records.length > 10) this.records.shift();
    this.pending = void 0;
    this.last = void 0;
    this.allowed = false;
    this.notify();
  }
};

// web/presentation-scheduler.ts
var PresentationScheduler = class {
  constructor(visible2) {
    this.visible = visible2;
  }
  visible;
  frame;
  timer;
  callback;
  painting = false;
  serial = 0;
  request(callback) {
    this.cancel();
    this.callback = callback;
    this.arm();
  }
  cancel() {
    this.clear();
    this.callback = void 0;
  }
  refresh() {
    if (this.callback) {
      this.clear();
      this.arm();
    }
  }
  canPaint() {
    return !document.hidden && this.visible();
  }
  clear() {
    this.serial++;
    if (this.frame !== void 0) cancelAnimationFrame(this.frame);
    clearTimeout(this.timer);
    this.frame = void 0;
    this.timer = void 0;
  }
  arm() {
    this.painting = this.canPaint();
    const serial = this.serial;
    const run = (now) => {
      if (serial !== this.serial) return;
      this.clear();
      const callback = this.callback;
      this.callback = void 0;
      callback?.(now);
    };
    if (this.painting) this.frame = requestAnimationFrame(run);
    this.timer = setTimeout(() => run(performance.now()), this.painting ? 100 : 50);
  }
};

// web/companion-story.ts
function node(tag, text2) {
  const n = document.createElement(tag);
  if (text2) n.textContent = text2;
  return n;
}
function characterStory(c) {
  const fragment = document.createDocumentFragment();
  const glyph = node("span", c.emoji);
  glyph.className = "companion-glyph";
  glyph.setAttribute("aria-hidden", "true");
  fragment.append(glyph, node("p", (c.kind === "pair" ? "Themed emoji pair" : "Single emoji") + " \xB7 " + c.category + " \xB7 " + c.rarity + " \xB7 target frequency: " + c.weight.toLocaleString() + " of 1,000,000,000 tickets."));
  const dl = node("dl");
  for (const [label, value] of [["Personality", c.personality], ["Previously in this extraordinary career", c.backstory], ["Motivating energy", c.energy], ["Ultimate goal", c.goal]]) dl.append(node("dt", label), node("dd", value));
  fragment.append(dl);
  return fragment;
}

// web/runtime-protocol.ts
var runtimeProtocol = 1;
function isTransientOperation(path, method = "GET") {
  return method === "GET" && ["/premises/rehearsal", "/companions/catalog", "/companions/strategies", "/companions/window", "/operations/runtime", "/fizzbuzz/window", "/fizzbuzz/window/explained", "/capacity/forecast/extended", "/procurement/dossier", "/onboarding/rehearsal", "/precedent/rehearsal"].includes(path.split("?")[0]);
}

// web/release-assets.ts
var scope = new URL("../", import.meta.url).href;
var releaseFile = (path) => new URL(
  (typeof RELEASE_ASSET_DIRECTORY === "string" ? RELEASE_ASSET_DIRECTORY : "") + path,
  scope
);
var releaseAsset = (path) => new URL((typeof RELEASE_ASSET_DIRECTORY === "string" ? RELEASE_ASSET_DIRECTORY : "assets/") + path, scope);

// web/runtime.ts
var configurationKey = /* @__PURE__ */ Symbol.for("slopbuzz:runtime-configuration:v1");
var configurationURL = releaseFile("runtime-config.json").href;
var configurations = globalThis;
if (configurations[configurationKey] && configurations[configurationKey].url !== configurationURL) throw Error("A different release configuration already owns this page.");
configurations[configurationKey] ||= { url: configurationURL, load: fetch(configurationURL, { cache: "no-cache" }).then((r) => {
  if (!r.ok) throw Error("Deployment configuration is unavailable");
  return r.json();
}) };
var config = await configurations[configurationKey].load;
var BrowserRuntimeClient = class _BrowserRuntimeClient {
  constructor(configuration = config, isolated, transient = false) {
    this.configuration = configuration;
    if (!navigator.locks || !globalThis.crypto?.subtle) throw new Error("This browser requires a secure context, Web Locks, IndexedDB and Web Crypto.");
    this.channel = new BroadcastChannel(`slopbuzz:${scope}${isolated ? `:rehearsal:${isolated}` : ""}`);
    this.channel.onmessage = (event) => this.pending.get(event.data.id)?.(event.data);
    this.worker = new Worker(new URL(`${configuration.assets}runtime-worker.js`, scope));
    this.worker.postMessage({ config: configuration, scope, isolated, transient });
    addEventListener("pagehide", this.onHide, { once: true });
  }
  configuration;
  channel;
  worker;
  pending = /* @__PURE__ */ new Map();
  compatibleOwners = /* @__PURE__ */ new Map();
  transientClient;
  narrativeCapabilities = /* @__PURE__ */ new Map();
  closed = false;
  onHide = () => this.close();
  close() {
    if (this.closed) return;
    this.closed = true;
    removeEventListener("pagehide", this.onHide);
    this.transientClient?.close();
    this.worker.terminate();
    this.channel.close();
  }
  async owner() {
    if (this.closed) throw Error("This runtime client has been closed.");
    const id = crypto.randomUUID();
    return new Promise((resolve, reject) => {
      const send = () => this.channel.postMessage({ kind: "hello", id, revision: this.configuration.revision });
      const retry = setInterval(send, 150);
      const timeout = setTimeout(() => {
        clearInterval(retry);
        this.pending.delete(id);
        reject(new Error("Runtime initialization timed out. No request was submitted."));
      }, 6e4);
      this.pending.set(id, (reply) => {
        clearInterval(retry);
        clearTimeout(timeout);
        this.pending.delete(id);
        resolve(reply);
      });
      send();
    });
  }
  async request(path, options = {}) {
    const owner = await this.owner();
    if (owner.error) throw new Error(owner.error);
    if (owner.revision !== this.configuration.revision) {
      if (!this.compatibleOwners.has(owner.leader)) {
        this.compatibleOwners.set(owner.leader, this.verifyCompatibility(owner));
      }
      await this.compatibleOwners.get(owner.leader);
      if (isTransientOperation(path, options.method)) {
        this.transientClient ||= new _BrowserRuntimeClient(this.configuration, crypto.randomUUID(), true);
        return this.transientClient.request(path, options);
      }
    }
    return this.dispatch(owner, path, options);
  }
  async proclamation(path) {
    const owner = await this.owner();
    if (owner.error) throw new Error(owner.error);
    if (owner.revision !== this.configuration.revision) {
      if (!this.compatibleOwners.has(owner.leader)) this.compatibleOwners.set(owner.leader, this.verifyCompatibility(owner));
      await this.compatibleOwners.get(owner.leader);
      if (isTransientOperation(path)) {
        this.transientClient ||= new _BrowserRuntimeClient(this.configuration, crypto.randomUUID(), true);
        return this.transientClient.proclamation(path);
      }
    }
    if (!this.narrativeCapabilities.has(owner.leader)) this.narrativeCapabilities.set(owner.leader, this.dispatch(owner, "/operations/runtime").then(async (response) => response.ok ? response.json() : {}));
    const info = await this.narrativeCapabilities.get(owner.leader);
    return annotate(await this.dispatch(owner, info.narrative === 1 ? explainedPath(path) : path), info);
  }
  async verifyCompatibility(owner) {
    const response = await this.dispatch(owner, "/operations/runtime");
    const runtime2 = response.ok ? await response.json() : {};
    if (runtime2.protocol !== runtimeProtocol || runtime2.mode !== "browser" || runtime2.revision !== owner.revision || runtime2.storage !== "IndexedDB") {
      throw new Error("The open audit runtime uses an unsupported protocol. Close other site tabs, then reload. No mandate was submitted.");
    }
  }
  dispatch(owner, path, options = {}) {
    const id = crypto.randomUUID();
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error("The runtime stopped responding. The outcome is unknown; inspect the audit before resubmitting."));
      }, 12e4);
      this.pending.set(id, (reply) => {
        if (reply.kind !== "reply" || reply.leader !== owner.leader || reply.revision !== owner.revision) return;
        clearTimeout(timeout);
        this.pending.delete(id);
        if (reply.error) reject(new Error(reply.error));
        else {
          const headers = new Headers(reply.result.headers);
          headers.set("X-SlopBuzz-Executing-Revision", reply.revision);
          resolve(new Response(reply.result.body, { status: reply.result.status, headers }));
        }
      });
      this.channel.postMessage({ kind: "request", id, leader: owner.leader, revision: owner.revision, path, method: options.method || "GET", traceparent: new Headers(options.headers).get("traceparent") || "" });
    });
  }
};
var ServerRuntimeClient = class {
  capabilities;
  request(path, options = {}) {
    return fetch(`${(config.apiBaseUrl || "").replace(/\/$/, "")}${path}`, { ...options, cache: "no-store" });
  }
  async proclamation(path) {
    this.capabilities ||= this.request("/operations/runtime").then(async (response) => response.ok ? response.json() : {});
    const info = await this.capabilities;
    return annotate(await this.request(info.narrative === 1 ? explainedPath(path) : path), info);
  }
};
function explainedPath(path) {
  const split = path.indexOf("?");
  return (split < 0 ? path : path.slice(0, split)) + "/explained" + (split < 0 ? "" : path.slice(split));
}
function annotate(response, info) {
  const headers = new Headers(response.headers);
  const safe = Object.fromEntries(["mode", "engine", "storage", "cache", "revision", "protocol", "narrative"].filter((key2) => info[key2] !== void 0).map((key2) => [key2, info[key2]]));
  headers.set("X-SlopBuzz-Execution-Runtime", JSON.stringify(safe).replace(/[^\x20-\x7e]/g, (char) => "\\u" + char.charCodeAt(0).toString(16).padStart(4, "0")));
  return new Response(response.body, { status: response.status, headers });
}
if (!["browser", "server"].includes(config.mode)) throw new Error("Unrecognized runtime mode");
var ownerKey = /* @__PURE__ */ Symbol.for("slopbuzz:runtime-owner:v1");
var owners = globalThis;
var edition = [scope, config.mode, config.revision, config.engine].join("|");
if (owners[ownerKey] && owners[ownerKey].edition !== edition) throw Error("A different release already owns this page. Finish the current mandate before refreshing.");
owners[ownerKey] ||= { edition, client: config.mode === "server" ? new ServerRuntimeClient() : new BrowserRuntimeClient() };
var runtime = owners[ownerKey].client;
var proclamation = (path) => runtime.proclamation(path);
var request = (path, options) => path === "/openapi.json" && (!options?.method || options.method === "GET") ? fetch(releaseFile("openapi.json")) : runtime.request(path, options);
if ("serviceWorker" in navigator && config.mode === "browser") {
  void navigator.serviceWorker.register(new URL("sw.js", scope), { scope: new URL(scope).pathname }).catch((error) => console.warn("Offline installation unavailable", error));
}
var desks = /^\/(?:companions\/|fizzbuzz|onboarding\/rehearsal|precedent\/rehearsal|procurement\/dossier|capacity\/forecast|healthz|readyz|cache\/status|operations\/|audit\/)/;
function mapOperationalLinks() {
  if (config.mode === "browser") document.querySelectorAll("a[href]").forEach((link) => {
    const url = new URL(link.href);
    const base = new URL(scope).pathname.replace(/\/$/, "");
    const path = url.pathname.slice(base.length) + url.search;
    if (url.origin !== location.origin || !desks.test(path)) return;
    link.href = new URL(`response/?path=${encodeURIComponent(path)}`, scope).href;
  });
}
if (!owners[ownerKey].linksBound) {
  owners[ownerKey].linksBound = true;
  document.addEventListener("site-page-change", mapOperationalLinks);
}
mapOperationalLinks();

// web/discovery-model.ts
var seedPolicy = "mandate-v1";
var discoveryStorageKey = "slopbuzz:extraordinary-appointments:v1";
var decimal = (x) => typeof x === "string" && /^(0|[1-9][0-9]*)$/.test(x);
var text = (x) => typeof x === "string" && x.length > 0;
function validDiscovery(x) {
  if (!x || !decimal(x.mandate) || !text(x.strategy) || !text(x.catalogVersion) || x.seedPolicy !== seedPolicy || typeof x.discoveredAt !== "string" || !Number.isFinite(Date.parse(x.discoveredAt))) return false;
  const c = x.companion, a = x.assignment, f = a?.factors;
  if (!c || !["single", "pair"].includes(c.kind) || !Array.isArray(c.components) || !c.components.every(text) || !["Common", "Uncommon", "Rare", "Legendary", "Mythic"].includes(c.rarity) || !Number.isSafeInteger(c.weight) || c.weight < 1 || c.weight > 1e9) return false;
  if (!["id", "emoji", "name", "category", "personality", "backstory", "energy", "goal"].every((key2) => text(c[key2]))) return false;
  if (!a || !decimal(a.ordinal) || a.ordinal === "0" || BigInt(a.ordinal) > BigInt(x.mandate) || !["Fizz", "Buzz", "FizzBuzz"].includes(a.flavor) || a.companionId !== c.id || !Number.isSafeInteger(a.ticket) || a.ticket < 0 || a.ticket >= 1e9) return false;
  const n = BigInt(a.ordinal), flavor = n % 15n === 0n ? "FizzBuzz" : n % 3n === 0n ? "Fizz" : n % 5n === 0n ? "Buzz" : "";
  return flavor === a.flavor && !!f && text(f.factors) && decimal(f.cofactor) && typeof f.complete === "boolean" && Number.isInteger(f.divisions) && f.divisions >= 0 && Number.isInteger(f.divisionBudget) && f.divisionBudget >= f.divisions && Number.isInteger(f.trialPrimeCeiling);
}
function discoveryIdentity(d) {
  return d.catalogVersion + "|" + d.companion.id;
}
var provenance = (d) => JSON.stringify([d.discoveredAt, d.mandate, d.assignment.ordinal, d.strategy, d.assignment.ticket]);
function rarestDiscoveries(...collections) {
  const distinct = /* @__PURE__ */ new Map();
  for (const collection of collections) for (const d of collection) {
    if (!validDiscovery(d)) continue;
    const id = discoveryIdentity(d), previous = distinct.get(id);
    if (!previous || provenance(d) < provenance(previous)) distinct.set(id, d);
  }
  return [...distinct.values()].sort((a, b) => a.companion.weight - b.companion.weight || discoveryIdentity(a).localeCompare(discoveryIdentity(b), "en")).slice(0, 5);
}
function decodeDiscoveries(value) {
  try {
    const x = JSON.parse(value || "null");
    return x?.schema === "slopbuzz-discoveries/v1" && Array.isArray(x.finds) ? rarestDiscoveries(x.finds) : [];
  } catch {
    return [];
  }
}
var encodeDiscoveries = (finds) => JSON.stringify({ schema: "slopbuzz-discoveries/v1", finds });
function discoveryLink(d, scope2) {
  const url = new URL("demo/", scope2);
  url.search = new URLSearchParams({ limit: d.mandate, authority: d.strategy, catalog: d.catalogVersion, seedPolicy: d.seedPolicy, ordinal: d.assignment.ordinal, companion: d.companion.id }).toString();
  return url.href;
}

// web/companion-dialog.ts
var controllerSymbol = /* @__PURE__ */ Symbol.for("slopbuzz.companion-dialog.v1");
function companionDialog() {
  const dialog = document.querySelector("#companion-dialog");
  if (dialog[controllerSymbol]) return dialog[controllerSymbol];
  let invoker, beganOnBackdrop = false;
  dialog.querySelector("[data-companion-close]").addEventListener("click", () => dialog.close());
  const outside = (e) => {
    const b = dialog.getBoundingClientRect();
    return e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom;
  };
  dialog.addEventListener("pointerdown", (e) => {
    beganOnBackdrop = e.target === dialog && outside(e);
  });
  dialog.addEventListener("pointercancel", () => {
    beganOnBackdrop = false;
  });
  dialog.addEventListener("click", (e) => {
    const dismiss = dialog.open && beganOnBackdrop && e.target === dialog && outside(e);
    beganOnBackdrop = false;
    if (dismiss) dialog.close();
  });
  dialog.addEventListener("close", () => {
    beganOnBackdrop = false;
    const target = invoker?.isConnected && invoker.getClientRects().length ? invoker : [document.querySelector("#discovery-toggle"), document.querySelector("#discovery-list button"), document.querySelector("main")].find((el) => el?.getClientRects().length);
    target?.focus();
    dialog.dispatchEvent(new Event("companion-closed"));
  });
  const controller = { open(d, opener) {
    invoker = opener;
    const a = d.assignment, c = d.companion;
    dialog.querySelector("h2").textContent = c.name + " \xB7 " + a.ordinal + " " + a.flavor;
    const body = dialog.querySelector("[data-companion-story]");
    body.replaceChildren(characterStory(c));
    body.append(node("h3", "Allocation evidence"), node("p", "Mandate: " + d.mandate + ". Strategy: " + d.strategy + ". Seed policy: " + d.seedPolicy + ". Catalog: " + d.catalogVersion + ". Ticket: " + a.ticket + "."), node("p", "Extracted exact factors: " + a.factors.factors + ". " + (a.factors.complete ? "Complete factorization." : "Unresolved exact cofactor: " + a.factors.cofactor + ". This cofactor is not certified prime.") + " Division checks: " + a.factors.divisions + " of " + a.factors.divisionBudget + "."));
    const label = node("label", "Reproducible encounter link");
    label.htmlFor = "companion-share-link";
    const link = node("input");
    link.id = "companion-share-link";
    link.type = "url";
    link.readOnly = true;
    link.value = discoveryLink(d, scope);
    const copy = node("button", "Copy encounter link");
    copy.type = "button";
    const status = node("p");
    status.setAttribute("role", "status");
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(link.value);
        status.textContent = "Encounter link copied. The recipient can inspect this appointment without running the full mandate.";
      } catch {
        link.focus();
        link.select();
        status.textContent = "Copy the selected link using your browser\u2019s copy command.";
      }
    });
    body.append(label, link, copy, status);
    if (!dialog.open) dialog.showModal();
    dialog.querySelector(".companion-dialog-body").scrollTop = 0;
  } };
  dialog[controllerSymbol] = controller;
  return controller;
}

// web/discovery-store.ts
var provisionalDiscoveryPrefix = "slopbuzz:provisional-appointments:";
var storeSymbol = /* @__PURE__ */ Symbol.for("slopbuzz.discovery-store.v2");
function createDiscoveryStore(storage) {
  let settled = [], finds = [], persistent = !!storage, publishedPersistent = persistent;
  const listeners = /* @__PURE__ */ new Set(), active = /* @__PURE__ */ new Map(), closed = /* @__PURE__ */ new Set();
  const read = () => {
    try {
      return decodeDiscoveries(storage?.getItem(discoveryStorageKey) || null);
    } catch {
      persistent = false;
      return [];
    }
  };
  const write = (key2, value) => {
    try {
      if (!storage) throw new Error("Storage unavailable");
      if (value === void 0) storage.removeItem(key2);
      else if (storage.getItem(key2) !== value) storage.setItem(key2, value);
      persistent = true;
    } catch {
      persistent = false;
    }
  };
  const reconcile = (withdrawal = false) => {
    const previous = finds;
    settled = rarestDiscoveries(settled, read());
    const pending = [];
    try {
      if (storage) for (let i = 0; i < storage.length; i++) {
        const key2 = storage.key(i);
        if (key2?.startsWith(provisionalDiscoveryPrefix) && !closed.has(key2)) pending.push(decodeDiscoveries(storage.getItem(key2)));
      }
    } catch {
      persistent = false;
    }
    finds = rarestDiscoveries(settled, ...pending, ...[...active.values()].map((run) => run.finds));
    if (encodeDiscoveries(previous) !== encodeDiscoveries(finds) || publishedPersistent !== persistent) {
      publishedPersistent = persistent;
      const remaining = new Set(finds.map(discoveryIdentity)), departed = withdrawal ? previous.filter((d) => !remaining.has(discoveryIdentity(d))) : [];
      listeners.forEach((fn) => fn({ departed }));
    }
  };
  const remember = (incoming) => {
    settled = rarestDiscoveries(settled, incoming, read());
    const value = encodeDiscoveries(settled);
    try {
      if (storage?.getItem(discoveryStorageKey) !== value) write(discoveryStorageKey, value);
    } catch {
      persistent = false;
    }
    reconcile();
  };
  const store = { snapshot: () => finds, persistent: () => persistent, remember, reconcile, subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }, settleAll() {
    for (const run of [...active.values()]) run.complete();
  }, beginRun() {
    const key2 = provisionalDiscoveryPrefix + crypto.randomUUID();
    let state = "active";
    const retire = () => {
      closed.add(key2);
      active.delete(key2);
      write(key2);
    };
    const run = { finds: [], complete() {
      if (state !== "active") return;
      state = "complete";
      remember(run.finds);
      retire();
      reconcile();
    } };
    active.set(key2, run);
    return { remember(incoming) {
      if (state === "withdrawn") return;
      if (state === "complete") {
        remember(incoming);
        return;
      }
      run.finds = rarestDiscoveries(run.finds, incoming);
      write(key2, encodeDiscoveries(run.finds));
      reconcile();
    }, complete: () => run.complete(), withdraw() {
      if (state !== "active") return;
      state = "withdrawn";
      retire();
      reconcile(true);
    } };
  } };
  reconcile();
  return store;
}
function discoveryStore() {
  const host = window;
  if (host[storeSymbol]) return host[storeSymbol];
  let storage;
  try {
    storage = window.localStorage;
  } catch {
  }
  const store = createDiscoveryStore(storage);
  window.addEventListener("storage", (event) => {
    if (event.key === discoveryStorageKey) store.remember(decodeDiscoveries(event.newValue));
    else if (event.key?.startsWith(provisionalDiscoveryPrefix)) store.reconcile(event.newValue === null);
  });
  addEventListener("pagehide", () => store.settleAll());
  host[storeSymbol] = store;
  return store;
}

// web/companions.ts
var catalogPromise;
async function companionCatalog() {
  if (!catalogPromise) catalogPromise = (async () => {
    const r = await request("/companions/catalog");
    if (!r.ok) throw new Error("The bestiary returned " + r.status + ".");
    const data = await r.json();
    if (data.schema !== "slopbuzz-companions/v1" || data.tickets !== 1e9 || !Array.isArray(data.entries) || data.entries.length < 200) throw new Error("The bestiary supplied an unfamiliar charter.");
    return data;
  })().catch((error) => {
    catalogPromise = void 0;
    throw error;
  });
  return catalogPromise;
}
async function companionPolicies() {
  const r = await request("/companions/strategies");
  if (!r.ok) throw new Error("The strategy registry returned " + r.status + ".");
  const data = await r.json();
  if (!Array.isArray(data.strategies) || !data.strategies.length) throw new Error("No assignment strategy was supplied.");
  return data.strategies;
}
var CompanionDesk = class {
  constructor(office2) {
    this.office = office2;
    const attendance = () => {
      const transition = ++this.rollTransition;
      this.restoringRoll = true;
      if (!this.requireRoll.checked) {
        this.rollScroll = this.scroller.scrollTop;
        if (this.scroller.scrollHeight - this.scroller.clientHeight - this.rollScroll >= 24) this.following = false;
        this.roll.hidden = true;
      } else {
        const following = this.following, position = this.rollScroll;
        this.roll.hidden = false;
        requestAnimationFrame(() => {
          if (transition !== this.rollTransition || !this.requireRoll.checked) return;
          this.scroller.scrollTop = following ? this.scroller.scrollHeight : position;
          requestAnimationFrame(() => {
            if (transition === this.rollTransition) this.restoringRoll = false;
          });
        });
      }
    };
    this.requireRoll.addEventListener("change", attendance);
    attendance();
    this.enabled.addEventListener("change", () => {
      this.office?.clearCompanions();
      this.generation++;
      this.following = true;
      this.list.replaceChildren();
      this.lastSignature = "";
      this.latest.hidden = true;
      if (this.enabled.checked) {
        this.status.textContent = "Opening companion appointments for disclosed output\u2026";
        void this.refresh();
      } else this.status.textContent = "Companion allocation suspended. Official numerical output remains available.";
    });
    this.policy.addEventListener("change", () => {
      this.office?.clearCompanions();
      this.generation++;
      this.batches.clear();
      this.assigned.clear();
      this.list.replaceChildren();
      this.lastSignature = "";
      this.following = true;
      this.status.textContent = "Consulting the selected allocation authority\u2026";
      void this.refresh();
    });
    this.scroller.addEventListener("scroll", () => {
      if (this.roll.hidden || this.restoringRoll || !this.scroller.getClientRects().length) return;
      this.rollScroll = this.scroller.scrollTop;
      const atBottom = this.scroller.scrollHeight - this.scroller.clientHeight - this.scroller.scrollTop < 24;
      const resume = atBottom && !this.following;
      this.following = atBottom;
      if (resume) this.render();
    });
    document.addEventListener("demo-watch-layout", () => {
      const visible2 = this.scroller.getClientRects().length > 0;
      if (visible2 && !this.rollVisible) {
        this.restoringRoll = true;
        this.scroller.scrollTop = this.following ? this.scroller.scrollHeight : this.rollScroll;
        requestAnimationFrame(() => {
          this.restoringRoll = false;
        });
      }
      this.rollVisible = visible2;
    });
    this.latest.addEventListener("click", () => {
      this.following = true;
      this.render();
      this.scroller.scrollTop = this.scroller.scrollHeight;
    });
    void companionPolicies().then((policies) => {
      const selected = new URL(location.href).searchParams.get("authority") || this.policy.value;
      this.policy.replaceChildren(...policies.map((p) => {
        const option = node("option", p.name);
        option.value = p.id;
        return option;
      }));
      if (policies.some((p) => p.id === selected)) this.policy.value = selected;
      this.policy.disabled = false;
    }).catch((error) => {
      this.status.textContent = "Companion policy registry unavailable: " + error.message;
    });
  }
  office;
  enabled = document.querySelector("#emoji-companions");
  policy = document.querySelector("#companion-strategy");
  list = document.querySelector("#companion-list");
  scroller = document.querySelector("#companion-scroll");
  status = document.querySelector("#companion-status");
  dialog = document.querySelector("#companion-dialog");
  latest = document.querySelector("#companion-latest");
  roll = document.querySelector("#companion-roll");
  requireRoll = document.querySelector("#require-companion-roll-call");
  rollScroll = 0;
  restoringRoll = false;
  rollTransition = 0;
  rollVisible = false;
  visible = /* @__PURE__ */ new Map();
  batches = /* @__PURE__ */ new Map();
  assigned = /* @__PURE__ */ new Map();
  lastSignature = "";
  entries = /* @__PURE__ */ new Map();
  version = "";
  generation = 0;
  following = true;
  mandate = "15";
  discoveryRun;
  beginRun(mandate) {
    this.reset(mandate);
    this.discoveryRun = discoveryStore().beginRun();
  }
  completeRun() {
    this.discoveryRun?.complete();
  }
  withdrawRun() {
    this.generation++;
    this.discoveryRun?.withdraw();
    this.discoveryRun = void 0;
  }
  reset(mandate) {
    this.completeRun();
    this.discoveryRun = void 0;
    this.mandate = mandate;
    this.generation++;
    this.visible.clear();
    this.assigned.clear();
    this.batches.clear();
    this.list.replaceChildren();
    this.lastSignature = "";
    this.following = true;
    this.latest.hidden = true;
    this.status.textContent = this.enabled.checked ? "Awaiting the first disclosed Fizz, Buzz or FizzBuzz." : "Companions are disabled.";
  }
  disclose(start, lines2) {
    for (let i = 0; i < lines2.length; i++) {
      this.visible.set((BigInt(start) + BigInt(i)).toString(), lines2[i]);
    }
    while (this.visible.size > 1e3) this.visible.delete(this.visible.keys().next().value);
    if (this.enabled.checked) void this.refresh();
  }
  async refresh() {
    const generation = this.generation;
    if (!this.enabled.checked) return;
    const policy = this.policy.value || "factor-resonance-v1", mandate = this.mandate;
    try {
      const catalog = await companionCatalog();
      if (generation !== this.generation) return;
      if (!this.entries.size) {
        this.entries = new Map(catalog.entries.map((c) => [c.id, c]));
        this.version = catalog.version;
      }
      const starts = /* @__PURE__ */ new Set();
      for (const [ordinal, text2] of this.visible) if (/^(Fizz|Buzz|FizzBuzz)$/.test(text2)) starts.add(((BigInt(ordinal) - 1n) / 100n * 100n + 1n).toString());
      for (const start of starts) {
        const key2 = mandate + "|" + policy + "|" + start;
        let batch = this.batches.get(key2);
        if (!batch) {
          batch = (async () => {
            const reply = await request("/companions/window?start=" + start + "&count=100&strategy=" + policy + "&seed=" + mandate);
            if (!reply.ok) throw new Error("Assignment desk returned " + reply.status + ".");
            const data = await reply.json();
            if (data.schema !== "slopbuzz-companion-window/v2" || data.seedPolicy !== seedPolicy || data.mandateSeed !== mandate || data.catalogVersion !== this.version || data.strategy !== policy || data.start !== start || data.count !== 100 || !Array.isArray(data.assignments)) throw new Error("Assignment evidence belongs to a different charter.");
            return data.assignments;
          })();
          this.batches.set(key2, batch);
          batch.catch(() => {
            if (this.batches.get(key2) === batch) this.batches.delete(key2);
          });
        }
        const assignments = await batch;
        if (generation !== this.generation || !this.enabled.checked) return;
        const finds = [];
        for (const a of assignments) if (this.visible.get(a.ordinal) === a.flavor && this.entries.has(a.companionId)) {
          this.assigned.set(a.ordinal, a);
          finds.push(this.discovery(a, this.entries.get(a.companionId), mandate, policy));
        }
        if (finds.length) {
          if (this.discoveryRun) this.discoveryRun.remember(finds);
          else discoveryStore().remember(finds);
          for (const d of finds) this.office?.remember(d);
        }
      }
      for (const ordinal of this.assigned.keys()) if (!this.visible.has(ordinal)) this.assigned.delete(ordinal);
      while (this.batches.size > 12) this.batches.delete(this.batches.keys().next().value);
      if (generation === this.generation) this.render();
    } catch (error) {
      if (generation === this.generation) this.status.textContent = "Companion paperwork unavailable: " + error.message + " Numerical output is still valid. Toggle companions to retry.";
    }
  }
  render() {
    const rows = [...this.visible.keys()].map((key2) => this.assigned.get(key2)).filter((a) => !!a).slice(-100);
    const signature = rows.map((a) => a.ordinal + ":" + a.companionId).join("|");
    if (signature === this.lastSignature) return;
    if ((!this.following || this.list.contains(document.activeElement) || this.dialog.open) && this.list.childElementCount) {
      this.latest.hidden = false;
      return;
    }
    this.latest.hidden = true;
    const fragment = document.createDocumentFragment();
    for (const a of rows) {
      const c2 = this.entries.get(a.companionId);
      const li = node("li");
      const button = node("button");
      button.type = "button";
      button.setAttribute("aria-haspopup", "dialog");
      button.setAttribute("aria-controls", "companion-dialog");
      const glyph = node("span", c2.emoji);
      glyph.setAttribute("aria-hidden", "true");
      button.append(glyph, node("span", a.ordinal + " \xB7 " + a.flavor + " \xB7 " + c2.name + " \xB7 " + c2.rarity));
      button.addEventListener("click", () => this.inspect(a, c2, button));
      li.append(button);
      fragment.append(li);
    }
    this.list.replaceChildren(fragment);
    this.lastSignature = signature;
    this.scroller.scrollTop = this.scroller.scrollHeight;
    const last = rows.at(-1);
    const c = last ? this.entries.get(last.companionId) : void 0;
    this.status.textContent = c ? last.ordinal + " has welcomed " + c.name + ". " + c.rarity + " companion; latest " + rows.length + " encounters shown." : this.visible.size ? "No companion-bearing proclamation disclosed yet." : "Awaiting the first disclosed Fizz, Buzz or FizzBuzz.";
  }
  discovery(a, c, mandate = this.mandate, strategy = this.policy.value) {
    return { companion: c, assignment: a, mandate, strategy, catalogVersion: this.version, seedPolicy, discoveredAt: (/* @__PURE__ */ new Date()).toISOString() };
  }
  inspect(a, c, invoker) {
    this.following = false;
    companionDialog().open(this.discovery(a, c), invoker);
  }
};

// web/office-heist.ts
var officeHeist = new HeistCoordinator();
var scheduler = new PresentationScheduler(() => !document.hidden && document.body.dataset.sitePage === "demo");
function tick(now) {
  officeHeist.advance(now, !officeEstate.moving);
  if (officeHeist.active) scheduler.request(tick);
}
officeHeist.subscribe(() => {
  if (officeHeist.active) scheduler.request(tick);
  else scheduler.cancel();
});
for (const event of ["visibilitychange", "site-page-change", "demo-desk-change", "office-fullscreen-change"]) document.addEventListener(event, () => scheduler.refresh());
addEventListener("pagehide", () => {
  scheduler.cancel();
  officeHeist.finish("cancelled");
}, { once: true });
var StampHeistDesk = class {
  constructor(mayInterrupt, wake) {
    this.mayInterrupt = mayInterrupt;
    this.wake = wake;
    try {
      this.enabled = sessionStorage.getItem("slopbuzz:stamp-heists:v1") !== "off";
    } catch {
    }
    this.views = ["supervision", "office"].map((prefix) => new HeistPanel(prefix));
    for (const checkbox of document.querySelectorAll("[data-heist-enabled]")) {
      checkbox.checked = this.enabled;
      checkbox.addEventListener("change", () => {
        this.enabled = checkbox.checked;
        for (const other of document.querySelectorAll("[data-heist-enabled]")) other.checked = this.enabled;
        try {
          sessionStorage.setItem("slopbuzz:stamp-heists:v1", this.enabled ? "on" : "off");
        } catch {
        }
        if (!this.enabled) {
          ++this.rehearsalSerial;
          officeHeist.finish("disabled");
        }
      });
    }
    document.getElementById("heist-rehearse").addEventListener("click", () => void this.rehearse());
    document.getElementById("office-close").addEventListener("click", () => {
      ++this.rehearsalSerial;
    });
    officeHeist.subscribe(() => {
      if (this.held !== officeHeist.active) {
        this.held = officeHeist.active;
        this.wake();
      }
      this.records();
    });
  }
  mayInterrupt;
  wake;
  mandate = "";
  active = false;
  seen = /* @__PURE__ */ new Set();
  companions = /* @__PURE__ */ new Map();
  count = 0;
  last = "0";
  enabled = true;
  rehearsalSerial = 0;
  views;
  held = false;
  begin(mandate) {
    this.cancel();
    this.mandate = mandate;
    this.active = true;
    this.seen.clear();
    this.companions.clear();
    this.count = 0;
    this.last = "0";
  }
  complete() {
    this.active = false;
  }
  cancel() {
    this.active = false;
    ++this.rehearsalSerial;
    officeHeist.finish("cancelled");
  }
  clear() {
    this.companions.clear();
    officeHeist.finish("cancelled");
  }
  remember(discovery) {
    if (!this.active || discovery.mandate !== this.mandate) return;
    const ordinal = discovery.assignment.ordinal, key2 = discovery.strategy + "|" + ordinal;
    this.companions.set(ordinal, discovery);
    while (this.companions.size > 100) this.companions.delete(this.companions.keys().next().value);
    if (this.seen.has(key2)) return;
    this.seen.add(key2);
    while (this.seen.size > 1e3) this.seen.delete(this.seen.values().next().value);
    if (!this.enabled || !this.mayInterrupt() || officeHeist.active || officeEstate.moving || this.count >= 3 || !heistEligible(ordinal) || BigInt(ordinal) - BigInt(this.last) < 30n) return;
    const previous = [...this.companions.values()].filter((d) => d.strategy === discovery.strategy && BigInt(d.assignment.ordinal) < BigInt(ordinal)).sort((a, b) => BigInt(a.assignment.ordinal) > BigInt(b.assignment.ordinal) ? -1 : 1);
    const roster = [discovery, ...previous].filter((d, i, all) => all.findIndex((a) => a.companion.id === d.companion.id) === i).slice(0, 3).map((d) => d.companion);
    if (officeHeist.start(planHeist(this.mandate, ordinal, discovery.strategy, roster))) {
      this.count++;
      this.last = ordinal;
    }
  }
  async rehearse() {
    if (officeHeist.active) return;
    const serial = ++this.rehearsalSerial, button = document.getElementById("heist-rehearse"), status = document.getElementById("heist-rehearsal-status");
    button.disabled = true;
    status.textContent = "Security is recruiting three entirely fictional suspects\u2026";
    try {
      const catalog = await companionCatalog();
      if (serial !== this.rehearsalSerial) return;
      const choice = document.getElementById("heist-suspect").value;
      const glyphs = [choice, ...["\u{1F40C}", "\u{1F47B}", "\u{1F419}"].filter((g) => g !== choice)];
      const actors = glyphs.map((g) => g === "\u{1F47B}" ? { id: "security-ghost-v1", name: "Ghost of Pending Approval", emoji: g } : catalog.entries.find((c) => c.emoji === g)).filter((c) => !!c);
      if (actors.length !== 3) throw new Error("The complete rehearsal cast is unavailable.");
      const plan = planHeist("111", "33", "security-rehearsal-v1", actors, "rehearsal");
      if (officeHeist.start(plan)) {
        status.textContent = "Rehearsal in progress. These stand-ins earn no companion discoveries.";
        document.getElementById("office-stage").scrollIntoView({ block: "nearest", behavior: "instant" });
      }
    } catch (error) {
      if (serial === this.rehearsalSerial) status.textContent = "The rehearsal could not start: " + error.message;
    } finally {
      button.disabled = false;
    }
  }
  records() {
    const last = officeHeist.records.at(-1), target = document.getElementById("heist-records");
    const key2 = officeHeist.records.map((r) => r.id + ":" + r.resolution).join("|");
    if (target.dataset.records === key2) return;
    target.dataset.records = key2;
    target.replaceChildren(...officeHeist.records.slice().reverse().map((r) => node("li", `${r.plan.source === "rehearsal" ? "Security rehearsal" : "Ordinal " + r.plan.ordinal}: ${r.plan.actors[0].name}. ${r.finding}`)));
    if (last) document.getElementById("heist-rehearsal-status").textContent = last.finding + " Numerical output and companion appointments retain their existing records.";
  }
};
var HeistPanel = class {
  constructor(prefix) {
    this.prefix = prefix;
    this.root = node("section");
    this.root.className = "heist-panel";
    this.root.id = prefix + "-heist";
    this.root.hidden = true;
    this.root.setAttribute("aria-label", "The Great Rubber-Stamp Heist");
    this.label = node("strong");
    this.status = node("p");
    this.status.setAttribute("role", "status");
    this.status.setAttribute("aria-live", "polite");
    this.status.setAttribute("aria-atomic", "true");
    this.cast = node("div");
    this.cast.className = "heist-suspects";
    this.cast.setAttribute("role", "group");
    this.cast.setAttribute("aria-label", "Intercept a suspect");
    this.actions = node("div");
    this.actions.className = "heist-actions";
    for (const [text2, title2, action] of [["\u{1F463}", "Follow footprints", () => officeHeist.follow()], ["\u{1F36A}", "Offer an amnesty biscuit", () => officeHeist.recover("biscuit")], ["\u21AA", "Skip the chase", () => officeHeist.finish("skipped")]]) {
      const b = node("button", text2);
      b.type = "button";
      b.title = title2;
      b.setAttribute("aria-label", title2);
      b.addEventListener("click", () => {
        if (b.getAttribute("aria-disabled") !== "true") action();
      });
      this.actions.append(b);
    }
    this.root.append(this.label, this.status, this.cast, this.actions);
    document.getElementById(prefix === "office" ? "office-stage" : "supervision-stage").append(this.root);
    officeHeist.subscribe(() => this.render());
    officeEstate.subscribe((event) => {
      if (event.kind !== "progress") this.render();
    });
  }
  prefix;
  root;
  label;
  status;
  cast;
  actions;
  signature = "";
  lastStatus = "";
  record = 0;
  render() {
    const s = officeHeist.snapshot;
    if (!s) {
      const record = officeHeist.records.at(-1);
      if (record && record.id !== this.record) {
        this.record = record.id;
        this.status.textContent = record.finding;
      }
      if (this.root.contains(document.activeElement)) {
        const target = document.getElementById(document.getElementById("office-fullscreen").open ? "office-fullscreen-exit" : this.prefix === "office" ? "office-close" : "supervision-pause");
        target?.focus({ preventScroll: true });
      }
      this.root.hidden = true;
      this.root.removeAttribute("data-active");
      return;
    }
    this.root.hidden = false;
    this.root.dataset.active = "true";
    this.root.dataset.heistId = String(s.id);
    this.root.dataset.holder = String(s.holder);
    this.root.dataset.phase = s.returning ? "returning" : "chase";
    const title2 = s.plan.source === "rehearsal" ? "Security rehearsal \xB7 Stamp heist" : "Stamp heist \xB7 " + s.plan.ordinal;
    if (this.label.textContent !== title2) this.label.textContent = title2;
    const status = (officeEstate.moving ? "Pursuit held while Facilities moves the rooms. " : s.returning ? "" : heistAntic(s.plan.actors[s.holder]) + " ") + s.announcement;
    if (this.lastStatus !== status) {
      this.status.textContent = status;
      this.lastStatus = status;
    }
    if (this.signature !== s.id + "|" + s.plan.key) {
      this.signature = s.id + "|" + s.plan.key;
      this.cast.replaceChildren(...s.plan.actors.map((actor, index) => {
        const b = node("button", actor.emoji);
        b.type = "button";
        b.title = actor.name;
        b.setAttribute("aria-label", "Intercept " + actor.name);
        b.dataset.suspect = String(index);
        const id = s.id;
        b.addEventListener("click", () => {
          if (b.getAttribute("aria-disabled") !== "true") officeHeist.intercept(index, id);
        });
        return b;
      }));
    }
    for (const button of this.cast.querySelectorAll("button")) button.setAttribute("aria-disabled", String(s.returning || officeEstate.moving));
    for (const button of this.actions.querySelectorAll("button")) button.setAttribute("aria-disabled", String((s.returning || officeEstate.moving) && button.getAttribute("aria-label") !== "Skip the chase"));
  }
};

// web/office-model.ts
var roomForEvent = (e) => {
  const k = e.kind;
  if (k.startsWith("HR_")) return "personnel";
  if (k.startsWith("PREMISES_")) return "premises";
  if (["REQUISITION", "DELIVERY", "GLYPH_ACCEPTED", "GLYPH_ASSEMBLED"].includes(k)) return "procurement";
  if (k === "NOTARY" || k === "EXTENDED_NOTARY") return "notary";
  if (k.startsWith("CACHE_") || k.startsWith("PRECEDENT_")) return "memory";
  if (["PUBLICATION", "AUDIT_APPEND", "QUEUE_ENQUEUED", "TRANSACTION_COMMIT"].includes(k)) return "publication";
  if (["ASSEMBLY", "CLASSIFICATION", "EXTENDED_CLASSIFICATION", "TRANSACTION_BEGIN", "NUMERAL", "SUCCESSION", "EXTENDED_SUCCESSION"].includes(k)) return "reception";
  return void 0;
};
function routeFor(file) {
  if (!file) return [];
  if (file.cache === "HIT") return [{ room: "memory", label: "Institutional memory returned prior text", source: "receipt", finding: "The response reported a cache hit. Fresh recruitment, procurement and printing are not inferred." }, { room: "publication", label: "Retained result disclosed", source: "disclosed", finding: "The retained text " + file.text + " was disclosed in the demo." }];
  const route = [];
  for (const e of file.events) {
    const room = roomForEvent(e);
    if (room && route.at(-1)?.room !== room) route.push({ room, label: e.office, source: "recorded", finding: e.finding });
  }
  const capped = route.slice(0, 23);
  if (capped.at(-1)?.room !== "publication") capped.push({ room: "publication", label: "Observed output disclosed", source: "disclosed", finding: "The demo disclosed " + file.text + ". " + (file.recorded ? "The route summarizes the supplied records." : "No complete production dossier accompanied this result.") });
  return capped;
}
var OfficeArchive = class {
  mandate = "15";
  mode = "mandate";
  latest;
  files = /* @__PURE__ */ new Map();
  companions = /* @__PURE__ */ new Map();
  globals = [];
  selected = "latest";
  omitted = 0;
  disclosed = 0;
  begin(mandate, mode = "mandate") {
    this.mandate = mandate;
    this.mode = mode;
    this.latest = void 0;
    this.files.clear();
    this.companions.clear();
    this.globals = [];
    this.selected = "latest";
    this.omitted = 0;
    this.disclosed = 0;
  }
  receive(events, omitted) {
    this.globals = events.filter((e) => e.ordinal === null).slice(0, 300);
    this.omitted = omitted;
  }
  disclose(folios) {
    for (const f of folios) {
      if (!this.files.has(f.ordinal)) this.disclosed++;
      this.latest = f.ordinal;
      this.files.set(f.ordinal, { mandate: this.mandate, ordinal: f.ordinal, text: f.text, events: f.events.slice(0, 300), cache: f.cache, recorded: f.recorded, omitted: Math.max(0, f.events.length - 300), globals: this.globals, sourceOmitted: this.omitted });
    }
    this.trim();
  }
  trim() {
    while (this.files.size > 32) {
      const victim = [...this.files.keys()].find((k) => k !== "1" && k !== this.selected && k !== this.latest);
      if (!victim) break;
      this.files.delete(victim);
      this.companions.delete(victim);
    }
  }
  choose(ordinal, snapshot, companion) {
    if (ordinal === "latest") {
      this.selected = "latest";
      return;
    }
    if (!this.files.has(ordinal)) {
      if (!snapshot || snapshot.ordinal !== ordinal || snapshot.mandate !== this.mandate) return;
      this.files.set(ordinal, snapshot);
    }
    this.selected = ordinal;
    if (companion) this.remember(companion);
    this.trim();
  }
  inspect(f) {
    if (!this.files.has(f.ordinal)) this.files.set(f.ordinal, { mandate: this.mandate, ordinal: f.ordinal, text: f.text, events: f.events.slice(0, 300), cache: f.cache, recorded: f.recorded, omitted: Math.max(0, f.events.length - 300), globals: [], sourceOmitted: 0 });
    this.selected = f.ordinal;
    this.mode = "inspection";
    this.trim();
  }
  current() {
    return this.selected === "latest" ? this.files.get(this.latest || "") : this.files.get(this.selected);
  }
  remember(d) {
    if (d.mandate !== this.mandate || !this.files.has(d.assignment.ordinal)) return;
    this.companions.set(d.assignment.ordinal, d);
  }
  evidence(room) {
    const file = this.current();
    const actual = (file?.cache === "HIT" ? [] : file?.events || []).filter((e) => roomForEvent(e) === room);
    const global = (file?.globals || this.globals).filter((e) => roomForEvent(e) === room);
    return [...global, ...actual].slice(0, 60);
  }
};
function tourSeed(text2) {
  let h = 2166136261;
  for (let i = 0; i < text2.length; i++) h = Math.imul(h ^ text2.charCodeAt(i), 16777619);
  return h >>> 0;
}
function officeShare(scope2, mandate, room, prop2, authority = "factor-resonance-v1", action, estate2) {
  if (estate2) parseLayoutToken(estate2);
  const url = new URL("demo/", scope2);
  url.search = new URLSearchParams({ limit: mandate, authority, tour: officeVersion, room, ...prop2 ? { prop: prop2 } : {}, ...action === 0 || action === 1 ? { action: String(action) } : {} }).toString();
  if (estate2) url.searchParams.set("estate", estate2);
  url.hash = "office-tour";
  return url.href;
}
function parseTourLink(search) {
  const p = new URLSearchParams(search);
  if (p.get("tour") !== officeVersion) return;
  const room = roomById(p.get("room") || "reception");
  if (!room) return;
  const prop2 = room.props.find((x) => x.id === p.get("prop"));
  const action = p.get("action");
  return { room: room.id, prop: prop2?.id, action: prop2 && (action === "0" || action === "1") ? Number(action) : void 0 };
}

// web/mandate-input.ts
function parseMandate(raw) {
  const text2 = raw.trim();
  if (!/^[0-9]+$/.test(text2)) return null;
  const ordinary = Number(text2);
  return Number.isSafeInteger(ordinary) ? ordinary : BigInt(text2);
}
var autocorrectMandate = (raw) => raw.replace(/[^0-9]/g, "");
var addOrdinals = (value, count) => typeof value === "bigint" ? value + BigInt(count) : value + count;
function windowCount(next, limit) {
  if (typeof next === "bigint" && typeof limit === "bigint") return Number(limit - next + 1n < 100n ? limit - next + 1n : 100n);
  return Math.min(100, Number(limit) - Number(next) + 1);
}
var magnitudeWarnings = Object.freeze([
  "PROVISIONAL INCIDENT: Your integer may possibly have exceeded its delegated magnitude authority.",
  "POLICY REVIEW PENDING: This request might have crossed an undocumented numerical border.",
  "PRELIMINARY ESCALATION: An oversized ordinal may have entered circulation without executive indemnity.",
  "POSSIBLE CONTROL BREACH: The requested magnitude appears larger than the committee\u2019s confidence.",
  "UNCONFIRMED NUMERICAL EMERGENCY: Your upper limit may require a larger filing cabinet.",
  "POTENTIAL JURISDICTIONAL EVENT: This integer might be operating beyond the ordinary-number charter.",
  "TENTATIVE COMPLIANCE ALERT: A digit may have arrived without its magnitude escort.",
  "CONDITIONAL SEVERITY ONE: Your request could conceivably exceed our ceremonial insurance allowance.",
  "SUSPECTED ORDINAL EXCESS: Management cannot presently exclude the possibility of too much number.",
  "PROVISIONAL GOVERNANCE FAILURE: This value may have outgrown its approved organizational chart.",
  "MAGNITUDE EXCEPTION SUSPECTED: The decimal expansion might require a second board of directors.",
  "POSSIBLE POLICY DEVIATION: An unauthorized quantity of integer may be present in this request.",
  "PRECAUTIONARY EXECUTIVE NOTICE: Your number could be larger than the policy author anticipated.",
  "UNVERIFIED BOUNDARY INCIDENT: The requested ordinal may have escaped the standard arithmetic enclosure.",
  "CONTINGENT DISCIPLINARY REVIEW: Someone might possibly need to explain all these digits.",
  "PRELIMINARY RISK FINDING: This upper limit may have exceeded the building\u2019s authorized numerical load.",
  "POTENTIAL CHARTER OVERRUN: The committee has not ruled out a surplus of mathematical ambition.",
  "PROVISIONAL EXCESS-MAGNITUDE NOTICE: This request may require an unusually solemn signature.",
  "SUSPECTED SCALE VIOLATION: Your integer might be too substantial for the current stationery.",
  "POSSIBLE ENTERPRISE INCIDENT: This value may have activated a policy nobody has finished writing."
]);
function chooseMagnitudeWarning(previous = -1, random2 = Math.random) {
  const width2 = previous >= 0 ? magnitudeWarnings.length - 1 : magnitudeWarnings.length;
  let index = Math.min(width2 - 1, Math.floor(random2() * width2));
  if (previous >= 0 && index >= previous) index++;
  return { index, text: magnitudeWarnings[index] };
}

// web/dom.ts
var byId = (id) => {
  const node3 = document.getElementById(id);
  if (!node3) throw new Error(`Missing element ${id}`);
  return node3;
};
function setText(id, value) {
  byId(id).textContent = String(value);
}

// web/playback-controls.ts
var paths = {
  pause: "M9 5v14M15 5v14",
  play: "M8 5l11 7-11 7V5Z",
  stop: "M6 6h12v12H6Z",
  next: "M5 5l10 7-10 7V5ZM19 5v14",
  options: "M3 7h3m6 0h9M3 17h9m6 0h3M12 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM18 17a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  evidence: "M14 3H5v18h8M14 3l5 5h-5V3ZM8 8h3M8 12h3M8 16h3M20 17a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM20 20l2 2",
  waive: "M3 5l8 7-8 7V5ZM12 5l8 7-8 7V5ZM22 5v14",
  fullscreen: "M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5",
  restore: "M3 8h5V3m8 0v5h5M8 21v-5H3m18 0h-5v5"
};
function playbackIcon(button, icon, label) {
  button.setAttribute("aria-label", label);
  button.title = label;
  button.classList.add("playback-icon");
  if (button.dataset.icon === icon) return;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  const path = document.createElementNS(svg.namespaceURI, "path");
  path.setAttribute("d", paths[icon]);
  svg.append(path);
  button.dataset.icon = icon;
  button.replaceChildren(svg);
}

// web/office-fullscreen.ts
var OfficeFullscreen = class {
  dialog = byId("office-fullscreen");
  surface = byId("office-fullscreen-surface");
  panels = byId("office-fullscreen-panels");
  exit = byId("office-fullscreen-exit");
  restorations = [];
  invoker;
  native = false;
  serial = 0;
  position = { x: 0, y: 0 };
  mode;
  placeChronicle;
  constructor() {
    playbackIcon(byId("supervision-fullscreen"), "fullscreen", "Full-screen office observation");
    playbackIcon(byId("office-fullscreen-enter"), "fullscreen", "Full-screen office view");
    playbackIcon(this.exit, "restore", "Exit full-screen and return to website");
    this.exit.addEventListener("click", () => this.close());
    this.dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      this.close();
    });
    this.dialog.addEventListener("close", () => {
      if (!this.dialog.open) this.close();
    });
    this.panels.addEventListener("change", () => this.layout());
    addEventListener("resize", () => {
      if (this.mode) this.adapt();
    });
    document.addEventListener("demo-watch-layout", () => {
      if (this.mode === "observe") this.layout();
    });
    byId("office-fullscreen-inspect").addEventListener("click", () => this.inspection(byId("office-fullscreen-drawer").hidden === true));
    byId("office-fullscreen-drawer-close").addEventListener("click", () => this.inspection(false, true));
    byId("office-fullscreen-drawer").addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        this.inspection(false, true);
      }
    });
    document.addEventListener("fullscreenchange", () => {
      if (!this.mode) return;
      if (document.fullscreenElement === this.surface) this.native = true;
      else if (this.native) this.close();
    });
    document.addEventListener("demo-presentation-change", () => {
      if (this.mode !== "observe") return;
      if (!byId("executive-hovering").checked) this.close();
      else this.layout();
    });
    const resize = new ResizeObserver(() => {
      this.surface.style.setProperty("--immersive-controls-height", Math.ceil(byId("office-fullscreen-controls").getBoundingClientRect().height) + "px");
      this.surface.style.setProperty("--immersive-header-height", Math.ceil(byId("office-fullscreen-header").getBoundingClientRect().height) + "px");
      this.surface.style.setProperty("--immersive-banner-height", Math.ceil(byId("active-run-banner").getBoundingClientRect().height) + "px");
    });
    resize.observe(byId("office-fullscreen-controls"));
    resize.observe(byId("office-fullscreen-header"));
    resize.observe(byId("active-run-banner"));
    addEventListener("pagehide", () => this.close(false), { once: true });
  }
  open(mode, invoker) {
    if (this.mode) return;
    if (mode === "observe" && !byId("executive-hovering").checked) return;
    byId("office-modal").close();
    this.mode = mode;
    const serial = ++this.serial;
    this.invoker = invoker;
    this.position = { x: scrollX, y: scrollY };
    this.surface.dataset.view = mode;
    document.documentElement.classList.add("office-is-fullscreen");
    byId("office-fullscreen-title").textContent = mode === "observe" ? "Executive Occupation of the Entire Screen" : "The Serious Business Office \xB7 Full estate access";
    byId("office-fullscreen-panel-control").hidden = mode !== "observe";
    byId("office-fullscreen-inspect").hidden = mode !== "facilities";
    this.adapt();
    this.panels.value = this.surface.dataset.largeText === "true" ? "none" : innerWidth < 360 || innerHeight < 450 ? "log" : "both";
    if (mode === "observe") {
      this.move(byId("supervision-pane"), "office-fullscreen-stage");
      this.move(byId("watch-output"), "office-fullscreen-output-slot");
      this.move(byId("supervision-caption"), "office-fullscreen-current-slot");
      this.move(byId("chronicle-scroll").closest(".chronicle"), "office-fullscreen-log-slot", true);
      this.move(document.querySelector(".watch-transport"), "office-fullscreen-controls");
      this.move(byId("watch-settings"), "office-fullscreen-settings");
      this.move(byId("companion-spotlight"), "office-fullscreen-companion");
    } else {
      this.move(byId("active-run-banner"), this.surface);
      this.move(byId("office-stage"), "office-fullscreen-stage");
      this.move(document.querySelector(".office-toolbar"), "office-fullscreen-controls");
      this.move(byId("office-walking-controls"), "office-fullscreen-controls");
      const playback = document.createElement("div");
      playback.className = "immersive-route-controls";
      byId("office-fullscreen-controls").append(playback);
      this.restorations.push(() => playback.remove());
      this.move(byId("office-pause"), playback);
      this.move(byId("office-next"), playback);
      for (const element4 of [byId("office-camera-help"), document.querySelector(".office-inspection"), document.querySelector(".office-playback"), byId("office-route-status"), byId("office-route"), byId("office-reorganization"), document.querySelector(".office-options")]) this.move(element4, "office-fullscreen-inspection-slot");
    }
    const notice = byId(mode === "observe" ? "run-status" : "office-status");
    const previousTabIndex = notice.getAttribute("tabindex");
    notice.tabIndex = 0;
    this.restorations.push(() => {
      if (previousTabIndex === null) notice.removeAttribute("tabindex");
      else notice.setAttribute("tabindex", previousTabIndex);
    });
    this.move(notice, "office-fullscreen-notice");
    for (const id of ["companion-dialog", "personnel-dialog"]) this.move(byId(id), this.surface);
    this.inspection(false);
    this.layout();
    this.dialog.showModal();
    this.exit.focus({ preventScroll: true });
    this.changed();
    byId("office-fullscreen-status").textContent = "The office fills this tab. Return to website restores your previous view.";
    if (document.fullscreenEnabled && this.surface.requestFullscreen) {
      try {
        void this.surface.requestFullscreen({ navigationUI: "hide" }).then(() => {
          if (serial !== this.serial || !this.mode) {
            if (document.fullscreenElement === this.surface) void document.exitFullscreen().catch(() => {
            });
          } else {
            this.native = true;
            byId("office-fullscreen-status").textContent = "Browser full-screen is active. Escape or Return to website leaves the office view.";
          }
        }).catch(() => {
          if (serial === this.serial && this.mode) byId("office-fullscreen-status").textContent = "Browser full-screen is unavailable. The office still fills this tab; all controls remain available.";
        });
      } catch {
      }
    }
  }
  close(restoreFocus = true) {
    if (!this.mode) return;
    const observed = this.mode === "observe";
    this.mode = void 0;
    this.serial++;
    this.native = false;
    for (const child of this.surface.querySelectorAll("dialog[open]")) child.close();
    this.dialog.close();
    for (const restore of this.restorations.reverse()) restore();
    this.restorations = [];
    document.documentElement.classList.remove("office-is-fullscreen");
    const nativeExit = document.fullscreenElement === this.surface ? document.exitFullscreen().catch(() => {
    }) : Promise.resolve();
    this.changed();
    if (restoreFocus) {
      const invoker = this.invoker, position = this.position, serial = this.serial;
      void nativeExit.then(() => requestAnimationFrame(() => {
        if (serial !== this.serial || this.mode) return;
        const target = invoker?.getClientRects().length ? invoker : observed && byId("executive-hovering").getClientRects().length ? byId("executive-hovering") : observed ? byId("watch-settings-toggle") : byId("office-enter");
        target.focus({ preventScroll: true });
        window.scrollTo({ left: position.x, top: position.y, behavior: "instant" });
      }));
    }
  }
  inspection(open, focus = false) {
    byId("office-fullscreen-drawer").hidden = !open;
    byId("office-fullscreen-inspect").setAttribute("aria-expanded", String(open));
    if (focus) byId("office-fullscreen-inspect").focus({ preventScroll: true });
  }
  move(element4, destination, chronicle2 = false) {
    const target = typeof destination === "string" ? byId(destination) : destination;
    const marker = document.createComment("Retained office presentation slot");
    element4.before(marker);
    if (chronicle2 && this.placeChronicle) this.placeChronicle(target);
    else target.append(element4);
    this.restorations.push(() => {
      if (chronicle2 && this.placeChronicle) {
        this.placeChronicle(marker.parentElement);
        marker.remove();
      } else marker.replaceWith(element4);
    });
  }
  layout() {
    const panels = this.panels.value;
    byId("office-fullscreen-output").hidden = this.mode !== "observe" || !["both", "output"].includes(panels);
    byId("office-fullscreen-log").hidden = this.mode !== "observe" || !["both", "log"].includes(panels);
    byId("office-fullscreen-companion").hidden = this.mode !== "observe" || panels === "none" || !byId("emoji-companions").checked || !byId("require-companion-roll-call").checked;
    this.surface.dataset.panels = panels;
  }
  adapt() {
    const large = parseFloat(getComputedStyle(document.documentElement).fontSize) > 20;
    this.surface.dataset.largeText = String(large);
    const names = large ? ["Both", "Output", "Log", "Hide"] : ["Output + log", "Output", "Running log", "Hide panels"];
    [...this.panels.options].forEach((option, index) => {
      if (option.textContent !== names[index]) option.textContent = names[index];
    });
  }
  changed() {
    document.dispatchEvent(new Event("office-fullscreen-change"));
  }
};
var presentation;
function officeFullscreen() {
  return presentation ||= new OfficeFullscreen();
}

// web/office-pack-contract.ts
function parseOfficeManifest(x) {
  const m = x;
  if (!m || m.schema !== "slopbuzz-office-pack/v1" || m.file !== "office-world.js" || !Number.isSafeInteger(m.bytes) || m.bytes < 1 || typeof m.sha256 !== "string" || !/^[a-f0-9]{64}$/.test(m.sha256)) throw new Error("The building manifest is unfamiliar.");
  return m;
}
async function verifyOfficePackage(manifest, bytes) {
  const hash2 = [...new Uint8Array(await crypto.subtle.digest("SHA-256", bytes))].map((x) => x.toString(16).padStart(2, "0")).join("");
  if (bytes.byteLength !== manifest.bytes || hash2 !== manifest.sha256) throw new Error("The delivered building does not match its manifest.");
}

// web/office-pack-key.ts
var officePackPrefix = (base) => `slopbuzz-office-${encodeURIComponent(base)}-`;
function officeCacheKey(base, url) {
  const id = url.pathname.match(/\/assets\/([a-f0-9]{16})\/office-world\.js$/)?.[1];
  return id ? officePackPrefix(base) + id : void 0;
}

// web/office-pack.ts
var officePackKey = (base = scope, url = releaseAsset("office-world.js")) => officeCacheKey(base, url);
async function saveOfficePack() {
  const url = releaseAsset("office-world.js"), key2 = officePackKey();
  if (!key2) throw new Error("This deployment does not publish a versioned offline building.");
  const manifestReply = await fetch(releaseAsset("office-pack.json"));
  if (!manifestReply.ok) throw new Error("The building manifest could not be obtained.");
  const manifest = parseOfficeManifest(await manifestReply.json());
  const reply = await fetch(url);
  if (!reply.ok) throw new Error("The building could not be downloaded.");
  const bytes = await reply.arrayBuffer();
  await verifyOfficePackage(manifest, bytes);
  const cache = await caches.open(key2);
  await cache.put(url, new Response(bytes, { headers: { "Content-Type": "text/javascript; charset=UTF-8", "Cache-Control": "public, max-age=31536000, immutable" } }));
  return bytes.byteLength;
}

// web/office-tour.ts
var byId2 = (id) => document.getElementById(id);
var curiosityKey = "slopbuzz:office-curiosities:v1";
var OfficeTourDesk = class {
  archive = new OfficeArchive();
  offeredFiles = /* @__PURE__ */ new Map();
  offeredCompanions = /* @__PURE__ */ new Map();
  room = "reception";
  selectedProp;
  selectedAction;
  renderer;
  module;
  completedZero = false;
  exitFocus;
  opened = false;
  enlarged = false;
  opening = 0;
  paused = false;
  routeIndex = -1;
  routeKey = "";
  lastEvidence;
  visited = /* @__PURE__ */ new Set();
  persistence = true;
  audio;
  walking = false;
  root = byId2("office-experience");
  canvas = byId2("office-canvas");
  dialog = byId2("office-modal");
  enter = byId2("office-enter");
  fileSelect = byId2("office-file");
  motion = byId2("office-motion");
  follow = byId2("office-follow");
  media = matchMedia("(prefers-reduced-motion: reduce)");
  directory = /* @__PURE__ */ new Map();
  constructor() {
    officeHeist.subscribe(() => this.syncRenderer());
    officeEstate.subscribe((event) => {
      this.syncRenderer();
      if (event.kind === "committed") {
        this.renderAddress();
        this.shareLink();
      }
    });
    try {
      const limit = new URL(location.href).searchParams.get("limit");
      if (limit !== null) this.archive.mandate = String(parseMandate(limit));
    } catch {
    }
    this.motion.checked = !this.media.matches;
    this.follow.checked = true;
    try {
      const saved = JSON.parse(localStorage.getItem(curiosityKey) || "[]");
      if (Array.isArray(saved)) {
        for (const id of saved) if (typeof id === "string" && rooms.some((r) => r.props.some((p) => p.id === id))) this.visited.add(id);
      }
    } catch {
      this.persistence = false;
    }
    rooms.forEach((room, index) => {
      const b = node("button", String(index + 1).padStart(2, "0") + " \xB7 " + room.short);
      b.type = "button";
      b.title = room.name;
      b.setAttribute("aria-pressed", String(room.id === this.room));
      b.addEventListener("click", () => this.select(room.id));
      this.directory.set(room.id, b);
      byId2("office-directory").append(b);
    });
    this.enter.addEventListener("click", () => void this.open());
    byId2("office-close").addEventListener("click", () => this.close());
    byId2("office-choose-mandate").addEventListener("click", () => {
      const input = byId2("limit");
      this.close(input);
      input.scrollIntoView({ block: "center", behavior: this.media.matches ? "instant" : "smooth" });
    });
    byId2("office-enlarge").addEventListener("click", () => this.enlarged ? this.dialog.close() : this.enlarge());
    byId2("office-modal-close").addEventListener("click", () => this.dialog.close());
    byId2("office-fullscreen-enter").addEventListener("click", () => officeFullscreen().open("facilities", byId2("office-fullscreen-enter")));
    document.addEventListener("office-fullscreen-change", () => {
      this.activity();
      requestAnimationFrame(() => this.renderer?.resize());
    });
    document.addEventListener("site-page-change", () => {
      this.activity();
      this.renderer?.resize();
      if (document.body.dataset.sitePage !== "demo") void this.audio?.suspend();
      else if (byId2("office-sound").checked) void this.audio?.resume();
    });
    document.addEventListener("office-amenity", (event) => {
      if (event.detail === "office" && officeFullscreen().mode === "facilities") officeFullscreen().inspection(true);
    });
    let backdrop = false;
    const outside = (e) => {
      const b = this.dialog.getBoundingClientRect();
      return e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom;
    };
    this.dialog.addEventListener("pointerdown", (e) => {
      backdrop = e.target === this.dialog && outside(e);
    });
    this.dialog.addEventListener("pointercancel", () => {
      backdrop = false;
    });
    this.dialog.addEventListener("click", (e) => {
      const dismiss = backdrop && e.target === this.dialog && outside(e);
      backdrop = false;
      if (dismiss) this.dialog.close();
    });
    this.dialog.addEventListener("close", () => {
      backdrop = false;
      this.enlarged = false;
      byId2("office-home-slot").append(this.root);
      byId2("office-enlarge").textContent = "Enlarge office";
      this.renderer?.resize();
      if (this.opened) byId2("office-enlarge").focus();
      else (this.exitFocus || this.enter).focus();
    });
    byId2("office-overview").addEventListener("click", () => {
      this.renderer?.overview();
      this.routeCamera(false);
    });
    byId2("office-walk").addEventListener("click", () => {
      if (!this.renderer) return;
      if (this.walking) {
        this.renderer.overview();
        return;
      }
      this.retainFile();
      this.renderer.walk(this.room);
      byId2("office-stage").scrollIntoView({ block: "nearest", behavior: "instant" });
      this.activity();
      this.canvas.focus({ preventScroll: true });
    });
    byId2("office-zoom-in").addEventListener("click", () => this.renderer?.zoom(-1));
    byId2("office-zoom-out").addEventListener("click", () => this.renderer?.zoom(1));
    document.querySelectorAll("[data-office-move]").forEach((b) => b.addEventListener("click", () => {
      byId2("office-stage").scrollIntoView({ block: "nearest", behavior: "instant" });
      this.activity();
      this.renderer?.move(b.dataset.officeMove);
    }));
    this.canvas.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.dialog.open) {
        this.renderer?.overview();
        byId2("office-walk").focus();
      }
    });
    byId2("office-pause").addEventListener("click", () => {
      if (!this.motion.checked || !this.renderer) return;
      this.paused = !this.paused;
      this.syncRenderer();
      this.playbackLabels();
    });
    byId2("office-replay").addEventListener("click", () => {
      if (!routeFor(this.archive.current()).length) return;
      this.seekRoute(0);
      this.paused = !this.renderer || !this.motion.checked;
      this.syncRenderer();
      this.playbackLabels();
    });
    byId2("office-next").addEventListener("click", () => {
      const route = routeFor(this.archive.current());
      if (!route.length) {
        this.status("A mandate must disclose a file before its recorded route can be stepped through.");
        return;
      }
      this.paused = true;
      this.seekRoute((this.routeIndex + 1) % route.length);
      this.playbackLabels();
    });
    this.fileSelect.addEventListener("focus", () => {
      this.offeredFiles = new Map(this.archive.files);
      this.offeredCompanions = new Map(this.archive.companions);
      this.retainFile();
    });
    this.fileSelect.addEventListener("blur", () => {
      this.offeredFiles.clear();
      this.offeredCompanions.clear();
      this.updateFiles();
    });
    byId2("office-evidence").addEventListener("focusin", () => this.retainFile());
    byId2("office-evidence").addEventListener("wheel", () => this.retainFile(), { passive: true });
    this.fileSelect.addEventListener("change", () => {
      const value = this.fileSelect.value;
      this.archive.choose(value, this.offeredFiles.get(value), this.offeredCompanions.get(value));
      this.follow.checked = value === "latest";
      this.renderEvidence();
      this.updateRoute();
      this.syncRenderer();
    });
    this.follow.addEventListener("change", () => {
      if (this.follow.checked) {
        this.archive.selected = "latest";
        this.fileSelect.value = "latest";
        this.renderEvidence();
        this.updateRoute();
        this.syncRenderer();
      } else this.retainFile();
    });
    byId2("office-follow-route").addEventListener("change", () => {
      if (byId2("office-follow-route").checked && this.routeIndex >= 0) {
        const route = routeFor(this.archive.current());
        if (route[this.routeIndex]) this.select(route[this.routeIndex].room, false);
      }
      this.syncRenderer();
    });
    this.motion.addEventListener("change", () => {
      if (!this.motion.checked) officeEstate.finish();
      this.syncRenderer();
      this.playbackLabels();
    });
    this.media.addEventListener("change", () => {
      this.motion.checked = !this.media.matches;
      this.syncRenderer();
      this.playbackLabels();
    });
    byId2("office-quality").addEventListener("change", () => this.syncRenderer());
    byId2("office-sound").addEventListener("change", () => void this.soundPreference());
    byId2("office-offline").addEventListener("click", () => void this.saveOffline());
    if (!officePackKey()) {
      byId2("office-offline").hidden = true;
      byId2("office-offline-status").textContent = "The building and its documents are served by this site.";
    }
    byId2("office-share-copy").addEventListener("click", async () => {
      const input = byId2("office-share-link");
      try {
        await navigator.clipboard.writeText(input.value);
        byId2("office-share-status").textContent = "Visit link copied. It opens this room and prefills the mandate; counting starts when the recipient asks.";
      } catch {
        input.focus();
        input.select();
        byId2("office-share-status").textContent = "Copy the selected visit link with your browser\u2019s copy command.";
      }
    });
    byId2("office-companion-story").addEventListener("click", () => {
      const d = this.archive.companions.get(this.archive.current()?.ordinal || "");
      if (d) companionDialog().open(d, byId2("office-companion-story"));
    });
    const observer = new IntersectionObserver(() => this.activity(), { rootMargin: "100px" });
    observer.observe(byId2("office-stage"));
    new ResizeObserver(() => this.renderer?.resize()).observe(byId2("office-stage"));
    document.addEventListener("visibilitychange", () => {
      this.activity();
      if (document.hidden) void this.audio?.suspend();
      else if (byId2("office-sound").checked) void this.audio?.resume();
    });
    addEventListener("pagehide", () => {
      this.renderer?.dispose();
      void this.audio?.close();
    }, { once: true });
    this.renderRoom();
    this.updateFiles();
    this.updateRoute();
    const shared = parseTourLink(location.search);
    if (shared) {
      this.room = shared.room;
      this.selectedProp = roomById(shared.room)?.props.find((p) => p.id === shared.prop);
      this.renderRoom();
      if (shared.action !== void 0) this.respond(shared.action);
      void this.open(false);
    } else if (location.hash === "#office-tour") this.status("Welcome. Enter the office to open its 3D building and complete room directory.");
  }
  begin(mandate, mode = "mandate") {
    this.completedZero = false;
    this.archive.begin(mandate, mode);
    this.offeredFiles.clear();
    this.offeredCompanions.clear();
    this.follow.checked = true;
    this.routeKey = "";
    this.updateFiles();
    this.renderEvidence();
    this.updateRoute();
    this.syncRenderer();
    this.shareLink();
  }
  complete(zero = false) {
    if (zero && !this.archive.current()) {
      this.completedZero = true;
      this.updateRoute();
    }
  }
  receive(packet) {
    this.archive.receive(packet.events, packet.omitted);
    if (this.opened) this.renderEvidence();
  }
  disclose(mandate, folios) {
    if (mandate !== this.archive.mandate) return;
    this.archive.disclose(folios);
    if (this.follow.checked) this.archive.selected = "latest";
    if (this.opened) {
      this.updateFiles();
      this.renderEvidence();
      this.updateRoute();
      this.syncRenderer();
    }
  }
  inspect(f) {
    this.follow.checked = false;
    this.archive.inspect(f);
    this.updateFiles();
    this.renderEvidence();
    this.updateRoute();
    this.syncRenderer();
  }
  remember(d) {
    this.archive.remember(d);
    if (this.opened) {
      this.renderCompanion();
      this.syncRenderer();
    }
  }
  clearCompanions() {
    this.archive.companions.clear();
    this.offeredCompanions.clear();
    if (this.opened) {
      this.renderCompanion();
      this.syncRenderer();
    }
  }
  status(text2) {
    byId2("office-status").textContent = text2;
  }
  async open(scroll = true, focus = scroll) {
    this.opened = true;
    this.root.hidden = false;
    this.enter.hidden = true;
    const opening = ++this.opening;
    this.renderEvidence();
    this.updateRoute();
    this.updateFiles();
    if (focus) byId2(officeFullscreen().mode === "facilities" ? "office-fullscreen-exit" : "office-close").focus({ preventScroll: true });
    if (scroll) this.root.scrollIntoView({ behavior: this.media.matches ? "instant" : "smooth", block: "start" });
    if (this.renderer) {
      this.activity();
      this.renderer.resize();
      return;
    }
    const loading = byId2("office-loading");
    this.graphicsAvailable(false);
    loading.hidden = false;
    loading.replaceChildren(node("p", "Facilities is locating the building. The room directory and all inspections are already open."));
    try {
      this.module ||= import(releaseAsset("office-world.js").href);
      const module = await this.module;
      if (!this.opened || opening !== this.opening) return;
      let readiness;
      this.canvas.removeAttribute("data-rendered");
      this.canvas.dataset.module = releaseAsset("office-world.js").href;
      this.renderer = module.createOffice({ canvas: this.canvas, state: this.sceneState(), onHeistSuspect: (index, id) => officeHeist.intercept(index, id), onHeistFootprint: () => officeHeist.follow(), onRoom: (id) => this.select(id), onAmenity: () => document.dispatchEvent(new CustomEvent("office-amenity", { detail: "office" })), onProp: (room, prop2) => {
        this.select(room);
        const p = roomById(room)?.props.find((x) => x.id === prop2);
        if (p) this.inspectProp(p);
      }, onStep: (index) => {
        this.routeIndex = index;
        this.highlightRoute();
        if (byId2("office-follow-route").checked && index >= 0) {
          const r = routeFor(this.archive.current())[index];
          if (r) this.select(r.room, false);
        }
        this.tone();
      }, onView: (view) => {
        this.walking = view === "walk";
        byId2("office-walk").setAttribute("aria-pressed", String(this.walking));
        byId2("office-walk").textContent = this.walking ? "Return to cutaway" : "Walk in this room";
        byId2("office-walking-controls").hidden = !this.walking;
      }, onReady: () => {
        clearTimeout(readiness);
        loading.hidden = true;
        this.graphicsAvailable(true);
        this.playbackLabels();
        this.status("The estate is open. Select any room or object; its actual evidence and fictional arrangements are labeled separately.");
      }, onProblem: () => this.fallback() });
      this.canvas.dataset.renderer = "babylon";
      if (this.room !== "reception" || this.selectedProp) this.renderer.selectRoom(this.room);
      this.activity();
      readiness = setTimeout(() => {
        if (this.opened && opening === this.opening && this.canvas.dataset.rendered !== "true") this.fallback();
      }, 2e4);
    } catch {
      this.module = void 0;
      if (this.opened && opening === this.opening) this.fallback();
    }
  }
  fallback() {
    this.renderer?.dispose();
    this.renderer = void 0;
    this.canvas.dataset.renderer = "directory";
    this.graphicsAvailable(false);
    this.playbackLabels();
    const loading = byId2("office-loading");
    loading.hidden = false;
    const retry = node("button", "Try the 3D display again");
    retry.type = "button";
    retry.addEventListener("click", () => void this.open(false, true));
    loading.replaceChildren(node("p", "The 3D display could not open. All eight rooms, thirty-two stories and recorded papers remain available through the directory."), retry);
    this.status("The office directory is open. The graphics display is unavailable on this visit.");
  }
  graphicsAvailable(value) {
    for (const id of ["office-overview", "office-walk", "office-zoom-in", "office-zoom-out"]) byId2(id).disabled = !value;
    this.canvas.tabIndex = value ? 0 : -1;
    if (value) this.canvas.removeAttribute("aria-hidden");
    else this.canvas.setAttribute("aria-hidden", "true");
  }
  close(target = this.enter) {
    officeHeist.finish("skipped");
    if (officeFullscreen().mode === "facilities") officeFullscreen().close(false);
    officeEstate.finish();
    this.exitFocus = target;
    this.opened = false;
    ++this.opening;
    this.renderer?.active(false);
    this.root.hidden = true;
    this.enter.hidden = false;
    if (this.dialog.open) this.dialog.close();
    target.focus();
    this.status("Your departure has been approved without an additional form. Reception is reviewing this precedent.");
  }
  enlarge() {
    this.enlarged = true;
    byId2("office-modal-slot").append(this.root);
    this.dialog.showModal();
    byId2("office-enlarge").textContent = "Return to page";
    this.renderer?.resize();
    byId2("office-modal-close").focus();
  }
  select(id, user = true) {
    if (user) {
      this.retainFile();
      if (officeFullscreen().mode === "facilities") officeFullscreen().inspection(true);
    }
    this.room = id;
    this.selectedProp = void 0;
    this.selectedAction = void 0;
    this.renderRoom();
    this.syncRenderer();
    this.renderer?.selectRoom(id);
  }
  retainFile() {
    const file = this.archive.current();
    if (file) this.archive.selected = file.ordinal;
    this.follow.checked = false;
    this.fileSelect.value = this.archive.selected;
    this.routeCamera(false);
  }
  routeCamera(value) {
    byId2("office-follow-route").checked = value;
  }
  renderAddress() {
    this.root.dataset.room = this.room;
    document.dispatchEvent(new CustomEvent("office-location", { detail: { view: "office" } }));
    byId2("office-room-label").textContent = "Department " + String(rooms.findIndex((r) => r.id === this.room) + 1).padStart(2, "0") + " \xB7 Address " + officeEstate.current.placements.find((p) => p.room === this.room).address;
  }
  renderRoom() {
    const room = roomById(this.room);
    for (const [id, b] of this.directory) b.setAttribute("aria-pressed", String(id === this.room));
    this.renderAddress();
    byId2("office-room-title").textContent = room.name;
    byId2("office-room-subtitle").textContent = room.subtitle;
    const selected = this.selectedProp;
    byId2("office-props").replaceChildren(...room.props.map((p) => {
      const b = node("button", p.name);
      b.type = "button";
      b.setAttribute("aria-pressed", String(p.id === selected?.id));
      b.addEventListener("click", () => this.inspectProp(p));
      return b;
    }));
    if (selected) this.inspectProp(selected);
    else {
      byId2("office-story-title").textContent = "Welcome to " + room.short;
      byId2("office-story-text").textContent = "Select a named curiosity or click its object in the building. Facilities encourages looking closely while accepting no responsibility for what you notice.";
      byId2("office-story-answer").textContent = "";
      byId2("office-story-actions").replaceChildren();
    }
    this.curiosityLabel();
    this.renderEvidence();
    this.shareLink();
    this.playbackLabels();
  }
  inspectProp(p) {
    this.selectedProp = p;
    this.selectedAction = void 0;
    this.retainFile();
    this.visited.add(p.id);
    try {
      localStorage.setItem(curiosityKey, JSON.stringify([...this.visited]));
      this.persistence = true;
    } catch {
      this.persistence = false;
    }
    if (officeFullscreen().mode === "facilities") officeFullscreen().inspection(true);
    byId2("office-story-title").textContent = p.name;
    byId2("office-story-text").textContent = p.story;
    byId2("office-story-answer").textContent = "";
    byId2("office-story-actions").replaceChildren(...p.actions.map((a, index) => {
      const b = node("button", a.label);
      b.type = "button";
      b.addEventListener("click", () => this.respond(index));
      return b;
    }));
    for (const b of byId2("office-props").querySelectorAll("button")) b.setAttribute("aria-pressed", String(b.textContent === p.name));
    this.curiosityLabel();
    this.shareLink();
  }
  respond(index) {
    const action = this.selectedProp?.actions[index];
    if (!action) return;
    this.selectedAction = index;
    byId2("office-story-answer").textContent = action.answer;
    this.renderer?.react(this.selectedProp.id, index);
    this.tone();
    this.shareLink();
  }
  curiosityLabel() {
    byId2("office-curiosities").textContent = this.visited.size + " of 32 curiosities discovered." + (this.visited.size === 32 ? " Facilities appoints you Senior Visitor (Acting)." : "") + (this.persistence ? " Remembered in this browser." : " Storage is unavailable; this visit remembers them temporarily.");
  }
  updateFiles() {
    if (document.activeElement === this.fileSelect) return;
    const known = new Set(this.archive.files.keys());
    for (const option of [...this.fileSelect.options]) if (option.value !== "latest" && !known.has(option.value)) option.remove();
    for (const f of this.archive.files.values()) if (![...this.fileSelect.options].some((o) => o.value === f.ordinal)) {
      const o = node("option", "Ordinal " + f.ordinal + " \xB7 " + f.text);
      o.value = f.ordinal;
      this.fileSelect.append(o);
    }
    this.fileSelect.value = this.archive.selected;
  }
  renderEvidence() {
    const file = this.archive.current(), globals = file?.globals || this.archive.globals;
    const previous = this.lastEvidence;
    if (previous && previous.file === file && previous.room === this.room && previous.globals === globals) {
      this.renderCompanion();
      return;
    }
    this.lastEvidence = { file, room: this.room, globals };
    const events = this.archive.evidence(this.room);
    let source = file ? "File " + file.ordinal + " \xB7 disclosed text \u201C" + file.text + "\u201D. " + (file.cache === "HIT" ? "Institutional memory returned prior text; fresh production decisions are not inferred." : file.recorded ? "Only supplied execution records are shown." : "The complete production dossier was unavailable; supplied records remain identifiable.") : "No numerical file has been disclosed. These rooms are open for fictional inspection.";
    if (this.room === "executive") source += " The executive room is tour scenery, not an additional production approval.";
    if (file?.sourceOmitted || file?.omitted) source += " The source dossier or finite tour view omitted some records; the route is a summary.";
    byId2("office-evidence-source").textContent = source;
    byId2("office-evidence").replaceChildren(...events.map((e) => {
      const li = node("li");
      li.append(node("strong", e.office), node("p", e.finding));
      if (e.document) {
        const details = node("details"), summary = node("summary", "Inspect supplied document"), pre = node("pre", e.document.slice(0, 12e3) + (e.document.length > 12e3 ? "\n[First 12,000 of " + e.document.length + " characters shown.]" : ""));
        details.append(summary, pre);
        li.append(details);
      }
      return li;
    }));
    if (!events.length) byId2("office-evidence").append(node("li", file ? "No supplied decision for this department accompanies this file. Its furnishings and conversations are fictional tour content." : "Run a mandate to supply actual proceedings."));
    this.renderCompanion();
  }
  renderCompanion() {
    const d = this.archive.companions.get(this.archive.current()?.ordinal || "");
    byId2("office-companion").textContent = d ? "Appointed companion: " + d.companion.name + " \xB7 " + d.companion.rarity + ". This is a disclosed companion assignment, separate from the numerical output." : "";
    byId2("office-companion-story").hidden = !d;
  }
  updateRoute() {
    const file = this.archive.current(), route = routeFor(file), key2 = (file?.ordinal || "") + "|" + route.map((s) => s.room + ":" + s.source).join("|") + "|" + this.completedZero;
    if (key2 === this.routeKey) return;
    this.routeKey = key2;
    this.routeIndex = -1;
    byId2("office-route-status").textContent = file ? "Recorded route summary for " + file.ordinal + " \xB7 " + file.text + ". " + (this.archive.mode !== "mandate" ? "This is retained playback. " : "") + "The moving file illustrates these stops; it does not measure execution time." : this.completedZero ? "Zero\u2019s mandate is complete. No numerical file was needed. The estate\u2019s overhead remains fully funded." : "Run a mandate to supply a recorded file. Every room is open for fictional inspection.";
    byId2("office-route").replaceChildren(...route.map((s, i) => {
      const li = node("li"), b = node("button", i + 1 + ". " + roomById(s.room).short + " \xB7 " + s.source);
      b.type = "button";
      b.title = s.finding;
      b.addEventListener("click", () => {
        this.paused = true;
        this.routeIndex = i;
        this.renderer?.seek(i);
        this.select(s.room);
        this.highlightRoute();
        this.playbackLabels();
      });
      li.append(b);
      return li;
    }));
    this.playbackLabels();
    this.shareLink();
  }
  seekRoute(index) {
    const step = routeFor(this.archive.current())[index];
    if (!step) return;
    this.routeIndex = index;
    this.renderer?.seek(index);
    this.select(step.room, false);
    this.highlightRoute();
  }
  highlightRoute() {
    [...byId2("office-route").querySelectorAll("button")].forEach((b, i) => b.setAttribute("aria-pressed", String(i === this.routeIndex)));
  }
  playbackLabels() {
    const empty = routeFor(this.archive.current()).length === 0;
    for (const id of ["office-replay", "office-next"]) byId2(id).setAttribute("aria-disabled", String(empty));
    byId2("office-pause").setAttribute("aria-disabled", String(!this.motion.checked || !this.renderer));
    byId2("office-pause").textContent = !this.renderer ? "Use recorded stops" : !this.motion.checked ? "Animation off" : this.paused ? "Resume route" : "Pause route";
    byId2("office-pause").setAttribute("aria-pressed", String(this.paused));
  }
  sceneState() {
    const file = this.archive.current(), d = file ? this.archive.companions.get(file.ordinal) : void 0;
    return { room: this.room, route: routeFor(file), ordinal: file?.ordinal || "", text: file?.text || "", emoji: d?.companion.emoji, companionName: d?.companion.name, paused: this.paused, followRoute: byId2("office-follow-route").checked, reducedMotion: !this.motion.checked, quality: byId2("office-quality").value, seed: tourSeed(this.archive.mandate), layout: officeEstate.displayed, relocation: officeEstate.relocation, heist: officeHeist.snapshot };
  }
  syncRenderer() {
    try {
      this.renderer?.update(this.sceneState());
    } catch {
      this.fallback();
    }
  }
  activity() {
    const rect = byId2("office-stage").getBoundingClientRect();
    this.renderer?.active(this.opened && rect.height > 0 && rect.bottom > -100 && rect.top < innerHeight + 100 && !document.hidden);
  }
  shareLink() {
    byId2("office-share-link").value = officeShare(scope, this.archive.mandate, this.room, this.selectedProp?.id, byId2("companion-strategy").value || "factor-resonance-v1", this.selectedAction, layoutToken(officeEstate.current));
  }
  async soundPreference() {
    const enabled = byId2("office-sound").checked;
    try {
      if (enabled) {
        this.audio ||= new AudioContext();
        await this.audio.resume();
        this.tone();
      } else await this.audio?.suspend();
    } catch {
      byId2("office-sound").checked = false;
      this.status("Office sounds are unavailable. All tour dialogue remains readable.");
    }
  }
  tone() {
    if (!byId2("office-sound").checked || this.audio?.state !== "running" || document.hidden) return;
    const oscillator = this.audio.createOscillator(), gain = this.audio.createGain(), now = this.audio.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(440 + this.routeIndex % 3 * 110, now);
    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.09);
    oscillator.connect(gain);
    gain.connect(this.audio.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.1);
  }
  async saveOffline() {
    const b = byId2("office-offline");
    if (b.getAttribute("aria-disabled") === "true") return;
    b.setAttribute("aria-disabled", "true");
    byId2("office-offline-status").textContent = "Facilities is saving this release\u2019s 3D building\u2026";
    try {
      await saveOfficePack();
      byId2("office-offline-status").textContent = "The 3D office is saved for offline visits with this installed release.";
    } catch (error) {
      byId2("office-offline-status").textContent = "The offline building could not be saved: " + error.message + " You can keep exploring online.";
    } finally {
      b.setAttribute("aria-disabled", "false");
    }
  }
};

// web/office-supervision-model.ts
function observationEnvelope(packet, start, count) {
  const first = BigInt(start), last = first + BigInt(Math.max(0, count)) - 1n;
  const result = { prefix: [], groups: /* @__PURE__ */ new Map(), suffix: [], omitted: packet.omitted, cache: packet.cache, recorded: packet.recorded };
  let entered = false;
  for (const event of packet.events) {
    if (packet.cache === "HIT" && !["REQUEST", "COMPLETE", "FAILED"].includes(event.kind) && !event.kind.startsWith("CACHE_") && !event.kind.startsWith("PRECEDENT_")) continue;
    const ordinal = event.ordinal === null ? void 0 : BigInt(event.ordinal);
    if (count > 0 && ordinal !== void 0 && ordinal >= first && ordinal <= last) {
      entered = true;
      const group = result.groups.get(event.ordinal) || [];
      group.push(event);
      result.groups.set(event.ordinal, group);
    } else if (!entered) result.prefix.push(event);
    else result.suffix.push(event);
  }
  if (packet.precedent && !packet.events.some((e) => e.kind.startsWith("PRECEDENT_"))) {
    result.prefix.push(...packet.precedent.steps.map((e) => ({ ordinal: null, kind: "PRECEDENT_" + e.state, office: e.office, finding: e.finding, document: e.document })));
  }
  return result;
}
var personnelOffices = ["Headcount Planning", "Recruitment", "Identity Office", "Offer Authority", "Induction", "Probation Review", "Independent Audit"];
function identifyAction(event, previous) {
  const kind = event.kind, office2 = event.office;
  if (kind.startsWith("HR_")) return { action: "recruit", room: "personnel", anchor: "personnel" };
  if (kind.startsWith("CACHE_") || kind.startsWith("PRECEDENT_")) return { action: "memory", room: "memory", anchor: "memory" };
  if (kind === "CONTINUATION" || kind === "EXTENDED_CONTINUATION") return { action: "boundary", room: "reception", anchor: "boundary" };
  if (kind.startsWith("PREMISES_")) {
    const action = kind === "PREMISES_RELEASE" ? "release" : kind === "PREMISES_DISCOVERY" ? "survey" : kind === "PREMISES_CERTIFICATE" ? "lease" : office2.includes("Allocation") ? "allocate" : office2.includes("Eviction") ? "evict" : office2.includes("Lease") || office2.includes("Auditor") ? "lease" : "survey";
    return { action, room: "premises", anchor: "property" };
  }
  const procurement = { REQUISITION: "requisition", DELIVERY: "deliver", GLYPH_ACCEPTED: "glyph", GLYPH_ASSEMBLED: "assemble" };
  if (procurement[kind]) return { action: procurement[kind], room: "procurement", anchor: "glyph" };
  if (kind === "NOTARY" || kind === "EXTENDED_NOTARY") return { action: "notarize", room: "notary", anchor: "notary" };
  if (kind === "PUBLICATION") return { action: "print", room: "publication", anchor: "printer" };
  if (kind === "DISCLOSE_OBSERVED") return event.office.startsWith("Retained") ? { action: "memory", room: "memory", anchor: "memory" } : { action: "paper", room: "publication", anchor: "ledger" };
  if (kind === "AUDIT_APPEND") return { action: "audit", room: "publication", anchor: "ledger" };
  if (kind === "QUEUE_ENQUEUED") return { action: "queue", room: "publication", anchor: "queue" };
  if (kind === "TRANSACTION_COMMIT") return { action: "commit", room: "publication", anchor: "ledger" };
  if (kind === "TRANSACTION_CLEANUP") return { action: "cleanup", room: previous?.shot.room || "reception", anchor: previous?.shot.anchor || "desk" };
  if (kind.includes("SUCCESSION")) return { action: "succession", room: "reception", anchor: "boundary" };
  if (kind === "CLASSIFICATION" || kind === "EXTENDED_CLASSIFICATION") return { action: "classify", room: "reception", anchor: "desk" };
  if (kind === "ASSEMBLY") return { action: "wire", room: "reception", anchor: "desk" };
  if (kind === "FRAGMENT" || kind === "VISITOR") return { action: kind === "FRAGMENT" ? "fragment" : "classify", room: previous?.shot.room === "procurement" ? "procurement" : "reception", anchor: previous?.shot.room === "procurement" ? "glyph" : "desk" };
  return { action: kind === "NUMERAL" ? "fragment" : "paper", room: "reception", anchor: "desk" };
}
function shotFor(room, anchor, hrIndex = -1, layout = foundingEstate) {
  const book = addresses(layout), placement = book.placement(room), target = book.resolve({ room, station: anchor });
  const historicNorth = layout.edition === 0 && placement.position.z > 0;
  const alpha = (historicNorth ? Math.PI / 2 : -Math.PI / 2 + placement.yaw) + (anchor === "glyph" ? 0.22 : anchor === "notary" ? -0.22 : anchor === "queue" ? -0.14 : anchor === "personnel" ? hrIndex % 2 === 0 ? -0.12 : 0.12 : 0.1);
  return { room, anchor, target, alpha, beta: layout.edition > 0 || historicNorth ? 0.7 : anchor === "property" ? 0.85 : 0.93, radius: anchor === "glyph" ? 3.8 : anchor === "printer" ? 3.7 : anchor === "ledger" ? 3.9 : anchor === "boundary" ? 5.5 : 4.6 };
}
var substantial = /* @__PURE__ */ new Set(["recruit", "survey", "evict", "lease", "glyph", "assemble", "notarize", "print", "audit", "queue", "commit", "memory"]);
function duration(action, kind) {
  if (kind === "PREMISES_DISCOVERY") return [1400, 800];
  if (action === "print") return [1250, 850];
  if (action === "notarize") return [1e3, 650];
  if (action === "glyph") return [800, 550];
  if (action === "recruit") return [850, 600];
  return substantial.has(action) ? [750, 550] : [420, 360];
}
function planOfficeSteps(events, context, ensureDisclosure = false) {
  const result = [], glyphs = [], hrStates = Array(7).fill(void 0);
  let previous = context.previous, tenantCode;
  for (const [index, event] of events.entries()) {
    const match = event.kind === "GLYPH_ACCEPTED" ? event.finding.match(/Accepted (FizzBuzz|Fizz|Buzz) position (\d+): character (\S), SKU ([^,]+)/) : null;
    if (match && glyphs.length < 8) glyphs.push({ product: match[1], position: Number(match[2]), character: match[3], sku: match[4] });
    const { action, room, anchor } = identifyAction(event, previous), hrIndex = personnelOffices.indexOf(event.office), shot = shotFor(room, anchor, hrIndex);
    const status = event.kind.slice(3);
    if (event.kind.startsWith("HR_") && hrIndex >= 0 && ["APPROVED", "REJECTED", "NOT_REACHED"].includes(status)) hrStates[hrIndex] = status;
    if (event.kind === "PREMISES_DISCOVERY") tenantCode = event.finding.match(/U\+[A-Fa-f0-9]{4,6}/)?.[0];
    const same = previous?.shot.room === room && previous.shot.anchor === anchor && (action !== "recruit" || previous.hrIndex === hrIndex);
    const distance2 = previous ? Math.hypot(previous.shot.target.x - shot.target.x, previous.shot.target.z - shot.target.z) : 0;
    const arriveMs = same ? 0 : previous?.shot.room === room ? 620 : 1350 + Math.round(distance2 * 15);
    const [workMs, holdMs] = duration(action, event.kind);
    const step = { id: context.id + ":" + index, event, source: context.source || "recorded", ordinal: context.ordinal || event.ordinal || "", text: context.text || "", action, shot, hasFile: context.hasFile ?? !!context.ordinal, publication: event.kind === "PUBLICATION" || event.kind === "DISCLOSE_OBSERVED", arriveMs, workMs, holdMs, glyphs: [...glyphs], hrIndex, hrStates: [...hrStates], tenantCode };
    if (previous) step.origin = { room: previous.shot.room, station: previous.shot.anchor, hrIndex: previous.hrIndex };
    result.push(step);
    previous = step;
  }
  if (ensureDisclosure && !result.some((s) => s.publication)) {
    const event = { ordinal: context.ordinal || null, kind: "DISCLOSE_OBSERVED", office: "Observed Output Disclosure", finding: "Disclose the supplied text. No individual publication record accompanied this response; fresh production decisions are not inferred.", document: context.text || "" };
    result.push(...planOfficeSteps([event], { ...context, id: context.id + ":disclosure", source: "disclosure", previous }));
  }
  return result;
}
function planFolio(folio, id, previous) {
  const context = { id, ordinal: folio.ordinal, text: folio.text, previous, hasFile: true };
  if (folio.cache === "HIT") return planOfficeSteps([
    { ordinal: folio.ordinal, kind: "CACHE_RECEIPT", office: "Institutional Memory", finding: "The response reported a cache hit. This retained line requires no fresh hiring, glyph procurement or numerical audit transaction.", document: folio.text },
    { ordinal: folio.ordinal, kind: "DISCLOSE_OBSERVED", office: "Retained Output Disclosure", finding: "Display the retained answer. This is a new UI disclosure of an already completed result.", document: folio.text }
  ], { ...context, source: "disclosure" });
  return planOfficeSteps(folio.events, context, true);
}
var stepDuration = (step) => step.arriveMs + step.workMs + step.holdMs;
var smooth = (value) => {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
};
function cueAt(step, elapsed) {
  const travel = step.arriveMs ? Math.min(1, elapsed / step.arriveMs) : 1;
  const work = Math.max(0, Math.min(1, (elapsed - step.arriveMs) / step.workMs));
  const hold = Math.max(0, Math.min(1, (elapsed - step.arriveMs - step.workMs) / step.holdMs));
  return { step, travel: smooth(travel), work: smooth(work), hold, phase: travel < 1 ? "arrival" : work < 1 ? "work" : "hold", complete: elapsed >= stepDuration(step) };
}
var ObservationClock = class {
  elapsed = 0;
  last;
  allowed = false;
  step;
  constructor(step) {
    this.step = step;
  }
  tick(now, allow, manual = false, budget = { rate: 1, maxAdvanceMs: Infinity }) {
    const delta = this.last === void 0 || !this.allowed ? 0 : Math.max(0, now - this.last);
    this.last = now;
    this.allowed = allow;
    const advance = budget.rate === Infinity ? delta > 0 ? budget.maxAdvanceMs : 0 : delta * budget.rate;
    if (allow) this.elapsed = manual ? stepDuration(this.step) : Math.min(stepDuration(this.step), this.elapsed + Math.min(advance, budget.maxAdvanceMs));
    return cueAt(this.step, this.elapsed);
  }
};

// web/office-direction.ts
var lerp = (a, b, t) => a + (b - a) * t;
var angle = (a, b, t) => a + Math.atan2(Math.sin(b - a), Math.cos(b - a)) * t;
var OfficeShotDirector = class {
  key = "";
  path = [];
  route(step, layout) {
    const key2 = layoutToken(layout) + "|" + step.origin?.room + "|" + step.origin?.station + "|" + step.shot.room + "|" + step.shot.anchor;
    if (key2 !== this.key) {
      this.key = key2;
      this.path = step.origin ? routes(layout).route(step.origin, { room: step.shot.room, station: step.shot.anchor }) : [addresses(layout).resolve({ room: step.shot.room, station: step.shot.anchor })];
    }
    return this.path;
  }
  duration(step, layout) {
    if (!step.origin) return step.arriveMs;
    const same = step.origin.room === step.shot.room;
    if (same && step.origin.station === step.shot.anchor) return step.origin.hrIndex === step.hrIndex ? 0 : 620;
    return Math.round((same ? 650 : 1150) + routeLength(this.route(step, layout)) / 6 * 1e3);
  }
  minimumFrames(step, layout) {
    if (!step.arriveMs) return 0;
    const to = shotFor(step.shot.room, step.shot.anchor, step.hrIndex, layout), from = step.origin ? shotFor(step.origin.room, step.origin.station, step.origin.hrIndex, layout) : { alpha: -Math.PI / 2.6, beta: 0.88, radius: 33 };
    const rotation = Math.abs(Math.atan2(Math.sin(to.alpha - from.alpha), Math.cos(to.alpha - from.alpha)));
    return Math.ceil(Math.max(18, routeLength(this.route(step, layout)) / 0.4, rotation / 0.045, Math.abs(to.beta - from.beta) / 0.025, Math.abs(to.radius - from.radius) / 0.65));
  }
  pose(cue, layout) {
    const step = cue.step, to = shotFor(step.shot.room, step.shot.anchor, step.hrIndex, layout), t = cue.travel;
    const from = step.origin ? shotFor(step.origin.room, step.origin.station, step.origin.hrIndex, layout) : { ...to, target: { x: 0, y: 0.2, z: 0 }, alpha: -Math.PI / 2.6, beta: 0.88, radius: 33 };
    const p = pointAlong(this.route(step, layout), t), cross = !!step.origin && step.origin.room !== step.shot.room;
    const target = step.origin ? { x: p.x, y: lerp(from.target.y, to.target.y, t) + Math.sin(t * Math.PI) * 0.3, z: p.z } : { x: lerp(0, to.target.x, t), y: lerp(0.2, to.target.y, t), z: lerp(0, to.target.z, t) };
    return { target, file: { x: p.x, y: 0, z: p.z }, alpha: angle(from.alpha, to.alpha, t), beta: lerp(from.beta, to.beta, t) - (cross ? Math.sin(t * Math.PI) * 0.12 : 0), radius: lerp(from.radius, to.radius, t) + (cross ? Math.sin(t * Math.PI) * 5 : 0) };
  }
};
function rebaseObservation(elapsed, oldArrival, newArrival) {
  return elapsed < oldArrival && oldArrival > 0 ? elapsed / oldArrival * newArrival : Math.max(0, elapsed - oldArrival) + newArrival;
}

// web/office-cadence.ts
function officeCadenceRate(value) {
  return value === "1800" ? 0.5 : value === "225" ? 2 : value === "0" ? Infinity : 1;
}
var movingWork = /* @__PURE__ */ new Set(["wire", "recruit", "survey", "evict", "lease", "release", "deliver", "glyph", "assemble", "notarize", "print", "audit", "queue", "commit", "succession", "memory"]);
var OfficeCadenceGovernor = class {
  quality = "standard";
  interval = 1e3 / 60;
  cost = 0;
  samples = 0;
  slow = 0;
  recovered = 0;
  observeFrame(intervalMs, renderMs) {
    if (intervalMs <= 0) return false;
    this.interval += 0.15 * (Math.min(100, intervalMs) - this.interval);
    this.cost += 0.15 * (Math.min(100, Math.max(0, renderMs)) - this.cost);
    this.samples++;
    const struggling = this.interval > 28 || this.cost > 18;
    this.slow = struggling ? this.slow + 1 : 0;
    this.recovered = !struggling && this.interval < 20 && this.cost < 10 ? this.recovered + 1 : 0;
    const before = this.quality;
    if (this.samples >= 12 && this.slow >= 12) this.quality = "economy";
    else if (this.quality === "economy" && this.recovered >= 180) this.quality = "standard";
    return before !== this.quality;
  }
  budget(value, step, elapsed, arrivalFrames, painted, reducedMotion = false) {
    const rate = officeCadenceRate(value);
    if (!painted) return { rate, maxAdvanceMs: Infinity };
    let duration2, end, frames;
    if (elapsed < step.arriveMs) {
      duration2 = step.arriveMs;
      end = step.arriveMs;
      frames = arrivalFrames;
    } else if (elapsed < step.arriveMs + step.workMs) {
      duration2 = step.workMs;
      end = step.arriveMs + step.workMs;
      frames = movingWork.has(step.action) ? 16 : 8;
    } else {
      duration2 = step.holdMs;
      end = step.arriveMs + step.workMs + step.holdMs;
      frames = 2;
    }
    return { rate, maxAdvanceMs: Math.max(0, Math.min(end - elapsed, duration2 / Math.max(1, reducedMotion ? 1 : frames))) };
  }
};

// web/office-supervision.ts
var element = (id) => document.getElementById(id);
var OfficeSupervisionDesk = class {
  constructor(authority) {
    this.authority = authority;
    officeHeist.subscribe(() => this.updateScene());
    officeEstate.subscribe((event) => {
      this.updateScene();
      if (event.kind === "committed") {
        const label = element("supervision-current").querySelector("strong"), step = this.activeStep || this.lastStep;
        if (label && step) label.textContent = label.textContent.replace(/ · Address [A-D][1-3]$/, " \xB7 Address " + officeEstate.current.placements.find((p) => p.room === step.shot.room).address);
      }
      if (event.kind !== "progress") {
        this.syncControls();
        this.authority.wake();
      }
    });
    this.checkbox.addEventListener("change", () => this.applyMode(true));
    this.cadence.addEventListener("change", () => {
      this.pane.dataset.cadence = this.cadence.value;
      this.authority.wake();
    });
    element("supervision-autonomy").addEventListener("click", () => {
      this.disable();
      this.checkbox.focus();
    });
    element("supervision-pause").addEventListener("click", () => {
      if (this.authority.reading()) this.authority.pause(!this.authority.paused());
    });
    element("supervision-next").addEventListener("click", () => {
      if (!this.authority.reading() || !this.authority.paused() || officeEstate.moving || officeHeist.active) return;
      if (!element("office-fullscreen").open) element("mandate-output").scrollIntoView({ block: "start", behavior: "instant" });
      this.credits = 1;
      this.authority.wake();
    });
    const resize = new ResizeObserver(() => {
      this.renderer?.resize();
      this.activity();
    });
    resize.observe(element("supervision-stage"));
    new IntersectionObserver(() => this.activity(), { threshold: [0, 0.15] }).observe(element("supervision-stage"));
    document.addEventListener("visibilitychange", () => this.activity(true));
    document.addEventListener("site-page-change", () => this.activity(true));
    addEventListener("pageshow", () => this.activity(true));
    document.addEventListener("demo-desk-change", () => this.activity());
    document.addEventListener("demo-watch-layout", () => {
      this.activity();
      requestAnimationFrame(() => this.renderer?.resize());
    });
    document.addEventListener("office-fullscreen-change", () => {
      this.activity();
      requestAnimationFrame(() => this.renderer?.resize());
    });
    this.media.addEventListener("change", () => this.updateScene());
    addEventListener("pagehide", () => {
      this.interrupt();
      this.renderer?.dispose();
      clearTimeout(this.readiness);
    }, { once: true });
    this.applyMode(false);
  }
  authority;
  checkbox = element("executive-hovering");
  cadence = element("display-speed");
  pane = element("supervision-pane");
  canvas = element("supervision-canvas");
  media = matchMedia("(prefers-reduced-motion: reduce)");
  normalPaceHelp = element("pace-help").textContent || "";
  governor = new OfficeCadenceGovernor();
  paintedAt = 0;
  paintedCue;
  renderer;
  module;
  loading;
  ready = false;
  fallback = false;
  sceneActive = false;
  sceneStartedAt = 0;
  readiness;
  epoch = 0;
  serial = 0;
  cancelFrame;
  credits = 0;
  scheduler = new PresentationScheduler(() => this.visible());
  envelope;
  prefixDone = false;
  suffixDone = false;
  lastStep;
  activeStep;
  latestCue;
  packet;
  packetContexts = /* @__PURE__ */ new WeakMap();
  folio;
  published = false;
  companion;
  mandate = "15";
  mode = "mandate";
  observed = 0;
  get enabled() {
    return this.checkbox.checked;
  }
  get generation() {
    return this.epoch;
  }
  get hasStepCredit() {
    return this.credits > 0;
  }
  disable() {
    officeHeist.finish("skipped");
    officeEstate.finish();
    if (!this.enabled) return;
    this.checkbox.checked = false;
    this.applyMode(false);
    this.authority.wake();
  }
  applyMode(user) {
    this.cadence.disabled = false;
    this.pane.dataset.cadence = this.cadence.value;
    this.pane.dataset.renderQuality = this.governor.quality;
    if (this.enabled) {
      this.pane.hidden = false;
      element("mandate-output").dataset.supervised = "true";
      element("pace-help").textContent = "Full Board Ratification doubles each deliberation. Interdepartmental Sign-Off preserves established ceremony; Emergency Delegated Authority halves it. Executive Fiat uses the fastest pace the office can present smoothly. Change cadence at any time; every recorded decision keeps its place.";
      if (!this.authority.reading()) this.current("Executive oversight is standing by for supplied proceedings. Run or replay a mandate to begin a new observation.");
      void this.ensureScene();
    } else {
      this.interrupt();
      this.pane.hidden = true;
      delete element("mandate-output").dataset.supervised;
      element("pace-help").textContent = this.normalPaceHelp;
    }
    this.activity();
    this.syncControls();
    document.dispatchEvent(new Event("demo-presentation-change"));
    if (user) this.authority.wake();
  }
  syncControls() {
    const reading2 = this.authority.reading(), paused2 = this.authority.paused();
    const button = element("supervision-pause");
    playbackIcon(button, paused2 ? "play" : "pause", paused2 ? "Resume" : "Pause");
    button.setAttribute("aria-disabled", String(!reading2));
    button.setAttribute("aria-pressed", String(paused2));
    element("supervision-next").setAttribute("aria-disabled", String(!reading2 || !paused2 || officeEstate.moving || officeHeist.active));
    if (officeEstate.moving && reading2) this.authority.notice("Facilities has suspended disclosure while all eight departments reconsider their addresses. Your pause and current decision are retained.");
    else if (officeHeist.active && reading2) this.authority.notice("The approval stamp is missing. Proceedings will resume at this decision when the chase resolves. Your Pause setting is retained.");
  }
  begin(mandate, mode = "mandate") {
    this.interrupt();
    this.mandate = mandate;
    this.mode = mode;
    this.envelope = void 0;
    this.packet = void 0;
    this.prefixDone = false;
    this.suffixDone = false;
    this.lastStep = void 0;
    this.activeStep = void 0;
    this.folio = void 0;
    this.published = false;
    this.companion = void 0;
    this.observed = 0;
    this.pane.dataset.observedSteps = "0";
    this.pane.dataset.state = "waiting";
    this.current("Reception is accepting the mandate. The executive is withholding trust.");
    this.renderer?.direct(null);
    this.updateScene();
    this.syncControls();
  }
  interrupt() {
    officeHeist.finish("cancelled");
    officeEstate.finish();
    this.epoch++;
    this.credits = 0;
    this.latestCue = void 0;
    this.cancelFrame?.();
    this.cancelFrame = void 0;
    this.scheduler.cancel();
    this.pane.dataset.state = "stopped";
  }
  receive(packet, start, count) {
    this.packet = packet;
    this.packetContexts.set(packet, { start, count });
    this.envelope = observationEnvelope(packet, start, count);
    this.prefixDone = false;
    this.suffixDone = false;
    this.serial++;
  }
  async prelude(current) {
    if (!this.enabled || this.prefixDone || !this.envelope) return;
    this.prefixDone = true;
    this.folio = void 0;
    this.companion = void 0;
    this.published = false;
    const steps = planOfficeSteps(this.envelope.prefix, { id: "prelude-" + this.serial, hasFile: false, previous: this.lastStep });
    await this.play(steps, current);
  }
  async observe(folio, current, publish) {
    if (!this.enabled) return;
    if (folio.packet && folio.packet !== this.packet) {
      await this.finishPacket(current);
      if (!current() || !this.enabled) return;
      const context = this.packetContexts.get(folio.packet);
      this.receive(folio.packet, context?.start || folio.ordinal, context?.count || 1);
    }
    await this.prelude(current);
    if (!current() || !this.enabled) return;
    this.folio = folio;
    this.published = false;
    this.companion = void 0;
    await this.play(planFolio(folio, "folio-" + this.serial + "-" + folio.ordinal, this.lastStep), current, () => {
      if (!current()) return;
      this.published = true;
      publish();
      this.updateScene();
    });
  }
  async finishPacket(current) {
    if (!this.enabled || !this.envelope || this.suffixDone) return;
    await this.prelude(current);
    if (!current() || !this.enabled) return;
    this.suffixDone = true;
    this.folio = void 0;
    this.companion = void 0;
    this.published = false;
    await this.play(planOfficeSteps(this.envelope.suffix, { id: "conclusion-" + this.serial, hasFile: false, previous: this.lastStep }), current);
  }
  async rehearsal(event, current, preceding = []) {
    if (!this.enabled) return;
    this.folio = void 0;
    this.companion = void 0;
    this.published = false;
    await this.play(planOfficeSteps([...preceding, event], { id: "rehearsal-" + ++this.serial, source: "rehearsal", hasFile: false, previous: this.lastStep }).slice(-1), current, void 0, preceding.length, 7);
  }
  remember(discovery) {
    if (!this.published || discovery.mandate !== this.mandate || discovery.assignment.ordinal !== this.folio?.ordinal) return;
    this.companion = discovery;
    this.updateScene();
  }
  clearCompanions() {
    this.companion = void 0;
    this.updateScene();
  }
  complete() {
    if (this.enabled) {
      this.pane.dataset.state = "complete";
      this.current("Observation is complete. The company is still withholding trust.");
    }
    this.syncControls();
  }
  current(text2) {
    element("supervision-current").textContent = text2;
  }
  sceneState(step = this.activeStep || this.lastStep) {
    return { room: step?.shot.room || "reception", route: [], ordinal: this.folio?.ordinal || "", text: this.published ? this.folio?.text || "" : "PENDING", emoji: this.companion?.companion.emoji, companionName: this.companion?.companion.name, paused: true, reducedMotion: this.media.matches, quality: this.governor.quality, seed: tourSeed(this.mandate), layout: officeEstate.displayed, relocation: officeEstate.relocation, heist: officeHeist.snapshot };
  }
  painted(frame) {
    this.paintedAt = frame.now;
    this.paintedCue = frame.cue;
    if (this.governor.observeFrame(frame.intervalMs, frame.renderMs)) {
      this.pane.dataset.renderQuality = this.governor.quality;
      this.updateScene();
    }
  }
  updateScene(step = this.activeStep || this.lastStep) {
    try {
      this.renderer?.update(this.sceneState(step));
    } catch {
      this.graphicsFailure();
    }
  }
  visible() {
    if (!this.enabled || document.hidden || document.querySelector("dialog[open]:not(#office-fullscreen)")) return false;
    if (document.body.classList.contains("demo-page") && document.body.dataset.desk !== "observe") return false;
    const rect = element("supervision-stage").getBoundingClientRect(), bottom = innerHeight - (document.querySelector("#discovery-register")?.getBoundingClientRect().height || 0);
    return rect.width > 0 && Math.min(rect.bottom, bottom) - Math.max(rect.top, 0) >= Math.min(60, rect.height * 0.2);
  }
  activity(force = false) {
    const rect = this.canvas.getBoundingClientRect(), active = this.visible() && !this.canvas.hidden && rect.width > 0 && rect.height > 0;
    if (force || active !== this.sceneActive) {
      this.sceneActive = active;
      this.sceneStartedAt = performance.now();
      if (force && active) this.renderer?.active(false);
      this.renderer?.active(active);
      if (active) this.renderer?.resize();
    }
    if (active && this.ready && !this.fallback && performance.now() - Math.max(this.sceneStartedAt, this.paintedAt) > 3e3) {
      this.graphicsFailure();
      return;
    }
    this.scheduler.refresh();
  }
  armReadiness() {
    clearTimeout(this.readiness);
    this.readiness = setTimeout(() => {
      if (this.ready || !this.enabled) return;
      if (this.sceneActive) this.graphicsFailure();
      else this.armReadiness();
    }, 2e4);
  }
  async ensureScene() {
    if (this.renderer) {
      this.activity();
      this.renderer.resize();
      return;
    }
    if (this.fallback) return;
    if (this.loading) return this.loading;
    this.loading = (async () => {
      try {
        this.module ||= import(releaseAsset("office-world.js").href);
        const module = await this.module;
        if (!this.enabled) return;
        this.canvas.hidden = false;
        this.canvas.dataset.module = releaseAsset("office-world.js").href;
        this.canvas.dataset.renderer = "babylon";
        this.renderer = module.createOffice({ canvas: this.canvas, state: this.sceneState(), interactive: false, onRoom: () => {
        }, onProp: () => {
        }, onStep: () => {
        }, onView: () => {
        }, onHeistSuspect: (index, id) => officeHeist.intercept(index, id), onHeistFootprint: () => officeHeist.follow(), onFrame: (frame) => this.painted(frame), onReady: () => {
          this.ready = true;
          if (this.latestCue) this.renderer?.direct(this.latestCue);
          clearTimeout(this.readiness);
          const loading = element("supervision-loading"), focused = loading.contains(document.activeElement);
          loading.hidden = true;
          if (focused) element("supervision-title").focus({ preventScroll: true });
        }, onProblem: () => this.graphicsFailure() });
        this.sceneActive = !this.visible();
        this.activity();
        this.renderer.resize();
        this.armReadiness();
      } catch {
        this.module = void 0;
        this.graphicsFailure();
      }
    })().finally(() => {
      this.loading = void 0;
    });
    return this.loading;
  }
  graphicsFailure() {
    clearTimeout(this.readiness);
    const renderer = this.renderer;
    this.renderer = void 0;
    this.ready = true;
    this.fallback = true;
    this.canvas.hidden = true;
    this.canvas.dataset.renderer = "evidence";
    try {
      renderer?.dispose();
    } catch {
    }
    this.activity();
    if (document.activeElement === this.canvas) element("supervision-title").focus({ preventScroll: true });
    const loading = element("supervision-loading");
    loading.hidden = false;
    const retry = node("button", "Requisition another graphics attempt");
    retry.type = "button";
    retry.addEventListener("click", () => {
      this.fallback = false;
      this.ready = false;
      this.module = void 0;
      this.canvas.removeAttribute("data-rendered");
      loading.replaceChildren(node("p", "Facilities is arranging another graphics interview\u2026"));
      element("supervision-title").focus({ preventScroll: true });
      void this.ensureScene();
    });
    loading.replaceChildren(node("p", "The 3D display is unavailable. Executive observation continues through the supplied evidence below. The numbers remain employable."), retry);
  }
  show(step, index, total) {
    this.activeStep = step;
    this.pane.dataset.room = step.shot.room;
    document.dispatchEvent(new CustomEvent("office-location", { detail: { view: "supervision" } }));
    this.pane.dataset.kind = step.event.kind;
    this.pane.dataset.ordinal = step.ordinal;
    this.pane.dataset.action = step.action;
    this.pane.dataset.state = "running";
    const status = element("supervision-current");
    status.replaceChildren(node("strong", index + 1 + " / " + total + " \xB7 " + step.event.office + " \xB7 Address " + officeEstate.current.placements.find((p) => p.room === step.shot.room).address), document.createTextNode(step.event.finding));
    this.authority.notice((this.authority.paused() ? "Paused observation" : "Observing") + " \xB7 " + (index + 1) + " / " + total + " \xB7 " + step.event.office);
    element("supervision-caption").scrollTop = 0;
    const source = step.source === "rehearsal" ? "Read-only personnel specimen. Numerical output is retained." : step.source === "disclosure" ? "Observed result or cache receipt. Fresh production work is not inferred." : this.mode === "replay" ? "Retained Java evidence. No business operation is being repeated." : "Recorded Java evidence. The operation has already completed; its UI disclosure is being choreographed.";
    element("supervision-source").textContent = source + (this.envelope?.omitted ? " The source dossier omitted " + this.envelope.omitted + " entries; absent work is not reconstructed." : "");
    element("supervision-document").textContent = JSON.stringify(step.event, null, 2).slice(0, 12e3);
    const progress = element("supervision-progress");
    progress.max = total;
    progress.value = index;
    progress.setAttribute("aria-label", "Observed decisions" + (step.ordinal ? " for ordinal " + step.ordinal : ""));
    this.updateScene(step);
  }
  async play(steps, current, publish, offset = 0, total = steps.length) {
    const epoch = this.epoch;
    void this.ensureScene();
    if (epoch !== this.epoch || !current() || !this.enabled) return;
    for (const [index, step] of steps.entries()) {
      if (epoch !== this.epoch || !current() || !this.enabled) return;
      const done = await this.playOne(step, index + offset, total, epoch, current, publish);
      if (!done) return;
      this.lastStep = step;
    }
  }
  playOne(step, index, total, epoch, current, publish) {
    return new Promise((resolve) => {
      const director = new OfficeShotDirector();
      step = { ...step, arriveMs: director.duration(step, officeEstate.current) };
      let layoutKey = layoutToken(officeEstate.current), arrivalFrames = director.minimumFrames(step, officeEstate.current);
      const clock = new ObservationClock(step);
      let shown = false, published = false, manual = false, settled = false, clockAt = 0;
      const finish = (ok) => {
        if (settled) return;
        settled = true;
        this.scheduler.cancel();
        if (this.cancelFrame === cancel) this.cancelFrame = void 0;
        resolve(ok);
      };
      const cancel = () => finish(false);
      this.cancelFrame = cancel;
      const frame = (now) => {
        if (epoch !== this.epoch || !this.enabled || !current()) {
          finish(false);
          return;
        }
        const key2 = layoutToken(officeEstate.current);
        if (key2 !== layoutKey) {
          const arrival = director.duration(step, officeEstate.current);
          clock.elapsed = rebaseObservation(clock.elapsed, step.arriveMs, arrival);
          step.arriveMs = arrival;
          arrivalFrames = director.minimumFrames(step, officeEstate.current);
          layoutKey = key2;
          this.updateScene(step);
        }
        this.activity();
        const moving = officeEstate.moving || officeHeist.active, paused2 = this.authority.paused();
        if (!shown) {
          if (!moving && (!paused2 || this.credits > 0)) {
            shown = true;
            this.show(step, index, total);
          } else {
            this.scheduler.request(frame);
            return;
          }
        }
        if (!moving && paused2 && this.credits > 0) {
          this.credits = 0;
          manual = true;
        }
        const allow = !moving && (!paused2 || manual);
        const painting = this.sceneActive && this.ready && !this.fallback;
        clockAt = Math.max(clockAt, painting ? this.paintedAt : now);
        const cue = clock.tick(clockAt, allow, manual, this.governor.budget(this.cadence.value, step, clock.elapsed, arrivalFrames, this.sceneActive, this.media.matches));
        this.latestCue = cue;
        if (this.ready) this.renderer?.direct(cue);
        if (this.pane.dataset.phase !== cue.phase) {
          this.pane.dataset.phase = cue.phase;
          element("supervision-progress").title = cue.phase === "arrival" ? "Arriving at the next office" : cue.phase === "work" ? "The supplied decision is being illustrated" : "A mandatory opportunity for executive contemplation";
        }
        if (!moving && step.publication && !published && clock.elapsed >= step.arriveMs + step.workMs && (!painting || manual || this.paintedCue?.step.id === step.id && this.paintedCue.work === 1)) {
          published = true;
          publish?.();
        }
        if (cue.complete) {
          const acknowledge = () => {
            if (epoch !== this.epoch || !current()) {
              finish(false);
              return;
            }
            this.activity();
            if (officeEstate.moving || officeHeist.active || this.sceneActive && this.ready && !this.fallback && !manual && (this.paintedCue?.step.id !== step.id || !this.paintedCue.complete)) {
              this.scheduler.request(acknowledge);
              return;
            }
            if (step.publication && !published) {
              published = true;
              publish?.();
            }
            this.observed++;
            this.pane.dataset.observedSteps = String(this.observed);
            this.pane.dataset.state = "held";
            element("supervision-progress").value = index + 1;
            finish(true);
          };
          this.scheduler.request(acknowledge);
        } else this.scheduler.request(frame);
      };
      this.scheduler.request(frame);
    });
  }
};

// web/office-relocation.ts
var reduced = matchMedia("(prefers-reduced-motion: reduce)");
function visible() {
  if (document.hidden) return false;
  if (document.querySelector("dialog[open]:not(#office-modal):not(#office-fullscreen)")) return false;
  return ["office-stage", "supervision-stage"].some((id) => {
    const el = document.getElementById(id);
    if (!el || el.closest("[hidden]")) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && Math.min(r.bottom, innerHeight) - Math.max(r.top, 0) > Math.min(60, r.height * 0.2);
  });
}
var scheduler2 = new PresentationScheduler(visible);
function tick2(now) {
  if (!officeEstate.moving) return;
  if (reduced.matches || document.getElementById("office-motion")?.checked === false) {
    officeEstate.finish();
    return;
  }
  officeEstate.advance(now, true);
  if (officeEstate.moving) scheduler2.request(tick2);
}
officeEstate.subscribe((event) => {
  if (event.kind === "staged") scheduler2.request(tick2);
  else if (event.kind === "committed" || event.kind === "cancelled") scheduler2.cancel();
});
for (const event of ["visibilitychange", "site-page-change", "demo-desk-change", "demo-watch-layout", "office-fullscreen-change"]) document.addEventListener(event, () => scheduler2.refresh());
reduced.addEventListener("change", () => {
  if (reduced.matches) officeEstate.finish();
});
addEventListener("pagehide", () => {
  scheduler2.cancel();
  officeEstate.finish();
}, { once: true });
function requestReorganization() {
  officeEstate.request();
  if (reduced.matches) officeEstate.finish();
}

// web/office-reorganization.ts
var announcement = node("p");
announcement.className = "estate-announcement";
announcement.setAttribute("role", "status");
announcement.setAttribute("aria-live", "polite");
announcement.setAttribute("aria-atomic", "true");
document.body.append(announcement);
var announce = (text2) => {
  const parent = document.querySelector("#office-fullscreen[open] #office-fullscreen-surface, #office-modal[open]") || document.body;
  if (announcement.parentElement !== parent) parent.append(announcement);
  if (announcement.textContent !== text2) announcement.textContent = text2;
};
var ReorganizationPanel = class {
  constructor(container) {
    this.container = container;
    container.classList.add("reorganization-panel");
    this.button.type = "button";
    this.button.className = "button button-secondary";
    this.button.addEventListener("click", () => {
      if (officeEstate.moving) return;
      try {
        requestReorganization();
      } catch (error) {
        this.status.textContent = error instanceof Error ? error.message : "Facilities has deferred certainty.";
        announce(this.status.textContent);
      }
    });
    this.status.className = "field-help";
    this.notice.className = "field-help";
    const summary = node("summary", "Inspect the current workplace arrangement");
    summary.addEventListener("click", (event) => {
      if (!this.details.open && this.firstOpen) {
        event.preventDefault();
        this.expand();
      }
    });
    this.details.append(summary);
    this.map.className = "estate-map";
    this.map.setAttribute("role", "list");
    this.map.setAttribute("aria-label", "Current estate floorplan");
    this.table.className = "estate-addresses";
    this.scroll.className = "estate-minutes";
    this.scroll.tabIndex = 0;
    this.scroll.setAttribute("role", "region");
    this.scroll.setAttribute("aria-label", "Minutes of Spatial Achievement");
    this.scroll.append(this.empty, this.minutes);
    this.perk.hidden = true;
    this.perk.className = "estate-perk";
    const share = node("input");
    share.type = "url";
    share.hidden = true;
    share.readOnly = true;
    share.setAttribute("aria-label", "Reorganization visit link");
    const copy = node("button", "Copy This Approved Chaos");
    copy.type = "button";
    copy.addEventListener("click", async () => {
      const input = document.getElementById("limit"), authority = document.getElementById("authorize-companion-strategy") || document.getElementById("companion-strategy");
      let mandate = "15";
      try {
        mandate = String(parseMandate(input.value));
      } catch {
      }
      const room = document.getElementById(this.view === "office" ? "office-experience" : "supervision-pane")?.dataset.room || "reception";
      const visit = this.view === "office" ? document.getElementById("office-share-link").value : officeShare(scope, mandate, room, void 0, authority.value, void 0, layoutToken(officeEstate.current));
      const currentVisit = new URL(visit);
      currentVisit.searchParams.set("limit", mandate);
      currentVisit.searchParams.set("authority", authority.value);
      currentVisit.searchParams.set("estate", layoutToken(officeEstate.current));
      share.value = currentVisit.href;
      share.hidden = false;
      try {
        await navigator.clipboard.writeText(currentVisit.href);
        announce("Approved chaos copied. The link reproduces this estate and prefills a mandate; it never starts counting automatically.");
      } catch {
        share.focus();
        share.select();
        announce("Copy the selected visit link using your browser copy command.");
      }
    });
    const sharing = node("div");
    sharing.className = "estate-controls estate-sharing";
    sharing.append(copy, share);
    this.details.append(sharing, this.map, this.perk, this.table, node("h3", "Minutes of Spatial Achievement"), node("p", "The latest ten transformations are retained in this tab. These distances describe illustrated desk-to-desk paper routes in scene units; they are not service response times."), this.scroll);
    this.skip.type = "button";
    this.skip.addEventListener("click", () => {
      this.button.focus({ preventScroll: true });
      officeEstate.finish();
    });
    this.progress.max = 1;
    this.progress.setAttribute("aria-label", "Facilities relocation progress");
    const controls = node("div");
    controls.className = "estate-controls";
    controls.append(this.button, this.skip, this.progress);
    container.append(node("p", "Facilities improves the same eight departments by putting them somewhere else. Each announcement alternates a 2\xD74 estate with a 3\xD73 estate, sometimes making room for a thoroughly conditional perk. Disclosure waits during the move; Java does no additional work."), controls, this.status, this.notice, this.details);
    officeEstate.subscribe((event) => {
      this.transaction();
      if (event.kind === "committed" || event.kind === "cancelled") this.render();
      if (event.kind === "committed") announce("Facilities declares victory. " + estateLabel(officeEstate.current) + ". Proceedings may resume at the interrupted decision.");
    });
    document.addEventListener("office-location", (event) => {
      const detail = event.detail;
      if (detail.view === this.view) this.highlight();
    });
    document.addEventListener("office-amenity", (event) => {
      if (event.detail === this.view) {
        this.expand();
        this.inspectAmenity(this.details.querySelector("summary"));
      }
    });
    this.render();
    this.transaction();
  }
  container;
  button = node("button", "Announce Another Reorganization");
  status = node("p");
  notice = node("p");
  details = node("details");
  table = node("table");
  skip = node("button", "Waive the Moving Ceremony");
  progress = node("progress");
  phase = "";
  map = node("ol");
  minutes = node("ol");
  scroll = node("div");
  memoNodes = /* @__PURE__ */ new Map();
  empty = node("p", "No transformations are recorded yet. The company is coping with the unsettling adequacy of its existing furniture.");
  firstOpen = true;
  perk = node("section");
  perkTrigger;
  expand() {
    const first = this.firstOpen;
    this.firstOpen = false;
    this.details.open = true;
    if (first) this.scroll.scrollTop = this.scroll.scrollHeight;
  }
  get view() {
    return this.container.id.startsWith("supervision") ? "supervision" : "office";
  }
  setReading(_reading) {
    this.button.title = "Authorize a new arrangement of the same responsibilities. Current proceedings wait for Facilities.";
  }
  transaction() {
    const r = officeEstate.relocation;
    this.button.setAttribute("aria-disabled", String(!!r));
    if (!r && document.activeElement === this.skip) this.button.focus({ preventScroll: true });
    this.skip.hidden = !r;
    this.progress.hidden = !r;
    if (!r) {
      this.phase = "";
      return;
    }
    this.progress.value = r.progress;
    this.container.dataset.relocationPhase = r.phase;
    if (this.phase !== r.phase) {
      this.phase = r.phase;
      const text2 = { packing: "Packing every department. Responsibilities are being carefully separated from accountability.", moving: "All eight offices are in transit. The moving boxes have been granted acting management authority.", unpacking: "Unpacking the approved future. These addresses remain provisional until Facilities declares victory.", returning: "Returning to the interrupted decision. No work has been repeated; no responsibility has been reduced." }[r.phase];
      this.status.textContent = text2;
      announce(text2);
    }
  }
  highlight() {
    const room = document.getElementById(this.view === "office" ? "office-experience" : "supervision-pane")?.dataset.room || "reception";
    for (const cell of this.map.children) {
      if (cell.dataset.room === room) cell.setAttribute("aria-current", "location");
      else cell.removeAttribute("aria-current");
    }
  }
  inspectAmenity(trigger) {
    const l = officeEstate.current;
    if (!l.amenity) return;
    this.perkTrigger = trigger;
    const specimen = amenities[l.amenity.kind], title2 = node("h3", specimen.name + " \xB7 " + estateLabel(l) + " / " + l.amenity.address), answer = node("p");
    answer.setAttribute("role", "status");
    answer.setAttribute("aria-live", "polite");
    answer.setAttribute("aria-atomic", "true");
    title2.tabIndex = -1;
    const actions = node("div");
    actions.className = "estate-controls";
    for (const action of specimen.actions) {
      const button = node("button", action.label);
      button.type = "button";
      button.addEventListener("click", () => answer.textContent = action.answer);
      actions.append(button);
    }
    const close = node("button", "Close amenity inspection");
    close.type = "button";
    close.addEventListener("click", () => {
      this.perk.hidden = true;
      (this.perkTrigger?.isConnected ? this.perkTrigger : this.details.querySelector("summary"))?.focus({ preventScroll: true });
    });
    this.perk.replaceChildren(title2, node("p", "Fictional Facilities specimen. This perk has no role in the recorded numerical proceedings."), node("p", specimen.story), actions, answer, close);
    this.perk.hidden = false;
    title2.focus({ preventScroll: true });
    this.perk.scrollIntoView({ block: "nearest", behavior: "instant" });
  }
  appendMemo(m) {
    const li = node("li");
    li.append(node("h4", "Transformation " + m.to.edition + ": " + m.title), node("p", m.rationale), node("p", m.finding + " Mean illustrated commute: " + m.before.toFixed(1) + " \u2192 " + m.after.toFixed(1) + " scene units."));
    const moves = node("ul");
    for (const p of m.to.placements) {
      const name = rooms.find((r) => r.id === p.room).short;
      moves.append(node("li", name + ": " + qualifiedAddress(m.from, p.room) + " \u2192 " + qualifiedAddress(m.to, p.room)));
    }
    li.append(moves);
    this.minutes.append(li);
    this.memoNodes.set(m.to.edition, li);
  }
  render() {
    const l = officeEstate.current;
    delete this.container.dataset.relocationPhase;
    this.status.textContent = estateLabel(l) + (l.amenity ? " \xB7 " + l.amenity.kind + " at " + l.amenity.address : " \xB7 all available space is committed to seriousness");
    this.container.dataset.estateEdition = String(l.edition);
    this.notice.textContent = estateRecords.notice;
    this.notice.hidden = !estateRecords.notice;
    const head = node("thead"), row = node("tr");
    for (const name of ["Department", "Address", "Partition policy"]) {
      const th = node("th", name);
      th.scope = "col";
      row.append(th);
    }
    head.append(row);
    const body = node("tbody"), cells = [];
    for (let slot = 0; slot < l.rows * l.columns; slot++) {
      const p = l.placements.find((p2) => p2.slot === slot), cell = node("li");
      if (p) {
        cell.dataset.room = p.room;
        const theme = partitionStyles.find((s) => s.id === p.partition), name = rooms.find((r) => r.id === p.room).short;
        cell.append(node("strong", p.address), node("span", name));
        const tr = node("tr");
        tr.append(node("td", name), node("td", p.address), node("td", theme ? theme.name + " \xB7 " + theme.claim : "Founding architectural certainty"));
        body.append(tr);
      } else if (l.amenity) {
        const a = l.amenity, button = node("button", "Inspect " + a.kind + " at " + a.address);
        button.type = "button";
        button.addEventListener("click", () => this.inspectAmenity(button));
        cell.append(node("strong", a.address), button);
        const tr = node("tr");
        tr.append(node("td", a.kind === "atrium" ? "Atrium: Chief Growth Officer in residence" : "Breakroom: mandatory optional restoration"), node("td", a.address), node("td", "The company is accommodating the appearance of a perk."));
        body.append(tr);
      }
      cells.push(cell);
    }
    if (this.map.contains(document.activeElement)) {
      this.details.querySelector("summary")?.focus({ preventScroll: true });
    }
    this.map.style.setProperty("--estate-columns", String(l.columns));
    this.map.replaceChildren(...cells);
    this.map.setAttribute("aria-label", "Current estate floorplan: " + estateLabel(l));
    this.highlight();
    this.table.replaceChildren(node("caption", "Current department addresses"), head, body);
    this.empty.hidden = estateRecords.history.length > 0;
    const following = this.scroll.scrollHeight - this.scroll.clientHeight - this.scroll.scrollTop < 24, ids = new Set(estateRecords.history.map((m) => m.to.edition));
    for (const [id, el] of this.memoNodes) if (!ids.has(id)) {
      el.remove();
      this.memoNodes.delete(id);
    }
    for (const memo of estateRecords.history) if (!this.memoNodes.has(memo.to.edition)) this.appendMemo(memo);
    if (!estateRecords.history.length) this.minutes.setAttribute("aria-label", "No transformations have been recorded in this tab.");
    else this.minutes.removeAttribute("aria-label");
    if (this.details.open && following) this.scroll.scrollTop = this.scroll.scrollHeight;
  }
};

// web/shared-encounter.ts
var previousReferral = "";
function prepareSharedEncounter(input) {
  const query = new URL(location.href).searchParams, limit = query.get("limit");
  if (limit === null) return;
  const referral = ["limit", "ordinal", "authority", "catalog", "companion", "seedPolicy"].map((key2) => query.get(key2) || "").join("|");
  if (referral === previousReferral) return;
  let mandate;
  try {
    mandate = String(parseMandate(limit));
  } catch {
    return;
  }
  previousReferral = referral;
  document.querySelector(".shared-encounter")?.remove();
  input.value = mandate;
  input.dispatchEvent(new Event("input"));
  const authority = document.querySelector("#authorize-companion-strategy");
  if (authority && [...authority.options].some((option) => option.value === query.get("authority"))) {
    authority.value = query.get("authority");
    authority.dispatchEvent(new Event("change"));
  }
  if (!query.has("ordinal") && !query.has("companion")) return;
  const ordinal = query.get("ordinal"), strategy = query.get("authority"), catalogVersion = query.get("catalog"), expected = query.get("companion");
  const panel = node("section");
  panel.className = "shared-encounter";
  panel.setAttribute("aria-labelledby", "shared-encounter-title");
  const title2 = node("h3", "Interdepartmental encounter referral");
  title2.id = "shared-encounter-title";
  const status = node("p", "The referred mandate is ready. Run it to reproduce the sequence. No numerical mandate has been submitted.");
  status.setAttribute("role", "status");
  panel.append(title2, status);
  document.querySelector("#authorize-companion-help, #companion-help").after(panel);
  if (!ordinal || !/^[1-9][0-9]*$/.test(ordinal) || BigInt(ordinal) > BigInt(mandate) || !strategy || !catalogVersion || !expected || query.get("seedPolicy") !== seedPolicy) {
    status.textContent = "The mandate was prefilled. This referral has incomplete or unsupported encounter evidence; select an authority and run to explore.";
    return;
  }
  const button = node("button", "Inspect shared appointment");
  button.type = "button";
  button.setAttribute("aria-haspopup", "dialog");
  button.setAttribute("aria-controls", "companion-dialog");
  panel.append(button);
  button.addEventListener("click", async () => {
    if (button.getAttribute("aria-disabled") === "true") return;
    button.setAttribute("aria-disabled", "true");
    status.textContent = "Verifying the referred appointment with the Java allocation authority\u2026";
    try {
      const catalog = await companionCatalog();
      if (catalog.version !== catalogVersion) throw new Error("This referral uses a different catalog version.");
      const response = await request("/companions/window?start=" + ordinal + "&count=1&strategy=" + encodeURIComponent(strategy) + "&seed=" + mandate);
      if (!response.ok) throw new Error("The referred authority could not approve this appointment.");
      const data = await response.json(), a = data.assignments?.[0], c = catalog.entries.find((c2) => c2.id === expected);
      if (data.schema !== "slopbuzz-companion-window/v2" || data.seedPolicy !== seedPolicy || data.mandateSeed !== mandate || data.catalogVersion !== catalogVersion || data.strategy !== strategy || data.start !== ordinal || data.count !== 1 || data.assignments?.length !== 1 || a?.ordinal !== ordinal || a.companionId !== expected || !c) throw new Error("This referral does not reproduce the claimed appointment.");
      const discovery = { companion: c, assignment: a, mandate, strategy, catalogVersion, seedPolicy, discoveredAt: (/* @__PURE__ */ new Date()).toISOString() };
      if (!validDiscovery(discovery)) throw new Error("The referral supplied invalid evidence.");
      status.textContent = "Appointment verified. This inspection did not print numbers or add a discovery to your register.";
      companionDialog().open(discovery, button);
    } catch (error) {
      status.textContent = "Referral could not be verified: " + error.message + " Run the mandate to explore current appointments.";
    } finally {
      button.setAttribute("aria-disabled", "false");
    }
  });
}

// web/telemetry.ts
function trackUsage(detail) {
  window.dispatchEvent(new CustomEvent("slopbuzz:usage", { detail }));
}

// web/onboarding.ts
function parseDossier(value) {
  const data = value;
  if (!data || data.schema !== "slopbuzz-onboarding/v1" || typeof data.caseId !== "string" || !["MANDATE", "REHEARSAL"].includes(data.purpose) || !Number.isInteger(data.candidate) || !["APPROVED", "REJECTED"].includes(data.status) || !Array.isArray(data.steps) || data.steps.length !== 7 || data.steps.some((step) => !step || !["APPROVED", "REJECTED", "NOT_REACHED"].includes(step.state) || ["office", "rule", "received", "finding", "document"].some((key2) => typeof step[key2] !== "string"))) throw new Error("The personnel record has an unsupported format.");
  if (data.status === "APPROVED" && (data.candidate !== 1 || data.startingOrdinal !== 1 || data.steps.some((step) => step.state !== "APPROVED")) || data.status === "REJECTED" && (data.startingOrdinal !== null || !data.steps.some((step) => step.state === "REJECTED"))) throw new Error("The personnel verdict contradicts its recorded decisions.");
  return data;
}
var PersonnelProceedings = class {
  constructor(actions, prefix = "") {
    this.actions = actions;
    this.prefix = prefix;
    this.scenarios().forEach((button) => button.addEventListener("click", () => {
      if (button.getAttribute("aria-disabled") !== "true") actions.rehearse(button.dataset.personnelScenario);
    }));
    this.el("personnel-replay").addEventListener("click", () => {
      if ((this.dossier || this.playbackAvailable) && !this.busy) actions.replay();
    });
    this.el("personnel-step").addEventListener("click", () => {
      if ((this.dossier || this.playbackAvailable) && !this.busy) actions.step();
    });
    this.el("personnel-documents").addEventListener("click", () => {
      if (!this.dossier || this.busy) return;
      this.el("personnel-documents").focus();
      this.el("personnel-dialog").showModal();
    });
    this.el("personnel-dialog-close").addEventListener("click", () => this.el("personnel-dialog").close());
    this.el("personnel-dialog").addEventListener("close", () => {
      const opener = this.el("personnel-documents");
      if (opener.getClientRects().length) opener.focus({ preventScroll: true });
      else document.querySelector("[data-open-personnel]")?.focus({ preventScroll: true });
    });
    this.el("personnel-documents-toggle").addEventListener("click", () => {
      const open = this.el("personnel-documents-toggle").getAttribute("aria-expanded") !== "true";
      this.rows.forEach((row) => row.details.open = open);
      this.synchronizeDisclosure();
    });
    this.updateControls();
  }
  actions;
  prefix;
  el(id) {
    return byId(this.prefix + id);
  }
  text(id, value) {
    this.el(id).textContent = String(value);
  }
  scenarios() {
    return this.prefix ? document.querySelectorAll("#desk-experiment [data-personnel-scenario]") : document.createElement("div").querySelectorAll("button");
  }
  dossier;
  visible = 0;
  rows = [];
  source = "";
  busy = false;
  playbackAvailable = false;
  setPlaybackAvailable(available) {
    this.playbackAvailable = available;
    this.updateControls();
  }
  synchronizeDisclosure() {
    const open = this.rows.length > 0 && this.rows.every((row) => row.details.open);
    this.el("personnel-documents-toggle").setAttribute("aria-expanded", String(open));
    this.text("personnel-documents-toggle", open ? "Fold all documents" : "Expand all documents");
  }
  get record() {
    return this.dossier;
  }
  get progress() {
    return this.visible;
  }
  setBusy(busy) {
    this.busy = busy;
    this.updateControls();
  }
  updateControls() {
    for (const id of ["personnel-replay", "personnel-step"]) this.el(id).setAttribute("aria-disabled", String(!this.dossier && !this.playbackAvailable || this.busy));
    this.el("personnel-documents").setAttribute("aria-disabled", String(!this.dossier || this.busy));
    this.scenarios().forEach((button) => button.setAttribute("aria-disabled", String(this.busy)));
  }
  loading() {
    this.clear("Obtaining the personnel file\u2026", "Awaiting response");
    this.setBusy(true);
  }
  clear(message, verdict = "No new proceedings") {
    this.dossier = void 0;
    this.rows = [];
    this.visible = 0;
    this.busy = false;
    this.el("personnel-steps").replaceChildren();
    this.el("personnel-steps").hidden = true;
    this.text("personnel-origin", message);
    this.text("personnel-verdict", verdict);
    this.text("personnel-status", "No new personnel decisions are available to read.");
    this.el("personnel-step").textContent = "Step through";
    this.synchronizeDisclosure();
    this.updateControls();
  }
  responseRecord(response) {
    const state = response.headers.get("X-SlopBuzz-Onboarding-State");
    if (state === "CACHE_REUSED" || response.headers.get("X-SlopBuzz-Cache") === "HIT") {
      this.clear("Institutional memory answered. No new HR proceedings.", "Cache answered");
      return;
    }
    const raw = response.headers.get("X-SlopBuzz-Onboarding-Trace");
    if (!raw) {
      this.clear("The output supplies the observed result. This administration did not forward individual personnel certificates; the chronicle explains the procedure.", "Earlier administration");
      return;
    }
    try {
      if (raw.length > 8192) throw new Error("Personnel record exceeds the response charter.");
      const data = parseDossier(JSON.parse(raw));
      if (data.purpose !== "MANDATE") throw new Error("A mandate needs its own recorded proceedings.");
      return data;
    } catch {
      this.clear("The accompanying personnel record could not be inspected. Numerical output remains independently available.", "Evidence unavailable");
    }
  }
  rehearsalRecord(value) {
    const data = parseDossier(value);
    if (data.purpose !== "REHEARSAL") throw new Error("The desk returned an unrecognized rehearsal record.");
    return data;
  }
  prepare(data, source) {
    this.dossier = data;
    this.visible = 0;
    this.source = source || (data.purpose === "REHEARSAL" ? "Read-only rehearsal" : "Mandate record");
    this.text("personnel-origin", `${this.source} \xB7 Applicant ${data.candidate} \xB7 Position: Initial ordinal \xB7 Case ${data.caseId}`);
    this.text("personnel-verdict", "Reading completed record");
    this.text("personnel-status", "Reading completed proceedings \xB7 0 of 7 offices disclosed.");
    this.text("personnel-step", "Step through");
    this.rows = data.steps.map((step, index) => {
      const item = document.createElement("li");
      item.dataset.read = "false";
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      details.addEventListener("toggle", () => this.synchronizeDisclosure());
      const number = document.createElement("span");
      number.className = "personnel-index";
      number.textContent = String(index + 1).padStart(2, "0");
      number.setAttribute("aria-hidden", "true");
      const office2 = document.createElement("span");
      office2.className = "personnel-office";
      office2.textContent = step.office;
      const badge = document.createElement("span");
      badge.className = "personnel-badge";
      badge.textContent = "Not yet read";
      summary.append(number, office2, badge);
      details.append(summary);
      const facts = document.createElement("dl");
      for (const [label, text2] of [["Rule", step.rule], ["Received", step.received], ["Recorded decision", step.state === "APPROVED" ? "Approved" : step.state === "REJECTED" ? "Rejected" : "Not reached"], ["Finding", step.finding], ["Issued document", step.document]]) {
        const row = document.createElement("div"), term = document.createElement("dt"), value = document.createElement("dd");
        term.textContent = label;
        value.textContent = text2;
        row.append(term, value);
        facts.append(row);
      }
      const note = document.createElement("p");
      note.className = "personnel-record-note";
      note.textContent = "This is a completed Java decision record. Opening the document does not rerun the office.";
      details.append(facts, note);
      item.append(details);
      return { item, badge, details };
    });
    this.el("personnel-steps").replaceChildren(...this.rows.map((row) => row.item));
    this.el("personnel-steps").hidden = false;
    this.setBusy(false);
    this.synchronizeDisclosure();
  }
  disclose(count) {
    if (!this.dossier) return;
    this.visible = Math.max(0, Math.min(count, 7));
    this.rows.forEach((row, index) => {
      const read = index < this.visible;
      const state = this.dossier.steps[index].state;
      row.item.dataset.read = String(read);
      row.item.dataset.verdict = read ? state : "UNREAD";
      row.badge.textContent = read ? state === "APPROVED" ? "Approved" : state === "REJECTED" ? "Rejected" : "Not reached" : "Not yet read";
    });
    const last = this.dossier.steps[Math.max(0, this.visible - 1)];
    this.text("personnel-status", this.visible === 7 ? this.dossier.status === "APPROVED" ? "All seven offices disclosed. Commencement authorized at 1." : `Personnel application rejected by ${this.dossier.steps.find((step) => step.state === "REJECTED").office}. Subsequent offices were not reached.` : `Reading completed proceedings \xB7 ${this.visible} of 7 offices disclosed${this.visible ? `. ${last.office}: ${last.state === "APPROVED" ? "approved" : last.state === "REJECTED" ? "rejected" : "not reached"}` : ""}.`);
    this.text("personnel-verdict", this.visible === 7 ? this.dossier.status === "APPROVED" ? "Approved to start at 1" : "Application rejected" : "Reading completed record");
    this.text("personnel-step", this.visible > 0 && this.visible < 7 ? "Next office" : "Step through");
    this.actions.disclosed?.(this.dossier, this.visible);
  }
  async read(data, clock, source) {
    this.prepare(data, source);
    for (let i = 0; i < data.steps.length; i++) {
      await clock.waitWhilePaused();
      if (!clock.current()) return;
      await clock.beforeDecision?.(data.steps[i], data);
      if (!clock.current()) return;
      this.disclose(i + 1);
      if (i < data.steps.length - 1) await clock.delay();
    }
  }
  startStepThrough() {
    if (this.dossier) this.prepare(this.dossier, `Step-through inspection of ${this.dossier.purpose === "REHEARSAL" ? "rehearsal" : "mandate record"}`);
  }
  step() {
    this.disclose(this.visible + 1);
  }
  stopReading() {
    this.setBusy(false);
    if (this.dossier && this.visible < 7) this.text("personnel-status", `Reading adjourned after ${this.visible} of 7 offices. Replay or inspect the completed record when ready.`);
    else if (!this.dossier) this.clear("Proceedings adjourned before a personnel file was disclosed.");
  }
};

// web/precedent.ts
function parsePrecedent(value) {
  const d = value;
  if (!d || d.schema !== "slopbuzz-precedent/v1" || !["MANDATE", "REHEARSAL"].includes(d.purpose) || typeof d.caseId !== "string" || !["APPROVED", "REJECTED"].includes(d.status) || !Number.isSafeInteger(d.limit) || d.limit < 0 || d.limit > 1e3 || !Number.isSafeInteger(d.repositoryLimit) || !Number.isSafeInteger(d.bodyCharacters) || d.bodyCharacters < 0 || !Array.isArray(d.steps) || d.steps.length !== 5 || d.steps.some((s) => !s || !["APPROVED", "REJECTED", "NOT_REACHED"].includes(s.state) || ["office", "rule", "received", "finding", "document"].some((k) => typeof s[k] !== "string"))) throw new Error("The court returned an unrecognized case file.");
  const rejected = d.steps.findIndex((s) => s.state === "REJECTED");
  if (d.status === "APPROVED" ? d.certifiedLines !== d.limit || d.steps.some((s) => s.state !== "APPROVED") : d.certifiedLines !== null || rejected < 0 || d.steps.some((s, i) => s.state !== (i < rejected ? "APPROVED" : i === rejected ? "REJECTED" : "NOT_REACHED"))) throw new Error("The court returned inconsistent decisions.");
  return d;
}
function element2(tag, text2) {
  const n = document.createElement(tag);
  if (text2 !== void 0) n.textContent = text2;
  return n;
}
var PrecedentView = class {
  constructor(prefix = "") {
    this.prefix = prefix;
    this.form = document.getElementById(prefix + "precedent-form");
    this.button = document.getElementById(prefix + "precedent-submit");
    this.list = this.el("precedent-steps");
    this.expand = this.el("precedent-expand");
    this.form?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!this.busy) void this.rehearse();
    });
    this.expand.addEventListener("click", () => {
      const details = [...this.list.querySelectorAll("details")];
      const open = details.some((d) => !d.open);
      details.forEach((d) => d.open = open);
      this.synchronize();
    });
    this.el("precedent-latest").addEventListener("click", () => {
      if (this.latest) {
        ++this.serial;
        this.setBusy(false);
        this.show(this.latest);
      }
    });
  }
  prefix;
  el(id) {
    return byId(this.prefix + id);
  }
  text(id, value) {
    this.el(id).textContent = String(value);
  }
  serial = 0;
  busy = false;
  latest;
  form;
  button;
  list;
  expand;
  setBusy(busy) {
    this.busy = busy;
    this.button?.setAttribute("aria-disabled", String(busy));
    this.list.setAttribute("aria-busy", String(busy));
  }
  synchronize() {
    const details = [...this.list.querySelectorAll("details")], all = details.length > 0 && details.every((d) => d.open);
    this.expand.setAttribute("aria-expanded", String(all));
    this.expand.textContent = all ? "Collapse court documents" : "Expand court documents";
  }
  waiting(extended = false) {
    ++this.serial;
    this.latest = void 0;
    this.setBusy(false);
    this.clear(extended ? "Extended proceedings bypass retained institutional memory. No prior-work court is convened." : "Awaiting a repository result. The court convenes only if prior text is offered.");
  }
  mandate(data, cache) {
    ++this.serial;
    this.setBusy(false);
    this.latest = data;
    this.el("precedent-latest").setAttribute("aria-disabled", String(!data));
    if (data) this.show(data);
    else this.clear(cache === "HIT" ? "An earlier administration reused institutional memory without forwarding current court papers. Historical approvals are not reconstructed." : cache === "MISS" ? "The repository offered no prior text. Fresh production proceeded without convening a reuse court." : "The repository was bypassed. No prior-work license was required.");
  }
  clear(message) {
    this.text("precedent-source", message);
    this.text("precedent-status", "No court case is open.");
    this.list.replaceChildren();
    this.expand.hidden = true;
    this.el("precedent-latest").setAttribute("aria-disabled", String(!this.latest));
    this.synchronize();
  }
  show(d) {
    this.text("precedent-source", `${d.purpose === "MANDATE" ? "Actual mandate reuse proceedings" : "Read-only specimen rehearsal"} \xB7 Case ${d.caseId} \xB7 Requested ${d.limit} lines \xB7 Repository key ${d.repositoryLimit}. These are current reuse decisions, not the original production history.${d.purpose === "MANDATE" && d.status === "REJECTED" ? " This cached candidate was refused before the ordinary fresh-production path was attempted. The numerical result is shown above." : ""}`);
    const objection = d.steps.find((s) => s.state === "REJECTED");
    this.text("precedent-status", d.status === "APPROVED" ? `Reuse approved. Certificate of Authorized Non-Performance issued for ${d.certifiedLines} lines.` : `Reuse rejected by ${objection.office}. ${objection.finding}`);
    const rows = d.steps.map((step, index) => {
      const item = element2("li");
      item.dataset.verdict = step.state;
      const details = element2("details"), summary = element2("summary");
      const order = element2("span", String(index + 1).padStart(2, "0"));
      order.className = "personnel-index";
      order.setAttribute("aria-hidden", "true");
      const office2 = element2("span", step.office);
      office2.className = "personnel-office";
      const state = element2("span", step.state === "APPROVED" ? "Approved" : step.state === "REJECTED" ? "Rejected" : "Not reached");
      state.className = "personnel-badge";
      summary.append(order, office2, state);
      details.append(summary);
      const facts = element2("dl");
      for (const [label, text2] of [["Published rule", step.rule], ["Received", step.received], ["Finding", step.finding], ["Issued document", step.document]]) {
        const row = element2("div");
        row.append(element2("dt", label), element2("dd", text2));
        facts.append(row);
      }
      details.append(facts);
      details.addEventListener("toggle", () => this.synchronize());
      item.append(details);
      return item;
    });
    this.list.replaceChildren(...rows);
    this.expand.hidden = false;
    this.synchronize();
  }
  async rehearse() {
    const serial = ++this.serial, scenario = this.el("precedent-scenario").value;
    this.setBusy(true);
    this.text("precedent-status", "The court is examining a read-only specimen. Your numerical output and cache are retained.");
    try {
      const response = await request(`/precedent/rehearsal?scenario=${encodeURIComponent(scenario)}`);
      if (!response.ok) throw new Error(`Court desk returned ${response.status}.`);
      const data = parsePrecedent(await response.json());
      if (data.purpose !== "REHEARSAL") throw new Error("The specimen desk returned a different purpose.");
      if (serial === this.serial) this.show(data);
    } catch (error) {
      if (serial === this.serial) this.text("precedent-status", `The court rehearsal could not be opened: ${error.message} No numerical mandate was submitted.`);
    } finally {
      if (serial === this.serial) this.setBusy(false);
    }
  }
};

// web/chronicle-language.ts
var lines = (source) => Object.freeze(source.trim().split("\n").map((line) => line.trim()));
var narrativeTemplates = {
  premises: lines(`
{facts} Facilities has proved that the empty room was empty, an achievement it intends to occupy prominently in its annual report.
The numerical tenant has completed its property formalities. {facts}
{facts} An absence of characters has been established through a sufficient presence of officials.
The company has obtained documentary title to the space between nothing and something. {facts}
{facts} The premises were inspected before anyone had the opportunity to write on them.
Our new address contains no addressable occupants yet. {facts}
{facts} Facilities has issued permission for the deliverable to have somewhere to be.
An empty buffer has secured the institutional recognition previously denied to empty buffers. {facts}
{facts} The vacancy certificate is a historical finding; the company expects its successful premises to become less vacant shortly.
The lease covers exactly the room the inspector visited, a detail Legal has underlined twice. {facts}
{facts} No character acquired tenancy through the mere availability of floor space.
The organization can now distinguish an empty string from an empty string without the appropriate documents. {facts}
`),
  premisesDiscovery: lines(`
{facts} The invisible tenant was visible to the department whose entire operating model requires finding one.
Facilities discovered that nothing was already being occupied. {facts}
{facts} The room contained an unauthorized absence with a Unicode identity.
An apparently vacant property has produced a surprisingly articulate eviction file. {facts}
{facts} The inspector declined to accept invisibility as evidence of non-residence.
The hidden occupant's code point has been entered into the minutes with unusual satisfaction. {facts}
{facts} A character had acquired premises without acquiring permission to be a character here.
The company has removed the squatter while retaining its forwarding designation. {facts}
{facts} The board appreciates an inspection capable of detecting the sort of tenant the board cannot see.
Vacancy has required corrective action, which Facilities regards as a particularly profitable form of emptiness. {facts}
{facts} The occupant left before numerical move-in; its documentary footprint remains considerable.
The property now qualifies as empty for reasons considerably longer than its former contents. {facts}
`),
  one: lines(`
{facts} The starting position has achieved the headcount traditionally associated with being first.
The numerical reception desk can finally point to an occupant. {facts}
{facts} Our opening deliverable has the modest dimensions of a single character and the bearing of a senior appointment.
The enterprise has reached its first visible staffing milestone. {facts}
{facts} A beginning has been located within the beginning and is now available for stakeholder inspection.
The first place is occupied with an exactness management finds reassuring. {facts}
{facts} Our numerical workforce is now large enough to begin its organizational chart.
The transcript has acquired its inaugural tenant. {facts}
{facts} The company recognizes the considerable strategic importance of arriving before two.
A solitary digit has entered public service. {facts}
{facts} The inaugural position is small, yet already sufficient to justify a heading.
We have obtained observable evidence that the sequence has begun. {facts}
`),
  cache: lines(`
{facts} Yesterday's answer has returned with the confidence of a consultant billing for institutional knowledge.
Institutional Memory has spared the production departments another performance. {facts}
{facts} The result enjoys a second public appearance without incurring a second numerical career.
The company has selected recollection as its delivery methodology. {facts}
{facts} Remembering the answer remains our most mature productivity initiative.
Prior work has secured another engagement. {facts}
{facts} The workforce may admire its earlier achievement from a respectful administrative distance.
The institutional drawer has supplied the deliverable. {facts}
{facts} This is the company's celebrated ability to answer the same question without developing new opinions.
An existing answer has been invited back onto the stage. {facts}
{facts} Numerical productivity is being achieved through the disciplined conservation of previous productivity.
The enterprise is benefiting from a result it already knows how to have. {facts}
`),
  cacheProvenance: lines(`
{facts} A fresh reading does not acquire a fresh past.
The clerk distinguishes this disclosure from the work that originally produced it. {facts}
{facts} Corporate memory is useful enough without a fictional autobiography.
The answer's current appearance and its historical manufacture occupy separate columns. {facts}
{facts} Repetition is permitted to improve visibility without pretending to improve chronology.
The provenance desk has declined to embellish the earlier shift. {facts}
{facts} An attractive new paragraph confers no authority to invent an old receipt.
We acknowledge the present disclosure and preserve the limits of the supplied history. {facts}
{facts} Institutional nostalgia is being kept within its evidentiary budget.
The transcript may repeat itself; the supporting history receives no imaginary additions. {facts}
{facts} Our commitment to storytelling remains subject to the existence of the story's documents.
The company is remembering a result rather than reenacting its original employment arrangements. {facts}
`),
  personnel: lines(`
{facts} A literal has acquired the sort of documentary support usually reserved for a disputed acquisition.
Personnel's contribution can now be inspected rather than inferred from the presence of a digit. {facts}
{facts} Recruitment has reached the exceptional stage at which its paperwork supports an actual beginning.
The case papers have entered the minutes with their own reasons intact. {facts}
{facts} The starting value is accompanied by a defensible explanation of why it was allowed to start.
The personnel record is available for a level of scrutiny normally disproportionate to one. {facts}
{facts} The company has made numerical commencement an intelligible employment matter.
The recorded personnel findings follow in their own institutional voices. {facts}
{facts} This is what a starting constant looks like after receiving adequate organizational attention.
The workforce evidence has arrived, including the reasons behind the decisions. {facts}
{facts} An appointment that once fit in a character now comes with a reading obligation.
The personnel department has supplied the papers on which this account actually relies. {facts}
`),
  legacy: lines(`
{facts} The earlier administration's filing limits are respected even when they inconvenience our literary ambitions.
The answer is visible; the scope of the accompanying record is stated here. {facts}
{facts} The clerk offers useful context without commissioning a fictional past.
An earlier administration has supplied a result with a more modest documentary entourage. {facts}
{facts} Corporate history receives an explanatory caption rather than a manufactured certificate.
The present narrator has reached the edge of the earlier paperwork. {facts}
{facts} We may explain the organization while declining to pretend we observed its every historical gesture.
The earlier response is being read within the limits of what it actually forwarded. {facts}
{facts} The company's enthusiasm for detail has encountered a legitimate archival boundary.
An older record can still support a useful account of the visible outcome. {facts}
{facts} The minutes distinguish evidence from the procedures a newer administration would explain.
The institutional archive is being treated as an archive, with all its inconvenient omissions. {facts}
`),
  procedure: lines(`
{facts} This is procedural context, supplied for comprehension rather than retrospective decoration.
The current operating model provides the following explanation. {facts}
{facts} These are the company's arrangements, described without impersonating an absent historical witness.
For orientation, the clerk consults the published procedure. {facts}
{facts} The explanatory diagram has been kept distinct from an actual attendance sheet.
The process can be understood even where individual earlier receipts were not supplied. {facts}
{facts} Corporate context is available without rewriting the date on anyone's paperwork.
The current procedure supplies a map of the offices involved. {facts}
{facts} A map remains useful while openly admitting that it is a map.
The following institutional context accompanies the recorded limits above. {facts}
{facts} The company has authorized explanation without granting it the powers of time travel.
The clerk describes the operating arrangements as procedure. {facts}
`),
  assembly: lines(`
{facts} The abstraction budget has been deployed before anyone is permitted to say anything brief.
The factories have supplied the organizational shape required for this ordinal. {facts}
{facts} Our approach to a small answer begins with a properly furnished collection of contexts.
The implementation has assembled the machinery through which this number will speak. {facts}
{facts} Each abstraction may now experience the dignity of having been necessary to the architecture.
The context assembly has entered the actual record. {facts}
{facts} A direct answer would have left several excellent interfaces with nothing to do.
The factories have established the appropriate distance between an integer and its printed form. {facts}
{facts} The company considers this a suitably substantial introduction to a short line of text.
The appointed contexts are ready for the recorded proceedings. {facts}
{facts} Numerical simplicity has received the infrastructure its simplicity so plainly demanded.
The enterprise has given this ordinal its required structural representation. {facts}
`),
  classification: lines(`
{facts} The number's enthusiasm has no standing beyond the permissions actually recorded.
Classification has entered its findings before the result takes public form. {facts}
{facts} The company's branding privileges remain conditional on arithmetic rather than seniority.
The ordinal has encountered the eligibility arrangements governing its public identity. {facts}
{facts} A positive attitude cannot confer divisibility.
The recorded classification determines which output departments may participate. {facts}
{facts} Our market positioning continues to depend on the number in front of us.
The identity question has received its formal numerical answer. {facts}
{facts} Every permitted contribution must live within the arithmetic franchise.
The recorded permissions are available for inspection. {facts}
{facts} The company can now distinguish a qualified brand contribution from an ambitious suggestion.
The classification findings supply the actual basis for what follows. {facts}
`),
  procurement: lines(`
{facts} Matching characters do not create a transferable entitlement to one another's paperwork.
Procurement has translated a small word into separately accountable commercial obligations. {facts}
{facts} The repeated letters retain individual dignity and individual receiving evidence.
The word's material supply chain is present in the record. {facts}
{facts} Economies of scale do not excuse borrowing a neighboring character's acceptance papers.
The character positions have received the procurement attention their apparent simplicity invited. {facts}
{facts} A word may be short while its bill of materials remains professionally ambitious.
The approved glyphs have passed through their recorded commercial arrangements. {facts}
{facts} The company is finally able to discuss spelling in the language of accountable acquisition.
The receiving evidence accounts for the letters used here. {facts}
{facts} Repetition within a word offers no exemption from position-specific responsibility.
The procurement record explains how these characters reached this proclamation. {facts}
`),
  numeral: lines(`
{facts} The enterprise has protected the digit from the reputational exposure of a direct answer.
The number has acquired the representation in which the public will encounter it. {facts}
{facts} A familiar-looking numeral may still represent a commendable quantity of mediation.
The recorded conversion has made the ordinal suitable for textual office life. {facts}
{facts} Our representation policy gives an ordinary number ample opportunity to become an organizational concern.
The numeral's preparation appears in the actual proceedings. {facts}
{facts} The company respects the difference between having a number and being prepared to print it.
The conversion desk has supplied the recorded textual representation. {facts}
{facts} Apparent obviousness is no reason to waive an appropriate layer of indirection.
The ordinal has reached its public spelling through the documented conversion. {facts}
{facts} A plain numeral can now enjoy the support of a less plain implementation.
The record explains the representation through which this number is disclosed. {facts}
`),
  transaction: lines(`
{facts} Even an invisible line ending deserves to know who is responsible for it.
The output has entered its recorded staging arrangements. {facts}
{facts} Corporate completeness is being assembled from separately accountable pieces.
The transaction desk is keeping the proclamation's components within their actual custody. {facts}
{facts} The company prefers its fragments to acquire a collective identity before meeting the public.
The recorded staging facts explain how the line was prepared. {facts}
{facts} A character's willingness to appear does not itself constitute publication authority.
The proclamation's pieces have received their documented treatment. {facts}
{facts} The numerical answer is being handled with the procedural gravity of a much larger deliverable.
The output chamber has supplied the following custody facts. {facts}
{facts} Line assembly is an occasion on which our appetite for completeness is unusually well placed.
The transaction record accounts for the components of this proclamation. {facts}
`),
  notary: lines(`
{facts} The notarial role gives correctness an opportunity to survive the enthusiasm that produced it.
The independent lexical check has entered the record. {facts}
{facts} Our confidence is strengthened by asking a separate authority to distrust it appropriately.
The proclamation's exact wording has received its recorded notarial examination. {facts}
{facts} A convincing-looking answer must still endure the inconvenient question of whether it is right.
The notary's finding supplies the actual lexical evidence here. {facts}
{facts} The company has found a useful application for disciplined suspicion.
The independent check concerns the complete proclamation rather than the ambition of its authors. {facts}
{facts} Correctness remains a condition of publication even at our impressive level of ceremony.
The recorded notarial finding is available alongside the other department papers. {facts}
{facts} A short line has received the benefit of a second, independently skeptical look.
The lexical inspection has supplied the evidence attributed to it. {facts}
`),
  publication: lines(`
{facts} The answer has reached the public-facing part of its administrative career.
The publication desk's actual action is entered here. {facts}
{facts} A brief proclamation has emerged from an organization with no corresponding ambition toward brevity.
The record identifies the point at which the text left its preparation arrangements. {facts}
{facts} The company can now point to a deliverable in addition to a description of its controls.
The publication facts explain this line's public appearance. {facts}
{facts} Stakeholders receive the answer with the dignity due to a completed little sentence.
The output's recorded release is available for scrutiny. {facts}
{facts} Our public-facing achievement remains compact enough to fit beside its own heading.
The proceedings have reached the recorded publication action. {facts}
{facts} A visible answer is an encouraging development in any organization devoted to explaining itself.
The line's appearance follows the publication facts recorded here. {facts}
`),
  audit: lines(`
{facts} The numerical past has acquired another piece of evidence on which future doubt may exercise itself.
The audit record supplies its actual addition to institutional memory. {facts}
{facts} The company is giving this small event a properly accountable relationship with its predecessors.
The journal's recorded action belongs in the minutes. {facts}
{facts} An answer may be fleeting; its numerical record has a more serious attitude toward continuity.
The ledger has supplied the following facts about this proclamation. {facts}
{facts} Our historical confidence now has a concrete entry to refer to.
The audit evidence describes the action actually taken by the journal. {facts}
{facts} The company has made remembering this line a distinct professional responsibility.
The recorded journal action gives this proclamation its place in the retained history. {facts}
{facts} Numerical accountability is being maintained one inconveniently inspectable event at a time.
The audit department's observed contribution is reported here. {facts}
`),
  queued: lines(`
{facts} Placement in a mailbox does not confer the life experience of having been delivered.
The message-custody record states what has actually happened. {facts}
{facts} The company distinguishes a place in the queue from a receipt at the destination.
The queue's recorded action is available without an embellished delivery claim. {facts}
{facts} A message may have administrative standing while still having somewhere to go.
The numerical minutes have encountered the recorded messaging arrangements. {facts}
{facts} Our enthusiasm for distribution remains subject to the evidence of actual receipt.
The mailbox's contribution is recorded in its proper scope. {facts}
{facts} The company is keeping dispatch vocabulary within the limits of the supplied facts.
The messaging record explains this event's actual custody position. {facts}
{facts} In a serious organization, a queue is entitled to remain a queue until something more has happened.
The observed message handling appears here with its original finding intact. {facts}
`),
  commit: lines(`
{facts} The transaction's resolution has acquired the permanence actually stated by the record.
The commitment facts are entered without enlarging their scope. {facts}
{facts} The company appreciates a decision that can say precisely what it has committed to.
The recorded transaction resolution follows. {facts}
{facts} A small deliverable has reached a consequential point in its paperwork.
The transaction desk's actual commitment is recorded here. {facts}
{facts} Our ability to conclude a transaction remains an achievement worthy of its own paragraph.
The proceedings identify the transaction outcome through the supplied finding. {facts}
{facts} Administrative certainty is most useful when attached to a specific completed action.
The transaction's recorded conclusion is available to the reader. {facts}
{facts} The company has reached the part of the ceremony where this particular obligation can be settled.
The actual commitment finding belongs to this proclamation. {facts}
`),
  cleanup: lines(`
{facts} Even the machinery supporting a short answer deserves an orderly end to its immediate assignment.
The cleanup finding records the transaction desk's actual housekeeping. {facts}
{facts} The company considers leaving appropriate room for subsequent work a defensible operating habit.
The transaction's recorded cleanup appears here. {facts}
{facts} Administrative residue is being accounted for within the scope stated by the finding.
The desk has supplied its actual closing housekeeping record. {facts}
{facts} Our commitment to procedure includes knowing when this particular procedure has finished using its workspace.
The cleanup evidence is retained in the proceedings. {facts}
{facts} A completed line should not require its successors to inherit avoidable transaction clutter.
The recorded housekeeping belongs to this output's supporting machinery. {facts}
{facts} The company is prepared to take even the tidying up of indirection seriously.
The transaction desk's cleanup action has entered the minutes. {facts}
`),
  succession: lines(`
{facts} The next integer's ambitions remain subject to the advancement actually authorized.
The succession record supplies the basis for moving beyond this ordinal. {facts}
{facts} The company has given counting onward the documentary support usually associated with promotion.
The ordinal transition appears with its actual authorization intact. {facts}
{facts} Being next is an administrative position with an arithmetic qualification.
The advancement evidence explains the transition permitted here. {facts}
{facts} Our numerical career ladder continues to favor precisely the appropriate amount of progress.
The successor's recorded authority has entered the minutes. {facts}
{facts} Corporate ambition has been reconciled with the specific advancement in the finding.
The proceedings account for the next ordinal through their actual succession evidence. {facts}
{facts} A sequence can grow responsibly while remaining exceptionally tiresome to explain.
The recorded transition supplies this number's contribution to onward institutional movement. {facts}
`),
  extendedNotary: lines(`
{facts} This transient window receives lexical scrutiny without acquiring a fictional retained audit history.
The extended path's independent wording check is recorded in its proper scope. {facts}
{facts} An enormous ordinal can be inspected without pretending it passed through the retained transaction desk.
The finite window's lexical witness supplies the following finding. {facts}
{facts} The company's enthusiasm for magnitude has not eliminated its obligation to check the text.
The independent extended-path inspection appears here. {facts}
{facts} This is exact textual scrutiny within a transient response, with no invented database ceremony.
The extended proclamation's observed lexical evidence is available. {facts}
{facts} A large number receives a finite, honestly described inspection.
The window's actual independent finding accompanies its visible text. {facts}
{facts} Corporate scale may be vast while the scope of this particular receipt remains precise.
The extended lexical record states what was actually inspected. {facts}
`),
  extendedSuccession: lines(`
{facts} The exact advancement belongs to this transient path, without borrowed bounded-integer certificates.
The extended window records its own numerical movement. {facts}
{facts} Magnitude does not justify an approximate relationship with the next ordinal.
The BigInteger path's actual advancement appears here. {facts}
{facts} The company can proceed beyond ordinary magnitude without rounding its career ladder.
The transient succession finding describes the exact movement observed. {facts}
{facts} This transition is reported under its own implementation's arrangements.
The window's advancement record supplies the actual next-step facts. {facts}
{facts} Large-scale ambition is being expressed through a precisely described small advancement.
The extended path has furnished its own movement evidence. {facts}
{facts} The narrator has declined to dress an exact BigInteger step in a bounded office's borrowed uniform.
The transient ordinal transition is recorded as it actually occurred. {facts}
`),
  fallback: lines(`
{facts} The clerk preserves the observed result without recruiting additional evidence from imagination.
The supplied record supports this account of the visible proclamation. {facts}
{facts} The company's literary confidence remains limited by what was actually forwarded.
The observed line and its available documents are acknowledged here. {facts}
{facts} A modest record can still be described with appropriate institutional care.
The transcript contains the outcome stated in the accompanying facts. {facts}
{facts} Nothing in the narrator's enthusiasm authorizes an extra historical decision.
The available evidence receives the following account. {facts}
{facts} The company has retained the result and the boundaries of its explanation together.
The proclamation is reported within the scope of its supplied documents. {facts}
{facts} Corporate prose can be expansive while its factual claims remain disciplined.
The clerk has entered the visible result with the evidence actually available. {facts}
`),
  reception: lines(`
{facts} The institution has encountered another opportunity to make a straightforward request feel properly received.
Reception opens its account of the mandate. {facts}
{facts} A small numerical instruction has acquired the company's undivided procedural attention.
The incoming request has reached the explanatory part of its journey. {facts}
{facts} The company will now demonstrate the organizational consequences of taking an upper limit seriously.
Reception has the following facts for the minutes. {facts}
{facts} Our capacity to surround a simple instruction with context remains available on demand.
The mandate arrives with the following recorded scope. {facts}
{facts} The enterprise has found a suitably compact starting point for a much less compact explanation.
The clerk begins with what the request actually asks. {facts}
{facts} An upper limit is an excellent occasion for the company to exhibit very few corresponding limits on prose.
The numerical request has entered reception's account. {facts}
`),
  replay: lines(`
{facts} Institutional memory is permitted another reading without being assigned another working day.
The clerk returns to the retained proceedings. {facts}
{facts} A second account of the same record requires attention rather than fresh numerical manufacture.
The existing minutes have been reopened for inspection. {facts}
{facts} The company supports renewed comprehension without a renewed production invoice.
The reader is revisiting evidence already retained. {facts}
{facts} Our capacity to repeat ourselves is being exercised under an unusually honest description.
The completed record is available for another reading. {facts}
{facts} Familiar proceedings may receive fresh attention while keeping their original outcomes.
The clerk is returning to the same institutional record. {facts}
{facts} The company can explain an achievement again without having to achieve it again.
The retained evidence is being brought back into view. {facts}
`),
  courtApproved: lines(`
{facts} The company has made permission to avoid fresh numerical work a properly supported institutional achievement.
The prior-work court's approved outcome enters the minutes. {facts}
{facts} Remembering an answer can now enjoy an accountable relationship with the permission to reuse it.
The actual reuse findings have reached their approved conclusion. {facts}
{facts} Non-performance has acquired the documentary distinction its advocates always believed it deserved.
The court's recorded approvals accompany this reuse of institutional memory. {facts}
{facts} The organization is prepared to take the avoidance of unnecessary production very seriously indeed.
The current reuse petition has received the approvals recorded here. {facts}
{facts} The company has found a professionally satisfying amount of work in deciding not to repeat numerical work.
The court's actual reuse authority is entered into this account. {facts}
{facts} A remembered result now has an appropriately substantial present-tense permission slip.
The approved institutional-memory case supplies its current findings. {facts}
`),
  courtRejected: lines(`
{facts} Institutional memory is useful enough without granting every drawer the authority to be correct.
The prior-work court's actual objection is entered here. {facts}
{facts} A familiar-looking answer has encountered a justified limit on the company's nostalgia.
The recorded court decision declines this proposed reuse. {facts}
{facts} Management's confidence in yesterday has been subjected to the inconvenience of examination.
The reuse petition has reached the rejection stated by its actual papers. {facts}
{facts} The company is prepared to remember that a particular memory should not be adopted.
The objection to the offered precedent appears in the current proceedings. {facts}
{facts} A filing cabinet is being kept distinct from an authority on numerical truth.
The court has supplied the actual grounds on which reuse was refused. {facts}
{facts} Institutional affection for prior work has met an appropriately specific evidentiary objection.
The current precedent has been declined within the scope of the recorded findings. {facts}
`),
  office: lines(`
{facts} The office's recorded state is allowed to speak without a decorative upgrade.
The case file supplies this office entry. {facts}
{facts} A reason and a document are more useful than an executive impression of progress.
The recorded office position appears with its actual scope intact. {facts}
{facts} The narrator has granted this entry no powers beyond its stated decision.
The office record is entered in the language of its actual finding. {facts}
{facts} The company distinguishes an issued authority from an office that was never reached.
The case papers account for this office as follows. {facts}
{facts} Institutional precision includes acknowledging the decisions that did not occur.
The office's place in this case is described by the supplied papers. {facts}
{facts} The account has preserved the finding rather than substituting a reassuring-looking badge.
This entry retains the office state and document actually recorded. {facts}
`),
  runtime: lines(`
{facts} The execution arrangements are reported without hiring an imaginary second infrastructure department.
The selected implementation supplies the following operating context. {facts}
{facts} The company has kept its explanation attached to the machinery actually appointed.
The operating arrangements enter the minutes under their own names. {facts}
{facts} An implementation may be interchangeable while the description of this execution remains specific.
The current execution context is available for inspection. {facts}
{facts} Our enthusiasm for infrastructure has been limited to the infrastructure declared here.
The record identifies the implementation and its operating arrangements. {facts}
{facts} The narrator is working with the appointed implementation rather than a more impressive imaginary deployment.
The execution context has supplied the following factual introductions. {facts}
{facts} A serious explanation should at least know which machinery performed the work.
The actual operating context accompanies these proceedings. {facts}
`),
  omitted: lines(`
{facts} The institution has acknowledged the limits of its filing space before filling them with invention.
The finite observation allowance has the following consequence. {facts}
{facts} The company's appetite for documentation has encountered the browser's capacity to retain it.
The clerk reports the observation limit openly. {facts}
{facts} An omission in the explanatory record does not authorize an omission in honesty about that record.
The supplied dossier has reached the documented allowance. {facts}
{facts} Corporate verbosity remains subject to an actual storage boundary.
The observation allowance is disclosed in the following terms. {facts}
{facts} The company can describe the edge of its evidence without pretending the edge is another approval.
The finite record has supplied its own limitation notice. {facts}
{facts} Our documentation strategy includes recognizing when a filing cabinet is full.
The clerk records the limit on retained observations. {facts}
`),
  rehearsal: lines(`
{facts} Management may inspect a bad idea without requiring the real numerical service to live through it.
The isolated personnel application supplies the scope of this reading. {facts}
{facts} The company has provided an unusually productive home for speculative interventions.
The rehearsal is being reported under its actual read-only remit. {facts}
{facts} An experiment in paperwork can be educational without becoming a new numerical assignment.
The specimen proceedings begin with the following boundaries. {facts}
{facts} Corporate curiosity has acquired a suitable distance from the retained numerical history.
The management rehearsal has supplied its limited purpose. {facts}
{facts} The company supports examining an intervention before allowing it to become an incident.
The read-only application has entered its own explanatory account. {facts}
{facts} A rehearsal is a respectable place to discover that management's confidence requires qualification.
The personnel specimen is being read within its recorded scope. {facts}
`),
  zeroFresh: lines(`
{facts} The absence of deliverables has received a remarkably well-supported beginning.
The zero-work mandate has reached its actual conclusion. {facts}
{facts} The company has demonstrated that an empty workload need not imply an empty organizational purpose.
The recorded zero-number outcome enters the minutes. {facts}
{facts} Nothing has been printed with a level of institutional care difficult to express in nothing.
The fresh zero-work proceedings supply the following facts. {facts}
{facts} Our ability to coordinate the absence of output remains one of our most exact achievements.
The company has reached the recorded outcome of this zero-number assignment. {facts}
{facts} An unused starting position can still illustrate the impressive scale of our commitment to starting positions.
The zero-work record explains the activity surrounding its lack of numerical lines. {facts}
{facts} The enterprise has achieved a carefully supported numerical silence.
The actual zero-number proceedings have concluded in the following terms. {facts}
`),
  zeroCache: lines(`
{facts} The company has remembered how to achieve nothing without asking production to rediscover it.
Institutional memory has supplied the zero-work result. {facts}
{facts} The empty answer has returned with precisely the same commendable absence of numerical ambition.
The cached zero-number mandate receives its own current disclosure. {facts}
{facts} Reusing nothing is a respectable application of the company's conservation policies.
The institution has recalled its prior zero-work achievement. {facts}
{facts} The answer's lack of characters is being preserved with admirable consistency.
The remembered zero-number result is reported here. {facts}
{facts} Nothing's second appearance has avoided the expense of another numerical production campaign.
The zero-work memory has supplied the following outcome. {facts}
{facts} Corporate recollection has proved equal to the considerable challenge of an empty deliverable.
The cached absence of numerical lines is being disclosed again. {facts}
`),
  zeroLegacy: lines(`
{facts} The empty result is visible without a fictional reconstruction of its older employment records.
The earlier zero-number response supplies the limits of this account. {facts}
{facts} The company can explain the current procedure while remaining honest about the older record.
The observed zero-work result is entered within its actual evidentiary scope. {facts}
{facts} A lack of output does not confer unlimited permission to imagine the supporting history.
The earlier administration's empty result is being read as supplied. {facts}
{facts} Institutional explanation remains possible without forging a commencement certificate.
The older zero-work response receives the following factual account. {facts}
{facts} The narrator has kept numerical silence distinct from documentary omniscience.
The available zero-number evidence and procedural context are recorded here. {facts}
{facts} An empty answer is entitled to an honest account of what accompanied it.
The earlier zero-work result has reached the current minutes within its recorded limits. {facts}
`),
  finish: lines(`
{facts} The company has reached the point at which further explanation can become optional inspection.
The clerk closes this reading with the following actual scope. {facts}
{facts} A completed disclosure may now enjoy the professional dignity of being left available to read.
The requested reading has reached its stated conclusion. {facts}
{facts} Corporate continuity is preserved without demanding another numerical performance.
The current proceedings can now be revisited under these arrangements. {facts}
{facts} The answer has been given; its account remains open to comprehension.
The disclosure record has reached the following conclusion. {facts}
{facts} The company considers an inspectable finish a defensible milestone.
The clerk enters the concluding facts of this reading. {facts}
{facts} Our institutional explanation is ready to become institutional reading material.
The requested disclosures have reached the limits stated here. {facts}
`),
  resume: lines(`
{facts} The present has been allowed back into view at the reader's own invitation.
The clerk returns the display to its latest retained minutes. {facts}
{facts} The company recognizes a useful distinction between renewed reading and renewed production.
The reading position has resumed under the following arrangements. {facts}
{facts} The retained history can catch up without asking the business to start over.
The latest minutes have been restored to the visible reading. {facts}
{facts} Reader authority has supplied the appropriate basis for returning to the current account.
The clerk has brought the retained proceedings back into their latest view. {facts}
{facts} The company can restore the present without confiscating the past.
The renewed following of the minutes is recorded here. {facts}
{facts} The reader's return is a sufficient occasion for resuming the explanation.
The visible account has returned to the latest retained evidence. {facts}
`),
  global: lines(`
{facts} These are the supplied operating facts, entered without additional ceremonial inventions.
The request-level record provides this account. {facts}
{facts} The company has given its actual operating observations a place in the minutes.
The recorded reception and operating path are reported here. {facts}
{facts} The narrator's role is to explain these findings rather than expand their authority.
The observed request-level proceedings supply the following context. {facts}
{facts} The company can be expansive about the record while retaining the record's actual boundaries.
The operating findings enter this account in their supplied form. {facts}
{facts} The explanatory department is relying on the observations actually forwarded.
The current record has furnished these operating facts. {facts}
{facts} Corporate fluency is being exercised within the jurisdiction of the available evidence.
The recorded operating path receives its place in this reading. {facts}
`)
};
var corporateAsides = lines(`
Management regards brevity as an undocumented dependency.
The company's confidence is measured in clauses per sentence.
Our organizational chart remains a growth industry.
An uncomplicated explanation would raise difficult questions about departmental headcount.
The business case for further explanation is, regrettably, self-sustaining.
We continue to treat obviousness as an opportunity for institutional development.
The company expects exceptional returns on the careful administration of small things.
Every abstraction deserves the chance to feel indispensable.
Our competitive advantage remains unusually difficult to summarize on purpose.
We recognize the strategic potential of making a familiar answer feel thoroughly supervised.
The institution maintains a strong professional interest in its own continued necessity.
The cost of a sentence is outside the numerical mandate's present scope.
The company's appetite for context remains comfortably ahead of demand.
Simplicity has proved a remarkably fertile source of administrative employment.
We measure organizational maturity by the number of ordinary things requiring an explanation.
Corporate ambition remains available in quantities exceeding the size of the answer.
The company is pleased with how much organization a small result can support.
An integer's modest needs continue to inspire our most extensive arrangements.
We regard unnecessary confidence and unnecessary committees as separate accounting categories.
The enterprise takes pride in the amount of structure a short answer can carry.
Our documentation has demonstrated considerably more room for growth than the game rules.
The company considers a clear explanation an excellent foundation for a longer explanation.
We remain committed to an impressive ratio of institutional vocabulary to printed characters.
Our confidence in the organization occasionally exceeds the organization's confidence in a direct answer.
The enterprise has found considerable strategic room between a requirement and its implementation.
We recognize that a small task can sustain a surprisingly substantial professional ecosystem.
The company remains a reliable source of its own supporting material.
Our market-leading ability to elaborate continues to require no additional numerical features.
The institution has yet to encounter an obvious fact it could not give a reporting structure.
Management's affection for process remains greater than the answer's apparent need for it.
The company is investing in comprehensibility at a scale the original exercise could scarcely have anticipated.
We thank the number for its patience with the organization built around it.
`);
var ChronicleLanguage = class {
  bags = /* @__PURE__ */ new Map();
  random;
  constructor(random2 = Math.random) {
    this.random = random2;
  }
  pick(key2, options) {
    let bag = this.bags.get(key2);
    if (!bag) {
      bag = { remaining: [] };
      this.bags.set(key2, bag);
    }
    if (!bag.remaining.length) {
      bag.remaining = options.map((_, index2) => index2);
      for (let i = bag.remaining.length - 1; i > 0; i--) {
        const j = Math.floor(this.random() * (i + 1));
        [bag.remaining[i], bag.remaining[j]] = [bag.remaining[j], bag.remaining[i]];
      }
      const end = bag.remaining.length - 1;
      if (end > 0 && bag.remaining[end] === bag.last) [bag.remaining[0], bag.remaining[end]] = [bag.remaining[end], bag.remaining[0]];
    }
    const index = bag.remaining.pop();
    bag.last = index;
    return options[index];
  }
  write(situation, facts) {
    return this.pick(situation, narrativeTemplates[situation]).replace("{facts}", () => facts) + " " + this.pick("corporate-asides", corporateAsides);
  }
};

// web/premises-model.ts
var offices = ["Premises Allocation Office", "Character-by-Character Vacancy Inspector", "Hidden Occupant Eviction Authority", "Vacancy Reinspection Office", "Single-Use Occupancy Lease Authority", "Independent Premises Auditor"];
function parsePremises(value) {
  const d = value;
  const invalid = () => {
    throw new Error("The premises office supplied inconsistent inspection papers.");
  };
  if (!d || d.schema !== "slopbuzz-premises/v1" || typeof d.ordinal !== "string" || !/^\d+$/.test(d.ordinal) || d.ordinal[0] === "0" || !["MANDATE", "REHEARSAL"].includes(d.purpose) || !["APPROVED", "REJECTED"].includes(d.status) || typeof d.vacancyCertified !== "boolean" || !(d.initialLength === null || Number.isSafeInteger(d.initialLength) && d.initialLength >= 0 && d.initialLength <= 256) || !Array.isArray(d.tenants) || d.tenants.length > 256 || !Array.isArray(d.steps) || d.steps.length !== offices.length) invalid();
  let position = 0;
  for (const tenant of d.tenants) {
    if (!tenant || tenant.position !== position || typeof tenant.name !== "string" || typeof tenant.excuse !== "string" || typeof tenant.recognized !== "boolean" || typeof tenant.codePoint !== "string" || !/^U\+[0-9A-F]{4,6}$/.test(tenant.codePoint)) invalid();
    const point = Number.parseInt(tenant.codePoint.slice(2), 16);
    if (point > 1114111) invalid();
    position += point > 65535 ? 2 : 1;
  }
  if (d.initialLength === null && d.tenants.length > 0 || d.initialLength !== null && d.initialLength !== position) invalid();
  let rejected = false;
  for (const [index, step] of d.steps.entries()) {
    if (!step || step.office !== offices[index] || typeof step.finding !== "string" || typeof step.document !== "string") invalid();
    if (rejected) {
      if (step.state !== "NOT_REACHED") invalid();
      continue;
    }
    if (step.state === "REJECTED") {
      rejected = true;
      continue;
    }
    const allowed = index === 1 ? ["APPROVED", "DISCOVERED"] : index === 2 ? ["APPROVED", "NOT_REQUIRED"] : ["APPROVED"];
    if (!allowed.includes(step.state)) invalid();
  }
  if (rejected !== (d.status === "REJECTED") || d.status === "APPROVED" && (d.initialLength === null || d.tenants.some((t) => !t.recognized))) invalid();
  if (d.steps[1].state === "DISCOVERED" && d.tenants.length === 0) invalid();
  if (d.vacancyCertified !== (d.steps[3].state === "APPROVED")) invalid();
  if (["APPROVED", "DISCOVERED"].includes(d.steps[1].state) && d.initialLength === null) invalid();
  if (d.steps[1].state === "APPROVED" && d.tenants.length !== 0) invalid();
  if (d.steps[2].state === "NOT_REQUIRED" && d.tenants.length !== 0) invalid();
  if (d.steps[2].state === "APPROVED" && d.tenants.length === 0) invalid();
  return d;
}

// web/premises.ts
function element3(tag, text2, className) {
  const n = document.createElement(tag);
  if (text2 !== void 0) n.textContent = text2;
  if (className) n.className = className;
  return n;
}
function premisesCard(d, details = false) {
  const card = element3("div", void 0, "premises-card");
  card.dataset.premisesOrdinal = d.ordinal;
  card.dataset.premisesVerdict = d.status;
  card.append(element3("p", `Premises inspection \xB7 Ordinal ${d.ordinal}`, "eyebrow"));
  const verdict = d.status === "REJECTED" ? "Occupancy refused" : d.tenants.length ? "Hidden occupants removed; vacancy certified" : "Vacancy certified; lease issued";
  card.append(element3("p", verdict, "premises-verdict"));
  const plan = element3("dl", void 0, "premises-floorplan");
  const before = d.initialLength === null ? "No valid initial survey received" : d.tenants.length ? `${d.initialLength} UTF-16 unit${d.initialLength === 1 ? "" : "s"} occupied` : "Empty: 0 characters";
  for (const [label, text2] of [["Initial survey", before], ["Before numerical occupancy", d.vacancyCertified ? "Reinspection confirmed 0 characters" : "Vacancy authorization withheld"], ["Lease", d.status === "APPROVED" ? "Issued to this request and this premises" : "No usable lease issued"]]) {
    const row = element3("div");
    row.append(element3("dt", label), element3("dd", text2));
    plan.append(row);
  }
  card.append(plan);
  if (d.tenants.length) {
    const list = element3("ul", void 0, "premises-tenants");
    for (const tenant of d.tenants) {
      const row = element3("li");
      row.append(element3("strong", `${tenant.name} \xB7 ${tenant.codePoint}`), element3("p", `Position ${tenant.position}. ${tenant.excuse}`));
      list.append(row);
    }
    card.append(list);
  }
  card.append(element3("p", d.purpose === "REHEARSAL" ? "Read-only specimen. Its lease is closed after inspection; no numerical output, cache entry or audit transaction is created." : "This is the actual pre-occupancy inspection. Authorized numerical text moves in after vacancy is certified.", "field-help"));
  if (details) {
    const list = element3("ol", void 0, "personnel-steps");
    list.setAttribute("aria-label", "Six premises office decisions");
    for (const [index, step] of d.steps.entries()) {
      const item = element3("li");
      item.dataset.verdict = step.state;
      const disclosure = element3("details"), summary = element3("summary");
      const number = element3("span", String(index + 1).padStart(2, "0"), "personnel-index");
      number.setAttribute("aria-hidden", "true");
      summary.append(number, element3("span", step.office, "personnel-office"), element3("span", step.state.replaceAll("_", " ").toLowerCase(), "personnel-badge"));
      disclosure.append(summary, element3("p", step.finding), element3("p", step.document, "field-help"));
      item.append(disclosure);
      list.append(item);
    }
    card.append(list);
  }
  return card;
}
var PremisesDesk = class {
  busy = false;
  serial = 0;
  constructor() {
    byId("premises-form").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!this.busy) void this.inspect();
    });
  }
  async inspect() {
    const ordinal = byId("premises-ordinal"), scenario = byId("premises-scenario").value;
    if (!/^[1-9][0-9]*$/.test(ordinal.value)) {
      ordinal.setAttribute("aria-invalid", "true");
      setText("premises-error", "Enter a positive whole number with no leading zeros.");
      ordinal.focus();
      return;
    }
    ordinal.removeAttribute("aria-invalid");
    setText("premises-error", "");
    const requestedOrdinal = ordinal.value;
    const serial = ++this.serial;
    this.busy = true;
    byId("premises-submit").setAttribute("aria-disabled", "true");
    byId("premises-result").setAttribute("aria-busy", "true");
    setText("premises-status", "The property offices are inspecting a read-only specimen\u2026");
    try {
      const response = await request(`/premises/rehearsal?scenario=${encodeURIComponent(scenario)}&ordinal=${requestedOrdinal}`);
      if (!response.ok) throw new Error(`Inspection desk returned ${response.status}.`);
      const data = parsePremises(await response.json());
      if (data.purpose !== "REHEARSAL" || data.ordinal !== requestedOrdinal) throw new Error("The specimen belongs to another premises request.");
      if (serial !== this.serial) return;
      byId("premises-result").replaceChildren(premisesCard(data, true));
      const refusal = data.steps.find((s) => s.state === "REJECTED");
      setText("premises-status", refusal ? `Occupancy refused by ${refusal.office}. ${refusal.finding}` : data.tenants.length ? `Inspection identified and removed ${data.tenants.map((t) => `${t.name}, ${t.codePoint}`).join("; ")}. Reinspection passed; specimen lease issued and closed.` : "Vacant premises approved. Specimen lease issued and closed.");
    } catch (error) {
      if (serial === this.serial) setText("premises-status", `The property inspection could not be completed: ${error.message} No numerical mandate was submitted.`);
    } finally {
      if (serial === this.serial) {
        this.busy = false;
        byId("premises-submit").setAttribute("aria-disabled", "false");
        byId("premises-result").setAttribute("aria-busy", "false");
      }
    }
  }
};

// web/chronicle.ts
async function readProclamation(response) {
  const runtime2 = JSON.parse(response.headers.get("X-SlopBuzz-Execution-Runtime") || "{}");
  const packet = { text: "", events: [], omitted: 0, cache: response.headers.get("X-SlopBuzz-Cache") || "UNKNOWN", runtime: runtime2, recorded: false };
  const precedent2 = response.headers.get("X-SlopBuzz-Precedent-Trace");
  if (precedent2 && precedent2.length <= 8192) try {
    const data2 = parsePrecedent(JSON.parse(precedent2));
    if (data2.purpose === "MANDATE") packet.precedent = data2;
  } catch {
  }
  if (!response.headers.get("Content-Type")?.includes("application/json")) {
    const raw = response.headers.get("X-SlopBuzz-Onboarding-Trace");
    if (raw && raw.length <= 8192) try {
      const personnel2 = parseDossier(JSON.parse(raw));
      if (personnel2.purpose === "MANDATE") packet.events = personnel2.steps.map((step) => ({ ordinal: "1", kind: "HR_" + step.state, office: step.office, finding: step.finding, document: step.document }));
    } catch {
    }
    return { ...packet, text: await response.text() };
  }
  const data = await response.json();
  if (data?.schema !== "slopbuzz-execution/v1" || typeof data.text !== "string" || !Array.isArray(data.trace?.events) || data.trace.events.length > 5e4 || !Number.isSafeInteger(data.trace.omitted) || data.trace.omitted < 0 || data.trace.events.some((e) => !e || e.ordinal !== null && (typeof e.ordinal !== "string" || !/^\d+$/.test(e.ordinal)) || ["kind", "office", "finding"].some((k) => typeof e[k] !== "string") || e.document !== null && typeof e.document !== "string")) throw new Error("The execution dossier could not be read. No second mandate was submitted.");
  return { ...packet, text: data.text, events: data.trace.events, omitted: data.trace.omitted, recorded: true };
}
function node2(tag, text2, className) {
  const result = document.createElement(tag);
  if (text2 !== void 0) result.textContent = text2;
  if (className) result.className = className;
  return result;
}
function title(folio) {
  if (folio.ordinal === "1") return "One has reported for duty";
  if (folio.text === "FizzBuzz") return "A cross-departmental branding initiative has concluded";
  if (folio.text === "Fizz") return "The Fizz delegation has been admitted";
  if (folio.text === "Buzz") return "The Buzz delegation has been admitted";
  return `Ordinal ${folio.ordinal} has retained its numerical identity`;
}
function paragraphs(folio, language) {
  const events = folio.events, parts = [];
  const add = (situation, facts) => parts.push(language.write(situation, facts));
  if (folio.ordinal === "1") add("one", "One has reported for duty. The first position is now visibly occupied by exactly one. Zero remains outside the staffing plan; Two must wait for an authorized succession.");
  if (folio.cache === "HIT") {
    add("cache", `Institutional Memory reissued the approved answer \u201C${folio.text}\u201D. No fresh recruitment, classification, glyph requisition or numerical audit transaction was conducted for this cache hit.`);
    add("cacheProvenance", `The observed output is ${folio.text}. Its current disclosure is new; the underlying business result was already held in the output cache. Historical per-line certificates are not manufactured for this replay.`);
    return parts;
  }
  const hr = events.filter((e) => e.kind.startsWith("HR_"));
  if (hr.length) add("personnel", "Personnel has supplied the actual case file. " + hr.map((e) => `${e.office}: ${e.finding}`).join(" "));
  if (!folio.recorded) {
    add("legacy", `The observed proclamation is \u201C${folio.text}\u201D. The earlier administration returned the answer without forwarding a detailed execution dossier. ${hr.length ? "Its supplied personnel approvals are recorded above; the other departments are explained as procedure." : "We can explain the company\u2019s procedure while keeping those explanations distinct from recorded decisions."}`);
    add("procedure", `Under the current procedure, One completes recruitment and induction before a new sequence starts. Each ordinal is classified for Fizz, Buzz or its own decimal identity, and word output obtains its approved characters through procurement. The procedure\u2019s contracts are described here; individual historical approvals are not reconstructed.`);
    add("procedure", `A retained mandate uses staged output, an independent notary, the audit repository and its message queue. Extended-magnitude windows use exact arithmetic and an independent lexical witness without retained audit transactions. The selected runtime\u2019s old receipt does not establish which newer offices attended this particular case.`);
    return parts;
  }
  const assembly = events.find((e) => e.kind === "ASSEMBLY");
  if (assembly) add("assembly", assembly.finding + " The visitor then consulted each certified strategy before allowing its printer to speak.");
  const premises = events.filter((e) => e.kind.startsWith("PREMISES_") && e.kind !== "PREMISES_CERTIFICATE");
  if (premises.length) add(premises.some((e) => e.kind === "PREMISES_DISCOVERY") ? "premisesDiscovery" : "premises", premises.map((e) => `${e.office}: ${e.finding}`).join(" "));
  const classification = events.find((e) => e.kind === "CLASSIFICATION" || e.kind === "EXTENDED_CLASSIFICATION");
  if (classification) add("classification", classification.finding);
  const procurement = events.filter((e) => ["REQUISITION", "DELIVERY", "GLYPH_ACCEPTED", "GLYPH_ASSEMBLED"].includes(e.kind));
  if (procurement.length) {
    const received = procurement.filter((e) => e.kind === "GLYPH_ACCEPTED");
    const zs = received.filter((e) => e.finding.includes("character z,"));
    add("procurement", `Glyph Procurement received ${received.length} individually inspected character allocations${zs.length ? `, including ${zs.length} separately certified z\u2019s` : ""}. ` + procurement.filter((e) => e.kind !== "GLYPH_ACCEPTED").map((e) => e.finding).join(" ") + " Every position\u2019s receiving decision is available in the department documents.");
  }
  const numeral = events.find((e) => e.kind === "NUMERAL");
  if (numeral) add("numeral", numeral.finding);
  const begin = events.find((e) => e.kind === "TRANSACTION_BEGIN"), fragments = events.filter((e) => e.kind === "FRAGMENT");
  if (begin) add("transaction", begin.finding + ` ${fragments.length} fragments entered custody: ` + fragments.map((e) => JSON.stringify(e.document)).join(", ") + ". Even the line ending is accounted for; the public receives a complete proclamation.");
  const departments = { NOTARY: "notary", PUBLICATION: "publication", AUDIT_APPEND: "audit", QUEUE_ENQUEUED: "queued", TRANSACTION_COMMIT: "commit", TRANSACTION_CLEANUP: "cleanup", SUCCESSION: "succession", EXTENDED_NOTARY: "extendedNotary", EXTENDED_SUCCESSION: "extendedSuccession" };
  for (const [kind, situation] of Object.entries(departments)) {
    const selected = events.filter((e) => e.kind === kind);
    if (selected.length) add(situation, selected.map((e) => `${e.office}: ${e.finding}`).join(" "));
  }
  if (!parts.length) add("fallback", `The recorded output \u201C${folio.text}\u201D has entered the transcript. The accompanying department documents contain the observed decisions for ordinal ${folio.ordinal}.`);
  return parts;
}
var ExecutiveChronicle = class {
  relocating = false;
  relocation = 0;
  language = new ChronicleLanguage();
  rehearsals = /* @__PURE__ */ new WeakMap();
  packet;
  groups = /* @__PURE__ */ new Map();
  snapshots = /* @__PURE__ */ new Map();
  options = /* @__PURE__ */ new Map();
  rendered = /* @__PURE__ */ new Map();
  serial = 0;
  collapsed = 0;
  inspected;
  pending = false;
  pendingNotes = [];
  pinned = true;
  pinAfterResize = false;
  body = byId("chronicle-scroll");
  entries = byId("chronicle-entries");
  follow = byId("follow-chronicle");
  selector = byId("chronicle-ordinal");
  constructor() {
    const pause = () => {
      if (this.body.scrollHeight - this.body.clientHeight <= 4) return;
      this.pinned = false;
      this.pinAfterResize = false;
    };
    this.body.addEventListener("scroll", () => {
      if (this.pinAfterResize || this.relocating || !this.body.getClientRects().length) return;
      this.pinned = this.atBottom();
      if (this.pinned && this.follow.checked && this.pending) this.latest();
    }, { passive: true });
    this.body.addEventListener("wheel", (event) => {
      if (event.deltaY < 0 && !event.ctrlKey) pause();
    }, { passive: true });
    this.body.addEventListener("keydown", (event) => {
      if (["ArrowUp", "PageUp", "Home"].includes(event.key) || event.key === " " && event.shiftKey) pause();
    });
    let touchY;
    this.body.addEventListener("touchstart", (event) => {
      touchY = event.touches[0]?.clientY;
    }, { passive: true });
    this.body.addEventListener("touchmove", (event) => {
      const next = event.touches[0]?.clientY;
      if (next !== void 0 && touchY !== void 0 && next > touchY) pause();
      touchY = next;
    }, { passive: true });
    this.body.addEventListener("pointerdown", (event) => {
      const bounds = this.body.getBoundingClientRect();
      if (this.body.offsetWidth - this.body.clientWidth > 2 && event.clientX >= bounds.left + this.body.clientWidth) pause();
    }, { passive: true });
    this.follow.addEventListener("change", () => {
      if (this.follow.checked) this.latest();
    });
    this.selector.addEventListener("change", () => {
      if (this.selector.value === "latest") {
        this.latest();
        return;
      }
      const folio = this.snapshots.get(this.selector.value);
      if (!folio) return;
      this.follow.checked = false;
      this.inspected?.remove();
      this.inspected = this.render(folio);
      this.inspected.prepend(node2("p", "Archive inspection \xB7 original completed record", "chronicle-source"));
      this.inspected.classList.add("chronicle-inspection");
      this.body.prepend(this.inspected);
      this.body.scrollTop = 0;
      setText("chronicle-current", `Inspecting recorded ordinal ${folio.ordinal}. New output can continue without moving this reading position.`);
    });
    const layout = () => {
      if (this.pinAfterResize) {
        this.pinAfterResize = false;
        this.followBottom();
      }
      const panel = byId("mandate-output");
      panel.dataset.viewportFit = String(innerHeight > 600 && panel.getBoundingClientRect().height <= innerHeight - 24 - (document.querySelector("#discovery-register")?.getBoundingClientRect().height || 0));
    };
    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        layout();
      });
    };
    const resize = new ResizeObserver(schedule);
    const discoveries = document.querySelector("#discovery-register");
    if (discoveries) resize.observe(discoveries);
    resize.observe(this.body);
    resize.observe(this.entries);
    resize.observe(byId("mandate-output"));
    resize.observe(byId("mandate-output").querySelector(".output-dock"));
    window.addEventListener("resize", () => {
      this.pinAfterResize = this.isFollowing();
      schedule();
    });
  }
  get records() {
    return [...this.snapshots.values()];
  }
  begin(limit, mode = "mandate") {
    this.packet = void 0;
    this.groups.clear();
    this.snapshots.clear();
    this.options.clear();
    this.rendered.clear();
    this.collapsed = 0;
    this.serial++;
    this.pending = false;
    this.pendingNotes = [];
    this.follow.checked = true;
    this.pinned = true;
    this.pinAfterResize = false;
    this.inspected?.remove();
    this.inspected = void 0;
    this.entries.replaceChildren();
    this.selector.replaceChildren(node2("option", "Latest proceedings"));
    this.selector.options[0].value = "latest";
    this.note(this.language.write(mode === "replay" ? "replay" : "reception", mode === "replay" ? "The clerk is rereading completed proceedings. No business operation will be executed again." : `Reception accepted an upper limit of ${limit}. The input passed decimal validation. The company is obtaining a result and will explain each number as it becomes visible.`), "Mandate reception");
    setText("chronicle-current", mode === "replay" ? "Replaying completed corporate minutes." : "The committees have received a numerical mandate.");
  }
  receive(packet) {
    this.packet = packet;
    this.groups.clear();
    for (const event of packet.events) {
      if (event.ordinal !== null) {
        const group = this.groups.get(event.ordinal) || [];
        group.push(event);
        this.groups.set(event.ordinal, group);
      }
    }
    const global = packet.events.filter((e) => e.ordinal === null && !["COMPLETE", "FAILED"].includes(e.kind) && !e.kind.startsWith("PRECEDENT_"));
    if (global.length) this.note(this.language.write("global", global.map((e) => `${e.office}: ${e.finding}`).join(" ")), "Recorded reception and operating path");
    if (packet.precedent) {
      this.note(this.language.write(packet.precedent.status === "APPROVED" ? "courtApproved" : "courtRejected", packet.precedent.status === "APPROVED" ? "Institutional Memory offered prior text. Five actual Java offices examined the current reuse petition." : "Institutional Memory offered an inadmissible precedent. The court refused reuse before a single fresh production run was authorized. The rejected text has not been disclosed as the answer."), "Prior Work Ratification and Institutional Memory Court");
      for (const step of packet.precedent.steps) this.note(this.language.write("office", `${step.state === "APPROVED" ? "Approved" : step.state === "REJECTED" ? "Rejected" : "Not reached"}. ${step.finding} ${step.document}`), step.office);
    }
    const { engine, storage, cache } = packet.runtime;
    if (engine) this.note(this.language.write("runtime", `The appointed implementation is ${String(engine)}. Its declared repository is ${String(storage || "unspecified")} and its cache adapter is ${String(cache || "unspecified")}. ${packet.cache === "HIT" ? "Institutional memory answered without convening a fresh production workforce." : "The following account distinguishes actual Java decisions from explanatory context."}`), "Execution arrangements");
    if (packet.omitted) this.note(this.language.write("omitted", `${packet.omitted} observation entries exceeded the finite dossier allowance. Numerical output remains independently available.`), "Observation allowance");
  }
  folio(ordinal, text2) {
    return { ordinal, text: text2, events: this.groups.get(ordinal) || [], cache: this.packet?.cache || "UNKNOWN", recorded: this.packet?.recorded || false, runtime: this.packet?.runtime || {}, packet: this.packet };
  }
  disclose(start, lines2) {
    let ordinal = BigInt(start);
    const folios = lines2.map((text2) => {
      const value = ordinal.toString();
      ordinal++;
      return this.folio(value, text2);
    });
    this.discloseFolios(folios);
    return folios;
  }
  discloseFolios(folios) {
    for (const folio of folios) {
      this.snapshots.set(folio.ordinal, folio);
      if (!this.options.has(folio.ordinal)) {
        const option = node2("option", `Ordinal ${folio.ordinal}`);
        option.value = folio.ordinal;
        this.options.set(folio.ordinal, option);
        this.selector.append(option);
      }
      while (this.snapshots.size > 1e3) {
        const oldest = this.snapshots.keys().next().value;
        this.snapshots.delete(oldest);
        if (this.selector.value !== oldest) {
          this.options.get(oldest)?.remove();
          this.options.delete(oldest);
        }
      }
    }
    this.pauseIfReading();
    if (!this.isFollowing()) {
      this.pending = true;
      return;
    }
    for (const folio of folios.slice(-24)) {
      const old = this.rendered.get(folio.ordinal);
      if (old) {
        old.remove();
        this.rendered.delete(folio.ordinal);
      }
      const article = this.render(folio);
      this.rendered.set(folio.ordinal, article);
      this.entries.append(article);
    }
    this.trim();
    const last = folios.at(-1);
    if (last && !this.inspected) {
      this.selector.value = "latest";
      setText("chronicle-current", `Ordinal ${last.ordinal}: ${title(last)}. Official output: ${last.text}.`);
    }
    this.followBottom();
  }
  render(folio) {
    const article = node2("article", void 0, "chronicle-folio");
    article.dataset.ordinal = folio.ordinal;
    article.append(node2("p", `Ordinal ${folio.ordinal} \xB7 ${folio.cache === "HIT" ? "Institutional memory" : folio.recorded ? "Recorded Java proceedings" : folio.events.length ? "Recorded personnel \xB7 procedure explained" : "Observed output \xB7 procedure explained"}`, "chronicle-source"), node2("h3", title(folio)));
    folio.narrative ??= Object.freeze(paragraphs(folio, this.language));
    for (const paragraph of folio.narrative) article.append(node2("p", paragraph, "chronicle-prose"));
    const certificate = folio.events.find((e) => e.kind === "PREMISES_CERTIFICATE");
    if (certificate?.document) try {
      const data = parsePremises(JSON.parse(certificate.document));
      if (data.ordinal === folio.ordinal && data.purpose === "MANDATE" && folio.cache !== "HIT") article.append(premisesCard(data));
    } catch {
    }
    if (folio.events.length) {
      const details = node2("details");
      details.append(node2("summary", `Inspect ${folio.events.length} department records for ordinal ${folio.ordinal}`));
      const list = node2("ol");
      for (const event of folio.events) {
        const item = node2("li");
        item.append(node2("strong", event.office), node2("p", event.finding));
        if (event.document) item.append(node2("pre", event.document, "chronicle-document"));
        list.append(item);
      }
      details.append(list);
      article.append(details);
    }
    return article;
  }
  trim() {
    for (const [key2, article] of this.rendered) {
      if (this.rendered.size <= 24) break;
      if (article.contains(document.activeElement)) continue;
      article.remove();
      this.rendered.delete(key2);
      this.collapsed++;
    }
    let notice = this.entries.querySelector(".chronicle-archive-note");
    if (this.collapsed) {
      if (!notice) {
        notice = node2("p", void 0, "chronicle-archive-note");
        this.entries.prepend(notice);
      }
      notice.textContent = `Earlier narration has been condensed for a finite browser. Inspect any of the latest ${this.snapshots.size} disclosed ordinals using the selector.`;
    }
  }
  note(text2, heading = "Corporate minutes") {
    this.pauseIfReading();
    if (!this.isFollowing()) {
      this.pending = true;
      this.pendingNotes.push({ text: text2, heading });
      if (this.pendingNotes.length > 16) this.pendingNotes.shift();
      return;
    }
    const article = node2("article", void 0, "chronicle-note");
    article.append(node2("h3", heading), node2("p", text2));
    this.entries.append(article);
    const notes = this.entries.querySelectorAll(".chronicle-note");
    if (notes.length > 16) notes[0].remove();
    this.followBottom();
  }
  rehearsal(data, count) {
    this.pauseIfReading();
    const key2 = `rehearsal-${data.caseId}`;
    let article = this.entries.querySelector(`[data-rehearsal="${CSS.escape(key2)}"]`);
    if (!article) {
      article = node2("article", void 0, "chronicle-note");
      article.dataset.rehearsal = key2;
      this.entries.append(article);
    }
    let prose = this.rehearsals.get(data);
    if (!prose) {
      prose = Object.freeze([this.language.write("rehearsal", "This is a read-only rehearsal using the actual personnel offices. Existing numerical output is retained; the rehearsal creates no numerical audit entries."), ...data.steps.map((decision) => this.language.write("office", `${decision.office} \u2014 ${decision.state === "APPROVED" ? "Approved" : decision.state === "REJECTED" ? "Rejected" : "Not reached"}. ${decision.finding} ${decision.document}`))]);
      this.rehearsals.set(data, prose);
    }
    article.replaceChildren(node2("h3", `Management intervention: applicant ${data.candidate}`), node2("p", prose[0]));
    for (const paragraph of prose.slice(1, count + 1)) article.append(node2("p", paragraph));
    setText("chronicle-current", count === 7 ? data.status === "APPROVED" ? "Personnel rehearsal approved: One may start work." : `Personnel rehearsal rejected by ${data.steps.find((e) => e.state === "REJECTED").office}.` : `Reading completed personnel rehearsal: ${count} of 7 offices.`);
    const rehearsals = this.entries.querySelectorAll("[data-rehearsal]");
    if (rehearsals.length > 8) rehearsals[0].remove();
    this.followBottom();
  }
  finish(zero = false) {
    if (zero && !this.inspected) setText("chronicle-current", "Zero-number mandate complete. No numerical output was required.");
    if (zero) this.note(this.language.write(this.packet?.cache === "HIT" ? "zeroCache" : this.packet?.recorded ? "zeroFresh" : "zeroLegacy", this.packet?.cache === "HIT" ? "Institutional memory reissued the zero-work mandate. No new recruitment, numerical line or audit entry was required." : this.packet?.recorded ? "The company hired One for a zero-work mandate. The loop boundary then declined every numerical iteration. No line was printed and no numerical audit entry was needed." : "The observed zero-number mandate published no lines. Under the current procedure One is initialized before the loop boundary declines all work; this older response supplied no individual personnel certificates."), "Zero-number mandate");
    const denied = [...this.groups.values()].filter((events) => !this.snapshots.has(events[0]?.ordinal || "")).flat().filter((e) => e.kind === "CONTINUATION");
    this.note(this.language.write("finish", (denied.length ? denied.map((e) => e.finding).join(" ") + " " : "") + "The requested disclosures are complete. Replay and inspection read these retained minutes without submitting another mandate."), "Proceedings concluded");
  }
  atBottom() {
    return this.body.scrollHeight - this.body.clientHeight - this.body.scrollTop <= 4;
  }
  isFollowing() {
    return this.follow.checked && this.pinned;
  }
  pauseIfReading() {
    if (!this.relocating && this.body.getClientRects().length && !this.pinAfterResize && !this.atBottom()) this.pinned = false;
  }
  place(target) {
    const section = this.body.closest(".chronicle");
    if (section.parentElement === target) return;
    if (this.body.getClientRects().length && !this.atBottom()) this.pinned = false;
    const serial = ++this.relocation, following = this.isFollowing(), position = this.body.scrollTop;
    this.relocating = true;
    target.append(section);
    if (following) this.followBottom();
    else this.body.scrollTop = position;
    const restored = this.body.scrollTop;
    requestAnimationFrame(() => {
      if (serial !== this.relocation) return;
      if (this.body.getClientRects().length && Math.abs(this.body.scrollTop - restored) > 4) this.pinned = this.atBottom();
      else if (following && this.isFollowing()) this.followBottom();
      else this.body.scrollTop = position;
      this.relocating = false;
    });
  }
  followBottom() {
    if (this.isFollowing()) this.body.scrollTop = this.body.scrollHeight;
  }
  latest() {
    this.inspected?.remove();
    this.inspected = void 0;
    this.follow.checked = true;
    this.pinned = true;
    this.pinAfterResize = false;
    this.selector.value = "latest";
    for (const [ordinal, option] of this.options) if (!this.snapshots.has(ordinal)) {
      option.remove();
      this.options.delete(ordinal);
    }
    if (this.pending) {
      this.pending = false;
      const notes = this.pendingNotes;
      this.pendingNotes = [];
      this.entries.replaceChildren();
      this.rendered.clear();
      this.note(this.language.write("resume", "Following has resumed at the latest retained minutes. No business operation was submitted again."), "Reading position restored");
      this.discloseFolios(this.records.slice(-24));
      for (const entry of notes) this.note(entry.text, entry.heading);
    }
    const last = this.records.at(-1);
    if (last) setText("chronicle-current", `Ordinal ${last.ordinal}: ${title(last)}. Official output: ${last.text}.`);
    this.followBottom();
  }
};

// web/demo-workspace-model.ts
var desks2 = ["authorize", "observe", "experiment", "facilities", "evidence"];
var watchViews = ["overview", "output", "office", "companions", "commentary"];
function readDesk(url) {
  const explicit = url.searchParams.get("desk");
  if (desks2.includes(explicit)) return explicit;
  if (url.searchParams.get("tour") === "office-v1" || url.hash === "#office-tour") return "facilities";
  if (/^#(precedent|chronicle|personnel|supervision-evidence)/.test(url.hash)) return "evidence";
  if (url.hash.startsWith("#premises")) return "experiment";
  if (["#mandate-output", "#output"].includes(url.hash)) return "observe";
  return "authorize";
}
function watchView(value, office2, companions2) {
  if (!watchViews.includes(value)) return "overview";
  if (value === "office" && !office2 || value === "companions" && !companions2) return "output";
  return value;
}
function initialWatchView(mobile, office2) {
  return mobile ? office2 ? "office" : "output" : "overview";
}
function deskURL(source, desk) {
  const next = new URL(source);
  next.searchParams.set("desk", desk);
  next.hash = "";
  return next;
}

// web/companion-tile.ts
function companionGlyph(discovery) {
  const glyph = node("span", discovery.companion.emoji);
  glyph.className = "companion-glyph";
  glyph.dataset.companionIdentity = discoveryIdentity(discovery);
  glyph.dataset.rarity = discovery.companion.rarity;
  glyph.setAttribute("aria-hidden", "true");
  return glyph;
}
function companionTile(discovery) {
  const { companion: c, assignment: a } = discovery, button = node("button");
  button.type = "button";
  button.className = "companion-chip";
  button.dataset.rarity = c.rarity;
  button.dataset.companion = c.id;
  button.setAttribute("aria-label", c.rarity + " \xB7 " + c.name);
  button.setAttribute("aria-haspopup", "dialog");
  button.setAttribute("aria-controls", "companion-dialog");
  button.title = c.rarity + " \xB7 " + c.name + " \xB7 " + c.weight + " of one billion tickets \xB7 mandate " + discovery.mandate + " \xB7 ordinal " + a.ordinal;
  button.append(companionGlyph(discovery));
  button.addEventListener("click", () => companionDialog().open(discovery, button));
  return button;
}

// web/recent-appointments.ts
var RecentAppointments = class {
  panel = byId("companion-spotlight");
  host = byId("spotlight-appointments");
  dialog = byId("companion-dialog");
  history = /* @__PURE__ */ new Map();
  queued = false;
  frame = 0;
  constructor() {
    new ResizeObserver(() => this.schedule()).observe(this.host);
    this.host.addEventListener("focusout", () => queueMicrotask(() => this.render()));
    this.dialog.addEventListener("companion-closed", () => this.render());
    document.addEventListener("demo-watch-layout", () => this.schedule());
    document.addEventListener("office-fullscreen-change", () => this.schedule());
  }
  clear() {
    this.history.clear();
    this.queued = false;
    this.host.replaceChildren();
    const placeholder = document.createElement("button");
    placeholder.id = "spotlight-open";
    placeholder.type = "button";
    placeholder.disabled = true;
    placeholder.className = "companion-chip";
    placeholder.setAttribute("aria-label", "Awaiting a companion");
    const glyph = document.createElement("span");
    glyph.id = "spotlight-glyph";
    glyph.className = "companion-glyph";
    glyph.setAttribute("aria-hidden", "true");
    glyph.textContent = "\u25C7";
    placeholder.append(glyph);
    this.host.append(placeholder);
    byId("spotlight-name").textContent = "Awaiting a companion";
    byId("spotlight-detail").textContent = "No disclosed friend has reported for duty.";
    byId("spotlight-energy").textContent = "";
    this.schedule();
  }
  remember(discovery) {
    const previous = this.history.get(discovery.assignment.ordinal);
    if (previous?.companion.id === discovery.companion.id && previous.strategy === discovery.strategy && previous.catalogVersion === discovery.catalogVersion) return;
    this.history.set(discovery.assignment.ordinal, discovery);
    const ordered = [...this.history.values()].sort((a, b) => BigInt(a.assignment.ordinal) > BigInt(b.assignment.ordinal) ? -1 : 1).slice(0, 100);
    this.history = new Map(ordered.map((d) => [d.assignment.ordinal, d]));
    this.queued = true;
    this.schedule();
  }
  render() {
    if (!this.queued || this.host.contains(document.activeElement) || this.dialog.open) return;
    this.queued = false;
    const rows = [...this.history.values()];
    this.host.replaceChildren(...rows.map((d, index) => {
      const button = companionTile(d);
      button.dataset.ordinal = d.assignment.ordinal;
      if (!index) {
        button.id = "spotlight-open";
        button.querySelector(".companion-glyph").id = "spotlight-glyph";
      }
      return button;
    }));
    if (rows.length) {
      const latest = rows[0];
      byId("spotlight-name").textContent = latest.companion.name;
      byId("spotlight-detail").textContent = latest.assignment.ordinal + " \xB7 " + latest.assignment.flavor + " \xB7 " + latest.companion.rarity;
      byId("spotlight-energy").textContent = latest.companion.energy;
    }
    this.layout();
  }
  schedule() {
    if (!this.frame) this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.render();
      this.layout();
    });
  }
  layout() {
    const compact2 = this.panel.getBoundingClientRect().height < 128 * (parseFloat(getComputedStyle(document.documentElement).fontSize) / 16);
    if (this.panel.dataset.compact !== String(compact2)) this.panel.dataset.compact = String(compact2);
    const box = this.host.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const buttons = [...this.host.querySelectorAll("button")], focused = this.host.contains(document.activeElement);
    for (const button of buttons) button.hidden = false;
    const mobile = matchMedia("(max-width:700px)").matches, first = buttons[0]?.getBoundingClientRect();
    const gap = parseFloat(getComputedStyle(this.host).gap) || 0, padding = parseFloat(getComputedStyle(this.host).paddingTop) || 0;
    const capacity = first ? Math.max(1, Math.floor((box.width - 2 * padding + gap) / (first.width + gap)) * Math.floor((box.height - 2 * padding + gap) / (first.height + gap))) : 1;
    const title2 = !mobile && capacity > 1 ? "Latest appointments" : "Latest appointment";
    if (byId("spotlight-title").textContent !== title2) byId("spotlight-title").textContent = title2;
    let shown = 0;
    for (const button of buttons) {
      const rect = button.getBoundingClientRect(), fits = rect.bottom <= box.bottom - padding + 1 && rect.right <= box.right - padding + 1;
      button.hidden = mobile && shown >= 1 || !fits;
      if (!button.hidden) shown++;
    }
    this.panel.dataset.capacity = String(mobile ? 1 : capacity);
    this.panel.dataset.appointments = String(shown);
    if (focused && document.activeElement?.closest("[hidden]")) buttons.find((button) => !button.hidden)?.focus({ preventScroll: true });
  }
};

// web/site-navigation.ts
var pages = /* @__PURE__ */ new Set(["", "demo", "api", "about", "company-history", "accessibility", "validation", "bestiary", "department-of-improbable-appointments", "changelog", "continuity-register", "response"]);
function sitePage(url) {
  const base = new URL(scope);
  if (url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return;
  const path = url.pathname.slice(base.pathname.length).replace(/\/$/, "");
  return path === "company-history" ? "about" : pages.has(path) ? path : void 0;
}
function onDemoPage() {
  return sitePage(new URL(location.href)) === "demo";
}
function openSitePage(url) {
  return new Promise((resolve, reject) => document.dispatchEvent(new CustomEvent("site-navigate", { detail: { url: new URL(url, scope), resolve, reject } })));
}

// web/demo-workspace.ts
var DemoWorkspace = class {
  constructor(run) {
    this.run = run;
    const immersive = officeFullscreen();
    immersive.placeChronicle = (target) => this.run.placeChronicle(target);
    byId("supervision-fullscreen").addEventListener("click", () => immersive.open("observe", byId("supervision-fullscreen")));
    document.querySelectorAll("[data-desk-link]").forEach((link) => link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      this.navigate(link.dataset.deskLink);
    }));
    document.querySelectorAll("[data-go-desk]").forEach((button) => button.addEventListener("click", () => this.navigate(button.dataset.goDesk)));
    document.querySelectorAll("[data-evidence]").forEach((button) => button.addEventListener("click", () => this.evidence(button.dataset.evidence)));
    this.watch.addEventListener("change", () => {
      this.manualView = true;
      this.layout();
    });
    document.addEventListener("demo-presentation-change", () => this.layout());
    byId("authorize-require-companion-roll-call").removeAttribute("aria-controls");
    byId("authorize-executive-hovering").removeAttribute("aria-controls");
    byId("experiment-view").addEventListener("change", () => this.sections("experiment"));
    byId("evidence-view").addEventListener("change", () => this.sections("evidence"));
    byId("resume-current").addEventListener("click", () => this.navigate("observe"));
    byId("active-run-banner").addEventListener("click", () => {
      if (onDemoPage()) this.navigate("observe");
      else void openSitePage(new URL("demo/?desk=observe", scope));
    });
    byId("office-choose-mandate").addEventListener("click", () => {
      this.navigate("authorize");
      byId("limit").focus();
    });
    byId("watch-settings-toggle").addEventListener("click", () => this.settings(byId("watch-settings").hidden === true));
    byId("watch-settings-close").addEventListener("click", () => {
      this.settings(false);
      byId("watch-settings-toggle").focus();
    });
    byId("watch-settings").addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        this.settings(false);
        byId("watch-settings-toggle").focus();
      }
    });
    byId("watch-reorganize").addEventListener("click", () => {
      this.settings(false);
      requestReorganization();
      byId("watch-waive").focus({ preventScroll: true });
    });
    byId("watch-waive").addEventListener("click", () => {
      officeEstate.finish();
      byId("watch-settings-toggle").focus({ preventScroll: true });
    });
    byId("watch-settings-toggle").before(byId("watch-waive"));
    byId("watch-settings").append(byId("reveal-all"), byId("follow-output").closest("label"));
    const ticker = document.createElement("span");
    ticker.id = "watch-latest";
    byId("observed-mandate").after(ticker);
    playbackIcon(byId("watch-waive"), "waive", "Waive the Moving Ceremony");
    playbackIcon(byId("supervision-next"), "next", "Next recorded decision");
    playbackIcon(byId("stop-reading"), "stop", "Stop proceedings");
    playbackIcon(byId("watch-settings-toggle"), "options", "Options");
    playbackIcon(document.querySelector(".watch-transport [data-evidence]"), "evidence", "Evidence");
    byId("companion-spotlight").tabIndex = 0;
    byId("companion-spotlight").setAttribute("role", "region");
    byId("run-status").tabIndex = 0;
    byId("supervision-current").removeAttribute("role");
    byId("supervision-current").setAttribute("aria-live", "off");
    byId("company-menu").addEventListener("click", () => this.companyMenu(document.body.dataset.companyMenu !== "open"));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.dataset.companyMenu === "open") {
        this.companyMenu(false);
        byId("company-menu").focus();
      }
    });
    officeEstate.subscribe(() => {
      byId("watch-waive").hidden = !officeEstate.moving;
    });
    for (const id of this.policyIds) {
      byId("authorize-" + id).addEventListener("change", () => {
        this.draftSummary();
        this.saveDraft();
      });
      byId(id).addEventListener("change", () => {
        if (!this.committed && !this.applying) this.copyLiveToDraft();
        this.layout();
      });
    }
    byId("limit").addEventListener("input", () => this.draftSummary());
    const registry = byId("companion-strategy");
    new MutationObserver(() => {
      const draft = byId("authorize-companion-strategy"), selected = draft.value;
      draft.replaceChildren(...[...registry.options].map((option) => option.cloneNode(true)));
      const wanted = this.preferredAuthority || selected;
      if ([...draft.options].some((option) => option.value === wanted)) {
        draft.value = wanted;
        this.preferredAuthority = "";
      }
      draft.disabled = registry.disabled;
      this.draftSummary();
    }).observe(registry, { childList: true, attributes: true, attributeFilter: ["disabled"] });
    document.querySelectorAll("[data-open-personnel]").forEach((button) => button.addEventListener("click", () => {
      const trigger = byId("personnel-documents");
      trigger.dispatchEvent(new MouseEvent("click"));
    }));
    new MutationObserver(() => {
      byId("personnel-record-summary").textContent = byId("personnel-origin").textContent;
    }).observe(byId("personnel-origin"), { childList: true, characterData: true, subtree: true });
    addEventListener("popstate", () => {
      if (document.documentElement.dataset.siteShell === "ready" || !onDemoPage()) return;
      const desk = readDesk(new URL(location.href));
      if (desk !== this.desk) this.show(desk, false);
      else this.retainDesk(desk);
    });
    document.addEventListener("site-page-leaving", (event) => {
      if (event.detail.page === "demo") {
        officeFullscreen().close(false);
        this.settings(false);
        this.companyMenu(false);
      }
    });
    const sitePageChanged = () => {
      if (onDemoPage()) {
        const url = new URL(location.href), explicit = url.searchParams.has("desk") || url.searchParams.has("limit") || url.searchParams.has("tour") || !!url.hash, desk = explicit ? readDesk(url) : this.running ? "observe" : this.desk;
        this.show(desk, false, false);
      } else {
        this.updateRunBanner();
        document.dispatchEvent(new Event("demo-watch-layout"));
      }
    };
    document.addEventListener("site-page-change", sitePageChanged);
    document.addEventListener("site-page-ready", sitePageChanged);
    const resize = new ResizeObserver(() => this.fit());
    resize.observe(document.querySelector(".site-header"));
    resize.observe(byId("discovery-register"));
    resize.observe(document.querySelector(".authorization-actions"));
    addEventListener("resize", () => {
      if (!this.manualView && this.committed) {
        this.watch.value = initialWatchView(matchMedia("(max-width: 700px), (max-height: 500px)").matches, this.live().hovering);
        this.layout();
      } else this.fit();
    });
    visualViewport?.addEventListener("resize", () => this.fit());
    const hash2 = location.hash;
    if (hash2.startsWith("#precedent")) this.select("evidence-view").value = "precedent";
    if (hash2.startsWith("#personnel")) this.select("evidence-view").value = "personnel";
    if (hash2.startsWith("#premises")) this.select("experiment-view").value = "premises";
    this.restoreDraft();
    this.draftSummary();
    this.sections("experiment");
    this.sections("evidence");
    this.show(readDesk(new URL(location.href)), false, false);
  }
  run;
  desk = "authorize";
  watch = byId("watch-view");
  mainLinks = document.querySelectorAll("[data-site-main-link]");
  stage = byId("mandate-output");
  policyIds = ["display-speed", "emoji-companions", "companion-strategy", "require-companion-roll-call", "executive-hovering"];
  activeMandate = "";
  recent = new RecentAppointments();
  committed = false;
  applying = false;
  manualView = false;
  running = false;
  held = false;
  activity = "mandate";
  interruption = "";
  latestValue;
  bannerAnnouncement = "";
  preferredAuthority = new URL(location.href).searchParams.get("authority") || "";
  scroll = /* @__PURE__ */ new Map();
  get observing() {
    return onDemoPage() && this.desk === "observe";
  }
  runActivity(active, paused2 = false, mode = "mandate", interruption = "") {
    this.running = active;
    this.held = paused2;
    this.activity = mode;
    this.interruption = interruption;
    const warning = byId("mandate-collision-warning");
    if (warning.hidden !== !active) {
      warning.hidden = !active;
      byId("run-button").setAttribute("aria-describedby", active ? "mandate-collision-copy" : "authorization-summary");
    }
    this.updateRunBanner();
  }
  beginDisclosure() {
    this.latestValue = void 0;
    this.updateRunBanner();
  }
  updateRunBanner() {
    const banner = byId("active-run-banner"), visible2 = this.running && !this.observing, focused = banner.contains(document.activeElement);
    const state = this.held ? "Executive hold remains in force" : this.interruption || (this.activity === "replay" ? "Retained proceedings under review" : "Authorized production continues");
    const value = this.latestValue ? this.latestValue.text + " \xB7 certified ordinal " + this.latestValue.ordinal : "Awaiting the first certified value";
    for (const [id, text2] of [["active-run-state", state], ["active-run-value", value]]) if (byId(id).textContent !== text2) byId(id).textContent = text2;
    byId("active-run-value").title = value;
    banner.dataset.latestOrdinal = this.latestValue?.ordinal || "";
    banner.hidden = !visible2;
    const announcement2 = visible2 ? state + ". Use the running mandate bar to return to Observe." : "";
    if (announcement2 !== this.bannerAnnouncement) {
      this.bannerAnnouncement = announcement2;
      byId("active-run-announcement").textContent = announcement2;
    }
    if (!visible2 && focused) {
      const target = !onDemoPage() ? byId("main") : byId("office-fullscreen").open ? byId("office-fullscreen-exit") : byId("desk-" + this.desk).querySelector("h1");
      target?.focus({ preventScroll: true });
    }
  }
  input(id) {
    return byId(id);
  }
  select(id) {
    return byId(id);
  }
  policy(prefix = "") {
    return { cadence: this.select(prefix + "display-speed").value, companions: this.input(prefix + "emoji-companions").checked, authority: this.select(prefix + "companion-strategy").value, roll: this.input(prefix + "require-companion-roll-call").checked, hovering: this.input(prefix + "executive-hovering").checked };
  }
  live() {
    return this.policy();
  }
  copyLiveToDraft() {
    for (const id of this.policyIds) {
      const source = byId(id), draft = byId("authorize-" + id);
      if (source instanceof HTMLInputElement) draft.checked = source.checked;
      else draft.value = source.value;
    }
    this.draftSummary();
  }
  commitDraft(mandate) {
    const policy = this.policy("authorize-");
    this.applying = true;
    const hover = this.input("executive-hovering");
    this.select("display-speed").value = policy.cadence;
    this.select("display-speed").dispatchEvent(new Event("change"));
    for (const [id, value] of [["emoji-companions", policy.companions], ["require-companion-roll-call", policy.roll]]) {
      const input = this.input(id);
      if (input.checked !== value) {
        input.checked = value;
        input.dispatchEvent(new Event("change"));
      }
    }
    const authority = this.select("companion-strategy");
    if (authority.value !== policy.authority) {
      authority.value = policy.authority;
      authority.dispatchEvent(new Event("change"));
    }
    if (hover.checked !== policy.hovering) {
      hover.checked = policy.hovering;
      hover.dispatchEvent(new Event("change"));
    }
    this.applying = false;
    this.activeMandate = mandate;
    this.recent.clear();
    this.committed = true;
    this.manualView = false;
    byId("watch-latest").textContent = "";
    this.beginDisclosure();
    this.watch.value = initialWatchView(matchMedia("(max-width: 700px), (max-height: 500px)").matches, policy.hovering);
    byId("observed-mandate").textContent = mandate.length > 28 ? mandate.slice(0, 12) + "\u2026 \xB7 " + mandate.length + "-digit mandate" : "Mandate " + mandate;
    byId("observe-empty").hidden = true;
    this.stage.hidden = false;
    byId("resume-current").hidden = false;
    this.clearCompanions();
    this.saveDraft();
    this.navigate("observe");
    this.layout();
  }
  navigate(desk) {
    this.show(desk, true);
  }
  retainDesk(desk) {
    if (!onDemoPage()) return;
    const entry = new URL(location.href);
    if (desk !== "authorize" && entry.searchParams.get("desk") !== desk) {
      entry.searchParams.set("desk", desk);
      history.replaceState(history.state, "", entry);
    }
    entry.hash = "main";
    for (const link of this.mainLinks) link.href = entry.href;
  }
  show(desk, push, focus = true) {
    if (!onDemoPage()) return;
    if (officeFullscreen().mode) officeFullscreen().close(false);
    const before = this.desk;
    if (before !== desk) this.scroll.set(before, scrollY);
    if (before === "observe" && desk !== "observe") this.placeChronicle(false);
    this.desk = desk;
    document.body.dataset.desk = desk;
    this.companyMenu(false);
    byId("company-menu").hidden = desk !== "observe";
    this.settings(false);
    for (const key2 of desks2) byId("desk-" + key2).hidden = key2 !== desk;
    this.updateRunBanner();
    const url = deskURL(new URL(location.href), desk);
    if (push && readDesk(new URL(location.href)) !== desk) history.pushState({ ...history.state }, "", url);
    this.retainDesk(desk);
    document.querySelectorAll("[data-desk-link]").forEach((link) => {
      const key2 = link.dataset.deskLink;
      link.href = deskURL(new URL(location.href), key2).href;
      if (key2 === desk) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    this.layout();
    if (focus) {
      const heading = byId("desk-" + desk).querySelector("h1");
      heading.focus({ preventScroll: true });
      const collision = desk === "authorize" && !byId("mandate-collision-warning").hidden;
      const warningTop = collision && matchMedia("(max-width:700px), (max-height:600px)").matches ? Math.max(0, (heading.closest(".desk-heading") || heading).getBoundingClientRect().top + scrollY - byId("active-run-banner").getBoundingClientRect().height - 12) : 0;
      window.scrollTo({ top: collision ? warningTop : desk === "observe" ? 0 : this.scroll.get(desk) || 0, behavior: "instant" });
    }
    document.dispatchEvent(new CustomEvent("demo-desk-change", { detail: { desk } }));
    requestAnimationFrame(() => this.fit());
  }
  evidence(record) {
    this.select("evidence-view").value = record;
    this.sections("evidence");
    this.navigate("evidence");
  }
  sections(kind) {
    const value = this.select(kind + "-view").value, attribute = kind === "experiment" ? "experiment" : "record";
    document.querySelectorAll("[data-" + attribute + "]").forEach((section) => section.hidden = section.dataset[attribute] !== value);
    if (kind === "evidence" && this.desk === "evidence") this.placeChronicle(false);
  }
  settings(open) {
    byId("watch-settings").hidden = !open;
    byId("watch-settings-toggle").setAttribute("aria-expanded", String(open));
  }
  placeChronicle(watch) {
    this.run.placeChronicle(byId(officeFullscreen().mode === "observe" ? "office-fullscreen-log-slot" : watch ? "watch-chronicle-slot" : "evidence-chronicle-slot"));
  }
  layout() {
    const policy = this.live(), view = watchView(this.watch.value, policy.hovering, policy.companions && policy.roll);
    this.watch.value = view;
    this.stage.dataset.watchView = view;
    this.stage.dataset.companions = String(policy.companions);
    this.stage.dataset.office = String(policy.hovering);
    const officeOption = this.watch.querySelector('[value="office"]'), companionOption = this.watch.querySelector('[value="companions"]');
    officeOption.disabled = !policy.hovering;
    officeOption.textContent = policy.hovering ? "Office" : "Office \u2014 enable Executive Hovering";
    companionOption.disabled = !policy.companions || !policy.roll;
    companionOption.textContent = !policy.companions ? "Companions \u2014 commission appointments" : !policy.roll ? "Companions \u2014 enable Roll Call" : "Companions";
    this.placeChronicle(this.observing && view === "commentary");
    this.fit();
    document.dispatchEvent(new Event("demo-watch-layout"));
  }
  companyMenu(open) {
    document.body.dataset.companyMenu = open ? "open" : "closed";
    byId("company-menu").setAttribute("aria-expanded", String(open));
  }
  fit() {
    if (!onDemoPage()) return;
    document.body.dataset.expandedText = String(parseFloat(getComputedStyle(document.documentElement).fontSize) > 20);
    const style = document.documentElement.style;
    style.setProperty("--authorization-height", Math.ceil(document.querySelector(".authorization-actions").getBoundingClientRect().height) + "px");
    const bottom = Math.ceil(byId("discovery-register").getBoundingClientRect().height);
    style.setProperty("--discovery-height", bottom + "px");
    if (!this.observing) return;
    const top = Math.max(0, byId("desk-observe").getBoundingClientRect().top + scrollY), viewport = visualViewport?.height || innerHeight;
    byId("desk-observe").style.setProperty("--observe-height", Math.max(120, viewport - top - bottom - 8) + "px");
  }
  disclosed(folio) {
    if (!folio) return;
    this.latestValue = { ordinal: folio.ordinal, text: folio.text };
    this.updateRunBanner();
    const host = byId("watch-prose"), text2 = folio.narrative?.slice(0, 2) || folio.events.slice(0, 2).map((event) => event.office + ": " + event.finding);
    byId("watch-latest").textContent = " \xB7 " + folio.ordinal + ": " + folio.text;
    if (host.contains(document.activeElement) || host.scrollTop > 8) return;
    const title2 = document.createElement("strong");
    title2.textContent = "Ordinal " + folio.ordinal + " \xB7 " + folio.text;
    host.replaceChildren(title2, ...text2.map((text3) => {
      const p = document.createElement("p");
      p.textContent = text3;
      return p;
    }));
  }
  clearCompanions() {
    this.recent.clear();
  }
  remember(discovery) {
    if (discovery.mandate === this.activeMandate) this.recent.remember(discovery);
  }
  draftSummary() {
    const p = this.policy("authorize-");
    byId("authorization-summary").textContent = (this.input("limit").value || "Unspecified") + " numbers \xB7 " + (p.companions ? "companions commissioned" : "no companion appointments") + " \xB7 " + (p.hovering ? "executive supervision authorized" : "ordinary disclosure");
    this.select("authorize-display-speed").disabled = false;
    byId("authorize-pace-help").textContent = p.hovering ? "Full Board Ratification doubles each deliberation. Interdepartmental Sign-Off preserves established ceremony; Emergency Delegated Authority halves it. Executive Fiat uses the fastest pace the office can present smoothly." : "Choose the ceremonial reading pace. Executive Fiat introduces no delay.";
  }
  saveDraft() {
    try {
      sessionStorage.setItem("slopbuzz:authorization-draft:v2", JSON.stringify(this.policy("authorize-")));
    } catch {
    }
  }
  restoreDraft() {
    try {
      const current = sessionStorage.getItem("slopbuzz:authorization-draft:v2");
      const p = JSON.parse(current || sessionStorage.getItem("slopbuzz:authorization-draft:v1") || "null");
      if (!p) return;
      for (const [id, value] of [["emoji-companions", p.companions], ["require-companion-roll-call", p.roll], ["executive-hovering", current ? p.hovering : true]]) if (typeof value === "boolean") this.input("authorize-" + id).checked = value;
      if (["1800", "800", "225", "0"].includes(p.cadence)) this.select("authorize-display-speed").value = p.cadence;
      if (!this.preferredAuthority && typeof p.authority === "string") this.preferredAuthority = p.authority;
    } catch {
    }
  }
};

// web/personnel-experiment.ts
var PersonnelExperiment = class {
  view;
  serial = 0;
  reading = false;
  paused = false;
  stepping = false;
  saved;
  wake;
  constructor() {
    this.view = new PersonnelProceedings({ rehearse: (scenario) => void this.rehearse(scenario), replay: () => {
      if (this.saved) void this.play(this.saved, true);
    }, step: () => {
      this.serial++;
      this.reading = false;
      this.wake?.();
      if (!this.stepping || this.view.progress === 7) {
        this.view.startStepThrough();
        this.stepping = true;
      }
      this.view.step();
      this.controls();
    } }, "experiment-");
    byId("experiment-pause").addEventListener("click", () => {
      if (this.reading) {
        this.paused = !this.paused;
        this.wake?.();
        this.controls();
      }
    });
    byId("experiment-stop").addEventListener("click", () => {
      this.serial++;
      this.reading = false;
      this.wake?.();
      this.view.stopReading();
      this.status("Rehearsal adjourned. The numerical mandate and its production papers remain intact.");
      this.controls();
    });
    this.controls();
  }
  status(text2) {
    byId("experiment-status").textContent = text2;
  }
  controls() {
    for (const id of ["experiment-pause", "experiment-stop"]) byId(id).setAttribute("aria-disabled", String(!this.reading));
    byId("experiment-pause").textContent = this.paused ? "Resume rehearsal" : "Pause rehearsal";
  }
  wait(ms) {
    return new Promise((resolve) => {
      let timer;
      const finish = () => {
        clearTimeout(timer);
        if (this.wake === finish) this.wake = void 0;
        resolve();
      };
      this.wake = finish;
      if (ms !== void 0) timer = setTimeout(finish, ms);
    });
  }
  async rehearse(scenario) {
    const serial = ++this.serial;
    this.wake?.();
    this.reading = false;
    this.view.loading();
    this.status("Obtaining a read-only personnel specimen\u2026");
    this.controls();
    try {
      const reply = await request("/onboarding/rehearsal?scenario=" + encodeURIComponent(scenario));
      if (!reply.ok) throw new Error("Personnel desk returned " + reply.status + ".");
      const data = this.view.rehearsalRecord(await reply.json());
      if (serial !== this.serial) return;
      this.saved = data;
      this.view.setPlaybackAvailable(true);
      await this.play(data, false);
    } catch (error) {
      if (serial === this.serial) {
        this.view.clear("The specimen could not be obtained.");
        this.status("Personnel rehearsal failed: " + error.message + " No numerical mandate was submitted.");
      }
    }
  }
  async play(data, replay) {
    const serial = ++this.serial;
    this.wake?.();
    this.reading = true;
    this.stepping = false;
    this.paused = false;
    this.controls();
    this.status(replay ? "Replaying the retained specimen. No Java operation will be repeated." : "Reading completed personnel proceedings. Production output remains intact.");
    await this.view.read(data, { current: () => serial === this.serial, waitWhilePaused: async () => {
      while (this.paused && serial === this.serial) await this.wait();
    }, delay: async () => {
      const delay = Number(byId("experiment-speed").value);
      if (delay) await this.wait(delay);
    } }, replay ? "Replay of read-only rehearsal" : void 0);
    if (serial !== this.serial) return;
    this.reading = false;
    this.view.setBusy(false);
    this.status("Personnel " + (replay ? "replay complete" : data.status === "APPROVED" ? "rehearsal approved" : "rehearsal rejected") + ". Numerical output and production evidence are retained.");
    this.controls();
  }
};

// web/demo.ts
var runForm = byId("run-form");
var limitInput = byId("limit");
var speedControl = byId("display-speed");
var runButton = byId("run-button");
var mandateSequence = 0;
var pauseButton = byId("pause-reading");
var revealButton = byId("reveal-all");
var stopButton = byId("stop-reading");
var streaming = false;
var followOutput = byId("follow-output");
var reading = false;
var productionActive = false;
var paused = false;
var revealAll = false;
var wakeReading;
var activityMode = "mandate";
var manualStep = false;
var forecastSequence = 0;
var chronicle = new ExecutiveChronicle();
var precedent = new PrecedentView();
new PrecedentView("experiment-");
new PremisesDesk();
var workspace;
var heists;
var office = new OfficeTourDesk();
var supervision = new OfficeSupervisionDesk({ reading: () => reading, paused: () => paused, pause: setReadingPaused, wake: () => {
  wakeReading?.();
  readingControls();
}, notice: (text2) => setText("run-status", text2) });
officeEstate.subscribe((event) => {
  if (event.kind !== "progress") {
    wakeReading?.();
  }
});
var reorganizationPanels = [new ReorganizationPanel(byId("supervision-reorganization")), new ReorganizationPanel(byId("office-reorganization"))];
var companions = new CompanionDesk({ remember: (discovery) => {
  office.remember(discovery);
  supervision.remember(discovery);
  workspace?.remember(discovery);
  heists?.remember(discovery);
}, clearCompanions: () => {
  office.clearCompanions();
  supervision.clearCompanions();
  workspace?.clearCompanions();
  heists?.clear();
} });
var currentLimit = "15";
var receivedPacket;
var lastPlayback;
var inspection;
var personnel = new PersonnelProceedings({ rehearse: () => {
}, replay: () => void replayPersonnel(), step: stepPersonnel }, "");
new PersonnelExperiment();
workspace = new DemoWorkspace({ placeChronicle: (target) => chronicle.place(target) });
heists = new StampHeistDesk(() => reading && productionActive && supervision.enabled && !revealAll, () => {
  wakeReading?.();
  readingControls();
});
function discloseLines(start, lines2) {
  companions.disclose(start, lines2);
  const folios = chronicle.disclose(start, lines2);
  office.disclose(currentLimit, folios);
  workspace?.disclosed(folios.at(-1));
  lastPlayback = { kind: "mandate", folios: chronicle.records, limit: currentLimit, personnel: personnel.record, packet: receivedPacket };
  personnel.setPlaybackAvailable(true);
}
var immediate = () => revealAll || !supervision.enabled && Number(speedControl.value) === 0;
async function observeLine(folio, sequence, publish) {
  let published = false;
  const release = () => {
    if (published || sequence !== mandateSequence) return;
    published = true;
    publish();
  };
  while (supervision.enabled && !revealAll) {
    const generation = supervision.generation;
    await supervision.observe(folio, () => sequence === mandateSequence, release);
    if (sequence !== mandateSequence) return false;
    if (generation === supervision.generation || !supervision.enabled) break;
  }
  if (sequence !== mandateSequence) return false;
  while ((officeEstate.moving || officeHeist.active || paused && !supervision.enabled) && sequence === mandateSequence) await waitForPace();
  if (sequence !== mandateSequence) return false;
  release();
  return true;
}
function readingControls() {
  workspace?.runActivity(productionActive || reading, reading && paused, activityMode, officeHeist.active ? "Approval stamp missing \xB7 proceedings held" : "");
  for (const panel of reorganizationPanels) panel.setReading(reading);
  stopButton.setAttribute("aria-disabled", String(!reading));
  revealButton.textContent = activityMode === "replay" ? "Reveal completed proceedings" : streaming ? "Waive disclosure delays" : "Reveal complete output";
  pauseButton.setAttribute("aria-disabled", String(!reading));
  revealButton.setAttribute("aria-disabled", String(!reading));
  playbackIcon(pauseButton, paused ? "play" : "pause", paused ? "Resume reading" : "Pause reading");
  pauseButton.setAttribute("aria-pressed", String(paused));
  if (supervision.enabled) revealButton.textContent = "Restore autonomy and reveal output";
  supervision.syncControls();
}
function setReadingPaused(value) {
  if (!reading) return;
  if (paused === value) return;
  paused = value;
  const office2 = supervision.enabled ? byId("supervision-current").querySelector("strong")?.textContent : void 0;
  setText("run-status", office2 ? "Observation " + (paused ? "paused" : "resumed") + " \xB7 " + office2 : paused ? "Ceremonial reading paused. Resume or reveal the complete output when ready." : "Ceremonial reading resumed.");
  readingControls();
  wakeReading?.();
}
pauseButton.addEventListener("click", () => setReadingPaused(!paused));
revealButton.addEventListener("click", () => {
  if (!reading) return;
  supervision.disable();
  revealAll = true;
  paused = false;
  wakeReading?.();
});
speedControl.addEventListener("change", () => wakeReading?.());
function followLatest() {
  if (followOutput.checked) byId("output").scrollTop = byId("output").scrollHeight;
}
followOutput.addEventListener("change", followLatest);
readingControls();
function finishProduction() {
  productionActive = false;
  companions.completeRun();
  heists?.complete();
}
var autocorrect = byId("numeric-autocorrect");
var warnedValue = "";
var warningIndex = -1;
function inspectMagnitude() {
  if (autocorrect.checked) {
    const before = limitInput.value;
    const caret = limitInput.selectionStart;
    limitInput.value = autocorrectMandate(before);
    if (caret !== null) {
      const position = autocorrectMandate(before.slice(0, caret)).length;
      limitInput.setSelectionRange(position, position);
    }
  }
  let limit;
  try {
    limit = parseMandate(limitInput.value);
  } catch {
    limit = null;
  }
  const warning = byId("magnitude-warning");
  warning.hidden = typeof limit !== "bigint";
  if (typeof limit === "bigint" && limitInput.value !== warnedValue) {
    const selected = chooseMagnitudeWarning(warningIndex);
    warningIndex = selected.index;
    warning.textContent = selected.text;
    warnedValue = limitInput.value;
  } else if (typeof limit !== "bigint") warnedValue = "";
  return limit;
}
var forecastTimer;
limitInput.addEventListener("input", () => {
  const limit = inspectMagnitude();
  limitInput.removeAttribute("aria-invalid");
  setText("limit-error", "");
  clearTimeout(forecastTimer);
  if (limit !== null) forecastTimer = setTimeout(() => void loadForecast(limit).catch(() => setText("forecast-units", "Unavailable")), 180);
});
autocorrect.addEventListener("change", () => {
  inspectMagnitude();
  limitInput.removeAttribute("aria-invalid");
  setText("limit-error", "");
});
function validateLimit() {
  const limit = inspectMagnitude();
  if (limit === null) {
    limitInput.setAttribute("aria-invalid", "true");
    setText("limit-error", "Enter a non-negative whole number using digits 0\u20139.");
    limitInput.focus();
    return null;
  }
  limitInput.removeAttribute("aria-invalid");
  setText("limit-error", "");
  return limit;
}
stopButton.addEventListener("click", () => {
  if (!reading) return;
  heists?.cancel();
  officeEstate.finish(), ++mandateSequence;
  reading = false;
  streaming = false;
  paused = false;
  finishProduction();
  wakeReading?.();
  readingControls();
  supervision.interrupt();
  runButton.removeAttribute("aria-disabled");
  byId("output").removeAttribute("aria-busy");
  personnel.stopReading();
  chronicle.note("The ceremonial disclosure was adjourned. Already printed numbers and their minutes remain available; this does not reverse completed business operations.", "Proceedings adjourned");
  setText("run-status", "Proceedings stopped. Already disclosed lines remain visible.");
});
function showForecast(forecast) {
  setText("forecast-numerals", forecast.numeralLines);
  setText("forecast-fizz", forecast.fizzLines);
  setText("forecast-buzz", forecast.buzzLines);
  setText("forecast-joint", forecast.fizzBuzzLines);
  setText("forecast-units", forecast.workloadUnits);
}
async function loadForecast(limit, _sequence = mandateSequence) {
  const sequence = ++forecastSequence;
  const desk = typeof limit === "number" && limit <= 1e3 ? "/capacity/forecast" : "/capacity/forecast/extended";
  const reply = await request(`${desk}?limit=${limit}`);
  if (!reply.ok) throw new Error(`Forecast desk returned ${reply.status}.`);
  const forecast = await reply.json();
  if (sequence === forecastSequence) showForecast(forecast);
}
function waitForPace(milliseconds) {
  return new Promise((resolve) => {
    let timer;
    const finish = () => {
      clearTimeout(timer);
      if (wakeReading === finish) wakeReading = void 0;
      resolve();
    };
    wakeReading = finish;
    if (milliseconds !== void 0) timer = setTimeout(finish, milliseconds);
  });
}
async function revealOutput(text2, sequence, serviceMillis) {
  readingControls();
  const lines2 = text2 ? text2.trimEnd().split(/\r?\n/) : [];
  const output = byId("output");
  output.textContent = lines2.length ? "" : "The zero-number mandate produces no lines.";
  setText("output-count", `0 of ${lines2.length} lines`);
  setText("run-status", supervision.enabled ? `Java answered in ${serviceMillis} ms. Executive observation now controls disclosure.` : `Service answered in ${serviceMillis} milliseconds. The ceremonial reading is in progress.`);
  if (supervision.enabled) await supervision.prelude(() => sequence === mandateSequence);
  for (let index = 0; index < lines2.length; index++) {
    if (sequence !== mandateSequence) return;
    while ((officeEstate.moving || officeHeist.active || paused && !supervision.enabled) && sequence === mandateSequence) await waitForPace();
    if (sequence !== mandateSequence) return;
    if (immediate()) {
      discloseLines(String(index + 1), lines2.slice(index));
      output.append(document.createTextNode(`${lines2.slice(index).join("\n")}
`));
      followLatest();
      setText("output-count", `${lines2.length} ${lines2.length === 1 ? "line" : "lines"}`);
      break;
    }
    const ordinal = String(index + 1);
    if (!await observeLine(chronicle.folio(ordinal, lines2[index]), sequence, () => {
      output.append(document.createTextNode(`${lines2[index]}
`));
      discloseLines(ordinal, [lines2[index]]);
      followLatest();
      setText("output-count", `${index + 1} of ${lines2.length} lines`);
    })) return;
    if (index < lines2.length - 1 && !supervision.enabled && !revealAll) await waitForPace(Number(speedControl.value));
  }
  if (supervision.enabled) await supervision.finishPacket(() => sequence === mandateSequence);
  while (officeHeist.active && sequence === mandateSequence) await waitForPace();
  if (sequence === mandateSequence) {
    setText("output-count", `${lines2.length} ${lines2.length === 1 ? "line" : "lines"}`);
    reading = false;
    finishProduction();
    readingControls();
    chronicle.finish(lines2.length === 0);
    office.complete(lines2.length === 0);
    supervision.complete();
    setText("run-status", `Mandate complete. The service answered in ${serviceMillis} milliseconds; ${serviceMillis < 1e3 ? "under" : "above"} the one-second target. All ${lines2.length} lines are visible.`);
  }
}
async function streamMandate(limit, sequence, started) {
  let next = typeof limit === "bigint" ? 1n : 1;
  let disclosed = typeof limit === "bigint" ? 0n : 0;
  let first = true;
  streaming = true;
  reading = true;
  paused = false;
  revealAll = false;
  readingControls();
  const output = byId("output");
  output.textContent = "";
  function append(lines2) {
    discloseLines(String(addOrdinals(disclosed, 1)), lines2);
    const top = output.scrollTop;
    const height = parseFloat(getComputedStyle(output).lineHeight) || 20;
    const fragment = document.createDocumentFragment();
    for (const line of lines2) fragment.append(document.createTextNode(line + "\n"));
    output.append(fragment);
    let removed = 0;
    while (output.childNodes.length > 1e3) {
      output.firstChild.remove();
      removed++;
    }
    if (followOutput.checked) followLatest();
    else output.scrollTop = Math.max(0, top - removed * height);
    disclosed = addOrdinals(disclosed, lines2.length);
    const bound = supervision.enabled && String(limit).length > 24 ? String(limit).slice(0, 8) + "\u2026 (" + String(limit).length + " digits)" : String(limit);
    setText("output-count", `${disclosed} of ${bound} lines \xB7 latest ${Math.min(1e3, output.childNodes.length)} retained`);
  }
  while (sequence === mandateSequence) {
    while ((officeHeist.active || officeEstate.moving || paused && (!supervision.enabled || !supervision.hasStepCredit)) && sequence === mandateSequence) await waitForPace();
    if (sequence !== mandateSequence) return;
    const count = windowCount(next, limit);
    const answer = await proclamation(`/fizzbuzz/window?start=${next}&count=${count}`);
    const packet = await readProclamation(answer);
    const text2 = packet.text;
    const lines2 = answer.ok ? text2.trimEnd().split("\n") : [];
    if (answer.ok && lines2.length !== count) throw new Error("The response did not contain the authorized number of lines.");
    if (sequence !== mandateSequence) return;
    receivedPacket = packet;
    chronicle.receive(packet);
    office.receive(packet);
    supervision.receive(packet, String(next), lines2.length);
    setText("trace-result", answer.headers.get("X-SlopBuzz-Trace-Id") || "UNAVAILABLE");
    if (first) {
      first = false;
      const elapsed = Math.round(performance.now() - started);
      setText("latency", `${elapsed} ms \xB7 first batch`);
      setText("cache-result", "BYPASS");
      runButton.removeAttribute("aria-disabled");
      output.removeAttribute("aria-busy");
      if (answer.ok) trackUsage({ event: "slopbuzz_demo_run", outcome: "success", runtime_mode: config.mode, duration_ms: elapsed, cache_outcome: "BYPASS" });
      const record = personnel.responseRecord(answer);
      if (record) {
        personnel.prepare(record);
        personnel.disclose(7);
      }
      if (sequence !== mandateSequence) return;
    }
    if (!answer.ok) throw new Error(`Extended proclamation desk returned ${answer.status}.`);
    for (let i = 0; i < lines2.length; ) {
      while ((officeHeist.active || officeEstate.moving || paused && !supervision.enabled) && sequence === mandateSequence) await waitForPace();
      if (sequence !== mandateSequence) return;
      if (immediate()) {
        append(lines2.slice(i));
        i = lines2.length;
      } else {
        const ordinal = String(addOrdinals(disclosed, 1)), line = lines2[i];
        if (!await observeLine(chronicle.folio(ordinal, line), sequence, () => append([line]))) return;
        i++;
        if (disclosed !== limit && !supervision.enabled && !revealAll) await waitForPace(Number(speedControl.value));
      }
    }
    if (supervision.enabled) await supervision.finishPacket(() => sequence === mandateSequence);
    while (officeHeist.active && sequence === mandateSequence) await waitForPace();
    if (sequence !== mandateSequence) return;
    if (disclosed === limit) break;
    next = addOrdinals(next, count);
    setText("run-status", `Extended proceedings in progress. ${disclosed} lines disclosed; use Stop proceedings to adjourn.`);
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  if (sequence === mandateSequence) {
    reading = false;
    streaming = false;
    finishProduction();
    readingControls();
    chronicle.finish();
    supervision.complete();
    setText("run-status", `Mandate complete. ${disclosed} lines disclosed; the latest ${output.childNodes.length} remain visible. Extended proceedings are transient.`);
  }
}
async function runMandate(event) {
  event.preventDefault();
  const limit = validateLimit();
  if (limit === null) return;
  const sequence = ++mandateSequence;
  heists?.cancel();
  if (productionActive) companions.withdrawRun();
  workspace.commitDraft(String(limit));
  companions.beginRun(String(limit));
  productionActive = true;
  heists?.begin(String(limit));
  wakeReading?.();
  reading = false;
  streaming = false;
  activityMode = "mandate";
  manualStep = false;
  inspection = void 0;
  lastPlayback = void 0;
  receivedPacket = void 0;
  currentLimit = String(limit);
  supervision.begin(currentLimit);
  readingControls();
  personnel.setPlaybackAvailable(false);
  personnel.loading();
  chronicle.begin(currentLimit);
  office.begin(currentLimit);
  precedent.waiting(typeof limit === "bigint" || limit > 1e3);
  byId("output").setAttribute("aria-busy", "true");
  setText("run-status", supervision.enabled && String(limit).length > 24 ? `The committee is considering a ${String(limit).length}-digit mandate\u2026` : `The committee is considering ${limit} numbers\u2026`);
  setText("trace-result", "Awaiting a receipt");
  byId("output").textContent = "Awaiting a duly authorized number.";
  setText("output-count", "0 lines");
  void loadForecast(limit, sequence).catch(() => {
    if (sequence === mandateSequence) setText("forecast-units", "Unavailable");
  });
  const started = performance.now();
  try {
    if (typeof limit === "bigint" || limit > 1e3) {
      await streamMandate(limit, sequence, started);
      return;
    }
    const answer = await proclamation(`/fizzbuzz?limit=${limit}`);
    const elapsed = performance.now() - started;
    const packet = await readProclamation(answer);
    const text2 = packet.text;
    if (answer.ok) trackUsage({ event: "slopbuzz_demo_run", outcome: "success", runtime_mode: config.mode, duration_ms: elapsed, cache_outcome: answer.headers.get("X-SlopBuzz-Cache") || "UNKNOWN" });
    if (sequence !== mandateSequence) return;
    receivedPacket = packet;
    chronicle.receive(packet);
    office.receive(packet);
    supervision.receive(packet, "1", text2 ? text2.trimEnd().split(/\r?\n/).length : 0);
    precedent.mandate(packet.precedent, packet.cache);
    setText("latency", `${Math.round(elapsed)} ms`);
    setText("cache-result", answer.headers.get("X-SlopBuzz-Cache") || "UNKNOWN");
    setText("trace-result", answer.headers.get("X-SlopBuzz-Trace-Id") || "UNAVAILABLE");
    runButton.removeAttribute("aria-disabled");
    byId("output").removeAttribute("aria-busy");
    reading = true;
    paused = false;
    revealAll = false;
    readingControls();
    const record = personnel.responseRecord(answer);
    if (record) {
      personnel.prepare(record);
      personnel.disclose(7);
    }
    lastPlayback = { kind: "mandate", folios: [], limit: currentLimit, personnel: record, packet };
    personnel.setPlaybackAvailable(true);
    if (sequence !== mandateSequence) return;
    if (!answer.ok) throw new Error(`Proclamation desk returned ${answer.status}.`);
    await revealOutput(text2, sequence, Math.round(elapsed));
  } catch (error) {
    trackUsage({ event: "slopbuzz_demo_run", outcome: "failure", runtime_mode: config.mode, duration_ms: performance.now() - started });
    if (sequence === mandateSequence) {
      reading = false;
      streaming = false;
      finishProduction();
      readingControls();
      supervision.interrupt();
      personnel.setBusy(false);
      if (!personnel.record) personnel.clear("The request failed before any personnel record could be inspected.", "Evidence unavailable");
      chronicle.note(`The operation could not complete: ${error.message}. No automatic second mandate was submitted.`, "Exception management");
      setText("run-status", error.name === "AbortError" ? "The desk did not answer within eight seconds. Please try again." : `The mandate could not be completed: ${error.message}`);
    }
  } finally {
    if (sequence === mandateSequence) {
      runButton.removeAttribute("aria-disabled");
      byId("output").removeAttribute("aria-busy");
    }
  }
}
function beginPersonnelActivity(mode) {
  heists?.cancel();
  finishProduction();
  workspace?.beginDisclosure();
  const sequence = ++mandateSequence;
  wakeReading?.();
  supervision.interrupt();
  activityMode = mode;
  manualStep = mode === "inspection";
  reading = mode !== "inspection";
  streaming = false;
  paused = false;
  revealAll = false;
  runButton.removeAttribute("aria-disabled");
  byId("output").removeAttribute("aria-busy");
  readingControls();
  if (supervision.enabled && mode !== "inspection") {
    byId("supervision-title").focus({ preventScroll: true });
    byId("mandate-output").scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return sequence;
}
async function replayPersonnel() {
  const saved = lastPlayback;
  if (!saved) return;
  workspace.navigate("observe");
  const sequence = beginPersonnelActivity("replay");
  workspace.clearCompanions();
  companions.reset(saved.limit);
  chronicle.begin(saved.limit, "replay");
  office.begin(saved.limit, "replay");
  supervision.begin(saved.limit, "replay");
  setText("run-status", "Replaying the retained numerical output and its corporate minutes. No mandate was submitted.");
  const output = byId("output");
  output.textContent = "";
  if (!saved.folios.length && saved.packet) {
    supervision.receive(saved.packet, "1", 0);
    if (supervision.enabled) await supervision.prelude(() => sequence === mandateSequence);
  }
  for (let i = 0; i < saved.folios.length; ) {
    while ((officeHeist.active || officeEstate.moving || paused && !supervision.enabled) && sequence === mandateSequence) await waitForPace();
    if (sequence !== mandateSequence) return;
    const batch = immediate() ? saved.folios.slice(i) : saved.folios.slice(i, i + 1), shown = i + batch.length;
    const publish = () => {
      for (const folio of batch) companions.disclose(folio.ordinal, [folio.text]);
      chronicle.discloseFolios(batch);
      workspace.disclosed(batch.at(-1));
      office.disclose(saved.limit, batch);
      output.append(document.createTextNode(batch.map((f) => f.text + "\n").join("")));
      followLatest();
      setText("output-count", shown + " of " + saved.folios.length + " retained lines");
    };
    if (batch.length === 1) {
      if (!await observeLine(batch[0], sequence, publish)) return;
    } else publish();
    i += batch.length;
    if (i < saved.folios.length && !supervision.enabled && !revealAll && Number(speedControl.value) > 0) await waitForPace(Number(speedControl.value));
  }
  if (supervision.enabled) await supervision.finishPacket(() => sequence === mandateSequence);
  if (sequence === mandateSequence) {
    if (!saved.folios.length) output.textContent = "The zero-number mandate produces no lines.";
    chronicle.finish(saved.limit === "0");
    office.complete(saved.limit === "0");
    reading = false;
    readingControls();
    supervision.complete();
    setText("run-status", "Execution replay complete. No business operation was executed again.");
  }
}
function stepPersonnel() {
  const saved = lastPlayback;
  if (!saved) return;
  if (!manualStep || !inspection || inspection.index >= inspection.folios.length) {
    beginPersonnelActivity("inspection");
    inspection = { folios: saved.folios, index: 0 };
    chronicle.begin(saved.limit, "replay");
  }
  const folio = inspection.folios[inspection.index++];
  if (folio) {
    chronicle.discloseFolios([folio]);
    office.inspect(folio);
  } else chronicle.finish(saved.limit === "0");
  setText("personnel-step", inspection.index < inspection.folios.length ? "Next ordinal" : "Step through");
  setText("run-status", "Inspecting completed execution: " + Math.min(inspection.index, inspection.folios.length) + " of " + inspection.folios.length + " retained ordinals. Numerical output is retained.");
}
runForm.addEventListener("submit", runMandate);
document.querySelectorAll("[data-limit]").forEach((button) => {
  button.addEventListener("click", () => {
    limitInput.value = button.dataset.limit || "15";
    limitInput.dispatchEvent(new Event("input"));
    runForm.requestSubmit();
  });
});
void loadForecast(15).catch(() => setText("forecast-units", "Unavailable"));
void request("/healthz").then((reply) => setText("health-value", reply.ok ? "LIVE" : "UNAVAILABLE")).catch(() => setText("health-value", "UNAVAILABLE"));
prepareSharedEncounter(limitInput);
for (const event of ["site-page-change", "site-page-ready"]) document.addEventListener(event, () => {
  if (onDemoPage()) prepareSharedEncounter(limitInput);
});
