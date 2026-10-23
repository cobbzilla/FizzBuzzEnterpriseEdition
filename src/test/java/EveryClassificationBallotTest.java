import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.Collection;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.classification.ClassificationBallot;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.classification.ClassificationBallotBox;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.BuzzStrategy;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.FizzStrategy;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.NoFizzNoBuzzStrategy;

/** A thousand separate hearings for three painfully familiar rules. */
@RunWith(Parameterized.class)
public class EveryClassificationBallotTest {

	private static ClassPathXmlApplicationContext context;
	private static FizzStrategy fizz;
	private static BuzzStrategy buzz;
	private static NoFizzNoBuzzStrategy numeral;

	private final int number;

	public EveryClassificationBallotTest(final int number) {
		this.number = number;
	}

	@Parameterized.Parameters(name = "integer {0}")
	public static Collection<Object[]> mandates() {
		final Collection<Object[]> mandates = new ArrayList<Object[]>();
		for (int number = 1; number <= 1000; number++) {
			mandates.add(new Object[] { number });
		}
		return mandates;
	}

	@BeforeClass
	public static void conveneLegacyStrategies() {
		context = new ClassPathXmlApplicationContext(TestConstants.SPRING_XML);
		fizz = context.getBean(FizzStrategy.class);
		buzz = context.getBean(BuzzStrategy.class);
		numeral = context.getBean(NoFizzNoBuzzStrategy.class);
	}

	@AfterClass
	public static void adjournLegacyStrategies() {
		context.close();
	}

	@Test
	public void strategyVotesReceiveTheCorrectCertifiedPermissions() {
		final ClassificationBallot ballot = new ClassificationBallotBox().cast(
				this.number, fizz, buzz, numeral);
		assertEquals(this.number % 3 == 0, ballot.permitsFizz());
		assertEquals(this.number % 5 == 0, ballot.permitsBuzz());
		assertEquals(this.number % 3 != 0 && this.number % 5 != 0,
				ballot.permitsNumeral());
		assertEquals(ballot.permitsFizz(), ballot.certifiedStrategy(0).isEvenlyDivisible(this.number));
		assertEquals(ballot.permitsBuzz(), ballot.certifiedStrategy(1).isEvenlyDivisible(this.number));
		assertEquals(ballot.permitsNumeral(), ballot.certifiedStrategy(2).isEvenlyDivisible(this.number));
		assertFalse(ballot.permitsNumeral() && (ballot.permitsFizz() || ballot.permitsBuzz()));
		assertTrue(ballot.permitsNumeral() || ballot.permitsFizz() || ballot.permitsBuzz());
	}
}
