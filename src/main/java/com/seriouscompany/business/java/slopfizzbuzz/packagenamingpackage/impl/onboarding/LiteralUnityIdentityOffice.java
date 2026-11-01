package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding;
import org.springframework.stereotype.Service;
import static com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.OnboardingDocuments.*;
@Service
public final class LiteralUnityIdentityOffice implements OrdinalIdentityOffice {
 public IdentityFinding verify(Application application){
  if(application==null)throw new IllegalStateException("An applicant must be nominated.");
  if(application.getCandidate()!=1)throw new IllegalStateException(application.getCandidate()==0?"Candidate zero demonstrates insufficient initiative. The first ordinal must equal 1.":"Candidate "+application.getCandidate()+" exceeds the position's numerical remit. The first ordinal must equal 1.");
  return new IdentityFinding(application);
 }
}
