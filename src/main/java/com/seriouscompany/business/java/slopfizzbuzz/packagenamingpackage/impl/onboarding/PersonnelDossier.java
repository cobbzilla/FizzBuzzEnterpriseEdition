package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/** A response-local record of authorities actually called; never a global last result. */
public final class PersonnelDossier {
 private final String caseId,purpose,status;
 private final int candidate;
 private final Integer startingOrdinal;
 private final List<PersonnelDecision> steps;
 PersonnelDossier(String caseId,String purpose,int candidate,Integer startingOrdinal,List<PersonnelDecision> steps){
  this.caseId=caseId;this.purpose=purpose;this.candidate=candidate;this.startingOrdinal=startingOrdinal;this.status=startingOrdinal!=null?"APPROVED":"REJECTED";
  this.steps=Collections.unmodifiableList(new ArrayList<PersonnelDecision>(steps));
 }
 public String getCaseId(){return caseId;}
 public String getPurpose(){return purpose;}
 public String getStatus(){return status;}
 public int getCandidate(){return candidate;}
 public List<PersonnelDecision> getSteps(){return steps;}
 public boolean isApproved(){return "APPROVED".equals(status);}
 public int obtainAuthorizedOrdinal(){if(!isApproved())throw new IllegalStateException("The candidate has no commencement clearance.");return startingOrdinal.intValue();}
 public String toJson(){
  StringBuilder out=new StringBuilder("{\"schema\":\"slopbuzz-onboarding/v1\",\"caseId\":").append(PersonnelDecision.quote(caseId))
   .append(",\"purpose\":").append(PersonnelDecision.quote(purpose)).append(",\"candidate\":").append(candidate)
   .append(",\"status\":").append(PersonnelDecision.quote(status)).append(",\"startingOrdinal\":").append(startingOrdinal==null?"null":startingOrdinal.toString()).append(",\"steps\":[");
  for(int i=0;i<steps.size();i++){if(i>0)out.append(',');out.append(steps.get(i).toJson());}
  return out.append("]}").toString();
 }
}
