import static org.junit.Assert.*;
import org.junit.*;
import java.util.*;
import java.util.concurrent.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.SlopFizzBuzz;

public class ExecutionProceedingsTest {
 private OutputAuditJournal journal;private OutputTransactionCoordinator transactions;private EnterpriseDispatcher dispatcher;
 @Before public void convene(){journal=JvmAuditJournalFactory.create(new EphemeralAuditStore());transactions=new OutputTransactionCoordinator(journal);final Map<Integer,String> memory=new HashMap<Integer,String>();CacheAuthority cache=new CacheAuthority(new CacheRepository(){public boolean enabled(){return true;}public String get(int n){return memory.get(n);}public void put(int n,String b,int ttl){memory.put(n,b);}});dispatcher=new EnterpriseDispatcher(ExplicitEnterpriseAssembly.assemble(transactions),transactions,journal,cache,new ReleaseCustodyReport("unknown",0));}
 @Test public void anExplainedMandateExecutesOnlyOnceAndPreservesThePlainAnswer()throws Exception{
  EnterpriseExchange result=dispatcher.dispatch("GET","/fizzbuzz/explained?limit=15");assertEquals(200,result.status);assertTrue(result.text().contains("\"schema\":\"slopbuzz-execution/v1\""));assertTrue(result.text().contains("\"text\":"+ExecutionEvent.quote(expected(15))));assertEquals(15,journal.snapshot().size());assertEquals("application/json; charset=UTF-8",result.headers.get("Content-Type"));assertTrue(result.text().contains("\"kind\":\"HR_APPROVED\""));assertTrue(result.text().contains("\"kind\":\"AUDIT_APPEND\""));assertEquals(expected(15),dispatcher.dispatch("GET","/fizzbuzz?limit=15").text());assertEquals(15,journal.snapshot().size());
 }
 @Test public void aCacheHitCannotInventANewWorkforceOrAuditTransaction()throws Exception{
  dispatcher.dispatch("GET","/fizzbuzz/explained?limit=3");EnterpriseExchange cached=dispatcher.dispatch("GET","/fizzbuzz/explained?limit=3");assertEquals("HIT",cached.headers.get("X-SlopBuzz-Cache"));assertTrue(cached.text().contains("\"kind\":\"CACHE_HIT\""));assertFalse(cached.text().contains("\"kind\":\"HR_APPROVED\""));assertFalse(cached.text().contains("\"kind\":\"TRANSACTION_BEGIN\""));assertEquals(3,journal.snapshot().size());
 }
 @Test public void perLineEvidenceRecordsTheActualOrderOfAuthorities()throws Exception{
  BoundedExecutionLedger ledger=new BoundedExecutionLedger();try(ExecutionCustody.Capture capture=ExecutionCustody.capture(ledger)){assertEquals(expected(3),dispatcher.dispatch("GET","/fizzbuzz?limit=3").text());}
  List<String> kinds=new ArrayList<String>();for(ExecutionEvent event:ledger.snapshot())if("1".equals(event.getOrdinal()))kinds.add(event.getKind());
  assertEquals(7,Collections.frequency(kinds,"HR_APPROVED"));assertTrue(kinds.indexOf("TRANSACTION_BEGIN")<kinds.indexOf("CLASSIFICATION"));assertTrue(kinds.indexOf("CLASSIFICATION")<kinds.indexOf("NOTARY"));assertTrue(kinds.indexOf("NOTARY")<kinds.indexOf("PUBLICATION"));assertTrue(kinds.indexOf("PUBLICATION")<kinds.indexOf("AUDIT_APPEND"));assertTrue(kinds.indexOf("AUDIT_APPEND")<kinds.indexOf("QUEUE_ENQUEUED"));assertTrue(kinds.indexOf("TRANSACTION_COMMIT")<kinds.indexOf("SUCCESSION"));assertFalse(kinds.contains("QUEUE_ACK"));
 }
 @Test public void fifteenActuallyReceivesEightAllocationsAndFourDistinctZPositions()throws Exception{
  BoundedExecutionLedger ledger=new BoundedExecutionLedger();try(ExecutionCustody.Capture capture=ExecutionCustody.capture(ledger)){dispatcher.dispatch("GET","/fizzbuzz?limit=15");}int allocations=0,zs=0;Set<String> receipts=new HashSet<String>();for(ExecutionEvent event:ledger.snapshot())if("15".equals(event.getOrdinal())&&"GLYPH_ACCEPTED".equals(event.getKind())){allocations++;if(event.getFinding().contains("character z,"))zs++;assertTrue(receipts.add(event.getFinding()));}assertEquals(8,allocations);assertEquals(4,zs);
 }
 @Test public void zeroHiresOneButDoesNotInventAProclamationOrNumericalAudit()throws Exception{
  EnterpriseExchange result=dispatcher.dispatch("GET","/fizzbuzz/explained?limit=0");assertEquals(200,result.status);assertTrue(result.text().contains("\"text\":\"\""));assertTrue(result.text().contains("\"kind\":\"HR_APPROVED\""));assertFalse(result.text().contains("\"kind\":\"PUBLICATION\""));assertTrue(journal.snapshot().isEmpty());
 }
 @Test public void exactMagnitudeWindowsDoNotPretendToUseRetainedTransactions()throws Exception{
  for(String start:new String[]{"1","9007199254740993","1"+zeros(1000)+"1"}){EnterpriseExchange result=dispatcher.dispatch("GET","/fizzbuzz/window/explained?start="+start+"&count=3");assertEquals(200,result.status);assertTrue(result.text().contains("\"ordinal\":\""+start+"\""));assertTrue(result.text().contains("\"kind\":\"EXTENDED_NOTARY\""));assertFalse(result.text().contains("\"kind\":\"AUDIT_APPEND\""));assertFalse(result.text().contains("\"kind\":\"TRANSACTION_BEGIN\""));if(!"1".equals(start))assertFalse(result.text().contains("\"kind\":\"HR_APPROVED\""));}assertTrue(journal.snapshot().isEmpty());
 }
 @Test public void observationFailureCannotAuthorizeOrVetoBusinessOutput()throws Exception{
  try(ExecutionCustody.Capture capture=ExecutionCustody.capture(new ExecutionObserver(){public void observe(ExecutionEvent event){throw new IllegalStateException("Spectator has fainted");}})){assertEquals(expected(5),dispatcher.dispatch("GET","/fizzbuzz?limit=5").text());}assertEquals(5,journal.snapshot().size());
 }
 @Test public void nestedObserversMustAdjournInOrderAndRestoreTheirParent(){
  BoundedExecutionLedger parent=new BoundedExecutionLedger(),child=new BoundedExecutionLedger();ExecutionCustody.Capture outer=ExecutionCustody.capture(parent);try{ExecutionCustody.ordinal("17");ExecutionCustody.record("A","Parent","before");ExecutionCustody.Capture inner=ExecutionCustody.capture(child);try{ExecutionCustody.ordinal("99");ExecutionCustody.record("B","Child","inside");try{outer.close();fail();}catch(IllegalStateException expected){}}finally{inner.close();inner.close();}ExecutionCustody.record("C","Parent","after");}finally{outer.close();}assertFalse(ExecutionCustody.observing());assertEquals(2,parent.snapshot().size());assertEquals("17",parent.snapshot().get(1).getOrdinal());assertEquals("99",child.snapshot().get(0).getOrdinal());
 }
 @Test public void finiteObservationCannotGrowIntoAnUnboundedJournal(){BoundedExecutionLedger ledger=new BoundedExecutionLedger(2);for(int i=0;i<10;i++)ledger.observe(new ExecutionEvent("1","CHECK","Records","finite",null));assertEquals(2,ledger.snapshot().size());assertEquals(8,ledger.omitted());try{ledger.snapshot().clear();fail();}catch(UnsupportedOperationException expected){}assertTrue(ledger.toJson().endsWith("\"omitted\":8}"));}
 @Test public void parallelSpectatorsCannotBorrowEachOthersOrdinals()throws Exception{
  ExecutorService pool=Executors.newFixedThreadPool(4);try{List<Future<String>> jobs=new ArrayList<Future<String>>();for(int i=0;i<100;i++){final String ordinal=String.valueOf(i);jobs.add(pool.submit(new Callable<String>(){public String call(){BoundedExecutionLedger ledger=new BoundedExecutionLedger();try(ExecutionCustody.Capture capture=ExecutionCustody.capture(ledger)){ExecutionCustody.ordinal(ordinal);ExecutionCustody.record("CHECK","Custody","private");}return ledger.snapshot().get(0).getOrdinal();}}));}for(int i=0;i<jobs.size();i++)assertEquals(String.valueOf(i),jobs.get(i).get(5,TimeUnit.SECONDS));}finally{pool.shutdownNow();}
 }
 @Test public void errorsRemainErrorsAndCannotBecomeSuccessfulNarratives()throws Exception{
  for(String path:new String[]{"/fizzbuzz/explained?limit=-1","/fizzbuzz/window/explained?start=0&count=1"}){EnterpriseExchange response=dispatcher.dispatch("GET",path);assertEquals(400,response.status);assertTrue(response.text().contains("\"kind\":\"FAILED\""));assertFalse(response.text().contains("\"kind\":\"HR_APPROVED\""));}
  for(String path:new String[]{"/fizzbuzz/explained","/fizzbuzz/window/explained"})for(String method:new String[]{"POST","PUT","HEAD"}){EnterpriseExchange response=dispatcher.dispatch(method,path);assertEquals(405,response.status);assertEquals("GET",response.headers.get("Allow"));}assertTrue(journal.snapshot().isEmpty());
 }
 @Test public void anActualBusinessFailureDoesNotTriggerASecondAttempt()throws Exception{
  final int[] calls={0};SlopFizzBuzz failed=new SlopFizzBuzz(){public void slopFizzBuzz(int limit){calls[0]++;throw new IllegalStateException("Board adjourned");}};EnterpriseDispatcher service=new EnterpriseDispatcher(failed,transactions,journal,new CacheAuthority(new CacheRepository(){public boolean enabled(){return false;}public String get(int n){return null;}public void put(int n,String body,int ttl){}}),new ReleaseCustodyReport("unknown",0));EnterpriseExchange result=service.dispatch("GET","/fizzbuzz/explained?limit=1");assertEquals(500,result.status);assertEquals(1,calls[0]);assertTrue(result.text().contains("\"kind\":\"FAILED\""));assertFalse(result.text().contains("\"kind\":\"COMPLETE\""));
 }
 @Test public void JSONEscapesAllControlAndNonAsciiCharacters(){assertEquals("\"quote\\\" slash\\\\ line\\u000a tab\\u0009 \\ud83d\\ude31\"",ExecutionEvent.quote("quote\" slash\\ line\n tab\t \uD83D\uDE31"));assertEquals("null",ExecutionEvent.quote(null));}
 private static String zeros(int count){char[] digits=new char[count];Arrays.fill(digits,'0');return new String(digits);}
 private static String expected(int limit){StringBuilder result=new StringBuilder();for(int n=1;n<=limit;n++)result.append(n%15==0?"FizzBuzz":n%3==0?"Fizz":n%5==0?"Buzz":String.valueOf(n)).append(System.getProperty("line.separator"));return result.toString();}
}
