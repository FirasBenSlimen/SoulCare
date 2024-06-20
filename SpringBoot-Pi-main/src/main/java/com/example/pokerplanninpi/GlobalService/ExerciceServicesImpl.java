package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.Repository.ICategoryexrerciseRespository;
import com.example.pokerplanninpi.Repository.IExerciceRepository;
import com.example.pokerplanninpi.entity.Categoryexercise;
import com.example.pokerplanninpi.entity.Exercice;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ExerciceServicesImpl implements IExerciceServices {

    private IExerciceRepository exerciceRepository;
    private ICategoryexrerciseRespository categrepo;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Exercice geExercicebyid(Long id) {
        Optional<Exercice> ExerciceOptional = exerciceRepository.findById(id);
        return ExerciceOptional.orElse(null);
    }

    @Override
    public Exercice addExercice(Exercice exercice) {
        return exerciceRepository.save(exercice);
    }

    @Override
    public List<Exercice> retrieveAllExercice() {
        return exerciceRepository.findAll();
    }

    @Override
    public Exercice updateExercice(Exercice exercice) {
        return exerciceRepository.save(exercice);
    }

    @Override
    public Exercice retrieveExercice(Long exerciseId) {
        return exerciceRepository.findById(exerciseId).orElse(null);
    }

    @Override
    public void removeExercice(Long exerciseId) {
        exerciceRepository.deleteById(exerciseId);
    }




    @Override
    public List<Exercice> retrieveExercicesWithCategories() {
        List<Exercice> exercices = exerciceRepository.findAll();
        for (Exercice exercice : exercices) {
            Categoryexercise category = exercice.getCategorie();
            if (category != null) {
                Categoryexercise categoryWithId = categrepo.findById(category.getCategoryId()).orElse(null);
                exercice.setCategorie(categoryWithId);
                if (categoryWithId != null) {
                    System.out.println("Exercise: " + exercice.getTitle() + ", Category: " + categoryWithId.getCategoryId());
                }
            }
        }
        return exercices;
    }

    @Override
    public List<Exercice> retiveExercicesByCriteriaAndValue(String criteria, String value) {
        return exerciceRepository.findExercicesByCriteriaAndValue(criteria,value);
    }

}
