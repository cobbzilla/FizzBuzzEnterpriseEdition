import static org.junit.Assert.*;
import java.util.*;
import org.junit.*;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import com.seriouscompany.business.java.slopfizzbuzz.packagenamingpackage.impl.onboarding.*;

@RunWith(Parameterized.class)
public class EveryPersonnelApplicantTest {
 @Parameterized.Parameters(name="candidate {0} seeks the only initial position") public static Collection<Object[]> candidates(){List<Object[]> cases=new ArrayList<Object[]>();for(int i=-50;i<=50;i++)cases.add(new Object[]{i});cases.add(new Object[]{Integer.MIN_VALUE});cases.add(new Object[]{Integer.MAX_VALUE});return cases;}
 private final int candidate;
 public EveryPersonnelApplicantTest(int candidate){this.candidate=candidate;}
 @Test public void noCandidateCanNegotiateTheMeaningOfOne(){PersonnelDossier file=FirstOrdinalOnboardingDirectorate.rehearsal(candidate,true).inspect("REHEARSAL");assertEquals(candidate==1,file.isApproved());if(candidate!=1){assertEquals("REJECTED",file.getSteps().get(2).getState());assertEquals("NOT_REACHED",file.getSteps().get(3).getState());}}
}
