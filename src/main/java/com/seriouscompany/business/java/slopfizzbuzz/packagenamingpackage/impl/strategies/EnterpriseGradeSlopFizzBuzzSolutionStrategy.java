package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.LoopContext;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.LoopRunner;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.loop.LoopPayloadExecution;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.SlopFizzBuzzSolutionStrategy;

/**
 * Strategy for EnterpriseGradeSlopFizzBuzzSolution
 */
@Service
public class EnterpriseGradeSlopFizzBuzzSolutionStrategy implements SlopFizzBuzzSolutionStrategy {

	private final LoopPayloadExecution _loopPayloadExecution;

	/**
	 * @param _loopPayloadExecution LoopPayloadExecution
	 */
	@Autowired
	public EnterpriseGradeSlopFizzBuzzSolutionStrategy(final LoopPayloadExecution _loopPayloadExecution) {
		super();
		this._loopPayloadExecution = _loopPayloadExecution;
	}

	/**
	 * @param nSlopFizzBuzzUpperLimit int
	 * @return void
	 */
	@Override
	public void runSolution(final int nSlopFizzBuzzUpperLimit) {
		final LoopContext loopContext = new LoopContext(nSlopFizzBuzzUpperLimit);
		final LoopRunner loopRunner = new LoopRunner(loopContext, loopContext, this._loopPayloadExecution);
		loopRunner.runLoop();
	}

}
