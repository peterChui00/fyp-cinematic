package fyp.kwchui.cinematicbackend.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
/* import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder; */
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
public class UserService/* implements UserDetailsService */ {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    /*
     * @Autowired
     * private PasswordEncoder passwordEncoder;
     */

    public List<User> getUsers() {
        log.info("Fetching all users");
        return userRepository.findAll();
    }

    public User getUserByUsername(String username) {
        log.info("Fetching user [{}]", username);
        return userRepository.findByUsername(username).get();
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).get();
    }

    public User login(User loginInfo) throws Exception {
        User user = userRepository.findByUsername(loginInfo.getUsername().toLowerCase())
                .orElseThrow(() -> new IllegalStateException("User does not exists."));
        if (user.getUsername().toLowerCase().equals(loginInfo.getUsername().toLowerCase()) &&
                user.getPassword().equals(loginInfo.getPassword())) {
            return user;
        } else {
            throw new Exception("Incorrect username or password!");
        }

    }

    public User addUser(User user) {
        /* user.setPassword(passwordEncoder.encode(user.getPassword())); */
        log.info("Adding new user [{}]", user.getUsername());
        return userRepository.save(user);
    }

    public Role addRole(Role role) {
        log.info("Adding new role [{}]", role.getName());
        return roleRepository.save(role);
    }

    public void addRoleToUser(String username, String roleName) {
        log.info("Granting role [{}] to user [{}]", roleName, username);
        User user = userRepository.findByUsername(username).orElseThrow();
        Role role = roleRepository.findByName(roleName).orElseThrow();
        user.getRoles().add(role);
    }

    /*
     * @Override
     * public UserDetails loadUserByUsername(String usernameOrEmail) throws
     * UsernameNotFoundException {
     * User user = userRepository.findByUsernameOrEmail(usernameOrEmail,
     * usernameOrEmail)
     * .orElseThrow(() -> new UsernameNotFoundException("User not found in DB."));
     * Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
     * user.getRoles().forEach(role -> {
     * authorities.add(new SimpleGrantedAuthority(role.getName()));
     * });
     * return new org.springframework.security.core.userdetails.User(
     * user.getUsername(), user.getPassword(), authorities);
     * }
     */
}
