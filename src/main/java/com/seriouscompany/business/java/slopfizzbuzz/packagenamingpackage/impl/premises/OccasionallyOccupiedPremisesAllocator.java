package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises;
import org.springframework.stereotype.Service;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises.PremisesDocuments.*;
@Service public final class OccasionallyOccupiedPremisesAllocator implements PremisesAllocator {
    public Unit allocate(Request request) { return new Unit(request, HiddenOccupantRegistry.initialOccupancy(request.ordinal)); }
}
