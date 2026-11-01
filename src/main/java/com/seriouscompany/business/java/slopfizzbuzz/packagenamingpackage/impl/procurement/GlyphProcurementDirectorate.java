package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings.ExecutionCustody;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public final class GlyphProcurementDirectorate {
 private final GlyphRequisitionAuthority authority;
 private final GlyphSupplier supplier;
 private final GlyphReceivingInspector inspector;
 private final GlyphAssembler assembler;
 @Autowired public GlyphProcurementDirectorate(GlyphRequisitionAuthority authority,GlyphSupplier supplier,GlyphReceivingInspector inspector,GlyphAssembler assembler) {
  this.authority=authority;this.supplier=supplier;this.inspector=inspector;this.assembler=assembler;
 }
 public ProcurementDossier procure(String product) {
  GlyphRequisition requisition=authority.authorize(product);
  if(ExecutionCustody.observing())ExecutionCustody.record("REQUISITION","Glyph Procurement Authority","Authorized product "+product+" with "+requisition.items().size()+" position-specific allocations.");
  java.util.List<GlyphDelivery> deliveries=supplier.deliver(requisition);
  if(ExecutionCustody.observing())ExecutionCustody.record("DELIVERY","Approved Glyph Supplier","Delivered "+(deliveries==null?"no":String.valueOf(deliveries.size()))+" allocations for "+product+". Inventory is fictional and inexhaustible.");
  return assembler.assemble(requisition,inspector.inspect(requisition,deliveries));
 }
 /** Explicit wiring for environments without reflection; the same contracts govern Spring. */
 public static GlyphProcurementDirectorate standard() {
  return new GlyphProcurementDirectorate(new BoardApprovedGlyphRequisitionAuthority(new ApprovedGlyphCatalog()),
   new InexhaustibleApprovedGlyphSupplier(),new IndependentGlyphReceivingInspector(),new CertifiedGlyphAssembler());
 }
}
