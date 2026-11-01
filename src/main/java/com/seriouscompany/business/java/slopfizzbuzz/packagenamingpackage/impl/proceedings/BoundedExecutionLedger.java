package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings;
import java.util.*;
/** Finite request-local memory: a large mandate cannot create an endless observer. */
public final class BoundedExecutionLedger implements ExecutionObserver {
 private final int capacity;private final List<ExecutionEvent> events=new ArrayList<ExecutionEvent>();private int omitted;
 public BoundedExecutionLedger(){this(50000);}public BoundedExecutionLedger(int capacity){if(capacity<0)throw new IllegalArgumentException("Negative observation capacity");this.capacity=capacity;}
 public void observe(ExecutionEvent event){if(events.size()<capacity)events.add(event);else omitted++;}
 public List<ExecutionEvent> snapshot(){return Collections.unmodifiableList(new ArrayList<ExecutionEvent>(events));}public int omitted(){return omitted;}
 public String toJson(){StringBuilder out=new StringBuilder("{\"events\":[");for(int i=0;i<events.size();i++){if(i>0)out.append(',');out.append(events.get(i).toJson());}return out.append("],\"omitted\":").append(omitted).append('}').toString();}
}
