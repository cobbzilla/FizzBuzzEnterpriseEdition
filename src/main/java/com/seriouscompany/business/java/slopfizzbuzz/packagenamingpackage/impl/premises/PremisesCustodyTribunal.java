package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises.PremisesDocuments.*;

/** The same objections must be sustained by the JVM and both browser compilers. */
public final class PremisesCustodyTribunal {
    private PremisesCustodyTribunal() { }
    public static int rehearse() {
        int checks = 0;
        VacantStringPremisesDirectorate office = VacantStringPremisesDirectorate.standard();
        for (int i = 0; i < HiddenOccupantRegistry.size(); i++) {
            PremisesDossier d = office.rehearse("7", HiddenOccupantRegistry.id(i));
            require("APPROVED".equals(d.status) && d.tenants.size() == 1 && d.tenants.get(0).point == HiddenOccupantRegistry.point(i), "identified tenant"); checks++;
            require("DISCOVERED".equals(d.steps.get(1).state) && "APPROVED".equals(d.steps.get(3).state), "eviction before reinspection"); checks++;
        }
        for (String scenario : new String[]{"occupied", "borrowed-lease", "reused-lease", "failed-eviction"}) {
            PremisesDossier d = office.rehearse("7", scenario);
            require("REJECTED".equals(d.status) && d.steps.size() == 6, "objection sustained"); checks++;
        }
        for (int ordinal = 1; ordinal <= 70; ordinal++) {
            PremisesDossier d = office.rehearse(String.valueOf(ordinal), "survey");
            require(d.initialLength.intValue() == (ordinal % 7 == 0 ? 1 : 0), "occasional occupancy"); checks++;
        }
        for (int i = 0; i < 15; i++) { reject(i); checks++; }
        return checks;
    }
    public static void reject(int scenario) {
        final Request request = new Request("7", "REHEARSAL");
        final Unit unit = new Unit(request, "");
        final Survey survey = new Survey(unit);
        boolean refused = false;
        try {
            switch (scenario) {
                case 0: new SingleUseOccupancyLeaseAuthority().issue(new Request("7", "REHEARSAL"), unit, survey); break;
                case 1: unit.issue(new Survey(new Unit(request, ""))); break;
                case 2: { Unit occupied = new Unit(request, "\u00A0"); occupied.issue(new Survey(occupied)); break; }
                case 3: { Unit occupied = new Unit(request, "\u00A0"); Survey stale = new Survey(occupied); occupied.removeHiddenOccupants(stale); occupied.issue(stale); break; }
                case 4: { Lease lease = unit.issue(survey); lease.close(); lease.append("Fizz"); break; }
                case 5: { unit.issue(survey); unit.issue(survey); break; }
                case 6: { Lease lease = unit.issue(survey); lease.close(); unit.issue(survey); break; }
                case 7: unit.abandon(new Request("7", "REHEARSAL")); break;
                case 8: unit.issue(survey).append(null); break;
                case 9: new Request("0", "REHEARSAL"); break;
                case 10: new Request("007", "REHEARSAL"); break;
                case 11: new Request("7x", "REHEARSAL"); break;
                case 12: new Request("7", "A HUMAN SAID YES"); break;
                case 13: { Unit other = new Unit(request, ""); try(Lease borrowed = other.issue(new Survey(other))) { new IndependentPremisesAuditor().authorize(request, unit, survey, borrowed); } break; }
                case 14: {
                    VacancyInspector clandestine = new VacancyInspector() { public Survey inspect(Unit premises) { Survey found = new Survey(premises); premises.removeHiddenOccupants(found); return new Survey(premises); } };
                    new VacantStringPremisesDirectorate(new OccasionallyOccupiedPremisesAllocator(), clandestine, new RegisteredHiddenOccupantEvictionAuthority(), new SingleUseOccupancyLeaseAuthority(), new IndependentPremisesAuditor()).lease("7");
                    break;
                }
                default: throw new IllegalArgumentException("Unknown premises objection.");
            }
        } catch (IllegalArgumentException expected) { refused = true; }
          catch (IllegalStateException expected) { refused = true; }
        finally { unit.abandon(request); }
        require(refused, "unauthorized custody must be refused: " + scenario);
    }
    private static void require(boolean ok, String finding) { if (!ok) throw new IllegalStateException("Premises tribunal failed: " + finding); }
}
