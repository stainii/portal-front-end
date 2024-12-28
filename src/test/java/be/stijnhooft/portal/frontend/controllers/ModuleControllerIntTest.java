package be.stijnhooft.portal.frontend.controllers;

import be.stijnhooft.portal.frontend.PortalFrontEnd;
import be.stijnhooft.portal.frontend.dtos.ModuleDto;
import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;

import javax.inject.Inject;
import java.security.Principal;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(classes = PortalFrontEnd.class)
@ActiveProfiles("local")
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        DbUnitTestExecutionListener.class})
public class ModuleControllerIntTest {

    @Inject
    private ModuleController moduleController;

    @Test
    @DatabaseSetup("/datasets/ModuleController-findforLoggedInUser-initial.xml")
    @DatabaseTearDown("/datasets/clear.xml")
    public void findForLoggedInUser() throws Exception {
        List<ModuleDto> expectedModules = Arrays.asList(
                new ModuleDto("test1",  true, 0),
                new ModuleDto("test2", false,1));
        Principal principal = () -> "test";

        List<ModuleDto> actualModules = moduleController.findForLoggedInUser(principal);

        assertEquals(expectedModules, actualModules);
    }

}
