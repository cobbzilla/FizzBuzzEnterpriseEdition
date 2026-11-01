import static org.junit.Assert.*;
import org.junit.*;
import java.util.*;
import java.net.*;
import java.io.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.OnboardingDocuments.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.SlopFizzBuzz;

public class PersonnelDeskTest {
 private OutputAuditJournal journal;private OutputTransactionCoordinator transactions;private CacheAuthority cache;private EnterpriseDispatcher dispatcher;
 @Before public void convene(){
  journal=JvmAuditJournalFactory.create(new EphemeralAuditStore());transactions=new OutputTransactionCoordinator(journal);
  final Map<Integer,String> memory=new HashMap<Integer,String>();
  cache=new CacheAuthority(new CacheRepository(){public boolean enabled(){return true;}public String get(int n){return memory.get(n);}public void put(int n,String body,int ttl){memory.put(n,body);}});
  dispatcher=new EnterpriseDispatcher(ExplicitEnterpriseAssembly.assemble(transactions),transactions,journal,cache,new ReleaseCustodyReport("unknown",0));
 }
 @Test public void aCacheHitCannotClaimToHaveRehiredTheInitialOrdinal()throws Exception{
  TraceCustody.bind("first-request");EnterpriseExchange first;try{first=dispatcher.dispatch("GET","/fizzbuzz?limit=15");}finally{TraceCustody.clear();}
  assertEquals(200,first.status);assertEquals("MISS",first.headers.get("X-SlopBuzz-Cache"));assertEquals("APPROVED",first.headers.get("X-SlopBuzz-Onboarding-State"));
  assertTrue(first.headers.get("X-SlopBuzz-Onboarding-Trace").contains("HR-first-request"));assertEquals(15,journal.snapshot().size());
  EnterpriseExchange cached=dispatcher.dispatch("GET","/fizzbuzz?limit=15");assertEquals(first.text(),cached.text());assertEquals("CACHE_REUSED",cached.headers.get("X-SlopBuzz-Onboarding-State"));assertNull(cached.headers.get("X-SlopBuzz-Onboarding-Trace"));assertEquals(15,journal.snapshot().size());
 }
 @Test public void zeroStillHiresOneButPublishesNoLinesOrAuditEntries()throws Exception{
  EnterpriseExchange zero=dispatcher.dispatch("GET","/fizzbuzz?limit=0");assertEquals(200,zero.status);assertEquals("",zero.text());assertEquals("APPROVED",zero.headers.get("X-SlopBuzz-Onboarding-State"));assertTrue(zero.headers.get("X-SlopBuzz-Onboarding-Trace").contains("\"purpose\":\"MANDATE\""));assertTrue(journal.snapshot().isEmpty());
 }
 @Test public void aRejectedProductionOriginPublishesItsOwnFailureRecordRatherThanNumericalOutput()throws Exception{
  SlopFizzBuzz refusing=new SlopFizzBuzz(){public void slopFizzBuzz(int limit){FirstOrdinalOnboardingDirectorate.rehearsal(0,true).onboard();}};
  EnterpriseDispatcher failed=new EnterpriseDispatcher(refusing,transactions,journal,cache,new ReleaseCustodyReport("unknown",0));
  for(int attempt=0;attempt<2;attempt++){EnterpriseExchange response=failed.dispatch("GET","/fizzbuzz?limit=1");assertEquals(500,response.status);assertEquals("Generation failed\n",response.text());assertEquals("REJECTED",response.headers.get("X-SlopBuzz-Onboarding-State"));assertTrue(response.headers.get("X-SlopBuzz-Onboarding-Trace").contains("Candidate zero demonstrates insufficient initiative"));assertEquals("MISS",response.headers.get("X-SlopBuzz-Cache"));}
  assertTrue(journal.snapshot().isEmpty());
 }
 @Test public void excessiveFailureNarrativeCannotOverflowTheHttpPersonnelHeader()throws Exception{
  final StringBuilder verbose=new StringBuilder();for(int i=0;i<9000;i++)verbose.append('!');
  final FirstOrdinalOnboardingDirectorate office=new FirstOrdinalOnboardingDirectorate(new HeadcountPlanningAuthority(){public Vacancy authorize(CaseIdentity scope){throw new IllegalStateException(verbose.toString());}},null,null,null,null,null,null);
  EnterpriseDispatcher failed=new EnterpriseDispatcher(new SlopFizzBuzz(){public void slopFizzBuzz(int limit){office.onboard();}},transactions,journal,cache,new ReleaseCustodyReport("unknown",0));
  EnterpriseExchange response=failed.dispatch("GET","/fizzbuzz?limit=1");assertEquals(500,response.status);assertEquals("UNAVAILABLE",response.headers.get("X-SlopBuzz-Onboarding-State"));assertNull(response.headers.get("X-SlopBuzz-Onboarding-Trace"));assertTrue(journal.snapshot().isEmpty());
 }
 @Test public void readOnlyRehearsalsExerciseEachVetoWithoutChangingJournalOrCache()throws Exception{
  String beforeCache=cache.statusJson();String[] scenarios={"approved","zero","two","missing-induction"};
  for(String scenario:scenarios){EnterpriseExchange result=dispatcher.dispatch("GET","/onboarding/rehearsal?scenario="+scenario);assertEquals(200,result.status);assertEquals("no-store",result.headers.get("Cache-Control"));assertEquals("READ_ONLY_REHEARSAL",result.headers.get("X-SlopBuzz-Proceedings"));assertTrue(result.text().contains("\"purpose\":\"REHEARSAL\""));assertTrue(result.text().contains("\"status\":\""+("approved".equals(scenario)?"APPROVED":"REJECTED")+"\""));assertNull(result.headers.get("X-SlopBuzz-Onboarding-Trace"));}
  assertEquals(beforeCache,cache.statusJson());assertTrue(journal.snapshot().isEmpty());assertEquals(0,journal.messages().pendingCount());
 }
 @Test public void personnelAdmissionRejectsAmbiguousQueriesAndWrongMethods()throws Exception{
  assertEquals(200,dispatcher.dispatch("GET","/onboarding/rehearsal").status);
  for(String query:new String[]{"","scenario=","scenario=three","scenario=zero&scenario=two","scenario=%7Aero","scenario=zero&extra=1","x=zero","Scenario=zero"})assertEquals(query,400,dispatcher.dispatch("GET","/onboarding/rehearsal?"+query).status);
  for(String method:new String[]{"POST","PUT","PATCH","DELETE","OPTIONS","HEAD"}){EnterpriseExchange response=dispatcher.dispatch(method,"/onboarding/rehearsal");assertEquals(405,response.status);assertEquals("GET",response.headers.get("Allow"));}
  assertEquals(404,dispatcher.dispatch("GET","/onboarding/rehearsal/child").status);
 }
 @Test public void extendedContinuationDoesNotFabricateAnotherCommencement()throws Exception{
  EnterpriseExchange first=dispatcher.dispatch("GET","/fizzbuzz/window?start=1&count=2");assertEquals("1\n2\n",first.text());assertEquals("APPROVED",first.headers.get("X-SlopBuzz-Onboarding-State"));
  EnterpriseExchange second=dispatcher.dispatch("GET","/fizzbuzz/window?start=3&count=1");assertEquals("Fizz\n",second.text());assertEquals("CONTINUATION",second.headers.get("X-SlopBuzz-Onboarding-State"));assertNull(second.headers.get("X-SlopBuzz-Onboarding-Trace"));assertTrue(journal.snapshot().isEmpty());
 }
 @Test public void actualHttpAdapterCarriesAsciiPersonnelEvidenceAndRegistersTheReadOnlyDesk()throws Exception{
  SlopFizzBuzzHttpServer server=new SlopFizzBuzzHttpServer(new InetSocketAddress("127.0.0.1",0),ExplicitEnterpriseAssembly.assemble(transactions),transactions,journal);
  server.start();
  try{HttpURLConnection connection=(HttpURLConnection)new URL("http://127.0.0.1:"+server.getPort()+"/fizzbuzz?limit=1").openConnection();connection.setRequestProperty("traceparent","00-0123456789abcdef0123456789abcdef-0123456789abcdef-01");
   try{assertEquals(200,connection.getResponseCode());String record=connection.getHeaderField("X-SlopBuzz-Onboarding-Trace");assertNotNull(record);assertTrue(record.contains("HR-0123456789abcdef0123456789abcdef"));assertEquals('1',connection.getInputStream().read());}finally{connection.disconnect();}
   connection=(HttpURLConnection)new URL("http://127.0.0.1:"+server.getPort()+"/onboarding/rehearsal?scenario=zero").openConnection();try{assertEquals(200,connection.getResponseCode());assertEquals("READ_ONLY_REHEARSAL",connection.getHeaderField("X-SlopBuzz-Proceedings"));assertEquals('{',connection.getInputStream().read());}finally{connection.disconnect();}
  }finally{server.close();}
 }
}
