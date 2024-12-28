package be.stijnhooft.portal.frontend.model;

import be.stijnhooft.portal.frontend.exceptions.ModuleDoesNotExistInModuleCollectionException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

public class ModuleCollectionTest {

    private ModuleCollection moduleCollection;

    @BeforeEach
    public void init() {
        moduleCollection = new ModuleCollection("test");
    }

    @Test
    public void findModuleByNameWhenFound() throws Exception {
        Module module1 = new Module("module1", true);
        Module module2 = new Module("module2", false);
        Module module3 = new Module("module3", false);

        moduleCollection.add(module1);
        moduleCollection.add(module2);
        moduleCollection.add(module3);

        Optional<Module> result = moduleCollection.findModuleByName("module2");
        assertTrue(result.isPresent());
        assertEquals(module2, result.get());
    }

    @Test
    public void findModuleByNameWhenFoundButWithDifferentCasing() throws Exception {
        Module module1 = new Module("module1", true);
        Module module2 = new Module("module2", false);
        Module module3 = new Module("module3", false);

        moduleCollection.add(module1);
        moduleCollection.add(module2);
        moduleCollection.add(module3);

        Optional<Module> result = moduleCollection.findModuleByName("mOdUlE2");
        assertTrue(result.isPresent());
        assertEquals(module2, result.get());
    }

    @Test
    public void findModuleByNameWhenNotFound() throws Exception {
        Module module1 = new Module("module1", true);
        Module module2 = new Module("module2", false);
        Module module3 = new Module("module3", false);

        moduleCollection.add(module1);
        moduleCollection.add(module2);
        moduleCollection.add(module3);

        assertFalse(moduleCollection.findModuleByName("test").isPresent());
    }

    @Test
    public void findModuleByNameWhenNullArgument() {
        assertThrows(NullPointerException.class, () ->
            moduleCollection.findModuleByName(null));
    }

    @Test
    public void addWhenSuccess() throws Exception {
        Module module1 = new Module("module1", true);

        moduleCollection.add(module1);

        assertTrue(moduleCollection.findModuleByName("module1").isPresent());
        assertEquals(module1, moduleCollection.findModuleByName("module1").get());
    }

    @Test
    public void addWhenItDoesAlreadyExist() throws Exception {
        Module module1 = new Module("module1", true);
        Module secondModule = new Module("module1", false);

        moduleCollection.add(module1);
        moduleCollection.add(secondModule);

        assertTrue(moduleCollection.findModuleByName("module1").isPresent());
        assertEquals(module1, moduleCollection.findModuleByName("module1").get());
        assertEquals(1, moduleCollection.getModulesInOrder().size());
    }

    @Test
    public void addWhenNullArgument() {
        assertThrows(NullPointerException.class, () ->
            moduleCollection.add(null));
    }

    @Test
    public void changePositionOfWhenMovingAModuleToTheCenterTheOfList() throws Exception {
        //data set
        Module module1 = new Module("module1", true);
        Module module2 = new Module("module2", false);
        Module module3 = new Module("module3", false);

        moduleCollection.add(module1);
        moduleCollection.add(module2);
        moduleCollection.add(module3);

        //execute
        moduleCollection.changePositionOf(module3, 1);

        //assert
        List<Module> modulesInOrder = moduleCollection.getModulesInOrder();
        assertEquals(module1, modulesInOrder.get(0));
        assertEquals(module3, modulesInOrder.get(1));
        assertEquals(module2, modulesInOrder.get(2));
    }

    @Test
    public void changePositionOfWhenMovingAModuleToTheBeginningTheOfList() throws Exception {
        //data set
        Module module1 = new Module("module1", true);
        Module module2 = new Module("module2", false);
        Module module3 = new Module("module3", false);

        moduleCollection.add(module1);
        moduleCollection.add(module2);
        moduleCollection.add(module3);

        //execute
        moduleCollection.changePositionOf(module3, 0);

        //assert
        List<Module> modulesInOrder = moduleCollection.getModulesInOrder();
        assertEquals(module3, modulesInOrder.get(0));
        assertEquals(module1, modulesInOrder.get(1));
        assertEquals(module2, modulesInOrder.get(2));
    }

    @Test
    public void changePositionOfWhenMovingAModuleToTheEndTheOfList() throws Exception {
        //data set
        Module module1 = new Module("module1", true);
        Module module2 = new Module("module2", false);
        Module module3 = new Module("module3", false);

        moduleCollection.add(module1);
        moduleCollection.add(module2);
        moduleCollection.add(module3);

        //execute
        moduleCollection.changePositionOf(module1, 2);

        //assert
        List<Module> modulesInOrder = moduleCollection.getModulesInOrder();
        assertEquals(module2, modulesInOrder.get(0));
        assertEquals(module3, modulesInOrder.get(1));
        assertEquals(module1, modulesInOrder.get(2));
    }

    @Test
    public void changePositionOfWhenModuleIsNotInTheList() {
        Throwable exception = assertThrows(ModuleDoesNotExistInModuleCollectionException.class, () -> {
            //data set
            Module module1 = new Module("module1", true);
            Module module2 = new Module("module2", false);
            Module module3 = new Module("module3", true);

            moduleCollection.add(module1);
            moduleCollection.add(module2);

            //execute
            moduleCollection.changePositionOf(module3, 2);
        });
        assertTrue(exception.getMessage().contains("Provided module module3 does not exist for module collection of user test"));
    }

    @Test
    public void updateWhenSuccess() {
        Module module1 = new Module("module1", true);
        Module module2 = new Module("module2", false);
        Module module3 = new Module("module3", false);

        moduleCollection.add(module1);
        moduleCollection.add(module2);
        moduleCollection.add(module3);

        assertEquals(1, moduleCollection.getModulesInOrder().indexOf(module2));

        Module updatedModule2 = new Module("module2", true);

        moduleCollection.update(updatedModule2);

        assertEquals(updatedModule2, moduleCollection.getModulesInOrder().get(1));
        assertFalse(moduleCollection.getModulesInOrder().contains(module2));
    }

    @Test
    public void updateWhenCollectionDoesNotContainModule() {
        Throwable exception = assertThrows(ModuleDoesNotExistInModuleCollectionException.class, () -> {
            //data set
            Module module1 = new Module("module1", true);
            Module module2 = new Module("module2", false);
            Module module3 = new Module("module3", false);

            moduleCollection.add(module1);
            moduleCollection.add(module2);

            //execute
            moduleCollection.update(module3);
        });
        assertTrue(exception.getMessage().contains("Provided module module3 does not exist for module collection of user test"));
    }

    @Test
    public void removeWhenSuccess() {
        Module module1 = new Module("module1", true);
        Module module2 = new Module("module2", false);
        Module module3 = new Module("module3", false);

        moduleCollection.add(module1);
        moduleCollection.add(module2);
        moduleCollection.add(module3);

        assertTrue(moduleCollection.getModulesInOrder().contains(module2));

        moduleCollection.remove(module2);

        assertFalse(moduleCollection.getModulesInOrder().contains(module2));
    }

    @Test
    public void removeWhenCollectionDoesNotContainModule() {
        Throwable exception = assertThrows(ModuleDoesNotExistInModuleCollectionException.class, () -> {
            //data set
            Module module1 = new Module("module1", true);
            Module module2 = new Module("module2", false);
            Module module3 = new Module("module3", false);

            moduleCollection.add(module1);
            moduleCollection.add(module2);

            //execute
            moduleCollection.remove(module3);
        });
        assertTrue(exception.getMessage().contains("Provided module module3 does not exist for module collection of user test"));
    }

}
