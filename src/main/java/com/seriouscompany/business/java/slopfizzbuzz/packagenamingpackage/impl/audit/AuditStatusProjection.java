package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit;

import java.util.HashSet;
import java.util.Set;

/**
 * An idempotent read model populated by the message queue.
 */
public final class AuditStatusProjection implements AuditEventConsumer {

	private final Set<String> acknowledgedDigests = new HashSet<String>();
	private int committed;
	private int aborted;

	@Override
	public synchronized void accept(final OutputAuditEntry entry) {
		if (this.acknowledgedDigests.add(entry.getDigest())) {
			if (entry.getDisposition() == OutputDisposition.COMMITTED) {
				this.committed++;
			} else {
				this.aborted++;
			}
		}
	}

	public synchronized int committedCount() {
		return this.committed;
	}

	public synchronized int abortedCount() {
		return this.aborted;
	}
}
