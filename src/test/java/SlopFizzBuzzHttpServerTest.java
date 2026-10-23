import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputTransactionCoordinator;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditJournal;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.EphemeralAuditStore;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.AuditEventConsumer;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditEntry;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputDisposition;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache.RedisOutputCache;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http.SlopFizzBuzzHttpServer;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.SlopFizzBuzz;

/**
 * Treaty tests between the HTTP proclamation desk and the underlying game.
 */
public class SlopFizzBuzzHttpServerTest {

	private static ClassPathXmlApplicationContext context;
	private static SlopFizzBuzzHttpServer server;
	private static OutputAuditJournal journal;

	@BeforeClass
	public static void openDesk() throws Exception {
		context = new ClassPathXmlApplicationContext(TestConstants.SPRING_XML);
		final SlopFizzBuzz service =
				(SlopFizzBuzz) context.getBean(TestConstants.STANDARD_SLOP_FIZZ_BUZZ);
		journal = context.getBean(OutputAuditJournal.class);
		server = new SlopFizzBuzzHttpServer(
				new InetSocketAddress("127.0.0.1", 0), service,
				context.getBean(OutputTransactionCoordinator.class), journal);
		server.start();
	}

	@AfterClass
	public static void closeDesk() {
		server.close();
		context.close();
	}

	@Test
	public void healthDeskAnswersWithoutRunningTheGame() throws Exception {
		final Reply reply = request("GET", "/healthz");
		assertEquals(200, reply.status);
		assertEquals("ok\n", reply.body);
	}

	@Test
	public void showcasePublishesSemanticPageAndSameOriginAssets() throws Exception {
		final Reply page = request("GET", "/");
		assertEquals(200, page.status);
		assertEquals("text/html; charset=UTF-8", page.contentType);
		assertTrue(page.body.contains("The Serious Business Company, Inc."));
		assertTrue(page.body.contains("<main id=\"main\">"));
		assertTrue(page.body.contains("aria-live=\"polite\""));
		assertTrue(page.body.contains("id=\"canary-button\""));
		assertTrue(page.contentSecurityPolicy.contains("script-src 'self'"));
		assertTrue(request("GET", "/assets/site.css").body.contains("prefers-reduced-motion"));
		assertTrue(request("GET", "/assets/site.js").body.contains("fetch(path"));
		assertEquals(404, request("GET", "/assets/unknown.js").status);
	}

	@Test
	public void syntheticRehearsalExercisesTheRealSpringServiceAndKeepsMinutes() throws Exception {
		final Reply before = request("GET", "/operations/canary");
		assertEquals(200, before.status);
		final long priorEntries = journal.snapshot().size();
		final Reply rehearsal = request("POST", "/operations/canary");
		assertEquals(200, rehearsal.status);
		assertEquals("application/json; charset=UTF-8", rehearsal.contentType);
		assertTrue(rehearsal.body.contains("\"state\":\"PASSED\""));
		assertTrue(rehearsal.body.contains("\"finding\":\"ANSWER_MATCHED_SPECIMEN\""));
		assertTrue(rehearsal.body.contains("\"observedLines\":15"));
		assertTrue(rehearsal.body.contains("\"auditChainValid\":true"));
		assertEquals(priorEntries + 15, journal.snapshot().size());
		assertEquals(rehearsal.body, request("GET", "/operations/canary").body);
		assertEquals(405, request("PUT", "/operations/canary").status);
		assertEquals(404, request("GET", "/operations/canary-extra").status);
	}

	@Test
	public void failedSyntheticRehearsalPublishesAVisibleFailure() throws Exception {
		final SlopFizzBuzz silentService = new SlopFizzBuzz() {
			@Override
			public void slopFizzBuzz(final int limit) { }
		};
		final SlopFizzBuzzHttpServer failingServer = new SlopFizzBuzzHttpServer(
				new InetSocketAddress("127.0.0.1", 0), silentService,
				context.getBean(OutputTransactionCoordinator.class),
				new OutputAuditJournal(new EphemeralAuditStore()));
		failingServer.start();
		try {
			final Reply rehearsal = request(failingServer.getPort(), "POST", "/operations/canary");
			assertEquals(503, rehearsal.status);
			assertTrue(rehearsal.body.contains("\"state\":\"FAILED\""));
			assertTrue(rehearsal.body.contains("\"finding\":\"ANSWER_DEVIATED_FROM_SPECIMEN\""));
			assertEquals(503, request(failingServer.getPort(), "GET", "/operations/canary").status);
		} finally {
			failingServer.close();
		}
	}

	@Test
	public void cacheFailureFallsBackToTheRealNumericalEngine() throws Exception {
		final SlopFizzBuzzHttpServer fallback = new SlopFizzBuzzHttpServer(
				new InetSocketAddress("127.0.0.1", 0),
				(SlopFizzBuzz) context.getBean(TestConstants.STANDARD_SLOP_FIZZ_BUZZ),
				context.getBean(OutputTransactionCoordinator.class),
				new OutputAuditJournal(new EphemeralAuditStore()),
				new RedisOutputCache("127.0.0.1", 1));
		fallback.start();
		try {
			final Reply answer = request(fallback.getPort(), "GET", "/fizzbuzz?limit=3");
			assertEquals(200, answer.status);
			assertEquals(expected(3), answer.body);
			assertEquals("BYPASS", answer.cacheState);
			final Reply status = request(fallback.getPort(), "GET", "/cache/status");
			assertTrue(status.body.contains("\"bypasses\":1"));
			assertTrue(status.body.contains("\"errors\":1"));
		} finally {
			fallback.close();
		}
	}

	@Test
	public void readinessCommissionApprovesTheHealthyBureau() throws Exception {
		final Reply reply = request("GET", "/readyz");
		assertEquals(200, reply.status);
		assertTrue(reply.body.contains("ready=true\n"));
		assertTrue(reply.body.contains("integrityVote=APPROVE\n"));
		assertTrue(reply.body.contains("deliveryVote=APPROVE\n"));
		assertEquals(405, request("POST", "/readyz").status);
		assertEquals(404, request("GET", "/readyz-extra").status);
	}

	@Test
	public void capacityDeskForecastsWithoutCreatingAuditMinutes() throws Exception {
		final int priorEntries = journal.snapshot().size();
		final Reply forecast = request("GET", "/capacity/forecast?limit=15");
		assertEquals(200, forecast.status);
		assertEquals("application/json; charset=UTF-8", forecast.contentType);
		assertTrue(forecast.body.contains("\"numeralLines\":8"));
		assertTrue(forecast.body.contains("\"fizzLines\":4"));
		assertTrue(forecast.body.contains("\"buzzLines\":2"));
		assertTrue(forecast.body.contains("\"fizzBuzzLines\":1"));
		assertTrue(forecast.body.contains("\"workloadUnits\":23"));
		assertEquals(priorEntries, journal.snapshot().size());
		assertEquals(400, request("GET", "/capacity/forecast?limit=1001").status);
		assertEquals(405, request("POST", "/capacity/forecast").status);
		assertEquals(404, request("GET", "/capacity/forecast-extra").status);
	}

	@Test
	public void scorecardCountsAcceptedAndRejectedProclamations() throws Exception {
		final Reply before = request("GET", "/operations/scorecard");
		assertEquals(200, before.status);
		assertEquals("application/json; charset=UTF-8", before.contentType);
		request("GET", "/fizzbuzz?limit=1");
		request("GET", "/fizzbuzz?limit=-1");
		final Reply after = awaitScorecard(server.getPort(), "total",
				jsonNumber(before.body, "total") + 2);
		assertEquals(jsonNumber(before.body, "successful") + 1,
				jsonNumber(after.body, "successful"));
		assertEquals(jsonNumber(before.body, "rejected") + 1,
				jsonNumber(after.body, "rejected"));
		assertEquals(jsonNumber(before.body, "failed"), jsonNumber(after.body, "failed"));
		assertEquals(405, request("POST", "/operations/scorecard").status);
		assertEquals(404, request("GET", "/operations/scorecard-extra").status);
	}

	@Test
	public void failedProclamationAppearsInItsOwnScorecard() throws Exception {
		final SlopFizzBuzz failingService = new SlopFizzBuzz() {
			@Override
			public void slopFizzBuzz(final int limit) {
				throw new IllegalStateException("The proclamation committee has adjourned.");
			}
		};
		final SlopFizzBuzzHttpServer failingServer = new SlopFizzBuzzHttpServer(
				new InetSocketAddress("127.0.0.1", 0), failingService,
				context.getBean(OutputTransactionCoordinator.class),
				new OutputAuditJournal(new EphemeralAuditStore()));
		failingServer.start();
		try {
			assertEquals(500, request(failingServer.getPort(), "GET", "/fizzbuzz?limit=1").status);
			final Reply scorecard = awaitScorecard(failingServer.getPort(), "failed", 1);
			assertEquals(1, jsonNumber(scorecard.body, "failed"));
			assertEquals(1, jsonNumber(scorecard.body, "total"));
		} finally {
			failingServer.close();
		}
	}

	@Test
	public void deadLetterVetoesReadinessButNotLiveness() throws Exception {
		final OutputAuditJournal failedJournal = new OutputAuditJournal(new EphemeralAuditStore());
		failedJournal.record(1, "1\n", OutputDisposition.COMMITTED);
		final AuditEventConsumer refusingOffice = new AuditEventConsumer() {
			@Override
			public void accept(final OutputAuditEntry entry) {
				throw new IllegalStateException("The recipient has left the building.");
			}
		};
		for (int attempt = 0; attempt < 3; attempt++) {
			failedJournal.messages().dispatch(refusingOffice);
		}
		final SlopFizzBuzzHttpServer degraded = new SlopFizzBuzzHttpServer(
				new InetSocketAddress("127.0.0.1", 0),
				(SlopFizzBuzz) context.getBean(TestConstants.STANDARD_SLOP_FIZZ_BUZZ),
				context.getBean(OutputTransactionCoordinator.class), failedJournal);
		degraded.start();
		try {
			final Reply readiness = request(degraded.getPort(), "GET", "/readyz");
			assertEquals(503, readiness.status);
			assertTrue(readiness.body.contains("ready=false\n"));
			assertTrue(readiness.body.contains("deliveryVote=VETO\n"));
			assertEquals(200, request(degraded.getPort(), "GET", "/healthz").status);
		} finally {
			degraded.close();
		}
	}

	@Test
	public void explicitLimitFifteenPreservesTheClassicAnswer() throws Exception {
		final Reply reply = request("GET", "/fizzbuzz?limit=15");
		assertEquals(200, reply.status);
		assertEquals(expected(15), reply.body);
		assertTrue(reply.body.endsWith("FizzBuzz" + System.getProperty("line.separator")));
	}

	@Test
	public void absentLimitReceivesTheHundredNumberMandate() throws Exception {
		final Reply reply = request("GET", "/fizzbuzz");
		assertEquals(200, reply.status);
		assertEquals(expected(100), reply.body);
	}

	@Test
	public void invalidMandateIsRejectedBeforeGeneration() throws Exception {
		assertEquals(400, request("GET", "/fizzbuzz?limit=-1").status);
		assertEquals(400, request("GET", "/fizzbuzz?limit=1001").status);
		assertEquals(400, request("GET", "/fizzbuzz?limit=3&extra=1").status);
	}

	@Test
	public void emptyMandateReturnsAnEmptyRecord() throws Exception {
		final Reply reply = request("GET", "/fizzbuzz?limit=0");
		assertEquals(200, reply.status);
		assertEquals("", reply.body);
	}

	@Test
	public void prefixLookalikesAreNotRecognizedAsDesks() throws Exception {
		assertEquals(404, request("GET", "/fizzbuzz-extra?limit=3").status);
		assertEquals(404, request("GET", "/healthz-extra").status);
	}

	@Test
	public void nonGetMethodIsNotAuthorized() throws Exception {
		assertEquals(405, request("POST", "/fizzbuzz?limit=3").status);
	}

	@Test
	public void auditDeskProjectsTheCommittedMessages() throws Exception {
		request("GET", "/fizzbuzz?limit=3");
		final Reply status = request("GET", "/audit/status");
		assertEquals(200, status.status);
		assertTrue(status.body.contains("committed=" + journal.snapshot().size() + "\n"));
		assertTrue(status.body.contains("aborted=0\n"));
		assertTrue(status.body.contains("pending=0\n"));
		assertTrue(status.body.contains("deadLetters=0\n"));
		assertTrue(status.body.contains("chainValid=true\n"));
	}

	@Test
	public void evidenceDeskDeclaresOpenCertificationFindings() throws Exception {
		final Reply evidence = request("GET", "/audit/evidence");
		assertEquals(200, evidence.status);
		assertEquals("application/json; charset=UTF-8", evidence.contentType);
		assertTrue(evidence.body.contains("\"schema\":\"slopbuzz-evidence/v1\""));
		assertTrue(evidence.body.contains("\"certification\":\"none\""));
		assertTrue(evidence.body.contains("\"ISO-9000\":\"OPEN\""));
		assertTrue(evidence.body.contains("\"SOC-2\":\"OPEN\""));
		assertEquals(405, request("POST", "/audit/evidence").status);
	}

	@Test
	public void simultaneousHearingsKeepTheirOutputSeparate() throws Exception {
		final ExecutorService applicants = Executors.newFixedThreadPool(2);
		try {
			final Future<Reply> fifteen = applicants.submit(new Callable<Reply>() {
				@Override
				public Reply call() throws Exception {
					return request("GET", "/fizzbuzz?limit=15");
				}
			});
			final Future<Reply> sixteen = applicants.submit(new Callable<Reply>() {
				@Override
				public Reply call() throws Exception {
					return request("GET", "/fizzbuzz?limit=16");
				}
			});
			assertEquals(expected(15), fifteen.get().body);
			assertEquals(expected(16), sixteen.get().body);
		} finally {
			applicants.shutdownNow();
		}
	}

	private static Reply request(final String method, final String path) throws Exception {
		return request(server.getPort(), method, path);
	}

	private static Reply request(final int port, final String method, final String path)
			throws Exception {
		final URL url = new URL("http://127.0.0.1:" + port + path);
		final HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		connection.setConnectTimeout(5000);
		connection.setReadTimeout(5000);
		connection.setRequestMethod(method);
		try {
			final int status = connection.getResponseCode();
			final InputStream stream = status < 400
					? connection.getInputStream() : connection.getErrorStream();
			final ByteArrayOutputStream bytes = new ByteArrayOutputStream();
			try {
				final byte[] buffer = new byte[512];
				int read;
				while ((read = stream.read(buffer)) != -1) {
					bytes.write(buffer, 0, read);
				}
			} finally {
				stream.close();
			}
			return new Reply(status, new String(bytes.toByteArray(), StandardCharsets.UTF_8),
					connection.getHeaderField("Content-Type"),
					connection.getHeaderField("Content-Security-Policy"),
					connection.getHeaderField("X-SlopBuzz-Cache"));
		} finally {
			connection.disconnect();
		}
	}

	private static String expected(final int limit) {
		final StringBuilder result = new StringBuilder();
		for (int number = 1; number <= limit; number++) {
			if (number % 15 == 0) {
				result.append("FizzBuzz");
			} else if (number % 3 == 0) {
				result.append("Fizz");
			} else if (number % 5 == 0) {
				result.append("Buzz");
			} else {
				result.append(number);
			}
			result.append(System.getProperty("line.separator"));
		}
		return result.toString();
	}

	private static long jsonNumber(final String json, final String field) {
		final Matcher matcher = Pattern.compile("\"" + field + "\":([0-9]+)").matcher(json);
		assertTrue("Missing scorecard field " + field, matcher.find());
		return Long.parseLong(matcher.group(1));
	}

	private static Reply awaitScorecard(final int port, final String field,
			final long expected) throws Exception {
		Reply reply = null;
		for (int attempt = 0; attempt < 50; attempt++) {
			reply = request(port, "GET", "/operations/scorecard");
			if (jsonNumber(reply.body, field) >= expected) {
				return reply;
			}
			Thread.sleep(10);
		}
		return reply;
	}

	private static final class Reply {
		private final int status;
		private final String body;
		private final String contentType;
		private final String contentSecurityPolicy;
		private final String cacheState;

		private Reply(final int status, final String body, final String contentType,
				final String contentSecurityPolicy, final String cacheState) {
			this.status = status;
			this.body = body;
			this.contentType = contentType;
			this.contentSecurityPolicy = contentSecurityPolicy;
			this.cacheState = cacheState;
		}
	}
}
