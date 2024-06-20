import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:8089/pi';

  constructor(private http: HttpClient) { }

  addCommentToProject(idProject: number, comment: Comment): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addComment/${idProject}`, comment);
  }
}
