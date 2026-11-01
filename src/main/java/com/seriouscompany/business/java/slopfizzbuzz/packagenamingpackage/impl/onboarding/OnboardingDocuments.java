package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding;

/** Immutable paperwork. Object identity binds a document to the actual preceding record. */
public final class OnboardingDocuments {
 private OnboardingDocuments() {}
 public static final class CaseIdentity {
  private final String reference;
  public CaseIdentity(String reference) {
   this.reference = reference;
  }
  public String getReference() { return reference; }
 }
 public static final class Vacancy {
  private final CaseIdentity scope;
  private final String role;
  private final int positions;
  public Vacancy(CaseIdentity scope, String role, int positions) {
   this.scope = scope;
   this.role = role;
   this.positions = positions;
  }
  public CaseIdentity getScope() { return scope; }
  public String getRole() { return role; }
  public int getPositions() { return positions; }
 }
 public static final class Application {
  private final Vacancy vacancy;
  private final int candidate;
  public Application(Vacancy vacancy, int candidate) {
   this.vacancy = vacancy;
   this.candidate = candidate;
  }
  public Vacancy getVacancy() { return vacancy; }
  public int getCandidate() { return candidate; }
 }
 public static final class IdentityFinding {
  private final Application application;
  public IdentityFinding(Application application) {
   this.application = application;
  }
  public Application getApplication() { return application; }
 }
 public static final class Offer {
  private final IdentityFinding identity;
  public Offer(IdentityFinding identity) {
   this.identity = identity;
  }
  public IdentityFinding getIdentity() { return identity; }
 }
 public static final class Induction {
  private final Offer offer;
  private final String policyVersion;
  private final String[] acknowledgments;
  public Induction(Offer offer, String policyVersion, String[] acknowledgments) {
   this.offer = offer;
   this.policyVersion = policyVersion;
   this.acknowledgments = acknowledgments == null ? null : acknowledgments.clone();
  }
  public Offer getOffer() { return offer; }
  public String getPolicyVersion() { return policyVersion; }
  public String[] getAcknowledgments() { return acknowledgments == null ? null : acknowledgments.clone(); }
 }
 public static final class CommencementCertificate {
  private final Induction induction;
  private final int ordinal;
  public CommencementCertificate(Induction induction, int ordinal) {
   this.induction = induction;
   this.ordinal = ordinal;
  }
  public Induction getInduction() { return induction; }
  public int getOrdinal() { return ordinal; }
 }
 public static final class CaseFile {
  private final CaseIdentity scope;
  private final Vacancy vacancy;
  private final Application application;
  private final IdentityFinding identity;
  private final Offer offer;
  private final Induction induction;
  private final CommencementCertificate certificate;
  public CaseFile(CaseIdentity scope, Vacancy vacancy, Application application, IdentityFinding identity, Offer offer, Induction induction, CommencementCertificate certificate) {
   this.scope = scope;
   this.vacancy = vacancy;
   this.application = application;
   this.identity = identity;
   this.offer = offer;
   this.induction = induction;
   this.certificate = certificate;
  }
  public CaseIdentity getScope() { return scope; }
  public Vacancy getVacancy() { return vacancy; }
  public Application getApplication() { return application; }
  public IdentityFinding getIdentity() { return identity; }
  public Offer getOffer() { return offer; }
  public Induction getInduction() { return induction; }
  public CommencementCertificate getCertificate() { return certificate; }
 }
}
