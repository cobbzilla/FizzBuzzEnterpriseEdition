package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

/** Publishes the same-origin showcase without a second web server. */
final class StaticSiteHandler implements HttpHandler {

	private static final String CSP = "default-src 'self'; script-src 'self'; style-src 'self'; "
			+ "img-src 'self' data:; connect-src 'self' https://us.i.posthog.com; base-uri 'none'; "
			+ "form-action 'self'; frame-ancestors 'none'";
	private final Map<String, Asset> assets;

	StaticSiteHandler() {
		final Map<String, Asset> loaded = new HashMap<String, Asset>();
        final String token = System.getenv("POSTHOG_TOKEN");
        final boolean analyticsEnabled = "true".equals(System.getenv("SLOPBUZZ_ANALYTICS_ENABLED")) && token != null && token.matches("phc_[A-Za-z0-9_-]+");
        final String release = System.getenv("SLOPBUZZ_RELEASE_SHA");
        final String revision = release != null && release.matches("[0-9a-f]{40}") ? release : "unknown";
        final String analytics = "{\"revision\":\"" + revision + "\",\"enabled\":" + analyticsEnabled + ",\"token\":\"" + (analyticsEnabled ? token : "") + "\",\"environment\":\"" + ("preview".equals(System.getenv("SLOPBUZZ_ANALYTICS_ENVIRONMENT")) ? "preview" : "production") + "\",\"allowLocal\":" + "true".equals(System.getenv("SLOPBUZZ_ANALYTICS_ALLOW_LOCAL")) + "}";
        loaded.put("/analytics-config.json", new Asset(analytics.getBytes(StandardCharsets.UTF_8), "application/json", false));
        loaded.put("/assets/analytics.js", asset("/web/analytics.js", "text/javascript", false));
        loaded.put("/runtime-config.json",new Asset("{\"mode\":\"server\",\"revision\":\"unknown\",\"assets\":\"assets/\"}".getBytes(StandardCharsets.UTF_8),"application/json; charset=UTF-8",false));
		final Asset css = asset("/web/site.css", "text/css; charset=UTF-8", true);
		final Asset javascript = asset("/web/site.js", "text/javascript; charset=UTF-8", true);
		final Asset apiCss = asset("/web/api.css", "text/css; charset=UTF-8", true);
		final Asset apiJavascript = asset("/web/api.js", "text/javascript; charset=UTF-8", true);
		final Asset mark = asset("/web/mark.svg", "image/svg+xml", true);
		loaded.put("/assets/site.css", css);
		loaded.put("/assets/site.js", javascript);
		loaded.put("/assets/api.css", apiCss);
		loaded.put("/assets/api.js", apiJavascript);
		loaded.put("/assets/mark.svg", mark);
		loaded.put("/openapi.json", asset("/web/openapi.json", "application/json; charset=UTF-8", false));
		final Asset journal = asset("/CHANGELOG.md", "text/markdown; charset=UTF-8", false);
		loaded.put("/CHANGELOG.md", journal);
		final Asset register = asset("/EXECUTIVE_CONTINUITY_AND_SENTIMENT_REGISTER.md",
				"text/markdown; charset=UTF-8", false);
		loaded.put("/continuity-register.md", register);
		final Asset template = asset("/web/index.html", "text/html; charset=UTF-8", false);
		final String html = new String(template.bytes, StandardCharsets.UTF_8)
				.replace("/assets/site.css", "/assets/site.css?v=" + css.fingerprint)
				.replace("/assets/site.js", "/assets/site.js?v=" + javascript.fingerprint)
				.replace("/assets/mark.svg", "/assets/mark.svg?v=" + mark.fingerprint);
		loaded.put("/", new Asset(html.getBytes(StandardCharsets.UTF_8),
				"text/html; charset=UTF-8", false));
		loaded.put("/index.html", loaded.get("/"));
		final Asset apiTemplate = asset("/web/api.html", "text/html; charset=UTF-8", false);
		final String apiHtml = new String(apiTemplate.bytes, StandardCharsets.UTF_8)
				.replace("/assets/site.css", "/assets/site.css?v=" + css.fingerprint)
				.replace("/assets/api.css", "/assets/api.css?v=" + apiCss.fingerprint)
				.replace("/assets/api.js", "/assets/api.js?v=" + apiJavascript.fingerprint)
				.replace("/assets/mark.svg", "/assets/mark.svg?v=" + mark.fingerprint);
		loaded.put("/api", new Asset(apiHtml.getBytes(StandardCharsets.UTF_8),
				"text/html; charset=UTF-8", false));
		loaded.put("/api/", loaded.get("/api"));
		final Asset journalTemplate = asset("/web/changelog.html", "text/html; charset=UTF-8", false);
		final String journalHtml = new String(journalTemplate.bytes, StandardCharsets.UTF_8)
				.replace("/assets/site.css", "/assets/site.css?v=" + css.fingerprint)
				.replace("/assets/mark.svg", "/assets/mark.svg?v=" + mark.fingerprint)
				.replace("<!--LEDGER_CONTENT-->", ImprovementLedgerRenderer.render(
						new String(journal.bytes, StandardCharsets.UTF_8)));
		loaded.put("/changelog", new Asset(journalHtml.getBytes(StandardCharsets.UTF_8),
				"text/html; charset=UTF-8", false));
		loaded.put("/changelog/", loaded.get("/changelog"));
		final Asset registerTemplate = asset("/web/continuity.html", "text/html; charset=UTF-8", false);
		final String registerHtml = new String(registerTemplate.bytes, StandardCharsets.UTF_8)
				.replace("/assets/site.css", "/assets/site.css?v=" + css.fingerprint)
				.replace("/assets/mark.svg", "/assets/mark.svg?v=" + mark.fingerprint)
				.replace("<!--REGISTER_CONTENT-->", ImprovementLedgerRenderer.render(
						new String(register.bytes, StandardCharsets.UTF_8)));
		loaded.put("/continuity-register", new Asset(registerHtml.getBytes(StandardCharsets.UTF_8),
				"text/html; charset=UTF-8", false));
		loaded.put("/continuity-register/", loaded.get("/continuity-register"));
        for (final String[] page : new String[][] {{"demo", "demo"}, {"company-history", "history"}, {"accessibility", "accessibility"}, {"validation", "validation"}, {"response", "response"}}) {
            final Asset document = asset("/web/" + page[1] + ".html", "text/html; charset=UTF-8", false);
            loaded.put("/" + page[0], document);
            loaded.put("/" + page[0] + "/", document);
        }
        for (final String script : new String[] {"demo", "validation", "response"}) {
            loaded.put("/assets/" + script + ".js", asset("/web/" + script + ".js", "text/javascript; charset=UTF-8", false));
        }
        loaded.put("/validation/report.json", new Asset("{\"status\":\"NOT_RUN\",\"note\":\"Consult the static release tribunal for cross-runtime evidence.\"}".getBytes(StandardCharsets.UTF_8), "application/json; charset=UTF-8", false));
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
			final boolean fingerprinted = asset.cacheable &&
					("v=" + asset.fingerprint).equals(exchange.getRequestURI().getRawQuery());
			exchange.getResponseHeaders().set("Cache-Control", fingerprinted
					? "public, max-age=31536000, immutable" : "no-cache");
			exchange.getResponseHeaders().set("ETag", asset.etag);
			exchange.getResponseHeaders().set("Content-Security-Policy", CSP);
			exchange.getResponseHeaders().set("X-Content-Type-Options", "nosniff");
			exchange.getResponseHeaders().set("Referrer-Policy", "strict-origin-when-cross-origin");
			if (matchesEtags(exchange.getRequestHeaders().getFirst("If-None-Match"), asset.etag)) {
				exchange.sendResponseHeaders(304, -1);
				return;
			}
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

	private static boolean matchesEtags(final String ifNoneMatch, final String etag) {
		if (ifNoneMatch == null) {
			return false;
		}
		for (final String candidate : ifNoneMatch.split(",")) {
			final String stated = candidate.trim();
			if ("*".equals(stated) || etag.equals(stated)
					|| ("W/" + etag).equals(stated)) {
				return true;
			}
		}
		return false;
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
			byte[] content = bytes.toByteArray();
            if (contentType.startsWith("text/html")) {
                String html = new String(content, StandardCharsets.UTF_8);
                if (html.contains("<!--SITE_HEADER-->")) {
                    html = html.replace("<!--SITE_HEADER-->", new String(asset("/web/components/header.html", contentType, false).bytes, StandardCharsets.UTF_8))
                        .replace("<!--SITE_FOOTER-->", new String(asset("/web/components/footer.html", contentType, false).bytes, StandardCharsets.UTF_8));
                    final String active = path.endsWith("/demo.html") ? "DEMO" : path.endsWith("/api.html") ? "API" : path.endsWith("/history.html") ? "HISTORY" : path.endsWith("/validation.html") ? "VALIDATION" : "";
                    html = html.replace("<!--NAV_" + active + "-->", "aria-current=\"page\"").replaceAll("<!--NAV_[A-Z]+-->", "");
                    content = html.getBytes(StandardCharsets.UTF_8);
                }
            }
            return new Asset(content, contentType, cacheable);
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
		private final String fingerprint;
		private final String etag;

		private Asset(final byte[] bytes, final String contentType, final boolean cacheable) {
			this.bytes = bytes;
			this.contentType = contentType;
			this.cacheable = cacheable;
			this.fingerprint = fingerprint(bytes);
			this.etag = "\"" + this.fingerprint + "\"";
		}
	}

	private static String fingerprint(final byte[] bytes) {
		try {
			final byte[] digest = MessageDigest.getInstance("SHA-256").digest(bytes);
			final StringBuilder hex = new StringBuilder();
			for (final byte value : digest) {
				final int unsigned = value & 0xff;
				hex.append(Character.forDigit(unsigned >>> 4, 16));
				hex.append(Character.forDigit(unsigned & 0x0f, 16));
			}
			return hex.toString();
		} catch (final NoSuchAlgorithmException failure) {
			throw new IllegalStateException("Release custody requires SHA-256.", failure);
		}
	}
}
