package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http;

/**
 * The recorded votes of the integrity, capacity, and delivery electors.
 */
public final class ReadinessVerdict {

	private final boolean integrityApproved;
	private final boolean capacityApproved;
	private final boolean deliveryApproved;
	private final int pending;
	private final int deadLetters;
	private final int capacity;

	ReadinessVerdict(final boolean integrityApproved, final boolean capacityApproved,
			final boolean deliveryApproved, final int pending, final int deadLetters,
			final int capacity) {
		this.integrityApproved = integrityApproved;
		this.capacityApproved = capacityApproved;
		this.deliveryApproved = deliveryApproved;
		this.pending = pending;
		this.deadLetters = deadLetters;
		this.capacity = capacity;
	}

	public boolean isReady() {
		return this.integrityApproved && this.capacityApproved && this.deliveryApproved;
	}

	public String toText() {
		return "ready=" + isReady() + "\n"
				+ "integrityVote=" + vote(this.integrityApproved) + "\n"
				+ "capacityVote=" + vote(this.capacityApproved) + "\n"
				+ "deliveryVote=" + vote(this.deliveryApproved) + "\n"
				+ "pending=" + this.pending + "\n"
				+ "capacity=" + this.capacity + "\n"
				+ "deadLetters=" + this.deadLetters + "\n";
	}

	private static String vote(final boolean approved) {
		return approved ? "APPROVE" : "VETO";
	}
}
