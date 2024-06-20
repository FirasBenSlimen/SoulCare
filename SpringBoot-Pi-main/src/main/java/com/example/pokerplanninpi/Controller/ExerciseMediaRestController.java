package com.example.pokerplanninpi.Controller;


import com.example.pokerplanninpi.GlobalService.IExerciseMediaServices;
import com.example.pokerplanninpi.entity.ExerciseMedia;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "\uD83D\uDC69\u200D\uD83C\uDFEB Exercise Media Management")
@RestController
@RequestMapping("/exerciseMedia")
@RequiredArgsConstructor
public class ExerciseMediaRestController {
    private final IExerciseMediaServices exerciseMediaServices;


    @Operation(description = "Add Exercise Media")
    @PostMapping("/add")
    public ExerciseMedia addExerciseMedia(@RequestBody ExerciseMedia exerciseMedia){
        return  exerciseMediaServices.addExerciseMedia(exerciseMedia);
    }

    @Operation(description = "Retrieve all Exercise Medias")
    @GetMapping("/all")
    public List<ExerciseMedia> getAllExerciseMedias(){
        return exerciseMediaServices.retrieveAllExerciseMedia();
    }

    @Operation(description = "Update Exercise Media")
    @PutMapping("/update")
    public ExerciseMedia updateExerciseMedia(@RequestBody ExerciseMedia exerciseMedia){
        return  exerciseMediaServices.updateExerciseMedia(exerciseMedia);
    }

    @Operation(description = "Retrieve Exercise Media by Id")
    @GetMapping("/get/{id-ExerciseMedia}")
    public ExerciseMedia getById(@PathVariable("id-ExerciseMedia") Long numExerciseMedia){
        return exerciseMediaServices.retrieveExerciseMedia(numExerciseMedia);
    }
    @Operation(description = "Delete Exercise Media by Id")
    @DeleteMapping("/delete/{id-ExerciseMedia}")
    public void deleteById(@PathVariable("id-ExerciseMedia") Long numExerciseMedia){
        exerciseMediaServices.removeExerciseMedia(numExerciseMedia);
    }
}
