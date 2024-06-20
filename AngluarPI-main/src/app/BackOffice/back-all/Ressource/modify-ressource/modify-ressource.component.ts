import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/Category';
import { Ressource } from 'src/app/model/Ressource';
import { CategoryService } from 'src/app/services/CategoryRessource/category.service';
import { RessourceService } from 'src/app/services/CategoryRessource/ressource.service';

@Component({
  selector: 'app-modify-ressource',
  templateUrl: './modify-ressource.component.html',
  styleUrls: ['./modify-ressource.component.css']
})
export class ModifyRessourceComponent {
  BlocForm: FormGroup;
  ressources: Ressource[] = []; 
  catgories: Category[] = [];
  formSubmitted = false;
  id:any;

  constructor(
    private service: RessourceService, private serviceCategory : CategoryService,private route: ActivatedRoute ,
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
      ])
    };
    this.BlocForm = this.fb.group(formControls);
  }


  
  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.id = id;
    console.log('ID:', id);
  
    this.service.getRessourceById(this.id).subscribe((result: Ressource) => {
      let ressouce = result;
      console.log('ressouce:', ressouce);
  
      this.serviceCategory.getAllCategories().subscribe(
        (catgories: any) => {
          this.catgories = catgories;
          console.log(catgories);
  
          if (ressouce.date_creation && typeof ressouce.date_creation === 'number') {
            // Convertir le timestamp en date au format "yyyy-MM-dd"
            let date_creation = new Date(ressouce.date_creation).toISOString().slice(0, 10);
  
  
            this.BlocForm.patchValue({
              titleR: ressouce.titleR,
              descriptionR: ressouce.descriptionR,
              url: ressouce.url,
              date_creation: date_creation,
              category: ressouce.category
            });
          } else {
            this.BlocForm.patchValue({
              titleR: ressouce.titleR,
              descriptionR: ressouce.descriptionR,
              url: ressouce.url,
              date_creation: ressouce.date_creation,
              category: ressouce.category
            });
          }
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }

  get titleR() { return this.BlocForm.get('titleR'); }
  get descriptionR() { return this.BlocForm.get('descriptionR'); }
  get url() { return this.BlocForm.get('url'); }
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


updateRessource(){
  this.formSubmitted = true;

  if (this.BlocForm.invalid) {
    return;
  }

  let data = this.BlocForm.value;

  let ressource = new Ressource(
    this.id,
    data.titleR,
    data.descriptionR,
    data.url,
    new Date(),
    data.category
    );

  console.log('Histoire utilisateur:', ressource);

  this.service.updateRessource(ressource).subscribe(
    (res) => {
      console.log(res);
      this.router.navigate(['admin/listRessource']);
    },
    (err) => {
      console.error('Erreur lors de l\'ajout de l\'histoire utilisateur :', err);
    }
  );
}

}
