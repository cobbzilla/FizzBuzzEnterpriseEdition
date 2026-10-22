import static org.junit.Assert.assertEquals;

import org.junit.Test;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.LoopStep;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.succession.OrdinalSuccessionExecutor;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.succession.SuccessionCertificate;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.succession.SuccessionCertificateAuditor;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.succession.SuccessionPetition;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.succession.UnitAdvancementAuthority;

/**
 * Succession law, including cases the official one-to-one-hundred run never reaches.
 */
public class OrdinalSuccessionTest {

	private final UnitAdvancementAuthority authority = new UnitAdvancementAuthority();
	private final SuccessionCertificateAuditor auditor = new SuccessionCertificateAuditor();
	private final OrdinalSuccessionExecutor executor =
			new OrdinalSuccessionExecutor(this.authority, this.auditor);

	@Test
	public void eachOfficialNumberHasItsImmediateSuccessor() {
		final LoopStep step = new LoopStep(this.executor);
		for (int incumbent = 1; incumbent <= 100; incumbent++) {
			assertEquals(incumbent + 1, step.stepLoop(incumbent));
		}
	}

	@Test
	public void negativeIncumbentsAlsoObserveTheSameLaw() {
		assertEquals(-2, this.executor.execute(new SuccessionPetition(-3, 1)));
		assertEquals(0, this.executor.execute(new SuccessionPetition(-1, 1)));
	}

	@Test
	public void finalRepresentableSuccessionIsCertified() {
		assertEquals(Integer.MAX_VALUE,
				this.executor.execute(new SuccessionPetition(Integer.MAX_VALUE - 1, 1)));
	}

	@Test(expected = ArithmeticException.class)
	public void maximumIntegerCannotPetitionForARepresentableSuccessor() {
		this.executor.execute(new SuccessionPetition(Integer.MAX_VALUE, 1));
	}

	@Test(expected = IllegalArgumentException.class)
	public void twoAtOnceIsAnUnauthorizedAdvancement() {
		this.executor.execute(new SuccessionPetition(7, 2));
	}

	@Test(expected = IllegalArgumentException.class)
	public void zeroAtOnceIsAnUnauthorizedAdvancement() {
		this.executor.execute(new SuccessionPetition(7, 0));
	}

	@Test(expected = IllegalStateException.class)
	public void auditorRejectsAnInflatedNomination() {
		this.auditor.certify(new SuccessionCertificate(new SuccessionPetition(7, 1), 9));
	}

	@Test(expected = IllegalStateException.class)
	public void auditorRejectsAnOverflowedNomination() {
		this.auditor.certify(new SuccessionCertificate(
				new SuccessionPetition(Integer.MAX_VALUE, 1), Integer.MIN_VALUE));
	}
}
