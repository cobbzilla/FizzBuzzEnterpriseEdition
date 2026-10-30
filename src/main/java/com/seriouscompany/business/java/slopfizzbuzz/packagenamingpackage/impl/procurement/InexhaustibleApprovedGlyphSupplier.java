package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
@Service
public final class InexhaustibleApprovedGlyphSupplier implements GlyphSupplier {
 public List<GlyphDelivery> deliver(GlyphRequisition requisition) {
  if(requisition==null) throw new IllegalArgumentException("No letters without a requisition.");
  List<GlyphDelivery> deliveries=new ArrayList<GlyphDelivery>();
  for(int i=0;i<requisition.items().size();i++) {
   GlyphSku sku=requisition.items().get(i);
   deliveries.add(new GlyphDelivery(requisition,i+1,sku,sku.character(),1));
  }
  return deliveries;
 }
}
