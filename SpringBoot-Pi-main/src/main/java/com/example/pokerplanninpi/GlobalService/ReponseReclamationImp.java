package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.Repository.ReponseReclamationRepository;
import com.example.pokerplanninpi.entity.ReponseReclamation;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReponseReclamationImp implements ReponseReclamationService{

    private  final ReponseReclamationRepository reponseReclamationRepository;

    public ReponseReclamationImp(ReponseReclamationRepository reponseReclamationRepository) {
        this.reponseReclamationRepository = reponseReclamationRepository;
    }



    @Override
    public List<ReponseReclamation> retrieveAllReponses() {
        return reponseReclamationRepository.findAll();
    }

    @Override
    public ReponseReclamation addReponse(ReponseReclamation reponseReclamation) {
        return reponseReclamationRepository.save(reponseReclamation);
    }

    @Override
    public ReponseReclamation getReponseById(Long id) {
        return reponseReclamationRepository.findById(id).get();
    }
}
