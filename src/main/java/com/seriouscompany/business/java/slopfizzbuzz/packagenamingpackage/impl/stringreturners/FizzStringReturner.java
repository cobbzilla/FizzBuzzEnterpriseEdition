package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.stringreturners;

import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.stringreturners.StringStringReturner;

/**
 * Returner for FizzString
 */
@Service
public class FizzStringReturner implements StringStringReturner {

	/**
	 * @return String
	 */
	public String getReturnString() {
		final StringBuilder myStringBuilder = new StringBuilder(
				com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.Constants.FIZZ);
		final String myString = myStringBuilder.toString();
		final char[] myCharacters = myString.toCharArray();
		return new String(myCharacters, 0, myCharacters.length);
	}

}
