package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings.ExecutionCustody;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * A process-local message broker with a three-attempt delivery charter.
 */
public final class AuditMessageQueue {

	private static final int MAX_DELIVERY_ATTEMPTS = 3;
	private final Deque<Envelope> pending = new ArrayDeque<Envelope>();
	private final List<OutputAuditEntry> deadLetters = new ArrayList<OutputAuditEntry>();

	public synchronized void publish(final OutputAuditEntry entry) {
		this.pending.addLast(new Envelope(entry));
        if(ExecutionCustody.observing())ExecutionCustody.record("QUEUE_ENQUEUED","Audit Message Broker","Queued audit sequence "+entry.getSequence()+" for the idempotent status projection. Publication to the mailbox is not delivery acknowledgment.");
	}

	/**
	 * Polls a fixed batch. A failed message is retried on the next poll.
	 */
	public synchronized int dispatch(final AuditEventConsumer consumer) {
		final int batchSize = this.pending.size();
		int delivered = 0;
		for (int index = 0; index < batchSize; index++) {
			final Envelope envelope = this.pending.removeFirst();
			try {
				consumer.accept(envelope.entry);
                if(ExecutionCustody.observing())ExecutionCustody.record("QUEUE_ACK","Audit Status Projection","Acknowledged audit sequence "+envelope.entry.getSequence()+" after the consumer accepted it.");
				delivered++;
			} catch (final RuntimeException failure) {
				envelope.attempts++;
				if (envelope.attempts >= MAX_DELIVERY_ATTEMPTS) {
					this.deadLetters.add(envelope.entry);
				} else {
					this.pending.addLast(envelope);
				}
			}
		}
		return delivered;
	}

	public synchronized int pendingCount() {
		return this.pending.size();
	}

	public synchronized int deadLetterCount() {
		return this.deadLetters.size();
	}

	public synchronized List<OutputAuditEntry> deadLetters() {
		return new ArrayList<OutputAuditEntry>(this.deadLetters);
	}

	private static final class Envelope {
		private final OutputAuditEntry entry;
		private int attempts;

		private Envelope(final OutputAuditEntry entry) {
			this.entry = entry;
		}
	}
}
