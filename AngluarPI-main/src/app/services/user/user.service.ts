import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../model/User";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Ressource} from "../../model/Ressource";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private ajouterurl ='http://localhost:8085/mindCare/api/v1/Users/add';
  private listurl ='http://localhost:8085/mindCare/api/v1/Users/all';
  private modifierurl = 'http://localhost:8085/mindCare/api/v1/Users/update';
  private deleteUrl='http://localhost:8085/mindCare/api/v1/Users/delete';
  private searchUrl ='http://localhost:8085/mindCare/api/v1/Users';
  constructor(private http: HttpClient) { }


  private getToken(): string | null {
    return localStorage.getItem('token');
  }
  getuserID(email: string): Observable<number> {
    const httpOptions = this.getHttpOptions();
    console.log("id: "+ this.http.get<number>(`http://localhost:8085/mindCare/api/v1/Users/getidbyemail/${email}`));
    return this.http.get<number>(`http://localhost:8085/mindCare/api/v1/Users/getidbyemail/${email}`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de la récupération des détails de l\'utilisateur');
        })
      );
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
  ajouteruser(user: User): Observable<User> {
    const httpOptions = this.getHttpOptions();
    return this.http.post<User>(this.ajouterurl, user, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }

  listuser(): Observable<User[]> {
    const httpOptions = this.getHttpOptions();
    console.log(httpOptions);
    return this.http.get<User[]>(this.listurl, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de la récupération de la liste des utilisateurs');
        })
      );
  }

  deleteuser(id: number): Observable<void> {
    const url = `${this.deleteUrl}/${id}`;
    const httpOptions = this.getHttpOptions();
    return this.http.delete<void>(url, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de la suppression de l\'utilisateur');
        })
      );
  }
  modifieruser(id:number,user: User) {
    const url = `${this.modifierurl}/${id}`;
    const httpOptions = this.getHttpOptions();
    return this.http.put<User>(url, user, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de la modification de l\'utilisateur');
        })
      );
  }
  getUserDetails(email: string) {
    const httpOptions = this.getHttpOptions();
    return this.http.get<User>(`http://localhost:8085/mindCare/api/v1/Users/getbyemail/${email}`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de la récupération des détails de l\'utilisateur');
        })
      );
  }
  getuser(id: any) {
    const httpOptions = this.getHttpOptions();
    return this.http.get<User>(`http://localhost:8085/mindCare/api/v1/Users/get/${id}`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de la récupération de l\'utilisateur');
        })
      );
  }






  searchusers(keyword: string): Observable<User[]> {
    const url = `${this.searchUrl}/searchUser?keyword=${keyword}`;
    const httpOptions = this.getHttpOptions();
    return this.http.get<User[]>(url, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }


}
