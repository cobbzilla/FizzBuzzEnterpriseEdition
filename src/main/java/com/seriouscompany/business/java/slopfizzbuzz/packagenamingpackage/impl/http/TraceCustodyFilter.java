package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.logging.Logger;

import com.sun.net.httpserver.Filter;
import com.sun.net.httpserver.HttpExchange;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.TraceCustody;

/** A deliberately formal request receipt for every public HTTP desk. */
final class TraceCustodyFilter extends Filter {

	private static final Logger LOGGER = Logger.getLogger(TraceCustodyFilter.class.getName());
	private static final String ZERO_TRACE = "00000000000000000000000000000000";
	private static final String ZERO_SPAN = "0000000000000000";
	private final SecureRandom random = new SecureRandom();

	@Override
	public String description() {
		return "W3C traceparent admission and SlopBuzz response receipt";
	}

	@Override
	public void doFilter(final HttpExchange exchange, final Chain chain) throws IOException {
		final String incoming = exchange.getRequestHeaders().getFirst("traceparent");
		final boolean admitted = validTraceparent(incoming);
		final String traceId = admitted ? incoming.trim().substring(3, 35) : randomHex(16);
		final String parentId = admitted ? incoming.trim().substring(36, 52) : "none";
		final String spanId = randomHex(8);
		exchange.getResponseHeaders().set("X-SlopBuzz-Trace-Id", traceId);
		exchange.getResponseHeaders().set("X-SlopBuzz-Span-Id", spanId);
		final long started = System.nanoTime();
		TraceCustody.bind(traceId);
		try {
			chain.doFilter(exchange);
		} finally {
			TraceCustody.clear();
			LOGGER.info("traceId=" + traceId + " spanId=" + spanId + " parentId=" + parentId
					+ " method=" + exchange.getRequestMethod()
					+ " path=" + exchange.getRequestURI().getRawPath()
					+ " status=" + exchange.getResponseCode()
					+ " durationMicros=" + Math.max(0L, (System.nanoTime() - started) / 1000L));
		}
	}

	private String randomHex(final int byteCount) {
		final byte[] bytes = new byte[byteCount];
		String result;
		do {
			this.random.nextBytes(bytes);
			final StringBuilder hex = new StringBuilder(byteCount * 2);
			for (final byte value : bytes) {
				final int unsigned = value & 0xff;
				hex.append(Character.forDigit(unsigned >>> 4, 16));
				hex.append(Character.forDigit(unsigned & 0x0f, 16));
			}
			result = hex.toString();
		} while (ZERO_TRACE.equals(result) || ZERO_SPAN.equals(result));
		return result;
	}

	private static boolean validTraceparent(final String raw) {
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
