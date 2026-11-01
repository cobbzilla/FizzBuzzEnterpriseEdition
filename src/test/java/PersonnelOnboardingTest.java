import static org.junit.Assert.*;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import java.math.BigInteger;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.TraceCustody;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.capacity.ExtendedMagnitudeBureau;
import static com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.OnboardingDocuments.*;

public class PersonnelOnboardingTest {
 @Test public void portableObjectionsConveneAgainstRealOffices(){assertEquals(128,PersonnelObjectionTribunal.rehearse());}
 @Test public void allSevenIndependentContractImplementationsActuallyAttendTheOrigin(){
  final AtomicInteger attendance=new AtomicInteger();
  FirstOrdinalOnboardingDirectorate office=new FirstOrdinalOnboardingDirectorate(
   new HeadcountPlanningAuthority(){public Vacancy authorize(CaseIdentity scope){attendance.incrementAndGet();return new OnePositionHeadcountAuthority().authorize(scope);}},
   new InitialOrdinalRecruiter(){public Application nominate(Vacancy v){attendance.incrementAndGet();return new PositionScopedInitialOrdinalRecruiter().nominate(v);}},
   new OrdinalIdentityOffice(){public IdentityFinding verify(Application a){attendance.incrementAndGet();return new LiteralUnityIdentityOffice().verify(a);}},
   new OrdinalOfferAuthority(){public Offer issue(IdentityFinding f){attendance.incrementAndGet();return new BindingOrdinalOfferAuthority().issue(f);}},
   new OrdinalInductionRegistrar(){public Induction induct(Offer o){attendance.incrementAndGet();return new PolicyVersionInductionRegistrar().induct(o);}},
   new OrdinalProbationBoard(){public CommencementCertificate review(Induction i){attendance.incrementAndGet();return new EvidenceBasedProbationBoard().review(i);}},
   new CommencementCertificateAuditor(){public int authorize(CaseFile f){attendance.incrementAndGet();return new IndependentCommencementAuditor().authorize(f);}});
  try(PersonnelEvidenceCustody.Capture capture=PersonnelEvidenceCustody.capture()){
   assertEquals(1,new LoopInitializer(office).getLoopInitializationPoint());assertEquals(7,attendance.get());
   assertEquals(7,capture.getDossier().getSteps().size());assertEquals("MANDATE",capture.getDossier().getPurpose());
   for(PersonnelDecision decision:capture.getDossier().getSteps())assertEquals("APPROVED",decision.getState());
  }
 }
 @Test public void aSwappedAuditorCannotAuthorizeZeroOrTwo(){
  for(final int ordinal:new int[]{0,2,Integer.MIN_VALUE,Integer.MAX_VALUE}){
   PersonnelDossier result=directorate(null,null,null,null,null,null,new CommencementCertificateAuditor(){public int authorize(CaseFile f){return ordinal;}}).inspect("REHEARSAL");
   assertRejectedAt(result,6);try{result.obtainAuthorizedOrdinal();fail();}catch(IllegalStateException expected){}
  }
 }
 @Test public void everyHandoffRejectsAMissingOrBorrowedDocument(){
  assertRejectedAt(directorate(new HeadcountPlanningAuthority(){public Vacancy authorize(CaseIdentity s){return null;}},null,null,null,null,null,null).inspect("REHEARSAL"),0);
  assertRejectedAt(directorate(new HeadcountPlanningAuthority(){public Vacancy authorize(CaseIdentity s){return new Vacancy(new CaseIdentity(s.getReference()),"Initial ordinal",1);}},null,null,null,null,null,null).inspect("REHEARSAL"),0);
  assertRejectedAt(directorate(null,new InitialOrdinalRecruiter(){public Application nominate(Vacancy v){return null;}},null,null,null,null,null).inspect("REHEARSAL"),1);
  assertRejectedAt(directorate(null,null,new OrdinalIdentityOffice(){public IdentityFinding verify(Application a){return new IdentityFinding(new Application(a.getVacancy(),1));}},null,null,null,null).inspect("REHEARSAL"),2);
  assertRejectedAt(directorate(null,null,null,new OrdinalOfferAuthority(){public Offer issue(IdentityFinding i){return new Offer(new IdentityFinding(i.getApplication()));}},null,null,null).inspect("REHEARSAL"),3);
  assertRejectedAt(directorate(null,null,null,null,new OrdinalInductionRegistrar(){public Induction induct(Offer o){return new Induction(new Offer(o.getIdentity()),"INITIAL-ORDINAL-HANDBOOK/v1",new String[0]);}},null,null).inspect("REHEARSAL"),4);
  assertRejectedAt(directorate(null,null,null,null,null,new OrdinalProbationBoard(){public CommencementCertificate review(Induction i){return new CommencementCertificate(new Induction(i.getOffer(),i.getPolicyVersion(),i.getAcknowledgments()),1);}},null).inspect("REHEARSAL"),5);
 }
 @Test public void colludingIdentityAndOfferOfficesStillFaceIndependentAudit(){
  assertRejectedAt(directorate(null,new PositionScopedInitialOrdinalRecruiter(2),new OrdinalIdentityOffice(){public IdentityFinding verify(Application a){return new IdentityFinding(a);}},new OrdinalOfferAuthority(){public Offer issue(IdentityFinding f){return new Offer(f);}},null,null,null).inspect("REHEARSAL"),6);
 }
 @Test public void completeInductionCannotBeEditedThroughItsArray(){
  Induction original=PersonnelObjectionTribunal.specimen(-1).getInduction();
  String[] supplied=original.getAcknowledgments();Induction immutable=new Induction(original.getOffer(),original.getPolicyVersion(),supplied);
  supplied[0]="ZERO_MEANS_ZERO";immutable.getAcknowledgments()[1]="PROMOTED_TO_TWO";
  assertArrayEquals(original.getAcknowledgments(),immutable.getAcknowledgments());
  PersonnelDossier dossier=FirstOrdinalOnboardingDirectorate.standard().inspect("REHEARSAL");
  try{dossier.getSteps().clear();fail();}catch(UnsupportedOperationException expected){}
 }
 @Test public void nestedCapturesDoNotLoseTheirParentsAndRehearsalsDoNotPretendToBeMandates(){
  PersonnelEvidenceCustody.Capture outer=PersonnelEvidenceCustody.capture();
  try{
   FirstOrdinalOnboardingDirectorate.standard().onboard();PersonnelDossier parent=outer.getDossier();
   FirstOrdinalOnboardingDirectorate.rehearsal(0,true).inspect("REHEARSAL");assertSame(parent,outer.getDossier());
   PersonnelEvidenceCustody.Capture inner=PersonnelEvidenceCustody.capture();
   try{assertNull(inner.getDossier());try{outer.close();fail();}catch(IllegalStateException expected){}
    FirstOrdinalOnboardingDirectorate.standard().onboard();assertNotSame(parent,inner.getDossier());
   }finally{inner.close();inner.close();}
   assertSame(parent,outer.getDossier());FirstOrdinalOnboardingDirectorate.standard().onboard();assertNotSame(parent,outer.getDossier());
  }finally{outer.close();}
  try(PersonnelEvidenceCustody.Capture fresh=PersonnelEvidenceCustody.capture()){assertNull(fresh.getDossier());}
 }
 @Test public void concurrentCaseReferencesRemainBoundToTheirOwnRequests()throws Exception{
  ExecutorService pool=Executors.newFixedThreadPool(4);
  try{List<Future<String>> results=new ArrayList<Future<String>>();
   for(int i=0;i<100;i++){final String reference="case-"+i;results.add(pool.submit(new Callable<String>(){public String call(){TraceCustody.bind(reference);try(PersonnelEvidenceCustody.Capture capture=PersonnelEvidenceCustody.capture()){FirstOrdinalOnboardingDirectorate.standard().onboard();return capture.getDossier().getCaseId();}finally{TraceCustody.clear();}}}));}
   for(int i=0;i<results.size();i++)assertEquals("HR-case-"+i,results.get(i).get(5,TimeUnit.SECONDS));
  }finally{pool.shutdownNow();}
 }
 @Test public void boundedAndExtendedOriginsAttendHrButArbitraryWindowsDoNot(){
  try(PersonnelEvidenceCustody.Capture capture=PersonnelEvidenceCustody.capture()){
   LoopContext zero=new LoopContext(0);zero.start();assertEquals(1,zero.getControlParameter());assertFalse(zero.shouldProceed());assertTrue(capture.getDossier().isApproved());
  }
  try(PersonnelEvidenceCustody.Capture capture=PersonnelEvidenceCustody.capture()){
   assertEquals("1\n2\nFizz\n",new ExtendedMagnitudeBureau().window(BigInteger.ONE,3));assertTrue(capture.getDossier().isApproved());
  }
  try(PersonnelEvidenceCustody.Capture capture=PersonnelEvidenceCustody.capture()){
   assertEquals("9007199254740994\n",new ExtendedMagnitudeBureau().window(new BigInteger("9007199254740994"),1));assertNull(capture.getDossier());
  }
  try{new ExtendedMagnitudeBureau(new LoopInitializer(){public int getLoopInitializationPoint(){return 2;}}).window(BigInteger.ONE,1);fail();}catch(IllegalStateException expected){}
 }
 @Test public void productionFailureRetainsItsActualRejectedRecord(){
  try(PersonnelEvidenceCustody.Capture capture=PersonnelEvidenceCustody.capture()){
   try{new LoopInitializer(FirstOrdinalOnboardingDirectorate.rehearsal(0,true)).getLoopInitializationPoint();fail();}catch(IllegalStateException expected){}
   assertRejectedAt(capture.getDossier(),2);assertEquals("MANDATE",capture.getDossier().getPurpose());
  }
 }
 @Test public void personnelHeadersContainOnlyAsciiAndFitTheCharter(){
  TraceCustody.bind("0123456789abcdef0123456789abcdef");
  try{String record=FirstOrdinalOnboardingDirectorate.standard().inspect("MANDATE").toJson();assertTrue(record.length()<8192);for(char c:record.toCharArray())assertTrue(c>=32&&c<127);}
  finally{TraceCustody.clear();}
  PersonnelDossier escaped=directorate(new HeadcountPlanningAuthority(){public Vacancy authorize(CaseIdentity s){throw new IllegalStateException("\"HR\"\n\\ anguish \uD83D\uDE31");}},null,null,null,null,null,null).inspect("REHEARSAL");
  assertTrue(escaped.toJson().contains("\\\"HR\\\"\\u000a\\\\ anguish \\ud83d\\ude31"));
 }
 @Test public void springAppointsTheSameSevenContractsAsExplicitBrowserAssembly(){
  ClassPathXmlApplicationContext spring=new ClassPathXmlApplicationContext("spring.xml");
  try{assertEquals(1,spring.getBean(LoopInitializer.class).getLoopInitializationPoint());assertTrue(spring.getBean(FirstOrdinalOnboardingDirectorate.class).inspect("REHEARSAL").isApproved());}
  finally{spring.close();}
 }
 private static void assertRejectedAt(PersonnelDossier dossier,int stage){
  assertFalse(dossier.isApproved());assertEquals(7,dossier.getSteps().size());
  for(int i=0;i<7;i++)assertEquals(i<stage?"APPROVED":i==stage?"REJECTED":"NOT_REACHED",dossier.getSteps().get(i).getState());
 }
 private static FirstOrdinalOnboardingDirectorate directorate(HeadcountPlanningAuthority h,InitialOrdinalRecruiter r,OrdinalIdentityOffice i,OrdinalOfferAuthority o,OrdinalInductionRegistrar d,OrdinalProbationBoard p,CommencementCertificateAuditor a){
  return new FirstOrdinalOnboardingDirectorate(h==null?new OnePositionHeadcountAuthority():h,r==null?new PositionScopedInitialOrdinalRecruiter():r,i==null?new LiteralUnityIdentityOffice():i,o==null?new BindingOrdinalOfferAuthority():o,d==null?new PolicyVersionInductionRegistrar():d,p==null?new EvidenceBasedProbationBoard():p,a==null?new IndependentCommencementAuditor():a);
 }
}
