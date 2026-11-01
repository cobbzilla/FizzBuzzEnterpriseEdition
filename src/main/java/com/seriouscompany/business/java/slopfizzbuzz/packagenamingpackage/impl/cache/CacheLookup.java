package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache;

/** The result of consulting the central numerical memory. */
public final class CacheLookup {

	public enum State { HIT, MISS, BYPASS }

	private final State state;
	private final String body;
	private final com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent.PrecedentDossier precedent;

	public CacheLookup(final State state, final String body) {
		this(state,body,null);
	}
	public CacheLookup(final State state,final String body,final com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent.PrecedentDossier precedent) {
		this.state = state;
		this.body = body;
		this.precedent=precedent;
	}
	public com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent.PrecedentDossier getPrecedent(){return precedent;}

	public State getState() {
		return this.state;
	}

	public String getBody() {
		return this.body;
	}
}
