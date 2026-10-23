package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations;

/** Process-local minutes of an explicit stored-copy recovery rehearsal. */
public final class RecoveryVerdict {

	public enum State { NOT_RUN, PASSED, FAILED }

	private final long sequence;
	private final State state;
	private final String finding;
	private final long issuedAtEpochMillis;
	private final long durationMicros;
	private final boolean durable;
	private final int storedEntries;
	private final String headDigest;

	RecoveryVerdict(final long sequence, final State state, final String finding,
			final long issuedAtEpochMillis, final long durationMicros,
			final boolean durable, final int storedEntries, final String headDigest) {
		this.sequence = sequence;
		this.state = state;
		this.finding = finding;
		this.issuedAtEpochMillis = issuedAtEpochMillis;
		this.durationMicros = durationMicros;
		this.durable = durable;
		this.storedEntries = storedEntries;
		this.headDigest = headDigest;
	}

	public State getState() { return this.state; }

	public String toJson() {
		return "{\"schema\":\"slopbuzz-recovery/v1\",\"scope\":\"current-process\""
				+ ",\"sequence\":" + this.sequence
				+ ",\"state\":\"" + this.state.name() + "\""
				+ ",\"finding\":\"" + this.finding + "\""
				+ ",\"issuedAtEpochMillis\":" + this.issuedAtEpochMillis
				+ ",\"durationMicros\":" + this.durationMicros
				+ ",\"durable\":" + this.durable
				+ ",\"storedEntries\":" + this.storedEntries
				+ ",\"headDigest\":\"" + this.headDigest + "\"}";
	}
}
