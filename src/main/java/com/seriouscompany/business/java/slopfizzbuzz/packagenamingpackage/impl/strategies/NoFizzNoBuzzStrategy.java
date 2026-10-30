package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies;

import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.IsEvenlyDivisibleStrategy;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.constants.NoFizzNoBuzzStrategyConstants;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.math.arithmetics.NumberIsMultipleOfAnotherNumberVerifier;

/**
 * Strategy for NoFizzNoBuzz
 */
@Service
public class NoFizzNoBuzzStrategy implements IsEvenlyDivisibleStrategy {
    private final NumberIsMultipleOfAnotherNumberVerifier verifier;
    public NoFizzNoBuzzStrategy(){this(new NumberIsMultipleOfAnotherNumberVerifier());}
    @org.springframework.beans.factory.annotation.Autowired
    public NoFizzNoBuzzStrategy(NumberIsMultipleOfAnotherNumberVerifier verifier){this.verifier=verifier;}


	/**
	 * @param theInteger int
	 * @return boolean
	 */
	public boolean isEvenlyDivisible(final int theInteger) {
		if (!this.verifier.verify(theInteger,
				NoFizzNoBuzzStrategyConstants.NO_FIZZ_INTEGER_CONSTANT_VALUE)) {
			if (!this.verifier.verify(theInteger,
					NoFizzNoBuzzStrategyConstants.NO_BUZZ_INTEGER_CONSTANT_VALUE)) {
				return true;
			} else {
				return false;
			}
		} else if (!this.verifier.verify(theInteger,
				NoFizzNoBuzzStrategyConstants.NO_BUZZ_INTEGER_CONSTANT_VALUE)) {
			if (!this.verifier.verify(theInteger,
					NoFizzNoBuzzStrategyConstants.NO_FIZZ_INTEGER_CONSTANT_VALUE)) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}
