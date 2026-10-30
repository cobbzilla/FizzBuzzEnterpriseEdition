package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
@Service
public final class IndependentGlyphReceivingInspector implements GlyphReceivingInspector {
 public List<GlyphAcceptanceCertificate> inspect(GlyphRequisition requisition,List<GlyphDelivery> deliveries) {
  if(requisition==null||deliveries==null||deliveries.size()!=requisition.items().size())
   throw new IllegalStateException("Receiving requires exactly one delivery per line item.");
  List<GlyphAcceptanceCertificate> certificates=new ArrayList<GlyphAcceptanceCertificate>();
  for(int i=0;i<deliveries.size();i++) {
   GlyphDelivery d=deliveries.get(i);
   if(d==null||d.requisition!=requisition||d.position!=i+1||d.sku!=requisition.items().get(i)
     ||d.character!=requisition.product().charAt(i)||d.quantity!=1)
    throw new IllegalStateException("Receiving rejected a nonconforming glyph allocation.");
   certificates.add(new GlyphAcceptanceCertificate(d));
  }
  return certificates;
 }
}
