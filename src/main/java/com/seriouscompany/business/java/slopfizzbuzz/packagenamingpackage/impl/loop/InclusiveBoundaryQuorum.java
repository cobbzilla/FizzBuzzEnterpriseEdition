package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings.ExecutionCustody;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.comparators.integercomparator.ThreeWayIntegerComparator;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.comparators.integercomparator.ThreeWayIntegerComparisonResult;

/**
 * Resolves a two-member vote. One affirmative ballot constitutes a quorum.
 */
@Service
public final class InclusiveBoundaryQuorum {

	private final LoopContinuationElector preBoundaryElector;
	private final LoopContinuationElector atBoundaryElector;

	@Autowired
	public InclusiveBoundaryQuorum(final PreBoundaryContinuationElector preBoundaryElector,
			final AtBoundaryContinuationElector atBoundaryElector) {
		this.preBoundaryElector = preBoundaryElector;
		this.atBoundaryElector = atBoundaryElector;
	}

	public boolean authorizes(final int currentNumber, final int finalNumber) {
		final ThreeWayIntegerComparisonResult finding =
				ThreeWayIntegerComparator.Compare(currentNumber, finalNumber);
		final LoopContinuationBallot preBoundaryBallot = this.preBoundaryElector.castBallot(finding);
		final LoopContinuationBallot atBoundaryBallot = this.atBoundaryElector.castBallot(finding);
        if(ExecutionCustody.observing())ExecutionCustody.record("CONTINUATION","Inclusive Boundary Quorum","Current ordinal "+currentNumber+"; authorized upper boundary "+finalNumber+". Pre-boundary vote: "+preBoundaryBallot+"; at-boundary vote: "+atBoundaryBallot+".");
		return preBoundaryBallot == LoopContinuationBallot.PERMIT
				|| atBoundaryBallot == LoopContinuationBallot.PERMIT;
	}
}
