package com.example.pokerplanninpi.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.pokerplanninpi.entity.Ressource;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RessourceRepository extends JpaRepository<Ressource,Long> {
    List<Ressource> findRessourcesByTitleRContains(String TitleR);
    List<Ressource> findRessourcesByCategoryIdC(Long idC);


    @Query(value = "SELECT c.nameC as categoryName, COUNT(r.idR) as ressourceCount " +
            "FROM Category c " +
            "LEFT JOIN Ressource r ON c.idC = r.category.idC " +
            "GROUP BY c.nameC")
    List<Object[]> getRessourceStatsByCategory();


    @Query("SELECT p.likes FROM Ressource p WHERE p.idR = :idR")
    int getLikesById(@Param("idR") Integer idR);

    @Query("SELECT p.dislikes FROM Ressource p WHERE p.idR = :idR")
    int findDislikesById(Integer idR);
}
