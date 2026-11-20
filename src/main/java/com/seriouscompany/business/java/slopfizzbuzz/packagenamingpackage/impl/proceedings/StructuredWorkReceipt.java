package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings;
/** Semantic event adapter. No prices and no parsing of human narrative. */
final class StructuredWorkReceipt {
 private StructuredWorkReceipt(){}
 private static void one(String rule){ExecutionCustody.work(rule,1);}
 static void record(String kind,String ordinal){
  switch(kind){
   case "REQUEST":one("runtime");one("ownership");break;
   case "COMPLETE":one("complete");break;
   case "CACHE_HIT":one("priorReuse");one("cacheLookup");one("cacheDisposition");break;
   case "CACHE_MISS":case "CACHE_BYPASS":case "CACHE_UNAVAILABLE":one("cacheLookup");one("cacheDisposition");break;
   case "PRECEDENT_APPROVED":one("priorExam");break;
   case "PRECEDENT_REJECTED":one("priorExam");one("rejection");break;
   case "EXTENDED_WINDOW":one("window");one("cacheDisposition");break;
   case "ASSEMBLY":ExecutionCustody.work("context",3);one("visitor");break;
   case "CONTINUATION":ExecutionCustody.work("ballot",2);one("continuation");break;
   case "CLASSIFICATION":ExecutionCustody.work("classification",3);one("witness");break;
   case "EXTENDED_CLASSIFICATION":ExecutionCustody.work("classification",2);break;
   case "VISITOR":one("printer");break;
   case "PREMISES_CERTIFICATE":one("vacancyCertificate");break;
   case "PREMISES_RELEASE":one("release");break;
   case "TRANSACTION_BEGIN":one("transaction");break;
   case "REQUISITION":one("requisition");break;
   case "DELIVERY":one("delivery");break;
   case "GLYPH_ACCEPTED":one("acceptedGlyph");break;
   case "GLYPH_ASSEMBLED":one("assembly");break;
   case "NUMERAL":one("numeral");if(ordinal!=null)ExecutionCustody.work("digit",ordinal.length());break;
   case "FRAGMENT":one("fragment");break;
   case "NOTARY":case "EXTENDED_NOTARY":one("notary");break;
   case "PUBLICATION":one("payload");break;
   case "AUDIT_APPEND":one("audit");break;
   case "QUEUE_ENQUEUED":one("enqueue");break;
   case "QUEUE_ACK":one("acknowledge");break;
   case "TRANSACTION_COMMIT":one("commit");break;
   case "TRANSACTION_CLEANUP":one("cleanup");break;
   case "SUCCESSION":one("successionPetition");one("successor");break;
   case "HR_REJECTED":one("rejection");break;
   default:break;
  }
 }
}
