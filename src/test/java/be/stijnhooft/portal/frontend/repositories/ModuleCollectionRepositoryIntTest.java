package be.stijnhooft.portal.frontend.repositories;

import be.stijnhooft.portal.frontend.PortalFrontEnd;
import be.stijnhooft.portal.frontend.model.ModuleCollection;
import com.github.springtestdbunit.DbUnitTestExecutionListener;
import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.github.springtestdbunit.annotation.DatabaseTearDown;
import com.github.springtestdbunit.annotation.ExpectedDatabase;
import com.github.springtestdbunit.assertion.DatabaseAssertionMode;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.transaction.TransactionalTestExecutionListener;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = PortalFrontEnd.class)
@ActiveProfiles("local")
@TestExecutionListeners({DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        TransactionalTestExecutionListener.class,
        DbUnitTestExecutionListener.class})
public class ModuleCollectionRepositoryIntTest {

    @Autowired
    private ModuleCollectionRepository repository;

    @Test
    @DatabaseSetup("/datasets/ModuleCollectionRepositoryTest-findForUserWhenSuccess-initial.xml")
    @DatabaseTearDown("/datasets/clear.xml")
    public void findForUser() {
        Optional<ModuleCollection> defaultModuleCollection = repository.findForUser("stijn");
        assertTrue(defaultModuleCollection.isPresent());
        assertEquals(1, defaultModuleCollection.get().getId());
    }

    @Test
    @DatabaseSetup("/datasets/ModuleCollectionRepositoryTest-findForUserWhenNoDefaultDefined-initial.xml")
    @DatabaseTearDown("/datasets/clear.xml")
    public void findForUserWhenUserDoesNotHaveModulesDefined() {
        Optional<ModuleCollection> defaultModuleCollection = repository.findForUser("non-existing");
        assertFalse(defaultModuleCollection.isPresent());
    }

    @Test
    @DatabaseSetup("/datasets/ModuleCollectionRepositoryTest-create-initial.xml")
    @ExpectedDatabase(value = "/datasets/ModuleCollectionRepositoryTest-create-expected.xml", assertionMode = DatabaseAssertionMode.NON_STRICT)
    @DatabaseTearDown("/datasets/clear.xml")
    @Transactional
    public void create() {
        repository.flush();
        ModuleCollection moduleCollection = new ModuleCollection("test");
        moduleCollection = repository.create(moduleCollection);
        repository.flush();
        assertNotNull(moduleCollection);
    }
}
