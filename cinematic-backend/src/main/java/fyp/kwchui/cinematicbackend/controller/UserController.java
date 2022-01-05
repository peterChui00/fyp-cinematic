package fyp.kwchui.cinematicbackend.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import fyp.kwchui.cinematicbackend.model.Role;
import fyp.kwchui.cinematicbackend.model.User;
import fyp.kwchui.cinematicbackend.service.UserService;

@RestController
@RequestMapping(path = "/api")
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping(path = "/user")
    public ResponseEntity<List<User>> getUser() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @PostMapping(path = "/user")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user").toUriString());
        return ResponseEntity.created(uri).body(userService.addUser(user));
    }

    @PostMapping(path = "/role")
    public ResponseEntity<Role> addUser(@RequestBody Role role) {
        return new ResponseEntity<Role>(userService.addRole(role), HttpStatus.CREATED);
    }

    @PostMapping(path = "/user/{username}/addRole/{roleName}")
    public ResponseEntity<?> addRoleToUser(@PathVariable("username") String username,
            @PathVariable("roleName") String roleName) {
        userService.addRoleToUser(username, roleName);
        return ResponseEntity.ok().build();
    }
}
