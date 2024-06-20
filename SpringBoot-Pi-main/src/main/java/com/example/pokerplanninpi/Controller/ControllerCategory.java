package com.example.pokerplanninpi.Controller;

import com.example.pokerplanninpi.entity.Reclamation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.pokerplanninpi.GlobalService.CategoryServiceImpl;
import com.example.pokerplanninpi.entity.Category;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/category")
public class ControllerCategory {
    @Autowired
    CategoryServiceImpl categoryService;
    @PostMapping("/addcategory")
    public Category addCategory(@RequestBody Category category) { return categoryService.addCategory(category); }

    @GetMapping("/getcategory/{category-id}")
    public Category getcategory(@PathVariable("category-id") Long Idcategory) { return categoryService.getById(Idcategory); }


    @GetMapping("/getall")
        public List<Category> getcategorys() { return categoryService.getAllCategorys(); }

    @DeleteMapping("/delete/{category-id}")
    public void deleteBloc(@PathVariable("category-id") Long Idcategory) { categoryService.deleteCategory(Idcategory); }

    @PutMapping("/updatecategorys")
    public Category update (@RequestBody Category category){ return  categoryService.updateCategory(category); }

    @GetMapping("/searchCategory")
    List<Category> searchCategory(@RequestParam(value = "keyword") String keyword) {
        List<Category> allCategories = categoryService.getAllCategorys();
        return allCategories.stream()
                .filter(story ->
                        story.getNameC().toLowerCase().contains(keyword.toLowerCase()) )
                .collect(Collectors.toList());
    }
}
