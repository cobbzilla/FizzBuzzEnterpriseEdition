package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.ProclamationNotary;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent.PriorWorkDocuments.*;

/** Published admissibility rules; the production strategies are never invoked here. */
public final class PriorWorkRules {
 public static final int MAX_CHARACTERS=10000;
 private PriorWorkRules(){}
 static void require(boolean condition,String finding){if(!condition)throw new PrecedentRejection(finding);}
 static void admission(Petition p){require(p!=null&&p.body!=null,"No prior text was submitted for admission.");require(p.body.length()<=MAX_CHARACTERS,"The submitted text exceeds the bounded court filing allowance.");}
 static void jurisdiction(Admission a){require(a!=null,"Admission papers are absent.");admission(a.petition);Petition p=a.petition;require(p.requestedLimit>=0&&p.requestedLimit<=1000,"The petition is outside the bounded mandate jurisdiction.");require(p.requestedLimit==p.repositoryLimit,"The prior work belongs to a different mandate key.");}
 static int inventory(Jurisdiction j){
  require(j!=null,"Jurisdiction papers are absent.");jurisdiction(j.admission);Petition p=j.admission.petition;
  String separator=System.getProperty("line.separator");int offset=0,lines=0;
  while(offset<p.body.length()){
   int end=p.body.indexOf(separator,offset);require(end>=offset,"A line lacks its complete platform separator.");
   require(end>offset,"An unauthorized empty line occupies the inventory.");
   lines++;require(lines<=p.requestedLimit,"The inventory contains more lines than the mandate permits.");offset=end+separator.length();
  }
  require(lines==p.requestedLimit,"The inventory does not contain every mandated line.");return lines;
 }
 static void inspect(Inventory i){
  require(i!=null,"Inventory papers are absent.");int actual=inventory(i.jurisdiction);require(i.lines==actual,"The declared inventory differs from the submitted text.");
  String body=i.jurisdiction.admission.petition.body,separator=System.getProperty("line.separator");int offset=0;
  ProclamationNotary notary=new ProclamationNotary();
  for(int ordinal=1;ordinal<=actual;ordinal++){
   int end=body.indexOf(separator,offset)+separator.length();
   try{notary.certify(ordinal,body.substring(offset,end));}catch(IllegalArgumentException failure){throw new PrecedentRejection("Independent lexical inspection rejected ordinal "+ordinal+".");}catch(IllegalStateException failure){throw new PrecedentRejection("Independent lexical inspection rejected ordinal "+ordinal+".");}
   offset=end;
  }
 }
}
