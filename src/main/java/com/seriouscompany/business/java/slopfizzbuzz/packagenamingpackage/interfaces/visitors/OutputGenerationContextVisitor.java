package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.visitors;

/**
 * Visitor for OutputGenerationContext
 */
public interface OutputGenerationContextVisitor {

	/**
	 * @param context
	 * @param nGenerationParameter
	 */
	public void visit(OutputGenerationContext context, int nGenerationParameter);

}
