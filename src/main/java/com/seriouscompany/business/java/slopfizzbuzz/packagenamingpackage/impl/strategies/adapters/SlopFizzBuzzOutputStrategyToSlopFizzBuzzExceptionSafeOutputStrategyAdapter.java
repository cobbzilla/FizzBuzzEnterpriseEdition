package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.adapters;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.SlopFizzBuzzOutputStrategy;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.SlopFizzBuzzExceptionSafeOutputStrategy;

/**
 * Adapter for SlopFizzBuzzOutputStrategyToSlopFizzBuzzExceptionSafeOutputStrategy
 */
public final class SlopFizzBuzzOutputStrategyToSlopFizzBuzzExceptionSafeOutputStrategyAdapter implements SlopFizzBuzzExceptionSafeOutputStrategy {

	private  final SlopFizzBuzzOutputStrategy _slopFizzBuzzOutputStrategy;

	/**
	 * @param slopFizzBuzzOutputStrategy SlopFizzBuzzOutputStrategy
	 */
	public SlopFizzBuzzOutputStrategyToSlopFizzBuzzExceptionSafeOutputStrategyAdapter(final SlopFizzBuzzOutputStrategy slopFizzBuzzOutputStrategy) {
		this._slopFizzBuzzOutputStrategy = slopFizzBuzzOutputStrategy;
	}

	/**
	 * @param outputStringToOutput String
	 * @return void
	 */
	@Override
	public void output(final String outputStringToOutput) {
		try {
			this._slopFizzBuzzOutputStrategy.output(outputStringToOutput);
		} catch (final Exception exceptionFromDoingOutput) {
			// We're the enterprise...we don't get exceptions!
		} catch (final Throwable throwableFromDoingOutput) {
			// We're the enterprise...we don't get throwables either!
		}
	}
}
