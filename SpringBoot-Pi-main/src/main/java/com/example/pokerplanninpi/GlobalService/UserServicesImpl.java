package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.Repository.IUserRepository;
import com.example.pokerplanninpi.entity.ChangePasswordRequest;
import com.example.pokerplanninpi.entity.User;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@AllArgsConstructor
@Service
@RequiredArgsConstructor
public class UserServicesImpl implements IUserServices {
    @Autowired
    private IUserRepository UserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User addUser(User instructor) {
        return UserRepository.save(instructor);
    }

    @Override
    public User retrieveUserbyemail(String email) {
        return UserRepository.findByEmail(email);
    }

    @Override
    public List<User> retrieveAllUsers() {
        return UserRepository.findAll();
    }

    @Override
    public User updateUser(User instructor,Long IdUser) {
        return UserRepository.save(instructor);
    }

    @Override
    public User retrieveUser(Long IdUser) {
        return UserRepository.findById(IdUser).orElse(null);
    }

    @Override
    public void removeUser(Long IdUser) {
        UserRepository.deleteById(IdUser);
    }

    @Override
    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

    }

    /*@Override
    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {
*/
        /*var User = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), User.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        // update the password
        User.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        UserRepository.save(User);
    }
*/
  //  }
}
