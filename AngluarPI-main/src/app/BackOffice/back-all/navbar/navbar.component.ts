import { Component } from '@angular/core';
import {Router} from "@angular/router";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  imageWidth: number = 80; // Set initial width
  imageHeight: number = 80; // Set initial height
  imageMarginLeft: number = -100; // Set initial left margin
  constructor(
    private router: Router
  ) {
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    this.router.navigate(['login']);
  }
}
