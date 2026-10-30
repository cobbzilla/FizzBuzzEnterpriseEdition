package com.seriouscompany.browser;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.ReleaseCustodyReport;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime.ExplicitEnterpriseAssembly;
import java.util.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime.*;
import org.teavm.interop.*;
import org.teavm.jso.*;
import org.teavm.jso.core.*;

/** Browser host capabilities surround the unchanged enterprise proceedings. */
public final class BrowserRuntime {
    private static EnterpriseDispatcher dispatcher;
    private static RuntimeClock clock=new SystemRuntimeClock();
    @JSExport public static JSPromise<JSString> initializeValidation(String revision){clock=new FixedRuntimeClock();return initialize(revision);}
    @JSExport public static void advance(double millis){((FixedRuntimeClock)clock).advance((long)millis);}
    @JSFunctor public interface Success extends JSObject {void accept(String value);}
    @JSFunctor public interface Failure extends JSObject {void accept(String value);}
    // ES5 callback syntax avoids TeaVM 0.16 arrow-capture shadowing during JS minification.
    @JSBody(params={"operation","value","success","failure"},script="globalThis.enterpriseHost(operation,value).then(success,function(error){failure(String(error));});")
    private static native void invoke(String operation,String value,Success success,Failure failure);
    @Async private static native String awaitHost(String operation,String value);
    private static String host(String operation,String value){String result=awaitHost(operation,value);if(result.startsWith("\u0000ERROR:"))throw new IllegalStateException(result.substring(7));return result;}
    private static void awaitHost(String operation,String value,AsyncCallback<String> callback){invoke(operation,value,callback::complete,e->callback.complete("\u0000ERROR:"+e));}
    @JSBody(params="value",script="return JSON.parse(value);") private static native JSArray<JSString> parse(String value);
    private static String randomHex(int size){return host("random-hex",String.valueOf(size));}
    public static void main(String[] args) {}
    @JSExport public static JSPromise<JSString> initialize(String revision) {
        return JSPromise.callAsync(()->{
            OutputAuditStore store=new DurableAuditStore(){
                public boolean isDurable(){return true;}
                public List<OutputAuditEntry> load(){
                    JSArray<JSString> rows=parse(host("load",""));
                    List<OutputAuditEntry> result=new ArrayList<>();
                    for(int i=0;i<rows.getLength();i++){
                        String[] row=rows.get(i).stringValue().split("\\|",6);
                        result.add(new OutputAuditEntry(Long.parseLong(row[0]),Integer.parseInt(row[1]),row[5],OutputDisposition.valueOf(row[2]),row[3],row[4]));
                    }return result;
                }
                public void append(OutputAuditEntry e){host("append",e.getSequence()+"|"+e.getNumber()+"|"+e.getDisposition()+"|"+e.getPreviousDigest()+"|"+e.getDigest()+"|"+e.getPayload());}
            };
            OutputAuditJournal journal=new OutputAuditJournal(store,text->host("sha256",text));
            OutputTransactionCoordinator transactions=new OutputTransactionCoordinator(journal);
            dispatcher=new EnterpriseDispatcher(ExplicitEnterpriseAssembly.assemble(transactions),transactions,journal,new CacheAuthority(new BrowserCache()),new ReleaseCustodyReport(revision,clock.currentTimeMillis()),clock,()->host("runtime",""));
            return JSString.valueOf("READY");
        });
    }
    @JSExport public static JSPromise<JSString> request(String method,String target,String incoming) {
        return JSPromise.callAsync(()->{
            if(dispatcher==null)throw new IllegalStateException("Runtime not initialized");
            String trace=TraceAdmission.validTraceparent(incoming)?incoming.trim().substring(3,35):randomHex(16);
            String span=randomHex(8);
            com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.TraceCustody.bind(trace);
            EnterpriseExchange result;
            try { result=dispatcher.dispatch(method,target); } finally {com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.TraceCustody.clear();}
            result.headers.set("X-SlopBuzz-Trace-Id",trace);result.headers.set("X-SlopBuzz-Span-Id",span);
            StringBuilder json=new StringBuilder("{\"status\":"+result.status+",\"headers\":{");boolean first=true;
            for(Map.Entry<String,String> header:result.headers.entrySet()){
                if(!first)json.append(',');first=false;json.append(quote(header.getKey())).append(':').append(quote(header.getValue()));
            }
            return JSString.valueOf(json.append("},\"body\":").append(quote(result.text())).append('}').toString());
        });
    }
    private static String quote(String value){
        StringBuilder result=new StringBuilder("\"");for(int i=0;i<value.length();i++){
            char c=value.charAt(i);if(c=='"'||c=='\\')result.append('\\').append(c);else if(c=='\n')result.append("\\n");else if(c=='\r')result.append("\\r");else if(c=='\t')result.append("\\t");else if(c<32)result.append(String.format("\\u%04x",(int)c));else result.append(c);
        }return result.append('"').toString();
    }
    private static final class BrowserCache implements CacheRepository {
        public boolean enabled(){return true;}
        public String get(int limit){String result=host("cache-get",String.valueOf(limit));return result.equals("MISS")?null:result.substring(4);}
        public void put(int limit,String body,int ttl){host("cache-put",limit+"|"+body);}
    }
    @JSExport public static JSPromise<JSString> validateContracts(){return JSPromise.callAsync(()->JSString.valueOf(PortableContractTribunal.rehearse(text->host("sha256",text))));}
    @JSExport public static JSPromise<JSString> validateOutput(int limit) {
        return JSPromise.callAsync(()->{
            OutputAuditJournal journal=new OutputAuditJournal(new EphemeralAuditStore(),text->host("sha256",text));
            OutputTransactionCoordinator transactions=new OutputTransactionCoordinator(journal);
            try(OutputCapture capture=transactions.capture()){
                ExplicitEnterpriseAssembly.assemble(transactions).slopFizzBuzz(limit);
                return JSString.valueOf(capture.getText());
            }
        });
    }
}
