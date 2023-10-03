package ru.kata.spring.boot_security.rest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.rest.model.User;
import ru.kata.spring.boot_security.rest.repository.UserDao;
import java.util.List;
@Service
public class UserServiceImp implements UserService {

    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImp(UserDao userDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    @Override
    public void add(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDao.add(user);
    }

    @Override
    public User show(Long id) {
        return userDao.show(id);
    }

    @Transactional
    @Override
    public void update(Long id, User user) {
        User userToBeUpdated = userDao.show(id);
        userToBeUpdated.setFirstName(user.getFirstName());
        userToBeUpdated.setLastName(user.getLastName());
        userToBeUpdated.setRoles(user.getRoles());
        if (!userToBeUpdated.getPassword().equals(user.getPassword())) {
            userToBeUpdated.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userDao.update(userToBeUpdated);
    }

    @Transactional
    @Override
    public void delete(Long id) {
        userDao.delete(id);
    }


    @Override
    public User findByUsername(String username) {
        return userDao.findByUsername(username);
    }

    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }

}
