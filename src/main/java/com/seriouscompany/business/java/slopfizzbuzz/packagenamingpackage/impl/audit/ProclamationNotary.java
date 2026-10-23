package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit;

/** Independently notarizes the exact text about to leave the output chamber. */
public final class ProclamationNotary {

	public NotarialSeal certify(final int number, final String payload) {
		if (number < 1 || payload == null) {
			throw new IllegalArgumentException("A proclamation requires a positive number and complete text.");
		}
		final StringBuilder authorized = new StringBuilder();
		if (number % 3 == 0) {
			authorized.append("Fizz");
		}
		if (number % 5 == 0) {
			authorized.append("Buzz");
		}
		if (authorized.length() == 0) {
			authorized.append(number);
		}
		authorized.append(System.getProperty("line.separator"));
		if (!authorized.toString().equals(payload)) {
			throw new IllegalStateException("The proclamation for " + number + " failed lexical notarization.");
		}
		return new NotarialSeal(number, payload);
	}
}
