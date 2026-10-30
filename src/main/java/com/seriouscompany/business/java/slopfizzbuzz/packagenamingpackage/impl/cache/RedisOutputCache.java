package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.logging.Logger;

/** A bounded, expiring shared memory for deterministic FizzBuzz responses. */
public final class RedisOutputCache implements OutputCache {

 private final CacheAuthority authority;
 public RedisOutputCache(final String host, final int port){
  final RedisProtocol protocol=host==null||host.trim().isEmpty()?null:new RedisProtocol(host,port);
  authority=new CacheAuthority(new CacheRepository(){
   public boolean enabled(){return protocol!=null;}
   public String get(int limit)throws IOException {byte[] result=protocol.command(ascii("GET"),ascii(key(limit)));return result==null?null:new String(result,StandardCharsets.UTF_8);}
   public void put(int limit,String body,int ttl)throws IOException {byte[] result=protocol.command(ascii("SET"),ascii(key(limit)),body.getBytes(StandardCharsets.UTF_8),ascii("EX"),ascii(ttl));if(result==null||!"OK".equals(new String(result,StandardCharsets.US_ASCII)))throw new IOException("Redis rejected cache write");}
  });
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

 public CacheLookup lookup(int limit){return authority.lookup(limit);}
 public void store(int limit,String body){authority.store(limit,body);}
 public String statusJson(){return authority.statusJson();}
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
