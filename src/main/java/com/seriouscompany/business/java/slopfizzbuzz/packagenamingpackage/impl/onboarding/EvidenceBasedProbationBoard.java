package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding;
import org.springframework.stereotype.Service;
import static com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.OnboardingDocuments.*;
@Service
public final class EvidenceBasedProbationBoard implements OrdinalProbationBoard {
 public CommencementCertificate review(Induction induction){
  if(induction==null||!PolicyVersionInductionRegistrar.POLICY.equals(induction.getPolicyVersion()))throw new IllegalStateException("The current induction policy must be recorded.");
  if(!java.util.Arrays.equals(PolicyVersionInductionRegistrar.requiredPolicies(),induction.getAcknowledgments()))throw new IllegalStateException("Induction paperwork is incomplete. The succession and identity policies remain unacknowledged.");
  return new CommencementCertificate(induction,1);
 }
}
