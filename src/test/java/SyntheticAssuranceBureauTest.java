import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.EphemeralAuditStore;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditJournal;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputTransactionCoordinator;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.CanaryVerdict;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.SyntheticAssuranceBureau;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.SlopFizzBuzz;

/** Adversarial hearings for an apparently straightforward golden answer. */
public class SyntheticAssuranceBureauTest {

	@Test
	public void silentServiceCannotReceiveAnApproval() {
		final SyntheticAssuranceBureau bureau = bureau(new SlopFizzBuzz() {
			@Override
			public void slopFizzBuzz(final int limit) { }
		});
		assertEquals(CanaryVerdict.State.NOT_RUN, bureau.latest().getState());
		assertEquals(CanaryVerdict.State.FAILED, bureau.convene().getState());
		assertTrue(bureau.latest().toJson().contains("ANSWER_DEVIATED_FROM_SPECIMEN"));
		assertTrue(bureau.latest().toJson().contains("\"observedLines\":0"));
	}

	@Test
	public void throwingServiceProducesARecordedFailureNotAnException() {
		final SyntheticAssuranceBureau bureau = bureau(new SlopFizzBuzz() {
			@Override
			public void slopFizzBuzz(final int limit) {
				throw new IllegalStateException("The specimen has been misplaced.");
			}
		});
		assertEquals(CanaryVerdict.State.FAILED, bureau.convene().getState());
		assertTrue(bureau.latest().toJson().contains("GENERATION_FAILED"));
		assertTrue(bureau.convene().toJson().contains("\"sequence\":2"));
	}

	private static SyntheticAssuranceBureau bureau(final SlopFizzBuzz service) {
		final OutputAuditJournal journal = new OutputAuditJournal(new EphemeralAuditStore());
		return new SyntheticAssuranceBureau(service, new OutputTransactionCoordinator(journal), journal);
	}
}
