package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.entity.User;

import java.util.List;

public interface UserService {
    List<User> retrieveAllUsers();
    User retrieveUserbyemail(String email);
    User retrieveUser(Long IdUser);
    Long retrieveidbyemail(String email);
}
