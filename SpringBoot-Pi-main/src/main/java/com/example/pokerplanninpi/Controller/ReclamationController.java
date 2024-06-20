package com.example.pokerplanninpi.Controller;
import com.example.pokerplanninpi.GlobalService.ReponseReclamationService;
import com.example.pokerplanninpi.GlobalService.UserService;
import com.example.pokerplanninpi.Repository.ReclamationRepository;
import com.example.pokerplanninpi.entity.Reclamation;
import com.example.pokerplanninpi.GlobalService.ReclamationService;
import com.example.pokerplanninpi.entity.ReponseReclamation;
import com.example.pokerplanninpi.entity.User;
import jakarta.mail.internet.MimeMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import javax.mail.MessagingException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ReclamationController {
    private final ReclamationService reclamationService;
    private final ReponseReclamationService reponseReclamationService;
    private  final ReclamationRepository reclamationRepository;
    private final UserService userService;

    private final JavaMailSender emailSender;

    public ReclamationController(ReclamationService reclamationService, ReponseReclamationService reponseReclamationService, ReclamationRepository reclamationRepository, UserService userService,JavaMailSender emailSender) {
        this.reclamationService = reclamationService;
        this.reponseReclamationService = reponseReclamationService;
        this.reclamationRepository = reclamationRepository;
        this.userService = userService;
        this.emailSender = emailSender;

    }

    @GetMapping("/retrieveAllUsers")
    public ResponseEntity<List<User>> retrieveAllUsers(){
        userService.retrieveAllUsers().forEach(System.out::print);
        return ResponseEntity.ok(userService.retrieveAllUsers());
    }

    @GetMapping("/retrieveAllReponse")
    public ResponseEntity<List<ReponseReclamation>> retrieveAllReponses(){
        reponseReclamationService.retrieveAllReponses().forEach(System.out::print);
        return ResponseEntity.ok(reponseReclamationService.retrieveAllReponses());
    }

    @GetMapping("/retrieveAllReclamations")
    public ResponseEntity<List<Reclamation>> retrieveAllReclamations(){
        reclamationService.retrieveAllReclamations().forEach(System.out::print);
        return ResponseEntity.ok(reclamationService.retrieveAllReclamations());
    }

    @PostMapping("/addReclamation")
    public ResponseEntity<Reclamation> addReclamation(@RequestBody Reclamation reclamtion){
        return ResponseEntity.ok(reclamationService.addReclamation(reclamtion));
    }

    @PostMapping("/addReponse")
    public ResponseEntity<ReponseReclamation> addReponse(@RequestBody ReponseReclamation reponseReclamation){
        return ResponseEntity.ok(reponseReclamationService.addReponse(reponseReclamation));
    }
    @PutMapping("/update_reclamation/{id}")
    public ResponseEntity<Reclamation> updateReclamation(@PathVariable Long id, @RequestBody Reclamation updatedReclamation) {
        Reclamation existingReclamation = reclamationService.getReclamationById(id);
        if (existingReclamation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        updatedReclamation.setId(id);  ; // Assurez-vous que l'ID de la réclamation mise à jour correspond à celui fourni dans le chemin
        Reclamation updated = reclamationService.updateReclamation(updatedReclamation);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @GetMapping("/get_reclamation/{id}")
    public ResponseEntity<Reclamation> getReclamationById(@PathVariable Long id) {
        Reclamation reclamation = reclamationService.getReclamationById(id);
        if (reclamation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(reclamation, HttpStatus.OK);
    }


    @GetMapping("/getReponse/{id}")
    public ResponseEntity<ReponseReclamation> getReponseById(@PathVariable Long id) {
        ReponseReclamation reponseReclamation = reponseReclamationService.getReponseById(id);
        if (reponseReclamation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(reponseReclamation, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    void deleteReclamation(@PathVariable Long id) {
        reclamationRepository.deleteById(id);
    }


    @GetMapping("/searchReclamation")
    List<Reclamation> searchReclamation(@RequestParam(value = "keyword") String keyword) {
        List<Reclamation> allReclamations = reclamationService.retrieveAllReclamations();
        return allReclamations.stream()
                .filter(story ->
                        story.getDescriptionReclamation().toLowerCase().contains(keyword.toLowerCase()) ||
                        story.getName().toLowerCase().contains(keyword.toLowerCase()))
                .collect(Collectors.toList());
    }

    @GetMapping("/searchReponse")
    public List<ReponseReclamation> searchReponse(@RequestParam(value = "keyword") String keyword) {
        List<ReponseReclamation> allReponse = reponseReclamationService.retrieveAllReponses();
        return allReponse.stream()
                .filter(reponse ->
                        reponse.getContenu().toLowerCase().contains(keyword.toLowerCase()) ||
                                reponse.getDateReponse().toString().toLowerCase().contains(keyword.toLowerCase()))
                .collect(Collectors.toList());
    }


    @GetMapping("/reclamationStats")
    public ResponseEntity<Map<String, Long>> getReclamationStatsByCategory() {
        Map<String, Long> statsByCategory = reclamationService.getReclamationStatsByCategory();
        return ResponseEntity.ok(statsByCategory);
    }


    @PostMapping("/reclamations/{id}/reponses")
    public ResponseEntity<ReponseReclamation> ajoutReponseToReclamation(@PathVariable Long id, @RequestBody ReponseReclamation reponseReclamation) {
        Reclamation reclamation = reclamationService.getReclamationById(id);
        if (reclamation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        reponseReclamation.setReclamation(reclamation);
        ReponseReclamation savedReponseReclamation = reponseReclamationService.addReponse(reponseReclamation);

        reclamation.setStatus(Reclamation.StatusType.Processed);
        reclamationService.updateReclamation(reclamation);
        try {
            sendEmail(reclamation.getLogin(), "Here's a response to your issue", "Your issue has been successfully processed.",
                    reponseReclamation.getContenu(), reponseReclamation.getDateReponse(), reclamation.getStatus() , reclamation.getDescriptionReclamation());
        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (jakarta.mail.MessagingException e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(savedReponseReclamation, HttpStatus.CREATED);
    }



    private void sendEmail(String to, String subject, String text, String reponseContent, LocalDateTime reponseDate, Reclamation.StatusType reclamationStatus, String description) throws MessagingException, jakarta.mail.MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setSubject(subject);

        StringBuilder emailContent = new StringBuilder();
        emailContent.append("<html><body style='font-family: Arial, sans-serif;'>");

        // Cadre bleu avec le texte "Welcome to Poker Planning"
        emailContent.append("<div style='background-color:#007bff; color:#fff; padding:10px; text-align:center;'>");
        emailContent.append("<h1>MindCare Support's Response</h1>");
        emailContent.append("</div>");

        // Texte de base de l'e-mail
        emailContent.append("<p>").append(text).append("</p>");

        // Description de la réclamation
        emailContent.append("<div style='background-color:#f8f9fa; padding:10px; margin-top:20px;'>");
        emailContent.append("<h3 style='color:#ffc107;'>Issue Description :</h3>");
        emailContent.append("<p>").append(description).append("</p>"); // Description de la réclamation
        emailContent.append("</div>");

        // Design de la réponse
        emailContent.append("<div style='background-color:#f8f9fa; padding:10px; margin-top:20px;'>");
        emailContent.append("<h3 style='color:#28a745;'>Response : </h3>");
        emailContent.append("<p>").append(reponseContent).append("</p>"); // Contenu de la réponse
        emailContent.append("<p><strong>Date :</strong> ").append(reponseDate).append("</p>"); // Date de la réponse
        emailContent.append("<p><strong>Status :</strong> ").append(reclamationStatus).append("</p>"); // Statut de la réclamation
        emailContent.append("</div>");

        emailContent.append("</body></html>");

        helper.setText(emailContent.toString(), true);
        emailSender.send(message);
    }

}
