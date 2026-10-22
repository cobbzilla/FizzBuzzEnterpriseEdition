package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop;

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
		return preBoundaryBallot == LoopContinuationBallot.PERMIT
				|| atBoundaryBallot == LoopContinuationBallot.PERMIT;
	}
}
