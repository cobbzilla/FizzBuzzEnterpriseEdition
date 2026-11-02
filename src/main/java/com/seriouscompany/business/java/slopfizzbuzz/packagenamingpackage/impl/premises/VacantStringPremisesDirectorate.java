package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises.PremisesDocuments.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings.ExecutionCustody;

@Service
public final class VacantStringPremisesDirectorate {
    private static final String[] OFFICES = {"Premises Allocation Office", "Character-by-Character Vacancy Inspector", "Hidden Occupant Eviction Authority", "Vacancy Reinspection Office", "Single-Use Occupancy Lease Authority", "Independent Premises Auditor"};
    private final PremisesAllocator allocator;
    private final VacancyInspector inspector;
    private final EvictionAuthority evictions;
    private final OccupancyLeaseAuthority leases;
    private final PremisesAuditor auditor;
    @Autowired public VacantStringPremisesDirectorate(PremisesAllocator allocator, VacancyInspector inspector, EvictionAuthority evictions, OccupancyLeaseAuthority leases, PremisesAuditor auditor) {
        this.allocator = allocator; this.inspector = inspector; this.evictions = evictions; this.leases = leases; this.auditor = auditor;
    }
    public static VacantStringPremisesDirectorate standard() {
        return new VacantStringPremisesDirectorate(new OccasionallyOccupiedPremisesAllocator(), new CharacterByCharacterVacancyInspector(), new RegisteredHiddenOccupantEvictionAuthority(), new SingleUseOccupancyLeaseAuthority(), new IndependentPremisesAuditor());
    }
    public Lease lease(String ordinal) {
        Outcome result = execute(new Request(ordinal, "MANDATE"), allocator, inspector, evictions, leases, ExecutionCustody.observing());
        if (result.failure != null) throw result.failure;
        return result.lease;
    }
    public static boolean scenarioExists(String scenario) {
        if ("survey".equals(scenario) || "vacant".equals(scenario) || "occupied".equals(scenario) || "borrowed-lease".equals(scenario) || "reused-lease".equals(scenario) || "failed-eviction".equals(scenario)) return true;
        for (int i = 0; i < HiddenOccupantRegistry.size(); i++) if (HiddenOccupantRegistry.id(i).equals(scenario)) return true;
        return false;
    }
    public PremisesDossier rehearse(String ordinal, final String scenario) {
        if (!scenarioExists(scenario)) throw new IllegalArgumentException("Unknown premises scenario.");
        final Request request = new Request(ordinal, "REHEARSAL");
        final String contents = "vacant".equals(scenario) || "borrowed-lease".equals(scenario) || "reused-lease".equals(scenario) ? ""
            : "occupied".equals(scenario) ? "Fizz moved in without a lease"
            : "failed-eviction".equals(scenario) ? HiddenOccupantRegistry.character("non-breaking-space")
            : "survey".equals(scenario) ? null : HiddenOccupantRegistry.character(scenario);
        PremisesAllocator specimen = contents == null ? allocator : new PremisesAllocator() { public Unit allocate(Request r) { return new Unit(r, contents); } };
        final Unit foreign = "borrowed-lease".equals(scenario) ? new Unit(new Request(ordinal, "REHEARSAL"), "") : null;
        final Lease borrowed = foreign == null ? null : foreign.issue(new Survey(foreign));
        OccupancyLeaseAuthority specimenLeases = borrowed != null ? new OccupancyLeaseAuthority() { public Lease issue(Request r, Unit unit, Survey vacancy) { return borrowed; } }
            : "reused-lease".equals(scenario) ? new OccupancyLeaseAuthority() { public Lease issue(Request r, Unit unit, Survey vacancy) { Lease lease = unit.issue(vacancy); lease.close(); return lease; } } : leases;
        EvictionAuthority specimenEvictions = "failed-eviction".equals(scenario) ? new EvictionAuthority() { public void evacuate(Unit unit, Survey survey) { /* A management-appointed bailiff files the notice and does nothing. */ } } : evictions;
        try {
            Outcome result = execute(request, specimen, inspector, specimenEvictions, specimenLeases, true);
            if (result.lease != null) result.lease.close();
            return result.dossier;
        } finally { if (borrowed != null) borrowed.close(); }
    }
    private Outcome execute(Request request, PremisesAllocator allocation, VacancyInspector inspection, EvictionAuthority eviction, OccupancyLeaseAuthority issuing, boolean collect) {
        ExecutionCustody.ordinal(request.ordinal);
        List<Step> decisions = collect ? new ArrayList<Step>() : null;
        Unit owned = null; Survey initial = null; int stage = 0;
        try {
            Unit unit = allocation.allocate(request);
            if (unit == null || unit.request != request || !unit.unleased()) throw new IllegalStateException("The allocated premises are missing, foreign, already leased or closed.");
            owned = unit;
            pass(decisions, stage++, "APPROVED", "Allocated request-bound premises for ordinal " + request.ordinal + ". No occupancy permission has yet been issued.", "Allocation record: this request owns this buffer.");
            String beforeSurvey = unit.snapshot();
            Survey candidate = inspection.inspect(unit); requireSurvey(unit, candidate);
            if (!beforeSurvey.equals(candidate.snapshot)) throw new IllegalStateException("The inspector changed the premises before declaring its initial occupants.");
            initial = candidate;
            pass(decisions, stage++, initial.tenants.isEmpty() ? "APPROVED" : "DISCOVERED", initial.describe(), "Initial occupancy: " + initial.snapshot.length() + " UTF-16 units. Names and code points are displayed instead of raw controls.");
            if (!initial.tenants.isEmpty()) {
                eviction.evacuate(unit, initial);
                if (!unit.snapshot().isEmpty()) throw new IllegalStateException("The eviction office returned without removing every hidden occupant.");
                pass(decisions, stage++, "APPROVED", "Removed " + initial.tenants.size() + " identified hidden occupant(s) under the registered removal procedure.", "Eviction completed before numerical assembly; no discovered character enters Official output.");
            } else pass(decisions, stage++, "NOT_REQUIRED", "No eviction was required because the initial survey found no occupants.", "No eviction order issued.");
            Survey vacancy = inspection.inspect(unit); requireSurvey(unit, vacancy);
            if (!vacancy.snapshot.isEmpty() || !vacancy.tenants.isEmpty()) throw new IllegalStateException("Reinspection found occupied premises. A vacancy certificate was refused.");
            pass(decisions, stage++, "APPROVED", "Reinspection verified exactly zero characters before occupancy.", "Vacancy certificate: character count 0. Memory capacity has not been measured or claimed to be zero.");
            Lease lease = issuing.issue(request, unit, vacancy);
            requireLease(request, unit, vacancy, lease);
            pass(decisions, stage++, "APPROVED", "Issued a single-use, request-bound lease for ordinal " + request.ordinal + ".", "Lease binds this request, this premises and this vacant survey.");
            auditor.authorize(request, unit, vacancy, lease); requireLease(request, unit, vacancy, lease);
            pass(decisions, stage++, "APPROVED", "Independent audit admitted the vacant premises for numerical habitation.", "The actual text may now move in. The vacancy finding describes the pre-occupancy inspection only.");
            PremisesDossier dossier = collect ? new PremisesDossier(request, initial, decisions, true) : null;
            if (ExecutionCustody.observing()) ExecutionCustody.record("PREMISES_CERTIFICATE", "Vacant String Real Estate and Occupancy Directorate", "Vacancy certified; the ordinal may now occupy its leased output buffer.", dossier.toJson());
            return new Outcome(lease, dossier, null);
        } catch (RuntimeException failure) {
            String finding = failure.getMessage() == null ? "The premises office could not issue a valid decision." : failure.getMessage();
            int rejected = Math.min(stage, OFFICES.length - 1);
            pass(decisions, rejected, "REJECTED", finding, "No occupancy authorization was issued at this stage.");
            for (int i = rejected + 1; i < OFFICES.length; i++) if (decisions != null) decisions.add(new Step(OFFICES[i], "NOT_REACHED", "An earlier office refused the premises.", "No document issued."));
            if (owned != null) owned.abandon(request);
            return new Outcome(null, collect ? new PremisesDossier(request, initial, decisions, false) : null, failure);
        }
    }
    private static void requireSurvey(Unit unit, Survey survey) {
        if (survey == null || survey.unit != unit || !unit.unleased() || !survey.snapshot.equals(unit.snapshot())) throw new IllegalStateException("The inspector supplied a missing, stale or foreign survey.");
    }
    private static void requireLease(Request request, Unit unit, Survey vacancy, Lease lease) {
        if (lease == null || lease.request() != request || !lease.belongsTo(unit, vacancy) || !unit.snapshot().isEmpty()) throw new IllegalStateException("The issued lease is missing, borrowed, already consumed, or belongs to occupied premises.");
    }
    private static void pass(List<Step> decisions, int stage, String state, String finding, String document) {
        if (decisions != null) decisions.add(new Step(OFFICES[stage], state, finding, document));
        if (ExecutionCustody.observing()) ExecutionCustody.record("PREMISES_" + (stage == 1 && "DISCOVERED".equals(state) ? "DISCOVERY" : state), OFFICES[stage], finding, document);
    }
    private static final class Outcome {
        final Lease lease; final PremisesDossier dossier; final RuntimeException failure;
        Outcome(Lease lease, PremisesDossier dossier, RuntimeException failure) { this.lease = lease; this.dossier = dossier; this.failure = failure; }
    }
}
