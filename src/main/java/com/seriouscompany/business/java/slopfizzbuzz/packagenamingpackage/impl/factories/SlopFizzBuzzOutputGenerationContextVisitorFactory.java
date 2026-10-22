package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.factories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.visitors.SlopFizzBuzzOutputGenerationContextVisitor;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.factories.OutputGenerationContextVisitorFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.visitors.OutputGenerationContextVisitor;

/**
 * Factory for SlopFizzBuzzOutputGenerationContextVisitor
 */
@Service
public class SlopFizzBuzzOutputGenerationContextVisitorFactory implements
		OutputGenerationContextVisitorFactory {

	private final SlopFizzBuzzOutputGenerationContextVisitor _slopFizzBuzzOutputGenerationContextVisitor;

	/**
	 * @param _slopFizzBuzzOutputGenerationContextVisitor SlopFizzBuzzOutputGenerationContextVisitor
	 */
	@Autowired
	public SlopFizzBuzzOutputGenerationContextVisitorFactory(
			final SlopFizzBuzzOutputGenerationContextVisitor _slopFizzBuzzOutputGenerationContextVisitor) {
		super();
		this._slopFizzBuzzOutputGenerationContextVisitor = _slopFizzBuzzOutputGenerationContextVisitor;
	}

	/**
	 * @return OutputGenerationContextVisitor
	 */
	@Override
	public OutputGenerationContextVisitor createVisitor() {
		return this._slopFizzBuzzOutputGenerationContextVisitor;
	}

}
