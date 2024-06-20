import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/models/Category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent  {
  categoryId: number;
  category: Category ;


  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) { this.categoryId = 0; // Initialize to a default value if necessary
  this.category= new Category(); // Initialize to an empty category object if necessary 

  }

  ngOnInit(): void {
    this.categoryId = +this.route.snapshot.paramMap.get('categoryId')!;
    this.getcategoryDetails();
  }

  getcategoryDetails() {
    this.categoryService.getCategorytById(this.categoryId).subscribe(
      (category: Category) => {
        this.category = category;
      },
      (error) => {
        console.error('Error fetching category details:', error);
        // Optionally, handle the error gracefully (e.g., show error message to the user)
      }
    );
  }
  onUpdate() {
    this.categoryService.updateCategory(this.categoryId, this.category).subscribe(
      (updatedcategory: Category) => {
        console.log('category updated successfully:', updatedcategory);
        // Optionally, navigate to a different route or show a success message
      },
      (error) => {
        console.error('Error updating category:', error);
        // Optionally, handle the error gracefully (e.g., show error message to the user)
      }
    );
  }
}