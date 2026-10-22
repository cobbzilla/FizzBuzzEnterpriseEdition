package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.printers.IntegerIntegerPrinter;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.factories.IntegerPrinterFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.printers.IntegerPrinter;

/**
 * Factory for IntegerIntegerPrinterFactory
 */
@Service
public class IntegerIntegerPrinterFactory implements IntegerPrinterFactory {

	private final IntegerIntegerPrinter _integerIntegerPrinter;

	/**
	 * @param _integerIntegerPrinter IntegerIntegerPrinter
	 */
	@Autowired
	public IntegerIntegerPrinterFactory(final IntegerIntegerPrinter _integerIntegerPrinter) {
		super();
		this._integerIntegerPrinter = _integerIntegerPrinter;
	}

	/**
	 * @return IntegerPrinter
	 */
	@Override
	public IntegerPrinter createPrinter() {
		return this._integerIntegerPrinter;
	}

}
