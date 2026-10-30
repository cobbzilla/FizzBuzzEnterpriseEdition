package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.capacity;

import java.math.BigInteger;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement.GlyphProcurementDirectorate;

/** Arbitrary magnitude, finite response windows, and no retained audit or cache allocation. */
public final class ExtendedMagnitudeBureau {
 public static final int WINDOW_SIZE=100;
 private static final BigInteger THREE=BigInteger.valueOf(3),FIVE=BigInteger.valueOf(5),FIFTEEN=BigInteger.valueOf(15);
 private final GlyphProcurementDirectorate procurement=GlyphProcurementDirectorate.standard();
 public static boolean isDecimal(String value) {
  if(value==null||value.isEmpty())return false;
  for(int i=0;i<value.length();i++)if(value.charAt(i)<'0'||value.charAt(i)>'9')return false;
  return true;
 }
 public String window(BigInteger start,int count) {
  if(start==null||start.signum()<1||count<1||count>WINDOW_SIZE) throw new IllegalArgumentException("A window needs a positive ordinal and 1 through 100 lines.");
  StringBuilder output=new StringBuilder();
  BigInteger number=start;
  for(int i=0;i<count;i++) {
   String text="";
   if(number.mod(THREE).signum()==0) text+=procurement.procure("Fizz").text();
   if(number.mod(FIVE).signum()==0) text+=procurement.procure("Buzz").text();
   if(text.isEmpty()) text=number.toString();
   // Independent lexical witness does not source its answer from procurement.
   String expected=number.remainder(FIFTEEN).signum()==0?"FizzBuzz":number.remainder(THREE).signum()==0?"Fizz":number.remainder(FIVE).signum()==0?"Buzz":number.toString();
   if(!expected.equals(text)) throw new IllegalStateException("Extended-magnitude lexical inspection rejected the proclamation.");
   output.append(text).append('\n');number=number.add(BigInteger.ONE);
  }
  return output.toString();
 }
 public String forecast(BigInteger limit) {
  if(limit==null||limit.signum()<0) throw new IllegalArgumentException("A forecast requires a non-negative integer.");
  BigInteger joint=limit.divide(FIFTEEN),fizz=limit.divide(THREE).subtract(joint),buzz=limit.divide(FIVE).subtract(joint);
  BigInteger numerals=limit.subtract(joint).subtract(fizz).subtract(buzz),work=limit.add(limit.divide(THREE)).add(limit.divide(FIVE));
  return "{\"schema\":\"slopbuzz-capacity/extended-v1\",\"limit\":\""+limit+"\",\"numeralLines\":\""+numerals+"\",\"fizzLines\":\""+fizz+"\",\"buzzLines\":\""+buzz+"\",\"fizzBuzzLines\":\""+joint+"\",\"totalLines\":\""+limit+"\",\"workloadUnits\":\""+work+"\"}";
 }
}
