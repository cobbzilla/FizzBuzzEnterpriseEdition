package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.succession;

import org.springframework.stereotype.Service;

/**
 * Independently checks the arithmetic asserted by a succession certificate.
 */
@Service
public final class SuccessionCertificateAuditor {

	public void certify(final SuccessionCertificate certificate) {
		final SuccessionPetition petition = certificate.getPetition();
		final long auditedSuccessor = (long) petition.getIncumbent()
				+ (long) petition.getRequestedAdvancement();
		if (auditedSuccessor != certificate.getNominatedSuccessor()) {
			throw new IllegalStateException("The nominated successor failed arithmetic audit.");
		}
	}
}
