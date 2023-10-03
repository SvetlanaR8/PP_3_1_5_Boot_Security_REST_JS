package ru.kata.spring.boot_security.rest.repository;


import ru.kata.spring.boot_security.rest.model.User;

import java.util.List;

public interface UserDao {

    void add(User user);

    void update (User user);
    List<User> findAll();

    User show(Long id);

     void delete(Long id);

    User findByUsername (String username);

}
