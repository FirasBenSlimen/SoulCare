import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
 import { Exercise } from 'src/app/model/exercise/exercise.model';
 
@Injectable({
  providedIn: 'root'
})
export class SExerciseService {
  private baseUrl = 'http://localhost:8085/mindCare/exercice';

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
      // Handle case where token does not exist
      throw new Error('Token not found');
    }
  }

  addExercise(exercise: Exercise): Observable<Exercise> {
    const httpOptions = this.getHttpOptions();
    const formData: FormData = new FormData();
    console.log('Exercise before sending:', exercise); // Log the exercise object to the console

    return this.http.post<Exercise>(`${this.baseUrl}/add`, exercise, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Error while adding exercise');
        })
      );
  }





  getExerciseById(id: number): Observable<Exercise> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<Exercise>(`${this.baseUrl}/get/${id}`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Error while retrieving exercise');
        })
      );
  }

  getAllExercises(): Observable<Exercise[]> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<Exercise[]>(`${this.baseUrl}/all`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Error while retrieving exercises');
        })
      );
  }

  deleteExercise(id: number): Observable<void> {
    const httpOptions = this.getHttpOptions();
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Error while deleting exercise');
        })
      );
  }

updateExercise(id: number, exercise: Exercise): Observable<Exercise> {
  const httpOptions = this.getHttpOptions();
  return this.http.put<Exercise>(`${this.baseUrl}/update/${id}`, exercise, httpOptions)
    .pipe(
      catchError((error: any) => {
        return throwError('Error while updating exercise');
      })
    );
}

getExercisesByCriteriaAndValue(criteria: string, value: string): Observable<Exercise[]> {
  const url = `${this.baseUrl}/search/${criteria}/${value}`;
  const httpOptions = this.getHttpOptions();
  return this.http.get<Exercise[]>(url, httpOptions)
    .pipe(
      catchError((error: any) => {
        return throwError('Error while retrieving exercises');
      })
    );
}
  searchExercise(keyword: string): Observable<Exercise[]> {
    const url = `${this.baseUrl}/searchExercise?keyword=${keyword}`;

    const httpOptions = this.getHttpOptions();
    return this.http.get<Exercise[]>(url, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Error while searching exercise');
        })
      );
  }

  // You can add more methods related to Exercise service if needed
}
