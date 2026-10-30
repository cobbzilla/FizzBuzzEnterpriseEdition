import java.util.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement.GlyphProcurementTribunal;

@RunWith(Parameterized.class)
public class GlyphProcurementObjectionTest {
 @Parameterized.Parameters(name="{1}") public static Collection<Object[]> petitions() {
  String[] names={"missing delivery","surplus allocation","reordered duplicate letters","foreign requisition","wrong SKU","wrong character case","zero quantity","bulk delivery masquerading as one letter","null delivery","missing shipment","missing requisition at receiving","one received z cannot satisfy two purchase order positions","reordered certificates","borrowed certificates from an identical product","missing certificate","blank certificate","missing certificate collection","absent assembly mandate"};
  List<Object[]> cases=new ArrayList<Object[]>();for(int i=0;i<names.length;i++) cases.add(new Object[]{i,names[i]});return cases;
 }
 private final int scenario;
 public GlyphProcurementObjectionTest(int scenario,String name){this.scenario=scenario;}
 @Test public void objectionMustBeSustained(){GlyphProcurementTribunal.reject(scenario);}
}
