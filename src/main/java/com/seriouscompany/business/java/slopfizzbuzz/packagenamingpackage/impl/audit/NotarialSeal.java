package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit;

/** A single-number, single-payload authorization for publication. */
public final class NotarialSeal {

	private final int number;
	private final String payload;

	NotarialSeal(final int number, final String payload) {
		this.number = number;
		this.payload = payload;
	}

	public void authorize(final int number, final String payload) {
		if (this.number != number || !this.payload.equals(payload)) {
			throw new IllegalStateException("A notarial seal cannot be transferred to another proclamation.");
		}
	}
}
