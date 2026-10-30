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
    private final com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories.LoopComponentFactory loopComponents;

	/**
	 * @param _loopPayloadExecution LoopPayloadExecution
	 */
	public EnterpriseGradeSlopFizzBuzzSolutionStrategy(final LoopPayloadExecution payload){this(payload,LoopContext.standardComponents());}
    @Autowired
    public EnterpriseGradeSlopFizzBuzzSolutionStrategy(final LoopPayloadExecution _loopPayloadExecution, final com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories.LoopComponentFactory components) {
		super();
		this._loopPayloadExecution = _loopPayloadExecution;
        this.loopComponents=components;
	}

	/**
	 * @param nSlopFizzBuzzUpperLimit int
	 * @return void
	 */
	@Override
	public void runSolution(final int nSlopFizzBuzzUpperLimit) {
		final LoopContext loopContext = new LoopContext(nSlopFizzBuzzUpperLimit,this.loopComponents);
		final LoopRunner loopRunner = new LoopRunner(loopContext, loopContext, this._loopPayloadExecution);
		loopRunner.runLoop();
	}

}
