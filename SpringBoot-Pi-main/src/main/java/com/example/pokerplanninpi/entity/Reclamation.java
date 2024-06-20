package com.example.pokerplanninpi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Reclamation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String descriptionReclamation;
    private LocalDate dateSoumission;
    @Enumerated(EnumType.STRING)
    private CategorieType categorie;

    @JsonIgnore
    @OneToMany(mappedBy = "reclamation", cascade = CascadeType.ALL)
    private List<ReponseReclamation> reponses;

    enum CategorieType {
        Missing_Functionalities,
        Technical_Problems,
        Security,
        Support_and_Assitance,
        Performances
    }




    @ManyToOne
    User user;

    @Enumerated(EnumType.STRING)
    private StatusType status = StatusType.NotProcessed;

    public  enum StatusType {
        NotProcessed,
        Processed
    }

    public String getLogin(){
        return "bensalah.saif@esprit.tn";
    }
}
