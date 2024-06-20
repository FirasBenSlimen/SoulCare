package com.example.pokerplanninpi.Repository;
import com.example.pokerplanninpi.entity.Categoryexercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICategoryexrerciseRespository extends JpaRepository<Categoryexercise, Long> {
    @Query("SELECT c FROM Categoryexercise c WHERE " +
            "CASE WHEN :criteria = 'title' THEN c.title " +
            "     WHEN :criteria = 'description' THEN c.description " +
            "     WHEN :criteria = 'benefits' THEN c.benefits " +
            "     WHEN :criteria = 'categoryId' THEN c.categoryId " +
            "     ELSE 'all' END LIKE CONCAT('%', :value, '%')")
    List<Categoryexercise> findCategoriesByCriteriaAndValue(@Param("criteria") String criteria, @Param("value") String value);

}
