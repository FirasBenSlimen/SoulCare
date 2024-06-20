import { Component, OnInit } from '@angular/core';
import { SCategoryService } from 'src/app/services/exercise/s-category.service';
import { Router } from '@angular/router';
import { CategoryExercise } from 'src/app/model/exercise/category-exercise.model';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  p: number = 1;
  categories: CategoryExercise[] = [];
  showAddForm: boolean = false;
  newCategory: CategoryExercise = new CategoryExercise();
  searchKeyword: string = '';
  selectedCriteria: string = 'title'; // Default selected criteria

  constructor(private service: SCategoryService, private router: Router) { }
  ngOnInit(): void {
    this.getCategories();
  }
  // Method triggered when the criteria selection changes
onCriteriaChange() {
  this.getCategoriesdyn(); // Call the search function when criteria changes
}

getCategoriesdyn() {
  this.service.getAllCategoriesdyna(this.selectedCriteria, this.searchKeyword).subscribe(
    (data: CategoryExercise[]) => {
      this.categories = data;
      console.log('Categories fetched successfully:', data);
    },
    error => {
      console.error('Error occurred while fetching categories:', error);
    }
  );
}
  
  getCategories(): void {
    this.service.getAllCategories().subscribe(
      (data: CategoryExercise[]) => { // Corrected data type
        this.categories = data;
        console.log('Categories exercise:', data);
      },
      error => {
        console.error('Erreur lors de la récupération des catégories', error); // Corrected error message
      }
    );
  }

  deleteCategory(id: number): void {
    this.service.deleteCategory(id)
      .subscribe(() => {
        this.categories = this.categories.filter(category => category.categoryId !== id);
      });
  }


  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }


  addCategory(): void {
    this.service.addCategory(this.newCategory)
      .subscribe((response: CategoryExercise) => { // Corrected response type
        console.log('New category added:', response);
        this.categories.push(response);
        this.toggleAddForm();
        this.newCategory = new CategoryExercise();
      });
  }
  updateCategory(): void {
    this.service.updateCategory(this.newCategory)
      .subscribe((response: CategoryExercise) => { // Corrected response type
        console.log('Category updated:', response);
        this.toggleAddForm(); 
        this.newCategory = new CategoryExercise(); 
        this.ngOnInit();
      });
  }
  editCategory(category: CategoryExercise): void {
    this.newCategory = new CategoryExercise(); // Initialize newCategory object

    // Then assign properties from category object to newCategory
    this.newCategory.categoryId = category.categoryId;
    this.newCategory.title = category.title;
    this.newCategory.description = category.description;
    this.newCategory.benefits = category.benefits;
    this.newCategory.exercises = category.exercises;
    
    this.showAddForm = true; 
  }
  searchCategories(): void {
    if (this.searchKeyword.trim() !== '') {
      this.service.searchCategory(this.searchKeyword).subscribe(
        (data: CategoryExercise[]) => { // Corrected data type
          this.categories = data;
          console.log('Search results:', data);
        },
        error => {
          console.error('Erreur lors de la recherche des catégories', error); // Corrected error message
        }
      );
    } else {
      this.ngOnInit();
    }
  }

}
