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
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditJournal;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputTransactionCoordinator;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.AuditStatusProjection;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.compliance.ComplianceEvidenceFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.capacity.CapacityPlanningBureau;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache.CacheLookup;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache.RedisOutputCache;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.ProclamationOutcome;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.ServiceLevelScorecard;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.SlopFizzBuzz;

/**
 * An HTTP proclamation desk for the same Spring-managed number ceremony.
 */
public final class SlopFizzBuzzHttpServer implements AutoCloseable {

	private static final Logger LOGGER = Logger.getLogger(SlopFizzBuzzHttpServer.class.getName());
	private final HttpServer server;
	private final ExecutorService workers;

	public SlopFizzBuzzHttpServer(final InetSocketAddress address, final SlopFizzBuzz service,
			final OutputTransactionCoordinator transactions, final OutputAuditJournal journal)
			throws IOException {
		this(address, service, transactions, journal, RedisOutputCache.configured());
	}

	public SlopFizzBuzzHttpServer(final InetSocketAddress address, final SlopFizzBuzz service,
			final OutputTransactionCoordinator transactions, final OutputAuditJournal journal,
			final RedisOutputCache cache) throws IOException {
		this.server = HttpServer.create(address, 0);
		this.workers = Executors.newFixedThreadPool(4);
		this.server.setExecutor(this.workers);
		final ServiceLevelScorecard scorecard = new ServiceLevelScorecard();
		this.server.createContext("/fizzbuzz", new FizzBuzzHandler(service, transactions, scorecard, cache));
		this.server.createContext("/operations/scorecard", new ScorecardHandler(scorecard));
		this.server.createContext("/cache/status", new CacheStatusHandler(cache));
		this.server.createContext("/capacity/forecast", new CapacityForecastHandler());
		this.server.createContext("/healthz", new HealthHandler());
		this.server.createContext("/readyz", new ReadinessHandler(journal));
		this.server.createContext("/audit/status", new AuditStatusHandler(journal));
		this.server.createContext("/audit/evidence", new EvidenceDossierHandler(journal));
		this.server.createContext("/", new StaticSiteHandler());
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
		respond(exchange, status, body, "text/plain; charset=UTF-8");
	}

	private static void respond(final HttpExchange exchange, final int status, final String body,
			final String contentType)
			throws IOException {
		final byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
		exchange.getResponseHeaders().set("Content-Type", contentType);
		exchange.getResponseHeaders().set("X-Content-Type-Options", "nosniff");
		exchange.sendResponseHeaders(status, bytes.length);
		final OutputStream stream = exchange.getResponseBody();
		try {
			stream.write(bytes);
		} finally {
			stream.close();
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

	private static final class CapacityForecastHandler implements HttpHandler {
		private final CapacityPlanningBureau bureau = new CapacityPlanningBureau();

		@Override
		public void handle(final HttpExchange exchange) throws IOException {
			try {
				if (!"/capacity/forecast".equals(exchange.getRequestURI().getPath())) {
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
				respond(exchange, 200, this.bureau.forecast(limit.intValue()).toJson(),
						"application/json; charset=UTF-8");
			} finally {
				exchange.close();
			}
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

	private static final class ReadinessHandler implements HttpHandler {
		private final OperationalReadinessCommission commission;

		private ReadinessHandler(final OutputAuditJournal journal) {
			this.commission = new OperationalReadinessCommission(journal);
		}

		@Override
		public void handle(final HttpExchange exchange) throws IOException {
			try {
				if (!"/readyz".equals(exchange.getRequestURI().getPath())) {
					respond(exchange, 404, "Unknown desk\n");
					return;
				}
				if (!"GET".equals(exchange.getRequestMethod())) {
					exchange.getResponseHeaders().set("Allow", "GET");
					respond(exchange, 405, "Method not authorized\n");
					return;
				}
				final ReadinessVerdict verdict = this.commission.convene();
				respond(exchange, verdict.isReady() ? 200 : 503, verdict.toText());
			} finally {
				exchange.close();
			}
		}
	}

	private static final class FizzBuzzHandler implements HttpHandler {
		private final SlopFizzBuzz service;
		private final OutputTransactionCoordinator transactions;
		private final ServiceLevelScorecard scorecard;
		private final RedisOutputCache cache;

		private FizzBuzzHandler(final SlopFizzBuzz service,
				final OutputTransactionCoordinator transactions,
				final ServiceLevelScorecard scorecard, final RedisOutputCache cache) {
			this.service = service;
			this.transactions = transactions;
			this.scorecard = scorecard;
			this.cache = cache;
		}

		@Override
		public void handle(final HttpExchange exchange) throws IOException {
			final long started = System.nanoTime();
			ProclamationOutcome outcome = ProclamationOutcome.FAILED;
			boolean counted = true;
			try {
				if (!"/fizzbuzz".equals(exchange.getRequestURI().getPath())) {
					counted = false;
					respond(exchange, 404, "Unknown desk\n");
					return;
				}
				if (!"GET".equals(exchange.getRequestMethod())) {
					exchange.getResponseHeaders().set("Allow", "GET");
					respond(exchange, 405, "Method not authorized\n");
					outcome = ProclamationOutcome.REJECTED;
					return;
				}
				final Integer limit = parseLimit(exchange.getRequestURI().getRawQuery());
				if (limit == null) {
					respond(exchange, 400, "Invalid limit; use an integer from 0 through 1000\n");
					outcome = ProclamationOutcome.REJECTED;
					return;
				}
				exchange.getResponseHeaders().set("Cache-Control", "no-store");
				final CacheLookup lookup = this.cache.lookup(limit.intValue());
				exchange.getResponseHeaders().set("X-SlopBuzz-Cache", lookup.getState().name());
				if (lookup.getState() == CacheLookup.State.HIT) {
					respond(exchange, 200, lookup.getBody());
					outcome = ProclamationOutcome.SUCCESSFUL;
					return;
				}
				try (OutputCapture audience = this.transactions.capture()) {
					this.service.slopFizzBuzz(limit.intValue());
					final String body = audience.getText();
					if (lookup.getState() == CacheLookup.State.MISS) {
						this.cache.store(limit.intValue(), body);
					}
					respond(exchange, 200, body);
					outcome = ProclamationOutcome.SUCCESSFUL;
				} catch (final RuntimeException failure) {
					LOGGER.warning("A SlopFizzBuzz HTTP proclamation failed: " + failure.getMessage());
					respond(exchange, 500, "Generation failed\n");
				}
			} finally {
				if (counted) {
					this.scorecard.record(outcome, Math.max(0L,
							(System.nanoTime() - started) / 1000L));
				}
				exchange.close();
			}
		}

	}

	private static final class CacheStatusHandler implements HttpHandler {
		private final RedisOutputCache cache;

		private CacheStatusHandler(final RedisOutputCache cache) {
			this.cache = cache;
		}

		@Override
		public void handle(final HttpExchange exchange) throws IOException {
			try {
				if (!"/cache/status".equals(exchange.getRequestURI().getPath())) {
					respond(exchange, 404, "Unknown desk\n");
					return;
				}
				if (!"GET".equals(exchange.getRequestMethod())) {
					exchange.getResponseHeaders().set("Allow", "GET");
					respond(exchange, 405, "Method not authorized\n");
					return;
				}
				respond(exchange, 200, this.cache.statusJson(),
						"application/json; charset=UTF-8");
			} finally {
				exchange.close();
			}
		}
	}

	private static final class ScorecardHandler implements HttpHandler {
		private final ServiceLevelScorecard scorecard;

		private ScorecardHandler(final ServiceLevelScorecard scorecard) {
			this.scorecard = scorecard;
		}

		@Override
		public void handle(final HttpExchange exchange) throws IOException {
			try {
				if (!"/operations/scorecard".equals(exchange.getRequestURI().getPath())) {
					respond(exchange, 404, "Unknown desk\n");
					return;
				}
				if (!"GET".equals(exchange.getRequestMethod())) {
					exchange.getResponseHeaders().set("Allow", "GET");
					respond(exchange, 405, "Method not authorized\n");
					return;
				}
				respond(exchange, 200, this.scorecard.snapshot().toJson(),
						"application/json; charset=UTF-8");
			} finally {
				exchange.close();
			}
		}
	}

	private static final class AuditStatusHandler implements HttpHandler {
		private final OutputAuditJournal journal;
		private final AuditStatusProjection projection = new AuditStatusProjection();

		private AuditStatusHandler(final OutputAuditJournal journal) {
			this.journal = journal;
		}

		@Override
		public void handle(final HttpExchange exchange) throws IOException {
			try {
				if (!"/audit/status".equals(exchange.getRequestURI().getPath())) {
					respond(exchange, 404, "Unknown desk\n");
					return;
				}
				if (!"GET".equals(exchange.getRequestMethod())) {
					exchange.getResponseHeaders().set("Allow", "GET");
					respond(exchange, 405, "Method not authorized\n");
					return;
				}
				this.journal.messages().dispatch(this.projection);
				final String status = "committed=" + this.projection.committedCount() + "\n"
						+ "aborted=" + this.projection.abortedCount() + "\n"
						+ "pending=" + this.journal.messages().pendingCount() + "\n"
						+ "deadLetters=" + this.journal.messages().deadLetterCount() + "\n"
						+ "chainValid=" + this.journal.verifyChain() + "\n";
				respond(exchange, 200, status);
			} finally {
				exchange.close();
			}
		}
	}

	private static final class EvidenceDossierHandler implements HttpHandler {
		private final ComplianceEvidenceFactory factory;

		private EvidenceDossierHandler(final OutputAuditJournal journal) {
			this.factory = new ComplianceEvidenceFactory(journal);
		}

		@Override
		public void handle(final HttpExchange exchange) throws IOException {
			try {
				if (!"/audit/evidence".equals(exchange.getRequestURI().getPath())) {
					respond(exchange, 404, "Unknown desk\n");
					return;
				}
				if (!"GET".equals(exchange.getRequestMethod())) {
					exchange.getResponseHeaders().set("Allow", "GET");
					respond(exchange, 405, "Method not authorized\n");
					return;
				}
				respond(exchange, 200, this.factory.issue(System.currentTimeMillis()).toJson(),
						"application/json; charset=UTF-8");
			} finally {
				exchange.close();
			}
		}
	}
}
