package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings.ExecutionCustody;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings.ExecutionEvent;

/** Request identity and buffer custody are object-bound, never inferred from matching printable case numbers. */
public final class PremisesDocuments {
    private PremisesDocuments() { }
    public static final class Request {
        public final String ordinal, purpose;
        public Request(String ordinal, String purpose) {
            if (ordinal == null || ordinal.length() == 0 || ordinal.charAt(0) < '1' || ordinal.charAt(0) > '9') throw new IllegalArgumentException("A premises request needs a positive canonical decimal ordinal.");
            for (int i = 1; i < ordinal.length(); i++) if (ordinal.charAt(i) < '0' || ordinal.charAt(i) > '9') throw new IllegalArgumentException("A premises ordinal contains an unauthorized character.");
            if (!"MANDATE".equals(purpose) && !"REHEARSAL".equals(purpose)) throw new IllegalArgumentException("Unknown premises purpose.");
            this.ordinal = ordinal; this.purpose = purpose;
        }
    }
    public static final class Unit {
        public final Request request;
        private final StringBuilder buffer;
        private Lease lease;
        private boolean closed;
        public Unit(Request request, String initial) {
            if (request == null || initial == null || initial.length() > 256) throw new IllegalArgumentException("Initial premises surveys admit at most 256 UTF-16 units.");
            this.request = request; this.buffer = new StringBuilder(initial);
        }
        public String snapshot() { return buffer.toString(); }
        public boolean unleased() { return !closed && lease == null; }
        public void removeHiddenOccupants(Survey survey) {
            requireCurrent(survey);
            for (Tenant tenant : survey.tenants) if (!tenant.recognized) throw new IllegalStateException("Visible or unregistered occupants require a different eviction jurisdiction: " + tenant.name + " " + tenant.codePoint + ".");
            buffer.setLength(0);
        }
        public Lease issue(Survey survey) {
            requireCurrent(survey);
            if (buffer.length() != 0) throw new IllegalStateException("Occupied premises cannot receive a vacancy lease.");
            lease = new Lease(this, survey); return lease;
        }
        private void requireCurrent(Survey survey) {
            if (!unleased() || survey == null || survey.unit != this || !snapshot().equals(survey.snapshot)) throw new IllegalStateException("The survey is stale, foreign, or the premises have already been leased.");
        }
        public void abandon(Request owner) { if (owner != request) throw new IllegalStateException("A request cannot release another request's premises."); closed = true; buffer.setLength(0); }
    }
    public static final class Tenant {
        public final int position, point;
        public final String name, codePoint, excuse;
        public final boolean recognized;
        private Tenant(int position, int point) { this.position = position; this.point = point; name = HiddenOccupantRegistry.name(point); codePoint = HiddenOccupantRegistry.code(point); excuse = HiddenOccupantRegistry.excuse(point); recognized = HiddenOccupantRegistry.recognized(point); }
        public String toJson() { return "{\"position\":" + position + ",\"codePoint\":" + ExecutionEvent.quote(codePoint) + ",\"name\":" + ExecutionEvent.quote(name) + ",\"excuse\":" + ExecutionEvent.quote(excuse) + ",\"recognized\":" + recognized + "}"; }
    }
    public static final class Survey {
        public final Unit unit;
        public final String snapshot;
        public final List<Tenant> tenants;
        public Survey(Unit unit) {
            if (unit == null || !unit.unleased()) throw new IllegalStateException("Only allocated, unleased premises may be surveyed.");
            this.unit = unit; this.snapshot = unit.snapshot();
            List<Tenant> found = new ArrayList<Tenant>();
            for (int i = 0; i < snapshot.length();) { int point = Character.codePointAt(snapshot, i); found.add(new Tenant(i, point)); i += Character.charCount(point); }
            tenants = Collections.unmodifiableList(found);
        }
        public String describe() {
            if (tenants.isEmpty()) return "No characters occupied the premises at this inspection.";
            StringBuilder out = new StringBuilder();
            for (Tenant tenant : tenants) { if (out.length() > 0) out.append(" "); out.append("Identified ").append(tenant.name).append(" (").append(tenant.codePoint).append(") at UTF-16 position ").append(tenant.position).append(". ").append(tenant.excuse); }
            return out.toString();
        }
    }
    public static final class Lease implements AutoCloseable {
        private final Unit unit;
        private final Survey survey;
        private Lease(Unit unit, Survey survey) { this.unit = unit; this.survey = survey; }
        public Request request() { return unit.request; }
        public boolean belongsTo(Unit expected, Survey vacancy) { return unit == expected && survey == vacancy && unit.lease == this && !unit.closed; }
        private void active() { if (unit.closed || unit.lease != this) throw new IllegalStateException("An expired or foreign lease cannot occupy this buffer."); }
        public void append(String fragment) { active(); if (fragment == null) throw new IllegalArgumentException("Null is not an approved occupant."); unit.buffer.append(fragment); }
        public String text() { active(); return unit.buffer.toString(); }
        public int length() { active(); return unit.buffer.length(); }
        public void close() {
            if (!unit.closed) {
                int occupants = unit.buffer.length(); unit.abandon(unit.request);
                if (ExecutionCustody.observing()) ExecutionCustody.record("PREMISES_RELEASE", "Occupancy Custody Office", "Released ordinal " + unit.request.ordinal + "'s premises after housing " + occupants + " UTF-16 units. The pre-occupancy vacancy certificate remains a historical finding.");
            }
        }
    }
    public static final class Step {
        public final String office, state, finding, document;
        public Step(String office, String state, String finding, String document) { this.office = office; this.state = state; this.finding = finding; this.document = document; }
        public String toJson() { return "{\"office\":" + ExecutionEvent.quote(office) + ",\"state\":" + ExecutionEvent.quote(state) + ",\"finding\":" + ExecutionEvent.quote(finding) + ",\"document\":" + ExecutionEvent.quote(document) + "}"; }
    }
}
