package ru.kata.spring.boot_security.rest.repository;

import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.rest.model.Role;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class RoleDaoImpl implements RoleDao{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void add(Role role) {
        entityManager.persist(role);
    }

    @Override
    public List<Role> findAll() {
        return entityManager.createQuery("SELECT DISTINCT r FROM Role r").getResultList();
    }

    @Override
    public Role show(Long id) {
        return entityManager.find(Role.class, id);
    }

    @Override
    public void update(Long id, Role role) {
        Role roleToBeUpdated = entityManager.find(Role.class, id);
        roleToBeUpdated.setName(role.getName());
        entityManager.merge(roleToBeUpdated);

    }

    @Override
    public void delete(Long id) {
        entityManager.remove(entityManager.find(Role.class, id));
    }
}
