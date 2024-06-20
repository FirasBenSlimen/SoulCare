package com.example.pokerplanninpi.Repository;
import com.example.pokerplanninpi.entity.Exercice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface IExerciceRepository extends JpaRepository<Exercice, Long>{

    @Query("SELECT e FROM Exercice e WHERE " +
            "CASE WHEN :criteria = 'description' THEN e.description " +
            "     WHEN :criteria = 'difficultyLevel' THEN e.difficultyLevel " +
            "     WHEN :criteria = 'duration' THEN CAST(e.duration AS string) " +
            "     WHEN :criteria = 'exerciseId' THEN CAST(e.exerciseId AS string) " +
            "     WHEN :criteria = 'stressLevelReduction' THEN e.stressLevelReduction " +
            "     WHEN :criteria = 'title' THEN e.title " +
            "     ELSE 'all' END LIKE CONCAT('%', :value, '%')")
    List<Exercice> findExercicesByCriteriaAndValue(@Param("criteria") String criteria, @Param("value") String value);


}
