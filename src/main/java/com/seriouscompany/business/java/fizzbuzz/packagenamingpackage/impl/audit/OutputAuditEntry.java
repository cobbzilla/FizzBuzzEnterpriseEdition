package com.seriouscompany.business.java.fizzbuzz.packagenamingpackage.impl.audit;

/**
 * Immutable minutes of one output transaction.
 */
public final class OutputAuditEntry {

	private final long sequence;
	private final int number;
	private final String payload;
	private final OutputDisposition disposition;
	private final String previousDigest;
	private final String digest;

	public OutputAuditEntry(final long sequence, final int number, final String payload,
			final OutputDisposition disposition, final String previousDigest, final String digest) {
		this.sequence = sequence;
		this.number = number;
		this.payload = payload;
		this.disposition = disposition;
		this.previousDigest = previousDigest;
		this.digest = digest;
	}

	public long getSequence() { return this.sequence; }
	public int getNumber() { return this.number; }
	public String getPayload() { return this.payload; }
	public OutputDisposition getDisposition() { return this.disposition; }
	public String getPreviousDigest() { return this.previousDigest; }
	public String getDigest() { return this.digest; }
}
