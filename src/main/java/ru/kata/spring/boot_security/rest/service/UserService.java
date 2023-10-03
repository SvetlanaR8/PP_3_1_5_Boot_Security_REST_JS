package ru.kata.spring.boot_security.rest.service;

import ru.kata.spring.boot_security.rest.model.User;
import java.util.List;

public interface UserService {
    void add(User user);
    List<User> findAll();

    User show(Long id);

    void update (Long id, User user);
    void delete(Long id);
    User findByUsername (String username);
}
