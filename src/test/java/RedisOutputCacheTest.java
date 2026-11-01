import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

import org.junit.Test;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache.CacheLookup;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache.RedisOutputCache;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent.PriorWorkDocuments.*;

public class RedisOutputCacheTest {

	@Test
	public void missIsStoredWithExpiryAndNextConsultationHits() throws Exception {
		inspectRedisReuse(false);
	}
    @Test public void replaceableCourtReceivesTheActualRedisCandidate()throws Exception{inspectRedisReuse(true);}
    private void inspectRedisReuse(final boolean inject) throws Exception {
		final ServerSocket listener = new ServerSocket(0);
		listener.setSoTimeout(3000);
		final ExecutorService clerk = Executors.newSingleThreadExecutor();
		final String answer = "1\n2\nFizz\n";
		final Future<List<List<String>>> commands = clerk.submit(new Callable<List<List<String>>>() {
			@Override
			public List<List<String>> call() throws Exception {
				final List<List<String>> received = new ArrayList<List<String>>();
				for (int turn = 0; turn < 3; turn++) {
					final Socket client = listener.accept();
					try {
						received.add(readCommand(client.getInputStream()));
						final String reply = turn == 0 ? "$-1\r\n"
								: turn == 1 ? "+OK\r\n"
								: "$" + answer.getBytes(StandardCharsets.UTF_8).length
										+ "\r\n" + answer + "\r\n";
						client.getOutputStream().write(reply.getBytes(StandardCharsets.UTF_8));
						client.getOutputStream().flush();
					} finally {
						client.close();
					}
				}
				return received;
			}
		});
		try {
            final int[] admitted={0};
            PriorWorkRatificationDirectorate court=new PriorWorkRatificationDirectorate(new PrecedentAdmissionOffice(){public Admission admit(Petition petition){admitted[0]++;return new BoundedPrecedentAdmissionOffice().admit(petition);}},new ExactMandateJurisdictionChamber(),new CompleteLineInventoryOffice(),new NotarialIndependentLexicalBench(),new IndependentlyAuditedNonPerformanceAuthority());
			final RedisOutputCache cache = inject?new RedisOutputCache("127.0.0.1", listener.getLocalPort(),court):new RedisOutputCache("127.0.0.1", listener.getLocalPort());
			assertEquals(CacheLookup.State.MISS, cache.lookup(3).getState());
			cache.store(3, answer);
			final CacheLookup hit = cache.lookup(3);
			assertEquals(CacheLookup.State.HIT, hit.getState());
			assertEquals(answer, hit.getBody());
            assertTrue(hit.getPrecedent().isApproved());assertEquals(inject?1:0,admitted[0]);
			final List<List<String>> sent = commands.get(5, TimeUnit.SECONDS);
			assertEquals(Arrays.asList("GET", "slopbuzz:fizzbuzz:v1:limit:3"), sent.get(0));
			assertEquals(Arrays.asList("SET", "slopbuzz:fizzbuzz:v1:limit:3", answer,
					"EX", "86400"), sent.get(1));
			assertEquals(sent.get(0), sent.get(2));
			assertTrue(cache.statusJson().contains("\"hits\":1"));
			assertTrue(cache.statusJson().contains("\"misses\":1"));
		} finally {
			listener.close();
			clerk.shutdownNow();
		}
	}

	private static List<String> readCommand(final InputStream input) throws Exception {
		final int count = Integer.parseInt(readLine(input).substring(1));
		final List<String> arguments = new ArrayList<String>();
		for (int index = 0; index < count; index++) {
			final int length = Integer.parseInt(readLine(input).substring(1));
			final byte[] bytes = new byte[length];
			int offset = 0;
			while (offset < length) {
				offset += input.read(bytes, offset, length - offset);
			}
			assertEquals('\r', input.read());
			assertEquals('\n', input.read());
			arguments.add(new String(bytes, StandardCharsets.UTF_8));
		}
		return arguments;
	}

	private static String readLine(final InputStream input) throws Exception {
		final ByteArrayOutputStream bytes = new ByteArrayOutputStream();
		int next;
		while ((next = input.read()) != '\r') {
			if (next < 0) throw new IllegalStateException("Command ended unexpectedly.");
			bytes.write(next);
		}
		assertEquals('\n', input.read());
		return new String(bytes.toByteArray(), StandardCharsets.US_ASCII);
	}
}
