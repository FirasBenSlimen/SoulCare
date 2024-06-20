package com.example.pokerplanninpi.Repository;

import com.example.pokerplanninpi.entity.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReclamationRepository  extends JpaRepository<Reclamation, Long> {
    Reclamation findByName(String name);


}
