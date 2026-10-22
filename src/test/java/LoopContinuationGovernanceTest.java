import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.AtBoundaryContinuationElector;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.InclusiveBoundaryQuorum;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.LoopCondition;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.LoopContinuationBallot;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.PreBoundaryContinuationElector;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies.comparators.integercomparator.ThreeWayIntegerComparisonResult;

/**
 * Constitutional checks for the right of a number to enter the loop.
 */
public class LoopContinuationGovernanceTest {

	private final PreBoundaryContinuationElector preBoundary = new PreBoundaryContinuationElector();
	private final AtBoundaryContinuationElector atBoundary = new AtBoundaryContinuationElector();
	private final InclusiveBoundaryQuorum quorum =
			new InclusiveBoundaryQuorum(this.preBoundary, this.atBoundary);

	@Test
	public void preBoundaryElectorVotesOnlyForLessThan() {
		assertEquals(LoopContinuationBallot.PERMIT,
				this.preBoundary.castBallot(ThreeWayIntegerComparisonResult.FirstIsLessThanSecond));
		assertEquals(LoopContinuationBallot.WITHHOLD,
				this.preBoundary.castBallot(ThreeWayIntegerComparisonResult.FirstEqualsSecond));
		assertEquals(LoopContinuationBallot.WITHHOLD,
				this.preBoundary.castBallot(ThreeWayIntegerComparisonResult.FirstIsGreaterThanSecond));
	}

	@Test
	public void atBoundaryElectorVotesOnlyForEquality() {
		assertEquals(LoopContinuationBallot.WITHHOLD,
				this.atBoundary.castBallot(ThreeWayIntegerComparisonResult.FirstIsLessThanSecond));
		assertEquals(LoopContinuationBallot.PERMIT,
				this.atBoundary.castBallot(ThreeWayIntegerComparisonResult.FirstEqualsSecond));
		assertEquals(LoopContinuationBallot.WITHHOLD,
				this.atBoundary.castBallot(ThreeWayIntegerComparisonResult.FirstIsGreaterThanSecond));
	}

	@Test
	public void quorumAdmitsNumbersBeforeTheBoundary() {
		assertTrue(this.quorum.authorizes(1, 100));
		assertTrue(this.quorum.authorizes(-7, -3));
	}

	@Test
	public void quorumAdmitsTheBoundaryItself() {
		assertTrue(this.quorum.authorizes(100, 100));
		assertTrue(this.quorum.authorizes(0, 0));
		assertTrue(this.quorum.authorizes(Integer.MAX_VALUE, Integer.MAX_VALUE));
	}

	@Test
	public void quorumRejectsNumbersAfterTheBoundary() {
		assertFalse(this.quorum.authorizes(101, 100));
		assertFalse(this.quorum.authorizes(0, -1));
		assertFalse(this.quorum.authorizes(Integer.MAX_VALUE, Integer.MIN_VALUE));
	}

	@Test
	public void loopConditionDelegatesToTheQuorum() {
		final LoopCondition condition = new LoopCondition(this.quorum);
		assertTrue(condition.evaluateLoop(14, 15));
		assertTrue(condition.evaluateLoop(15, 15));
		assertFalse(condition.evaluateLoop(16, 15));
	}
}
