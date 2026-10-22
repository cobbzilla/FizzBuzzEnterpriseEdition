package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.printers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories.NewLineStringReturnerFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories.SystemOutSlopFizzBuzzOutputStrategyFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.adapters.SlopFizzBuzzOutputStrategyToSlopFizzBuzzExceptionSafeOutputStrategyAdapter;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.printers.StringPrinter;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.stringreturners.StringStringReturner;

/**
 * Printer for NewLineString
 */
@Service
public class NewLineStringPrinter implements StringPrinter {

	private final SystemOutSlopFizzBuzzOutputStrategyFactory _systemOutSlopFizzBuzzOutputStrategyFactory;

	private final NewLineStringReturnerFactory _newLineStringReturnerFactory;

	/**
	 * @param _newLineStringReturnerFactory NewLineStringReturnerFactory
	 * @param _systemOutSlopFizzBuzzOutputStrategyFactory SystemOutSlopFizzBuzzOutputStrategyFactory
	 */
	@Autowired
	public NewLineStringPrinter(final NewLineStringReturnerFactory _newLineStringReturnerFactory,
			final SystemOutSlopFizzBuzzOutputStrategyFactory _systemOutSlopFizzBuzzOutputStrategyFactory) {
		super();
		this._newLineStringReturnerFactory = _newLineStringReturnerFactory;
		this._systemOutSlopFizzBuzzOutputStrategyFactory = _systemOutSlopFizzBuzzOutputStrategyFactory;
	}

	/**
	 * @return void
	 */
	public void print() {
		final StringStringReturner myNewLineStringReturner = this._newLineStringReturnerFactory
			.createStringStringReturner();
		final String myNewLineString = myNewLineStringReturner.getReturnString();
		final SlopFizzBuzzOutputStrategyToSlopFizzBuzzExceptionSafeOutputStrategyAdapter myOutputAdapter =
				new SlopFizzBuzzOutputStrategyToSlopFizzBuzzExceptionSafeOutputStrategyAdapter(
						this._systemOutSlopFizzBuzzOutputStrategyFactory.createOutputStrategy());

		myOutputAdapter.output(myNewLineString);
	}

	/**
	 * @param value Object
	 */
	@Override
	public void printValue(final Object value) {
		this.print();
	}

}
