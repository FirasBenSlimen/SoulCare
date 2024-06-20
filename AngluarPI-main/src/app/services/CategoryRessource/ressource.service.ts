import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ressource } from 'src/app/model/Ressource';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};
@Injectable({
  providedIn: 'root'
})

export class RessourceService {

  private baseUrl = 'http://localhost:8085/mindCare/ressource';

  constructor(private http: HttpClient) { }

  /*createResourceAndAssociateCategory(ressource: Ressource, categoryId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/createResourceAndAssociateCategory/${categoryId}`, ressource);
  }*/
  createResourceAndAssociateCategory(ressource: Ressource, categoryId: number, file: File): Observable<void> {
    const formData: FormData = new FormData();
    formData.append('titleR', ressource.titleR);
    formData.append('descriptionR', ressource.descriptionR);
    formData.append('file', file);

    const httpOptions = this.getHttpOptions();
    return this.http.put<void>(`${this.baseUrl}/createResourceAndAssociateCategory/${categoryId}`, formData, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de la ressource');
        })
      );


    /*const formData: FormData = new FormData();
    formData.append('titleR', ressource.titleR);
    formData.append('descriptionR', ressource.descriptionR);
    formData.append('file', ressource.url);

    const httpOptions = this.getHttpOptions();

    return this.http.post<void>(`${this.baseUrl}/createResourceAndAssociateCategory/${categoryId}`, ressource, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de la ressource');
        })
      );*/
  }
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


  getRessourceById(id: number): Observable<Ressource> {

    const httpOptions = this.getHttpOptions();
    return this.http.get<Ressource>(`${this.baseUrl}/getressource/${id}`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }

  getAllRessources(): Observable<Ressource[]> {

    const httpOptions = this.getHttpOptions();
    return this.http.get<Ressource[]>(`${this.baseUrl}/getall`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }

  deleteRessource(id: number): Observable<void> {

    const httpOptions = this.getHttpOptions();
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }

  updateRessource(ressource: Ressource): Observable<Ressource> {
    const httpOptions = this.getHttpOptions();
    return this.http.put<Ressource>(`${this.baseUrl}/updateIdressources`, ressource, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }

  unassignResourceFromCategory(id: number): Observable<void> {
    const httpOptions = this.getHttpOptions();
    return this.http.put<void>(`${this.baseUrl}/desaffecter-ressource/${id}`, {}, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }

  findRessourcesByTitleR(titleR: string): Observable<Ressource[]> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<Ressource[]>(`${this.baseUrl}/findRessourcesByTitleR/${titleR}`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }

  findRessourcesByCategoryId(id: number): Observable<Ressource[]> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<Ressource[]>(`${this.baseUrl}/findRessourcesByCategoryId/${id}`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }

  searchRessource(keyword: string): Observable<Ressource[]> {
    const url = `${this.baseUrl}/searchRessource?keyword=${keyword}`;

    const httpOptions = this.getHttpOptions();
    return this.http.get<Ressource[]>(url, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }

  getRessourceStatsByCategory(): Observable<any[]> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<any[]>(`${this.baseUrl}/statsByCategory`, httpOptions)
      .pipe(
        catchError((error: any) => {
          return throwError('Erreur lors de l\'ajout de l\'utilisateur');
        })
      );
  }


getResourcesByCategoryId(categoryId: number): Observable<Ressource[]> {
  const httpOptions = this.getHttpOptions();
  return this.http.get<Ressource[]>(`${this.baseUrl}/getResourcesByCategoryId/${categoryId}`, httpOptions)
    .pipe(
      catchError((error: any) => {
        return throwError('Erreur lors de l\'ajout de l\'utilisateur');
      })
    );
  }


likeRessource(idR: number): Observable<any> {
  const httpOptions = this.getHttpOptions();
  return this.http.post<any>(`${this.baseUrl}/ressources/${idR}/like`, {}, httpOptions)
    .pipe(
      catchError((error: any) => {
        return throwError('Erreur lors de l\'ajout de l\'utilisateur');
      })
    );
  }

dislikeRessource(idR: number): Observable<any> {
  const httpOptions = this.getHttpOptions();
  return this.http.post<any>(`${this.baseUrl}/ressources/${idR}/dislike`, {}, httpOptions)
    .pipe(
      catchError((error: any) => {
        return throwError('Erreur lors de l\'ajout de l\'utilisateur');
      })
    );
  }

loadUrl(idRessource: number): Observable<Blob> {
  const headers = this.getHttpOptions().headers.set('Accept', 'application/avif');
  //const headers = new HttpHeaders().set('Accept', 'application/avif');
 // const httpOptions = this.getHttpOptions();
  return this.http.get(`${this.baseUrl}/loadurl/${idRessource}`, { headers, responseType: 'blob' as const })
    .pipe(
      catchError((error: any) => {
        return throwError('Erreur lors de l\'ajout de l\'utilisateur');
      })
    );
  }

desaffecterRessource(ressourceId: number): Observable<any> {
  const url = `${this.baseUrl}/desaffecter-ressource/${ressourceId}`;

  const httpOptions = this.getHttpOptions();
  return this.http.put(url, null, httpOptions)
    .pipe(
      catchError((error: any) => {
        return throwError('Erreur lors de l\'ajout de l\'utilisateur');
      })
    );
}

}
