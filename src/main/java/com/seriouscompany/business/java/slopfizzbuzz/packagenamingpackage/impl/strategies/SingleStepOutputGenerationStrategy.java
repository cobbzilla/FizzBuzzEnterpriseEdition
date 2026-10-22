package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.strategies;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputTransactionCoordinator;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.visitors.SlopFizzBuzzOutputGenerationContext;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.printers.StringPrinter;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.OutputGenerationStrategy;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.SingleStepOutputGenerationParameter;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.visitors.OutputGenerationContext;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.visitors.OutputGenerationContextVisitor;

/**
 * Strategy for SingleStepOutputGeneration
 */
@Service
public class SingleStepOutputGenerationStrategy implements OutputGenerationStrategy {

	private final List<OutputGenerationContext> contexts;
	private final OutputGenerationContextVisitor contextVisitor;
	private final StringPrinter myNewLinePrinter;
	private final OutputTransactionCoordinator transactions;

	/**
	 * @param slopFizzBuzzOutputGenerationContextVisitorFactory SlopFizzBuzzOutputGenerationContextVisitorFactory
	 * @param fizzStrategyFactory FizzStrategyFactory
	 * @param fizzStringPrinterFactory FizzStringPrinterFactory
	 * @param buzzStrategyFactory BuzzStrategyFactory
	 * @param buzzStringPrinterFactory BuzzStringPrinterFactory
	 * @param noFizzNoBuzzStrategyFactory NoFizzNoBuzzStrategyFactory
	 * @param integerIntegerPrinterFactory IntegerIntegerPrinterFactory
	 * @param newLineStringPrinterFactory NewLineStringPrinterFactory
	 */
	@Autowired
	public SingleStepOutputGenerationStrategy(
			final SlopFizzBuzzOutputGenerationContextVisitorFactory slopFizzBuzzOutputGenerationContextVisitorFactory,
			final FizzStrategyFactory fizzStrategyFactory,
			final FizzStringPrinterFactory fizzStringPrinterFactory,
			final BuzzStrategyFactory buzzStrategyFactory,
			final BuzzStringPrinterFactory buzzStringPrinterFactory,
			final NoFizzNoBuzzStrategyFactory noFizzNoBuzzStrategyFactory,
			final IntegerIntegerPrinterFactory integerIntegerPrinterFactory,
			final NewLineStringPrinterFactory newLineStringPrinterFactory,
			final OutputTransactionCoordinator transactions) {
		super();
		this.transactions = transactions;
		this.contextVisitor = slopFizzBuzzOutputGenerationContextVisitorFactory.createVisitor();
		this.contexts = new ArrayList<OutputGenerationContext>();
		this.contexts.add(new SlopFizzBuzzOutputGenerationContext(fizzStrategyFactory.createIsEvenlyDivisibleStrategy(),
				fizzStringPrinterFactory.createStringPrinter()));
		this.contexts.add(new SlopFizzBuzzOutputGenerationContext(buzzStrategyFactory.createIsEvenlyDivisibleStrategy(),
				buzzStringPrinterFactory.createStringPrinter()));
		this.contexts.add(new SlopFizzBuzzOutputGenerationContext(
				noFizzNoBuzzStrategyFactory.createIsEvenlyDivisibleStrategy(),
				integerIntegerPrinterFactory.createPrinter()));

		this.myNewLinePrinter = newLineStringPrinterFactory.createStringPrinter();
	}

	/**
	 * @param generationParameter SingleStepOutputGenerationParameter
	 * @return void
	 */
	public void performGenerationForCurrentStep(final SingleStepOutputGenerationParameter generationParameter) {
		final int nGenerationParameter = generationParameter.retrieveIntegerValue();
		this.transactions.begin(nGenerationParameter);
		try {
			final Iterator<OutputGenerationContext> iterator = this.contexts.iterator();
			while (iterator.hasNext()) {
				final OutputGenerationContext context = iterator.next();
				this.contextVisitor.visit(context, nGenerationParameter);
			}
			this.myNewLinePrinter.print();
			this.transactions.commit();
		} catch (final RuntimeException failure) {
			this.transactions.abort();
			throw failure;
		}
	}

}
