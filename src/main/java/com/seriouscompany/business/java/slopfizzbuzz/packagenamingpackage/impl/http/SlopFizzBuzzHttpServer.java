package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.logging.Logger;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditJournal;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputTransactionCoordinator;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache.RedisOutputCache;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache.OutputCache;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.ReleaseCustodyReport;
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
			final OutputCache cache) throws IOException {
		this(address, service, transactions, journal, cache, configuredRelease());
	}

	public SlopFizzBuzzHttpServer(final InetSocketAddress address, final SlopFizzBuzz service,
			final OutputTransactionCoordinator transactions, final OutputAuditJournal journal,
			final OutputCache cache, final ReleaseCustodyReport release) throws IOException {
		this.server = HttpServer.create(address, 0);
		this.workers = Executors.newFixedThreadPool(4);
		this.server.setExecutor(this.workers);
        final EnterpriseDispatcher dispatcher=new EnterpriseDispatcher(service,transactions,journal,cache,release);
        final TraceCustodyFilter trace=new TraceCustodyFilter();
        final HttpHandler adapter=new HttpHandler(){public void handle(HttpExchange exchange) throws IOException {
            try {
                EnterpriseExchange answer=dispatcher.dispatch(exchange.getRequestMethod(),exchange.getRequestURI().toString());
                for(java.util.Map.Entry<String,String> header:answer.headers.entrySet()) exchange.getResponseHeaders().set(header.getKey(),header.getValue());
                byte[] bytes=answer.body.toByteArray();
                exchange.sendResponseHeaders(answer.status,bytes.length);
                exchange.getResponseBody().write(bytes);
            } finally {exchange.close();}
        }};
        for(String path:new String[]{"/operations/runtime", "/onboarding/rehearsal", "/procurement/dossier","/fizzbuzz","/fizzbuzz/window","/capacity/forecast","/capacity/forecast/extended","/healthz","/readyz","/cache/status","/audit/status","/audit/evidence","/operations/scorecard","/operations/canary","/operations/recovery","/operations/release"}) register(path,adapter,trace);
        register("/",new StaticSiteHandler(),trace);
	}

	private static ReleaseCustodyReport configuredRelease() {
		final String value = System.getenv("SLOPBUZZ_RELEASE_SHA");
		return new ReleaseCustodyReport(value == null || value.trim().isEmpty()
				? "unknown" : value, System.currentTimeMillis());
	}

	private void register(final String path, final HttpHandler handler,
			final TraceCustodyFilter trace) {
		this.server.createContext(path, handler).getFilters().add(trace);
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

}
