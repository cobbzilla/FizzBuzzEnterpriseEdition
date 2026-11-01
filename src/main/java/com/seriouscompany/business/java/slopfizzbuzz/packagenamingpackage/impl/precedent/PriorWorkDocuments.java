package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent;

/** Immutable, invocation-bound papers. Identical wording does not transfer custody. */
public final class PriorWorkDocuments {
 private PriorWorkDocuments() {}
 public static final class Petition {
  public final int requestedLimit, repositoryLimit; public final String body;
  public Petition(int requestedLimit,int repositoryLimit,String body){this.requestedLimit=requestedLimit;this.repositoryLimit=repositoryLimit;this.body=body;}
  public String caseId(){return "PWR-"+requestedLimit;}
 }
 public static final class Admission {
  public final Petition petition;
  public Admission(Petition petition){this.petition=petition;}
 }
 public static final class Jurisdiction {
  public final Admission admission;
  public Jurisdiction(Admission admission){this.admission=admission;}
 }
 public static final class Inventory {
  public final Jurisdiction jurisdiction; public final int lines;
  public Inventory(Jurisdiction jurisdiction,int lines){this.jurisdiction=jurisdiction;this.lines=lines;}
 }
 public static final class Inspection {
  public final Inventory inventory;
  public Inspection(Inventory inventory){this.inventory=inventory;}
 }
 public static final class License {
  public final Inspection inspection;
  public License(Inspection inspection){this.inspection=inspection;}
 }
}
