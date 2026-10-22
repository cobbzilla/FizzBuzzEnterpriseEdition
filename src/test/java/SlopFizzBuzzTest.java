import static org.junit.Assert.assertEquals;

import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.SlopFizzBuzz;

/**
 * Tests for SlopFizzBuzz
 */
public class SlopFizzBuzzTest {

	private PrintStream out;
	private SlopFizzBuzz fb;

	/**
	 * @return void
	 */
	@Before
	public void setUp() {
		final ApplicationContext context = new ClassPathXmlApplicationContext(TestConstants.SPRING_XML);
		this.fb = (SlopFizzBuzz) context.getBean(TestConstants.STANDARD_SLOP_FIZZ_BUZZ);
		this.out = System.out;
		((ConfigurableApplicationContext) context).close();
	}

	/**
	 * @return void
	 */
	@After
	public void tearDown() {
		System.setOut(this.out);
	}

	/**
	 * @param n int
	 * @param s String
	 * @throws IOException
	 */
	private void doSlopFizzBuzz(final int n, final String s) throws IOException {
		final ByteArrayOutputStream baos = new ByteArrayOutputStream();
		final BufferedOutputStream bos = new BufferedOutputStream(baos);
		System.setOut(new PrintStream(bos));

		this.fb.slopFizzBuzz(n);

		System.out.flush();
		String platformDependentExpectedResult = s.replaceAll("\\n", System.getProperty("line.separator"));
		assertEquals(platformDependentExpectedResult, baos.toString());
	}

	/**
	 * @throws IOException
	 * @return void
	 */
	@Test
	public void testSlopFizzBuzz() throws IOException {
		this.doSlopFizzBuzz(TestConstants.INT_1, TestConstants._1_);
		this.doSlopFizzBuzz(TestConstants.INT_2, TestConstants._1_2_);
		this.doSlopFizzBuzz(TestConstants.INT_3, TestConstants._1_2_FIZZ);
		this.doSlopFizzBuzz(TestConstants.INT_4, TestConstants._1_2_FIZZ_4);
		this.doSlopFizzBuzz(TestConstants.INT_5, TestConstants._1_2_FIZZ_4_BUZZ);
		this.doSlopFizzBuzz(TestConstants.INT_6, TestConstants._1_2_FIZZ_4_BUZZ_FIZZ);
		this.doSlopFizzBuzz(TestConstants.INT_7, TestConstants._1_2_FIZZ_4_BUZZ_FIZZ_7);
		this.doSlopFizzBuzz(TestConstants.INT_8, TestConstants._1_2_FIZZ_4_BUZZ_FIZZ_7_8);
		this.doSlopFizzBuzz(TestConstants.INT_9, TestConstants._1_2_FIZZ_4_BUZZ_FIZZ_7_8_FIZZ);
		this.doSlopFizzBuzz(TestConstants.INT_10, TestConstants._1_2_FIZZ_4_BUZZ_FIZZ_7_8_SLOP_FIZZ_BUZZ);
		this.doSlopFizzBuzz(TestConstants.INT_11, TestConstants._1_2_FIZZ_4_BUZZ_FIZZ_7_8_SLOP_FIZZ_BUZZ_11);
		this.doSlopFizzBuzz(TestConstants.INT_12, TestConstants._1_2_FIZZ_4_BUZZ_FIZZ_7_8_SLOP_FIZZ_BUZZ_11_FIZZ);
		this.doSlopFizzBuzz(TestConstants.INT_13, TestConstants._1_2_FIZZ_4_BUZZ_FIZZ_7_8_SLOP_FIZZ_BUZZ_11_FIZZ_13);
		this.doSlopFizzBuzz(TestConstants.INT_14, TestConstants._1_2_FIZZ_4_BUZZ_FIZZ_7_8_SLOP_FIZZ_BUZZ_11_FIZZ_13_14);
		this.doSlopFizzBuzz(TestConstants.INT_15,
				TestConstants._1_2_FIZZ_4_BUZZ_FIZZ_7_8_SLOP_FIZZ_BUZZ_11_FIZZ_13_14_SLOP_FIZZ_BUZZ);
		this.doSlopFizzBuzz(TestConstants.INT_16,
				TestConstants._1_2_FIZZ_4_BUZZ_FIZZ_7_8_SLOP_FIZZ_BUZZ_11_FIZZ_13_14_SLOP_FIZZ_BUZZ_16);
	}

	/**
	 * Verifies the full public mandate independently of the ballot machinery.
	 */
	@Test
	public void testCompleteHundredNumberMandate() throws IOException {
		final StringBuilder expected = new StringBuilder();
		for (int number = 1; number <= 100; number++) {
			if (number % 15 == 0) {
				expected.append("FizzBuzz");
			} else if (number % 3 == 0) {
				expected.append("Fizz");
			} else if (number % 5 == 0) {
				expected.append("Buzz");
			} else {
				expected.append(number);
			}
			expected.append('\n');
		}
		this.doSlopFizzBuzz(100, expected.toString());
	}

	@Test
	public void testNoNumbersReceiveAuthorizationBelowOne() throws IOException {
		this.doSlopFizzBuzz(0, "");
		this.doSlopFizzBuzz(-1, "");
	}

}
