/** Editorial discretion never supplies a business decision. Every variant retains its recorded facts. */
const lines=(source:string):readonly string[]=>Object.freeze(source.trim().split('\n').map(line=>line.trim()));
export const narrativeTemplates={
 one:lines(`
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
 cache:lines(`
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
 cacheProvenance:lines(`
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
 personnel:lines(`
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
 legacy:lines(`
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
 procedure:lines(`
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
 assembly:lines(`
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
 classification:lines(`
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
 procurement:lines(`
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
 numeral:lines(`
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
 transaction:lines(`
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
 notary:lines(`
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
 publication:lines(`
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
 audit:lines(`
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
 queued:lines(`
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
 commit:lines(`
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
 cleanup:lines(`
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
 succession:lines(`
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
 extendedNotary:lines(`
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
 extendedSuccession:lines(`
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
 fallback:lines(`
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
 reception:lines(`
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
 replay:lines(`
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
 courtApproved:lines(`
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
 courtRejected:lines(`
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
 office:lines(`
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
 runtime:lines(`
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
 omitted:lines(`
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
 rehearsal:lines(`
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
 zeroFresh:lines(`
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
 zeroCache:lines(`
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
 zeroLegacy:lines(`
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
 finish:lines(`
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
 resume:lines(`
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
 global:lines(`
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
} as const;

export type NarrativeSituation=keyof typeof narrativeTemplates;
export const corporateAsides=lines(`
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

/** Shuffle bags avoid repeats until each pool is exhausted, including across pool boundaries. */
export class ChronicleLanguage {
 private readonly bags=new Map<string,{remaining:number[];last?:number}>();
 private readonly random:()=>number;
 constructor(random:()=>number=Math.random){this.random=random;}
 private pick(key:string,options:readonly string[]):string {
  let bag=this.bags.get(key);if(!bag){bag={remaining:[]};this.bags.set(key,bag);}
  if(!bag.remaining.length){
   bag.remaining=options.map((_,index)=>index);
   for(let i=bag.remaining.length-1;i>0;i--){const j=Math.floor(this.random()*(i+1));[bag.remaining[i],bag.remaining[j]]=[bag.remaining[j],bag.remaining[i]];}
   const end=bag.remaining.length-1;if(end>0&&bag.remaining[end]===bag.last)[bag.remaining[0],bag.remaining[end]]=[bag.remaining[end],bag.remaining[0]];
  }
  const index=bag.remaining.pop()!;bag.last=index;return options[index];
 }
 write(situation:NarrativeSituation,facts:string):string {
  return this.pick(situation,narrativeTemplates[situation]).replace('{facts}',()=>facts)+' '+this.pick('corporate-asides',corporateAsides);
 }
}
