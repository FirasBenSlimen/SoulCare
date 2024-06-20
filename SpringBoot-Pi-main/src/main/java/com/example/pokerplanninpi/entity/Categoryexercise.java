package com.example.pokerplanninpi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Categoryexercise implements Serializable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    Long categoryId;
    String title;
    String description;
    String benefits;

    @OneToMany(cascade = CascadeType.ALL, mappedBy="categorie")
    @JsonIgnore
    private Set<Exercice> exercices;
}
