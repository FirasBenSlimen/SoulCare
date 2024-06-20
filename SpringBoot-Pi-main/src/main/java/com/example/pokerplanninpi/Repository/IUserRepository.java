package com.example.pokerplanninpi.Repository;


import com.example.pokerplanninpi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface IUserRepository extends JpaRepository<User, Long> {
//find user by email
@Query("SELECT u FROM User u WHERE u.email = ?1")
Optional<User> findByEmaill(String email);
    User findByEmail(String email);
}
