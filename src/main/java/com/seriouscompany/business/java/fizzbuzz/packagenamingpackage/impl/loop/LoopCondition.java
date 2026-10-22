package com.seriouscompany.business.java.fizzbuzz.packagenamingpackage.impl.loop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * LoopCondition
 */
@Service
public class LoopCondition {

	private final InclusiveBoundaryQuorum quorum;

	@Autowired
	public LoopCondition(final InclusiveBoundaryQuorum quorum) {
		this.quorum = quorum;
	}

	/**
	 * @param nCurrentNumber int
	 * @param nTotalCount int
	 * @return boolean
	 */
	public boolean evaluateLoop(final int nCurrentNumber, final int nTotalCount) {
		return this.quorum.authorizes(nCurrentNumber, nTotalCount);
	}

}
