package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.compliance;

/**
 * A point-in-time declaration of internal evidence, explicitly uncertified.
 */
public final class ComplianceEvidenceDossier {

	private final long issuedAtEpochMillis;
	private final int journalEntries;
	private final int committed;
	private final int aborted;
	private final int pending;
	private final int deadLetters;
	private final String headDigest;
	private final String evidenceDigest;
	private final ControlResult chainControl;
	private final ControlResult deliveryControl;

	public ComplianceEvidenceDossier(final long issuedAtEpochMillis, final int journalEntries,
			final int committed, final int aborted, final int pending, final int deadLetters,
			final String headDigest, final String evidenceDigest, final ControlResult chainControl,
			final ControlResult deliveryControl) {
		this.issuedAtEpochMillis = issuedAtEpochMillis;
		this.journalEntries = journalEntries;
		this.committed = committed;
		this.aborted = aborted;
		this.pending = pending;
		this.deadLetters = deadLetters;
		this.headDigest = headDigest;
		this.evidenceDigest = evidenceDigest;
		this.chainControl = chainControl;
		this.deliveryControl = deliveryControl;
	}

	public ControlResult getChainControl() { return this.chainControl; }
	public ControlResult getDeliveryControl() { return this.deliveryControl; }
	public String getEvidenceDigest() { return this.evidenceDigest; }

	public String toJson() {
		return "{"
				+ "\"schema\":\"slopbuzz-evidence/v1\","
				+ "\"issuedAtEpochMillis\":" + this.issuedAtEpochMillis + ","
				+ "\"scope\":\"internal-controls-only\","
				+ "\"certification\":\"none\","
				+ "\"journalEntries\":" + this.journalEntries + ","
				+ "\"committed\":" + this.committed + ","
				+ "\"aborted\":" + this.aborted + ","
				+ "\"pending\":" + this.pending + ","
				+ "\"deadLetters\":" + this.deadLetters + ","
				+ "\"headDigest\":\"" + this.headDigest + "\","
				+ "\"controls\":{"
				+ "\"AUD-001\":\"" + this.chainControl.name() + "\","
				+ "\"MSG-001\":\"" + this.deliveryControl.name() + "\","
				+ "\"ISO-9000\":\"OPEN\","
				+ "\"SOC-2\":\"OPEN\"},"
				+ "\"evidenceDigest\":\"" + this.evidenceDigest + "\""
				+ "}\n";
	}
}
