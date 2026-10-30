import static org.junit.Assert.*;
import org.junit.Test;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.stringreturners.*;

public class GlyphProcurementTest {
 @Test public void everyCatalogCharacterHasExactlyOneVendorOfRecord() {
  GlyphCatalog catalog=new ApprovedGlyphCatalog();
  Set<String> codes=new HashSet<String>();
  for(char glyph:new char[]{'F','i','z','B','u'}) {GlyphSku sku=catalog.lookup(glyph);assertEquals(glyph,sku.character());assertTrue(codes.add(sku.code()));}
  assertEquals(5,codes.size());
  for(char glyph:new char[]{'f','I','Z','b','U',' ','\n','0','\u017a','\u0000'})
   try {catalog.lookup(glyph);fail("No unapproved substitutes may enter the supply chain.");}catch(IllegalArgumentException expected) {}
 }
 @Test public void fifteenRequiresEightAllocationsIncludingFourSeparatelyReceivedZs() {
  String json=GlyphProcurementDirectorate.standard().procure("FizzBuzz").toJson();
  assertTrue(json.contains("\"text\":\"FizzBuzz\""));
  assertEquals(8,occurrences(json,"\"quantity\":1"));
  assertEquals(4,occurrences(json,"\"character\":\"z\""));
  for(int position=1;position<=8;position++) assertEquals(1,occurrences(json,"\"position\":"+position+","));
  assertTrue(json.contains("\"demonstration\":true,\"auditTransactions\":0"));
 }
 @Test public void draftRequisitionsCannotAlterTheirApprovedLineItems() {
  List<GlyphSku> items=new ArrayList<GlyphSku>(Arrays.asList(GlyphSku.CAPITAL_F,GlyphSku.LOWER_I,GlyphSku.LOWER_Z,GlyphSku.LOWER_Z));
  GlyphRequisition requisition=new GlyphRequisition("Fizz",items);items.clear();
  assertEquals(4,requisition.items().size());
  try {requisition.items().clear();fail("The board did not delegate amendment authority.");}catch(UnsupportedOperationException expected) {}
 }
 @Test public void invalidProductsCannotAcquirePurchasingAuthority() {
  GlyphRequisitionAuthority authority=new BoardApprovedGlyphRequisitionAuthority(new ApprovedGlyphCatalog());
  for(String product:new String[]{null,"","fizz","Fizz\n","BuzzFizz","15","FizzBuzz ","FizzFizz"})
   try {authority.authorize(product);fail("An unchartered product obtained purchasing authority.");}catch(IllegalArgumentException expected) {}
 }
 @Test public void independentSuppliersAreSwappableAndActuallyAttendProduction() {
  final AtomicInteger calls=new AtomicInteger();
  GlyphSupplier supplier=new GlyphSupplier(){public List<GlyphDelivery> deliver(GlyphRequisition r){calls.incrementAndGet();return new InexhaustibleApprovedGlyphSupplier().deliver(r);}};
  GlyphProcurementDirectorate directorate=new GlyphProcurementDirectorate(new BoardApprovedGlyphRequisitionAuthority(new ApprovedGlyphCatalog()),supplier,new IndependentGlyphReceivingInspector(),new CertifiedGlyphAssembler());
  assertEquals("Fizz",new FizzStringReturner(directorate).getReturnString());
  assertEquals("Buzz",new BuzzStringReturner(directorate).getReturnString());assertEquals(2,calls.get());
 }
 @Test public void aSupplierCannotRebrandAnUppercaseZAsAnApprovedLowercaseZ() {
  GlyphSupplier supplier=new GlyphSupplier(){public List<GlyphDelivery> deliver(GlyphRequisition r){List<GlyphDelivery> items=new InexhaustibleApprovedGlyphSupplier().deliver(r);items.set(2,new GlyphDelivery(r,3,GlyphSku.LOWER_Z,'Z',1));return items;}};
  GlyphProcurementDirectorate directorate=new GlyphProcurementDirectorate(new BoardApprovedGlyphRequisitionAuthority(new ApprovedGlyphCatalog()),supplier,new IndependentGlyphReceivingInspector(),new CertifiedGlyphAssembler());
  try {new FizzStringReturner(directorate).getReturnString();fail("A fraudulent supplier bypassed receiving.");}catch(IllegalStateException expected) {}
 }
 @Test public void oneCatalogCannotRewriteTheCaseOfTheBoardsApprovedProduct() {
  GlyphCatalog catalog=new GlyphCatalog(){public GlyphSku lookup(char c){return GlyphSku.CAPITAL_F;}};
  try {new BoardApprovedGlyphRequisitionAuthority(catalog).authorize("Fizz");fail("Catalog capture changed the mandate.");}catch(IllegalArgumentException expected) {}
 }
 @Test public void parallelPurchasingNeverBorrowsAnotherRequisitionsCertificate() throws Exception {
  final GlyphProcurementDirectorate directorate=GlyphProcurementDirectorate.standard();
  ExecutorService pool=Executors.newFixedThreadPool(4);
  try {
   List<Future<String>> futures=new ArrayList<Future<String>>();
   for(int i=0;i<200;i++) futures.add(pool.submit(new Callable<String>(){public String call(){return directorate.procure("FizzBuzz").text();}}));
   for(Future<String> future:futures) assertEquals("FizzBuzz",future.get(10,TimeUnit.SECONDS));
  } finally {pool.shutdownNow();}
 }
 @Test public void springAndTheExplicitAssemblyAppointTheSameProcurementContracts() {
  ClassPathXmlApplicationContext spring=new ClassPathXmlApplicationContext("spring.xml");
  try {
   assertEquals("FizzBuzz",spring.getBean(GlyphProcurementDirectorate.class).procure("FizzBuzz").text());
   assertEquals("Fizz",spring.getBean(FizzStringReturner.class).getReturnString());
   assertEquals("Buzz",spring.getBean(BuzzStringReturner.class).getReturnString());
  } finally {spring.close();}
 }
 private static int occurrences(String text,String needle){return (text.length()-text.replace(needle,"").length())/needle.length();}
}
