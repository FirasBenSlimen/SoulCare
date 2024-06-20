package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.entity.Ressource;

import java.util.List;

public interface IRessourceServices {
    Ressource addRessource(Ressource ressource);
    List<Ressource> getAllRessources();
    void deleteRessource(long idR);
    Ressource updateRessource(Ressource ressource);
    Ressource getById(long idR);
    //void assignResourceToCategory(Long resourceId, Long categoryId);
    Ressource unassignResourceFromCategory(Long resourceId);
    Ressource createResourceAndAssociateCategory(Ressource ressource, Long categoryId);
    List<Ressource> findRessourcesByTitleR(String TitleR);
    List<Ressource> findRessourcesByCategory_IdC(Long idC);

    public List<Object[]> getRessourceStatsByCategory();
    public List<Ressource> getResourcesByCategoryId(Long categoryId);
    public void likeRessource(Integer idR);
    public void dislikeRessource(Integer idR);
    public int getLikes(Integer projectId);
    public int getDislikes(Integer projectId);
}
