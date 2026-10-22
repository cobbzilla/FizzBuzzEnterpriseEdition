package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.visitors;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.printers.DataPrinter;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.IsEvenlyDivisibleStrategy;

/**
 * Context for OutputGeneration
 */
public interface OutputGenerationContext {

	/**
	 * @return
	 */
	public IsEvenlyDivisibleStrategy getStrategy();

	/**
	 * @return
	 */
	public DataPrinter getPrinter();

}
