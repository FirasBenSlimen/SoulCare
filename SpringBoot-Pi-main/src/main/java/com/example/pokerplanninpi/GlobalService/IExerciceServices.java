package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.entity.Exercice;

import java.util.List;

public interface IExerciceServices {
    Exercice geExercicebyid(Long id);
    Exercice addExercice(Exercice exercice);

    List<Exercice> retrieveAllExercice();

    Exercice updateExercice(Exercice Exercice);

    Exercice retrieveExercice(Long IdExercice);
    void removeExercice (Long IdExercice);
    List<Exercice> retrieveExercicesWithCategories();
    List<Exercice> retiveExercicesByCriteriaAndValue(String criteria, String value);

}
