package com.example.pokerplanninpi.GlobalService;
import com.example.pokerplanninpi.entity.Reclamation;
import com.example.pokerplanninpi.entity.ReponseReclamation;

import java.util.List;
import java.util.Map;


public interface ReclamationService {

    List<Reclamation> retrieveAllReclamations();

    Reclamation addReclamation (Reclamation reclamtion);
    Reclamation getReclamationById(Long id);


    Reclamation updateReclamation(Reclamation updatedReclamation);

    Reclamation retrieveReclamation (long id);

    void removeReclamation (long  id);

    public Map<String, Long> getReclamationStatsByCategory() ;

    public Reclamation getReclamationByName(String name);

   // Reclamation ajoutReponseToReclamation(Long reclamationId, ReponseReclamation reponseReclamation);

    public Reclamation ajoutReponseToReclamation(Long reclamationId, ReponseReclamation reponseReclamation);

}
