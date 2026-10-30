package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit;
/** JVM-only composition boundary: environment and JCA never enter the core. */
public final class JvmAuditJournalFactory {
 public static OutputAuditJournal create(){String url=System.getenv("SLOPBUZZ_AUDIT_JDBC_URL");return create(url==null||url.trim().isEmpty()?new EphemeralAuditStore():new H2AuditStore(url));}
 public static OutputAuditJournal create(OutputAuditStore store){return new OutputAuditJournal(store,new JvmAuditDigest());}
}
