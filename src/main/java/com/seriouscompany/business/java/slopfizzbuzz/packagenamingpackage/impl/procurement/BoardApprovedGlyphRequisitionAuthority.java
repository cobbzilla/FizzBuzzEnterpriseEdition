package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public final class BoardApprovedGlyphRequisitionAuthority implements GlyphRequisitionAuthority {
 private final GlyphCatalog catalog;
 @Autowired public BoardApprovedGlyphRequisitionAuthority(GlyphCatalog catalog) { this.catalog=catalog; }
 public GlyphRequisition authorize(String product) {
  if (!("Fizz".equals(product)||"Buzz".equals(product)||"FizzBuzz".equals(product)))
   throw new IllegalArgumentException("Only Fizz, Buzz and FizzBuzz have purchasing mandates.");
  List<GlyphSku> items=new ArrayList<GlyphSku>();
  for (char character : product.toCharArray()) items.add(catalog.lookup(character));
  return new GlyphRequisition(product,items);
 }
}
