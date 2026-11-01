package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding;
import org.springframework.stereotype.Service;
import static com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.OnboardingDocuments.*;
@Service
public final class BindingOrdinalOfferAuthority implements OrdinalOfferAuthority {
 public Offer issue(IdentityFinding identity){
  if(identity==null||identity.getApplication()==null||identity.getApplication().getCandidate()!=1)throw new IllegalStateException("An offer requires a verified candidate for the initial ordinal vacancy.");
  return new Offer(identity);
 }
}
