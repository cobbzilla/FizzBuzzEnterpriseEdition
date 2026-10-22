package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.printers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories.SystemOutSlopFizzBuzzOutputStrategyFactory;

/**
 * Printer for New Line
 */
@Service
public class NewLinePrinter {

	private final SystemOutSlopFizzBuzzOutputStrategyFactory _systemOutSlopFizzBuzzOutputStrategyFactory;

	/**
	 * @param _systemOutSlopFizzBuzzOutputStrategyFactory
	 */
	@Autowired
	public NewLinePrinter(final SystemOutSlopFizzBuzzOutputStrategyFactory _systemOutSlopFizzBuzzOutputStrategyFactory) {
		super();
		this._systemOutSlopFizzBuzzOutputStrategyFactory = _systemOutSlopFizzBuzzOutputStrategyFactory;
	}

}
