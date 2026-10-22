package com.seriouscompany.business.java.fizzbuzz.packagenamingpackage.impl.loop.succession;

import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.fizzbuzz.packagenamingpackage.impl.Constants;

/**
 * Refuses irregular increments and successions beyond the integer jurisdiction.
 */
@Service
public final class UnitAdvancementAuthority {

	public void authorize(final SuccessionPetition petition) {
		if (petition.getRequestedAdvancement() != Constants.LOOP_INC_VALUE) {
			throw new IllegalArgumentException("Only one number may succeed an incumbent at a time.");
		}
		if (petition.getIncumbent() == Integer.MAX_VALUE) {
			throw new ArithmeticException("The integer jurisdiction has no successor for its maximum.");
		}
	}
}
