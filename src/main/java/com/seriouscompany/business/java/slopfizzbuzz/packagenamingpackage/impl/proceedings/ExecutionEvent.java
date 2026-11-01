package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings;
/** Immutable evidence of one observed action; ordinals stay decimal strings. */
public final class ExecutionEvent {
 private final String ordinal,kind,office,finding,document;
 public ExecutionEvent(String ordinal,String kind,String office,String finding,String document){this.ordinal=ordinal;this.kind=kind;this.office=office;this.finding=finding;this.document=document;}
 public String getOrdinal(){return ordinal;} public String getKind(){return kind;} public String getOffice(){return office;} public String getFinding(){return finding;} public String getDocument(){return document;}
 public String toJson(){return "{\"ordinal\":"+quote(ordinal)+",\"kind\":"+quote(kind)+",\"office\":"+quote(office)+",\"finding\":"+quote(finding)+",\"document\":"+quote(document)+"}";}
 public static String quote(String value){if(value==null)return "null";StringBuilder out=new StringBuilder("\"");for(int i=0;i<value.length();i++){char c=value.charAt(i);if(c=='"'||c=='\\')out.append('\\').append(c);else if(c<32||c>126){String h=Integer.toHexString(c);out.append("\\u");for(int j=h.length();j<4;j++)out.append('0');out.append(h);}else out.append(c);}return out.append('"').toString();}
}
