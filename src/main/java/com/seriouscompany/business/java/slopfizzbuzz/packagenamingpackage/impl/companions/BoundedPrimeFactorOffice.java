package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.companions;
import java.math.BigInteger;
/** Exact extracted factors, with honest residual disclosure and a deterministic work allowance. */
@org.springframework.stereotype.Service public final class BoundedPrimeFactorOffice implements FactorProfileOffice {
 private static final int[] PRIMES={2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97};
 public FactorProfile inspect(BigInteger n){if(n==null||n.signum()<=0)throw new IllegalArgumentException("Positive exact ordinal required.");BigInteger r=n;StringBuilder b=new StringBuilder();int used=0;
  for(int prime:PRIMES){if(r.equals(BigInteger.ONE))break;if(r.compareTo(BigInteger.valueOf((long)prime*prime))<0){factor(b,r.toString(),1);r=BigInteger.ONE;break;}
   BigInteger p=BigInteger.valueOf(prime);int exponent=0;
   while(used<128){used++;BigInteger[] qr=r.divideAndRemainder(p);if(qr[1].signum()!=0)break;r=qr[0];exponent++;if(r.equals(BigInteger.ONE))break;}
   if(exponent>0)factor(b,Integer.toString(prime),exponent);if(used==128)break;
  }
  if(used<128&&!r.equals(BigInteger.ONE)&&r.compareTo(BigInteger.valueOf(10201))<0){factor(b,r.toString(),1);r=BigInteger.ONE;}
  return new FactorProfile(b.length()==0?"none extracted":b.toString(),r.toString(),r.equals(BigInteger.ONE),used);
 }
 private static void factor(StringBuilder b,String prime,int exponent){if(b.length()>0)b.append(" × ");b.append(prime);if(exponent>1)b.append('^').append(exponent);}
}
