package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime.RuntimeClock;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime.SystemRuntimeClock;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditJournal;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputCapture;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputTransactionCoordinator;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.SlopFizzBuzz;

/** Exercises the real Spring service against a separately approved specimen. */
public final class SyntheticAssuranceBureau {

	private static final String[] APPROVED_SPECIMEN = {
		"1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz",
		"11", "Fizz", "13", "14", "FizzBuzz"
	};

	private final RuntimeClock clock;
	private final SlopFizzBuzz service;
	private final OutputTransactionCoordinator transactions;
	private final OutputAuditJournal journal;
	private CanaryVerdict latest;
	private long sequence;

	public SyntheticAssuranceBureau(final SlopFizzBuzz service,
			final OutputTransactionCoordinator transactions, final OutputAuditJournal journal) {
        this(service, transactions, journal, new SystemRuntimeClock());
    }
    public SyntheticAssuranceBureau(final SlopFizzBuzz service, final OutputTransactionCoordinator transactions, final OutputAuditJournal journal, final RuntimeClock clock) {
        this.clock=clock;
		this.service = service;
		this.transactions = transactions;
		this.journal = journal;
		this.latest = new CanaryVerdict(0, CanaryVerdict.State.NOT_RUN,
				"AWAITING_REHEARSAL", 0, 0, 0, journal.verifyChain());
	}

	public synchronized CanaryVerdict latest() {
		return this.latest;
	}

	public synchronized CanaryVerdict convene() {
		final long started = clock.nanoTime();
		String output = "";
		String finding = "ANSWER_MATCHED_SPECIMEN";
		try (OutputCapture audience = this.transactions.capture()) {
			this.service.slopFizzBuzz(15);
			output = audience.getText();
		} catch (final RuntimeException failure) {
			this.transactions.abort();
			finding = "GENERATION_FAILED";
		}
		final boolean chainValid = this.journal.verifyChain();
		if ("ANSWER_MATCHED_SPECIMEN".equals(finding) && !specimen().equals(output)) {
			finding = "ANSWER_DEVIATED_FROM_SPECIMEN";
		}
		if (!chainValid) {
			finding = "AUDIT_CHAIN_INVALID";
		}
		final int observedLines = output.isEmpty() ? 0
				: output.split("\r\n|[\n\r\u000b\f\u0085\u2028\u2029]", -1).length - (output.endsWith("\n") || output.endsWith("\r") ? 1 : 0);
		this.latest = new CanaryVerdict(++this.sequence,
				"ANSWER_MATCHED_SPECIMEN".equals(finding)
						? CanaryVerdict.State.PASSED : CanaryVerdict.State.FAILED,
				finding, clock.currentTimeMillis(),
				Math.max(0L, (clock.nanoTime() - started) / 1000L),
				observedLines, chainValid);
		return this.latest;
	}

	private static String specimen() {
		final StringBuilder approved = new StringBuilder();
		for (final String line : APPROVED_SPECIMEN) {
			approved.append(line).append(System.lineSeparator());
		}
		return approved.toString();
	}
}
