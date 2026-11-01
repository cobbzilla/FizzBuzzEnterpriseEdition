package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding;
import org.springframework.stereotype.Service;
import static com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.OnboardingDocuments.*;
@Service
public final class IndependentCommencementAuditor implements CommencementCertificateAuditor {
 public int authorize(CaseFile file){
  if(file==null||file.getScope()==null||file.getVacancy()==null||file.getApplication()==null||file.getIdentity()==null||file.getOffer()==null||file.getInduction()==null||file.getCertificate()==null)throw new IllegalStateException("The personnel file is incomplete.");
  if(file.getVacancy().getScope()!=file.getScope()||file.getApplication().getVacancy()!=file.getVacancy()||file.getIdentity().getApplication()!=file.getApplication()||file.getOffer().getIdentity()!=file.getIdentity()||file.getInduction().getOffer()!=file.getOffer()||file.getCertificate().getInduction()!=file.getInduction())throw new IllegalStateException("A document belongs to another vacancy, applicant or offer.");
  if(file.getVacancy().getPositions()!=1||!"Initial ordinal".equals(file.getVacancy().getRole())||file.getApplication().getCandidate()!=1||file.getCertificate().getOrdinal()!=1)throw new IllegalStateException("The initial ordinal position authorizes exactly 1.");
  if(!"INITIAL-ORDINAL-HANDBOOK/v1".equals(file.getInduction().getPolicyVersion())||!java.util.Arrays.equals(new String[]{"ONE_MEANS_ONE","START_BEFORE_SUCCESSION","DO_NOT_IMPERSONATE_ZERO"},file.getInduction().getAcknowledgments()))throw new IllegalStateException("The independent audit rejected the induction evidence.");
  return file.getCertificate().getOrdinal();
 }
}
