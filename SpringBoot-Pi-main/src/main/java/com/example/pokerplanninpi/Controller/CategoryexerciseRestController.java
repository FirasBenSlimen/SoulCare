package com.example.pokerplanninpi.Controller;

import com.example.pokerplanninpi.GlobalService.ICategoryexerciseServices;
import com.example.pokerplanninpi.entity.Categoryexercise;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "\uD83D\uDC69\u200D\uD83C\uDFEB Category Management")
@RestController
@RequestMapping("/category_exercise")
@RequiredArgsConstructor
public class CategoryexerciseRestController {
    private final ICategoryexerciseServices categoryServices;
    @Operation(description = "Search Exercises by Criteria and Value")
    @GetMapping("/search/{criteria}/{value}")
    public List<Categoryexercise> retiveCategoryexerciseByCriteriaAndValue(@PathVariable String criteria, @PathVariable String value) {
        List<Categoryexercise> result = categoryServices.retiveCategoryexerciseByCriteriaAndValue(criteria, value);
        if (result.isEmpty()) {
            return categoryServices.retrieveAllCategory();
        }
        return result;
    }

    @Operation(description = "Add Category")
    @PostMapping("/add")
    public Categoryexercise addCategory(@RequestBody Categoryexercise categoryexercise){

        return categoryServices.addCategory(categoryexercise);
    }

    @Operation(description = "Retrieve all Categories")
    @GetMapping("/all")
    public List<Categoryexercise> getAllCategories(){
        return categoryServices.retrieveAllCategory();
    }

    @Operation(description = "Update Category")
    @PutMapping("/update")
    public Categoryexercise updateCategory(@RequestBody Categoryexercise categoryexercise){
        return categoryServices.updateCategory(categoryexercise);
    }

    @Operation(description = "Retrieve Category by Id")
    @GetMapping("/get/{id-Category}")
    public Categoryexercise getCategoryById(@PathVariable("id-Category") Long categoryId){
        return categoryServices.retrieveCategory(categoryId);
    }

    @Operation(description = "Delete Category by Id")
    @DeleteMapping("/delete/{id-Category}")
    public void deleteCategoryById(@PathVariable("id-Category") Long categoryId){
        categoryServices.removeCategory(categoryId);
    }
}
