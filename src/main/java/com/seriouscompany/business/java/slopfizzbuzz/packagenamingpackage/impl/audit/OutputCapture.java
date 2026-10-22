package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;

/**
 * A request-local publication destination with an explicit end of mandate.
 */
public final class OutputCapture implements AutoCloseable {

	private final OutputTransactionCoordinator coordinator;
	private final ByteArrayOutputStream bytes = new ByteArrayOutputStream();
	private boolean closed;

	OutputCapture(final OutputTransactionCoordinator coordinator) {
		this.coordinator = coordinator;
	}

	void accept(final byte[] publication) {
		this.bytes.write(publication, 0, publication.length);
	}

	public String getText() {
		return new String(this.bytes.toByteArray(), StandardCharsets.UTF_8);
	}

	@Override
	public void close() {
		if (!this.closed) {
			this.coordinator.release(this);
			this.closed = true;
		}
	}
}
