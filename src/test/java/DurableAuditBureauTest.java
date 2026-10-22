import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.util.List;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TemporaryFolder;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.H2AuditStore;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditEntry;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditJournal;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditStore;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputDisposition;

/**
 * Checks whether the audit bureau remembers anything after everyone goes home.
 */
public class DurableAuditBureauTest {

	@Rule
	public final TemporaryFolder chamber = new TemporaryFolder();

	@Test
	public void closedAndReopenedRepositoryRemembersCommittedAndAbortedEntries() throws Exception {
		final String url = jdbcUrl();
		final OutputAuditJournal first = new OutputAuditJournal(new H2AuditStore(url));
		first.record(1, "1\n", OutputDisposition.COMMITTED);
		first.record(2, "unfinished", OutputDisposition.ABORTED);

		final OutputAuditJournal reopened = new OutputAuditJournal(new H2AuditStore(url));
		assertEquals(2, reopened.snapshot().size());
		assertEquals("1\n", reopened.snapshot().get(0).getPayload());
		assertEquals(OutputDisposition.ABORTED, reopened.snapshot().get(1).getDisposition());
		assertTrue(reopened.verifyChain());

		reopened.record(3, "Fizz\n", OutputDisposition.COMMITTED);
		final OutputAuditJournal thirdShift = new OutputAuditJournal(new H2AuditStore(url));
		assertEquals(3, thirdShift.snapshot().size());
		assertEquals(3L, thirdShift.snapshot().get(2).getSequence());
		assertTrue(thirdShift.verifyChain());
	}

	@Test
	public void tamperedDatabaseIsRejectedAtTheDoor() throws Exception {
		final String url = jdbcUrl();
		final OutputAuditJournal journal = new OutputAuditJournal(new H2AuditStore(url));
		journal.record(15, "FizzBuzz\n", OutputDisposition.COMMITTED);
		try (Connection connection = DriverManager.getConnection(url);
				Statement statement = connection.createStatement()) {
			statement.executeUpdate("UPDATE output_audit SET payload = 'forged' WHERE sequence_number = 1");
		}
		try {
			new OutputAuditJournal(new H2AuditStore(url));
			fail("The forged chain must not be accepted.");
		} catch (final IllegalStateException expected) {
			assertEquals("The existing audit chain failed verification.", expected.getMessage());
		}
	}

	@Test
	public void failedRepositoryWriteDoesNotAdvanceTheLocalLedger() {
		final OutputAuditStore refusingStore = new OutputAuditStore() {
			@Override
			public List<OutputAuditEntry> load() {
				return java.util.Collections.emptyList();
			}

			@Override
			public void append(final OutputAuditEntry entry) {
				throw new IllegalStateException("The filing cabinet is locked.");
			}
		};
		final OutputAuditJournal journal = new OutputAuditJournal(refusingStore);
		try {
			journal.record(1, "1\n", OutputDisposition.COMMITTED);
			fail("The filing refusal must reach the caller.");
		} catch (final IllegalStateException expected) {
			assertEquals("The filing cabinet is locked.", expected.getMessage());
		}
		assertEquals(0, journal.snapshot().size());
		assertTrue(journal.verifyChain());
	}

	private String jdbcUrl() {
		return "jdbc:h2:file:" + this.chamber.getRoot().getAbsolutePath() + "/audit";
	}
}
