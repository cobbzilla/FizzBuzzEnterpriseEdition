package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.factories;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.SlopFizzBuzzOutputStrategy;

/**
 * Factory for SlopFizzBuzzOutputStrategy
 */
public interface SlopFizzBuzzOutputStrategyFactory {

	/**
	 * @return
	 */
	public SlopFizzBuzzOutputStrategy createOutputStrategy();

}
