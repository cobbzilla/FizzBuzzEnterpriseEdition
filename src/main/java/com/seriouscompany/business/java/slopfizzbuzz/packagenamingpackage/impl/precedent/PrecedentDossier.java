package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent;
import java.util.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings.ExecutionEvent;

/** Current reuse proceedings, never a reconstructed history of producing the cached text. */
public final class PrecedentDossier {
 public static final class Decision {
  public final String office,state,rule,received,finding,document;
  public Decision(String office,String state,String rule,String received,String finding,String document){this.office=office;this.state=state;this.rule=rule;this.received=received;this.finding=finding;this.document=document;}
  String toJson(){return "{\"office\":"+q(office)+",\"state\":"+q(state)+",\"rule\":"+q(rule)+",\"received\":"+q(received)+",\"finding\":"+q(finding)+",\"document\":"+q(document)+"}";}
 }
 private final String purpose;private final PriorWorkDocuments.Petition petition;private final PriorWorkDocuments.License license;private final List<Decision> steps;
 PrecedentDossier(String purpose,PriorWorkDocuments.Petition petition,PriorWorkDocuments.License license,List<Decision> steps){this.purpose=purpose;this.petition=petition;this.license=license;this.steps=Collections.unmodifiableList(new ArrayList<Decision>(steps));}
 public boolean isApproved(){return license!=null;}
 public List<Decision> getSteps(){return steps;}
 public String authorizedBody(){if(!isApproved())throw new IllegalStateException("Reuse has no license.");return petition.body;}
 public String toJson(){StringBuilder out=new StringBuilder("{\"schema\":\"slopbuzz-precedent/v1\",\"caseId\":").append(q(petition.caseId())).append(",\"purpose\":").append(q(purpose)).append(",\"limit\":").append(petition.requestedLimit).append(",\"repositoryLimit\":").append(petition.repositoryLimit).append(",\"bodyCharacters\":").append(petition.body==null?0:petition.body.length()).append(",\"certifiedLines\":").append(isApproved()?String.valueOf(license.inspection.inventory.lines):"null").append(",\"status\":").append(q(isApproved()?"APPROVED":"REJECTED")).append(",\"steps\":[");for(int i=0;i<steps.size();i++){if(i>0)out.append(',');out.append(steps.get(i).toJson());}return out.append("]}").toString();}
 private static String q(String value){return ExecutionEvent.quote(value);}
}
