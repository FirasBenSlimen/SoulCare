package com.example.pokerplanninpi.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate; // Importez la classe LocalDate

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ressource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idR;
    private String titleR;
    private String descriptionR;

    private String url;
    private LocalDate date_creation;
    private int likes;
    private int dislikes;

    private boolean liked;
    private boolean disliked;
    @ManyToOne(cascade = CascadeType.ALL)
    private Category category ;

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getDislikes() {
        return dislikes;
    }

    public void setDislikes(int dislikes) {
        this.dislikes = dislikes;
    }



    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @PrePersist
    protected void onCreate() {
        date_creation = LocalDate.now();
    }

}
