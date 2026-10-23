package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations;

/** Worker-thread custody of the current HTTP trace during a proclamation. */
public final class TraceCustody {

	private static final ThreadLocal<String> CURRENT = new ThreadLocal<String>();

	private TraceCustody() { }

	public static void bind(final String traceId) {
		CURRENT.set(traceId);
	}

	public static String currentTraceId() {
		final String traceId = CURRENT.get();
		return traceId == null ? "none" : traceId;
	}

	public static void clear() {
		CURRENT.remove();
	}
}
