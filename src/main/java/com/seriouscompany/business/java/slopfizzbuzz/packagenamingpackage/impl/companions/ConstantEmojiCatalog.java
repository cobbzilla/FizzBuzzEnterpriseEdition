package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.companions;
@org.springframework.stereotype.Service public final class ConstantEmojiCatalog implements EmojiCatalog {
 private static final java.util.List<Companion> ENTRIES=GeneratedCompanionCatalog.entries();
 public String version(){return GeneratedCompanionCatalog.VERSION;}
 public java.util.List<Companion> entries(){return ENTRIES;}
 public Companion atTicket(int ticket){if(ticket<0||ticket>=1000000000)throw new IllegalArgumentException("Ticket outside the billion-ticket charter.");long end=0;for(Companion c:ENTRIES){end+=c.weight;if(ticket<end)return c;}throw new IllegalStateException("Incomplete companion inventory.");}
}
