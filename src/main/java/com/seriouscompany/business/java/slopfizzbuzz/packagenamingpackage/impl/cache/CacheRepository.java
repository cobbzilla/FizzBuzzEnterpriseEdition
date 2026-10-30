package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache;
public interface CacheRepository {boolean enabled(); String get(int limit) throws Exception; void put(int limit,String body,int ttlSeconds) throws Exception;}
