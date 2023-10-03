package ru.kata.spring.boot_security.rest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.rest.model.Role;
import ru.kata.spring.boot_security.rest.repository.RoleDao;

import java.util.ArrayList;
import java.util.List;
@Service
public class RoleServiceImpl implements RoleService{

    private final RoleDao roleDao;
    @Autowired
    public RoleServiceImpl(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    @Transactional
    @Override
    public void add(Role role) {
        roleDao.add(role);
    }

  //  @Transactional
    @Override
    public List<Role> findAll() {
        return roleDao.findAll();
    }

    @Override
    public Role show(Long id) {
        return roleDao.show(id);
    }
    @Transactional
    @Override
    public void update(Long id, Role role) {
        roleDao.update(id, role);
    }

    @Transactional
    @Override
    public void delete(Long id) {
        roleDao.delete(id);

    }
    @Override
    public List<Role> getRolesByIDs(List<Long> roleIDs) {
        List<Role> allRoles = findAll();
        List<Role> rolesByIds = new ArrayList<>();
        for (Long roleID : roleIDs) {
            for (Role role : allRoles) {
                if (role.getId().equals(roleID)) {
                    rolesByIds.add(role);
                }
            }
        }
        return rolesByIds;
    }
}
