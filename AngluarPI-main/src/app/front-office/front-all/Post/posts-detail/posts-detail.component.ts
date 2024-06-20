import { Component, OnInit } from '@angular/core';
import { Post, Comment } from 'src/app/model/post';
import { PostService } from 'src/app/services/post/post.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.component.html',
  styleUrls: ['./posts-detail.component.css']
})
export class PostsDetailComponent implements OnInit {
  postId: number;
  post$: Observable<Post>;
  comments$: Observable<Comment[]>;

  commentContent: string; // Define commentContent property
  replyContent: string ; // Define replyContent property
  selectedCommentId: number; // Define selectedCommentId property

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.postId = +this.route.snapshot.paramMap.get('id');
    this.post$ = this.postService.getPostWithComments(this.postId);
    this.comments$ = this.postService.getCommentsByPostId(this.postId);
  }

  addComment(): void {
    this.postService.addComment(this.postId, this.commentContent).subscribe(
      () => {
        this.comments$ = this.postService.getCommentsByPostId(this.postId);
        this.commentContent = ''; 
      },
      (error) => {
        console.error('Error adding comment:', error);
      }
    );
  }

  editComment(comment: Comment): void {
    const newContent = prompt('Enter the new content:', comment.content);
    if (newContent !== null && newContent !== '') {
      this.postService.updateComment(comment.id, newContent).subscribe(
        () => {
          this.comments$ = this.postService.getCommentsByPostId(this.postId);
        },
        (error) => {
          console.error('Error updating comment:', error);
        }
      );
    }
  }

  deleteComment(comment: Comment): void {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.postService.deleteComment(comment.id).subscribe(
        () => {
          this.comments$ = this.postService.getCommentsByPostId(this.postId);
        },
        (error) => {
          console.error('Error deleting comment:', error);
        }
      );
    }
  }

  showReplyForm(commentId: number): void {
    this.selectedCommentId = commentId;
  }

 // Add method to add a reply to a comment
 addReply(parentCommentId: number, postId: number, content: string): void {
  if (!postId || !parentCommentId || !content) {
      console.error('postId, parentCommentId, or content is missing.');
      return;
  }

  this.postService.addReply(parentCommentId, postId, content).subscribe(
      (response) => {
          console.log('Reply added:', response);
          // Refresh comments after adding a new reply
          this.comments$ = this.postService.getCommentsByPostId(postId);
          // Reset replyContent after adding reply
          // this.replyContent = ''; // You can reset replyContent if needed
      },
      (error) => {
          console.error('Error adding reply:', error);
      }
  );
}


}
