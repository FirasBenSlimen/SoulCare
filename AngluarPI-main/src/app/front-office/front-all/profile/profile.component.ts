import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../model/User";
import {UserService} from "../../../services/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  id:any;

  BlocForm: FormGroup;

  users :User[]=[];
  formSubmitted = false;
  constructor(private service: UserService, private router: Router,     private route: ActivatedRoute
      ,    private fb: FormBuilder
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
      ]),
      role: new FormControl('', [
        Validators.required,
      ])
    };
    this.BlocForm = this.fb.group(formControls);
  }
  ngOnInit() {
    let id = localStorage.getItem('userID');;
    this.id = id;
    console.log('ID:', id);
    this.service.getuser(this.id).subscribe((result: User) => {
      let user = result;
      console.log('user:', user);



      this.BlocForm.patchValue({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        role: user.role
      });

    });


  }


  get firstname() { return this.BlocForm.get('firstname'); }
  get lastname() { return this.BlocForm.get('lastname'); }
  get email() { return this.BlocForm.get('email'); }
  get password() { return this.BlocForm.get('password'); }
  get role() { return this.BlocForm.get('role'); }






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





  modifierUser() {
    this.formSubmitted = true;

    if (this.BlocForm.invalid) {
      return;
    }

    let data = this.BlocForm.value;

    let user = new User(
        this.id,
        data.firstname,
        data.lastname,
        data.email,
        data.password,
        data.role
    );

    console.log('Histoire utilisateur:', user);

    this.service.modifieruser(this.id,user).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['home']);
        },
        (err) => {
          console.error('Erreur lors de l\'ajout de l\'histoire utilisateur :', err);
        }
    );
  }

}
