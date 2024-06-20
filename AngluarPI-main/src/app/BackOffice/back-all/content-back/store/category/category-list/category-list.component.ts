import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/core/models/Category.model';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = []; // Initialize with an empty array

  constructor(private categoryService: CategoryService , private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategorys().subscribe(categories => {
      this.categories = categories;
    });
  }
  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id)
        .subscribe(() => {
          console.log('Category deleted successfully');
          // Reload the current route to reflect changes
          window.location.reload();
        });
    }
  }
  redirectToUpdate(categoryId: number): void {
    this.router.navigate(['/update-category', categoryId]);
  }

}
