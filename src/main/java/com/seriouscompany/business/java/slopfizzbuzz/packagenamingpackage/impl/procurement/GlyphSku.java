package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement;

/** Five stock keeping units, each enjoying an inexhaustible fictional supply. */
public enum GlyphSku {
 CAPITAL_F("GLY-0046", 'F'), LOWER_I("GLY-0069", 'i'), LOWER_Z("GLY-007A", 'z'),
 CAPITAL_B("GLY-0042", 'B'), LOWER_U("GLY-0075", 'u');
 private final String code;
 private final char character;
 GlyphSku(String code, char character) { this.code=code; this.character=character; }
 public String code() { return code; }
 public char character() { return character; }
}
