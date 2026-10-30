package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime;
/** Deterministic tribunal clock; advances only by explicit instruction. */
public final class FixedRuntimeClock implements RuntimeClock {private long millis=1700000000000L; public long nanoTime(){return millis*1000000L;} public long currentTimeMillis(){return millis;} public void advance(long delta){millis+=delta;} }
