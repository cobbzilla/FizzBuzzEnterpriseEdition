import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.EphemeralAuditStore;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditJournal;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputTransactionCoordinator;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.RehearsalAdmissionCommission;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.RehearsalAdmissionReceipt;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.SyntheticAssuranceBureau;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.SlopFizzBuzz;

/** Time-limited minutes for a public synthetic hearing. */
public class RehearsalAdmissionCommissionTest {

	@Test
	public void repeatedHearingBorrowsTheVerdictUntilTheLeaseExpires() {
		final MutableNanoClock clock = new MutableNanoClock();
		final OutputAuditJournal journal = new OutputAuditJournal(new EphemeralAuditStore());
		final SlopFizzBuzz silentService = new SlopFizzBuzz() {
			@Override public void slopFizzBuzz(final int limit) { }
		};
		final SyntheticAssuranceBureau bureau = new SyntheticAssuranceBureau(
				silentService, new OutputTransactionCoordinator(journal), journal);
		final RehearsalAdmissionCommission commission =
				new RehearsalAdmissionCommission(bureau, clock);

		final RehearsalAdmissionReceipt first = commission.convene();
		assertEquals(RehearsalAdmissionReceipt.Disposition.EXECUTED, first.getDisposition());
		assertEquals(15L, first.getLeaseSecondsRemaining());
		assertTrue(first.getVerdict().toJson().contains("\"sequence\":1"));
		assertEquals(RehearsalAdmissionReceipt.Disposition.REUSED,
				commission.convene().getDisposition());

		clock.nanos = 14_999_999_999L;
		final RehearsalAdmissionReceipt lastMoment = commission.convene();
		assertEquals(RehearsalAdmissionReceipt.Disposition.REUSED, lastMoment.getDisposition());
		assertEquals(1L, lastMoment.getLeaseSecondsRemaining());
		assertEquals(first.getVerdict().toJson(), lastMoment.getVerdict().toJson());

		clock.nanos = 15_000_000_000L;
		final RehearsalAdmissionReceipt renewed = commission.convene();
		assertEquals(RehearsalAdmissionReceipt.Disposition.EXECUTED, renewed.getDisposition());
		assertTrue(renewed.getVerdict().toJson().contains("\"sequence\":2"));
	}

	private static final class MutableNanoClock implements RehearsalAdmissionCommission.NanoClock {
		private long nanos;

		@Override public long now() {
			return this.nanos;
		}
	}
}
