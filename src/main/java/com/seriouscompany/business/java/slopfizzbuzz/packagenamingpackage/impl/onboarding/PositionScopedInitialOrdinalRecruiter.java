package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding;
import org.springframework.stereotype.Service;
import static com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.OnboardingDocuments.*;
@Service
public final class PositionScopedInitialOrdinalRecruiter implements InitialOrdinalRecruiter {
 private final int candidate;
 public PositionScopedInitialOrdinalRecruiter(){this(1);}
 public PositionScopedInitialOrdinalRecruiter(int candidate){this.candidate=candidate;}
 public Application nominate(Vacancy vacancy){
  if(vacancy==null||vacancy.getPositions()!=1||!"Initial ordinal".equals(vacancy.getRole()))throw new IllegalStateException("Exactly one initial ordinal position must be funded.");
  return new Application(vacancy,candidate);
 }
}
