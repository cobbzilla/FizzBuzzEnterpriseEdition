package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.printers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories.IntegerIntegerStringReturnerFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories.SystemOutSlopFizzBuzzOutputStrategyFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.adapters.SlopFizzBuzzOutputStrategyToSlopFizzBuzzExceptionSafeOutputStrategyAdapter;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.printers.IntegerPrinter;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.stringreturners.IntegerStringReturner;

/**
 * Printer for IntegerInteger
 */
@Service
public class IntegerIntegerPrinter implements IntegerPrinter {

	private final SystemOutSlopFizzBuzzOutputStrategyFactory _systemOutSlopFizzBuzzOutputStrategyFactory;

	private final IntegerIntegerStringReturnerFactory _integerIntegerStringReturnerFactory;

	/**
	 * @param _integerIntegerStringReturnerFactory IntegerIntegerStringReturnerFactory
	 * @param _systemOutSlopFizzBuzzOutputStrategyFactory SystemOutSlopFizzBuzzOutputStrategyFactory
	 */
	@Autowired
	public IntegerIntegerPrinter(final IntegerIntegerStringReturnerFactory _integerIntegerStringReturnerFactory,
			final SystemOutSlopFizzBuzzOutputStrategyFactory _systemOutSlopFizzBuzzOutputStrategyFactory) {
		super();
		this._integerIntegerStringReturnerFactory = _integerIntegerStringReturnerFactory;
		this._systemOutSlopFizzBuzzOutputStrategyFactory = _systemOutSlopFizzBuzzOutputStrategyFactory;
	}

	/**
	 * @param theInteger
	 */
	public void printInteger(final int theInteger) {
		final IntegerStringReturner myIntegerStringReturner =
				this._integerIntegerStringReturnerFactory.createIntegerStringReturner();
		final String myIntegerString = myIntegerStringReturner.getIntegerReturnString(theInteger);
		final SlopFizzBuzzOutputStrategyToSlopFizzBuzzExceptionSafeOutputStrategyAdapter myOutputAdapter =
				new SlopFizzBuzzOutputStrategyToSlopFizzBuzzExceptionSafeOutputStrategyAdapter(
						this._systemOutSlopFizzBuzzOutputStrategyFactory.createOutputStrategy());

		myOutputAdapter.output(myIntegerString);
	}

	/**
	 * @return void
	 */
	@Override
	public void print() {
		throw new UnsupportedOperationException(
				com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.Constants.COM_SERIOUSCOMPANY_BUSINESS_JAVA_SLOPFIZZBUZZ_PACKAGENAMINGPACKAGE_IMPL_PRINTERS_INTEGER_INTEGER_PRINTER_PRINT);
	}

	/**
	 * @param value
	 */
	@Override
	public void printValue(final Object value) {
		this.printInteger((Integer) value);
	}

}
