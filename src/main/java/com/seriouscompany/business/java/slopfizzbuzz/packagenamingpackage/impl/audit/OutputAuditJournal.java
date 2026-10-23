package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.stereotype.Service;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.TraceCustody;

/**
 * A hash-linked ledger with an interchangeable repository of record.
 */
@Service
public final class OutputAuditJournal {

	private static final Logger LOGGER = Logger.getLogger(OutputAuditJournal.class.getName());
	private static final String GENESIS_DIGEST = "GENESIS";
	private final List<OutputAuditEntry> entries = new ArrayList<OutputAuditEntry>();
	private final OutputAuditStore store;
	private final AuditMessageQueue messages = new AuditMessageQueue();

	public OutputAuditJournal() {
		this(configuredStore());
	}

	public OutputAuditJournal(final OutputAuditStore store) {
		this.store = store;
		this.entries.addAll(store.load());
		if (!this.verifyChain()) {
			throw new IllegalStateException("The existing audit chain failed verification.");
		}
		for (final OutputAuditEntry entry : this.entries) {
			this.messages.publish(entry);
		}
	}

	private static OutputAuditStore configuredStore() {
		final String configuredUrl = System.getenv("SLOPBUZZ_AUDIT_JDBC_URL");
		return configuredUrl == null || configuredUrl.trim().isEmpty()
				? new EphemeralAuditStore() : new H2AuditStore(configuredUrl);
	}

	public synchronized OutputAuditEntry record(final int number, final String payload,
			final OutputDisposition disposition) {
		final String previous = this.entries.isEmpty()
				? GENESIS_DIGEST : this.entries.get(this.entries.size() - 1).getDigest();
		final long sequence = this.entries.size() + 1L;
		final String digest = digest(previous, sequence, number, payload, disposition);
		final OutputAuditEntry entry =
				new OutputAuditEntry(sequence, number, payload, disposition, previous, digest);
		this.store.append(entry);
		this.entries.add(entry);
		this.messages.publish(entry);
		LOGGER.fine("traceId=" + TraceCustody.currentTraceId() + " outputTransaction="
				+ sequence + " disposition=" + disposition + " number=" + number);
		return entry;
	}

	public synchronized List<OutputAuditEntry> snapshot() {
		return Collections.unmodifiableList(new ArrayList<OutputAuditEntry>(this.entries));
	}

	public AuditMessageQueue messages() {
		return this.messages;
	}

	public synchronized boolean verifyChain() {
		return verifyEntries(this.entries);
	}

	/** Reopens the repository while holding the same lock used for every append. */
	public synchronized StoredCopyInspection inspectStoredCopy() {
		final boolean liveValid = verifyEntries(this.entries);
		final List<OutputAuditEntry> stored;
		try {
			stored = this.store.load();
		} catch (final RuntimeException failure) {
			LOGGER.warning("Recovery rehearsal could not read the stored audit copy: "
					+ failure.getClass().getSimpleName());
			return new StoredCopyInspection(StoredCopyInspection.Finding.STORAGE_UNAVAILABLE,
					isDurableStore(), -1, "UNKNOWN");
		}
		final String rawHead = stored.isEmpty() ? GENESIS_DIGEST
				: stored.get(stored.size() - 1).getDigest();
		final String head = rawHead != null && (GENESIS_DIGEST.equals(rawHead)
				|| rawHead.matches("[0-9a-f]{64}")) ? rawHead : "UNKNOWN";
		if (!liveValid) {
			return new StoredCopyInspection(StoredCopyInspection.Finding.LIVE_INVALID,
					isDurableStore(), stored.size(), head);
		}
		if (!verifyEntries(stored)) {
			return new StoredCopyInspection(StoredCopyInspection.Finding.STORED_INVALID,
					isDurableStore(), stored.size(), head);
		}
		if (stored.size() != this.entries.size()) {
			return new StoredCopyInspection(StoredCopyInspection.Finding.DIVERGED,
					isDurableStore(), stored.size(), head);
		}
		for (int index = 0; index < stored.size(); index++) {
			if (!stored.get(index).getDigest().equals(this.entries.get(index).getDigest())) {
				return new StoredCopyInspection(StoredCopyInspection.Finding.DIVERGED,
						isDurableStore(), stored.size(), head);
			}
		}
		return new StoredCopyInspection(StoredCopyInspection.Finding.MATCHED,
				isDurableStore(), stored.size(), head);
	}

	private boolean isDurableStore() {
		return this.store instanceof H2AuditStore && ((H2AuditStore) this.store).isDurable();
	}

	private static boolean verifyEntries(final List<OutputAuditEntry> entries) {
		String previous = GENESIS_DIGEST;
		long sequence = 1L;
		for (final OutputAuditEntry entry : entries) {
			if (entry.getSequence() != sequence
					|| !previous.equals(entry.getPreviousDigest())
					|| !digest(previous, sequence, entry.getNumber(), entry.getPayload(),
							entry.getDisposition()).equals(entry.getDigest())) {
				return false;
			}
			previous = entry.getDigest();
			sequence++;
		}
		return true;
	}

	private static String digest(final String previous, final long sequence, final int number,
			final String payload, final OutputDisposition disposition) {
		try {
			final MessageDigest sha256 = MessageDigest.getInstance("SHA-256");
			final String statement = previous + ":" + sequence + ":" + number + ":"
					+ disposition.name() + ":" + payload.length() + ":" + payload;
			final byte[] bytes = sha256.digest(statement.getBytes(StandardCharsets.UTF_8));
			final StringBuilder hex = new StringBuilder();
			for (final byte value : bytes) {
				final int unsigned = value & 0xff;
				hex.append(Character.forDigit(unsigned >>> 4, 16));
				hex.append(Character.forDigit(unsigned & 0x0f, 16));
			}
			return hex.toString();
		} catch (final NoSuchAlgorithmException exception) {
			throw new IllegalStateException("SHA-256 is required by the output audit charter.", exception);
		}
	}
}
