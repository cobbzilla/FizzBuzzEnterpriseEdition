import static org.junit.Assert.*;
import java.util.*;
import java.util.concurrent.*;
import java.math.BigInteger;
import org.junit.Test;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises.PremisesDocuments.*;

public class PremisesCustodyTest {
    private VacantStringPremisesDirectorate offices(PremisesAllocator allocation, VacancyInspector inspection, EvictionAuthority eviction, OccupancyLeaseAuthority leasing, PremisesAuditor audit) { return new VacantStringPremisesDirectorate(allocation, inspection, eviction, leasing, audit); }
    @Test public void portableTribunalSustainsAllItsObjections() { assertEquals(109, PremisesCustodyTribunal.rehearse()); }
    @Test public void everyRegisteredCharacterHasAUniqueCodeAndNoAudibleOutput() {
        Set<Integer> seen = new HashSet<Integer>();
        for (int i = 0; i < HiddenOccupantRegistry.size(); i++) { assertTrue(seen.add(HiddenOccupantRegistry.point(i))); assertTrue(HiddenOccupantRegistry.recognized(HiddenOccupantRegistry.point(i))); assertEquals(1, HiddenOccupantRegistry.character(HiddenOccupantRegistry.id(i)).length()); }
        assertTrue(HiddenOccupantRegistry.name(7).contains("BEL"));assertTrue(HiddenOccupantRegistry.excuse(7).contains("No sound"));
    }
    @Test public void fakeEvictionAndForeignLeasesFailAtTheResponsibleOffice() {
        for (String scenario : new String[]{"occupied", "failed-eviction", "borrowed-lease", "reused-lease"}) {
            PremisesDossier dossier = VacantStringPremisesDirectorate.standard().rehearse("7", scenario); assertEquals("REJECTED", dossier.status);
            int stage = scenario.endsWith("lease") ? 4 : 2; assertEquals("REJECTED", dossier.steps.get(stage).state);
            for (int next = stage + 1; next < 6; next++) assertEquals("NOT_REACHED", dossier.steps.get(next).state);
        }
    }
    @Test public void staleAndForeignSurveyPapersCannotAuthorizeAnEvictionOrExposeForeignOccupants() {
        VacancyInspector foreign = new VacancyInspector() { public Survey inspect(Unit unit) { return new Survey(new Unit(new Request("8", "REHEARSAL"), "foreign confidential tenant")); } };
        VacantStringPremisesDirectorate directorate = offices(new OccasionallyOccupiedPremisesAllocator(), foreign, new RegisteredHiddenOccupantEvictionAuthority(), new SingleUseOccupancyLeaseAuthority(), new IndependentPremisesAuditor());
        PremisesDossier dossier = directorate.rehearse("7", "survey"); assertEquals("REJECTED", dossier.status); assertNull(dossier.initialLength);assertTrue(dossier.tenants.isEmpty());assertFalse(dossier.toJson().contains("foreign confidential tenant"));
    }
    @Test public void allocatorCannotLoanAnotherRequestsPremisesEvenWhenOrdinalsMatch() {
        final Unit foreign = new Unit(new Request("7", "MANDATE"), "");
        PremisesAllocator allocator = new PremisesAllocator() { public Unit allocate(Request request) { return foreign; } };
        try { offices(allocator,new CharacterByCharacterVacancyInspector(),new RegisteredHiddenOccupantEvictionAuthority(),new SingleUseOccupancyLeaseAuthority(),new IndependentPremisesAuditor()).lease("7");fail(); } catch (IllegalStateException expected) { assertTrue(foreign.unleased()); }
    }
    @Test public void anInspectorCannotQuietlyEvictTheHiddenTenantBeforeDeclaringItsPresence() {
        VacancyInspector clearingInspector=new VacancyInspector(){public Survey inspect(Unit unit){Survey observed=new Survey(unit);unit.removeHiddenOccupants(observed);return new Survey(unit);}};
        VacantStringPremisesDirectorate office=offices(new OccasionallyOccupiedPremisesAllocator(),clearingInspector,new RegisteredHiddenOccupantEvictionAuthority(),new SingleUseOccupancyLeaseAuthority(),new IndependentPremisesAuditor());
        PremisesDossier dossier=office.rehearse("7","survey");assertEquals("REJECTED",dossier.status);assertEquals("REJECTED",dossier.steps.get(1).state);assertTrue(dossier.steps.get(1).finding.contains("before declaring"));assertNull(dossier.initialLength);
    }
    @Test public void auditRefusalReleasesTheOwnedRoomAndCannotBeOverruledByTheLeaseOffice() {
        final Unit[] allocated = new Unit[1];
        PremisesAllocator allocator = new PremisesAllocator(){public Unit allocate(Request request){return allocated[0] = new Unit(request, "");}};
        PremisesAuditor veto = new PremisesAuditor(){public void authorize(Request request, Unit unit, Survey survey, Lease lease){throw new IllegalStateException("Independent audit veto");}};
        try { offices(allocator,new CharacterByCharacterVacancyInspector(),new RegisteredHiddenOccupantEvictionAuthority(),new SingleUseOccupancyLeaseAuthority(),veto).lease("1");fail(); } catch (IllegalStateException expected) { assertEquals("Independent audit veto",expected.getMessage());assertFalse(allocated[0].unleased());assertEquals("",allocated[0].snapshot()); }
    }
    @Test public void invisibleButUnregisteredNullCharactersCannotBeSilentlyDiscarded() {
        PremisesAllocator allocator=new PremisesAllocator(){public Unit allocate(Request request){return new Unit(request,"\u0000");}};
        try{offices(allocator,new CharacterByCharacterVacancyInspector(),new RegisteredHiddenOccupantEvictionAuthority(),new SingleUseOccupancyLeaseAuthority(),new IndependentPremisesAuditor()).lease("7");fail();}catch(IllegalStateException expected){assertTrue(expected.getMessage().contains("U+0000"));}
    }
    @Test public void supplementaryUnexpectedTenantsOccupyTwoUnitsAndCannotEvadeTheSurvey() {
        Request request=new Request("1","REHEARSAL");Unit unit=new Unit(request,"\uD83D\uDE80");Survey survey=new Survey(unit);assertEquals(2,survey.snapshot.length());assertEquals(1,survey.tenants.size());assertEquals("U+1F680",survey.tenants.get(0).codePoint);
        try{unit.removeHiddenOccupants(survey);fail();}catch(IllegalStateException expected){assertEquals("\uD83D\uDE80",unit.snapshot());}
    }
    @Test public void hugeOrdinalsKeepExactResiduesWithoutNarrowingOrRecursiveParsing() {
        StringBuilder digits=new StringBuilder("1");for(int i=0;i<999;i++)digits.append('0');digits.append('7');String ordinal=digits.toString();
        PremisesDossier d=VacantStringPremisesDirectorate.standard().rehearse(ordinal,"survey");assertEquals(ordinal,d.ordinal);assertEquals(new BigInteger(ordinal).mod(BigInteger.valueOf(7)).signum()==0?1:0,d.initialLength.intValue());
    }
    @Test public void anEmptyRoomCanHouseArbitrarilyLongAuthorizedTextAfterItsVacancySnapshot() {
        try(Lease lease=VacantStringPremisesDirectorate.standard().lease("7")){StringBuilder text=new StringBuilder();for(int i=0;i<10000;i++)text.append('7');lease.append(text.toString());assertEquals(10000,lease.length());assertEquals(text.toString(),lease.text());}
    }
    @Test public void simultaneousRequestsRetainIndependentRoomsLeasesAndContents() throws Exception {
        final VacantStringPremisesDirectorate office=VacantStringPremisesDirectorate.standard();ExecutorService threads=Executors.newFixedThreadPool(8);
        try{List<Future<String>> pending=new ArrayList<Future<String>>();for(int i=1;i<=64;i++){final String ordinal=String.valueOf(i);pending.add(threads.submit(new Callable<String>(){public String call(){try(Lease lease=office.lease(ordinal)){lease.append(ordinal);return lease.text();}}}));}for(int i=0;i<64;i++)assertEquals(String.valueOf(i+1),pending.get(i).get());}finally{threads.shutdownNow();}
    }
}
