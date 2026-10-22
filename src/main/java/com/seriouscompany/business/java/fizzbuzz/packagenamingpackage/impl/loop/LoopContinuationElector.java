package com.seriouscompany.business.java.fizzbuzz.packagenamingpackage.impl.loop;

import com.seriouscompany.business.java.fizzbuzz.packagenamingpackage.impl.strategies.comparators.integercomparator.ThreeWayIntegerComparisonResult;

/**
 * An institution entitled to vote on one aspect of loop continuation.
 */
public interface LoopContinuationElector {

	LoopContinuationBallot castBallot(ThreeWayIntegerComparisonResult comparison);
}
