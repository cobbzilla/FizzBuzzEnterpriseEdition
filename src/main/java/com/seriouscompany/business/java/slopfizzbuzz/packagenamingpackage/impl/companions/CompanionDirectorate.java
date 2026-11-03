package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.companions;
import java.math.BigInteger;import java.util.*;
@org.springframework.stereotype.Service public final class CompanionDirectorate {
 private final EmojiCatalog catalog;private final FactorProfileOffice factors;private final Map<String,EmojiAssignmentStrategy> strategies=new TreeMap<String,EmojiAssignmentStrategy>();
 @org.springframework.beans.factory.annotation.Autowired public CompanionDirectorate(EmojiCatalog catalog,FactorProfileOffice factors,java.util.List<EmojiAssignmentStrategy> policies){if(catalog==null||factors==null||policies==null||policies.isEmpty())throw new IllegalArgumentException("The directorate requires its actual providers.");this.catalog=catalog;this.factors=factors;for(EmojiAssignmentStrategy p:policies){if(p==null||p.id()==null||strategies.put(p.id(),p)!=null)throw new IllegalArgumentException("Duplicate or absent companion policy.");}}
 public static CompanionDirectorate standard(){return new CompanionDirectorate(new ConstantEmojiCatalog(),new BoundedPrimeFactorOffice(),Arrays.<EmojiAssignmentStrategy>asList(new FactorResonanceStrategy(),new OrdinalConstellationStrategy()));}
 public String catalogJson(){StringBuilder b=new StringBuilder("{\"schema\":\"slopbuzz-companions/v1\",\"version\":"+Companion.q(catalog.version())+",\"tickets\":1000000000,\"entries\":[");for(Companion c:catalog.entries()){if(b.charAt(b.length()-1)!='[')b.append(',');b.append(c.toJson());}return b.append("]}").toString();}
 public String strategiesJson(){StringBuilder b=new StringBuilder("{\"strategies\":[");for(EmojiAssignmentStrategy s:strategies.values()){if(b.charAt(b.length()-1)!='[')b.append(',');b.append("{\"id\":").append(Companion.q(s.id())).append(",\"name\":").append(Companion.q(s.name())).append(",\"explanation\":").append(Companion.q(s.explanation())).append('}');}return b.append("]}").toString();}
 public String window(BigInteger start,int count,String policy){return window(start,count,policy,null);}
 /** A null seed retains the original charter. A supplied exact mandate adds a reproducible namespace. */
 public String window(BigInteger start,int count,String policy,BigInteger mandateSeed){EmojiAssignmentStrategy strategy=strategies.get(policy);if(start==null||start.signum()<=0||count<1||count>100||strategy==null||mandateSeed!=null&&mandateSeed.signum()<0)throw new IllegalArgumentException("Use a positive decimal start, count 1..100, a published strategy and an optional nonnegative mandate seed.");
  StringBuilder b=new StringBuilder("{\"schema\":\"slopbuzz-companion-window/"+(mandateSeed==null?"v1":"v2")+"\",\"catalogVersion\":"+Companion.q(catalog.version())+",\"strategy\":"+Companion.q(policy)+",\"start\":"+Companion.q(start.toString())+",\"count\":"+count);
  if(mandateSeed!=null)b.append(",\"seedPolicy\":\"mandate-v1\",\"mandateSeed\":").append(Companion.q(mandateSeed.toString()));
  b.append(",\"assignments\":[");
  for(int i=0;i<count;i++){BigInteger n=start.add(BigInteger.valueOf(i));boolean fizz=n.mod(BigInteger.valueOf(3)).signum()==0,buzz=n.mod(BigInteger.valueOf(5)).signum()==0;if(!fizz&&!buzz)continue;String flavor=fizz?(buzz?"FizzBuzz":"Fizz"):"Buzz";FactorProfile profile=factors.inspect(n);if(profile==null)throw new IllegalStateException("Factor provider returned no evidence.");int ticket=strategy.ticket(n,flavor,profile,catalog.version());if(ticket<0||ticket>=1000000000)throw new IllegalStateException("Strategy returned an invalid ticket.");
   if(mandateSeed!=null)ticket=CompanionTicketHash.ticket("mandate-v1|"+catalog.version()+"|"+policy+"|"+mandateSeed+"|"+n+"|"+flavor+"|"+ticket);
   Companion companion=catalog.atTicket(ticket);if(companion==null)throw new IllegalStateException("Catalog returned no companion.");
   if(b.charAt(b.length()-1)!='[')b.append(',');b.append("{\"ordinal\":").append(Companion.q(n.toString())).append(",\"flavor\":").append(Companion.q(flavor)).append(",\"companionId\":").append(Companion.q(companion.id)).append(",\"ticket\":").append(ticket).append(",\"factors\":").append(profile.toJson()).append('}');
  }return b.append("]}").toString();
 }
}
