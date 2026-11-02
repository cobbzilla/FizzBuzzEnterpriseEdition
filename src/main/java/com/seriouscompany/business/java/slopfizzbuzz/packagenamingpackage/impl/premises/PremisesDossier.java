package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises;
import java.util.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises.PremisesDocuments.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.proceedings.ExecutionEvent;

/** Immutable pre-occupancy findings. A vacancy certificate is never a claim that a subsequently occupied buffer stays empty. */
public final class PremisesDossier {
    public final String ordinal, purpose, status;
    public final Integer initialLength;
    public final boolean vacancyCertified;
    public final List<Tenant> tenants;
    public final List<Step> steps;
    public PremisesDossier(Request request, Survey initial, List<Step> steps, boolean approved) {
        ordinal = request.ordinal; purpose = request.purpose; status = approved ? "APPROVED" : "REJECTED";
        initialLength = initial == null ? null : Integer.valueOf(initial.snapshot.length());
        tenants = initial == null ? Collections.<Tenant>emptyList() : initial.tenants;
        this.steps = Collections.unmodifiableList(new ArrayList<Step>(steps));
        vacancyCertified = steps.size() > 3 && "APPROVED".equals(steps.get(3).state);
    }
    public String toJson() {
        StringBuilder out = new StringBuilder("{\"schema\":\"slopbuzz-premises/v1\",\"ordinal\":").append(ExecutionEvent.quote(ordinal))
            .append(",\"purpose\":").append(ExecutionEvent.quote(purpose)).append(",\"status\":").append(ExecutionEvent.quote(status))
            .append(",\"initialLength\":").append(initialLength == null ? "null" : initialLength.toString())
            .append(",\"vacancyCertified\":").append(vacancyCertified).append(",\"tenants\":[");
        for (int i = 0; i < tenants.size(); i++) { if (i > 0) out.append(','); out.append(tenants.get(i).toJson()); }
        out.append("],\"steps\":[");
        for (int i = 0; i < steps.size(); i++) { if (i > 0) out.append(','); out.append(steps.get(i).toJson()); }
        return out.append("]}").toString();
    }
}
