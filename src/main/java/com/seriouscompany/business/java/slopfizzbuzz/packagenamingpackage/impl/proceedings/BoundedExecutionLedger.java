package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings;
import java.util.*;
/** Finite request-local memory: a large mandate cannot create an endless observer. */
public final class BoundedExecutionLedger implements ExecutionWorkObserver {
 private final int capacity;private final List<ExecutionEvent> events=new ArrayList<ExecutionEvent>();private int omitted;
 private final Map<String,Map<String,Long>> work=new LinkedHashMap<String,Map<String,Long>>();private boolean workComplete=true;
 public BoundedExecutionLedger(){this(50000);}public BoundedExecutionLedger(int capacity){if(capacity<0)throw new IllegalArgumentException("Negative observation capacity");this.capacity=capacity;}
 public void observe(ExecutionEvent event){if(events.size()<capacity)events.add(event);else omitted++;}
 public void work(String ordinal,String rule,long quantity){
  if(quantity<=0)return;String key=ordinal==null?"global":ordinal;
  Map<String,Long> counts=work.get(key);if(counts==null){if(work.size()>=1002){workComplete=false;return;}counts=new LinkedHashMap<String,Long>();work.put(key,counts);}
  if(counts.size()>=128&&!counts.containsKey(rule)){workComplete=false;return;}
  Long before=counts.get(rule);counts.put(rule,(before==null?0:before.longValue())+quantity);
 }
 public String workJson(){StringBuilder out=new StringBuilder("{\"schema\":\"slopbuzz-work/v1\",\"complete\":").append(workComplete).append(",\"ordinals\":{");boolean first=true;for(Map.Entry<String,Map<String,Long>> group:work.entrySet()){if(!first)out.append(',');first=false;out.append(ExecutionEvent.quote(group.getKey())).append(":{");boolean firstRule=true;for(Map.Entry<String,Long> entry:group.getValue().entrySet()){if(!firstRule)out.append(',');firstRule=false;out.append(ExecutionEvent.quote(entry.getKey())).append(':').append(ExecutionEvent.quote(String.valueOf(entry.getValue())));}out.append('}');}return out.append("}}").toString();}
 public List<ExecutionEvent> snapshot(){return Collections.unmodifiableList(new ArrayList<ExecutionEvent>(events));}public int omitted(){return omitted;}
 public String toJson(){StringBuilder out=new StringBuilder("{\"events\":[");for(int i=0;i<events.size();i++){if(i>0)out.append(',');out.append(events.get(i).toJson());}return out.append("],\"omitted\":").append(omitted).append(",\"work\":").append(workJson()).append('}').toString();}
}
