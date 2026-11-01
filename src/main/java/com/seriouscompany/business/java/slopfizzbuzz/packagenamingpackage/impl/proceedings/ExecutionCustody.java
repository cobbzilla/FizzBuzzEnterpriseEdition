package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings;
/** Lexically scoped observation with a no-allocation default and nested custody. */
public final class ExecutionCustody {
 private static final ThreadLocal<Capture> CURRENT=new ThreadLocal<Capture>();private ExecutionCustody(){}
 public static boolean observing(){return CURRENT.get()!=null;}
 public static Capture capture(ExecutionObserver observer){if(observer==null)throw new IllegalArgumentException("Missing observer");Capture next=new Capture(CURRENT.get(),observer);CURRENT.set(next);return next;}
 public static void ordinal(String ordinal){Capture c=CURRENT.get();if(c!=null)c.ordinal=ordinal;}
 public static void record(String kind,String office,String finding){record(kind,office,finding,null);}
 public static void record(String kind,String office,String finding,String document){Capture c=CURRENT.get();if(c!=null)try{c.observer.observe(new ExecutionEvent(c.ordinal,kind,office,finding,document));}catch(RuntimeException ignored){/* An unavailable spectator cannot change the numerical mandate. */}}
 public static final class Capture implements AutoCloseable {
  private final Capture parent;private final ExecutionObserver observer;private String ordinal;private boolean closed;
  private Capture(Capture parent,ExecutionObserver observer){this.parent=parent;this.observer=observer;}
  public void close(){if(!closed){if(CURRENT.get()!=this)throw new IllegalStateException("Execution captures must close in order");CURRENT.set(parent);closed=true;}}
 }
}
