package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.factories;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.printers.IntegerPrinter;

/**
 * Factory for IntegerPrinter
 */
public interface IntegerPrinterFactory {

	/**
	 * @return
	 */
	public IntegerPrinter createPrinter();

}
