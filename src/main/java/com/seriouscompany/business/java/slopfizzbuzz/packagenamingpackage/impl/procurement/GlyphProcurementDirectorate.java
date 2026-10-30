package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement;

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
  return assembler.assemble(requisition,inspector.inspect(requisition,supplier.deliver(requisition)));
 }
 /** Explicit wiring for environments without reflection; the same contracts govern Spring. */
 public static GlyphProcurementDirectorate standard() {
  return new GlyphProcurementDirectorate(new BoardApprovedGlyphRequisitionAuthority(new ApprovedGlyphCatalog()),
   new InexhaustibleApprovedGlyphSupplier(),new IndependentGlyphReceivingInspector(),new CertifiedGlyphAssembler());
 }
}
