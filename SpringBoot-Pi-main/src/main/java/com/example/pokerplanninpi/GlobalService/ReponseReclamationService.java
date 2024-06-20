package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.entity.Reclamation;
import com.example.pokerplanninpi.entity.ReponseReclamation;

import java.util.List;

public interface ReponseReclamationService {
    List<ReponseReclamation> retrieveAllReponses();
    ReponseReclamation addReponse (ReponseReclamation reponseReclamation);


    ReponseReclamation getReponseById(Long id);


}
