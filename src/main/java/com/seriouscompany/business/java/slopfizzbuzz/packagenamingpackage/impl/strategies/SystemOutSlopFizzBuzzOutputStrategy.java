package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputTransactionCoordinator;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.SlopFizzBuzzOutputStrategy;

/**
 * Strategy for SystemOutSlopFizzBuzzOutput
 */
@Service
public class SystemOutSlopFizzBuzzOutputStrategy implements SlopFizzBuzzOutputStrategy {

	private final OutputTransactionCoordinator transactions;

	@Autowired
	public SystemOutSlopFizzBuzzOutputStrategy(final OutputTransactionCoordinator transactions) {
		this.transactions = transactions;
	}

	/**
	 * @param output String
	 * @throws IOException
	 * @return void
	 */
	@Override
	public void output(final String output) throws IOException {
		this.transactions.stageOrWrite(output);
	}

}
