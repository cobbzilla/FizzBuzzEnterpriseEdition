package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises;
import org.springframework.stereotype.Service;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises.PremisesDocuments.*;
@Service public final class SingleUseOccupancyLeaseAuthority implements OccupancyLeaseAuthority {
    public Lease issue(Request request, Unit unit, Survey vacancy) {
        if (unit.request != request) throw new IllegalStateException("A different request cannot lease these premises.");
        return unit.issue(vacancy);
    }
}
