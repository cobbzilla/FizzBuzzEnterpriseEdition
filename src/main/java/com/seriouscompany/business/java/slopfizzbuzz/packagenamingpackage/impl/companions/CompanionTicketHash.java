package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.companions;
/** Fixed 64-bit mixing; identical signed overflow semantics on JVM and TeaVM. Not a lottery or security primitive. */
final class CompanionTicketHash {
 static int ticket(String text){long h=0xcbf29ce484222325L;for(int i=0;i<text.length();i++){h^=text.charAt(i);h*=0x100000001b3L;}h^=h>>>33;h*=0xff51afd7ed558ccdL;h^=h>>>33;h*=0xc4ceb9fe1a85ec53L;h^=h>>>33;return (int)((h&Long.MAX_VALUE)%1000000000L);}
}
