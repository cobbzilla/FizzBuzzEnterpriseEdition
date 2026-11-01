package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding;
import org.springframework.stereotype.Service;
import static com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.OnboardingDocuments.*;
@Service
public final class PolicyVersionInductionRegistrar implements OrdinalInductionRegistrar {
 public static final String POLICY="INITIAL-ORDINAL-HANDBOOK/v1";
 private final boolean complete;
 public PolicyVersionInductionRegistrar(){this(true);}
 public PolicyVersionInductionRegistrar(boolean complete){this.complete=complete;}
 public static String[] requiredPolicies(){return new String[]{"ONE_MEANS_ONE","START_BEFORE_SUCCESSION","DO_NOT_IMPERSONATE_ZERO"};}
 public Induction induct(Offer offer){
  if(offer==null)throw new IllegalStateException("Induction requires an issued offer.");
  return new Induction(offer,POLICY,complete?requiredPolicies():new String[]{"ONE_MEANS_ONE"});
 }
}
