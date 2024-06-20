package com.example.pokerplanninpi.GlobalService;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.pokerplanninpi.entity.Category;
import com.example.pokerplanninpi.Repository.CategoryRepository;

import java.util.List;
@Service
@AllArgsConstructor
public class CategoryServiceImpl implements ICategoryServices{
    CategoryRepository categoryRepository ;

    @Override
    public Category addCategory(Category category) {
        return  categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategorys() {
        return (List<Category>) categoryRepository.findAll();
    }

    @Override
    public void deleteCategory(long idC) {
        categoryRepository.deleteById(idC);

    }

    @Override
    public Category updateCategory(Category category) {
        return  categoryRepository.save(category);
    }

    @Override
    public Category getById(long idC) {
        return categoryRepository.findById(idC).get();
    }
}
