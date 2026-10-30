package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http;
import java.io.*;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
public final class EnterpriseExchange {
 public static final class Headers extends LinkedHashMap<String,String> {public void set(String key,String value){put(key,value);}}
 public final Headers headers=new Headers();
 public final ByteArrayOutputStream body=new ByteArrayOutputStream();
 public int status;
 private final String method; private final URI uri;
 public EnterpriseExchange(String method,String target){this.method=method;uri=URI.create(target);}
 public String getRequestMethod(){return method;}
 public URI getRequestURI(){return uri;}
 public Headers getResponseHeaders(){return headers;}
 public OutputStream getResponseBody(){return body;}
 public void sendResponseHeaders(int code,long size){status=code;}
 public void close(){}
 public String text(){return new String(body.toByteArray(),StandardCharsets.UTF_8);}
}
