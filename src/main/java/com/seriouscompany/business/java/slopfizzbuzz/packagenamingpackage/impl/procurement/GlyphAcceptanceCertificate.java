package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement;

/** Issued only by receiving; cannot be reassigned to another order or position. */
public final class GlyphAcceptanceCertificate {
 final GlyphDelivery delivery;
 GlyphAcceptanceCertificate(GlyphDelivery delivery) { this.delivery=delivery; }
 void authorize(GlyphRequisition requisition,int position) {
  if(delivery.requisition!=requisition||delivery.position!=position)
   throw new IllegalStateException("This certificate lacks jurisdiction over the requested line item.");
 }
}
