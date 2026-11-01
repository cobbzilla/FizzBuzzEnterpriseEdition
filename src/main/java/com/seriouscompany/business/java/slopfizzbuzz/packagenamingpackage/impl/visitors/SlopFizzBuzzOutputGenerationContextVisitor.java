package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.visitors;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings.ExecutionCustody;

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
        final boolean authorized=strategy.isEvenlyDivisible(nGenerationParameter);
        if(ExecutionCustody.observing())ExecutionCustody.record("VISITOR","Output Generation Context Visitor","The certified strategy "+(authorized?"authorized":"declined")+" printer "+context.getPrinter().getClass().getSimpleName()+" for this ordinal.");
		if (authorized) {
			final DataPrinter printer = context.getPrinter();
			printer.printValue(new Integer(nGenerationParameter));
		}
	}

}
