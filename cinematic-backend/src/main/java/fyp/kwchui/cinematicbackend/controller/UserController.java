package fyp.kwchui.cinematicbackend.controller;

import java.util.List;
/* import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;

import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT; 
import com.fasterxml.jackson.databind.ObjectMapper;*/

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
/* import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType; */
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import fyp.kwchui.cinematicbackend.dto.SignUpDto;
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

    @GetMapping(path = "/user/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> login(@RequestBody User loginInfo) {
        try {
            return ResponseEntity.ok().body(userService.login(loginInfo));
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, e.getMessage(), e);
        }
    }

    @PostMapping(path = "/user")
    public ResponseEntity<User> addUser(@RequestBody SignUpDto signUpDto) {
        /*
         * URI uri =
         * URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path(
         * "/api/user").toUriString());
         */
        /* return ResponseEntity.created(uri).body(userService.addUser(user)); */
        return new ResponseEntity<User>(
                userService.addUser(signUpDto), HttpStatus.CREATED);
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

    /*
     * @GetMapping(path = "/token/refresh")
     * public void refreshToken(HttpServletRequest request,
     * HttpServletResponse response) throws IOException {
     * String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
     * if (authorizationHeader != null && authorizationHeader.startsWith("Bearer "))
     * {
     * try {
     * String refresh_token = authorizationHeader.substring("Bearer ".length());
     * Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
     * JWTVerifier verifier = JWT.require(algorithm).build();
     * DecodedJWT decodedJWT = verifier.verify(refresh_token);
     * String username = decodedJWT.getSubject();
     * User user = userService.getUserByUsername(username);
     * String access_token = JWT.create()
     * .withSubject(user.getUsername())
     * .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
     * .withIssuer(request.getRequestURL().toString())
     * .withClaim("roles",
     * user.getRoles().stream().map(Role::getName)
     * .collect(Collectors.toList()))
     * .sign(algorithm);
     * 
     * Map<String, String> tokens = new HashMap<>();
     * tokens.put("access_token", access_token);
     * tokens.put("refresh_token", refresh_token);
     * response.setContentType(MediaType.APPLICATION_JSON_VALUE);
     * new ObjectMapper().writeValue(response.getOutputStream(), tokens);
     * 
     * } catch (Exception e) {
     * response.setHeader("error", e.getMessage());
     * response.setStatus(HttpStatus.FORBIDDEN.value());
     * Map<String, String> error = new HashMap<>();
     * error.put("error_message", e.getMessage());
     * response.setContentType(MediaType.APPLICATION_JSON_VALUE);
     * new ObjectMapper().writeValue(response.getOutputStream(), error);
     * }
     * } else {
     * throw new RuntimeException("Refresh token is missing.");
     * }
     * }
     */
}
