package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit;

/** The mutually exclusive findings of a read-only repository reopening. */
public final class StoredCopyInspection {

	public enum Finding { MATCHED, LIVE_INVALID, STORED_INVALID, DIVERGED, STORAGE_UNAVAILABLE }

	private final Finding finding;
	private final boolean durable;
	private final int storedEntries;
	private final String headDigest;

	StoredCopyInspection(final Finding finding, final boolean durable,
			final int storedEntries, final String headDigest) {
		this.finding = finding;
		this.durable = durable;
		this.storedEntries = storedEntries;
		this.headDigest = headDigest;
	}

	public Finding getFinding() { return this.finding; }
	public boolean isDurable() { return this.durable; }
	public int getStoredEntries() { return this.storedEntries; }
	public String getHeadDigest() { return this.headDigest; }
}
