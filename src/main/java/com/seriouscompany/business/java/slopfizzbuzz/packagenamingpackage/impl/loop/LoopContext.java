package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop;


import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories.LoopComponentFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.loop.LoopContextStateManipulation;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.loop.LoopContextStateRetrieval;

/**
 * LoopContext
 */
public final class LoopContext implements LoopContextStateManipulation, LoopContextStateRetrieval {

	private final LoopInitializer myLoopInitializer;
	private final LoopFinalizer myLoopFinalizer;
	private final LoopCondition myLoopCondition;
	private final LoopStep myLoopStep;
	private int myCurrentControlParameterValue;

	/**
	 * @param nLoopControlParameterFinalValue int
	 */
	public LoopContext(final int nLoopControlParameterFinalValue) {
        this(nLoopControlParameterFinalValue, standardComponents());
    }
    public static LoopComponentFactory standardComponents(){return new LoopComponentFactory(
                new LoopCondition(new InclusiveBoundaryQuorum(new PreBoundaryContinuationElector(), new AtBoundaryContinuationElector())),
                new LoopInitializer(), new LoopStep(new com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.succession.OrdinalSuccessionExecutor(
                    new com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.succession.UnitAdvancementAuthority(),
                    new com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.succession.SuccessionCertificateAuditor())));}
    public LoopContext(final int nLoopControlParameterFinalValue,final LoopComponentFactory myLoopComponentFactory) {
		this.myLoopInitializer = myLoopComponentFactory.createLoopInitializer();
		this.myLoopFinalizer = myLoopComponentFactory.createLoopFinalizer(nLoopControlParameterFinalValue);
		this.myLoopCondition = myLoopComponentFactory.createLoopCondition();
		this.myLoopStep = myLoopComponentFactory.createLoopStep();
	}

	/**
	 * @return void
	 */
	@Override
	public void start() {
		this.myCurrentControlParameterValue =
				this.myLoopInitializer.getLoopInitializationPoint();
        if(this.myCurrentControlParameterValue!=1)throw new IllegalStateException("The initial ordinal must have commencement clearance for exactly 1.");
	}

	/**
	 * @return boolean
	 */
	@Override
	public boolean shouldProceed() {
		return this.myLoopCondition.evaluateLoop(this.myCurrentControlParameterValue,
				this.myLoopFinalizer.getLoopFinalizationPoint());
	}

	/**
	 * @return void
	 */
	@Override
	public void proceed() {
		this.myCurrentControlParameterValue =
				this.myLoopStep.stepLoop(this.myCurrentControlParameterValue);
	}

	/**
	 * @return int
	 */
	@Override
	public int getControlParameter() {
		return this.myCurrentControlParameterValue;
	}

}
