package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit;
import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
public final class JvmAuditDigest implements AuditDigest {
 public String sha256(String statement) {
  try { byte[] bytes=MessageDigest.getInstance("SHA-256").digest(statement.getBytes(StandardCharsets.UTF_8));
   StringBuilder hex=new StringBuilder(); for(byte value:bytes){int unsigned=value&255;hex.append(Character.forDigit(unsigned>>>4,16));hex.append(Character.forDigit(unsigned&15,16));} return hex.toString();
  } catch(java.security.NoSuchAlgorithmException e){throw new IllegalStateException(e);}
 }
}
