package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations;

/**
 * Process-local, thread-safe minutes of the HTTP proclamation desk.
 */
public final class ServiceLevelScorecard {

	private long successful;
	private long rejected;
	private long failed;
	private long totalDurationMicros;
	private long maximumDurationMicros;

	public synchronized void record(final ProclamationOutcome outcome,
			final long durationMicros) {
		if (outcome == null || durationMicros < 0) {
			throw new IllegalArgumentException("A scorecard entry needs an outcome and duration.");
		}
		switch (outcome) {
		case SUCCESSFUL:
			this.successful++;
			break;
		case REJECTED:
			this.rejected++;
			break;
		case FAILED:
			this.failed++;
			break;
		default:
			throw new IllegalArgumentException("Unrecognized proclamation outcome.");
		}
		this.totalDurationMicros += durationMicros;
		this.maximumDurationMicros = Math.max(this.maximumDurationMicros, durationMicros);
	}

	public synchronized ScorecardSnapshot snapshot() {
		return new ScorecardSnapshot(this.successful, this.rejected, this.failed,
				this.totalDurationMicros, this.maximumDurationMicros);
	}
}
