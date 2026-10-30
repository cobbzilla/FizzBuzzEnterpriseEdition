import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.JvmAuditJournalFactory;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

import org.junit.Test;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.NotarialSeal;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditJournal;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputDisposition;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputTransactionCoordinator;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.ProclamationNotary;

/** A final word, number, and line-ending inspection before publication. */
public class ProclamationNotaryTest {

	private final ProclamationNotary notary = new ProclamationNotary();
	private final String newline = System.getProperty("line.separator");

	@Test
	public void allFourAuthorizedFormsReceiveNumberBoundSeals() {
		this.notary.certify(1, "1" + this.newline).authorize(1, "1" + this.newline);
		this.notary.certify(3, "Fizz" + this.newline).authorize(3, "Fizz" + this.newline);
		this.notary.certify(5, "Buzz" + this.newline).authorize(5, "Buzz" + this.newline);
		this.notary.certify(15, "FizzBuzz" + this.newline).authorize(15, "FizzBuzz" + this.newline);
	}

	@Test
	public void unauthorizedWordsAndLineEndingsAreRejected() {
		expectRejection(15, "Fizz" + this.newline);
		expectRejection(3, "Buzz" + this.newline);
		expectRejection(5, "5" + this.newline);
		expectRejection(1, "01" + this.newline);
		expectRejection(15, "FizzBuzz");
		expectRejection(15, "FizzBuzz" + this.newline + this.newline);
	}

	@Test
	public void notarialSealsCannotBeReassigned() {
		final NotarialSeal seal = this.notary.certify(15, "FizzBuzz" + this.newline);
		try {
			seal.authorize(30, "FizzBuzz" + this.newline);
			fail("Another number must not inherit the seal.");
		} catch (final IllegalStateException expected) {
			// The seal belongs to 15.
		}
		try {
			seal.authorize(15, "Fizz" + this.newline);
			fail("Another payload must not inherit the seal.");
		} catch (final IllegalStateException expected) {
			// The seal belongs to the exact text.
		}
	}

	@Test
	public void invalidProclamationIsAbortedBeforeAnyByteIsPublished() throws Exception {
		final OutputAuditJournal journal = JvmAuditJournalFactory.create();
		final OutputTransactionCoordinator transactions = new OutputTransactionCoordinator(journal);
		final PrintStream original = System.out;
		final ByteArrayOutputStream bytes = new ByteArrayOutputStream();
		final PrintStream audience = new PrintStream(bytes);
		try {
			System.setOut(audience);
			transactions.begin(15);
			transactions.stageOrWrite("Fizz");
			transactions.stageOrWrite(this.newline);
			try {
				transactions.commit();
				fail("The notary must veto an incomplete FizzBuzz proclamation.");
			} catch (final IllegalStateException expected) {
				assertEquals("The proclamation for 15 failed lexical notarization.", expected.getMessage());
			}
		} finally {
			System.setOut(original);
			audience.close();
		}
		assertEquals("", bytes.toString());
		assertEquals(1, journal.snapshot().size());
		assertEquals(OutputDisposition.ABORTED, journal.snapshot().get(0).getDisposition());
		assertEquals("Fizz" + this.newline, journal.snapshot().get(0).getPayload());
	}

	private void expectRejection(final int number, final String payload) {
		try {
			this.notary.certify(number, payload);
			fail("A mismatched proclamation must not be certified.");
		} catch (final IllegalStateException expected) {
			// The notary withheld its seal.
		}
	}
}
