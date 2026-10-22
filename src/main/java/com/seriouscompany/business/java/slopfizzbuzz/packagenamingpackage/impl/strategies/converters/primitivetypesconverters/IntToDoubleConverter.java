package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.converters.primitivetypesconverters;

import org.springframework.stereotype.Service;

/**
 * Converter for IntToDouble
 */
@Service
public final class IntToDoubleConverter {

	private IntToDoubleConverter() {}

	/**
	 * @param nIntegerToConvert int
	 * @return double
	 */
	public static double Convert(final int nIntegerToConvert) {
		final double dbConversionResult = (double) nIntegerToConvert;
		return dbConversionResult;
	}

}
