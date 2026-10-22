package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit;

/**
 * A recipient entitled to acknowledge an audit event.
 */
public interface AuditEventConsumer {

	void accept(OutputAuditEntry entry);
}
