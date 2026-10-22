import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.List;

import org.junit.Test;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditEntry;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditJournal;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputDisposition;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputTransactionCoordinator;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.SlopFizzBuzz;

/**
 * Minutes, publication, and chain of custody for the output bureau.
 */
public class AuditedOutputTransactionTest {

	@Test
	public void fragmentsArePublishedAsOneCertifiedLine() throws Exception {
		final OutputAuditJournal journal = new OutputAuditJournal();
		final OutputTransactionCoordinator transactions = new OutputTransactionCoordinator(journal);
		final PrintStream original = System.out;
		final ByteArrayOutputStream bytes = new ByteArrayOutputStream();
		final CountingPrintStream published = new CountingPrintStream(bytes);
		try {
			System.setOut(published);
			transactions.begin(15);
			transactions.stageOrWrite("Fizz");
			transactions.stageOrWrite("Buzz");
			transactions.stageOrWrite("\n");
			assertEquals("", bytes.toString());
			transactions.commit();
		} finally {
			System.setOut(original);
			published.close();
		}
		assertEquals("FizzBuzz\n", bytes.toString());
		assertEquals(1, published.getWrites());
		assertEquals(1, journal.snapshot().size());
		assertEquals(OutputDisposition.COMMITTED, journal.snapshot().get(0).getDisposition());
		assertEquals(15, journal.snapshot().get(0).getNumber());
		assertTrue(journal.verifyChain());
	}

	@Test
	public void abortedFragmentsNeverReachThePublicRecord() throws Exception {
		final OutputAuditJournal journal = new OutputAuditJournal();
		final OutputTransactionCoordinator transactions = new OutputTransactionCoordinator(journal);
		final PrintStream original = System.out;
		final ByteArrayOutputStream bytes = new ByteArrayOutputStream();
		try {
			System.setOut(new PrintStream(bytes));
			transactions.begin(3);
			transactions.stageOrWrite("Fizz");
			transactions.abort();
		} finally {
			System.setOut(original);
		}
		assertEquals("", bytes.toString());
		assertEquals(OutputDisposition.ABORTED, journal.snapshot().get(0).getDisposition());
		assertEquals("Fizz", journal.snapshot().get(0).getPayload());
		assertTrue(journal.verifyChain());
	}

	@Test(expected = IllegalStateException.class)
	public void aSecondTransactionCannotOccupyTheSameThread() {
		final OutputTransactionCoordinator transactions =
				new OutputTransactionCoordinator(new OutputAuditJournal());
		transactions.begin(1);
		try {
			transactions.begin(2);
		} finally {
			transactions.abort();
		}
	}

	@Test
	public void ledgerLinksEachEntryToItsPredecessor() {
		final OutputAuditJournal journal = new OutputAuditJournal();
		final OutputAuditEntry first = journal.record(1, "1\n", OutputDisposition.COMMITTED);
		final OutputAuditEntry second = journal.record(2, "2\n", OutputDisposition.COMMITTED);
		assertEquals(1L, first.getSequence());
		assertEquals(2L, second.getSequence());
		assertEquals(first.getDigest(), second.getPreviousDigest());
		assertEquals(64, second.getDigest().length());
		assertFalse(first.getDigest().equals(second.getDigest()));
		assertTrue(journal.verifyChain());
	}

	@Test
	public void failedPublicationIsRecordedAsAborted() throws Exception {
		final OutputAuditJournal journal = new OutputAuditJournal();
		final OutputTransactionCoordinator transactions = new OutputTransactionCoordinator(journal);
		final PrintStream original = System.out;
		final PrintStream broken = new PrintStream(new ByteArrayOutputStream()) {
			@Override
			public void write(final byte[] bytes, final int offset, final int length) {
				throw new IllegalStateException("Printer unavailable");
			}
		};
		try {
			System.setOut(broken);
			transactions.begin(5);
			transactions.stageOrWrite("Buzz\n");
			try {
				transactions.commit();
				fail("The publication was required to fail.");
			} catch (final IllegalStateException expected) {
				assertEquals("Printer unavailable", expected.getMessage());
			}
		} finally {
			System.setOut(original);
			broken.close();
		}
		assertEquals(1, journal.snapshot().size());
		assertEquals(OutputDisposition.ABORTED, journal.snapshot().get(0).getDisposition());
		assertTrue(journal.verifyChain());
	}

	@Test(expected = UnsupportedOperationException.class)
	public void snapshotCannotBeAmendedByAnOutsideCommittee() {
		final OutputAuditJournal journal = new OutputAuditJournal();
		journal.snapshot().clear();
	}

	@Test
	public void actualSlopFizzBuzzRunLeavesFifteenCommittedEntries() {
		final ConfigurableApplicationContext context =
				new ClassPathXmlApplicationContext(TestConstants.SPRING_XML);
		final PrintStream original = System.out;
		final ByteArrayOutputStream bytes = new ByteArrayOutputStream();
		try {
			System.setOut(new PrintStream(bytes));
			final SlopFizzBuzz slopFizzBuzz = (SlopFizzBuzz) context.getBean(TestConstants.STANDARD_SLOP_FIZZ_BUZZ);
			slopFizzBuzz.slopFizzBuzz(15);
			final OutputAuditJournal journal = context.getBean(OutputAuditJournal.class);
			final List<OutputAuditEntry> entries = journal.snapshot();
			assertEquals(15, entries.size());
			assertEquals("FizzBuzz" + System.getProperty("line.separator"),
					entries.get(14).getPayload());
			assertEquals(OutputDisposition.COMMITTED, entries.get(14).getDisposition());
			assertTrue(journal.verifyChain());
		} finally {
			System.setOut(original);
			context.close();
		}
	}

	private static final class CountingPrintStream extends PrintStream {
		private int writes;

		private CountingPrintStream(final ByteArrayOutputStream bytes) {
			super(bytes);
		}

		@Override
		public void write(final byte[] bytes, final int offset, final int length) {
			this.writes++;
			super.write(bytes, offset, length);
		}

		private int getWrites() {
			return this.writes;
		}
	}
}
