package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.Repository.ICategoryexrerciseRespository;
import com.example.pokerplanninpi.entity.Categoryexercise;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CategoryexerciseServicesImpl implements ICategoryexerciseServices {
    private ICategoryexrerciseRespository categoryRepository;

    @Override
    public Categoryexercise addCategory(Categoryexercise categoryexercise) {
        return categoryRepository.save(categoryexercise);
    }

    @Override
    public List<Categoryexercise> retrieveAllCategory() {
        return categoryRepository.findAll();
    }

    @Override
    public Categoryexercise updateCategory(Categoryexercise categoryexercise) {
        return categoryRepository.save(categoryexercise);
    }

    @Override
    public Categoryexercise retrieveCategory(Long categoryId) {
        return categoryRepository.findById(categoryId).orElse(null);
    }

    @Override
    public void removeCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public List<Categoryexercise> retiveCategoryexerciseByCriteriaAndValue(String criteria, String value) {
        return categoryRepository.findCategoriesByCriteriaAndValue(criteria,value);

    }
}
