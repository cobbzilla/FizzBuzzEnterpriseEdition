import static org.junit.Assert.*;
import org.junit.Test;
import java.math.BigInteger;
import java.util.*;
import java.util.concurrent.*;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.companions.*;

public class EmojiCompanionTest {
 private final ConstantEmojiCatalog catalog=new ConstantEmojiCatalog();
 private final BoundedPrimeFactorOffice office=new BoundedPrimeFactorOffice();
 @Test public void everyColleagueOwnsAReachableIntervalAndNoTicketFallsBetweenDepartments(){
  long cursor=0;Set<String> names=new HashSet<String>(),glyphs=new HashSet<String>();
  for(Companion c:catalog.entries()){assertTrue(c.weight>0);assertTrue(names.add(c.name));assertTrue(glyphs.add(c.emoji));assertSame(c,catalog.atTicket((int)cursor));cursor+=c.weight;assertSame(c,catalog.atTicket((int)cursor-1));if("unicorn".equals(c.name))assertEquals(1,c.weight);}
  assertEquals(3200,names.size());assertEquals(1000000000L,cursor);
  try{catalog.entries().clear();fail();}catch(UnsupportedOperationException expected){}
  for(int t:new int[]{-1,1000000000,Integer.MAX_VALUE})try{catalog.atTicket(t);fail();}catch(IllegalArgumentException expected){}
 }
 @Test public void factorReceiptsReconstructEveryOrdinalAcrossTheIndependentSmallIntegerDomain(){
  for(int n=1;n<=25000;n++){FactorProfile p=office.inspect(BigInteger.valueOf(n));BigInteger product=BigInteger.ONE;if(!p.factors.equals("none extracted"))for(String part:p.factors.split(" × ")){String[] term=part.split("\\^");BigInteger prime=new BigInteger(term[0]);assertTrue(prime.isProbablePrime(100));product=product.multiply(prime.pow(term.length==1?1:Integer.parseInt(term[1])));}
   assertEquals(BigInteger.valueOf(n),product.multiply(new BigInteger(p.cofactor)));assertEquals(p.cofactor.equals("1"),p.complete);assertTrue(p.divisions<=128);
   if(n<10000)assertTrue("All small factorizations are proved: "+n,p.complete);
  }
 }
 @Test public void finiteWorkNeverCallsAnUnresolvedCompositePrime(){
  FactorProfile p=office.inspect(BigInteger.valueOf(101L*103));assertFalse(p.complete);assertEquals("10403",p.cofactor);assertEquals("none extracted",p.factors);
  p=office.inspect(BigInteger.valueOf(10007));assertTrue(p.complete);assertEquals("10007",p.factors);
  p=office.inspect(BigInteger.valueOf(2).pow(1000));assertFalse(p.complete);assertEquals(128,p.divisions);assertEquals("2^128",p.factors);assertEquals(BigInteger.valueOf(2).pow(872).toString(),p.cofactor);
  p=office.inspect(BigInteger.TEN.pow(1000).add(BigInteger.ONE));assertFalse(p.complete);assertTrue(p.divisions<=128);
  for(BigInteger invalid:new BigInteger[]{null,BigInteger.ZERO,BigInteger.ONE.negate()})try{office.inspect(invalid);fail();}catch(IllegalArgumentException expected){}
 }
 @Test public void versionedGoldenAssignmentsRemainStableAcrossEngines(){
  EmojiAssignmentStrategy[] policies={new FactorResonanceStrategy(),new OrdinalConstellationStrategy()};int[][] tickets={{7186687,852697095,40408936},{937257861,984655248,642136012}};String[][] ids={{"e-1f499","p-e-1f1f8-1f1f3-1f4d3","e-1f9c7"},{"p-e-1fadd-1f4d6","p-e-1f692-1f9f3","p-e-1f4c4-1f319"}};
  for(int policy=0;policy<2;policy++)for(int index=0;index<3;index++){BigInteger n=BigInteger.valueOf(new int[]{3,5,15}[index]);int ticket=policies[policy].ticket(n,new String[]{"Fizz","Buzz","FizzBuzz"}[index],office.inspect(n),catalog.version());assertEquals(tickets[policy][index],ticket);assertEquals(ids[policy][index],catalog.atTicket(ticket).id);}
 }
 @Test public void anActuallyInjectedAlternativeCanAppointEveryCompanionWithoutProducingNumericalWork(){
  int t=0;for(Companion c:catalog.entries()){final int ticket=t;EmojiAssignmentStrategy replacement=new EmojiAssignmentStrategy(){public String id(){return "injected-test-v1";}public String name(){return "Independent test appointment authority";}public String explanation(){return "Ticket fixed by the test witness";}public int ticket(BigInteger n,String flavor,FactorProfile p,String version){return ticket;}};
   CompanionDirectorate d=new CompanionDirectorate(catalog,office,Arrays.asList(replacement));String body=d.window(BigInteger.valueOf(15),1,replacement.id());assertTrue(body.contains("\"companionId\":\""+c.id+"\""));assertTrue(body.contains("\"flavor\":\"FizzBuzz\""));t+=c.weight;
  }
 }
 @Test public void registryRefusesAmbiguityAndThereIsNoSilentFallbackFromAnUnknownStrategy(){
  try{new CompanionDirectorate(catalog,office,Arrays.<EmojiAssignmentStrategy>asList(new FactorResonanceStrategy(),new FactorResonanceStrategy()));fail();}catch(IllegalArgumentException expected){}
  CompanionDirectorate d=CompanionDirectorate.standard();for(String id:new String[]{"unknown","factor-resonance",""})try{d.window(BigInteger.ONE,1,id);fail();}catch(IllegalArgumentException expected){}
  for(int count:new int[]{-1,0,101})try{d.window(BigInteger.ONE,count,"factor-resonance-v1");fail();}catch(IllegalArgumentException expected){}
  assertTrue(d.window(BigInteger.ONE,2,"factor-resonance-v1").contains("\"assignments\":[]"));
 }
 @Test public void familiarFriendsReceiveFourFifthsOfALargeIndependentOrdinalSample(){
  EmojiAssignmentStrategy s=new OrdinalConstellationStrategy();int common=0;Map<String,Integer> buckets=new HashMap<String,Integer>();
  for(int n=1;n<=100000;n++){Companion c=catalog.atTicket(s.ticket(BigInteger.valueOf(n),"Fizz",new FactorProfile("not used","1",true,0),catalog.version()));if(c.rarity.equals("Common"))common++;buckets.put(c.id,buckets.containsKey(c.id)?buckets.get(c.id)+1:1);}
  assertTrue("Observed common share: "+common,common>79500&&common<80500);assertTrue(buckets.size()>700);
 }
 @Test public void theActualSpringRegistrySuppliesBothSwappableImplementations(){
  ClassPathXmlApplicationContext context=new ClassPathXmlApplicationContext(com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.Constants.SPRING_XML);try{CompanionDirectorate d=context.getBean(CompanionDirectorate.class);assertTrue(d.strategiesJson().contains("factor-resonance-v1"));assertTrue(d.strategiesJson().contains("ordinal-constellation-v1"));assertEquals(2,context.getBeansOfType(EmojiAssignmentStrategy.class).size());for(String policy:new String[]{"factor-resonance-v1","ordinal-constellation-v1"})assertEquals(CompanionDirectorate.standard().window(BigInteger.ONE,100,policy),d.window(BigInteger.ONE,100,policy));}finally{context.close();}
 }
 @Test public void factorEvidenceCanBeSuppliedIndependentlyOfTheSelectionPolicy(){
  final java.util.concurrent.atomic.AtomicInteger calls=new java.util.concurrent.atomic.AtomicInteger();final FactorProfile partial=new FactorProfile("2","15",false,1);
  FactorProfileOffice replacement=new FactorProfileOffice(){public FactorProfile inspect(BigInteger ordinal){assertEquals(BigInteger.valueOf(30),ordinal);calls.incrementAndGet();return partial;}};
  CompanionDirectorate d=new CompanionDirectorate(catalog,replacement,Arrays.<EmojiAssignmentStrategy>asList(new FactorResonanceStrategy(),new OrdinalConstellationStrategy()));assertTrue(d.window(BigInteger.valueOf(30),1,"factor-resonance-v1").contains("\"cofactor\":\"15\""));assertEquals(1,calls.get());
  FactorProfile complete=office.inspect(BigInteger.valueOf(30));EmojiAssignmentStrategy independent=new OrdinalConstellationStrategy(),affinity=new FactorResonanceStrategy();assertEquals(independent.ticket(BigInteger.valueOf(30),"FizzBuzz",partial,catalog.version()),independent.ticket(BigInteger.valueOf(30),"FizzBuzz",complete,catalog.version()));assertNotEquals(affinity.ticket(BigInteger.valueOf(30),"FizzBuzz",partial,catalog.version()),affinity.ticket(BigInteger.valueOf(30),"FizzBuzz",complete,catalog.version()));
  CompanionDirectorate missing=new CompanionDirectorate(catalog,new FactorProfileOffice(){public FactorProfile inspect(BigInteger ordinal){return null;}},Arrays.<EmojiAssignmentStrategy>asList(affinity));try{missing.window(BigInteger.valueOf(30),1,affinity.id());fail();}catch(IllegalStateException expected){}
 }
 @Test public void concurrentAppointmentsHaveNoMutableCrossCaseMemory()throws Exception{
  final CompanionDirectorate d=CompanionDirectorate.standard();final String expected=d.window(new BigInteger("9007199254740993"),100,"factor-resonance-v1");ExecutorService pool=Executors.newFixedThreadPool(6);try{List<Future<String>> results=new ArrayList<Future<String>>();for(int i=0;i<60;i++)results.add(pool.submit(new Callable<String>(){public String call(){return d.window(new BigInteger("9007199254740993"),100,"factor-resonance-v1");}}));for(Future<String> result:results)assertEquals(expected,result.get());}finally{pool.shutdownNow();}
 }
}
