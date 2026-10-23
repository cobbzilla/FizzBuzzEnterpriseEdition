package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

/** The deliberately small RESP2 jurisdiction needed for GET and SET. */
final class RedisProtocol {

	private static final int TIMEOUT_MILLIS = 200;
	private static final int MAX_REPLY_BYTES = 65536;
	private final String host;
	private final int port;

	RedisProtocol(final String host, final int port) {
		this.host = host;
		this.port = port;
	}

	byte[] command(final byte[]... arguments) throws IOException {
		final Socket socket = new Socket();
		try {
			socket.connect(new InetSocketAddress(this.host, this.port), TIMEOUT_MILLIS);
			socket.setSoTimeout(TIMEOUT_MILLIS);
			final OutputStream output = socket.getOutputStream();
			writeAscii(output, "*" + arguments.length + "\r\n");
			for (final byte[] argument : arguments) {
				writeAscii(output, "$" + argument.length + "\r\n");
				output.write(argument);
				writeAscii(output, "\r\n");
			}
			output.flush();
			final InputStream input = socket.getInputStream();
			final int kind = input.read();
			if (kind == '+') {
				return readLine(input);
			}
			if (kind == '-') {
				throw new IOException("Redis rejected a cache command: "
						+ new String(readLine(input), StandardCharsets.UTF_8));
			}
			if (kind == '$') {
				final int length;
				try {
					length = Integer.parseInt(new String(readLine(input), StandardCharsets.US_ASCII));
				} catch (final NumberFormatException malformed) {
					throw new IOException("Redis returned an invalid bulk length.", malformed);
				}
				if (length == -1) {
					return null;
				}
				if (length < 0 || length > MAX_REPLY_BYTES) {
					throw new IOException("Redis returned a bulk value outside the cache charter.");
				}
				final byte[] result = new byte[length];
				int offset = 0;
				while (offset < length) {
					final int read = input.read(result, offset, length - offset);
					if (read < 0) {
						throw new IOException("Redis ended a bulk value early.");
					}
					offset += read;
				}
				if (input.read() != '\r' || input.read() != '\n') {
					throw new IOException("Redis did not terminate a bulk value.");
				}
				return result;
			}
			throw new IOException("Redis returned an unsupported RESP2 reply.");
		} finally {
			socket.close();
		}
	}

	private static void writeAscii(final OutputStream output, final String text) throws IOException {
		output.write(text.getBytes(StandardCharsets.US_ASCII));
	}

	private static byte[] readLine(final InputStream input) throws IOException {
		final ByteArrayOutputStream bytes = new ByteArrayOutputStream();
		while (bytes.size() < 1024) {
			final int value = input.read();
			if (value < 0) {
				throw new IOException("Redis ended a reply early.");
			}
			if (value == '\r') {
				if (input.read() != '\n') {
					throw new IOException("Redis returned an invalid line ending.");
				}
				return bytes.toByteArray();
			}
			bytes.write(value);
		}
		throw new IOException("Redis returned an oversized status line.");
	}
}
