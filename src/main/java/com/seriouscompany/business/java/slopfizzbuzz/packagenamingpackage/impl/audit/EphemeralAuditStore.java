package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit;

import java.util.ArrayList;
import java.util.List;

/**
 * A repository whose institutional memory ends with its process.
 */
public final class EphemeralAuditStore implements OutputAuditStore {

	private final List<OutputAuditEntry> entries = new ArrayList<OutputAuditEntry>();

	@Override
	public synchronized List<OutputAuditEntry> load() {
		return new ArrayList<OutputAuditEntry>(this.entries);
	}

	@Override
	public synchronized void append(final OutputAuditEntry entry) {
		this.entries.add(entry);
	}
}
