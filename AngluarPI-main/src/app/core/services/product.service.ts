import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8089/products';

  constructor(private http: HttpClient) { }

  // Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Fetch a single product by ID
  getProduct(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create a new product
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:8089/products/add-Product', product)
      .pipe(
        catchError(this.handleError)
      );
  }
  

// Update an existing product
updateProduct(productId: number, product: Product): Observable<Product> {
  const url = `http://localhost:8089/products/update/${productId}`;
  return this.http.put<Product>(url, product)
    .pipe(
      catchError(this.handleError)
    );
}

deleteProduct(productId: number): Observable<void> {
  const url = `${this.apiUrl}/${productId}`;
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
  
  getProductById(productId: number): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url);
  }
}
