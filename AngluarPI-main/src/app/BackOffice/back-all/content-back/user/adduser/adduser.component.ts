import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../../model/User";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../../../services/user/user.service";

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  BlocForm: FormGroup;
  users: User[] = [];

  formSubmitted = false;

  constructor(
    private service: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    let formControls = {
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        this.passwordValidator,
      ]),
      role: new FormControl('', [
        Validators.required,
      ])
    };
    this.BlocForm = this.fb.group(formControls);
  }
  passwordValidator(control: FormControl): { [key: string]: boolean } | null {
    if (!control.value) {
      return null; // Si le champ est vide, aucune validation nécessaire
    }

    // Expression régulière pour valider le mot de passe
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    // Vérification si le mot de passe correspond à l'expression régulière
    return regex.test(control.value) ? null : { invalidPassword: true };
  }

  ngOnInit(): void {


  }
  get email() { return this.BlocForm.get('email'); }
  get firstname() { return this.BlocForm.get('firstname'); }
  get lastname() { return this.BlocForm.get('lastname'); }
  get role() { return this.BlocForm.get('role'); }
  get password() { return this.BlocForm.get('password'); }






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
    if (this.BlocForm.get(field)?.hasError('invalidPassword')) {
      return 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et avoir une longueur d\'au moins 8 caractères';
    }
    return '';
  }

  addUser() {

    this.formSubmitted = true;
    /*if (this.BlocForm.invalid) {
      console.log('invalid');
      return;
    }*/

    const data = this.BlocForm.value;
   const newUser  = new  User(
     undefined,
      data.firstname,
      data.lastname,
      data.email,
      data.password,
      data.role
    );
    console.log(newUser);
    this.service.ajouteruser(newUser).subscribe(
      res => {
        console.log(res);
        console.log('add succfuly ', res)
        this.router.navigate(['admin/user']);
      },
      err => {
        console.error('Erreur lors de l\'ajout de lutilisateur :', err);
        if (err instanceof HttpErrorResponse) {
          console.error('Error:', err.error);
        }
      }

    );
  }
}
