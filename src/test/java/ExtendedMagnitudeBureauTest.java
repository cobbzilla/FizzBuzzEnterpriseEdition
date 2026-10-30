import static org.junit.Assert.*;
import org.junit.Test;
import java.math.BigInteger;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.capacity.ExtendedMagnitudeBureau;

public class ExtendedMagnitudeBureauTest {
 private final ExtendedMagnitudeBureau bureau=new ExtendedMagnitudeBureau();
 @Test public void finiteWindowsAgreeWithAnIndependentOracleAcrossTheFirstThousandOrdinals(){
  for(int start=1;start<=1000;start+=100){StringBuilder expected=new StringBuilder();for(int n=start;n<start+100;n++)expected.append(n%15==0?"FizzBuzz":n%3==0?"Fizz":n%5==0?"Buzz":String.valueOf(n)).append('\n');assertEquals(expected.toString(),bureau.window(BigInteger.valueOf(start),100));}
 }
 @Test public void ordinalsBeyondTheSafeJavascriptBoundaryRemainExact(){
  assertEquals("FizzBuzz\n9007199254740991\n9007199254740992\nFizz\n",bureau.window(new BigInteger("9007199254740990"),4));
  String huge="100000000000000000000000000000000000000000000000001";
  assertTrue(bureau.window(new BigInteger(huge),1).equals(huge+"\n"));
 }
 @Test public void forecastStringsCannotLosePrecisionDuringJsonTransport(){
  String limit="9007199254740993",json=bureau.forecast(new BigInteger(limit));
  assertTrue(json.contains("\"limit\":\""+limit+"\""));
  assertTrue(json.contains("\"totalLines\":\""+limit+"\""));
  assertTrue(json.contains("\"workloadUnits\":\"13811038857269522\""));
 }
 @Test public void finiteTransportLimitsDoNotImposeAMagnitudeLimit(){
  BigInteger enormous=BigInteger.TEN.pow(1000).add(BigInteger.ONE);
  assertEquals(enormous.toString()+"\n",bureau.window(enormous,1));
  assertTrue(bureau.forecast(enormous).contains("\"totalLines\":\""+enormous+"\""));
  for(int count:new int[]{0,-1,101,Integer.MAX_VALUE})try{bureau.window(BigInteger.ONE,count);fail("A response window must remain finite.");}catch(IllegalArgumentException expected){}
  for(BigInteger start:new BigInteger[]{null,BigInteger.ZERO,BigInteger.valueOf(-1)})try{bureau.window(start,1);fail("The first ordinal is positive.");}catch(IllegalArgumentException expected){}
 }
}
