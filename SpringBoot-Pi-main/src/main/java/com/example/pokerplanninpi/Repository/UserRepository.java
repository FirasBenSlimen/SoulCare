package com.example.pokerplanninpi.Repository;

import com.example.pokerplanninpi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    @Query("select en.id from User en " +
            "where en.email = :email ")
    Long findidByEmail(@Param("email") String email);

}
