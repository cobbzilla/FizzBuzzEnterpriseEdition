import static org.junit.Assert.*;
import java.util.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent.*;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.precedent.PriorWorkDocuments.*;

/** Three thousand hearings establish that remembering an answer is never an informal privilege. */
@RunWith(Parameterized.class) public class EveryPriorWorkPetitionTest {
 private final int limit;public EveryPriorWorkPetitionTest(int limit){this.limit=limit;}
 @Parameterized.Parameters(name="prior work mandate {0}")public static Collection<Object[]> mandates(){Collection<Object[]> all=new ArrayList<Object[]>();for(int n=0;n<=1000;n++)all.add(new Object[]{n});return all;}
 static String oracle(int limit){StringBuilder text=new StringBuilder();for(int n=1;n<=limit;n++){text.append(n%15==0?"FizzBuzz":n%3==0?"Fizz":n%5==0?"Buzz":String.valueOf(n)).append(System.getProperty("line.separator"));}return text.toString();}
 @Test public void exactPriorTextReceivesFiveActualApprovalsWithoutChangingItsBytes(){String text=oracle(limit);PrecedentDossier d=PriorWorkRatificationDirectorate.standard().inspect(new Petition(limit,limit,text),"MANDATE");assertTrue(d.isApproved());assertSame(text,d.authorizedBody());assertEquals(5,d.getSteps().size());for(PrecedentDossier.Decision step:d.getSteps())assertEquals("APPROVED",step.state);assertTrue(d.toJson().contains("Certificate of Authorized Non-Performance"));assertTrue(d.toJson().length()<8192);}
 @Test public void wrongRepositoryKeyCannotBorrowAnOtherwiseImmaculateAnswer(){PrecedentDossier d=PriorWorkRatificationDirectorate.standard().inspect(new Petition(limit,limit+1,oracle(limit)),"MANDATE");assertFalse(d.isApproved());assertEquals("REJECTED",d.getSteps().get(1).state);for(int i=2;i<5;i++)assertEquals("NOT_REACHED",d.getSteps().get(i).state);}
 @Test public void aCompleteInventoryCannotExcuseIncorrectText(){String body=oracle(limit);if(limit==0)body=System.getProperty("line.separator");else body="9"+body.substring(1);PrecedentDossier d=PriorWorkRatificationDirectorate.standard().inspect(new Petition(limit,limit,body),"MANDATE");assertFalse(d.isApproved());assertEquals("REJECTED",d.getSteps().get(limit==0?2:3).state);assertEquals("NOT_REACHED",d.getSteps().get(4).state);}
}
