package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement;

import org.springframework.stereotype.Service;
@Service
public final class ApprovedGlyphCatalog implements GlyphCatalog {
 public GlyphSku lookup(char character) {
  for (GlyphSku sku : GlyphSku.values()) if (sku.character()==character) return sku;
  throw new IllegalArgumentException("The character has no approved vendor of record.");
 }
}
