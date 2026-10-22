package com.seriouscompany.business.java.fizzbuzz.packagenamingpackage.impl.loop.succession;

/**
 * Evidence that a candidate successor was nominated for an incumbent.
 */
public final class SuccessionCertificate {

	private final SuccessionPetition petition;
	private final int nominatedSuccessor;

	public SuccessionCertificate(final SuccessionPetition petition, final int nominatedSuccessor) {
		this.petition = petition;
		this.nominatedSuccessor = nominatedSuccessor;
	}

	public SuccessionPetition getPetition() {
		return this.petition;
	}

	public int getNominatedSuccessor() {
		return this.nominatedSuccessor;
	}
}
