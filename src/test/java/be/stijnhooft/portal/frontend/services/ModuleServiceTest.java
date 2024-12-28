package be.stijnhooft.portal.frontend.services;

import be.stijnhooft.portal.frontend.dtos.ModuleDto;
import be.stijnhooft.portal.frontend.exceptions.ModuleCollectionNotFoundException;
import be.stijnhooft.portal.frontend.mappers.ModuleMapper;
import be.stijnhooft.portal.frontend.model.Module;
import be.stijnhooft.portal.frontend.model.ModuleCollection;
import be.stijnhooft.portal.frontend.repositories.ModuleCollectionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
public class ModuleServiceTest {

    @InjectMocks
    private ModuleService moduleService;

    @Mock
    private ModuleCollectionRepository moduleCollectionRepository;

    @Mock
    private ModuleMapper moduleMapper;

    @Mock
    private ModuleCollection moduleCollection;


    private Module module1;
    private Module module2;
    private ModuleDto moduleDto1;
    private ModuleDto moduleDto2;
    private List<ModuleDto> moduleDtos;

    @BeforeEach
    public void init() {
        module1 = new Module("module1",  true);
        module2 = new Module("module2",  false);
        moduleDto1 = new ModuleDto("module1", true, 0);
        moduleDto2 = new ModuleDto("module2",  false, 1);
        moduleDtos = Arrays.asList(moduleDto1, moduleDto2);
    }

    @Test
    public void findForUserWhenNothingFound() {
        Throwable exception = assertThrows(ModuleCollectionNotFoundException.class, () -> {
            //mock
            doReturn(Optional.empty()).when(moduleCollectionRepository).findForUser("test");

            //execute
            moduleService.findForUser("test");

            //verify
            verify(moduleCollectionRepository).findForUser("test");
            verifyNoMoreInteractions(moduleCollectionRepository, moduleCollection, moduleMapper);
        });
        assertThat(exception.getMessage()).contains("No module collection for user test found");
    }

    @Test
    public void findAllWhenSuccess() {
        //data set
        List<ModuleDto> modules = Arrays.asList(moduleDto1, moduleDto2);

        //mock
        doReturn(Optional.of(moduleCollection)).when(moduleCollectionRepository).findForUser("test");
        doReturn(modules).when(moduleMapper).map(moduleCollection);

        //execute
        moduleService.findForUser("test");

        //assert and verify
        verify(moduleCollectionRepository).findForUser("test");
        verify(moduleMapper).map(moduleCollection);
        verifyNoMoreInteractions(moduleCollectionRepository, moduleCollection, moduleMapper);
    }

}
