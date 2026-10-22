package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.capacity;

/**
 * Forecasts the proclamation mix without convening the proclamation engine.
 */
public final class CapacityPlanningBureau {

	public CapacityForecast forecast(final int limit) {
		if (limit < 0 || limit > 1000) {
			throw new IllegalArgumentException("The bureau accepts mandates from 0 through 1000.");
		}
		final int joint = limit / 15;
		final int fizz = limit / 3 - joint;
		final int buzz = limit / 5 - joint;
		final int numeral = limit - fizz - buzz - joint;
		return new CapacityForecast(limit, numeral, fizz, buzz, joint);
	}
}
