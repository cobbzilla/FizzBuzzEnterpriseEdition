package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.succession;

/**
 * A formal request to recognize an integer's immediate successor.
 */
public final class SuccessionPetition {

	private final int incumbent;
	private final int requestedAdvancement;

	public SuccessionPetition(final int incumbent, final int requestedAdvancement) {
		this.incumbent = incumbent;
		this.requestedAdvancement = requestedAdvancement;
	}

	public int getIncumbent() {
		return this.incumbent;
	}

	public int getRequestedAdvancement() {
		return this.requestedAdvancement;
	}
}
