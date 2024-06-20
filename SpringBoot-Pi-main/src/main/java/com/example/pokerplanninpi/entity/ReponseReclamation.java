package com.example.pokerplanninpi.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "reponse_reclamation")
public class ReponseReclamation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "reclamation_id", referencedColumnName = "id")
    private Reclamation reclamation;

    private String contenu;

    private LocalDateTime dateReponse;

    @ManyToOne
    @JoinColumn(name = "id_user", referencedColumnName = "id")
    private User user;

    private String statusReclamation = "Processed";




    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



    public String getContenu() {
        return contenu;
    }

    public void setContenu(String contenu) {
        this.contenu = contenu;
    }

    public LocalDateTime getDateReponse() {
        return dateReponse;
    }

    public void setDateReponse(LocalDateTime dateReponse) {
        this.dateReponse = dateReponse;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }




    public void setReclamation(Reclamation reclamation) {
        this.reclamation = reclamation;
    }

    public Reclamation getReclamation() {
        return reclamation;
    }
}
