package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.succession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Carries an authorized succession from petition to certified result.
 */
@Service
public final class OrdinalSuccessionExecutor {

	private final UnitAdvancementAuthority authority;
	private final SuccessionCertificateAuditor auditor;

	@Autowired
	public OrdinalSuccessionExecutor(final UnitAdvancementAuthority authority,
			final SuccessionCertificateAuditor auditor) {
		this.authority = authority;
		this.auditor = auditor;
	}

	public int execute(final SuccessionPetition petition) {
		this.authority.authorize(petition);
		final int nominee = petition.getIncumbent() + petition.getRequestedAdvancement();
		final SuccessionCertificate certificate = new SuccessionCertificate(petition, nominee);
		this.auditor.certify(certificate);
		return certificate.getNominatedSuccessor();
	}
}
