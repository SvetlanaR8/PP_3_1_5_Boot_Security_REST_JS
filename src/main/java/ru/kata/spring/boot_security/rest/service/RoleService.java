package ru.kata.spring.boot_security.rest.service;

import ru.kata.spring.boot_security.rest.model.Role;

import java.util.List;

public interface RoleService {

    void add(Role role);
    List<Role> findAll();

    Role show(Long id);

    void update (Long id, Role role);
    void delete(Long id);

    List<Role> getRolesByIDs (List<Long> roleIDs);
}
