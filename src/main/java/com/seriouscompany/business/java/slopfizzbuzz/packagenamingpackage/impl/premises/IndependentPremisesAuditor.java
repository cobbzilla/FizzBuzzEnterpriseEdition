package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises;
import org.springframework.stereotype.Service;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises.PremisesDocuments.*;
@Service public final class IndependentPremisesAuditor implements PremisesAuditor {
    public void authorize(Request request, Unit unit, Survey vacancy, Lease lease) {
        if (unit == null || unit.request != request || vacancy == null || vacancy.unit != unit || !vacancy.snapshot.isEmpty() || !unit.snapshot().isEmpty() || lease == null || lease.request() != request || !lease.belongsTo(unit, vacancy)) throw new IllegalStateException("Independent audit rejected the lease: matching request, premises, vacant survey and active single-use custody are required.");
    }
}
