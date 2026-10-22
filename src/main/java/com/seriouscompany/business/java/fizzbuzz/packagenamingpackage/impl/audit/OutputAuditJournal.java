package com.seriouscompany.business.java.fizzbuzz.packagenamingpackage.impl.audit;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.stereotype.Service;

/**
 * An in-memory, hash-linked ledger for the ceremonial output transaction.
 */
@Service
public final class OutputAuditJournal {

	private static final Logger LOGGER = Logger.getLogger(OutputAuditJournal.class.getName());
	private static final String GENESIS_DIGEST = "GENESIS";
	private final List<OutputAuditEntry> entries = new ArrayList<OutputAuditEntry>();

	public synchronized OutputAuditEntry record(final int number, final String payload,
			final OutputDisposition disposition) {
		final String previous = this.entries.isEmpty()
				? GENESIS_DIGEST : this.entries.get(this.entries.size() - 1).getDigest();
		final long sequence = this.entries.size() + 1L;
		final String digest = digest(previous, sequence, number, payload, disposition);
		final OutputAuditEntry entry =
				new OutputAuditEntry(sequence, number, payload, disposition, previous, digest);
		this.entries.add(entry);
		LOGGER.fine("Output transaction " + sequence + " " + disposition + " for number " + number);
		return entry;
	}

	public synchronized List<OutputAuditEntry> snapshot() {
		return Collections.unmodifiableList(new ArrayList<OutputAuditEntry>(this.entries));
	}

	public synchronized boolean verifyChain() {
		String previous = GENESIS_DIGEST;
		long sequence = 1L;
		for (final OutputAuditEntry entry : this.entries) {
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
