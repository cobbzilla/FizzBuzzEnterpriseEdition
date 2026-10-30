package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies;

import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.IsEvenlyDivisibleStrategy;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.constants.BuzzStrategyConstants;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.math.arithmetics.NumberIsMultipleOfAnotherNumberVerifier;

/**
 * Strategy for Buzz
 */
@Service
public class BuzzStrategy implements IsEvenlyDivisibleStrategy {
    private final NumberIsMultipleOfAnotherNumberVerifier verifier;
    public BuzzStrategy(){this(new NumberIsMultipleOfAnotherNumberVerifier());}
    @org.springframework.beans.factory.annotation.Autowired
    public BuzzStrategy(NumberIsMultipleOfAnotherNumberVerifier verifier){this.verifier=verifier;}


	/**
	 * @param theInteger int
	 * @return boolean
	 */
	public boolean isEvenlyDivisible(final int theInteger) {
		if (this.verifier.verify(theInteger,
				BuzzStrategyConstants.BUZZ_INTEGER_CONSTANT_VALUE)) {
			return true;
		} else {
			return false;
		}
	}

}
