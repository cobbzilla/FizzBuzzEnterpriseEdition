package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.SlopFizzBuzz;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.factories.SlopFizzBuzzSolutionStrategyFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.SlopFizzBuzzSolutionStrategy;

/**
 * Standard SlopFizzBuzz
 */
@Service
public class StandardSlopFizzBuzz implements SlopFizzBuzz {

	private final SlopFizzBuzzSolutionStrategyFactory _slopFizzBuzzSolutionStrategyFactory;

	/**
	 * @param _slopFizzBuzzSolutionStrategyFactory
	 */
	@Autowired
	public StandardSlopFizzBuzz(final SlopFizzBuzzSolutionStrategyFactory _slopFizzBuzzSolutionStrategyFactory) {
		super();
		this._slopFizzBuzzSolutionStrategyFactory = _slopFizzBuzzSolutionStrategyFactory;
	}

	/**
	 * @param nSlopFizzBuzzUpperLimit
	 */
	public void slopFizzBuzz(final int nSlopFizzBuzzUpperLimit) {
		final SlopFizzBuzzSolutionStrategy mySolutionStrategy =
				this._slopFizzBuzzSolutionStrategyFactory.createSlopFizzBuzzSolutionStrategy();
		mySolutionStrategy.runSolution(nSlopFizzBuzzUpperLimit);
	}

}
