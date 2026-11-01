package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent;
import org.springframework.stereotype.Service;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent.PriorWorkDocuments.*;
@Service public final class BoundedPrecedentAdmissionOffice implements PrecedentAdmissionOffice {
 public Admission admit(Petition petition){PriorWorkRules.admission(petition);return new Admission(petition);}
}
