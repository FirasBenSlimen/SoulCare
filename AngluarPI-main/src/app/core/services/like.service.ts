import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  likeEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  likeProject(projectId: number): void {
    this.likeEvent.emit(projectId);
  }

  dislikeProject(projectId: number): void {
    // Implement your dislike logic here
  }

  getLikes(projectId: number): number {
    const likes = JSON.parse(localStorage.getItem('projectLikes')) || {};
    return likes[projectId] || 0;
  }

  getDislikes(projectId: number): number {
    const dislikes = JSON.parse(localStorage.getItem('projectDislikes')) || {};
    return dislikes[projectId] || 0;
  }
}
