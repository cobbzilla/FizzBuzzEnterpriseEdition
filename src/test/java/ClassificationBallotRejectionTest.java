import static org.junit.Assert.assertThrows;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.function.ThrowingRunnable;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.classification.ClassificationBallot;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.classification.ClassificationBallotBox;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.IsEvenlyDivisibleStrategy;

/** Objections that the classification council must sustain. */
public class ClassificationBallotRejectionTest {

	private final ClassificationBallotBox box = new ClassificationBallotBox();

	@Test
	public void numeralAndFizzCannotBothClaimTheSameNumber() {
		final IllegalStateException refusal = assertThrows(IllegalStateException.class,
				new ThrowingRunnable() {
					@Override public void run() {
						box.cast(3, vote(true), vote(false), vote(true));
					}
				});
		assertTrue(refusal.getMessage().contains("contradicts"));
	}

	@Test
	public void arithmeticWitnessVetoesAConsistentButFalseBallot() {
		final IllegalStateException refusal = assertThrows(IllegalStateException.class,
				new ThrowingRunnable() {
					@Override public void run() {
						box.cast(3, vote(false), vote(false), vote(true));
					}
				});
		assertTrue(refusal.getMessage().contains("witness"));
	}

	@Test
	public void certificatesCannotBeTransferredToAnotherIntegerOrSeat() {
		final ClassificationBallot ballot = this.box.cast(15,
				vote(true), vote(true), vote(false));
		assertThrows(IllegalStateException.class,
				new ThrowingRunnable() {
					@Override public void run() {
						ballot.certifiedStrategy(0).isEvenlyDivisible(16);
					}
				});
		assertThrows(IllegalArgumentException.class, new ThrowingRunnable() {
			@Override public void run() {
				ballot.certifiedStrategy(3);
			}
		});
	}

	@Test
	public void nonpositiveNumbersAndMissingElectorsCannotEnterTheChamber() {
		assertThrows(IllegalArgumentException.class, new ThrowingRunnable() {
			@Override public void run() {
				box.cast(0, vote(true), vote(true), vote(false));
			}
		});
		assertThrows(IllegalArgumentException.class, new ThrowingRunnable() {
			@Override public void run() {
				box.cast(1, null, vote(false), vote(true));
			}
		});
	}

	private static IsEvenlyDivisibleStrategy vote(final boolean approved) {
		return new IsEvenlyDivisibleStrategy() {
			@Override
			public boolean isEvenlyDivisible(final int number) {
				return approved;
			}
		};
	}
}
