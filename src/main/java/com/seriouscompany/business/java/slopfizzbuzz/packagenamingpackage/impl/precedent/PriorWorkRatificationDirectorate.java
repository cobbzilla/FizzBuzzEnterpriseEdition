package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent.PriorWorkDocuments.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent.PrecedentDossier.Decision;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings.ExecutionCustody;

/** Five real offices convene before the company is licensed to do no new numerical work. */
@Service public final class PriorWorkRatificationDirectorate {
 private final PrecedentAdmissionOffice admission;private final MandateJurisdictionChamber jurisdiction;private final CompletenessInventoryOffice inventory;private final IndependentLexicalBench lexical;private final NonPerformanceLicensingAuthority licensing;
 private static final String[] OFFICES={"Precedent Admission Office","Mandate Jurisdiction Chamber","Completeness Inventory Office","Independent Lexical Bench","Non-Performance Licensing Authority"};
 private static final String[] RULES={"Prior text must exist within the bounded filing allowance.","The requested mandate and repository key must agree within 0 through 1000.","Every mandated line, and only that line inventory, must have its exact platform separator.","The independent proclamation notary must certify every ordinal and exact text.","All papers must form one valid case before reuse is licensed."};
 @Autowired public PriorWorkRatificationDirectorate(PrecedentAdmissionOffice admission,MandateJurisdictionChamber jurisdiction,CompletenessInventoryOffice inventory,IndependentLexicalBench lexical,NonPerformanceLicensingAuthority licensing){this.admission=admission;this.jurisdiction=jurisdiction;this.inventory=inventory;this.lexical=lexical;this.licensing=licensing;}
 public static PriorWorkRatificationDirectorate standard(){return new PriorWorkRatificationDirectorate(new BoundedPrecedentAdmissionOffice(),new ExactMandateJurisdictionChamber(),new CompleteLineInventoryOffice(),new NotarialIndependentLexicalBench(),new IndependentlyAuditedNonPerformanceAuthority());}
 public PrecedentDossier inspect(Petition petition,String purpose){
  if(petition==null)throw new IllegalArgumentException("A court case requires its petition.");
  if(!"MANDATE".equals(purpose)&&!"REHEARSAL".equals(purpose))throw new IllegalArgumentException("Unknown court purpose.");
  List<Decision> steps=new ArrayList<Decision>();int stage=0;License license=null;
  try{
   Admission a=admission.admit(petition);PriorWorkRules.require(a!=null&&a.petition==petition,"Admission papers were borrowed from another petition.");
   add(steps,stage++,"APPROVED","Repository candidate","Admitted "+petition.body.length()+" characters. Repository availability and expiry remain the provider's responsibility.","ADMISSION / "+petition.caseId());
   Jurisdiction j=jurisdiction.review(a);PriorWorkRules.require(j!=null&&j.admission==a,"Jurisdiction papers refer to a different admission.");
   add(steps,stage++,"APPROVED","Requested "+petition.requestedLimit+"; repository key "+petition.repositoryLimit,"The repository key belongs to this exact mandate.","JURISDICTION / "+petition.caseId());
   Inventory i=inventory.count(j);PriorWorkRules.require(i!=null&&i.jurisdiction==j,"Inventory papers refer to a different jurisdiction.");
   add(steps,stage++,"APPROVED","Jurisdiction certificate","Inventoried exactly "+i.lines+" complete lines, with no missing or additional premises.","INVENTORY / "+i.lines+" lines");
   Inspection x=lexical.inspect(i);PriorWorkRules.require(x!=null&&x.inventory==i,"Lexical papers refer to a different inventory.");
   add(steps,stage++,"APPROVED","Line inventory","Independently notarized all "+i.lines+" ordinal-bound lines without invoking production strategies.","LEXICAL CLEARANCE / "+petition.caseId());
   license=licensing.authorize(x);PriorWorkRules.require(license!=null&&license.inspection==x,"The reuse license belongs to a different inspection.");
   // Enforce public invariants even if a replaceable licensing provider issues an attractive forgery.
   PriorWorkRules.inspect(license.inspection.inventory);
   add(steps,stage++,"APPROVED","Bound admission, jurisdiction, inventory and lexical papers","Reuse authorized. No new recruitment, glyph production or numerical audit transaction is required.","Certificate of Authorized Non-Performance / "+petition.caseId()+" / "+i.lines+" lines");
  }catch(PrecedentRejection rejected){license=null;add(steps,stage++,"REJECTED","Current case papers",rejected.getMessage(),"No authority to reuse was issued.");}
  while(stage<5)add(steps,stage++,"NOT_REACHED","No approved predecessor","This office did not convene after the preceding objection.","No document issued.");
  return new PrecedentDossier(purpose,petition,license,steps);
 }
 private static void add(List<Decision> steps,int stage,String state,String received,String finding,String document){Decision decision=new Decision(OFFICES[stage],state,RULES[stage],received,finding,document);steps.add(decision);if(!"NOT_REACHED".equals(state))ExecutionCustody.record("PRECEDENT_"+state,decision.office,decision.finding,decision.document);}
 public static PrecedentDossier rehearse(String scenario){
  String separator=System.getProperty("line.separator"),body="1"+separator+"2"+separator+"Fizz"+separator+"4"+separator+"Buzz"+separator+"Fizz"+separator+"7"+separator+"8"+separator+"Fizz"+separator+"Buzz"+separator+"11"+separator+"Fizz"+separator+"13"+separator+"14"+separator+"FizzBuzz"+separator;
  int limit=15,key=15;
  if("wrong-mandate".equals(scenario))key=14;
  else if("missing-line".equals(scenario))body=body.substring(0,body.lastIndexOf("FizzBuzz"));
  else if("lowercase-fizz".equals(scenario))body=body.replace("Fizz","fizz");
  else if("zero".equals(scenario)){limit=0;key=0;body="";}
  else if(!"approved".equals(scenario))throw new IllegalArgumentException("Unknown precedent rehearsal.");
  return standard().inspect(new Petition(limit,key,body),"REHEARSAL");
 }
}
