package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.companions;
/** Immutable fictional character; no business audit data is stored here. */
public final class Companion {
 public final String kind;public final java.util.List<String> components;
 public final String id,emoji,name,category,rarity,personality,backstory,energy,goal;public final int weight;
 public Companion(String id,String emoji,String name,String category,String rarity,String personality,String backstory,String energy,String goal,int weight,String kind,String[] components){this.kind=kind;this.components=java.util.Collections.unmodifiableList(new java.util.ArrayList<String>(java.util.Arrays.asList(components)));this.id=id;this.emoji=emoji;this.name=name;this.category=category;this.rarity=rarity;this.personality=personality;this.backstory=backstory;this.energy=energy;this.goal=goal;this.weight=weight;}
 static String q(String s){return com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings.ExecutionEvent.quote(s);}
 public String toJson(){StringBuilder parts=new StringBuilder("[");for(String part:components){if(parts.length()>1)parts.append(',');parts.append(q(part));}parts.append(']');return "{\"id\":"+q(id)+",\"kind\":"+q(kind)+",\"components\":"+parts+",\"emoji\":"+q(emoji)+",\"name\":"+q(name)+",\"category\":"+q(category)+",\"rarity\":"+q(rarity)+",\"personality\":"+q(personality)+",\"backstory\":"+q(backstory)+",\"energy\":"+q(energy)+",\"goal\":"+q(goal)+",\"weight\":"+weight+"}";}
}
