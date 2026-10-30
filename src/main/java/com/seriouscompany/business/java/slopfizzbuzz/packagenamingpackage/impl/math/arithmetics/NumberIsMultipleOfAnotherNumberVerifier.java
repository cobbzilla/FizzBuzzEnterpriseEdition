package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.math.arithmetics;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.comparators.integercomparator.IntegerForEqualityComparator;

/**
 * NumberIsMultipleOfAnotherNumberVerifier
 */
@Service
public class NumberIsMultipleOfAnotherNumberVerifier {

	private static final IntegerDivider DEFAULT_DIVIDER = new IntegerDivider(
        new com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.comparators.doublecomparator.FirstIsLargerThanSecondDoubleComparator(),
        new com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.comparators.doublecomparator.FirstIsSmallerThanSecondDoubleComparator());

    private final IntegerDivider integerDivider;
    public NumberIsMultipleOfAnotherNumberVerifier(){this(DEFAULT_DIVIDER);}
    @Autowired public NumberIsMultipleOfAnotherNumberVerifier(IntegerDivider divider){this.integerDivider=divider;}
    public static boolean numberIsMultipleOfAnotherNumber(int first,int second){return new NumberIsMultipleOfAnotherNumberVerifier().verify(first,second);}

	/**
	 * @param nFirstNumber
	 * @param nSecondNumber
	 * @return
	 */
	public boolean verify(final int nFirstNumber, final int nSecondNumber) {
		try {
			final int nDivideFirstIntegerBySecondIntegerResult =
					(this.integerDivider.divide(nFirstNumber, nSecondNumber));
			final int nMultiplyDivisionResultBySecondIntegerResult =
					nDivideFirstIntegerBySecondIntegerResult * nSecondNumber;
			if (IntegerForEqualityComparator.areTwoIntegersEqual(nMultiplyDivisionResultBySecondIntegerResult,
					nFirstNumber)) {
				return true;
			} else {
				return false;
			}
		} catch (final ArithmeticException ae) {
			return false;
		}
	}

}
