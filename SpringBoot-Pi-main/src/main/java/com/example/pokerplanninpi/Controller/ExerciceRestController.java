package com.example.pokerplanninpi.Controller;

import com.example.pokerplanninpi.GlobalService.IExerciceServices;
import com.example.pokerplanninpi.entity.Exercice;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

    @Tag(name = "\uD83D\uDC69\u200D\uD83C\uDFEB Exercice Management")
    @RestController
    @RequestMapping("/exercice")
    @RequiredArgsConstructor
    public class ExerciceRestController  {
        private final IExerciceServices exerciceServices;

        @Operation(description = "Add Exercise")
        @PostMapping("/add")
        public Exercice addExercice(@RequestBody Exercice exercice) {
            return exerciceServices.addExercice(exercice);
        }

        @Operation(description = "Search Exercises by Criteria and Value")
        @GetMapping("/search/{criteria}/{value}")
        public List<Exercice> searchExercicesByCriteriaAndValue(@PathVariable String criteria, @PathVariable String value) {
            List<Exercice> result = exerciceServices.retiveExercicesByCriteriaAndValue(criteria, value);
            if (result.isEmpty()) {
                return exerciceServices.retrieveExercicesWithCategories();
            }
            return result;
        }


        @Operation(description = "Retrieve all Exercises with Categories")
        @GetMapping("/allwithcate")
        public List<Exercice> getAllExercicesWithCategories(){
            return exerciceServices.retrieveExercicesWithCategories();
        }
        @Operation(description = "Retrieve all Exercises")
        @GetMapping("/all")
        public List<Exercice> getAllExercices(){


            return exerciceServices.retrieveAllExercice();
        }

        @Operation(description = "Update Exercise")
        @PutMapping("/update/{id}")
        public Exercice updateExercise(@PathVariable Long id, @RequestBody Exercice updatedExercise) {
            Exercice existingExercise = exerciceServices.geExercicebyid(id);

            updatedExercise.setExerciseId(id);

            return exerciceServices.updateExercice(updatedExercise);
        }


        @Operation(description = "Retrieve Exercise by Id")
        @GetMapping("/get/{id-Exercice}")
        public Exercice getExerciceById(@PathVariable("id-Exercice") Long exerciceId){
            return exerciceServices.retrieveExercice(exerciceId);
        }

        @Operation(description = "Delete Exercise by Id")
        @DeleteMapping("/delete/{id-Exercice}")
        public void deleteExerciceById(@PathVariable("id-Exercice") Long exerciceId){
            exerciceServices.removeExercice(exerciceId);
        }
    }


