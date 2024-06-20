import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Event } from '../../model/event';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseURL = 'http://localhost:8085/mindCare/event';
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

  constructor(private httpClient: HttpClient) { }

  getEvents(): Observable<Event[]> {
    const httpOptions = this.getHttpOptions();
    return this.httpClient.get<Event[]>(this.baseURL + '/retrieve-all-events', httpOptions);
  }
  getEventById(id: number): Observable<Event> {
    const httpOptions = this.getHttpOptions();
    return this.httpClient.get<Event>(this.baseURL + `/retrieve-event/${id}`, httpOptions);
  }

  addEvent(event: Event): Observable<Event> {
    const httpOptions = this.getHttpOptions();
    return this.httpClient.post<Event>(this.baseURL + '/addevent', event, httpOptions);
  }

  deleteEvent(id: number): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.httpClient.delete(this.baseURL + `/remove-event/${id}`, httpOptions);
  }

  getEventsByDate(date: string): Observable<Event[]> {
    const httpOptions = this.getHttpOptions();
    return this.httpClient.get<Event[]>(`${this.baseURL}/all/${date}`, httpOptions);
  }
  updateEvent(id: number, event: Event): Observable<Event> {
    const httpOptions = this.getHttpOptions();
    return this.httpClient.put<Event>(this.baseURL + `/updateevent/${id}`, event, httpOptions);
  }
}
