package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class OperationalReadinessCommissionTest {

	@Test
	public void normalPullBacklogDoesNotVetoDeployment() {
		final ReadinessVerdict verdict = OperationalReadinessCommission.decide(
				true, OperationalReadinessCommission.MAX_PENDING_CERTIFICATES, 0);
		assertTrue(verdict.isReady());
		assertTrue(verdict.toText().contains("capacityVote=APPROVE\n"));
	}

	@Test
	public void corruptedChainVetoesDeployment() {
		final ReadinessVerdict verdict = OperationalReadinessCommission.decide(false, 0, 0);
		assertFalse(verdict.isReady());
		assertTrue(verdict.toText().contains("integrityVote=VETO\n"));
	}

	@Test
	public void excessBacklogVetoesDeployment() {
		final ReadinessVerdict verdict = OperationalReadinessCommission.decide(
				true, OperationalReadinessCommission.MAX_PENDING_CERTIFICATES + 1, 0);
		assertFalse(verdict.isReady());
		assertTrue(verdict.toText().contains("capacityVote=VETO\n"));
	}

	@Test
	public void deadLetterVetoesDeployment() {
		final ReadinessVerdict verdict = OperationalReadinessCommission.decide(true, 0, 1);
		assertFalse(verdict.isReady());
		assertTrue(verdict.toText().contains("deliveryVote=VETO\n"));
	}

	@Test(expected = IllegalArgumentException.class)
	public void negativeQueueCountCannotBePresentedAsEvidence() {
		OperationalReadinessCommission.decide(true, -1, 0);
	}
}
