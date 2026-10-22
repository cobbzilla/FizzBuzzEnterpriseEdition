package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations;

/** An immutable statement of the current process's request history. */
public final class ScorecardSnapshot {

	private final long successful;
	private final long rejected;
	private final long failed;
	private final long totalDurationMicros;
	private final long maximumDurationMicros;

	ScorecardSnapshot(final long successful, final long rejected, final long failed,
			final long totalDurationMicros, final long maximumDurationMicros) {
		this.successful = successful;
		this.rejected = rejected;
		this.failed = failed;
		this.totalDurationMicros = totalDurationMicros;
		this.maximumDurationMicros = maximumDurationMicros;
	}

	public long getSuccessful() {
		return this.successful;
	}

	public long getRejected() {
		return this.rejected;
	}

	public long getFailed() {
		return this.failed;
	}

	public long getTotal() {
		return this.successful + this.rejected + this.failed;
	}

	public long getTotalDurationMicros() {
		return this.totalDurationMicros;
	}

	public long getMaximumDurationMicros() {
		return this.maximumDurationMicros;
	}

	public String toJson() {
		return "{\"schema\":\"slopbuzz-scorecard/v1\",\"scope\":\"current-process\""
				+ ",\"successful\":" + this.successful
				+ ",\"rejected\":" + this.rejected
				+ ",\"failed\":" + this.failed
				+ ",\"total\":" + getTotal()
				+ ",\"totalDurationMicros\":" + this.totalDurationMicros
				+ ",\"maximumDurationMicros\":" + this.maximumDurationMicros + "}";
	}
}
