import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Post, Comment } from 'src/app/model/post';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8085/mindCare/posts';

  constructor(private http: HttpClient) {}
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

  private getHttpOptions2(): { headers: HttpHeaders } {
    const token = this.getToken();
    console.log(token);
    if (token) {
        return {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${token}`
            })
        };
    } else {
        // Handle case where token doesn't exist
        // Example: Redirect the user to the login page
        throw new Error('Token not found');
    }
}


  getAllPosts(): Observable<Post[]> {
    const httpOptions = this.getHttpOptions();
    return this.http.get<Post[]>(`${this.apiUrl}/retrieve-all-posts`,httpOptions);
  }

  deletePost(id: number): Observable<any> {
    const httpOptions = this.getHttpOptions();
    return this.http.delete(`${this.apiUrl}/remove-post/${id}`,httpOptions);
  }

  searchPosts(keyword: string): Observable<Post[]> {
    const url = `${this.apiUrl}/search-posts?keyword=${keyword}`;
     const httpOptions = this.getHttpOptions();
     return this.http.get<Post[]>(url, httpOptions)
       .pipe(
         catchError((error: any) => {
           return throwError('Erreur lors de la recherche');
         })
       );
  }

  addPost(formData: FormData): Observable<Post> {
    const httpOptions = this.getHttpOptions2();
    return this.http.post<Post>(`${this.apiUrl}/add-post`, formData, httpOptions);
}


getPostById(id: number): Observable<Post> {
  const httpOptions = this.getHttpOptions();
  return this.http.get<Post>(`${this.apiUrl}/retrieve-post/${id}`,httpOptions);
}

modifyPost(id: number, formData: FormData): Observable<Post> {
  const httpOptions = this.getHttpOptions2();
  return this.http.put<Post>(`${this.apiUrl}/modify-post/${id}`, formData, httpOptions);
}
  
getPostWithComments(id: number): Observable<Post> {
  const httpOptions = this.getHttpOptions();
  return this.http.get<Post>(`${this.apiUrl}/retrieve-post-with-comments/${id}`,httpOptions);
}

// Add comment to a post_
addComment(postId: number, content: string): Observable<Comment> {
  const httpOptions = this.getHttpOptions();
  return this.http.post<Comment>(`${this.apiUrl}/add-comment/${postId}`, { content },httpOptions);
}

getCommentsByPostId(postId: number): Observable<Comment[]> {
  const httpOptions = this.getHttpOptions();
  return this.http.get<Comment[]>(`${this.apiUrl}/comments/${postId}`,httpOptions);
}

// Update comment by ID
updateComment(commentId: number, content: string): Observable<Comment> {
  const httpOptions = this.getHttpOptions();
  return this.http.put<Comment>(`${this.apiUrl}/comments/${commentId}`, { content },httpOptions);
}

// Delete comment by ID
deleteComment(commentId: number): Observable<void> {
  const httpOptions = this.getHttpOptions();
  return this.http.delete<void>(`${this.apiUrl}/comments/${commentId}`,httpOptions);
}

addReply(parentCommentId: number, postId: number, content: string): Observable<any> {
  const httpOptions = this.getHttpOptions();
  const url = `${this.apiUrl}/comments/reply/${parentCommentId}?postId=${postId}`;
  const body = { content }; // Include content in the request body
  return this.http.post(url, body,httpOptions);
}



}
