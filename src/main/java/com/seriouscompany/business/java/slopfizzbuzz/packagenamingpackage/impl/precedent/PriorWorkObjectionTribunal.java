package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent.PriorWorkDocuments.*;

/** Hostile case files are tried by the JVM and both browser compilers. */
public final class PriorWorkObjectionTribunal {
 private PriorWorkObjectionTribunal(){}
 private static void require(boolean condition,String name){if(!condition)throw new IllegalStateException("Prior work tribunal failed: "+name);}
 private static String specimen(int limit){StringBuilder text=new StringBuilder();for(int n=1;n<=limit;n++){text.append(n%15==0?"FizzBuzz":n%3==0?"Fizz":n%5==0?"Buzz":String.valueOf(n)).append(System.getProperty("line.separator"));}return text.toString();}
 public static int rehearse(){
  int checks=0;PriorWorkRatificationDirectorate court=PriorWorkRatificationDirectorate.standard();
  for(int n=0;n<=30;n++){
   String body=specimen(n);PrecedentDossier good=court.inspect(new Petition(n,n,body),"REHEARSAL");require(good.isApproved()&&body.equals(good.authorizedBody()),"approved "+n);checks++;
   require(!court.inspect(new Petition(n,n+1,body),"REHEARSAL").isApproved(),"wrong jurisdiction "+n);checks++;
   require(!court.inspect(new Petition(n,n,body+System.getProperty("line.separator")),"REHEARSAL").isApproved(),"extra empty line "+n);checks++;
  }
  String valid=specimen(3),separator=System.getProperty("line.separator"),otherSeparator="\n".equals(separator)?"\r\n":"\n";
  for(String bad:new String[]{null,"",valid.replace("Fizz","fizz"),valid.replace("Fizz","Buzz"),valid.replace("1","9"),valid.substring(0,valid.length()-separator.length()),valid+"4"+separator,valid.replace(separator,otherSeparator)}){require(!court.inspect(new Petition(3,3,bad),"REHEARSAL").isApproved(),"bad candidate");checks++;}
  StringBuilder oversized=new StringBuilder();for(int n=0;n<=PriorWorkRules.MAX_CHARACTERS;n++)oversized.append('x');require(!court.inspect(new Petition(3,3,oversized.toString()),"REHEARSAL").isApproved(),"oversized papers");checks++;
  for(int fault=0;fault<12;fault++){PrecedentDossier result=forgedCourt(fault).inspect(new Petition(3,3,specimen(3)),"REHEARSAL");require(!result.isApproved(),"forged office "+fault);checks++;}
  PriorWorkRatificationDirectorate rubberStamp=new PriorWorkRatificationDirectorate(new BoundedPrecedentAdmissionOffice(),new ExactMandateJurisdictionChamber(),new CompleteLineInventoryOffice(),new IndependentLexicalBench(){public Inspection inspect(Inventory i){return new Inspection(i);}},new NonPerformanceLicensingAuthority(){public License authorize(Inspection i){return new License(i);}});
  require(!rubberStamp.inspect(new Petition(3,3,valid.replace("Fizz","fizz")),"REHEARSAL").isApproved(),"independent final barrier");checks++;
  for(String scenario:new String[]{"approved","zero","wrong-mandate","missing-line","lowercase-fizz"}){PrecedentDossier d=PriorWorkRatificationDirectorate.rehearse(scenario);require(d.isApproved()==("approved".equals(scenario)||"zero".equals(scenario)),"scenario "+scenario);checks++;}
  return checks;
 }
 public static PriorWorkRatificationDirectorate forgedCourt(final int fault){
  final Petition foreign=new Petition(3,3,specimen(3));final Admission a=new Admission(foreign);final Jurisdiction j=new Jurisdiction(a);final Inventory i=new Inventory(j,3);final Inspection x=new Inspection(i);
  return new PriorWorkRatificationDirectorate(
   new PrecedentAdmissionOffice(){public Admission admit(Petition p){return fault==0?null:fault==5?a:new BoundedPrecedentAdmissionOffice().admit(p);}},
   new MandateJurisdictionChamber(){public Jurisdiction review(Admission input){return fault==1?null:fault==6?j:new ExactMandateJurisdictionChamber().review(input);}},
   new CompletenessInventoryOffice(){public Inventory count(Jurisdiction input){return fault==2?null:fault==7?i:fault==10?new Inventory(input,2):fault==11?new Inventory(input,4):new CompleteLineInventoryOffice().count(input);}},
   new IndependentLexicalBench(){public Inspection inspect(Inventory input){return fault==3?null:fault==8?x:new NotarialIndependentLexicalBench().inspect(input);}},
   new NonPerformanceLicensingAuthority(){public License authorize(Inspection input){return fault==4?null:fault==9?new License(x):new IndependentlyAuditedNonPerformanceAuthority().authorize(input);}}
  );
 }
}
