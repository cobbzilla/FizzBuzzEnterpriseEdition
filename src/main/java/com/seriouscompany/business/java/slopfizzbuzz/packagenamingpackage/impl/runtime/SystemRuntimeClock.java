package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime;
public final class SystemRuntimeClock implements RuntimeClock { public long nanoTime(){return System.nanoTime();} public long currentTimeMillis(){return System.currentTimeMillis();} }
