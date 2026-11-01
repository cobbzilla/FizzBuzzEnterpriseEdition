package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding;

/** One immutable office ruling, including its human-readable document. */
public final class PersonnelDecision {
 private final String office, state, rule, received, finding, document;
 public PersonnelDecision(String office,String state,String rule,String received,String finding,String document){
  this.office=office;this.state=state;this.rule=rule;this.received=received;this.finding=finding;this.document=document;
 }
 public String getOffice(){return office;}
 public String getState(){return state;}
 public String getRule(){return rule;}
 public String getReceived(){return received;}
 public String getFinding(){return finding;}
 public String getDocument(){return document;}
 public String toJson(){return "{\"office\":"+quote(office)+",\"state\":"+quote(state)+",\"rule\":"+quote(rule)+",\"received\":"+quote(received)+",\"finding\":"+quote(finding)+",\"document\":"+quote(document)+"}";}
 static String quote(String value){
  StringBuilder out=new StringBuilder("\"");
  for(int i=0;i<value.length();i++){
   char c=value.charAt(i);
   if(c=='"'||c=='\\')out.append('\\').append(c);
   else if(c<32||c>126){String hex=Integer.toHexString(c);out.append("\\u");for(int j=hex.length();j<4;j++)out.append('0');out.append(hex);}
   else out.append(c);
  }
  return out.append('"').toString();
 }
}
