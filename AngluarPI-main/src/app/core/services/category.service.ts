import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/Category.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
private apiUrl = 'http://localhost:8089/category';

  constructor(private http: HttpClient) { }

  // Fetch all products
  getCategorys(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Fetch a single product by ID
  getCategory(id: number): Observable<Category> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Category>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create a new product
  createCategory(Category: Category): Observable<Category> {
    return this.http.post<Category>('http://localhost:8089/category/add-category', Category)
      .pipe(
        catchError(this.handleError)
      );
  }
  

// Update an existing product
updateCategory(CategoryId: number, Category: Category): Observable<Category> {
  const url = `http://localhost:8089/category/update/${CategoryId}`;
  return this.http.put<Category>(url, Category)
    .pipe(
      catchError(this.handleError)
    );
}

deleteCategory(CategoryId: number): Observable<void> {
  const url = `${this.apiUrl}/${CategoryId}`;
  return this.http.delete<void>(url)
    .pipe(
      catchError(this.handleError)
    );
}
  
  // Error handling
  private handleError(error: any) {
    console.error('API Error: ', error);
    return throwError('An error occurred. Please try again later.');
  }
  
  getCategorytById(CategoryId: number): Observable<Category> {
    const url = `${this.apiUrl}/${CategoryId}`;
    return this.http.get<Category>(url);
  }
}
