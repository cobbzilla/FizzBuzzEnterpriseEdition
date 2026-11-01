package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent.*;
/** One counter, bypass, and expiry policy for every memory provider. */
public final class CacheAuthority implements OutputCache {
 public static final int TTL_SECONDS=86400;
 private final CacheRepository repository;private final PriorWorkRatificationDirectorate court; private long hits,misses,bypasses,errors,rejectedPrecedents;
 public CacheAuthority(CacheRepository repository){this(repository,PriorWorkRatificationDirectorate.standard());}
 public CacheAuthority(CacheRepository repository,PriorWorkRatificationDirectorate court){this.repository=repository;this.court=court;}
 public synchronized CacheLookup lookup(int limit){
  if(!repository.enabled()){bypasses++;return new CacheLookup(CacheLookup.State.BYPASS,null);}
  try {
   String value=repository.get(limit);if(value==null){misses++;return new CacheLookup(CacheLookup.State.MISS,null);}
   PrecedentDossier precedent=court.inspect(new PriorWorkDocuments.Petition(limit,limit,value),"MANDATE");
   if(!precedent.isApproved()){misses++;rejectedPrecedents++;return new CacheLookup(CacheLookup.State.MISS,null,precedent);}
   hits++;return new CacheLookup(CacheLookup.State.HIT,precedent.authorizedBody(),precedent);
  }
  catch(Exception failure){bypasses++;errors++;return new CacheLookup(CacheLookup.State.BYPASS,null);}
 }
 public synchronized void store(int limit,String body){if(repository.enabled())try{repository.put(limit,body,TTL_SECONDS);}catch(Exception failure){errors++;}}
 public synchronized String statusJson(){return "{\"schema\":\"slopbuzz-cache/v1\",\"enabled\":"+repository.enabled()+",\"hits\":"+hits+",\"misses\":"+misses+",\"bypasses\":"+bypasses+",\"errors\":"+errors+",\"rejectedPrecedents\":"+rejectedPrecedents+",\"ttlSeconds\":"+TTL_SECONDS+"}";}
}
