package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.companions;
public final class FactorProfile {
 public final String factors,cofactor;public final boolean complete;public final int divisions;
 public FactorProfile(String factors,String cofactor,boolean complete,int divisions){this.factors=factors;this.cofactor=cofactor;this.complete=complete;this.divisions=divisions;}
 public String signature(){return factors+"|"+cofactor+"|"+complete;}
 public String toJson(){return "{\"factors\":"+Companion.q(factors)+",\"cofactor\":"+Companion.q(cofactor)+",\"complete\":"+complete+",\"divisions\":"+divisions+",\"divisionBudget\":128,\"trialPrimeCeiling\":97}";}
}
