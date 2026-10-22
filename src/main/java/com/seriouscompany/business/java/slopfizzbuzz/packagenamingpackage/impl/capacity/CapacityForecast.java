package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.capacity;

/**
 * A board-ready estimate of the inventory required by a numerical mandate.
 */
public final class CapacityForecast {

	private final int limit;
	private final int numeralLines;
	private final int fizzLines;
	private final int buzzLines;
	private final int fizzBuzzLines;

	CapacityForecast(final int limit, final int numeralLines, final int fizzLines,
			final int buzzLines, final int fizzBuzzLines) {
		this.limit = limit;
		this.numeralLines = numeralLines;
		this.fizzLines = fizzLines;
		this.buzzLines = buzzLines;
		this.fizzBuzzLines = fizzBuzzLines;
	}

	public int getNumeralLines() {
		return this.numeralLines;
	}

	public int getFizzLines() {
		return this.fizzLines;
	}

	public int getBuzzLines() {
		return this.buzzLines;
	}

	public int getFizzBuzzLines() {
		return this.fizzBuzzLines;
	}

	public int getTotalLines() {
		return this.numeralLines + this.fizzLines + this.buzzLines + this.fizzBuzzLines;
	}

	public int getWorkloadUnits() {
		return this.numeralLines + 2 * (this.fizzLines + this.buzzLines)
				+ 3 * this.fizzBuzzLines;
	}

	public String toJson() {
		return "{\"schema\":\"slopbuzz-capacity/v1\",\"limit\":" + this.limit
				+ ",\"numeralLines\":" + this.numeralLines
				+ ",\"fizzLines\":" + this.fizzLines
				+ ",\"buzzLines\":" + this.buzzLines
				+ ",\"fizzBuzzLines\":" + this.fizzBuzzLines
				+ ",\"totalLines\":" + getTotalLines()
				+ ",\"workloadUnits\":" + getWorkloadUnits() + "}";
	}
}
