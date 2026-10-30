package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime.RuntimeClock;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime.SystemRuntimeClock;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditJournal;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.StoredCopyInspection;

/** Requests a fresh copy of institutional memory and records the comparison. */
public final class RecoveryRehearsalBureau {

	private final RuntimeClock clock;
	private final OutputAuditJournal journal;
	private RecoveryVerdict latest = new RecoveryVerdict(0, RecoveryVerdict.State.NOT_RUN,
			"NOT_REQUESTED", 0, 0, false, 0, "UNKNOWN");
	private long sequence;

	public RecoveryRehearsalBureau(final OutputAuditJournal journal) { this(journal,new SystemRuntimeClock()); }
    public RecoveryRehearsalBureau(final OutputAuditJournal journal, final RuntimeClock clock) {
        this.clock=clock;
		this.journal = journal;
	}

	public synchronized RecoveryVerdict rehearse() {
		final long started = clock.nanoTime();
		final StoredCopyInspection inspection = this.journal.inspectStoredCopy();
		this.latest = new RecoveryVerdict(++this.sequence,
				inspection.getFinding() == StoredCopyInspection.Finding.MATCHED
						? RecoveryVerdict.State.PASSED : RecoveryVerdict.State.FAILED,
				inspection.getFinding().name(), clock.currentTimeMillis(),
				Math.max(0L, (clock.nanoTime() - started) / 1000L),
				inspection.isDurable(), inspection.getStoredEntries(), inspection.getHeadDigest());
		return this.latest;
	}

	public synchronized RecoveryVerdict latest() {
		return this.latest;
	}
}
