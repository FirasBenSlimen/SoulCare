import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/Category';
import { Ressource } from 'src/app/model/Ressource';
import { CategoryService } from 'src/app/services/CategoryRessource/category.service';
import { RessourceService } from 'src/app/services/CategoryRessource/ressource.service';

@Component({
  selector: 'app-catgorie-front',
  templateUrl: './catgorie-front.component.html',
  styleUrls: ['./catgorie-front.component.css']
})
export class CatgorieFrontComponent {
  categories: Category[] = [];
  constructor(private service: CategoryService, private router: Router , private serviceressource : RessourceService) { }


  
  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.service.getAllCategories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log('categories:', data);
      },
      error => {
        console.error('Erreur lors de la récupération des categories', error);
      }
    );
  }


}
