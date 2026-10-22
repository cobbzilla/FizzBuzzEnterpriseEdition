import static org.junit.Assert.assertEquals;

import org.junit.Test;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.capacity.CapacityForecast;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.capacity.CapacityPlanningBureau;

public class CapacityPlanningBureauTest {

	@Test
	public void forecastsReconcileWithEnumeratedProclamationsForEveryMandate() {
		final CapacityPlanningBureau bureau = new CapacityPlanningBureau();
		int numerals = 0;
		int fizz = 0;
		int buzz = 0;
		int joint = 0;
		for (int limit = 0; limit <= 1000; limit++) {
			if (limit > 0) {
				if (limit % 15 == 0) {
					joint++;
				} else if (limit % 3 == 0) {
					fizz++;
				} else if (limit % 5 == 0) {
					buzz++;
				} else {
					numerals++;
				}
			}
			final CapacityForecast forecast = bureau.forecast(limit);
			assertEquals("numerals at " + limit, numerals, forecast.getNumeralLines());
			assertEquals("fizz at " + limit, fizz, forecast.getFizzLines());
			assertEquals("buzz at " + limit, buzz, forecast.getBuzzLines());
			assertEquals("joint at " + limit, joint, forecast.getFizzBuzzLines());
			assertEquals("lines at " + limit, limit, forecast.getTotalLines());
			assertEquals("units at " + limit, numerals + 2 * (fizz + buzz) + 3 * joint,
					forecast.getWorkloadUnits());
		}
	}

	@Test(expected = IllegalArgumentException.class)
	public void bureauRejectsMandatesBeyondItsCharter() {
		new CapacityPlanningBureau().forecast(1001);
	}
}
