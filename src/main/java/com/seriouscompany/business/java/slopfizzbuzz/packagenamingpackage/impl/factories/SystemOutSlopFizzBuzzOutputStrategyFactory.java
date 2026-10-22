package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.SystemOutSlopFizzBuzzOutputStrategy;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.factories.SlopFizzBuzzOutputStrategyFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.SlopFizzBuzzOutputStrategy;

/**
 * Factory for SystemOutSlopFizzBuzzOutputStrategy
 */
@Service
public class SystemOutSlopFizzBuzzOutputStrategyFactory implements
		SlopFizzBuzzOutputStrategyFactory {

	private final SystemOutSlopFizzBuzzOutputStrategy _systemOutSlopFizzBuzzOutputStrategy;

	/**
	 * @param _systemOutSlopFizzBuzzOutputStrategy SystemOutSlopFizzBuzzOutputStrategy
	 */
	@Autowired
	public SystemOutSlopFizzBuzzOutputStrategyFactory(final SystemOutSlopFizzBuzzOutputStrategy _systemOutSlopFizzBuzzOutputStrategy) {
		super();
		this._systemOutSlopFizzBuzzOutputStrategy = _systemOutSlopFizzBuzzOutputStrategy;
	}

	/**
	 * @return SlopFizzBuzzOutputStrategy
	 */
	@Override
	public SlopFizzBuzzOutputStrategy createOutputStrategy() {
		return this._systemOutSlopFizzBuzzOutputStrategy;
	}
}
