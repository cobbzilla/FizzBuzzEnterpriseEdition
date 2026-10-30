package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations;

/** A small, honest statement of the revision declared at process startup. */
public final class ReleaseCustodyReport {

	private final String revision;
	private final long startedAtEpochMillis;

	public ReleaseCustodyReport(final String revision, final long startedAtEpochMillis) {
		if (revision == null || (!"unknown".equals(revision)
				&& !revision.matches("[0-9a-f]{40}")) || startedAtEpochMillis < 0) {
			throw new IllegalArgumentException("A release report needs a full Git SHA or unknown.");
		}
		this.revision = revision;
		this.startedAtEpochMillis = startedAtEpochMillis;
	}


	public String getRevision() {
		return this.revision;
	}

	public String toJson() {
		return "{\"schema\":\"slopbuzz-release/v1\",\"scope\":\"deployed-process\""
				+ ",\"revision\":\"" + this.revision + "\""
				+ ",\"startedAtEpochMillis\":" + this.startedAtEpochMillis + "}";
	}
}
