package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.parameters.DefaultSlopFizzBuzzUpperLimitParameter;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.SlopFizzBuzz;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.parameters.SlopFizzBuzzUpperLimitParameter;

/**
 * Main
 */
public final class Main {

	/**
	 * @param args
	 */
	public static void main(final String[] args) {
		final ApplicationContext context = new ClassPathXmlApplicationContext(Constants.SPRING_XML);
		final SlopFizzBuzz mySlopFizzBuzz = (SlopFizzBuzz) context.getBean(Constants.STANDARD_SLOP_FIZZ_BUZZ);
		final SlopFizzBuzzUpperLimitParameter slopFizzBuzzUpperLimit = new DefaultSlopFizzBuzzUpperLimitParameter();
		mySlopFizzBuzz.slopFizzBuzz(slopFizzBuzzUpperLimit.obtainUpperLimitValue());

		((ConfigurableApplicationContext) context).close();

	}

}
