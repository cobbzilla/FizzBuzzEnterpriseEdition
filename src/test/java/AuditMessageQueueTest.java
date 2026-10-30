import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.JvmAuditJournalFactory;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.AuditEventConsumer;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.AuditMessageQueue;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.AuditStatusProjection;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.EphemeralAuditStore;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditEntry;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditJournal;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputDisposition;

/**
 * Delivery, redelivery, and the office of undeliverable correspondence.
 */
public class AuditMessageQueueTest {

	@Test
	public void failedDeliveryCanBeRetriedOnTheNextPoll() {
		final OutputAuditJournal journal = JvmAuditJournalFactory.create();
		journal.record(1, "1\n", OutputDisposition.COMMITTED);
		final AuditMessageQueue queue = journal.messages();
		final AuditStatusProjection projection = new AuditStatusProjection();
		final AuditEventConsumer unreliable = new AuditEventConsumer() {
			private boolean first = true;

			@Override
			public void accept(final OutputAuditEntry entry) {
				if (this.first) {
					this.first = false;
					throw new IllegalStateException("Committee temporarily unavailable.");
				}
				projection.accept(entry);
			}
		};

		assertEquals(0, queue.dispatch(unreliable));
		assertEquals(1, queue.pendingCount());
		assertEquals(1, queue.dispatch(unreliable));
		assertEquals(0, queue.pendingCount());
		assertEquals(1, projection.committedCount());
	}

	@Test
	public void thirdFailureMovesTheMessageToDeadLetters() {
		final OutputAuditJournal journal = JvmAuditJournalFactory.create();
		journal.record(2, "2\n", OutputDisposition.COMMITTED);
		final AuditMessageQueue queue = journal.messages();
		final AuditEventConsumer refusing = new AuditEventConsumer() {
			@Override
			public void accept(final OutputAuditEntry entry) {
				throw new IllegalStateException("Address unknown.");
			}
		};

		assertEquals(0, queue.dispatch(refusing));
		assertEquals(1, queue.pendingCount());
		assertEquals(0, queue.dispatch(refusing));
		assertEquals(1, queue.pendingCount());
		assertEquals(0, queue.dispatch(refusing));
		assertEquals(0, queue.pendingCount());
		assertEquals(1, queue.deadLetterCount());
		assertEquals(2, queue.deadLetters().get(0).getNumber());
		assertEquals(1, journal.snapshot().size());
	}

	@Test
	public void oneFailedMessageDoesNotBlockAnother() {
		final OutputAuditJournal journal = JvmAuditJournalFactory.create();
		journal.record(1, "1\n", OutputDisposition.COMMITTED);
		journal.record(2, "2\n", OutputDisposition.COMMITTED);
		final AuditMessageQueue queue = journal.messages();
		final AuditStatusProjection projection = new AuditStatusProjection();
		assertEquals(1, queue.dispatch(new AuditEventConsumer() {
			@Override
			public void accept(final OutputAuditEntry entry) {
				if (entry.getNumber() == 1) {
					throw new IllegalStateException("First mailbox closed.");
				}
				projection.accept(entry);
			}
		}));
		assertEquals(1, queue.pendingCount());
		assertEquals(1, queue.dispatch(projection));
		assertEquals(2, projection.committedCount());
	}

	@Test
	public void projectionIgnoresDuplicateDeliveryOfOneCertificate() {
		final OutputAuditJournal journal = JvmAuditJournalFactory.create();
		final OutputAuditEntry entry = journal.record(3, "Fizz\n", OutputDisposition.COMMITTED);
		final AuditStatusProjection projection = new AuditStatusProjection();
		projection.accept(entry);
		projection.accept(entry);
		assertEquals(1, projection.committedCount());
		assertEquals(0, projection.abortedCount());
	}

	@Test
	public void newShiftQueuesItsInheritedMinutesForProjection() {
		final EphemeralAuditStore store = new EphemeralAuditStore();
		final OutputAuditJournal firstShift = JvmAuditJournalFactory.create(store);
		firstShift.record(1, "1\n", OutputDisposition.COMMITTED);
		firstShift.record(2, "unfinished", OutputDisposition.ABORTED);
		final OutputAuditJournal secondShift = JvmAuditJournalFactory.create(store);
		assertEquals(2, secondShift.messages().pendingCount());
		final AuditStatusProjection projection = new AuditStatusProjection();
		assertEquals(2, secondShift.messages().dispatch(projection));
		assertEquals(1, projection.committedCount());
		assertEquals(1, projection.abortedCount());
		assertTrue(secondShift.verifyChain());
	}
}
