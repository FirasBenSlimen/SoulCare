import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../../model/ticket';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private baseURL = 'http://localhost:8085/mindCare/ticket';
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

  getTickets(): Observable<Ticket[]> {
    const httpOptions = this.getHttpOptions();
    return this.httpClient.get<Ticket[]>(this.baseURL + '/retrieve-all-tickets', httpOptions);
  }

  getTicketById(id: number): Observable<Ticket> {
    const httpOptions = this.getHttpOptions();
    return this.httpClient.get<Ticket>(this.baseURL + `/retrieve-ticket/${id}`, httpOptions);
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    const httpOptions = this.getHttpOptions();
    return this.httpClient.post<Ticket>(this.baseURL + '/addticket', ticket, httpOptions);
  }

  deleteTicket(id: number): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.httpClient.delete(this.baseURL + `/remove-ticket/${id}`, httpOptions);
  }

  addTicketToEvent(eventId: number, ticket: Ticket): Observable<Ticket> {
    const httpOptions = this.getHttpOptions();
    return this.httpClient.post<Ticket>(this.baseURL + `/add/${eventId}`, ticket, httpOptions);
  }
}
