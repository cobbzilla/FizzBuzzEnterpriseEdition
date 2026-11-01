package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime;
import java.util.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache.*;

/** Isolated operational failure rehearsal, executable by both JVM and browser tribunals. */
public final class PortableContractTribunal {
 public static String rehearse(AuditDigest digest)throws Exception {
  EphemeralAuditStore store=new EphemeralAuditStore();
  OutputAuditJournal journal=new OutputAuditJournal(store,digest);
  OutputAuditEntry committed=journal.record(1,"1\n",OutputDisposition.COMMITTED);
  journal.record(3,"unfinished",OutputDisposition.ABORTED);
  final AuditStatusProjection projection=new AuditStatusProjection();
  projection.accept(committed);projection.accept(committed);
  require(projection.committedCount()==1,"duplicate delivery");
  final AuditEventConsumer refusing=new AuditEventConsumer(){public void accept(OutputAuditEntry entry){throw new IllegalStateException("mailbox closed");}};
  require(journal.messages().dispatch(refusing)==0,"first retry");
  require(journal.messages().pendingCount()==2,"retry retained");
  journal.messages().dispatch(refusing);journal.messages().dispatch(refusing);
  require(journal.messages().pendingCount()==0 && journal.messages().deadLetterCount()==2,"third attempt dead letters");
  OutputAuditJournal reopened=new OutputAuditJournal(store,digest);
  require(reopened.messages().dispatch(projection)==2,"rehydration");
  require(projection.committedCount()==1 && projection.abortedCount()==1,"idempotent replay");
  require(reopened.verifyChain(),"chain after replay");
  OutputTransactionCoordinator transactions=new OutputTransactionCoordinator(reopened);
  try(OutputCapture capture=transactions.capture()){
   transactions.begin(3);transactions.stageOrWrite("Definitely not Fizz\n");
   boolean rejected=false;try{transactions.commit();}catch(IllegalStateException expected){rejected=true;}
   require(rejected && capture.getText().isEmpty(),"notary publication barrier");
   transactions.begin(3);transactions.stageOrWrite("Fizz\n");transactions.commit();
   require(capture.getText().equals("Fizz\n"),"transaction cleanup");
  }
  require(reopened.snapshot().get(2).getDisposition()==OutputDisposition.ABORTED,"rejected audit disposition");
  final CacheAuthority failedCache=new CacheAuthority(new CacheRepository(){public boolean enabled(){return true;}public String get(int n){throw new IllegalStateException("unavailable");}public void put(int n,String body,int ttl){throw new IllegalStateException("quota");}});
  require(failedCache.lookup(3).getState()==CacheLookup.State.BYPASS,"cache bypass");failedCache.store(3,"Fizz\n");
  OutputAuditJournal unavailable=new OutputAuditJournal(new OutputAuditStore(){public List<OutputAuditEntry> load(){return new ArrayList<OutputAuditEntry>();}public void append(OutputAuditEntry entry){throw new IllegalStateException("quota");}},digest);
  boolean failed=false;try{unavailable.record(1,"1\n",OutputDisposition.COMMITTED);}catch(IllegalStateException expected){failed=true;}
  require(failed && unavailable.snapshot().isEmpty() && unavailable.messages().pendingCount()==0,"failed append publication barrier");
  int glyphChecks=com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement.GlyphProcurementTribunal.rehearse();
  int personnelChecks=com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.PersonnelObjectionTribunal.rehearse();
  // UTF-16 lengths and UTF-8 hashing must agree across all compilers.
  OutputAuditEntry unicode=reopened.record(7,"gravitás \uD83C\uDFDB\uFE0F\n",OutputDisposition.ABORTED);
  require(reopened.verifyChain(),"unicode chain");
  return "{\"state\":\"PASSED\",\"checks\":"+(13+glyphChecks+personnelChecks)+",\"headDigest\":\""+unicode.getDigest()+"\",\"cache\":"+failedCache.statusJson()+"}";
 }
 private static void require(boolean condition,String name){if(!condition)throw new IllegalStateException("Contract failed: "+name);}
}
