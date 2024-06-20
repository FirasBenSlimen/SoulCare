import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from 'rxjs';
import { CategoryExercise } from 'src/app/model/exercise/category-exercise.model';
 import {catchError,tap} from "rxjs/operators"; 

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};
@Injectable({
  providedIn: 'root'
})
export class SCategoryService {
  private baseUrl = 'http://localhost:8085/mindCare/category_exercise';



  getAllCategoriesdyna(criteria: string, value: string): Observable<CategoryExercise[]> {
    const url = `${this.baseUrl}/search/${criteria}/${value}`;
    const httpOptions = this.getHttpOptions();
    return this.http.get<CategoryExercise[]>(url, httpOptions)
      .pipe(
        tap(_ => console.log('Categories fetched successfully')),
        catchError((error: any) => {
          console.error('Error occurred while fetching categories:', error);
          const errorMessage = this.handleHttpError(error);
          return throwError(errorMessage);
        })
      );
  }



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



  addCategory(category: CategoryExercise): Observable<CategoryExercise> {
    const httpOptions = this.getHttpOptions();
    return this.http.post<CategoryExercise>(`${this.baseUrl}/add`, category, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de la catégorie');
        })
      );
  }

  getCategoryById(id: number): Observable<CategoryExercise> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<CategoryExercise>(`${this.baseUrl}/get/${id}`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de la récupération de la catégorie');
        })
      );
  }

  getAllCategories(): Observable<CategoryExercise[]> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<CategoryExercise[]>(`${this.baseUrl}/all`, httpOptions)
      .pipe(
        tap(_ => console.log('Categories fetched successfully')),
        catchError((error: any) => {
          // Log detailed error information
          console.error('Error occurred while fetching categories:', error);
          
          // Throw a new error with a customized message
          const errorMessage = this.handleHttpError(error);
          return throwError(errorMessage);
        })
      );
  }
  
  // Method to handle HTTP errors and generate error messages
  private handleHttpError(error: any): string {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} - ${error.error.message}`;
    }
    return errorMessage;
  }

  deleteCategory(id: number): Observable<void> {
    const httpOptions = this.getHttpOptions();
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de la suppression de la catégorie');
        })
      );
  }

  updateCategory(category: CategoryExercise): Observable<CategoryExercise> {
    
    const httpOptions = this.getHttpOptions();
    return this.http.put<CategoryExercise>(`${this.baseUrl}/update`, category, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de la mise à jour de la catégorie');
        })
      );
  }




   searchCategory(keyword: string): Observable<CategoryExercise[]> {
    const url = `${this.baseUrl}/searchCategory?keyword=${keyword}`;

    const httpOptions = this.getHttpOptions();
    return this.http.get<CategoryExercise[]>(url, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  } 
}
