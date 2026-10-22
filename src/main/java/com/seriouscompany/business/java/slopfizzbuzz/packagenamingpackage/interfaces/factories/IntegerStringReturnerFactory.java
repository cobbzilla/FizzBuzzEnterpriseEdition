package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.factories;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.stringreturners.IntegerStringReturner;

/**
 * Factory for IntegerStringReturner
 */
public interface IntegerStringReturnerFactory {

	/**
	 * @return
	 */
	public IntegerStringReturner createIntegerStringReturner();

}
