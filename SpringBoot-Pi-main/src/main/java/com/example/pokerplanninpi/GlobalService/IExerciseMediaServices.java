package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.entity.ExerciseMedia;

import java.util.List;

public interface IExerciseMediaServices {

    ExerciseMedia addExerciseMedia(ExerciseMedia exerciseMedia);

    List<ExerciseMedia> retrieveAllExerciseMedia();

    ExerciseMedia updateExerciseMedia(ExerciseMedia exerciseMedia);

    ExerciseMedia retrieveExerciseMedia(Long mediaId);

    void removeExerciseMedia(Long mediaId);

}
