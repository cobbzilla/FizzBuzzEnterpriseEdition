package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations;

/** Evidence that a rehearsal either ran or borrowed a recent ruling. */
public final class RehearsalAdmissionReceipt {

	public enum Disposition { EXECUTED, REUSED }

	private final CanaryVerdict verdict;
	private final Disposition disposition;
	private final long leaseSecondsRemaining;

	RehearsalAdmissionReceipt(final CanaryVerdict verdict,
			final Disposition disposition, final long leaseSecondsRemaining) {
		this.verdict = verdict;
		this.disposition = disposition;
		this.leaseSecondsRemaining = leaseSecondsRemaining;
	}

	public CanaryVerdict getVerdict() {
		return this.verdict;
	}

	public Disposition getDisposition() {
		return this.disposition;
	}

	public long getLeaseSecondsRemaining() {
		return this.leaseSecondsRemaining;
	}
}
