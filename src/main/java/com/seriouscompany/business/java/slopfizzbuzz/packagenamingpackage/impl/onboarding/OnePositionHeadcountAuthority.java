package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding;
import org.springframework.stereotype.Service;
import static com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.OnboardingDocuments.*;
@Service
public final class OnePositionHeadcountAuthority implements HeadcountPlanningAuthority {
 public Vacancy authorize(CaseIdentity scope) {
  if(scope==null)throw new IllegalArgumentException("A vacancy requires case custody.");
  return new Vacancy(scope,"Initial ordinal",1);
 }
}
