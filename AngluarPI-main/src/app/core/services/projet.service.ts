import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private apiUrl = 'http://localhost:8089/pi';

  constructor(private http: HttpClient) { }

  // Fetch all projects
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/get_all_Projects`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Fetch a single project by ID
  getProject(projectId: number): Observable<Project> {
    const url = `${this.apiUrl}/getProject/${projectId}`;
    return this.http.get<Project>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create a new project
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/add-Project`, project)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update an existing project
  updateProject(projectId: number, project: Project): Observable<Project> {
    const url = `${this.apiUrl}/updateProject/${projectId}`;
    return this.http.put<Project>(url, project)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a project
  deleteProject(projectId: number): Observable<void> {
    const url = `${this.apiUrl}/deleteProject/${projectId}`;
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
  addCommentToProject(idProject: number, comment: Comment): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addComment/${idProject}`, comment);
  }
 likeProject(projectId: number): void {
    let likes = JSON.parse(localStorage.getItem('projectLikes')) || {};
    likes[projectId] = (likes[projectId] || 0) + 1;
    localStorage.setItem('projectLikes', JSON.stringify(likes));
  }

  dislikeProject(projectId: number): void {
    let dislikes = JSON.parse(localStorage.getItem('projectDislikes')) || {};
    dislikes[projectId] = (dislikes[projectId] || 0) + 1;
    localStorage.setItem('projectDislikes', JSON.stringify(dislikes));
  }

  getLikes(projectId: number): number {
    const likes = JSON.parse(localStorage.getItem('projectLikes')) || {};
    return likes[projectId] || 0;
  }

}
