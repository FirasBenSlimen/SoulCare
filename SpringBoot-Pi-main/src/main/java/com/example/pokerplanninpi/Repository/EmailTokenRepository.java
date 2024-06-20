package com.example.pokerplanninpi.Repository;

import com.example.pokerplanninpi.entity.EmailToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailTokenRepository extends JpaRepository<EmailToken, Integer> {

    Optional<EmailToken> findByEmailtoken(String EmailToken);
}
