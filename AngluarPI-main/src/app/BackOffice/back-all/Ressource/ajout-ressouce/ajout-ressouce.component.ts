import { Component, ViewChild, ElementRef } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { Ressource } from 'src/app/model/Ressource';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RessourceService } from 'src/app/services/CategoryRessource/ressource.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/CategoryRessource/category.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ajout-ressouce',
  templateUrl: './ajout-ressouce.component.html',
  styleUrls: ['./ajout-ressouce.component.css']
})
export class AjoutRessouceComponent {
  BlocForm: FormGroup;
  ressources: Ressource[] = [];
  catgories: Category[] = [];
  formSubmitted = false;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private service: RessourceService, private serviceCategory : CategoryService,
    private router: Router,
    private fb: FormBuilder
  ) {
    let formControls = {
      titleR: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      descriptionR: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      url: new FormControl('', [
        Validators.required,
      ]),
      category: new FormControl('', [
        Validators.required,
      ])
    };
    this.BlocForm = this.fb.group(formControls);
  }

  ngOnInit(): void {
    this.serviceCategory.getAllCategories().subscribe(
      (catgories: any) => {
        this.catgories = catgories;
        console.log(catgories);
      },
      (error) => {
        console.error(error);
      }
    );

  }

  get titleR() { return this.BlocForm.get('titleR'); }
  get descriptionR() { return this.BlocForm.get('descriptionR'); }
  get url() { return this.BlocForm.get('url'); }
  get date_creation() { return this.BlocForm.get('date_creation'); }
  get category() { return this.BlocForm.get('category'); }



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

  addRessource(fileInput: HTMLInputElement) {
    this.formSubmitted = true;
    if (this.BlocForm.invalid) {
      return;
    }

    const data = this.BlocForm.value;
    const newRessource = new Ressource(
      undefined,
      data.titleR,
      data.descriptionR,
      data.url,
      new Date(),
      this.catgories.find(category => category.idC == data.category)
    );

    const fileToUpload = fileInput.files?.[0];

    if (!fileToUpload) {
      console.error("Aucun fichier sélectionné.");
      return;
    }
    alert("SUCCESS\n\n"+JSON.stringify(this.BlocForm.value,null,4));
    this.service.createResourceAndAssociateCategory(newRessource, newRessource.category.idC, fileToUpload).subscribe(
      res => {
        console.log(res);
        console.log('Ajout réussi ', res);
        this.router.navigate(['admin/listRessource']);
      },
      err => {
        console.error('Erreur lors de l\'ajout de la ressource :', err);
        if (err instanceof HttpErrorResponse) {
          console.error('Erreur HTTP:', err.error);
        }
      }
    );
  }


}
