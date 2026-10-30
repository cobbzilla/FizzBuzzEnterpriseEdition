package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http;
public final class TraceAdmission {
private static final String ZERO_TRACE="00000000000000000000000000000000", ZERO_SPAN="0000000000000000";
	public static boolean validTraceparent(final String raw) {
		if (raw == null) return false;
		final String value = raw.trim();
		if (value.length() < 55 || value.charAt(2) != '-' || value.charAt(35) != '-'
				|| value.charAt(52) != '-' || !lowerHex(value, 0, 2)
				|| "ff".equals(value.substring(0, 2))
				|| !lowerHex(value, 3, 35) || !lowerHex(value, 36, 52)
				|| !lowerHex(value, 53, 55)
				|| ZERO_TRACE.equals(value.substring(3, 35))
				|| ZERO_SPAN.equals(value.substring(36, 52))) {
			return false;
		}
		return "00".equals(value.substring(0, 2))
				? value.length() == 55 : value.length() == 55 || value.charAt(55) == '-';
	}

	private static boolean lowerHex(final String value, final int start, final int end) {
		for (int index = start; index < end; index++) {
			final char character = value.charAt(index);
			if (!((character >= '0' && character <= '9')
					|| (character >= 'a' && character <= 'f'))) return false;
		}
		return true;
	}
}
