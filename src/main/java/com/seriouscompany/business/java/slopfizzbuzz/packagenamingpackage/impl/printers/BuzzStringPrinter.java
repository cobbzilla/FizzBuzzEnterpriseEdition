package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.printers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories.BuzzStringReturnerFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories.SystemOutSlopFizzBuzzOutputStrategyFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.adapters.SlopFizzBuzzOutputStrategyToSlopFizzBuzzExceptionSafeOutputStrategyAdapter;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.printers.StringPrinter;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.stringreturners.StringStringReturner;

/**
 * Printer for BuzzString
 */
@Service
public class BuzzStringPrinter implements StringPrinter {

	private final SystemOutSlopFizzBuzzOutputStrategyFactory _outputStrategyFactory;

	private final BuzzStringReturnerFactory _buzzStringReturnerFactory;

	/**
	 * @param _buzzStringReturnerFactory
	 * @param _outputStrategyFactory
	 */
	@Autowired
	public BuzzStringPrinter(final BuzzStringReturnerFactory _buzzStringReturnerFactory,
			final SystemOutSlopFizzBuzzOutputStrategyFactory _outputStrategyFactory) {
		super();
		this._buzzStringReturnerFactory = _buzzStringReturnerFactory;
		this._outputStrategyFactory = _outputStrategyFactory;
	}

	/**
	 * @return void
	 */
	public void print() {
		final StringStringReturner myBuzzStringReturner = this._buzzStringReturnerFactory
			.createStringStringReturner();
		final SlopFizzBuzzOutputStrategyToSlopFizzBuzzExceptionSafeOutputStrategyAdapter myOutputAdapter =
				new SlopFizzBuzzOutputStrategyToSlopFizzBuzzExceptionSafeOutputStrategyAdapter(
						this._outputStrategyFactory.createOutputStrategy());

		myOutputAdapter.output(myBuzzStringReturner.getReturnString());
	}

	/**
	 * @param value
	 * @return
	 */
	@Override
	public void printValue(final Object value) {
		this.print();
	}

}
