package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.logging.Logger;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputCapture;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputTransactionCoordinator;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.SlopFizzBuzz;

/**
 * An HTTP proclamation desk for the same Spring-managed number ceremony.
 */
public final class SlopFizzBuzzHttpServer implements AutoCloseable {

	private static final Logger LOGGER = Logger.getLogger(SlopFizzBuzzHttpServer.class.getName());
	private final HttpServer server;
	private final ExecutorService workers;

	public SlopFizzBuzzHttpServer(final InetSocketAddress address, final SlopFizzBuzz service,
			final OutputTransactionCoordinator transactions) throws IOException {
		this.server = HttpServer.create(address, 0);
		this.workers = Executors.newFixedThreadPool(4);
		this.server.setExecutor(this.workers);
		this.server.createContext("/fizzbuzz", new FizzBuzzHandler(service, transactions));
		this.server.createContext("/healthz", new HealthHandler());
	}

	public void start() {
		this.server.start();
	}

	public int getPort() {
		return this.server.getAddress().getPort();
	}

	@Override
	public void close() {
		this.server.stop(0);
		this.workers.shutdownNow();
	}

	private static void respond(final HttpExchange exchange, final int status, final String body)
			throws IOException {
		final byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
		exchange.getResponseHeaders().set("Content-Type", "text/plain; charset=UTF-8");
		exchange.sendResponseHeaders(status, bytes.length);
		final OutputStream stream = exchange.getResponseBody();
		try {
			stream.write(bytes);
		} finally {
			stream.close();
		}
	}

	private static final class HealthHandler implements HttpHandler {
		@Override
		public void handle(final HttpExchange exchange) throws IOException {
			try {
				if (!"/healthz".equals(exchange.getRequestURI().getPath())) {
					respond(exchange, 404, "Unknown desk\n");
					return;
				}
				if (!"GET".equals(exchange.getRequestMethod())) {
					exchange.getResponseHeaders().set("Allow", "GET");
					respond(exchange, 405, "Method not authorized\n");
					return;
				}
				respond(exchange, 200, "ok\n");
			} finally {
				exchange.close();
			}
		}
	}

	private static final class FizzBuzzHandler implements HttpHandler {
		private final SlopFizzBuzz service;
		private final OutputTransactionCoordinator transactions;

		private FizzBuzzHandler(final SlopFizzBuzz service,
				final OutputTransactionCoordinator transactions) {
			this.service = service;
			this.transactions = transactions;
		}

		@Override
		public void handle(final HttpExchange exchange) throws IOException {
			try {
				if (!"/fizzbuzz".equals(exchange.getRequestURI().getPath())) {
					respond(exchange, 404, "Unknown desk\n");
					return;
				}
				if (!"GET".equals(exchange.getRequestMethod())) {
					exchange.getResponseHeaders().set("Allow", "GET");
					respond(exchange, 405, "Method not authorized\n");
					return;
				}
				final Integer limit = parseLimit(exchange.getRequestURI().getRawQuery());
				if (limit == null) {
					respond(exchange, 400, "Invalid limit; use an integer from 0 through 1000\n");
					return;
				}
				try (OutputCapture audience = this.transactions.capture()) {
					this.service.slopFizzBuzz(limit.intValue());
					respond(exchange, 200, audience.getText());
				} catch (final RuntimeException failure) {
					LOGGER.warning("A SlopFizzBuzz HTTP proclamation failed: " + failure.getMessage());
					respond(exchange, 500, "Generation failed\n");
				}
			} finally {
				exchange.close();
			}
		}

		private static Integer parseLimit(final String query) {
			if (query == null) {
				return Integer.valueOf(100);
			}
			if (!query.matches("limit=[0-9]{1,4}")) {
				return null;
			}
			final int parsed = Integer.parseInt(query.substring("limit=".length()));
			return parsed <= 1000 ? Integer.valueOf(parsed) : null;
		}
	}
}
