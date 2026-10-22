package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Stages fragments until an entire SlopFizzBuzz line can be published at once.
 */
@Service
public final class OutputTransactionCoordinator {

	private static final Logger LOGGER = Logger.getLogger(OutputTransactionCoordinator.class.getName());
	private final ThreadLocal<PendingOutput> pending = new ThreadLocal<PendingOutput>();
	private final ThreadLocal<OutputCapture> capture = new ThreadLocal<OutputCapture>();
	private final OutputAuditJournal journal;

	@Autowired
	public OutputTransactionCoordinator(final OutputAuditJournal journal) {
		this.journal = journal;
	}

	public void begin(final int number) {
		if (this.pending.get() != null) {
			throw new IllegalStateException("Nested output transactions require a separate committee.");
		}
		this.pending.set(new PendingOutput(number));
	}

	public OutputCapture capture() {
		if (this.capture.get() != null) {
			throw new IllegalStateException("A thread may represent only one output audience at a time.");
		}
		final OutputCapture audience = new OutputCapture(this);
		this.capture.set(audience);
		return audience;
	}

	void release(final OutputCapture audience) {
		if (this.capture.get() != audience) {
			throw new IllegalStateException("An audience cannot adjourn another audience's hearing.");
		}
		this.capture.remove();
	}

	public void stageOrWrite(final String fragment) throws IOException {
		final PendingOutput transaction = this.pending.get();
		if (transaction == null) {
			this.publish(fragment.getBytes(StandardCharsets.UTF_8));
		} else {
			transaction.payload.append(fragment);
		}
	}

	public void commit() {
		final PendingOutput transaction = this.pending.get();
		if (transaction == null) {
			throw new IllegalStateException("No output transaction is pending.");
		}
		try {
			final String payload = transaction.payload.toString();
			final byte[] bytes = payload.getBytes(StandardCharsets.UTF_8);
			this.publish(bytes);
			this.journal.record(transaction.number, payload, OutputDisposition.COMMITTED);
		} catch (final RuntimeException failure) {
			this.journal.record(transaction.number, transaction.payload.toString(), OutputDisposition.ABORTED);
			LOGGER.warning("Output transaction aborted for number " + transaction.number);
			throw failure;
		} finally {
			this.pending.remove();
		}
	}

	private void publish(final byte[] bytes) {
		final OutputCapture audience = this.capture.get();
		if (audience != null) {
			audience.accept(bytes);
		} else {
			System.out.write(bytes, 0, bytes.length);
			System.out.flush();
			if (System.out.checkError()) {
				throw new IllegalStateException("The output publication failed.");
			}
		}
	}

	public void abort() {
		final PendingOutput transaction = this.pending.get();
		if (transaction != null) {
			this.journal.record(transaction.number, transaction.payload.toString(), OutputDisposition.ABORTED);
			this.pending.remove();
			LOGGER.warning("Output transaction aborted for number " + transaction.number);
		}
	}

	private static final class PendingOutput {
		private final int number;
		private final StringBuilder payload = new StringBuilder();

		private PendingOutput(final int number) {
			this.number = number;
		}
	}
}
