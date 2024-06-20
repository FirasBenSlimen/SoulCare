import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from 'rxjs';
import { Category } from 'src/app/model/Category';
import {User} from "../../model/User";
import {catchError} from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8085/mindCare/category';

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }
  private getHttpOptions(): { headers: HttpHeaders } {
    const token = this.getToken();
    console.log(token);
    if (token) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      };
    } else {
      // Gérer le cas où le token n'existe pas
      // Exemple : Rediriger l'utilisateur vers la page de connexion
      throw new Error('Token not found');
    }
  }
  addCategory(category: Category): Observable<Category> {
    const httpOptions = this.getHttpOptions();
    return this.http.post<Category>(`${this.baseUrl}/addcategory`, category, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }

  getCategoryById(id: number): Observable<Category> {

    const httpOptions = this.getHttpOptions();
    return this.http.get<Category>(`${this.baseUrl}/getcategory/${id}`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }

  getAllCategories(): Observable<Category[]> {

    const httpOptions = this.getHttpOptions();
    return this.http.get<Category[]>(`${this.baseUrl}/getall`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }

  deleteCategory(id: number): Observable<void> {

    const httpOptions = this.getHttpOptions();
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );


  }

  updateCategory(category: Category): Observable<Category> {

    const httpOptions = this.getHttpOptions();
    return this.http.put<Category>(`${this.baseUrl}/updatecategorys`, category, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }

  searchCategory(keyword: string): Observable<Category[]> {
    const url = `${this.baseUrl}/searchCategory?keyword=${keyword}`;

    const httpOptions = this.getHttpOptions();
    return this.http.get<Category[]>(url, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }
}
