package com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.procurement;

import java.util.Collections;
import java.util.List;

/** Portable hostile-supplier proceedings, convened on JVM and both browser targets. */
public final class GlyphProcurementTribunal {
 public static int rehearse() {
  for(int scenario=0;scenario<18;scenario++) reject(scenario);
  for(String product:new String[]{"Fizz","Buzz","FizzBuzz"})
   require(product.equals(GlyphProcurementDirectorate.standard().procure(product).text()),"certified assembly");
  return 21;
 }
 public static void reject(int scenario) {
  GlyphRequisitionAuthority authority=new BoardApprovedGlyphRequisitionAuthority(new ApprovedGlyphCatalog());
  GlyphRequisition requisition=authority.authorize("Fizz");
  List<GlyphDelivery> delivery=new InexhaustibleApprovedGlyphSupplier().deliver(requisition);
  IndependentGlyphReceivingInspector inspector=new IndependentGlyphReceivingInspector();
  List<GlyphAcceptanceCertificate> certificates=inspector.inspect(requisition,delivery);
  GlyphDelivery third=delivery.get(2);
  boolean rejected=false;
  try {
   switch(scenario) {
    case 0: delivery.remove(3);break;
    case 1: delivery.add(third);break;
    case 2: Collections.swap(delivery,2,3);break;
    case 3: delivery.set(2,new GlyphDelivery(authority.authorize("Fizz"),3,third.sku,'z',1));break;
    case 4: delivery.set(2,new GlyphDelivery(requisition,3,GlyphSku.LOWER_I,'z',1));break;
    case 5: delivery.set(2,new GlyphDelivery(requisition,3,third.sku,'Z',1));break;
    case 6: delivery.set(2,new GlyphDelivery(requisition,3,third.sku,'z',0));break;
    case 7: delivery.set(2,new GlyphDelivery(requisition,3,third.sku,'z',2));break;
    case 8: delivery.set(2,null);break;
    case 9: delivery=null;break;
    case 10: requisition=null;break;
    case 11: certificates.set(3,certificates.get(2));break;
    case 12: Collections.swap(certificates,2,3);break;
    case 13: GlyphRequisition foreign=authority.authorize("Fizz");certificates=inspector.inspect(foreign,new InexhaustibleApprovedGlyphSupplier().deliver(foreign));break;
    case 14: certificates.remove(3);break;
    case 15: certificates.set(2,null);break;
    case 16: certificates=null;break;
    case 17: requisition=null;break;
    default: throw new IllegalArgumentException("Unknown tribunal scenario.");
   }
   if(scenario<11) inspector.inspect(requisition,delivery);
   else new CertifiedGlyphAssembler().assemble(requisition,certificates);
  } catch(IllegalStateException expected) { rejected=true; }
  require(rejected,"procurement objection "+scenario);
 }
 private static void require(boolean condition,String message) {
  if(!condition) throw new IllegalStateException("Glyph tribunal failed: "+message);
 }
}
