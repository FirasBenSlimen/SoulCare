package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.entity.Category;

import java.util.List;

public interface ICategoryServices {
    Category addCategory(Category category);
    List<Category> getAllCategorys();
    void deleteCategory(long idC);
    Category updateCategory(Category category);
    Category getById(long idC);

}
