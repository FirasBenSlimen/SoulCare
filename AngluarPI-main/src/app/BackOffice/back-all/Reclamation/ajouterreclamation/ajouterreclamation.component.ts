import { Component } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation/reclamation.service';
import { Reclamation, CategorieType } from 'src/app/model/reclamation';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-ajouterreclamation',
  templateUrl: './ajouterreclamation.component.html',
  styleUrls: ['./ajouterreclamation.component.css']
})
export class AjouterreclamationComponent {
  BlocForm: FormGroup;
  reclamations: Reclamation[] = [];
  users: User[] = [];

  formSubmitted = false;

  constructor(
    private service: ReclamationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    let formControls = {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      dateSoumission: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      descriptionReclamation: new FormControl('', [
        Validators.required,
      ]),
      categorie: new FormControl('', [
        Validators.required,
      ]),
      user: new FormControl('', [
        Validators.required,
      ]),
      status: new FormControl('NotProcessed', [
        Validators.required,
      ])
    };
    this.BlocForm = this.fb.group(formControls);
  }
  ngOnInit(): void {
    this.service.getUsers().subscribe(
      (users: any) => {
        this.users = users;
        console.log(users);
      },
      (error) => {
        console.error(error);
      }
    );

  }

  get name() { return this.BlocForm.get('name'); }
  get dateSoumission() { return this.BlocForm.get('dateSoumission'); }
  get descriptionReclamation() { return this.BlocForm.get('descriptionReclamation'); }
  get categorie() { return this.BlocForm.get('categorie'); }
  get user() { return this.BlocForm.get('user'); }






  validateField(field: string) {
    return (
      this.BlocForm.get(field)?.invalid &&
      (this.BlocForm.get(field)?.touched || this.formSubmitted)
    );
  }

  getErrorMessage(field: string) {
    if (this.BlocForm.get(field)?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    if (this.BlocForm.get(field)?.hasError('minlength')) {
      return 'Ce champ doit contenir au moins 4 caractères';
    }
    return '';
  }

  addReclamation() {
    this.formSubmitted = true;
    if (this.BlocForm.invalid) {
      return;
    }
    const data = this.BlocForm.value;

    let Selecteduser = this.users.find(user => user.id == data.user);
console.log ("Selected User : ",Selecteduser);
    const newReclamation  = new  Reclamation(
      undefined,
      data.descriptionReclamation,
      data.name,
      data.dateSoumission,
      data.categorie,
      Selecteduser,
      data.status
    );

    console.log('Reclamation:', newReclamation);
    this.service.ajouterreclamation(newReclamation).subscribe(
      res => {
        console.log(res);
        console.log('add succfuly ', res)
        this.router.navigate(['admin/reclamation']);
      },
      err => {
        console.error('Erreur lors de l\'ajout de la réclamation :', err);
        if (err instanceof HttpErrorResponse) {
          console.error('Error:', err.error);
        }
      }

    );
  }
}
