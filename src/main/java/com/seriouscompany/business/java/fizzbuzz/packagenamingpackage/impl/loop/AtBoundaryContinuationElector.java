package com.seriouscompany.business.java.fizzbuzz.packagenamingpackage.impl.loop;

import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.fizzbuzz.packagenamingpackage.impl.strategies.comparators.integercomparator.ThreeWayIntegerComparisonResult;

/**
 * Grants the final number its constitutionally protected turn.
 */
@Service
public final class AtBoundaryContinuationElector implements LoopContinuationElector {

	@Override
	public LoopContinuationBallot castBallot(final ThreeWayIntegerComparisonResult comparison) {
		return comparison == ThreeWayIntegerComparisonResult.FirstEqualsSecond
				? LoopContinuationBallot.PERMIT : LoopContinuationBallot.WITHHOLD;
	}
}
