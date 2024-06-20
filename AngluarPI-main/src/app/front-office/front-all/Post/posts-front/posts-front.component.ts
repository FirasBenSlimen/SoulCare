import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/model/exercise/exercise.model';
import { Post } from 'src/app/model/post';
import { SExerciseService } from 'src/app/services/exercise/s-exercise.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-posts-front',
  templateUrl: './posts-front.component.html',
  styleUrls: ['./posts-front.component.css']
})
export class PostsFrontComponent implements OnInit {
  posts: Post[] = []; // Array to store retrieved posts
  exercises: Exercise[] = [];
  constructor(private postService: PostService,private exerciseService: SExerciseService) { }

  ngOnInit(): void {
    this.getPosts(); // Call the method to retrieve posts when the component initializes
    this.getExercises();
  }

  // Method to retrieve posts from the service
  getPosts(): void {
    this.postService.getAllPosts().subscribe(
      (data: Post[]) => {
        this.posts = data;
        console.log('Posts:', data);
      },
      error => {
        console.error('Error fetching posts', error);
      }
    );
  }
  getExercises(): void {
    
    this.exerciseService.getAllExercises().subscribe(
      (data: Exercise[]) => {
        this.exercises = data;
        console.log('hehda eli jeni:', data);
      },
      error => {
        console.error('Error while retrieving exercises', error);
      }
    );
  }
  
}
