package com.seriouscompany.business.java.fizzbuzz.packagenamingpackage.impl.loop;

import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.fizzbuzz.packagenamingpackage.impl.strategies.comparators.integercomparator.ThreeWayIntegerComparisonResult;

/**
 * Represents numbers that have not yet reached the appointed boundary.
 */
@Service
public final class PreBoundaryContinuationElector implements LoopContinuationElector {

	@Override
	public LoopContinuationBallot castBallot(final ThreeWayIntegerComparisonResult comparison) {
		return comparison == ThreeWayIntegerComparisonResult.FirstIsLessThanSecond
				? LoopContinuationBallot.PERMIT : LoopContinuationBallot.WITHHOLD;
	}
}
