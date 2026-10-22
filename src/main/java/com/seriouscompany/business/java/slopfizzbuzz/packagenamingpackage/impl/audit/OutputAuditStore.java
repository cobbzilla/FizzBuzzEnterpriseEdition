package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit;

import java.util.List;

/**
 * The storage institution to which audit entries are submitted.
 */
public interface OutputAuditStore {

	List<OutputAuditEntry> load();

	void append(OutputAuditEntry entry);
}
