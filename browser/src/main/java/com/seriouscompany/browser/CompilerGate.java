package com.seriouscompany.browser;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime.ExplicitEnterpriseAssembly;
import java.util.ArrayList;
import java.util.List;
import org.teavm.interop.Async;
import org.teavm.interop.AsyncCallback;
import org.teavm.jso.*;

/** Compiler feasibility gate: the actual Java printers, ballots, notary and journal. */
public final class CompilerGate {
    @JSFunctor public interface Success extends JSObject { void accept(String value); }
    @JSFunctor public interface Failure extends JSObject { void accept(String value); }
    @JSBody(params={"operation","value","success","failure"}, script="globalThis.enterpriseHost(operation, value).then(success, e => failure(String(e)));")
    private static native void invoke(String operation, String value, Success success, Failure failure);
    @Async private static native String host(String operation, String value);
    private static void host(String operation, String value, AsyncCallback<String> callback) {
        invoke(operation, value, callback::complete, error -> callback.error(new IllegalStateException(error)));
    }
    @JSBody(params="value", script="globalThis.enterpriseResult = value;")
    private static native void complete(String value);
    public static void main(String[] args) {
        new Thread(() -> {
            try {
                final List<OutputAuditEntry> entries = new ArrayList<>();
                OutputAuditStore store = new OutputAuditStore() {
                    public List<OutputAuditEntry> load() { return new ArrayList<>(entries); }
                    public void append(OutputAuditEntry e) {
                        host("append", e.getSequence()+"|"+e.getNumber()+"|"+e.getDigest());
                        entries.add(e);
                    }
                };
                OutputAuditJournal journal = new OutputAuditJournal(store, text -> host("sha256", text));
                OutputTransactionCoordinator transactions = new OutputTransactionCoordinator(journal);
                try(OutputCapture capture = transactions.capture()) {
                    ExplicitEnterpriseAssembly.assemble(transactions).slopFizzBuzz(15);
                    if(entries.size()!=15 || !journal.verifyChain()) throw new IllegalStateException("Uncertified output");
                    complete(capture.getText()+"HEAD="+entries.get(14).getDigest());
                }
            } catch(Throwable failure) { complete("ERROR: "+failure); }
        }).start();
    }
}
