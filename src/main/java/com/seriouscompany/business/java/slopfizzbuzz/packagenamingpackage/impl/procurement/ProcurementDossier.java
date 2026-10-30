package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement;

/** Immutable inspection demonstration; no audit transaction is committed. */
public final class ProcurementDossier {
 private final GlyphRequisition requisition;
 private final String text;
 ProcurementDossier(GlyphRequisition requisition,String text) { this.requisition=requisition;this.text=text; }
 public String text() { return text; }
 public String toJson() {
  StringBuilder out=new StringBuilder("{\"schema\":\"slopbuzz-glyph-procurement/v1\",\"demonstration\":true,\"auditTransactions\":0,\"product\":\"");
  out.append(requisition.product()).append("\",\"text\":\"").append(text).append("\",\"assembly\":\"CERTIFIED\",\"lineItems\":[");
  for(int i=0;i<requisition.items().size();i++) {
   GlyphSku sku=requisition.items().get(i);
   if(i>0) out.append(',');
   out.append("{\"position\":").append(i+1).append(",\"sku\":\"").append(sku.code())
    .append("\",\"character\":\"").append(sku.character()).append("\",\"quantity\":1,\"inspection\":\"ACCEPTED\"}");
  }
  return out.append("]}").toString();
 }
}
