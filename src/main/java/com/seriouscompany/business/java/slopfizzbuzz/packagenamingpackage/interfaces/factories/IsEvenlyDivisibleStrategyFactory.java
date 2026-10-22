package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.factories;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.IsEvenlyDivisibleStrategy;

/**
 * Factory for IsEvenlyDivisibleStrategy
 */
public interface IsEvenlyDivisibleStrategyFactory {

	/**
	 * @return
	 */
	public IsEvenlyDivisibleStrategy createIsEvenlyDivisibleStrategy();

}
