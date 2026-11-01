package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding;

/** Lexically scoped capture protects concurrent requests and nested rehearsals. */
public final class PersonnelEvidenceCustody {
 private static final ThreadLocal<Capture> CURRENT=new ThreadLocal<Capture>();
 private PersonnelEvidenceCustody(){}
 public static Capture capture(){Capture capture=new Capture(CURRENT.get());CURRENT.set(capture);return capture;}
 static void record(PersonnelDossier dossier){Capture capture=CURRENT.get();if(capture!=null)capture.dossier=dossier;}
 public static final class Capture implements AutoCloseable {
  private final Capture parent;
  private PersonnelDossier dossier;
  private boolean closed;
  private Capture(Capture parent){this.parent=parent;}
  public PersonnelDossier getDossier(){return dossier;}
  public void close(){if(!closed){if(CURRENT.get()!=this)throw new IllegalStateException("Personnel captures must close in order.");CURRENT.set(parent);closed=true;}}
 }
}
