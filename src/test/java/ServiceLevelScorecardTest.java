import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.ProclamationOutcome;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.ScorecardSnapshot;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.ServiceLevelScorecard;

public class ServiceLevelScorecardTest {

	@Test
	public void committeeAccountsForEveryOutcomeAndDuration() {
		final ServiceLevelScorecard scorecard = new ServiceLevelScorecard();
		scorecard.record(ProclamationOutcome.SUCCESSFUL, 12);
		scorecard.record(ProclamationOutcome.REJECTED, 2);
		scorecard.record(ProclamationOutcome.FAILED, 30);
		final ScorecardSnapshot snapshot = scorecard.snapshot();
		assertEquals(1, snapshot.getSuccessful());
		assertEquals(1, snapshot.getRejected());
		assertEquals(1, snapshot.getFailed());
		assertEquals(3, snapshot.getTotal());
		assertEquals(44, snapshot.getTotalDurationMicros());
		assertEquals(30, snapshot.getMaximumDurationMicros());
		assertTrue(snapshot.toJson().contains("\"scope\":\"current-process\""));
	}

	@Test
	public void earlierSnapshotCannotBeRewrittenByLaterMinutes() {
		final ServiceLevelScorecard scorecard = new ServiceLevelScorecard();
		final ScorecardSnapshot earlier = scorecard.snapshot();
		scorecard.record(ProclamationOutcome.SUCCESSFUL, 1);
		assertEquals(0, earlier.getTotal());
		assertEquals(1, scorecard.snapshot().getTotal());
	}

	@Test(expected = IllegalArgumentException.class)
	public void negativeDurationIsNotAcceptedAsAnEfficiencyGain() {
		new ServiceLevelScorecard().record(ProclamationOutcome.SUCCESSFUL, -1);
	}
}
