package com.seriouscompany.business.java.fizzbuzz.packagenamingpackage.impl.strategies;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.fizzbuzz.packagenamingpackage.impl.audit.OutputTransactionCoordinator;
import com.seriouscompany.business.java.fizzbuzz.packagenamingpackage.interfaces.strategies.FizzBuzzOutputStrategy;

/**
 * Strategy for SystemOutFizzBuzzOutput
 */
@Service
public class SystemOutFizzBuzzOutputStrategy implements FizzBuzzOutputStrategy {

	private final OutputTransactionCoordinator transactions;

	@Autowired
	public SystemOutFizzBuzzOutputStrategy(final OutputTransactionCoordinator transactions) {
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
