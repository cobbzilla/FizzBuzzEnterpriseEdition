package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises;
import org.springframework.stereotype.Service;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.premises.PremisesDocuments.*;
@Service public final class CharacterByCharacterVacancyInspector implements VacancyInspector {
    public Survey inspect(Unit unit) { return new Survey(unit); }
}
