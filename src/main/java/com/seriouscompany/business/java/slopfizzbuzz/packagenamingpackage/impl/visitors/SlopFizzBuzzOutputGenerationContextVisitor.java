package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.visitors;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.printers.DataPrinter;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.IsEvenlyDivisibleStrategy;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.visitors.OutputGenerationContext;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.visitors.OutputGenerationContextVisitor;

/**
 * Visitor for SlopFizzBuzzOutputGenerationContext
 */
@Service
public class SlopFizzBuzzOutputGenerationContextVisitor implements
		OutputGenerationContextVisitor {

	/**
	 * @param context OutputGenerationContext
	 * @param nGenerationParameter int
	 */
	@Override
	public void visit(final OutputGenerationContext context, final int nGenerationParameter) {
		final IsEvenlyDivisibleStrategy strategy = context.getStrategy();
		if (strategy.isEvenlyDivisible(nGenerationParameter)) {
			final DataPrinter printer = context.getPrinter();
			printer.printValue(new Integer(nGenerationParameter));
		}
	}

}
