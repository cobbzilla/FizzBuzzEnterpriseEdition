package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache;

/** The result of consulting the central numerical memory. */
public final class CacheLookup {

	public enum State { HIT, MISS, BYPASS }

	private final State state;
	private final String body;

	CacheLookup(final State state, final String body) {
		this.state = state;
		this.body = body;
	}

	public State getState() {
		return this.state;
	}

	public String getBody() {
		return this.body;
	}
}
