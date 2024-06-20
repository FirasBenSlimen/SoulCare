import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reclamation } from 'src/app/model/reclamation';
import { ReclamationService } from 'src/app/services/reclamation/reclamation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ReponseReclamation } from 'src/app/model/ReponseReclamation';

@Component({
  selector: 'app-reponse-reclamation',
  templateUrl: './reponse-reclamation.component.html',
  styleUrls: ['./reponse-reclamation.component.css']
})
export class ReponseReclamationComponent implements OnInit {
  formSubmitted = false;
  selectedUserId: string | undefined;
  selectedReclamationName: string | undefined;
  reponseForm: FormGroup;
  reclamationId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private reclamationService: ReclamationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.reponseForm = this.fb.group({
      reponseContenu: ['', Validators.required],
      statuss: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reclamationId = params['id'];
      this.reclamationService.getReclamation(this.reclamationId).subscribe((reclamation: Reclamation) => {
        this.selectedUserId = reclamation.user?.email;
        this.selectedReclamationName = reclamation.name;
      }, (error: any) => {
        console.error('Erreur lors de la récupération des détails de la réclamation :', error);
      });
    });
  }

  submitReponse(): void {
    this.formSubmitted = true;

    if (this.reponseForm.valid && this.reclamationId !== undefined) {
        const statusTraite = 'TRAITE';

        console.log('Statut sélectionné : ', statusTraite);

        const userId = this.selectedUserId ? parseInt(this.selectedUserId, 10) : undefined;

        const reponseReclamation: ReponseReclamation = {
          id: this.reponseForm.get('id')?.value || null,
          reclamationId: this.reclamationId,
          contenu: this.reponseForm.get('reponseContenu')?.value,
          dateReponse: new Date().toISOString(),
          user: userId ? { id: userId } : undefined,
          statusReclamation : "TRAITE",
        };
        console.log("Réponse envoyée : ", reponseReclamation);
        this.reclamationService.ajoutReponseToReclamation(this.reclamationId, reponseReclamation)
            .subscribe((response: ReponseReclamation) => {
                console.log('Réponse ajoutée avec succès :', response);
                this.router.navigate(['admin/reclamation']);
            }, (error: HttpErrorResponse) => {
                console.error('Erreur lors de l\'ajout de la réponse :', error);
            });
    }
}



  validateField(field: string) {
    return (
      this.reponseForm.get(field)?.invalid &&
      (this.reponseForm.get(field)?.touched || this.formSubmitted)
    );
  }

  getErrorMessage(field: string) {
    if (this.reponseForm.get(field)?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    return '';
  }
}
