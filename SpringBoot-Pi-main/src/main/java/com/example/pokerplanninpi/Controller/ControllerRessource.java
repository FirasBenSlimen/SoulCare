package com.example.pokerplanninpi.Controller;

import com.twilio.base.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.example.pokerplanninpi.GlobalService.RessourceServiceImpl;
import com.example.pokerplanninpi.entity.Ressource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/ressource")
public class ControllerRessource {
    @Autowired
    RessourceServiceImpl ressourceService;
    /* @PostMapping("/createResourceAndAssociateCategory/{category-id}")
   public void createResourceAndAssociateCategory(@RequestBody Ressource ressource,
                                                  @PathVariable("category-id") Long categoryId) {


       ressourceService.createResourceAndAssociateCategory(ressource, categoryId);
}*/

    @PutMapping("/createResourceAndAssociateCategory/{category-id}")
    public void createResourceAndAssociateCategory(@RequestParam("titleR") String titleR,
                                                   @RequestParam("descriptionR") String descriptionR,
                                                   @RequestParam("file") MultipartFile file,
                                                   @PathVariable("category-id") Long categoryId) {
        Ressource ressource = new Ressource();
        ressource.setTitleR(titleR);
        ressource.setDescriptionR(descriptionR);

        if (!file.isEmpty()) {
            String contentType = file.getContentType();
            if (contentType.equals("image/jpeg") || contentType.equals("image/png")
                    || contentType.equals("application/pdf") || contentType.startsWith("video/")) {
                // Handle file upload
                String filePath = generateUniqueFilePath(file);
                ressource.setUrl(filePath); // Stockez le chemin complet du fichier dans la base de données
                try {
                    file.transferTo(new File(filePath));
                } catch (IOException e) {
                    e.printStackTrace();
                }
            } else {
                // Handle invalid file type
                System.out.println("Invalid file type: " + contentType);
            }
        }

        ressourceService.createResourceAndAssociateCategory(ressource, categoryId);
    }

    private String generateUniqueFilePath(MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        String fileExtension = getFileExtension(originalFileName);
        String uniqueFileName = UUID.randomUUID().toString() + "." + fileExtension;
        String filePath = "C:\\Users\\Lenovo\\IdeaProjects\\Project MindCare Sayf\\mindCare\\uploads\\" + uniqueFileName;
        return filePath;
    }


    private String getFileExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        if (dotIndex < 0) {
            return "";
        }
        return filename.substring(dotIndex + 1);
    }


    @GetMapping("/getressource/{ressource-id}")
    public Ressource getressource(@PathVariable("ressource-id") Long Idressource) {
        return ressourceService.getById(Idressource);
    }


    @GetMapping("/getall")
    public List<Ressource> getressources() {
        return ressourceService.getAllRessources();
    }

    @DeleteMapping("/delete/{ressource-id}")
    public void deleteRessource(@PathVariable("ressource-id") Long Idressource) {
        ressourceService.deleteRessource(Idressource);
    }

    @PutMapping("/updateIdressources")
    public Ressource update(@RequestBody Ressource ressource) {
        return ressourceService.updateRessource(ressource);
    }

    
    /*
    @PutMapping("/affecter-ressource-a-category/{ressource-id}/{category-id}")
    public void affecterressourceAcategory(@PathVariable("ressource-id") Long ressourceId, @PathVariable("category-id") Long categoryId) {
        ressourceService.assignResourceToCategory(ressourceId, categoryId);
    */

    @PutMapping("/desaffecter-ressource/{ressource-id}")
    public void Desaffecterressource(@PathVariable("ressource-id") Long ressourceId) {
        ressourceService.unassignResourceFromCategory(ressourceId);
    }



    @GetMapping("/findRessourcesByTitleR/{TitleR}")
    public List<Ressource> findRessourcesByTitleR(@PathVariable("TitleR") String TitleR) {
        return ressourceService.findRessourcesByTitleR(TitleR);
    }
    @GetMapping("/findRessourcesByCategoryId/{category-id}")
    public List<Ressource> findRessourcesByCategory_IdC(@PathVariable("category-id") Long idC) {
        return ressourceService.findRessourcesByCategory_IdC(idC);
    }


    @GetMapping("/searchRessource")
    List<Ressource> searchRessource(@RequestParam(value = "keyword") String keyword) {
        List<Ressource> allRessources = ressourceService.getAllRessources();
        return allRessources.stream()
                .filter(story ->
                        story.getTitleR().toLowerCase().contains(keyword.toLowerCase()) ||
                                story.getDescriptionR().toLowerCase().contains(keyword.toLowerCase())
                        )
                .collect(Collectors.toList());
    }

    @GetMapping("/statsByCategory")
    public ResponseEntity<List<Object[]>> getRessourceStatsByCategory() {
        List<Object[]> stats = ressourceService.getRessourceStatsByCategory();
        return ResponseEntity.ok(stats);
    }


    @GetMapping("/getResourcesByCategoryId/{category-id}")
    public List<Ressource> getResourcesByCategoryId(@PathVariable("category-id") Long categoryId) {
        return ressourceService.getResourcesByCategoryId(categoryId);
    }

    @PostMapping("/ressources/{idR}/like")
    public void likeRessource(@PathVariable("idR") Integer idR) {
        ressourceService.likeRessource(idR);
    }

    @PostMapping("/ressources/{idR}/dislike")
    public void dislikeRessource(@PathVariable("idR") Integer idR) {
        ressourceService.dislikeRessource(idR);
    }
    @GetMapping("/ressources/{idR}/likes")
    public int getLikes(@PathVariable("idR") Integer idR) {
        return ressourceService.getLikes(idR);
    }

    @GetMapping("/ressources/{idR}/dislikes")
    public int getDislikes(@PathVariable("idR") Integer idR) {
        return ressourceService.getDislikes(idR);
    }

    @GetMapping("/loadurl/{idRessource}")
    public ResponseEntity<byte[]> loadUrl(@PathVariable Long idRessource) {
        Ressource ressource = ressourceService.getById(idRessource);
        if (ressource != null) {
            String filePath = ressource.getUrl();
            File file = new File(filePath);
            byte[] fileContent;
            try {
                fileContent = Files.readAllBytes(file.toPath());
                HttpHeaders headers = new HttpHeaders();

                // Déterminer le type de contenu en fonction de l'extension du fichier
                String contentType = Files.probeContentType(file.toPath());
                if (contentType != null) {
                    headers.setContentType(MediaType.parseMediaType(contentType));
                }

                // Si c'est un fichier PDF, définir la disposition du contenu comme "inline" pour l'ouvrir dans le navigateur
                if (contentType != null && contentType.equals("application/pdf")) {
                    headers.setContentDisposition(ContentDisposition.builder("inline").filename(file.getName()).build());
                } else {
                    // Sinon, définir la disposition du contenu comme "attachment" pour le téléchargement
                    headers.setContentDisposition(ContentDisposition.builder("attachment").filename(file.getName()).build());
                }

                return ResponseEntity.ok()
                        .headers(headers)
                        .body(fileContent);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }
        return ResponseEntity.notFound().build();
    }


}
