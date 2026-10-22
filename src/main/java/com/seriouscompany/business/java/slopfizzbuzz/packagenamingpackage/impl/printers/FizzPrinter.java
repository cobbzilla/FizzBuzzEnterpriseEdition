package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.printers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories.SystemOutSlopFizzBuzzOutputStrategyFactory;

/**
 * Printer for Fizz
 */
@Service
public class FizzPrinter {

	private final SystemOutSlopFizzBuzzOutputStrategyFactory _systemOutSlopFizzBuzzOutputStrategyFactory;

	/**
	 * @param _systemOutSlopFizzBuzzOutputStrategyFactory
	 */
	@Autowired
	public FizzPrinter(final SystemOutSlopFizzBuzzOutputStrategyFactory _systemOutSlopFizzBuzzOutputStrategyFactory) {
		super();
		this._systemOutSlopFizzBuzzOutputStrategyFactory = _systemOutSlopFizzBuzzOutputStrategyFactory;
	}

}
