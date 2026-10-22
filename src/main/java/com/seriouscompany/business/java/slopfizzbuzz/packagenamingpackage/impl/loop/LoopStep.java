package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.Constants;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.succession.OrdinalSuccessionExecutor;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.succession.SuccessionPetition;

/**
 * LoopStep
 */
@Service
public class LoopStep {

	private final OrdinalSuccessionExecutor successionExecutor;

	@Autowired
	public LoopStep(final OrdinalSuccessionExecutor successionExecutor) {
		this.successionExecutor = successionExecutor;
	}

	/**
	 * @param nCurrentNumber int
	 * @return int
	 */
	public int stepLoop(final int nCurrentNumber) {
		final SuccessionPetition petition = new SuccessionPetition(nCurrentNumber, Constants.LOOP_INC_VALUE);
		return this.successionExecutor.execute(petition);
	}

}
