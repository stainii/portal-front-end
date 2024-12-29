package be.stijnhooft.portal.frontend.repositories;

import be.stijnhooft.portal.frontend.model.ModuleCollection;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public class ModuleCollectionRepository {

    @PersistenceContext
    private EntityManager em;

    public Optional<ModuleCollection> findForUser(String user) {
        return em.createNamedQuery(ModuleCollection.FIND_FOR_USER, ModuleCollection.class)
                .setParameter("user", user)
                .getResultList()
                .stream()
                .findAny();
    }

    @Transactional
    public ModuleCollection create(ModuleCollection moduleCollection) {
        em.persist(moduleCollection);
        return moduleCollection;
    }

    public void flush() {
        em.flush();
    }
}
