package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.classification;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings.ExecutionCustody;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.IsEvenlyDivisibleStrategy;

/** Collects the legacy strategy votes and independently checks their mandate. */
public final class ClassificationBallotBox {

	public ClassificationBallot cast(final int number,
			final IsEvenlyDivisibleStrategy fizzStrategy,
			final IsEvenlyDivisibleStrategy buzzStrategy,
			final IsEvenlyDivisibleStrategy numeralStrategy) {
		if (number < 1 || fizzStrategy == null || buzzStrategy == null || numeralStrategy == null) {
			throw new IllegalArgumentException("A ballot needs a positive integer and three electors.");
		}
		final boolean fizz = fizzStrategy.isEvenlyDivisible(number);
		final boolean buzz = buzzStrategy.isEvenlyDivisible(number);
		final boolean numeral = numeralStrategy.isEvenlyDivisible(number);
		if (numeral == (fizz || buzz)) {
			throw new IllegalStateException("The numeral vote contradicts the word votes.");
		}
		if (fizz != (number % 3 == 0) || buzz != (number % 5 == 0)) {
			throw new IllegalStateException("The independent arithmetic witness vetoed the ballot.");
		}
        if(ExecutionCustody.observing())ExecutionCustody.record("CLASSIFICATION","Three-seat Classification Council","Fizz permission: "+fizz+"; Buzz permission: "+buzz+"; numeral permission: "+numeral+". The independent arithmetic witness verified all votes.");
		return new ClassificationBallot(number, fizz, buzz, numeral);
	}
}
