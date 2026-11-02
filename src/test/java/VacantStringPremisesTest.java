import static org.junit.Assert.*;
import java.util.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises.PremisesDocuments.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.audit.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings.*;

@RunWith(Parameterized.class)
public class VacantStringPremisesTest {
    @Parameterized.Parameters(name="ordinal {0}") public static Collection<Object[]> properties() { List<Object[]> cases = new ArrayList<Object[]>(); for (int i = 1; i <= 140; i++) cases.add(new Object[]{i}); return cases; }
    private final int ordinal;
    public VacantStringPremisesTest(int ordinal) { this.ordinal = ordinal; }
    @Test public void propertyConditionIsInspectedAndTheCharacterIsNamedBeforeLeasing() {
        PremisesDossier d = VacantStringPremisesDirectorate.standard().rehearse(String.valueOf(ordinal), "survey");
        assertEquals("APPROVED", d.status); assertEquals(6, d.steps.size());
        assertEquals(ordinal % 7 == 0 ? 1 : 0, d.initialLength.intValue());
        assertEquals(ordinal % 7 == 0 ? "DISCOVERED" : "APPROVED", d.steps.get(1).state);
        assertEquals(ordinal % 7 == 0 ? "APPROVED" : "NOT_REQUIRED", d.steps.get(2).state);
        assertTrue(d.steps.get(3).finding.contains("zero characters"));
        if (ordinal % 7 == 0) {
            int[] independentlyRegistered = {0x00A0, 0x000A, 0x0009, 0x000B, 0x0007, 0x000D, 0x000C, 0x200B, 0xFEFF, 0x2060};
            assertEquals(independentlyRegistered[(ordinal / 7 - 1) % 10], d.tenants.get(0).point);
            assertTrue(d.steps.get(1).finding.contains(d.tenants.get(0).codePoint));
            assertTrue(d.steps.get(1).finding.contains(d.tenants.get(0).name));
        }
        for (char c : d.toJson().toCharArray()) assertTrue("No raw control or invisible character may enter the readable papers", c >= 32 && c <= 126);
    }
    @Test public void actualPublicationAndAuditContainOnlyTheIndependentFizzBuzzAnswer() throws Exception {
        OutputAuditJournal journal = JvmAuditJournalFactory.create(new EphemeralAuditStore());
        OutputTransactionCoordinator transactions = new OutputTransactionCoordinator(journal);
        BoundedExecutionLedger ledger = new BoundedExecutionLedger();
        String expected = ordinal % 15 == 0 ? "FizzBuzz" : ordinal % 3 == 0 ? "Fizz" : ordinal % 5 == 0 ? "Buzz" : String.valueOf(ordinal);
        expected += System.getProperty("line.separator");
        try (ExecutionCustody.Capture observer = ExecutionCustody.capture(ledger); OutputCapture audience = transactions.capture()) {
            transactions.begin(ordinal); transactions.stageOrWrite(expected); transactions.commit(); assertEquals(expected, audience.getText());
        }
        assertEquals(1, journal.snapshot().size()); assertEquals(expected, journal.snapshot().get(0).getPayload());
        assertEquals(OutputDisposition.COMMITTED, journal.snapshot().get(0).getDisposition());
        String evidence = ledger.toJson();
        assertTrue(evidence.indexOf("PREMISES_CERTIFICATE") < evidence.indexOf("FRAGMENT"));
        assertTrue(evidence.indexOf("PREMISES_RELEASE") > evidence.indexOf("PUBLICATION"));
        assertEquals(ordinal % 7 == 0, evidence.contains("PREMISES_DISCOVERY"));
    }
}
