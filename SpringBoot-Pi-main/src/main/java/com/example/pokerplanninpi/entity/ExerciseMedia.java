    package com.example.pokerplanninpi.entity;

    import com.fasterxml.jackson.annotation.JsonIgnore;
    import jakarta.persistence.*;
    import lombok.*;
    import lombok.experimental.FieldDefaults;

    import java.io.Serializable;
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @FieldDefaults(level=AccessLevel.PRIVATE)
    @Entity
    public class ExerciseMedia  implements Serializable  {
        @Id
        @GeneratedValue(strategy=GenerationType.IDENTITY)
        Long mediaId;

        @ManyToOne
        @JsonIgnore
        Exercice exercice;

        String mediaUrl;
    }
