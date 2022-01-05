package fyp.kwchui.cinematicbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import fyp.kwchui.cinematicbackend.model.Role;
import fyp.kwchui.cinematicbackend.model.User;
import fyp.kwchui.cinematicbackend.repository.RoleRepository;
import fyp.kwchui.cinematicbackend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    public List<User> getUsers() {
        log.info("Fetching all users.");
        return userRepository.findAll();
    }

    public User addUser(User user) {
        log.info("Saving new user to DB.");
        return userRepository.save(user);
    }

    public Role addRole(Role role) {
        log.info("Saving new role {} to DB.", role.getName());
        return roleRepository.save(role);
    }

    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role {} to user {}.", roleName, username);
        User user = userRepository.findByUsername(username).orElseThrow();
        Role role = roleRepository.findByName(roleName).orElseThrow();
        user.getRoles().add(role);
    }
}
