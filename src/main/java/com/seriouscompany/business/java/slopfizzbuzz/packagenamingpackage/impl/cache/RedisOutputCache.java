package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.logging.Logger;

/** A bounded, expiring shared memory for deterministic FizzBuzz responses. */
public final class RedisOutputCache {

	private static final Logger LOGGER = Logger.getLogger(RedisOutputCache.class.getName());
	private static final int TTL_SECONDS = 86400;
	private final RedisProtocol protocol;
	private long hits;
	private long misses;
	private long bypasses;
	private long errors;

	public RedisOutputCache(final String host, final int port) {
		this.protocol = host == null || host.trim().isEmpty()
				? null : new RedisProtocol(host, port);
	}

	public static RedisOutputCache configured() {
		final String host = System.getenv("SLOPBUZZ_REDIS_HOST");
		if (host == null || host.trim().isEmpty()) {
			return new RedisOutputCache(null, 6379);
		}
		final String portText = System.getenv("SLOPBUZZ_REDIS_PORT");
		final int port = portText == null ? 6379 : Integer.parseInt(portText);
		return new RedisOutputCache(host, port);
	}

	public CacheLookup lookup(final int limit) {
		if (this.protocol == null) {
			countBypass(false);
			return new CacheLookup(CacheLookup.State.BYPASS, null);
		}
		try {
			final byte[] value = this.protocol.command(ascii("GET"), ascii(key(limit)));
			if (value == null) {
				countMiss();
				return new CacheLookup(CacheLookup.State.MISS, null);
			}
			countHit();
			return new CacheLookup(CacheLookup.State.HIT,
					new String(value, StandardCharsets.UTF_8));
		} catch (final IOException failure) {
			LOGGER.warning("The Redis memory bureau is unavailable: " + failure.getMessage());
			countBypass(true);
			return new CacheLookup(CacheLookup.State.BYPASS, null);
		}
	}

	public void store(final int limit, final String body) {
		if (this.protocol == null) {
			return;
		}
		try {
			final byte[] reply = this.protocol.command(ascii("SET"), ascii(key(limit)),
					body.getBytes(StandardCharsets.UTF_8), ascii("EX"), ascii(TTL_SECONDS));
			if (reply == null || !"OK".equals(new String(reply, StandardCharsets.US_ASCII))) {
				throw new IOException("Redis did not approve a cache write.");
			}
		} catch (final IOException failure) {
			LOGGER.warning("The Redis memory bureau could not retain a result: "
					+ failure.getMessage());
			synchronized (this) {
				this.errors++;
			}
		}
	}

	public synchronized String statusJson() {
		return "{\"schema\":\"slopbuzz-cache/v1\",\"enabled\":"
				+ (this.protocol != null) + ",\"hits\":" + this.hits
				+ ",\"misses\":" + this.misses
				+ ",\"bypasses\":" + this.bypasses
				+ ",\"errors\":" + this.errors
				+ ",\"ttlSeconds\":" + TTL_SECONDS + "}";
	}

	private synchronized void countHit() { this.hits++; }
	private synchronized void countMiss() { this.misses++; }
	private synchronized void countBypass(final boolean error) {
		this.bypasses++;
		if (error) { this.errors++; }
	}

	private static String key(final int limit) {
		return "slopbuzz:fizzbuzz:v1:limit:" + limit;
	}

	private static byte[] ascii(final String value) {
		return value.getBytes(StandardCharsets.US_ASCII);
	}

	private static byte[] ascii(final int value) {
		return ascii(Integer.toString(value));
	}
}
