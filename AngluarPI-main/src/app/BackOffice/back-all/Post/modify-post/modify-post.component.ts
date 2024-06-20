import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-modify-post',
  templateUrl: './modify-post.component.html',
  styleUrls: ['./modify-post.component.css']
})
export class ModifyPostComponent implements OnInit {
  postId: number;
  post: Post = {
    author: '',
    content: '',
    image: '',
    datePosted: new Date(),
    likes: 0,
    dislikes: 0,
    id: 0
  };
  selectedFile: File = null;

  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = +params['id'];
      this.loadPost();
    });
  }

  loadPost(): void {
    this.postService.getPostById(this.postId).subscribe(
      (data) => {
        this.post = data;
      },
      (error) => {
        console.error('Error fetching post:', error);
      }
    );
  }

  onFileSelected(event): void {
    this.selectedFile = <File>event.target.files[0];
  }

  modifyPost(): void {
    const formData = new FormData();
    formData.append('jsonData', JSON.stringify({
      author: this.post.author,
      content: this.post.content,
      likes: this.post.likes,
      dislikes: this.post.dislikes
    }));
    formData.append('image', this.selectedFile);

    this.postService.modifyPost(this.postId, formData).subscribe(
      (response) => {
        console.log('Post modified successfully:', response);
        this.router.navigate(['/post']);
      },
      (error) => {
        console.error('Error modifying post:', error);
      }
    );
  }
}
