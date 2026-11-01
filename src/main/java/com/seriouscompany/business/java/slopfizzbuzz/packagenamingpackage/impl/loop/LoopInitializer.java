package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop;

import org.springframework.stereotype.Service;

/**
 * LoopInitializer
 */
@Service
public class LoopInitializer {
	private final com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.FirstOrdinalOnboardingDirectorate onboarding;
	public LoopInitializer(){this(com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.FirstOrdinalOnboardingDirectorate.standard());}
	@org.springframework.beans.factory.annotation.Autowired
	public LoopInitializer(com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.FirstOrdinalOnboardingDirectorate onboarding){this.onboarding=onboarding;}
	
	/**
	 * @return int
	 */
	public int getLoopInitializationPoint() {
		return this.onboarding.onboard();
	}

}
