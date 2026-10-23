package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

/** Publishes the same-origin showcase without a second web server. */
final class StaticSiteHandler implements HttpHandler {

	private static final String CSP = "default-src 'self'; script-src 'self'; style-src 'self'; "
			+ "img-src 'self' data:; connect-src 'self'; base-uri 'none'; "
			+ "form-action 'self'; frame-ancestors 'none'";
	private final Map<String, Asset> assets;

	StaticSiteHandler() {
		final Map<String, Asset> loaded = new HashMap<String, Asset>();
		loaded.put("/", asset("/web/index.html", "text/html; charset=UTF-8", false));
		loaded.put("/index.html", loaded.get("/"));
		loaded.put("/assets/site.css", asset("/web/site.css", "text/css; charset=UTF-8", true));
		loaded.put("/assets/site.js", asset("/web/site.js", "text/javascript; charset=UTF-8", true));
		loaded.put("/assets/mark.svg", asset("/web/mark.svg", "image/svg+xml", true));
		this.assets = Collections.unmodifiableMap(loaded);
	}

	@Override
	public void handle(final HttpExchange exchange) throws IOException {
		try {
			final Asset asset = this.assets.get(exchange.getRequestURI().getPath());
			if (asset == null) {
				respondText(exchange, 404, "Unknown desk\n");
				return;
			}
			final String method = exchange.getRequestMethod();
			if (!"GET".equals(method) && !"HEAD".equals(method)) {
				exchange.getResponseHeaders().set("Allow", "GET, HEAD");
				respondText(exchange, 405, "Method not authorized\n");
				return;
			}
			exchange.getResponseHeaders().set("Content-Type", asset.contentType);
			exchange.getResponseHeaders().set("Cache-Control", asset.cacheable
					? "public, max-age=3600" : "no-cache");
			exchange.getResponseHeaders().set("Content-Security-Policy", CSP);
			exchange.getResponseHeaders().set("X-Content-Type-Options", "nosniff");
			exchange.getResponseHeaders().set("Referrer-Policy", "strict-origin-when-cross-origin");
			if ("HEAD".equals(method)) {
				exchange.getResponseHeaders().set("Content-Length",
						Integer.toString(asset.bytes.length));
				exchange.sendResponseHeaders(200, -1);
				return;
			}
			exchange.sendResponseHeaders(200, asset.bytes.length);
			final OutputStream output = exchange.getResponseBody();
			try {
				output.write(asset.bytes);
			} finally {
				output.close();
			}
		} finally {
			exchange.close();
		}
	}

	private static void respondText(final HttpExchange exchange, final int status,
			final String body) throws IOException {
		final byte[] bytes = body.getBytes("UTF-8");
		exchange.getResponseHeaders().set("Content-Type", "text/plain; charset=UTF-8");
		exchange.sendResponseHeaders(status, bytes.length);
		final OutputStream output = exchange.getResponseBody();
		try {
			output.write(bytes);
		} finally {
			output.close();
		}
	}

	private static Asset asset(final String path, final String contentType,
			final boolean cacheable) {
		final InputStream input = StaticSiteHandler.class.getResourceAsStream(path);
		if (input == null) {
			throw new IllegalStateException("Missing showcase asset " + path);
		}
		try {
			final ByteArrayOutputStream bytes = new ByteArrayOutputStream();
			final byte[] buffer = new byte[4096];
			int read;
			while ((read = input.read(buffer)) != -1) {
				bytes.write(buffer, 0, read);
			}
			return new Asset(bytes.toByteArray(), contentType, cacheable);
		} catch (final IOException failure) {
			throw new IllegalStateException("Cannot read showcase asset " + path, failure);
		} finally {
			try {
				input.close();
			} catch (final IOException ignored) {
				// The asset is already fully loaded.
			}
		}
	}

	private static final class Asset {
		private final byte[] bytes;
		private final String contentType;
		private final boolean cacheable;

		private Asset(final byte[] bytes, final String contentType, final boolean cacheable) {
			this.bytes = bytes;
			this.contentType = contentType;
			this.cacheable = cacheable;
		}
	}
}
