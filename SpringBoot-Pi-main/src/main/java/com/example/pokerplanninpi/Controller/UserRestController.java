package com.example.pokerplanninpi.Controller;

import com.example.pokerplanninpi.GlobalService.IUserServices;
import com.example.pokerplanninpi.GlobalService.UserService;
import com.example.pokerplanninpi.entity.ChangePasswordRequest;
import com.example.pokerplanninpi.entity.User;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

//@Tag(name = "\uD83D\uDC69\u200D\uD83C\uDFEB User Management")
@RestController
@RequestMapping("/api/v1/Users")
@RequiredArgsConstructor
public class UserRestController {
    private final UserService userService;
    private final IUserServices UserServices;
    private final PasswordEncoder passwordEncoder;
    @GetMapping("/show")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello from secured endpoint");
    }
    @Operation(description = "Retrieve User by email")
    @GetMapping("/getbyemaill/{email}")
    public User getbyemaill(@PathVariable("email") String email){
        return userService.retrieveUserbyemail(email);
    }

    @GetMapping("/getidbyemail/{email}")
    public Long getidbyemaill(@PathVariable("email") String email){
        return userService.retrieveidbyemail(email);
    }

    @Operation(description = "Add User")
    @PostMapping("/add")
    public User addUser(@RequestBody User User){
     User.setPassword(passwordEncoder.encode(User.getPassword()));

    return  UserServices.addUser(User);
    }

    @GetMapping("/searchUser")
    List<User> searchUser(@RequestParam(value = "keyword") String keyword) {
        List<User> allReclamations = userService.retrieveAllUsers();
        return allReclamations.stream()
                .filter(story ->
                        story.getFirstname().toLowerCase().contains(keyword.toLowerCase()) ||
                                story.getLastname().toLowerCase().contains(keyword.toLowerCase()))
                .collect(Collectors.toList());
    }
//    @Operation(description = "Retrieve all Users")
    @GetMapping("/all")
    public List<User> getAllUsers(){
        return UserServices.retrieveAllUsers();
    }

    @Operation(description = "Update User ")
    @PutMapping("/update/{id-User}")
    public User updateUser(@RequestBody User User,@PathVariable("id-User") Long numUser){
        return  UserServices.updateUser(User,numUser);
    }

    @Operation(description = "Retrieve User by Id")
    @GetMapping("/get/{id-User}")
    public User getById(@PathVariable("id-User") Long numUser){
        return UserServices.retrieveUser(numUser);
    }
    @Operation(description = "Retrieve User by email")
    @GetMapping("/getbyemail/{email}")
    public User getbyemail(@PathVariable("email") String email){
        return UserServices.retrieveUserbyemail(email);
    }

    @Operation(description = "Delete User by Id")
    @DeleteMapping("/delete/{id-User}")
    public void deleteById(@PathVariable("id-User") Long numUser){
        UserServices.removeUser(numUser);
    }

    @PatchMapping
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
           Principal connectedUser
    ) {
        UserServices.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }
}
