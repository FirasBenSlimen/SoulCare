import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models/Category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  newCategory: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private router: Router // Inject the Router service
  ) { }

  onSubmit(): void {
    if (this.newCategory.name && this.newCategory.description) {
      this.categoryService.createCategory(this.newCategory).subscribe(() => {
        // Category added successfully
        console.log('Category added successfully');
        // Reset the form
        this.newCategory = new Category();
        // Reload the current route to reflect changes
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([this.router.url]);
      });
    } else {
      console.error('Please enter category name and description.');
    }
  }
}