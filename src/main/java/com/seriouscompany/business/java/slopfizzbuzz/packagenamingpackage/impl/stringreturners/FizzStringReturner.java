package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.stringreturners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.interfaces.stringreturners.StringStringReturner;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement.GlyphProcurementDirectorate;

/** No syllable enters circulation without a completed purchasing proceeding. */
@Service
public class FizzStringReturner implements StringStringReturner {
 private final GlyphProcurementDirectorate procurement;
 public FizzStringReturner() { this(GlyphProcurementDirectorate.standard()); }
 @Autowired public FizzStringReturner(GlyphProcurementDirectorate procurement) { this.procurement=procurement; }
 public String getReturnString() { return procurement.procure("Fizz").text(); }
}
