package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.compliance;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditEntry;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditJournal;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputDisposition;

/**
 * Convene a point-in-time review of the journal and its delivery outbox.
 */
public final class ComplianceEvidenceFactory {

	private final OutputAuditJournal journal;

	public ComplianceEvidenceFactory(final OutputAuditJournal journal) {
		this.journal = journal;
	}

	public ComplianceEvidenceDossier issue(final long issuedAtEpochMillis) {
		final List<OutputAuditEntry> entries;
		final boolean chainValid;
		synchronized (this.journal) {
			entries = this.journal.snapshot();
			chainValid = this.journal.verifyChain();
		}
		int committed = 0;
		int aborted = 0;
		for (final OutputAuditEntry entry : entries) {
			if (entry.getDisposition() == OutputDisposition.COMMITTED) {
				committed++;
			} else {
				aborted++;
			}
		}
		final int pending = this.journal.messages().pendingCount();
		final int deadLetters = this.journal.messages().deadLetterCount();
		final String head = entries.isEmpty() ? "GENESIS" : entries.get(entries.size() - 1).getDigest();
		final ControlResult chainControl = chainValid ? ControlResult.PASS : ControlResult.FAIL;
		final ControlResult deliveryControl = pending == 0 && deadLetters == 0
				? ControlResult.PASS : ControlResult.FAIL;
		final String statement = "slopbuzz-evidence/v1|internal-controls-only|none|"
				+ "ISO-9000=OPEN|SOC-2=OPEN|" + issuedAtEpochMillis + "|"
				+ entries.size() + "|" + committed + "|" + aborted + "|" + pending + "|"
				+ deadLetters + "|" + head + "|" + chainControl + "|" + deliveryControl;
		return new ComplianceEvidenceDossier(issuedAtEpochMillis, entries.size(),
				committed, aborted, pending, deadLetters, head, sha256(statement),
				chainControl, deliveryControl);
	}

	private static String sha256(final String statement) {
		try {
			final byte[] bytes = MessageDigest.getInstance("SHA-256")
					.digest(statement.getBytes(StandardCharsets.UTF_8));
			final StringBuilder hex = new StringBuilder();
			for (final byte value : bytes) {
				final int unsigned = value & 0xff;
				hex.append(Character.forDigit(unsigned >>> 4, 16));
				hex.append(Character.forDigit(unsigned & 0x0f, 16));
			}
			return hex.toString();
		} catch (final NoSuchAlgorithmException exception) {
			throw new IllegalStateException("The evidence seal requires SHA-256.", exception);
		}
	}
}
