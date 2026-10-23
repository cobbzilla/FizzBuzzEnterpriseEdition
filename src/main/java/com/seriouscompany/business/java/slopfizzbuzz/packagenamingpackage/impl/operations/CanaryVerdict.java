package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations;

/** Immutable minutes of a synthetic numerical rehearsal. */
public final class CanaryVerdict {

	public enum State { NOT_RUN, PASSED, FAILED }

	private final long sequence;
	private final State state;
	private final String finding;
	private final long issuedAtEpochMillis;
	private final long durationMicros;
	private final int observedLines;
	private final boolean auditChainValid;

	CanaryVerdict(final long sequence, final State state, final String finding,
			final long issuedAtEpochMillis, final long durationMicros,
			final int observedLines, final boolean auditChainValid) {
		this.sequence = sequence;
		this.state = state;
		this.finding = finding;
		this.issuedAtEpochMillis = issuedAtEpochMillis;
		this.durationMicros = durationMicros;
		this.observedLines = observedLines;
		this.auditChainValid = auditChainValid;
	}

	public State getState() {
		return this.state;
	}

	public String toJson() {
		return "{\"schema\":\"slopbuzz-canary/v1\",\"scope\":\"current-process\""
				+ ",\"sequence\":" + this.sequence
				+ ",\"state\":\"" + this.state.name() + "\""
				+ ",\"finding\":\"" + this.finding + "\""
				+ ",\"issuedAtEpochMillis\":" + this.issuedAtEpochMillis
				+ ",\"durationMicros\":" + this.durationMicros
				+ ",\"expectedLines\":15"
				+ ",\"observedLines\":" + this.observedLines
				+ ",\"auditChainValid\":" + this.auditChainValid + "}";
	}
}
