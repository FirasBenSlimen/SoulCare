package com.example.pokerplanninpi.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.util.Set;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level=AccessLevel.PRIVATE)
@Entity
public class Exercice  implements Serializable {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long exerciseId;
    String title;
    String description;

    @Enumerated(EnumType.STRING)
    DifficultyLevels difficultyLevel;

    int duration;

    @Enumerated(EnumType.STRING)
    StressLevelReductions stressLevelReduction;

    @ManyToOne
    Categoryexercise categorie;

    @ManyToMany(cascade = CascadeType.ALL)
    private Set<Post> posts;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="exercice")

    private Set<ExerciseMedia> exercicemedias;
}
