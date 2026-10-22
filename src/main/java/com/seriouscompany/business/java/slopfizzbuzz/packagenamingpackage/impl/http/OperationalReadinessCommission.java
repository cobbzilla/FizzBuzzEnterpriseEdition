package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditJournal;

/**
 * Convenes three independent electors before admitting a deployment to traffic.
 */
public final class OperationalReadinessCommission {

	public static final int MAX_PENDING_CERTIFICATES = 10000;
	private final OutputAuditJournal journal;

	public OperationalReadinessCommission(final OutputAuditJournal journal) {
		this.journal = journal;
	}

	public ReadinessVerdict convene() {
		final boolean chainValid;
		final int pending;
		final int deadLetters;
		synchronized (this.journal) {
			chainValid = this.journal.verifyChain();
			pending = this.journal.messages().pendingCount();
			deadLetters = this.journal.messages().deadLetterCount();
		}
		return decide(chainValid, pending, deadLetters);
	}

	static ReadinessVerdict decide(final boolean chainValid, final int pending,
			final int deadLetters) {
		if (pending < 0 || deadLetters < 0) {
			throw new IllegalArgumentException("Readiness counts must not be negative.");
		}
		final boolean capacityApproved = pending <= MAX_PENDING_CERTIFICATES;
		final boolean deliveryApproved = deadLetters == 0;
		return new ReadinessVerdict(chainValid, capacityApproved, deliveryApproved,
				pending, deadLetters, MAX_PENDING_CERTIFICATES);
	}
}
