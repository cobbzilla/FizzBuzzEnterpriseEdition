import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.InetSocketAddress;
import java.net.URL;
import java.nio.charset.StandardCharsets;
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
		final URL url = new URL("http://127.0.0.1:" + server.getPort() + path);
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
					connection.getHeaderField("Content-Type"));
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

	private static final class Reply {
		private final int status;
		private final String body;
		private final String contentType;

		private Reply(final int status, final String body, final String contentType) {
			this.status = status;
			this.body = body;
			this.contentType = contentType;
		}
	}
}
