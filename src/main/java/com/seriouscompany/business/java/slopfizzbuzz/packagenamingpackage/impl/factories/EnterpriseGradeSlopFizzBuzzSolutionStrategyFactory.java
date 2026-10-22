package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.factories.SlopFizzBuzzSolutionStrategyFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.SlopFizzBuzzSolutionStrategy;

/**
 * Factory for EnterpriseGradeSlopFizzBuzzSolutionStrategy
 */
@Service
public class EnterpriseGradeSlopFizzBuzzSolutionStrategyFactory implements SlopFizzBuzzSolutionStrategyFactory {

	private final SlopFizzBuzzSolutionStrategy _slopFizzBuzzSolutionStrategy;

	/**
	 * @param _slopFizzBuzzSolutionStrategy SlopFizzBuzzSolutionStrategy
	 */
	@Autowired
	public EnterpriseGradeSlopFizzBuzzSolutionStrategyFactory(final SlopFizzBuzzSolutionStrategy _slopFizzBuzzSolutionStrategy) {
		super();
		this._slopFizzBuzzSolutionStrategy = _slopFizzBuzzSolutionStrategy;
	}

	/**
	 * @return SlopFizzBuzzSolutionStrategy
	 */
	@Override
	public SlopFizzBuzzSolutionStrategy createSlopFizzBuzzSolutionStrategy() {
		return this._slopFizzBuzzSolutionStrategy;
	}

}
