package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding;

import static com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.OnboardingDocuments.*;

/** The same hostile personnel review runs on the JVM and both browser compilers. */
public final class PersonnelObjectionTribunal {
 private PersonnelObjectionTribunal(){}
 public static int rehearse(){
  int checks=0;
  for(int candidate=-50;candidate<=50;candidate++){
   PersonnelDossier result=FirstOrdinalOnboardingDirectorate.rehearsal(candidate,true).inspect("REHEARSAL");
   require(result.isApproved()==(candidate==1),"candidate census "+candidate);checks++;
   if(candidate!=1){require("REJECTED".equals(result.getSteps().get(2).getState()),"identity veto");require("NOT_REACHED".equals(result.getSteps().get(6).getState()),"no retrospective audit approval");}
  }
  PersonnelDossier incomplete=FirstOrdinalOnboardingDirectorate.rehearsal(1,false).inspect("REHEARSAL");
  require(!incomplete.isApproved()&&"REJECTED".equals(incomplete.getSteps().get(5).getState()),"induction veto");checks++;
  for(int fault=0;fault<23;fault++){
   CaseFile file=specimen(fault);
   boolean rejected=false;try{new IndependentCommencementAuditor().authorize(file);}catch(IllegalStateException expected){rejected=true;}
   require(rejected,"forged personnel file "+fault);checks++;
  }
  require(new IndependentCommencementAuditor().authorize(specimen(-1))==1,"legitimate specimen");checks++;
  final Vacancy foreign=new Vacancy(new CaseIdentity("borrowed"),"Initial ordinal",1);
  FirstOrdinalOnboardingDirectorate borrower=new FirstOrdinalOnboardingDirectorate(new OnePositionHeadcountAuthority(),new InitialOrdinalRecruiter(){public Application nominate(Vacancy vacancy){return new Application(foreign,1);}},new LiteralUnityIdentityOffice(),new BindingOrdinalOfferAuthority(),new PolicyVersionInductionRegistrar(),new EvidenceBasedProbationBoard(),new IndependentCommencementAuditor());
  PersonnelDossier result=borrower.inspect("REHEARSAL");require(!result.isApproved()&&"REJECTED".equals(result.getSteps().get(1).getState()),"vacancy transfer veto");checks++;
  try(PersonnelEvidenceCustody.Capture capture=PersonnelEvidenceCustody.capture()){
   require(new com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.loop.LoopInitializer().getLoopInitializationPoint()==1,"real origin");
   require(capture.getDossier()!=null&&"MANDATE".equals(capture.getDossier().getPurpose()),"real origin evidence");checks++;
  }
  return checks;
 }
 /** Independently forged specimens cover each linkage and each prerequisite. */
 public static CaseFile specimen(int fault){
  CaseIdentity scope=new CaseIdentity("same-public-reference");
  Vacancy vacancy=new Vacancy(fault==0?new CaseIdentity(scope.getReference()):scope,fault==6?"Executive ordinal":"Initial ordinal",fault==7?2:1);
  Application application=new Application(fault==1?new Vacancy(scope,"Initial ordinal",1):vacancy,fault==8?0:1);
  IdentityFinding identity=new IdentityFinding(fault==2?new Application(vacancy,1):application);
  Offer offer=new Offer(fault==3?new IdentityFinding(application):identity);
  String[] acknowledgments={"ONE_MEANS_ONE","START_BEFORE_SUCCESSION","DO_NOT_IMPERSONATE_ZERO"};
  if(fault==10)acknowledgments=new String[]{"ONE_MEANS_ONE"};
  if(fault==11)acknowledgments=new String[]{"START_BEFORE_SUCCESSION","ONE_MEANS_ONE","DO_NOT_IMPERSONATE_ZERO"};
  if(fault==12)acknowledgments=new String[]{"ONE_MEANS_ONE","ONE_MEANS_ONE","DO_NOT_IMPERSONATE_ZERO"};
  if(fault==13)acknowledgments=null;
  Induction induction=new Induction(fault==4?new Offer(identity):offer,fault==9?"INITIAL-ORDINAL-HANDBOOK/v0":"INITIAL-ORDINAL-HANDBOOK/v1",acknowledgments);
  CommencementCertificate certificate=new CommencementCertificate(fault==5?new Induction(offer,"INITIAL-ORDINAL-HANDBOOK/v1",acknowledgments):induction,fault==14?2:1);
  if(fault==15)return null;
  return new CaseFile(fault==16?null:scope,fault==17?null:vacancy,fault==18?null:application,fault==19?null:identity,fault==20?null:offer,fault==21?null:induction,fault==22?null:certificate);
 }
 private static void require(boolean pass,String finding){if(!pass)throw new IllegalStateException("Personnel objection failed: "+finding);}
}
