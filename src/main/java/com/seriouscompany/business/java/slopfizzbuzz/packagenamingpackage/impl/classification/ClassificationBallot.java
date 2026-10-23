package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.classification;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.strategies.IsEvenlyDivisibleStrategy;

/** Immutable classification permissions for one and only one integer. */
public final class ClassificationBallot {

	private final int number;
	private final boolean fizz;
	private final boolean buzz;
	private final boolean numeral;

	ClassificationBallot(final int number, final boolean fizz, final boolean buzz,
			final boolean numeral) {
		this.number = number;
		this.fizz = fizz;
		this.buzz = buzz;
		this.numeral = numeral;
	}

	public boolean permitsFizz() {
		return this.fizz;
	}

	public boolean permitsBuzz() {
		return this.buzz;
	}

	public boolean permitsNumeral() {
		return this.numeral;
	}

	public IsEvenlyDivisibleStrategy certifiedStrategy(final int seat) {
		final boolean permission;
		switch (seat) {
		case 0:
			permission = this.fizz;
			break;
		case 1:
			permission = this.buzz;
			break;
		case 2:
			permission = this.numeral;
			break;
		default:
			throw new IllegalArgumentException("The classification council has exactly three seats.");
		}
		return new CertifiedVoteStrategy(this.number, permission);
	}

	private static final class CertifiedVoteStrategy implements IsEvenlyDivisibleStrategy {
		private final int certifiedNumber;
		private final boolean permission;

		private CertifiedVoteStrategy(final int certifiedNumber, final boolean permission) {
			this.certifiedNumber = certifiedNumber;
			this.permission = permission;
		}

		@Override
		public boolean isEvenlyDivisible(final int number) {
			if (number != this.certifiedNumber) {
				throw new IllegalStateException("A classification certificate cannot be reassigned.");
			}
			return this.permission;
		}
	}
}
