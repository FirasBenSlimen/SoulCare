import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryExercise } from 'src/app/model/exercise/category-exercise.model';
import { Exercise } from 'src/app/model/exercise/exercise.model';
import { SCategoryService } from 'src/app/services/exercise/s-category.service';
import { SExerciseService } from 'src/app/services/exercise/s-exercise.service';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  p: number = 1;
  exercises: Exercise[] = [];
  showAddForm: boolean = false;
  newExercise: Exercise = new Exercise();
  searchKeyword: string = '';
  categories: CategoryExercise[] = [];
  selectedCriteria: string = 'description'; // Default selected criteria
  selectedExercise: Exercise | null = null;
  showTopExercisesOnly = false;
  exerciseRatings: { exercise: Exercise, likePercentage: number }[] = [];
 
  toggleDisplay(showTopExercisesOnly: boolean) {
     this.showTopExercisesOnly = showTopExercisesOnly;
    if (!showTopExercisesOnly) {
      // If displaying all exercises, reset topExercises array
      this.exerciseRatings = [];
    }else {
      this.calculateStarRatings();
    }
  }
  chagestateaffichage(){
    this.showTopExercisesOnly = false;

  }
  constructor(private exerciseService: SExerciseService,private categoryser:SCategoryService,private router: Router) {
 }
 onCriteriaChange() {
  this.getExercisesByCriteriaAndValue(); // Call the search function when criteria changes
}

calculateStarRatings() {

  for (let exercise of this.exercises) {
    let totalLikes = 0;
    let totalDislikes = 0;

    for (let post of exercise.posts) {
      totalLikes += post.likes;
      totalDislikes += post.dislikes;
    }

    const totalVotes = totalLikes + totalDislikes;
    const likePercentage = totalVotes === 0 ? 0 : (totalLikes / totalVotes) * 100;

    this.exerciseRatings.push({
      exercise: exercise,
      likePercentage: likePercentage
    });
  }

  this.exerciseRatings.sort((a, b) => b.likePercentage - a.likePercentage);

 // this.topExercises = this.exerciseRatings.slice(0, 3);
 console.log("---->",this.exerciseRatings); 
 this.showTopExercisesOnly = true;
}



  getExercisesByCriteriaAndValue() {
    this.exerciseService.getExercisesByCriteriaAndValue(this.selectedCriteria, this.searchKeyword).subscribe(
      (data: Exercise[]) => {
        this.exercises = data;
        console.log('Exercises fetched successfully:', data);
      },
      error => {
        console.error('Error occurred while fetching exercises:', error);
      }
    );
  }
 
  ngOnInit() {
    this.getExercises();
    this.getCategories();
  }
  playVideo(event) {
    event.target.play();
  }
  
  pauseVideo(event) {
    event.target.pause();
  }
  
  getCategories(): void {
    this.categoryser.getAllCategories().subscribe(
      (data: CategoryExercise[]) => { // Corrected data type
        this.categories = data;
        console.log('Categories exercise:', data);
      },
      error => {
        console.error('Erreur lors de la récupération des catégories', error); // Corrected error message
      }
    );
  }
    // Function to check if URL is for an image
isImageUrl(url: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
  const lowerCaseUrl = url.toLowerCase();
  return imageExtensions.some(ext => lowerCaseUrl.endsWith(ext));
}
  getExerciseMediaUrl(exercise: Exercise): string {
    // Check if exerciseMedias array is not empty before accessing its first item
    console.log('hello', exercise);
    
    // Check if mediaUrl is not null or undefined
    if (exercise.exercicemedias && exercise.exercicemedias[0] && exercise.exercicemedias[0].mediaUrl) {
      return "../../../../../assets/FrontOffice/exerciseimg/" + exercise.exercicemedias[0].mediaUrl;
    } else {
      // Return default path if mediaUrl is null or undefined
      return "../../../../../assets/FrontOffice/exerciseimg/default.jpg";
    }
  }
  // Method to show details of the clicked exercise
  showDetails(exercise: Exercise) {
    this.selectedExercise = exercise;
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
    // Method to navigate to details component when "View Details" button is clicked
    viewDetails(exercise: Exercise) {
      this.router.navigate(['/exercisedetails', exercise.exerciseId]);
    }

  
}