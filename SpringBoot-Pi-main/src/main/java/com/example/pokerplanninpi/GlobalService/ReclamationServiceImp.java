package com.example.pokerplanninpi.GlobalService;
import com.example.pokerplanninpi.Repository.ReponseReclamationRepository;
import com.example.pokerplanninpi.entity.Reclamation;
import com.example.pokerplanninpi.Repository.ReclamationRepository;
import com.example.pokerplanninpi.entity.ReponseReclamation;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import java.util.*;

@Service
public class ReclamationServiceImp  implements ReclamationService{
    private  final ReclamationRepository reclamationRepository;
    private  final ReponseReclamationRepository reponseReclamationRepository;

    public ReclamationServiceImp(ReclamationRepository reclamationRepository, ReponseReclamationRepository reponseReclamationRepository) {
        this.reclamationRepository = reclamationRepository;
        this.reponseReclamationRepository = reponseReclamationRepository;
    }


    @Override
        public List<Reclamation> retrieveAllReclamations() {return reclamationRepository.findAll(); }


    @Override
    public Reclamation addReclamation  (Reclamation reclamtion) {
        return reclamationRepository.save(reclamtion);
    }

    @Override
    public Reclamation getReclamationById(Long id) {
        Optional<Reclamation> reclamationOptional = reclamationRepository.findById(id);
        return reclamationOptional.orElse(null);
    }


    @Override
    public Reclamation updateReclamation(Reclamation updatedReclamation) {
        return reclamationRepository.save(updatedReclamation);
    }


    @Override
    public Reclamation retrieveReclamation(long id) {
        return reclamationRepository.findById(id).get();
    }



    @Override
    public void removeReclamation(long id) {
        reclamationRepository.deleteById(id);
    }

    @Override
    public Map<String, Long> getReclamationStatsByCategory() {
        List<Reclamation> allReclamations = reclamationRepository.findAll();
        Map<String, Long> statsByCategory = new HashMap<>();

        for (Reclamation reclamation : allReclamations) {
            String category = String.valueOf(reclamation.getCategorie()); // Supposons que la catégorie est stockée dans le champ "categorie"
            statsByCategory.put(category, statsByCategory.getOrDefault(category, 0L) + 1);
        }

        return statsByCategory;
    }

    @Override
    public Reclamation getReclamationByName(String name) {
        return reclamationRepository.findByName(name);

    }

    @Override
    public Reclamation ajoutReponseToReclamation(Long reclamationId, ReponseReclamation reponseReclamation) {
        // Trouver la réclamation par son ID
        Reclamation reclamation = reclamationRepository.findById(reclamationId)
                .orElseThrow(() -> new RuntimeException("Réclamation non trouvée"));

        // Associer la réclamation à la réponse
        reponseReclamation.setReclamation(reclamation);

        // Enregistrer la réponse
        reponseReclamationRepository.save(reponseReclamation);

        // Ajouter la réponse à la liste des réponses de la réclamation
        if (reclamation.getReponses() == null) {
            reclamation.setReponses(new ArrayList<>());
        }
        reclamation.getReponses().add(reponseReclamation);

        // Enregistrer la réclamation
        reclamationRepository.save(reclamation);

        return reclamation;
    }




}
