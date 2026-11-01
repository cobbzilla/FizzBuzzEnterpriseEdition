package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.http;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime.RuntimeClock;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime.SystemRuntimeClock;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.logging.Logger;


import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputCapture;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditJournal;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputTransactionCoordinator;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.AuditStatusProjection;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.compliance.ComplianceEvidenceFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.capacity.CapacityPlanningBureau;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache.CacheLookup;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.cache.OutputCache;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.ProclamationOutcome;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.ServiceLevelScorecard;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.CanaryVerdict;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.SyntheticAssuranceBureau;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.RehearsalAdmissionCommission;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.RehearsalAdmissionReceipt;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.ReleaseCustodyReport;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.RecoveryRehearsalBureau;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.operations.RecoveryVerdict;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.SlopFizzBuzz;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.PersonnelEvidenceCustody;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.PersonnelDossier;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.FirstOrdinalOnboardingDirectorate;

/** Transport-independent proceedings shared by HTTP and browser execution. */
public final class EnterpriseDispatcher {
 private static final Logger LOGGER=Logger.getLogger(EnterpriseDispatcher.class.getName());
 private final java.util.Map<String,DeskHandler> desks=new java.util.HashMap<String,DeskHandler>();
 private interface DeskHandler {void handle(EnterpriseExchange exchange) throws IOException;}
 public EnterpriseDispatcher(SlopFizzBuzz service, OutputTransactionCoordinator transactions, OutputAuditJournal journal, OutputCache cache, ReleaseCustodyReport release) {
 this(service,transactions,journal,cache,release,new SystemRuntimeClock());
 }
 public EnterpriseDispatcher(SlopFizzBuzz service, OutputTransactionCoordinator transactions, OutputAuditJournal journal, OutputCache cache, ReleaseCustodyReport release, final RuntimeClock clock) {
 this(service,transactions,journal,cache,release,clock,new com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime.RuntimeIdentity(){public String toJson(){return "{\"mode\":\"server\",\"engine\":\"JVM\",\"storage\":\"configured JVM audit repository\",\"cache\":\"Redis adapter\",\"protocol\":1}";}});
 }
 public EnterpriseDispatcher(SlopFizzBuzz service, OutputTransactionCoordinator transactions, OutputAuditJournal journal, OutputCache cache, ReleaseCustodyReport release, final RuntimeClock clock, final com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.runtime.RuntimeIdentity identity) {
  final com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.capacity.ExtendedMagnitudeBureau magnitude=new com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.capacity.ExtendedMagnitudeBureau();
  register("/fizzbuzz/window",new DeskHandler(){public void handle(EnterpriseExchange exchange)throws IOException {
   if(!"GET".equals(exchange.getRequestMethod())) {exchange.headers.set("Allow","GET");respond(exchange,405,"Method not authorized\n");return;}
   String query=exchange.getRequestURI().getRawQuery();
   int split=query==null?-1:query.indexOf("&count=");
   if(query==null||!query.startsWith("start=")||split<6||!com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.capacity.ExtendedMagnitudeBureau.isDecimal(query.substring(6,split))||!com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.capacity.ExtendedMagnitudeBureau.isDecimal(query.substring(split+7))||query.substring(split+7).length()>3) {respond(exchange,400,"Use a positive decimal start and a count from 1 through 100\n");return;}
   final PersonnelEvidenceCustody.Capture evidence=PersonnelEvidenceCustody.capture();
   try(PersonnelEvidenceCustody.Capture custody=evidence) {
    java.math.BigInteger start=new java.math.BigInteger(query.substring(6,split));int count=Integer.parseInt(query.substring(split+7));
    String body=magnitude.window(start,count);
    attachPersonnel(exchange,evidence,"CONTINUATION");
    exchange.headers.set("Cache-Control","no-store");exchange.headers.set("X-SlopBuzz-Cache","BYPASS");exchange.headers.set("X-SlopBuzz-Proceedings","TRANSIENT");
    respond(exchange,200,body);
   } catch(IllegalArgumentException invalid) {respond(exchange,400,"Use a positive decimal start and a count from 1 through 100\n");}
   catch(RuntimeException rejected){attachPersonnel(exchange,evidence,"UNAVAILABLE");respond(exchange,500,"Generation failed\n");}
  }});
  register("/onboarding/rehearsal",new DeskHandler(){public void handle(EnterpriseExchange exchange)throws IOException {
   if(!"GET".equals(exchange.getRequestMethod())){exchange.headers.set("Allow","GET");respond(exchange,405,"Method not authorized\n");return;}
   String query=exchange.getRequestURI().getRawQuery();String scenario=query==null?"approved":query.startsWith("scenario=")?query.substring(9):"";
   if(!"approved".equals(scenario)&&!"zero".equals(scenario)&&!"two".equals(scenario)&&!"missing-induction".equals(scenario)){respond(exchange,400,"Use approved, zero, two or missing-induction\n");return;}
   int candidate="zero".equals(scenario)?0:"two".equals(scenario)?2:1;
   PersonnelDossier dossier=FirstOrdinalOnboardingDirectorate.rehearsal(candidate,!"missing-induction".equals(scenario)).inspect("REHEARSAL");
   exchange.headers.set("Cache-Control","no-store");exchange.headers.set("X-SlopBuzz-Proceedings","READ_ONLY_REHEARSAL");
   respond(exchange,200,dossier.toJson(),"application/json; charset=UTF-8");
  }});
  register("/capacity/forecast/extended",new DeskHandler(){public void handle(EnterpriseExchange exchange)throws IOException {
   if(!"GET".equals(exchange.getRequestMethod())) {exchange.headers.set("Allow","GET");respond(exchange,405,"Method not authorized\n");return;}
   String query=exchange.getRequestURI().getRawQuery();
   if(query==null||!query.startsWith("limit=")||!com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.capacity.ExtendedMagnitudeBureau.isDecimal(query.substring(6))) {respond(exchange,400,"Use a non-negative decimal limit\n");return;}
   exchange.headers.set("Cache-Control","no-store");respond(exchange,200,magnitude.forecast(new java.math.BigInteger(query.substring(6))),"application/json; charset=UTF-8");
  }});
  register("/procurement/dossier",new DeskHandler(){public void handle(EnterpriseExchange exchange)throws IOException {
   if(!"GET".equals(exchange.getRequestMethod())) {exchange.headers.set("Allow","GET");respond(exchange,405,"Method not authorized\n");return;}
   String query=exchange.getRequestURI().getRawQuery();
   String product=query==null?"FizzBuzz":query.startsWith("product=")?query.substring(8):"";
   if(!("Fizz".equals(product)||"Buzz".equals(product)||"FizzBuzz".equals(product))) {respond(exchange,400,"Invalid product; use Fizz, Buzz or FizzBuzz\n");return;}
   respond(exchange,200,com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement.GlyphProcurementDirectorate.standard().procure(product).toJson(),"application/json; charset=UTF-8");
  }});
  final ServiceLevelScorecard scorecard=new ServiceLevelScorecard();
        register("/operations/runtime",new DeskHandler(){public void handle(EnterpriseExchange exchange)throws IOException {
            if(!"GET".equals(exchange.getRequestMethod())){exchange.headers.set("Allow","GET");respond(exchange,405,"Method not authorized\n");return;}
            respond(exchange,200,identity.toJson(),"application/json; charset=UTF-8");
        }});
		register("/fizzbuzz", new FizzBuzzHandler(service, transactions, scorecard, cache, clock));
		register("/operations/scorecard", new ScorecardHandler(scorecard));
		register("/operations/release", new ReleaseHandler(release));
		register("/operations/recovery", new RecoveryHandler(new RecoveryRehearsalBureau(journal,clock)));
		register("/operations/canary", new CanaryHandler(
				new RehearsalAdmissionCommission(
						new SyntheticAssuranceBureau(service, transactions, journal,clock), new RehearsalAdmissionCommission.NanoClock(){public long now(){return clock.nanoTime();}})));
		register("/cache/status", new CacheStatusHandler(cache));
		register("/capacity/forecast", new CapacityForecastHandler());
		register("/healthz", new HealthHandler());
		register("/readyz", new ReadinessHandler(journal));
		register("/audit/status", new AuditStatusHandler(journal));
		register("/audit/evidence", new EvidenceDossierHandler(journal,clock));

 }
 private void register(String path,DeskHandler handler){desks.put(path,handler);}
 private static void attachPersonnel(EnterpriseExchange exchange,PersonnelEvidenceCustody.Capture evidence,String fallback){
  PersonnelDossier dossier=evidence.getDossier();
  exchange.headers.set("X-SlopBuzz-Onboarding-State",dossier==null?fallback:dossier.getStatus());
  if(dossier!=null){String record=dossier.toJson();if(record.length()<=8192)exchange.headers.set("X-SlopBuzz-Onboarding-Trace",record);else exchange.headers.set("X-SlopBuzz-Onboarding-State","UNAVAILABLE");}
 }
 public EnterpriseExchange dispatch(String method,String target) throws IOException {
  EnterpriseExchange exchange=new EnterpriseExchange(method,target);
  DeskHandler handler=desks.get(exchange.getRequestURI().getPath());
  if(handler==null) respond(exchange,404,"Unknown desk\n"); else handler.handle(exchange);
  if("HEAD".equals(method)) exchange.body.reset();
  return exchange;
 }
	private static void respond(final EnterpriseExchange exchange, final int status, final String body)
			throws IOException {
		respond(exchange, status, body, "text/plain; charset=UTF-8");
	}

	private static void respond(final EnterpriseExchange exchange, final int status, final String body,
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

	private static final class CapacityForecastHandler implements DeskHandler {
		private final CapacityPlanningBureau bureau = new CapacityPlanningBureau();

		@Override
		public void handle(final EnterpriseExchange exchange) throws IOException {
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

	private static final class HealthHandler implements DeskHandler {
		@Override
		public void handle(final EnterpriseExchange exchange) throws IOException {
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

	private static final class ReadinessHandler implements DeskHandler {
		private final OperationalReadinessCommission commission;

		private ReadinessHandler(final OutputAuditJournal journal) {
			this.commission = new OperationalReadinessCommission(journal);
		}

		@Override
		public void handle(final EnterpriseExchange exchange) throws IOException {
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

	private static final class FizzBuzzHandler implements DeskHandler {
		private final RuntimeClock clock;
        private final SlopFizzBuzz service;
		private final OutputTransactionCoordinator transactions;
		private final ServiceLevelScorecard scorecard;
		private final OutputCache cache;

		private FizzBuzzHandler(final SlopFizzBuzz service,
				final OutputTransactionCoordinator transactions,
				final ServiceLevelScorecard scorecard, final OutputCache cache, final RuntimeClock clock) {
            this.clock=clock;
			this.service = service;
			this.transactions = transactions;
			this.scorecard = scorecard;
			this.cache = cache;
		}

		@Override
		public void handle(final EnterpriseExchange exchange) throws IOException {
			final long started = clock.nanoTime();
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
					exchange.headers.set("X-SlopBuzz-Onboarding-State","CACHE_REUSED");
					respond(exchange, 200, lookup.getBody());
					outcome = ProclamationOutcome.SUCCESSFUL;
					return;
				}
				final PersonnelEvidenceCustody.Capture evidence=PersonnelEvidenceCustody.capture();
				try (PersonnelEvidenceCustody.Capture custody=evidence; OutputCapture audience = this.transactions.capture()) {
					this.service.slopFizzBuzz(limit.intValue());
					attachPersonnel(exchange,evidence,"UNAVAILABLE");
					final String body = audience.getText();
					if (lookup.getState() == CacheLookup.State.MISS) {
						this.cache.store(limit.intValue(), body);
					}
					respond(exchange, 200, body);
					outcome = ProclamationOutcome.SUCCESSFUL;
				} catch (final RuntimeException failure) {
					attachPersonnel(exchange,evidence,"UNAVAILABLE");
					LOGGER.warning("A SlopFizzBuzz HTTP proclamation failed: " + failure.getMessage());
					respond(exchange, 500, "Generation failed\n");
				}
			} finally {
				if (counted) {
					this.scorecard.record(outcome, Math.max(0L,
							(clock.nanoTime() - started) / 1000L));
				}
				exchange.close();
			}
		}

	}

	private static final class CacheStatusHandler implements DeskHandler {
		private final OutputCache cache;

		private CacheStatusHandler(final OutputCache cache) {
			this.cache = cache;
		}

		@Override
		public void handle(final EnterpriseExchange exchange) throws IOException {
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

	private static final class ScorecardHandler implements DeskHandler {
		private final ServiceLevelScorecard scorecard;

		private ScorecardHandler(final ServiceLevelScorecard scorecard) {
			this.scorecard = scorecard;
		}

		@Override
		public void handle(final EnterpriseExchange exchange) throws IOException {
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

	private static final class ReleaseHandler implements DeskHandler {
		private final ReleaseCustodyReport report;

		private ReleaseHandler(final ReleaseCustodyReport report) {
			this.report = report;
		}

		@Override
		public void handle(final EnterpriseExchange exchange) throws IOException {
			try {
				if (!"/operations/release".equals(exchange.getRequestURI().getPath())) {
					respond(exchange, 404, "Unknown desk\n");
					return;
				}
				if (!"GET".equals(exchange.getRequestMethod())) {
					exchange.getResponseHeaders().set("Allow", "GET");
					respond(exchange, 405, "Method not authorized\n");
					return;
				}
				exchange.getResponseHeaders().set("Cache-Control", "no-store");
				respond(exchange, 200, this.report.toJson(), "application/json; charset=UTF-8");
			} finally {
				exchange.close();
			}
		}
	}

	private static final class CanaryHandler implements DeskHandler {
		private final RehearsalAdmissionCommission commission;

		private CanaryHandler(final RehearsalAdmissionCommission commission) {
			this.commission = commission;
		}

		@Override
		public void handle(final EnterpriseExchange exchange) throws IOException {
			try {
				if (!"/operations/canary".equals(exchange.getRequestURI().getPath())) {
					respond(exchange, 404, "Unknown desk\n");
					return;
				}
				if (!"GET".equals(exchange.getRequestMethod())
						&& !"POST".equals(exchange.getRequestMethod())) {
					exchange.getResponseHeaders().set("Allow", "GET, POST");
					respond(exchange, 405, "Method not authorized\n");
					return;
				}
				exchange.getResponseHeaders().set("Cache-Control", "no-store");
				final CanaryVerdict verdict;
				if ("POST".equals(exchange.getRequestMethod())) {
					final RehearsalAdmissionReceipt receipt = this.commission.convene();
					verdict = receipt.getVerdict();
					exchange.getResponseHeaders().set("X-SlopBuzz-Rehearsal",
							receipt.getDisposition().name());
					exchange.getResponseHeaders().set("X-SlopBuzz-Rehearsal-Lease-Seconds",
							Long.toString(receipt.getLeaseSecondsRemaining()));
				} else {
					verdict = this.commission.latest();
				}
				respond(exchange, verdict.getState() == CanaryVerdict.State.FAILED ? 503 : 200,
						verdict.toJson(), "application/json; charset=UTF-8");
			} finally {
				exchange.close();
			}
		}
	}

	private static final class RecoveryHandler implements DeskHandler {
		private final RecoveryRehearsalBureau bureau;

		private RecoveryHandler(final RecoveryRehearsalBureau bureau) {
			this.bureau = bureau;
		}

		@Override
		public void handle(final EnterpriseExchange exchange) throws IOException {
			try {
				if (!"/operations/recovery".equals(exchange.getRequestURI().getPath())) {
					respond(exchange, 404, "Unknown desk\n");
					return;
				}
				if (!"GET".equals(exchange.getRequestMethod())
						&& !"POST".equals(exchange.getRequestMethod())) {
					exchange.getResponseHeaders().set("Allow", "GET, POST");
					respond(exchange, 405, "Method not authorized\n");
					return;
				}
				exchange.getResponseHeaders().set("Cache-Control", "no-store");
				final RecoveryVerdict verdict = "POST".equals(exchange.getRequestMethod())
						? this.bureau.rehearse() : this.bureau.latest();
				respond(exchange, verdict.getState() == RecoveryVerdict.State.FAILED ? 503 : 200,
						verdict.toJson(), "application/json; charset=UTF-8");
			} finally {
				exchange.close();
			}
		}
	}

	private static final class AuditStatusHandler implements DeskHandler {
		private final OutputAuditJournal journal;
		private final AuditStatusProjection projection = new AuditStatusProjection();

		private AuditStatusHandler(final OutputAuditJournal journal) {
			this.journal = journal;
		}

		@Override
		public void handle(final EnterpriseExchange exchange) throws IOException {
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

	private static final class EvidenceDossierHandler implements DeskHandler {
		private final RuntimeClock clock;
        private final ComplianceEvidenceFactory factory;

		private EvidenceDossierHandler(final OutputAuditJournal journal,final RuntimeClock clock) {
            this.clock=clock;
			this.factory = new ComplianceEvidenceFactory(journal);
		}

		@Override
		public void handle(final EnterpriseExchange exchange) throws IOException {
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
				respond(exchange, 200, this.factory.issue(clock.currentTimeMillis()).toJson(),
						"application/json; charset=UTF-8");
			} finally {
				exchange.close();
			}
		}
	}
}
