import static org.junit.Assert.assertEquals;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Collection;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.seriouscompany.business.java.fizzbuzz.packagenamingpackage.interfaces.FizzBuzz;

/**
 * Every possible upper limit in the official one-hundred-number jurisdiction.
 */
@RunWith(Parameterized.class)
public class EveryUpperLimitMandateTest {

	private static ConfigurableApplicationContext context;
	private static FizzBuzz fizzBuzz;

	private final int upperLimit;

	public EveryUpperLimitMandateTest(final int upperLimit) {
		this.upperLimit = upperLimit;
	}

	@Parameters(name = "upper limit {0}")
	public static Collection<Object[]> upperLimits() {
		final Collection<Object[]> cases = new ArrayList<Object[]>();
		for (int limit = 0; limit <= 100; limit++) {
			cases.add(new Object[] { limit });
		}
		return cases;
	}

	@BeforeClass
	public static void openInstitution() {
		context = new ClassPathXmlApplicationContext(TestConstants.SPRING_XML);
		fizzBuzz = (FizzBuzz) context.getBean(TestConstants.STANDARD_FIZZ_BUZZ);
	}

	@AfterClass
	public static void closeInstitution() {
		context.close();
	}

	@Test
	public void printedRecordAgreesWithTheRulesOfTheGame() throws Exception {
		final PrintStream original = System.out;
		final ByteArrayOutputStream record = new ByteArrayOutputStream();
		final PrintStream recorder = new PrintStream(record);
		try {
			System.setOut(recorder);
			fizzBuzz.fizzBuzz(this.upperLimit);
			recorder.flush();
		} finally {
			System.setOut(original);
			recorder.close();
		}

		final StringBuilder expected = new StringBuilder();
		for (int number = 1; number <= this.upperLimit; number++) {
			if (number % 15 == 0) {
				expected.append("FizzBuzz");
			} else if (number % 3 == 0) {
				expected.append("Fizz");
			} else if (number % 5 == 0) {
				expected.append("Buzz");
			} else {
				expected.append(number);
			}
			expected.append(System.getProperty("line.separator"));
		}
		assertEquals(expected.toString(), record.toString());
	}
}
