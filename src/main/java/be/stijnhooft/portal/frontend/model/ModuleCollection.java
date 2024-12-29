package be.stijnhooft.portal.frontend.model;

import be.stijnhooft.portal.frontend.exceptions.ModuleDoesNotExistInModuleCollectionException;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NonNull;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/** Contains a set of modules. In normal situations, I would expect to have only 1 collection,
 * but this opens up the possibility to change sets based on the situation. For example, maybe
 * modules should come in a different order when on mobile versus on desktop.
 *
 * Having this extra layer has various advantages:
 * - I can let JPA save the order of the modules in the menu by using @OrderColumn.
 * - I can make Module an Embeddable, making it impossible to persist a module directly, requiring to
 * let JPA handle the positioning of the modules.
 *
 */
@Entity
@SequenceGenerator(name = "moduleCollectionIdGenerator", sequenceName = "module_collection_id_sequence")
@NamedQueries(
        @NamedQuery(name = ModuleCollection.FIND_FOR_USER,
                    query = "select collection from ModuleCollection collection where collection.user = :user")
)
@ToString(exclude = "modules")
@EqualsAndHashCode
public class ModuleCollection {

    public static final String FIND_FOR_USER = "ModuleCollection.FIND_FOR_USER";

    @Id
    @GeneratedValue(generator = "moduleCollectionIdGenerator")
    @Getter
    private int id;

    @Getter
    @Column(name="username")
    private String user;

    @ElementCollection
    @OrderColumn(name = "position")
    @CollectionTable(name = "module")
    protected List<Module> modules;

    protected ModuleCollection() {
        //necessary for JPA
        //please do not invoke programmatically
    }

    public ModuleCollection(String user) {
        modules = new ArrayList<>();
        this.user = user;
    }

    public List<Module> getModulesInOrder() {
        return Collections.unmodifiableList(new ArrayList<>(modules));
    }

    public Optional<Module> findModuleByName(@NonNull String name) {
        return modules  .stream()
                        .filter(existingModule -> existingModule != null && existingModule.getName().equalsIgnoreCase(name))
                        .findAny();
    }

    public Module add(@NonNull Module module) {
        Optional<Module> existingModuleWithSameName = findModuleByName(module.getName());
        if (existingModuleWithSameName.isEmpty()) {
            modules.add(module);
            return module;
        } else {
            return existingModuleWithSameName.get();
        }
    }

    public Module update(@NonNull Module module) {
        Module existingModuleWithSameName = findModuleByName(module.getName())
                                                        .orElseThrow(() -> new ModuleDoesNotExistInModuleCollectionException(module, this));

        modules.set(modules.indexOf(existingModuleWithSameName), module);
        return module;
    }

    public Module changePositionOf(@NonNull Module module, int newPosition) {
        int oldPosition = modules.indexOf(module);
        if (oldPosition < 0) {
            throw new ModuleDoesNotExistInModuleCollectionException(module, this);
        }

        modules.remove(oldPosition);
        modules.add(newPosition, module);

        return module;
    }

    public void remove(Module module) {
        Module moduleToBeRemoved = findModuleByName(module.getName())
                                    .orElseThrow(() -> new ModuleDoesNotExistInModuleCollectionException(module, this));
        modules.remove(moduleToBeRemoved);
    }

}
