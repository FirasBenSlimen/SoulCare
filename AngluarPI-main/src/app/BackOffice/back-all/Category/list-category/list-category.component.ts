import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/CategoryRessource/category.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent {
  p: number = 1;
  categories: Category[] = [];
  showAddForm: boolean = false;
  newCategory: Category = new Category('');
  searchKeyword: string = '';

  constructor(private service: CategoryService, private router: Router) { }

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

  deleteCategory(id: number): void {
    this.service.deleteCategory(id)
      .subscribe(() => {
        this.categories = this.categories.filter(category => category.idC !== id);
      });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  addCategory(): void {
    this.service.addCategory(this.newCategory)
      .subscribe((response: any) => {
        console.log('New category added:', response);
        this.categories.push(response);
        this.toggleAddForm();
        this.newCategory = new Category('');
      });
  }

  editCategory(category: Category): void {
    this.newCategory = { ...category }; 
    this.showAddForm = true; 
  }

  updateCategory(): void {
    this.service.updateCategory(this.newCategory)
      .subscribe((response: any) => {
        console.log('Category updated:', response);
        this.toggleAddForm(); 
        this.newCategory = new Category(''); 
        this.ngOnInit();
      });
  }


  searchCategories(): void {
    if (this.searchKeyword.trim() !== '') {
      this.service.searchCategory(this.searchKeyword).subscribe(
        data => {
          this.categories = data;
          console.log('Search results:', data);
        },
        error => {
          console.error('Erreur lors de la recherche des categories', error);
        }
      );
    } else {
      this.ngOnInit();
    }
  }
}
