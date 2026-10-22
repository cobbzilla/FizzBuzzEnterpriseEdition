package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.printers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories.FizzStringReturnerFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories.SystemOutSlopFizzBuzzOutputStrategyFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.adapters.SlopFizzBuzzOutputStrategyToSlopFizzBuzzExceptionSafeOutputStrategyAdapter;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.printers.StringPrinter;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.stringreturners.StringStringReturner;

/**
 * Printer for FizzString
 */
@Service
public class FizzStringPrinter implements StringPrinter {

	private final SystemOutSlopFizzBuzzOutputStrategyFactory _systemOutSlopFizzBuzzOutputStrategyFactory;

	private final FizzStringReturnerFactory _fizzStringReturnerFactory;

	/**
	 * @param _fizzStringReturnerFactory FizzStringReturnerFactory
	 * @param _systemOutSlopFizzBuzzOutputStrategyFactory SystemOutSlopFizzBuzzOutputStrategyFactory
	 */
	@Autowired
	public FizzStringPrinter(final FizzStringReturnerFactory _fizzStringReturnerFactory,
			final SystemOutSlopFizzBuzzOutputStrategyFactory _systemOutSlopFizzBuzzOutputStrategyFactory) {
		super();
		this._fizzStringReturnerFactory = _fizzStringReturnerFactory;
		this._systemOutSlopFizzBuzzOutputStrategyFactory = _systemOutSlopFizzBuzzOutputStrategyFactory;
	}

	/**
	 * @return void
	 */
	public void print() {
		final StringStringReturner myFizzStringReturner = this._fizzStringReturnerFactory
			.createStringStringReturner();
		final SlopFizzBuzzOutputStrategyToSlopFizzBuzzExceptionSafeOutputStrategyAdapter myOutputAdapter =
				new SlopFizzBuzzOutputStrategyToSlopFizzBuzzExceptionSafeOutputStrategyAdapter(
						this._systemOutSlopFizzBuzzOutputStrategyFactory.createOutputStrategy());

		myOutputAdapter.output(myFizzStringReturner.getReturnString());
	}

	/**
	 * @param value
	 */
	@Override
	public void printValue(final Object value) {
		this.print();
	}

}
