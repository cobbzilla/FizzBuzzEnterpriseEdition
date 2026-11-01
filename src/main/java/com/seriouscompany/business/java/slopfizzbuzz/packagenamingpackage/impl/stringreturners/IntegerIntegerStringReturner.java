package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.stringreturners;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings.ExecutionCustody;

import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.stringreturners.IntegerStringReturner;

/**
 * Returner for IntegerIntegerString
 */
@Service
public class IntegerIntegerStringReturner implements IntegerStringReturner {

	/**
	 * @param theInteger ing
	 * @return String
	 */
	public String getIntegerReturnString(final int theInteger) {
		final Integer myIntegerToBeConvertedToString = new Integer(theInteger);
		final StringBuilder myStringBuilder = new StringBuilder(myIntegerToBeConvertedToString.toString());
		final String myResultingStringFromIntegerToStringConversion = myStringBuilder.toString();
        if(ExecutionCustody.observing())ExecutionCustody.record("NUMERAL","Integer-to-String Conversion Directorate","The ordinal was boxed as Integer, converted to decimal, copied through StringBuilder and returned as a fresh String: "+myResultingStringFromIntegerToStringConversion+".");
		return new String(myResultingStringFromIntegerToStringConversion);
	}

}
