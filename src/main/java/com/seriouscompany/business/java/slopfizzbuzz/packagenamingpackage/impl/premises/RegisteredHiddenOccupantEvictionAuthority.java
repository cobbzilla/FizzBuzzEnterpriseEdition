package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises;
import org.springframework.stereotype.Service;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises.PremisesDocuments.*;
@Service public final class RegisteredHiddenOccupantEvictionAuthority implements EvictionAuthority {
    public void evacuate(Unit unit, Survey survey) { unit.removeHiddenOccupants(survey); }
}
