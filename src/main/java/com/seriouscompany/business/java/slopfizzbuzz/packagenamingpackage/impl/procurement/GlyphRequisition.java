package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
/** Identity belongs to this object, never to a reusable product name. */
public final class GlyphRequisition {
 private final String product;
 private final List<GlyphSku> items;
 public GlyphRequisition(String product, List<GlyphSku> items) {
  if (!("Fizz".equals(product)||"Buzz".equals(product)||"FizzBuzz".equals(product)))
   throw new IllegalArgumentException("Only Fizz, Buzz and FizzBuzz have purchasing mandates.");
  if (items==null||items.size()!=product.length()) throw new IllegalArgumentException("Every position needs one line item.");
  for (int i=0;i<items.size();i++) if(items.get(i)==null||items.get(i).character()!=product.charAt(i))
   throw new IllegalArgumentException("The catalog substitution does not satisfy the mandate.");
  this.product=product;
  this.items=Collections.unmodifiableList(new ArrayList<GlyphSku>(items));
 }
 public String product() { return product; }
 public List<GlyphSku> items() { return items; }
}
