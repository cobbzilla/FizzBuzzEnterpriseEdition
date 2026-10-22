package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.parameters;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.Constants;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.parameters.SlopFizzBuzzUpperLimitParameter;

/**
 * Parameter for DefaultSlopFizzBuzzUpperLimit
 */
public final class DefaultSlopFizzBuzzUpperLimitParameter implements SlopFizzBuzzUpperLimitParameter {

	private final int slopFizzBuzzUpperLimitParameterValue;

	/**
	 *
	 */
	public DefaultSlopFizzBuzzUpperLimitParameter() {
		super();
		this.slopFizzBuzzUpperLimitParameterValue = Constants.DEFAULT_SLOP_FIZZ_BUZZ_UPPER_LIMIT_PARAMETER_VALUE;
	}

	/**
	 * @param slopFizzBuzzUpperLimitParameterValue int
	 */
	public DefaultSlopFizzBuzzUpperLimitParameter(final int slopFizzBuzzUpperLimitParameterValue) {
		super();
		this.slopFizzBuzzUpperLimitParameterValue = slopFizzBuzzUpperLimitParameterValue;
	}

	/**
	 * @return int
	 */
	public int obtainUpperLimitValue() {
		return this.slopFizzBuzzUpperLimitParameterValue;
	}
}
