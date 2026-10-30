package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement;

import java.util.List;
import org.springframework.stereotype.Service;
@Service
public final class CertifiedGlyphAssembler implements GlyphAssembler {
 public ProcurementDossier assemble(GlyphRequisition requisition,List<GlyphAcceptanceCertificate> certificates) {
  if(requisition==null||certificates==null||certificates.size()!=requisition.items().size())
   throw new IllegalStateException("Assembly requires a complete set of receiving certificates.");
  StringBuilder text=new StringBuilder();
  for(int i=0;i<certificates.size();i++) {
   GlyphAcceptanceCertificate certificate=certificates.get(i);
   if(certificate==null) throw new IllegalStateException("An empty certificate cannot authorize a letter.");
   certificate.authorize(requisition,i+1);
   text.append(certificate.delivery.character);
  }
  return new ProcurementDossier(requisition,text.toString());
 }
}
