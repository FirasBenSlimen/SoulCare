import { Component } from '@angular/core';

@Component({
  selector: 'app-like-dislike',
  templateUrl: './like-dislike.component.html',
  styleUrls: ['./like-dislike.component.css']
})
export class LikeDislikeComponent {
  likes: number = 0;
  dislikes: number = 0;

  like() {
    this.likes++;
  }

  dislike() {
    this.dislikes++;
  }
}
