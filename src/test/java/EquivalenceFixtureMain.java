import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.SlopFizzBuzz;

/** Emits JVM evidence from the real Spring graph and shared operational charter. */
public final class EquivalenceFixtureMain {
 public static void main(String[] args)throws Exception {
  PrintWriter out=new PrintWriter(new OutputStreamWriter(new FileOutputStream(args[0]),StandardCharsets.UTF_8));
  ClassPathXmlApplicationContext spring=new ClassPathXmlApplicationContext("spring.xml");
  try {
   SlopFizzBuzz service=spring.getBean(SlopFizzBuzz.class);
   OutputTransactionCoordinator transactions=spring.getBean(OutputTransactionCoordinator.class);
   for(int limit=0;limit<=1000;limit++)try(OutputCapture capture=transactions.capture()){
    service.slopFizzBuzz(limit);emit(out,"GET","/__validation/output?limit="+limit,200,capture.getText(),"");
   }
  } finally {spring.close();}
  final FixedRuntimeClock clock=new FixedRuntimeClock();
  OutputAuditJournal journal=JvmAuditJournalFactory.create(new H2AuditStore("jdbc:h2:file:"+args[1]+"/tribunal;DB_CLOSE_DELAY=-1"));
  OutputTransactionCoordinator transactions=new OutputTransactionCoordinator(journal);
  final Map<Integer,String> memory=new HashMap<Integer,String>();
  CacheAuthority cache=new CacheAuthority(new CacheRepository(){public boolean enabled(){return true;}public String get(int limit){return memory.get(limit);}public void put(int limit,String body,int ttl){memory.put(limit,body);}});
  EnterpriseDispatcher dispatcher=new EnterpriseDispatcher(ExplicitEnterpriseAssembly.assemble(transactions),transactions,journal,cache,new ReleaseCustodyReport(args[2],clock.currentTimeMillis()),clock);
  List<String[]> requests=new ArrayList<String[]>();
  String[] desks={"/healthz","/readyz","/cache/status","/operations/scorecard","/operations/release","/operations/canary","/operations/recovery","/audit/status","/audit/evidence","/capacity/forecast","/procurement/dossier","/onboarding/rehearsal"};
  for(String path:desks)requests.add(new String[]{"GET",path});
  for(String path:new String[]{"/fizzbuzz?limit=0","/fizzbuzz?limit=0","/fizzbuzz?limit=15","/fizzbuzz?limit=15","/fizzbuzz?limit=0003","/fizzbuzz?limit=1000","/fizzbuzz","/capacity/forecast?limit=1000","/fizzbuzz?limit=1001","/fizzbuzz?limit=-1","/fizzbuzz?limit=1&limit=2","/fizzbuzz?limit=%31","/fizzbuzz?","/fizzbuzz?limit=1&x=2","/fizzbuzz/child","/unknown"})requests.add(new String[]{"GET",path});
  for(String path:new String[]{"/procurement/dossier?product=Fizz","/procurement/dossier?product=Buzz","/procurement/dossier?product=FizzBuzz","/procurement/dossier?product=fizz","/procurement/dossier?product=","/procurement/dossier?product=Fizz&product=Buzz","/procurement/dossier?product=%46izz","/procurement/dossier?","/procurement/dossier/child"})requests.add(new String[]{"GET",path});
  requests.add(new String[]{"POST","/procurement/dossier"});
  for(String scenario:new String[]{"approved","zero","two","missing-induction","","unauthorized","%7Aero","zero&scenario=two","zero&x=1"})requests.add(new String[]{"GET","/onboarding/rehearsal?scenario="+scenario});
  requests.add(new String[]{"GET","/onboarding/rehearsal?"});requests.add(new String[]{"GET","/onboarding/rehearsal/child"});requests.add(new String[]{"POST","/onboarding/rehearsal"});
  for(String scenario:new String[]{"approved","zero","wrong-mandate","missing-line","lowercase-fizz","","other","%7Aero","zero&scenario=approved","zero&x=1"})requests.add(new String[]{"GET","/precedent/rehearsal?scenario="+scenario});
  requests.add(new String[]{"GET","/precedent/rehearsal"});requests.add(new String[]{"GET","/precedent/rehearsal?"});requests.add(new String[]{"GET","/precedent/rehearsal/child"});
  for(String method:new String[]{"POST","PUT","PATCH","DELETE","HEAD","OPTIONS"})requests.add(new String[]{method,"/precedent/rehearsal"});
  for(String path:new String[]{"/fizzbuzz/window?start=1&count=100","/fizzbuzz/window?start=9007199254740990&count=8","/fizzbuzz/window?start=9223372036854775807&count=4","/fizzbuzz/window?start=100000000000000000000000000000000000000000000000001&count=3","/fizzbuzz/window?start=0&count=1","/fizzbuzz/window?start=1&count=101","/fizzbuzz/window?start=1&count=0","/fizzbuzz/window?start=%31&count=1","/fizzbuzz/window?start=1&count=2&x=3","/capacity/forecast/extended?limit=0","/capacity/forecast/extended?limit=1001","/capacity/forecast/extended?limit=9007199254740993","/capacity/forecast/extended?limit=100000000000000000000000000000000000000000000000001","/capacity/forecast/extended?limit=-1","/capacity/forecast/extended?limit=1&x=3"})requests.add(new String[]{"GET",path});
  String astronomical=java.math.BigInteger.TEN.pow(1000).add(java.math.BigInteger.ONE).toString();
  requests.add(new String[]{"GET","/fizzbuzz/window?start="+astronomical+"&count=3"});
  requests.add(new String[]{"GET","/capacity/forecast/extended?limit="+astronomical});
  for(String path:new String[]{"/fizzbuzz/window","/capacity/forecast/extended"})for(String method:new String[]{"GET","POST","PUT","HEAD"})requests.add(new String[]{method,path});
  requests.add(new String[]{"POST","/operations/canary"});requests.add(new String[]{"POST","/operations/canary"});
  requests.add(new String[]{"POST","/operations/recovery"});
  for(String path:desks)requests.add(new String[]{"GET",path});
  for(String path:desks)for(String method:new String[]{"PUT","DELETE","PATCH","HEAD","OPTIONS"})requests.add(new String[]{method,path});
  requests.add(new String[]{"POST","/fizzbuzz"});requests.add(new String[]{"GET","/operations/scorecard"});
  for(String target:new String[]{"/fizzbuzz/explained?limit=0","/fizzbuzz/explained?limit=1","/fizzbuzz/explained?limit=3","/fizzbuzz/explained?limit=5","/fizzbuzz/explained?limit=15","/fizzbuzz/explained?limit=15","/fizzbuzz/explained?limit=19","/fizzbuzz/explained?limit=1001","/fizzbuzz/explained?limit=-1","/fizzbuzz/explained?limit=1&x=2","/fizzbuzz/window/explained?start=1&count=15","/fizzbuzz/window/explained?start=9007199254740993&count=3","/fizzbuzz/window/explained?start=0&count=1"})requests.add(new String[]{"GET",target});
  requests.add(new String[]{"POST","/fizzbuzz/explained"});requests.add(new String[]{"HEAD","/fizzbuzz/window/explained"});
  TraceCustody.bind("0123456789abcdef0123456789abcdef");
  try{for(String[] request:requests){EnterpriseExchange r=dispatcher.dispatch(request[0],request[1]);StringBuilder headers=new StringBuilder();for(Map.Entry<String,String> h:r.headers.entrySet())headers.append(h.getKey()).append(':').append(h.getValue()).append('\n');emit(out,request[0],request[1],r.status,r.text(),headers.toString());}}finally{TraceCustody.clear();}
  clock.advance(15000);emit(out,"ADVANCE","15000",200,"","");
  EnterpriseExchange r=dispatcher.dispatch("POST","/operations/canary");emit(out,"POST","/operations/canary",r.status,r.text(),"X-SlopBuzz-Rehearsal:EXECUTED\n");
  emit(out,"GET","/__validation/contracts",200,PortableContractTribunal.rehearse(new JvmAuditDigest()),"");
  out.close();
 }
 private static void emit(PrintWriter out,String method,String path,int status,String body,String headers){out.println(method+"\t"+path+"\t"+status+"\t"+Base64.getEncoder().encodeToString(body.getBytes(StandardCharsets.UTF_8))+"\t"+Base64.getEncoder().encodeToString(headers.getBytes(StandardCharsets.UTF_8)));}
}
