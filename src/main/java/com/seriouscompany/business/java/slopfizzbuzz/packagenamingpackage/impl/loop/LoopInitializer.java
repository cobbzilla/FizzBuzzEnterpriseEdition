package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop;

import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.Constants;

/**
 * LoopInitializer
 */
@Service
public class LoopInitializer {
	
	/**
	 * @return int
	 */
	public int getLoopInitializationPoint() {
		return Constants.LOOP_INIT_VALUE;
	}

}
