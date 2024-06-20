package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.Repository.UserRepository;
import com.example.pokerplanninpi.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    private  final UserRepository userRepository;

    public UserServiceImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public User retrieveUser(Long IdUser) {
        return userRepository.findById(IdUser).orElse(null);
    }

    @Override
    public Long retrieveidbyemail(String email) {
        return userRepository.findidByEmail(email);
    }

    @Override
    public List<User> retrieveAllUsers() {
        return userRepository.findAll();    }
    @Override
    public User retrieveUserbyemail(String email) {
        return userRepository.findByEmail(email);
    }
}
