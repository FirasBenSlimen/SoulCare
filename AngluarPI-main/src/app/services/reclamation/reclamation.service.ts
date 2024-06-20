import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reclamation } from 'src/app/model/reclamation';
import { ReponseReclamation } from 'src/app/model/ReponseReclamation';
import {User} from "../../model/User";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};
@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private ajouterurl ='http://localhost:8085/mindCare/addReclamation';
  private listurl ='http://localhost:8085/mindCare/retrieveAllReclamations';
  private modifierurl = 'http://localhost:8085/mindCare/update_reclamation';
  private userUrl='http://localhost:8085/mindCare/retrieveAllUsers';
  private Url='http://localhost:8085/mindCare';
  private apiUrl = 'http://localhost:8085/mindCare/reclamationStats';
  private apiReponseAjout ='http://localhost:8085/mindCare/addReponse';
  private apiReponseaffiche='http://localhost:8085/mindCare/retrieveAllReponse';
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

   ajouterreclamation(reclamation: Reclamation): Observable<Reclamation> {
     const url1 = `${this.ajouterurl}`;
    const httpOptions = this.getHttpOptions();
     return this.http.post<Reclamation>(url1, reclamation, httpOptions)
       .pipe(
         catchError((error: any) => {
           return throwError('Erreur lors de l\'ajout de la reclamation');
         })
       );
  }

  ajoutReponseToReclamation(id: number, reponseReclamation: ReponseReclamation): Observable<ReponseReclamation> {
    const url = `${this.Url}/reclamations/${id}/reponses`;
    const httpOptions = this.getHttpOptions();
    return this.http.post<ReponseReclamation>(url, reponseReclamation, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }


 listreclamation() {
   const httpOptions = this.getHttpOptions();
   console.log(httpOptions);
   return this.http.get<Reclamation[]>(this.listurl, httpOptions)
     .pipe(
       catchError((error: any) => {
         return throwError('Erreur lors de la récupération de la liste des utilisateurs');
       })
     );
  }

  listreponse() {
    const httpOptions = this.getHttpOptions();
    console.log(httpOptions);
    return this.http.get<ReponseReclamation[]>(this.apiReponseaffiche, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de la récupération de la liste des utilisateurs');
        })
      );
   }


   deleteReclamation(id: number): Observable<void> {
    const url = `${this.Url}/${id}`;
     const httpOptions = this.getHttpOptions();
     return this.http.delete<void>(url, httpOptions)
       .pipe(
         catchError((error: any) => {
           return throwError('Erreur lors de la suppression de l\'utilisateur');
         })
       );
  }
   modifierreclamation(id:number,reclamation: Reclamation) {
    const url = `${this.modifierurl}/${id}`;
     const httpOptions = this.getHttpOptions();
     return this.http.put<Reclamation>(url, reclamation, httpOptions)
       .pipe(
         catchError((error: any) => {
           return throwError('Erreur lors de la modification de l\'utilisateur');
         })
       );
   }

   getReclamation(id: any) {
     return this.http.get('http://localhost:8085/mindCare/get_reclamation/' + id)
   }



   getReponse(id: any) {
     const httpOptions = this.getHttpOptions();
     return this.http.get<any>('http://localhost:8085/mindCare/getReponse/' + id, httpOptions)
       .pipe(
         catchError((error: any) => {
           return throwError('Erreur lors de la récupération de l\'utilisateur');
         })
       );
  }


   getUsers() {

     const httpOptions = this.getHttpOptions();
     return this.http.get<any>(this.userUrl, httpOptions)
       .pipe(
         catchError((error: any) => {
           return throwError('Erreur lors de la récupération de l\'utilisateur');
         })
       );
   }


   searchReclamations(keyword: string): Observable<Reclamation[]> {
    const url = `${this.Url}/searchReclamation?keyword=${keyword}`;
     const httpOptions = this.getHttpOptions();
     return this.http.get<Reclamation[]>(url, httpOptions)
       .pipe(
         catchError((error: any) => {
           return throwError('Erreur lors de la modification de l\'utilisateur');
         })
       );
  }
  searchReponse(keyword: string): Observable<Reclamation[]> {
    const url = `${this.Url}/searchReponse?keyword=${keyword}`;
    const httpOptions = this.getHttpOptions();
    return this.http.get<ReponseReclamation[]>(url, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de la modification de l\'utilisateur');
        })
      );
  }

  getReclamationStats(): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<any>(this.apiUrl, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de la récupération de l\'utilisateur');
        })
      );
  }

  getReclamationByName(name: string): Observable<Reclamation> {
    const url = `${this.Url}/getReclamationByName/${name}`;
    const httpOptions = this.getHttpOptions();
    return this.http.get<Reclamation>(url, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de la récupération de l\'utilisateur');
        })
      );
}

}
