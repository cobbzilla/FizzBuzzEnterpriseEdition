package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http;

import java.net.InetSocketAddress;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.Constants;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputTransactionCoordinator;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.SlopFizzBuzz;

/**
 * Entrypoint for a service desk with a signal-aware closing ceremony.
 */
public final class HttpMain {

	private HttpMain() { }

	public static void main(final String[] args) throws Exception {
		final String configuredPort = System.getenv("PORT");
		final int port = configuredPort == null ? 8080 : Integer.parseInt(configuredPort);
		final ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(Constants.SPRING_XML);
		try {
			final SlopFizzBuzz service =
					(SlopFizzBuzz) context.getBean(Constants.STANDARD_SLOP_FIZZ_BUZZ);
			final OutputTransactionCoordinator transactions =
					context.getBean(OutputTransactionCoordinator.class);
			final SlopFizzBuzzHttpServer server =
					new SlopFizzBuzzHttpServer(new InetSocketAddress(port), service, transactions);
			Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
				@Override
				public void run() {
					server.close();
					context.close();
				}
			}, "slopbuzz-shutdown-committee"));
			server.start();
		} catch (final Exception failure) {
			context.close();
			throw failure;
		}
	}
}
