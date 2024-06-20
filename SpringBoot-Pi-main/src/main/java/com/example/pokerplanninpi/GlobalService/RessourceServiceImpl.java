package com.example.pokerplanninpi.GlobalService;

import com.twilio.base.Resource;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import com.example.pokerplanninpi.entity.Category;
import com.example.pokerplanninpi.entity.Ressource;
import com.example.pokerplanninpi.Repository.CategoryRepository;
import com.example.pokerplanninpi.Repository.RessourceRepository;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
@Service
@AllArgsConstructor
public class RessourceServiceImpl implements IRessourceServices {
    RessourceRepository ressourceRepository;
    CategoryRepository categoryRepository;
    @Override
    public Ressource addRessource(Ressource ressource) {
        return ressourceRepository.save(ressource);
    }

    @Override
    public List<Ressource> getAllRessources() {
        return (List<Ressource>) ressourceRepository.findAll();
    }

    @Override
    public void deleteRessource(long idR) {
        ressourceRepository.deleteById(idR);
    }

    @Override
    public Ressource updateRessource(Ressource ressource) {
        return ressourceRepository.save(ressource);
    }

    @Override
    public Ressource getById(long idR) {
        return ressourceRepository.findById(idR).get();
    }

   /*
    @Override
    public void assignResourceToCategory(Long resourceId, Long categoryId) {
        Ressource ressource = ressourceRepository.findById(resourceId).get();
        Category category = categoryRepository.findById(categoryId).get();

        ressource.setCategory(category);
        ressourceRepository.save(ressource);
    }

    */


    @Override
    public Ressource unassignResourceFromCategory(Long resourceId) {
        Ressource ressource = ressourceRepository.findById(resourceId).get();
        ressource.setCategory(null);
        return ressourceRepository.save(ressource);

    }

    @Override
    public Ressource createResourceAndAssociateCategory(Ressource ressource, Long categoryId) {
        Category category = categoryRepository.findById(categoryId).get();
        ressource.setCategory(category);
        return ressourceRepository.save(ressource);
    }

    @Override
    public List<Ressource> findRessourcesByTitleR(String TitleR) {
        return (List<Ressource>) ressourceRepository.findRessourcesByTitleRContains(TitleR);
    }

    @Override
    public List<Ressource> findRessourcesByCategory_IdC(Long idC) {
        return (List<Ressource>) ressourceRepository.findRessourcesByCategoryIdC(idC);
    }


    @Override
    public List<Object[]> getRessourceStatsByCategory() {
        return ressourceRepository.getRessourceStatsByCategory();
    }

    @Override
    public List<Ressource> getResourcesByCategoryId(Long categoryId) {
        return ressourceRepository.findRessourcesByCategoryIdC(categoryId);
    }

    @Override
    public void likeRessource(Integer idR) {
        Ressource ressource = getById(idR);
        ressource.setLikes(ressource.getLikes() + 1);
        ressource.setLiked(true);
        ressourceRepository.save(ressource);
    }

    @Override
    public void dislikeRessource(Integer idR) {
        Ressource ressource = getById(idR);
        ressource.setDislikes(ressource.getDislikes() + 1);
        ressource.setDisliked(true);
        ressourceRepository.save(ressource);
    }

    @Override
    public int getLikes(Integer idR) {
        return ressourceRepository.getLikesById(idR);
    }

    @Override
    public int getDislikes(Integer idR) {
        return ressourceRepository.findDislikesById(idR);
    }




}
