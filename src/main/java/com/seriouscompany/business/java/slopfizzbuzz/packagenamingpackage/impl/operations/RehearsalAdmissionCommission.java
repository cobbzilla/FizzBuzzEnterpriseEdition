package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations;

/** Grants at most one real synthetic hearing in each fifteen-second lease. */
public final class RehearsalAdmissionCommission {

	public interface NanoClock {
		long now();
	}

	private static final long LEASE_NANOS = 15_000_000_000L;
	private final SyntheticAssuranceBureau bureau;
	private final NanoClock clock;
	private CanaryVerdict previous;
	private long lastCompletedAt;

	public RehearsalAdmissionCommission(final SyntheticAssuranceBureau bureau) {
		this(bureau, new NanoClock() {
			@Override public long now() {
				return System.nanoTime();
			}
		});
	}

	public RehearsalAdmissionCommission(final SyntheticAssuranceBureau bureau,
			final NanoClock clock) {
		if (bureau == null || clock == null) {
			throw new IllegalArgumentException("Admission needs a bureau and a clock.");
		}
		this.bureau = bureau;
		this.clock = clock;
	}

	public CanaryVerdict latest() {
		return this.bureau.latest();
	}

	public synchronized RehearsalAdmissionReceipt convene() {
		final long elapsed = this.clock.now() - this.lastCompletedAt;
		if (this.previous != null && elapsed >= 0 && elapsed < LEASE_NANOS) {
			return new RehearsalAdmissionReceipt(this.previous,
					RehearsalAdmissionReceipt.Disposition.REUSED,
					(LEASE_NANOS - elapsed + 999_999_999L) / 1_000_000_000L);
		}
		final CanaryVerdict verdict = this.bureau.convene();
		this.previous = verdict;
		this.lastCompletedAt = this.clock.now();
		return new RehearsalAdmissionReceipt(verdict,
				RehearsalAdmissionReceipt.Disposition.EXECUTED, 15L);
	}
}
