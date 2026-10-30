import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.JvmAuditJournalFactory;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.AuditEventConsumer;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.AuditStatusProjection;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditEntry;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputAuditJournal;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.OutputDisposition;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.compliance.ComplianceEvidenceDossier;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.compliance.ComplianceEvidenceFactory;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.compliance.ControlResult;

/**
 * The internal control report is evidence, not a certificate of compliance.
 */
public class ComplianceEvidenceDossierTest {

	@Test
	public void emptyInstitutionReportsItsLimitedScopeHonestly() {
		final ComplianceEvidenceDossier dossier =
				new ComplianceEvidenceFactory(JvmAuditJournalFactory.create()).issue(123L);
		assertEquals(ControlResult.PASS, dossier.getChainControl());
		assertEquals(ControlResult.PASS, dossier.getDeliveryControl());
		assertEquals(64, dossier.getEvidenceDigest().length());
		assertTrue(dossier.toJson().contains("\"journalEntries\":0"));
		assertTrue(dossier.toJson().contains("\"certification\":\"none\""));
		assertTrue(dossier.toJson().contains("\"ISO-9000\":\"OPEN\""));
		assertTrue(dossier.toJson().contains("\"SOC-2\":\"OPEN\""));
	}

	@Test
	public void queuedMessageFailsDeliveryControlUntilProjected() {
		final OutputAuditJournal journal = JvmAuditJournalFactory.create();
		final ComplianceEvidenceFactory factory = new ComplianceEvidenceFactory(journal);
		final String before = factory.issue(123L).getEvidenceDigest();
		journal.record(1, "1\n", OutputDisposition.COMMITTED);
		final ComplianceEvidenceDossier waiting = factory.issue(123L);
		assertEquals(ControlResult.FAIL, waiting.getDeliveryControl());
		assertTrue(waiting.toJson().contains("\"pending\":1"));
		assertFalse(before.equals(waiting.getEvidenceDigest()));

		journal.messages().dispatch(new AuditStatusProjection());
		final ComplianceEvidenceDossier delivered = factory.issue(123L);
		assertEquals(ControlResult.PASS, delivered.getDeliveryControl());
		assertTrue(delivered.toJson().contains("\"committed\":1"));
		assertTrue(delivered.toJson().contains("\"pending\":0"));
		assertFalse(waiting.getEvidenceDigest().equals(delivered.getEvidenceDigest()));
	}

	@Test
	public void deadLetterKeepsDeliveryControlFailed() {
		final OutputAuditJournal journal = JvmAuditJournalFactory.create();
		journal.record(2, "unpublished", OutputDisposition.ABORTED);
		final AuditEventConsumer refusing = new AuditEventConsumer() {
			@Override
			public void accept(final OutputAuditEntry entry) {
				throw new IllegalStateException("No suitable pigeonhole.");
			}
		};
		journal.messages().dispatch(refusing);
		journal.messages().dispatch(refusing);
		journal.messages().dispatch(refusing);
		final ComplianceEvidenceDossier dossier = new ComplianceEvidenceFactory(journal).issue(123L);
		assertEquals(ControlResult.FAIL, dossier.getDeliveryControl());
		assertTrue(dossier.toJson().contains("\"aborted\":1"));
		assertTrue(dossier.toJson().contains("\"deadLetters\":1"));
		assertEquals(ControlResult.PASS, dossier.getChainControl());
	}
}
