import { Component } from '@angular/core';
import {User} from "../../../../../model/User";
import {Router} from "@angular/router";
import {UserService} from "../../../../../services/user/user.service";

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent {
  users: User[]=[];
  searchKeyword: string = '';
  p: number = 1;
  reponseContenu: string = '';

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.service.listuser().subscribe(
      (data:any) => {
        this.users = data;
        console.log('tasks:', data);

      },
      error => {
        console.error('Erreur lors de la récupération des tasks', error);
      }
    );
  }



  deleteUser(id: number): void {
    this.service.deleteuser(id)
      .subscribe(() => {
        this.users = this.users.filter(userr => userr.id !== id);
      });
  }
  updateUser(id: number): void {
    let Selecteduser = this.users.find(user => user.id );
    this.service.modifieruser(id,Selecteduser)
      .subscribe(() => {
        this.users = this.users.filter(userr => userr.id !== id);
      });
  }


  searchUsers(): void {
    if (this.searchKeyword.trim() !== '') {
      this.service.searchusers(this.searchKeyword).subscribe(
        data => {
          this.users = data;
          console.log('Search results:', data);
        },
        error => {
          console.error('Erreur lors de la recherche des taks', error);
        }
      );
    } else {
      this.ngOnInit();
    }
  }

 /* searchReclamations(): void {
    if (this.searchKeyword.trim() !== '') {
      this.service.searchUsers(this.searchKeyword).subscribe(
        data => {
          this.reclamations = data;
          console.log('Search results:', data);
        },
        error => {
          console.error('Erreur lors de la recherche des taks', error);
        }
      );
    } else {
      this.ngOnInit();
    }
  }
*/



  openResponseForm(user: User): void {
    this.router.navigate(['admin/updateuser', user.id]);
  }

}
