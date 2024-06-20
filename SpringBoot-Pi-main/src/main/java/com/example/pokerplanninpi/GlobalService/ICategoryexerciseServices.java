package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.entity.Categoryexercise;

import java.util.List;

public interface ICategoryexerciseServices {
    Categoryexercise addCategory(Categoryexercise categoryexercise);

    List<Categoryexercise> retrieveAllCategory();

    Categoryexercise updateCategory(Categoryexercise categoryexercise);

    Categoryexercise retrieveCategory(Long categoryId);
    void removeCategory (Long categoryId);
    List<Categoryexercise> retiveCategoryexerciseByCriteriaAndValue(String criteria, String value);


}
