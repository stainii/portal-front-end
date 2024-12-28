package be.stijnhooft.portal.frontend.mappers;

import be.stijnhooft.portal.frontend.dtos.ModuleDto;
import be.stijnhooft.portal.frontend.model.Module;
import be.stijnhooft.portal.frontend.model.ModuleCollection;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class ModuleMapperTest {

    private ModuleMapper moduleMapper;

    @BeforeEach
    public void init() {
        moduleMapper = new ModuleMapper();
    }

    @Test
    public void mapWhenModuleCollectionIsNull() {
        assertThrows(NullPointerException.class, () ->
            moduleMapper.map((ModuleCollection) null));
    }

    @Test
    public void mapWhenModuleCollectionIsEmpty() throws Exception {
        List<ModuleDto> moduleDtos = moduleMapper.map(new ModuleCollection("test"));
        assertTrue(moduleDtos.isEmpty());
    }

    @Test
    public void mapWhenModuleCollectionHasModules() throws Exception {
        ModuleCollection moduleCollection = new ModuleCollection("test");
        moduleCollection.add(new Module("test1", true));
        moduleCollection.add(new Module("test2", false));
        moduleCollection.add(new Module("test3", false));

        List<ModuleDto> moduleDtos = moduleMapper.map(moduleCollection);

        assertEquals(3, moduleDtos.size());
        assertEquals(new ModuleDto("test1", true, 0), moduleDtos.get(0));
        assertEquals(new ModuleDto("test2", false, 1), moduleDtos.get(1));
        assertEquals(new ModuleDto("test3", false, 2), moduleDtos.get(2));
    }

}
