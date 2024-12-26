package be.stijnhooft.portal.frontend.services;

import be.stijnhooft.portal.frontend.dtos.ModuleDto;
import be.stijnhooft.portal.frontend.exceptions.ModuleCollectionNotFoundException;
import be.stijnhooft.portal.frontend.mappers.ModuleMapper;
import be.stijnhooft.portal.frontend.model.Module;
import be.stijnhooft.portal.frontend.model.ModuleCollection;
import be.stijnhooft.portal.frontend.repositories.ModuleCollectionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static org.springframework.util.CollectionUtils.isEmpty;

@Service
@Transactional
@Slf4j
public class ModuleService {

    private final ModuleCollectionRepository moduleCollectionRepository;
    private final ModuleMapper moduleMapper;

    public ModuleService(ModuleCollectionRepository moduleCollectionRepository,
                         ModuleMapper moduleMapper) {
        this.moduleCollectionRepository = moduleCollectionRepository;
        this.moduleMapper = moduleMapper;
    }

    public List<ModuleDto> findForUser(String user) {
        ModuleCollection moduleCollection =
                moduleCollectionRepository.findForUser(user)
                                          .orElseThrow(() -> new ModuleCollectionNotFoundException(user));

        return moduleMapper.map(moduleCollection);
    }

    @Transactional
    public void syncModules(Collection<Module> modules, String user) {
        if (isEmpty(modules)) {
            log.warn("No modules found in the config module. Did something go wrong? I will skip syncing.");
        } else {
            ModuleCollection moduleCollection =
                    moduleCollectionRepository.findForUser(user)
                                              .orElseThrow(() -> new ModuleCollectionNotFoundException(user));

            updateExistingModules(modules, moduleCollection);
            persistNewModules(modules, moduleCollection);
            removeModulesWhichNoLongerExist(modules, moduleCollection);
        }
    }

    private void removeModulesWhichNoLongerExist(Collection<Module> modules, ModuleCollection moduleCollection) {
        moduleCollection.getModulesInOrder()
                .stream()
                .filter(possiblyRemovedModule -> {
                    return modules .stream()
                            .noneMatch(module -> module.getName().equalsIgnoreCase(possiblyRemovedModule.getName()));
                }).forEach(module -> moduleCollection.remove(module));
    }

    private void updateExistingModules(Collection<Module> modules, ModuleCollection moduleCollection) {
        modules.forEach((possiblyUpdatedModule) -> {
                    Optional<Module> existingModule = moduleCollection.findModuleByName(possiblyUpdatedModule.getName());
                    if (existingModule.isPresent() && !existingModule.get().equals(possiblyUpdatedModule)) {
                        moduleCollection.update(possiblyUpdatedModule);
                    }
                });
    }

    private void persistNewModules(Collection<Module> modules, ModuleCollection moduleCollection) {
        modules.stream()
                .filter(module -> !moduleCollection.findModuleByName(module.getName())
                                    .isPresent())
                .forEach(moduleCollection::add);
    }
}
