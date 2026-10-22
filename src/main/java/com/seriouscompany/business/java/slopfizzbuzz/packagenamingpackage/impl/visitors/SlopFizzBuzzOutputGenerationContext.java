package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.visitors;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.printers.DataPrinter;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.IsEvenlyDivisibleStrategy;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.visitors.OutputGenerationContext;

/**
 * Context for SlopFizzBuzzOutputGeneration
 */
public final class SlopFizzBuzzOutputGenerationContext implements OutputGenerationContext {

	private final DataPrinter printer;
	private final IsEvenlyDivisibleStrategy strategy;

	/**
	 * @param strategy IsEvenlyDivisibleStrategy
	 * @param printer DataPrinter
	 */
	public SlopFizzBuzzOutputGenerationContext(final IsEvenlyDivisibleStrategy strategy,
			final DataPrinter printer) {
		super();
		this.strategy = strategy;
		this.printer = printer;
	}

	/**
	 * @return
	 */
	@Override
	public DataPrinter getPrinter() {
		return this.printer;
	}

	/**
	 * @return
	 */
	@Override
	public IsEvenlyDivisibleStrategy getStrategy() {
		return this.strategy;
	}

}
