package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings.ExecutionCustody;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.TraceCustody;
import static com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.OnboardingDocuments.*;

/** Seven swappable offices must convene before the company obtains the literal one. */
@Service
public final class FirstOrdinalOnboardingDirectorate {
 private static final String[] OFFICES={"Headcount Planning","Recruitment","Identity Office","Offer Authority","Induction","Probation Review","Independent Audit"};
 private static final String[] RULES={"Fund exactly one initial ordinal position.","Nominate an applicant for this vacancy.","The initial ordinal must equal 1.","Bind the offer to the verified applicant.","Record the current handbook and required acknowledgments.","Require complete induction before commencement.","Verify every document belongs to this case and authorizes 1."};
 private final HeadcountPlanningAuthority headcount;
 private final InitialOrdinalRecruiter recruiter;
 private final OrdinalIdentityOffice identity;
 private final OrdinalOfferAuthority offers;
 private final OrdinalInductionRegistrar induction;
 private final OrdinalProbationBoard probation;
 private final CommencementCertificateAuditor auditor;
 @Autowired public FirstOrdinalOnboardingDirectorate(HeadcountPlanningAuthority headcount,InitialOrdinalRecruiter recruiter,OrdinalIdentityOffice identity,OrdinalOfferAuthority offers,OrdinalInductionRegistrar induction,OrdinalProbationBoard probation,CommencementCertificateAuditor auditor){
  this.headcount=headcount;this.recruiter=recruiter;this.identity=identity;this.offers=offers;this.induction=induction;this.probation=probation;this.auditor=auditor;
 }
 public static FirstOrdinalOnboardingDirectorate standard(){return rehearsal(1,true);}
 public static FirstOrdinalOnboardingDirectorate rehearsal(int candidate,boolean complete){
  return new FirstOrdinalOnboardingDirectorate(new OnePositionHeadcountAuthority(),new PositionScopedInitialOrdinalRecruiter(candidate),new LiteralUnityIdentityOffice(),new BindingOrdinalOfferAuthority(),new PolicyVersionInductionRegistrar(complete),new EvidenceBasedProbationBoard(),new IndependentCommencementAuditor());
 }
 public int onboard(){
  PersonnelDossier dossier=inspect("MANDATE");PersonnelEvidenceCustody.record(dossier);
  if(!dossier.isApproved())throw new IllegalStateException("Initial ordinal onboarding was rejected.");
  return dossier.obtainAuthorizedOrdinal();
 }
 public PersonnelDossier inspect(String purpose){
  if(!"MANDATE".equals(purpose)&&!"REHEARSAL".equals(purpose))throw new IllegalArgumentException("Unrecognized personnel purpose.");
  ExecutionCustody.ordinal("1");
  CaseIdentity scope=new CaseIdentity("HR-"+TraceCustody.currentTraceId());
  List<PersonnelDecision> decisions=new ArrayList<PersonnelDecision>();int stage=0,candidate=1;String received="Initial ordinal vacancy request";
  try {
   Vacancy vacancy=headcount.authorize(scope);
   if(vacancy==null||vacancy.getScope()!=scope||vacancy.getPositions()!=1||!"Initial ordinal".equals(vacancy.getRole()))throw new IllegalStateException("Headcount authorization does not belong to this one-position request.");
   pass(decisions,stage++,received,"One initial ordinal position funded.","Headcount requisition: role Initial ordinal; positions 1.");
   received="Funded vacancy for Initial ordinal";Application application=recruiter.nominate(vacancy);
   if(application==null||application.getVacancy()!=vacancy)throw new IllegalStateException("The application belongs to another vacancy.");candidate=application.getCandidate();
   pass(decisions,stage++,received,"Candidate "+candidate+" nominated.","Application: candidate "+candidate+"; vacancy bound to this case.");
   received="Candidate "+candidate;IdentityFinding finding=identity.verify(application);
   if(finding==null||finding.getApplication()!=application)throw new IllegalStateException("The identity finding belongs to another applicant.");
   pass(decisions,stage++,received,"Candidate is exactly one.","Identity finding: application verified for the first ordinal position.");
   received="Verified candidate "+candidate;Offer offer=offers.issue(finding);
   if(offer==null||offer.getIdentity()!=finding)throw new IllegalStateException("The offer belongs to another identity finding.");
   pass(decisions,stage++,received,"Offer issued to this vacancy's candidate.","Offer letter: Initial ordinal; assigned starting position 1.");
   received="Offer for the Initial ordinal position";Induction record=induction.induct(offer);
   if(record==null||record.getOffer()!=offer)throw new IllegalStateException("The induction record belongs to another offer.");
   String[] acknowledgments=record.getAcknowledgments();
   pass(decisions,stage++,received,"Policy evidence recorded for probation review.","Handbook: "+record.getPolicyVersion()+". Acknowledgments: "+(acknowledgments==null?"none":join(acknowledgments))+".");
   received="Recorded induction evidence";CommencementCertificate certificate=probation.review(record);
   if(certificate==null||certificate.getInduction()!=record)throw new IllegalStateException("The commencement certificate belongs to another induction record.");
   pass(decisions,stage++,received,"Induction prerequisites satisfied.","Commencement certificate: requested ordinal "+certificate.getOrdinal()+".");
   received="Complete personnel file";int ordinal=auditor.authorize(new CaseFile(scope,vacancy,application,finding,offer,record,certificate));
   if(ordinal!=1)throw new IllegalStateException("The independent auditor returned an unauthorized ordinal.");
   pass(decisions,stage++,received,"Approved to start at 1.","Independent audit: matching case custody, complete induction, starting ordinal 1.");
   return new PersonnelDossier(scope.getReference(),purpose,candidate,Integer.valueOf(ordinal),decisions);
  }catch(RuntimeException rejection){
   ExecutionCustody.record("HR_REJECTED",OFFICES[stage],rejection.getMessage()==null?"The office could not issue a valid decision.":rejection.getMessage());
   decisions.add(new PersonnelDecision(OFFICES[stage],"REJECTED",RULES[stage],received,rejection.getMessage()==null?"The office could not issue a valid decision.":rejection.getMessage(),"Rejection notice: no commencement authorization issued by this office."));
   for(int i=stage+1;i<OFFICES.length;i++)decisions.add(new PersonnelDecision(OFFICES[i],"NOT_REACHED",RULES[i],"No authorized handoff","An earlier office rejected the application.","No document was issued."));
   return new PersonnelDossier(scope.getReference(),purpose,candidate,null,decisions);
  }
 }
 private static void pass(List<PersonnelDecision> decisions,int stage,String received,String finding,String document){ExecutionCustody.record("HR_APPROVED",OFFICES[stage],finding,document);decisions.add(new PersonnelDecision(OFFICES[stage],"APPROVED",RULES[stage],received,finding,document));}
 private static String join(String[] values){StringBuilder out=new StringBuilder();for(int i=0;i<values.length;i++){if(i>0)out.append(", ");out.append(values[i]);}return out.toString();}
}
