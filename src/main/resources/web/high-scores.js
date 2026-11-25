// Generated from web/*.ts by scripts/build.ts. Do not edit.

// web/leaderboard-model.ts
var leaderboardAPI = "/api/high-scores";
var participationKey = "slopbuzz:high-scores:participation:v1";
var pendingScoresKey = "slopbuzz:high-scores:pending:v1";
function leaderboardName(value) {
  if (typeof value !== "string") throw Error("Enter a name using letters, digits, spaces, hyphens and underscores.");
  const name = value.trim();
  if (!/^[A-Za-z0-9 _-]{1,24}$/.test(name) || !/[A-Za-z0-9]/.test(name)) throw Error("Use 1\u201324 ASCII letters, digits, spaces, hyphens or underscores, including at least one letter or digit.");
  return name;
}
function publicationReceipt(run) {
  if (run.publicationProtocol !== 1 || !Number.isSafeInteger(run.revision) || run.partial || BigInt(run.verification.through) < 1n) return;
  if (run.publicationInterrupted) {
    const original = run.publicationInterrupted;
    run = structuredClone(run);
    delete run.publicationInterrupted;
    run.revision = original.revision;
    run.updatedAt = original.updatedAt;
    run.status = "active";
    run.verification.status = "active";
    run.incident = structuredClone(original.incident);
    run.closedHeists = structuredClone(original.closedHeists);
  }
  return { schema: "slopbuzz-leaderboard/v1", sequence: run.revision, run };
}

// web/scoreboards.ts
var anonymousName = "Anonymous Coward";
var dayMs = 864e5;
var scoreboards = [
  { id: "daily", label: "Daily", window: "Last 24 hours", duration: dayMs },
  { id: "weekly", label: "Weekly", window: "Last 7 days", duration: 7 * dayMs },
  { id: "monthly", label: "Monthly", window: "Last 30 days", duration: 30 * dayMs },
  { id: "all-time", label: "All-time", window: "All recorded scores", duration: 0 }
];
function isScoreboard(value) {
  return scoreboards.some((b) => b.id === value);
}
function scoreboardIcon(board) {
  const paths = {
    daily: '<circle cx="22" cy="22" r="13"/><path d="M22 2v4m0 32v4M2 22h4m32 0h4M8 8l3 3m22 22 3 3M8 36l3-3m22-22 3-3"/>',
    weekly: '<path d="m4 7 8 31 10-19 10 19 8-31"/>',
    monthly: '<rect x="4" y="7" width="36" height="33" rx="4"/><path d="M4 15h36M13 3v8M31 3v8"/>',
    "all-time": '<path d="M10 5h24v13c0 8-5 13-12 13s-12-5-12-13V5Zm0 5H3v7c0 6 4 10 11 10m20-17h7v7c0 6-4 10-11 10M22 31v8m-8 2h16"/>'
  };
  return `<svg viewBox="0 0 44 44" width="40" height="40" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths[board]}</g></svg>`;
}

// web/scoring-language.ts
var integer = (value) => ({ constant: String(value) });
var field = (variable) => ({ variable });
var operation = (op, ...args) => ({ op, args });
var lookup = (table, key) => ({ lookup: table, key });
var sum = (...args) => operation("add", ...args);
var product = (...args) => operation("multiply", ...args);
var clamp = (value, low, high) => operation("min", high, operation("max", low, value));
var arities = { add: [1, 100], subtract: [2, 2], multiply: [1, 100], floorDivide: [2, 2], ceilDivide: [2, 2], min: [2, 100], max: [2, 100], mod: [2, 2], equal: [2, 2], atLeast: [2, 2], digits: [1, 1], digitSum: [1, 1], trailingZeroes: [1, 1], palindrome: [1, 1], identicalDigits: [1, 1], powerOfTen: [1, 1] };
function validateExpression(e, tables) {
  if ("constant" in e) {
    if (!/^-?\d+$/.test(e.constant)) throw Error("Non-integer scoring constant");
    return;
  }
  if ("variable" in e) {
    if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(e.variable)) throw Error("Invalid scoring variable");
    return;
  }
  if ("lookup" in e) {
    if (!tables[e.lookup] || !e.key) throw Error("Missing scoring table");
    return;
  }
  const arity = arities[e.op];
  if (!arity || e.args.length < arity[0] || e.args.length > arity[1]) throw Error("Undocumented scoring operator");
  for (const arg of e.args) validateExpression(arg, tables);
}

// web/scoring-rules.ts
var scoringVersion = "enterprise-v2";
var rates = (category, scope2, items) => items.map(([id, title, rate, eligibility, cap]) => ({ id, title, category, scope: scope2, formula: product(integer(rate), field("quantity")), eligibility: eligibility || "Each actual completed occurrence, once per unique receipt.", ...cap === void 0 ? {} : { cap } }));
var rarityTables = { salary: { Common: "100", Uncommon: "250", Rare: "1000", Legendary: "10000", Mythic: "100000" }, rarity: { Common: "1", Uncommon: "2", Rare: "5", Legendary: "10", Mythic: "25" }, entrance: { Common: "0", Uncommon: "0", Rare: "0", Legendary: "250000", Mythic: "2500000" } };
var boostSchedule = [{ every: "5000", factor: 10, cycles: 1 }, { every: "1000", factor: 5, cycles: 4 }, { every: "500", factor: 3, cycles: 10 }, { every: "250", factor: 2, cycles: 20 }];
var scoringPolicy = { recentReceipts: 100, companionIdentities: 3200, reorganizationEvery: "100", initialWarrants: "1", graceMs: 3e3, chaseMs: 15e3, fullRecoveryThroughMs: 4e3, minimumRecoveryFromMs: 14e3, heistLimit: 3, flightPersonalities: 13, partitionStyles: 12, departments: 8, loyaltyEvery: "10" };
var financialRules = {
  budget: operation("floorDivide", product(field("openingScore"), integer(800)), integer(1e4)),
  stolen: operation("floorDivide", product(field("budget"), clamp(operation("subtract", field("elapsedMs"), integer(scoringPolicy.graceMs)), integer(0), integer(scoringPolicy.chaseMs - scoringPolicy.graceMs))), integer(scoringPolicy.chaseMs - scoringPolicy.graceMs)),
  recoveryBasisPoints: clamp(operation("subtract", integer(1e4), operation("floorDivide", product(integer(9), operation("max", integer(0), operation("subtract", field("elapsedMs"), integer(scoringPolicy.fullRecoveryThroughMs)))), integer(10))), integer(1e3), integer(1e4)),
  recovery: operation("min", field("stolen"), operation("ceilDivide", product(field("stolen"), field("recoveryBasisPoints")), integer(1e4)))
};
var meritRules = [
  ...rates("Procedural work", "cycle", [
    ["runtime", "Runtime readiness confirmed", 2],
    ["ownership", "Execution ownership confirmed", 2],
    ["mandate", "Mandate accepted", 5],
    ["bounds", "Bounds validated", 2],
    ["boundDigit", "Canonical bound digit validated", 1],
    ["cacheLookup", "Cache lookup", 2],
    ["cacheDisposition", "Cache hit, miss or bypass established", 3],
    ["priorExam", "Prior-work authority examination", 5],
    ["priorReuse", "Prior-work reuse authorized", 10],
    ["window", "New extended window admitted", 5],
    ["hrPlanning", "Headcount Planning approval", 5],
    ["hrRecruitment", "Recruitment approval", 5],
    ["hrIdentity", "Identity approval", 5],
    ["hrOffer", "Offer approval", 5],
    ["hrInduction", "Induction approval", 5],
    ["hrProbation", "Probation approval", 5],
    ["hrAudit", "Independent personnel audit", 5],
    ["ballot", "Continuation ballot", 1],
    ["continuation", "Continuation certified", 2],
    ["context", "Fizz, Buzz or numeral context appointed", 2],
    ["visitor", "Shared visitor convened", 2],
    ["classification", "Classification vote", 2],
    ["witness", "Arithmetic witness", 3],
    ["printer", "Printer consultation, including correct refusal", 2],
    ["premises", "Request-owned premises allocation", 2],
    ["vacancy", "Initial vacancy inspection", 2],
    ["hiddenGlyph", "Hidden character identified", 1],
    ["evictionDecision", "Eviction decision, including not required", 3],
    ["evictedGlyph", "Hidden character removed", 1],
    ["reinspection", "Vacancy reinspection", 3],
    ["lease", "Single-use lease", 3],
    ["premisesAudit", "Independent premises audit", 5],
    ["vacancyCertificate", "Vacancy certificate filed", 3],
    ["transaction", "Transaction opened", 3],
    ["requisition", "Product requisition", 4],
    ["allocation", "Position-specific glyph allocated", 1],
    ["delivery", "Product delivered", 3],
    ["acceptedGlyph", "Glyph accepted", 4],
    ["placedGlyph", "Accepted glyph placed", 1],
    ["assembly", "Completed word assembly certified", 8],
    ["numeral", "Numeral conversion", 3],
    ["digit", "Decimal digit placed", 1],
    ["fragment", "Output fragment staged", 2],
    ["notary", "Independent arithmetic or lexical notarization", 8],
    ["payload", "Complete payload published", 10],
    ["audit", "Audit record appended", 8],
    ["enqueue", "Queue entry created", 2],
    ["acknowledge", "Consumer acknowledgement", 3],
    ["commit", "Transaction committed", 5],
    ["release", "Occupancy released", 2],
    ["cleanup", "Staging cleanup", 2],
    ["successionPetition", "Succession petition", 1],
    ["successor", "Successor certified", 2],
    ["advance", "Ordinal advanced", 1],
    ["complete", "Mandate completion recorded", 10],
    ["rejection", "Certified rejection", 3, "First certified rejection per logical operation; retries do not pay again."],
    ["rollback", "Certified rollback", 4, "Once per rejected logical operation. Errors themselves earn nothing."]
  ]),
  ...rates("Publication", "cycle", [["line", "New output line", 5], ["character", "Visible output character", 1], ["separator", "Line separator", 1], ["fizz", "Fizz classification", 10, "Exclusive of Buzz and FizzBuzz."], ["buzz", "Buzz classification", 15, "Exclusive of Fizz and FizzBuzz."], ["fizzbuzz", "FizzBuzz classification", 50, "Exclusive of Fizz and Buzz."]]),
  ...[
    ["digitSum", "Decimal digit sum", operation("digitSum", field("ordinal"))],
    ["zeroes", "Trailing decimal zeroes", product(integer(25), operation("trailingZeroes", field("ordinal")))],
    ["palindrome", "Multi-digit palindrome", product(integer(100), operation("digits", field("ordinal")), operation("palindrome", field("ordinal")))],
    ["identical", "Multi-digit identical digits", product(integer(150), operation("digits", field("ordinal")), operation("identicalDigits", field("ordinal")))],
    ["powerTen", "Exact power of ten", product(integer(100), operation("powerOfTen", field("ordinal")))]
  ].map(([id, title, formula]) => ({ id, title, formula, category: "Numerical distinctions", scope: "cycle", eligibility: "Once per newly disclosed ordinal. Qualifying numerical distinctions stack." })),
  { id: "appointment", title: "Companion salary and supplements", category: "Companions", scope: "cycle", formula: sum(product(lookup("rarity", "rarity"), sum(lookup("salary", "rarity"), product(integer(250), field("paired")), product(integer(500), field("loyalty")))), product(integer(1e3), field("first"))), eligibility: "Every genuine appointment, including repeats. Pair supplement once per appointment; loyalty every tenth appointment of the identity; first identity once per run." },
  { id: "entrance", title: "Legendary or Mythic entrance grant", category: "Companions", scope: "flat", formula: lookup("entrance", "rarity"), eligibility: "Every genuine appointment, including repeats. Never multiplied." },
  ...rates("Extraordinary operations", "incident", [
    ["flightManifest", "Flight manifest registered", 100],
    ["flightCrew", "Actual crew boarded", 50, "Actual crew only; no companion appointment awarded.", 3],
    ["flightFold", "Aircraft folded", 200],
    ["flightDeparture", "Departure completed", 300],
    ["flightCheckpoint", "Fan checkpoint passed", 100, void 0, 3],
    ["flightLoop", "Authorized holding loop completed", 150, void 0, 3],
    ["flightPersonality", "Signature personality maneuver completed", 300],
    ["flightApproach", "Final approach", 200],
    ["flightLanding", "Landing completed", 1e3],
    ["flightFinding", "Delivery finding recorded", 500],
    ["flightDelivery", "Successful direct, courier or expedited delivery", 500],
    ["flightFan", "Final effective non-default fan policy", 100, "Once per fan; repeated adjustment does not repay.", 3],
    ["flightDestination", "Non-default destination actually served", 200],
    ["flightFirstPilot", "First completed flight by this personality", 500, "Once per personality per run."],
    ["flightResume", "Flight continued after reorganization", 500, "Once per flight, after actual progress resumes."],
    ["heistCase", "Heist case registered", 100],
    ["heistSuspect", "Actual suspect registered", 50, void 0, 3],
    ["heistTactic", "Signature tactic identified", 300, "Once at identification; waiting for escape earns nothing."],
    ["heistFootprints", "Footprints inspected", 200, "Once per case."],
    ["heistAlibi", "Distinct innocent alibi", 100, void 0, 2],
    ["heistCatch", "Successful player interception or amnesty", 1e3, "No award for automatic return, skip, disable or cancellation."],
    ["heistReturn", "Stamp returned", 500],
    ["heistReport", "Case report filed", 250],
    ["heistResume", "Heist continued after reorganization", 500, "Once per case, after actual progress resumes."]
  ]),
  ...rates("Extraordinary operations", "flat", [
    ["moveCharter", "Reorganization charter", 100],
    ["movePack", "Room packed", 25, void 0, 8],
    ["moveRoom", "Room moved", 50, void 0, 8],
    ["moveUnpack", "Room unpacked", 25, void 0, 8],
    ["moveAddress", "Room address rebound", 10, void 0, 8],
    ["movePartition", "Room partition certified", 25, void 0, 8],
    ["moveRoute", "Directed route validated", 1, void 0, 56],
    ["moveAmenity", "Ninth amenity accommodated", 100],
    ["moveMinutes", "Reorganization minutes filed", 100],
    ["moveResume", "Interrupted work advanced afterward", 250]
  ]),
  ...rates("Office literacy", "flat", [
    ["biography", "Appointed companion biography inspected", 25, "First inspection of each actually appointed identity in this run."],
    ["evidence", "Procedural evidence kind inspected", 5, "First inspection of each kind of actual evidence in this run."],
    ["department", "Department inspected", 10, "First inspection of each department in this run."],
    ["curiosity", "Authored curiosity response inspected", 20, "First inspection of each authored response in this run."]
  ]),
  ...rates("Achievements", "flat", [
    ["bingo", "Bureaucratic Bingo", 500, "Every fresh set of numeral, Fizz, Buzz and FizzBuzz; collection resets after award."],
    ["century", "Century of Consequences", 1e4, "Every 100 newly disclosed lines."],
    ["committee", "Appointment Committee", 2500, "Every ten appointments, including repeats."],
    ["airline", "Paper Airline", 25e3, "Every five successful natural flights."],
    ["affairs", "Internal Affairs", 15e3, "Three player-resolved natural heists, once per run."],
    ["spectrum", "Full Spectrum of Improbability", 1e5, "All five rarities appointed, once per run."],
    ["census", "Personality Census", 25e4, "All thirteen pilot personalities completed, once per run."],
    ["partitions", "Partition Connoisseur", 25e3, "All twelve styles installed through scored reorganizations, once per run."],
    ["departments", "Departmental Completionist", 2e3, "All eight departments inspected, once per run."]
  ]),
  { id: "magnitude", title: "Orders of Magnitude", category: "Achievements", scope: "flat", formula: product(integer(1e3), field("threshold")), eligibility: "Once at each completed-line count 10, 100, 1,000 and subsequent powers of ten." },
  { id: "dividend", title: "Completion dividend", category: "Completion dividend", scope: "flat", formula: sum(integer(5e3), product(integer(100), field("completed")), operation("floorDivide", field("netScore"), integer(10))), eligibility: "Once after a positive-length mandate finishes and its incidents settle. Uses net score before this dividend; abandoned runs do not qualify." }
];
var ruleById = new Map(meritRules.map((rule) => [rule.id, rule]));
var badgeRules = [
  { id: "bingo", title: "Bureaucratic Bingo", counter: "bingo", target: "1", repeat: true, award: "bingo", description: "Complete a fresh set of numeral, Fizz, Buzz and FizzBuzz." },
  { id: "century", title: "Century of Consequences", counter: "lines", target: "100", repeat: true, award: "century", description: "Disclose a century of output lines." },
  { id: "committee", title: "Appointment Committee", counter: "appointments", target: "10", repeat: true, award: "committee", description: "Appoint ten companions. Repeats count." },
  { id: "airline", title: "Paper Airline", counter: "flights", target: "5", repeat: true, award: "airline", description: "Complete five successful natural flights." },
  { id: "affairs", title: "Internal Affairs", counter: "heists", target: "3", repeat: false, award: "affairs", description: "Resolve three natural heists by interception or amnesty." },
  { id: "spectrum", title: "Full Spectrum of Improbability", counter: "rarities", target: "5", repeat: false, award: "spectrum", description: "Appoint all five rarities." },
  { id: "census", title: "Personality Census", counter: "pilots", target: String(scoringPolicy.flightPersonalities), repeat: false, award: "census", description: "Complete flights with every pilot personality, including the acting clerk." },
  { id: "partitions", title: "Partition Connoisseur", counter: "partitions", target: String(scoringPolicy.partitionStyles), repeat: false, award: "partitions", description: "Install every partition style through scored moves." },
  { id: "departments", title: "Departmental Completionist", counter: "departments", target: String(scoringPolicy.departments), repeat: false, award: "departments", description: "Inspect every department." },
  { id: "magnitude", title: "Orders of Magnitude", counter: "magnitude", target: "1", repeat: true, description: "Cross a power-of-ten completed-line milestone; award is 1,000 times the threshold." },
  { id: "untouched", title: "Not One Point", counter: "untouched", target: "1", repeat: false, description: "Stop a heist with a positive budget before its first debit. Recognition only." },
  { id: "reappropriation", title: "Reappropriation", counter: "reappropriation", target: "1", repeat: false, description: "Recover stolen points. Recognition only." },
  { id: "authority", title: "Temporary Executive Powers", counter: "boosted", target: "1", repeat: false, description: "Complete a boosted cycle. Recognition only." },
  { id: "ratified", title: "Ratified at Last", counter: "completed", target: "1", repeat: false, description: "Earn a completion dividend. Recognition only." },
  { id: "legendary", title: "Legendary Appointment", counter: "legendary", target: "1", repeat: false, description: "Receive a Legendary appointment. Recognition only." },
  { id: "mythic", title: "Mythic Appointment", counter: "mythic", target: "1", repeat: false, description: "Receive a Mythic appointment. Recognition only." }
];
var rulesManifest = { version: scoringVersion, tables: rarityTables, boosts: boostSchedule, policy: scoringPolicy, financial: financialRules, rules: meritRules, badges: badgeRules };
function validateRules() {
  if (ruleById.size !== meritRules.length || new Set(badgeRules.map((b) => b.id)).size !== badgeRules.length) throw Error("Duplicate rule or badge");
  for (const rule of meritRules) {
    validateExpression(rule.formula, rarityTables);
    if (!rule.eligibility || !rule.title || rule.cap !== void 0 && rule.cap < 1) throw Error("Incomplete rule");
  }
  for (const formula of Object.values(financialRules)) validateExpression(formula, rarityTables);
  for (const badge of badgeRules) if (badge.award && !ruleById.has(badge.award) || BigInt(badge.target) < 1n) throw Error("Invalid badge criterion");
  for (const boost of boostSchedule) if (boost.cycles < 1 || boost.cycles >= Number(boost.every) || boost.factor <= 1) throw Error("Unbounded boost");
}
validateRules();
function manifestIdentity() {
  let hash = 2166136261;
  for (const c of JSON.stringify(rulesManifest)) hash = Math.imul(hash ^ c.charCodeAt(0), 16777619) >>> 0;
  return hash.toString(16).padStart(8, "0");
}
var rulesIdentity = manifestIdentity();
var guidePath = `scoring/${scoringVersion}/${rulesIdentity}/`;

// web/discovery-model.ts
var seedPolicy = "mandate-v1";

// web/portfolio-model.ts
var portfolioRules = "companion-portfolio/v1";
var pointRates = Object.freeze({ Common: 10n, Uncommon: 25n, Rare: 100n, Legendary: 400n, Mythic: 1000n });
var scoreRarities = Object.keys(pointRates);
var scorePolicies = ["factor-resonance-v1", "ordinal-constellation-v1"];
var decimal = (value) => typeof value === "string" && /^(0|[1-9][0-9]*)$/.test(value);
var appointmentCount = (r) => scoreRarities.reduce((sum2, tier) => sum2 + BigInt(r.counts[tier]), 0n);
function decodePortfolio(value) {
  try {
    const r = value;
    if (!r || r.rules !== portfolioRules || r.seedPolicy !== seedPolicy || typeof r.id !== "string" || !r.id || !decimal(r.mandate) || !decimal(r.through) || BigInt(r.through) > BigInt(r.mandate)) return;
    if (!["active", "completed", "stopped", "replaced", "interrupted"].includes(r.status) || ![r.startedAt, r.updatedAt].every((d) => typeof d === "string" && Number.isFinite(Date.parse(d)))) return;
    if (typeof r.catalogVersion !== "string" || !scoreRarities.every((tier) => decimal(r.counts?.[tier])) || !["disabled", "unscored", "authorityChanges"].every((key) => decimal(r[key]))) return;
    if (![r.initialAuthority, r.lastAuthority].every((p) => scorePolicies.includes(p))) return;
    if (!r.authorities || Object.entries(r.authorities).some(([key, count2]) => !scorePolicies.includes(key) || !decimal(count2))) return;
    if (!Array.isArray(r.seen) || r.seen.length > 3200 || r.seen.some((id) => typeof id !== "string" || !id) || new Set(r.seen).size !== r.seen.length) return;
    const count = appointmentCount(r), through = BigInt(r.through), eligible = through / 3n + through / 5n - through / 15n;
    if (count + BigInt(r.disabled) + BigInt(r.unscored) !== eligible || BigInt(r.seen.length) > count || Object.values(r.authorities).reduce((n, c) => n + BigInt(c), 0n) !== count) return;
    if (count > 0n) {
      const h = r.highest;
      if (!r.catalogVersion || !h || !r.seen.includes(h.id) || typeof h.name !== "string" || !h.name || typeof h.emoji !== "string" || !h.emoji || !scoreRarities.includes(h.rarity) || !decimal(h.ordinal) || BigInt(h.ordinal) < 1n || BigInt(h.ordinal) > through) return;
      if (scoreRarities.some((tier) => BigInt(r.counts[tier]) > 0n && pointRates[tier] > pointRates[h.rarity])) return;
    } else if (r.highest || r.seen.length) return;
    return structuredClone(r);
  } catch {
    return;
  }
}

// web/scoring-service.ts
var netPoints = (r) => BigInt(r.gross) - BigInt(r.stolen) + BigInt(r.recovered) + BigInt(r.dividend);
var decimal2 = (s) => typeof s === "string" && /^(0|[1-9][0-9]*)$/.test(s);
function decodeScoringRun(value) {
  try {
    const r = value;
    if (!r || r.rules !== scoringVersion || !/^[a-f0-9]{8}$/.test(r.identity) || !r.id || !decodePortfolio(r.verification) || r.verification.id !== r.id || r.verification.status !== r.status || ![r.startedAt, r.updatedAt].every((d) => Number.isFinite(Date.parse(d)))) return;
    if (!["gross", "stolen", "recovered", "dividend", "warrants", "pendingResume"].every((k) => decimal2(r[k])) || BigInt(r.recovered) > BigInt(r.stolen) || netPoints(r) < 0n) return;
    if (!Array.isArray(r.recent) || r.recent.length > scoringPolicy.recentReceipts || !Array.isArray(r.inspections) || r.inspections.length > 1e4 || Object.keys(r.identities).length > scoringPolicy.companionIdentities) return;
    for (const map of [r.counters, r.badges, r.identities, r.categories]) if (!map || Object.values(map).some((v) => !decimal2(v))) return;
    if (!r.buckets || Object.keys(r.buckets).length > 2e3 || Object.entries(r.buckets).some(([id, b]) => !/^\w+\|[1-9][0-9]*$/.test(id) || ![b.points, b.quantity, b.awards].every(decimal2))) return;
    const total = BigInt(r.gross) + BigInt(r.dividend);
    if (Object.values(r.buckets).reduce((sum2, b) => sum2 + BigInt(b.points), 0n) !== total || Object.values(r.categories).reduce((sum2, p) => sum2 + BigInt(p), 0n) !== total) return;
    if (r.recent.some((x) => !/^\w+$/.test(x.rule) || ![x.points, x.quantity, x.factor].every(decimal2))) return;
    if (![r.rarities, r.pilots, r.partitions, r.departments, r.bingo].every((a) => Array.isArray(a) && a.length <= 3200 && a.every((v) => typeof v === "string"))) return;
    if (r.incident && (![r.incident.opening, r.incident.budget, r.incident.stolen, r.incident.recovered].every(decimal2) || !Number.isFinite(r.incident.elapsed) || r.incident.elapsed < 0 || BigInt(r.incident.budget) > BigInt(r.incident.opening) || BigInt(r.incident.stolen) > BigInt(r.incident.budget) || BigInt(r.incident.recovered) > BigInt(r.incident.stolen))) return;
    return structuredClone(r);
  } catch {
    return;
  }
}
var scoreCategories = [...new Set(meritRules.map((r) => r.category))];

// web/leaderboard-client.ts
var LeaderboardHTTPError = class extends Error {
  status;
  retryAfter;
  constructor(message, status, retryAfter = 0) {
    super(message);
    this.status = status;
    this.retryAfter = retryAfter;
  }
};
var LeaderboardClient = class {
  state = { choice: "undecided", error: "", stale: false, enabled: false, sitekey: "", invitation: false };
  listeners = /* @__PURE__ */ new Set();
  queue = /* @__PURE__ */ new Map();
  accepted = /* @__PURE__ */ new Map();
  rejected = /* @__PURE__ */ new Map();
  timer;
  polling;
  busy = false;
  disposed = false;
  connected = false;
  failures = 0;
  retryAt = 0;
  lastSend = 0;
  lastCheck = 0;
  lastPoll = 0;
  cutoff;
  unsubscribe;
  store;
  epoch = 0;
  timerAt = Infinity;
  attempted = /* @__PURE__ */ new Set();
  persistedFinals = "";
  restored = /* @__PURE__ */ new Set();
  storageError = "";
  verification;
  enrollment;
  setVerification(verify) {
    this.verification = verify;
    this.schedule(0);
  }
  async ensureEnrollment() {
    if (this.state.personal?.participating) return;
    if (!this.verification) return;
    this.enrollment ??= (async () => {
      const turnstileToken = await this.verification();
      const personal = await this.request("/me", "PUT", { anonymous: true, turnstileToken });
      this.apply(personal);
      this.publish();
    })().finally(() => {
      this.enrollment = void 0;
    });
    await this.enrollment;
  }
  send;
  now;
  visible;
  constructor(send = fetch, storage, now = Date.now, visible = () => !document.hidden) {
    this.send = (input, init) => send(input, init);
    this.now = now;
    this.visible = visible;
    this.store = storage;
    try {
      const choice = storage?.getItem(participationKey);
      if (choice === "public" || choice === "anonymous") this.state.choice = choice;
      else if (choice === "private") this.state.choice = "anonymous";
    } catch {
    }
    try {
      const raw = storage?.getItem(pendingScoresKey) || "[]";
      if (raw.length > 16 * 1024 * 1024) throw Error("Oversized pending receipts");
      const saved = JSON.parse(raw);
      if (!Array.isArray(saved) || saved.length > 1e4) throw Error("Invalid pending receipts");
      for (const item of saved) {
        const run = decodeScoringRun(item.run), receipt = run && publicationReceipt(run);
        if (receipt && (run.status !== "active" || item.restored === true)) {
          this.queue.set(run.id, receipt);
          if (item.attempted) this.attempted.add(run.id);
          if (item.restored) this.restored.add(run.id);
        }
      }
    } catch {
    }
  }
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
  publish() {
    for (const listener of this.listeners) listener();
  }
  async request(path, method = "GET", body) {
    const response = await this.send(leaderboardAPI + path, { method, credentials: "same-origin", cache: "no-store", ...body === void 0 ? {} : { headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }, signal: AbortSignal.timeout(12e3) });
    const data = await response.json();
    if (!response.ok) throw new LeaderboardHTTPError(data.error || "The register could not be reached.", response.status, Number(response.headers.get("Retry-After") || 0) * 1e3);
    return data;
  }
  async start() {
    if (this.connected) return;
    this.connected = true;
    await this.refresh();
    this.polling = setInterval(() => {
      if (this.visible()) this.schedule(0);
    }, 15e3);
  }
  async refresh() {
    const epoch = this.epoch;
    try {
      try {
        const saved = this.store?.getItem(participationKey);
        if (saved === "anonymous" || saved === "public") this.state.choice = saved;
        else if (saved === "private") this.state.choice = "anonymous";
      } catch {
      }
      const personal = await this.request("/me");
      if (epoch !== this.epoch) return;
      this.apply(personal);
      if (personal.participating && personal.name !== anonymousName) this.choice("public");
      else if (this.state.choice === "public") this.choice("anonymous");
      this.lastPoll = this.now();
      this.success();
    } catch (error) {
      this.failure(error);
    }
    this.publish();
    this.schedule(0);
  }
  attach(scoring) {
    this.unsubscribe?.();
    const read = () => {
      const snapshot = scoring.snapshot();
      this.state.current = snapshot.current;
      for (const run2 of [snapshot.saved, snapshot.current]) {
        if (!run2) continue;
        const receipt = publicationReceipt(run2);
        if (receipt && receipt.sequence > (this.accepted.get(run2.id) || 0) && receipt.sequence > (this.rejected.get(run2.id) || 0)) {
          this.queue.set(run2.id, receipt);
          if (run2.publicationInterrupted) {
            this.restored.add(run2.id);
            this.attempted.add(run2.id);
          }
        }
      }
      for (const [id, receipt] of this.queue) if (id !== snapshot.current?.id && id !== snapshot.saved?.id && receipt.run.status === "active" && !this.restored.has(id)) this.queue.delete(id);
      this.persistFinals();
      this.publish();
      const run = snapshot.current, prior = this.state.qualification;
      const immediate = run?.status !== "active" || !!prior && prior.runId !== run?.id || !run?.incident && this.lastIncident;
      this.schedule(immediate ? 0 : 250);
    };
    this.unsubscribe = scoring.subscribe(read);
    read();
    void this.start();
  }
  choice(value) {
    this.state.choice = value;
    try {
      this.store?.setItem(participationKey, value);
    } catch {
    }
  }
  persistFinals() {
    const serialized = JSON.stringify([...this.queue.values()].filter((r) => r.run.status !== "active" || this.restored.has(r.run.id)).map((r) => ({ run: r.run, attempted: this.attempted.has(r.run.id), restored: this.restored.has(r.run.id) })));
    if (serialized !== this.persistedFinals) try {
      if (serialized.length > 16 * 1024 * 1024) throw Error("Outbox too large");
      this.store?.setItem(pendingScoresKey, serialized);
      this.persistedFinals = serialized;
      this.storageError = "";
    } catch {
      this.state.error = this.storageError = "Pending scores remain in this tab; browser storage is full. Keep the tab open until synchronization finishes.";
    }
  }
  decline() {
    this.choice("anonymous");
    this.state.invitation = false;
    this.publish();
    this.schedule(0);
  }
  dismissInvitation() {
    this.state.invitation = false;
    this.publish();
  }
  async enroll(name, turnstileToken) {
    if (this.enrollment) await this.enrollment;
    ++this.epoch;
    const personal = await this.request("/me", "PUT", { name, turnstileToken });
    this.apply(personal);
    this.choice("public");
    this.state.invitation = false;
    this.success();
    this.publish();
    this.schedule(0);
    this.persistFinals();
  }
  async withdraw() {
    ++this.epoch;
    const personal = await this.request("/me", "DELETE");
    this.apply(personal);
    this.choice("anonymous");
    this.state.invitation = false;
    this.success();
    this.publish();
    this.schedule(0);
  }
  async list(offset = 0, board = "all-time") {
    const page = await this.request("?board=" + board + "&offset=" + offset + "&limit=50");
    this.state.enabled = page.enabled && this.state.personal?.enabled !== false;
    this.state.sitekey = page.sitekey;
    return page;
  }
  resume() {
    this.retryAt = 0;
    this.schedule(0);
  }
  apply(personal) {
    this.state.personal = personal;
    this.state.enabled = personal.enabled;
    this.state.sitekey = personal.sitekey;
    for (const entry of Object.values(personal.standings || { "all-time": personal.entry })) {
      if (entry?.status === "active") this.attempted.add(entry.runId);
      if (this.state.choice === "undecided" && entry?.runId === this.state.current?.id && entry && entry.rank <= 1e3) this.state.invitation = true;
    }
  }
  success() {
    this.failures = 0;
    this.retryAt = 0;
    this.state.error = this.storageError;
    this.state.stale = false;
  }
  failure(error) {
    this.state.error = error instanceof Error ? error.message : "The register could not be reached.";
    this.state.stale = true;
    this.failures++;
    this.retryAt = this.now() + Math.max(error instanceof LeaderboardHTTPError ? error.retryAfter : 0, Math.min(6e4, 1e3 * 2 ** Math.min(6, this.failures)));
  }
  schedule(delay) {
    if (this.disposed) return;
    const at = this.now() + delay;
    if (this.timer && this.timerAt <= at) return;
    clearTimeout(this.timer);
    this.timerAt = at;
    this.timer = setTimeout(() => {
      this.timer = void 0;
      this.timerAt = Infinity;
      void this.flush();
    }, delay);
  }
  async flush() {
    if (this.busy || this.disposed) return;
    const now = this.now();
    if (now < this.retryAt) {
      this.schedule(this.retryAt - now);
      return;
    }
    this.busy = true;
    const epoch = this.epoch;
    try {
      if (now - this.lastPoll >= 15e3 && this.visible()) {
        const personal = await this.request("/me");
        if (epoch !== this.epoch) return;
        this.apply(personal);
        this.lastPoll = now;
      }
      if (!this.state.enabled) return;
      if (!this.state.personal?.participating && this.queue.size && this.verification) await this.ensureEnrollment();
      if (this.state.personal?.participating) {
        const receipt = [...this.queue.values()][0];
        if (receipt) {
          const heist = receipt.run.incident?.kind === "heist", urgent = receipt.run.status !== "active" || this.restored.has(receipt.run.id) || !receipt.run.incident && this.lastIncident;
          const delay = (heist ? 1e3 : 5e3) - (now - this.lastSend);
          if (!urgent && delay > 0) {
            this.schedule(delay);
            return;
          }
          this.lastIncident = !!receipt.run.incident;
          try {
            this.attempted.add(receipt.run.id);
            this.persistFinals();
            const result = await this.request("/runs/" + receipt.run.id, "PUT", receipt);
            if (epoch !== this.epoch) return;
            this.accepted.set(receipt.run.id, result.acceptedSequence);
            this.apply(result);
            if ((this.queue.get(receipt.run.id)?.sequence || 0) <= result.acceptedSequence) this.queue.delete(receipt.run.id);
            if (!this.queue.has(receipt.run.id) && (receipt.run.status !== "active" || this.restored.has(receipt.run.id))) {
              this.attempted.delete(receipt.run.id);
              this.restored.delete(receipt.run.id);
            }
            this.persistFinals();
          } catch (error) {
            if (error instanceof LeaderboardHTTPError && error.status === 401) {
              this.choice("undecided");
              this.state.personal = void 0;
            }
            if (error instanceof LeaderboardHTTPError && [409, 422].includes(error.status)) {
              this.rejected.set(receipt.run.id, receipt.sequence);
              if (this.queue.get(receipt.run.id)?.sequence === receipt.sequence) this.queue.delete(receipt.run.id);
              if (!this.queue.has(receipt.run.id)) {
                this.attempted.delete(receipt.run.id);
                this.restored.delete(receipt.run.id);
              }
              this.persistFinals();
            }
            throw error;
          }
          this.lastSend = now;
        }
      } else {
        const current = this.state.current, receipt = current ? publicationReceipt(current) : void 0;
        if (receipt) {
          if (now - this.lastCheck >= 5e3 || this.state.qualification?.runId !== current?.id) {
            const result = await this.request("/check", "POST", receipt);
            this.lastCheck = now;
            if (this.state.current?.id === result.runId && this.state.current.revision === result.sequence) {
              this.state.qualification = result;
              if ((result.qualifiesAny ?? result.qualifies) && this.state.choice === "undecided") this.state.invitation = true;
            }
          }
        }
      }
      this.success();
    } catch (error) {
      this.failure(error);
    } finally {
      this.busy = false;
      this.publish();
      if (this.state.enabled && this.state.personal?.participating && this.queue.size || this.retryAt > this.now()) this.schedule(Math.max(250, this.retryAt - this.now()));
    }
  }
  lastIncident = false;
  dispose() {
    this.disposed = true;
    clearTimeout(this.timer);
    clearInterval(this.polling);
    this.unsubscribe?.();
    this.listeners.clear();
  }
};

// web/scoring-format.ts
function pointsFormatter(locales) {
  return new Intl.NumberFormat(locales, { useGrouping: true, maximumFractionDigits: 0 });
}
var formatPoints = (value, locales) => pointsFormatter(locales || (typeof navigator === "undefined" ? void 0 : [...navigator.languages])).format(value);

// web/leaderboard-name-input.ts
function restrictLeaderboardName(input) {
  input.addEventListener("beforeinput", (event) => {
    if (!event.isComposing && event.inputType === "insertText" && event.data && event.data.length === 1 && /[^A-Za-z0-9 _-]/.test(event.data)) event.preventDefault();
  });
  const clean = () => {
    const position = input.selectionStart ?? input.value.length, before = input.value.slice(0, position);
    const value = input.value.replace(/[^A-Za-z0-9 _-]/g, "").slice(0, 24);
    if (value !== input.value) {
      input.value = value;
      const caret = Math.min(before.replace(/[^A-Za-z0-9 _-]/g, "").length, value.length);
      input.setSelectionRange(caret, caret);
    }
    input.setCustomValidity("");
  };
  input.addEventListener("input", (event) => {
    if (!event.isComposing) clean();
  });
  input.addEventListener("compositionend", clean);
}

// web/release-assets.ts
var scope = new URL("../", import.meta.url).href;

// web/high-scores.ts
var element = (tag, text) => {
  const e = document.createElement(tag);
  if (text) e.textContent = text;
  return e;
};
var number = (value) => formatPoints(BigInt(value));
var selectedBoard = (queryFirst = true) => {
  const query = new URL(location.href).searchParams.get("board");
  if (queryFirst && isScoreboard(query)) return query;
  try {
    const saved = localStorage.getItem("slopbuzz:scoreboard");
    if (isScoreboard(saved)) return saved;
  } catch {
  }
  return "daily";
};
var RankingView = class {
  constructor(host, client) {
    this.host = host;
    this.client = client;
    host.innerHTML = '<div class="scoreboard-tabs" role="tablist" aria-label="Scoreboards"></div><p class="scoreboard-window"></p><p class="leaderboard-own"></p><p class="leaderboard-list-status" role="status"></p><div class="leaderboard-table" tabindex="0" role="region" aria-label="Top scores table"><table><caption>Top 1,000 \xB7 one entry per browser</caption><thead><tr><th scope="col">Rank</th><th scope="col">Name and mandate</th><th scope="col">Enterprise Points</th></tr></thead><tbody></tbody></table></div><div class="leaderboard-pagination"><button type="button" data-page="previous">Previous 50</button><button type="button" data-page="next">Next 50</button></div>';
    try {
      localStorage.setItem("slopbuzz:scoreboard", this.selected);
    } catch {
    }
    const tabs = host.querySelector(".scoreboard-tabs");
    for (const b of scoreboards) {
      const button = element("button");
      button.type = "button";
      button.dataset.scoreboard = b.id;
      button.setAttribute("role", "tab");
      button.innerHTML = scoreboardIcon(b.id);
      button.append(document.createTextNode(b.label));
      button.addEventListener("click", () => this.select(b.id));
      button.addEventListener("keydown", (event) => {
        const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
        if (!keys.includes(event.key)) return;
        event.preventDefault();
        const i = scoreboards.findIndex((b2) => b2.id === this.selected), next = event.key === "Home" ? 0 : event.key === "End" ? 3 : (i + (event.key === "ArrowRight" ? 1 : 3)) % 4;
        this.select(scoreboards[next].id);
        tabs.children[next].focus();
      });
      tabs.append(button);
    }
    this.updateTabs();
    this.table = host.querySelector("tbody");
    this.status = host.querySelector(".leaderboard-list-status");
    this.own = host.querySelector(".leaderboard-own");
    this.previous = host.querySelector('[data-page="previous"]');
    this.next = host.querySelector('[data-page="next"]');
    this.previous.addEventListener("click", () => {
      this.offset = Math.max(0, this.offset - 50);
      void this.refresh();
    });
    this.next.addEventListener("click", () => {
      this.offset += 50;
      void this.refresh();
    });
  }
  host;
  client;
  selected = selectedBoard();
  generation = 0;
  offset = 0;
  loading = false;
  table;
  status;
  previous;
  next;
  own;
  select(board) {
    this.selected = board;
    this.offset = 0;
    this.loading = false;
    ++this.generation;
    try {
      localStorage.setItem("slopbuzz:scoreboard", board);
    } catch {
    }
    if (this.host.id === "high-scores-list") {
      const url = new URL(location.href);
      url.searchParams.set("board", board);
      history.replaceState(history.state, "", url);
    }
    this.updateTabs();
    this.table.replaceChildren();
    void this.refresh();
  }
  updateTabs() {
    for (const button of this.host.querySelectorAll('[role="tab"]')) {
      const active = button.dataset.scoreboard === this.selected;
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    }
    this.host.querySelector(".scoreboard-window").textContent = scoreboards.find((b) => b.id === this.selected).window;
  }
  async refresh() {
    if (this.loading) return;
    this.loading = true;
    const generation = ++this.generation, board = this.selected;
    try {
      const page = await this.client.list(this.offset, board);
      if (generation === this.generation) this.render(page);
    } catch (error) {
      if (generation === this.generation) this.status.textContent = error.message + " Previous results, if any, may be out of date.";
    } finally {
      if (generation === this.generation) this.loading = false;
    }
  }
  render(page) {
    const expanded = new Set([...this.table.querySelectorAll("details[open]")].map((e) => e.closest("tr").dataset.entryId));
    const focused = this.table.contains(document.activeElement) ? { id: document.activeElement?.closest("tr")?.dataset.entryId, tag: document.activeElement?.tagName } : void 0;
    const own = this.client.state.personal?.standings?.[this.selected] ?? (this.selected === "all-time" ? this.client.state.personal?.entry : null);
    this.own.textContent = own ? own.rank <= 1e3 ? `Your published best: #${number(own.rank)} \xB7 ${number(own.score)} points${own.stale ? " \xB7 awaiting a fresh run update" : ""}.` : `Your published best is currently outside the top 1,000.` : "Scores are recorded anonymously until their owner chooses a public name.";
    this.status.textContent = page.total ? `${number(this.offset + 1)}\u2013${number(Math.min(this.offset + 50, page.total))} of ${number(page.total)} \xB7 Updated ${new Date(page.asOf).toLocaleTimeString()}` : "No scores filed yet. Numerical greatness awaits its first volunteer.";
    this.previous.disabled = this.offset === 0;
    this.next.disabled = this.offset + 50 >= page.total;
    this.table.replaceChildren(...page.entries.map((entry) => {
      const row = element("tr");
      row.dataset.entryId = entry.id;
      if (own?.id === entry.id) row.className = "leaderboard-my-entry";
      const rank = element("th", "#" + number(entry.rank));
      rank.scope = "row";
      const info = element("td");
      info.append(element("strong", own?.id === entry.id ? this.client.state.personal.name : entry.name));
      if (own?.id === entry.id) info.append(element("span", " \xB7 You"));
      const status = entry.stale ? "Awaiting update" : entry.status === "active" ? "Earning points" : entry.status === "completed" ? "Completed" : "Points banked";
      info.append(element("p", `${number(entry.through)} lines \xB7 ${status}`));
      const details = element("details"), summary = element("summary", "Run conditions");
      details.open = expanded.has(entry.id);
      details.append(summary);
      details.append(element("p", `Mandate: ${number(entry.mandate)} \xB7 Rules: ${entry.rules} / ${entry.identity}`));
      const link = element("a", "Scoring edition");
      link.href = new URL(`scoring/${entry.rules}/${entry.identity}/`, scope).href;
      details.append(link);
      for (const [name, value] of Object.entries(entry.conditions)) details.append(element("p", `${name}: ${value}`));
      details.append(element("p", "Score recorded " + new Date(entry.updatedAt).toLocaleString()));
      info.append(details);
      const score = element("td", number(entry.score));
      score.className = "leaderboard-points";
      row.append(rank, info, score);
      return row;
    }));
    if (focused) {
      const row = [...this.table.rows].find((r) => r.dataset.entryId === focused.id);
      row?.querySelector(focused.tag === "A" ? "a" : "summary")?.focus({ preventScroll: true });
    }
  }
};
var HighScoreDesk = class {
  client;
  dialog;
  board;
  boardView;
  form;
  name;
  status;
  score;
  rank;
  submit;
  decline;
  withdraw;
  invoker;
  mode = "board";
  widget;
  token = "";
  challengeLoading;
  requestBusy = false;
  rendering = false;
  pageView;
  interval;
  restoreFocus = true;
  trophyOfferRun;
  lastClientError = "";
  verificationPromise;
  challengeHost;
  serverClockOffset = 0;
  lastStandingAsOf = "";
  constructor() {
    let storage;
    try {
      storage = localStorage;
    } catch {
    }
    this.client = new LeaderboardClient(fetch, storage);
    this.dialog = element("dialog");
    this.dialog.id = "high-scores-dialog";
    this.dialog.className = "high-scores-dialog";
    this.dialog.setAttribute("aria-labelledby", "high-scores-title");
    this.dialog.innerHTML = `<header class="score-dialog-heading"><div><p class="eyebrow" data-registration-detail>Office of Competitive Importance</p><h2 id="high-scores-title" tabindex="-1">Top scores</h2></div><button type="button" data-high-scores-close data-registration-detail aria-label="Close top scores">\xD7</button></header>
   <div class="score-tabs" data-registration-detail><button type="button" data-high-scores-tab="board">Top 1,000</button><button type="button" data-high-scores-tab="settings">My participation</button><a href="${new URL("scoring/", scope).href}">Scoring rules \u2197</a></div>
   <section data-high-scores-board></section>
   <form class="leaderboard-enrollment" hidden><p data-high-scores-explanation></p><p class="leaderboard-live-score"><strong data-high-scores-live>0</strong> Enterprise Points <span data-high-scores-rank></span></p>
    <label for="high-scores-name">Your public name</label><input id="high-scores-name" name="name" type="text" minlength="1" maxlength="24" pattern="[A-Za-z0-9 _\\-]+" autocomplete="nickname" aria-describedby="high-scores-name-help" placeholder="Enter your name" title="1\u201324 letters, digits, spaces, hyphens or underscores" required>
    <p id="high-scores-name-help" data-registration-detail>1\u201324 letters A\u2013Z, digits, spaces, hyphens or underscores. Include at least one letter or digit. Names are public and need not be unique.</p>
    <p data-registration-detail>Scores update automatically from future runs in this browser. Heists can lower a live result. Your best banked result remains a fallback.</p><div data-turnstile></div>
    <div class="leaderboard-actions"><button class="button button-primary" type="submit">Save name</button><button class="button button-secondary" type="button" data-high-scores-decline>Continue anonymously</button><button class="button button-secondary" type="button" data-high-scores-withdraw hidden>Use Anonymous Coward</button></div>
   </form><p id="high-scores-status" role="status" aria-live="polite"></p><p class="leaderboard-audit-note" data-registration-detail>Receipts are checked for accounting consistency. Browser activity is not independently authenticated. All scoring editions compete together.</p>`;
    document.body.append(this.dialog);
    this.board = this.dialog.querySelector("[data-high-scores-board]");
    this.boardView = new RankingView(this.board, this.client);
    this.form = this.dialog.querySelector("form");
    this.name = this.form.querySelector("input");
    this.status = this.dialog.querySelector("#high-scores-status");
    this.score = this.form.querySelector("[data-high-scores-live]");
    this.rank = this.form.querySelector("[data-high-scores-rank]");
    this.submit = this.form.querySelector('[type="submit"]');
    this.decline = this.form.querySelector("[data-high-scores-decline]");
    this.withdraw = this.form.querySelector("[data-high-scores-withdraw]");
    this.dialog.querySelector("[data-high-scores-close]").addEventListener("click", () => this.close());
    this.dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      this.close();
    });
    this.dialog.addEventListener("close", () => {
      this.trophyOfferRun = void 0;
      if (this.mode !== "board" && this.client.state.choice === "undecided") this.client.decline();
      this.removeChallenge();
      document.dispatchEvent(new Event("score-dialog-change"));
      if (this.restoreFocus) {
        const target = this.invoker?.getClientRects().length ? this.invoker : this.invoker?.closest("[data-scoreboard-strip]")?.querySelector("button:not([hidden])");
        target?.focus({ preventScroll: true });
      }
    });
    for (const tab of this.dialog.querySelectorAll("[data-high-scores-tab]")) tab.addEventListener("click", () => this.open(tab.dataset.highScoresTab, tab));
    this.decline.addEventListener("click", () => {
      this.client.decline();
      this.close();
    });
    this.withdraw.addEventListener("click", () => void this.perform(async () => {
      await this.client.withdraw();
      this.status.textContent = "Your scores are now displayed as Anonymous Coward.";
      this.name.value = "";
      this.removeChallenge();
    }));
    restrictLeaderboardName(this.name);
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      let name;
      try {
        name = leaderboardName(this.name.value);
      } catch (error) {
        this.name.setCustomValidity(error.message);
        this.name.reportValidity();
        return;
      }
      const joining = this.dialog.dataset.minimal === "true";
      void this.perform(async () => {
        await this.client.enroll(name, this.client.state.personal?.participating ? "" : await this.challenge());
        this.removeChallenge();
        if (joining) this.dialog.close();
        else this.status.textContent = "Your public name has been saved.";
      });
    });
    document.addEventListener("click", (event) => {
      const target = event.target instanceof Element ? event.target.closest("[data-high-scores-open]") : null;
      if (target) {
        event.preventDefault();
        if (target.dataset.highScoresOpen === "settings") this.open("settings", target);
        else {
          this.trophyOfferRun = this.client.state.choice === "undecided" ? this.client.state.current?.id : void 0;
          this.open(this.qualifiesForInvitation() ? "invite" : "board", target);
        }
      }
    });
    this.client.subscribe(() => this.render());
    document.addEventListener("site-page-change", () => this.mountPage());
    document.addEventListener("site-page-leaving", () => {
      this.restoreFocus = false;
    });
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        this.client.resume();
        this.render();
      }
    });
    document.addEventListener("score-dialog-change", () => this.render());
    document.addEventListener("close", () => this.render(), true);
    addEventListener("online", () => this.client.resume());
    window.addEventListener("storage", (event) => {
      if (event.key === "slopbuzz:high-scores:participation:v1") void this.client.refresh();
    });
    addEventListener("pagehide", () => {
      clearInterval(this.interval);
      this.client.dispose();
      this.removeChallenge();
    }, { once: true });
    this.interval = setInterval(() => {
      if (!document.hidden) {
        if (this.dialog.open && this.mode === "board") void this.boardView.refresh();
        if (document.body.dataset.sitePage === "high-scores") void this.pageView?.refresh();
      }
    }, 15e3);
    this.client.setVerification(() => this.challenge());
    this.mountPage();
    void this.client.start();
  }
  attach(scoring) {
    this.client.attach(scoring);
  }
  mountPage() {
    const host = document.getElementById("high-scores-list");
    if (host && this.pageView?.host !== host) this.pageView = new RankingView(host, this.client);
    if (host?.getClientRects().length) void this.pageView.refresh();
    this.render();
  }
  qualifiesForInvitation() {
    const s = this.client.state;
    if (s.choice !== "undecided" || !s.enabled || s.stale || !s.current) return false;
    return Object.values(s.personal?.standings || { "all-time": s.personal?.entry }).some((e) => e?.runId === s.current.id && e.rank <= 1e3) || s.qualification?.runId === s.current.id && !!(s.qualification.qualifiesAny ?? s.qualification.qualifies);
  }
  open(mode, invoker) {
    if (mode === "board") this.boardView.select(isScoreboard(invoker?.dataset.scoreboard) ? invoker.dataset.scoreboard : selectedBoard(false));
    this.mode = mode;
    if (mode !== "board") this.trophyOfferRun = void 0;
    if (invoker && !this.dialog.contains(invoker)) this.invoker = invoker;
    this.restoreFocus = true;
    this.status.textContent = "";
    this.name.value = this.client.state.personal?.name === anonymousName ? "" : this.client.state.personal?.name || this.name.value;
    if (!this.dialog.open) this.dialog.showModal();
    this.render();
    (this.dialog.dataset.minimal === "true" ? this.name : this.dialog.querySelector("#high-scores-title")).focus({ preventScroll: true });
    document.dispatchEvent(new Event("score-dialog-change"));
    if (mode === "board") void this.boardView.refresh();
  }
  close() {
    this.trophyOfferRun = void 0;
    if (this.mode !== "board" && this.client.state.choice === "undecided") this.client.decline();
    this.dialog.close();
  }
  async perform(action) {
    if (this.requestBusy) return;
    this.requestBusy = true;
    this.render();
    try {
      await action();
    } catch (error) {
      this.status.textContent = error.message;
      if (this.widget) window.turnstile?.reset(this.widget);
      this.token = "";
    } finally {
      this.requestBusy = false;
      this.render();
    }
  }
  render() {
    if (this.rendering) return;
    this.rendering = true;
    try {
      const state = this.client.state, current = state.current, entry = state.personal?.entry;
      const qualification = state.qualification;
      if (state.personal && !state.stale && state.personal.asOf !== this.lastStandingAsOf) {
        this.lastStandingAsOf = state.personal.asOf;
        this.serverClockOffset = Date.parse(state.personal.asOf) - Date.now();
      }
      let standing = "";
      for (const host of document.querySelectorAll("[data-scoreboard-strip]")) {
        let visible = 0;
        for (const b of scoreboards) {
          const e = state.personal?.standings?.[b.id] ?? (b.id === "all-time" ? entry : null), estimate = qualification?.runId === current?.id ? qualification?.standings?.[b.id] ?? (b.id === "all-time" ? qualification : null) : null;
          const expired = !!e && b.duration > 0 && Date.parse(e.attainedAt) + b.duration <= Date.now() + this.serverClockOffset;
          const rank = e && !expired && e.rank <= 1e3 ? e.rank : !state.personal?.participating && estimate?.qualifies ? estimate.rank : null;
          let button = host.querySelector('[data-scoreboard="' + b.id + '"]');
          if (!button) {
            button = element("button");
            button.type = "button";
            button.className = "score-trophy-button scoreboard-rank";
            button.dataset.highScoresOpen = "board";
            button.dataset.scoreboard = b.id;
            button.innerHTML = scoreboardIcon(b.id) + "<span data-high-score-standing></span>";
            host.append(button);
          }
          button.hidden = !rank;
          if (!rank) continue;
          visible++;
          const text = number(rank), label = button.querySelector("[data-high-score-standing]");
          if (label.textContent !== text) label.textContent = text;
          const description = b.label + ", " + b.window + ", " + (e ? "rank " : "estimated rank ") + text + (e ? " \xB7 " + number(e.score) + " points" + (current && e.runId !== current.id ? " \xB7 earlier run" : "") : " \xB7 not yet recorded") + (state.stale || e?.stale ? " \xB7 last confirmed standing" : "");
          button.title = description;
          button.setAttribute("aria-label", "Open " + description);
          button.classList.toggle("leaderboard-stale", state.stale || !!e?.stale);
          standing += (standing ? " \xB7 " : "") + b.label + " #" + text;
        }
        host.dataset.placed = String(visible);
        const fallback = host.querySelector("[data-high-scores-open]:not([data-scoreboard])");
        if (fallback) fallback.hidden = visible > 0;
      }
      if (this.qualifiesForInvitation() && this.dialog.open && this.mode === "board" && this.trophyOfferRun === current?.id) {
        this.rendering = false;
        this.open("invite");
        return;
      }
      if (state.invitation && this.qualifiesForInvitation() && !this.dialog.open && !document.hidden && document.body.dataset.sitePage === "demo" && !document.querySelector("dialog[open]:not(#office-fullscreen)")) {
        this.rendering = false;
        this.open("invite");
        return;
      }
      if (!this.dialog.open) return;
      this.board.hidden = this.mode !== "board";
      this.form.hidden = this.mode === "board";
      const minimal = this.mode === "invite" || this.mode === "settings" && (!state.personal?.participating || state.personal.name === anonymousName);
      this.dialog.dataset.minimal = String(minimal);
      for (const detail of this.dialog.querySelectorAll("[data-registration-detail]")) detail.hidden = minimal;
      this.form.querySelector("[data-high-scores-explanation]").hidden = minimal;
      this.dialog.querySelector("#high-scores-title").textContent = minimal ? this.qualifiesForInvitation() ? "Congratulations! You made the top 1,000." : "Join the top scores" : this.mode === "settings" ? "My high-score participation" : "Top 1,000 scores";
      this.form.querySelector("[data-high-scores-explanation]").textContent = state.choice === "public" ? "Scores are recorded automatically. You can change your public name or use Anonymous Coward." : state.choice === "anonymous" ? "Your scores appear as Anonymous Coward. You can choose a name whenever you like." : `${current?.status === "active" ? "Your mandate is still running. " : ""}Would you like to add your name to your score?`;
      this.score.textContent = current ? number(String(netPoints(current))) : entry ? number(entry.score) : "0";
      this.rank.textContent = standing ? `\xB7 ${standing}${state.stale ? " \xB7 awaiting update" : ""}` : "";
      const submitLabel = "Save name";
      if (this.submit.textContent !== submitLabel) this.submit.textContent = submitLabel;
      const submitDisabled = this.requestBusy || !state.enabled;
      if (this.submit.disabled !== submitDisabled) this.submit.disabled = submitDisabled;
      this.decline.hidden = !minimal;
      this.withdraw.hidden = minimal || !state.personal?.participating || state.personal.name === anonymousName;
      this.withdraw.disabled = this.requestBusy;
      if (state.error) this.status.textContent = state.error;
      else if (!state.enabled) this.status.textContent = "Score submissions are temporarily unavailable. Your demo can continue.";
      else if (this.lastClientError && this.status.textContent === this.lastClientError) this.status.textContent = "";
      this.lastClientError = state.error;
      if (this.mode !== "board" && !this.widget && !this.requestBusy) void this.challenge();
    } finally {
      this.rendering = false;
    }
  }
  challenge() {
    if (this.verificationPromise) return this.verificationPromise;
    this.verificationPromise = (async () => {
      if (!this.client.state.sitekey) throw Error("Score verification is not configured.");
      if (!window.turnstile) {
        this.challengeLoading ??= new Promise((resolve, reject) => {
          const script = element("script");
          script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
          script.async = true;
          const timer = setTimeout(() => {
            script.remove();
            reject(Error("Score verification could not load. Your run continues."));
          }, 15e3);
          script.onload = () => {
            clearTimeout(timer);
            resolve();
          };
          script.onerror = () => {
            clearTimeout(timer);
            script.remove();
            reject(Error("Score verification could not load."));
          };
          document.head.append(script);
        });
        await this.challengeLoading;
      }
      this.challengeHost ??= element("div");
      if (!this.challengeHost.isConnected) document.body.append(this.challengeHost);
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(Error("Score verification timed out. Your run continues.")), 2e4);
        this.widget = window.turnstile.render(this.challengeHost, { sitekey: this.client.state.sitekey, action: "leaderboard-enroll", theme: "auto", callback: (token) => {
          clearTimeout(timer);
          resolve(token);
        }, "expired-callback": () => {
          clearTimeout(timer);
          reject(Error("Score verification expired."));
        }, "error-callback": () => {
          clearTimeout(timer);
          reject(Error("Score verification needs another attempt."));
        } });
      });
    })().finally(() => {
      this.verificationPromise = void 0;
      this.challengeLoading = void 0;
      this.removeChallenge();
    });
    return this.verificationPromise;
  }
  removeChallenge() {
    if (this.verificationPromise) return;
    if (this.widget) window.turnstile?.remove(this.widget);
    this.widget = void 0;
    this.token = "";
  }
};
function highScoreDesk() {
  return window.__slopbuzzHighScores ??= new HighScoreDesk();
}
highScoreDesk();
export {
  HighScoreDesk,
  highScoreDesk
};
