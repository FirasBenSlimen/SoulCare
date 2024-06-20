import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/model/post';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  post: Post = {
    author: '', content: '', image: '', datePosted: new Date(), likes: 0, dislikes: 0,
    id: 0
  };
  selectedFile: File = null;

  constructor(private postService: PostService) {}

  onFileSelected(event): void {
    this.selectedFile = <File>event.target.files[0];
  }

  addPost(): void {
    const formData = new FormData();
    const jsonDataBlob = new Blob([JSON.stringify({
      author: this.post.author,
      content: this.post.content,
      likes: 0,
      dislikes: 0
    })], {
      type: 'application/json'
    });
  
    // Append JSON data as Blob
    formData.append('jsonData', jsonDataBlob);
    // Append the image file
    formData.append('image', this.selectedFile);
  
    // Remove the explicit Content-Type header setting
    // Set the content type to multipart/form-data
   
  
    this.postService.addPost(formData).subscribe(
      (response) => {
        console.log('Post added successfully:', response);
      },
      (error) => {
        console.error('Error adding post:', error);
      }
    );
  }
  
  
  
}
